# Phiếu giao (chung cho mọi việc)

Mỗi việc kết thúc bằng **một phiếu giao**. Vai sau đọc phiếu, không đọc lại toàn bộ bài của vai trước.
Trưởng phòng đọc **phần đầu** để quyết định bước tiếp, rồi **mở tệp ở dòng `giao`** để kiểm (agent con báo "xong" chưa phải là xong).

```markdown
---
viec: <vai>.<tên-việc>          # vd bk.kich-ban-qc
nganh: <mã ngành>               # vd do-cau-vn · giang-sinh-my — vai nhận việc nạp nganh/<mã>/MUC-LUC.md
trang_thai: xong | chan | can-sep
nhan: [<tệp đã đọc>]
giao: [<tệp đã viết>]
con_thieu: [<thứ còn ⬜, rỗng nếu không>]
ngay: <YYYY-MM-DD>
---

## Đã kiểm (có nguồn)
- <sự thật> — <nguồn: dòng hồ sơ / số đo / tệp>

## Suy ra ⚠
- <điều suy ra> — <từ đâu>

## Còn thiếu ⬜
- <thứ thiếu> — <ảnh hưởng tới phần nào>

## Phán đoán (bắt buộc cho mỗi chỗ thiếu ⬜ có ảnh hưởng tới quyết định — khuôn `../LUAT-CHUNG.md` mục 2)
- <chỗ thiếu>: nghiêng về <X> · ~<N> % · vì <lý do + nguồn> · đổi ý nếu <W> · kiểm bằng <Z>, ngưỡng <…>, hạn <ngày>

## Đã tự quyết (sếp không cần làm gì)
- <quyết định> — <vì sao>

## Cần sếp (tối đa 3, viết lời thường)
1. <câu hỏi>? Mặc định nếu sếp không trả lời: <phương án>.
```

**Luật điền:**
- Nếu có ô "Còn thiếu ⬜" ảnh hưởng tới quyết định mà ô "Phán đoán" trống → phiếu không hợp lệ (thi điểm gốc 11/11: agent dừng ở "không biết").
- Nếu ô nào không có gì → ghi `—`. Ô bị **xoá** thì phiếu không hợp lệ.
- Nếu đầu vào sai tên hoặc không tìm thấy (sản phẩm, khung, page) → ô "Cần sếp" mở bằng **"Ý sếp là <tên gần nhất>?"**,
  ghi tên gần nhất làm mặc định ⚠ và làm tiếp phần không phụ thuộc.
- Nếu việc nằm trong quyền tự quyết của vai (xem gói) → ghi vào "Đã tự quyết", **không** đưa lên "Cần sếp".
- Ô "Cần sếp" viết cho người không đọc gói: không mã nội bộ (`M0`, `LÕI`, `§`, `khung 0x`, `D0+3`…).
  Mã nội bộ chỉ dùng ở các ô còn lại.
