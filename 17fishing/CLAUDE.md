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

### 17fishing-CMS

**Khung xem trước NHÚNG trang thật qua iframe**, không vẽ lại giao diện. Vẽ lại
là hai bản sẽ trôi dạt, và lúc đó xem trước thành thứ gây hiểu nhầm.

**Bản nháp gửi sang khung xem trước phải gồm `blockOrder`.** Thiếu nó thì đảo thứ
tự block trông như không có tác dụng — đã mất một vòng đi tìm nhầm sang iframe.

**Giới hạn tải tệp 18 MB** ở `src/lib/upload.ts`, phải khớp `MediaController.TOI_DA`
bên BE.
