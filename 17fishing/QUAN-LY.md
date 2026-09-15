# Hồ sơ quản lý — cửa hàng trực tuyến 17fishing

Lập ngày 10/09/2026 · Cập nhật lần cuối 10/09/2026 · Người lập: `quan-ly-tai-san`

Mọi con số trong hồ sơ này đều **tôi tự đo trong ngày 10/09/2026**, kèm lệnh để
đo lại. Không con số nào chép từ hồ sơ GaRutin. Đừng tin số cũ — hãy chạy lại.

> **Đọc mục 7 trước khi tin bức tranh này là đầy đủ.** Tôi đọc được mã nguồn và
> API, nhưng **không nhìn được máy chủ, không nhìn được bảng điều khiển AWS /
> Cloudflare / Vercel, và không nhìn được Zalo** — nơi việc mua bán thật diễn ra.

---

## 1. Tài sản này là gì và tạo giá trị bằng cách nào

Cửa hàng trực tuyến **17fishing** bán **dụng cụ câu cá** cho cần thủ Việt Nam:
cần câu đài, máy câu, phao, lưỡi, cước và ghế câu. Tên miền `17-fishing.com`
(có gạch nối), API `api.17-fishing.com`, ảnh `images.17-fishing.com`.

Chuỗi tạo giá trị **thật sự** đang chạy:

```
104 bài blog ─┬─► Google (151 lượt/30 ngày)  ─┐
              └─► chia sẻ vào Zalo/Facebook ──┤
                  (đợt 28/08: 87 người/1 buổi)│
                                              ▼
                                       người đọc bài
                                              │  ← ĐỨT Ở ĐÂY: 3/104 bài
                                              │     có liên kết sang gian hàng
                                              ▼
                            80 lượt xem sản phẩm/30 ngày
                                              ▼
                                   8 thêm giỏ · 0 mua
                                              ▼
                                 chốt qua Zalo 0358319291
                                   ↑ hệ thống không thấy gì
```

Ba kho mã: `17fishing-BE` (NestJS + Postgres + TypeORM, 158 commit),
`17fishing-Web` (Next.js 15 trên Vercel, 188 commit), `17fishing-CMS`
(Vite + React + antd trên Vercel, 122 commit). Dự án bắt đầu **18/04/2026** —
mới **5 tháng tuổi**.

Hạ tầng: một máy EC2 chạy PM2 (`pm2 restart 17fishing-be`), Postgres **cùng
máy** (`DATABASE_URL=...@localhost:5432/17fishing`), ảnh trên Cloudflare R2,
API sau CloudFront (trần 30 giây — xem `~/my-project/CLAUDE.md`).

**So với GaRutin:** 17fishing là hệ thống *lớn hơn hẳn* — 51 migration, có kho
hàng, đơn trả, voucher, vận chuyển, khách hàng đăng nhập, thông báo Telegram,
trang tĩnh, mẫu bài viết. Phần lớn số đó **chưa dùng tới** (mục 5). Đổi lại,
17fishing **thiếu hẳn** module từ khoá / Search Console mà GaRutin có.

---

## 1b. Hiểu biết nghề — đồ câu và cách bán nó

*Học từ đâu:* đọc toàn bộ **104 bài blog** của shop (11 bài do chủ tự viết,
93 bài chép từ `vietnam-fishing.com`), **13 mô tả sản phẩm**, **25 đánh giá
thật của khách**, và tệp `src/config/shop.ts`. Bốn bài đáng đọc nhất trước khi
nhận định bất cứ điều gì: `chon-phao-cau-dai-chuan-nhat`,
`chon-can-cau-cho-nguoi-moi`, `chon-gac-can-cau-phu-hop`, `chon-moi-cau-ca-phu-hop`.

### Thuật ngữ phải biết — không biết thì đọc mô tả không hiểu

| Từ | Nghĩa |
|---|---|
| **Cần thủ** | người đi câu. Shop xưng hô với khách là "anh em cần thủ" |
| **Câu đài** | lối câu bằng cần tay (không máy), phao đứng, cân chì chuẩn. Đây là **lối câu chính** của khách shop này |
| **Tải chì / cân chì** | trọng lượng chì phải khớp với phao. Sai là mất độ nhạy. Số "1,6g / 2,0g / 2,4g" trên phao **là tải chì, không phải cân nặng phao** |
| **Săn hàng** | chuyên đi săn cá lớn (trắm đen, tra, lăng). Cần "săn hàng" là dòng cần dài, cứng, đắt |
| **Độ cứng / H** | 28H, 5H, 20H–30H… chỉ độ cứng thân cần. 28H = đa dụng cho người mới |
| **Lóng cần** | mỗi đốt của cần rút. "Nổ lóng" = gãy đốt. "Bảo hành lóng" là cam kết đặc thù của nghề |
| **Đọt cần** | đoạn ngọn, mảnh nhất |
| **Tăm cá** | bọt khí cá ủi đáy nổi lên — dấu hiệu có cá lớn |
| **Hồ dịch vụ** | hồ câu tính tiền, cá nuôi thả sẵn, "nhát mồi", quen ăn cám của hồ |
| **Thẻo / dây thẻo** | đoạn dây ngắn nối lưỡi vào dây trục. "Nổ thẻo" = đứt thẻo |
| **Đuôi lệch 14°** | thiết kế lưỡi câu đài, giúp "đóng" sâu vào môi cá khi giật nhẹ |
| **Fom** | dáng phao được thiết kế riêng cho một loài ("fom chép") |
| **Nháy phao / đóng cá** | tín hiệu cá ăn / thời điểm giật cần |

### Ngành này đánh giá tốt xấu bằng tiêu chí gì

Theo chính lời shop viết và theo 25 đánh giá thật của khách, thứ tự là:

1. **Độ nhạy** — phao có báo được cú chạm nhẹ nhất không. Từ xuất hiện nhiều
   nhất trong cả mô tả lẫn review.
2. **Độ bền / không nổ lóng, không đứt dây** — hàng chịu lực khi gặp cá lớn.
3. **Trọng lượng** — cầm cả ngày không mỏi. Nên carbon được nêu như một giá trị.
4. **Nhìn rõ tín hiệu** — đầu phao có nổi không, câu đêm có sáng không.
5. **Chính hãng, không hàng nhái.**

### Cái gì làm giá chênh nhau

Trong đúng danh mục này (đo 10/09/2026), giá trải từ **55.000đ đến 3.850.000đ**
— chênh **70 lần**. Trục chính:

- **Chiều dài cần**: Strong Bull 3,6m = 1.586.500đ → 7,2m = 4.769.000đ trong
  cùng một sản phẩm. Cứ dài thêm một cỡ là đắt thêm vài trăm nghìn.
- **Vật liệu**: carbon > sợi thuỷ tinh; nano > xốp thường.
- **Loại món**: đồ tiêu hao (lưỡi, cước, phao) 55k–150k; đồ bền (cần, máy, ghế)
  585k–3,85tr.

### Khách lo gì nhất trước khi quyết

- **Cỡ nào hợp với tôi** — cần 3,6m hay 4,5m, phao 1,6g hay 2,4g, lưỡi size mấy.
  Chính blog của shop dạy khách rằng chọn sai cỡ là hỏng buổi câu.
- **Có đúng hàng chính hãng không** — hàng Trung Quốc nhái tràn lan.
- **Bảo hành thế nào khi nổ lóng** — với cần 1,5–4,8 triệu đây là câu hỏi số 1.
- **Sờ thử được không** — nên hàng đắt gần như luôn phải nói chuyện trước.

### ⚠ Ba mâu thuẫn giữa nội dung và gian hàng (đo 10/09/2026)

**1. Blog dạy khách mua thứ shop không bán.** Ba bài mới nhất và viết công phu
nhất chốt bằng lời chào hàng cho **gác cần**, **cám/hương liệu/mồi giả lure**,
và **combo cần + dây thẻo**. Cả ba **không có một sản phẩm nào** trong danh mục.
Bài `chon-phao-cau-ca-chuan` còn giới thiệu "Phao Nano **Kawase** Siêu Nhạy" là
hàng bán chạy — **không có sản phẩm nào tên Kawase**. Danh mục **"Combo" tồn tại
nhưng rỗng**.

**2. Blog dẫn khách sang đối thủ.** Trong 104 bài có **376 thẻ liên kết**:

```
216 liên kết → vietnam-fishing.com   (chính là nơi 93 bài này bị chép về)
 63 liên kết → youtube.com/vietnamfishingtvc
 55 liên kết → facebook.com/vietnamfishingshop
  3 liên kết → shope.ee
  6 liên kết → trang sản phẩm CỦA CHÍNH SHOP  ← toàn bộ trỏ vào /san-pham chung
                                                 chung, không bài nào trỏ vào
                                                 một món cụ thể
  0 liên kết có rel="nofollow"
```

**77/104 bài** có ít nhất một liên kết sang đối thủ. Trong đó 21 liên kết trỏ
thẳng vào trang danh mục *"dây câu – lưỡi câu"* của họ — đúng mặt hàng
17fishing đang bán. Bài đông khách nhất (`huong-dan-cach-buoc-luoi-cau…`,
104 khách/30 ngày) thì **không có một liên kết nào**, kể cả sang lưỡi ISENI mà
shop đang bán.

**3. Đây là việc đáng làm nhất của tài sản này** — đáng hơn viết thêm bài,
đáng hơn sửa mô tả. Gian hàng đã tốt (mục 2); chỗ đứt là đoạn nối giữa bài viết
và gian hàng.

### ⚠ Danh mục mạnh, nhưng cả đầu trên không có ai làm chứng

