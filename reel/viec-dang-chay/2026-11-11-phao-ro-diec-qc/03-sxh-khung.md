---
viec: sxh.chuyen-khung
trang_thai: chan
nhan: [01-tp-nhan-viec.md, 00-dieu-phoi.md, ../../luong/quang-cao.md, ../../KIEN-THUC-VIRAL.md, ../../CLAUDE.md, ../../khung/reel-01-frostglow.md, ../../khung/reel-02-frostglow-hook-me.md, ../../khung/reel-03-merryspin-tu-lanh.md, ../../chuyen-vien/san-xu-huong.md, ../../chuyen-vien/viec/sxh-chuyen-khung.md, ../../chuyen-vien/viec/_phieu-giao.md, ../2026-11-11-orb-qc/03-sxh-khung.md, ../../thu-nghiem/video-mau/phao-ro-diec-shop/(goc.mp4, do.json, khung-nhap.md, luoi-01..03.jpg), ../../thu-nghiem/san-pham/phao-ro-diec/phao-dien-cam-bien-ro-diec-tieu-ngu-nhi-led-425/(trang.txt, ho-so-nhap.md, CAN-BO-SUNG.md, anh-01..08.webp)]
giao: [03-sxh-khung.md]
con_thieu: [cảnh phao trên mặt nước ban đêm, cảnh có tác nhân thấy được làm đuôi đỏ (cá cắn / dây nhấp), hook mở đầu có hành động trong 1,5 s đầu, bản video shop chưa chèn chữ vàng, video mẫu viral đúng ngành đồ câu VN để bóc khung riêng]
ngay: 2026-11-11
---

Sản phẩm: **Phao Điện Cảm Biến Rô Diếc Tiểu Ngư Nhi LED-425 - Báo Đỏ Khi Cá Cắn** (hồ sơ `san-pham/<tên>.md` ⬜ Chuyên viên SP đang viết; bằng chứng tạm lấy từ `trang.txt` + `ho-so-nhap.md` + video shop)  ·  Thị trường · kênh: Việt Nam ⚠ · Facebook Reels + TikTok ⚠ (phiếu 01)  ·  Khung chọn: **không có** — gần nhất để làm nền: `khung/reel-03-merryspin-tu-lanh.md` (chỉ cơ chế "biến đổi trong một cảnh liền + đổi chữ mời bình luận đúng lúc bật"), hook lấy cơ chế đếm ngược của khung 02/03
Phán quyết: **không chuyển nguyên khung** (cả 3 khung — luật 1; khung 01, 02, 03 còn vướng thêm luật 2 ở "nơi mua")
Mùa · bão hoà: cả 3 khung = **Giáng sinh, Mỹ**, tiếng Anh → **không áp cho phao câu VN**: yếu tố mùa (cây thông, quà) là Phụ và bỏ hết; không có hạn mùa cho sản phẩm này (trang không gắn dịp nào). Câu hook khung 01/03 "Every Christmas lover NEEDS this" = `bão hoà` (≥ 2 hãng) — không dùng, đằng nào cũng phải viết câu tiếng Việt mới. Còn dùng được tới: —

**Hướng Lai — đọc thế nào:** THÂN là video thật của shop (`goc.mp4`). Vì vậy mỗi yếu tố LÕI dưới đây được hỏi hai câu:
(1) **sản phẩm** có làm được không, (2) **video shop đã có cảnh đó chưa** — chưa có thì nó vào bảng "Cảnh còn thiếu" (bước 7 chỉ lập những cảnh này).
Cột "Sản phẩm làm được?" chỉ ghi "có" khi trỏ được dòng trang / ảnh / giây video (luật 3).

## Số đo video shop (tự soi lại, 11/11)

`gvv boc` báo **"bật sáng: không"** vì đo độ sáng cả khung — cú đổi màu LED quá nhỏ so với khung. Tự đo lại:

**Cách đo đỏ:** `ffmpeg -i goc.mp4 -vf crop=360:840:200:380,scale=90:160 -f rawvideo -pix_fmt rgb24 -` (vùng đuôi phao + lòng bàn tay, soi vị trí từ lưới) → mỗi khung đếm % điểm ảnh **R > 200, G < 110, B < 110**; "đang đỏ" = > 0,6 %. Nền lúc nhiều màu 0,02–0,3 %, lúc đỏ 1,0–4,3 % → tách rõ. Kịch bản đo: scratchpad `do_do.py` (không lưu vào repo).

