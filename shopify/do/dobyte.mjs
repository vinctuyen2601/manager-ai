const CDP='http://127.0.0.1:9333';
const tab=await (await fetch(`${CDP}/json/new?about:blank`,{method:'PUT'})).json();
const ws=new WebSocket(tab.webSocketDebuggerUrl);let id=0;const cho=new Map();const tai=new Map();
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);
  if(m.id&&cho.has(m.id)){cho.get(m.id)(m);cho.delete(m.id);}
  if(m.method==='Network.loadingFinished'){const r=tai.get(m.params.requestId); if(r) r.bytes=m.params.encodedDataLength;}
  if(m.method==='Network.requestWillBeSent'){tai.set(m.params.requestId,{url:m.params.request.url,bytes:0});}
});
await new Promise(r=>ws.addEventListener('open',r));
const goi=(m,p={})=>new Promise(res=>{const i=++id;cho.set(i,res);ws.send(JSON.stringify({id:i,method:m,params:p}))});
const js=async e=>(await goi('Runtime.evaluate',{expression:e,returnByValue:true,awaitPromise:true})).result?.result?.value;
await goi('Page.enable'); await goi('Network.enable');
await goi('Network.setCacheDisabled',{cacheDisabled:true});
await goi('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await goi('Page.navigate',{url:'https://5jxr9j-bp.myshopify.com/products/santa-spins-music-box?x='+Date.now()});
await new Promise(r=>setTimeout(r,9000));
await js(`document.querySelector('video')?.scrollIntoView({block:'center'})`);
await new Promise(r=>setTimeout(r,14000));
let tong=0, vid=0;
for(const r of tai.values()){ tong+=r.bytes; if(/\/videos\//.test(r.url)) vid+=r.bytes; }
console.log('tong ca trang : '+(tong/1048576).toFixed(2)+' MB');
console.log('rieng video   : '+(vid/1048576).toFixed(2)+' MB');
console.log('ti le video   : '+Math.round(vid/tong*100)+'%');
await fetch(`${CDP}/json/close/${tab.id}`);