```
55.000 –   150.000đ  (phao, lưỡi, cước)  → 25/25 đánh giá thật · 8/8 lượt thêm giỏ
420.000 – 3.850.000đ (túi, cần, máy, ghế) → 0 đánh giá · 0 thêm giỏ · 39 lượt xem
```

Bốn món đắt nhất (1,55tr – 3,85tr) hút **39 lượt xem trong 30 ngày và không ai
bấm mua**. Với hàng 3,85 triệu mà không một lời chứng thực, đây là kết quả
**đúng như ngành này vận hành**, không phải lỗi kỹ thuật: đồ đắt chốt bằng nói
chuyện. Nhưng nó cũng nói rằng trang sản phẩm đắt tiền hiện chỉ đang làm việc
của một tờ rơi, chưa làm việc của một người bán.

---

## 2. Quy mô thật — đo ngày 10/09/2026

### Gian hàng

```
sản phẩm đang bán      11   (13 bản ghi, 2 đã tắt isActive=false)
danh mục                6   Combo · Cần Câu Đài · Ghế Câu Cá · Máy Câu ·
                            Phao câu cá · Phụ Kiện   → "Combo" RỖNG
mô tả sản phẩm             ngắn nhất 958 · trung vị 1.324 · dài nhất 3.910 ký tự
                           0/11 dưới 300 ký tự  ·  0/11 thiếu seoTitle/seoDescription
ảnh                        3–5 ảnh/món, chỉ 1 món có đúng 1 ảnh (Cước Câu Đài)
                           90/90 ảnh + 90/90 khổ ảnh 640 đều tải được  ← khoẻ
biến thể                8/11 món có biến thể · 11 biến thể KHÔNG có ảnh riêng
giá bán                 55.000 · 80.000 · 85.000 · 99.000 · 150.000 · 420.000 ·
                        585.000 · 1.550.000 · 1.586.500 · 2.350.000 · 3.850.000
tồn kho khai trong biến thể: 162 · 150 · 100 · 400 · 40 · 25 · 115 · 100
module kho (admin/inventory): 0 SKU · 0 tồn · 0 phát sinh  ← hai nguồn sự thật
```

**Gian hàng 17fishing tốt hơn hẳn GaRutin** (GaRutin trung vị 124 ký tự, 13/20
món dưới 300). Đây không phải chỗ cần sửa.

### Nội dung

```
bài viết              104   tất cả published
  ├ tự viết            11   (không có sourceUrl)
  └ chép về            93   từ vietnam-fishing.com, qua scripts/crawl-posts.mjs
độ dài bài                 ngắn nhất 52 · trung vị 3.968 · dài nhất 12.066 ký tự
  bài gần như rỗng       9   nội dung chỉ là một dòng <h2> tên video
tiêu đề còn tên đối thủ 10  "… | VIETNAM FISHING TV", và 10 slug chứa
                            "vietnam-fishing"
thiếu seoTitle          91  · thiếu seoDescription 91
ảnh bìa hỏng (404)       5
bài có ảnh chèn hỏng     4  (ảnh mượn từ vietnam-fishing.com, đã 404)
danh mục bài               4 quy ước lẫn lộn: "kỹ thuật câu cá" (93) ·
                           "kinh-nghiem" (9) · "tin-tuc" (1) · trống (1)
sitemap web            122  url (1 trang chủ · 12 sản phẩm · 105 blog · 4 trang tĩnh)
sitemap API cũ         104  chỉ có blog — bản bỏ hoang, robots.txt không trỏ tới
```

### Khách và phễu — 30 ngày, 12/08 → 10/09/2026

```
lượt truy cập        1.294        "khách"       464   ← xem cảnh báo mục 6
nguồn   direct 962 (74%) · facebook 175 · google 151 · yahoo 4 · chatgpt 1 · copilot 1
thiết bị  mobile 622 · desktop 170 · KHÔNG XÁC ĐỊNH 502 (39%)
giờ đông  12–16h (364) > 16–20h (307) > 08–12h (255)
phễu      xem sản phẩm 80 → thêm giỏ 8 → vào đặt hàng 8 → MUA 0
bài không ai đọc      59/104   (bài tự viết chỉ 3/11 không ai đọc)
lượt vào TRANG CHẾT  144/1.294 = 11%
```

**Một ngày làm hỏng mọi số trung bình:** ngày **28/08/2026** có **247 lượt /
108 khách** — 19% cả tháng. 87 người trong số đó vào đúng **một bài duy nhất**
(`huong-dan-cach-buoc-luoi-cau…`), mỗi người đúng một lượt, 194/247 lượt từ
điện thoại, dồn vào khung 12–16h, nguồn ghi là "direct". Đó là chữ ký của **một
đường dẫn được chia sẻ vào nhóm Zalo hoặc Facebook** (trình duyệt trong ứng dụng
không gửi referrer). Không một ai trong 87 người đó xem một sản phẩm nào — vì
bài đó không có liên kết nào cả.

### Bán hàng — toàn bộ lịch sử

```
ĐƠN HÀNG                    1     20/07/2026 · "Trịnh" · Q12 TP.HCM · 150.000đ
                                  · confirmed · COD · paymentStatus vẫn "pending"
                                  · món đã mua: "Phao Lông Công Tiểu Phượng Hoàng"
                                  ← MÓN NÀY NAY ĐÃ BỊ TẮT (isActive=false)
khách hàng                  3     1 thật · 1 tên "Tesss" · 1 là chính chủ shop
khách đã xoá mềm           12     phần lớn rác test: "a" "435" "fsdf" "sdf" "QA" "B"
đơn đã bị xoá cứng         ≥2     17F202604268779 và 17F202604269744 — chỉ còn
                                  vết trong 3 phiếu nhập kho nháp ngày 26/04
đánh giá trong CSDL       487
  ├ máy sinh nguyên văn   462     khớp đúng chuỗi trong SEED_COMMENTS
  │   ├ mồ côi            460     thuộc 15 sản phẩm đã bị xoá cứng, không hiện ở đâu
  │   └ đang hiển thị       2     trên "Cước Câu Đài" → 5,00★ (2 đánh giá) là 100% máy
  └ do người viết          25     tất cả trên 6 sản phẩm, đọc rất thật
"đã bán N" hiển thị cho khách: 1.965 — trong đó lượt mua THẬT = 0
                                  (purchaseCount 0 + bonusPurchaseCount 91…291)
```

### Cách đo lại — dán nguyên khối này

```bash
A=https://api.17-fishing.com/api
TOKEN=...            # POST /api/auth/login  (KHÔNG dán token vào chat, xem mục 4)
H="authorization: Bearer $TOKEN"
TO=$(date +%F); FROM=$(date -d '-29 days' +%F)

curl -s "$A/products?limit=300"                  # 11 món đang bán
curl -s "$A/admin/products?limit=300"      -H "$H"   # 13 bản ghi, kể cả đã tắt
curl -s "$A/posts?limit=500"                     # MẶC ĐỊNH CHỈ 12 — phải đặt limit
curl -s "$A/admin/orders?limit=500"        -H "$H"
curl -s "$A/customers/admin/customers"     -H "$H"   # CHÚ Ý tiền tố /customers
curl -s "$A/customers/admin/customers/deleted" -H "$H"
curl -s "$A/reviews/admin"                 -H "$H"   # 487 bản ghi, ~166 KB
curl -s "$A/admin/analytics/visits?from=$FROM&to=$TO"         -H "$H"
curl -s "$A/admin/analytics/table?from=$FROM&to=$TO"          -H "$H"
curl -s "$A/admin/analytics/sources?from=$FROM&to=$TO"        -H "$H"
curl -s "$A/admin/analytics/product-funnel?from=$FROM&to=$TO" -H "$H"
curl -s "$A/admin/inventory/analytics"     -H "$H"
curl -s "$A/feed/google"                              # feed Google, 11 mặt hàng
curl -s https://17-fishing.com/sitemap.xml            # sitemap THẬT (không phải của API)
```

Đếm liên kết sang đối thủ trong blog (con số 216 ở mục 1b):

```bash
curl -s "$A/posts?limit=500" | python3 -c "
import json,sys,re,collections
d=json.load(sys.stdin); t=collections.Counter()
for x in d:
    for l in re.findall(r'<a[^>]+href=\"([^\"]+)\"', x['content'] or ''):
        t['ĐỐI THỦ' if 'vietnam-fishing' in l or 'vietnamfishing' in l
          else 'SẢN PHẨM CỦA MÌNH' if '/san-pham' in l else 'khác'] += 1
print(t)"
```

Kiểm 90 ảnh sản phẩm và khổ ảnh dựng sẵn còn sống không:

```bash
curl -s "$A/admin/products?limit=300" | python3 -c "
import json,sys
u=set()
for p in json.load(sys.stdin):
    u |= set(p.get('images') or [])
    for v in (p.get('variants') or []): u |= set(v.get('images') or [])
print('\n'.join(sorted(u)))" | while read -r x; do
  for f in "$x" "${x%.*}-640.webp"; do
    c=$(curl -s -o /dev/null -w "%{http_code}" -I "$f"); [ "$c" != 200 ] && echo "HỎNG $c $f"
  done
done
```

---

## 3. Phần tạo ra giá trị lớn nhất → ưu tiên bảo vệ

**1. 11 mô tả sản phẩm + 90 tấm ảnh.** Đây là thứ duy nhất trong tài sản này
**không thể dựng lại bằng máy**. Ảnh chụp thật, mô tả viết đúng thuật ngữ nghề
(trung vị 1.324 ký tự, đủ seoTitle/seoDescription). Đối chiếu: gian hàng GaRutin
trung vị 124 ký tự. Mất mô tả và ảnh là mất vài tháng công.