| Mốc | Giây (đo) | Thấy trên hình (soi lưới 4 khung/giây + cắt dày 8–12 khung/giây) |
|---|---|---|
| Điểm cắt 0,10 s | ✅ **cắt thật** | 3 khung đầu (0–0,07 s) là một lượt quay khác (phao đặt lệch). Từ 0,10 s → 15,32 s **một cảnh liền**, không cắt nào khác (`do.json` chỉ có một điểm cắt) |
| Phao "tắt" | 0,10 → ~2,2 | Tay cầm 3 phao, thấy thân xanh ngọc + đuôi sơn đỏ/vàng/đen. ⚠ Đỉnh đuôi có đốm trắng — **chưa chắc LED đã tắt hẳn**, nghiêng về "đã sáng sẵn nhưng ban ngày không thấy" ~60 % (khung 0–0,07 s của lượt quay kia đã thấy đuôi hồng/xanh sáng). Cần bản quay ban đêm để chắc |
| "Bật" nhiều màu | ~2,2 → ~2,9 | Phao **trượt xuống**, đuôi vào nền lòng bàn tay; 2,25–2,6 s ánh đỏ hắt lên ngón cái; từ ~2,75–3,0 s đuôi rõ từng đoạn hồng/xanh lá. **Không phải cú bật sạch tối → sáng** (vừa chuyển động vừa đổi sáng) |
| Đỏ lần 1 | **5,10 → 6,00** (0,93 s) | Cả đuôi + dải sáng trong lòng bàn tay chuyển đỏ/vàng; mắt thấy chớm vàng từ ~5,0 s |
| Đỏ lần 2 | **7,67 → 8,63** (1,00 s) | Như trên, mạnh nhất (3,97 %) |
| Đỏ lần 3 | **10,23 → 11,20** (1,00 s) | Đỉnh đuôi đỏ + dải vàng; đỏ yếu hơn (bình nguyên ~1,0 %) |
| Đỏ lần 4 | **13,80 → 14,77** (1,00 s) | Như lần 2 |
| Giữa các lần đỏ | 2,6–3,6 s nhiều màu đứng yên | Tay gần như đứng yên. ⚠ **Không thấy tác nhân làm đuôi đỏ** (không có dây, nước, cá; không thấy tay gõ rõ ràng) |
| Chữ trên hình | 0 → 15,32 (cứng) | `PHAO RÔ DIẾC ĐÈN LED SIÊU NHẠY`, chữ đen nền vàng, dải ngang ~y 1060–1120 / 1280, **in cứng vào hình** |
| Logo | 0 → 15,32 | Logo tròn vàng "17 FISHING" mờ góc trên trái (soi khung 0,05 s) |
| Tiếng | 0 → 15,32 | −15…−17 dB đều suốt bài, không có khoảng lặng ≥ 0,25 s ở −45 dB (`silencedetect`). **Là nhạc hay tiếng nền: ⬜ chưa bóc** (máy không có faster-whisper); không có chỗ "nhạc vào" đo được |
| Bối cảnh | toàn bài | Trong nhà, **ban ngày**, mặt bàn xám đậm, phía sau là bàn ghế văn phòng, thùng rác. Không có nước, không có đêm |

## Đối chiếu LÕI — khung `reel-01-frostglow.md` (chép nguyên mục "Vì sao viral")

