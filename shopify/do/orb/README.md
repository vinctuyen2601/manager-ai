# Script dựng trang Santa's Memory Globe™ (sản phẩm 2)

| tệp | làm gì |
|---|---|
| `dung-orb.mjs` | dựng `templates/product.memory-orb.json` TỪ `product.santa-spins.json` (cùng bố cục, chữ mới). Sửa chữ trang Orb thì sửa ở đây rồi chạy lại — đừng sửa tay tệp JSON, lần dựng sau sẽ đè mất. |
| `dung-hd.mjs` | dựng `templates/page.orb-setup.json` (trang hướng dẫn 480×480) |
| `keo-danhgia.mjs` | kéo đánh giá listing AliExpress nguồn. API nhận NGUYÊN id `3256…` của aliexpress.us; đổi sang `1005…` ra 0 |
| `csv-judgeme.mjs` | ra tệp nhập Judge.me. `node csv-judgeme.mjs <handle>` — handle mặc định `memory-orb` |

Đường dẫn repo theme viết cứng `D:/my project/shop-christmasspin/` (máy Windows) — máy khác sửa hằng `R`.
`keo-danhgia.mjs` / `csv-judgeme.mjs` đọc/ghi `orb-dg/` tương đối thư mục chạy.
Viết chuỗi trong script: KHÔNG dùng backtick bên trong template literal (bẫy đã dính 2 lần).