**2. 25 đánh giá do người thật viết.** Rất ít, và **không lấy lại được** — chúng
là lời của khách đã mua, viết bằng ngôn ngữ nghề ("lưỡi đuôi lệch 14 độ này ăn
cá nhát cực tốt"). 462 đánh giá còn lại là máy sinh và có thể tạo lại trong một
nút bấm; 25 cái này thì không. Chúng đang nằm lẫn trong cùng một bảng với 462
cái kia — **không có cột nào phân biệt**. Ai xoá nhầm cả bảng là mất sạch.

**3. 11 bài viết do chủ tự viết.** 8/11 bài có người đọc trong 30 ngày, trong
khi 93 bài chép về chỉ có 37 bài có người đọc. Bài đông khách nhất toàn site là
bài tự viết. Đây là kênh kéo khách thật; 93 bài chép là khối lượng, không phải
tài sản.

**4. Số điện thoại / Zalo 0358319291 và quan hệ khách trên đó.** Có giá trị nhất
và **hoàn toàn không nằm trong tài sản này** — không ai sao lưu được.

**Cái KHÔNG đáng bảo vệ, nói thẳng:** 93 bài chép về không phải tài sản. Chúng
là nội dung trùng lặp của người khác, mang theo 216 liên kết dẫn khách đi, 10
tiêu đề còn tên thương hiệu đối thủ, và 9 bài gần như rỗng. Nếu buộc phải chọn
giữa cứu 11 bài tự viết và cứu 93 bài chép — cứu 11 bài.

---

## 4. Mất gì thì không lấy lại được → danh sách bảo vệ

### ✅ Sao lưu: điểm sáng nhất của tài sản này, nhưng chưa xác nhận được đã bật

Khác hẳn GaRutin (không tìm thấy cơ chế nào), 17fishing **có** bộ sao lưu viết
nghiêm túc: `scripts/backup-db.sh`, `scripts/restore-db.sh`, `scripts/BACKUP.md`.
Đọc mã thì thấy đã nghĩ tới những chỗ người khác hay quên:

- `pg_dump --format=custom`, tự kiểm mục lục bằng `pg_restore --list` sau khi tạo
- chặn tệp dưới 10 KB (dump rỗng do sai quyền)
- chỉ dọn bản cũ **sau khi** bản mới tạo xong
- `restore-db.sh` mặc định là **diễn tập** vào CSDL tạm; muốn ghi đè thật phải
  thêm `--that` và gõ đúng tên CSDL, và nó **tự sao lưu tình trạng hiện tại
  trước khi ghi đè**
- BACKUP.md ghi rõ đã diễn tập phục hồi thật: xoá 47 đơn, 31 khách, `DROP TABLE
  reviews` rồi khôi phục lại đủ

**Nhưng tôi không xác nhận được ba điều — và thiếu bất kỳ điều nào thì cả bộ này
bằng không:**

1. **Cron đã cài chưa?** BACKUP.md hướng dẫn thêm dòng `0 2 * * *`, không có gì
   chứng minh đã thêm.
2. **`S3_BUCKET` đã đặt chưa?** Chưa đặt thì script vẫn chạy nhưng bản sao **nằm
   cùng ổ đĩa với Postgres, cùng máy EC2**. Mất máy là mất cả hai — đúng tình
   huống cần bản sao nhất.
3. **Lần phục hồi thử gần nhất là bao giờ?**

*Hết mù bằng ba lệnh, chủ shop chạy trên máy chủ:*

```bash
crontab -l | grep backup-db          # có dòng nào không
ls -lh ~/db-backups/ | tail -5       # bản mới nhất ngày nào, nặng bao nhiêu
aws s3 ls s3://$S3_BUCKET/ | tail -3 # có ra ngoài máy chủ không
```

### 🔴 Khoá bí mật đã lộ trong mã nguồn — từ 19/04/2026, tức 5 tháng

**Sáu tệp đã commit và đã push** chứa khoá thật ghi cứng:

| Tệp | Lộ cái gì |
|---|---|
| `scripts/crawl-posts.mjs` | khoá R2 (access key + secret) · mật khẩu Postgres |
| `scripts/crawl-docauhieuthao.mjs` | khoá R2 · mật khẩu Postgres |
| `scripts/sync-r2-to-media.mjs` | khoá R2 · mật khẩu Postgres |
| `scripts/check-r2-duplicates.mjs` | khoá R2 |
| `scripts/clean-posts.mjs` | mật khẩu Postgres |
| `scripts/fix-posts-images.mjs`, `scripts/seed-products.mjs` | mật khẩu Postgres |

Đưa vào bằng commit `e4d1c10` ngày 19/04/2026, remote
`git@github-personal:vinctuyen2601/17fishing-BE.git`. **Xoá dòng đi là không đủ**
— khoá vẫn nằm trong lịch sử git. Phải **xoay khoá** ở Cloudflare R2 và đổi mật
khẩu `fishing_owner`, rồi mới dọn tệp.

*Tôi không xác định được repo đang công khai hay riêng tư* — máy này không có
`gh`. Riêng tư thì mức độ gấp thấp hơn nhưng **không mất đi**: Cloudflare và
GitHub đều có quét bí mật, và một lần đổi quyền repo là lộ hết.

Điểm tốt: đã kiểm lịch sử git, **`.env` chưa bao giờ bị commit** — chỉ có
`.env.example`.

### 🔴 Token quản trị — hai điều chủ shop đang hiểu sai

Token giao cho tôi hôm nay, giải mã phần payload:

```
role  : admin          ← KHÔNG phải quyền chỉ đọc. Nó xoá được đơn, sửa được giá.
                         "chỉ đọc" là lời hứa của tôi, không phải giới hạn kỹ thuật.
iat   : 24/08/2026
exp   : 23/09/2026     ← còn 13 ngày, KHÔNG phải tháng 10/2026 như đã dặn
```

`JWT_EXPIRES_IN` mặc định `30d` (`src/auth/auth.module.ts`). Token này **đã bị
dán vào một cuộc trò chuyện** — theo `~/my-project/CLAUDE.md` thì đây là **lần
thứ ba** phải xoay khoá vì lộ (trước đó: khoá riêng Search Console, token admin).

**Không có cơ chế thu hồi token** — không blacklist, không `tokenVersion`. Hai
đường vô hiệu hoá, theo thứ tự nhẹ trước:

1. Đặt `is_active = false` cho user admin đó rồi bật lại (JwtStrategy kiểm
   `user.isActive` mỗi lần gọi) — chỉ chặn được nếu tạo tài khoản admin thứ hai.
2. Đổi `JWT_SECRET` trên máy chủ và restart — vô hiệu hoá **mọi** token.

### 🔴 `GET /api/customers/phone/:phone` không có guard — đã kiểm chứng hôm nay

```
curl -s "$A/customers/phone/<số>"    # KHÔNG kèm token
  → số có thật    : HTTP 200, trả về tên, địa chỉ, số đơn, tổng tiền đã tiêu
  → số không có   : HTTP 200, 0 byte
so sánh: /customers/admin/customers  → HTTP 401
```

`src/customers/customers.controller.ts:28` thiếu `@UseGuards(JwtAuthGuard)`
trong khi mọi route anh em của nó đều có. Số di động Việt Nam **duyệt cạn được**
— ai cũng có thể dò cả bảng khách hàng kèm số tiền từng người đã tiêu, không cần
đăng nhập. Hôm nay thiệt hại nhỏ vì mới có 3 khách; nó lớn lên đúng bằng tốc độ
shop lớn lên.

*Đây là việc sửa mã, không thuộc quyền tôi — tôi chỉ nêu.*

### 🟠 Bí mật khác lộ qua API quản trị

`GET /api/admin/notification-channels` trả **botToken Telegram nguyên văn**
trong JSON. Có guard, nhưng nghĩa là: **bất kỳ ai cầm token admin đều đọc được
mọi bí mật tích hợp**. Tôi vừa đọc được nó chỉ vì được đưa token. Bot Telegram
đó đang gắn với `chatId` nhóm review sản phẩm.

### Danh sách bảo vệ còn lại

- **486 tệp ảnh / 213 MB trên Cloudflare R2.** R2 không tự giữ phiên bản cũ.
  Xoá là mất. `BACKUP.md` nói đúng: script không sao lưu ảnh.
- **Khoá bí mật chỉ tồn tại trong `.env` trên máy chủ**: `JWT_SECRET`,
  `DATABASE_URL`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `RESEND_API_KEY`,
  `SENTRY_DSN`, `GROQ_API_KEY`, `GEMINI_API_KEY`, `CEREBRAS_API_KEY`,
  `OPENROUTER_API_KEY`. Mất máy là mất khoá.
- **Thứ hạng tìm kiếm.** Không phải tệp, nhưng mất thì mất nhiều tháng.
- **`JWT_SECRET` có giá trị dự phòng công khai.** `jwt.strategy.ts` viết
  `process.env.JWT_SECRET || 'garutin-secret'`. Nếu biến môi trường trống trên
  máy chủ thì bất kỳ ai đọc repo cũng **tự ký được token admin**. Tôi **chưa
  kiểm được** có đang rơi vào nhánh dự phòng hay không — xem mục 7.

---

## 5. Đang âm thầm xấu đi

**1. Blog rò khách sang đối thủ, mỗi ngày.** 216 liên kết → `vietnam-fishing.com`,
63 → YouTube của họ, 55 → Facebook shop của họ, 0 `nofollow`, trong khi chỉ 6
liên kết trỏ về gian hàng của chính mình và **không cái nào trỏ vào một sản
phẩm cụ thể**. Không tự tốt lên, và mỗi bài được Google xếp hạng là thêm một cửa
dẫn khách đi.

**2. 11% lưu lượng rơi vào trang chết, và bộ đo không biết.** 144/1.294 lượt
trong 30 ngày:

| Lượt / khách | Chỗ chết |
|---|---|
| 63 / 56 | `/blog/nhung-dieu-can-biet-ve-phao-ho-dau-khi-cau-tram-den` — bài bị **đổi slug ngày 07/09/2026** sang `phao-ho-dau-cau-tram-den`, **không có chuyển hướng 301** |
| 33 / 8 | `/san-pham/phao-long-cong-tieu-phuong-hoang-sieu-nhay` — sản phẩm đã tắt |
| 23 / 23 | `/Blog` (chữ B hoa) — cả 23 lượt dồn vào 4 ngày 07–10/09, nghi máy quét |
| 13 / 4 | `/san-pham/can-cau-kirin-sharp-carbon-fiber-sieu-nhe` — sản phẩm đã tắt |

**3. `/san-pham/<slug không tồn tại>` trả HTTP 200, không phải 404.** Kiểm hôm
nay: `/blog/xxx` → 404 đúng, `/san-pham/xxx` → **200** kèm một trang chỉ có
header và footer, ruột trống trơn. Nguyên nhân gốc đo được: API trả **HTTP 200
với 0 byte** cho sản phẩm không tồn tại thay vì 404. Hệ quả: Google giữ nguyên
URL sản phẩm đã chết trong bảng xếp hạng, và người thật vào từ đó thấy một trang
hỏng chứ không thấy lời xin lỗi hay gợi ý.

**4. 462/487 đánh giá là máy sinh, và 460 trong số đó mồ côi.** Chúng thuộc 15
sản phẩm đã bị xoá cứng, nằm lại trong bảng `reviews` từ 21/10/2025 tới
18/04/2026. Không hiện ở đâu, nhưng: làm mọi thống kê đánh giá về sau sai, và
càng để lâu càng khó tách khỏi 25 đánh giá thật.

**5. "Đã bán 1.965" hiển thị cho khách là con số hoàn toàn mồi.** `purchaseCount`
thật = 0 trên cả 11 món; `ProductCard.tsx` cộng `purchaseCount + bonusPurchaseCount`
rồi hiện lên. Đây là **lựa chọn có ý thức** — mã có chú thích giải thích vì sao
tách hai cột — nên tôi không bàn đúng sai. Nhưng phải ghi lại: nó làm mọi phân
tích "món nào bán chạy" đọc từ trang web trở nên vô nghĩa, và nó là rủi ro chính
sách với Google Shopping / Facebook nếu shop chạy quảng cáo.

**6. Ba phiếu nhập kho nháp treo từ 26/04/2026** — `NK0001/2/3`, ghi "chờ admin
duyệt", sinh tự động từ hai đơn trả hàng mà **bản thân hai đơn đó đã bị xoá
cứng**. Module kho báo 0 SKU, 0 tồn, 0 phát sinh, trong khi tồn kho thật đang
khai trong `variants` của sản phẩm. **Hai nguồn sự thật về tồn kho**, chưa cái
nào đúng.

**7. Ảnh vỡ trên bài đông khách.** 5 ảnh bìa 404, một trong số đó là
`phan-loai-do-cung-cua-can-cau-tay-…` — **bài xếp thứ 3 về lượng khách** (44
khách/30 ngày). Thêm 4 bài có ảnh chèn mượn từ `vietnam-fishing.com` đã 404 hết.

**8. Ảnh nặng trên một site 78% khách dùng điện thoại.** 152/486 tệp trên 500 KB,
tổng 158 MB; tệp nặng nhất 3,5 MB. Khổ ảnh dựng sẵn (160/640/1080/1600) đang
hoạt động tốt nên trang web không chịu trọn con số này — nhưng kho thì có.

**9. Một banner trang chủ đang bật với tiêu đề là dấu cách** (`title: " "`,
`highlight: " "`), phụ đề *"CHINH PHỤC MÙA GẢI 2026"* — thiếu chữ, phải là
"MÙA GIẢI". Đang hiện ở vị trí hero, sortOrder 3.

**10. Chữ của máy còn sót trong bài đã đăng.** Ba chỗ đo được:
- `chon-gac-can-cau-phu-hop`: *"khi lựa chọn gác cần câu cá **tối ưu SEO** hiệu
  quả sử dụng"* — câu lệnh prompt lọt vào giữa câu văn.
- `chon-gac-can-cau-phu-hop`: *"Bấm vào nút **[MUA NGAY CHÍNH HÃNG]** dưới đây"*
  — nhãn nút in ra thành chữ, không có nút nào.
- `chon-can-cau-cho-nguoi-moi`: **"SEO Title … SEO Description …"** in nguyên
  xuống cuối bài cho người đọc nhìn thấy.
- `chon-phao-cau-dai-chuan-nhat`: *"xem sản phẩm phao câu đài tại **Gà Rutin**"*
  — vết của shop bên kia, còn sót đúng một chỗ trong toàn bộ 104 bài.

**11. Phụ thuộc LLM sẽ mục ruỗng.** Bốn nhà: Groq (`openai/gpt-oss-120b`),
Gemini (`gemini-3.5-flash-lite`), Cerebras, OpenRouter. Theo `~/my-project/CLAUDE.md`
đã hai lần model bị khai tử giữa chừng. Sẽ còn xảy ra.

**12. Module xây rồi chưa dùng** — voucher, vận chuyển (ViettelPost/GHN đều
`isActive: false`), đơn trả, kho, trang tĩnh, mẫu bài viết, thư viện ảnh (rỗng),
đăng nhập khách. Không hỏng, nhưng mỗi module là mã phải nuôi.

Ngược lại, **module từ khoá / Search Console thì 17fishing KHÔNG có**, trong khi
GaRutin có. Đáng chú ý hơn: **bảng `keywords` vẫn nằm trong lược đồ** (migration
`1800000000004`, thừa hưởng từ dòng mã GaRutin) nhưng không có module, không có
controller — `GET /admin/keywords/phan-tich` trả **404** trên production: lược
đồ chết. Mà 17fishing mới là bên có lưu lượng Google thật — **151 lượt/30 ngày,
so với 11 lượt của GaRutin**. Công cụ nằm ở shop không cần; shop cần thì không có.

---

## 6. Ngữ nghĩa dễ hiểu sai — bẫy, và tôi đã suýt mắc cái nào

| Bẫy | Sự thật |
|---|---|
| **"464 khách/30 ngày" là 464 người** | Mẫu số là `COALESCE(v.visitor_id, v.ip)` (`tracking.service.ts:31`). Một người đổi mạng đếm hai lần; nhiều người sau cùng một IP nhà mạng đếm một lần. **Khác GaRutin**, bên đó dùng `visitor_id` thuần — hai số **không so sánh trực tiếp được** |
| **Bảng theo trang và bảng phễu nói cùng một thứ** | Không. Phễu bắt buộc `v.visitor_id IS NOT NULL` (dòng 662), bảng theo trang thì không. Ví dụ thật: `/san-pham/phao-long…` bảng ghi 8 khách, phễu ghi 2 — **cả hai đều đúng**, chỉ là hai định nghĩa |
| **mobile 622 + desktop 170 = tổng lượt** | 792 ≠ 1.294. Bảng thiết bị có thêm điều kiện `v.device IS NOT NULL` (dòng 554): **39% lượt không ghi được thiết bị** |
| **API trả 200 nghĩa là có dữ liệu** | Không. Sản phẩm/bài viết không tồn tại → **HTTP 200 kèm 0 byte**. Kiểm bằng `%{http_code}` là kiểm sai; phải xem `%{size_download}` |
| **Trang trả HTTP 200 là trang sống** | `/san-pham/<không tồn tại>` trả 200 kèm ruột rỗng. Muốn biết trang có sống không phải xem nội dung, không xem mã trạng thái |
| **Lượt truy cập = người thật** | Bộ đo `TrackVisit` nằm ở layout gốc và **không gắn cờ trang 404** — GaRutin đã sửa, 17fishing thì chưa. Trang chết vẫn được đếm là lượt xem (144 lượt/30 ngày) |
| **"đã bán 291" nghĩa là bán được 291** | `purchaseCount` thật = **0** trên cả 11 món. Số hiện ra là `purchaseCount + bonusPurchaseCount`, phần bonus do `POST /reviews/admin/seed-all` gieo ngẫu nhiên 50–300 |
| **"5,00★ (2 đánh giá)" là hai khách khen** | Trên **Cước Câu Đài** thì không: cả hai là câu mẫu trong `SEED_COMMENTS`. Năm sản phẩm còn lại có đánh giá thì đánh giá là thật |
| **`weightPerUnit` là cân nặng** | Với phao nó là **tải chì** ("1,5 gram - 3,5 gram"), với cần là dải cân nặng theo cỡ ("149gram-774gram"), với Phao Nano X Master ghi "0,08G" trong khi biến thể là 1,6–2,4g. Một trường, ba nghĩa |
| **Giá trên thẻ sản phẩm là giá khách trả** | Với **Phao Nano Ngọc Liên Sơn** thì không: thẻ hiện **80.000đ**, còn cả ba biến thể đều bán **70.000đ**. Không biến thể nào khớp giá cấp sản phẩm |
| **Tỉ lệ mua phản ánh sức bán** | **Thiếu tử số.** 1 đơn trong toàn bộ lịch sử; việc mua bán thật chốt qua Zalo và không vào hệ thống |
| **"Traffic một bài tụt sau khi đổi slug ⇒ do đổi slug"** | **Tôi suýt viết kết luận này và nó SAI.** Xem mục 11, ngày 10/09 |
| **`GET /vouchers`, `/pages`, `/post-templates` trả 404 nghĩa là hỏng** | Không — chỉ là tiền tố đường dẫn khác. Tương tự `/admin/customers` phải gọi là `/customers/admin/customers` |
| **`api.17-fishing.com/api/sitemap.xml` là sitemap của shop** | Không. Sitemap thật là `https://17-fishing.com/sitemap.xml` (122 url, do Next.js sinh). Cái bên API là bản bỏ hoang chỉ có blog, `robots.txt` không trỏ tới |

---

## 7. Chỗ tôi mù, và cần gì để hết mù

Viết thật, không lược cho báo cáo đẹp.

**1. Toàn bộ việc bán hàng qua Zalo.** Hệ thống ghi nhận **1 đơn trong 5 tháng**,
trong khi shop có 464 khách/tháng và điện thoại hiện ở mọi trang. Tôi không thấy:
bao nhiêu người nhắn, hỏi gì, chốt bao nhiêu, vì sao không chốt. **Đây là mảng
mù lớn nhất và nó làm hỏng mọi kết luận về chuyển đổi.** Mọi câu kiểu "món này
không bán được" trong hồ sơ này đều phải đọc là "hệ thống không thấy nó bán".
*Hết mù bằng cách:* nhập đơn Zalo vào hệ thống, dù chỉ nhập tay và chỉ ghi tên +
món + tiền.

**2. Sao lưu có đang chạy thật không.** Tôi đọc được script và tài liệu, không
đọc được `crontab -l`, không thấy `~/db-backups/`, không biết `S3_BUCKET` đã đặt
chưa. **Một bộ sao lưu viết rất tốt mà chưa cắm điện thì bằng không.**
*Hết mù bằng cách:* ba lệnh ở mục 4, chủ shop chạy rồi dán kết quả vào mục 10.

**3. `JWT_SECRET` trên máy chủ có được đặt không.** Mã có nhánh dự phòng
`'garutin-secret'` — công khai trong repo. Nếu đang rơi vào nhánh đó thì ai đọc
repo cũng tự ký được token admin. Tôi định kiểm bằng cách tính lại chữ ký token
với khoá đó **trên máy này, không gửi gì đi**, nhưng thao tác bị chặn nên
**tôi không biết**. *Hết mù bằng cách:* trên máy chủ chạy
`grep -c '^JWT_SECRET=.\{20,\}' ~/17fishing-BE/.env` — ra `1` là an toàn, ra `0`
là phải đặt ngay.

**4. Repo GitHub công khai hay riêng tư.** Quyết định mức gấp của việc xoay khoá
R2 và mật khẩu Postgres (mục 4). Máy này không có `gh`. *Hết mù bằng cách:* mở
`github.com/vinctuyen2601/17fishing-BE` ở chế độ ẩn danh — thấy được là công khai.

**5. Vì sao ngày 28/08 có 87 người vào đúng một bài.** Chữ ký giống một đường
dẫn được chia sẻ vào nhóm Zalo/Facebook, nhưng nguồn ghi là "direct" nên tôi
không truy được. **Đây là sự kiện marketing lớn nhất trong tháng và không ai
biết nó đến từ đâu** — nghĩa là không lặp lại được. *Hết mù bằng cách:* chủ shop
nhớ lại hôm đó đã đăng gì ở đâu, hoặc từ nay dán link có `?utm_campaign=` khi
chia sẻ (CMS đã có sẵn công cụ `utm-builder`).

**6. Khối "direct" 962 lượt / 337 khách (74%) chưa soi.** Với tiền lệ `/Blog`
23 lượt/23 khách và `/khong-ton-tai-abc`, một phần là máy quét. Nhưng cũng chính
khối này chứa 87 người đọc thật hôm 28/08. **Tôi không tách được máy và người.**
*Hết mù bằng cách:* đối chiếu user-agent và mẫu đường dẫn trong bảng `page_visits`
— cần quyền truy vấn thẳng CSDL, tôi chỉ có API.

**7. Vì sao hai sản phẩm bị tắt.** `Phao Lông Công Tiểu Phượng Hoàng` là **món
duy nhất từng bán được** (đơn 20/07), nay `isActive=false` nhưng trang vẫn còn
và vẫn hút 8 người/30 ngày. Hết hàng? Ngừng nhập? Nhà cung cấp bỏ? Hệ thống
không lưu lý do. *Hết mù bằng cách:* chủ shop trả lời — xem mục 8.

**8. Có đang chạy quảng cáo không.** `fb_pixel_id` đã cài (`942485408706042`),
facebook mang về 175 lượt/47 khách, nhưng **0 lượt nào có `utm_campaign`**. Tôi
không phân biệt được đâu là bài đăng tự nhiên, đâu là quảng cáo trả tiền, nên
**không nói được đồng nào đang lãi hay lỗ.**

**9. Đơn hàng đã bị xoá cứng bao nhiêu.** Thấy vết của ít nhất 2 đơn tháng
04/2026 trong phiếu nhập kho, và 460 đánh giá mồ côi của 15 sản phẩm đã biến
mất. Không có nhật ký xoá. **Không dựng lại được lịch sử tháng 4–7.**

**10. Sức khoẻ máy chủ.** `/health` báo `status: ok`, `dbLatencyMs: 8`,
`uptimeSeconds: 23306` (≈6,5 giờ) lúc 10/09 10:00. Ngoài ba con số đó tôi không
biết gì: CPU, đĩa còn bao nhiêu, log lỗi, Sentry có bắt được gì không.

**11. Cỡ mẫu.** 30 ngày · 464 khách · 80 lượt xem sản phẩm · 8 thêm giỏ · **1
đơn trong toàn bộ lịch sử**. Ở quy mô này **mọi tỉ lệ phần trăm liên quan tới
mua hàng đều là nhiễu**. Tôi cố tình viết số tuyệt đối thay vì phần trăm ở mọi
chỗ nói về đơn hàng. Chỗ nào trong hồ sơ này có phần trăm, nó nói về lưu lượng
hoặc về đếm bản ghi — không nói về doanh số.

---

## 8. Việc còn treo, ai đang chờ quyết

Xếp theo **mức thiệt hại nếu bỏ mặc ba tháng**, không theo mức dễ làm.

| # | Việc | Thiệt hại nếu bỏ mặc | Chờ ai |
|---|---|---|---|
| 1 | **Xoay khoá R2 + mật khẩu Postgres** đã lộ trong git từ 19/04 | mất/hỏng 213 MB ảnh; ai đọc được toàn bộ CSDL | chủ shop, ở Cloudflare + máy chủ |
| 2 | **Xoay token admin** — đã dán vào chat **LẦN THỨ BA** (14/09). Hết hạn 23/09, còn 9 ngày. Bản sao đang nằm ở `~/.17fishing-admin-token` trên máy chủ shop, xoá sau khi xoay | toàn quyền gian hàng và đơn hàng cho bất kỳ ai đọc được đoạn chat | chủ shop |
| 3 | **Xác minh sao lưu đã cắm điện** (cron + S3_BUCKET) | mất trắng 104 bài, 11 sản phẩm, toàn bộ số liệu | chủ shop, 3 lệnh ở mục 4 |
| 4 | **Bịt `GET /customers/phone/:phone`** — thiếu 1 dòng `@UseGuards` | rò cả bảng khách hàng kèm số tiền đã tiêu, không cần đăng nhập | sửa mã — **không thuộc quyền tôi** |
| 5 | **Kiểm `JWT_SECRET` có đặt trên máy chủ không** | nếu trống, ai cũng tự ký được token admin | chủ shop, 1 lệnh ở mục 7 |
| ✅ 6 | **Gỡ 216 liên kết sang `vietnam-fishing.com`** khỏi 77 bài | mỗi ngày dẫn khách sang đối thủ; rủi ro xếp hạng | chủ shop quyết: gỡ hẳn hay đổi thành `nofollow`? |  **XONG 11/09 — còn 0 liên kết**
| 7 | **Nối 3 bài đông khách nhất vào sản phẩm tương ứng** (`buoc-luoi-cau` → lưỡi ISENI; `do-cung-can-cau-tay` → cần Thanh Long / Strong Bull; `phao-ho-dau-tram-den` → phao) | 100+ người đọc/tháng đọc xong không có chỗ nào để bấm | chủ shop duyệt nội dung |
| 8 | **301 cho `/blog/nhung-dieu-can-biet-ve-phao-ho-dau-khi-cau-tram-den`** → slug mới | 56 khách/30 ngày đâm vào 404 | chủ shop quyết giữ slug nào |
| ✅ 9 | **`/san-pham/<không tồn tại>` phải trả 404, không phải 200** | Google giữ URL chết trong index; người thật thấy trang trắng | sửa mã |  **XONG 14/09 — gốc là loading.tsx gây soft 404**
| 10 | **Quyết số phận 2 sản phẩm đã tắt** (một trong đó là món DUY NHẤT từng bán được, vẫn hút 8 khách/30 ngày) | bán lại được thì bật lên; không thì phải 301 sang món thay thế | **chỉ chủ shop trả lời được** |
| 11 | **Xoá 460 đánh giá mồ côi** của 15 sản phẩm đã biến mất | càng để càng khó tách khỏi 25 đánh giá thật | chủ shop quyết — **việc không hoàn tác được, tôi không tự làm** |
| ✅ 12 | **Sửa giá Phao Nano Ngọc Liên Sơn**: thẻ hiện 80.000đ, biến thể bán 70.000đ | khách thấy giá cao hơn giá thật | chủ shop quyết giá đúng là bao nhiêu |  **XONG 14/09 — chủ shop chốt 80.000đ, đã đồng bộ thẻ và phân loại**
| 13 | **Ngưỡng freeship 100.000đ trên hàng nặng** (14/09: đo lại thấy **7/11 sản phẩm mua MỘT món đã vượt ngưỡng**, và món rẻ nhất 55k thì mua 2 cái cũng vượt — tức ngưỡng này gần như không còn lọc gì) — ghế 5,5 kg giá 1,55tr và ghế 4,4 kg giá 3,85tr đều **miễn ship**. Cước thật đi liên tỉnh cho 5 kg lớn hơn 15.000đ nhiều lần | ăn vào lãi đúng những món lãi nhất | **chỉ chủ shop biết cước thật là bao nhiêu** |
| 22 | **Dọn 3 bản ghi thử combo** khi xem xong: `Hộp đựng phao 6 ngăn chống sốc`, `THỬ COMBO 1`, `THỬ COMBO 2`. Đều ẩn khỏi gian hàng nên không gấp | rác dữ liệu | chạy `node dung-combo.mjs --xoa`, hoặc xoá trong CMS |
| ✅ 23 | **Gắn tag chuyên môn + danh mục cho 104 bài** — hiện 98/104 mang `câu cá`, 92/104 mang `kỹ thuật`, 104/104 KHÔNG danh mục. Đã chữa triệu chứng bằng cách khớp từ tiêu đề, nhưng tầng tag vẫn vô dụng | gợi ý "Đọc thêm" chỉ đúng ở mức từ khoá tiêu đề, không hiểu chủ đề | chủ shop — chỉ người bán mới biết bài nào thuộc nhóm nào |  **XONG 15/09 — 103/104 bài, tag phổ biến nhất còn 22%** |
| 21 | **Gắn quà tặng cho sản phẩm đầu tiên** — luật "mua ≥ n cái A tặng B" đã chạy end-to-end từ 14/09 nhưng **0/11 sản phẩm dùng**. Cần một sản phẩm đánh dấu "là hàng tặng" rồi gắn vào một món bán chạy | tính năng nằm không, và chưa kiểm được trên dữ liệu thật | **chỉ chủ shop quyết tặng gì cho món nào** |
| 14 | Dọn 4 vết chữ máy còn sót trong bài đã đăng (mục 5, ý 10) | khách đọc thấy "tối ưu SEO", "[MUA NGAY CHÍNH HÃNG]", "Gà Rutin" | chủ shop |
| 15 | Sửa banner hero: tiêu đề là dấu cách, phụ đề thiếu chữ ("MÙA GẢI") | lỗi chính tả ngay trang chủ | chủ shop, sửa trong CMS |
| 16 | Thay 5 ảnh bìa 404 (1 trong đó ở bài top-3 lưu lượng) | bài đông khách nhìn như bỏ hoang | chủ shop |
| 17 | Quyết số phận 9 bài rỗng và 10 tiêu đề/slug còn tên "VIETNAM FISHING TV" | nội dung mỏng + quảng cáo không công cho đối thủ | chủ shop quyết: xoá, hay viết lại? |
| 18 | Thống nhất một nguồn sự thật cho tồn kho (module kho **hay** `variants`) | hứa còn hàng khi đã hết | chủ shop |
| 19 | Dọn 3 phiếu nhập nháp treo từ 26/04, gắn với đơn đã bị xoá | rác dữ liệu | chủ shop |
| ✅ 20 | **17fishing chưa nối Search Console** — mà đây mới là bên có lưu lượng Google thật | mù toàn bộ phần từ khoá | chủ shop |  **XONG 14/09 — property là tiền tố URL, không phải sc-domain**

**Việc tôi đề xuất KHÔNG làm:** đừng viết thêm bài. 59/104 bài hiện có không ai
đọc trong 30 ngày. Vấn đề của tài sản này không phải thiếu bài — mà là 104 bài
đang có không dẫn về gian hàng.

---

## 9. Nhịp kiểm — đề xuất, chưa thống nhất với chủ shop

Ít thôi. Mỗi mục nói rõ nó phát hiện được chuyện gì; nhịp nào không gắn với một
rủi ro cụ thể thì sẽ bị bỏ sau hai tuần.

| Nhịp | Kiểm gì | Phát hiện được chuyện gì |
|---|---|---|
| **Tuần** | Bảng `admin/analytics/table`: đường dẫn nào không khớp slug sản phẩm/bài viết đang có | trang chết mới sinh ra sau mỗi lần đổi slug hoặc tắt sản phẩm |
| **Tuần** | Sản phẩm có người **xem mà không ai thêm giỏ** | hàng trên kệ đang mất khách; hiện là cả 4 món đắt nhất |
| **Tuần** | Đơn mới, và **đối chiếu với số đơn thật chốt qua Zalo** | mảng mù lớn nhất chỉ co lại nếu tuần nào cũng ghi |
| **Tháng** | 90 ảnh sản phẩm + khổ 640 (lệnh ở mục 2) | ảnh vỡ hàng loạt — đã xảy ra một lần với hạn mức Vercel |
| **Tháng** | Đếm lại liên kết ra ngoài trong blog (lệnh ở mục 2) | số 216 có đang giảm không, hay bài mới lại thêm vào |
| **Tháng** | So toàn bộ mục 2 với lần đo trước | tài sản đang lớn hay teo |
| **Tháng** | `ls -lh ~/db-backups/` và **thử `restore-db.sh` ở chế độ diễn tập** | bản sao chưa từng phục hồi thử thì chưa phải bản sao |
| **Quý** | Model LLM còn sống không · khoá còn hạn không · token admin sắp hết hạn chưa | mục ruỗng âm thầm; đã hai lần model bị khai tử giữa chừng |

---

## 10. Nhật ký quyết định

| Ngày | Quyết gì | Vì sao | Kết quả |
|---|---|---|---|
| 10/09/2026 | Nhận trông coi 17fishing với phạm vi: **3 kho mã + API production**. Ghi rõ Zalo và bảng điều khiển hạ tầng nằm **ngoài** tầm nhìn | chủ shop giao "cửa hàng", nhưng phần chốt đơn thật không nằm trong hệ thống — không nói ra thì hồ sơ trông đầy đủ trong khi thiếu mảng lớn nhất | đã ghi thành mục 7 |
| 10/09/2026 | **Không gọi bất kỳ POST/PATCH/PUT/DELETE nào.** Toàn bộ khảo sát bằng GET | chủ shop dặn chỉ đọc; và token thật ra là quyền `admin`, đủ sức xoá đơn — ranh giới phải giữ bằng kỷ luật vì công cụ không giữ hộ | đã giữ; không bản ghi nào bị đổi |
| 10/09/2026 | **Không tự xoá 460 đánh giá mồ côi**, dù chắc chắn là rác | việc không hoàn tác được thì đề xuất, không tự quyết | đưa vào mục 8, chờ chủ shop |
| 10/09/2026 | **Không in bất kỳ khoá bí mật nào vào hồ sơ này** — chỉ ghi *tệp nào, dòng nào, loại khoá gì* | hồ sơ nằm trong git; in khoá vào đây là lộ thêm lần nữa, đúng cái sai đang phải sửa | khoá R2, mật khẩu Postgres, botToken Telegram đều chỉ được nêu tên |
| 10/09/2026 | **Dừng lại khi bị chặn** thao tác kiểm chữ ký `JWT_SECRET`, thay vì tìm đường vòng | có cách khác nhưng đều giống lách; thà mù và nói ra | ghi thành mục 7 ý 3, kèm lệnh để chủ shop tự kiểm |
| 10/09/2026 | **Rút lại** kết luận "đổi slug làm mất 56 khách/tháng" trước khi viết vào hồ sơ | dựng bài đối chứng thì thấy nó tụt y hệt — nguyên nhân là sự kiện toàn site, không phải slug | xem mục 11 |
| 10/09/2026 | Xếp **xoay khoá đã lộ** trên **sửa blog**, dù blog mới là việc sinh tiền | bảo vệ trước chăm sóc trước phát triển; mất mát thì vĩnh viễn, tăng trưởng thì còn cơ hội sau | thứ tự ở mục 8 |
| 10/09/2026 | Báo lại rằng token **hết hạn 23/09/2026**, không phải 10/2026 như chủ shop nói, và **có quyền admin**, không phải chỉ đọc | chủ shop đang tính kế hoạch dựa trên một thông tin sai | đã ghi ở mục 4 |

---

## 11. Hiểu biết tích luỹ

### 14/09/2026 · Luật quà đã kiểm trên PRODUCTION, không tạo đơn nào

Dựng hai dạng combo bằng API quản trị rồi thử bằng `POST /orders/tinh-tien` —
endpoint đó chạy **đúng cùng hàm** `tinhTien()` mà lúc tạo đơn gọi, trả đủ dòng
quà, nhưng không ghi đơn. Không vi phạm luật "không đặt đơn thật".

Ba bản ghi tạo ra đều **ẩn khỏi gian hàng**, xác nhận bằng đo: `/api/products`
vẫn trả đúng 11 sản phẩm như trước.

```
quà      isGift=true    -> products.service lọc `is_gift = false`
hai chủ  isActive=false -> ẩn, nhưng dinhGia() vẫn tra được giá
```

Kết quả trên production:

```
dạng 1 · mua 1   80.000đ  ship 15.000đ  không quà, thiếu 20.000đ để miễn
dạng 1 · mua 2  160.000đ  MIỄN PHÍ      1 quà
dạng 1 · mua 4  320.000đ  MIỄN PHÍ      VẪN 1 quà (không nhân bội)
dạng 2 · mua 1   55.000đ  MIỄN PHÍ      1 quà  <- ca freeship có tác dụng thật
hai luật cùng lúc                       2 quà, gộp đúng
```

Ba đòn tấn công đều bị chặn:

- gửi kèm dòng quà giả x5 -> máy chủ vứt, chỉ giữ 1 quà theo luật của nó
- gửi **ghế 3,85tr** dưới dạng dòng quà -> **biến mất hoàn toàn** khỏi kết quả
- gửi ghế giá 0 mà không gắn cờ -> máy chủ tự tra, tính đủ 3.850.000đ

Bài học vẫn cũ nhưng lần này có bằng chứng: **nguồn sự thật duy nhất về tiền**
nằm ở `tinhTien()`, và mọi thứ trình duyệt gửi lên đều là gợi ý chứ không phải
dữ kiện. Giữ nguyên tắc đó thì thêm tính năng tiền bạc mới không sinh lỗ mới.

### 14/09/2026 · Hỏi định nghĩa trước khi vẽ giải pháp

Chủ shop hỏi "có nên tạo block UI cho combo không". Tôi đi thẳng vào giải pháp:
sửa ô nhập `comboItems`, tách khối "Bộ sản phẩm bao gồm"... Chủ shop cắt ngang:
**"combo là gì? định nghĩa trước"**.

Đo lại thì lộ ra thứ đáng lẽ phải thấy từ đầu: chữ "combo" đã được cài **ba
lần, ba hình dạng khác nhau, cả ba đều rỗng** — danh mục `Combo` 0 sản phẩm,
cờ `isCombo` 0/11, khối `combo` gõ tay 0 lượt dùng. Ba lần cài mà không lần nào
có nội dung là dấu hiệu kinh điển của việc **chưa ai định nghĩa nó**.

Và định nghĩa thật của chủ shop không phải thứ nào trong ba: combo là **luật
khuyến mãi trên giỏ**, không phải một món hàng. Toàn bộ hướng tôi vẽ ra trước
đó là sai — không sai chi tiết, mà sai chỗ đặt chân.

Bài học: khi một khái niệm đã có nhiều bản cài trong mã mà bản nào cũng rỗng,
**đừng chọn bản nào để sửa**. Hỏi định nghĩa.

### 14/09/2026 · Thổi một chỗ chỉnh chữ thành lỗi trung thực

Tôi báo đã tìm ra "một lỗi nói dối với khách": cờ `mienPhiDoQua` bật cả khi đơn
đã tự vượt ngưỡng tiền, nên giao diện ghi "MIỄN PHÍ (theo ưu đãi)" trong khi
ưu đãi không liên quan.

Chủ shop bác ngay: *"đâu có nói dối, chính sách là trên 100k thì miễn phí mà"*.
Kiểm lại phạm vi thì cờ đó **không chạm vào tiền ở bất kỳ đâu** — nó nối tới
đúng một hậu tố trong một dòng chữ. Khách được miễn ship thật trong cả hai
trường hợp. Không ai mất gì.

Đã bỏ hẳn cả cờ lẫn hậu tố, và **sửa lại commit message** vì chúng đang mang
đúng khẳng định sai đó — commit là trí nhớ của dự án, để nguyên thì sáu tháng
nữa có người đọc và tin.

Bài học: trước khi gọi một thứ là lỗi, **đo xem nó chạm tới đâu**. Một cờ chỉ
nối tới một dòng chữ thì dù sai cũng là việc chỉnh chữ, không phải lỗi trung
thực. Gọi to hơn thực tế làm loãng những lần báo động thật.

### 14/09/2026 · Repo không có khung kiểm thử, nhưng đường tiền thì vẫn phải kiểm

Luật quà tặng quyết định **cho hàng rời kho miễn phí** và **khách trả bao nhiêu
tiền ship**. Repo `17fishing-BE` không có jest, không có spec nào.

Dựng cả jest cho một tính năng thì nặng hơn thứ cần bảo vệ; để trống thì cũng
sai. Cách đã chọn: tách phần quyết định thành hàm **thuần** (`chonQua`), rồi
nặn một thể `OrdersService` và gán bốn phụ thuộc giả — không cần Postgres,
không cần `.env`, chạy một giây.

`npm run kiem-qua` · 35 phép kiểm. Hai phép từng báo hỏng: một là lỗi kỳ vọng
của chính tôi (quên 2×85k = 170k đã vượt ngưỡng), một là chỗ chủ shop bác ở
trên. Cách này dùng lại được cho mọi luật tiền về sau.

### 14/09/2026 — nối Search Console và dựng khuôn block

**Search Console: property là loại TIỀN TỐ URL.** `GSC_SITE_URL` phải là
`https://17-fishing.com/` kèm gạch chéo cuối. Khai `sc-domain:` thì Google báo
thiếu quyền — câu báo nói về quyền nhưng gốc rễ là gọi nhầm tên property. Mất một
vòng đi tìm nhầm chỗ. Đã thêm `GET /admin/keywords/gsc-site` để lần sau phân biệt
được ngay.

**Trang sản phẩm KHÔNG yếu — tôi đã chẩn đoán sai.** Trước khi có số liệu, tôi
suy từ việc công cụ tra web không thấy trang sản phẩm và nghiêng về giả thuyết
"chưa vào chỉ mục". Số liệu thật ngược lại: 8/11 trang sản phẩm có hiển thị, CTR
9,0% so với blog dưới 1%, ghế Zhongzhou hạng 3,2. **Bài học: công cụ tra dùng chỉ
mục Mỹ, vắng mặt ở đó không phải bằng chứng.**

**Ba lỗi đều cùng một họ: hai nơi khai cùng một thứ.**
- `loading.tsx` phủ Suspense sang `[slug]` → mọi slug sai trả 200 kèm nội dung 404
- `normalizeProduct(null)` cho object truthy → `if (!product)` không bao giờ chạy
- khai báo block ở backend, bảng dựng ở web → quên một bên thì hỏng IM LẶNG

Lỗi thứ ba nay có hai lớp chặn: kho hiện cảnh báo đỏ, và `npm run kiem-khoi`.

**Trang công cụ tự đếm mình thành khách.** Khung xem trước và kho giao diện dựng
trang thật nên ghi lượt xem — chiếm 10,1% tổng lượt 5 ngày, `/xem-truoc` leo lên
đường dẫn nhiều lượt thứ NĂM. Tự tôi gây ra khi dựng khung xem trước. Đã chặn và
dọn 25 dòng.

**Kiến trúc khuôn: nhóm giữ dữ liệu, block chỉ là cách bày.** Bản đầu tôi cho mỗi
block một khoá dữ liệu riêng — thêm biến thể để so sánh là nó hiện ra trống trơn.
Vá bằng "trỏ về block gốc" vẫn sai vì bất đối xứng: block gốc không biết biến thể
cần thêm ô nào. Chỉ khi tách hẳn khái niệm NHÓM ra mới đúng.

**Đo responsive bằng Chrome không đầu.** 13 trang hai shop, hai khổ 390 và 360px.
Đúng một trang hỏng: `/blog` GaRutin tràn 8px vì hàng phân trang thiếu `flex-wrap`
— 69 bài chia 6 trang nên hàng nút số vượt 360px. Ảnh chụp KHÔNG dùng được để đo,
vì nó cắt đúng khung.

**Lỗi quy trình của tôi:** một lần đẩy mã hỏng lên `main` vì nối `tsc` và `push`
trong cùng chuỗi lệnh — `push` chạy bất kể `tsc` đã lỗi. Vercel dựng hỏng nên bản
chạy thật không sao, nhưng nếu là lỗi chạy chứ không phải lỗi biên dịch thì đã lên
production. **Tách bước kiểm khỏi bước push.**


*Chỉ thêm, không xoá. Sai thì viết đính chính bên dưới, giữ nguyên dòng cũ.*

### 10/09/2026 · Suýt đổ lỗi cho thứ dễ thấy nhất — cứu bởi một bài đối chứng
**Điều đã biết:** Bài `nhung-dieu-can-biet-ve-phao-ho-dau-khi-cau-tram-den` bị
đổi slug ngày 07/09, không có 301, và có 56 khách/30 ngày đâm vào 404. Tôi đã
gần như viết "đổi slug làm mất 56 khách/tháng". Trước khi viết, tôi cắt cửa sổ
đo thành bốn đoạn và **thêm một bài đối chứng không bị đổi slug**:

```
                        12–21/08   22–31/08   01–06/09   07–10/09
phao-ho-dau (đổi slug)      2         43         12          1
buoc-luoi-cau (đối chứng)  10         91          2          1
```

Bài đối chứng tụt **y hệt**. Nguyên nhân là một **sự kiện lưu lượng toàn site**
cuối tháng 8 rồi tắt, không phải cái slug.
**Biết bằng cách:** `admin/analytics/table` chạy trên bốn cửa sổ hẹp thay vì một
cửa sổ 30 ngày, và luôn kèm ít nhất một đối chứng.
**Hệ quả về sau:** ở tài sản này, **mọi so sánh trước–sau phải có đối chứng**.
Số tổng 30 ngày che được cả một sự kiện lớn lẫn một xu hướng ngược chiều. *(Việc
thiếu 301 vẫn là việc phải làm — chỉ là lý do khác: giữ URL cũ khỏi chết, không
phải cứu 56 khách.)*

### 10/09/2026 · Một ngày làm hỏng mọi số trung bình
**Điều đã biết:** 28/08/2026 có 247 lượt — 19% của cả tháng. 87 người vào đúng
một bài, mỗi người một lượt, 79% từ điện thoại, dồn vào 12–16h, nguồn "direct".
Đó là chữ ký của một link chia sẻ vào Zalo/Facebook, không phải tăng trưởng.
**Biết bằng cách:** `admin/analytics/visits` xem `timeline` theo ngày trước khi
đọc `total`, rồi bổ ra ngày bất thường bằng `table` + `sources` + `hours` của
đúng một ngày.
**Hệ quả về sau:** với 464 khách/tháng, **luôn nhìn biểu đồ ngày trước khi nói
bất cứ câu nào về tháng**.

### 10/09/2026 · HTTP 200 ở đây không có nghĩa là "có"
**Điều đã biết:** `GET /api/products/<slug không tồn tại>` trả **200 kèm 0 byte**,
không phải 404. Tôi đã dùng `curl -o /dev/null -w "%{http_code}"` và kết luận
nhầm hai lần rằng bài viết và sản phẩm đã xoá vẫn còn sống.
**Biết bằng cách:** thêm `%{size_download}` vào mọi phép kiểm, hoặc nhìn thân
phản hồi.
**Hệ quả về sau:** chuỗi lỗi này còn kéo lên tới web — `/san-pham/<không tồn tại>`
trả 200 chứ không 404, đúng vì `fetchApi` thấy `res.ok` rồi đi tiếp. Một quy ước
sai ở tầng API đẻ ra một lỗi SEO ở tầng web.

### 10/09/2026 · Kiểm tra chéo hai bên, đừng giả định hai shop giống nhau
**Điều đã biết:** `tracking.service.ts` hai shop **khác nhau thật**: 17fishing
dùng `COALESCE(v.visitor_id, v.ip)` cho khách duy nhất, GaRutin dùng `visitor_id`
thuần. Và GaRutin đã gắn cờ trang 404 để bộ đo bỏ qua — **17fishing thì chưa**.
**Biết bằng cách:** đọc thẳng `src/tracking/tracking.service.ts` dòng 16, 31,
554, 662 thay vì tin `CLAUDE.md` chung.
**Hệ quả về sau:** **không được so số "khách duy nhất" của hai shop với nhau.**
Và mỗi lần sửa một bên phải mở tệp bên kia ra xem, đừng giả định.

### 10/09/2026 · Chỗ nguy hiểm nhất là chỗ chưa ai nhìn — nhưng ở đây nó đã có người nhìn
**Điều đã biết:** Ở GaRutin, rủi ro lớn nhất là *không có* cơ chế sao lưu.
Ở 17fishing có hẳn `backup-db.sh` + `restore-db.sh` + `BACKUP.md` viết rất kỹ,
có diễn tập phục hồi thật. Nhưng rủi ro lớn nhất lại **dịch sang chỗ khác**:
khoá R2 và mật khẩu CSDL nằm cứng trong 6 tệp đã push từ 19/04/2026.
**Biết bằng cách:** `grep -rn -E "(secretAccessKey|postgresql://[^']*:[^@']+@)" scripts/ src/`
rồi `git ls-files` để xem tệp có bị theo dõi không.
**Hệ quả về sau:** đừng mang kết luận từ tài sản anh em sang. Hai hệ thống song
song có **cùng bộ rủi ro nhưng khác chỗ hở**. Chạy lại giai đoạn "mất gì thì
không lấy lại được" từ đầu cho từng tài sản.

### 10/09/2026 · Kho học nghề tốt nhất có khi lại là của người khác
**Điều đã biết:** 93/104 bài blog **chép từ `vietnam-fishing.com`**, chỉ 11 bài
là của chủ shop. Nghĩa là "học nghề từ chính tài sản" ở đây phần lớn là học từ
đối thủ, và mọi giọng văn / quan điểm trong 93 bài đó **không phải quan điểm của
chủ shop** — không được trích dẫn chúng như thể chủ shop đã nói.
**Biết bằng cách:** trường `sourceUrl` trên bảng `posts`, và `scripts/crawl-posts.mjs`.
**Hệ quả về sau:** khi cần biết "shop này nghĩ gì", chỉ đọc 11 bài không có
`sourceUrl` và 13 mô tả sản phẩm. Khi cần biết "ngành này nói gì", đọc cả 104.

### 10/09/2026 · Đọc số tổng của phễu thì thấy đứng yên; bổ theo giá thì thấy hai thị trường
**Điều đã biết:** "80 lượt xem → 8 thêm giỏ" nghe như một phễu yếu đều. Bổ theo
giá thì hoá ra là hai thế giới: **toàn bộ 8 lượt thêm giỏ đến từ hàng ≤150.000đ**,
còn 39 lượt xem hàng 1,55–3,85 triệu cho ra **0**. Đó không phải lỗi trang web —
đó là cách ngành này vận hành: đồ đắt chốt bằng nói chuyện, không bằng nút.
**Biết bằng cách:** ghép `admin/analytics/product-funnel` với bảng giá của
`/products`.
**Hệ quả về sau:** với shop đồ câu, **đừng đo trang sản phẩm đắt tiền bằng tỉ lệ
thêm giỏ.** Thước đo đúng cho nhóm đó là "có bao nhiêu người bấm Zalo" — và hiện
**chưa ai đo cái đó**. Đây là chỉ số nên xây trước mọi tối ưu khác.

### 10/09/2026 · Về cách chủ shop làm việc
**Điều đã biết:** Chủ shop tự làm tất cả: chủ, lập trình viên, người viết nội
dung, người chốt đơn. Ưu tiên đã nêu rõ trong `~/my-project/CLAUDE.md`:
**sản phẩm + review > bài viết SEO > vận hành**. Kỵ nghe hứa hẹn doanh thu. Đã
hai lần phải xoay khoá vì lộ bí mật — nên chuyện khoá là **chỗ nhạy cảm, nói
gọn, đừng giảng giải**. Chú thích trong mã có mật độ cao bất thường và đó là cố
ý: chúng ghi *vì sao* và ghi cái bẫy, không mô tả lại điều mã đã nói.
**Hệ quả về sau:** trả lời đúng câu được hỏi trước, đề xuất mở rộng sau và phải
ngắn. Và **đọc chú thích trong mã trước khi kết luận** — nhiều thứ trông như lỗi
đã được cân nhắc và giải thích ngay tại chỗ (ví dụ: hai cột `purchaseCount` /
`bonusPurchaseCount` tách nhau là cố ý, không phải nhầm).

### 15/09/2026 · serper.dev không trả "Mọi người cũng hỏi" và "Tìm kiếm liên quan" — đã gỡ

**Điều đã biết:** Chức năng khám phá từ khoá thiết kế ba nguồn: Google
Autocomplete (miễn phí) cộng hai khối mua qua serper.dev. Hai khối mua tiền
**luôn trả về mảng rỗng**.

**Biết bằng cách:** gọi thẳng `https://google.serper.dev/search` từ chính máy
chủ, bốn truy vấn:

| truy vấn | organic | peopleAlsoAsk | relatedSearches |
|---|---|---|---|
| gà rutin | 6 | 0 | 0 |
| nuôi gà cảnh | — | 0 | 0 |
| câu cá | — | 0 | 0 |
| cách nuôi gà | — | 0 | 0 |

Phản hồi chỉ có ba trường cấp một: `searchParameters`, `organic`, `credits`.
"Câu cá" là truy vấn rộng, chắc chắn có khối "Tìm kiếm liên quan" khi tìm bằng
trình duyệt — nên đây không phải chuyện ngách hẹp. Tài liệu serper ghi hai
trường đó chỉ xuất hiện "khi có", và đã có người dùng khác báo chúng luôn rỗng.

**Đã loại trừ trước khi kết luận** (mất khá nhiều vòng, ghi lại để khỏi lặp):
khoá đúng và còn hạn mức (40 ký tự, gọi thẳng ra HTTP 200); mã nguồn đúng bản
mới trên máy chủ; bản biên dịch trong `dist` có thay đổi; tiến trình đã khởi
động lại. Từng nghi `pm2 restart` không nạp `.env` mới — **sai**: app dùng
`ConfigModule.forRoot()`, tức dotenv tự đọc tệp mỗi lần tiến trình khởi động,
nên `--update-env` là thừa.

**Đã làm:** gỡ hai kênh `cau-hoi` và `lien-quan`. Giữ lại thì mỗi lần gọi tốn
một credit để nhận về hai con số 0.

**Hệ quả về sau:** đừng thử lại. Autocomplete là nguồn chính và vẫn chạy tốt,
không cần khoá nào.

### 15/09/2026 · Cùng lời gọi đó lại trả lời được câu đắt hơn nhiều

**Điều đã biết:** `organic` luôn đầy đủ. Đó chính là thứ Search Console không
bao giờ cho biết: mình đứng hạng 9 **giữa những ai**.

Hai trang một khác nhau cho cùng một con số hạng, mà dẫn tới hai kế hoạch
ngược nhau:

- toàn Shopee, TikTok, Facebook → Google xếp theo **loại trang**, không theo
  chất lượng bài. Viết thêm nội dung không kéo được hạng. Việc đúng là bỏ từ
  khoá đó, dồn sang truy vấn có ý định cụ thể hơn.
- toàn blog và shop nhỏ → với tới được, đáng đầu tư.

**Đã làm:** `POST keywords/doi-thu` (tối đa 10 từ mỗi lượt vì trần 30 giây của
CloudFront) và `GET keywords/hang-dau`. Không lưu CSDL, không migration — SERP
hết hạn nhanh, lưu lại chỉ tạo ra bảng số cũ mà ai đọc cũng tưởng là hiện tại.
28 phép kiểm cho phần thuần ở `kiem/doi-thu.ts`.

**Hệ quả về sau:** trước khi đề xuất đầu tư vào bất kỳ từ khoá nào, đọc trang
một của nó đã. Chi phí một credit trên hạn mức 2.500.


---

*Hồ sơ này do người quản lý lập và tự cập nhật. Sửa số thì sửa kèm ngày đo và
kèm lệnh đã dùng. Mọi số ở đây đo ngày 10/09/2026 — đọc sau tháng 10/2026 thì
coi như đã cũ.*
