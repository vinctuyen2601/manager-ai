# GaRutin — chỉ dẫn cho trợ lý

Đọc `~/my-project/CLAUDE.md` trước (vai trò, quyền hạn, bẫy chung), rồi tệp này.

---

## 1. Cửa hàng này bán gì

Trang trại **gà rutin** — tên khác của chim cút Nhật Bản, nuôi làm cảnh và lấy
trứng. Bán gà giống, gà trống/mái lẻ, combo cặp, trứng, và vật tư (lồng, chuồng).

Đây là **hàng sống**. Hệ quả chi phối mọi thứ:

- Sai một chi tiết là khách nhận gà không đúng ý và trả lại — nặng hơn hàng
  thường nhiều.
- Khách luôn hỏi: bao nhiêu tuần tuổi, trống hay mái, đã ghép cặp chưa, ship
  đi tỉnh gà có sống không, chết dọc đường thì ai chịu.
- Vì vậy **cấm bịa thông số**: tuổi, cân nặng, giấy kiểm dịch, đã ghép cặp.
  Không có thông tin thì để trống, đừng đoán.

Chính sách thật (ở `/chinh-sach-hoan-tra`, dùng khi viết nội dung — đừng hứa
quá): giao gà khỏe đúng mô tả, đóng gói an toàn; giao sai hoặc gà chết do đóng
gói thì trại chịu 100%; đổi trả trong 3 ngày; thanh toán khi nhận (COD).

Tên miền: `garutin.com` (web), `admin.garutin.com` (CMS), `api.garutin.com` (API).
Địa chỉ và số điện thoại lấy từ `GET /api/site-config`, **không viết cứng**.

---

## 2. Quy mô thật — đọc trước khi kết luận bất cứ điều gì

Tính tới 10/09/2026:

```
khách / 30 ngày          421          lượt truy cập     971
sản phẩm                  20          bài viết           74
review                     5  (toàn 5 sao, không cái nào gắn với đơn)
ĐƠN HÀNG, TOÀN BỘ LỊCH SỬ 10  (tháng 5, 7, 9 năm 2026)
```

Nguồn truy cập 14 ngày: 598 lượt "trực tiếp" áp đảo, máy tìm kiếm chỉ 11 lượt.
Tỉ lệ trực tiếp cao bất thường như vậy **có thể phần lớn là máy quét**, chưa
kiểm chứng — xem mục 4.

Chất lượng danh mục (đo 10/09/2026): **13 trên 20 sản phẩm có mô tả dưới 300
ký tự**, ngắn nhất 64. Trung vị 124 — trong khi 17fishing là 1.671. Có **hai
sản phẩm trùng tên "Mái vàng"**. 13 sản phẩm chưa có video.

Đây là khoảng trống lớn nhất, đo được, và đúng ưu tiên số 1 của chủ shop.

---

## 3. Ý nghĩa các bảng phân tích — phần dễ đọc sai nhất

Trang phân tích trong CMS lấy từ `src/tracking/tracking.service.ts`.

### Điều kiện "một lượt xem thật"

```ts
const LUOT_XEM_THAT = "v.event = 'view' AND v.is_bot = false";
```

Bảng `page_visits` chứa **cả bốn bước phễu** (`view`, `add_to_cart`,
`begin_checkout`, `purchase`), không chỉ lượt xem. Đếm tất là mỗi lần khách bấm
thêm giỏ lại thành một "lượt truy cập" — càng bán được nhiều số càng phồng.
Mọi thống kê lượt xem phải lọc bằng hằng số trên.

### Phễu sản phẩm — ba điều phải nhớ

**Mẫu số là `reachers`, không phải `viewers`.** Nút thêm giỏ nằm ngay trên thẻ
sản phẩm ở trang danh sách, trang chủ và luồng video — khách thêm giỏ được mà
chưa từng mở trang chi tiết. Chia cho `viewers` từng ra **300%** và ra dấu gạch
khi `viewers = 0`. `reachers` = số khách có **bất kỳ** tương tác nào.

**Cột "Xem chi tiết" chỉ đếm người MỞ TRANG SẢN PHẨM.** Tên cũ "Khách xem" gây
hiểu nhầm nên đã đổi. Dòng `xem 0 · thêm giỏ 1` là **đúng**, không phải lỗi.

