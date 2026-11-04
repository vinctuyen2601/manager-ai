// Ban 2: in TU DA KHOP kem ngu canh, de phan biet "hang vo" voi "khong biet dung".
// Ban 1 cat chuoi o 110 ky tu nen khong thay tu khop -> con so khong kiem chung duoc.
const id = process.argv[2], ten = process.argv[3] || id;
const all = [];
for (let p = 1; p <= 40; p++) {
  const u = `https://feedback.aliexpress.com/pc/searchEvaluation.do?productId=${id}&lang=en_US&country=US&page=${p}&pageSize=20&filter=all&sort=complex_default`;
  let j; try { j = await (await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0' } })).json(); } catch { break; }
  const v = j.data?.evaViewList || []; all.push(...v);
  if (!v.length || p >= (j.data?.totalPage || 1)) break;
  await new Promise((r) => setTimeout(r, 300));
}
const txt = (x) => (x.buyerTranslationFeedback || x.buyerFeedback || '').replace(/\s+/g, ' ').toLowerCase();
// Tach HAI nhom: hong vat ly (hang loi) vs kho dung (van de huong dan)
const VAT_LY = /(arrived (broken|damaged|disassembled)|broken|broke |shattered|cracked|crack |damaged|came apart|disassembled|malfunction|faulty|defective|dead |stopped working|won'?t turn on|never worked|didn'?t work|does not work|doesn'?t work|not work)/g;
const KHO_DUNG = /(instruction|manual|confus|figure out|complicated|difficult to|hard to|format|resize|tutorial)/;
const cochu = all.filter((x) => txt(x).length > 3);
const hit = [];
for (const x of cochu) {
  const t = txt(x); const m = [...t.matchAll(VAT_LY)];
  if (m.length) hit.push({ t, tu: m.map((z) => z[0].trim()), sao: Math.round(x.buyerEval / 20), kho: KHO_DUNG.test(t) });
}
console.log(`\n===== ${ten} (id ${id}) =====`);
console.log(`ban ghi ${all.length} | co chu ${cochu.length} | khop ${hit.length}`);
console.log(`--- TUNG CAI, co ngu canh quanh tu khop ---`);
hit.forEach((h, i) => {
  const t = h.t; const k = t.indexOf(h.tu[0]);
  console.log(`${String(i + 1).padStart(2)}. [${h.sao}*]${h.kho ? '[cung nhac huong dan]' : ''} ...${t.slice(Math.max(0, k - 70), k + 90)}...`);
  console.log(`    tu khop: ${h.tu.join(' | ')}`);
});
