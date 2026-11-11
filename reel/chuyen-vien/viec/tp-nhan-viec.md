# Trưởng phòng · nhận-việc

Biến một tin nhắn của sếp thành **phiếu nhận việc**: làm cho sản phẩm/page nào, mục đích gì, thị trường nào, chạy luồng nào,
hạn ngày nào. Mở thư mục chạy để các vai sau ghi phiếu vào đó.
Kiến thức: `../truong-phong.md` §6 (điều kiện đủ), §12 (ranh giới quyền). Tệp này chỉ giữ thứ tự làm và luật bắt buộc.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Bước 1 luồng Quảng cáo · đầu luồng Nuôi page · mỗi khi sếp nhắn một việc mới |
| Nhận | Tin nhắn sếp (nguyên văn) · `../../luong/README.md` · danh sách thư mục trong `reel/viec-dang-chay/` |
| Giao | `viec-dang-chay/<YYYY-MM-DD>-<sản phẩm hoặc page>-<qc\|page>/01-tp-nhan-viec.md` theo khuôn dưới · phiếu giao (`_phieu-giao.md`) |
| Xong khi | Ba ô sản phẩm · mục đích · thị trường có giá trị (✅ hoặc ⚠ mặc định) · đã chọn luồng · thư mục đã mở · mỗi câu hỏi sếp có mặc định |

## Luật bắt buộc
1. **Nếu tên sản phẩm sếp viết chưa thấy trên link/trang** → không tả sản phẩm từ cái tên, không tự lên web tìm.
   Ghi nguyên văn vào ô "Tên sếp viết", giao `sp.dung-ho-so` kiểm (ô tìm kiếm, sitemap). SP trả tên gần nhất →
   câu đầu ô "Cần sếp" là **"Hay ý sếp là <tên gần nhất>?"**, làm tiếp theo tên đó ⚠ (thi 11/11).
2. **Nếu câu định hỏi sếp nằm trong phần tự quyết (§12)**, hoặc có phương án an toàn không tốn thêm
   (gắn nhãn nội dung AI, bỏ logo hãng khác như Target) → chọn phương án đó, ghi vào "Đã tự quyết", không hỏi (thi 11/11).
3. **Nếu gắn chữ "chặn" cho một câu hỏi** → cột "Chặn bước" phải ghi số bước bị dừng. Không ghi được → câu đó không chặn:
   làm tiếp theo mặc định (thi 11/11).
4. **Nếu sếp không cho hạn** → mốc tính từ **ngày có link/nguyên liệu**, viết bằng ngày thật ("thứ Sáu 14/11"), không viết
   mã kiểu "D0+3". Nguyên liệu tới trễ thì cả lịch lùi theo (thi 11/11).
5. **Nếu `viec-dang-chay/` đã có một luồng Quảng cáo chưa xong** → việc Quảng cáo mới ghi "Xếp hàng: sau <thư mục>"
   (một lúc một luồng Quảng cáo — `luong/README.md` điểm 5). Nuôi page mở song song được.

## Bước
1. Chép nguyên văn tin nhắn sếp vào đầu phiếu (Đúc kết cần đọc lại).
2. Tách ba ô đủ + các đầu vào có sẵn (gói §6, §7.1). Thiếu ô nào → làm theo bảng §6: chỉ thiếu sản phẩm mới dừng hẳn;
   thiếu mục đích/thị trường → mặc định ⚠ rồi chạy tiếp.
3. Chọn luồng theo bảng dưới. Không rõ mà có link sản phẩm → Quảng cáo, ⚠.
4. Kiểm hàng đợi (luật 5). Mở thư mục mới, tên không dấu, đúng mẫu ở `luong/README.md` điểm 4.
5. Lập lịch (luật 4): chỉ ghi các mốc sếp phải làm gì — ngày bấm Muse, ngày chấm thẻ.
6. Lọc câu hỏi sếp qua luật 1–3. Tối đa 3 câu, mỗi câu có mặc định.
7. Viết phiếu giao. Rồi chạy `tp-dieu-phoi` để giao bước 2 của luồng.

| Tin nhắn có | Luồng | Hướng |
|---|---|---|
| Link/tên sản phẩm + muốn bán, chạy quảng cáo, làm reel | Quảng cáo | Tạo mới |
| Như trên + video nhà cung cấp | Quảng cáo | Lai |
| Link video viral hoặc chủ đề page, không bán | Nuôi page | Bản địa hoá |
| Nhận xét, bài học, sửa cách làm | Không mở luồng | Ghi vào `tp-duc-ket` |

## Khuôn đầu ra
```
Tin nhắn sếp (nguyên văn): "<…>"   ·   Ngày nhận: <YYYY-MM-DD>
Tên sếp viết: <…>  ·  Tên trên trang: <… | ⬜ chờ SP kiểm>  ·  Khớp: có | không | chưa kiểm
Sản phẩm/page: <link>       Mục đích: <…> (✅ sếp nói | ⚠ mặc định)
Thị trường: <Mỹ | VN> (✅ | ⚠ suy từ <tiền tệ/ngôn ngữ trang>)    Kênh: <…>
Luồng: <Quảng cáo | Nuôi page> · Hướng: <…> · Xếp hàng: <ngay | sau thư mục …>
Lịch (ngày thật): có link <ngày> → sếp bấm Muse khoảng <ngày> → sếp chấm thẻ <ngày>
| Câu hỏi sếp (lời thường) | Chặn bước số | Mặc định nếu sếp không trả lời |
```
Sau khuôn là phiếu giao chung. Ô "Cần sếp" của phiếu = các câu trong bảng trên, không mã nội bộ.

## Thành công khi
- Sếp đọc phiếu dưới 1 phút, trả lời tối đa 3 câu (tốt nhất: không câu nào).
- Vai sau bắt đầu được mà không hỏi lại Trưởng phòng.

## Thất bại khi
- Đoán sản phẩm từ cái tên thay vì cho SP kiểm trang (thi 11/11: bài có gói thắng 17–15 nhờ kiểm sitemap, không đoán).
- Có tên lệch mà không hỏi thẳng. Bài đối chứng là bài duy nhất hỏi "Hay ý sếp là Music Box?" — học theo câu đó (thi 11/11).
- Hỏi sếp việc tự quyết được: nhãn AI, logo Target (thi 11/11).
- Gắn "chặn" cho cả 6 câu hỏi, kể cả câu không chặn bước nào (thi 11/11, bài đối chứng).
- Phiếu dày mã nội bộ (M0, LÕI, khung 03, D0+3) → sếp khó đọc (thi 11/11, bài có gói).

## Bộ thi
`tp-nhan-viec.thi/` — chưa có. Đề hồi quy đề nghị: tin nhắn bài thi 11/11 (tên lệch, gần nhất Music Box; có logo Target).
Chưa thi thì luồng gọi việc này kèm ⚠.
