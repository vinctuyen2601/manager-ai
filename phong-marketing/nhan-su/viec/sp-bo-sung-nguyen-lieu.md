# Chuyên viên SP · bổ-sung-nguyên-liệu

Sếp gửi thêm ảnh, video, kích thước hoặc trả lời câu hỏi → đưa vào thư mục nguyên liệu, sửa hồ sơ chỗ bị ảnh hưởng, chạy lại cổng M0.
Kiến thức: `../vai/chuyen-vien-san-pham.md` §4 bước 3–11. Tệp này chỉ giữ thứ tự làm và luật bắt buộc.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Sau `sp.dung-ho-so` báo CHƯA ĐỦ và sếp gửi thêm. Hoặc sếp tự gửi tệp/thông tin mới cho sản phẩm đã có hồ sơ |
| Nhận | Phiếu giao lần trước · `CAN-BO-SUNG.md` lần trước · tệp/tin nhắn sếp gửi · `khach-hang/<shop>/san-pham/<sp>.md` |
| Giao | Tệp mới trong thư mục nguyên liệu · hồ sơ đã sửa (có dòng "Lịch sử sửa khối" nếu khối đổi) · `CAN-BO-SUNG.md` mới · phiếu giao |
| Xong khi | Mọi tệp mới có dòng ở bảng "Tệp mới" · `--kiem` đã chạy sau lần sửa cuối · phiếu giao đủ ô |

## Luật bắt buộc
1. **Nếu tệp sếp gửi trùng md5 với tệp đã có** → không thả vào, ghi "trùng <tệp cũ>" ở bảng "Tệp mới". Không đếm cho cổng.
2. **Nếu tệp mới cho thấy khác câu đang có trong hồ sơ hoặc khối PRODUCT** (vd ổ trống mà đèn vẫn sáng) → **thay** câu cũ,
   không chồng câu mới (gói §2 nguyên tắc 2); ghi "Lịch sử sửa khối": ngày · câu cũ → câu mới · tệp chứng minh.
3. **Nếu kích thước đến từ lời nhắn, ảnh chụp listing hoặc dịch máy** → ⚠ (Sổ lỗi L13). Chỉ ✅ khi có số đo tay (ảnh thước, sếp đo) hoặc chữ nhà cung cấp xác nhận; ghi nguồn + ngày.
4. **Nếu tệp mới là mẫu khác dòng "Mẫu đang bán"** (khác màu, mặt in, chất liệu) → cột Mẫu ghi mẫu đó, Trạng thái = *bỏ*;
   không dùng cho tờ sản phẩm hay khối. Nếu nó gợi ý mẫu đang bán đã chọn sai → câu "Cần sếp" đầu tiên.
5. **Nếu `--kiem` vẫn chưa ĐỦ** → gửi sếp **phần còn thiếu** trong một tin (gói §4 bước 11), không hỏi lại thứ sếp đã gửi;
   nói rõ tệp vừa gửi đã gỡ được mục nào. Sếp đã gửi mà vẫn không qua (ảnh < 800px, video không thấy tay) → nói lý do bằng lời thường.

## Bước
1. Đọc phiếu giao lần trước + `CAN-BO-SUNG.md`: biết đang thiếu mục nào.
2. Khử trùng (luật 1): `md5sum <tệp mới> anh-* them-* | sort | uniq -w32 -D`.
3. Thả tệp vào thư mục nguyên liệu theo tên máy đọc: ảnh `them-NN.jpg`, logo `logo-NN.png`, video `video-NN.mp4` (README `gen-video-viral`, mục `gvv san-pham`).
   Lời nhắn của sếp (cỡ, mô tả, trả lời câu hỏi) → chép nguyên văn vào hồ sơ đúng mục, nguồn "sếp, <ngày>".
4. Phân loại từng tệp mới (gói §4 bước 3, §3.3): Thật/Render · Mẫu · Trạng thái · Dùng cho → mục 4 hồ sơ.
5. Video mới: xem lưới, tách khung `that-*.jpg` nếu có góc mới (cầm tay, TẮT, BẬT, cả bộ) → mục 3b (gói §4 bước 4).
6. Dò hồ sơ tìm câu bị tệp mới ảnh hưởng: mục 3, 3b, 3c, 5, mục 2 (nếu sếp gửi mô tả). Sửa theo luật 2–3.
   Khối đổi → soát lại cả khối như `sp-dung-ho-so` bước 8.
7. Tệp mới có góc tốt hơn ô trên tờ sản phẩm → chạy lại [sp-to-san-pham.md](sp-to-san-pham.md).
8. `gvv san-pham --kiem <thư-mục>` (gói §4 bước 10). Đọc `CAN-BO-SUNG.md` mới.
9. Phiếu giao. Chưa đủ → luật 5.

## Khuôn đầu ra
Đầu phiếu giao, trước "Đã kiểm" (ô trống = chưa xong):
```
## Tệp mới   | Tệp sếp gửi | Lưu thành | Trùng md5? | Thật/Render · Mẫu | Gỡ mục cổng nào | Đổi câu hồ sơ nào |
## Cổng M0   Trước: <n> ✗ · <m> ⚠  →  Sau: <n> ✗ · <m> ⚠  ·  ĐỦ ✓ | CHƯA ĐỦ
## Câu đã thay   <mục> · câu cũ → câu mới · tệp chứng minh   (— nếu không đổi)
```

## Thành công khi
- Sếp gửi một lần, cổng qua; hoặc sếp biết đúng một thứ còn thiếu và vì sao.
- Không câu nào trong hồ sơ trái với tệp sếp vừa gửi.
- Lịch sử sửa khối đọc lại được vì sao khối đổi.

## Thất bại khi
- Một ảnh gửi nhiều lần (trùng md5) được đếm như nhiều ảnh, cổng qua mà thực ra thiếu góc (thi 11/11).
- Thêm câu "thin grey" mà không xoá "frosted white" → khối tự mâu thuẫn (Santa Spins 24/10, gói §9.4).
- Khối giữ câu "LED chỉ sáng khi có đĩa" sau khi đã có ảnh ổ trống vẫn sáng (thi 11/11).
- Kích thước qua dịch máy ghi ✅ (Sổ lỗi L13).
- Hỏi sếp lẻ tẻ sau mỗi tệp (Sổ lỗi L10).

## Bộ thi
`sp-bo-sung-nguyen-lieu.thi/` ⬜ chưa có. Đề cần bẫy: tệp gửi trùng ảnh cũ, ảnh mới trái câu khối, cỡ gửi qua ảnh chụp listing tiếng Trung, một ảnh mẫu khác.
