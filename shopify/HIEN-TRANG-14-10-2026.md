# Hiện trạng cửa hàng Shopify — chốt ngày 14/10/2026

Thay cho `HIEN-TRANG-13-10-2026.md` (giữ lại làm lịch sử). Đọc tệp này trước,
rồi `BAY-DA-TRA-GIA.md` khi cần tra một lỗi cụ thể.

---

## 1. Trạng thái một dòng

Trang sản phẩm, trang chủ, giỏ hàng, checkout đã dựng theo mẫu và **khớp số đo
từng khối**. Đã có giảm giá tự động cho gói 2 và 3 (chạy thật ở giỏ). Thứ còn
chặn bán: **cổng thanh toán** — chủ shop đăng ký qua LLC (Mỹ), chưa xong.
Lần kiểm checkout cuối (13/10) vẫn báo "This store can't accept payments right
now". **Chưa kiểm** store đã nâng khỏi gói dev chưa — giảm giá tự động chạy
được cả trên dev store nên không chứng minh gì.

```
store        5jxr9j-bp.myshopify.com
theme live   phieu-v2-giao-dien  #166239993954   (toml -e live đã trỏ đúng)
repo theme   máy Windows: D:\my project\shop-christmasspin
             máy cũ:      ~/my-project/shop-christmasspin
remote       máy Windows dùng alias  github.com-vinctuyen2601  (KHÔNG có github-personal)
```

---

## 2. Giá và lãi — ĐÃ CHỐT 14/10/2026, đừng bàn lại

Giá vốn chủ shop đưa (hàng + ship, cả đơn): 1 cái $40.46 · 2 cái $73.58 · 3 cái
$103.41. Phí cổng giả định 2,9% + $0.30.

| | Gạch ngang | Giá | Nhãn | Lãi/đơn (trước quảng cáo) |
|---|---|---|---|---|
| Buy 1 | $140 | $80 | 40% OFF | $36.92 |
| Buy 2 | $280 | **$136** | **50% OFF** | $58.18 |
| Buy 3 | $420 | **$189** | **55% OFF** | **$79.81** |

Nhãn làm tròn XUỐNG so với giá gạch ngang (thật 42,9% · 51,4% · 55,0%). Chủ shop
muốn gói 3 lãi hơn gói 2 vì rủi ro ship ba cái — đó là lý do Buy 3 = $189 chứ
không phải $160 ("mua 2 tặng 1").

**Tiền thật do HAI giảm giá tự động trong Admin → Discounts** (fixed amount,
"once per order", chỉ Santa Spins Music Box): **$24 khi ≥2 cái · $51 khi ≥3 cái**.
Khối `bundle-picker` chỉ HIỂN THỊ qua hai ô `giam2 = 24`, `giam3 = 51`.
**Đổi một bên mà quên bên kia là khách thấy giá A, trả giá B.** Kiểm bằng
`scratchpad/thugiam.mjs`-kiểu: thêm 2 và 3 cái vào giỏ, đọc `/cart.js`.

Tên hai giảm giá đang là "Giảm giá 1/2" (tiếng Việt, khách thấy ở giỏ) — đã nhắc
chủ shop đổi sang "Bundle & Save: 2/3 pack".

### Món bán kèm

- **Priority Shipping** ($6) — món tick DUY NHẤT còn lại trong mỗi gói.
- **Christmas Mystery Gift** — nay là **quà ebook gửi qua email**, hiện "+ 1x
  Christmas Mystery Gift (FREE)" ở cả ba gói, KHÔNG vào giỏ, KHÔNG vào đơn.
  Chủ shop phải tự nhớ gửi cho mọi đơn.
- **9 Extra Discs** (tên hiển thị; sản phẩm thật là "9 Santa Spins Discs") —
  🔴 **đang bán $13 mà giá vốn $15**, lỗ mỗi lần bán. Đã đề xuất $19–24, chủ
  shop CHƯA chốt.
- Lifetime Warranty, 180 Day Warranty, Shipping Protection: còn trong store, ẩn.

### Chưa xác nhận — đổi cả bảng lãi

"+ Nx Christmas Music Disc Set (FREE)" là **9 đĩa vốn có trong hộp** (lãi như
bảng) hay **bộ đĩa tặng THÊM** (mỗi bộ $15 → Buy 3 còn ~$34)? Đã hỏi, chưa trả lời.

---

## 3. Đã làm ngày 14/10/2026 (theme, đều đã đo trên trang thật)

**Trang sản phẩm**
- Ô tick: hết lỗi dấu tick mất và nền đen khi hover (Horizon `:where()` — xem bẫy)
- Khối 30 ngày, 4 hàng gặp, FAQ, dải "Open the box": dựng lại theo CSS gốc của mẫu
- Chấm điều hướng chung cho mọi dải trượt: đang xem = đỏ đặc, còn lại = viền đỏ
- Widget đánh giá Judge.me cuối trang (màu shop). **0 đánh giá** — xem mục 5
- Nút Back to top theo mẫu

