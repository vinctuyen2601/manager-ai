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
3. Chủ dự án tạo tài khoản HypiHub; khoá để ở `reel/.env` hoặc kho khoá của Hypit, **không dán vào cuộc trò chuyện**.
4. Chủ dự án tự cài skill Hypit khi sẵn sàng (chưa cho phép tự cài).

## Việc

- [x] Chốt trần chi phí, người mẫu, độ dài (23/10: $10 · ảnh thật, thiếu thì AI tạo · 15 giây)
- [x] Chốt nhà cung cấp giai đoạn 0: HypiHub (23/10)
- [ ] Cài ffmpeg trên máy chạy
- [ ] Tạo tài khoản HypiHub, cất khoá
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
