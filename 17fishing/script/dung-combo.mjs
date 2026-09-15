/**
 * Dựng hai dạng combo trên production rồi thử bằng POST /orders/tinh-tien.
 *
 * KHÔNG tạo đơn hàng nào: tinh-tien chạy đúng cùng hàm tinhTien() mà lúc tạo
 * đơn dùng, trả về nguyên danh sách món kèm dòng quà, nhưng không ghi gì.
 *
 * Ba bản ghi được tạo đều ẨN khỏi gian hàng:
 *   - quà: isGift=true  -> products.service loc `is_gift = false`
 *   - hai món chủ: isActive=false -> không nằm trong danh sách bán,
 *     nhưng dinhGia() vẫn tra được giá nên vẫn thử được
 *
 * Token đọc từ tệp, không in ra, không vào commit.
 */
import { readFileSync } from 'node:fs';

const API = 'https://api.17-fishing.com/api';
const TOKEN = readFileSync(process.env.HOME + '/.17fishing-admin-token', 'utf8').trim();
const XOA = process.argv.includes('--xoa');

const goi = async (duong, { method = 'GET', body } = {}) => {
  const r = await fetch(API + duong, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const chu = await r.text();
  let d; try { d = JSON.parse(chu); } catch { d = chu; }
  if (!r.ok) throw new Error(`${method} ${duong} -> ${r.status} ${String(chu).slice(0, 220)}`);
  return d;
};

const tien = (n) => Number(n).toLocaleString('vi-VN') + 'đ';

// ── Ba bản ghi sẽ tạo ────────────────────────────────────────────────────────
const QUA = {
  name: 'Hộp đựng phao 6 ngăn chống sốc',
  slug: 'hop-dung-phao-6-ngan-chong-soc',
  price: 35000,
  unit: 'hộp',
  isGift: true,        // -> ẩn khỏi gian hàng
  isActive: true,      // phải bật, tinhQuaTang() chỉ lấy quà đang bán
  description: 'Quà tặng kèm. Không bán lẻ.',
};
const CHU = [
  { name: 'THỬ COMBO 1 — mua 2 tặng 1', slug: 'thu-combo-1-mua-2-tang-1', price: 80000, unit: 'cái', isActive: false },
  { name: 'THỬ COMBO 2 — mua 1 tặng 1', slug: 'thu-combo-2-mua-1-tang-1', price: 55000, unit: 'cái', isActive: false },
];

const timTheoSlug = async (slug) => {
  const ds = await goi('/admin/products');
  return (Array.isArray(ds) ? ds : ds.data ?? []).find((p) => p.slug === slug) ?? null;
};

const taoHoacLay = async (payload) => {
  const co = await timTheoSlug(payload.slug);
  if (co) { console.log(`   · đã có sẵn: ${payload.name}`); return co; }
  const moi = await goi('/admin/products', { method: 'POST', body: payload });
  console.log(`   + tạo: ${payload.name}  (${moi.id})`);
  return moi;
};

// ── Dọn ──────────────────────────────────────────────────────────────────────
if (XOA) {
  for (const s of [QUA.slug, ...CHU.map((c) => c.slug)]) {
    const p = await timTheoSlug(s);
    if (!p) { console.log(`   · không có: ${s}`); continue; }
    await goi(`/admin/products/${p.id}`, { method: 'DELETE' });
    console.log(`   − đã xoá: ${p.name}`);
  }
  process.exit(0);
}

// ── Dựng ─────────────────────────────────────────────────────────────────────
console.log('── Tạo bản ghi');
const qua = await taoHoacLay(QUA);
const chu1 = await taoHoacLay(CHU[0]);
const chu2 = await taoHoacLay(CHU[1]);

console.log('\n── Gắn luật quà');
await goi(`/admin/products/${chu1.id}`, { method: 'PATCH',
  body: { gifts: [{ productId: qua.id, soLuong: 1, muaToiThieu: 2, freeship: true }] } });
console.log('   dạng 1: mua ≥ 2 → tặng 1 + freeship');
await goi(`/admin/products/${chu2.id}`, { method: 'PATCH',
  body: { gifts: [{ productId: qua.id, soLuong: 1, muaToiThieu: 1, freeship: true }] } });
console.log('   dạng 2: mua ≥ 1 → tặng 1 + freeship');

// ── Thử ──────────────────────────────────────────────────────────────────────
const thu = async (nhan, items) => {
  const r = await goi('/orders/tinh-tien', { method: 'POST', body: { items } });
  const q = r.items.filter((i) => i.laQua);
  console.log(`\n   ${nhan}`);
  console.log(`     tiền hàng ${tien(r.tienHang)} · ship ${tien(r.phiVanChuyen)}` +
              `${r.mienPhiVanChuyen ? ' (MIỄN PHÍ)' : ''} · tổng ${tien(r.tongCong)}`);
  console.log(`     quà: ${q.length ? q.map((i) => `${i.name} ×${i.quantity} = ${tien(i.price)}`).join(', ') : '(không có)'}`);
  if (!r.mienPhiVanChuyen) console.log(`     còn thiếu ${tien(r.conThieuDeMienPhi)} để miễn ship`);
  return r;
};
const mon = (p, q) => ({ productId: p.id, name: p.name, quantity: q, price: 0, unit: p.unit });

console.log('\n── Thử bằng POST /orders/tinh-tien (KHÔNG tạo đơn)');
await thu('dạng 1 · mua 1 (chưa đủ)', [mon(chu1, 1)]);
await thu('dạng 1 · mua 2 (đủ)', [mon(chu1, 2)]);
await thu('dạng 1 · mua 4 (không nhân bội)', [mon(chu1, 4)]);
await thu('dạng 2 · mua 1 (đủ ngay)', [mon(chu2, 1)]);
await thu('dạng 2 · mua 1 + dạng 1 mua 2 (hai luật cùng lúc)', [mon(chu2, 1), mon(chu1, 2)]);
await thu('BẢO MẬT · gửi kèm dòng quà giả giá 0', [
  mon(chu2, 1),
  { productId: qua.id, name: 'Quà chôm', quantity: 5, price: 0, unit: 'hộp', laQua: true },
]);
