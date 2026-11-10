# Săn xu hướng · chuyển-khung

Chọn khung trong thư viện `khung/` cho một sản phẩm: khung nào chuyển được, **phần nào phải đổi**, phần nào không được đổi.
Phép kiểm gốc: **từng yếu tố LÕI** của khung có làm được với sản phẩm này không. Không chấm cảm tính, không ước %.
Kiến thức: `../san-xu-huong.md` §2 ý 4 (LÕI là luật cứng), §4 bước 8–10, §3.4 (bão hoà, mùa), §9 (khung 01, 02); quy tắc M3 ở `../../CLAUDE.md`.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Luồng Quảng cáo bước 3 (chạy cùng bước 2 được khi đã biết loại sản phẩm). Hoặc Trưởng phòng giao lẻ |
| Nhận | Phiếu nhận việc (sản phẩm, thị trường, kênh) · hồ sơ `san-pham/<tên>.md` (hoặc loại sản phẩm nếu hồ sơ chưa xong) · thư viện `khung/` |
| Giao | `03-sxh-khung.md` trong thư mục lần chạy theo khuôn dưới · phiếu giao |
| Xong khi | Mỗi khung xét có bảng đối chiếu LÕI đủ dòng · phán quyết một trong ba mức · phiếu đủ ô |

## Luật bắt buộc
1. **Nếu sản phẩm thiếu, hoặc không làm được, dù chỉ một yếu tố LÕI** của khung → phán **"không chuyển nguyên khung"**.
   Không ghi "chuyển được N %". Nêu phương án (khung khác · giữ thân đổi hook · bóc video mẫu mới) và hỏi sếp.
2. **Nếu một yếu tố LÕI làm được nhưng sai sự thật với shop hoặc mang tên/logo hãng khác** (vd "RUN to TARGET" với shop
   chỉ bán online, biển Target) → phán **"chuyển khi sếp trả lời"**; câu hỏi kèm phương án, không tự thay (gói §9 khung 02, 03).
3. **Nếu ghi "có" ở cột sản phẩm** → cột bằng chứng phải trỏ **dòng hồ sơ, ảnh hoặc video thật** của sản phẩm.
   Không có bằng chứng → ⬜ = coi như thiếu, áp luật 1 khi dòng đó là LÕI.
4. **Nếu khung mang nhãn `bão hoà` hoặc mùa sắp hết** (hạn ship, gói §3.4) → ghi vào ô "Mùa · bão hoà" kèm số ngày còn dùng được;
   khung bão hoà chỉ giao kèm đề xuất góc/câu mới, không giao như trend mới.
5. **Nếu không khung nào qua luật 1–2** → `trang_thai: chan`. Luồng chạy `sxh-boc-khung` trên video mẫu sếp gửi; không có video thì hỏi sếp.

## Bước
1. Đọc phiếu và hồ sơ: sản phẩm **làm gì thấy được** (cú bật có thật: đèn, quay, nhạc…), cỡ, nơi bán, nguyên liệu đang có.
2. Lọc thư viện theo nhãn đầu tệp khung (dạng nội dung × hook × ngành × mùa, gói §7, §3.8). Chưa có tệp chỉ mục → mở đầu từng tệp `khung/`.
3. Mỗi khung ứng viên: chép **nguyên** danh sách LÕI từ mục (b) của khung, đối chiếu từng dòng với sản phẩm (luật 1–3).
4. Khung qua: liệt kê phần **Phụ** phải đổi (chỉ đổi đồ vật, cùng cảnh — gói §4 bước 10) và nguyên liệu khung đòi (✅ có / ⬜ thiếu).
5. Ghi mùa, bão hoà, trùng thân (luật 4). Chọn **một** khung, ghi vì sao hơn khung kia.
6. Phiếu giao. Ô "Cần sếp" viết lời thường, không mã `LÕI`, `khung 0x` (`_phieu-giao.md`).

## Khuôn đầu ra
```
Sản phẩm: <tên trên hồ sơ>  ·  Thị trường · kênh: …  ·  Khung chọn: <tệp | không có>
Phán quyết: chuyển nguyên khung | chuyển khi sếp trả lời <câu số> | không chuyển nguyên khung
Mùa · bão hoà: <nhãn khung> — còn dùng được tới <ngày> | —

## Đối chiếu LÕI — khung <tệp>   (một bảng cho mỗi khung đã xét)
| # | Yếu tố LÕI (giây trong khung) | Sản phẩm làm được? có / không / cần sếp | Bằng chứng (dòng hồ sơ · ảnh · video) | Nếu thiếu: mất gì |
## Phần phải đổi (chỉ Phụ)      | Giây | Trong khung | Đổi thành | Vì sao |
## Nguyên liệu khung đòi         | Thứ | ✅ có (tệp) / ⬜ thiếu |
## Khung đã xét và loại          | Tệp | Yếu tố LÕI không qua | 
```

## Thành công khi
- Biên kịch viết được kịch bản từ khung đã chọn mà không đụng yếu tố LÕI nào.
- Khi không chuyển được, sếp đọc một câu biết vì sao và chọn được phương án.

## Thất bại khi
- Ước "chuyển được 60–65 %" dù sản phẩm thiếu yếu tố LÕI số 1 (thi 11/11, đối chứng). Bài có gói nói thẳng không chuyển
  nguyên khung được và hỏi sếp — đó là cách đúng.
- Thay "kệ siêu thị + hộp đẹp" bằng "hộp giao trước cửa" vì lo Muse vẽ sai chữ → mất cú hook "store find" (khung 01 bản đầu, gói §9).
- Giao khung Giáng sinh sau hạn ship mà không ghi số ngày còn dùng được.

## Bộ thi
`sxh-chuyen-khung.thi/` ⬜ chưa lập thư mục. Đề 11/11 (phần chuyển khung) dùng làm đề hồi quy.
