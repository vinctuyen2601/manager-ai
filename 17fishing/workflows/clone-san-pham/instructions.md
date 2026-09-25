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
node {script_path}/doc-danh-gia.mjs dg.html --dong <danh sách mã biến thể thật> \
  --tu-ta   <tuVungDanhGia.taHang của hồ sơ danh mục, ngăn bằng dấu phẩy> \
  --tu-nham <tuVungDanhGia.nhamHang của hồ sơ danh mục>
```

Hai cờ `--tu-ta` / `--tu-nham` là **bắt buộc**, không phải tuỳ chọn. Thiếu thì
script rơi về từ vựng của máy câu, và với cần câu thì cờ `nhamHang` bật ngược:
`钓竿` là tên của chính món hàng chứ không phải món khác.

Nếu `doc-san-pham.mjs` báo `⚠ ... biến thể KHÔNG CÓ GIÁ` thì biến thể lấy từ
thuộc tính chứ không từ `skuInfoMap` — **dừng, đi xin giá**, đừng đi tiếp.

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

## Bước 3c · Việt hoá CHỮ TRÊN ẢNH

Ảnh xưởng đầy chữ Trung. Đăng nguyên là hỏng hai chỗ cùng lúc: khách không đọc
được phần đáng giá nhất (bảng thông số nằm trong ảnh), và trang trông như hàng
xách tay chưa qua tay ai.

Không dùng công cụ dịch ảnh tự động. Chữ viết lên ảnh là chữ **ta chọn**, lấy
từ Bảng sự thật ở bước 3, chứ không phải bản dịch máy của một câu quảng cáo
tiếng Trung. Khác biệt lớn nhất nằm ở chỗ: nhiều dải chữ **không được dịch mà
phải bỏ hoặc thay** (xem dưới).

```
cd <thư mục ảnh của sản phẩm>
python3 {script_path}/anh/do-dai-chu.py anh/a06.jpg --x 0 420   # dò toạ độ
# ... viết ke-hoach-anh.json ...
python3 {script_path}/anh/viet-hoa-anh.py ke-hoach-anh.json --soat   # xem khung đỏ
python3 {script_path}/anh/viet-hoa-anh.py ke-hoach-anh.json         # làm thật
```

Ba thứ **cấm dịch sang tiếng Việt rồi đăng**, vì chúng là cam kết của XƯỞNG với
người mua sỉ Trung Quốc, không phải của shop với khách Việt:

- chính sách đổi trả và bảo hành (`15天无理由退换`, `180天免费配节`)
- mốc giao hàng, phí vận chuyển
- huy hiệu "hàng tự sản xuất", "giá xưởng"

Những dải đó hoặc **bỏ** (`"bo": true`), hoặc thay bằng một **sự thật về sản
phẩm** lấy từ Bảng sự thật. Ô huy hiệu là chỗ tốt nhất để đặt thông số mà khách
hỏi nhiều: sức kéo, số đốt, độ dài thu gọn.

Ba cách xoá chữ, chọn theo nền — chọn sai thì miếng vá lộ ra thành hình chữ nhật:

| `nen` | dùng khi | cách làm |
|---|---|---|
| `trang` | nền trắng phẳng | tô trắng |
| `phang` | ô màu phẳng (huy hiệu, thẻ) | tô bằng màu trung bình mép trái ô |
| `toi` | nền chuyển màu DỌC (mặc định) | nhân bản một dải DỌC sạch cùng độ cao |
| `ngang` | nền chuyển màu NGANG | nhân bản một dải NGANG sạch cùng bề rộng |
| `anh` | nền là ảnh chụp | làm mờ rồi phủ tối |
| `giu` | vùng đã được dải trước xoá sạch | không đụng nền, chỉ viết |

`toi` là mặc định vì nền chuyển màu theo chiều dọc hay gặp nhất. Nhưng nó LÀM
PHẲNG gradient ngang: trên thẻ sáng dần từ trái sang phải, miếng vá hiện ra
thành khối màu đều sáng hơn nền. Chỗ đó dùng `ngang`. Trên ảnh chụp thì cả hai
đều ra vệt sọc, phải dùng `anh`.

Xoá một khối lớn rồi viết nhiều dòng lên thì dùng một dải `bo: true` để xoá,
các dải chữ sau đặt `nen: "giu"`. Để mỗi dòng tự vá nền lần nữa thì các miếng
vá chồng nhau, để lại đường nối ngang.

**Đọc toạ độ ô bằng `luoi-toa-do.py`, đừng ước lượng trên ảnh thu nhỏ.** Đã đặt
ô tiêu đề ở y 28-78 trong khi chữ nằm ở y 58-100 — nửa dưới nét chữ Hán còn
nguyên dưới dòng tiếng Việt, chỉ lộ ra khi mở ảnh thành phẩm.

**Đặt `co` (cỡ chữ) cứng khi nhiều ô nằm cạnh nhau trên cùng hàng.** Để tự co
cho vừa thì ô chữ ngắn phình to, ba ô cạnh nhau nhìn thành ba khối rời.

**Luôn chạy `--soat` trước.** Nó chỉ vẽ khung đỏ lên ảnh, ghi ra thư mục riêng
`<thuMucRa>-soat`. Khung không trùm hết chữ thì chạy thật sẽ để lại mảnh vụn
nét chữ Trung quanh mép, và mảnh vụn đó trông giống nhiễu ảnh chứ không giống
lỗi, nên rất dễ lọt.

**Và phải MỞ XEM ảnh thành phẩm.** Script không biết miếng vá có lộ hay không.

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

### Đặt tên ảnh và đường dẫn theo SẢN PHẨM

Ảnh xưởng mang tên vô nghĩa: `a06.jpg`, `O1CN01jekhrw2HNGOL0Q0w3.jpg`. Tải
nguyên tên đó lên là vứt đi một trong số ít tín hiệu SEO mà mình toàn quyền
điều khiển. Google đọc tên tệp trong URL ảnh, và ảnh sản phẩm là đường vào
qua Google Images.

**Công thức tên:** `<loại hàng>-<thương hiệu>-<đặc điểm hoặc cỡ>`

```
can-lang-xe-bennuo-3m6              biến thể
can-luc-bennuo-khoen-dinh-8-2-mm    chi tiết
can-lang-xe-vs-can-luc-bennuo-so-sanh
```

Không dấu, chữ thường, nối bằng gạch ngang, không có mã nội bộ của xưởng.
Mỗi tấm một tên riêng — script dừng hẳn nếu hai tấm trùng tên.

**Tên phải tả ĐÚNG tấm đó.** Đặt `can-lang-xe-bennuo-khoen-gap` cho tấm chụp
tay cầm thì tệ hơn là để `a41.jpg`: nó dạy Google một điều sai.

**Backend tự thêm phần còn lại của đường dẫn** — `17fishing/<tên>-<dấu thời
gian>.webp`. Thư mục và dấu thời gian không đổi được, nên phần duy nhất mình
điều khiển là cái tên. Đừng cố nhét đường dẫn vào tham số `name`.

**Ba chỗ khác cũng phải mang từ khoá của sản phẩm:**

| chỗ | quy tắc |
|---|---|
| `slug` sản phẩm | từ khoá chính + đặc điểm, không nhét mã SKU của xưởng |
| `alt` của mọi `<img>` trong mô tả | tả đúng tấm đó bằng câu người đọc được, không nhồi từ khoá |
| `alt` ảnh biến thể | web tự sinh `<tên sản phẩm> — ảnh N`, không phải đặt tay |

**Sửa ảnh của sản phẩm đã đăng thì GIỮ NGUYÊN `slug`.** Slug đổi là URL đổi,
là mất hết thứ hạng đã có. Ảnh thay thoải mái, slug thì không.

### Ảnh tải lên phải khai kiểu MIME

`new Blob([buf])` không có `type` thì backend BỎ HẲN khâu chuyển sang WebP,
S3 lưu `application/octet-stream`, và thư viện Media của CMS lọc theo mimeType
nên không thấy tấm nào. `curl` vẫn trả 200 đủ byte nên mọi phép kiểm "ảnh
sống" đều đạt — đã để lọt 19 ảnh đúng kiểu này, chủ shop phát hiện trước.

Dấu hiệu nhận ra trong một giây: **URL trả về còn đuôi `.jpg`**. Ảnh đi đúng
đường ở shop này luôn ra `.webp`. Kiểm sau khi tải:

```bash
curl -s -o /dev/null -w '%{http_code}|%{content_type}|%{size_download}' "$url"
```

**Cổng:** `--thu` không báo lỗi nào, và mọi URL ảnh trả về đều là `.webp`.

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
