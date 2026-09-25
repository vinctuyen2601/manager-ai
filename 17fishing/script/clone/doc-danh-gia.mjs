#!/usr/bin/env node
/**
 * BƯỚC 2b — đọc khối HTML đánh giá 1688 thành JSON.
 *
 *   node doc-danh-gia.mjs <tệp.html> [--dong HA2500,HA3500,...] [--ra thu-muc]
 *
 * Nhận hai dạng markup khác nhau:
 *   · khối gọn trên trang sản phẩm  (.trade-info > span, không có ngày)
 *   · bảng "xem tất cả đánh giá"    (.user-nick, .gmt-create, .trade-info-specInfo)
 *
 * KHÔNG tự vứt đánh giá nào. Nó GẮN CỜ rồi để người quyết, vì bốn lý do loại
 * bỏ dưới đây đều cần mắt người:
 *
 *   dongKhac   mua cỡ không nằm trong dòng đang bán (1688 gộp đánh giá theo
 *              GIAN HÀNG chứ không theo mẫu — 6/8 đánh giá lần đầu là dòng cũ
 *              cách 6-7 năm)
 *   khenSuong  khen tràn không có chi tiết nào, đọc ra là mẫu copy dán
 *   nhamHang   nói về sản phẩm khác (có người khen CẦN CÂU trong đánh giá máy câu)
 *   chiVanChuyen  chỉ nói giao hàng và đóng gói của người bán bên kia
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const tep = args.find((a) => !a.startsWith('--'));
const lay = (c) => { const i = args.indexOf(c); return i >= 0 ? args[i + 1] : null; };
if (!tep) { console.error('Dùng: node doc-danh-gia.mjs <tệp.html> [--dong HA2500,...]'); process.exit(1); }

const html = fs.readFileSync(tep, 'utf8');
const dong = (lay('--dong') || '').split(',').map((x) => x.trim()).filter(Boolean);

const chu = (s) => String(s || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const goc = (u) => String(u || '').replace(/^\/\//, 'https://').replace(/_(b|sum)\.jpg$/i, '');

// Chia theo mốc mở của mỗi đánh giá. Dùng split thay vì regex bao trọn khối vì
// markup lồng nhau nhiều tầng, regex tham lam sẽ nuốt sang đánh giá kế tiếp.
const khoi = html.split('class="evaluation-content"').slice(1);

const KHEN_SUONG = /(太完美|堪称完美|每一件都想|性价比超级高.*性价比超级高)/;
// Nói tới giao hàng MÀ không có từ nào tả cái máy.
// `质量` (chất lượng) KHÔNG tính là từ tả máy: nó chung tới mức câu thuần về
// vận chuyển cũng có. Bản đầu xếp nó vào nhóm tả máy nên bỏ lọt đúng một ca
// ("物流和包装都很好…东西质量有保证").
const TU_TA_MAY = /轮|摇|线杯|刹车|出线|顺滑|做工|手感|齿|轴承/;
const CHI_VAN_CHUYEN = (t) => /物流|包装|发货|快递/.test(t) && !TU_TA_MAY.test(t);
const NHAM_HANG = /鱼竿|钓竿/;

const ds = khoi.map((k) => {
  k = k.slice(0, 9000);
  const ten = chu((k.match(/class="user-nick">(.*?)<\/span>/) || [])[1])
    || chu((k.match(/class="trade-info">[\s\S]*?<span>(.*?)<\/span>/) || [])[1]) || '?';
  const noi = chu((k.match(/class="content-text">(.*?)<\/div>/s) || [])[1]);
  const spec = chu((k.match(/class="trade-info-specInfo">(.*?)<\/div>/s) || [])[1]);
  const ngayTho = chu((k.match(/class="gmt-create">(.*?)<\/span>/) || [])[1]);
  const soNgay = Number((ngayTho.match(/(\d+)天前/) || [])[1]) || null;
  const sao = (k.match(/ant-rate-star ant-rate-star-full/g) || []).length || null;
  const anh = [...k.matchAll(/class="ant-image-img" src="([^"]+?-rate\.jpg[^"]*)"/g)].map((m) => goc(m[1]));
  const diaChi = chu((k.match(/class="feed-back-address">(.*?)<\/span>/) || [])[1]);

  const co = [...spec.matchAll(/([A-Z]{1,4}\d{3,5})/g)].map((m) => m[1]);
  const co_ = [...new Set(co)];
  return {
    nguoiMua: ten,
    sao: sao && sao <= 5 ? sao : null,
    ngayTruoc: soNgay,
    ngay: soNgay ? new Date(Date.now() - soNgay * 864e5).toISOString().slice(0, 10) : null,
    daMua: spec || null,
    coDaMua: co_,
    diaChi: diaChi || null,
    noiDung: noi,
    anh,
    co: {
      dongKhac: dong.length > 0 && co_.length > 0 && !co_.some((c) => dong.includes(c)),
      khenSuong: KHEN_SUONG.test(noi),
      nhamHang: NHAM_HANG.test(noi),
      chiVanChuyen: CHI_VAN_CHUYEN(noi),
    },
  };
}).filter((x) => x.noiDung || x.anh.length);

const thuMuc = lay('--ra') || 'rut/danh-gia';
fs.mkdirSync(thuMuc, { recursive: true });
fs.writeFileSync(path.join(thuMuc, 'danh-gia.json'), JSON.stringify(ds, null, 1));

const dem = (k) => ds.filter((x) => x.co[k]).length;
console.log(`đọc được ${ds.length} đánh giá\n`);
console.log(`  cờ dongKhac      ${dem('dongKhac')}   (mua cỡ ngoài dòng đang bán)`);
console.log(`  cờ khenSuong     ${dem('khenSuong')}   (khen tràn, không chi tiết)`);
console.log(`  cờ nhamHang      ${dem('nhamHang')}   (nói về sản phẩm khác)`);
console.log(`  cờ chiVanChuyen  ${dem('chiVanChuyen')}   (chỉ nói giao hàng)`);
const sach = ds.filter((x) => !Object.values(x.co).some(Boolean));
console.log(`\n  KHÔNG cờ nào: ${sach.length} — đây là nhóm nên xét trước`);
for (const x of sach.slice(0, 8)) {
  console.log(`   ${x.sao || '?'}★ ${x.ngay || '?'} ${String(x.coDaMua.join('/')).padEnd(16)} ${x.noiDung.slice(0, 46)}`);
}
console.log(`\n-> ${path.join(thuMuc, 'danh-gia.json')}`);
