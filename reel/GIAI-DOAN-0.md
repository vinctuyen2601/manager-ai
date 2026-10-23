# Giai đoạn 0 — phép thử

Mục đích: biết **AI video có giữ được hình sản phẩm đủ tốt để đăng không** và
**một video 15 giây thật sự tốn bao nhiêu**, trước khi viết dòng mã sản phẩm nào.

Chưa đặt ngày: qua cửa bằng số đo, không theo lịch.

## Cửa 0 — qua khi cả hai đúng

1. Sản phẩm giữ đúng hình dáng, màu, logo qua các cảnh có sản phẩm.
2. Chi phí thật một video 15 giây nằm dưới trần **$10**.

Không qua thì đổi model video rồi thử lại, chứ không sang giai đoạn 1.

## Tiếp tục ở máy khác — đọc trước

Ngày 23/10 dừng ở đây, chủ dự án chuyển sang máy ở nhà. Máy cũ (máy công ty)
đã kiểm: Node 22.22 đủ; **ffmpeg chưa có**; không GPU. Máy nhà chưa kiểm gì.

Việc đầu tiên ở máy mới:

1. `cd ~/my-project/manager-ai && git pull`
2. Kiểm công cụ: `node -v` (cần ≥ 22.15), `ffmpeg -version`, `python3 --version`. Thiếu ffmpeg thì cài.
3. ~~Tạo tài khoản HypiHub~~ — bỏ, đắt. Làm **phép thử Muse** bên dưới trước.
4. Chủ dự án tự cài skill Hypit khi sẵn sàng (chưa cho phép tự cài).

### Máy Windows `David-PC` — kiểm 23/10/2026

| | có | đủ? |
|---|---|---|
| Node | v23.11.1 | ✅ (cần ≥ 22.15) |
| ffmpeg / ffprobe | bản 2026-08-27 (gyan.dev essentials) | ✅ |
| Python | 3.10.10 — gọi bằng **`python`**, KHÔNG phải `python3` (`python3` là lối tắt Microsoft Store, in "Python was not found") | ✅ cho rembg, Real-ESRGAN; whisperx cần ≥ 3.9 |
| GPU | **NVIDIA GTX 1660 SUPER 6 GB** + Intel UHD 730 | đủ chạy whisperx model `small`/`medium`, rembg, Real-ESRGAN ở máy; không đủ chạy model video ở máy (không cần) |
| RAM | 32 GB | ✅ |
| pnpm | ❌ chưa có | Hypit cần — cài khi chủ dự án cài Hypit |
| yt-dlp | ❌ chưa có | M3 tải reel mẫu cần |

Máy này cũng là máy làm theme Shopify (`D:/my project/shop-christmasspin`).

## Phép thử Muse — 10 phút, không tốn tiền

Câu hỏi duy nhất: **Muse có giữ đúng hình sản phẩm qua 2 clip nối nhau không?**

1. Vào muse.ai, tải lên 2–3 ảnh Santa Spins. Đặt tên tệp bằng chữ ASCII, ví dụ `santa-spins-front.jpg`; tên có dấu hay chữ Trung bị từ chối.
2. Nhờ agent chạy `media-generation` dạng video, `--orientation vertical`, ảnh sản phẩm làm `--image-file`:
   - **Clip 1:** cận cảnh tay cầm xoay sản phẩm chậm, nền sạch.
   - **Clip 2:** sản phẩm được dùng thật. Lấy khung cuối clip 1 làm khung đầu để nối liền.
3. Tải 2 clip về, xem và ghi vào bảng kết quả bên dưới:
   - Logo, chữ, màu, hình dáng có đúng ảnh gốc không? Cảnh nào sai?
   - Tỉ lệ kích thước có hợp lý không?
   - Clip dài bao nhiêu giây, độ phân giải bao nhiêu, có tiếng gốc không?
   - Hạn mức tuần giảm bao nhiêu % sau 2 clip?
4. Nếu còn thời gian, thử thêm 1 clip có ảnh người mẫu thật, để xem mặt giữ được tới đâu.

**Đọc kết quả:**
- Sản phẩm giữ đúng ở cả 2 clip → viết skill "Máy làm Reel" chạy trong Muse làm đường chính.
- Sản phẩm méo hoặc sai logo → chuyển sang BytePlus Seedance (khoảng $2–3/video), Muse chỉ để thử.

## Việc

- [x] Chốt trần chi phí, người mẫu, độ dài (23/10: $10 · ảnh thật, thiếu thì AI tạo · 15 giây)
- [x] Chốt nhà cung cấp giai đoạn 0: ~~HypiHub~~ → Muse trước, BytePlus dự phòng (23/10)
- [ ] **Phép thử Muse 10 phút** (mục trên)
- [ ] Cài ffmpeg trên máy chạy
- [ ] Cài skill Hypit (chủ dự án tự làm)
- [x] Chọn 3 sản phẩm ở 3 ngách khác nhau, có cả ảnh đẹp lẫn ảnh xấu (23/10, bảng dưới)
- [ ] Làm M0 bằng tay cho 3 sản phẩm đó: kiểm ảnh, sơ chế, ra tờ sản phẩm + bản tóm tắt
- [ ] Chọn 3 reel viral tiếng Anh (TikTok, Facebook Reels, Top Ads), khác ngách và khác format; ghi lượt xem, ngày đăng
- [ ] Thử Muse: 3 clip dọc, ghi lại sản phẩm và mặt người mẫu có giữ được không
- [ ] Cài skill Hypit vào Claude Code, chạy 1 video qua Seedance
- [ ] Ghi chi phí thật và số lần sinh lại mỗi cảnh vào bảng dưới
- [ ] Quyết Cửa 0: đi tiếp, đổi model, hay dừng

## Sản phẩm thử

| # | Sản phẩm | Ngách | Nguồn | Ảnh (tốt / xấu) | Ghi chú M0 |
|---|---|---|---|---|---|
| 1 | Santa Spins | Quà Giáng sinh | Store Shopify (`../shopify/`) | Ảnh store, chưa kiểm | |
| 2 | Santa's Memory Globe™ | Quà cá nhân hoá | Store Shopify (`../shopify/SAN-PHAM-2-MEMORY-ORB.md`) | Ảnh store, chưa kiểm | |
| 3 | Một món 17fishing, chưa chọn món nào | Đồ câu cá | API 17fishing | Ảnh 1688 dính chữ Trung: ca ảnh xấu | Cần xoá chữ, dịch mô tả sang tiếng Anh |

## Reel mẫu

| # | Link | Nền tảng | Format | Lượt xem | Ngày đăng | Chuyển được? |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

## Kết quả đo

Mỗi lần chạy một dòng. Không xoá dòng hỏng — dòng hỏng là dữ liệu để đặt ngưỡng M0.

| Ngày | Sản phẩm | Reel | Model video | Số cảnh | Lần sinh tổng | Cảnh giữ đúng SP lần đầu | Mặt người mẫu giữ? | Chi phí USD | Đăng được? | Ghi chú |
|---|---|---|---|---|---|---|---|---|---|---|
