/**
 * Cổng kiểm giọng cho TRANG SẢN PHẨM. Khác `kiemGiong` dùng cho blog.
 *
 * Vì sao tách ra: `kiemGiong` chỉ bắt TỪ NGỮ (từ cấm, câu dài, danh từ cụ thể).
 * Nó cho 10 mô tả sản phẩm đi qua sạch trong khi chúng chứa 57 dấu gạch ngang
 * và dùng chung một bộ H2 ở 8/10 sản phẩm — tức là toàn bộ thứ làm chủ shop
 * thấy "giọng AI" đều lọt. Thước đo sai thì bài bẩn trông như bài sạch; lỗi đó
 * đã trả giá hai lần trong dự án này.
 *
 * Chuẩn: `manager-ai/17fishing/GIONG-TRANG-SAN-PHAM.md`
 */
export function kiemGiongSanPham(html, { tenH2DaDung = new Set(), coBienThe = false } = {}) {
  const t = String(html || '')
    .replace(/<\/(p|li|h[1-6]|td|th|tr|div)>/gi, '. ')
    .replace(/<[^>]+>/g, ' ').replace(/\s*\.\s*\./g, '.').replace(/\s+/g, ' ').trim();
  const low = t.toLowerCase();
  const loi = [], nhac = [];
  const soTu = t.split(' ').filter(Boolean).length;

  // 1. Gạch ngang giữa câu: đối thủ 0/8 trang, mình 57. Đây là dấu hiệu rõ nhất.
  const gach = (t.match(/—/g) || []).length;
  if (gach) loi.push(`gạch ngang "—" ×${gach} (phải bằng 0, tách thành hai câu)`);

  // 2. Tiếng người trong nghề.
  if (!/anh em|cần thủ/i.test(t)) loi.push('không có tiếng nghề: thiếu "anh em" hoặc "cần thủ"');

  // 3. Phải chê. Nhận diện rộng vì cách diễn đạt nhiều kiểu.
  const che = /nhược điểm|hạn chế|điểm trừ|không hợp|chưa hợp|không dành cho|đừng (mua|lấy|chọn)|nặng tay|khó (dùng|bắt nhịp|làm quen)|đổi lại thì/i;
  if (!che.test(t)) loi.push('KHÔNG có câu nào nói món này dở hoặc không hợp với ai');

  // 4. Độ dài. Hàng có phân loại cần chỗ để dạy chọn.
  const min = coBienThe ? 600 : 350;
  if (soTu < min) loi.push(`chỉ ${soTu} từ (hàng ${coBienThe ? 'có phân loại' : 'đơn giản'} cần ≥${min})`);

  // 5. H2 trùng với sản phẩm khác — bộ xương dùng chung là cảm giác "máy viết".
  const h2 = [...String(html).matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  const trung = h2.filter((x) => tenH2DaDung.has(x));
  if (trung.length) loi.push(`H2 trùng sản phẩm khác: ${trung.join(' · ')}`);

  // 6. Giọng phân tích — chính là văn cũ của tôi.
  const PHAN_TICH = [/\bnghĩa là\b/gi, /cỡ nào trong (ba|bốn|năm|sáu|tám) (cỡ|mức|bản)/gi,
                     /\bđây là thứ\b/gi, /\bđổi lại\b/gi, /\bchọn theo\b/gi];
  PHAN_TICH.forEach((re) => { const n = (t.match(re) || []).length;
    if (n) nhac.push(`giọng phân tích "${re.source.replace(/\\b|\(|\)|\|/g, '').slice(0, 26)}" ×${n}`); });

  // 7. Câu quá đều nhau: văn người có nhịp lên xuống, văn máy thì phẳng.
  const cau = t.split(/(?<=[.!?:])\s+/).filter((c) => c.trim().split(' ').length > 3);
  const dai = cau.map((c) => c.split(' ').length);
  const tb = dai.reduce((a, b) => a + b, 0) / Math.max(1, dai.length);
  const lech = Math.sqrt(dai.reduce((a, b) => a + (b - tb) ** 2, 0) / Math.max(1, dai.length));
  if (dai.length >= 8 && lech < 4.5) nhac.push(`độ dài câu quá đều (lệch chuẩn ${lech.toFixed(1)}, nên >4,5)`);
  if (tb > 22) loi.push(`câu trung bình ${tb.toFixed(1)} từ (nên 12–18)`);

  return { loi, nhac, soTu, cauTB: +tb.toFixed(1), lechCau: +lech.toFixed(1), gach, h2 };
}
