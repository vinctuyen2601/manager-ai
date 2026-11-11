# Trưởng phòng · brief

Viết **brief một trang** cho luồng Quảng cáo: một giả thuyết, một tệp khách, hook nguyên văn, sự thật được nói, ước hạn mức.
Brief là tài liệu nội bộ cho các vai — mã nội bộ được dùng ở đây, không dùng ở phần gửi sếp.
Kiến thức: `../vai/truong-phong.md` §3.1, khuôn §7.2, bảng kiểm §5. Tệp này chỉ giữ thứ tự làm và luật bắt buộc.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Luồng Quảng cáo bước 4, sau `sp.dung-ho-so` (hồ sơ ĐẠT) và `sxh.chuyen-khung`. Luồng Nuôi page không có brief |
| Nhận | Phiếu 01–03 · hồ sơ `khach-hang/<shop>/san-pham/<tên>.md` · khung đã chọn + phần phải đổi · bảng tuần (`tp-ke-hoach-tuan`) |
| Giao | `04-tp-brief.md` theo khuôn §7.2 (phần trên gạch bắt buộc) + 3 ô đầu tệp dưới · phiếu giao (`../../quy-che/khuon/phieu-giao.md`) |
| Xong khi | Bảng kiểm §5 đủ ô · ước × 1,3 ≤ 40 % hạn mức tuần (hoặc sếp đã duyệt) · Biên kịch nhận brief hỏi lại ≤ 2 câu |

## Luật bắt buộc
1. **Nếu một ô của khuôn §7.2 không điền được từ phiếu/hồ sơ** → ghi `⬜ <vai bổ sung>`, không bịa.
   Ô "Sự thật được nói" và "Cấm" **chép** từ hồ sơ, kèm số dòng.
2. **Nếu tên trong tin nhắn sếp ≠ tên trên hồ sơ** → mọi ô của brief dùng tên trên hồ sơ. Tên sếp viết chỉ nằm ở ô
   đầu tệp và phiếu giao (câu "Hay ý sếp là …?" đã hỏi ở `tp-nhan-viec`).
3. **Nếu ô Hook là lời tả** ("mở thật mạnh", "gây tò mò") → viết lại thành HÌNH · CHỮ · TIẾNG nguyên văn 1,5 s đầu.
   Không viết được → brief chưa xong.
4. **Nếu ước × 1,3 > 40 % hạn mức tuần hoặc > $10/video** → `trang_thai: can-sep`, kèm bản rút gọn rẻ hơn và % của cả hai
   (cột "Nếu chặn", luồng Quảng cáo bước 4).
5. **Nếu brief có giá, % giảm, "chỉ còn", hay câu sức khoẻ/số liệu không có dòng hồ sơ** → xoá trước khi giao.
   Đừng gửi vào rồi trông Biên kịch xoá.

## Bước
1. Đọc phần đầu phiếu 02, 03 và **mở hồ sơ** kiểm ĐẠT thật (`tp-dieu-phoi` luật 1).
2. Viết đơn vị chiến lược + giả thuyết thua được: có chỉ số, bản so, hướng (khuôn §7.2, §3.4b).
3. Hook nguyên văn: lấy từ khung đã chọn, thay theo sản phẩm. Không thay LÕI (gói §2 điều 4).
4. Chép sự thật được nói, danh sách cấm, logo, slogan từ hồ sơ (luật 1).
5. Ước hạn mức theo cách đếm ở `tp-ke-hoach-tuan` luật 1; đối chiếu phần còn lại trong bảng tuần.
6. Soát bảng kiểm §5 từng dòng. Dòng không đạt → sửa, hoặc ghi ⬜ kèm lý do.
7. Phiếu giao. Có câu cho sếp → dùng khuôn báo giữa chừng 3 dòng (gói §7.4, luật điền khuôn).

## Khuôn đầu ra
Khuôn brief: gói **§7.2** (không chép lại ở đây). Thêm ba ô bắt buộc đầu tệp:
```
Tên sản phẩm dùng: <tên trên hồ sơ>  ·  Tên sếp viết: <…>  ·  Khớp: có | không
Hạn mức: <n> clip × 3 % + <n> ảnh × 0,5 % = <%> × 1,3 = <%>  /  tuần còn <%>  →  đạt | vượt
Bảng kiểm §5: <số ô đạt>/<tổng>  ·  ô chưa đạt: <… | —>
```
Sau brief là phiếu giao chung.

## Thành công khi
- Biên kịch viết kịch bản không phải hỏi lại (chỉ số 3, gói §1).
- Mọi câu khẳng định trong brief trỏ được về một dòng hồ sơ.

## Thất bại khi
- Brief mơ hồ → làm lại (sổ lỗi §10; IPA: 69–73 % phải brief lại).
- Cho prompt chạy khi chưa có hồ sơ → AI bịa sản phẩm (video 01).
- Tên sản phẩm không tồn tại lọt từ lệnh xuống thẻ cuối, mồi bình luận (thi 11/11, phần Biên kịch) — chặn ngay ở brief (luật 2).
- Giá gạch, khan hiếm lọt vào lời và CTA (thi 11/11, bài đối chứng).

## Bộ thi
`tp-brief.thi/` — chưa có. Đề đề nghị: hồ sơ có dòng giá gạch + claim sức khoẻ, tin nhắn sếp gọi tên khác hồ sơ.
Chưa thi thì luồng gọi việc này kèm ⚠.
