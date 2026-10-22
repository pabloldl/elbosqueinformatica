const fs = require('node:fs'), path = require('node:path'), http = require('node:http'), {spawn} = require('node:child_process');
const root = path.resolve(__dirname, '../..'), out = __dirname;
const wait = ms => new Promise(r=>setTimeout(r,ms));
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.svg':'image/svg+xml','.ttf':'font/ttf'};
const server=http.createServer((req,res)=>{const p=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(p==='/favicon.ico'){res.writeHead(204).end();return}const f=path.resolve(root,'.'+(p.endsWith('/')?p+'index.html':p));if(!f.startsWith(root+path.sep)){res.writeHead(403).end();return}fs.readFile(f,(err,b)=>{res.writeHead(err?404:200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream'});res.end(err?'Missing':b)})});
let browser,ws,send;const errors=[],failed=[];
(async()=>{
 await new Promise(r=>server.listen(8798,'127.0.0.1',r));
 browser=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--remote-debugging-port=9358','--user-data-dir='+path.join(out,'chrome'),'about:blank'],{stdio:'ignore'});
 let tabs;for(let i=0;i<60;i++){try{tabs=await(await fetch('http://127.0.0.1:9358/json')).json();break}catch{await wait(200)}}if(!tabs)throw Error('Chrome unavailable');
 ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let id=0;const pending=new Map();
 ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result)}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);if(m.method==='Network.responseReceived'&&m.params.response.status>=400)failed.push(m.params.response.url)};
 send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
 const ev=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value};
 const load=async url=>{await send('Page.navigate',{url});await wait(350);await ev('document.fonts.ready.then(()=>true)')};
 const shot=async(name,full=false)=>{let clip;if(full){const m=await send('Page.getLayoutMetrics');clip={x:0,y:0,width:m.cssContentSize.width,height:m.cssContentSize.height,scale:1}}const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:full,...(clip?{clip}:{})});fs.writeFileSync(path.join(out,name),Buffer.from(r.data,'base64'))};
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Emulation.setFocusEmulationEnabled',{enabled:true});
 const url='http://127.0.0.1:8798/el-bosque-informatica/';await load(url);await ev('Promise.all([...document.images].map(i=>{i.loading="eager";return i.decode()}))');
 const report={widths:[],errors,failed};
 for(const width of [375,768,1440,1920]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:960,deviceScaleFactor:1,mobile:false});await ev('scrollTo({top:0,behavior:"instant"})');await wait(800);
  report.widths.push(await ev(`({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,brokenImages:[...document.images].filter(i=>!i.naturalWidth).length,missingAnchors:[...document.links].filter(a=>a.hash&&!document.querySelector(a.hash)).length,fonts:[...document.fonts].map(f=>({family:f.family,status:f.status})),overflow:[...document.querySelectorAll('main *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>e.className)})`));
  await shot('screen-'+width+'.png');await shot('full-'+width+'.png',true);
 }
 await send('Browser.grantPermissions',{origin:'http://127.0.0.1:8798',permissions:['clipboardReadWrite','clipboardSanitizedWrite']});
 await ev('document.querySelector("#copy-phone").click()');await wait(200);
 report.clipboard=await ev('(async()=>({text:await navigator.clipboard.readText(),label:document.querySelector("#copy-label").textContent,status:document.querySelector("#copy-status").textContent}))()');
 await ev('window.originalClipboard=navigator.clipboard.writeText.bind(navigator.clipboard);navigator.clipboard.writeText=()=>Promise.reject(new Error("QA denial"));document.querySelector("#copy-phone").click()');await wait(200);
 report.copyFallback=await ev('({status:document.querySelector("#copy-status").textContent,manualVisible:!document.querySelector("#manual-copy").hidden})');
 await ev('window.originalExec=document.execCommand;document.execCommand=()=>false;document.querySelector("#copy-phone").click()');await wait(200);
 report.copyManual=await ev('({status:document.querySelector("#copy-status").textContent,manualVisible:!document.querySelector("#manual-copy").hidden,selection:document.querySelector("#phone-fallback").value})');
 await ev('navigator.clipboard.writeText=window.originalClipboard;document.execCommand=window.originalExec;document.querySelector("#manual-copy").hidden=true');
 await send('Emulation.setDeviceMetricsOverride',{width:375,height:812,deviceScaleFactor:1,mobile:false});
 report.navigation=[];
 for(const target of ['ubicacion','contacto','inicio']){
  await ev(`document.querySelector('.mobile-nav a[href="#${target}"]').click()`);await wait(1000);
  report.navigation.push(await ev('({hash:location.hash,active:document.querySelector(".mobile-nav [aria-current]").hash,section:document.querySelector("#section-name").textContent})'));
 }
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 report.reducedMotion=await ev('({scrollBehavior:getComputedStyle(document.documentElement).scrollBehavior,animations:[...document.querySelectorAll(".module")].map(e=>getComputedStyle(e).animationName)})');
 await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});
 report.keyboard=await ev('({element:document.activeElement.tagName,name:document.activeElement.textContent.trim(),outline:getComputedStyle(document.activeElement).outlineStyle})');
 report.links=await ev('({tel:[...document.querySelectorAll("a[href^=tel]")].map(a=>a.getAttribute("href")),maps:[...document.querySelectorAll("a[href*=google]")].map(a=>a.href),schema:JSON.parse([...document.scripts].find(s=>s.type==="application/ld+json").textContent)})');
 await send('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
 const projects=['inmobiliaria-realty-canoe','abogado-jose-antonio-vazquez-sanchez','fontaneria-londro','Club-deportivo-Stilos/club-deportivo-stilos','el-bosque-informatica'];
 const items=[];for(let i=0;i<projects.length;i++){await load('http://127.0.0.1:8798/'+projects[i]+'/');await ev('scrollTo({top:0,behavior:"instant"})');await wait(900);await shot('reference-'+i+'.png');items.push({name:projects[i],image:'reference-'+i+'.png'})}
 fs.writeFileSync(path.join(out,'comparison.html'),'<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#ddd;font:16px Arial}main{display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:20px}figure{margin:0}img{width:100%;display:block}figcaption{padding:10px}</style><main>'+items.map(x=>'<figure><figcaption>'+x.name+'</figcaption><img src="'+x.image+'"></figure>').join('')+'</main>');
 await load(url+'.qa/comparison.html');await ev('Promise.all([...document.images].map(i=>i.decode()))');await shot('comparison.png',true);
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 ws.close();browser.kill();server.close();
})().catch(e=>{console.error(e);ws?.close();browser?.kill();server.close();process.exitCode=1});
