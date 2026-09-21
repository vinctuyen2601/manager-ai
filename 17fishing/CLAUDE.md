# 17fishing — chỉ dẫn cho trợ lý

Đọc `~/my-project/CLAUDE.md` trước (vai trò, quyền hạn, bẫy chung), rồi tệp này.
Hồ sơ quản lý đầy đủ nằm ở `QUAN-LY.md` cùng thư mục — tệp này chỉ giữ thứ cần
biết NGAY khi bắt tay sửa mã.

---

## 1. Cửa hàng này bán gì

Đồ câu cá: cần, máy câu, phao, lưỡi, cước, ghế, phụ kiện. Khách là **cần thủ**,
phần lớn câu đài hồ dịch vụ và câu đêm.

Khác GaRutin ở một điểm chi phối: đây là **hàng công nghiệp có thông số**. Khách
so tải chì, chiều dài, độ cứng trước khi mua. Sản phẩm không có bảng thông số là
sản phẩm khách phải nhắn Zalo hỏi.

Tên miền: `17-fishing.com` · `admin.17-fishing.com` · `api.17-fishing.com`.

---

## 2. Quy mô thật — đo ngày 14/09/2026

```
khách / 30 ngày          859          lượt truy cập    1.381
sản phẩm                  11          bài viết          104
ĐƠN HÀNG, TOÀN BỘ LỊCH SỬ  2
Search Console (90 ngày)  95 từ khoá · 632 hiển thị · 10 nhấp
```

**Trang sản phẩm mạnh hơn blog, ngược với trực giác.** Số liệu 90 ngày:

```
/blog/        75 trang   7.872 hiển thị   CTR dưới 1%
/san-pham/     8 trang     731 hiển thị   CTR 9,0%
```

Ghế Zhongzhou ở **hạng 3,2 với 30 lượt nhấp** — trang mạnh nhất site. Đừng lặp
lại kết luận "sản phẩm chưa vào chỉ mục"; đã đo và **sai**.

Việc mua bán thật vẫn diễn ra qua Zalo và không vào hệ thống. Mọi tỉ lệ chuyển
đổi ở đây đều thiếu tử số.

---

## 3. Search Console — chỗ đã mất một vòng gỡ lỗi

Property của shop là loại **tiền tố URL**, không phải tên miền. Biến môi trường
phải là:

```
GSC_SITE_URL=https://17-fishing.com/      ← có https, có gạch chéo cuối
```

Khai `sc-domain:17-fishing.com` thì Google trả **"User does not have sufficient
permission"** — câu đó nói về quyền nhưng gốc rễ là gọi nhầm tên property, và
service account vẫn có quyền đầy đủ. Đã mất một vòng đi tìm nhầm chỗ.

`GET /admin/keywords/gsc-site` liệt kê property mà service account thật sự thấy
— dùng nó để phân biệt "chưa được thêm" với "khai sai dạng".

`GET /admin/keywords/gsc-trang` trả số liệu **theo trang**. Dữ liệu theo truy vấn
không trả lời được câu "trang sản phẩm có vào chỉ mục không".

---

## 4. Khuôn bố cục trang sản phẩm

Trang chi tiết dựng bằng **block**. Hiện có **21 block thuộc 16 nhóm dữ liệu**.

Trục chính của thiết kế, đừng làm ngược:

- **NHÓM** giữ nội dung và bộ ô nhập
- **BLOCK** chỉ là một cách bày nhóm đó ra

Nhiều block cùng nhóm (`diem-manh` và `diem-manh-bento`) đọc ghi **cùng một chỗ**
và có **y hệt bộ ô nhập**. Trước đây mỗi block khai ô riêng, nên soạn ở kiểu
thường rồi đổi sang bento là mất chỗ nhập cho hai ô riêng của bento.

`src/product-templates/registry.ts` là **nguồn sự thật**. Thêm block mới gồm ba
bước, không nhiều hơn:

```
1. khai báo ở registry.ts (backend)
2. viết component ở 17fishing-Web/src/components/khoi/
3. thêm một dòng vào boKhoi.tsx
```

Kho `/kho-giao-dien` tự sinh từ khai báo và hiện **cảnh báo đỏ** khi khai mà thiếu
component. Chạy `npm run kiem-khoi` bên Web để so hai bên.

Khuôn dựng sẵn chỉ gieo khi CHƯA có — thêm block vào registry thì phải gọi
`POST /admin/product-templates/:id/khoi-phuc` mới nhận.

---

## 5. Bẫy đã trả giá — đọc kỹ

Đây là bẫy ở tầm **cửa hàng**. Bẫy của riêng từng repo nằm trong `CLAUDE.md` của
chính repo đó — mở repo nào thì tệp đó nạp theo, không cần tìm.


### Bỏ dấu chập từ khác nghĩa

Với vốn từ của shop này: **`mồi` và `mới` đều thành `moi`** — nguy nhất, vì hàng
chục tiêu đề có "cho người mới" còn mồi là cả nhóm hàng. Và **`cần` với `cân`**.
`phan-tich.ts` ghim bốn từ đó thành mã riêng trước khi bỏ dấu.

### Lượt xem từng bị công cụ nội bộ thổi phồng

Khung xem trước và kho giao diện dựng trang thật nên ghi lượt xem y như khách —
đã từng chiếm **10,1% tổng lượt 5 ngày**. Đã lọc và đã dọn rác. Ý nghĩa còn lại:
**số liệu trước 14/09/2026 vẫn còn lẫn**, đừng so hai bên mốc đó rồi kết luận
lượt khách giảm.

### Trôi dạt với GaRutin

Hai repo lệch nhau nhiều hơn tưởng. Riêng trong một ngày đã gặp: `uuid_generate_v4`
vs `gen_random_uuid`, canonical, `redirectTo` chỉ có một bên, video sản phẩm chỉ
GaRutin có. **Sửa một bên xong phải mở bên kia ra xem**, đừng giả định giống nhau.

---

## 6. Combo của shop này KHÔNG phải combo bạn nghĩ

Chủ shop đã chốt định nghĩa ngày 14/09/2026. **Combo không phải một sản phẩm.**

> Combo là **luật khuyến mãi trên giỏ**: mua **≥ n cái sản phẩm A** thì được
> **tặng B (× m)**, có thể kèm **miễn phí ship**.

Case "mua A tặng B" chỉ là `n = 1`, không phải luật thứ hai.

### Đừng đi nhầm vào ba thứ cùng tên

Đo ngày 14/09, cả ba đều **rỗng** — vì không cái nào là thứ chủ shop cần:

```
danh mục "Combo"                  0 sản phẩm
cờ isCombo + comboItems           0 / 11 sản phẩm
khối `combo` gõ tay ở registry    0 sản phẩm dùng
```

Ba cái đó đều coi combo là một **món hàng**. Ai vào sau mà thấy `isCombo` rồi
tưởng "đã có sẵn, chỉ cần điền" là đi nhầm đường ngay từ bước một.

### Luật nằm ở đâu

Cột `gifts` (jsonb) của chính sản phẩm được mua:

```ts
{ productId, soLuong, muaToiThieu, freeship }
```

`muaToiThieu` trống rơi về 1. Vì là jsonb nên **thêm trường không cần migration**.

Nơi luật chạy: `orders.service.tinhTien()` — cũng là nguồn sự thật duy nhất về
tiền. Quà thành một dòng `OrderItem` giá 0đ, cờ `laQua`.

### Ba chỗ phải giữ, đừng "dọn" đi

- Dòng quà **luôn do máy chủ sinh**; mọi dòng `laQua` gửi lên bị vứt trước khi
  tính. Nhận vào là ai cũng lấy được ghế 3,85tr giá 0đ
