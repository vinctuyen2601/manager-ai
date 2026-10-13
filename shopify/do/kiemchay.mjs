const CDP='http://127.0.0.1:9333';
const [,,url]=process.argv;
const tab=await (await fetch(`${CDP}/json/new?about:blank`,{method:'PUT'})).json();
const ws=new WebSocket(tab.webSocketDebuggerUrl);let id=0;const cho=new Map();
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&cho.has(m.id)){cho.get(m.id)(m);cho.delete(m.id)}});
await new Promise(r=>ws.addEventListener('open',r));
const goi=(m,p={})=>new Promise(res=>{const i=++id;cho.set(i,res);ws.send(JSON.stringify({id:i,method:m,params:p}))});
const js=async e=>(await goi('Runtime.evaluate',{expression:e,returnByValue:true,awaitPromise:true})).result?.result?.value;
await goi('Page.enable');
await goi('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await goi('Page.navigate',{url});await new Promise(r=>setTimeout(r,10000));
await js('window.scrollTo(0, document.body.scrollHeight)'); await new Promise(r=>setTimeout(r,2500));
await js('window.scrollTo(0,0)'); await new Promise(r=>setTimeout(r,1200));

const DAI = `[
  ['dai review lon', 'review-slider .rvs__track'],
  ['3 review ngan ', '.mrv__track'],
  ['3 buoc        ', '.group-block-content:has(> .group-block [class*="__s1n"])']
]`;
// Cuon tung dai vao khung nhin roi do scrollLeft truoc/sau 7 giay
console.log(await js(`(async () => {
  const ra=[];
  for (const [ten, sel] of ${DAI}) {
    const el=document.querySelector(sel);
    if(!el){ ra.push(ten+' : KHONG CO tren trang nay'); continue; }
    if(el.scrollWidth<=el.clientWidth+4){ ra.push(ten+' : khong truot duoc (scrollW='+el.scrollWidth+' <= clientW='+el.clientWidth+')'); continue; }
    el.scrollIntoView({block:'center'});
    await new Promise(r=>setTimeout(r,1200));
    const a=el.scrollLeft;
    await new Promise(r=>setTimeout(r,7000));
    const b=el.scrollLeft;
    ra.push(ten+' : scrollLeft '+Math.round(a)+' -> '+Math.round(b)+(b!==a?'   TU CHAY ✓':'   DUNG YEN ✗')+'  (danh dau='+el.dataset.tuTruot+')');
  }
  return ra.join('\\n');
})()`));
console.log('--- mau sao ---');
console.log(await js(`[...document.querySelectorAll('*')].filter(e=>!e.children.length && /★/.test(e.textContent||'') && e.getBoundingClientRect().width)
  .map(e=>getComputedStyle(e).color+'   "'+e.textContent.trim().slice(0,34)+'"').filter((v,i,a)=>a.indexOf(v)===i).join('\\n')`));
await fetch(`${CDP}/json/close/${tab.id}`);
