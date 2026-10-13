# Bẫy Shopify đã trả giá — repo `shop-christmasspin`

Ghi ngày 13/10/2026, trong lúc dựng store đầu tiên.

---

## 🔴 `shopify theme check` ở máy KHÔNG bắt được lỗi mà máy chủ từ chối

Đây là bẫy nền. Chạy `theme check` ra **0 lỗi**, đẩy lên thì Shopify trả
`"The theme was pushed with errors"`. Theme vẫn lên, chỉ là **tệp lỗi bị bỏ
qua im lặng** — trang vẫn hiện, chỉ thiếu mất một khối.

Cùng họ với bẫy đã trả giá ở 17fishing: lược đồ ở máy khác lược đồ
production, và phép kiểm ở máy càng nhiều thì càng tự tin sai.

**Quy tắc:** sau mỗi `theme push`, đọc JSON trả về và tìm khoá `errors`.
Đừng nhìn thấy `"role":"unpublished"` rồi cho là xong.

```bash
shopify theme push --store X --theme Y --no-input --json \
  | grep -vE '"type":"progress"' | tail -3
```

### Ba lỗi cụ thể đã dính

| lỗi | thông báo | cách đúng |
|---|---|---|
| `range` bước 0.05 | `Value is not divisible by 0.1` | bước phải chia hết cho 0,1 |
| `{% stylesheet %}` trong `{% unless %}` | `'stylesheet' tag must not be nested inside other tags` | CSS ra `assets/custom.css`, không để trong snippet có điều kiện |
| Liquid nhiều bộ lọc trong block `text` | `Dynamic source must not use more than 1 filter` | tách thành block riêng trong `blocks/` |

Lỗi 1 `theme check` bắt được. **Lỗi 2 và 3 thì không** — chỉ máy chủ mới thấy.

---

## Bịa tên thiết lập thì không báo lỗi, chỉ im lặng không chạy

Đặt `custom_class` vào block `group` để bám CSS. Horizon **không có** thiết
lập đó. Không lỗi, không cảnh báo, JSON vẫn lưu, CSS chỉ là không bao giờ
bám được.

**Quy tắc:** trước khi dùng một thiết lập, đọc `{% schema %}` của chính block
đó. Lệnh dò nhanh:

```bash
sed -n '/{% schema %}/,/{% endschema %}/p' blocks/<ten>.liquid \
  | grep -oE '"id":\s*"[a-z_]+"'
```

**Cách bám CSS đúng:** theo id section (`[id$="__steps"]`), vì id là do mình
đặt trong `templates/*.json` nên không tự đổi, còn class của theme thì đổi
theo bản cập nhật.

---

## `shop.shipping_policy` không phải "supported resource"

Trong tệp JSON của section, `{{ shop.refund_policy.url }}` qua được nhưng
`{{ shop.shipping_policy.url }}` bị từ chối. Đừng gõ tay danh sách chính
sách — khối `footer-policy-list` có sẵn đã tự liệt kê đủ.

---

## `shopify theme pull` vào thư mục rỗng đòi `--force`

CLI không nhận ra thư mục rỗng là thư mục theme. Báo
`This command must run from a theme directory`. Thêm `--force`.

---

## Dawn tải về CÒN NGUYÊN `.git` trỏ về repo của Shopify

`shopify theme init` để lại `.git` gốc. Không gỡ thì mọi lệnh git trong đó
đều thao tác trên repo Dawn của Shopify. Gỡ ngay sau khi tải.

---

## Việc đầu tiên luôn là `theme list`, không phải `theme init`

Tôi tải Dawn về trước rồi mới phát hiện store chạy **Horizon**. Mất một vòng.
Thứ tự đúng: `auth login` → `theme list` → `theme pull`.

---

## 🔴 `theme push` XOÁ app embed mà không cảnh báo

Trả giá 13/10/2026. Chủ shop bật App Embed cho Judge.me và Kaching trong
theme editor. Shopify ghi lựa chọn đó vào `config/settings_data.json`
**trên máy chủ**, mục `current.blocks`. Bản ở máy không có mục đó, và
`theme push` ghi đè toàn bộ tệp.

Đo được: trước khi push `kaching=21 judge=50` dấu vết trong HTML; sau khi
push còn `0` và `1`. Hai app vẫn hiện "đã cài" trong admin, chỉ là không
còn chạy trên mặt tiền. **Không có cảnh báo nào.**

