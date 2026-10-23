# Khung 01 — "Every CHRISTMAS lover NEEDS this" (FrostGlow)

Bóc tay ngày 23/10/2026 từ tệp chủ dự án tải về (`Image from iOS.mp4`). Bản
chép video ở `thu-nghiem/khung/reel-01/goc.mp4` (gitignore, chỉ trên `David-PC`).
Đây là khung đầu tiên của thư viện M3 và là **mẫu chuẩn** cho các khung sau.

## Bằng chứng viral

| | |
|---|---|
| Nguồn | TikTok, tài khoản **@frostglowofficial** (watermark trong video). Đây là **quảng cáo của chính hãng**, không phải UGC |
| Link gốc | ⬜ chưa có — chủ dự án gửi |
| Lượt xem, người theo dõi, ngày đăng | ⬜ chưa có |
| Kỹ thuật | 15,8 s · **576×1024** (dọc, phân giải thấp do tải lại) · 30 fps · AAC stereo 44,1 kHz, TB −20 dB |
| Nội dung thật | **0–11,8 s**. Từ 11,8 s là màn kết TikTok (logo + tên tài khoản), bỏ |

Đo bằng: ffprobe; ffmpeg `scene > 0,3` (4 cắt) và `> 0,15` (10 cắt); lưới khung 2 fps
có nhãn giờ; `faster-whisper small` bóc lời theo từ (`cong-cu/boc-loi.py`).

## Tầng 1 — Format

**Demo POV "mua → mở → lắp → bật" (narration-free demo).** Không người dẫn, không lời
thoại; chỉ tay người quay (áo len kem) + một dòng chữ cố định + nhạc Giáng sinh. Gần
nhất với playbook Hypit `narration-led-demo`, nhưng **không có narration**: nhịp do
nhạc và cú "bật đèn" gánh.

- Chữ trên hình, **cố định suốt 0–11,8 s**: `Every CHRISTMAS lover NEEDS this...❄️😍` (trắng, viền đen, giữa trên).
- Tiếng: **chỉ nhạc** — *Rockin' Around the Christmas Tree*. Lời hát vào **6,83 s**
  ("Rockin'…"), kéo tới 11,65 s ("…Christmas party"). Phần trước là dạo nhạc.
- Cú chốt: **bật đèn ở 7,9 s**, ~1 s sau khi lời hát vào — reveal canh theo nhạc.
- Không CTA, không giá, không logo cuối (ngoài hộp sản phẩm ở cảnh 1–3).

## Tầng 2 — Cảnh theo giây

| # | Giây | Cỡ cảnh · máy | Vai trò | Hình | Vì sao hiệu quả |
|---|---|---|---|---|---|
| 1a | 0–1,6 | POV trung, cầm tay | **Hook** | Lối **kệ siêu thị** xếp đầy **hộp sản phẩm** (hộp bán lẻ đẹp, in logo + hình bông tuyết); tay với, rút một hộp | "Thấy ngoài đời" → hàng thật, đang bán chạy (kệ đầy) |
| 1b | 1,6–2,6 | POV cận | **Khoe hộp** | Giơ thẳng **mặt hộp** vào máy quay, logo đọc rõ | Hộp đẹp = quà tặng được; nhãn hàng in vào mắt |
| 2 | 2,7–3,6 | POV trung | Quyết định mua | Thả hộp vào xe đẩy | Hành động mua — khán giả "mua theo" |
| 3 | 3,6–6,2 | POV cận, bàn | Khoe hàng | Ở nhà, cạnh cây thông: đặt hộp, mở nắp, thấy đèn + dây trong hộp | Đổi bối cảnh = về nhà; mở hộp thoả tò mò |
| 4a | 6,2–6,97 | POV trung, tường phòng khách | Lắp | Cầm bông tuyết lớn áp lên tường (cạnh tủ, cây thông) | Cho thấy **dễ lắp** mà không cần nói |
| 4b | 6,97–7,4 | POV trung, **tường khác** | Lắp | Bông tuyết thứ hai, góc khác (dưới có quả thông) | Nhịp: hai lần lắp liền nhau |
| 5–6 | 7,4–8,5 | POV rộng, **một cảnh liền** | Căng → **Reveal** | Tường phủ kín bông tuyết (tắt), giơ remote; ở **7,9 s** bấm → cả tường sáng xanh/trắng, cùng góc máy | Chờ 0,5 s rồi bật, khớp nhạc. *(Máy dò cắt cảnh báo nhầm "cắt" ở 7,9 s do độ sáng đổi đột ngột — không phải chuyển cảnh)* |
| 7 | 8,5–9,5 | Rộng, tĩnh | Chứng minh | Phòng ngủ, tường đầu giường sáng | Dùng được nhiều chỗ |
| 8 | 9,5–10,7 | Rộng, lia nhẹ | Chứng minh | Cầu thang sáng | — |
| 9 | 10,7–11,8 | Trung, tĩnh | Chứng minh / kết | Gương nhà tắm viền bông tuyết sáng | Kết bằng hình đẹp nhất, không CTA |

