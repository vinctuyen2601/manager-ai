const B = 'https://17-fishing.com';
const sm = await (await fetch(B + '/sitemap.xml')).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
// Lấy mẫu: trang chủ, danh sách, và 25 bài
const mau = [B + '/', B + '/san-pham', B + '/blog', ...urls.filter((u) => u.includes('/blog/')).slice(0, 25)];
const ra = new Set();
for (let i = 0; i < mau.length; i += 5) {
  await Promise.all(mau.slice(i, i + 5).map(async (u) => {
    const h = await (await fetch(u)).text();
    [...h.matchAll(/href="(\/[^"#?]*)"/g)].forEach((m) => ra.add(m[1]));
  }));
}
const ds = [...ra].filter((u) => u !== '/' && !u.startsWith('//'));
console.log(`  thu được ${ds.length} đường dẫn nội bộ khác nhau từ ${mau.length} trang`);
const gay = [];
for (let i = 0; i < ds.length; i += 8) {
  await Promise.all(ds.slice(i, i + 8).map(async (u) => {
    try {
      const r = await fetch(B + u, { redirect: 'manual' });
      if (r.status >= 400) gay.push([u, r.status]);
      else if (r.status >= 300) gay.push([u, r.status + ' →']);
    } catch { gay.push([u, 'LỖI']); }
  }));
}
console.log(gay.length ? '\n  ✗ LIÊN KẾT GÃY / CHUYỂN HƯỚNG:' : '\n  ✓ không có liên kết nội bộ gãy');
gay.sort().forEach(([u, m]) => console.log(`     [${m}] ${u}`));