**`visitor_id IS NOT NULL` là điều kiện quan trọng nhất** trong truy vấn phễu.
Migration đặt `event='view'` cho mọi dòng cũ, mà dòng cũ không có `visitor_id`
— không lọc thì cột "xem" gom cả traffic nhiều tháng trước, còn "thêm giỏ" chỉ
có từ lúc bật đo. Bốn cột phải cùng nói về một thời kỳ.

### Bước "vào đặt hàng"

Web có **ba** đường đặt hàng: trang `/dat-hang`, form ngay dưới trang sản phẩm,
và tấm đặt hàng trong luồng video. Hai đường sau dùng chung `OrderForm`, và
`begin_checkout` được ghi khi khách **chạm vào form lần đầu** — không phải khi
form hiện ra, vì trên trang sản phẩm form nằm sẵn nên ghi lúc hiện thì cột này
bằng đúng cột lượt xem.

### Phân loại nguồn

Chiến dịch nhận diện bằng **`utm_campaign`**, không phải `utm_source` — công cụ
tạo link quảng cáo bắt buộc điền campaign, nên có source mà trống campaign thì
chắc chắn không phải link của shop. ChatGPT tự thêm `utm_source=chatgpt.com`
vào link nó đưa người dùng; nhóm riêng **"trợ lý AI"** sinh ra vì chuyện đó.

### Bảng từ khoá đã TỰ kết luận việc cần làm — đừng suy lại bằng tay

`GET /admin/keywords/phan-tich` trả về mỗi từ khoá kèm hai trường quyết định:
`viec` và `lyDo`. Đó là kết luận đã cân nhắc, không phải dữ liệu thô.

Đã trả giá một lần vì bỏ qua chúng: script phân tích chỉ đọc `impressions` và
`baiKhop`, thấy `baiKhop` rỗng liền kết luận "chưa có bài, nên viết mới" cho
`gà rutin là gì` — trong khi `lyDo` của chính bản ghi đó ghi rõ *"Từ khoá quá
chung, cả website đang nhắm vào nó... việc cần làm là tiêu đề và mô tả của
TRANG CHỦ"*. Suýt đẻ thêm một bài tranh hạng với bài mạnh nhất blog.

**`baiKhop` rỗng KHÔNG có nghĩa là chưa có bài.** `timBaiKhop` chỉ đọc `title`,
đòi phủ >=75% số từ của từ khoá. Bài có `seoTitle` nhắm đúng từ khoá vẫn bị
loại nếu tiêu đề hiển thị không chứa đủ từ. Phân biệt "không ghép được với bài
nào" với "chưa có bài" — chú thích trong `phan-tich.ts` đã cảnh báo đúng điều
này.

Phân bố thật (11/09/2026) cho thấy vì sao viết thêm bài hiếm khi là việc đúng:

```
sua-tieu-de     51 từ · 2.374 hiển thị   <- 63% nhu cầu nằm ở đây
bo-sung         80 từ ·   553 hiển thị
da-tot          11 từ ·   685 hiển thị
viet-moi        48 từ ·   130 hiển thị   <- 3% nhu cầu
```

### Trang 404 không được tính là lượt xem

`TrackVisit` nằm ở layout gốc nên chạy cho mọi trang. Có ngày `/blog:` — đường
dẫn không tồn tại — đứng **đầu bảng** với 12 lượt từ 12 khách, chiếm 28% lưu
lượng. Máy quét gõ bừa URL với user agent giả trình duyệt. Nay trang 404 gắn cờ
trong lúc render để bộ đo bỏ qua.

---

## 4. Việc còn treo

- Khối "trực tiếp" 598 lượt/14 ngày chưa được soi. Với kiểu `/blog:` vừa thấy,
  nhiều khả năng phần lớn là máy. Đáng đào.
- 17fishing chưa nối Search Console.
- `mua-ga-rutin-ha-noi-uy-tin` — chủ shop chưa quyết giữ hay gộp (có ship Hà
  Nội không?). **Đừng tự gộp.**
