# Hiện trạng cửa hàng Shopify — chốt ngày 13/10/2026

Viết để **mở máy khác là làm tiếp được ngay**. Đọc tệp này trước, rồi mới đến
`BAY-DA-TRA-GIA.md` khi cần tra một lỗi cụ thể.

---

## 1. Trạng thái một dòng

Trang sản phẩm và trang chủ **đã dựng xong theo mẫu**, đẩy lên theme đang
chạy. Thứ chặn duy nhất giữa "xem được" và "bán được" không phải giao diện —
mà là **store vẫn là development store, chưa nhận được thanh toán**.

```
store        5jxr9j-bp.myshopify.com        password_enabled: false
theme live   phieu-v2-giao-dien  #166239993954
plan         unlimited (dev store)          checkout_api_supported: FALSE
repo         ~/my-project/shop-christmasspin  (git@github-personal:...)
```

---

## 2. Sản phẩm

| id | tên | giá |
|---|---|---|
| 10337209483362 | Santa Spins™ Music Box | $80 / gạch $140, 1 biến thể, 8 ảnh |
| 10337294254178 | Priority Shipping | $6 / $10 |
| 10337294319714 | Christmas Mystery Gift | $20 / $26 |
| 10337294188642 | Lifetime Warranty | $10 / $13 |
| 10337294024802 | 9 Santa Spins Discs | $13 |
| 10337294090338 | 180 Day Warranty | $8 |
| 10337294418018 | Shipping Protection | chưa gắn vào giỏ |

Cả sáu món bán kèm **đã có ảnh đại diện** (gắn 13/10). Trước đó không món nào
có ảnh — đó là lý do giỏ hàng trống trơn bên trái và lưới sản phẩm toàn ô xám.
Một thay đổi, sửa ba chỗ cùng lúc.

---

## 3. Khối tự viết — đây là phần công sức lớn nhất

| tệp | làm gì | bẫy phải nhớ |
|---|---|---|
| `blocks/bundle-picker.liquid` | ba gói Buy 1/2/3, món bán kèm, dòng quà, thanh tồn kho | giá món kèm phải NHÂN theo gói, nhưng **không nhân đều** |
| `assets/bundle-picker.js` | thêm vào giỏ, đồng bộ số lượng sang thanh dính | số lượng đọc từ `data-sl`, **không tính lại trong JS** |
| `blocks/countdown-timer.liquid` | đồng hồ đếm ngược | kiểu dáng để TRONG block, không ở `custom.css` |
| `blocks/review-slider.liquid` + `.js` | dải review lớn, 6 slide + chấm | |
| `blocks/mini-reviews.liquid` | ba review ngắn dưới nút mua, có avatar | |
| `blocks/payment-badges.liquid` | huy hiệu thanh toán | block có sẵn của theme ra 1px vì dev store |
| `blocks/comparison-table.liquid` | bảng so sánh | |
| `assets/tu-truot.js` | tự chạy cho **cả ba** dải trượt | dùng chung selector với `custom.css` |
| `assets/custom.css` | toàn bộ lớp thiết kế | ~1400 dòng, đọc chú thích trước khi sửa |

**Khối `qua` ("Some gifts get opened")** không dùng block của theme mà là một
khối `custom-liquid` trong `templates/product.json` — vì mẫu cũng vậy, và ba
thứ ở đó (dòng tiêu đề đỏ nghiêng, icon tích tròn, căn lề trái) không dựng
được bằng text block.

---

## 4. Màu và số đo đã chốt

```
đỏ chủ đạo   #C30F16      (đổi 13/10 từ #e31837 theo yêu cầu chủ shop)
đỏ đậm hover #A80B13
sao đánh giá #E3B23C
```

Đổi màu chủ đạo thì phải quét **mọi dạng viết**: hex, `rgb(195, 15, 22)`,
`rgb(195 15 22 / 30%)` và dạng viết liền. Dùng `do/domau.mjs` để soi còn sót.

Các số đo khớp mẫu (đo ở khung 390px, lấy nút mua làm mốc):

```
ships to...     +62   (mẫu +63)      13px/400
thanh tồn kho   +113  (mẫu +114)
"Christmas run" +161  (mẫu +160)     11px/400 #888
BUNDLE & SAVE   cách khối trên 6px   (mẫu 6px)
```

---

## 5. Việc còn treo

### Chỉ chủ shop làm được

1. **NÂNG GÓI SHOPIFY.** Đây là việc quan trọng nhất còn lại. Dev store không
   nhận được tiền; mọi thứ khác đã sẵn sàng.
2. **Xoay khoá `shpss_3dacf4ec…`** — đã lộ trong khung chat ngày 13/10 và nay
   mang gần như toàn quyền trên store.
3. Ảnh khách thật hoặc ảnh có bản quyền cho avatar review (xem mục 6).

### Làm được, chờ chủ shop gật

- **Dòng hàng trong giỏ vẫn cao hơn mẫu.** Mẫu xếp ảnh trái — tên + ô số
  lượng giữa — giá phải, mỗi dòng ~100px; của mình gần 250px. Sửa được nhưng
  phải dựng lại bảng dòng hàng của Horizon, rủi ro cao hơn các việc đã làm.
- **Toggle "Shipping Protection" trong giỏ.** Sản phẩm đã có và đã có ảnh;
  thiếu phần gạt bật/tắt. Khoảng một khối như `bundle-picker`.
- **Danh sách huy hiệu thanh toán đang hứa thứ store chưa làm được.** Sau khi
  nâng gói phải chỉnh cho KHỚP đúng cái thực sự bật.

---

## 6. Ranh giới đã chốt, đừng bàn lại

**Ảnh của cửa hàng mẫu: ĐƯỢC DÙNG.** Chủ shop chốt hai lần (ảnh sản phẩm, rồi
ảnh review). Tôi đã nêu lo ngại hai lần và bị gạt cả hai. Đừng nêu lần ba.

**Nhưng mặt người thì không.** Ba avatar của mẫu là ảnh mặt người thật; gắn
vào "Karen M. — Nashville, US" là bịa danh tính người nói, khác loại với ảnh
sản phẩm. Hiện dùng vòng tròn chữ cái đầu (K / D / G), và khối đã có sẵn ô
chọn ảnh cho từng dòng.

**Đồng hồ đếm ngược nay chạy chế độ `daily`** — đếm lùi trong ngày rồi tự đặt
lại mỗi đêm, theo mẫu. Khác với ghi chép cũ trong `CLAUDE.md` mục 3.

---

## 7. Mở máy khác thì làm gì trước

```bash
cd ~/my-project/shop-christmasspin && git pull
bash ~/.shopify-lam-moi-token.sh          # token sống 24h
shopify theme list                         # xác nhận theme nào đang live
```

Rồi chạy hai phép kiểm hồi quy trong `shopify/do/` — nếu một trong hai đỏ thì
có thứ gì đó đã hỏng kể từ 13/10:

```bash
node shopify/do/kiemgio.mjs      # phải ra TONG: 226
node shopify/do/thanhdinh.mjs    # phải ra "Add to cart (3)" -> 3 món
```

**Quy tắc đắt giá nhất rút ra trong ngày:** thay đổi nào phát biểu được bằng
một con số thì phải **đo lại con số đó sau khi đẩy**. Tôi đã một lần báo
"xong" phần đệm header dựa trên ảnh chụp, trong khi nó chưa hề chạy — ảnh
trông thoáng hơn là nhờ các thay đổi khác trong cùng lượt.