| # | Yếu tố LÕI (giây trong khung) | Sản phẩm làm được? | Bằng chứng (dòng hồ sơ · ảnh · video) | Nếu thiếu: mất gì |
|---|---|---|---|---|
| 1 | Khoảng trống tò mò: chữ gọi tên người xem, không nói sản phẩm làm gì; trả lời ở 7,9 s (chữ 0–11,8 s) | **có** — nhưng video shop đang **phá** nó | Câu trả lời thấy được có thật: cả đuôi đỏ — trang "Cá chạm mồi là cả đuôi chuyển sang đỏ" (`trang.txt` dòng mô tả) + video 5,10 / 7,67 / 10,23 / 13,80 s. Người để gọi tên có thật: "anh em hay câu rô diếc ban đêm ở hồ dịch vụ" (`trang.txt`). Vướng: chữ cứng `PHAO RÔ DIẾC ĐÈN LED SIÊU NHẠY` nói ngay sản phẩm là gì từ 0 s → phải che (xem Phần phải đổi) | Lý do xem tới cú đỏ |
| 2 | "Store find": lối kệ siêu thị đầy hộp, tự tay lấy (1a, 0–1,6 s) | **không** (+ cần sếp nếu muốn) | Trang chỉ có đặt online, COD, Zalo, hotline; không thấy địa chỉ cửa hàng (`grep` "địa chỉ / cửa hàng / showroom" trong `trang.txt`: 0 dòng) → ⚠ suy ra shop bán online. Không có ảnh hộp (`ho-so-nhap.md` "Hộp / bao bì ⬜") | Cú hook "hàng thật, ngoài tiệm cũng có" |
| 3 | Hộp đẹp, mặt hộp tự kể điểm bán, giơ thẳng vào máy (1b, 1,6–2,6 s) | **không** ⬜ | Không ảnh hộp; 8 ảnh trang đều là ảnh đồ hoạ phao trần (`anh-01..08.webp`, đã xem); trang không nói có hộp | Tín hiệu "quà / hàng tử tế" + mặt hộp thay lời dẫn |
| 4 | Biến đổi tối → sáng **trong một cảnh liền**, khớp chỗ nhạc vào (cảnh 5–6, bật 7,9 s) | **có một nửa → coi như thiếu** | Biến đổi một cảnh liền ✅: nhiều màu → đỏ 4 lần trong cùng cảnh (bảng số đo). Nhưng (a) ban ngày, đổi màu nhỏ so với khung; (b) cú "bật" ~2,2–2,9 s lẫn với chuyển động phao, không sạch; (c) khớp nhạc ⬜ — tiếng chưa bóc, không có điểm "vào" | Cú trả lời "oà" của cả video |
| 4b | Ngày → tối: mua, mở, lắp ban ngày; bật lúc tối (cảnh 1–4 → 5) | **không có cảnh** ⬜ | Sản phẩm sinh ra cho đêm (trang "Phao đêm…", "về khuya vẫn thấy tín hiệu rõ") nhưng **video shop không có giây nào tối**; ảnh `anh-05.webp` là ảnh ghép đồ hoạ ngày/đêm, không phải ảnh thật | Đèn không rực; mất dấu "tối ra hồ" |
| 5 | Hành trình mua → mở → lắp → bật, đúng thứ tự (cảnh 1–6) | **không** | Mua = store find ✗ (dòng 2) · mở = hộp ⬜ (dòng 3) · lắp = lắp pin CR425 / buộc phao vào dây: có thật (trang "Lắp pin đúng chiều", "Tặng 1 pin CR425") nhưng **không có cảnh** · bật = có (dòng 4) | Mạch tò mò được trả lời dần |

## Đối chiếu LÕI — khung `reel-02-frostglow-hook-me.md` (hook 0–3,4 s; thân = khung 01)

| # | Yếu tố LÕI (giây trong khung) | Sản phẩm làm được? | Bằng chứng | Nếu thiếu: mất gì |
|---|---|---|---|---|
| 1 | Mặt người thật nhìn thẳng máy ngay khung đầu (0–2,7 s) | **⬜ coi như thiếu** | Không phụ thuộc sản phẩm; không có ảnh người mẫu; AI dựng được (M3) nhưng giữ mặt chưa đo (khung 02 tầng 3) | Cú dừng ngón tay bằng mặt người (sổ tay 5b phát hiện 2) |
| 2 | Đếm ngược "3, 2, 1" (0–2,6 s) | **có** | Giọng người, không phụ thuộc sản phẩm. Hợp lạ với phao: đếm → đuôi đỏ (video 5,10 s) — **nếu** đỏ kích được theo ý (xem câu hỏi 2) | — |
| 3 | Mở quà: hộp bọc vải, giật ra lộ **mặt hộp** (2,7–3,4 s) | **không** ⬜ | Không có ảnh hộp (như khung 01 dòng 3) | Cảm giác món quà + mặt hộp kể điểm bán |
| 4 | Chữ gọi tên + thúc giục + **nơi mua** ("Christmas Moms… RUN to TARGET") | **không** (+ cần sếp) | Gọi tên ✅ (anh em câu đêm rô diếc — `trang.txt`). Nơi mua tiệm ✗ (như khung 01 dòng 2). Thúc giục có thật: trang có "Flash sale −50 % hôm nay" kèm đếm giờ — ⚠ không biết là khuyến mãi thật hay luôn chạy; phiếu 01 đã tự quyết **không đưa giá vào video** → không có gì thật để làm vế "gấp" | CTA trá hình + gấp gáp |
| 7–… | Toàn bộ LÕI của thân khung 01 (4, 4b, 5) | **không** | Như khung 01 | Như khung 01 |

