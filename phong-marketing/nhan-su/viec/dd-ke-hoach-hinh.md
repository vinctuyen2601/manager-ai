# Đạo diễn hình ảnh · kế-hoạch-hình

Biến kịch bản đã chốt thành **bảng cảnh**: mỗi cảnh lấy hình từ đâu (quay thật · clip có sẵn · ghép · Muse), gom thành
đơn vị sinh, ước hạn mức. Chưa viết prompt ở việc này. Kiến thức: `../vai/dao-dien-hinh-anh.md`. Tệp này chỉ giữ thứ tự làm và luật bắt buộc.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Luồng Quảng cáo bước 7, trước `dd.viet-prompt` (chạy cùng `bk.chu-tren-hinh`). Hướng Lai: chỉ lập cảnh **còn thiếu**. Hoặc Trưởng phòng giao lẻ |
| Nhận | Phiếu giao `bk.kich-ban-qc` + `KICH-BAN.md` · hồ sơ sản phẩm (đạt M0) · tờ sản phẩm · thư mục media (ảnh, video thật, clip đã sinh) · hồ sơ nhân vật nếu cảnh có người |
| Giao | Bảng cảnh trong `video/<v>/KICH-BAN.md` theo khuôn gói §7 + 5 dòng đầu (khuôn dưới) · phiếu giao (`../../quy-che/khuon/phieu-giao.md`) |
| Xong khi | Mọi ô bảng cảnh có chữ (ô "Bề mặt hiển thị" và "Nguồn" không trống) · dòng hạn mức có trần và bản rút gọn · phiếu giao đủ ô |

## Luật bắt buộc
1. **Nếu một cảnh có sản phẩm (kể cả hộp in chữ) mà thư mục media không có ảnh hoặc khung video THẬT đúng mẫu** → ô "Nguồn" ghi
   `⬜ CHẶN — cần <ảnh gì, góc nào, cạnh ngắn ≥ 800 px>`, cảnh đó không lên đơn vị sinh; làm tiếp cảnh không có sản phẩm,
   câu xin ảnh vào "Cần sếp" (mẫu gói §6). Render của store chỉ được làm nguồn cho **bao bì**, không bao giờ cho thân sản phẩm.
2. **Nếu ô "Bề mặt hiển thị" có màn hình, ảnh trong ảnh, poster, bìa, chữ in mà người xem cần đọc hoặc nhận ra** → hướng của
   bề mặt đó là `quay thật` hoặc `ghép` (tư liệu thật chèn ở dựng, ghi tên tệp). Trong cảnh Muse, bề mặt đó chỉ được là
   **mặt trơn / tắt / quay đi**. Cú lộ cũng vậy — cú lộ càng không được để Muse vẽ. Chưa có tệp → ⬜, xin sếp.
3. **Nếu cảnh là màn lộ (mở hộp, lật vải, tối → sáng) mà ảnh thật chỉ có trạng thái SAU** (hộp đã mở, máy đã nằm trong hộp)
   → khung đầu = ảnh thật trạng thái sau, cho Muse diễn **ngược lại** (đóng nắp, che vải), ô "Nguồn" ghi `đảo ngược ở dựng`
   và báo Thợ dựng trong phiếu. Cách này giữ cả hook neo vào ảnh thật. Nhịp có cú bật đo bằng `neo_luc` thì không đảo
   (`gvv cat` đo cú bật trên clip gốc).
4. **Nếu viết dòng hạn mức** → đủ 4 ô: ước (ảnh × 0,5 % + clip × 3 %, **đếm cả ảnh**) · ×1,3 cho sinh lại · **trần**
   (10 %/video, gói §1; 40 %/gói, luồng bước 4) · **bản rút gọn** (bỏ/gộp cảnh nào, còn bao nhiêu %). Ước ×1,3 > 10 %
   → bản rút gọn là mặc định, bản đầy đủ đưa lên "Cần sếp".
5. **Nếu tên sản phẩm trên kịch bản hoặc phiếu trước không khớp hồ sơ** (hoặc không có hồ sơ tên đó) → phiếu giao mở bằng
   "Ý sếp là <tên gần nhất>?", lập bảng cho món gần nhất ⚠ và chỉ dùng ảnh thật của món đó. Không có món nào gần → `trang_thai: chan`.

