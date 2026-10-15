// Store nao: tham so dau tien, mac dinh la store DANG BAN (Skin Solutions).
//   node thanhdinh.mjs            -> skinsolutions.online   (mac dinh)
//   node thanhdinh.mjs cu         -> 5jxr9j-bp (store Santa Spins cu)
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
// chon Buy 3
await js(`(()=>{const g=document.querySelectorAll('.bp__goi')[2];const i=g.querySelector('input[name=bp-goi]');i.checked=true;i.dispatchEvent(new Event('change',{bubbles:true}))})()`);
await new Promise((r) => setTimeout(r, 800));
await js('window.scrollTo(0, Math.round(document.body.scrollHeight*0.55))');
await new Promise((r) => setTimeout(r, 2000));
// "hien" phai la NAM TRONG KHUNG NHIN, khong phai "co chieu cao". Lan truoc
// tin vao `r.height>0` nen bam vao toa do y=895 tren khung cao 844 — cu bam
// roi ra ngoai man hinh, gio rong, va trong y nhu trang hong.
const tt = await js(`(()=>{const b=document.querySelector('.sticky-add-to-cart__button');if(!b)return null;const r=b.getBoundingClientRect();
  return JSON.stringify({chu:b.textContent.trim().replace(/\\s+/g,' '),y:Math.round(r.y),trongKhung:r.y>=0&&r.bottom<=innerHeight});})()`);
console.log('thanh dinh ghi:', tt);
if (!tt || !JSON.parse(tt).trongKhung) { console.log('DUNG: thanh dinh khong nam trong khung nhin, khong bam duoc'); await fetch(`${CDP}/json/close/${tab.id}`); process.exit(1); }
const h = JSON.parse(await js(`(()=>{const b=document.querySelector('.sticky-add-to-cart__button');const r=b.getBoundingClientRect();return JSON.stringify({x:r.x+r.width/2,y:r.y+r.height/2})})()`));
for (const t of ['mousePressed','mouseReleased']) await goi('Input.dispatchMouseEvent', { type: t, x: h.x, y: h.y, button: 'left', clickCount: 1 });
await new Promise((r) => setTimeout(r, 5000));
console.log('gio sau khi bam thanh dinh:', await js(`fetch('/cart.js').then(r=>r.json()).then(c=>c.items.map(i=>i.quantity+' x '+i.title).join(' | ')||'(rong)')`));
await fetch(`${CDP}/json/close/${tab.id}`);