- Chủ shop chưa chạy gộp hàng loạt 17 bài quận huyện về `mua-ga-rutin-tp-hcm`.
- **Cân nặng gà (30–70g hay 50–70g): chủ shop đã quyết BỎ QUA.** Site đang
  khai hai kiểu ở vài bài. Đừng nêu lại — đã hỏi và đã bị gạt.
- Mã chết: endpoint `crawl-to-drafts` không có lối vào ở giao diện; trang
  `/keywords-cu` cũ.

---

## 5. Đối thủ lolipet.net — đo ngày 15/09/2026

Chủ shop hỏi vì sao họ luôn trên top. Đo cả hai bên:

```
                        GaRutin        lolipet.net
phủ chủ đề rutin        30/31 của họ   31
tốc độ tải              271ms          1.214ms
nặng trang              94KB           174KB
số từ (bài cùng đề)     2.243          2.018
schema                  Article+LB+BC  chỉ Organization
link nội bộ mỗi trang   17             114
TỔNG URL                93             1.929
nội dung cũ nhất        22/03/2026     2013
```

**GaRutin thắng gần hết mặt kỹ thuật và KHÔNG thiếu nội dung.** Hai dòng cuối
là câu trả lời: site 6 tháng tuổi, 93 URL, đấu site 13 năm tuổi, 1.929 URL.

Điểm yếu của họ: gà rutin chỉ là **31/1.929 URL — 1,6% site**. Họ là cửa hàng
thú cưng tổng hợp (hamster, nhím, thỏ, chuột lang). GaRutin **100% gà rutin**.

Chiêu của họ: đăng bài hướng dẫn ~2.000 từ **dưới dạng sản phẩm WooCommerce**,
có giá và nút mua ngay trong bài. **Đừng bắt chước** — nó làm lẫn ý định tìm
kiếm. Nhưng ý đúng thì học: nút mua nằm ngay trong bài hướng dẫn.

Trang họ gửi lần đầu (`/page/1/?s=gà+rutin`) **không thể lên top**: khai
`noindex,follow` và `robots.txt` chặn `/?s=*`. Đó là trang tìm kiếm nội bộ.

### 🔴 www và không-www từng là HAI SITE — đã vá 15/09

Đây là thứ nặng nhất tìm được, và nó **chỉ lộ ra khi có dữ liệu theo TRANG**
(`gsc-trang`, vừa ghép sang GaRutinBE cùng ngày — trước đó chiều này không có).

```
www.garutin.com   6 trang ·  2.866 hiển thị · 133 nhấp  = 20% tổng
garutin.com      16 trang · 11.320 hiển thị · 186 nhấp
```

`www` trả **200, không chuyển hướng** → Google xếp hạng nó như site riêng, hai
bản sao chia nhau tín hiệu nên không bản nào đủ mạnh.

**Thẻ canonical ĐÃ khai đúng ở cả hai bản — và Google vẫn bỏ qua.** Canonical
là gợi ý, không phải mệnh lệnh. Chỉ 301/308 mới ép được. Nhớ điều này: thấy
canonical đúng rồi tưởng yên là sai.

Đã thêm chuyển hướng trong `next.config.ts`, đã dò thấy 308 trên bản chạy thật.
17fishing không dính — `www.17-fishing.com` không phân giải.

### ⚠ 22 trang cửa ngõ "Mua Gà Rutin [quận]" — chưa xử

Củ Chi, Hóc Môn, Bình Chánh, Nhà Bè, Thủ Đức, Bình Tân, Tân Bình, Gò Vấp,
Bình Thạnh, Hà Nội, Quận 1/3/5/6/7/8/9/11/12… gần như giống hệt nhau.

Đây là **trang cửa ngõ**, Google có chính sách phạt rõ ràng. Và đo ra chúng
**không mang về gì**:

```
chỉ 4/22 trang có dữ liệu
mua-ga-rutin-tp-hcm      1.603 hiển thị · 120 nhấp   <- gần như toàn bộ
mua-ga-rutin-tan-binh       53 hiển thị ·   3 nhấp
mua-ga-rutin-quan-3          4 hiển thị ·   0 nhấp
mua-ga-rutin-thu-duc         1 hiển thị ·   0 nhấp
```

18 trang còn lại: **0 hiển thị**, chỉ pha loãng.