## Bước
1. Đọc **phiếu giao** của Biên kịch rồi `KICH-BAN.md`. Đối chiếu tên (luật 5). Kiểm điều kiện đủ (gói §6).
2. Lập danh sách **cảnh → nguồn thật** (gói §4 bước 2): `ls` thư mục media, mở từng ảnh/khung, so với tờ sản phẩm
   (đúng mẫu, mặt in). Ảnh dính chữ/phụ đề gốc → ghi "xoá chữ trước khi dùng".
3. Chọn hướng từng cảnh theo gói §3.5 và "mẹo quyết nhanh". Thứ tự ưu tiên: **clip có sẵn** đạt (`da_co`, 0 %) →
   **quay thật** / video store, nhà cung cấp đúng mẫu (hướng 2, Lai) → **ghép** (ảnh tĩnh lia, logo ghép lên khung, ffmpeg, 0 %)
   → **Muse từ khung thật** → **Muse chỉ chữ** (chỉ cảnh không có sản phẩm).
4. Điền ô "Bề mặt hiển thị" cho **mọi** cảnh, kể cả cảnh ghi `không có` (gói §7, luật 2).
5. Gom cảnh Muse thành **đơn vị sinh** (gói §3.5 dòng "nhiều shot liền nhau", §4 bước 4): clip ≤ 10 s, cú bật nằm trọn một
   cảnh liền, nhịp quan trọng ở đầu clip (đuôi Muse chậm, gói §10). Mỗi clip có sản phẩm có một khung đầu từ ảnh thật.
6. Ước hạn mức và bản rút gọn (luật 4).
7. Tự soát các dòng gói §5 thuộc phần lập kế hoạch: khung đầu thật · "Bề mặt hiển thị" · cú bật một cảnh liền · ước ≤ trần ·
   tư liệu thật ghi "cần sếp cung cấp".
8. Viết phiếu giao `dd.ke-hoach-hinh`. "Cần sếp" lời thường, tối đa 3 câu, mỗi câu có mặc định.

## Khuôn đầu ra
Bảng shot: gói **§7** (không chép lại ở đây). Cột "Hướng" ghi một trong: `quay thật` · `clip có sẵn` · `ghép` · `Muse từ khung thật` ·
`Muse chỉ chữ`. Thêm 5 ô bắt buộc trên bảng:
```
Sản phẩm dùng: <tên trên hồ sơ>  ·  Khớp kịch bản: có | không → "Ý sếp là …?" ở phiếu giao
Cú lộ: cảnh <#> — Hướng: <…> — Bề mặt hiển thị: <…>
Hạn mức: <a> ảnh × 0,5 + <b> clip × 3 = <x> %  ·  ×1,3 = <y> %  ·  trần 10 %/video (40 %/gói)
Bản rút gọn: <bỏ/gộp cảnh nào> → <z> %   (mặc định nếu y > 10 %)
Cần tư liệu thật: <thứ gì — cho cảnh nào> | —
```

## Thành công khi
- Mọi cảnh có sản phẩm đứng trên pixel thật: sinh **từ** ảnh thật, hoặc dùng thẳng ảnh/video thật.
- Không bề mặt nào để máy tự vẽ nội dung; sếp biết ngay cần gửi tệp gì.
- Sếp thấy % hạn mức đặt cạnh trần và có sẵn bản rẻ hơn để chọn.

## Thất bại khi
- Để Muse tự vẽ nội dung màn hình ở cú lộ — đúng cảnh bán hàng chính (thi 11/11, bài có gói). Bài đối chứng chọn quay thật
  hoặc ghép video thật nên thắng tiêu chí này.
- Ước 27–48 % hạn mức nhưng không đặt cạnh trần, không tính tiền ảnh (thi 11/11, bài đối chứng).
- Cảnh có sản phẩm không có ảnh thật vẫn lên kế hoạch sinh (cả hai bài thi 11/11 bắt được; clip A 23/10 là hậu quả: Muse bịa máy).
- Render của store làm tham chiếu thân máy → Muse chép máy có tay đĩa (ảnh M, 23/10).
- Không ai hỏi "Ý sếp là Santa Spins?" khi tên lệch (thi 11/11, cả hai bài).

## Bộ thi
`dd-ke-hoach-hinh.thi/` — **chưa lập**. Đề hồi quy: đề của bài thi 11/11 (hoà 16–16). Theo `README.md`, việc chưa qua bộ thi
thì chưa được gọi trong luồng.
