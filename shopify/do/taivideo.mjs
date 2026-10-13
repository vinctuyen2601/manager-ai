/**
 * Tai video len Shopify Files dang VIDEO (khong phai FILE).
 *
 * VI SAO PHAI LA `VIDEO`: tep goc la HEVC/H.265 1080x1920, 28,5 MB cho 10,6
 * giay — Chrome va Firefox khong giai ma duoc, va dung luong do la khong the
 * chap nhan tren trang san pham. Dua len dang VIDEO thi Shopify TU CHUYEN MA
 * sang H.264 nhieu muc phan giai va phuc vu kem HLS. Dang FILE thi no giu
 * nguyen tep, tuc la giu nguyen ca hai van de.
 */
import fs from 'node:fs';
const SHOP='5jxr9j-bp.myshopify.com';
const T=fs.readFileSync(process.env.HOME+'/.shopify-store-admin-token','utf8').trim();
const gql=async(query,variables)=>{
  const r=await fetch(`https://${SHOP}/admin/api/2025-07/graphql.json`,{method:'POST',
    headers:{'X-Shopify-Access-Token':T,'Content-Type':'application/json'},
    body:JSON.stringify({query,variables})});
  const j=await r.json(); if(j.errors) throw new Error(JSON.stringify(j.errors)); return j.data;
};
const f='video-mau.mp4', ten='see-it-in-action.mp4';
const {stagedUploadsCreate:su}=await gql(`
 mutation($input:[StagedUploadInput!]!){ stagedUploadsCreate(input:$input){
   stagedTargets{ url resourceUrl parameters{ name value } } userErrors{ field message } } }`,
 {input:[{filename:ten,mimeType:'video/mp4',resource:'VIDEO',httpMethod:'POST',fileSize:String(fs.statSync(f).size)}]});
if(su.userErrors.length) throw new Error(JSON.stringify(su.userErrors));
const t=su.stagedTargets[0];
const fd=new FormData();
for(const p of t.parameters) fd.append(p.name,p.value);
fd.append('file', new Blob([fs.readFileSync(f)],{type:'video/mp4'}), ten);
const up=await fetch(t.url,{method:'POST',body:fd});
if(!up.ok) throw new Error('tai len that bai: '+up.status+' '+(await up.text()).slice(0,300));
console.log('da tai len kho tam');
const {fileCreate:fc}=await gql(`
 mutation($files:[FileCreateInput!]!){ fileCreate(files:$files){
   files{ id fileStatus alt } userErrors{ field message } } }`,
 {files:[{originalSource:t.resourceUrl, contentType:'VIDEO', filename:ten, alt:'Santa Spins music box playing on a fridge'}]});
if(fc.userErrors.length) throw new Error(JSON.stringify(fc.userErrors));
console.log(JSON.stringify(fc.files,null,1));