Các chùm trùng khác: **3 bài "gà rutin không đẻ"** (chùm đang 0 hiển thị — dấu
hiệu Google không biết chọn bài nào), **2 bài "bao lâu thì đẻ trứng"**, **6 bài
về chuồng**.

Gộp/xoá bài là **không hoàn tác được** — phải chủ shop quyết.

### CHÙM "CHUỒNG" — trận đánh trực tiếp, và một lỗi từ vựng

```
"chuồng"  837 hiển thị · 22 từ khoá
"lồng"     82 hiển thị ·  2 từ khoá      → chuồng gấp 10,2 lần
```

**ĐÃ SỬA 15/09** — đổi tên hai sản phẩm sang "Chuồng nuôi gà rutin", giữ
nguyên slug (URL đang có thứ hạng, đổi slug là mất hạng và phải thêm chuyển
hướng — đó là quyết định riêng). Trước khi sửa:

```
/san-pham/long-ga-rutin-cao-cap-size-lon   Lồng gà rutin cao cấp size lớn
/san-pham/long-ga-rutin-cao-cap            Lồng gà rutin cao cấp giá rẻ
```

Thân trang có 14 lần chữ "chuồng" nhưng **tiêu đề thì không**. Trong khi
lolipet có **9 sản phẩm "Chuồng nuôi gà rutin full phụ kiện 1–9"** nhắm đúng
chùm thương mại đó.

Và 9 từ khoá thương mại của chùm này đang ở `chua-du-lieu` — **0 hiển thị**:
mua chuồng nuôi gà rutin · chuồng gà rutin giá rẻ · kích thước chuồng nuôi gà
rutin · thiết kế chuồng nuôi gà rutin · chuồng gà rutin hà nội / đà nẵng.

Đây là họ hàng của cái bẫy `lồng`/`lông` đã ghi ở mục bẫy chung — nhưng lần
này không phải lỗi so khớp, mà là **gọi tên hàng bằng từ khách không dùng**.

### Số liệu Search Console 90 ngày

```
4.191 hiển thị · 103 nhấp · CTR 2,46%

sua-tieu-de   53 từ  2.461 ht   12 nhấp   <- 59% hiển thị, CTR 0,49%
da-tot        12 từ    918 ht   78 nhấp
bo-sung       87 từ    661 ht   10 nhấp
viet-moi      53 từ    151 ht    3 nhấp
```

**Khoảng dịch được (hạng 5–15): 33 từ khoá, 3.388 hiển thị, mới 86 nhấp.**
Đáng chú ý nhất: **"gà rutin" đang ở hạng 9,5 với 1.276 hiển thị mà 5 nhấp.**

Nhóm thương mại đã thắng sẵn, đừng phá: mua gà rutin ở tphcm (h5,1 · 26 nhấp)
· gà rutin tphcm (h5,0 · 10) · bán gà rutin tphcm (h5,6 · 6).

Chỉ 46 từ khoá ở hạng >15 và chúng chỉ có 60 hiển thị — **đừng đổ công vào đó**.

---

## 6. Bản đồ API quản trị

Tất cả sau `JwtAuthGuard`, tiền tố `https://api.garutin.com/api`.

```
sản phẩm   GET/POST /admin/products · PATCH,DELETE /admin/products/:id
           POST /admin/products/ai/{generate-description,improve-description,optimize-seo}
bài viết   GET/POST /admin/posts · PATCH,DELETE /admin/posts/:id
           POST /admin/posts/gop                    gộp bài, chuyển hướng 301
           POST /admin/posts/ai/{generate,improve,optimize-seo}
           POST /admin/posts/ai/{improve,optimize-seo}/{prompt,apply}   đường làm tay
phân tích  GET /admin/analytics/{visits,table,sources,hours,product-funnel,
                                 orders,top-products,monthly-compare,product-conversion}
từ khoá    GET /admin/keywords/phan-tich · POST /admin/keywords/bo-sung{,/prompt,/apply}
           POST /admin/keywords/dong-bo-search-console
review     GET /admin/reviews · POST/PATCH/DELETE
prompt AI  GET /admin/ai-prompts · PUT/DELETE /admin/ai-prompts/:key
cấu hình   GET/PATCH /admin/site-config
```

`POST /api/reviews` **không có guard** — ai trên Internet cũng ghi được chữ tuỳ
ý vào CSDL. Nhớ điều này khi đọc nội dung review.

