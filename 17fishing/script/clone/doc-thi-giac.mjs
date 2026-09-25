#!/usr/bin/env node
/**
 * Đọc HỒ SƠ THỊ GIÁC từ ảnh sản phẩm thật.
 *
 *   node doc-thi-giac.mjs <ảnh...> [--ra thi-giac.json]
 *
 * Vì sao cần: công cụ sinh ảnh không nhìn thấy "285g, hãm 8kg". Nó cần biết
 * vật thể màu gì, bề mặt bóng hay mờ, sáng đổ vào thì phản ứng thế nào. Đưa
 * bảng thông số cho Stitch rồi mong nó vẽ đúng màu là nhầm vai của dữ liệu.
 *
 * Script đo BẢNG MÀU THẬT bằng cách gom màu theo ô lập phương trong không
 * gian RGB, bỏ nền, rồi xếp theo diện tích. Đo từ ảnh gốc của nhà sản xuất
 * nên màu ra là màu hàng thật, không phải màu tôi đoán.
 */
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2);
const lay = (c) => { const i = args.indexOf(c); return i >= 0 ? args[i + 1] : null; };
// Bỏ cả cờ LẪN giá trị đi kèm. Lọc mỗi `--` thì `--ra thi-giac.json` để lọt
// tên tệp đích vào danh sách ảnh, và PIL đi mở nó như một tấm ảnh.
const CO_CO_GIA_TRI = ['--ra', '--vung'];
const tep = args.filter((a, i) => {
  if (a.startsWith('--')) return false;
  return !CO_CO_GIA_TRI.includes(args[i - 1]);
});
if (!tep.length) { console.error('Dùng: node doc-thi-giac.mjs <ảnh...>'); process.exit(1); }

const vung = lay('--vung');   // "x,y,w,h" theo tỉ lệ 0-1 của cạnh ảnh
const py = `
import sys, json
from PIL import Image
from collections import Counter

O = 24                      # cạnh ô lập phương trong không gian RGB
dem, tong = Counter(), 0
canhBao = []

def mauVien(im):
    """Màu chiếm ưu thế ở VIỀN ảnh — gần như luôn là nền, không phải sản phẩm.

    Không có bước này thì ảnh banner quảng cáo cho ra màu của banner. Đã đo
    thật: ghế vàng-đen ra "xanh lạnh", phao tím ra "xanh lá", vì cả hai ảnh
    đều là banner nền xanh. Sai mà nghe rất hợp lý."""
    w, h = im.size
    d = max(2, int(min(w, h) * 0.07))
    px = im.load()
    c = Counter()
    for x in range(0, w, 2):
        for y in list(range(0, d)) + list(range(h - d, h)):
            c[tuple(v // O for v in px[x, y])] += 1
    for y in range(0, h, 2):
        for x in list(range(0, d)) + list(range(w - d, w)):
            c[tuple(v // O for v in px[x, y])] += 1
    tongVien = sum(c.values()) or 1
    o, n = c.most_common(1)[0]
    return (o, n / tongVien)

VUNG = sys.argv[1]
for p in sys.argv[2:]:
    im = Image.open(p).convert('RGB')
    if VUNG:
        # Cắt đúng vùng SẢN PHẨM. Bắt buộc với ảnh marketing: nền banner là
        # dải chuyển màu nên không cách nào tự dò ra, và đo cả khung thì ra
        # màu của banner. Đã đo thật: ghế vàng-đen ra "xanh lạnh".
        x, y, w, h = [float(v) for v in VUNG.split(',')]
        W, H = im.size
        im = im.crop((int(x * W), int(y * H), int((x + w) * W), int((y + h) * H)))
    im.thumbnail((260, 260))
    oNen, tiLeVien = mauVien(im)
    # Viền mà một màu chiếm trên 55% thì đó là nền phẳng: ảnh studio hoặc
    # banner. Loại ô màu đó ra khỏi phép đếm.
    boNen = tiLeVien > 0.55
    if boNen:
        r0, g0, b0 = [v * O + O // 2 for v in oNen]
        mx0, mn0 = max(r0, g0, b0), min(r0, g0, b0)
        if (mx0 - mn0) / max(mx0, 1) > 0.18:
            canhBao.append(f'{p}: nền là màu CÓ SẮC #{r0:02X}{g0:02X}{b0:02X} chiếm {tiLeVien*100:.0f}% viền — nhiều khả năng là banner quảng cáo, không phải ảnh sản phẩm')
    for r, g, b in im.getdata():
        if boNen and tuple(v // O for v in (r, g, b)) == oNen: continue
        mx, mn = max(r, g, b), min(r, g, b)
        # Bỏ nền: gần trắng, gần đen, và xám không bão hoà.
        if mx > 238 and mx - mn < 16: continue
        if mx < 26: continue
        if mx - mn < 12 and 60 < mx < 200: continue
        dem[(r // O, g // O, b // O)] += 1
        tong += 1

ra = []
for (a, b_, c), n in dem.most_common(40):
    r, g, bl = a * O + O // 2, b_ * O + O // 2, c * O + O // 2
    mx, mn = max(r, g, bl), min(r, g, bl)
    ra.append({
        'hex': '#%02X%02X%02X' % (r, g, bl),
        'tiLe': round(n / max(tong, 1) * 100, 1),
        'sang': round(mx / 255 * 100),
        'baoHoa': round((mx - mn) / max(mx, 1) * 100),
    })
# Tách MÀU ĐỊNH DANH khỏi MÀU NỀN.
# Hai loại đóng vai khác hẳn nhau trong prompt: màu định danh là thứ phải vẽ
# đúng, màu nền là thứ nói về bối cảnh và bóng đổ. Gộp chung thì màu trung
# tính của nền và bóng lấn át, và tông thật của sản phẩm bị xếp xuống dưới.
chinh = [m for m in ra if m['baoHoa'] >= 20][:5]
nen   = [m for m in ra if m['baoHoa'] < 20][:4]
if not VUNG:
    canhBao.append('KHÔNG cắt vùng sản phẩm. Với ảnh marketing nền chuyển màu, số đo là màu của NỀN chứ không phải của hàng. Truyền --vung x,y,w,h (tỉ lệ 0-1).')
print(json.dumps({'soAnh': len(sys.argv) - 2, 'mauDinhDanh': chinh, 'mauNen': nen,
                  'canhBao': canhBao}, ensure_ascii=False))
`;
// Ghi Python ra tệp tạm, KHÔNG truyền qua `python3 -c`: JSON.stringify biến
// mọi xuống dòng thành hai ký tự \n, Python nhận về một dòng và báo lỗi cú
// pháp ngay ký tự đầu.
const tepPy = path.join(os.tmpdir(), `doc-thi-giac-${process.pid}.py`);
fs.writeFileSync(tepPy, py);
let kq;
try {
  kq = JSON.parse(execSync(`python3 ${JSON.stringify(tepPy)} ${JSON.stringify(vung || '')} ${tep.map((t) => JSON.stringify(t)).join(' ')}`).toString());
} finally {
  fs.unlinkSync(tepPy);
}