**Luật: trước MỌI `theme push`, kéo tệp đó về trước.**

```bash
shopify theme pull --only config/settings_data.json -e live
```

Cùng họ với bẫy `git pull` trên máy chủ deploy của 17fishing: hỏng âm thầm,
nằm im cho tới đúng lần nó cắn.

**Khôi phục nếu lỡ mất:** mã block nằm trong HTML đã chụp trước đó, dạng
`<!-- BEGIN app block: shopify://apps/<app>/blocks/<block>/<uuid> -->`.
Thêm lại vào `current.blocks` với khoá chính là uuid đó, `disabled: false`.

---

## `richtext` của Horizon chỉ nhận năm loại thẻ

Thiết lập `text` của block `text` là kiểu `richtext`. Nó **chỉ cho**
`<p> <ul> <ol> <h1>`–`<h6>`. Đẩy lên bằng `<table>` bị từ chối thẳng:

```
Setting 'text' is invalid. All top level nodes must be '<p>', '<ul>', '<ol>'
or '<h1>'-'<h6>' tags, Tag '<table>' is not permitted
```

Cùng họ với bẫy `richtext` chỉ cho **một** bộ lọc Liquid. **Quy tắc:** cần
bảng, cần tính toán, hay cần thẻ lạ thì tách thành block riêng trong
`blocks/`, đừng cố nhét vào `text`.

---

## So sánh trang phải chụp TOÀN TRANG, đừng nhìn phần đầu

Ngày 13/10 tôi báo trang sản phẩm "đã bám mẫu" sau khi soi ảnh chụp phần
trên. Chủ shop nói không giống. Chụp lại toàn trang thì lộ ra:

```
mẫu   1618 × 9307 px
mình  1270 × 2420 px
```

Thiếu hẳn sáu khối ở nửa dưới. **Phép kiểm rẻ nhất là so CHIỀU CAO trang.**
Lệch quá 1,5 lần thì chắc chắn thiếu khối, khỏi cần soi từng chỗ.

---

## Khi cần sao giao diện: xin bản "Save page as", đừng đo bằng ảnh

Ngày 13/10/2026 tôi đo giao diện cửa hàng mẫu bằng `getComputedStyle` qua
CDP — mất bốn vòng mới lên 93%, và vẫn sót lỗi huy hiệu đè lên giá.

Rồi chủ shop tải **toàn bộ trang bằng "Save page as"**. Tệp đó:

- lưu **DOM sau khi JS đã chạy**, nên có nguyên mã của widget do app dựng
- **nhúng cả CSS ngoài vào trong** — 164 KB CSS của Kaching nằm trong
  `<style>`, đọc được từng biến thiết kế

Đọc ra ngay bộ token chính xác: `--bar-border-radius: 8px`,
`--bar-label-font-weight: normal`, `--bar-most-popular top: -8px`, nút radio
làm bằng `box-shadow` chứ không bằng `border`…

**Quy tắc:** cần sao giao diện của một trang thì việc ĐẦU TIÊN là xin bản
lưu đầy đủ. Ba phút đọc tệp bằng cả buổi đo computed style, và nó cho cả
những thứ phép đo không với tới — cơ chế dựng, tên biến, giá trị mặc định.

`getComputedStyle` vẫn cần, nhưng để **kiểm lại sau khi áp**, không phải để
dò từ đầu.

---

## Trong Liquid, `assign` KHÔNG đè được biến của vòng `for`

Ngày 13/10/2026, dòng quà tặng trong `bundle-picker.liquid`:

```liquid
{%- for g in qua -%}
  {%- liquid
    assign dau = g | slice: 0
    if dau == '*'
      assign nhan_qua = true
      assign g = g | remove_first: '*' | strip   # KHÔNG ăn
    endif
  -%}
  {{ g }}   {# vẫn in ra "*Christmas Music Disc Set" #}
```

Biến vòng lặp nằm ở **phạm vi con** và che biến cùng tên do `assign` tạo ra,
nên `assign g` ghi một chỗ mà `{{ g }}` đọc một chỗ khác.

Độc ở chỗ **hỏng một nửa**: `nhan_qua` là tên mới nên chạy đúng, dấu `*` vẫn
còn. Ra kết quả `+ 1x *Christmas Music Disc Set` — logic đúng, chữ sai, không
có lỗi nào được ném.

