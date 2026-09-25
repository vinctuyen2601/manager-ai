# Bê sản phẩm từ 1688 về 17fishing

Viết sau khi clone THẬT một sản phẩm đầu tiên (máy câu AS dòng HA, 24–25/09/2026).
Mọi bẫy dưới đây đều đã trả giá, không có cái nào là lo xa.

---

## Bài học lớn nhất của lần đầu

**Việc tốn thời gian KHÔNG phải rút dữ liệu.** Rút xong trong mười phút bằng
script. Thứ ngốn cả buổi là: đọc thông số nằm trong ẢNH, viết lời, và **đi bắt
những con số nói ngược nhau** giữa mô tả, ảnh, câu hỏi thường gặp và bảng
thông số.

Nên trục của quy trình này là **BẢNG SỰ THẬT**: một bảng duy nhất chốt mọi con
số, dựng một lần ở đầu, và mọi thứ sau đó phải khớp với nó. Không có bảng đó
thì mỗi khâu lại chế ra một phiên bản thông số riêng.

Bằng chứng: bộ ảnh AI đợt đầu ghi `HA5000`, `HA6000` (hai cỡ không tồn tại),
`HA12000 cối nông` (thật là cối sâu), và `5.1:1 + hãm 15kg` (hai thông số
không bao giờ đi cùng nhau).

---

## Giai đoạn 0 — Quyết có làm hay không  ·  chủ shop  ·  5 phút

Làm TRƯỚC khi rút bất cứ dữ liệu nào. Ba câu, trượt một câu thì dừng:

1. **Lấp được chỗ trống nào trong thang giá?** Mở `/analytics`, xem giá 10 sản
   phẩm đang bán. Tháng 9/2026 có lỗ hổng rõ từ 420k tới 1,55tr.
2. **Danh mục đó có người xem không?** Bảng "Từng sản phẩm" trong Phân tích.
   Máy câu là nhóm nhiều lượt xem nhất, nên máy câu là lựa chọn có cơ sở.
3. **MOQ có bằng 1 không?** Không đặt lẻ được thì không thử được, mà không thử
   được thì không nên bán.

---

## Giai đoạn 1 — Rút dữ liệu  ·  tự động  ·  10 phút

Chủ shop **đăng nhập 1688**, mở trang sản phẩm, rồi:

1. Cuộn tới mục 商品评价, bấm **查看全部评价**, cuộn hết danh sách
2. F12 → Console → gõ `allow pasting` → dán `trich-1688.js` → Enter
3. Nó chép JSON vào clipboard, dán vào chat

**Ảnh mô tả KHÔNG nằm trong trang.** Chúng ở
`https://itemcdn.tmall.com/1688offer/<mã trong detailUrl>`. Đây là nơi chứa
bảng thông số kỹ thuật thật.

**Bẫy đã dính ở khâu này:**

| Bẫy | Hậu quả nếu không biết |
|---|---|
| Khối JSON lặp 3 lần trong HTML | 9 biến thể đọc ra thành 27 |
| Ảnh đánh giá là MẪU KHÁC | Suýt đăng ảnh máy xanh ngọc cho máy đồng cổ |
| Đánh giá gộp theo GIAN HÀNG, không theo mẫu | 6/8 đánh giá là của dòng cũ, cách 6–7 năm |
| "6000+ đánh giá" | Chỉ ~300 có chữ, 8 có ảnh. Phần còn lại là chấm sao câm |
| Bảng 商品件重尺 | Điền cho có: cả 9 cỡ đều ghi 350g, trong khi thật là 285–697g |
| Ảnh "mới" trong mô tả | Phần lớn là banner bán chéo mẫu KHÁC |
| Tên dịch máy | "bánh xe quay" = máy câu. Phải viết lại từ đầu |

---

## Giai đoạn 2 — Dựng BẢNG SỰ THẬT  ·  cùng làm  ·  20 phút

Một bảng, mọi thứ sau này phải khớp. Với máy câu thì các cột là:

```
cỡ | bạc đạn | tỉ số truyền | sức chứa cước | lực hãm | khối lượng | kích thước | giá vốn CNY | giá bán
```

**Thông số nằm TRONG ẢNH, phải đọc bằng mắt.** Không grep được. Tìm tấm có
chữ 产品参数 hoặc bảng kẻ ô trong bộ ảnh mô tả.

Kèm ba dòng **KHÔNG ĐƯỢC NÓI**, chốt ngay tại đây:

- thứ nhà sản xuất không công bố (ví dụ chống nước mặn → không nhận câu biển)
- thứ ảnh không kiểm được (lớp phủ là phủ hay màu xuyên thân)
- cỡ/mã không tồn tại trong dòng

