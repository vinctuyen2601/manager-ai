# Trưởng phòng · điều-phối

Chạy một luồng: đọc phiếu mới nhất, rẽ nhánh theo `trang_thai`, **mở tệp kiểm**, rồi giao bước kế cho agent con.
Vì sao tách thành việc riêng: đây là vòng lặp chạy nhiều lần nhất mỗi lô, và hai lỗi nặng của bài thi 11/11 (lỗi 429,
báo "xong" mà chưa xong) đều nằm ở đây — không thuộc nhận việc hay brief.
Cách chạy chung: `../../luong/README.md`. Kiến thức: `../truong-phong.md` §3.4, §11.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Sau mỗi phiếu giao mới trong `viec-dang-chay/<thư mục>/` · khi chạy tiếp một luồng dừng giữa chừng |
| Nhận | Tệp luồng · phiếu số lớn nhất trong thư mục · các tệp ở dòng `giao` của phiếu đó |
| Giao | Lệnh giao cho agent con bước kế (khuôn dưới) · một dòng nhật ký trong `00-dieu-phoi.md` · khi luồng dừng (chờ sếp hoặc hết luồng): phiếu giao |
| Xong khi | Phiếu trước đã kiểm bằng mở tệp · bước kế đã nhận lệnh giao đủ ô |

## Luật bắt buộc
1. **Nếu `trang_thai: xong`** → mở từng tệp ở dòng `giao`, soát ô "Xong khi" của tệp việc đó từng dòng. Một dòng không đạt →
   coi như `chan`, trả lại đúng vai đó (thi 11/11: thí sinh báo 0 khung đen, thực có 1).
2. **Nếu `trang_thai: chan`** → làm theo cột "Nếu chặn" của luồng ở bước đó. Quay lại quá số lần cột cho phép → `tp-hop` gỡ chặn.
3. **Nếu `trang_thai: can-sep`** → báo sếp ngay bằng khuôn báo giữa chừng 3 dòng (gói §7.4); trong lúc chờ, giao các bước
   không phụ thuộc (mục "Chạy song song được" của luồng).
4. **Nếu bước kế cần dữ liệu web về sản phẩm** → chỉ giao cho Chuyên viên SP, một agent cho một shop tại một lúc; vai khác nhận
   hồ sơ (thi 11/11: 12 agent cùng gọi một shop → lỗi 429 hàng loạt).
5. **Nếu việc của bước kế chưa qua bộ thi** (`README.md`) → vẫn giao, ghi ⚠ vào lệnh giao, và khi nhận về thì đọc **toàn tệp**,
   không chỉ ô "Xong khi".

## Bước
1. Mở thư mục, lấy phiếu số lớn nhất, đọc phần đầu.
2. Rẽ nhánh theo luật 1–3.
3. Tra tệp luồng: bước kế, `vai.việc`, cột Nhận, cột Cổng. Kiểm mọi tệp ở cột Nhận **có thật** trên đĩa
   (sổ lỗi §10, "Thiếu tệp khi bàn giao").
4. Giao agent con theo khuôn dưới. Bước chạy song song được → giao cùng lúc, mỗi agent ghi một tệp khác nhau.
5. Ghi một dòng nhật ký. Hết bước cuối của luồng → `tp-hop` cuối lô.
6. Luồng dừng (chờ sếp hoặc xong) → viết phiếu giao chung: ô "Cần sếp" gom từ các phiếu, lời thường, tối đa 3 câu.

## Khuôn đầu ra
Lệnh giao (đủ 6 thứ ở gói §11: mục tiêu · khuôn đầu ra · công cụ · ranh giới · nơi ghi · hạn):
```
Vai: ../<vai>.md   ·   Việc: viec/<tệp>.md   ·   ⚠ chưa thi (nếu có)
Mục tiêu: <1 câu>          Đọc: <phiếu trước> + <tệp ở dòng giao>
Ghi vào: viec-dang-chay/<thư mục>/<số kế>-<vai>-<việc>.md — trả về đường dẫn, không dán nội dung
Được dùng: <công cụ>       Không làm: <phần của vai khác> · <lấy dữ liệu web, nếu không phải SP>
Hạn: <ngày thật>
```
Nhật ký `00-dieu-phoi.md`, mỗi lượt một dòng (bắt buộc cột "Đã mở kiểm"):
```
| Giờ | Phiếu đã đọc | trang_thai | Đã mở kiểm: tệp · đạt/không | Giao gì cho ai |
```

## Thành công khi
- Không bước nào chạy trên đầu vào chưa kiểm.
- Dừng giữa chừng thì người khác đọc nhật ký là chạy tiếp được.

## Thất bại khi
- Tin lời agent con "xong" mà không mở tệp → lỗi lọt tới sếp (thi 11/11, khung đen).
- Nhiều agent cùng gọi một shop → bị chặn hàng loạt (thi 11/11).
- Bàn giao thiếu tệp → clip lệch cảnh trước (video 01, clip B).

## Bộ thi
`tp-dieu-phoi.thi/` — chưa có. Đề đề nghị: thư mục giả có phiếu "xong" nhưng tệp còn một khung đen / thiếu một ô bắt buộc.