**Quy tắc:** trong thân `for`, muốn sửa giá trị thì gán sang **tên khác**.

---

## Giá món bán kèm trong bundle phải nhân theo gói — và không phải món nào cũng nhân

Ngày 13/10/2026 chủ shop báo "chọn bundle thì giá không được cập nhật". Đo
cả hai trang bằng CDP, chọn lần lượt ba gói rồi đọc `innerText` của từng
thanh — chênh lệch hiện ra ngay:

| Buy 2 | mẫu | của tôi (lúc lỗi) |
|---|---|---|
| Priority Shipping | `+ Priority Shipping` · 159.000₫ | `+ 2x` · $6.00 |
| Christmas Mystery Gift | `+ 2x` · 1.058.000₫ (=529×2) | `+ 2x` · $20.00 |
| Lifetime Warranty | `+ 2x` · 528.000₫ (=264×2) | `+ 2x` · $10.00 |

Hai điều học được:

1. **Nhãn ghi "2x" mà giá là giá một cái** — khách cộng nhẩm ra số khác số
   trên nút. Giá phải nhân cùng lúc với nhãn, cùng một biến.
2. **Không nhân đều.** Mẫu để Priority Shipping luôn 1 suất (một đơn giao một
   lần), còn quà và bảo hành thì nhân. Dòng quà cũng thế: `+ 2x Christmas
   Music Disc Set (FREE)` nhưng `+ 180 Day Warranty (FREE)` không có "2x".

Nay mỗi món bán kèm có ô `upsellN_nhan`, dòng quà đánh dấu bằng `*` đầu dòng.
Số lượng gửi lên `/cart/add.js` đọc từ `data-sl` do Liquid tính sẵn, **không
tính lại trong JS** — tính hai nơi thì sớm muộn lệch, và khách chỉ thấy ở
bước thanh toán.

**Cách đo lại:** `scratchpad/dochu.mjs` — chọn từng gói rồi in `innerText`
của cả ba thanh. Nhớ `scrollIntoView` rồi **chờ ~1,2 giây mới lấy toạ độ**;
lấy toạ độ ngay sau lệnh cuộn thì bấm trượt và trạng thái không đổi, trông y
như trang bị liệt.

---

## Ẩn nút mua của theme thì nhớ THANH DÍNH vẫn dùng ô số lượng đó

Cùng ngày 13/10/2026, ngay sau khi vá giá món bán kèm. Khối bundle ẩn ô số
lượng và nút mua của theme, nhưng **thanh dính ở đáy màn hình thì vẫn hiện**
— và nó đọc số lượng từ đúng ô vừa bị ẩn.

Đo: chọn **Buy 3**, thanh dính vẫn ghi `Add to cart (1)`, bấm vào chỉ thêm
**1 cái** vào giỏ. Khách tưởng đã mua ba.

Hỏng lặng lẽ và ở chỗ khó thấy nhất: lúc dựng thì cuộn quanh khối bundle, mà
thanh dính chỉ hiện khi đã cuộn qua nút mua. Không có lỗi, không có cảnh báo,
chỉ có đơn ít hơn khách định mua.

Cách vá: khi chọn gói thì đẩy số lượng sang ô của theme **và bắn sự kiện**
`quantity-selector:update`. Thanh dính nghe sự kiện chứ không đọc lại ô nhập,
nên đặt `value` thôi là chưa đủ.

Và phải dùng `Event` trần rồi gán `.detail`, đúng như `assets/events.js` của
Horizon làm. `CustomEvent` để `detail` ở chỗ khác, thanh dính đọc ra
`undefined`.

**Quy tắc:** ẩn một điều khiển của theme thì đi tìm xem **còn ai đang đọc
nó**. `grep` tên trường (`quantity`) trong `assets/` trước khi tin là đã ẩn
xong.

---

## Horizon: `group` không in id ra class, và `mobile-column` đổi panel sang `display: grid`

Ngày 13/10/2026, khi biến ba khối thành dải trượt ngang. Hai bẫy nối nhau.

**Bẫy 1 — không có selector để trỏ vào một nhóm.** Text block in id ra class
(`text-block--AdFRTVkpvTkV6clR0a__eb1`), nên `[class*="__eb1"]` bắt được.
Nhưng `group` thì **không**: nó chỉ có
`group-block group-block--height-fit group-block--width-fill …`. Id của nhóm
cũng không nằm trong HTML dưới bất kỳ dạng nào — đã `grep` cả trang.

