# Sản phẩm thứ hai: Memory Orb™ — hồ sơ và danh sách việc

Chốt ngày 20/10/2026. Đọc tệp này là làm tiếp được ngay.

---

## 1. Chốt gì rồi

| | |
|---|---|
| Sản phẩm | **Memory Orb™** — quả cầu trưng bày video của chính khách |
| Giá bán | **$59.99** (gạch **$94.99**) — chủ shop chốt |
| **Buy 2** | **$108.00** — chủ shop chốt (giảm 9,98%, tức $54/cái) |
| Buy 3 | ⬜ **CHƯA CHỐT** — xem mục 4 |
| Biến thể | White · Black |
| Giá vốn | **$36/cái cả ship** — chủ shop đưa |

### Bảng lãi (phí cổng giả định 2,9% + $0.30)

| | khách trả | lãi | biên | lãi/cái |
|---|---|---|---|---|
| Buy 1 | $59.99 | **$21.95** | 37% | $21.95 |
| Buy 2 | $108.00 | **$39.10** | 36% | $19.55 |
| *Buy 3 @ $153* | *$153.00* | *$56.25* | *37%* | *$18.75* |
| *Buy 3 @ $159* | *$159.00* | *$62.08* | *39%* | *$20.69* |

Giá vốn 2–3 cái **suy ra**, không phải số đo: lấy tỉ lệ gộp ship của Santa
Spins (2 cái = 1,819× đơn giá; 3 cái = 2,556×) → $65.47 và $92.01. Có số thật
từ nhà cung cấp thì tính lại.

🔴 **Biên mỏng hơn Santa Spins đáng kể.** Tỉ lệ bán/vốn chỉ **1,67×**
(Santa Spins 1,98×; chuẩn dropship thường 2,5–3×). Lãi Buy 1 $21.95 **chính là
trần CPA** — quảng cáo vượt $22/đơn là lỗ. Đã nêu với chủ shop, chủ shop chốt
$59.99.

**Nút thắt là giá vốn $36**, không phải giá bán. Xuống được $25–28 thì ở
$59.99 lãi thành $30–33, ngang Santa Spins. Đáng bỏ một buổi tìm nguồn khác.

---

## 2. Thông số sản phẩm (đọc từ trang đối thủ)

- 4GB bộ nhớ trong · sạc **USB-C** · ~350g · 2.7"
- Video phải đúng **480×480** — khách tự đổi kích thước rồi kéo vào thư mục
- Cam kết của họ: hoàn tiền 30 ngày · ship 8–15 ngày · free worldwide

🔴 **Bước 480×480 là trở ngại thật.** Khách phải đổi kích thước video. Phải
giải quyết **ngay trên trang bán**, không để khách phát hiện sau khi mở hộp —
nếu không sẽ thành hoàn tiền và tin nhắn hỏi. Đây đúng loại việc mà trang
hướng dẫn kiểu `/pages/setup-guide` của Santa Spins sinh ra để làm.

---

## 3. Đối thủ `merryorb.store/products/orb` — đã soi kỹ

**KHÔNG có khối chọn gói nào.** Một giá $59.99, hai màu, hết. Nên câu "để như
store của họ" và "mua 2 = $108" là hai ý ngược nhau — hiểu là **bố cục kiểu
họ, thêm tuỳ chọn mua 2**.

Ba thứ họ làm, ghi lại để chọn có ý thức chứ không sao chép mù:

| | thực tế |
|---|---|
| "**Sold out**" trên trang | dữ liệu sản phẩm báo **còn hàng cả hai màu** → khan hiếm giả |
| "**100+ orders in the last 24h**" | số cứng trong theme, không nối đơn thật |
| "**4.7/5 từ 743 đánh giá**" | chủ shop nói sẽ tìm và import đánh giá sau |

Chủ shop đã quyết hướng cho các thứ tương tự bên Santa Spins — **đừng bàn
lại**, chỉ hỏi từng cái một có bật hay không.

---

## 4. ⬜ Hai quyết định chủ shop còn phải chốt

1. **Gói 3: có hay không?**
   Đề xuất của trợ lý: **chỉ Buy 1 và Buy 2**. merryorb không có gói nào, và
   món quà cá nhân hoá thì mua 3 khó hình dung — ai cần ba quả cầu kỷ niệm?
   Nếu vẫn muốn: $153 (nhịp đều 15%) hoặc $159 (giữ lãi/cái cao hơn).

