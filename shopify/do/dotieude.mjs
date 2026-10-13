const CDP='http://127.0.0.1:9333';
const [,,url,neo]=process.argv;
const tab=await (await fetch(`${CDP}/json/new?about:blank`,{method:'PUT'})).json();
const ws=new WebSocket(tab.webSocketDebuggerUrl);let id=0;const cho=new Map();
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id&&cho.has(m.id)){cho.get(m.id)(m);cho.delete(m.id)}});
await new Promise(r=>ws.addEventListener('open',r));
const goi=(m,p={})=>new Promise(res=>{const i=++id;cho.set(i,res);ws.send(JSON.stringify({id:i,method:m,params:p}))});
const js=async e=>(await goi('Runtime.evaluate',{expression:e,returnByValue:true,awaitPromise:true})).result?.result?.value;
await goi('Page.enable');
await goi('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await goi('Page.navigate',{url});await new Promise(r=>setTimeout(r,10000));
console.log(await js(`(()=>{
  const moc=[...document.querySelectorAll('*')].find(e=>!e.children.length && /${neo}/i.test(e.textContent||''));
  if(!moc) return 'khong thay neo';
  // Lay tu tieu de xuong het cac dong loi ich
  let hop=moc; for(let i=0;i<6 && hop;i++){ if(hop.getBoundingClientRect().height>160) break; hop=hop.parentElement; }
  const o=[];
  hop.querySelectorAll('*').forEach(el=>{
    if(el.children.length) return;
    const t=(el.textContent||'').trim(); if(!t) return;
    const r=el.getBoundingClientRect(); if(!r.height) return;
    const c=getComputedStyle(el);
    o.push('y='+Math.round(r.y)+' h='+Math.round(r.height)
      +'  '+c.fontSize+'/'+c.fontWeight+' '+c.fontFamily.split(',')[0].replace(/"/g,'')
      +' lh='+c.lineHeight+' ls='+c.letterSpacing+' mau='+c.color
      +'\\n      "'+t.replace(/\\s+/g,' ').slice(0,56)+'"');
  });
  return o.join('\\n');
})()`));
await fetch(`${CDP}/json/close/${tab.id}`);
