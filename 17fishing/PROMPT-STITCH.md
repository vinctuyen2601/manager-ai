# Prompt Stitch cho ảnh sản phẩm

Dùng cùng `QUY-TRINH-1688.md`. Mọi prompt đều gồm hai phần: **khối sự thật**
dán nguyên văn, và **phần mô tả tấm ảnh**.

---

## Vì sao phải có khối sự thật

Đợt sinh ảnh đầu tiên cho máy AS HA, không có khối này, và Stitch chế ra:

| Ảnh ghi | Sự thật |
|---|---|
| `HA5000`, `HA6000` | hai cỡ **không tồn tại** |
| `HA12000 · cối nông` | HA12000 là cối **sâu** |
| `5.1:1` cạnh `lực hãm 15KG` | 5.1:1 đi với hãm 8–10kg; 15kg là 4.1:1 |
| `ĐÁNH BIỂN` | nhà sản xuất không công bố chống nước mặn |

Không tấm nào sai kiểu "nhìn là biết". Chúng đều nghe rất hợp lý. Đó là lý do
phải chặn bằng dữ liệu, không chặn bằng cách đọc lại.

---

## Khối sự thật — dán vào ĐẦU mọi prompt

```
DỮ LIỆU SẢN PHẨM (nguồn duy nhất, tuyệt đối không thêm bớt):

Tên: Máy câu AS dòng HA
Thân: hợp kim nhôm nguyên khối, phủ màu đồng cổ
Thép không gỉ: chỉ ở công tắc chống quay ngược và lá phát tiếng
Truyền động: nhông hợp kim kẽm, trục vít đồng thau

CHÍN CỠ — không có cỡ nào khác:
HA2500 · HA3500 · HA4500   5+1 bi · 5.1:1 · hãm 8 kg  · 285–295 g · 60×109 mm
HA5500 · HA6500 · HA7500   5+1 bi · 5.1:1 · hãm 10 kg · 390–400 g · 69×123 mm
HA8000 · HA10000 · HA12000 4+1 bi · 4.1:1 · hãm 15 kg · 685–697 g · 72×141 mm

Độ sâu cối: HA8000 NÔNG · HA10000 VỪA · HA12000 SÂU

LUẬT CỨNG:
1. Chỉ dùng số có trong khối trên. KHÔNG sinh thêm bất kỳ con số nào.
2. Không ghép thông số của hai nhóm cỡ khác nhau vào cùng một khung.
3. Không nhắc câu biển, nước mặn, chống ăn mòn nước biển.
4. Không dùng chữ "chính hãng", "bảo hành", "chống nước".
5. Chữ trong ảnh phải là TIẾNG VIỆT CÓ DẤU, không lẫn tiếng Trung.
6. Không hiện logo hay tên thương hiệu nào ngoài "AS".
```

---

## Sáu tấm

Phần `[…]` đổi theo sản phẩm.

**1 · HERO** — sản phẩm chiếm ≥90% khung. Nền tối, một nguồn sáng chính từ
trên chếch trái làm nổi vân hoa văn và ánh đồng. Không đạo cụ. Tối đa một dòng
chữ 7 từ. Tấm này là ảnh đại diện, tốn 60% công.

**2 · TRÊN TAY** — bàn tay đàn ông cầm máy, chụp ngang tầm mắt, nền hồ mờ.
**Đây là tấm quan trọng nhất sau hero**: nó trả lời "to cỡ nào", nỗi lo lớn
nhất khi mua đồ câu qua mạng. Ghi đúng một số: khối lượng của cỡ đang chụp.

**3 · ĐANG DÙNG** — máy đã lắp lên cần, cạnh hồ, ánh sáng cuối chiều. Chụp
khoảnh khắc tay đang thu cước, không chụp vật nằm yên.

**4 · BUNG CHI TIẾT** — máy ở giữa, 4–5 đường chú thích chỉ ra: thân nhôm
nguyên khối, cối phay CNC, bộ nhông hợp kim kẽm, vòng bi, hệ thống hãm. Mỗi
chú thích tối đa 5 từ.

**5 · SO SÁNH CỠ** — ba máy đặt cạnh nhau **ĐÚNG TỈ LỆ THẬT** theo kích thước
trong khối sự thật, căn cùng một đường đáy. Dưới mỗi máy ghi tên cỡ và công
dụng. **Chỉ dùng tên cỡ có trong khối sự thật.**

**6 · HỘP** — máy cạnh hộp đen của hãng, nền tối. Cho thấy nhận về gồm những gì.

---

## Kiểm sau khi Stitch trả ảnh

Zoom từng tấm, đọc **mọi chữ và mọi con số**, đối chiếu khối sự thật.

Đọc ảnh thu nhỏ là không đủ: lần đầu tôi đọc nhầm `5.1:1` thành `5.3:1` trên
bản thu nhỏ, phải phóng to mới thấy đúng. Lỗi thật thì nằm chỗ khác — ở tên cỡ
và ở chữ "đánh biển".