## Đối chiếu LÕI — khung `reel-03-merryspin-tu-lanh.md`

| # | Yếu tố LÕI (giây trong khung) | Sản phẩm làm được? | Bằng chứng | Nếu thiếu: mất gì |
|---|---|---|---|---|
| 1 | Vật bí ẩn phủ vải + đếm 3-2-1 (0–3,8 s) | **có** ⚠ | Phao dài 39–40 cm, thon (`trang.txt` "Chiều dài 39.0 cm") — dưới vải là một vệt dài, đủ tò mò; 3 phao cầm một tay có thật (video 0,10 s). ⚠ chưa có cảnh này, phải quay/dựng mới | — |
| 2 | "Store find" ở Target: biển Target đọc được (0–3,8 s) | **không** (+ cần sếp) | Như khung 01 dòng 2; thêm: biển/tên cửa hàng của bên khác (gói §3.6) | Bằng chứng xã hội "tiệm ai cũng biết có bán" |
| 3 | Hộp bán lẻ có cửa sổ thấy máy + phụ kiện (3,8–4,2 s) | **không** ⬜ | Không ảnh hộp | Lộ ra là hiểu ngay sản phẩm |
| 4 | Lưới 9 đĩa 3×3 trên tủ lạnh (6,0–11,6 s) | **không — không có thứ tương đương thật** | Bán từng cây; 3 mã QF-01/02/03 là 3 lựa chọn tải chì, **không phải bộ sưu tập đi kèm** (`trang.txt` "Ba mã cùng thân… chỉ khác tải chì"); phụ kiện duy nhất là 1 pin CR425. Xếp 9 phao thành lưới = cho thấy thứ khách không nhận (sổ tay 0e) | Hình "sưu tập" đã mắt + "9 lựa chọn" |
| 5 | Đặt đĩa → vòng đèn sáng, trong một cảnh liền (6,7–7,8 s) | **có** | Một cảnh liền 0,10–15,32 s; nhiều màu → **cả đuôi đỏ** ở 5,10 s, lặp 7,67 · 10,23 · 13,80 s (số đo trên). Đây là cảnh **mạnh nhất** của video shop | — |
| 6 | Đổi chữ thành kêu gọi bình luận đúng lúc bật, từ khoá = tên hãng (7,8 s) | **có** | Tên dùng được: "17 Fishing" (logo trong video + `logo-17fishing.png`), "Tiểu Ngư Nhi" (hãng, `ho-so-nhap.md` mục 1). Mốc đặt chữ = 5,10 s (hoặc 7,67 s) của thân. Câu tiếng Việt Biên kịch viết | Vòng thứ hai sau cú trả lời + tín hiệu bình luận |

## Phần phải đổi (chỉ Phụ)

Chỉ áp khi sếp chọn phương án B ở "Cần sếp" (ghép: hook đếm ngược + thân video shop theo cơ chế khung 03 dòng 5–6). Không dòng nào thay yếu tố LÕI; các LÕI không làm được ở trên **không** được thay bằng thứ khác khi chưa có lời sếp.

