# Sản phẩm thứ hai: Memory Orb™ — hồ sơ và danh sách việc

Chốt ngày 20/10/2026. Đọc tệp này là làm tiếp được ngay.

---

## 1. Chốt gì rồi

| | |
|---|---|
| Sản phẩm | **Santa's Memory Globe™** (đổi tên 21/10/2026, trước là "Memory Orb™") — quả cầu trưng bày video của chính khách |
| Vì sao đổi | "Memory Orb" là tên chung cả chục shop dùng (Walmart: "Christmas Memory Orb", "3D Memory Orb"…) → khách không phân biệt được shop. Chủ shop muốn có không khí Giáng sinh; tên cùng họ với Santa Spins™. Tránh "Loop" (không tự lặp), "Ornament/Bauble" (nặng, không treo được), "Snow Globe" trần (khách tưởng có nước/tuyết). Web search 21/10 chưa thấy ai dùng — **chưa tra USPTO**. |
| Tên NỘI BỘ giữ nguyên | template `memory-orb`, Page `orb-setup`, tệp ảnh `memory-orb-…`, tệp này — khách không thấy, đổi là gãy chỗ chủ shop đã gán |
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

### ✅ Đã dựng 20/10/2026 (theme `db05af0`, nhánh `skinsolutions`, đã đẩy live)
- `templates/product.memory-orb.json`: chủ shop yêu cầu **giống hệt Santa**
  (20/10) → đủ bộ khối, cùng thứ tự, chữ viết mới. Đếm ngược daily, thanh tồn
  kho, ghi chú tồn kho: BẬT như Santa. Bằng chứng xã hội ("Loved by ___"),
  mini-review, slider review, khối video: **có khối nhưng TẮT, nội dung để
  trống**. Orb chưa có đơn, đánh giá hay video; chủ shop điền số thật rồi
  bật trong trình soạn.
- Khối chọn gói có ô `so_goi` mới: Orb = **2 gói**, `giam2_pt = 9.985` → Buy 2
  = $108.00 đúng. Nhãn 36% / 43% OFF (làm tròn xuống), badge "BEST VALUE".
- Trang hướng dẫn `templates/page.orb-setup.json`: cắt vuông → đổi 480×480 →
  cắm USB-C → kéo thả, kèm mục gỡ lỗi. Trang sản phẩm link `/pages/orb-setup`
  ở 3 chỗ.
- Xem trước: `skinsolutions.online/products/santa-spins-music-box?view=memory-orb`
  (giá hiện là giá Santa $80 vì mượn sản phẩm Santa để xem).
- Đã đo: Orb 2 gói, Santa vẫn 3 gói $80/$136/$189, `kiemgio` TONG 142,
  `thanhdinh` 3 x Santa Spins.

### Ảnh/video đặt sẵn theo TÊN TỆP (theme `bf63ed9`)
Chủ shop tải lên **Content → Files** đúng tên là ảnh tự hiện, không cần mở
trình soạn. Đuôi `.jpg/.jpeg/.png/.webp` đều được. Chưa có tệp thì chỗ đó
trống, trang không vỡ (`images['tên']` trả rỗng; khác với ô chọn ảnh, trỏ
tệp không tồn tại là Shopify từ chối cả template).

| tên tệp | hiện ở |
|---|---|
| `memory-orb-intro` | khối "A photo shows the moment" (chưa có → ảnh đầu của sản phẩm) |
| `memory-orb-review-1` … `-6` | slider review (khối đang TẮT) |
| `memory-orb-avatar-1` … `-3` | mini-review cạnh nút mua (khối đang TẮT) |
| `memory-orb-guide-1` … `-3` | ảnh minh hoạ 3 bước trên `/pages/orb-setup` |

| `memory-orb-how-it-works.mp4` | video phần "How it works" — **KHÔNG tự hiện**: ô video trỏ tệp chưa có là Shopify từ chối cả template, nên tải lên xong trợ lý mới trỏ vào và bật khối |

Tiền tố đủ `memory-orb-` (chủ shop 21/10: "dễ bị lẫn"): Files xếp theo chữ cái nên mọi tệp Orb đứng một cụm, tách khỏi tệp Santa.

Thư viện ảnh đầu trang = ảnh của sản phẩm trong Admin, không theo tên.
🔴 Tải lên trùng tên tệp đã có: chọn **Replace**, đừng chọn giữ cả hai — giữ
cả hai thì tệp mới mang tên khác, không khớp nữa. (Chưa đo; suy từ cách
Files xử lý trùng tên.)

### Ẩn "Ships From" của DSers (theme `336419f`, 21/10/2026)
Chủ shop: "bỏ ship from". Theme ẩn tuỳ chọn tên `Ships From` / `Ship From`
ở trang sản phẩm và dòng biến thể trong giỏ — **chỉ khi nó có MỘT giá trị**.
Có hai giá trị trở lên (China / US) thì để nguyên: giá và tồn kho có thể khác,
ẩn đi khách mất quyền chọn → trường hợp đó xoá option trong Admin/DSers.
Chưa đo được trên Orb (sản phẩm chưa hiện ra storefront); đã đo hồi quy trên
áo ngực 2 tuỳ chọn: chọn biến thể chạy, giỏ ghi "Black, S".

