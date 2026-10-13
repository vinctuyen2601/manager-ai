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
