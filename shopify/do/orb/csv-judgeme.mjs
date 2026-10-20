// Tep CSV nhap Judge.me cho Memory Orb: 415 danh gia that cua listing
// AliExpress 3256809531652901 (nguon chu shop gui 21/10/2026), ban tieng Anh.
// Giu nguyen sao, ngay, nuoc, anh — khong loc bo (cung cach lam Santa Spins).
import fs from 'node:fs';
const all = JSON.parse(fs.readFileSync('tatca.json', 'utf8'));
const HANDLE = process.argv[2] || 'memory-orb';
const q = (s) => '"' + String(s ?? '').replace(/"/g, '""').replace(/\r?\n/g, ' ').trim() + '"';
const ngay = (s) => { const d = new Date(s + ' UTC'); return isNaN(d) ? '' : d.toISOString().slice(0, 10); };
const la = /[\u0400-\u04FF\u0590-\u05FF\u0600-\u06FF\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/;
const cot = ['title', 'body', 'rating', 'review_date', 'source', 'curated', 'reviewer_name', 'reviewer_email', 'product_id', 'product_handle', 'reply', 'picture_urls', 'location'];
const dong = [cot.join(',')];
const chuaDich = [], nhacAli = [];
for (const x of all) {
  const body = (x.buyerTranslationFeedback || x.buyerFeedback || '').trim();
  if (la.test(body)) chuaDich.push(x.buyerCountry + ': ' + body.slice(0, 80));
  if (/aliexpress|seller|store|chatbot/i.test(body)) nhacAli.push(Math.round(x.buyerEval / 20) + '* ' + body.slice(0, 90));
  const anh = (x.images || []).map((u) => (u.startsWith('//') ? 'https:' + u : u)).join(',');
  dong.push(['', body, Math.round(x.buyerEval / 20), ngay(x.evalDate), 'AliExpress', 'ok',
    x.buyerName || 'AliExpress buyer', '', '', HANDLE, '', anh, x.buyerCountry || ''].map(q).join(','));
}
fs.writeFileSync('judgeme-import-memory-orb.csv', '\ufeff' + dong.join('\n'));
console.log('dong:', dong.length - 1, '| ngay trong:', all.filter((x) => !ngay(x.evalDate)).length, '| chua dich:', chuaDich.length);
chuaDich.forEach((l) => console.log('  ' + l));
console.log('nhac AliExpress/seller:', nhacAli.length); nhacAli.forEach((l) => console.log('  ' + l));
const tb = all.reduce((s, x) => s + Math.round(x.buyerEval / 20), 0) / all.length;
console.log('trung binh trong tep:', tb.toFixed(2));
