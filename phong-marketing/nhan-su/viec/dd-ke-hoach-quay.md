# Đạo diễn · kế-hoạch-quay

Lập **phiếu đi quay** cho một buổi quay thật: cảnh nào, máy đặt đâu, đèn kiểu nào, quay bao lâu, theo thứ tự nào.
Sếp (hoặc người của shop) cầm phiếu ra hồ / ra bàn là quay được, không phải hỏi lại.
Kiến thức: `../vai/dao-dien-hinh-anh.md` §3.6 · sổ tay `../../thu-vien/so-tay/QUAY-THAT.md` (A máy · B bố cục · C chuyển động · D 12 kiểu đèn · E thiết bị · F màu · G danh sách cảnh mẫu).
Sếp chốt 11/11/2026: Đạo diễn quyết vị trí máy, bố cục, chuyển động, ánh sáng, tông màu.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Luồng Quảng cáo bước 7 khi cảnh thiếu **quay thật được** (thay sinh Muse) · Luồng Nuôi page khi tự quay · Trưởng phòng giao lẻ |
| Nhận | Kịch bản theo giây (Biên kịch) · khung + form (Săn xu hướng) · hồ sơ sản phẩm (mỏ neo màu, hình dáng) · thiết bị shop đang có (⬜ thì dùng mức tối thiểu sổ tay E) |
| Giao | `NN-dd-ke-hoach-quay.md` trong thư mục lần chạy theo khuôn dưới · phiếu giao |
| Xong khi | Mọi cảnh kịch bản cần quay có 1 dòng đủ ô · có thứ tự quay theo ánh sáng · có tổng thời gian · có dòng "Cài máy trước khi bấm" |

## Luật bắt buộc
1. **Nếu cảnh thuộc form "chờ → bật" hoặc "trước → sau"** → máy **đứng yên trên chân**, một cảnh liền, khoá phơi sáng + nét + cân trắng trước khi bấm (sổ tay A, C). Ô "Chuyển động" ghi `đứng yên`.
2. **Nếu cảnh có đèn LED sản phẩm trong tối** → đo sáng theo **đuôi đèn**, không theo nền; ghi EV bắt đầu (−2 đến −3); không đèn đỏ, đèn phụ ngoài khung chỉ chạm mặt nước (sổ tay D10–D12, F1). Bài học S2 lô phao: cột đèn soi làm hỏng cảnh.
3. **Nếu cảnh cần tác nhân giả** (tay kích cảm biến thay cá thật) → ô "Chữ trên hình bắt buộc" ghi `thử cảm biến`, không ghi "cá cắn". Chỉ cảnh có cá thật mới được nói "cá cắn".
4. **Nếu tổng thời gian quay > 90 phút hoặc cần thiết bị ngoài mức shop đang có** → `trang_thai: can-sep`, kèm bản rút gọn (bỏ cảnh nào) và giá thiết bị (sổ tay E, ghi ngày đọc giá).
5. **Nếu một cảnh có giờ ánh sáng riêng** (giờ xanh, đêm hẳn) → xếp thứ tự quay theo ánh sáng, không theo thứ tự kịch bản; ghi giờ cụ thể (⚠ nếu giờ lặn chưa kiểm).

## Bước
1. Đọc kịch bản, đánh dấu cảnh nào quay thật được, cảnh nào vẫn phải sinh (ghi lý do).
2. Mỗi cảnh: form · cỡ cảnh · vị trí máy (cao, cách vật, góc) · chuyển động · mã kiểu đèn D1–D12 · cài máy · thời lượng quay (≥ 3× thời lượng dùng) · chữ bắt buộc.
3. Xếp thứ tự theo ánh sáng (luật 5), cộng thời gian dựng máy giữa các cảnh.
4. Danh sách thiết bị mang theo (đánh dấu cái shop đã có / cần mua).
5. Dòng "Thẻ xám" (giữ 2 s đầu mỗi cảnh để Thợ dựng cân màu, sổ tay F2).
6. Phiếu giao. Câu cho sếp viết lời thường, kèm mặc định.

## Khuôn đầu ra
```
Buổi quay: <nơi> · <ngày> · giờ bắt đầu <hh:mm> · tổng <phút>  ·  Người quay: <…>  ·  Thiết bị: <mức E> (+ cần mua: … | không)
Cài máy trước khi bấm: app <…> · <fps> · màn trập <…> · ISO <…> · cân trắng khoá <K> · HDR/chế độ Đêm: tắt · khoá phơi sáng + nét
| # | Giờ | Cảnh (giây trong kịch bản) | Form | Cỡ · góc | Máy đặt (cao · cách · chân/tay) | Chuyển động | Đèn (mã D) | Quay bao lâu | Chữ bắt buộc | Kiểm tại chỗ |
Thứ tự quay vì sao: …  ·  Cảnh vẫn phải sinh Muse: … (lý do)
```

## Thành công khi
- Người quay không hỏi lại câu nào; về đủ nguyên liệu cho mọi cảnh kịch bản.
- Đuôi đỏ trong cảnh quay ra đúng đỏ (Thợ dựng đo theo sổ tay F4), không phải quay lại vì cháy màu.

## Thất bại khi
- Để máy tự phơi sáng / tự cân trắng: đúng lúc cả đuôi đỏ, máy kéo màu ngược lại (sổ tay F1).
- Cảnh "chờ → bật" bị cắt ngang hoặc cầm tay rung: mất LÕI của form (lô phao 11/11: chờ còn 1,4 s).

## Bộ thi
`dd-ke-hoach-quay.thi/` ⬜ — sếp ra đề (đề nháp: `../danh-gia/2026-11-11-dd-quay-that/DE-NHAP.md` câu 5–8).
