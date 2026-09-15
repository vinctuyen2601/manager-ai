/**
 * Đặt seoTitle cho 22 bài nhiều hiển thị nhất mà tiêu đề đang bị Google cắt.
 *
 * Ba nguyên tắc khi viết, theo đúng luật đã ghi ở registry prompt:
 *   1. BỎ tiền tố rỗng — "Bí Quyết", "KỲ 2:", "Top 5 Siêu Phẩm". Chúng ăn chỗ
 *      mà không nói thêm gì, và Google cắt phần đuôi tức là cắt phần có nghĩa.
 *   2. NHẮC LẠI ĐÚNG CÂU NGƯỜI TA GÕ. Đo 14/09: 29 từ khoá hạng 6-9 mà 0 nhấp,
 *      toàn dạng "X là gì". Google xếp hạng vì nội dung có, nhưng đoạn hiện ra
 *      không hứa trả lời câu hỏi nên không ai bấm.
 *   3. Ép độ dài BẰNG MÃ, không bằng lời hứa. Hậu tố " | 17Fishing" = 12 ký tự,
 *      ngân sách hiển thị ~60, nên seoTitle phải <= 48.
 *
 * Lưu bản cũ ra tệp trước khi ghi. Hoàn tác: node sua-tieu-de.mjs --hoan-tac
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const API = 'https://api.17-fishing.com/api';
const TOKEN = readFileSync(process.env.HOME + '/.17fishing-admin-token', 'utf8').trim();
const TOI_DA = 48;
const SAO_LUU = new URL('./tieu-de-cu.json', import.meta.url).pathname;
const HOAN_TAC = process.argv.includes('--hoan-tac');
const THU = process.argv.includes('--thu');

const MOI = {
  'huong-dan-cach-buoc-luoi-cau-chuan-nhat-de-lam-khong-tuot-tang-ty-le-dinh-ca':
    'Cách buộc lưỡi câu chuẩn, dễ làm, không tuột',
  '8-dac-tinh-cua-day-truc-cau-cac-can-thu-nen-biet':
    'Dây trục câu là gì? 8 đặc tính cần thủ nên biết',
  'chon-phao-cau-ca-chuan':
    'Cách chọn phao câu cá chuẩn cho người mới',
  'phan-loai-do-cung-cua-can-cau-tay-uu-nhuoc-diem-cua-tung-loai':
    'Độ cứng cần câu tay: phân loại và ưu nhược điểm',
  'mua-dong-nen-dung-phao-cau-dai-nao-cac-yeu-to-lien-quan-den-do-nhay-cua-phao':
    'Mùa đông nên dùng phao câu đài nào?',
  'ky-2-cach-chon-phao-cau-dai-cho-phu-hop-thay-li-damao-ban-ve-chuyen-cau-ca':
    'Cách chọn phao câu đài phù hợp',
  'kinh-nghiem-lua-chon-can-cau-tay-dua-theo-thong-so-co-ban':
    'Chọn cần câu tay theo thông số cơ bản',
  'kich-thuoc-day-theo-se-anh-huong-the-nao-den-ti-le-dinh-ca-khi-cau':
    'Dây thẻo là gì? Kích thước ảnh hưởng dính cá',
  'chieu-dai-cua-can-cau-tay-anh-huong-the-nao-den-luong-ca-khi-cau':
    'Chiều dài cần câu tay ảnh hưởng gì đến lượng cá?',
  'top-5-sieu-pham-can-cau-ca-hua-khong-the-bo-qua-2022':
    'Cần câu cá hua: top 5 mẫu đáng mua',
  'cac-dang-phao-cau-dai-co-ban-va-ung-dung-khi-di-cau':
    'Các loại phao câu đài: dáng cơ bản và cách dùng',
  'tin-hieu-phao-khi-cau-dai-va-khi-cau-lut-truyen-thong':
    'Tín hiệu phao câu đài và câu lụt khác gì nhau',
  'phao-cau-ca-diec-dau-la-loai-phao-ma-moi-can-thu-dang-tim-kiem':
    'Phao câu cá diếc: chọn loại nào cho nhạy?',
  'ky4-loai-phao-cau-nao-de-dung-nhat-i-thay-li-damao-ban-ve-chuyen-cau-ca':
    'Loại phao câu nào dễ dùng nhất cho người mới?',
  'moi-cau-ro-phi-kim-long-so-1-2-cap-bai-trung-pha-dao-moi-ho-cau':
    'Mồi câu rô phi Kim Long số 1 và 2: cách dùng',
  '5-buoc-kiem-tra-chat-luong-day-cau-ca-vua-don-gian-va-de-lam':
    '5 bước kiểm tra chất lượng dây câu cá',
  'ky-1-lam-the-nao-de-chon-duoc-mot-can-cau-tot-thay-li-damao-ban-ve-chuyen-cau-ca':
    'Làm thế nào để chọn được một cần câu tốt?',
  'phao-cau-dai-long-cong-top-5-mau-phao-duoc-ua-chuong-hien-nay':
    'Phao câu đài lông công: top 5 mẫu đáng dùng',
  'the-nao-la-cau-lut-va-cau-nhay-trong-cau-don-cau-dai':
    'Câu lụt và câu nhạy là gì? Phân biệt khi câu đài',
  'hoi-dap-ve-moi-xa-khi-cau-phuong-phap-su-dung-moi-xa':
    'Mồi xả là gì? Cách dùng mồi xả khi câu',
  'can-cau-ro-phi-loai-nao-tot-tai-sao-anh-em-danh-bao-luc-lai-chon-do-cung-5h':
    'Cần câu rô phi loại nào tốt? Vì sao chọn 5H',
  '04-nguyen-nhan-ca-khong-an-moi-va-bi-quyet-khac-phuc-cuc-de-cho-nguoi-moi-cau':
    '4 nguyên nhân cá không ăn mồi và cách khắc phục',
};

const goi = async (duong, opt = {}) => {
  const r = await fetch(API + duong, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    ...opt,
    ...(opt.body ? { body: JSON.stringify(opt.body) } : {}),
  });
  const t = await r.text();
  if (!r.ok) throw new Error(`${opt.method || 'GET'} ${duong} -> ${r.status} ${t.slice(0, 180)}`);
  try { return JSON.parse(t); } catch { return t; }
};

const ds = await goi('/admin/posts?limit=300');
const bai = Array.isArray(ds) ? ds : (ds.data ?? ds.items ?? []);
const theoSlug = Object.fromEntries(bai.map((p) => [p.slug, p]));

// ── Hoàn tác ────────────────────────────────────────────────────────────────
if (HOAN_TAC) {
  if (!existsSync(SAO_LUU)) { console.log('  Không có bản sao lưu.'); process.exit(1); }
  const cu = JSON.parse(readFileSync(SAO_LUU, 'utf8'));
  for (const [slug, seoTitle] of Object.entries(cu)) {
    const p = theoSlug[slug]; if (!p) continue;
    await goi(`/admin/posts/${p.id}`, { method: 'PATCH', body: { seoTitle: seoTitle ?? null } });
    console.log(`   ↩ ${slug}`);
  }
  process.exit(0);
}

// ── Kiểm trước khi ghi ──────────────────────────────────────────────────────
let loi = 0;
const viec = [];
for (const [slug, moi] of Object.entries(MOI)) {
  const p = theoSlug[slug];
  if (!p) { console.log(`   ✗ KHÔNG TÌM THẤY bài: ${slug}`); loi++; continue; }
  if (moi.length > TOI_DA) { console.log(`   ✗ DÀI ${moi.length} > ${TOI_DA}: ${moi}`); loi++; continue; }
  viec.push({ p, slug, moi, cu: p.seoTitle ?? null, goc: p.title });
}
console.log(`\n  ${viec.length} bài hợp lệ · ${loi} lỗi`);
if (loi) { console.log('  Dừng, không ghi gì.'); process.exit(1); }

for (const v of viec) {
  console.log(`   (${String(v.goc.length).padStart(2)}→${String(v.moi.length).padStart(2)})  ${v.goc.slice(0, 46)}`);
  console.log(`                ${v.moi}`);
}
if (THU) { console.log('\n  --thu: chỉ xem, không ghi.'); process.exit(0); }

// ── Ghi ─────────────────────────────────────────────────────────────────────
writeFileSync(SAO_LUU, JSON.stringify(Object.fromEntries(viec.map((v) => [v.slug, v.cu])), null, 1));
console.log(`\n  đã lưu bản cũ vào ${SAO_LUU}`);
let ok = 0;
for (const v of viec) {
  await goi(`/admin/posts/${v.p.id}`, { method: 'PATCH', body: { seoTitle: v.moi } });
  ok++;
}
console.log(`  ✓ đã ghi ${ok}/${viec.length} bài`);
