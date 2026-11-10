# Luồng · Nuôi page (Bản địa hoá)

**Mục đích:** thu hút người xem, lấy **lượt thích/theo dõi page** — không bán hàng trực tiếp (chốt 11/11).
**Hướng:** lấy video viral có sẵn (Douyin, TikTok…) → lời và chữ mới cho thị trường đích. Không Muse, không hồ sơ sản phẩm.
**Đầu ra:** một lô N video đã dựng, có caption ghi nguồn. Cách chạy chung: [README.md](README.md).

## Các bước

| # | Việc (vai.việc) | Nhận | Giao | Cổng | Nếu chặn |
|---|---|---|---|---|---|
| 0 | `tp.nhan-viec` 🟡 | Tin nhắn sếp (page, chủ đề, link) | Phiếu nhận việc, mở thư mục chạy | Có page + chủ đề | Hỏi sếp |
| 1 | `sxh.tim-nguon` 🟡 | Chủ đề page · link sếp gửi (mặc định) | Danh sách video nguồn + lý do chọn | Qua bộ lọc nguồn (dưới) | Loại video đó, lấy video kế |
| 2 | `sxh.boc-khung` 🟡 | Video nguồn | Lưới giây, cú bật, chữ/logo cần che, có lời gốc hay không | Có giây cú bật | Ghi ⚠, Biên kịch tự đề xuất |
| 3 | `bk.loi-ban-dia` ✅ | Video + lưới giây · mục đích = nuôi page | Lời theo giây, chữ, caption có nguồn, danh sách "Cần che" | Ngôi người xem; vừa thời lượng | Quay lại bước 3 |
| 4 | `bk.chu-tren-hinh` ✅ | Kịch bản | Bảng chữ | Mốc đọc | Quay lại bước 4 |
| 5 | `td.ban-dia-hoa` → `td.do-qc` 🟡 | Video gốc · lời · bảng chữ · "Cần che" | Video đã che chữ/logo, lồng tiếng (CapCut), nhạc hợp lệ | Đo đạt; không còn chữ/logo nước ngoài | Quay lại bước 5 |
| 6 | `tp.bao-cao` | Phiếu cả lô | Báo cáo: các video, nguồn, cần sếp | — | — |
| 7 | **[Sếp đăng]** — phần 2 | | | | |
| 8 | `tp.hop` (cuối lô) → `tp.duc-ket` 🟡 | Phiếu cả lô + số liệu (nếu có) | Sổ lỗi từng vai, đề xuất sửa tệp việc | — | — |

Giữa mọi bước: `tp.dieu-phoi` (như luồng Quảng cáo). ✅ đã thi · 🟡 có tệp, chưa thi.

**Bộ lọc nguồn (bước 1):** không lộ mặt người nổi tiếng hay thương hiệu khác làm nhân vật chính · chữ nước ngoài che được ·
có cú bật trong ~3 s đầu hoặc một khoảnh khắc rõ · không phải video quảng cáo của hãng khác · ghi được nguồn (ID/tài khoản gốc).

## Khác luồng Quảng cáo
Không bước 2 (hồ sơ), không bước Muse, không cổng hạn mức. Có thể chạy **song song** với một luồng Quảng cáo.
Rủi ro riêng: bản quyền video gốc và nhạc — ghi trong phiếu mỗi video, sếp quyết theo lô.

## Chờ sếp trước khi chạy được
Page nuôi thử · chủ đề · số video/tuần (README câu hỏi 4). Nguồn: mặc định sếp gửi link (câu hỏi 5).