### Chỉ bán màu White (21/10/2026)
Chủ shop: "chỉ làm 1 màu… chỉ có màu trắng". Theme: khối chọn màu TẮT trên
template Orb; khối chọn gói có ô mới `mau_mac_dinh = White` — luôn bán biến
thể có giá trị "White" (còn hàng), kể cả khi khách vào bằng `?variant=<Black>`.
Đã đo bằng template thử trên áo ngực: vào bằng Beige → khối gói bán Black
(ô đặt "Black"). Santa không đổi: TONG 142, thanh dính 3 x Santa Spins.
⬜ **Chủ shop xoá biến thể Black trong Admin** — còn nó thì vẫn mua được qua
Shop app / Google Shopping / link cũ, theme không chặn được những đường đó.
Mục "Biến thể" ở bảng mục 1 giờ là **White**.

### Listing nguồn + 415 đánh giá thật (21/10/2026)
Chủ shop gửi: `aliexpress.us/item/3256809531652901.html` (API đánh giá nhận
NGUYÊN id `3256…`, đổi sang `1005…` thì ra 0). **415 đánh giá, 4,4 sao**:
5★ 316 · 4★ 41 · 3★ 18 · 2★ 5 · **1★ 35 (8,3%)**; 189 có chữ, 54 có ảnh.
Mục 4.2 "số đơn" coi như đã có câu trả lời: vài trăm đánh giá → đủ tiêu chí 3.

Tệp nhập Judge.me: `D:/my project/judgeme-import-memory-orb.csv` — đủ 415,
không lọc, cùng cột với tệp Santa. `product_handle` = `memory-orb` **đoán**
(sản phẩm chưa hiện storefront) — sai handle thì Judge.me không gắn được.
10 đánh giá nhắc "AliExpress / seller / store" — để nguyên, chủ shop tự ẩn
trong Judge.me nếu muốn. KHÔNG sửa chữ đánh giá.

🔴 **Rủi ro thật đọc từ đánh giá — đổi cả trang lẫn bảng lãi:**
- **Hàng lỗi/vỡ cao**: ~24/189 đánh giá có chữ nói vỡ kính, màn chết, không
  nhận máy, tắt sau 2 giây. Mỗi cái là một lần hoàn tiền/gửi lại ($36 vốn).
  Nên **đặt 1–2 cái mẫu trước khi chạy quảng cáo**.
- **Khó nạp video** là phàn nàn số một (MP4 H.264 480×480, tiếng MP3
  128 kbps theo sách hướng dẫn; phần mềm hãng gợi ý là trả phí).
- **Nặng, không treo cây được** — hộp có **đế**.
- **Video tự nạp không tự lặp** như video mẫu; **một video mỗi lần**, bấm chuyển.
- Mac tạo tệp ẩn làm máy không phát; clip > 1 phút dễ đứng hình; phải sạc đầy
  trước; dây điện thoại thường chỉ sạc, không truyền dữ liệu.
Đã sửa trang (theme `3b32ac9`): bỏ "Made to Hang on the Tree" / "loops" /
"sturdy branch", thêm đế, có tiếng, một clip một lúc; trang hướng dẫn thành
4 bước + mục Mac + gỡ lỗi đứng hình. **Mô tả sản phẩm mình đưa trước đó có
"plays on a loop" và "Light enough to hang" — SAI, chủ shop phải sửa.**

### ⬜ Chủ shop làm để trang chạy thật
1. Tạo sản phẩm, gán **Theme template = `memory-orb`**.
2. Tạo Page **"Memory Orb setup guide"**, handle **`orb-setup`**, template
   `orb-setup`, để **Visible** (Hidden là 404, đã dính với Page `shop`).
3. Giảm giá tự động $11.98 (mục 7 trên).
4. Thêm Orb vào **shipping profile free** — trang ghi "FREE Shipping" và
   "Shipping is free worldwide".
5. 🔴 **Xác nhận thời gian giao.** Trang đang ghi **8–15 ngày làm việc,
   "Order by 1 December"** — lấy theo đối thủ, CHƯA kiểm với nhà cung cấp.
6. Có video thật thì thêm khối video vào section "buoc" (đã bỏ khối video
   Santa; ô video trỏ tệp không tồn tại thì Shopify từ chối cả template).

### Đính chính: `la-santa` PHẢI sửa, không giữ nguyên
Bản trước ghi "giữ nguyên `snippets/la-santa.liquid`" với ý Orb dùng chung
nhóm Santa. Nhưng điều kiện chỉ bắt suffix `santa-spins` — giữ nguyên thì
trang Orb rơi vào **nhóm store** (logo Skin Solutions, không tuyết/nhạc). Đã
thêm `memory-orb` + `orb-setup`, và giỏ có sản phẩm template `memory-orb`.

Còn lệch, chưa sửa: footer nhóm Santa có câu về hộp nhạc ("The fridge
plays…"); giỏ chỉ có Orb mà trống thì "Continue shopping" về trang Santa.

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
