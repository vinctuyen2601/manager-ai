# Đạo diễn hình ảnh · kiểm-clip (nội dung hình)

Xem ảnh và clip Muse vừa sinh, trả lời câu đầu tiên trên thẻ chấm của sếp: **"đúng sản phẩm không?"**, rồi quyết
**đạt · cắt trước giây X · sinh lại**. Chỉ kiểm **nội dung hình**. Kỹ thuật (độ to, khung đen, vùng an toàn, độ phân giải,
nhịp lệch) là việc Thợ dựng (`td.do-qc`) — thấy thì chuyển một dòng, không chấm. Kiến thức: `../vai/dao-dien-hinh-anh.md`.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Luồng Quảng cáo bước 9, sau khi sếp bấm Muse (bước 8). Chạy hai lượt: **ảnh khung đầu** trước, **clip** sau |
| Nhận | Ảnh/clip trong thư mục media (tên `<clip>.mp4`) · `<ten>-prompt.md` (dòng "Kiểm", "Dựng lấy") · tờ sản phẩm · hồ sơ sản phẩm (danh sách nhận diện, mỏ neo) |
| Giao | Bảng "Kiểm khi có clip" trong `video/<v>/KICH-BAN.md` (khuôn dưới) · danh sách sinh lại (nếu có) · phiếu giao |
| Xong khi | Mọi ảnh/clip có kết luận · mọi dòng "sinh lại" có nguyên nhân gốc và chỗ sửa · không cảnh nào quá 2 lần sinh lại · phiếu giao đủ ô |

## Luật bắt buộc
1. **Nếu một khung có sản phẩm lệch tờ sản phẩm ở bất kỳ mỏ neo nào** (viền, tỉ lệ, màu, bộ phận chức năng, số và kiểu chi tiết —
   Santa Spins: khung acrylic gần vuông, 4 ốc bạc, vòng LED, 9 nhãn khác nhau) → ô "Đúng SP?" ghi `sai @ <giây>: <mỏ neo>`.
   Không có ô "tạm được". So với **tờ sản phẩm và ảnh thật**, không so với render hay với lời prompt.
2. **Nếu thấy vật lạ, tay/người thừa, chữ hay màn hình hay ảnh-trong-ảnh do máy vẽ, hoặc phong cách trôi** → ghi giây vào ô
   "Vật lạ". Xem riêng **2 giây cuối**. Lỗi nằm ngoài cửa sổ "Dựng lấy" và cửa sổ còn ≥ độ dài cần → `cắt trước <giây>`;
   lỗi nằm trong cửa sổ → `sinh lại`.
3. **Nếu quyết sinh lại** → điền ô "Nguyên nhân gốc → sửa ở" trước (prompt · tham chiếu · hồ sơ; tra sổ lỗi gói §10), sửa đúng
   chỗ đó qua `dd.viet-prompt`, chạy lại `gvv prompt`. Không bấm lại cùng một prompt mong lần sau may hơn (gói §4 bước 9).
4. **Nếu một cảnh đã sinh lại 2 lần vẫn sai** → dừng cảnh đó, `trang_thai: can-sep`, "Cần sếp" đưa phương án bằng lời thường:
   đổi sang quay thật / ghép / bỏ cảnh, hoặc gửi ảnh góc khác. Ghi số % hạn mức đã tiêu cho cảnh đó.
5. **Nếu ảnh khung đầu sai** → sinh lại ảnh (~0,5 %), **không** cho sinh clip từ ảnh đó (clip ~3 %, gói §2 nguyên tắc 9).
   Ảnh sai vì tham chiếu là render → đổi tham chiếu sang ảnh/khung thật, không sửa chữ.

## Bước
1. Mở tờ sản phẩm và hồ sơ: chép danh sách mỏ neo vào ô đầu bảng. Đọc dòng "Kiểm" của từng ảnh/clip trong `<ten>-prompt.md`.
2. **Lượt ảnh:** mở từng ảnh, đặt cạnh tờ sản phẩm, soi từng mỏ neo + mọi bề mặt hiển thị (phải đúng như bảng cảnh: mặt trơn, tắt, quay đi).
3. **Lượt clip:** rút khung để xem (không xem lướt):
   `ffmpeg -i <clip>.mp4 -vf "fps=2,scale=360:-1,tile=5x4" <clip>-luoi.jpg` (toàn clip)
   `ffmpeg -sseof -2 -i <clip>.mp4 -vf "fps=6,scale=360:-1,tile=4x3" <clip>-cuoi.jpg` (2 giây cuối).
   Soi đúng cửa sổ "Dựng lấy" kỹ nhất; cú bật phải xảy ra đúng nơi bảng cảnh ghi (gói §9, hỏng 4: bật trên kệ thay vì tủ lạnh).
4. Điền bảng (khuôn dưới). Kết luận theo luật 1–2.
5. Sinh lại theo luật 3–5. Clip đạt → ghi `"da_co"` vào kịch bản cảnh để lần chạy sau không tính hạn mức; clip đạt có thể thành
   tham chiếu chuẩn cho video sau (gói §3.2).
6. Thấy lỗi kỹ thuật → một dòng cho Thợ dựng ở phiếu giao, không tính vào kết luận.
7. Phiếu giao `dd.kiem-clip`: clip đạt + đoạn dùng/bỏ cho Thợ dựng (gói §11); bài học về sản phẩm → báo Chuyên viên SP sửa
   hồ sơ; bài học về Muse → gói §3.3. Mỗi điều ghi một chỗ.

## Khuôn đầu ra
```
So với: <tờ sản phẩm.jpg> + <ảnh thật …>  ·  Mỏ neo: <danh sách từ hồ sơ>
```
| Tệp | Lần | Đúng SP? (`đạt` / `sai @ giây: mỏ neo`) | Bề mặt hiển thị đúng bảng cảnh? | Vật lạ (giây) | 2 s cuối | Kết luận: đạt · cắt trước X s · sinh lại | Nguyên nhân gốc → sửa ở | % hạn mức |
|---|---|---|---|---|---|---|---|---|

Ô trống = chưa kiểm xong. Cột "Nguyên nhân gốc" ghi `—` khi kết luận là đạt.

## Thành công khi
- Thợ dựng chỉ nhận clip đúng sản phẩm, biết đoạn nào dùng, đoạn nào bỏ.
- Mỗi lần sinh lại sửa một nguyên nhân có tên; số lần sinh / clip dùng được ≤ 1,5 (gói §1).

## Thất bại khi
- Clip M bản 1 "vòng trông vàng" được coi là đúng, thật ra là máy khác chép từ render có tay đĩa (23/10).
- Cú bật xảy ra trên kệ bếp rồi máy mới lên tủ lạnh — sai chỗ đặt vì thiếu khung đầu đúng bối cảnh (clip B bản 1, video 01).
- Sinh lại nhiều lần cùng một prompt, không ghi nguyên nhân → tốn hạn mức, lỗi lặp.

## Bộ thi
`dd-kiem-clip.thi/` — **chưa lập**. Đề đề xuất: bộ ảnh/clip thật của video 01 (ảnh K, M, clip A, B bản 1 — có lỗi đã biết) trộn với bản đạt.
