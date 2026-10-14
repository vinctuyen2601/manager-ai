# Hiện trạng Shopify — chốt ngày 15/10/2026

Thay cho `HIEN-TRANG-14-10-2026.md` (giữ làm lịch sử). **Santa Spins đã DỜI
sang store Skin Solutions** vì store Santa Spins cũ chưa bật được cổng thanh
toán. Đọc tệp này trước; `BAY-DA-TRA-GIA.md` khi tra một lỗi cụ thể.

---

## 1. Hai store, hai nhánh git — đừng lẫn

| | Store Santa Spins (cũ) | **Store Skin Solutions (đang bán)** |
|---|---|---|
| store | `5jxr9j-bp.myshopify.com` → `santaspinshop.com` | `ninhpham.myshopify.com` → **`skinsolutions.online`** |
| cổng thanh toán | ❌ chưa bật (`shopifyPaymentsAccount = null`) | ✅ chạy: thẻ, PayPal, Apple/Google Pay, Shop Pay, đổi tiền tệ |
| theme live | `phieu-v2-giao-dien #166239993954` | **`Santa Spins #167861190891`** |
| theme để LÙI LẠI | — | `Updated copy of Dawn #131282043115` (Dawn 3.0.0) |
| nhánh git | `main` | **`skinsolutions`** |
| môi trường CLI | `-e live` | **`-e ss`** + `--theme 167861190891` + `--allow-live` |

Chủ shop chốt 14/10: **giữ domain `skinsolutions.online`** (ảnh hưởng store
chính). "Santa Spins" là TÊN SẢN PHẨM, không phải tên cửa hàng. 20 món cũ
(áo ngực, găng tay…) **vẫn bán**.

**Push lên Skin Solutions phải có `--allow-live`** — thiếu thì CLI im lặng
không đẩy, grep `errors` ra rỗng tưởng là xong (đã dính 15/10).

---

## 2. Theme Skin Solutions phục vụ HAI loại khách — cơ chế tách

`snippets/la-santa.liquid` là **một chỗ duy nhất** quyết định nhóm:
trang chủ + sản phẩm template `santa-spins` = **nhóm Santa**; còn lại = **nhóm
store**. Mọi thứ dưới đây đọc từ đó:

| | Nhóm Santa | Nhóm store |
|---|---|---|
| logo | Santa (đĩa quay) | Skin Solutions (cài đặt "Store-wide header") |
| menu | `santa-spins` | `main-menu` |
| dải chữ chạy, footer | câu Santa | câu store: FREE SHIPPING ON ORDERS OVER $50 · 30-DAY · SECURE CHECKOUT |
| Home / logo trỏ về | `/` | `/pages/shop` **nếu Page `shop` tồn tại** (`snippets/url-menu.liquid`), không thì `/` |
| tuyết rơi, nút nhạc | có | không |

**Vì sao:** dùng chung thì khách mua áo ngực thấy logo hộp nhạc và "Free
worldwide shipping" — hàng thường TÍNH phí ship. Chủ shop: "làm khách nghi ngờ".

Template:
- `product.santa-spins.json` — trang Santa Spins (khối chọn gói, quà…)
- `product.json` — **trang sản phẩm thường**: giá đỏ 24px, chọn biến thể kiểu
  pill, nút mua, cam kết 30 ngày, hỏi đáp (giao hàng + đổi trả), mô tả là
  SECTION RIÊNG luôn hiện (chủ shop bác để mô tả trong khung gập/mở)
- `page.trang-chu-shop.json` — trang chủ riêng của store (hero, cam kết, lưới
  Home page + Bras, About us)

---

## 3. Giá gói — tiền thật vs hiển thị

| | Giá | Nhãn | Admin (giảm giá tự động) |
|---|---|---|---|
| Buy 1 | $80 | 40% OFF | — |
| Buy 2 | $136 | 50% OFF | **$24 fixed, once per order, min 2** |
| Buy 3 | $189 | 55% OFF | **$51 fixed, once per order, min 3** |

Hiển thị: `giam2_pt = 15`, `giam3_pt = 21.25` (**phần trăm**, không phải đô).
Store đổi tiền tệ theo nước khách — trừ thẳng đô vào giá đã đổi thì khách VN
thấy gói 2 = 4,2 triệu trong khi giỏ 3,58 triệu (đã dính 15/10). Đổi giá $80
thì tính lại cả hai phần trăm VÀ hai giảm giá trong Admin.

Đã đo 15/10: US $80/$136/$189 trang = giỏ = checkout; VN lệch < 1 xu.

---

## 4. Việc còn treo

### Chủ shop
1. ~~Page `shop`~~ ✅ **xong 15/10/2026**: `/pages/shop` trả 200, đúng template.
   Đã đo: trang áo ngực Home + logo → `/pages/shop` (bấm logo thật ra đúng);
   trang Santa + trang chủ vẫn → `/`. Lần đầu chủ shop tạo nhưng 404 — Page
   để **Hidden** thì Shopify ẩn khỏi khách và sitemap, không báo gì.
2. **Shipping profile free** cho Santa Spins + món phụ — chưa kiểm được (checkout
   chỉ hiện phí sau khi nhập địa chỉ).
3. **9 Extra Discs bán $13 dưới giá vốn $15** — chưa chốt giá mới.
4. Bộ đĩa tặng trong gói: 9 đĩa có sẵn trong hộp, hay bộ tặng THÊM? Chưa trả lời
   — đổi cả bảng lãi.
5. Statement descriptor `SKINSOL* SANTASPINS`; checkout chỉ nhận email (quà
   ebook gửi qua email).
6. Đánh giá Judge.me trên Skin Solutions đang TRỐNG (đánh giá đi theo store).
7. Bản 480p của video "See it in action" vẫn trỏ CDN store cũ — xoá ở đó thì tự
   rơi sang 1080p (nặng). Cần Admin API để lấy link 480p của store mới.

### Đề xuất, chờ gật
- Giỏ ghi "You save $120" trong khi khối chọn gói ghi $144 — giỏ chưa cộng giảm
  của gói (ghi THẤP hơn thật, không hại, nhưng lệch).
- Dải chữ chạy nhóm store vẫn nền đỏ Santa — có thể thêm ô màu riêng.

---

## 5. Mở máy làm tiếp

```bash
cd "<repo theme>" && git checkout skinsolutions && git pull
shopify theme list --store ninhpham.myshopify.com     # xác nhận #167861190891 live
# Chrome đo (Windows): chrome.exe --headless=new --remote-debugging-port=9333 --user-data-dir=<tạm>
node <scratch>/kiemgio-ss.mjs     # Buy 2 + Priority Shipping  -> TONG: 142
node <scratch>/thanhdinh-ss.mjs   # thanh dính Buy 3           -> 3 x Santa Spins
```

`kiemgio`/`thanhdinh` trong `shopify/do/` vẫn trỏ store CŨ — bản cho Skin
Solutions chỉ thay URL thành `https://skinsolutions.online/products/santa-spins-music-box?country=US`.
Đo xong mà vừa mở `?preview_theme_id=` thì **xoá cookie trước** (bẫy thanh xem
trước).
