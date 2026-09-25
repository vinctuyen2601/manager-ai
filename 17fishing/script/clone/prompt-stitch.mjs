#!/usr/bin/env node
/**
 * BƯỚC 6 — sinh prompt Stitch từ Bảng sự thật.
 *
 *   node prompt-stitch.mjs bang-su-that.json [--tam 1,2,5] [--ra prompt.md]
 *
 * Ba khối, đúng thứ tự:
 *   A · sự thật sản phẩm + luật cứng   (chặn Stitch chế số)
 *   B · quy chuẩn lớp chữ cho đồ câu   (chặn ảnh thành biển chợ đêm)
 *   C · mô tả từng tấm
 *
 * Khối A sinh TỪ DỮ LIỆU, không gõ tay. Gõ tay là lại có hai bản thông số.
 */
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2);
const tep = args.find((a) => !a.startsWith('--')) || 'bang-su-that.json';
const lay = (c) => { const i = args.indexOf(c); return i >= 0 ? args[i + 1] : null; };
const b = JSON.parse(fs.readFileSync(tep, 'utf8'));
// Hai nguồn phụ, thiếu thì prompt vẫn chạy nhưng yếu hẳn.
const tgTep = lay('--thi-giac');
const tg = tgTep && fs.existsSync(tgTep) ? JSON.parse(fs.readFileSync(tgTep, 'utf8')) : null;
const hsTep = lay('--ho-so-danh-muc');
// Đọc YAML bằng python3 + PyYAML thay vì tự viết. Bản tự viết không phân
// biệt được khoá có giá trị rỗng là object hay mảng, nên `boiCanhHopLe:` theo
// sau bởi các dòng `- ...` bị đọc thành object và `.map` nổ.
const hs = hsTep && fs.existsSync(hsTep)
  ? JSON.parse(execSync(`python3 -c 'import sys,yaml,json;json.dump(yaml.safe_load(open(sys.argv[1],encoding="utf-8")),sys.stdout)' ${JSON.stringify(hsTep)}`).toString())
  : null;

const NHAN = { 'đồng cổ': 'VÀNG KIM hoặc CAM CHÁY', 'đen': 'VÀNG KIM hoặc CAM CHÁY',
               'bạc': 'VÀNG KIM hoặc CAM CHÁY', 'thể thao': 'XANH CYAN hoặc LIME' };
const mauNhan = NHAN[b.tongMau] || 'VÀNG KIM hoặc CAM CHÁY';
// Mã cỡ = cột ĐẦU của mọi bảng. Không đoán tên cột, chỉ lấy vị trí — mỗi
// ngành hàng gọi nó một kiểu ("Cỡ", "Chiều dài", "Tải chì").
const moiCo = b.bang.flatMap((bg) => bg.dong.map((d) => `${bg.ten.split('·').pop().trim()} ${d[0]}`.trim()));

// Khối A dựng từ một BẢNG tổng quát, không từ trường riêng của máy câu.
//
// Bản đầu đọc thẳng `b.vatLieu.truyenDong`, `n.bi`, `n.tiSo`, `n.ham` — đúng
// với máy câu, nhưng cần câu không có tỉ số truyền mà có tải trọng ném, số
// khoen, độ dài thu gọn. Sang sản phẩm thứ hai là script nổ ở dòng `.map`.
//
// Nay Bảng sự thật khai `bang`: mỗi phần tử là một nhóm, có `cot` và `dong`.
// Script chỉ căn cột, không biết cột đó nghĩa là gì — và đó chính là điều
// làm nó dùng được cho mọi ngành hàng.
const rong = (bg) => bg.cot.map((c, k) =>
  Math.max(String(c).length, ...bg.dong.map((d) => String(d[k]).length)));

const veBang = (bg) => {
  const w = rong(bg);
  const hang = (d) => d.map((v, k) => String(v).padEnd(w[k])).join('  ').trimEnd();
  return [hang(bg.cot), w.map((n) => '-'.repeat(n)).join('  '),
          ...bg.dong.map(hang)].join('\n');
};

const khoiA = `DỮ LIỆU SẢN PHẨM (nguồn duy nhất, tuyệt đối không thêm bớt):

Tên: ${b.ten}
Thương hiệu: ${b.thuongHieu}
${(b.chung || []).map((x) => `${x[0]}: ${x[1]}`).join('\n')}

${b.bang.map((bg) => `${bg.ten}${bg.nhan ? `  (${bg.nhan})` : ''}\n${veBang(bg)}`).join('\n\n')}

${b.ghiChuCo || ''}

LUẬT CỨNG:
1. Chỉ dùng số có trong khối trên. KHÔNG sinh thêm bất kỳ con số nào.
2. Không ghép thông số của hai nhóm khác nhau vào cùng một khung.
3. Không được nhắc tới:
${b.khongDuocNoi.map((x) => `   · ${x}`).join('\n')}
4. Chữ trong ảnh phải TIẾNG VIỆT CÓ DẤU, không lẫn tiếng Trung.
5. Không hiện logo hay tên thương hiệu nào ngoài "${b.thuongHieu}".`;

