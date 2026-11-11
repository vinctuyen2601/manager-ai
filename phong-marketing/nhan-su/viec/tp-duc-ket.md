# Trưởng phòng · đúc-kết

Sau mỗi lô: biến lỗi và thắng của lô thành **luật ghi đúng một chỗ**, để lô sau không lặp lại.
Mỗi vai tự ghi Sổ lỗi của mình; Trưởng phòng gom, phân chỗ ghi, kiểm, và đề xuất thi lại.
Kiến thức: `../vai/truong-phong.md` §4 bước 12, §3.4 (viết luật theo kiểu lỗi, thi gói), `README.md` (luật viết tệp việc).
Luồng Đúc kết ở `luong/README.md` còn ⬜ — việc này dùng thay trong lúc chờ.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Sau họp cuối lô (`tp-hop`) · khi sếp chấm thẻ "Sửa" hoặc "Bỏ" có lý do |
| Nhận | Mọi phiếu trong thư mục lô · số đo "Đo sau khi chạy" (`luong/quang-cao.md`) · thẻ chấm của sếp · nhật ký `00-dieu-phoi.md` |
| Giao | `<số kế>-tp-duc-ket.md` theo khuôn dưới · dòng mới trong Sổ lỗi (§10) gói vai có lỗi · danh sách thi lại · phiếu giao |
| Xong khi | Mỗi lỗi có một chỗ ghi + luật "Nếu … → …" (hoặc lý do không cần luật) · Trưởng phòng đã mở từng tệp được sửa · danh sách thi lại đủ |

## Luật bắt buộc
1. **Nếu lỗi về một sản phẩm** (ảnh, tính năng, tên) → ghi vào hồ sơ sản phẩm. **Về nghề của một vai** → Sổ lỗi gói vai đó.
   **Về giao nhận, thứ tự** → tệp luồng. Một bài học một chỗ; chỗ khác chỉ dẫn tới.
2. **Nếu viết luật mới** → dạng "Nếu <thấy được> → <làm gì>", đặt vào ô bắt buộc của khuôn đầu ra khi được.
   Tệp việc đã đủ 5 luật → gộp hoặc thay luật yếu nhất, không thêm luật thứ 6.
3. **Nếu sửa một tệp việc, hoặc mục gói mà tệp việc dẫn tới** → ghi "đề xuất thi lại `<việc>.thi/`", thêm lỗi này làm đề hồi quy.
   Tới khi thi lại, luồng gọi việc đó kèm ⚠.
4. **Nếu lỗi có dòng giống trong Sổ lỗi rồi** → không thêm dòng mới; ghi ngày lặp và xét vì sao luật cũ không chặn được
   (thường là luật không nằm ở ô bắt buộc — thi 11/11: gói v0 có luật mà vẫn thua 14–16).
5. **Nếu lỗi gốc là agent con báo "xong" mà tệp không đạt** → ghi hai dòng: lỗi của vai đó, và lỗi kiểm của Trưởng phòng
   vào `tp-dieu-phoi` (thi 11/11: báo 0 khung đen, thực có 1).

## Bước
1. Gom: đọc phần đầu mọi phiếu và nhật ký; điền dòng số đo (khuôn dưới).
2. Lập bảng lỗi và thắng. Mỗi lỗi hỏi "vì sao" tới khi ra thứ sửa được trong một tệp.
3. **Mỗi vai ghi Sổ lỗi của mình:** giao mỗi vai có lỗi một agent con, nhận gói vai + các dòng lỗi của vai đó; agent chỉ sửa
   gói và tệp việc **của vai mình**. Chạy song song được (mỗi agent một tệp). Không agent nào lấy dữ liệu web ở bước này.
4. Trưởng phòng mở từng tệp được sửa: đúng chỗ (luật 1), đúng dạng (luật 2), không trùng (tìm tên lỗi trong `chuyen-vien/`).
5. Lập danh sách thi lại (luật 3).
6. Đưa "bài học lớn nhất" (1 câu + tệp đã ghi) vào báo cáo khuôn §7.4. Phiếu giao.

## Khuôn đầu ra
```
# Đúc kết <thư mục lô> — <ngày>
Số đo: chặn <n> · quay lại <bước:lần> · sinh lại Muse <n> · hạn mức <thật>/<ước> % · sếp can thiệp <n> · <giờ> từ link tới xong
| Lỗi / Thắng | Thấy ở (phiếu, tệp, giây) | Nguyên nhân gốc | Luật "Nếu … → …" | Ghi ở (tệp, mục) | Thi lại? |
Thi lại đề xuất: <việc>.thi/ — đề hồi quy mới: <…>     (bắt buộc; không có thì ghi —)
Bài học lớn nhất (cho báo cáo sếp, lời thường): <1 câu>
```
Sau khuôn là phiếu giao chung.

## Thành công khi
- Lô sau không lặp lỗi đã đúc kết.
- Mọi tệp việc bị sửa đều có lần thi lại được lên lịch.

## Thất bại khi
- Một bài học ghi hai chỗ → hai chỗ lệch nhau sau vài lô (gói §2 điều 12).
- Luật viết kiểu câu cấm chung chung → agent vẫn phạm (`README.md`, thi 11/11).
- Sửa tệp việc mà không thi lại → không biết sửa làm tốt lên hay tệ đi.
- Trưởng phòng tự viết Sổ lỗi thay mọi vai → vai không "biết" lỗi của mình khi đọc gói.

## Bộ thi
`tp-duc-ket.thi/` — chưa có. Đề đề nghị: thư mục lô 11/11 (lỗi 429, khung đen sót, mã nội bộ trong báo cáo).
