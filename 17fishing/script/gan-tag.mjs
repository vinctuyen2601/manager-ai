/**
 * Gắn danh mục + tag chuyên môn cho toàn bộ bài viết.
 *
 * Vì sao cần: đo 15/09/2026, 98/104 bài mang tag "câu cá" và 92/104 mang "kỹ
 * thuật" — hai nhãn có ở gần như mọi bài nên không nói lên điều gì; 65 tag còn
 * lại chỉ xuất hiện 1-2 lần; 104/104 bài KHÔNG có danh mục. Hậu quả: điểm liên
 * quan gần như bằng nhau, "Đọc thêm" xếp theo NGÀY ĐĂNG, 4 bài ôm 89% liên kết.
 *
 * `--thu` xem trước · `--hoan-tac` trả về nguyên trạng.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { chonDanhMuc, chonTag } from './phan-loai.mjs';

const API = 'https://api.17-fishing.com/api';
const TOKEN = readFileSync(process.env.HOME + '/.17fishing-admin-token', 'utf8').trim();
const SAO_LUU = new URL('./tag-cu.json', import.meta.url).pathname;
const THU = process.argv.includes('--thu');
const HOAN_TAC = process.argv.includes('--hoan-tac');

const goi = async (d, o = {}) => {
  const r = await fetch(API + d, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    ...o, ...(o.body ? { body: JSON.stringify(o.body) } : {}),
  });
  const t = await r.text();
  if (!r.ok) throw new Error(`${d} -> ${r.status} ${t.slice(0, 160)}`);
  try { return JSON.parse(t); } catch { return t; }
};

const ds = await goi('/admin/posts?limit=300');
const bai = Array.isArray(ds) ? ds : (ds.data ?? ds.items ?? []);

if (HOAN_TAC) {
  if (!existsSync(SAO_LUU)) { console.log('  Không có bản sao lưu.'); process.exit(1); }
  const cu = JSON.parse(readFileSync(SAO_LUU, 'utf8'));
  for (const [slug, v] of Object.entries(cu)) {
    const p = bai.find((x) => x.slug === slug); if (!p) continue;
    await goi(`/admin/posts/${p.id}`, { method: 'PATCH', body: { tags: v.tags, category: v.category } });
  }
  console.log(`  ↩ đã trả ${Object.keys(cu).length} bài về nguyên trạng`);
  process.exit(0);
}

const viec = [];
for (const p of bai) {
  const { dm, diem } = chonDanhMuc(p);
  const tags = chonTag(p);
  // Không ghi đè bằng dữ liệu RỖNG HƠN: bài không xếp được thì để nguyên,
  // thà giữ tag cũ vô dụng còn hơn xoá trắng rồi không còn gì để lần lại.
  if ((!dm || diem < 3) && tags.length === 0) continue;
  viec.push({ p, dm: diem >= 3 ? dm : (p.category || null), tags, cuTags: p.tags ?? [], cuDm: p.category ?? null });
}

// Hai phép chặn: tag phổ thông quay lại, và tag rỗng hàng loạt
const f = {};
viec.forEach((v) => v.tags.forEach((t) => (f[t] = (f[t] || 0) + 1)));
const phoThong = Object.entries(f).filter(([, n]) => n > bai.length * 0.3);
const rong = viec.filter((v) => v.tags.length === 0).length;
console.log(`  ${viec.length}/${bai.length} bài sẽ cập nhật`);
console.log(`  tag khác nhau: ${Object.keys(f).length} · bài không tag: ${rong}`);
if (phoThong.length) { console.log(`  ✗ có tag ở >30% số bài: ${phoThong.map(([t, n]) => `${t}(${n})`).join(', ')} — DỪNG`); process.exit(1); }
if (rong > bai.length * 0.15) { console.log(`  ✗ quá nhiều bài không tag (${rong}) — DỪNG`); process.exit(1); }
console.log('  ✓ không tag nào phổ thông quá 30%');

const dem = {};
viec.forEach((v) => (dem[v.dm ?? '(giữ nguyên)'] = (dem[v.dm ?? '(giữ nguyên)'] || 0) + 1));
console.log('\n  danh mục:');
Object.entries(dem).sort((a, b) => b[1] - a[1]).forEach(([k, n]) => console.log(`   ${String(n).padStart(3)}  ${k}`));
console.log('\n  5 ví dụ:');
viec.slice(0, 5).forEach((v) => console.log(`   ${v.p.title.slice(0, 46)}\n      [${v.dm}]  ${v.tags.join(' · ')}`));

if (THU) { console.log('\n  --thu: chỉ xem, không ghi.'); process.exit(0); }

writeFileSync(SAO_LUU, JSON.stringify(Object.fromEntries(viec.map((v) => [v.p.slug, { tags: v.cuTags, category: v.cuDm }])), null, 1));
let ok = 0;
for (const v of viec) {
  await goi(`/admin/posts/${v.p.id}`, { method: 'PATCH', body: { tags: v.tags, category: v.dm ?? undefined } });
  ok++;
}
console.log(`\n  ✓ đã ghi ${ok}/${viec.length} bài · bản cũ ở ${SAO_LUU}`);
