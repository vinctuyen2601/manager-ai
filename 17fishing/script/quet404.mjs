import { readFileSync } from 'node:fs';
const r = JSON.parse(readFileSync('trang.json', 'utf8'));
const ds = (Array.isArray(r) ? r : (r.data || r.rows || [])).map((p) => ({
  u: (p.trang || p.page || p.url || ''),
  ht: Number(p.hienThi ?? p.impressions ?? 0),
  nh: Number(p.nhap ?? p.clicks ?? 0),
  hang: Number(p.viTri ?? p.position ?? 0),
})).filter((p) => p.u);

const chet = [];
let ok = 0;
for (let i = 0; i < ds.length; i += 6) {
  await Promise.all(ds.slice(i, i + 6).map(async (p) => {
    try {
      const res = await fetch(p.u, { redirect: 'manual' });
      // Next trả 200 kèm nội dung 404 ở một số đường, nên soi cả thẻ title
      const h = res.status === 200 ? await res.text() : '';
      const la404 = res.status === 404 || /<title>404/.test(h);
      if (la404 || res.status >= 300) chet.push({ ...p, ma: res.status, la404 });
      else ok++;
    } catch { chet.push({ ...p, ma: 'LỖI', la404: false }); }
  }));
}
chet.sort((a, b) => b.ht - a.ht);
console.log(`  ${ok}/${ds.length} trang sống · ${chet.length} trang CHẾT hoặc chuyển hướng\n`);
let mat = 0;
for (const p of chet) {
  mat += p.nh;
  console.log(`   ${String(p.ht).padStart(4)} ht ${String(p.nh).padStart(3)} nh  hạng ${p.hang.toFixed(1).padStart(4)}  [${p.ma}${p.la404 ? ' 404' : ''}]  ${p.u.replace('https://17-fishing.com', '')}`);
}
console.log(`\n  Tổng lưu lượng đang đổ vào trang chết: ${chet.reduce((s, p) => s + p.ht, 0)} hiển thị, ${mat} nhấp/90 ngày`);