Cách đi vòng: bắt qua text block con bằng `:has()`.

```css
.group-block-content:has(> .group-block [class*="__s1n"]) { … }
```

Đừng bắt theo `:nth-child` — vỡ ngay lần đầu chủ shop kéo thả lại thứ tự.

**Bẫy 2 — `flex-direction` đúng mà vẫn xếp dọc.** Lớp `mobile-column` chuyển
panel sang **`display: grid`** một cột ở màn hình nhỏ. Lúc đó:

- biến `--flex-direction` là `row` ✓
- `flex-direction` tính ra `row` ✓
- mỗi thẻ nhận `flex: 0 0 86%` ✓
- **ba thẻ vẫn xếp dọc**, vì trong lưới thì cả hai thuộc tính đó vô nghĩa

Soi computed style từng thuộc tính thì không thấy gì sai cả — mọi thứ đều
đúng như mình đặt. Phải nhìn `display` trước mới vỡ ra.

**Quy tắc:** trước khi chỉnh `flex-*`, in `display` ra trước. Và khi một thuộc
tính "đã đặt đúng mà không có tác dụng", hỏi xem **mô hình bố cục có còn là
cái mình tưởng không**, đừng tăng độ ưu tiên selector.

**Bẫy 3 — hộp cuộn được mà căn giữa thì mở ra đã nằm giữa dải.** Nhóm đang
`justify-content: center`; nội dung tràn thì tràn **đều hai bên**, nên
`scrollLeft` ban đầu nằm ở giữa. Khách mở trang thấy thẻ thứ hai và hai mảnh
cắt hai bên — trông như vỡ giao diện. Đo được: thẻ đầu ở `x = -277`.
Phải ép `justify-content: flex-start`.

Nhớ thêm: biến `--flex-direction` nằm **thẳng trong thuộc tính `style`** của
thẻ, nên mọi thứ đè lên nó đều cần `!important`.

---

## `custom.css` từng bị dán TRÙNG cả một vùng — bản cũ nằm sau nên thắng

Ngày 13/10/2026, khi chủ shop bảo "bundle thiết kế hơi xấu". Mở `custom.css`
ra thì ba section `TRANG SAN PHAM / BANG SO SANH / KHOI CHON GOI` có **hai bản**:
dòng 392–794 và dòng 795–1178. Cùng bộ selector y hệt nhau.

Bản sau dùng token cũ (`--x-do`, `--x-muc`), bản trước dùng token đo được từ
Kaching (`--bar-bo`, `--bar-vien`). CSS thì **bản nào nằm sau thắng**, nên
toàn bộ công đo đạc ở bản trước đang bị bản cũ đè một phần.

Hỏng lặng lẽ tuyệt đối: trùng selector không sinh lỗi, không cảnh báo, chỉ có
giao diện sai một cách khó giải thích.

**Dấu hiệu nhận ra:** sửa một thuộc tính trong CSS mà trang không đổi gì, hoặc
đổi ít hơn mong đợi. Lúc đó `grep -n` tên selector xem nó được khai mấy lần.

---

## Khai `display` một kiểu, trình duyệt tính ra kiểu khác — hai lần trong một ngày

Cùng ngày 13/10/2026, hai lần, hai nguyên nhân khác nhau:

1. **`.group-block-content`**: khai `flex-direction: row`, computed cũng là
   `row`, nhưng `display` là **`grid`** (do lớp `mobile-column` của Horizon).
   Mọi thuộc tính flex thành vô nghĩa.
2. **`.bp__them`**: khai `display: grid`, computed ra **`inline-flex`**. Thẻ
   này là `<label>`, và Horizon đặt kiểu cho `label` trong
   `compiled_assets/styles.css` — tệp đó **nạp SAU `custom.css`** nên thắng.
   `grid-template-columns` vô nghĩa, bố cục đang là ngẫu nhiên.

**Quy tắc:** mọi lần chỉnh `flex-*` hay `grid-*`, in `display` ra trước. Và
nhớ thứ tự nạp: `custom.css` → rồi mới `compiled_assets/styles.css`, nên style
của theme thắng trừ khi dùng `!important`.

---

## "Có chiều cao" KHÔNG phải là "nhìn thấy được"

