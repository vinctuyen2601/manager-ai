#!/usr/bin/env node
/**
 * Bốn phép canh hằng ngày cho cả hai shop.
 *
 * IM LẶNG KHI TRONG NGƯỠNG. Thoát mã 0 và không in gì là bình thường — báo cáo
 * rỗng làm hỏng lòng tin nhanh hơn không báo cáo. Có vấn đề thì in ra và thoát
 * mã 1, để lịch chạy tự động biết mà gửi thông báo.
 *
 * Bốn thứ này đều là lỗi ĐÃ xảy ra thật, nên chúng lặp lại được:
 *   1. URL trong sitemap trả 404 — sitemap là lời mời Google đi đọc, mời vào
 *      ngõ cụt thì Google coi sitemap kém tin cậy hơn
 *   2. Liên kết nội bộ trỏ vào trang chuyển hướng — đã đo ra 32/260 bên GaRutin
 *   3. API chết — CloudFront cắt ở 30 giây và trả HTML 504 không kèm log
 *   4. Sitemap lâu không được Google đọc — 17fishing từng 3,5 tháng không ai biết
 *
 * KHÔNG đo thứ hạng ở đây. Search Console trễ 2 ngày và dao động ngày lớn hơn
 * xu hướng thật; đo hằng ngày chỉ sinh báo động giả.
 *
 * Chạy:  node canh-hang-ngay.mjs
 * Cần:   ~/.garutin-admin-token và ~/.17fishing-admin-token
 */
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';

const SHOP = [
  { ten: 'GaRutin', web: 'https://garutin.com', api: 'https://api.garutin.com/api', token: '.garutin-admin-token' },
  { ten: '17fishing', web: 'https://17-fishing.com', api: 'https://api.17-fishing.com/api', token: '.17fishing-admin-token' },
];
const NGUONG_NGAY_SITEMAP = 14;

const canhBao = [];
const doc = (f) => { try { return readFileSync(`${homedir()}/${f}`, 'utf8').trim(); } catch { return null; } };

async function lay(url, opt = {}) {
  const c = AbortSignal.timeout(25_000);
  return fetch(url, { ...opt, signal: c });
}

for (const s of SHOP) {
  const tok = doc(s.token);
  if (!tok) { canhBao.push(`${s.ten}: thiếu ~/${s.token}, không canh được`); continue; }
  const H = { Authorization: `Bearer ${tok}` };

  // 1 — web và API còn sống
  try {
    const r = await lay(s.web);
    if (r.status >= 500) canhBao.push(`${s.ten}: web trả ${r.status}`);
  } catch (e) { canhBao.push(`${s.ten}: web không truy cập được — ${e.message}`); }

  // 2 — URL trong sitemap trả 404
  let urls = [];
  try {
    const xml = await (await lay(`${s.web}/sitemap.xml`)).text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    if (!urls.length) canhBao.push(`${s.ten}: sitemap rỗng hoặc không đọc được`);
  } catch (e) { canhBao.push(`${s.ten}: không tải được sitemap — ${e.message}`); }

  const hong = [];
  // Chạy song song từng lô 8: tuần tự 120 URL là vài phút, quá lâu cho việc chạy hằng ngày.
  for (let i = 0; i < urls.length; i += 8) {
    const lo = await Promise.all(urls.slice(i, i + 8).map(async (u) => {
      try { return [(await lay(u, { method: 'HEAD' })).status, u]; } catch { return [0, u]; }
    }));
    lo.forEach(([c, u]) => { if (c === 404 || c >= 500) hong.push(`${c} ${u}`); });
  }
  if (hong.length) canhBao.push(`${s.ten}: ${hong.length} URL trong sitemap hỏng\n    ` + hong.slice(0, 5).join('\n    '));

  // 3 — liên kết nội bộ trỏ vào trang đã gộp
  try {
    const po = await (await lay(`${s.api}/admin/posts?limit=300`, { headers: H })).json();
    const ds = Array.isArray(po) ? po : (po.data ?? po.items ?? []);
    const ch = {}; ds.filter((p) => p.redirectTo).forEach((p) => { ch[p.slug] = p.redirectTo; });
    if (Object.keys(ch).length) {
      const song = ds.filter((p) => p.status === 'published' && !p.redirectTo);
      let gay = 0;
      for (const b of song) {
        const p = await (await lay(`${s.api}/posts/${b.slug}`, { headers: H })).json().catch(() => null);
        if (!p?.content) continue;
        [...String(p.content).matchAll(/href="\/blog\/([a-z0-9-]+)"/g)].forEach((m) => { if (ch[m[1]]) gay++; });
      }
      if (gay) canhBao.push(`${s.ten}: ${gay} liên kết nội bộ trỏ vào trang chuyển hướng`);
    }
  } catch (e) { canhBao.push(`${s.ten}: không rà được liên kết nội bộ — ${e.message}`); }

  // 4 — Google có còn đọc sitemap không
  try {
    const sm = await (await lay(`${s.api}/admin/keywords/sitemap`, { headers: H })).json();
    if (Array.isArray(sm)) {
      for (const x of sm) {
        if (Number(x.coLoi) > 0) canhBao.push(`${s.ten}: sitemap có ${x.coLoi} lỗi theo Search Console`);
        if (!x.lanCuoiTaiVe) { canhBao.push(`${s.ten}: Google chưa từng tải sitemap`); continue; }
        const ngay = Math.floor((Date.now() - new Date(x.lanCuoiTaiVe)) / 86400_000);
        if (ngay > NGUONG_NGAY_SITEMAP) canhBao.push(`${s.ten}: Google chưa đọc sitemap ${ngay} ngày — gửi lại trong Search Console`);
      }
    }
  } catch { /* endpoint chưa có ở shop này thì bỏ qua, không phải lỗi */ }
}

if (!canhBao.length) process.exit(0);   // im lặng
console.log(`⚠ CANH HẰNG NGÀY — ${new Date().toLocaleString('vi-VN')}\n`);
canhBao.forEach((c) => console.log('  • ' + c));
process.exit(1);
