#!/usr/bin/env node
/**
 * BƯỚC 4+5 — tạo bản NHÁP sản phẩm từ Bảng sự thật + nội dung đã viết.
 *
 *   node tao-nhap.mjs noi-dung.json [--thu] [--xoa <id>]
 *
 * `--thu` in ra thứ sẽ gửi mà không gửi. Luôn chạy `--thu` trước.
 *
 * BỐN LUẬT CỨNG, script tự ép, không tin vào việc nhớ:
 *
 *  1. Luôn `isActive: false`. Bật là quyết định của chủ shop, không phải của
 *     script. Không có tham số nào bật được từ đây.
 *  2. Mọi ảnh tải lên KÈM TÊN SEO riêng. Trùng tên là dừng hẳn, không tải.
 *  3. Mọi con số trong nội dung phải khớp Bảng sự thật. Lệch là dừng.
 *  4. Có đánh giá thì BẮT BUỘC bật cờ `khongPhaiKhachThat`, nếu không là khai
 *     sao giả cho Google và mất ngôi sao của cả website.
 */
import fs from 'node:fs';
import path from 'node:path';

const API = 'https://api.17-fishing.com/api';
const TOKEN = fs.readFileSync(`${process.env.HOME}/.17fishing-admin-token`, 'utf8').trim();
const args = process.argv.slice(2);
const THU = args.includes('--thu');
const tep = args.find((a) => !a.startsWith('--'));

const xoaIdx = args.indexOf('--xoa');
if (xoaIdx >= 0) {
  const id = args[xoaIdx + 1];
  const r = await fetch(`${API}/admin/products/${id}`, {
    method: 'DELETE', headers: { Authorization: `Bearer ${TOKEN}` },
  });
  console.log('xoá', id, '->', r.status);
  process.exit(r.ok ? 0 : 1);
}
if (!tep) { console.error('Dùng: node tao-nhap.mjs noi-dung.json [--thu]'); process.exit(1); }

const n = JSON.parse(fs.readFileSync(tep, 'utf8'));
const b = n.bangSuThat;
const loi = [];

// ── LUẬT 3 · mọi cỡ nhắc tới phải có trong Bảng sự thật ────────────────────
const moiCo = new Set(b.nhomCo.flatMap((x) => x.co));
const van = JSON.stringify({ d: n.moTa, bd: n.blockData, v: n.bienThe });
// Mẫu mã cỡ lấy từ Bảng sự thật (`mauCo`), khai theo `bienThe.mauMa` của hồ sơ
// danh mục. Bản đầu gõ cứng /[A-Z]{2,4}\d{3,5}/ — đúng với mã cỡ máy câu kiểu
// HA2500, nhưng cần câu ghi cỡ là "3m6" nên phép kiểm thành vô hiệu: không
// khớp gì, không báo gì, và cái bẫy nó sinh ra để chặn (đăng nhầm cỡ không có
// thật) đi qua thoải mái. Đã đăng nhầm cỡ đúng một lần rồi, nên phép kiểm này
// không được phép im lặng.
const mauCo = new RegExp(b.mauCo || '\\b([A-Z]{2,4}\\d{3,5})\\b', 'gi');
let daKhop = 0;
for (const m of van.matchAll(mauCo)) {
  daKhop += 1;
  const co = (m[1] || m[0]).toLowerCase();
  if (![...moiCo].some((x) => String(x).toLowerCase() === co)) {
    loi.push(`mã cỡ KHÔNG có trong Bảng sự thật: ${m[1] || m[0]}`);
  }
}
if (!daKhop) {
  loi.push(`mẫu mã cỡ ${mauCo} không khớp chữ nào trong nội dung — `
    + 'hoặc khai sai mauCo, hoặc nội dung không nhắc tới cỡ nào. Cả hai đều phải sửa.');
}