Ba dòng này là thứ đưa vào prompt Stitch để chặn nó bịa.

---

## Giai đoạn 3 — Sinh ảnh bằng Stitch  ·  chủ shop  ·  30 phút

Xem `PROMPT-STITCH.md`. Luật cứng: **mọi con số trong ảnh phải có trong Bảng
sự thật.** Stitch chế ra thông số nghe rất hợp lý — đó là chế độ hỏng mặc định
của nó, không phải tai nạn.

Bộ tối thiểu 6 tấm, theo bốn nhiệm vụ Hero trong `product-image-knowledge.md`:

| # | Tấm | Trả lời câu hỏi |
|---|---|---|
| 1 | Hero: sản phẩm chiếm ≥90% khung | là cái gì |
| 2 | **Trên tay người** | **to cỡ nào** ← khách lo nhất |
| 3 | Bối cảnh dùng thật | tôi được gì |
| 4 | Chú thích bung chi tiết | làm bằng gì |
| 5 | So sánh các cỡ | chọn cỡ nào |
| 6 | Hộp và phụ kiện | nhận về gồm gì |

---

## Giai đoạn 4 — Dựng sản phẩm  ·  tự động + viết  ·  40 phút

Thứ tự bắt buộc, vì khâu sau phụ thuộc khâu trước:

1. Tải ảnh **kèm tên SEO** — hộp thoại trong CMS gợi ý sẵn, đổi "ảnh N" thành
   thứ nhìn thấy trong ảnh
2. Tạo sản phẩm ở trạng thái **nháp** (`isActive: false`)
3. Biến thể: tên, giá, **ảnh riêng theo nhóm cỡ**
4. Nội dung block từ Bảng sự thật
5. Đánh giá — xem luật ở dưới

**Giá bán:** giá vốn CNY × tỉ giá × hệ số của chủ shop. Lần đầu chốt 2–2,5tr
cho hàng vốn 65–115 CNY.

**Đánh giá.** Đánh giá mồi (`seedRandom`) thì chủ shop có quyền dùng. Dịch
đánh giá thật từ 1688 cũng được, nhưng **không gắn tên người Việt cụ thể** —
đó là bịa lời chứng thực. Và **bật cờ**
`blockData['danh-gia'].khongPhaiKhachThat = true` để không khai sao cho Google,
nếu không là vi phạm chính sách review snippet, mất ngôi sao của CẢ website.

---

## Giai đoạn 5 — Kiểm trước khi bật  ·  tự động

Chạy `soi-san-pham.mjs`. Danh sách kiểm lấy từ lỗi đã xảy ra thật:

- [ ] mọi số trong ảnh, mô tả, hỏi đáp, bảng thông số **khớp Bảng sự thật**
- [ ] không có mã cỡ nào ngoài danh sách thật
- [ ] không có tiêu đề nào hứa thứ không nằm dưới nó
- [ ] `stockStatus` khớp với lời trong hỏi đáp
- [ ] block đang bật đều có dữ liệu; block tắt không bỏ lại ảnh mồ côi
- [ ] ảnh hero ≥90% khung, video ngay sau hero
- [ ] tên tệp mỗi ảnh một khác
- [ ] cờ `khongPhaiKhachThat` đã bật nếu đánh giá không phải khách thật
- [ ] mọi URL ảnh trả 200

Xong hết mới bật `isActive`.

---

## Giai đoạn 6 — Đặt mẫu, thay ảnh thật  ·  sau khi bán

**Cả trang đang dựng trên lời nhà sản xuất.** Chưa ai trong shop sờ vào máy.
MOQ = 1 nên một cái chỉ ~280k. Cầm rồi thì chụp bốn tấm bằng điện thoại, và
bốn tấm đó mạnh hơn cả bộ ảnh AI vì chúng là thật:

1. máy trong lòng bàn tay
2. tay đang thao tác (vặn hãm, gập tay quay)
3. lắp trên cần, cạnh hồ
4. hai cỡ đặt cạnh nhau

Khách đầu tiên mua xong thì chuyển tin nhắn Zalo của họ thành đánh giá thật.

---

## Thời gian thật

Sản phẩm đầu: **cả một buổi dài**, phần lớn là gỡ bẫy và làm lại.
Sản phẩm thứ hai trở đi, nếu theo đúng quy trình này: **khoảng 2 giờ**, trong
đó chủ shop mất ~40 phút (lấy dữ liệu, sinh ảnh, duyệt).

Thứ rút ngắn nhiều nhất không phải script, mà là **Bảng sự thật dựng trước** —
nó chặn phần lớn vòng lặp sửa tới sửa lui.
