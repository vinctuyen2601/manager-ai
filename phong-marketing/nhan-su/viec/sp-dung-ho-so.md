# Chuyên viên SP · dựng-hồ-sơ

Từ link (hoặc ảnh, hoặc chỉ cái tên) → hồ sơ sản phẩm đã kiểm + khối PRODUCT + cổng M0. Đây là bước chặn của luồng Quảng cáo:
chưa ĐỦ ✓ thì không vai nào được viết hay vẽ về sản phẩm. Kiến thức: `../vai/chuyen-vien-san-pham.md`. Tệp này chỉ giữ thứ tự làm và luật bắt buộc.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Luồng Quảng cáo bước 2 (`sp.dung-ho-so`), sau phiếu nhận việc. Hoặc Trưởng phòng giao lẻ |
| Nhận | Phiếu nhận việc (sản phẩm, thị trường đích, cửa hàng) · link và/hoặc ảnh, video, ghi chú của sếp |
| Giao | `khach-hang/<shop>/san-pham/<sp>.md` theo khuôn gói §7.1 (có ô đầu tệp bên dưới) · `CAN-BO-SUNG.md` mới nhất · phiếu giao (`../../quy-che/khuon/phieu-giao.md`) |
| Xong khi | Ô đầu tệp đủ · bảng kiểm gói §5 phần Nguyên liệu, Hồ sơ, Khối PRODUCT đủ dấu · M0 = **NGUYÊN LIỆU ĐỦ ✓** hoặc đã gom danh sách thiếu gửi sếp · phiếu giao đủ ô |

Tờ sản phẩm (gói §4 bước 9) là việc riêng: [sp-to-san-pham.md](sp-to-san-pham.md). Sếp gửi thêm tệp: [sp-bo-sung-nguyen-lieu.md](sp-bo-sung-nguyen-lieu.md).

## Luật bắt buộc
1. **Nếu đầu vào chỉ có tên, hoặc tên không khớp trang** → làm theo gói §6 dòng "Chỉ có tên": tìm trên cửa hàng, không thấy
   thì **dựng hồ sơ cho món gần nhất** ⚠ và mở ô "Cần sếp" bằng "Ý sếp là <tên gần nhất>?". Không có món nào gần mới `trang_thai: chan`.
2. **Nếu trang trả 429 hoặc chặn máy đọc** → chờ rồi thử lại theo gói §6 dòng "Trang chặn". Không đổi tên miền (kể cả tên
   `*.myshopify.com` của cùng shop), không đổi user-agent. Vẫn chặn → `trang_thai: chan`, câu báo mẫu của gói §6.
3. **Nếu sắp ghi ⬜ hoặc "trang không nói X"** → ô "Đã đọc" phải tick đủ mô tả + FAQ + đánh giá + chữ trong video. Chưa đọc hết thì chưa được ghi ⬜.
4. **Nếu một câu ở mục 3 hoặc khối PRODUCT tả hình dáng, trạng thái (TẮT/BẬT) hoặc có con số** → phiếu giao ghi câu đó ở
   "Đã kiểm" kèm **tệp/khung thật chứng minh** (hoặc câu gốc trang). Không chỉ ra được → xoá câu hoặc để ⬜. Không tự đặt số.
5. **Nếu hai ảnh trùng md5, hoặc trang có hai mẫu phần cứng** (ảnh AI một kiểu, hàng thật một kiểu) → khử trùng trước khi
   phân loại; hai mẫu thì ghi cả hai vào ô "Mẫu trên trang", chọn mẫu có video/ảnh khách làm mặc định ⚠ và hỏi sếp mẫu nào đang bán (gói §6 dòng "Nhiều mẫu").

## Bước
1. Đọc phiếu nhận việc. Thiếu thị trường đích → hỏi. Đối chiếu tên với trang (luật 1).
2. Lấy nguyên liệu: `gvv san-pham <link>` (gói §4 bước 2, §8). Giá ra VND → ép `country` (gói §6). Bị chặn → luật 2.
3. Khử trùng ảnh trước khi xem (luật 5). Máy chỉ bỏ video trùng độ dài, **không** bỏ ảnh trùng:
   `md5sum anh-* them-* | sort | uniq -w32 -D` — mỗi nhóm giữ một tệp, ghi số đã bỏ vào ô "Ảnh".
