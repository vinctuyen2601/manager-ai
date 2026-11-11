---
viec: tp.nhan-viec
trang_thai: xong
nhan: [tin nhắn sếp 11/11 (chuỗi trò chuyện), ../../../../quy-che/luong/README.md, ../../../../quy-che/luong/quang-cao.md]
giao: [01-tp-nhan-viec.md, 00-dieu-phoi.md]
con_thieu: [cảnh phao trên mặt nước ban đêm (không chặn), slogan 17fishing (không chặn)]
ngay: 2026-11-11
---

# Phiếu nhận việc — phao điện rô diếc, 17fishing (CHẠY THỬ phòng marketing)

Tin nhắn sếp (nguyên văn, gom từ chuỗi 11/11):
- "giờ thử cho sản phẩm mới thì khá rủi ro. có thể lấy một sản phẩm từ 17-fishing test thử phòng marketing này làm việc nào"
- (chọn phao điện LED) "có nhé tôi mới quay một video làm mẫu ở download" · "đây là video shop của tôi mà"
- "Phao điện này chưa có trên 17-fishing tôi sẽ cung cấp thông tin về nó và bạn xử lý push lên web trước nhé"
- "đã bật active, đủ dữ kiện để sản xuất video chưa?" → "ok" (chạy luồng tới bước 7, dừng trước Muse)

Ngày nhận: 2026-11-11 (thứ Tư)

Tên sếp viết: "Phao điện" · Tên trên trang: Phao Điện Cảm Biến Rô Diếc Tiểu Ngư Nhi LED-425 - Báo Đỏ Khi Cá Cắn · Khớp: có
Sản phẩm: https://17-fishing.com/san-pham/phao-dien-cam-bien-ro-diec-tieu-ngu-nhi-led-425
Mục đích: quảng cáo bán hàng + **chạy thử phòng marketing** (đo xem các vai làm việc thế nào) ✅ sếp nói
Thị trường: **Việt Nam, tiếng Việt** ⚠ sếp để TODO; suy từ shop VN, giá VND. ⚠ Các gói vai viết cho Mỹ/tiếng Anh — vai nào áp luật riêng của Mỹ thì ghi ⚠
Kênh: Facebook Reels + TikTok ⚠ mặc định; video mẫu của shop lấy từ Facebook
Luồng: Quảng cáo · Hướng: **Lai** (thân = video thật của shop 15,3 s) · Xếp hàng: ngay (xem Đã tự quyết)

Lịch (ngày thật, tính từ ngày có nguyên liệu 11/11):
- Thứ Tư 11/11 – thứ Năm 12/11: hồ sơ, khung, brief, kịch bản, chữ, kế hoạch hình (bước 2–7)
- Bước 8 (Muse) **chỉ khi** kế hoạch hình cần cảnh còn thiếu; lần chạy thử này DỪNG trước bước 8 theo lời sếp
- Sếp chấm phiếu từng bước: khi luồng dừng

| Câu hỏi sếp (lời thường) | Chặn bước số | Mặc định nếu sếp không trả lời |
|---|---|---|
| Anh quay thêm được 5–10 giây phao đứng trên mặt nước ban đêm không? | không | Không có; Đạo diễn đề xuất cảnh thay |
| Shop có câu slogan nào cho thẻ cuối video không? | không | Biên kịch đề xuất, sếp duyệt |

## Đã kiểm (có nguồn)
- Trang sản phẩm trả 200, isActive=true — curl 11/11.
- Nguyên liệu: 8 ảnh, logo PNG nền trong suốt, video thật của shop 15,3 s 720×1280 — `phong-marketing/thu-nghiem/san-pham/phao-ro-diec/<slug>/`.
- Cổng M0: mọi mục đạt trừ hồ sơ (12 ô ⬜, việc của bước 2) — `gvv san-pham --kiem` 11/11.
- Bóc video shop (`gvv boc`): một cảnh liền, phao tắt 0–2 s, đèn bật ~2–2,75 s, đổi đỏ ở 5,0 · 7,75 · 10,25 · 13,75 s — lưới `phong-marketing/thu-nghiem/video-mau/phao-ro-diec-shop/`.

## Suy ra ⚠
- Thị trường VN — từ shop và giá VND.

## Còn thiếu ⬜
- Cảnh phao trên nước ban đêm — ảnh hưởng độ thuyết phục, không chặn.
- Slogan — ảnh hưởng thẻ kết, không chặn.

## Đã tự quyết (sếp không cần làm gì)
- Chạy ngay dù luồng Orb chưa xong: luật "một luồng Quảng cáo một lúc" sinh ra vì nút Muse; lần này dừng trước Muse nên không tranh.
- Hướng Lai, thân là video của shop; 1 thân × 3 kiểu mở đầu (mặc định của phòng).
- Video thật của shop nên không gắn nhãn "nội dung AI" cho phần thân; cảnh nào sinh bằng AI thì gắn.
- Không đưa giá vào video (giá có thể đổi; trang đã có giá).

## Cần sếp (tối đa 3, viết lời thường)
1. Anh quay thêm được 5–10 giây phao đứng trên mặt nước ban đêm không? Mặc định nếu không trả lời: không có, Đạo diễn đề xuất cảnh thay.
2. Shop có câu slogan nào cho cuối video không? Mặc định: Biên kịch đề xuất, anh duyệt.