- `dinhGia()` **bỏ qua** dòng quà — không bỏ thì nó kéo giá 0 về giá niêm yết
  và khách bị thu tiền món được tặng
- **Không nhân quà theo bội số**: mua 4 với luật "mua 2 tặng 1" vẫn tặng 1. Cho
  hụt còn sửa được, cho thừa là mất hàng thật

### Số đo về freeship — biết trước kẻo quảng cáo hão

Ngưỡng miễn phí ship **100.000đ**, phí ship **15.000đ** phẳng.

```
7/11 sản phẩm  mua MỘT món đã vượt ngưỡng
món rẻ nhất    55k  →  mua 2 cái = 110k, cũng vượt
```

Nghĩa là **với `n ≥ 2` thì cờ freeship của quà gần như luôn thừa** — ngưỡng đã
tự miễn trước rồi. Nó chỉ có tác dụng thật ở case `n = 1` trên bốn món dưới
100k: lưỡi 55k, phao 80k / 85k / 99k.

Đừng dán nhãn "mua 2 tặng freeship" rồi tưởng đang cho khách thêm thứ gì.

Giao diện **không** phân biệt miễn phí do quà hay do ngưỡng — chính sách là
"trên ngưỡng thì miễn", khách chỉ cần biết phải trả bao nhiêu. Đã có một lượt
tôi tách ra thành "(theo ưu đãi)" và chủ shop bác: không có gì sai để sửa.

### Bộ kiểm

```bash
cd 17fishing-BE && npm run kiem-qua     # 35 phép, 1 giây, không cần Postgres
```

Repo không có khung kiểm thử nào. Bộ này nặn một thể `OrdersService` rồi gán
bốn phụ thuộc giả. **Thêm luật quà mới thì thêm phép kiểm ở đó TRƯỚC.**

### Chưa ai dùng

Tính tới 14/09/2026 **chưa sản phẩm nào gắn quà**. Tính năng đã chạy nhưng chưa
có nội dung — muốn kiểm thật thì phải gắn quà cho một sản phẩm trước.

---

## 7. SEO — số đo nền và bốn thứ đã sửa

Đo Search Console 90 ngày, ngày 14–15/09/2026:

```
                trang   hiển thị   nhấp    CTR
blog              77      8.160    106    1,3%
sản phẩm           8        780     69    8,8%   <- gấp 6,8 lần blog
khác              13        268     20    7,5%
                         ───────  ─────
                            9.208    195   2,12%
```

**Mọi trang kẹt hạng 7–9**, không có gì trong top 3. Vấn đề của tài sản này
không phải thiếu lưu lượng — mà lưu lượng đang rò.

### Bốn thứ đã sửa

**Hai bài 404 mà vẫn xếp hạng.** 988 hiển thị, 14 nhấp/90 ngày đổ vào hư không.
Cả hai bài còn sống, chỉ bị đổi slug mà quên chuyển hướng.
→ **Đổi slug thì PHẢI thêm chuyển hướng vào `next.config.ts` ngay lúc đổi.**
Sitemap tự sinh từ slug mới nên nhìn vào đó không thấy gì bất thường. Chỉ
Search Console mới thấy.

**Đuôi tiêu đề ăn hết ngân sách.** `" | 17Fishing - Dụng Cụ Câu Cá Chính Hãng"`
dài 40 ký tự, Google chỉ hiện ~60, tiêu đề bài trung bình đã 50 → 100/104 bài
bị cắt cụt. Thêm `BRAND_TITLE_SUFFIX` = `"17Fishing"` chỉ cho thẻ title.
**Đừng đụng `BRAND_TAGLINE`** — nó còn dùng cho ảnh Open Graph và dữ liệu có
cấu trúc.

**Tiêu đề không nhắc lại câu hỏi.** 29 từ khoá hạng 6–9 mà **0 nhấp**, toàn
dạng "X là gì". Google xếp hạng vì nội dung có, nhưng đoạn hiện ra không hứa
trả lời câu hỏi. Đã viết lại `seoTitle` cho 22 bài mạnh nhất + 7 sản phẩm.
Luật: **≤48 ký tự, bỏ tiền tố rỗng, nhắc lại đúng câu người ta gõ.**

**Hai `<h1>` trên trang, ba trên trang chủ.** Nội dung soạn tay mang theo `<h1>`
riêng; hero slider giữ mọi banner trong DOM nên mỗi banner một `<h1>`. Sửa ở
tầng dựng: `haCapH1()` trong `lib/seo`, và `laH1` trong `HeroBanner`.

### Vì sao mọi trang kẹt hạng 7–9 — KHÔNG phải nội dung mỏng

Đo 15/09/2026: trung bình **1.120 từ/bài**, trang mạnh nhất 1.600–2.100 từ.
Nội dung không mỏng. Nguyên nhân nằm ở **phân bố liên kết nội bộ**:

```
417 liên kết bài↔bài
  4 bài ôm 371 cái = 89%
 90/104 bài KHÔNG bài nào trỏ tới
 bốn trang NHIỀU LƯU LƯỢNG NHẤT nhận ĐÚNG 0 liên kết
 bài ôm nhiều link nhất có 0 hiển thị/90 ngày
```

**Gốc rễ ở DỮ LIỆU, không phải thuật toán.** 98/104 bài mang tag `câu cá`,
92/104 mang `kỹ thuật`, 65 tag còn lại chỉ xuất hiện 1–2 lần, **104/104 bài
không có danh mục**. Phép cân theo độ hiếm triệt tiêu hai tag phổ thông đúng
như thiết kế, nhưng chúng vẫn cho điểm *dương rất nhỏ* → gần như mọi bài thành
"ứng viên có điểm" → xếp hạng thật sự do **tiêu chí phá hoà: ngày đăng** quyết
định → bốn bài mới nhất hiện dưới gần như mọi bài.

Đã sửa `chonBaiLienQuan()`: cộng thẳng điểm khớp **từ trong tiêu đề** vào
`chamDiem`. Kết quả trên bản chạy thật: mồ côi **90 → 3**, tập trung **89% →
9%**, nhiều nhất **93 → 10** link.

**Ba cách đã thử và THẤT BẠI — đừng đi lại:**

1. Làm tầng hai chạy sau khi tag cạn → vô dụng, **tag không bao giờ cạn**
2. Cân theo độ hiếm từ tiêu đề → `chọn` ở 24 bài, `phao` 17, `hướng`/`dẫn` 13,
   `đài` 10. Từ đệm và từ chuyên môn **cùng dải tần suất**, không ngưỡng nào
   tách được
3. Bình phương độ hiếm → sáu bảy chữ đệm cộng dồn vẫn đè bẹp một từ chuyên môn

Phải dùng danh sách chữ đệm, theo luật chặt: **chỉ nhận từ không thể là thuật
ngữ câu cá**. Nên KHÔNG có `cần`, `đài`, `đơn`, `lửng`, `đáy`, `tay`, `lục`,
`nổi`, `chìm`. Và **không bỏ dấu** khi tách từ tiêu đề — `mồi` với `mới` đều
thành `moi`.

**Việc gốc đã làm nốt 15/09** — gắn danh mục + tag chuyên môn cho 103/104 bài
bằng `script/gan-tag.mjs`:

```
                tag phổ biến nhất   số tag   tag ở >30% số bài
trước            câu cá — 94%         67            2
sau              mồi câu — 22%        68            0
```

Năm danh mục, **hiện ra cho khách** ở `/blog`, trang bài và khối "Đọc thêm":
Chọn đồ nghề (41) · Kỹ thuật câu (27) · Mồi câu (21) · Tin tức & sự kiện (8) ·
Theo loài cá (6). Một bài không xếp được, cố ý để trống.