4. Đọc đủ chữ: `trang.txt` từ đầu tới cuối (mô tả, FAQ, chính sách giao), đánh giá có ảnh, chữ trong video. Tick ô "Đã đọc".
5. Phân loại ảnh (gói §4 bước 3, §3.3) → cột Thật/Render · Mẫu · Trạng thái ở mục 4. Đối chiếu ảnh với video thật trước, mắt sau.
6. Xem video theo lưới, tách khung `that-*.jpg` (gói §4 bước 4) — cần ít nhất một khung thấy cỡ và, nếu có bộ phận "trả lời", khung TẮT + khung BẬT.
7. Viết hồ sơ mục 1, 1b, 2, 2b, 3, 3b, 3c, 6 (gói §4 bước 6–7, khuôn §7.1, §7.3). Mục 2 chỉ chép câu trang.
8. Viết khối PRODUCT (gói §4 bước 8, khuôn §7.2). Rồi soát luật 4: đọc từng câu, chỉ tệp chứng minh; đọc liền một lượt tìm câu trái nhau (Sổ lỗi L2).
9. Chạy cổng: `gvv san-pham --kiem <thư-mục>` (gói §4 bước 10). Chưa đủ → gom thiếu + câu hỏi riêng vào cuối `CAN-BO-SUNG.md` (gói §7.4).
10. Phiếu giao. "Cần sếp" lời thường, tối đa 3 câu, mỗi câu có mặc định.

## Khuôn đầu ra
Khuôn hồ sơ: gói **§7.1** (không chép lại). Thêm các ô bắt buộc ngay dưới dòng `**Mẫu đang bán:**` (ngoài các mục cổng đọc):
```
Tên dùng: <tên trên trang>  ·  Khớp lệnh: có | không → "Ý sếp là …?" ở phiếu giao
Đã đọc: mô tả ☐ · FAQ ☐ · đánh giá (<n>, có ảnh <m>) ☐ · chữ trong video (<n>) ☐
Ảnh: tải <n> · trùng md5 bỏ <m> · còn <k> (thật <a> · render/AI <b> · ảnh khách <c>)
Mẫu trên trang: <một mẫu | A (ảnh nào) và B (ảnh nào) → hỏi sếp>
Cổng M0: ĐỦ ✓ | CHƯA ĐỦ (<n> mục ✗) — ngày chạy
```
Phiếu giao, ô "Đã kiểm": mỗi câu khối PRODUCT một dòng — `<câu> — <that-*.jpg | video-NN @ giây | câu gốc trang>`.

## Thành công khi
- Biên kịch và Đạo diễn làm việc được mà không phải mở lại trang.
- Mọi câu hình dáng trong khối trỏ được về một khung thật; không câu nào trái với ảnh/video thật.
- Sếp chỉ bị hỏi một lần, gom trong `CAN-BO-SUNG.md` + ô "Cần sếp".

## Thất bại khi
- Chỉ có tên sản phẩm → thí sinh dừng hẳn; đối chứng tự tìm món gần nhất (Santa Spins), dựng hồ sơ và thắng 17–11 (thi 11/11). Gói §6 đã sửa.
- Khối PRODUCT ghi "LED chỉ sáng khi có đĩa" trong khi ảnh thật chụp ổ trống vẫn sáng (thi 11/11).
- Tự đặt số không nguồn ("~3000K") vào khối (thi 11/11).
- Ghi "trang không nói X" trong khi FAQ của trang có nói (thi 11/11).
- Gọi tên miền myshopify khác để lách 429 → bị chặn vì lách chặn bot (thi 11/11).
- Một ảnh đăng 3 lần (trùng md5) bị đếm và phân loại như 3 ảnh (thi 11/11).
- Trang trộn ảnh AI hộp trắng với hàng thật acrylic, hồ sơ tả lẫn hai mẫu (thi 11/11).
- Ảnh render làm tham chiếu "máy"; tỉ lệ đo từ ảnh hero; khối vá chồng câu (Santa Spins 23–24/10, gói §9.2, §9.4).

## Bộ thi
`sp-dung-ho-so.thi/` ⬜ chưa có. Đề hồi quy: bài thi 11/11 (đầu vào chỉ có tên, shop Santa Spins). Đề mới cần bẫy:
ảnh trùng md5, hai mẫu phần cứng, FAQ trả lời câu hỏi mà mô tả không nói, ảnh thật trái với câu mô tả.
