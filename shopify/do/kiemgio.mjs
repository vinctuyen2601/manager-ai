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
await goi('Page.navigate', { url: 'https://5jxr9j-bp.myshopify.com/products/santa-spins-music-box?x=' + Date.now() });
await new Promise((r) => setTimeout(r, 9000));
await js(`fetch('/cart/clear.js',{method:'POST'}).then(r=>r.text())`);

// Chon Buy 2 roi tick ca ba mon ban kem
await js(`(()=>{const g=document.querySelectorAll('.bp__goi')[1];g.querySelector('input[name=bp-goi]').checked=true;g.querySelector('input[name=bp-goi]').dispatchEvent(new Event('change',{bubbles:true}));return 1})()`);
await new Promise((r) => setTimeout(r, 600));
console.log('tick:', await js(`(()=>{const g=document.querySelectorAll('.bp__goi')[1];const t=[...g.querySelectorAll('.bp__tick')];t.forEach(x=>{x.checked=true;x.dispatchEvent(new Event('change',{bubbles:true}))});return t.map(x=>x.dataset.vid+' sl='+x.dataset.sl).join(' | ')})()`));
console.log('tom tat tiet kiem:', await js(`document.querySelector('[data-bp-tiet]').textContent`));
await js(`document.querySelector('[data-bp-them]').click()`);
await new Promise((r) => setTimeout(r, 5000));
console.log(await js(`fetch('/cart.js').then(r=>r.json()).then(c=>c.items.map(i=>i.quantity+' x '+i.title+'  = '+(i.line_price/100)).join('\\n')+'\\n--- TONG: '+(c.total_price/100))`));
await fetch(`${CDP}/json/close/${tab.id}`);
