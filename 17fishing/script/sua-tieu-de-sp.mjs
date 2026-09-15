/**
 * Rút seoTitle của 7 sản phẩm đang vượt khung hiển thị của Google.
 *
 * Trang sản phẩm là nhóm ĐÁNG GIÁ NHẤT của site: CTR 8,8% so với 1,3% của blog.
 * Nên chỗ này tràn tiêu đề tốn hơn hẳn chỗ khác.
 *
 * Hai thứ bỏ đi trong lúc rút:
 *   - dấu "|" nằm trong tiêu đề: khuôn title đã thêm một dấu "|" nữa, thành ra
 *     kết quả tìm kiếm có hai dấu gạch, trông như lỗi
 *   - dấu "&": thoát thành "&amp;" trong HTML, đo thấy hiện nguyên xi trên trang
 *
 * Hoàn tác: node sua-tieu-de-sp.mjs --hoan-tac
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const API = 'https://api.17-fishing.com/api';
const TOKEN = readFileSync(process.env.HOME + '/.17fishing-admin-token', 'utf8').trim();
const TOI_DA = 48;
const SAO_LUU = new URL('./tieu-de-sp-cu.json', import.meta.url).pathname;
const HOAN_TAC = process.argv.includes('--hoan-tac');
const THU = process.argv.includes('--thu');

const MOI = {
  'phao-nano-chuanze-x-master-1-6g':              'Phao Nano Chuanze X Master 1.6g Siêu Nhạy',
  'luoi-cau-carbon-iseni-ban-nang-cap':           'Lưỡi Câu Carbon ISENI - Chống Tuột Cá',
  'phao-nano-cao-cap-ngoc-lien-son':              'Phao Nano Ngọc Liên Sơn - Chuyên Săn Chép',
  'cuoc-cau-dai-chuanze-chinh-hang-dai-ben-nhay': 'Cước Câu Đài Chuanze - Bền, Nhạy, Không Rối',
  'ghe-cau-ca-zhongzhou-cao-cap-gap-gon-3-che-do-nga': 'Ghế Câu Cá Zhongzhou - Gấp Gọn, 3 Chế Độ Ngả',
  'can-cau-carbon-thanh-long-chan-thien-nhe-nhay': 'Cần Câu Carbon Thanh Long Chấn Thiên Nhẹ Nhạy',
  'tui-sdung-phu-kien-zkai':                      'Túi Đựng Phụ Kiện ZKAI EVO Chống Nước',
};

const goi = async (duong, opt = {}) => {
  const r = await fetch(API + duong, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    ...opt, ...(opt.body ? { body: JSON.stringify(opt.body) } : {}),
  });
  const t = await r.text();
  if (!r.ok) throw new Error(`${opt.method || 'GET'} ${duong} -> ${r.status} ${t.slice(0, 180)}`);
  try { return JSON.parse(t); } catch { return t; }
};

const ds = await goi('/admin/products');
const sp = Array.isArray(ds) ? ds : (ds.data ?? []);
const theoSlug = Object.fromEntries(sp.map((p) => [p.slug, p]));

if (HOAN_TAC) {
  if (!existsSync(SAO_LUU)) { console.log('  Không có bản sao lưu.'); process.exit(1); }
  for (const [slug, seoTitle] of Object.entries(JSON.parse(readFileSync(SAO_LUU, 'utf8')))) {
    const p = theoSlug[slug]; if (!p) continue;
    await goi(`/admin/products/${p.id}`, { method: 'PATCH', body: { seoTitle } });
    console.log(`   ↩ ${slug}`);
  }
  process.exit(0);
}

let loi = 0; const viec = [];
for (const [slug, moi] of Object.entries(MOI)) {
  const p = theoSlug[slug];
  if (!p) { console.log(`   ✗ KHÔNG TÌM THẤY: ${slug}`); loi++; continue; }
  if (moi.length > TOI_DA) { console.log(`   ✗ DÀI ${moi.length}: ${moi}`); loi++; continue; }
  if (/[|&]/.test(moi)) { console.log(`   ✗ CÒN | hoặc &: ${moi}`); loi++; continue; }
  viec.push({ p, slug, moi, cu: p.seoTitle ?? null });
}
console.log(`\n  ${viec.length} hợp lệ · ${loi} lỗi`);
if (loi) { console.log('  Dừng, không ghi gì.'); process.exit(1); }
viec.forEach((v) => console.log(`   (${String(v.cu?.length ?? 0).padStart(2)}→${String(v.moi.length).padStart(2)})  ${v.cu}\n              ${v.moi}`));
if (THU) { console.log('\n  --thu: chỉ xem.'); process.exit(0); }

writeFileSync(SAO_LUU, JSON.stringify(Object.fromEntries(viec.map((v) => [v.slug, v.cu])), null, 1));
for (const v of viec) await goi(`/admin/products/${v.p.id}`, { method: 'PATCH', body: { seoTitle: v.moi } });
console.log(`\n  ✓ đã ghi ${viec.length} sản phẩm · bản cũ ở ${SAO_LUU}`);
