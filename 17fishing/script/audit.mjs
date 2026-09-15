const B = 'https://17-fishing.com';
const lay = async (u) => {
  const r = await fetch(B + u);
  const h = r.status === 200 ? await r.text() : '';
  const g = (re) => (h.match(re) || [, ''])[1];
  return {
    u, ma: r.status,
    tit: g(/<title>([^<]*)<\/title>/),
    des: g(/<meta name="description" content="([^"]*)"/),
    can: g(/rel="canonical" href="([^"]*)"/),
    h1: [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').replace(/<!--\s*-->/g, '').trim()),
    og: /property="og:image"/.test(h),
    noidx: /noindex/.test(h),
    anh: [...h.matchAll(/<img[^>]*>/g)].length,
    anhThieuAlt: [...h.matchAll(/<img(?![^>]*\balt=)[^>]*>/g)].length,
    lien: [...new Set([...h.matchAll(/href="(\/[a-z0-9\-\/]*)"/g)].map((m) => m[1]))],
  };
};

const sp = await (await fetch('https://api.17-fishing.com/api/products')).json();
const TRANG = [
  '/', '/san-pham', '/blog', '/lien-he', '/gioi-thieu', '/huong-dan-mua-hang',
  ...sp.map((p) => `/san-pham/${p.slug}`),
];

const kq = [];
for (let i = 0; i < TRANG.length; i += 4) kq.push(...await Promise.all(TRANG.slice(i, i + 4).map(lay)));

console.log('── TIÊU ĐỀ vượt 60 ký tự');
const dai = kq.filter((p) => p.ma === 200 && p.tit.length > 60);
dai.forEach((p) => console.log(`   (${p.tit.length}) ${p.u.padEnd(46)} ${p.tit.slice(0, 58)}`));
console.log(`   → ${dai.length}/${kq.filter((p) => p.ma === 200).length} trang`);

console.log('\n── MÔ TẢ thiếu hoặc quá ngắn (<70)');
kq.filter((p) => p.ma === 200 && (!p.des || p.des.length < 70))
  .forEach((p) => console.log(`   (${p.des.length}) ${p.u}`));

console.log('\n── MÔ TẢ TRÙNG NHAU');
const theoDes = {};
kq.filter((p) => p.ma === 200 && p.des).forEach((p) => (theoDes[p.des] = [...(theoDes[p.des] || []), p.u]));
Object.entries(theoDes).filter(([, v]) => v.length > 1)
  .forEach(([d, v]) => console.log(`   ${v.length} trang dùng chung: ${v.join(', ').slice(0, 88)}\n      "${d.slice(0, 70)}…"`));

console.log('\n── H1');
kq.filter((p) => p.ma === 200 && p.h1.length !== 1)
  .forEach((p) => console.log(`   ${p.h1.length} thẻ h1  ${p.u}  ${p.h1.slice(0, 2).map((x) => x.slice(0, 26)).join(' | ')}`));

console.log('\n── KHÁC');
console.log(`   trang lỗi: ${kq.filter((p) => p.ma !== 200).map((p) => p.u + ':' + p.ma).join(', ') || 'không'}`);
console.log(`   thiếu canonical: ${kq.filter((p) => p.ma === 200 && !p.can).map((p) => p.u).join(', ') || 'không'}`);
console.log(`   thiếu og:image: ${kq.filter((p) => p.ma === 200 && !p.og).map((p) => p.u).join(', ') || 'không'}`);
const alt = kq.filter((p) => p.anhThieuAlt > 0);
console.log(`   ảnh thiếu alt: ${alt.length ? alt.map((p) => p.u + ' (' + p.anhThieuAlt + '/' + p.anh + ')').join(', ') : 'không'}`);