// ── LUẬT 3b · không nhắc thứ nằm trong danh sách cấm ───────────────────────
for (const cam of b.khongDuocNoi || []) {
  const tu = cam.split('—')[0].split(',').map((x) => x.trim()).filter((x) => x.length > 3);
  for (const t of tu) {
    if (new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(van)) {
      loi.push(`nội dung nhắc tới thứ bị cấm: "${t}"`);
    }
  }
}

// ── LUẬT 2 · tên ảnh phải khác nhau ────────────────────────────────────────
const tenAnh = (n.anh || []).map((a) => a.ten);
const trung = tenAnh.filter((t, i) => tenAnh.indexOf(t) !== i);
if (trung.length) loi.push(`tên ảnh trùng: ${[...new Set(trung)].join(', ')}`);
for (const a of n.anh || []) {
  if (!a.ten || !a.tep) loi.push(`ảnh thiếu tên hoặc đường dẫn: ${JSON.stringify(a)}`);
  else if (!fs.existsSync(a.tep)) loi.push(`không thấy tệp ảnh: ${a.tep}`);
}

// ── LUẬT 4 · có đánh giá thì phải có cờ ────────────────────────────────────
// Cờ này bật LUÔN LUÔN, không phụ thuộc lần clone này có mang đánh giá về
// hay không. Sản phẩm vừa clone thì theo định nghĩa chưa có một khách thật
// nào của shop đánh giá, và đánh giá mồi có thể được gieo từ CMS BẤT CỨ LÚC
// NÀO sau đó — lúc đó không ai quay lại bật cờ.
//
// Đã dính đúng thế với cần Bennuo: clone về 0 đánh giá nên bộ chặn cũ không
// kêu; chủ shop gieo 9 đánh giá mồi lúc bật bán, và trang lập tức khai
// aggregateRating 4,8 sao / 9 đánh giá cho Google. Tệ gấp đôi vì khối đánh
// giá lúc đó đang TẮT: người không đọc được, mà máy vẫn được khai.
n.blockData = n.blockData || {};
n.blockData['danh-gia'] = { ...(n.blockData['danh-gia'] || {}), khongPhaiKhachThat: true };

if (loi.length) {
  console.error(`DỪNG — ${loi.length} lỗi, không gửi gì cả:\n`);
  loi.forEach((x) => console.error('  ·', x));
  process.exit(1);
}
console.log(`kiểm trước khi gửi: ĐẠT (${moiCo.size} cỡ hợp lệ, ${tenAnh.length} ảnh, ${(n.danhGia || []).length} đánh giá)\n`);

if (THU) {
  console.log('--thu: không gửi gì. Sẽ tạo:');
  console.log(`  tên       ${n.ten}`);
  console.log(`  slug      ${n.slug}`);
  console.log(`  giá gốc   ${n.gia?.toLocaleString('vi-VN')}`);
  console.log(`  biến thể  ${(n.bienThe || []).length}`);
  console.log(`  ảnh       ${tenAnh.length}`);
  console.log(`  block bật ${(n.blockOrder || []).filter((x) => x.bat).map((x) => x.loai).join(', ')}`);
  console.log(`  đánh giá  ${(n.danhGia || []).length}`);
  console.log(`  isActive  false  (luôn luôn)`);
  process.exit(0);
}