Luật chấm tag: cụm trong **tiêu đề** tính ngay; cụm trong **thân bài** phải nhắc
**từ 3 lần**; tối đa **4 tag**. Bản đầu tính cả nhắc một lần → bài "chọn gác
cần" gắn luôn `trắm đen`, `rô phi` vì thân bài có ví dụ thoáng qua. Quá 4 tag
thì mọi bài lại giống mọi bài, quay về đúng chỗ cũ.

`gan-tag.mjs` tự **DỪNG** nếu có tag nào phủ >30% số bài hoặc >15% bài không
tag — hai phép chặn để không lặp lại chính lỗi vừa sửa. Và không ghi đè bằng
dữ liệu rỗng hơn: bài không xếp được thì giữ nguyên tag cũ.

### Hai TẦNG liên kết nội bộ — đừng nhầm chúng với nhau

```
tầng KHUÔN    khối "Đọc thêm" do Web dựng, 4 link/bài
tầng NGỮ CẢNH link nằm giữa câu văn, do người viết (hoặc script) đặt
```

Google **giảm trọng số tầng khuôn** vì nó lặp y hệt trên mọi trang; tầng ngữ
cảnh mới tính đủ. Đo 15/09 trước khi sửa: 416 link khuôn nhưng **chỉ 3/104 bài**
có link ngữ cảnh. Sửa phân bố tầng khuôn là cần, nhưng chưa đủ.

Đã chạy `script/noi-ngu-canh.mjs`: 232 link ngữ cảnh vào 88 bài.

Sáu luật trong đó, mỗi luật đều vá một cách hỏng cụ thể:

1. **Mỗi cụm một bài đại diện** (cụm trong tiêu đề + nhiều hiển thị nhất) —
   không có thì `"mồi câu"` là chủ đề lõi của 5 bài, không biết trỏ đâu
2. Chỉ nối **lần nhắc đầu tiên**
3. Tối đa **3 link/bài nguồn**, mỗi **bài đích nhận tối đa 10** — bỏ trần thì
   4 bài đầu ôm 36%
4. Chỉ nối khi **cùng danh mục** hoặc cụm **đủ hẹp** (tag của ≤8 bài) — bỏ luật
   này thì `"trắm đen"` trong bài về gác cần lại trỏ sang bài phao hố đấu
5. Bỏ qua chỗ nằm trong `<a>` hoặc trong `<h*>`
6. **Cụm dài nối trước**, để `"phao câu"` không nuốt `"phao câu đài"`

Hai phép chặn kỹ thuật phải giữ:

- Chỉ số tìm trên chuỗi đã hạ chữ phải **trùng độ dài** chuỗi gốc, nếu không
  chèn lệch vị trí và vỡ HTML. Một bài đã bị bỏ qua vì phép này.
- Chèn từ **CUỐI lên ĐẦU** để chỉ số phía trước không xê dịch.

Chèn quanh **chuỗi gốc** chứ không chuỗi hạ chữ, nên neo giữ nguyên chữ hoa của
bài: `"Mồi Câu"`, `"Điểm Câu"`.

### Kết quả liên kết nội bộ sau một ngày

```
                        đầu buổi 15/09      cuối buổi
tổng link bài↔bài            417              604
bài mồ côi                 90/104            2/104
4 bài đầu ôm                  89%              10%
nhiều nhất một bài        93 link          15 link
bài có link ngữ cảnh         3/104           88/104
```

### Chỗ đáng giá nhất KHÔNG nằm trong mã

```
CÓ lưu lượng, KHÔNG đánh giá          CÓ đánh giá, KHÔNG lưu lượng
  Ghế Zhongzhou 274 ht · 30 nhấp        4/6 món có sao đang ở 0 hiển thị
  Ghế AK Power  139 ht · 15 nhấp
  Cần Strong Bull 112 ht · 12 nhấp
```

541 hiển thị và 58 nhấp/90 ngày đang hiện lên Google **không sao nào**, trong
khi 24 đánh giá hiện có nằm hết trên nhóm phao rẻ không ai tìm. Mã đã đúng —
`aggregateRating` phát tự động khi `reviewCount > 0`. Thiếu là thiếu **đánh giá
thật cho ba món đang có hạng**, và chỉ chủ shop làm được.

### Ba bẫy khi đo SEO ở đây

1. **Đừng cắt slug rồi đem đi tra.** Tôi cắt cụt URL lúc in bảng rồi lấy chính
   chuỗi đó fetch → báo 404 giả.
2. **Next phục vụ bản cũ rồi mới làm mới ngầm.** Sửa dữ liệu xong, lần gọi ĐẦU
   vẫn trả bản cũ. Phải gọi một vòng để kích hoạt, chờ, rồi mới đo.
3. **So khớp đường dẫn phải chặn ở dấu nháy.** `/blog/ky-thuat-cau-ca` khớp
   chuỗi con vào `/blog/ky-thuat-cau-ca-me-...` → báo 5 bài, thực tế 1.

### Tốc độ trang — đo 18/09/2026, trang sản phẩm trên điện thoại

**Báo cáo Lighthouse chạy từ trình duyệt thường bị NHIỄU nặng.** Bản chủ shop
gửi có ít nhất 5 tiện ích (Grammarly, Google Docs Offline…) chiếm **1.680ms
CPU** — bằng 29% tổng — và chiếm trọn danh sách "JS tải về mà không dùng".
Luôn chạy ở cửa sổ ẩn danh, hoặc `--chrome-flags="--disable-extensions"`.

Chạy được tại chỗ, không cần chủ shop:
```
npx -y lighthouse@13 "<url>" --output=json --output-path=out.json \
  --only-categories=performance \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu --disable-extensions"
```

**Ba mốc đo được:**

| | máy chủ shop (có tiện ích) | máy sạch, sau khi hoãn script | chặn hẳn script đo |
|---|---|---|---|
| Performance | 65 | **82** | **91** |
| Total Blocking Time | 1.940ms | **420ms** | 30ms |
| Time to Interactive | 8,4s | 8,4s | **3,5s** |
| Nặng trang | 870 KB | 943 KB | **524 KB** |

**Trang vốn hiện ra rất nhanh** — FCP 1,1s, CLS 0, không tài nguyên nào chặn
hiển thị. Vấn đề duy nhất là JavaScript chiếm luồng chính.

### Script đo là phần nặng nhất của trang, không phải mã shop

| | nặng | CPU (máy nhiễu) |
|---|---|---|
| `googletagmanager.com/gtag/js` | 171 KB | 213ms |
| `facebook.net/signals/config` | 136 KB | 457ms |
| `facebook.net/en_US/fbevents.js` | 108 KB | 1.012ms |
| **cộng** | **415 KB** | **~1.800ms** |
| mã của chính shop | ~145 KB | 2.063ms |

**Đã sửa bằng cách TÁCH ĐÔI, không phải hoãn cả cụm.** Đoạn mồi (`window.fbq`
+ hàng đợi, `window.dataLayer`) vẫn `afterInteractive`; chỉ tệp nặng chuyển
`lazyOnload`. Hoãn cả cụm thì `fbq()` ở `lib/fbpixel.ts` có chắn
`if (window.fbq)` nên nó **nuốt im lặng** mọi sự kiện trong hai giây đầu —
khách thêm giỏ sớm là mất mà không ai biết.

Với GA phải **đảo thứ tự** so với đoạn mẫu của Google: `dataLayer` khai trước,
`gtag.js` nạp sau, để lời gọi sớm rơi vào mảng rồi được đọc lại.

**ĐÃ CHỐT 18/09/2026: giữ cả Google Analytics lẫn Facebook Pixel.** Chủ shop
xem mức 82 điểm là ổn và không bỏ script nào.

