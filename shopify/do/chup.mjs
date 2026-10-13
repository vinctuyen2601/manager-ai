/**
 * Chup anh trang web qua CDP. Dung WebSocket co san cua Node 22.
 *
 * Dung Emulation.setDeviceMetricsOverride chu KHONG dung --window-size:
 * da do ngay 09/10/2026, --window-size=390 cho ra khung nhin 500px trong
 * headless moi, va anh cat ra trong nhu bi tran le trong khi that ra khong.
 */
import fs from 'node:fs';

const [, , url, out, rongS, caoS] = process.argv;
const rong = Number(rongS || 1280);
const cao = Number(caoS || 900);
const CDP = 'http://127.0.0.1:9333';

const tabs = await (await fetch(`${CDP}/json/new?${encodeURIComponent('about:blank')}`, { method: 'PUT' })).json();
const ws = new WebSocket(tabs.webSocketDebuggerUrl);
let id = 0;
const cho = new Map();

ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && cho.has(m.id)) { cho.get(m.id)(m); cho.delete(m.id); }
});
await new Promise((r) => ws.addEventListener('open', r));

const goi = (method, params = {}) =>
  new Promise((res) => { const i = ++id; cho.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

await goi('Page.enable');
await goi('Network.enable');                 // PHAI bat truoc setCacheDisabled, khong thi no im lang bo qua
await goi('Network.setCacheDisabled', { cacheDisabled: true });
await goi('Emulation.setDeviceMetricsOverride', {
  width: rong, height: cao, deviceScaleFactor: 1,
  mobile: rong < 500,
});
await goi('Page.navigate', { url });
await new Promise((r) => setTimeout(r, 6000));

// Cuon het trang de anh lazy-load kip hien, roi quay lai dau.
await goi('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight)' });
await new Promise((r) => setTimeout(r, 2500));
await goi('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' });
await new Promise((r) => setTimeout(r, 1200));

const { result } = await goi('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
fs.writeFileSync(out, Buffer.from(result.data, 'base64'));
const { result: kt } = await goi('Runtime.evaluate', {
  expression: 'JSON.stringify({w:innerWidth,h:document.body.scrollHeight})', returnByValue: true,
});
console.log(out, kt.value);
ws.close();
process.exit(0);
