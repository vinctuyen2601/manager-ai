// Store nao: tham so dau tien, mac dinh la store DANG BAN (Skin Solutions).
//   node kiemgio.mjs            -> skinsolutions.online   (mac dinh)
//   node kiemgio.mjs cu         -> 5jxr9j-bp (store Santa Spins cu)
// Tu 15/10/2026 Santa Spins ban tren Skin Solutions; store cu chua bat duoc
// cong thanh toan. Gan cung URL mot store la lan sau do nham cho, va so lieu
// trong van dung nen khong ai phat hien.
const STORE = (process.argv[2] || 'ss');
const TRANG = STORE === 'cu'
  ? 'https://5jxr9j-bp.myshopify.com/products/santa-spins-music-box'
  : 'https://skinsolutions.online/products/santa-spins-music-box?country=US';
// Noi tham so pha cache bang dung dau: URL store moi DA co `?country=US`, nen
// `?x=` nua se thanh `?country=US?x=...` — Shopify bo qua ca hai, va phep do
// chay tren ban cache cu.
const PHA = (u) => u + (u.includes('?') ? '&' : '?') + 'x=' + Date.now();

const CDP = 'http://127.0.0.1:9333';
const tab = await (await fetch(`${CDP}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(tab.webSocketDebuggerUrl);
let id = 0; const cho = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && cho.has(m.id)) { cho.get(m.id)(m); cho.delete(m.id); } });
await new Promise((r) => ws.addEventListener('open', r));
const goi = (m, p = {}) => new Promise((res) => { const i = ++id; cho.set(i, res); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const js = async (e) => (await goi('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result?.result?.value;
await goi('Page.enable');
await goi('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await goi('Page.navigate', { url: PHA(TRANG) });
await new Promise((r) => setTimeout(r, 9000));
await js(`fetch('/cart/clear.js',{method:'POST'}).then(r=>r.text())`);

// Chon Buy 2 roi tick moi mon ban kem con lai. Tu 14/10/2026 chi con Priority
// Shipping (Mystery Gift thanh qua ebook gui email). Tu 14/10 goi 2 giam $24
// bang giam gia TU DONG trong Admin -> TONG phai la 2x80 - 24 + 6 = 142.
await js(`(()=>{const g=document.querySelectorAll('.bp__goi')[1];g.querySelector('input[name=bp-goi]').checked=true;g.querySelector('input[name=bp-goi]').dispatchEvent(new Event('change',{bubbles:true}));return 1})()`);
await new Promise((r) => setTimeout(r, 600));
console.log('tick:', await js(`(()=>{const g=document.querySelectorAll('.bp__goi')[1];const t=[...g.querySelectorAll('.bp__tick')];t.forEach(x=>{x.checked=true;x.dispatchEvent(new Event('change',{bubbles:true}))});return t.map(x=>x.dataset.vid+' sl='+x.dataset.sl).join(' | ')})()`));
console.log('tom tat tiet kiem:', await js(`document.querySelector('[data-bp-tiet]').textContent`));
await js(`document.querySelector('[data-bp-them]').click()`);
await new Promise((r) => setTimeout(r, 5000));
console.log(await js(`fetch('/cart.js').then(r=>r.json()).then(c=>c.items.map(i=>i.quantity+' x '+i.title+'  = '+(i.line_price/100)).join('\\n')+'\\n--- TONG: '+(c.total_price/100))`));
await fetch(`${CDP}/json/close/${tab.id}`);
