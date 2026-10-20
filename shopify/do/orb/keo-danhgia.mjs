import fs from 'node:fs';
const id = '3256809531652901';
const all = []; let tong;
for (let p = 1; p <= 40; p++) {
  const r = await fetch(`https://feedback.aliexpress.com/pc/searchEvaluation.do?productId=${id}&lang=en_US&country=US&page=${p}&pageSize=20&filter=all&sort=complex_default`, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const j = await r.json();
  if (p === 1) { tong = j.data?.productEvaluationStatistic; console.log('trang', j.data?.totalPage, 'so', j.data?.totalNum, JSON.stringify(tong||{}).slice(0,300)); }
  const v = j.data?.evaViewList || [];
  all.push(...v);
  if (!v.length || p >= (j.data?.totalPage || 1)) break;
  await new Promise((r) => setTimeout(r, 300));
}
fs.writeFileSync('orb-dg/tatca.json', JSON.stringify(all, null, 1));
const sao = (x) => Math.round(x.buyerEval / 20);
const dem = {}; for (const x of all) dem[sao(x)] = (dem[sao(x)] || 0) + 1;
const chu = all.filter((x) => (x.buyerTranslationFeedback || x.buyerFeedback || '').trim().length > 3);
console.log('ban ghi', all.length, 'sao', JSON.stringify(dem), 'co chu', chu.length, 'co anh', all.filter((x) => (x.images || []).length).length);