| Giây | Trong khung | Đổi thành | Vì sao |
|---|---|---|---|
| khung 03, 6,0–11,6 s (Phụ 7) | Một cảnh tủ lạnh 5,6 s, kết bằng lùi máy thấy tủ lạnh retro | **Thân = video shop**, tay cầm 3 phao, máy đứng; cắt sao cho **lần đỏ đầu tiên rơi ~7,8 s tổng** (hook ~2,7–3 s + thân từ ~0,1 s → đỏ 5,10 s). Không lùi máy | Giữ mốc trả lời 7,8–7,9 s của cả 3 khung (sổ tay 0, ý 3); video shop không có cú lùi máy |
| khung 01, 8,5–11,8 s (Phụ 6 "dồn cảnh chứng minh") | Nhiều phòng ~1 s/cảnh | Lần đỏ thứ 2 (7,67 s thân) **hoặc** cắt sang cảnh phao đêm trên nước ⬜ — **không** lặp đủ 4 lần đỏ giống hệt | Lặp lại cái đã thấy = lý do bỏ đi (sổ tay 0b); leo thang thật là "ra hồ, ban đêm" |
| khung 03, toàn bài (Phụ 8) | Giọng nữ đếm ngoài khung, tiếng Anh | Giọng nam tiếng Việt, kiểu cần thủ ⚠ | Tệp khách là cần thủ câu đêm (`trang.txt`) |
| khung 03, toàn bài (Phụ 7 thẩm mỹ) | Bếp đá trắng, tủ lạnh retro kem, Giáng sinh | Bàn tay thật + nền bàn xám của video shop; cảnh mới (nếu có) là bờ hồ dịch vụ ban đêm | Hàng 99k: bối cảnh "đồ nghề thật" nói đúng mức giá (sổ tay 0c); Giáng sinh không liên quan |
| thân (video shop), 0 → 15,32 s | (không có trong khung) | **Che / thay dải chữ cứng** `PHAO RÔ DIẾC ĐÈN LED SIÊU NHẠY` (y ~1060–1120) bằng chữ mới đúng chỗ đó | Chữ nói luôn sản phẩm là gì → phá khoảng trống tò mò; trùng vùng chữ mời bình luận |
| thân (video shop), 0 → 0,10 s | (không có trong khung) | Bỏ 3 khung đầu | Lượt quay khác, cắt thật (số đo) |
| thân, ~2,2–2,9 s | (không có trong khung) | Không dùng làm "cú bật" | Phao vừa trượt vừa đổi sáng, không phải tối → sáng sạch; cú trả lời là **đỏ** |
| toàn bài (khung 01 Phụ 9) | 11,6–11,8 s, không CTA | Tổng ~12–15 s; giữ chữ mời bình luận (LÕI 6 khung 03) | Thân 15,2 s + hook 3 s = 18 s là dài hơn nội dung có (sổ tay 0b) |

## Nguyên liệu khung đòi

| Thứ | ✅ có (tệp) / ⬜ thiếu |
|---|---|
| Cảnh biến đổi trong một cảnh liền (nhiều màu → đỏ) | ✅ `thu-nghiem/video-mau/phao-ro-diec-shop/goc.mp4` 5,10 · 7,67 · 10,23 · 13,80 s |
| Logo cho thẻ kết / trong cảnh | ✅ `logo-17fishing.png` (nền trong suốt) + logo mờ có sẵn trong video |
| Ảnh sản phẩm thật làm khung đầu cho cảnh AI | ✅ một phần — 8 ảnh 800×800 nhưng là **ảnh đồ hoạ có chữ**, không phải ảnh chụp (`anh-01..08.webp`); khung từ video shop (720×1280) dùng được làm khung đầu |
| Cảnh phao đứng trên mặt nước **ban đêm** | ⬜ (đã hỏi ở phiếu 01, câu 1) |
| Cảnh có **tác nhân** làm đuôi đỏ (dây nhấp / cá cắn / tay kéo dây) | ⬜ |
| Hook mở đầu: vật phủ vải + đếm, hoặc mặt người + đếm | ⬜ (dựng/quay mới — bước 7) |
| Bản video shop **chưa chèn chữ** | ⬜ (câu hỏi 3) |
| Tiếng: có điểm "vào" khớp cú đỏ | ⬜ (tiếng gốc chưa bóc; chưa chọn nhạc) |
| Ảnh hộp đóng (chỉ khi giữ khung 01/02/03 nguyên) | ⬜ — trang không cho thấy có hộp |

## Cảnh còn thiếu (video shop không có) — đầu vào bước 7 hướng Lai

| # | Cảnh | Phục vụ yếu tố | Nếu không có |
|---|---|---|---|
| T1 | **Hook 0–~3 s có chuyện đang xảy ra**: vật dài phủ vải + đếm 3-2-1 (hoặc người + đếm) | LÕI 1 khung 03 / LÕI 1–2 khung 02; sổ tay 5b phát hiện 2 | Khung đầu của video shop là tay cầm phao đứng yên trên nền bàn xám — "trung bình", chết ở giây đầu (sổ tay 0c, 1) |
| T2 | **Phao đứng trên mặt nước ban đêm**, đuôi nhiều màu rồi đỏ | LÕI 4b khung 01; leo thang sau cú đỏ | Cú đỏ chỉ có ban ngày trong nhà — nhỏ, sai bối cảnh dùng thật |
| T3 | **Tác nhân thấy được**: dây câu nhấp / phao nhúc nhích → đỏ, cùng cảnh | Khoảng trống tò mò cần câu trả lời **hiểu được** | Người xem tưởng đèn tự nhấp nháy đổi màu theo chu kỳ; không hiểu "đỏ = cá cắn" |
| T4 | (tuỳ kịch bản) Đảo chiều pin ngày/đêm | Không phải LÕI | Không nói tới tính năng này trong video |
| T5 | Thẻ kết logo (+ slogan khi có) | Sổ tay 0f luật 4 | — (logo ✅, slogan đã hỏi ở phiếu 01) |

