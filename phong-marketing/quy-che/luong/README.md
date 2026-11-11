# Luồng phối hợp của phòng (workflow loại 1)

Luồng trả lời **ai làm trước ai sau, giao gì cho ai, chặn ở đâu**. Luồng chỉ gọi **tên việc** của từng vai
(`../../nhan-su/viec/`), không chép bước. Chốt 11/11/2026 (party mode).

| Luồng | Mục đích | Hướng video | Tệp |
|---|---|---|---|
| **Quảng cáo** | Ra đơn | Tạo mới · Lai | [quang-cao.md](quang-cao.md) |
| **Nuôi page** | Lượt thích/theo dõi page | Bản địa hoá (reup) | [nuoi-page.md](nuoi-page.md) |
| Đúc kết | Học từ lô vừa làm | — | tạm dùng việc [`tp-duc-ket`](../../nhan-su/viec/tp-duc-ket.md) |

## Cách chạy (chung mọi luồng)
1. **Phiên chính đội mũ Trưởng phòng**, đọc tệp luồng, đi từng bước.
2. **Mỗi bước = một agent con** nhận: gói vai + tệp việc + phiếu giao của bước trước. Trả về phiếu giao mới (`../khuon/phieu-giao.md`).
3. Trưởng phòng đọc **phần đầu** phiếu (`trang_thai`) để rẽ nhánh, rồi **mở tệp ở dòng `giao`** để kiểm — agent con báo "xong" chưa phải là xong.
4. Mỗi lần chạy một thư mục, phiếu đánh số theo thứ tự → dừng giữa chừng chạy tiếp được, Đúc kết đọc lại được:
   ```
   phong-marketing/khach-hang/<shop>/viec/<YYYY-MM-DD>-<sản phẩm|page>-<qc|page>/
     00-dieu-phoi.md (nhật ký Trưởng phòng) · 01-tp-nhan-viec.md · 02-sp-ho-so.md · 03-sxh-khung.md · …
   phong-marketing/khach-hang/<shop>/viec/tuan-<ngày thứ Hai>.md            (kế hoạch tuần)
   phong-marketing/khach-hang/<shop>/viec/tuan-<ngày>-hop-<loại>.md          (biên bản họp)
   ```
5. **Một lúc chỉ một luồng Quảng cáo** (nút Muse là chỗ nghẽn chung). Nuôi page chạy song song được.
6. **Chỉ Chuyên viên SP lấy dữ liệu từ web** về sản phẩm; vai khác đọc hồ sơ (thi 11/11: nhiều agent cùng gọi một shop → bị chặn hàng loạt).
7. **Báo sếp:** chỉ khi **chặn** và khi **xong** (mặc định, chờ sếp chốt — câu hỏi 2 bên dưới). Báo bằng ô "Cần sếp" của phiếu, lời thường.

## Việc chưa qua bộ thi
Sếp chốt 11/11: chỉ Biên kịch đã thi; các vai khác viết mới, chưa thi. Việc chưa thi (🟡) vẫn được gọi, phiếu đánh dấu ⚠
và Trưởng phòng mở kiểm kỹ đầu ra (`tp-dieu-phoi`).

## Câu hỏi chờ sếp chốt
| # | Câu hỏi | Mặc định đang dùng |
|---|---|---|
| 1 | Ai bấm Muse? | Sếp bấm tay; luồng Quảng cáo dừng ở bước đó và báo sếp kèm tệp prompt |
| 2 | Sếp được báo ở mức nào khi luồng chạy? | Chỉ khi chặn và khi xong |
| 3 | Sếp duyệt ở đâu? | Bản cuối + khi vượt ngân sách (> 40 % hạn mức Muse tuần). Không duyệt ảnh khung đầu |
| 4 | Page nuôi thử, chủ đề, số video/tuần? | ⬜ chưa có — luồng Nuôi page chưa chạy được |
| 5 | Nguồn video nuôi page: tự tìm hay sếp gửi link? | Sếp gửi link; phòng tự tải bằng yt-dlp (duyệt 12/11, chỉ link sếp gửi). Tự đi tìm nguồn: chưa duyệt |