**Trang chủ** — hero (gộp hero + badge), ba bước, footer, dải chữ chạy đầu
trang: khớp số đo mẫu ở khung 390. Không gắn "As seen on Instagram".

**Checkout** — chữ đổi bằng khoá `shopify.checkout.*` trong locale theme:
"Email or Phone", "Secure Checkout", cam kết 30 ngày, nút "Complete Purchase".

**Giỏ** — bỏ "Taxes and shipping calculated at checkout.", tắt ô mã giảm giá.

**Logo** — đĩa than giữa logo quay 6s/vòng + vòng LED vàng nhịp 2,4s. Chỉ đĩa
quay, vòng chữ đứng yên. Đổi logo thì phải đo lại bán kính (28,3%).

**Điều hướng** — món phụ (Product type = "Add-on") ẩn khỏi danh sách và tìm
kiếm; mọi trang danh sách chuyển thẳng sang trang sản phẩm, giữ `utm_*`.

---

## 4. Ranh giới đã nói rõ với chủ shop, KHÔNG làm

| Yêu cầu | Vì sao không |
|---|---|
| Nhập review của christmasspins.com vào Judge.me | review của khách shop khác |
| Ghi "70% OFF" khi thật 54%; nâng giá gạch ngang để ra 68–70% | con số sai, giá ảo |
| Gắn "As seen on Instagram" | chưa xuất hiện trên Instagram |

**Đã làm được, hợp lệ:** gom 109 review THẬT của **12 listing AliExpress cùng
mẫu** (4.7★, 45 có chữ, 11 có ảnh). Chủ shop đã import listing đầu
(`1005012338732070`) → Judge.me lấy **25** (chỉ lấy review có chữ HOẶC ảnh — đúng,
không phải lỗi). Danh sách 11 link còn lại đã đưa.

Dòng "(4.8/5) Loved by 1000+" → chủ shop TỰ sửa thành "500+" trong trình soạn
theme. Đã nêu rủi ro quảng cáo một lần; **đừng nêu lần ba**.

---

## 5. Việc còn treo

### ✅ Đã xong 14/10 (tối) — phiên trên máy Linux

- **Policies xong trọn gói.** Tạo Refund/Shipping/Terms trong Settings →
  Policies, đổi menu footer sang `/policies/...`, dựng 301 từ ba trang cũ, ẩn
  ba trang cũ. Đã đo: bốn link chính sách **hiện ở chân trang thanh toán**
  (trước chỉ có privacy), `/pages/refund-policy` trả 301.
  Thứ tự bốn bước bắt buộc — xem `BAY-DA-TRA-GIA.md`.
- **Hai giảm giá đổi tên** sang `Bundle & Save: 2-pack` / `3-pack`. Đối chiếu
  trước/sau: chỉ `title` đổi. Giỏ vẫn $136 / $189.
- **Gỡ gmail cá nhân** khỏi trang Contact và Refund Policy → `support@`.
- **App đã được cấp full quyền** (183 scope). Token làm mới là dùng được ngay.

### 🔴 SỬA LẠI MỘT ĐIỀU TÔI ĐÃ BÁO SAI

Sáng 14/10 tôi báo **"cổng thanh toán đã chạy"**. **SAI.** Phép dò chuỗi của
tôi hỏng vì dấu nháy cong — xem `BAY-DA-TRA-GIA.md`.

Trạng thái thật, đo tối 14/10:

| | |
|---|---|
| Gói cửa hàng | ✅ **Advanced** (đã trả phí, không còn dev store) |
| `eligible_for_payments` | ✅ True |
| `shopifyPaymentsAccount` | ❌ **null — chưa tạo tài khoản nào** |
| `supportedDigitalWallets` | ❌ `[]` rỗng |
| Checkout | ❌ "This store can't accept payments right now", nút Complete Purchase bị mờ |

**Không phải chờ duyệt — là chưa bật cổng nào.** Settings → Payments.

Gợi ý đã đưa chủ shop: Shopify Payments cho LLC Mỹ cần EIN + ngân hàng Mỹ;
trong lúc chờ thì **PayPal bật được gần như ngay**, không cần ngân hàng Mỹ.
Bật PayPal trước để bán được, thêm Shopify Payments sau.

⚠️ Khi bật cổng xong: **chỉnh dãy huy hiệu thanh toán** trên trang sản phẩm và
trong giỏ cho khớp cái thật sự nhận được. Hiện đang bày Visa/Apple Pay/
Google Pay/Shop Pay mà chưa cái nào hoạt động.

