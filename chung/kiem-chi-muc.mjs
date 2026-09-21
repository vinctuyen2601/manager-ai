/**
 * Quét chỉ mục Google cho MỘT shop. Dùng: node _idx.mjs 17fishing|garutin
 *
 * Gộp hai script cũ (_idx17b.mjs và _idxga3.mjs) làm một — hai bản chỉ khác
 * tên miền và tệp khoá, mà đã trôi dạt: bản GaRutin dùng lô 10, bản 17fishing
 * lô 4. Lô 10 VƯỢT trần 30 giây của CloudFront và trả 504 HTML, log ứng dụng
 * không ghi gì. Nay cả hai dùng lô 4.
 *
 * Thêm TRANG DANH MỤC vào danh sách quét — hai bản cũ đều bỏ sót. Với
 * 17fishing đó lại đúng loại trang đang được nhắm cho các truy vấn "mua …",
 * và vừa viết nội dung cho chúng 21/09.
 *
 * LỌC `redirectTo`: bài đã gộp không có URL riêng để lập chỉ mục; để lại thì
 * phồng nhóm "Google không biết tới" và mọi tỉ lệ đều sai.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const SHOP = process.argv[2];
const CAU_HINH = {
  '17fishing': { api: 'https://api.17-fishing.com/api', site: 'https://17-fishing.com', khoa: '.17fishing-admin-token' },
  garutin:     { api: 'https://api.garutin.com/api',    site: 'https://garutin.com',    khoa: '.garutin-admin-token' },
};
const c = CAU_HINH[SHOP];
if (!c) { console.error('Dùng: node _idx.mjs 17fishing|garutin'); process.exit(1); }

const H = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${readFileSync(process.env.HOME + '/' + c.khoa, 'utf8').trim()}`,
};
const g = async (d) => {
  const r = await fetch(c.api + d, { headers: H });
  if (!r.ok) throw new Error(`${d} -> ${r.status}`);
  return r.json();
};

const po = await g('/admin/posts?limit=300');
const bai = (Array.isArray(po) ? po : (po.data ?? po.items ?? []))
  .filter((p) => p.status === 'published' && !p.redirectTo);
const sp0 = await g('/admin/products');
const sp = (Array.isArray(sp0) ? sp0 : (sp0.data ?? []))
  .filter((p) => p.isActive !== false && !p.deletedAt && !p.isGift);
const dm = (await g('/categories')).filter((x) => x.slug !== 'all' && x.isActive !== false);

const urls = [
  ['trang', `${c.site}/`],
  ['trang', `${c.site}/san-pham`],
  ['trang', `${c.site}/blog`],
  ...dm.map((x) => ['danh mục', `${c.site}/san-pham?cat=${x.slug}`]),
  ...sp.map((p) => ['sản phẩm', `${c.site}/san-pham/${p.slug}`]),
  ...bai.map((b) => ['bài', `${c.site}/blog/${b.slug}`]),
];

const LO = 4; // lô 10 vượt trần 30 giây của CloudFront → 504 HTML, không log gì
console.error(`${SHOP}: quét ${urls.length} URL (${bai.length} bài · ${sp.length} sp · ${dm.length} danh mục), lô ${LO}…`);
const kq = [];
const hong = [];
for (let i = 0; i < urls.length; i += LO) {
  process.stderr.write(`  ${i}/${urls.length}\r`);
  const r = await fetch(c.api + '/admin/keywords/kiem-chi-muc', {
    method: 'POST', headers: H,
    body: JSON.stringify({ urls: urls.slice(i, i + LO).map((x) => x[1]) }),
  });
  const t = await r.text();
  if (!r.ok) { hong.push(`lô ${i}: HTTP ${r.status}`); continue; }
  try { JSON.parse(t).forEach((x, j) => kq.push({ ...x, loai: urls[i + j][0] })); }
  catch { hong.push(`lô ${i}: không phải JSON`); }
}
process.stderr.write('                    \r');
writeFileSync(`_idx-${SHOP}.json`, JSON.stringify(kq, null, 1));

/**
 * API trả trạng thái bằng TIẾNG VIỆT, không phải tiếng Anh.
 *
 * Bản cũ dò `/submitted and indexed|URL is on Google/i` nên KHÔNG khớp gì cả
 * và báo "đã vào chỉ mục: 0 (0%)" ở cả hai lần đo 18/09 và 21/09 — trong khi
 * số thật là 82% và 32%. Bảng phân nhóm ngay bên trên lại đúng, vì nó nhóm
 * theo chuỗi thô. Hai con số cạnh nhau, một đúng một sai, mà không có gì báo.
 *
 * Số thật lấy được chỉ bằng cách đọc các giá trị `trangThai` CÓ THẬT trong dữ
 * liệu trả về, đừng đoán chuỗi.
 */
const VAO = /Đã được gửi và lập chỉ mục|submitted and indexed|URL is on Google/i;
const nhom = {};
kq.forEach((x) => {
  const k = x.loi ? 'LỖI: ' + String(x.loi).slice(0, 34) : (x.trangThai || '(trống)');
  (nhom[k] = nhom[k] || []).push(x);
});
const dem = (v, l) => v.filter((x) => x.loai === l).length;

console.log(`\n═══ CHỈ MỤC ${c.site} ═══\n`);
Object.entries(nhom).sort((a, b) => b[1].length - a[1].length).forEach(([k, v]) =>
  console.log(`  ${String(v.length).padStart(3)}  ${k.padEnd(46)} ${dem(v, 'bài')} bài · ${dem(v, 'sản phẩm')} sp · ${dem(v, 'danh mục')} dm · ${dem(v, 'trang')} trang`));

const oke = kq.filter((x) => VAO.test(String(x.trangThai || '')));
console.log(`\n  quét được ${kq.length}/${urls.length}${hong.length ? '  (hỏng: ' + hong.join(', ') + ')' : ''}`);
console.log(`  đã vào chỉ mục: ${oke.length}/${kq.length} = ${kq.length ? (oke.length / kq.length * 100).toFixed(0) : 0}%`);
for (const l of ['sản phẩm', 'danh mục', 'bài', 'trang']) {
  const t = kq.filter((x) => x.loai === l);
  const o = t.filter((x) => VAO.test(String(x.trangThai || '')));
  if (t.length) console.log(`     ${l.padEnd(9)} ${o.length}/${t.length}`);
}
const ngoai = kq.filter((x) => !VAO.test(String(x.trangThai || '')) && (x.loai === 'sản phẩm' || x.loai === 'danh mục'));
if (ngoai.length) {
  console.log('\n  SẢN PHẨM / DANH MỤC chưa vào chỉ mục:');
  ngoai.forEach((x) => console.log(`     ${(x.trangThai || x.loi || '?').toString().slice(0, 38).padEnd(40)} ${String(x.url).replace(c.site, '')}`));
}
