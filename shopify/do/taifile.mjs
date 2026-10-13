/**
 * Tai anh len Files cua Shopify (de `image_picker` chon duoc).
 * REST /files khong co — phai di qua stagedUploadsCreate roi fileCreate.
 */
import fs from 'node:fs';
import path from 'node:path';
const SHOP = '5jxr9j-bp.myshopify.com';
const T = fs.readFileSync(process.env.HOME + '/.shopify-store-admin-token', 'utf8').trim();
const gql = async (query, variables) => {
  const r = await fetch(`https://${SHOP}/admin/api/2025-07/graphql.json`, {
    method: 'POST',
    headers: { 'X-Shopify-Access-Token': T, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const j = await r.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors));
  return j.data;
};

const files = process.argv.slice(2);
const inputs = files.map((f) => ({
  filename: path.basename(f), mimeType: 'image/jpeg', resource: 'FILE', httpMethod: 'POST',
  fileSize: String(fs.statSync(f).size),
}));

const { stagedUploadsCreate } = await gql(`
  mutation($input:[StagedUploadInput!]!){ stagedUploadsCreate(input:$input){
    stagedTargets{ url resourceUrl parameters{ name value } }
    userErrors{ field message } } }`, { input: inputs });
if (stagedUploadsCreate.userErrors.length) throw new Error(JSON.stringify(stagedUploadsCreate.userErrors));

const creates = [];
for (let i = 0; i < files.length; i++) {
  const t = stagedUploadsCreate.stagedTargets[i];
  const fd = new FormData();
  for (const p of t.parameters) fd.append(p.name, p.value);
  fd.append('file', new Blob([fs.readFileSync(files[i])], { type: 'image/jpeg' }), path.basename(files[i]));
  const up = await fetch(t.url, { method: 'POST', body: fd });
  if (!up.ok) throw new Error(`tai len that bai ${files[i]}: ${up.status} ${await up.text()}`);
  creates.push({ originalSource: t.resourceUrl, contentType: 'IMAGE', filename: path.basename(files[i]) });
}

const { fileCreate } = await gql(`
  mutation($files:[FileCreateInput!]!){ fileCreate(files:$files){
    files{ id fileStatus alt ... on MediaImage { image { url } } }
    userErrors{ field message } } }`, { files: creates });
if (fileCreate.userErrors.length) throw new Error(JSON.stringify(fileCreate.userErrors));
console.log(JSON.stringify(fileCreate.files, null, 1));