### ✅ Đã xong 14/10 (chiều)

- **Cổng thanh toán CHẠY ĐƯỢC.** Mở `/checkout` thật: hiện form, tổng $80,
  **không còn** câu "This store can't accept payments right now".
  ⚠️ Đừng dùng `shop.checkout_api_supported` làm căn cứ — cờ đó nói về
  Checkout API cũ, vẫn `false` dù thanh toán đã chạy. Tôi đã kết luận sai một
  lần vì nó. **Đo đúng là mở thẳng `/checkout`.**
- **Sender email** đã đổi sang `support@santaspinshop.com`.
- **Hai giảm giá tự động đổi tên sang tiếng Anh**: `Bundle & Save: 2-pack`
  và `Bundle & Save: 3-pack`. Đã đối chiếu trước/sau: chỉ `title` đổi, ngưỡng
  số lượng / số tiền / sản phẩm áp dụng / `combinesWith` y nguyên.
- **Domain `santaspinshop.com`** đã chạy, TLS cấp 14/10 06:41 UTC, apex + www,
  `http→https` và `www→apex` đều 301, myshopify cũ chuyển về domain mới.
- Gỡ gmail cá nhân khỏi trang Contact và Refund Policy.

### Chỉ chủ shop làm được

1. 🔴 **XÁC THỰC GỬI MAIL — chưa làm, và nó vô hiệu hoá cả kế hoạch gửi quà.**
   Đổi địa chỉ sender thôi là chưa đủ. Đo ngày 14/10:
   - SPF vẫn là `v=spf1 include:_spf.mx.cloudflare.net ~all` — chỉ cho NHẬN,
     không cho Shopify GỬI hộ
   - DKIM `shopifyemail._domainkey` : **không có**
   - DMARC : **không có**

   Gmail và Outlook sẽ cho email xác nhận đơn vào spam. Mà ebook, hai hướng
   dẫn và mã vận đơn đều đi bằng email đó. Vào Settings → Notifications, làm
   theo các bản ghi Shopify yêu cầu, thêm vào Cloudflare DNS.

2. ⚠️ **Checkout vẫn cho dùng SỐ ĐIỆN THOẠI thay email.** Mở `/checkout` thấy
   "Email or mobile phone number". Đơn đặt bằng số điện thoại sẽ **không có
   email** — không gửi quà được. Settings → Checkout → *Customer contact
   method* → **Email**.

3. **Hai scope cho app** `read_legal_policies` + `write_legal_policies` để tôi
   tạo được Refund/Shipping/Terms trong Settings → Policies. Nội dung đã soạn
   sẵn ở `POLICIES.md`.
4. Chốt giá bán bộ "9 Extra Discs" (đang lỗ $2/lần) và trả lời câu hỏi bộ đĩa tặng.
4. Nhập nốt 9 link AliExpress có nội dung vào Judge.me.
5. Admin → Content → Menus: đổi link "Shop" (`/collections/all`) thành sản phẩm.
6. Kiểm Admin → Edit code → `sections/header-group.json` → Older versions —
   lần push 14/10 đã đè một thay đổi nhỏ chưa rõ (xem bẫy "kéo-so").
7. **Xoay client secret** app "Claude admin" (lộ 13/10) — vẫn treo.
8. Push `manager-ai` từ máy Windows: remote đang dùng khoá mặc định (công ty);
   lệnh đổi sang `github.com-vinctuyen2601` bị bộ chặn quyền chặn, chủ shop phải
   tự chạy.

### Đề xuất, chờ gật
- Ba câu FAQ từ review 1–3 sao: file MP3 phải là MP3 thật · hướng dẫn nạp
  nhạc khó hiểu · listing chỉ có đĩa bị tưởng có cả máy.
- Viết lại câu chữ trang chủ đang trùng NGUYÊN VĂN site mẫu (hero, ba bước,
  tiêu đề review) — ngược với ranh giới "câu chữ viết mới" đã chốt 13/10.
- Ebook thành sản phẩm $0 tự vào giỏ, để đơn có dấu vết và không sót gửi mail.

---

## 6. Mở máy thì làm gì trước

```bash
cd "<repo theme>" && git pull
shopify theme list --store 5jxr9j-bp.myshopify.com     # xác nhận theme live
# Windows: chrome.exe --headless=new --remote-debugging-port=9333 --user-data-dir=<tạm>
node shopify/do/kiemgio.mjs      # phải ra TONG: 142  (Buy 2 + Priority Shipping)
node shopify/do/thanhdinh.mjs    # phải ra 3 x Santa Spins
```

**Trước MỌI push:** `bash shopify/do/soLive.sh "<repo theme>" <tệp...>` — dừng
nếu chủ shop đã sửa trên live. Đây là bài học đắt nhất của ngày 14/10.
