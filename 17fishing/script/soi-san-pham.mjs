/**
 * Soi toàn bộ trang sản phẩm 17fishing — 21/09/2026.
 *
 * Danh sách kiểm lấy từ chính những lỗi đã tìm thấy khi review tay trang phao
 * điện. Mỗi mục đều là lỗi ĐÃ XẢY RA THẬT, không phải lo xa:
 *
 *  1. `mo-ta` thiếu hoặc bị tắt → mô tả BIẾN MẤT khỏi trang, chỉ còn trong
 *     JSON-LD, và không có dấu hiệu nào báo
 *  2. có `variants` mà mô tả không dạy chọn → chặn đơn ngay tại bước quyết định
 *  3. con số trong mô tả/FAQ không khớp `variants` → chỉ khách đi tìm thứ
 *     không có (phao điện từng chỉ sang "1.8g" trong khi 5 mức là 1.5–3.5)
 *  4. `cau-kien` tắt hoặc rỗng → mất khối bằng chứng bằng ảnh
 *  5. thứ tự khối lệch khuôn
 *  6. `seoTitle` quá dài hoặc chứa mã model
 *  7. từ thổi phồng, giọng "anh em"
 *  8. gạch chéo trong thông số → đọc thành "hoặc" khi ý là "kèm cả hai"
 */
import { readFileSync } from 'node:fs';
import { kiemGiong } from './_kiemgiong.mjs';

const API = 'https://api.17-fishing.com/api';
const TOKEN = readFileSync(process.env.HOME + '/.17fishing-admin-token', 'utf8').trim();
const goi = async (d) => {
  const r = await fetch(API + d, { headers: { Authorization: `Bearer ${TOKEN}` } });
  if (!r.ok) throw new Error(d + ' -> ' + r.status);
  return r.json();
};

const KHUON = ['uu-dai', 'hero', 'qua-tang', 'mo-ta', 'diem-manh', 'cau-kien',
  'thong-so', 'cau-hoi', 'danh-gia', 'dat-hang', 'huong-dan', 'lien-quan'];