Phép kiểm thanh dính dùng `r.height > 0` để kết luận thanh đang hiện, rồi bấm
vào tâm nó. Ngày 13/10/2026 sau khi bố cục đổi, thanh nằm ở `y = 895` trên
khung nhìn cao **844** — tức là dưới mép màn hình. Cú bấm rơi ra ngoài, giỏ
hàng rỗng, và báo cáo trông y như "trang vừa hỏng".

Mất một vòng đi tìm lỗi không tồn tại trong mã vừa sửa.

**Quy tắc:** trước khi bấm bằng toạ độ, khẳng định phần tử **nằm trong khung
nhìn**: `r.y >= 0 && r.bottom <= innerHeight`. Và khi một phép kiểm chuyển từ
xanh sang đỏ ngay sau một thay đổi CSS thuần, nghi phép kiểm trước, nghi mã sau.

---

## Video: bốn bẫy liên tiếp trong một lần thêm một đoạn 10 giây

Ngày 13/10/2026, thêm video vào khối "SEE IT IN ACTION".

**1. Tệp gốc là HEVC — Chrome và Firefox không phát được.** Dò hộp MP4 thì ra
`stsd/hvc1`, 1080×1920, brand `qt`: quay thẳng từ iPhone, chưa mã hoá cho web.
Dấu hiệu nhận ra: `<video>` đọc được `duration` nhưng `videoWidth = 0`.

Đừng dán thẳng URL. **Đẩy lên Shopify Files dạng `VIDEO`** thì Shopify tự
chuyển mã sang H.264 ở 480p/720p/1080p kèm HLS. Dạng `FILE` thì nó giữ nguyên
tệp, tức giữ nguyên cả lỗi codec lẫn dung lượng.

**2. Storefront Liquid KHÔNG thấy hết các bản đã chuyển mã.** Admin API liệt
kê ba MP4 (480p/720p/1080p), nhưng `video.sources` trong Liquid chỉ có **hai**
và **cả hai đều 1080p** (một m3u8, một mp4). Bộ lọc `video_tag` vì thế chỉ
phát ra bản lớn nhất.

Hậu quả đo được ở khung 390px: **9,44 MB video trên trang 11,11 MB — 85%** cho
một đoạn trang trí 10,6 giây. Điện thoại dùng 4G cũng phải tải bằng đó.

Cách chữa: lấy URL bản 480p từ Admin API rồi khai thẳng vào một thiết lập
`nguon_nho`, đặt nó làm `<source>` ĐẦU TIÊN. Sau khi sửa: **3,72 MB**.
Nhược điểm phải nhớ: URL đó gắn với lần tải lên; tải lại video thì phải cập
nhật.

**3. Thuộc tính `media` trên `<source>` không dùng được trong `<video>`.**
Chrome và Firefox đã bỏ hỗ trợ; nó chỉ còn tác dụng trong `<picture>`. Viết
truy vấn vào đó thì trình duyệt lấy nguồn đầu tiên bất kể truy vấn — sai lặng
lẽ. Muốn chọn theo bề rộng thì phải làm bằng JS.

**4. Liquid không cho chèn thẻ vào giữa danh sách tham số của `render`.**
Viết `{% comment %}` giữa các tham số thì báo `Expected end_of_string`. Chú
thích phải nằm ngoài thẻ.

**Định dạng giá trị cho thiết lập kiểu `video`:**
`shopify://files/videos/<tên tệp>` — **không** phải `shopify://videos/...`
hay `shopify://shop_videos/...`. Hai cái kia đều bị từ chối với
"Setting 'video' value must be a valid video shopify url."

---

## Chụp màn hình: `scrollIntoView` rồi chụp ngay là ra nhầm chỗ

Cùng ngày. Gọi `scrollIntoView` trên thẻ `<video>` rồi chụp, ảnh ra **đầu
trang** chứ không phải video. Nguyên nhân: ảnh `loading="lazy"` phía trên vẫn
đang tải, tải xong thì bố cục dài ra và đẩy vị trí đã cuộn đi mất.

**Cách làm đúng:** cuộn hết trang xuống đáy cho mọi ảnh tải xong, cuộn về 0,
rồi mới lấy toạ độ tuyệt đối (`getBoundingClientRect().top + scrollY`) và
`scrollTo` tới đó. Cùng họ với bẫy "chờ 1,2 giây sau `scrollIntoView` rồi mới
lấy toạ độ để bấm".