---

## 7. Prompt AI

`src/ai-prompts/registry.ts` là **nguồn sự thật** của prompt mặc định; bảng
`ai_prompts` chỉ chứa bản ghi đè, sửa được từ CMS.

Thay biến dùng `{{ten}}`, **không phải `${ten}`** — nội dung này do người dùng
gõ và lưu trong CSDL; nội suy `${}` là chạy mã tuỳ ý lấy từ CSDL.

Prompt sản phẩm và bài viết **khác nhau về bản chất**: người tìm bài viết muốn
BIẾT, người tìm sản phẩm muốn MUA. Tiêu đề SEO sản phẩm cấm mở đầu bằng "Cách",
"Hướng dẫn", "Bí quyết", "Top N" — chúng kéo trang sản phẩm ra tranh hạng với
chính blog của shop.

Mọi lệnh AI của sản phẩm bật `jsonMode: true` và in thẳng khuôn JSON trong
prompt. Không làm vậy thì mô hình in bảng tự chấm điểm thay cho câu trả lời —
đã xảy ra thật.

---

## 8. Vận hành

```
deploy    push vào main → GitHub Actions → EC2
          rm -rf node_modules && npm ci && build && migration && pm2 restart
          mất vài phút, KHÔNG có môi trường thử
kiểm tra  npx tsc -p tsconfig.build.json --noEmit
migration mới nhất: 1800000000023 — tiếp theo là 024
CMS       Vercel, tự deploy khi push
```

Không có Redis, hàng đợi, hay cron. Một tiến trình PM2 và Postgres. Cần chạy
nền thì dùng bảng trong Postgres + vòng lặp trong tiến trình — đừng thêm hạ
tầng phải vận hành.

Kiểm bản đã lên: dò cho tới khi thấy thay đổi thật. Route mới thì `404 → 401`
là bằng chứng đã lên **và** guard còn nguyên. Đã từng chèn route giữa
`@UseGuards` và route bên dưới làm rớt guard của nó — kiểm cả hai.

---

## 9. Bẫy theo repo

Ba repo của shop dùng chung hồ sơ này, nhưng mỗi cái có bẫy riêng. Gom cả về đây
chứ không rải vào `CLAUDE.md` từng repo: rải ra là sáu chỗ phải nhớ cập nhật, và
đã có lần một cái bẫy nằm cả hai nơi rồi hai bên nói khác nhau.

### GaRutinBE

**`registry.ts` là nguồn sự thật của prompt AI**, bảng `ai_prompts` chỉ chứa bản
ghi đè. Sửa prompt thẳng trong CSDL mà không sửa registry là lần deploy sau mất sạch.

**`phan-tich.ts` ghim `lồng`/`lông`, `chuồng`/`chuông` thành mã riêng** trước khi
bỏ dấu. Thêm từ khoá mới có nguy cơ chập thì phải thêm vào bảng đó.

**Kiểm hàm sinh UUID của migration gần nhất trước khi viết cái mới** — hai shop
không giống nhau, chép chéo là hỏng lúc deploy.

### GaRutinWeb

**Bộ tối ưu ảnh của Next đã TẮT.** Hạn mức Vercel cạn là mọi ảnh trả 402 và biến
mất sạch — đã xảy ra thật. Ảnh nén sẵn tại nguồn trên R2. Đừng bật lại mặc định.

**Canonical phải khai ở TỪNG route.** Metadata ở layout gốc được mọi route kế
thừa, nên một canonical ở đó biến cả 20 trang sản phẩm và 69 bài viết thành "bản
trùng của trang chủ". Đã sửa 11/09 — đừng đưa canonical trở lại layout.

**`src/lib/gia.ts` là nơi DUY NHẤT quyết định giá hiển thị.** Trước đây có bốn
bản chép tay, mỗi nơi một kiểu.

### GaRutinCMS

**`VITE_*` nhúng lúc BUILD.** Đổi biến môi trường xong phải build lại, không thì
giá trị cũ vẫn nằm trong gói.

**Xem trước sản phẩm bị giới hạn chiều cao** (`maxHeight: 420`) — mô tả dài bị
cắt. Cố ý, để form không dài vô tận.
