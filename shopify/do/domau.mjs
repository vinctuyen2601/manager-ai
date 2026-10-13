const CDP='http://127.0.0.1:9333';
const [,,url,ten]=process.argv;
const tab=await (await fetch(`${CDP}/json/new?about:blank`,{method:'PUT'})).json();
const ws=new WebSocket(tab.webSocketDebuggerUrl);let id=0;const cho=new Map();
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&cho.has(m.id)){cho.get(m.id)(m);cho.delete(m.id)}});
await new Promise(r=>ws.addEventListener('open',r));
const goi=(m,p={})=>new Promise(res=>{const i=++id;cho.set(i,res);ws.send(JSON.stringify({id:i,method:m,params:p}))});
const js=async e=>(await goi('Runtime.evaluate',{expression:e,returnByValue:true,awaitPromise:true})).result?.result?.value;
await goi('Page.enable');
await goi('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await goi('Page.navigate',{url});await new Promise(r=>setTimeout(r,10000));
await js('window.scrollTo(0, document.body.scrollHeight)'); await new Promise(r=>setTimeout(r,3000));
console.log('### '+ten);
console.log(await js(`(()=>{
  const dem={}; 
  const ghi=(v,chu)=>{ if(!v) return; const m=v.match(/^rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/); if(!m) return;
    const [r,g,b]=[+m[1],+m[2],+m[3]];
    // chi quan tam cac sac DO
    if(!(r>120 && g<90 && b<90)) return;
    const k='rgb('+r+', '+g+', '+b+')';
    dem[k]=dem[k]||{n:0,vd:''}; dem[k].n++; if(!dem[k].vd) dem[k].vd=chu; };
  document.querySelectorAll('*').forEach(el=>{
    const r=el.getBoundingClientRect(); if(!r.width||!r.height) return;
    const c=getComputedStyle(el);
    const chu=(el.textContent||'').trim().replace(/\\s+/g,' ').slice(0,24)||('<'+el.tagName.toLowerCase()+'>');
    ghi(c.backgroundColor, 'nen: '+chu); ghi(c.color, 'chu: '+chu); ghi(c.borderTopColor,'vien: '+chu);
  });
  return Object.entries(dem).sort((a,b)=>b[1].n-a[1].n)
    .map(([k,v])=>'  '+k.padEnd(20)+' x'+String(v.n).padEnd(4)+' vd: '+v.vd).join('\\n');
})()`));
await fetch(`${CDP}/json/close/${tab.id}`);
