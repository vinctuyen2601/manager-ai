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
