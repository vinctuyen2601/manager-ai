# Clone sản phẩm — hướng dẫn thực thi

Đọc `workflow.yaml` trước. Sáu bước, mỗi bước có cổng chặn. Không nhảy bước.

**Tệp này không chứa chữ nào riêng của một loại hàng.** Mọi thứ khác nhau
giữa máy câu, phao, cần, ghế đều nằm trong `ho-so-danh-muc/{ma}.yaml`. Nạp hồ
sơ trước khi làm bất cứ gì.

---

## Bước 0 · Nạp hồ sơ danh mục

Hỏi `ma_danh_muc` nếu chưa có. Nạp `ho-so-danh-muc/{ma}.yaml`.

Chưa có hồ sơ cho danh mục đó thì **dừng và dựng hồ sơ trước**, theo `_mau.yaml`.
Dựng bằng cách xem ba sản phẩm cùng danh mục đang bán để rút ra: thông số nào
khách thật sự hỏi, shop dùng từ nào, biến thể chia theo chiều nào.

Làm mà không có hồ sơ là lặp lại sai lầm lần đầu: quy trình dính chặt vào một
sản phẩm, sang sản phẩm thứ hai thì vô dụng.

---

## Bước 1 · Yêu cầu tài liệu

Nói rõ cần gì, chủ shop lấy về. Đây là khâu duy nhất chủ shop phải tự tay làm,
vì cần đăng nhập nguồn.

Cần:

| | Lấy thế nào |
|---|---|
| **Element thông tin sản phẩm** | chuột phải vùng giá và biến thể → Inspect → chuột phải node cha → Copy → Copy outerHTML |
| **Link sản phẩm** | dán từ thanh địa chỉ |
| **Element đánh giá** | bấm nút xem tất cả đánh giá, cuộn hết danh sách, rồi mới copy outerHTML |

Không có element đánh giá thì **bỏ hẳn bước 5**. Không bịa đánh giá.

**Nói trước cho chủ shop biết cái gì KHÔNG nằm trong element:** phần mô tả dài
thường ở máy chủ khác, và thông số kỹ thuật hay nằm trong đó. Với 1688 là
`itemcdn.tmall.com`. Nguồn khác thì dò `detailUrl` hoặc link ajax tương đương.

---

## Bước 2 · Extract

```
node {script_path}/doc-san-pham.mjs sp.html
node {script_path}/doc-danh-gia.mjs dg.html --dong <danh sách mã biến thể thật>
```

Rồi tải phần mô tả riêng và **xem từng ảnh bằng mắt** để tìm các mục
`thongSo.namTrongAnh` của hồ sơ danh mục. Những mục đó không grep được.

Bốn thứ hay sai, kiểm ngay:

- ảnh kèm đánh giá có đúng mẫu đang clone không
- đánh giá có phải của dòng đang bán không, hay gộp theo gian hàng
- bảng cân nặng đóng gói có phải điền cho có không
- ảnh trong mô tả có lẫn banner bán chéo mẫu khác không

---

## Bước 3 · Chuẩn hoá — dựng HỒ SƠ SẢN PHẨM

Dùng `template-ho-so.md`. Đây là **nguồn sự thật duy nhất** cho mọi khâu sau.

Ba phần bắt buộc:

1. **Thông số** — đủ mọi mục `thongSo.batBuoc` của danh mục. Thiếu một mục thì
   dừng, đi tìm tiếp, không đoán.
2. **Không được nói** — gộp `khongDuocNoiMacDinh` của danh mục với những điều
   riêng phát hiện được ở bước 2.
3. **Rủi ro** — từ `ruiRoHayGap` cộng khiếu nại thật đọc được trong đánh giá.
   Phần này đi vào mục bảo quản, vừa thật vừa chặn trước khiếu nại.

**Viết lời tiếng Việt ở bước này**, không để tới bước 4:

- tên sản phẩm: dịch máy luôn sai nghĩa, viết lại từ đầu
- từ vựng: dùng `tuVung.dung`, tránh `tuVung.tranh`. Kiểm bằng cách đếm từ
  đồng nghĩa trong hàng đang bán, đừng tin trí nhớ
- giọng: theo `GIONG-TRANG-SAN-PHAM.md`, chạy bộ đếm tật trước khi lưu

**Cổng:** hồ sơ đủ thông số bắt buộc và có mục không được nói.

---

## Bước 3b · Phiếu thị giác — NHÌN, không đo

Điền `phieu-thi-giac.md` bằng cách **xem từng ảnh sản phẩm**. Tám mục, dùng
chung cho mọi loại hàng. Xem `vi-du-phieu-thi-giac.md` để biết mức chi tiết
cần đạt.

