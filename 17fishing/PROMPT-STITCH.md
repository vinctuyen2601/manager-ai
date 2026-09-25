# Prompt Stitch cho ảnh sản phẩm đồ câu

Bước 6 của `QUY-TRINH-1688.md`.

Stitch cần **ba thứ**: ảnh sản phẩm gốc · thông tin sản phẩm · prompt.
Prompt gồm ba khối, dán theo đúng thứ tự dưới đây.

---

## KHỐI A · Sự thật sản phẩm

Dán nguyên văn, không rút gọn.

```
DỮ LIỆU SẢN PHẨM (nguồn duy nhất, tuyệt đối không thêm bớt):

Tên: Máy câu AS dòng HA
Thân: hợp kim nhôm nguyên khối, phủ màu đồng cổ
Thép không gỉ: chỉ ở công tắc chống quay ngược và lá phát tiếng
Truyền động: nhông hợp kim kẽm, trục vít đồng thau

CHÍN CỠ — không có cỡ nào khác:
HA2500 · HA3500 · HA4500    5+1 bi · 5.1:1 · hãm 8 kg  · 285–295 g · 60×109 mm
HA5500 · HA6500 · HA7500    5+1 bi · 5.1:1 · hãm 10 kg · 390–400 g · 69×123 mm
HA8000 · HA10000 · HA12000  4+1 bi · 4.1:1 · hãm 15 kg · 685–697 g · 72×141 mm

Độ sâu cối: HA8000 NÔNG · HA10000 VỪA · HA12000 SÂU

LUẬT CỨNG:
1. Chỉ dùng số có trong khối trên. KHÔNG sinh thêm bất kỳ con số nào.
2. Không ghép thông số của hai nhóm cỡ khác nhau vào cùng một khung.
3. Không nhắc câu biển, nước mặn, chống ăn mòn nước biển.
4. Không dùng chữ "chính hãng", "bảo hành", "chống nước".
5. Chữ trong ảnh phải TIẾNG VIỆT CÓ DẤU, không lẫn tiếng Trung.
6. Không hiện logo hay tên thương hiệu nào ngoài "AS".
```

**Vì sao cần khối này.** Đợt sinh ảnh đầu tiên không có nó, Stitch chế ra:

| Ảnh ghi | Sự thật |
|---|---|
| `HA5000`, `HA6000` | hai cỡ **không tồn tại** |
| `HA12000 · cối nông` | HA12000 là cối **sâu** |
| `5.1:1` cạnh `hãm 15KG` | 5.1:1 đi với hãm 8–10kg; 15kg là 4.1:1 |
| `ĐÁNH BIỂN` | nhà sản xuất không công bố chống nước mặn |

Không tấm nào sai kiểu nhìn là biết. Tất cả đều nghe hợp lý.

---

## KHỐI B · Quy chuẩn lớp chữ cho ảnh đồ câu

Dán nguyên văn. Đây là phần biến ảnh chuyên nghiệp thành ảnh bán được hàng,
hoặc thành biển quảng cáo chợ đêm nếu làm sai.