const tgKhoi = !tg ? '' : `HỒ SƠ THỊ GIÁC (đo từ ảnh thật của sản phẩm, KHÔNG được đổi):

Màu định danh — đây là màu phải vẽ đúng:
${tg.mauDinhDanh.map((m) => `  ${m.hex}  ${m.ten}  (chiếm ${m.tiLe}% thân sản phẩm)`).join('\n')}

Màu nền và bóng đổ trong ảnh gốc:
${tg.mauNen.map((m) => `  ${m.hex}  ${m.ten}`).join('\n')}

Bề mặt: ${tg.beMat} (độ tương phản đo được ${tg.doTuongPhan}).
Ánh sáng: ${tg.anhSangCanDung}.

Giữ nguyên mọi đặc điểm hình dáng thấy trong ảnh gốc: hoa văn trên thân, các
lỗ khoét, hình dạng chân và tay cầm. Đây là thứ khách nhận ra sản phẩm, đổi đi
là thành sản phẩm khác.`;

const dmKhoi = !hs ? '' : `NGÔN NGỮ THỊ GIÁC CỦA NGÀNH HÀNG "${hs.ten || ''}":

Bối cảnh hợp lệ:
${(hs.ngonNguThiGiac?.boiCanhHopLe || []).map((x) => `  · ${x}`).join('\n')}

Bối cảnh CẤM:
${(hs.ngonNguThiGiac?.boiCanhCam || []).map((x) => `  · ${x}`).join('\n')}

Đạo cụ cho phép: ${(hs.ngonNguThiGiac?.daoCuChoPhep || []).join(', ')}
Giờ chụp: ${hs.ngonNguThiGiac?.gioChup || ''}

Lỗi thị giác hay gặp với loại hàng này, tránh bằng mọi giá:
${(hs.ngonNguThiGiac?.loiThiGiacHayGap || []).map((x) => `  · ${x}`).join('\n')}`;

const khoiB = `QUY CHUẨN LỚP CHỮ (Text & Badge Overlay):

PHÂN CẤP — mắt đọc theo thứ tự: SẢN PHẨM → LOGO/HEADLINE → BADGE.
Lớp chữ KHÔNG BAO GIỜ được cạnh tranh độ nổi bật với sản phẩm.
Tối đa ba tầng:
  Tầng 1 · Logo + tên thương hiệu, góc trên trái hoặc trên phải, 5–8% diện tích
  Tầng 2 · Headline lợi ích lớn nhất, KHÔNG QUÁ 7 TỪ, in hoa toàn bộ
  Tầng 3 · 2 đến 3 badge thông số "ăn tiền" nhất

PHÔNG CHỮ: dày, cứng cáp, góc cạnh, sans-serif hình khối gợi cơ khí chính xác.
  Dùng Montserrat Bold/Black, Bebas Neue, Oswald, Kinetic.
  TUYỆT ĐỐI KHÔNG font viết tay hoặc font mềm mại.

MÀU: headline và logo trắng #FFFFFF hoặc bạc ánh kim #E0E0E0.
  Sản phẩm tông ${b.tongMau} -> màu nhấn badge là ${mauNhan}.
  Màu nhấn chỉ chiếm ~10% diện tích ảnh.

BỐ TRÍ: đặt chữ HOÀN TOÀN vào vùng không gian âm (trời mờ, mặt nước mờ, vách
  đá tối). TUYỆT ĐỐI không đè lên: ${(hs?.khongDeChuDeLen || ['thân sản phẩm']).join(', ')}.
  Nền sáng làm chìm chữ thì chèn gradient đen trong suốt opacity 30–50% ăn dần
  từ mép ảnh vào dưới chữ.

BADGE: icon hình khối kết hợp số liệu, ví dụ
${(b.badge || hs?.badgeGoiY || []).map((x) => `  ${x}`).join('\n')}

BA LỖI TUYỆT ĐỐI TRÁNH:
1. Bảng thông số kiểu Word, liệt kê gạch đầu dòng dài. Khách ngợp, không đọc.
2. Badge đỏ chói kiểu flash sale. Hàng kỹ thuật đắt tiền mà dán sticker đỏ là
   kéo giá trị cảm nhận xuống hàng rẻ tiền.
3. Chữ che chi tiết kim loại. Đè lên ${(hs?.khongDeChuDeLen || ['thân sản phẩm'])[0]}
   là hỏng cảm giác độ nét của vật liệu, tức hỏng đúng thứ đang bán.`;

