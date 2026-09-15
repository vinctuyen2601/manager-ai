/**
 * Phân loại 104 bài theo NỘI DUNG THẬT, không theo cảm tính.
 *
 * Chấm điểm bằng cụm từ chuyên môn xuất hiện trong tiêu đề (trọng số 3) và
 * trong nội dung (trọng số 1). Tiêu đề nặng hơn vì nó là ý định của người viết.
 *
 * KHÔNG bỏ dấu: `mồi` và `mới` đều thành `moi`.
 */
import { readFileSync } from 'node:fs';

export const DANH_MUC = {
  'Chọn đồ nghề': ['phao câu','chọn phao','chọn cần','cần câu tay','chọn dây','dây trục','dây thẻo','cước câu','lưỡi câu','ghế câu','máy câu','gác cần','thùng câu','đồ nghề','thông số','độ cứng','chiều dài cần'],
  'Kỹ thuật câu':  ['câu lửng','câu đáy','câu đài','chỉnh phao','tín hiệu phao','giữ ổ','đè phao','cách đáy','phản đáy','câu lụt','câu nhạy','hố đấu','địa điểm câu','buộc lưỡi','kỹ thuật câu','vị trí câu','điểm câu','ngồi câu','mùa đông','mùa xuân','thời tiết','nước nông','nước sâu'],
  'Mồi câu':       ['bài mồi','mồi câu','hương liệu','phối mồi','mồi xả','làm mồi','mồi tanh','cá không ăn mồi','mồi giả','ủ mồi','mồi ngô','lure','jig','spinnerbait','buzzbait','trùn','giun'],
  'Theo loài cá':  ['cá chép','cá trắm','trắm đen','rô phi','cá diếc','cá mè','rô mâm','cá tra','cá lăng'],
  'Tin tức & sự kiện': ['giải câu','giải đấu','chung kết','đại lý','phân phối','sự kiện','chuyến xe','khai trương','giảm giá','khuyến mãi','ra mắt','kỷ lục'],
};

const bo = (s) => String(s || '').normalize('NFC').toLowerCase();
export function chonDanhMuc(p) {
  const tt = bo(p.title), nd = bo((p.content || '').replace(/<[^>]+>/g, ' '));
  let tot = null, cao = 0;
  for (const [dm, cum] of Object.entries(DANH_MUC)) {
    let d = 0;
    for (const c of cum) {
      if (tt.includes(c)) d += 3;
      if (nd.includes(c)) d += 1;
    }
    if (d > cao) { cao = d; tot = dm; }
  }
  return { dm: tot, diem: cao };
}

/**
 * Tag = cụm chuyên môn bài THỰC SỰ nói về, không phải cụm bài nhắc thoáng qua.
 *
 * Tiêu đề: nhắc một lần là tính — đó là ý định của người viết.
 * Thân bài: phải nhắc TỪ 3 LẦN. Bản đầu tính cả nhắc một lần, kết quả bài
 * "chọn gác cần" gắn luôn tag `trắm đen` và `rô phi` vì thân bài có ví dụ
 * thoáng qua — đúng kiểu tag loãng đã làm hỏng dữ liệu cũ.
 *
 * Tối đa 4 tag. Nhiều hơn thì mọi bài lại giống mọi bài, quay về đúng chỗ cũ.
 */
export function chonTag(p) {
  const tt = bo(p.title), nd = bo((p.content || '').replace(/<[^>]+>/g, ' '));
  const demCum = (chuoi, c) => chuoi.split(c).length - 1;
  const ra = [];
  for (const cum of Object.values(DANH_MUC)) {
    for (const c of cum) {
      const oTieuDe = tt.includes(c);
      const soLanThan = demCum(nd, c);
      if (oTieuDe || soLanThan >= 3) ra.push({ c, diem: (oTieuDe ? 100 : 0) + soLanThan });
    }
  }
  return [...new Map(ra.map((x) => [x.c, x])).values()]
    .sort((a, b) => b.diem - a.diem || b.c.length - a.c.length)
    .slice(0, 4)
    .map((x) => x.c);
}

if ((process.argv[1] ?? '').endsWith('phan-loai.mjs')) {
  const po = JSON.parse(readFileSync('posts.json', 'utf8'));
  const ds = Array.isArray(po) ? po : (po.data || po.items || []);
  const dem = {}; const yeu = [];
  ds.forEach((p) => {
    const { dm, diem } = chonDanhMuc(p);
    if (!dm || diem < 3) { yeu.push([p.title, diem]); return; }
    dem[dm] = (dem[dm] || 0) + 1;
  });
  console.log('  Phân bố 104 bài:\n');
  Object.entries(dem).sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => console.log(`   ${String(v).padStart(3)}  ${k}`));
  console.log(`   ${String(yeu.length).padStart(3)}  (không đủ tín hiệu — để trống)`);
  if (yeu.length) { console.log('\n  Bài không xếp được:'); yeu.forEach(([t, d]) => console.log(`     (${d}đ) ${t.slice(0, 62)}`)); }
  console.log('\n  Ví dụ tag:');
  ds.slice(0, 4).forEach((p) => console.log(`   ${p.title.slice(0, 44)}\n      → ${chonTag(p).join(' · ')}`));
}