```
QUY CHUẨN LỚP CHỮ (Text & Badge Overlay):

PHÂN CẤP — mắt đọc theo thứ tự: SẢN PHẨM → LOGO/HEADLINE → BADGE.
Lớp chữ KHÔNG BAO GIỜ được cạnh tranh độ nổi bật với máy câu.
Tối đa ba tầng, không hơn:
  Tầng 1 · Logo + tên thương hiệu, đặt góc trên trái hoặc trên phải
  Tầng 2 · Headline lợi ích lớn nhất, KHÔNG QUÁ 7 TỪ
  Tầng 3 · 2 đến 3 badge thông số "ăn tiền" nhất

PHÔNG CHỮ:
  Dày, cứng cáp, góc cạnh. Sans-serif hình khối, gợi cơ khí chính xác.
  Dùng: Montserrat Bold/Black, Bebas Neue, Oswald, Kinetic.
  TUYỆT ĐỐI KHÔNG font viết tay hoặc font mềm mại.

MÀU:
  Headline và logo: trắng #FFFFFF hoặc bạc ánh kim #E0E0E0.
  Màu nhấn cho badge và từ khoá: nằm trong 10% màu nhấn của ảnh.
    · sản phẩm tông đen/bạc/đồng  -> nhấn VÀNG KIM hoặc CAM CHÁY
    · sản phẩm tông thể thao      -> nhấn XANH CYAN hoặc LIME

BỐ TRÍ:
  Đặt chữ HOÀN TOÀN vào vùng không gian âm: bầu trời mờ, mặt nước mờ,
  vách đá tối. TUYỆT ĐỐI không đè lên thân máy, cối hay tay quay.
  Nền quá sáng làm chìm chữ thì chèn lớp gradient đen trong suốt
  (opacity 30–50%) ăn dần từ mép ảnh vào dưới chữ.

KÍCH THƯỚC:
  Logo chiếm 5–8% diện tích ảnh, bản đơn sắc trắng.
  Headline in hoa toàn bộ, đổ bóng nhẹ hoặc viền mờ.
  Badge dạng icon hình khối kết hợp số liệu:
    icon bọc thép + "5+1 VÒNG BI"
    icon bánh răng + "TỈ SỐ 5.1:1"
    icon cân nặng  + "285G NHẸ TAY"

BA LỖI TUYỆT ĐỐI TRÁNH:
  1. Bảng thông số kiểu Word — liệt kê dài dòng gạch đầu dòng. Khách ngợp
     và không đọc.
  2. Badge đỏ chói kiểu flash sale. Máy câu là hàng kỹ thuật đắt tiền,
     sticker đỏ nhấp nháy kéo giá trị cảm nhận xuống hàng rẻ tiền.
  3. Chữ che chi tiết kim loại. Đè lên cối hay cần là hỏng cảm giác độ nét
     của vật liệu, tức hỏng đúng thứ đang bán.
```

---

## KHỐI C · Mô tả từng tấm

Sáu tấm, theo bốn nhiệm vụ của ảnh trong `product-image-knowledge.md`.

**1 · HERO** — sản phẩm chiếm ≥90% khung. Nền tối, một nguồn sáng chính từ
trên chếch trái làm nổi vân hoa văn và ánh đồng. Không đạo cụ.
Lớp chữ: logo góc trên trái, một headline ≤7 từ, hai badge.
Tốn 60% công của cả bộ.

**2 · TRÊN TAY** — bàn tay đàn ông cầm máy, ngang tầm mắt, nền hồ mờ.
**Tấm quan trọng nhất sau hero**: trả lời "to cỡ nào", nỗi lo lớn nhất khi
mua đồ câu qua mạng. Đúng một badge: khối lượng của cỡ đang chụp.

**3 · ĐANG DÙNG** — máy đã lắp lên cần, cạnh hồ, ánh sáng cuối chiều. Chụp
khoảnh khắc tay đang thu cước, không chụp vật nằm yên.
Lớp chữ: chỉ headline, không badge. Để ảnh tự nói.

**4 · BUNG CHI TIẾT** — máy ở giữa, 4–5 đường chú thích mảnh chỉ ra thân nhôm,
cối phay CNC, bộ nhông, vòng bi, hệ hãm. Mỗi chú thích tối đa 5 từ.
Đây là tấm DUY NHẤT được phép có nhiều chữ.

**5 · SO SÁNH CỠ** — ba máy cạnh nhau **ĐÚNG TỈ LỆ THẬT** theo kích thước
trong Khối A, căn cùng một đường đáy. Dưới mỗi máy ghi tên cỡ và công dụng.
Chỉ dùng tên cỡ có trong Khối A.

**6 · HỘP** — máy cạnh hộp đen của hãng, nền tối. Cho thấy nhận về gồm gì.
Không chữ, hoặc chỉ logo.

---

## Kiểm sau khi Stitch trả ảnh

**Zoom từng tấm, đọc mọi chữ và mọi con số**, đối chiếu Khối A.

Đọc ảnh thu nhỏ là không đủ: lần đầu tôi đọc nhầm `5.1:1` thành `5.3:1` trên
bản thu nhỏ. Lỗi thật lại nằm chỗ khác, ở tên cỡ và ở chữ "đánh biển".

Kiểm thêm theo Khối B:
- [ ] chữ có đè lên thân máy, cối, tay quay không
- [ ] có quá ba tầng chữ không
- [ ] headline có quá 7 từ không
- [ ] có badge đỏ kiểu giảm giá không
- [ ] có tấm nào thành bảng thông số liệt kê không
