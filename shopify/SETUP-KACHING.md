# Kaching Bundles — dựng y hệt christmasspins.com

Đo ngày 13/10/2026. Cấu hình của mẫu nằm nguyên dạng JSON trong HTML trang
sản phẩm, nên đây là **bản sao chính xác**, không phải phỏng đoán.

> **Đính chính bản mổ xẻ đầu tiên.** `MAU-CHRISTMASSPINS.md` ghi mẫu "chỉ
> dùng HAI app". Sai. Kaching nạp bằng JS nên không lọt vào phần chữ rút ra
> từ HTML. Mẫu dùng **ba** app: Judge.me, parcelwill, Kaching Bundles.
> Bài học: đếm app bằng tên miền trong HTML là chưa đủ, app nhúng qua
> App Embed không để lại tên miền riêng.

---

## 1. Bảy sản phẩm phải tạo trước

Quà và món bán kèm trong Kaching đều là **sản phẩm Shopify thật**. Không tạo
trước thì không chọn được trong app.

Giá đo được là bản hiển thị cho khách Úc (AUD). Tiền tệ gốc của mẫu là USD;
chia cho tỉ giá đo được `1,43683` rồi làm tròn ra số chẵn:

| Sản phẩm | AUD đo được | **USD cần nhập** | Vai trò |
|---|---|---|---|
| Santa Spins™ Music Box | 115 / 202 | **80 / 140** | món chính |
| 9 Santa Spins Discs | 19 | **13** | quà, cả ba gói |
| 180 Day Warranty | 12 / 12 | **8 / 8** | quà, cả ba gói |
| Lifetime Warranty | 15 / 19 | **10 / 13** | bán kèm −20% |
| Priority Shipping | 9 / 15 | **6 / 10** | bán kèm −20% |
| Christmas Mystery Gift | 29 / 38 | **20 / 26** | bán kèm −20% |
| Shipping Protection | 6 | **4** | bán kèm trong giỏ (parcelwill) |

Sáu món phụ nên để **ẩn khỏi danh mục** (không gắn collection, không hiện ở
`/collections/all`) — chúng chỉ tồn tại để Kaching gọi tới.

---

## 2. Ba gói — nguyên văn của mẫu

| | Buy 1 | Buy 2 | Buy 3 |
|---|---|---|---|
| title | `Buy 1` | `Buy 2` | `Buy 3` |
| subtitle | `YOU SAVE $60` | `You save $120` | `YOU SAVE $180` |
| label | `40% OFF` | `DOUBLE PACK` | `TRIPLE PACK` |
| badge | — | **`MOST POPULAR`** | — |
| quantity | 1 | 2 | 3 |
| discount | **0%** | **15%** | **0%** |
| quà | 1× Discs · 180-Day Warranty · Free Shipping | 2× Discs · 180-Day Warranty · Free Shipping | 3× Discs · 180-Day Warranty · Free Shipping |

Gói chọn sẵn: **Buy 1** (`preselectedDealBarId` trỏ vào gói đầu).

Thiết lập chung: `dealBarType: quantity-break` · `quantitySelector: false` ·
`showVariantsForSingleQuantity: true` · `badgesEnabled: true`.

### Về chuyện Buy 3 giảm 0%

Tính trên mỗi cái thì Buy 2 (15%) rẻ hơn Buy 3 (0%). Tôi nêu với chủ shop
13/10 và **chủ shop chốt giữ y nguyên**: giá trị của Buy 3 nằm ở ba bộ đĩa
tặng, còn "$180" là con số bán hàng dựa trên giá gạch ngang, không phải phép
giảm thật.

**Đã bàn rồi, đừng nêu lại.**

---

## 3. Bán kèm dạng tick — ba món, hiện theo gói

Cả ba đều: giảm **20%**, **không** chọn sẵn, **chỉ hiện khi gói tương ứng
được chọn**, và số lượng nhân theo gói.

```
+ Priority Shipping            x1 / x1 / x1
+ Nx Christmas Mystery Gift    x1 / x2 / x3
+ Nx Lifetime Warranty         x1 / x2 / x3
```

---

## 4. Huy hiệu

```
"MOST POPULAR"      chữ rgb(254,251,251)  nền rgb(227,24,55)  simple  13px
"Play More Songs!"  chữ rgb(255,255,255)  nền rgb(227,24,55)  simple  12px
```

`rgb(227,24,55)` chính là `#e31837`, màu đỏ chủ đạo đã dùng khắp theme.

Huy hiệu thứ hai gắn vào món bán kèm Mystery Gift, không gắn vào gói.

---

## 5. Việc phải làm bằng tay

Cấu hình Kaching nằm trong backend của chính app, **không có API nào gọi tới
được** — kể cả khi có token `write_products`. Toàn bộ mục 2, 3, 4 phải bấm
trong giao diện app.

Trước đó phải **bật App Embed**, nếu không widget không hiện dù đã cấu hình:

```
Admin → Online Store → Themes → Customize
→ App embeds (biểu tượng ổ cắm, cột trái dưới cùng)
→ bật Kaching Bundles
```

Kiểm đã bật chưa, không cần vào admin:

```bash
curl -s https://<store>.myshopify.com/products/<slug> | grep -ic kaching
# 0 = chưa bật
```

---

## 6. Vị trí widget

Mẫu đặt dải chọn gói **ngay dưới giá, trên nút mua**. Trong
`templates/product.json` của repo, chỗ đó nằm giữa `save_badge` và
`countdown`. Khi App Embed đã bật, dò xem Kaching chèn khối vào đâu rồi
chỉnh thứ tự cho khớp.