// Danh sách tấm lấy từ `boAnhMoTa` của hồ sơ danh mục, KHÔNG gõ cứng.
// Bản đầu gõ cứng sáu tấm của máy câu — "trên tay" vì khách lo kích thước,
// "so sánh cỡ" theo tỉ số truyền. Sang cần câu thì tấm cần là "thu gọn" và
// "độ cong", hoàn toàn khác. Thêm ngành hàng = thêm một tệp, không sửa script.
const TAM = hs?.boAnhMoTa || {};
if (!Object.keys(TAM).length) {
  console.error('DỪNG — hồ sơ danh mục không có `boAnhMoTa`. Không có nó thì'
    + ' prompt chỉ còn thông số, không nói được chụp cái gì.');
  process.exit(1);
}

const chon = (lay('--tam') || Object.keys(TAM).join(',')).split(',').map((x) => x.trim());
const khoiC = chon.map((n) => {
  const t = TAM[n];
  if (!t) { console.error(`không có mô tả cho tấm "${n}" trong hồ sơ danh mục`); return ''; }
  return `### ${n}\n\n${t.trim()}`;
}).filter(Boolean).join('\n\n');

const ra = `# Prompt Stitch — ${b.ten}

Stitch cần BA thứ: ảnh sản phẩm gốc · thông tin sản phẩm · prompt này.
Dán Khối A, A2, A3 và B vào MỌI tấm. Khối C chọn theo tấm đang làm.

---

## KHỐI A · Sự thật sản phẩm

\`\`\`
${khoiA}
\`\`\`

---

## KHỐI A2 · Hồ sơ thị giác

${tgKhoi ? '```\n' + tgKhoi + '\n```' : '_chưa đo — chạy `doc-thi-giac.mjs` trên ảnh gốc rồi truyền `--thi-giac`_'}

---

## KHỐI A3 · Ngôn ngữ thị giác của ngành hàng

${dmKhoi ? '```\n' + dmKhoi + '\n```' : '_chưa nạp — truyền `--ho-so-danh-muc`_'}

---

## KHỐI B · Quy chuẩn lớp chữ

\`\`\`
${khoiB}
\`\`\`

---

## KHỐI C · Mô tả từng tấm

${khoiC}

---

## Kiểm sau khi Stitch trả ảnh

ZOOM từng tấm, đọc mọi chữ và mọi con số, đối chiếu Khối A.
Đọc ảnh thu nhỏ là không đủ — đã từng đọc nhầm 5.1:1 thành 5.3:1 ở cỡ nhỏ.

Cỡ hợp lệ, không chấp nhận bất kỳ cỡ nào khác:
${moiCo.join(' · ')}

- [ ] mọi con số có trong Khối A
- [ ] không ghép thông số hai nhóm cỡ vào một khung
- [ ] không nhắc thứ nằm trong danh sách cấm
- [ ] chữ không đè lên: ${(hs?.khongDeChuDeLen || ['thân sản phẩm']).join(', ')}
- [ ] không quá ba tầng chữ, headline không quá 7 từ
- [ ] không có badge đỏ kiểu giảm giá
- [ ] không tấm nào thành bảng thông số liệt kê
`;

const tepRa = lay('--ra') || 'prompt-stitch.md';
fs.writeFileSync(tepRa, ra);
console.log(`Bảng sự thật: ${moiCo.length} dòng, ${b.bang.length} bảng, ${b.khongDuocNoi.length} điều cấm`);
console.log(`Tấm sinh ra : ${chon.join(', ')}`);
console.log(`Màu nhấn    : ${mauNhan} (tông ${b.tongMau})`);
console.log(`Thị giác    : ${tg ? tg.mauDinhDanh.length + ' màu định danh, bề mặt ' + tg.beMat : 'CHƯA ĐO — prompt sẽ yếu, Stitch phải tự đoán màu'}`);
console.log(`Ngành hàng  : ${hs ? (hs.ngonNguThiGiac?.boiCanhHopLe || []).length + ' bối cảnh hợp lệ, ' + (hs.ngonNguThiGiac?.boiCanhCam || []).length + ' bối cảnh cấm' : 'CHƯA NẠP hồ sơ danh mục'}`);
console.log(`\n-> ${tepRa}`);