## Khung đã xét và loại

| Tệp | Yếu tố LÕI không qua |
|---|---|
| `reel-01-frostglow.md` | 2 store find (⚠ shop online + không hộp) · 3 mặt hộp ⬜ · 4 tối → sáng: ban ngày, không khớp nhạc · 4b không có cảnh đêm · 5 mua → mở → lắp ⬜ |
| `reel-02-frostglow-hook-me.md` | 1 mặt người ⬜ · 3 mở quà lộ mặt hộp ⬜ · 4 nơi mua sai + không có gì gấp thật (không đưa giá) · thân = khung 01 (kế thừa 4, 4b, 5) |
| `reel-03-merryspin-tu-lanh.md` | 2 Target · 3 hộp cửa sổ ⬜ · **4 lưới 9 đĩa — không bao giờ có tương đương** (bán từng cây) |

**Vì sao chọn khung 03 làm nền (phương án B) chứ không phải khung 01:** khác ca Orb. Với Orb, khung 01 gần hơn vì chỗ hỏng chỉ là nguyên liệu thiếu. Ở đây, khung 01 hỏng ở 5/6 dòng và **hai dòng hỏng vĩnh viễn** với shop online (store find, hành trình mua ở tiệm); còn khung 03 có đúng **hai LÕI mà video shop đã làm sẵn** (dòng 5: biến đổi một cảnh liền; dòng 6: chữ mời bình luận đúng lúc bật) và dòng 1 (vải + đếm) dựng mới được. Khung 03 vẫn mất dòng 2, 3, 4 → **không chuyển nguyên khung**, chỉ mượn cơ chế. Khung 02 = khung 01 + hook khác, không hơn.

**Lưu ý angle:** cả 3 khung bán **món quà trang trí** cho người tặng; angle của phao là **công cụ: "ngồi xa, mắt mỏi về khuya vẫn thấy cá cắn"** (`trang.txt`). Cú "oà" của phao không đến từ bao la (đèn nhỏ, 0,85 mm) mà từ **ý nghĩa**: đỏ = có cá. Thiếu cảnh T2/T3 thì ý nghĩa đó không hiện ra. Đây là lý do mạnh nhất để bóc một video mẫu **đúng ngành đồ câu VN** (phương án A).

---

## Đã kiểm (có nguồn)
- Video shop là một cảnh liền 0,10–15,32 s; 0–0,10 s là lượt quay khác, cắt thật — `do.json` (điểm cắt 0,1) + soi 30 khung/giây đoạn 0–0,3 s
- Đuôi chuyển đỏ 4 lần: 5,10–6,00 · 7,67–8,63 · 10,23–11,20 · 13,80–14,77 s, mỗi lần ~0,9–1,0 s — đo % điểm ảnh đỏ trong vùng đuôi phao (cách đo ở mục "Số đo")
- Video toàn bộ ban ngày trong nhà, không có nước, không có đêm — lưới 01–03
- Chữ vàng `PHAO RÔ DIẾC ĐÈN LED SIÊU NHẠY` in cứng suốt video; logo 17 Fishing mờ góc trên trái — khung 0,05 s và 8,0 s (cắt cận)
- Trang nói đỏ = cá chạm mồi; khách là người câu rô diếc đêm ở hồ dịch vụ; bán từng cây, 3 mã chỉ khác tải chì; tặng 1 pin CR425 — `trang.txt`
- Không có ảnh hộp; 8 ảnh trang đều là ảnh đồ hoạ — `anh-01..08.webp` (đã xem), `ho-so-nhap.md` "Hộp / bao bì ⬜"
- Tiếng đều −15…−17 dB, không khoảng lặng ≥ 0,25 s — `khung-nhap.md` + `silencedetect`