const ds0 = await goi('/products?limit=100');
const ds = Array.isArray(ds0) ? ds0 : (ds0.data ?? []);
const khong = (s) => String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const bang = [];
for (const p0 of ds) {
  const p = await goi('/products/' + p0.slug);
  const bd = p.blockData || {};
  const bo = p.blockOrder || [];
  const bat = new Set(bo.filter((b) => b.bat !== false).map((b) => b.loai));
  const mt = khong(p.description);
  const vs = p.variants ?? [];
  const vb = JSON.stringify(bd, null, 1);
  const loi = [];

  // 1. mô tả
  if (!bo.length) loi.push('blockOrder RỖNG (dùng khuôn mặc định)');
  else if (!bat.has('mo-ta')) loi.push('🔴 KHỐI mo-ta BỊ TẮT — mô tả không hiện');
  if (mt.split(' ').length < 60) loi.push(`mô tả mỏng: ${mt.split(' ').length} từ`);

  // 2+3. phân loại
  if (vs.length > 1) {
    const ten = vs.map((v) => v.name);
    /**
     * So phải CHUẨN HOÁ cả hai vế. Bản đầu so thô và báo động giả 2/3 ca:
     *   biến thể "3,6M" → tìm "3.6" nhưng mô tả viết "3m6"  → báo nhầm
     *   biến thể "ghế + balo" → không có chữ số nào để so   → báo nhầm
     * Nay: đưa 3,6M / 3m6 / 3.6 về cùng một dạng, và với tên không có số thì
     * so bằng TỪ KHOÁ riêng của tên đó.
     */
    const cs = (x) => x.toLowerCase().replace(/,/g, '.').replace(/(\d+)m(\d+)/g, '$1.$2');
    const mtc = cs(mt);
    const nhac = ten.filter((t) => {
      const so = cs(t).match(/\d+(?:\.\d+)?/);
      if (so) return mtc.includes(so[0]);
      // Tên bằng chữ: khớp khi mô tả nhắc ít nhất một từ đặc trưng (>3 ký tự).
      const tu = cs(t).split(/[^a-zà-ỹ]+/).filter((w) => w.length > 3);
      return tu.some((w) => mtc.includes(w));
    });
    /**
     * Phân biệt hai chuyện khác hẳn nhau:
     *   nhắc 0   → mô tả KHÔNG dạy chọn gì cả, chặn đơn — lỗi thật
     *   nhắc một phần → thường là gộp có chủ ý ("7m2 trở lên"), không phải lỗi
     * Bản đầu gộp cả hai thành một cờ đỏ và báo nhầm Strong Bull sau khi đã
     * viết xong mục chọn cỡ cho nó.
     */
    if (nhac.length === 0)
      loi.push(`🔴 ${vs.length} phân loại mà mô tả KHÔNG dạy chọn (${ten.join(', ')})`);
    else if (nhac.length < vs.length)
      loi.push(`· mô tả nhắc ${nhac.length}/${vs.length} phân loại (phần còn lại gộp chung — xem có cố ý không)`);
    // con số lạ trong FAQ
    const faq = JSON.stringify(bd['cau-hoi'] || {});
    const soFaq = [...faq.matchAll(/(\d+[.,]\d+)\s*(?:gram|g\b|m\b|M\b)/g)].map((m) => m[1].replace(',', '.'));
    const soVar = ten.map((t) => (t.match(/[\d.,]+/) || [''])[0].replace(',', '.'));
    const la = [...new Set(soFaq)].filter((x) => !soVar.includes(x));
    if (la.length) loi.push(`FAQ nhắc số không có trong phân loại: ${la.join(', ')}`);
  }

  // 4. cấu kiện
  const ck = bd['cau-kien']?.items ?? [];
  if (!bat.has('cau-kien')) loi.push('thiếu/tắt khối cau-kien (chi tiết bộ phận)');
  else if (!ck.length) loi.push('khối cau-kien BẬT mà RỖNG');
  else if (ck.some((x) => !x.anh)) loi.push(`cau-kien có ${ck.filter((x) => !x.anh).length}/${ck.length} mục thiếu ảnh`);

  // 5. thứ tự
  const tt = bo.map((b) => b.loai).filter((l) => KHUON.includes(l));
  const chuan = KHUON.filter((l) => tt.includes(l));
  if (bo.length && tt.join() !== chuan.join()) loi.push('thứ tự khối lệch khuôn');

  // 6. SEO
  if ((p.seoTitle || '').length > 48) loi.push(`seoTitle ${p.seoTitle.length} ký tự (>48)`);
  if (!p.seoTitle) loi.push('thiếu seoTitle');
  if (/\b[A-Z]{1,3}-?\d{2,}\b/.test(p.seoTitle || '')) loi.push('seoTitle chứa mã model');
  if (!p.seoDescription) loi.push('thiếu seoDescription');

  // 7. giọng
  const g = kiemGiong(String(p.description || '') + ' ' + vb.replace(/\\n/g, '. '));
  if (g.loi.length) loi.push('giọng: ' + g.loi.join('; '));
  if (/anh em/i.test(vb + mt)) loi.push('còn "anh em"');

  // 8. gạch chéo trong thông số
  const ts = JSON.stringify(bd['thong-so'] || {});
  const gc = [...ts.matchAll(/([^\\",:]{4,28}\s\/\s[^\\",]{4,28})/g)].map((m) => m[1].trim());
  if (gc.length) loi.push(`thông số có gạch chéo (đọc thành "hoặc"): ${gc.slice(0, 2).join(' | ')}`);

  bang.push({
    ten: p.name, slug: p.slug, loi,
    soTu: mt.split(' ').length, bienThe: vs.length,
    anh: (p.images ?? []).length, video: (p.videos ?? []).length,
    nx: p.reviewCount ?? 0, khoi: bo.length,
  });
}

bang.sort((a, b) => b.loi.length - a.loi.length);
console.log('═══ SOI 10 TRANG SẢN PHẨM 17FISHING ═══\n');
for (const x of bang) {
  console.log(`${x.loi.length ? '✗' : '✓'} ${x.ten.slice(0, 58)}`);
  console.log(`    ${x.soTu} từ · ${x.bienThe} phân loại · ${x.anh} ảnh · ${x.video} video · ${x.nx} nhận xét · ${x.khoi} khối`);
  x.loi.forEach((l) => console.log(`      • ${l}`));
  console.log();
}
const tong = {};
bang.forEach((x) => x.loi.forEach((l) => { const k = l.split(':')[0].replace(/\d+/g, 'N'); tong[k] = (tong[k] || 0) + 1; }));
console.log('── TỔNG HỢP ──');
Object.entries(tong).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(2)}  ${k}`));
console.log(`\n  sạch hoàn toàn: ${bang.filter((x) => !x.loi.length).length}/${bang.length}`);
console.log(`  không có video: ${bang.filter((x) => !x.video).length}/${bang.length}`);
