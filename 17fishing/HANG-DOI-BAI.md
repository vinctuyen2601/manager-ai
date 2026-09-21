# 17fishing — hàng đợi bài viết

Nhịp đã chốt với chủ shop: **2–3 bài mỗi tuần**.

Chủ đề **không nghĩ ra**, lấy từ bảng vùng trắng của chính hệ thống:
`GET /admin/keywords/vung-trang` (80 mục, 74 là chỗ trống thật).

---

## Luật chọn chủ đề

1. **Đối chiếu lại với bài sống trước khi viết.** Bảng vùng trắng so khớp mờ và
   đã báo "đã có bài" cho truy vấn thực ra chưa ai nhận, lẫn ngược lại.
   Dò cả **tiêu đề** lẫn **thân bài**, không chỉ tiêu đề.
2. **Đã có bài gần thì MỞ RỘNG bài đó, đừng viết bài mới.** Cụm điểm cao nhất
   (13đ, "cần câu tay 3m6/4m5/5m4 giá rẻ") đã xử bằng cách thêm một mục vào bài
   giá sẵn có — viết bài thứ hai là tự cạnh tranh, đúng lỗi đã tốn cả tuần dọn.
3. **Mỗi bài mới phải có ít nhất một bài cũ trỏ tới** ngay trong đợt, không để
   sang tuần sau.
3b. **Mỗi bài mới phải có ẢNH BÌA.** Đã quên ba lần liên tiếp — cả ba bài đăng
   18/09 đều thiếu, chủ shop phải nhắc. Bài không bìa thì ở danh sách blog nó
   là một ô trống giữa các ô có ảnh.

   Chưa có ảnh riêng thì **lấy từ thư viện** (`GET /admin/media?limit=600`),
   chủ shop đã cho phép. Ba điều kiện khi chọn:
   - **Mở ảnh ra NHÌN**, đừng đoán theo tên tệp. Tên có chữ `garutin` mà ảnh
     lại là phao câu (đúng chủ đề), và ngược lại tên nghe hợp lý vẫn có thể là
     banner sai đề tài.
   - **Nhận ra được ở cỡ thumbnail** (~150px). Ảnh một cái phao nhỏ xíu giữa
     mặt hồ thì đẹp nhưng ở cỡ đó là một ô trống.
   - **Kiểm TRÙNG trước khi gán** — hai bài chung một bìa thì danh sách blog
     trông như bị lặp. Đã bắt được một ca đúng lúc chuẩn bị gán.

   Tính tới 21/09: 92/92 bài có bìa; còn **3 ảnh đang dùng cho 2 bài**, đều là
   từ trước, chưa xử.
4. **Bỏ cụm nhiễu.** `zhongzhou machine works` là hãng súng Trung Quốc, không
   liên quan đồ câu; `chuanze li`, `chuanze xu` là tên người. Bảng gợi ý tự sinh
   nên còn lẫn loại này — đừng viết theo.

---

## Đã xong

| ngày | cụm | điểm | truy vấn | bài |
|---|---|---|---|---|
| 18/09 | cần tay giá theo cỡ | 13đ | 10 (10 TM) | mở rộng `top-5-can-cau-tay-ua-thich-nhat` |
| 18/09 | buộc phao | 9đ | 7 | `cach-buoc-phao-cau-ca` |
| 18/09 | cần câu máy | 9đ | 3 | `can-cau-may-khac-can-cau-tay-the-nao` |
| 18/09 | phao câu lửng | 6đ | 5 | `phao-cau-lung-chon-dang-va-chinh` |

---

## Còn trong hàng đợi

### Tuần tới — câu lửng theo loài · 7đ · 9 truy vấn
`cách câu lửng trắm đen` · `câu lửng cá tra` · `câu lửng rô phi` ·
`cách câu lửng cần máy` · `cách câu chép lửng` · `cách câu mồi lửng`

Đề xuất **2 bài**, đừng gộp một:
- *Câu Lửng Theo Từng Loài: Trắm, Chép, Tra* — mỗi loài một tầng và một nhịp
- *Câu Lửng Bằng Cần Máy* — nối được với bài cần máy vừa viết, và là kiểu câu
  khác hẳn vì có dây chùng

Rô phi thì **đừng viết bài riêng** — đã có `ky-thuat-cau-ca-ro-phi-cach-giu-o-va-de-phao-lien-tuc`,
thêm một mục vào đó là đủ.

### Sau đó — phao đài giá & loại · 8đ · 5 truy vấn
`phao câu đài giá rẻ` · `cao cấp` · `chính hãng` · `chống sóng`

Đã có `chon-phao-cau-dai-chuan-nhat`. **Mở rộng bài đó** bằng một mục giá theo
tải chì và vật liệu, giống cách đã làm với bài giá cần.

### Thấp hơn — thương hiệu cần · 5đ · 7 truy vấn
`cần câu shimano` · `cần câu tay chính hãng` · `cần câu tay 8h chính hãng`

Shop **không bán Shimano**, nên viết bài so sánh thương hiệu là kéo khách tới
rồi không bán được gì. Phần đáng làm duy nhất là *"8H, 6H, 4H nghĩa là gì"* —
mà `phan-loai-do-cung-cua-can-cau-tay-uu-nhuoc-diem-cua-tung-loai` đã nói.
Thêm một mục "cách nhận cần chính hãng" vào bài đó là hết cụm.

### Cụm "khác" · 4đ · 29 truy vấn
Rời rạc, mỗi truy vấn một hướng. Chỉ nhặt khi hết cụm lớn.

---

## Đo lại

**Đừng gộp các đợt khi kiểm.** QĐ-09 đặt mốc 17/12 cho 30 bài viết lại ngày
17/09, dự đoán 300–800 hiển thị/tháng. Các bài từ 18/09 trở đi là **biến số
thứ hai** — ghi ngày đăng và tách ra khi đo, nếu không thì không kết luận được
đợt nào kéo số nào.