**Đây là bước không giao được cho script.** Đã thử và đo được giới hạn:

`doc-thi-giac.mjs` đo bảng màu chỉ đúng với **ảnh studio nền trơn**. Chạy trên
ảnh marketing thì nó trả về màu của banner:

| Sản phẩm | Màu thật | Máy đo ra |
|---|---|---|
| Máy câu AS HA (ảnh nền trắng) | đồng cổ | **đồng cổ — đúng** |
| Ghế AK Power (banner nền xanh) | vàng chanh + đen | "xanh lạnh" — sai |
| Phao điện (banner nền xanh) | tím chuyển xanh ngọc | "xanh lạnh" — sai |

Cắt đúng vùng sản phẩm cũng không cứu được khi vật thể không lấp đầy khung.
Và ngay cả khi màu đo đúng, máy vẫn không nói được "đây là dải chuyển màu
dọc" hay "có vòng cao su đỏ ở cuống" — mà đó mới là thứ công cụ sinh ảnh cần.

Nên: **dùng script cho ảnh studio nền trơn, còn lại nhìn bằng mắt.** Script
báo cảnh báo khi không được chỉ vùng.

Bốn mục hay bị bỏ sót nhất, kiểm lại trước khi sang bước 4:

- màu **phẳng hay chuyển màu** — chuyển màu mà vẽ thành phẳng là hỏng nhận dạng
- **bề mặt** bóng hay mờ — quyết định cách chiếu sáng, và kim loại chiếu sai
  ánh sáng thì trông như nhựa
- **trạng thái kép** — gấp/mở, tắt/bật, thu/duỗi. Có thì phải có ảnh cả hai
- **đặc điểm nhận dạng** — thứ bỏ đi là thành sản phẩm khác

---

## Bước 4 · Tạo bản nháp

```
node {script_path}/tao-nhap.mjs noi-dung.json --thu    # luôn chạy trước
node {script_path}/tao-nhap.mjs noi-dung.json
```

Script tự ép bốn luật cứng. `--thu` báo lỗi thì sửa hồ sơ, đừng sửa script.

Dựng nội dung block từ hồ sơ, theo khung `cauHoiKhung` của danh mục, thay
`{ngoặc}` bằng số thật.

Ba chỗ hay lệch nghĩa, kiểm trước khi gửi:

- tiêu đề hứa thứ không nằm dưới nó
- trạng thái kho nói ngược với hỏi đáp
- block bật mà rỗng, hoặc block tắt bỏ lại ảnh mồ côi

**Cổng:** `--thu` không báo lỗi nào.

---

## Bước 5 · Đánh giá

Bỏ qua nếu không có element đánh giá.

Script đã gắn cờ, **người quyết giữ cái nào**. Bỏ: dòng khác, khen suông,
nhầm hàng, chỉ nói vận chuyển của người bán bên kia.

**Giữ lại cái chê.** Một đánh giá thấp trong bộ làm cả bộ đáng tin hơn, và nó
thường là cái hữu ích nhất cho người mua.

Hai luật không được phá:

- không gán tên người Việt cụ thể vào lời người mua nước ngoài
- bật cờ `khongPhaiKhachThat`, nếu không là khai sao giả cho Google

---

## Bước 6 · Prompt sinh ảnh

```
node {script_path}/prompt-stitch.mjs ho-so.json --tam <danh sách>
```

Danh sách tấm lấy từ `boAnh` của hồ sơ danh mục, **không dùng bộ cố định**.
Máy câu cần "trên tay" vì khách lo kích thước. Phao cần "ban đêm" vì đó là thứ
quyết định mua. Cần câu cần "thu gọn". Ghế cần "đang ngồi".

Prompt gồm ba khối: sự thật sản phẩm · quy chuẩn lớp chữ · mô tả từng tấm.
Khối sự thật sinh **từ hồ sơ**, không gõ tay, để không có hai bản thông số.

Ảnh trả về thì **zoom từng tấm đọc mọi chữ và mọi số**, đối chiếu hồ sơ. Công
cụ sinh ảnh chế ra thông số nghe rất hợp lý, và không tấm nào sai kiểu nhìn là
biết.

---

## Trước khi bật

Chạy `checklist.md` ở **ngữ cảnh sạch**, không mang theo trí nhớ của phiên
dựng. Người dựng luôn đọc thấy thứ mình định viết, không đọc thấy thứ mình đã
viết.

Còn một mục chưa tick thì chưa bật.