## Suy ra ⚠
- Shop bán online (không có cửa hàng để làm "store find") — từ trang chỉ có đặt online / COD / Zalo, không có địa chỉ tiệm; hồ sơ SP chưa xong để kiểm mục giao hàng
- Đoạn 0,1–2,2 s có thể LED đã sáng sẵn (ban ngày không thấy) chứ không tắt — nghiêng ~60 %; cần cảnh tối để chắc. Không ảnh hưởng phán quyết vì cú trả lời dùng là **đỏ**, không phải "bật"
- Trong video không thấy vì sao đuôi đỏ (tay gần như đứng yên) — chưa biết sếp kích bằng cách nào; ảnh hưởng cảnh T3 và câu chữ "cá cắn"
- Lần đỏ đầu ở 5,10 s thân → với hook ~2,7–3 s thì rơi ~7,8–8,1 s tổng, trùng mốc trả lời của cả 3 khung — tính từ số đo

## Còn thiếu ⬜
- Cảnh phao trên nước ban đêm (T2) — chặn LÕI ngày → tối; làm cú đỏ nhỏ và sai bối cảnh
- Cảnh tác nhân → đỏ (T3) — người xem không hiểu "đỏ = cá cắn"
- Hook mở đầu có hành động (T1) — video shop mở bằng cảnh đứng yên
- Bản video chưa chèn chữ — phải che chữ cứng, mất một dải hình
- Tiếng gốc chưa bóc (máy không có faster-whisper) — chưa biết có nhạc để canh cú đỏ
- Video mẫu viral đúng ngành đồ câu / thị trường VN — thư viện hiện chỉ có 3 khung Giáng sinh Mỹ

## Đã tự quyết (sếp không cần làm gì)
- Không dùng cảnh tiệm/siêu thị, không nhắc tên cửa hàng khác trong mọi phương án mặc định — ⚠ shop online, nói khác là sai sự thật (cách khung 02 đã làm với "Target")
- Không xếp nhiều phao thành "bộ sưu tập" kiểu lưới 9 đĩa — khách mua từng cây, cho thấy bộ là cho thấy thứ khách không nhận (sổ tay 0e)
- Cú trả lời là **đuôi đỏ**, không phải đoạn "bật" 2,2–2,9 s — đoạn đó lẫn chuyển động, không sạch
- Không lặp đủ 4 lần đỏ trong bản dựng — lặp cái đã thấy là lý do người xem đi (sổ tay 0b)
- Bỏ toàn bộ yếu tố Giáng sinh và câu hook tiếng Anh bão hoà — khác thị trường, khác mùa
- Không hỏi lại cảnh đêm trên nước — đã hỏi ở phiếu 01 câu 1

## Cần sếp (tối đa 3, viết lời thường)
1. Ba video mẫu đang có đều là đồ trang trí Giáng sinh ở Mỹ: mở bằng cảnh lấy hộp ở siêu thị hoặc giật vải lộ hộp quà, nên không dùng nguyên cho phao được (shop bán online, phao không có hộp). Anh chọn: (A) gửi em 1–2 video phao điện / đồ câu đang chạy tốt trên TikTok hoặc Facebook Việt Nam để em bóc mẫu mới đúng ngành, hay (B) dùng tạm bản ghép: "vật dài phủ vải, đếm 3-2-1, lộ 3 phao → cắt vào video anh quay → đúng lúc đuôi chuyển đỏ (khoảng giây 8) hiện chữ mời bình luận → nếu có thì thêm cảnh phao trên nước ban đêm", chưa có bằng chứng hiệu quả? Mặc định nếu anh không trả lời: (B), gắn nhãn "bản ghép chưa thử"; anh gửi video lúc nào em bóc mẫu mới lúc đó.
2. Trong video anh quay, đuôi phao chuyển đỏ 4 lần (giây 5, 7,7, 10,2, 13,8) mà tay gần như không động — anh làm gì để nó đỏ (gõ nhẹ, nghiêng phao, giật dây…)? Mặc định nếu anh không trả lời: video chỉ nói "cá cắn là đỏ" ở cảnh trên mặt nước; cảnh cầm tay ghi là "thử cảm biến", không nói là cá cắn.
3. Anh còn bản quay gốc chưa chèn dòng chữ vàng "PHAO RÔ DIẾC ĐÈN LED SIÊU NHẠY" không? Mặc định nếu không có: Thợ dựng che dải chữ đó bằng chữ mới đặt đúng chỗ.
