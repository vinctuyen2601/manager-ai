# Bộ clone sản phẩm

**Vào:** mã HTML khối thông tin sản phẩm · link · mã HTML khối đánh giá
**Ra:** sản phẩm dạng **nháp** trên production + prompt cho Stitch

Sáu bước trong `../../QUY-TRINH-1688.md`. Đây là phần chạy được.

| tệp | bước | làm gì |
|---|---|---|
| `doc-san-pham.mjs` | 2a | HTML sản phẩm -> JSON: biến thể, giá, tồn, thuộc tính, ảnh, video, link mô tả |
| `doc-danh-gia.mjs` | 2b | HTML đánh giá -> JSON, **gắn cờ** năm loại cần loại bỏ |
| `bang-su-that.mau.json` | 3 | mẫu Bảng sự thật, điền tay |
| `tao-nhap.mjs` | 4+5 | tải ảnh + tạo nháp + chèn đánh giá, có bốn bộ chặn |
| `doc-thi-giac.mjs` | 3 | đo BẢNG MÀU THẬT + bề mặt từ ảnh gốc |
| `prompt-stitch.mjs` | 6 | sinh prompt năm khối |
| `anh/do-dai-chu.py` | 3c | dò toạ độ dải chữ trên ảnh xưởng |
| `anh/viet-hoa-anh.py` | 3c | thay chữ Trung bằng chữ Việt theo `ke-hoach-anh.json` |
| `anh/viet.py` | 3c | bộ hàm nền: xoá, mờ, phủ, viết chữ có dấu |

## Chạy

```bash
# 2a — dán HTML sản phẩm vào sp.html trước
node doc-san-pham.mjs sp.html

# 2b — dán HTML đánh giá vào dg.html, kèm danh sách cỡ thật
node doc-danh-gia.mjs dg.html --dong HA2500,HA3500,HA4500,HA5500,HA6500,HA7500,HA8000,HA10000,HA12000 \
  --tu-ta 轮,摇,线杯,刹车,出线,顺滑,做工,手感,齿,轴承 --tu-nham 鱼竿,钓竿

# 3 — chép mẫu rồi ĐIỀN TAY. Thông số nằm trong ảnh mô tả, phải đọc bằng mắt.
cp bang-su-that.mau.json bang-su-that.json

# 3c — Việt hoá chữ trên ảnh. LUÔN --soat trước, rồi MỞ ẢNH RA XEM.
python3 anh/do-dai-chu.py anh/a06.jpg --x 0 420
python3 anh/viet-hoa-anh.py ke-hoach-anh.json --soat
python3 anh/viet-hoa-anh.py ke-hoach-anh.json

# 4+5 — LUÔN chạy --thu trước
node tao-nhap.mjs noi-dung.json --thu
node tao-nhap.mjs noi-dung.json

# 3b — đo màu thật từ ảnh gốc của nhà sản xuất
node doc-thi-giac.mjs anh/*.jpg --ra thi-giac.json

# 6
node prompt-stitch.mjs bang-su-that.json \
  --thi-giac thi-giac.json \
  --ho-so-danh-muc ../../workflows/clone-san-pham/ho-so-danh-muc/may-cau.yaml
```

## Năm khối của prompt

| Khối | Nguồn | Trả lời câu hỏi |
|---|---|---|
| A · sự thật sản phẩm | Bảng sự thật | số nào được phép xuất hiện |
| **A2 · hồ sơ thị giác** | `doc-thi-giac.mjs` | **màu gì, bề mặt nào, ánh sáng ra sao** |
| **A3 · ngôn ngữ ngành hàng** | hồ sơ danh mục | **đặt ở đâu, cạnh cái gì, lỗi nào hay gặp** |
| B · quy chuẩn lớp chữ | cố định | chữ đặt thế nào |
| C · mô tả từng tấm | `boAnh` của danh mục | chụp cái gì |

A2 và A3 là phần bù cho chỗ hổng lớn nhất: công cụ sinh ảnh **không nhìn thấy
bảng thông số**. Đưa "285g, hãm 8kg" rồi mong nó vẽ đúng màu đồng cổ có vân
xoáy là nhầm vai của dữ liệu.

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
