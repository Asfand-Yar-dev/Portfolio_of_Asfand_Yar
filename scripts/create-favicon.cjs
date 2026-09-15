const fs=require('node:fs');
const sharp=require('sharp');
const {chromium}=require(process.env.PLAYWRIGHT_PATH||'C:/Users/asfan/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try {
  const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:4,reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:3000',{waitUntil:'domcontentloaded'});
  await page.evaluate(async()=>{await document.fonts.ready;document.documentElement.dataset.theme='dark'});
  const mark=page.locator('.brand-symbol');
  // Capture the real header element, preserving its actual font metrics and spacing.
  const capture=await mark.screenshot();
  const image=await sharp(capture).resize(256,256,{fit:'contain',background:'#101312'}).png().toBuffer();
  await sharp(image).resize(64,64).png().toFile('public/favicon.png');
  await sharp(image).resize(180,180).png().toFile('public/apple-touch-icon.png');
  const sizes=[16,32,48];
  const images=await Promise.all(sizes.map(size=>sharp(image).resize(size,size).png().toBuffer()));
  const header=Buffer.alloc(6+16*sizes.length);header.writeUInt16LE(1,2);header.writeUInt16LE(sizes.length,4);
  let offset=header.length;
  images.forEach((png,i)=>{const pos=6+i*16;header[pos]=sizes[i];header[pos+1]=sizes[i];header.writeUInt16LE(1,pos+4);header.writeUInt16LE(32,pos+6);header.writeUInt32LE(png.length,pos+8);header.writeUInt32LE(offset,pos+12);offset+=png.length});
  fs.writeFileSync('public/favicon.ico',Buffer.concat([header,...images]));
  console.log('Favicon generated directly from the rendered header mark.');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