*Sửa 23/10 sau khi soát 4 khung/giây + chủ dự án chỉ ra:* cảnh 1 tách 1a/1b, cảnh 4 là hai tường, cảnh 5–6 một cảnh liền.

Nhịp: 9 cảnh / 11,8 s, **cảnh dài nhất 2,6 s, ngắn nhất 0,5 s**; nửa sau (6–9) mỗi cảnh ~1 s.

## Tầng 3 — Phán quyết chuyển sang AI

| # | Phán quyết | Lý do · cách làm |
|---|---|---|
| 1a–1b | ✅ **Dùng thẳng** (chủ dự án chốt 23/10: giữ **kệ siêu thị** + **hộp sản phẩm đẹp**; bản trước đổi thành "hộp giao trước cửa" là SAI — làm mất cú hook) | Cần **ảnh mặt ngoài hộp đóng** làm tham chiếu (chưa có — `giftbox.webp` của store là hộp ĐANG MỞ). Rủi ro: hàng chục hộp có chữ trên kệ = chỗ Muse vẽ sai chữ; mặt hộp ở 1b phải đúng. Lưu ý: cảnh kệ siêu thị ngụ ý hàng có bán ở cửa hàng — chủ dự án quyết |
| 2 | ✅ Dùng thẳng | Thả hộp vào xe đẩy |
| 3 | ✅ Dùng thẳng | Mở hộp trên bàn cạnh cây thông: cảnh cận, nhìn thẳng — loại Muse giữ hình tốt nhất. Cần **ảnh bên trong hộp thật** làm tham chiếu (chưa có) |
| 4 | ✅ Dùng thẳng | Lắp sản phẩm: Santa Spins = gắn máy lên cửa tủ lạnh; Memory Globe = đặt quả cầu lên đế |
| 5 | ✅ Dùng thẳng | Khoảnh khắc chờ: Santa Spins = cầm đĩa đưa về phía máy; Globe = ngón tay chạm nút |
| 6 | ✅ Dùng thẳng | Reveal: Santa Spins = đĩa quay + vòng đèn sáng + **bài hát bắt đầu** (chức năng thật trùng với cú chốt nhạc); Globe = video trong cầu bật sáng. **Đã thử ở Muse** (clip 1, 23/10): giữ hình tốt |
| 7–9 | 🔁 Đổi | Gốc khoe "nhiều phòng" vì đèn dùng được khắp nơi. Santa Spins chỉ ở tủ lạnh → đổi thành **"nhiều người"**: cả nhà quây quanh bếp, trẻ con chọn đĩa, đổi đĩa → đổi bài. Có người = rủi ro giữ mặt (chưa đo). Globe: kệ, bàn đầu giường, bên cây thông |

**Loại sản phẩm hợp:** đồ trang trí / đồ gia dụng **có khoảnh khắc "bật lên"** rõ
(sáng, phát, chạy) trong 1 giây; đóng hộp đẹp. Không hợp: hàng không có trạng thái
bật/tắt (quần áo, đồ câu cá…).

**Chuyển được?** ✅ Có — reel ăn khách nhờ cấu trúc (hook + reveal khớp nhạc), không
nhờ người nổi tiếng hay meme.

## Không lấy

- **Nhạc gốc** — *Rockin' Around the Christmas Tree* có bản quyền. Chỉ lấy **mốc**:
  nhạc dạo 0–6,8 s, lời/beat vào 6,8 s, reveal ngay sau. Thay bằng nhạc có giấy phép có
  chỗ "vào" tương tự (câu hỏi mở mục 13: chưa chọn kho nhạc).
- Câu chữ nguyên văn `Every CHRISTMAS lover NEEDS this...` — viết câu mới cùng vai trò.
- Hình gốc, logo FrostGlow.

## Ước tính hạn mức Muse

Giữ đủ 9 cảnh ≈ 9 clip ≈ **27 % hạn mức tuần** (~3 %/clip, đo 23/10). Gộp cảnh 1+2 và
7–9 thành 1–2 cảnh ≈ 6 clip ≈ 18 %. Đây là ví dụ đúng của quy tắc "hạn mức tính theo
số cảnh" (`CLAUDE.md`).
