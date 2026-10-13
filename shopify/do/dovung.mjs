const CDP='http://127.0.0.1:9333';
const [,,url,ten,moc]=process.argv;
const tab=await (await fetch(`${CDP}/json/new?about:blank`,{method:'PUT'})).json();
const ws=new WebSocket(tab.webSocketDebuggerUrl);let id=0;const cho=new Map();
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&cho.has(m.id)){cho.get(m.id)(m);cho.delete(m.id)}});
await new Promise(r=>ws.addEventListener('open',r));
const goi=(m,p={})=>new Promise(res=>{const i=++id;cho.set(i,res);ws.send(JSON.stringify({id:i,method:m,params:p}))});
const js=async e=>(await goi('Runtime.evaluate',{expression:e,returnByValue:true,awaitPromise:true})).result?.result?.value;
await goi('Page.enable');
await goi('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await goi('Page.navigate',{url});await new Promise(r=>setTimeout(r,10000));
console.log('######## '+ten);
console.log(await js(`(()=>{
  const nut=[...document.querySelectorAll('button,a')].find(e=>/^add to cart$/i.test((e.textContent||'').trim()) && e.getBoundingClientRect().width>200);
  if(!nut) return 'khong thay nut mua';
  const y0=nut.getBoundingClientRect().top+scrollY;
  const o=[];
  document.querySelectorAll('*').forEach(el=>{
    if(el.children.length) return;
    const t=(el.textContent||'').trim(); if(!t||t.length>80) return;
    const r=el.getBoundingClientRect(); if(!r.height||!r.width) return;
    const y=r.y+scrollY; if(y<y0-5||y>y0+300) return;
    const c=getComputedStyle(el);
    o.push('+'+String(Math.round(y-y0)).padStart(4)+'  '+c.fontSize+'/'+c.fontWeight
      +' lh='+c.lineHeight+' '+c.color+'\\n        "'+t.replace(/\\s+/g,' ').slice(0,50)+'"');
  });
  return o.join('\\n');
})()`));
await fetch(`${CDP}/json/close/${tab.id}`);