Cái giá đã biết và đã chấp nhận: hai script đo vẫn tốn **9 điểm Performance,
390ms TBT, 419 KB và 5 giây TTI**. **Đừng nêu lại chuyện bỏ chúng** trừ khi có
dữ liệu mới — ví dụ đo được rằng khách rời trang vì chờ, hoặc chủ shop nói
không còn dùng tới một trong hai.

**Vì sao chuyện này quan trọng hơn vẻ ngoài:** khách từ Facebook xem **6,8
trang mỗi người**, gấp 3,4 lần mọi nguồn khác, và là nguồn duy nhất có đơn được
ghi nhận. Họ vào từ trình duyệt trong ứng dụng trên điện thoại — nơi luồng
chính vốn đã chậm. Tức thời gian chặn đánh mạnh nhất vào đúng tệp khách đang
mua hàng.

### 🔴 Mô tả BIẾN MẤT nếu `blockOrder` thiếu khối `mo-ta`

Sản phẩm có `templateId` thì trang dựng theo `blockOrder`. **Không có khối
`mo-ta` trong đó thì trường `description` không render ra chữ nào** — nó chỉ còn
nằm trong JSON-LD cho Google đọc.

Đo 18/09/2026: **2/3 sản phẩm dùng mẫu** đang thiếu khối đó, tức mô tả của chúng
khách không đọc được. Trong đó có phao điện — bản mô tả viết lại ngày 17/09 nằm
im suốt mà không ai biết.

Mẫu `hang-ky-thuat` **vốn khai báo `mo-ta`**. Hai sản phẩm đó tự ghi đè
`blockOrder` và đánh rơi nó. Đây là lỗi cấu hình, không phải giới hạn của mẫu.

**Kiểm bằng nội dung, đừng kiểm bằng tiêu đề.** Tôi dò chuỗi "Mô tả sản phẩm"
và kết luận Chuanze X Master vẫn hỏng sau 4 lần thử — sai, mô tả đã hiện, chỉ là
khối đó không phải lúc nào cũng in tiêu đề. Phải dò chính các `<h2>` bên trong
`description`.

### Chia việc giữa mô tả và khối

Trang có mẫu dễ **lặp**: mô tả có mục "Thông số dùng" mà khối `thong-so` lại in
đúng những số đó lần nữa. Phao điện đang lặp như vậy cho tới 18/09.

Quy ước từ nay:

| | giữ gì |
|---|---|
| **`description`** | lý lẽ — hợp với ai, khi nào chọn món khác, vì sao chọn thế |
| **khối `thong-so`** | bảng tra cứu |
| **khối `huong-dan`** | các bước làm |
| **khối `cau-hoi`** | hỏi đáp |
| **khối `diem-manh`** | 3–4 điểm khác biệt |

**Khối `cau-kien` đòi ảnh chi tiết TỪNG BỘ PHẬN** (`items[].anh`). Không có ảnh
đúng loại thì bỏ khối đó khỏi `blockOrder`, đừng bật rồi để rỗng. Ngọc Liên Sơn
chỉ có 3 ảnh tổng nên đang tắt khối này.

**Đếm chữ lặp trên trang phải bỏ `<script>` trước.** Next nhét lại toàn bộ nội
dung vào payload RSC, nên `sed 's/<[^>]*>//'` thuần đếm ra gấp 3–4 lần thật.
Và bảng nhiều hàng thì nhãn cột lặp theo số hàng — đó không phải lỗi.

**Số đo 18/09 sau khi chuyển hết:** **11/11 sản phẩm đang bán** dùng mẫu
`hang-ky-thuat`, tất cả đều có `mo-ta`, không trang nào lặp mục. Hai món đã
ngừng bán để nguyên vì đang chuyển hướng 308 sang món thay thế.

`blockOrder` dùng chung cho cả 11:
`uu-dai → hero → qua-tang → diem-manh → thong-so → huong-dan → dat-hang →
mo-ta → cau-hoi → danh-gia → lien-quan`

**Phép kiểm tự động sau mỗi lần đổi mẫu** — chạy được lại bất cứ lúc nào:

1. Các `<h2>` trong `description` phải xuất hiện hết trên trang (mô tả có hiện
   không). Dò **nội dung**, đừng dò tiêu đề khối.
2. Ít nhất 3/4 tiêu đề khối phải có mặt: *Bảng tra cứu thông số*, *Những điểm
   làm nên khác biệt*, *Dùng như thế nào cho đúng*, *Câu hỏi thường gặp*.
3. `description` **không được** còn mục tên kiểu `Thông số`, `Cấu tạo`,
   `Dùng và giữ`, `Giữ …`, `Trước khi…`, `Sắp đồ…` — đó là phần đã chuyển vào
   khối, còn lại là lặp.
4. Bỏ `<script>` trước khi đếm chữ; bảng nhiều hàng thì nhãn cột lặp theo số
   hàng, không phải lỗi.

**Trang dựng lại không đều.** Sau khi ghi, có trang hiện khối sau 25 giây, có
trang mất hơn 3 phút. Đừng kết luận hỏng ở lần dò đầu — dò lại vài lần rồi mới
báo động.

### Giá sản phẩm nằm trong `variants`, KHÔNG phải ở `price`

Ba món có giá **biến thiên theo cỡ**, mà `price` chỉ là cỡ nhỏ nhất:

| món | `price` ghi | thực tế |
|---|---|---|
| Thanh Long Chấn Thiên | 585.000đ (cỡ 2m7) | 585.000đ – 1.160.000đ |
| Strong Bull | 1.600.000đ (cỡ 3m6) | 1.600.000đ – 4.769.000đ (cỡ 10m) |
| Ghế Zhongzhou | 1.550.000đ (ghế+balo) | 1.550.000đ – 1.950.000đ |

Đo 18/09/2026: **27 chỗ** trong bài viết và mô tả sản phẩm đang trích giá phẳng
cho ba món này — tức nói với khách rằng cỡ 3m6 giá 585.000đ trong khi nó là
795.000đ. Đã sửa thành "từ X".

**Hàm lấy giá phải đọc `variants`.** `Number(p.price)` chỉ đúng với món một cỡ.
Có `variants` thì lấy dải min–max, và khi trích một con số thì ghi "từ".

Phao và cước thì ngược lại: có `variants` nhưng **mọi cỡ cùng một giá** — chỗ đó
ghi giá phẳng là đúng. Phải kiểm, đừng thêm "từ" cho tất cả.

### Số 14 là của LƯỠI, không phải cước — sửa 18/09/2026

Chủ shop xác nhận: **14 là size lớn nhất của LƯỠI**. Cước thì theo đúng biến thể
sản phẩm — **0.8 · 1.0 · 1.2 · 1.5 · 2.0 · 2.5 · 3.0 · 4.0**.

Tôi hiểu nhầm lời chủ shop ở phiên trước và viết "kho có dải rộng, số lớn nhất
là 14" vào mô tả **cước**, kéo theo mấy chỗ khác trích số 0.4 (cũng không có
trong kho, nhỏ nhất là 0.8). Đã sửa 9 chỗ: 2 mô tả sản phẩm và 7 bài.

**Phân biệt hai loại chỗ khi sửa kiểu này** — chỉ sửa loại đầu:

- **Nói về SẢN PHẨM của shop** → phải khớp `variants`. Ví dụ "cước Chuanze có
  dải 0.4 trở lên" là sai vì shop không bán 0.4.
- **Nói về cỡ thẻo NÓI CHUNG** → giữ nguyên. `kich-thuoc-day-theo...` và
  `kien-thuc-ve-day-cau-ca...` dùng 0.4 trong bảng hướng dẫn chung; đó là cỡ có
  thật trên thị trường, không phải lỗi.

