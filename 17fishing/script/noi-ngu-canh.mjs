/**
 * Thêm liên kết NGỮ CẢNH vào thân bài.
 *
 * Vì sao: đo 15/09/2026, blog có 416 liên kết bài-với-bài nhưng TẤT CẢ đều do
 * khối "Đọc thêm" dựng ra — chỉ 3/104 bài có link nằm trong câu văn. Google
 * giảm trọng số liên kết khuôn vì chúng lặp y hệt trên mọi trang; liên kết
 * giữa câu văn mới tính đủ.
 *
 * Sáu luật để không biến bài viết thành rừng link:
 *   1. Mỗi cụm MỘT bài đại diện: có cụm trong tiêu đề, nhiều hiển thị nhất.
 *   2. Chỉ nối LẦN NHẮC ĐẦU TIÊN trong mỗi bài.
 *   3. Tối đa 3 link/bài nguồn, và mỗi bài đích nhận tối đa 10 link.
 *   4. Chỉ nối khi CÙNG DANH MỤC, hoặc cụm đủ HẸP (tag của <= 8 bài). Không có
 *      luật này thì "trắm đen" trong một bài về gác cần lại trỏ sang bài phao.
 *   5. Bỏ qua chỗ nằm trong <a> hoặc trong tiêu đề <h*>.
 *   6. Cụm DÀI nối trước, để "phao câu" không nuốt mất "phao câu đài".
 *
 * `--thu` xem trước · `--hoan-tac` trả nội dung về nguyên trạng.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const API = 'https://api.17-fishing.com/api';
const TOKEN = readFileSync(process.env.HOME + '/.17fishing-admin-token', 'utf8').trim();
const SAO_LUU = new URL('./noi-dung-truoc-khi-noi.json', import.meta.url).pathname;
const THU = process.argv.includes('--thu');
const HOAN_TAC = process.argv.includes('--hoan-tac');
const TOI_DA_MOI_BAI = 3, TOI_DA_NHAN = 10, CUM_HEP = 8;

const goi = async (d, o = {}) => {
  const r = await fetch(API + d, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    ...o, ...(o.body ? { body: JSON.stringify(o.body) } : {}),
  });
  const t = await r.text();
  if (!r.ok) throw new Error(`${d} -> ${r.status} ${t.slice(0, 160)}`);
  try { return JSON.parse(t); } catch { return t; }
};

const raw = await goi('/admin/posts?limit=300');
const tatCa = Array.isArray(raw) ? raw : (raw.data ?? raw.items ?? []);
const ds = tatCa.filter((p) => p.status === 'published');

if (HOAN_TAC) {
  if (!existsSync(SAO_LUU)) { console.log('  Không có bản sao lưu.'); process.exit(1); }
  const cu = JSON.parse(readFileSync(SAO_LUU, 'utf8'));
  for (const [slug, content] of Object.entries(cu)) {
    const p = tatCa.find((x) => x.slug === slug); if (!p) continue;
    await goi(`/admin/posts/${p.id}`, { method: 'PATCH', body: { content } });
  }
  console.log(`  ↩ đã trả ${Object.keys(cu).length} bài về nguyên trạng`);
  process.exit(0);
}

const tr = JSON.parse(readFileSync(new URL('./trang.json', import.meta.url).pathname, 'utf8'));
const ht = Object.fromEntries((Array.isArray(tr) ? tr : (tr.data || tr.rows || []))
  .map((p) => [(p.trang || p.page || p.url || '').split('/blog/')[1], +(p.hienThi ?? p.impressions ?? 0)]));
const bo = (s) => String(s || '').normalize('NFC').toLowerCase();

const tanSuatCum = {};
ds.forEach((p) => (p.tags || []).forEach((t) => (tanSuatCum[t] = (tanSuatCum[t] || 0) + 1)));

const daiDien = {};
for (const c of Object.keys(tanSuatCum)) {
  const uv = ds.filter((p) => bo(p.title).includes(c)).sort((a, b) => (ht[b.slug] ?? 0) - (ht[a.slug] ?? 0));
  if (uv.length) daiDien[c] = uv[0];
}
const theoDoDai = Object.keys(daiDien).sort((a, b) => b.length - a.length);

const nhan = {};
const keHoach = [];
for (const p of ds) {
  const c = p.content || '';
  const che = c.replace(/<a[^>]*>[\s\S]*?<\/a>/g, (m) => ' '.repeat(m.length))
               .replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/g, (m) => ' '.repeat(m.length));
  const cheBo = bo(che);
  // Chỉ số tính trên chuỗi đã hạ chữ thường phải trùng chuỗi gốc, nếu không
  // sẽ chèn lệch vị trí và làm hỏng HTML.
  if (cheBo.length !== c.length) { console.log(`   ⚠ bỏ qua ${p.slug} — độ dài lệch sau khi hạ chữ`); continue; }
  const daCo = new Set([...c.matchAll(/href="\/blog\/([a-z0-9-]+)"/g)].map((m) => m[1]));
  const noi = [];
  for (const cum of theoDoDai) {
    if (noi.length >= TOI_DA_MOI_BAI) break;
    const dich = daiDien[cum];
    if (dich.slug === p.slug || daCo.has(dich.slug)) continue;
    if ((nhan[dich.slug] ?? 0) >= TOI_DA_NHAN) continue;
    const hep = (tanSuatCum[cum] ?? 99) <= CUM_HEP;
    if (!hep && dich.category !== p.category) continue;
    const i = cheBo.indexOf(cum);
    if (i < 0) continue;
    if (noi.some((n) => Math.abs(n.i - i) < 200)) continue;
    noi.push({ cum, i, dich: dich.slug, tit: dich.title });
    nhan[dich.slug] = (nhan[dich.slug] ?? 0) + 1;
  }
  if (noi.length) keHoach.push({ p, noi });
}

const tong = keHoach.reduce((s, k) => s + k.noi.length, 0);
const xep = Object.entries(nhan).sort((a, b) => b[1] - a[1]);
console.log(`  ${keHoach.length}/${ds.length} bài được thêm · ${tong} link ngữ cảnh (hiện có 3)`);
console.log(`  ${xep.length} bài nhận link · nhiều nhất ${xep[0]?.[1] ?? 0} · 4 bài đầu ôm ${Math.round(xep.slice(0,4).reduce((s,[,n])=>s+n,0)/tong*100)}%`);
console.log('\n  6 ví dụ:');
keHoach.slice(0, 6).forEach((k) => {
  console.log(`   ${k.p.title.slice(0, 46)}  [${k.p.category}]`);
  k.noi.forEach((n) => console.log(`      "${n.cum}" → ${n.tit.slice(0, 42)}`));
});
if (THU) { console.log('\n  --thu: chỉ xem, không ghi.'); process.exit(0); }

writeFileSync(SAO_LUU, JSON.stringify(Object.fromEntries(keHoach.map((k) => [k.p.slug, k.p.content])), null, 1));
let ok = 0;
for (const k of keHoach) {
  // Chèn từ CUỐI lên ĐẦU để chỉ số phía trước không bị xê dịch.
  let c = k.p.content;
  for (const n of [...k.noi].sort((a, b) => b.i - a.i)) {
    c = c.slice(0, n.i) + `<a href="/blog/${n.dich}">` + c.slice(n.i, n.i + n.cum.length) + '</a>' + c.slice(n.i + n.cum.length);
  }
  await goi(`/admin/posts/${k.p.id}`, { method: 'PATCH', body: { content: c } });
  ok++;
}
console.log(`\n  ✓ đã ghi ${ok}/${keHoach.length} bài · bản cũ ở ${SAO_LUU}`);
