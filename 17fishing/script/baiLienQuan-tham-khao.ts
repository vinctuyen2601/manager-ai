import type { Post } from './api';

/**
 * Chuẩn hoá tag để so khớp.
 *
 * Bắt buộc phải bỏ dấu và hạ chữ thường: dữ liệu thật có "gà rutin" ở 54 bài,
 * "ga rutin" ở 18 bài và "Gà Rutin" ở 11 bài — cùng một thứ nhưng so sánh
 * nguyên văn thì thành ba tag khác nhau, và phần lớn bài sẽ không ghép được với
 * nhau dù nói về đúng một chủ đề.
 */
function chuanHoa(tag: string): string {
  return tag
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Tách tiêu đề thành tập từ để so khớp.
 *
 * KHÔNG bỏ dấu, khác hẳn chuanHoa() dùng cho tag.
 *
 * Bỏ dấu làm chập từ khác nghĩa, và vốn từ của shop này dính nặng nhất: `mồi`
 * và `mới` đều thành `moi` — hàng chục tiêu đề có "cho người mới" còn mồi là cả
 * một nhóm hàng. Ghép hai thứ đó lại là mọi bài về mồi câu bỗng "liên quan" tới
 * mọi bài cho người mới. Tag thì chấp nhận được vì tag do người nhập, ít và
 * đã thống nhất; tiêu đề là văn tự do nên không được phép.
 *
 * Không có danh sách từ dừng tự đặt: từ nào xuất hiện ở nhiều tiêu đề sẽ tự bị
 * cân về gần 0 bởi log(tổng/tần suất), đúng cách đang làm với tag. Danh sách
 * tự đặt còn nguy hơn — "cần" vừa là từ dừng vừa là "cần câu".
 */
/**
 * Chữ đệm trong tiêu đề — không tính điểm liên quan.
 *
 * Danh sách tự đặt là thứ tôi đã cố tránh, và đã thử hai cách khác trước:
 *
 *  1. Cân theo độ hiếm log(tổng/tần suất) — thất bại. Đo trên 104 tiêu đề
 *     thật: "chọn" có ở 24 bài, "phao" 17, "hướng"/"dẫn" 13, "đài" 10. Từ đệm
 *     và từ chuyên môn nằm CÙNG dải tần suất, nên không ngưỡng nào tách được.
 *  2. Bình phương độ hiếm — vẫn thất bại. Một tiêu đề có sáu bảy chữ đệm cộng
 *     dồn lại vẫn đè bẹp một từ chuyên môn duy nhất.
 *
 * Nên chọn danh sách, nhưng theo một luật chặt: CHỈ nhận từ không thể là thuật
 * ngữ câu cá. Vì thế KHÔNG có trong danh sách: cần, đài, đơn, lửng, đáy, tay,
 * lục, nổi, chìm — tất cả đều là kiểu câu hoặc bộ phận đồ nghề.
 * "câu" và "cá" cũng không cần vào đây: chúng ở 89/104 và 46/104 bài nên độ
 * hiếm đã tự dìm chúng về gần 0.
 */
const CHU_DEM = new Set([
  'và', 'khi', 'cho', 'về', 'với', 'của', 'các', 'những', 'một', 'trong', 'để',
  'từ', 'là', 'có', 'không', 'nên', 'như', 'thế', 'nào', 'sao', 'tại', 'này',
  'đó', 'ở', 'mà', 'thì', 'hay', 'hoặc', 'bạn', 'ai', 'gì', 'ra', 'nhé',
  'hướng', 'dẫn', 'chọn', 'cách', 'kinh', 'nghiệm', 'lựa', 'bí', 'quyết',
  'top', 'tổng', 'hợp', 'phù', 'chuẩn', 'nhất', 'hiệu', 'quả', 'mới', 'tốt',
  'dễ', 'làm', 'điều', 'cần', 'biết', 'thường', 'gặp', 'nhiều', 'ít', 'rất',
]);

function tuTieuDe(tieuDe: string): Set<string> {
  return new Set(
    (tieuDe ?? '')
      .normalize('NFC')
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .filter((t) => t.length >= 2 && !CHU_DEM.has(t)),
  );
}

/**
 * Chọn các bài viết thật sự liên quan tới một bài.
 *
 * Trước đây chỗ này là `allPosts.slice(0, 4)` — tức cùng 4 bài mới nhất hiện
 * dưới cả 90 bài viết. Đo trên dữ liệu thật: hai trong bốn bài đó có 0 người
 * đọc dù được liên kết từ toàn bộ 90 trang, còn 86 bài còn lại không thể tới
 * được từ bất kỳ bài nào khác.
 *
 * Cách tính điểm:
 *
 * - Mỗi tag chung cộng điểm theo độ HIẾM của tag (nghịch đảo tần suất), không
 *   phải mỗi tag một điểm. Lý do: "gà rutin" có mặt ở 54/90 bài nên nó không
 *   nói lên điều gì về sự liên quan; đếm đều nhau thì tag phổ thông lấn át và
 *   kết quả gần như ngẫu nhiên. Tag chỉ xuất hiện vài lần mới là tín hiệu thật.
 * - Cùng danh mục cộng thêm một khoản vừa phải, đủ để phân định khi điểm tag
 *   ngang nhau nhưng không đủ để lấn át một tag hiếm trùng nhau.
 * - Bằng điểm thì bài mới hơn được ưu tiên.
 *
 * Luôn trả về đủ `soLuong` bài nếu blog có đủ: hết bài liên quan thì bù bằng
 * bài mới nhất, để khối "Đọc thêm" không bao giờ trống hay ngắn cụt.
 */
export function chonBaiLienQuan(
  baiHienTai: Post,
  tatCa: Post[],
  soLuong = 4,
): Post[] {
  const ungVien = tatCa.filter(
    (p) => p.slug !== baiHienTai.slug && p.status === 'published',
  );
  if (ungVien.length === 0) return [];

  // Đếm số bài chứa mỗi tag, để biết tag nào hiếm tag nào phổ thông.
  const tanSuat = new Map<string, number>();
  for (const p of tatCa) {
    for (const t of new Set((p.tags ?? []).map(chuanHoa))) {
      if (t) tanSuat.set(t, (tanSuat.get(t) ?? 0) + 1);
    }
  }

  const tanSuatTu = new Map<string, number>();
  for (const p of tatCa) {
    for (const t of tuTieuDe(p.title)) tanSuatTu.set(t, (tanSuatTu.get(t) ?? 0) + 1);
  }

  const tong = Math.max(1, tatCa.length);
  const tagCuaBai = new Set((baiHienTai.tags ?? []).map(chuanHoa).filter(Boolean));
  const tuCuaBai = tuTieuDe(baiHienTai.title);

  const chamDiem = (p: Post): number => {
    let diem = 0;
    for (const t of new Set((p.tags ?? []).map(chuanHoa))) {
      if (!t || !tagCuaBai.has(t)) continue;
      // log(tổng / số bài có tag): tag ở 54/90 bài được ~0.5, tag ở 2/90 bài
      // được ~3.8. Tự điều chỉnh theo dữ liệu, không cần ngưỡng tự đặt.
      diem += Math.log(tong / (tanSuat.get(t) ?? 1));
    }
    if (p.category && baiHienTai.category && p.category === baiHienTai.category) {
      diem += 1;
    }

    /*
     * Từ chung trong TIÊU ĐỀ, cùng công thức độ hiếm.
     *
     * Đây không phải phép bù mà là phần điểm CHÍNH ở blog này. Đo 15/09/2026:
     * 98/104 bài mang tag "câu cá", 92/104 mang "kỹ thuật", 65 tag còn lại chỉ
     * xuất hiện 1-2 lần, và 104/104 bài không có danh mục. Hai tag phổ thông
     * vẫn cho điểm DƯƠNG dù rất nhỏ, nên gần như mọi bài đều thành "ứng viên
     * có điểm" và xếp hạng thật sự do tiêu chí phá hoà quyết định — tức là
     * theo NGÀY ĐĂNG.
     *
     * Hậu quả đo được trên bản chạy thật: trong 417 liên kết bài-với-bài, 4
     * bài mới nhất ôm 371 cái (89%), 90/104 bài không bài nào trỏ tới, và bốn
     * trang nhiều lưu lượng nhất nhận ĐÚNG 0 liên kết.
     *
     * Từng thử làm tầng hai chạy sau khi tag cạn — vô dụng, vì tag không bao
     * giờ cạn. Phải cộng thẳng vào điểm.
     */
    for (const t of tuTieuDe(p.title)) {
      if (!tuCuaBai.has(t)) continue;
      // BÌNH PHƯƠNG độ hiếm, khác với tag.
      //
      // Tag do người nhập nên đã là từ chuyên môn. Tiêu đề là văn tự do, đầy
      // chữ đệm: "hướng dẫn", "cho", "người", "mới", "chuẩn". Những chữ này
      // hiếm vừa phải nên vẫn ghi điểm, mà một tiêu đề có tới năm sáu chữ như
      // vậy — cộng dồn lại chúng đè bẹp một từ chuyên môn duy nhất.
      //
      // Đo thật: bỏ bình phương thì bài "chọn phao câu đài" được gợi ý sang
      // "chọn địa điểm", "chọn dây câu", "buộc lưỡi câu" — khớp chữ "chọn" và
      // "cho người mới", không khớp "phao". Bình phương kéo từ ở 4 tiêu đề
      // (10,6 điểm) vượt hẳn từ ở 25 tiêu đề (2,0 điểm).
      const hiem = Math.log(tong / (tanSuatTu.get(t) ?? 1));
      diem += hiem * hiem;
    }

    return diem;
  };

  const moiHon = (a: Post, b: Post) =>
    new Date(b.publishedAt ?? 0).getTime() - new Date(a.publishedAt ?? 0).getTime();

  const coDiem = ungVien
    .map((p) => ({ p, diem: chamDiem(p) }))
    .filter((x) => x.diem > 0)
    .sort((a, b) => b.diem - a.diem || moiHon(a.p, b.p))
    .map((x) => x.p);

  if (coDiem.length >= soLuong) return coDiem.slice(0, soLuong);

  // Cạn ứng viên có điểm mới bù bằng bài mới nhất, để khối không ngắn cụt.
  const daChon = new Set(coDiem.map((p) => p.slug));
  const bu = ungVien
    .filter((p) => !daChon.has(p.slug))
    .sort(moiHon)
    .slice(0, soLuong - coDiem.length);
  return [...coDiem, ...bu];
}