Phép dò "bài nào chứa cả `0.4` lẫn liên kết tới sản phẩm cước" **báo nhầm** bài
hướng dẫn chung — hai thứ đó nằm ở hai đoạn cách xa nhau. Phải nhìn ngữ cảnh,
đừng kết luận bằng phép kiểm cùng-một-trang.

Chỗ vừa là hướng dẫn chung vừa trỏ tới sản phẩm thì thêm một câu nối: dải chung
là bao nhiêu, dòng của shop bắt đầu từ đâu.

### Sáu bẫy của bộ đồ nghề viết bài — 17/09/2026

Cả sáu đều thuộc một họ: **thước đo hỏng làm bài bẩn trông như bài sạch**, hoặc
làm bài sạch trông như bài hỏng. Đo được khi viết lại 30 bài.

1. **Cấm cụm bằng chuỗi phẳng thì lọt biến thể.** Luật cấm `giúp bạn`, mô tả
   phao điện viết `giúp anh em cần thủ` → lọt cổng kiểm, nằm nguyên văn quảng
   cáo cũ ba ngày mà bảng đo vẫn báo sạch. Phải cấm bằng **mẫu**:
   `/giúp (bạn|anh em|cần thủ|người dùng|quý khách)/`. Vá xong thì số sản phẩm
   bẩn nhảy từ 2 lên 5.

2. **Bóc thẻ HTML trước khi cắt câu là sai.** `</li><li>` thành một dấu cách nên
   cả danh sách gạch đầu dòng dính lại thành MỘT câu, và bài viết chuẩn bị báo
   "câu quá 34 từ". Phải chèn dấu chấm ở ranh giới thẻ khối
   (`p, li, h1-6, td, th, tr, div, blockquote, br`) trước khi bóc thẻ. Sau khi
   vá, câu trung bình tụt từ ~16 xuống ~11 — con số cũ là ảo. Cùng họ với lỗi
   `<table>` bị làm phẳng đã vấp trước đó.

3. **Hàm sinh liên kết rụng im lặng.** `lk(slug, chữ)` chỉ sinh thẻ `<a>` khi
   slug **đã published**, không thì trả về chữ trơn. Viết một đợt 5 bài trỏ lẫn
   nhau thì lúc dựng nội dung cả 5 vẫn là nháp → toàn bộ liên kết trong cụm mất
   sạch, **không báo lỗi gì**, và cổng kiểm cũng không bắt được vì nó chỉ đo thẻ
   `<a>` đã sinh ra. Phải `bc.song.add(slug)` cho cả đợt TRƯỚC khi dựng nội dung.

4. **Bộ tự nối liên kết chạy LÚC LƯU — sửa nội dung để gỡ link là vô ích.**
   `src/posts/noi-noi-bo.ts` chèn thẻ `<a>` vào thân bài mỗi lần `create` hoặc
   `update` có `dto.content`. Gỡ một liên kết rồi PATCH lại thì nó chèn lại
   ngay trong cùng lệnh đó. Muốn gỡ thật phải sửa mã, không sửa nội dung.

   Hệ quả khi soi: bản trong CSDL **đã có** liên kết chèn, nên đừng so nội dung
   mình viết với nội dung đọc về rồi kết luận "có kẻ sửa bài". Và
   `GET /admin/posts/:id` **không tồn tại** (404) — lấy `content` từ danh sách
   `GET /admin/posts`. Tôi đã kết luận nhầm hai lần vì `ct.content` là
   `undefined` mà không kiểm mã HTTP.

5. **Cụm thẻ quá chung thì nối sai đề tài.** Thẻ `kỹ thuật câu` gắn ở 5 bài;
   dòng 57 chọn bài đại diện là **bài ĐẦU TIÊN có cụm trong tiêu đề** →
   trúng `ky-thuat-cau-jig-cua-nguoi-nhat`. Và 5 ≤ `CUM_HEP` (8) nên nó được
   coi là cụm hẹp, **bỏ qua phép kiểm cùng danh mục** ở dòng 79. Kết quả:
   mọi bài có chữ "kỹ thuật câu <bất kỳ>" đều bị trỏ sang bài câu jig.
   Đo 17/09/2026: **3 bài bị gắn nhầm** (mồi chép, rô phi, chọn phao) trên
   khoảng 69 liên kết được chèn — tỉ lệ sai ~4%.

   **Đã sửa 18/09/2026 bằng DỮ LIỆU, không deploy:** đổi thẻ `kỹ thuật câu`
   thành `kỹ thuật câu jig` ở hai bài jig, gỡ thẻ đó khỏi ba bài không liên
   quan, rồi gỡ ba liên kết đã chèn. Xác nhận không chèn lại.

   Thứ tự bắt buộc: **sửa thẻ trước, gỡ liên kết sau.** PATCH chỉ có `tags`
   không kích hoạt bộ nối (`posts.service.ts` dòng 194 chỉ chạy khi
   `dto.content !== undefined`), còn PATCH có `content` mà thẻ chưa sửa thì nó
   chèn lại ngay trong cùng lệnh.

   **Đừng cố quét tự động tìm các ca còn lại.** Đã thử tiêu chí "trong tiêu đề
   bài đại diện, cụm còn bị nối thêm chữ phía sau" → gắn cờ 36/61 cụm, gần hết
   là cụm ĐÚNG (`cá diếc` trỏ tới bài cá diếc vẫn chuẩn dù tiêu đề còn chữ).
   Phân biệt ca sai với ca đúng ở đây cần hiểu nghĩa, không có luật hình thức
   nào thay được. Soi tay khi thấy bất thường, đừng quét bừa rồi gỡ nhầm.

6. **`salePrice`/`price` về dạng CHUỖI.** So `salePrice < price` trên chuỗi thì
   `"99000" < "120000"` là false, và giá hiển thị sai 99.000đ thành 120.000đ.
   Luôn bọc `Number()`.

---

## 8. Bản đồ API quản trị

Sau `JwtAuthGuard`, tiền tố `https://api.17-fishing.com/api`.

```
sản phẩm   GET/POST /admin/products · PATCH,DELETE /admin/products/:id
           GET /products/:slug        nhận cả slug lẫn uuid
khuôn      GET /product-templates · GET /product-templates/khoi   (công khai)
           PUT,DELETE /admin/product-templates/:id
           POST /admin/product-templates/:id/khoi-phuc
từ khoá    GET /admin/keywords/phan-tich · /gsc-san-sang · /gsc-site · /gsc-trang
           POST /admin/keywords/dong-bo-search-console
phân tích  GET /admin/analytics/{visits,table,sources,funnel,hours,devices,
                                 product-funnel,searches}
           GET,DELETE /admin/analytics/rac-cong-cu   dọn lượt xem của công cụ
đơn hàng   POST /orders/tinh-tien     máy chủ tự tính tiền, KHÔNG nhận giá từ web
```

---

## 9. Việc treo NGUY nhất

`GET /customers/phone/:phone` **trả 200 không cần token** — ai trên Internet cũng
tra được khách theo số điện thoại. Đã ghi trong hồ sơ từ 10/09, tới 14/09 vẫn
chưa sửa. Thiếu đúng một dòng `@UseGuards(JwtAuthGuard)`.

Phần còn lại xem `QUAN-LY.md` mục 8.

---

## 10. Vận hành

```
deploy    push vào main → GitHub Actions → EC2
          rm -rf node_modules && npm ci && build && migration && pm2 restart
          vài phút, KHÔNG có môi trường thử
kiểm tra  npx tsc -p tsconfig.build.json --noEmit
migration mới nhất: 1800000000055 — tiếp theo là 056
CMS + Web Vercel, tự deploy khi push
```

Tải tệp tối đa **18 MB** (`MediaController.TOI_DA`), khớp với `src/lib/upload.ts`
bên CMS. Lệch hai con số đó là người dùng bị từ chối sau khi đã chờ tải xong.

