/**
 * Sửa một liên kết nội bộ gãy trong nội dung bài, và đặt seoTitle đúng cho bài
 * bị gán nhầm tên.
 *
 * Chỉ thay ĐÚNG đường dẫn, chặn ở dấu nháy — không khớp chuỗi con. Nếu khớp
 * chuỗi con thì "/blog/ky-thuat-cau-ca" sẽ nuốt luôn
 * "/blog/ky-thuat-cau-ca-me-khi-thoi-tiet-chuyen-thu".
 */
import { readFileSync, writeFileSync } from 'node:fs';
const API = 'https://api.17-fishing.com/api';
const TOKEN = readFileSync(process.env.HOME + '/.17fishing-admin-token', 'utf8').trim();
const goi = async (d, o = {}) => {
  const r = await fetch(API + d, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` }, ...o, ...(o.body ? { body: JSON.stringify(o.body) } : {}) });
  const t = await r.text(); if (!r.ok) throw new Error(`${d} -> ${r.status} ${t.slice(0, 150)}`);
  try { return JSON.parse(t); } catch { return t; }
};
const ds = await goi('/admin/posts?limit=300');
const bai = Array.isArray(ds) ? ds : (ds.data ?? ds.items ?? []);
const tim = (s) => bai.find((p) => p.slug === s);

// 1. Liên kết "bài viết khác" trỏ vào /blog/ky-thuat-cau-ca (404).
//    Đoạn văn hứa "các loại phao câu đài và cách chọn phao" — có đúng một bài.
const p = tim('chon-phao-cau-dai-chuan-nhat');
const CU = '/blog/ky-thuat-cau-ca', MOI = '/blog/cac-dang-phao-cau-dai-co-ban-va-ung-dung-khi-di-cau';
const re = new RegExp(CU.replace(/-/g, '\\-') + '(?=["\'#?<\\s])', 'g');
const truoc = (p.content.match(re) || []).length;
if (truoc !== 1) { console.log(`  ✗ tìm thấy ${truoc} lần, mong đợi 1. Dừng.`); process.exit(1); }
writeFileSync(new URL('./noi-dung-cu.json', import.meta.url).pathname, JSON.stringify({ [p.slug]: p.content }));
await goi(`/admin/posts/${p.id}`, { method: 'PATCH', body: { content: p.content.replace(re, MOI) } });
console.log(`  ✓ ${p.slug}: ${CU} → ${MOI.slice(0, 44)}…`);

// 2. Bài Phần 2 bị gán nhầm "câu đơn" — nội dung toàn câu đài. Đặt seoTitle đúng.
const p2 = tim('kinh-nghiem-lua-chon-do-nghe-cau-don-phan-2');
await goi(`/admin/posts/${p2.id}`, { method: 'PATCH', body: { seoTitle: 'Đồ nghề câu đài phần 2: rọng, cần, gác cần' } });
console.log(`  ✓ ${p2.slug}: seoTitle → "Đồ nghề câu đài phần 2: rọng, cần, gác cần"`);
