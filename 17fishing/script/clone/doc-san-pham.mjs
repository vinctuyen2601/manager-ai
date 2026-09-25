#!/usr/bin/env node
/**
 * BƯỚC 2a — đọc khối HTML thông tin sản phẩm 1688 thành JSON.
 *
 *   node doc-san-pham.mjs <tệp.html> [--ra thu-muc]
 *
 * Nhận cả trang lưu bằng Ctrl+S lẫn một phần tử copy outerHTML.
 *
 * Ba bẫy đã trả giá, xử lý sẵn ở đây:
 *
 *  1. Khối JSON biến thể LẶP BA LẦN trong trang (bản dựng sẵn + bản hydrate).
 *     Không khử trùng lặp thì 9 biến thể đọc ra thành 27.
 *  2. Ảnh có hậu tố kích thước (.220x220, _b, .search…). Phải bỏ để lấy bản
 *     gốc, không thì tải về ảnh 220px rồi phóng lên vỡ nhoè.
 *  3. Danh sách BÁN CHÉO trong phần mô tả cũng là ảnh cbu01, và trông y hệt
 *     ảnh sản phẩm. Lọc theo mã người bán trong tên tệp mới tách được.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const tep = args.find((a) => !a.startsWith('--'));
const raIdx = args.indexOf('--ra');
if (!tep) {
  console.error('Dùng: node doc-san-pham.mjs <tệp.html> [--ra thu-muc]');
  process.exit(1);
}
const html = fs.readFileSync(tep, 'utf8');

const goc = (u) =>
  String(u || '')
    .replace(/^\/\//, 'https://')
    .replace(/_(b|sum|q\d+)\.jpg$/i, '')
    .replace(/\.(220x220|310x310|400x400|600x600|search|summ)\.(jpg|png|webp)$/i, '.$2');

const chu = (s) =>
  String(s || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

// ── mã sản phẩm ──────────────────────────────────────────────────────────────
const maKhop = html.match(/detail\.1688\.com\/offer\/(\d+)/) || html.match(/offerId"?\s*[:=]\s*"?(\d+)/);
const ma = maKhop ? maKhop[1] : 'khong-ro';

// ── biến thể ────────────────────────────────────────────────────────────────
// Khử trùng lặp theo TÊN biến thể, không theo thứ tự xuất hiện.
const bienThe = new Map();
for (const m of html.matchAll(
  /"([^"]{1,120})":\{"specId":"[^"]+","saleCount":\d+,"discountPrice":"([\d.]+)","canBookCount":(\d+)/g,
)) {
  if (!bienThe.has(m[1])) bienThe.set(m[1], { ten: m[1], giaCNY: Number(m[2]), ton: Number(m[3]) });
}

// Dự phòng: có trang KHÔNG có skuInfoMap. Khi đó danh sách biến thể nằm trong
// một THUỘC TÍNH (thường là 颜色 / 规格), các giá trị ngăn nhau bằng dấu phẩy.
// Đo trên 1051850891681 (cần lăng xê Bennuo): 18 biến thể nằm hết ở 颜色, còn
// skuInfoMap thì không có dòng nào -> bản cũ trả về 0 biến thể mà không báo gì.
//
// Biến thể lấy theo đường này KHÔNG CÓ GIÁ và KHÔNG CÓ TỒN. Phải đánh dấu
// `nguon: 'thuoc-tinh'` để cổng ở bước 4 bắt được và đòi giá từ chỗ khác —
// im lặng gán giá 0 là cách nhanh nhất để đăng nhầm một sản phẩm miễn phí.

// ── thuộc tính ──────────────────────────────────────────────────────────────
const thuocTinh = {};
for (const m of html.matchAll(
  /<th class="ant-descriptions-item-label"[^>]*><span>(.*?)<\/span><\/th><td class="ant-descriptions-item-content"[^>]*><span><span class="field-value">(.*?)<\/span>/gs,
)) {
  thuocTinh[chu(m[1])] = chu(m[2]);
}

if (bienThe.size === 0) {
  const khoaBienThe = ['颜色', '规格', '型号', '尺码', '款式', '套餐'];
  for (const k of khoaBienThe) {
    const v = thuocTinh[k];
    if (!v || !v.includes(',')) continue;
    for (const ten of v.split(',').map((x) => x.trim()).filter(Boolean)) {
      if (!bienThe.has(ten)) bienThe.set(ten, { ten, giaCNY: null, ton: null, nguon: 'thuoc-tinh' });
    }
    if (bienThe.size) break;
  }
}

// ── ảnh ─────────────────────────────────────────────────────────────────────
// Ảnh của CHÍNH người bán mang mã shop trong tên tệp (ví dụ "!!2035807685-").
// Ảnh bán chéo mang mã khác. Đếm tần suất rồi lấy mã phổ biến nhất.
const demMa = new Map();
for (const m of html.matchAll(/cbu01\.alicdn\.com\/img\/ibank\/[^"'\s\\]*?!!(\d+)-/g)) {
  demMa.set(m[1], (demMa.get(m[1]) || 0) + 1);
}
const maShop = [...demMa.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];

// `gif` và `webp` KHÔNG được bỏ. Bản đầu chỉ nhận jpg|png, và khối mô tả của
// cần Bennuo có đúng hai ảnh GIF động (cụm khoen gấp mở, chân máy trượt) —
// hai tấm nói được thứ ảnh tĩnh không nói được, mà bị bỏ lặng lẽ. Không có
// dấu hiệu nào: 66 ảnh rút ra trông thừa thãi nên không ai đi đếm lại.
const anh = [...new Set(
  [...html.matchAll(/https?:\\?\/\\?\/cbu01\.alicdn\.com\/img\/ibank\/[^"'\s\\]+?\.(?:jpg|jpeg|png|gif|webp)/g)]
    .map((m) => goc(m[0].replace(/\\/g, '')))
    .filter((u) => !maShop || u.includes(`!!${maShop}-`)),
)];

// ── video và mô tả ──────────────────────────────────────────────────────────
const video = [...new Set([...html.matchAll(/https:\/\/cloud\.video\.taobao\.com\/[^"'\s]+?\.mp4/g)].map((m) => m[0]))];
const moTaUrl = (html.match(/itemcdn\.tmall\.com\/1688offer\/\w+/) || [])[0];

const ten = (html.match(/<title>(.*?)<\/title>/s) || [])[1];
const xuong = (html.match(/<h1 title="([^"]+)">/) || [])[1];

const ra = {
  ma,
  link: `https://detail.1688.com/offer/${ma}.html`,
  tenGoc: ten ? chu(ten).replace(/\s*-\s*阿里巴巴\s*$/, '') : null,
  xuong: xuong || null,
  thuocTinh,
  bienThe: [...bienThe.values()],
  anh,
  video,
  moTaUrl: moTaUrl ? `https://${moTaUrl}` : null,
};

const thuMuc = raIdx >= 0 ? args[raIdx + 1] : path.join('rut', ma);
fs.mkdirSync(thuMuc, { recursive: true });
fs.writeFileSync(path.join(thuMuc, 'san-pham.json'), JSON.stringify(ra, null, 1));

console.log(`mã        ${ra.ma}`);
console.log(`tên gốc   ${(ra.tenGoc || '').slice(0, 70)}`);
console.log(`xưởng     ${ra.xuong || '(không thấy)'}`);
console.log(`thuộc tính ${Object.keys(thuocTinh).length}`);
const thieuGia = ra.bienThe.filter((b) => b.giaCNY == null).length;
console.log(`biến thể  ${ra.bienThe.length}${thieuGia ? `  ⚠ ${thieuGia} biến thể KHÔNG CÓ GIÁ (lấy từ thuộc tính, không phải skuInfoMap)` : ''}`);
console.log(`ảnh       ${ra.anh.length}  (mã shop ${maShop || '?'})`);
console.log(`video     ${ra.video.length}`);
console.log(`mô tả     ${ra.moTaUrl || `KHÔNG THẤY link itemcdn — kiểm xem ${ra.anh.length} ảnh ở trên đã gồm ảnh mô tả chưa; chưa thì thiếu bảng thông số`}`);
console.log(`\n-> ${path.join(thuMuc, 'san-pham.json')}`);