2. **Link listing nguồn trên AliExpress.**
   Cần **số đơn đã bán** của listing đó. Đây là thứ đã loại món người tuyết
   (16 đơn, 1 đánh giá kêu "arrived broken"). Là rủi ro duy nhất của Orb chưa
   kiểm được.

---

## 5. 🔴 Rào cản kỹ thuật: KHÔNG có quyền API vào store đang bán

```
creds hiện có          →  5jxr9j-bp.myshopify.com   (store Santa Spins CŨ)
ninhpham.myshopify.com →  HTTP 401
```

| làm được | KHÔNG làm được |
|---|---|
| Toàn bộ theme: template, khối, CSS | Tạo sản phẩm |
| Push/pull qua CLI (môi trường `ss`) | Tải ảnh lên Files |
| | Tạo giảm giá tự động |
| | Đọc đơn hàng |

**Cần**: cài một app lên store `ninhpham` như app "Claude admin new" bên store
cũ, rồi đưa `CLIENT_ID` / `CLIENT_SECRET`. Nhớ bài học 14/10: thêm scope xong
phải **cài lại app lên cửa hàng**, Release thôi chưa đủ.

---

## 6. Danh sách việc, theo thứ tự

### Chủ shop làm trước (chặn mọi thứ khác)
1. **Cài app Admin API lên store `ninhpham`** → đưa creds. Hoặc tự làm phần
   Admin ở mục 2 dưới.
2. **Chốt gói 3** (mục 4.1).
3. **Gửi link listing nguồn** + số đơn đã bán (mục 4.2).
4. Tìm nguồn rẻ hơn $36 — việc có giá trị cao nhất trong cả danh sách này.

### Phần Admin (trợ lý làm nếu có creds, không thì chủ shop)
5. Tạo sản phẩm **Memory Orb™**, 2 biến thể White/Black, $59.99, gạch $94.99.
6. Tải ảnh sản phẩm.
7. Tạo **một giảm giá tự động**: `$11.98 fixed · once per order · min 2 cái`
   → ra đúng $108. Đặt tên **tiếng Anh** (bài học 14/10: tên "Giảm giá 1"
   hiện ra cho khách ở giỏ và checkout).

### Trợ lý dựng (nửa ngày, sau khi có sản phẩm)
8. `templates/product.memory-orb.json` — dùng lại nguyên bộ khối Santa Spins:
   `bundle-picker`, `countdown-timer`, `review-slider`, `mini-reviews`,
   `comparison-table`, `payment-badges`, `tu-truot`.
9. Khối giải thích bước **480×480** — và trang hướng dẫn riêng như
   `/pages/setup-guide`.
10. Viết câu chữ mới. **Không chép nguyên văn merryorb** — cùng ranh giới đã
    chốt 13/10: lấy cấu trúc phễu và cơ chế, viết lại lời.
11. Đo lại: trang = giỏ = checkout ở cả US và VN (bẫy đổi tiền tệ 15/10).

### Không phải làm
- `snippets/la-santa.liquid` **giữ nguyên**. Orb cùng tệp khách với Santa
  Spins (quà Giáng sinh, kỷ niệm) nên dùng chung header/footer nhóm Santa.

---

## 7. ❌ Đã loại: người tuyết biết hát (`suzvo.com`)

Ghi lại để khỏi quay lại:

- **Sharper Image bán cùng món $55.99**, giao **3–5 ngày**, đổi trả **60 ngày**
  — dropship bán $45.99 ship 16 ngày chỉ rẻ hơn $10 (18%)
- Listing AliExpress: **16 đơn, 1 đánh giá**, nội dung đánh giá duy nhất là
  *"everything arrived broken and disassembled"*
- Hàng cồng kềnh 27–30cm, nhựa rỗng, có linh kiện điện → rủi ro vỡ cao
- Đoạn mô tả chủ shop gửi tả **một món khác** (đèn chạy pin), trong khi món
  thật cần **cắm điện** và có máy chiếu + loa + hát

**Tiêu chí rút ra, dùng cho mọi sản phẩm sau:**
1. Không có ở Walmart/Amazon/Sharper Image — có thì biên bị kẹp
2. Nhỏ và chắc — vỡ khi ship là mất cả vốn lẫn khách
3. Listing nguồn phải vài trăm đơn trở lên, không phải 16
4. Dùng lại được bộ khối sẵn có — nửa ngày, không phải ba ngày