// ── tải ảnh ────────────────────────────────────────────────────────────────
const url = {};
for (const a of n.anh || []) {
  // KIỂU MIME phải khai tay. `new Blob([buf])` không có `type` thì phần
  // multipart đi lên là `application/octet-stream`, backend lưu đúng chuỗi đó
  // làm Content-Type của tệp trên S3, và CDN trả về y như vậy. Ảnh vẫn tải
  // được bằng curl (200, đủ byte) nên mọi phép kiểm "ảnh sống" đều ĐẠT —
  // nhưng thư viện Media của CMS lọc theo mimeType nên không thấy tấm nào.
  // Đã dính đúng thế với 19 ảnh cần Bennuo, phải tải lại toàn bộ.
  const KIEU = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
                 webp: 'image/webp', gif: 'image/gif' };
  const duoi = path.extname(a.tep).slice(1).toLowerCase();
  if (!KIEU[duoi]) { console.error(`đuôi tệp lạ, không biết kiểu MIME: ${a.tep}`); process.exit(1); }
  const fd = new FormData();
  fd.append('file', new Blob([fs.readFileSync(a.tep)], { type: KIEU[duoi] }), path.basename(a.tep));
  const r = await fetch(`${API}/admin/media/upload?name=${encodeURIComponent(a.ten)}`, {
    method: 'POST', headers: { Authorization: `Bearer ${TOKEN}` }, body: fd,
  });
  if (!r.ok) { console.error('tải ảnh hỏng:', a.ten, r.status); process.exit(1); }
  url[a.khoa] = (await r.json()).url;
  console.log(`  ảnh  ${a.khoa.padEnd(14)} ${url[a.khoa].split('/').pop().slice(0, 52)}`);
}

// Thay khoá ảnh trong nội dung bằng URL thật.
const thay = (o) => JSON.parse(
  JSON.stringify(o).replace(/\{\{anh:([a-z0-9_-]+)\}\}/gi, (m, k) => url[k] || m),
);

// ── tạo sản phẩm ───────────────────────────────────────────────────────────
const than = thay({
  name: n.ten, slug: n.slug, description: n.moTa, price: n.gia, salePrice: 0,
  images: (n.thuVien || []).map((k) => `{{anh:${k}}}`),
  videos: n.video || [],
  categoryId: b.danhMuc, brand: b.thuongHieu, unit: b.donVi,
  weightPerUnit: n.trongLuong || null, stockStatus: b.tongTon || 'in_stock',
  isActive: false, isFeatured: false,          // LUẬT 1 — không tham số nào đổi được
  templateId: n.templateId || 'hang-ky-thuat',
  variants: n.bienThe, blockOrder: n.blockOrder, blockData: n.blockData,
  seoTitle: n.seoTitle, seoDescription: n.seoDescription,
});
const r = await fetch(`${API}/admin/products`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify(than),
});
if (!r.ok) { console.error('tạo sản phẩm hỏng:', r.status, (await r.text()).slice(0, 300)); process.exit(1); }
const sp = await r.json();
console.log(`\nsản phẩm  ${sp.id}  ${sp.slug}  isActive=${sp.isActive}`);

// ── đánh giá ───────────────────────────────────────────────────────────────
// Chèn theo thứ tự ĐẢO: API sắp xếp mới nhất lên đầu, nên cái chèn TRƯỚC sẽ
// nằm CUỐI. Muốn đánh giá chê không đứng đầu trang thì chèn nó trước.
for (const d of [...(n.danhGia || [])].reverse()) {
  const rr = await fetch(`${API}/reviews/admin`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(thay({ ...d, productId: sp.id, images: d.images || [] })),
  });
  console.log(`  đánh giá ${rr.status}  ${d.rating}★ ${d.customerName.slice(0, 34)}`);
  await new Promise((s) => setTimeout(s, 400));
}

// KHÔNG in link /xem-truoc của web. Route đó gọi `getProduct()` -> API công
// khai `/products/:slug`, mà API công khai lọc `isActive`. Sản phẩm vừa tạo
// luôn là nháp, nên link ấy LUÔN 404 — in ra chỉ tổ mất thời gian đi tìm xem
// deploy hỏng hay dữ liệu hỏng. Đã mất một vòng đúng như thế.
// Muốn xem trước thì mở trong CMS: CMS tự đẩy bản nháp vào route đó qua tham
// số `draft`, kèm token, nên nó dựng được cả thứ chưa bật.
console.log(`\nXem thử: CMS > Sản phẩm > ${sp.slug} > nút Xem trước`);
console.log(`Kiểm API: GET /api/admin/products/${sp.id} (kèm token)`);
console.log(`\nCHƯA BẬT. Chạy soi-san-pham.mjs rồi chủ shop tự bật.`);
