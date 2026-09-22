/**
 * Dò ảnh hỏng trên toàn site bằng cách ĐI THEO LIÊN KẾT, không chỉ theo sitemap.
 *
 * Vì sao phải viết riêng (22/09/2026): hôm 21/09 tôi quét 117 URL trong sitemap
 * rồi báo với chủ shop "0 ảnh hỏng". Hôm sau công cụ quét của chủ shop trả về 6
 * ảnh 404, mỗi ảnh có 1 liên kết trỏ tới. Tôi đúng trong phạm vi mình quét, và
 * phạm vi đó thiếu: **trang phân trang không nằm trong sitemap**. Cái còn sót
 * nằm ở `/blog?page=6`.
 *
 * Bài học cùng họ với mấy lần trước trong dự án này: thước đo hẹp hơn thực tế
 * thì trang bẩn trông như trang sạch, và con số 0 lại là con số dễ tin nhất.
 *
 * Thêm một chuyện nữa đáng nhớ: trang ít người vào có thể phục vụ HTML cũ rất
 * lâu do ISR. `/blog?page=6` vẫn trả ảnh cũ nhiều giờ sau khi CSDL đã sửa, và
 * chỉ tự lành sau lần yêu cầu đầu tiên. Nên quét HAI LƯỢT: lượt đầu hâm nóng,
 * lượt sau mới là kết quả thật.
 *
 * Dùng: node quet-anh-hong.mjs [https://17-fishing.com]
 */
const GOC = process.argv[2] || 'https://17-fishing.com';
const UA = { 'User-Agent': 'Mozilla/5.0 (kiem-noi-bo)' };
const TOI_DA = 400;

async function hangDoi(ds, n, fn) {
  const ra = []; let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < ds.length) { const k = i++; ra[k] = await fn(ds[k]); }
  }));
  return ra;
}

/** Bò theo liên kết từ trang chủ + sitemap. Giữ cả query vì phân trang nằm ở đó. */
async function bo() {
  const daXem = new Set();
  const hang = [GOC + '/'];
  try {
    const sm = await (await fetch(GOC + '/sitemap.xml', { headers: UA })).text();
    for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) hang.push(m[1]);
  } catch { /* không có sitemap cũng bò được */ }
  const anh = new Map();   // url ảnh -> trang đầu tiên dùng nó
  while (hang.length && daXem.size < TOI_DA) {
    const lo = hang.splice(0, 8).filter((u) => !daXem.has(u));
    lo.forEach((u) => daXem.add(u));
    await hangDoi(lo, 8, async (u) => {
      let h = '';
      try { const r = await fetch(u, { headers: UA }); if (r.status !== 200) return; h = await r.text(); }
      catch { return; }
      for (const m of h.matchAll(/<img[^>]+src="([^"]+)"/gi)) {
        const s = m[1].replace(/&amp;/g, '&');
        if (!anh.has(s)) anh.set(s, u);
      }
      for (const m of h.matchAll(/href="(\/[^"']*)"/g)) {
        const l = GOC + m[1].replace(/#.*$/, '');
        if (!daXem.has(l) && !hang.includes(l) && !/\.(jpg|png|webp|svg|xml|ico)$/i.test(l)) hang.push(l);
      }
    });
  }
  return { daXem, anh };
}

const { daXem, anh } = await bo();
console.log(`đã bò ${daXem.size} trang · ${anh.size} URL ảnh khác nhau`);

/**
 * Thử lại khi lỗi MẠNG, và chỉ khi lỗi mạng.
 *
 * Bản đầu chạy 12 luồng rồi báo một ảnh "hỏng" với mã 0 — hoá ra là lỗi tạm
 * thời của chính mình, gọi riêng ba lần đều trả 206. Báo động giả trong công
 * cụ kiểm còn hại hơn không có công cụ: lần sau thấy nó kêu sẽ không ai tin.
 *
 * 404 thì KHÔNG thử lại: đó là câu trả lời dứt khoát của máy chủ.
 */
const kq = await hangDoi([...anh.keys()], 8, async (s) => {
  const u = s.startsWith('http') ? s : GOC + s;
  for (let lan = 0; lan < 3; lan++) {
    try {
      const r = await fetch(u, { headers: { ...UA, Range: 'bytes=0-0' } });
      return { s, u, status: r.status, ct: r.headers.get('content-type') || '' };
    } catch (e) {
      if (lan === 2) return { s, u, status: 0, ct: 'LỖI MẠNG sau 3 lần: ' + e.message };
      await new Promise((r) => setTimeout(r, 400 * (lan + 1)));
    }
  }
  return { s, u, status: 0, ct: '' };
});
const hong = kq.filter((x) => ![200, 206].includes(x.status));
console.log(hong.length ? `\n✗ ${hong.length} ẢNH HỎNG:` : '\n✓ không có ảnh hỏng');
hong.forEach((x) => console.log(`   ${x.status}  ${x.u.slice(0, 92)}\n        trên trang: ${anh.get(x.s).replace(GOC, '')}`));
process.exit(hong.length ? 1 : 0);