Ảnh tải lên tự chuyển WebP, xoay theo EXIF và chặn cạnh dài 1600px ở
`storage/r2.service.ts`.

---

## 11. Bẫy theo repo

Ba repo của shop dùng chung hồ sơ này, nhưng mỗi cái có bẫy riêng. Gom cả về đây
chứ không rải vào `CLAUDE.md` từng repo: rải ra là sáu chỗ phải nhớ cập nhật, và
đã có lần một cái bẫy nằm cả hai nơi rồi hai bên nói khác nhau.

### 17fishing-BE

**`gen_random_uuid()`, KHÔNG phải `uuid_generate_v4()`.** Repo này không bật
extension uuid-ossp; chép migration từ GaRutin sang là hỏng ngay lúc deploy, mà
hỏng trên production vì không có môi trường thử.

**`GSC_SITE_URL` phải là `https://17-fishing.com/`** — property là loại tiền tố
URL, không phải `sc-domain:`. Khai sai thì Google báo *thiếu quyền*, và ta đi
tìm nhầm sang phía quyền tài khoản dịch vụ.

**`GET /customers/phone/:phone` đang HỞ** — trả 200 không cần token. Xem mục 9.

### 17fishing-Web

**`loading.tsx` KHÔNG được nằm ngay trong `/san-pham`.** Nó tạo Suspense ngầm cho
**cả segment** kể cả `[slug]`: có Suspense thì Next truyền dữ liệu ngay, mã 200
chốt xong trước khi `notFound()` kịp ném — nên **mọi đường dẫn sản phẩm sai trả
200** kèm nội dung trang 404, và Google giữ chúng trong chỉ mục. Nay nó nằm trong
nhóm `(danh-sach)`. **Đừng dời lên một cấp.**

**`normalizeProduct(null)` cho ra object TRUTHY.** Trải `null` ra rồi thêm một
trường thì được object có đúng trường đó — truthy. Nên `if (!product) notFound()`
không bao giờ chạy, API trả 200 kèm thân rỗng cho slug không tồn tại.

**`boKhoi.tsx` là bước 3 trong ba bước thêm block** (mục 4). Quên nó thì hỏng IM
LẶNG — chạy `npm run kiem-khoi` để so với registry bên BE.

**`TrackVisit` bỏ qua khung nhúng và trang công cụ.** Thêm trang công cụ mới thì
phải thêm vào danh sách đó, nếu không nó tự đếm mình thành lượt khách.

**Chính sách đổi trả có MỘT nguồn: `site_config.cam_ket`.** Đừng gõ số ngày
vào bất kỳ tệp nào. Đo 21/09/2026: trang chủ viết cứng "Đổi trả 7 ngày" còn
`cam_ket` ghi "Đổi mới 30 ngày" — hai trang cùng shop hứa hai chính sách chênh
hơn bốn lần. Chú thích trong `khoi/CamKet.tsx` đã tiên đoán đúng tình huống
này từ trước mà vẫn xảy ra, vì trang chủ không đọc nguồn đó.

Nay cả hai đọc `cam_ket`. **Chốt là 7 ngày** (chủ shop 21/09/2026).

Sửa bằng `PATCH /admin/site-config` với thân `{key, value}` — **không** nhận
object cả cụm, gửi sai dạng trả 400.

**Thứ tự khối chuẩn — đi theo câu hỏi của khách, không theo thứ tự nhập liệu.**
Sắp cho phao điện 21/09/2026, dùng làm khuôn cho các sản phẩm sau:

```
uu-dai → hero → qua-tang
→ mo-ta      mua mức nào? món này có hợp tôi không?
→ diem-manh  vì sao nó tốt
→ cau-kien   bằng chứng, ảnh thật từng bộ phận
→ thong-so   tra số
→ cau-hoi    gỡ phản đối
→ danh-gia   người khác nói gì
→ dat-hang   chốt, ngay sau hai khối tạo tin mạnh nhất
→ huong-dan  dùng sau khi mua
→ lien-quan  mua kèm
```

Hai chỗ thứ tự cũ sai, để ý đừng lặp lại:

- **`huong-dan` đứng trước mô tả và FAQ.** Lắp pin, lau khô, cất vào ống là
  việc SAU khi mua — nó chen vào đúng lúc khách còn đang cân nhắc
- **`mo-ta` bị chôn sau cả `dat-hang`.** Đó lại là phần thuyết phục nhất, và
  nay mở đầu bằng mục chọn phân loại — tức thứ CHẶN đơn

`mo-ta` đặt ngay dưới `hero` là có chủ ý: ô chọn phân loại nằm trong hero nên
hướng dẫn chọn phải liền kề. Gỡ thứ chặn đơn quan trọng hơn thêm thứ thuyết
phục.

Đẩy `dat-hang` xuống gần cuối **không** mất đơn: điện thoại có thanh mua cố
định `fixed bottom-0 md:hidden` bám suốt trang, máy tính thì hero đã có nút.
Khối này là cú chốt THỨ HAI, nơi có COD và tính phí ship.