// Gọi tên tông theo sắc độ và độ bão hoà, để prompt nói được bằng LỜI chứ
// không chỉ bằng mã hex — công cụ sinh ảnh hiểu lời tốt hơn hiểu số.
const goiTen = (h) => {
  const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), bh = (mx - mn) / (mx || 1);
  if (bh < 0.15) return mx > 170 ? 'bạc sáng' : mx > 90 ? 'xám thép' : 'đen mờ';
  if (r > g && g > b) return mx > 150 ? 'đồng sáng' : 'đồng cổ';
  if (b > r) return 'xanh lạnh';
  if (g > r) return 'xanh lá';
  return 'nâu đỏ';
};
[...kq.mauDinhDanh, ...kq.mauNen].forEach((m) => { m.ten = goiTen(m.hex); });

// Bề mặt bóng hay mờ: kim loại bóng cho khoảng sáng RỘNG giữa điểm tối nhất
// và sáng nhất. Số này quyết định prompt phải mô tả ánh sáng thế nào.
const sang = [...kq.mauDinhDanh, ...kq.mauNen].map((m) => m.sang);
kq.doTuongPhan = Math.max(...sang) - Math.min(...sang);
kq.beMat = kq.doTuongPhan > 45 ? 'bóng, phản chiếu mạnh' : kq.doTuongPhan > 25 ? 'bán mờ' : 'mờ';
kq.anhSangCanDung = kq.doTuongPhan > 45
  ? 'một nguồn sáng chính định hướng, chếch trên, để tạo vệt sáng chạy dọc thân kim loại'
  : 'ánh sáng toả đều, tránh vệt cháy';

const ra = lay('--ra') || 'thi-giac.json';
fs.writeFileSync(ra, JSON.stringify(kq, null, 1));

console.log(`đo ${kq.soAnh} ảnh\n`);
for (const c of kq.canhBao || []) console.log(`  ⚠ ${c}`);
if ((kq.canhBao || []).length) console.log('');
const in_ = (ds) => ds.forEach((m) =>
  console.log(`  ${m.hex}  ${String(m.tiLe).padStart(5)}%  ${m.ten.padEnd(11)} sáng ${String(m.sang).padStart(3)}  bão hoà ${String(m.baoHoa).padStart(3)}`));
console.log('MÀU ĐỊNH DANH (phải vẽ đúng):'); in_(kq.mauDinhDanh);
console.log('\nmàu nền và bóng đổ:'); in_(kq.mauNen);
console.log(`\nđộ tương phản ${kq.doTuongPhan}  ->  bề mặt ${kq.beMat}`);
console.log(`ánh sáng nên dùng: ${kq.anhSangCanDung}`);
console.log(`\n-> ${ra}`);
