# Bộ script đo giao diện qua CDP

Dùng để **đo** chứ không để đoán: mọi con số trong `BAY-DA-TRA-GIA.md` và các
commit của `shop-christmasspin` đều ra từ đây.

## Chuẩn bị

Cần một Chrome mở sẵn cổng gỡ lỗi 9333:

```bash
setsid google-chrome --headless=new --remote-debugging-port=9333 \
  --remote-debugging-address=127.0.0.1 >/dev/null 2>&1 & disown
curl -s http://127.0.0.1:9333/json/version   # phải trả JSON
```

Node 22 có sẵn `WebSocket`, **không cần cài gói `ws`**.

Token quản trị hết hạn sau 24 giờ. Làm mới:

```bash
bash ~/.shopify-lam-moi-token.sh     # ghi vào ~/.shopify-store-admin-token
```

## Các script

| tệp | dùng để |
|---|---|
| `chup.mjs <url> <ra.png> [rộng] [cao]` | chụp màn hình |
| `dovung.mjs <url> <tên>` | đo từng dòng chữ quanh nút mua: cỡ, nét, màu, toạ độ |
| `dotieude.mjs <url> <neo>` | như trên nhưng neo vào một chuỗi bất kỳ |
| `domau.mjs <url> <tên>` | liệt kê mọi sắc ĐỎ đang dùng trên trang — dò màu sót |
| `dobyte.mjs` | đo tổng byte trang và phần video chiếm bao nhiêu |
| `kiemgio.mjs` | **phép kiểm hồi quy**: chọn Buy 2 + ba món, đối chiếu giỏ |
| `thanhdinh.mjs` | **phép kiểm hồi quy**: thanh dính có đúng số lượng không |
| `kiemchay.mjs <url>` | ba dải trượt có tự chạy không |
| `taifile.mjs <tệp...>` | tải ảnh lên Shopify Files |
| `taivideo.mjs` | tải video lên Files để Shopify tự chuyển mã H.264 |

## Hai phép kiểm phải chạy sau MỌI thay đổi trong hộp mua

```bash
node kiemgio.mjs      # phải ra TONG: 226
node thanhdinh.mjs    # phải ra "Add to cart (3)" -> 3 x Santa Spins
```

Đụng vào khối nút mua mà không chạy hai cái này thì khả năng cao là hỏng luồng
mua mà không ai thấy — đã xảy ra một lần (xem mục CSS bị dán trùng trong
`BAY-DA-TRA-GIA.md`).

## Ba điều rút ra, đừng lặp lại

1. **`scrollIntoView` rồi chụp ngay là ra nhầm chỗ.** Ảnh lazy phía trên tải
   xong sẽ đẩy bố cục. Phải cuộn xuống đáy cho ảnh tải hết, về 0, rồi mới lấy
   toạ độ tuyệt đối.
2. **"Có chiều cao" ≠ "nhìn thấy được".** Trước khi bấm bằng toạ độ, khẳng
   định `r.y >= 0 && r.bottom <= innerHeight`.
3. **CDN có thể trả CSS cũ ngay sau khi đẩy.** Một phép đo đỏ ngay sau lần
   đẩy thì đo lại lần nữa trước khi đi sửa mã.
