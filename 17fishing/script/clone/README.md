# Bộ clone sản phẩm

**Vào:** mã HTML khối thông tin sản phẩm · link · mã HTML khối đánh giá
**Ra:** sản phẩm dạng **nháp** trên production + prompt cho Stitch

Sáu bước trong `../../QUY-TRINH-1688.md`. Đây là phần chạy được.

| tệp | bước | làm gì |
|---|---|---|
| `doc-san-pham.mjs` | 2a | HTML sản phẩm -> JSON: biến thể, giá, tồn, thuộc tính, ảnh, video, link mô tả |
| `doc-danh-gia.mjs` | 2b | HTML đánh giá -> JSON, **gắn cờ** bốn loại cần loại bỏ |
| `bang-su-that.mau.json` | 3 | mẫu Bảng sự thật, điền tay |
| `tao-nhap.mjs` | 4+5 | tải ảnh + tạo nháp + chèn đánh giá, có bốn bộ chặn |
| `prompt-stitch.mjs` | 6 | sinh prompt ba khối từ Bảng sự thật |

## Chạy

```bash
# 2a — dán HTML sản phẩm vào sp.html trước
node doc-san-pham.mjs sp.html

# 2b — dán HTML đánh giá vào dg.html, kèm danh sách cỡ thật
node doc-danh-gia.mjs dg.html --dong HA2500,HA3500,HA4500,HA5500,HA6500,HA7500,HA8000,HA10000,HA12000

# 3 — chép mẫu rồi ĐIỀN TAY. Thông số nằm trong ảnh mô tả, phải đọc bằng mắt.
cp bang-su-that.mau.json bang-su-that.json

# 4+5 — LUÔN chạy --thu trước
node tao-nhap.mjs noi-dung.json --thu
node tao-nhap.mjs noi-dung.json

# 6
node prompt-stitch.mjs bang-su-that.json
```

## Bảng sự thật là trục

Mọi khâu sau bước 3 đọc từ nó: `tao-nhap.mjs` dùng để CHẶN, `prompt-stitch.mjs`
dùng để SINH. Không có nó thì mỗi khâu chế ra một phiên bản thông số riêng, và
đó là thứ ngốn thời gian nhất lần clone đầu.

## Bốn bộ chặn trong `tao-nhap.mjs`

Đã thử bằng dữ liệu cố tình sai, cả bốn đều dừng trước khi gửi:

| chặn | bắt được |
|---|---|
| mã cỡ lạ | `HA5000`, `HA6000` — hai cỡ Stitch bịa ra trong bộ ảnh đầu |
| lời bị cấm | "câu biển", "nước mặn" |
| thiếu cờ Google | có đánh giá mà quên `khongPhaiKhachThat` |
| trùng tên ảnh | sáu ảnh cùng một tên, đúng lỗi đã xảy ra 25/09 |

`isActive` **luôn** là `false`. Không có tham số nào bật được từ script.

## Bẫy đã xử lý sẵn

- khối JSON biến thể lặp **ba lần** trong HTML — khử trùng lặp theo tên
- ảnh **bán chéo** lẫn trong mô tả — lọc theo mã người bán trong tên tệp
- hậu tố kích thước ảnh (`.220x220`, `_b`) — bỏ để lấy bản gốc
- đánh giá **gộp theo gian hàng** — cờ `dongKhac` so với danh sách cỡ thật
- đánh giá **nói về sản phẩm khác** — cờ `nhamHang`
- chèn đánh giá theo thứ tự **đảo** để cái chê không đứng đầu

## Thứ script KHÔNG làm được

- **Đọc thông số trong ảnh.** Bảng kỹ thuật nằm trong ảnh mô tả, phải mắt người.
- **Viết lời tiếng Việt.** Dịch máy sai nghĩa, và từ vựng phải theo shop.
- **Chọn đánh giá.** Script gắn cờ, người quyết giữ cái nào.
- **Đọc chữ trong ảnh Stitch trả về.** Vẫn phải zoom từng tấm.