**Khi bán hàng có phân loại: phải có mục dạy chọn phân loại.** Đo trang phao
điện 21/09/2026 — trang bắt khách chọn 1 trong 5 mức tải chì mà cả 277 từ mô
tả không nhắc một chữ nào về cách chọn (không có "1.5", "2.5", "3.5", "tải
chì", "gram"). Tệ hơn, FAQ trả lời *"mức 1.8g là lựa chọn cân bằng"* trong khi
**không có phân loại 1.8g nào** — 1.8g là trọng lượng thân phao, một hằng số;
thứ khách chọn là TẢI CHÌ.

Cùng họ với lỗi chủ shop từng chỉ ra: *"số 14 là của lưỡi, không phải cước"*.
**Phép kiểm trước khi đăng bất kỳ mô tả nào:** mọi con số trong mô tả và FAQ
phải khớp được với một giá trị có thật trong `variants`, hoặc phải nói rõ nó
là thông số cố định chứ không phải lựa chọn.

---

**🔴 TẮT MỘT SẢN PHẨM LÀM GÃY MỌI BÀI TRỎ TỚI NÓ.**

`isActive=false` khiến `/san-pham/<slug>` trả **404**, nhưng KHÔNG gỡ liên kết
nào trong blog. Đo 21/09/2026 sau khi chủ shop tắt cần Thanh Long:
**11/92 bài** trỏ vào một trang 404, trong đó có 3 bài vừa viết hôm 18/09 và
các bài trụ như `top-5-can-cau-tay-ua-thich-nhat`.

Không có cảnh báo nào. Không ai biết cho tới khi quét.

**Cách đúng khi hàng tạm hết:** đặt `stockStatus = out_of_stock` và GIỮ
`isActive = true`. Trang vẫn sống, mọi liên kết vẫn chạy, thẻ "Hết hàng" hiện
trên ảnh, khách vẫn nhắn Zalo hỏi được. Chỉ tắt hẳn khi bỏ bán vĩnh viễn — và
khi đó phải quét lại toàn bộ bài.

**Phép quét** (lưu ở scratchpad phiên 18/09, `_quet404sp.mjs`): lấy
`/admin/products` để biết slug nào còn sống, rồi dò `href="/san-pham/<slug>"`
trong `content` của mọi bài published. Nhớ lấy `content` từ danh sách
`GET /admin/posts` — `GET /admin/posts/:id` trả 404.

Tính tới 21/09/2026 có **3 sản phẩm đã tắt**: `can-cau-carbon-thanh-long-…`,
`phao-long-cong-tieu-phuong-hoang-…`, `can-cau-kirin-sharp-…`.

**Đã dọn 21/09/2026.** Chủ shop chốt bỏ hẳn Thanh Long (giữ bản ghi vì đơn cũ
trỏ vào nó). 11 bài đã sửa xong, quét lại còn **0/92**. Nguyên tắc đã dùng,
giữ cho lần sau:

1. **Bỏ mọi con số giá của hàng đã ngừng bán** — giá đó là quảng cáo sai
2. **Giữ lời khuyên, bỏ sản phẩm.** "4H, cỡ 3m6 dễ dùng nhất cho người mới" là
   kiến thức đúng dù shop có bán gì hay không
3. **Trỏ về DANH MỤC, đừng trỏ sang sản phẩm khác.** Thứ duy nhất còn lại là
   cần săn hàng, mà chính mô tả của nó ghi "người mới tập thì đừng bắt đầu
   bằng cần này" — đẩy người mới sang đó là bán sai hàng. Link danh mục còn
   đúng về sau khi shop nhập dòng mới
4. **Không bịa sản phẩm thay thế**

**Cảnh báo về tình trạng gian hàng:** shop hiện **không còn cần tay phổ thông
nào để bán**. Chỉ còn cần săn hàng từ 1.600.000đ, mà nhóm đó không hợp người
mới. Mọi bài hướng dẫn chọn cần cho người mới nay dẫn tới một danh mục không
có hàng hợp với họ.

**Bẫy khi sửa nội dung bài:** bản trong CSDL **khác** bản mình đã gửi, vì bộ tự
nối đã chèn thẻ `<a>` vào giữa câu. Đo 21/09: mẫu `Mua bộ đồ câu đài đầu tiên`
khớp 0 lần vì thực tế là `Mua bộ đồ <a …>câu đài</a> đầu tiên`. Luôn đọc nguyên
văn từ `GET /admin/posts` rồi mới dựng mẫu thay thế.

`noi-noi-bo.ts` chỉ chèn liên kết **blog→blog**, đã kiểm — nó KHÔNG đụng liên
kết sản phẩm, nên gỡ link sản phẩm bằng cách sửa nội dung là ăn thật.

**Hệ quả với danh mục:** `cau-dai` giờ chỉ còn **1** sản phẩm (cần săn hàng từ
1.600.000đ), `combo` **rỗng hẳn**. Bậc thang giá cần câu phổ thông mà nhiều bài
đang dựa vào (585.000đ – 1.160.000đ) không còn bán được thứ gì.

---

**Trang danh mục có khối chữ từ 21/09/2026.**

Nội dung nằm ở `categories.description` (kiểu `text`, không giới hạn) —
**không có cột riêng**, đừng đi tìm. Dựng bởi
`components/shared/MoTaDanhMuc.tsx`:

- **văn bản THUẦN**, không phải HTML. Dòng trống ngắt đoạn, dòng mở đầu `- `
  thành gạch đầu dòng. Cố ý không dùng `dangerouslySetInnerHTML` vì nội dung
  này do người nhập trong CMS
- **đoạn đầu** hiện TRÊN lưới sản phẩm và cũng là meta description, nên phải
  đứng một mình đọc đủ nghĩa và dưới 160 ký tự. Phần còn lại hiện DƯỚI lưới
- meta cắt ở ranh giới CÂU (`metaTuMoTa` trong trang danh sách), không ném cả
  khối chữ vào thẻ meta
- trang tìm kiếm và Flash Sale KHÔNG hiện khối này

Kết quả: `phao-cau-ca` 300 → **624 từ**, `phu-kien` 488, `ghe-cau-ca` 445,
`may-cau` 378, `cau-dai` 298 từ nội dung (viết lại 21/09 cho khớp thực tế chỉ
còn cần săn hàng). `combo` **không viết** — nhóm đang rỗng hàng.

**Danh mục rỗng hiện "sắp có hàng" + nút Zalo**, không còn báo "Không tìm thấy
sản phẩm nào" như trang hỏng. Chỉ áp dụng khi không kèm bộ lọc nào khác — lọc
giá hay thương hiệu ra 0 kết quả vẫn báo như cũ, vì đó là lọc hẹp quá chứ
không phải hết hàng.

**Độ trễ khi sửa nội dung danh mục:** `getCategories()` cache 3600s, nên sửa
trong CMS tới **một giờ sau** mới hiện trên web. Đừng kết luận "không ăn" khi
vừa sửa xong.

**Tốc độ: hai thứ hạ tầng đã sửa 18/09/2026 — đừng lùi lại.**

1. **`layout.tsx` phải giữ `next: { revalidate: 3600 }`, KHÔNG được quay về
   `cache: 'no-store'`.** Đây là layout GỐC; một lời gọi `no-store` ở đó ép cả
   site sang chế độ động và mọi `revalidate` ở trang con **bị vô hiệu lặng
   lẽ** — sản phẩm 120s, blog 120s, danh sách blog 60s, kho giao diện 300s.
   Dấu hiệu nhận ra: cột **"Revalidate" TRỐNG** trong bảng route lúc
   `next build`, và `x-vercel-cache: MISS` ở mọi trang.
   Con số 3600 khớp `getSiteConfig()` trong `lib/api.ts` để Next gộp hai lời
   gọi làm một. Chủ shop thấy sửa site-config lâu hiện thì **hạ xuống 300**,
   đừng quay về `no-store`.

2. **`vercel.json` khai `regions: ["sin1"]`.** Không có tệp này thì Vercel
   chạy hàm ở `iad1` — Washington DC — trong khi khách và backend đều ở châu
   Á, tức mỗi lượt dựng trang vượt Thái Bình Dương hai lần. Gói hiện tại
   **có** nhận khoá này (đã kiểm: `x-vercel-id` đổi từ `iad1` sang `sin1`).

   Phép kiểm: `curl -sD - -o /dev/null https://17-fishing.com/ | grep x-vercel-id`
   — phần giữa phải là `sin1`.

**Kết quả đo (TTFB, lượt ấm, từ Việt Nam):**

| Trang | Trước | Sau | |
|---|---|---|---|
| `/` | 0,98s | **0,23s** | HIT |
| `/san-pham` | 0,68s | **0,26s** | động, không cache được |
| `/san-pham/<slug>` | 0,74s | **0,25s** | HIT |
| `/blog/<slug>` | 0,62s | **0,18s** | HIT |

**`/san-pham` không bao giờ cache được** vì đọc `searchParams` — nó là trang
lọc. Đừng đi "sửa" cho nó HIT; phần cải thiện của nó đến từ việc đổi vùng.

**`/theo-doi/[token]` PHẢI giữ `no-store`.** Trang tra cứu đơn theo token, dữ
liệu riêng từng khách. Cache nó là lỗi bảo mật. Đã kiểm sau khi sửa: vẫn
`no-store`, vẫn MISS.

Còn hai chỗ `no-store` ảnh hưởng riêng trang chứa chúng, chưa sửa:
`lien-he/page.tsx:17` và `[slug]/page.tsx:18`. Ưu tiên thấp, làm riêng và đo
riêng.

**Mức dùng Vercel — chủ shop đã hỏi 18/09/2026, đừng bắt hỏi lại.**

Bật ISR **không** làm tăng rủi ro vượt hạn mức, mà đổi hướng tiêu thụ sang
loại rẻ hơn: trước đây 100% lượt truy cập là một *function invocation* (hạng
mục bị siết nhất), nay phần lớn chỉ là một *ISR read*, CDN trả thẳng không
đụng tới hàm. Băng thông và Edge Requests không đổi. `regions` thì không tiêu
thụ gì cả, chỉ nói hàm chạy ở đâu.

Kể cả kịch bản xấu nhất (crawler quét liên tục) bản sau vẫn nhẹ hơn bản trước.

Số nền để so: **1.424 lượt xem / 670 khách trong 30 ngày** (19/08–18/09), tức
~47 lượt/ngày. Hạn mức Hobby là 1.000.000 ISR reads và 1.000.000 invocations
mỗi tháng — nhân 10 lần cho bot và tài nguyên tĩnh thì vẫn quanh **1,5%**,
cách ngưỡng khoảng 700 lần.

**Image Optimization của Vercel đang TẮT** (`loader: 'custom'` trong
`next.config.ts`, ảnh đi qua R2). Đây là hạng mục dễ vỡ hoá đơn nhất — đọc chú
thích trong tệp đó trước khi nghĩ tới việc đổi.

Chủ shop tự kiểm ở Vercel Dashboard → Usage, hai dòng *Function Invocations*
và *ISR Reads*.

**Ô tìm kiếm ĐANG BẬT, có gợi ý lúc gõ** (`HIEN_O_TIM_KIEM = true` trong
`SiteHeader.tsx`). Chủ shop tạm ẩn rồi mở lại ngay trong ngày 18/09/2026 —
xem QĐ-11. Ba điều đừng gỡ khỏi `SearchBox.tsx`:

- **debounce 280ms + AbortController.** Không có AbortController thì gõ "phao"
  rồi "phao dien", phản hồi "phao" về sau cùng sẽ đè kết quả đúng bằng kết quả
  cũ. Đo bằng Chrome thật: 9 phím gom lại còn **1** lệnh gọi.
- **`suggest=1` trong URL gợi ý.** Backend thấy cờ này thì bỏ qua `logSearch`.
  Thiếu nó thì mỗi nhịp gõ đẻ một dòng `search_logs` và bảng từ khoá chỉ còn
  những mảnh chữ dở dang — mất hẳn giá trị duy nhất của nó.
- **Lỗi mạng KHÁC "không có hàng".** Bản đầu gộp hai thứ: fetch hỏng thì đặt
  danh sách rỗng, và khách thấy "Không có sản phẩm nào khớp". Một cú nghẽn 4G
  đủ để web nói dối rằng shop không bán món khách tìm. Nay tách thành "Chưa
  tải được gợi ý". Bắt được nhờ chặn lệnh gọi bằng
  `Network.setBlockedURLs` trên Chrome thật — không phép thử nào khác thấy.

Khay 0 kết quả đưa thẳng nút Zalo (số lấy từ `site_config`, **không** phải
`NEXT_PUBLIC_ZALO` — biến đó không tồn tại, dùng nó thì link ra `zalo.me/`
cụt đuôi mà không báo lỗi gì).

**Thử giao diện bằng Chrome thật, không đoán.** Node 22 có sẵn `WebSocket` nên
điều khiển Chrome qua DevTools Protocol không cần cài gì:
`google-chrome --headless=new --remote-debugging-port=9333`, lấy target bằng
`curl -X PUT localhost:9333/json/new`, rồi `Input.insertText` để gõ từng ký
tự. Kịch bản mẫu còn ở scratchpad phiên 18/09. **Nhớ khớp `WEB_URL` của BE với
đúng cổng web đang chạy** — lệch cổng thì CORS chặn, và triệu chứng trông y
hệt "không có sản phẩm nào".

**Và kiểm `next start` có thật sự chiếm được cổng.** Đã mất một vòng đo nhầm
vì server cũ chưa chết: `next start` ngã `EADDRINUSE` rồi im, curl vẫn 200 vì
bản CŨ đang phục vụ. Đối chiếu tên chunk có băm nội dung trước khi tin phép đo.

Phần dưới đây mô tả đường ống phía sau.

**Ô tìm kiếm: đường ống đã xong từ lâu, chỉ thiếu nút bấm.** Tới 18/09/2026 ô
tìm kiếm ở header là ô CHẾT — có `<input>`, có nút "🔍 Tìm", không có
`onChange`, `onClick` hay `<form>` nào. Trong khi mọi mảnh khác đã dựng đủ:

- `products.service` nhận `?search=` và **`unaccent` cả hai vế** — khách gõ
  "can cau" vẫn khớp "Cần câu" (đã đo: ra 1 kết quả đúng)
- tìm cả trong `brand`, nên gõ "chuanze" cũng ra
- `/san-pham` đã biết đổi `<h1>` thành `Kết quả: "..."` và đặt `noindex`
- `products.service` **tự ghi mọi từ khoá** vào bảng `search_logs` kèm
  `result_count`, không cần web gọi thêm gì
- admin đã có `GET /admin/analytics/searches` (thêm `onlyEmpty=1` để lấy đúng
  nhóm 0 kết quả)

Vì thiếu đúng sợi dây đó nên bảng từ khoá rỗng suốt, và hồ sơ này từng ghi
nhầm là "không có tín hiệu ô tìm kiếm" — **không phải chưa xây, mà là đã xây
xong rồi bỏ quên nút bấm.** Bài học chung: trước khi kết luận "thiếu tính
năng", dò ngược đường ống từ CSDL ra.

Nay là `components/shared/SearchBox.tsx`. Hai điều đừng gỡ:
- `action="/san-pham" method="get"` **thật** chứ không chỉ `onSubmit` — khách
  4G bấm tìm trong một hai giây đầu vẫn đi được khi React chưa hydrate xong
- **không** đọc `useSearchParams()` để điền sẵn từ khoá cũ: header nằm trong
  layout gốc, hook đó sẽ kéo MỌI trang của web sang render phía client

`search_logs.visitor_id` sẽ **luôn rỗng**: web gọi API từ phía server nên
không mang theo `visitor_id` ở localStorage của khách. Từ khoá vẫn ghi đúng —
chỉ là không nối được với người. Đừng đi sửa, chưa đáng.

**4 dòng đầu bảng `search_logs` là truy vấn thử của tôi** ngày 18/09/2026
(`phao`, `can cau`, `may cau`, `mai cheo`), `visitor_id` rỗng. Bỏ qua khi đọc
thống kê lần đầu.

**Tìm kiếm khớp theo TỪNG TỪ, đừng đổi về cả cụm.** Ngay hôm nối ô tìm kiếm,
bảng từ khoá lộ ra `"ghe cau"` → **0 kết quả** dù shop bán hai cái ghế: điều
kiện cũ là `ILIKE '%<cả câu>%'`, mà không tên nào chứa đúng chuỗi đó. Nay mỗi
từ phải có mặt ở **tên, thương hiệu hoặc tên danh mục**, nối bằng AND.

Danh mục tra bằng `EXISTS`, **không** bằng `leftJoin('categories', …)`:
TypeORM không nhận tên bảng thô ở đó khi truy vấn có `take`/`skip` và ngã 500
với `Cannot read properties of undefined (reading 'databaseName')`. Đã thử và
đã ngã — đừng "dọn" EXISTS thành join.

`dm.id::text = p.category_id` chứ đừng ép chiều ngược lại: `categories.id` là
uuid còn `products.category_id` là varchar.

**GaRutin KHÔNG có ô tìm kiếm** và `products.service` bên đó không có nhánh
`search` nào — lỗi này không lan sang. Kiểm 18/09/2026.

### 17fishing-CMS

**Khung xem trước NHÚNG trang thật qua iframe**, không vẽ lại giao diện. Vẽ lại
là hai bản sẽ trôi dạt, và lúc đó xem trước thành thứ gây hiểu nhầm.

**Bản nháp gửi sang khung xem trước phải gồm `blockOrder`.** Thiếu nó thì đảo thứ
tự block trông như không có tác dụng — đã mất một vòng đi tìm nhầm sang iframe.

**Giới hạn tải tệp 18 MB** ở `src/lib/upload.ts`, phải khớp `MediaController.TOI_DA`
bên BE.