---

## `:where()` của Horizon KHÔNG có nghĩa là độ ưu tiên bằng 0

Trả giá 13/10/2026, hai lần trên cùng một ô tick tự vẽ (`.bp__tick`).
`base.css` viết `:where(input[type='checkbox']):not(:disabled):hover:checked`
— `:where()` chỉ bọc phần `input[...]`, còn `:not(:disabled):hover:checked`
nằm ngoài nên vẫn tính **(0,3,0)**, cao hơn `.bp__tick:checked` (0,2,0).

1. `:checked::after` của theme mang `mask-image` + `position: absolute` →
   dấu tick tự vẽ bị cắt còn một chấm, `checked=true` mà ô trông trống
2. `:hover:checked` → ô đã tick chuyển **nền đen**. Trên điện thoại `:hover`
   dính lại sau khi chạm, nên ô đen luôn

**Quy tắc:** tự vẽ lại một điều khiển form thì `grep -n "input\[type='<loại>'\])"
assets/base.css` và đè **từng trạng thái** theme có (`:checked`, `::after`,
`:hover`, `:hover:checked`, `:disabled`). Đo bằng hover thật qua
`Input.dispatchMouseEvent`, đừng chỉ đặt `.checked = true`.

---

## Chữ trên CHECKOUT sửa được bằng theme — màu và logo thì không

Đo ngày 13/10/2026. Checkout không đọc chữ thường của theme, nhưng **có đọc
khoá `shopify.checkout.*` trong `locales/en.default.json` của theme đang
live**. Thêm nhánh `"shopify": {"checkout": {...}}` vào cuối tệp rồi push là
checkout đổi chữ ngay, đã đo bằng CDP. Đang dùng:

```
contact.contact_method_title      Email or Phone
payment.title                     Secure Checkout
payment.card_security_notice      ...30-day money-back guarantee.
general.pay_now_button_label      Complete Purchase
```

Tra tên khoá: `index.html` của repo GitHub
`chiragramjibhaipatel/shopify-default-theme-content` (tiền tố
`shopify.checkout.` cộng khoá ngắn).

**Ngược lại, màu, logo và nút KHÔNG đi qua theme hay API được** khi store ở
gói thường. `checkoutBrandingUpsert` chỉ chạy trên Plus/dev store và đã bị
khai tử ở 2026-04; chỉ còn trình soạn checkout trong Admin.

Khoá chỉ ăn ở theme ĐANG LIVE. Publish theme khác thì phải chép nhánh
`shopify.checkout` sang, nếu không checkout quay về chữ mặc định, không báo gì.

---

## Tôi đã báo "xong" một việc chưa hề chạy — vì xem ảnh thay cho đo

Ngày 13/10/2026. Chủ shop xin thêm đệm dọc cho header. Tôi sửa biến
`--header-padding` trong `custom.css`, chụp một ảnh thấy header "thoáng hơn",
rồi báo **"thêm 14px trên dưới"**.

Mười mấy lượt sau, đo vì một việc khác mới lòi ra:

- `--header-padding` tính ra `0.7rem` của Horizon, không phải 14px của tôi
  (lại `compiled_assets/styles.css` nạp sau `custom.css`)
- `.header__columns` vẫn `padding: 0px`
- header vẫn cao **đúng 72px** như trước khi sửa

Ảnh trông thoáng hơn thật — nhưng vì các thay đổi KHÁC trong cùng lượt (logo,
icon mới). Tôi đã gán công cho đúng thứ không chạy.

**Quy tắc:** thay đổi nào phát biểu được bằng một con số thì phải **đo lại
con số đó sau khi đẩy**, không được thay bằng ảnh chụp. Ảnh chỉ dùng để bắt
lỗi bố cục mà số không nói được (như huy hiệu đè lên giá), không dùng để xác
nhận một giá trị.

Dấu hiệu cảnh báo cho chính mình: khi một lượt sửa nhiều thứ cùng lúc rồi
nhìn ảnh để nghiệm thu, mọi thay đổi đều "trông như đã chạy".

**Cách sửa đúng:** `.header__columns { padding-block: 10px !important; }` —
đặt thẳng lên thuộc tính. Header 72px -> 92px (mẫu 120px, nhưng logo họ cao
100px còn mình 72px).
