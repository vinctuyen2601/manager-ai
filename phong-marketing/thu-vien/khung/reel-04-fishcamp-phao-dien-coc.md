# Khung 04 — (không có chữ trên hình; tiêu đề Shorts: "Phao điện câu cá đêm cá ăn báo động 🚨") (Fishcamp Việt Nam, test phao điện trong cốc)

Nhãn: dạng-nội-dung=product_demo (mục 3.8; máy đứng yên nên không gắn ugc_authentic; beat_sync chỉ một phần, xem Tầng 1)
· hook=kết quả trước + trước/sau trong một khung + chuyển động bất ngờ + cận chất liệu/đã mắt (sổ tay 7.4 A)
· ngành=do-cau-vn · khuyến-mãi=không · khung-kịch-bản=hook_body_cta **thiếu cta** (không có CTA trên hình)
· angle=nhìn tận mắt: ấn phao chìm là cả đuôi báo đỏ · mùa=quanh năm (câu đêm)
· bão hoà=**đã** (dạng 1 "test trong cốc" có ở ≥ 5 shop, `../nganh/do-cau-vn/video-nganh.md`) · thân=riêng
· nguồn=sếp gửi · nền tảng=Shorts (YouTube) · ngôn ngữ=không lời, không chữ (tiêu đề tiếng Việt) · mục tiêu=nhận biết + chốt đơn (kênh shop)
· dạng ngành=1 · form=3 "Thử / test" (mỗi lần đổi đỏ là một cú form 2 "trước → sau trong một cảnh liền")

Bóc 12/11/2026 từ `goc.mp4` (tải bằng yt-dlp theo luật sếp duyệt 12/11, link sếp gửi). Bản chép: `reel/thu-nghiem/khung/reel-04/goc.mp4` (ngoài git).
Ảnh soi, số đo và script: `reel/thu-nghiem/khung/reel-04/soi/` (gọi tắt `soi/`). Đây là **khung đồ câu đầu tiên của phòng đo bằng giây thật**.
Chưa có brief sản phẩm, nên bỏ (c). Hồ sơ `phao-ro-diec.md` chỉ dùng cho tầng 3.

## Bằng chứng viral (không bắt buộc)

| Nguồn · tài khoản · loại | Link | View · thích · bình luận · follower | Ngày đăng · ngày đọc số | Dấu hiệu khác |
|---|---|---|---|---|
| YouTube Shorts · Fishcamp Việt Nam (kênh shop, 4,1 N video) · bài tự nhiên của shop, chưa rõ có chạy tiền hay không | https://www.youtube.com/shorts/jGbUc9o28TA | 629.168 · 1.757 (0,28 %) · 6 · 1,61 Tr sub | đăng 10/10/2026 · đọc 12/11/2026 (`goc.info.json`) | Tiêu đề không có mô tả, không tag. Cùng kênh có "Phao điện mini báo động 0.6-2g" 465 N (dạng 1) |

- **Outlier (sổ tay §5, gói 3.3): KHÔNG.** 629 N < 700 N, và 629 N ÷ 1,61 Tr = **0,39×**, còn xa mốc 5×. View này chủ yếu là sức của một kênh lớn, khung chưa chứng minh được gì (sổ tay 5b).
- **Lift trung vị kênh: ⬜ chưa chạy.** Cần ≥ 10 Shorts của Fishcamp có độ dài gần nhau, rồi lấy view bài này chia cho trung vị.
- Đối chứng kém hơn, cùng kênh cùng dạng: ⬜ (465 N ở trên cũng là dạng 1, nhưng chưa tải về).
- Like rate 0,28 % và 6 bình luận: thấp. Không có mồi bình luận.

## Đo bằng máy

| | |
|---|---|
| Kỹ thuật | 7,825 s · 1080×1920 · 30 fps · AAC 44,1 kHz stereo · chữ ký YouTube (`do.json` nguon_goc). Không có khoá AIGC, C2PA hay IPTC |
| Nội dung thật | **0–7,825 s**, không có màn kết nền tảng. Video **dừng giữa động tác** (tay đang đưa chuôi phao vào, 7,67–7,83 s): ⚠ có thể kênh cắt cho tròn 8 s, hoặc là bản đã bị cắt bớt từ clip gốc |
| Lời | Không có lời: whisper ra 0 đoạn, xác suất ngôn ngữ 0,344 (`do.json` loi) |
| Lưới | `goc-boc/luoi-01.jpg`, `luoi-02.jpg` (4 khung/giây) · `soi/day-0/2/4/6.jpg` (10 khung/giây; **nhãn trong ảnh là giây tương đối, cộng thêm N**) · `soi/s30-*.jpg` (30 khung/giây, nhãn là giây thật) |

### Bảng điểm cắt đã soi

Đã soi mọi điểm `scene ≥ 0,045` (`soi/`: lệnh `select=gte(scene,0)`), không chỉ 6 điểm máy báo.

| Giây | Máy (điểm cảnh · ngưỡng · cờ) | Xem ở (ảnh) | Trước → sau | ✅/✗ + lý do |
|---|---|---|---|---|
| 0,267 | 0,02 (không báo). Sáng 93 → 86 | `s30-0.10.jpg` | Ngón tay chạm đỉnh đuôi phải (0,233) → đuôi phải đỏ, chìm xuống (0,267) | ✗ không cắt. Cốc, nền, phao trái giữ nguyên; **đây là lần đổi đỏ đầu tiên** |
| 0,633 | 0,082 (dưới ngưỡng) | `s30-0.53.jpg` | Đuôi phải đỏ, chìm → bật lên, xanh | ✗ phao nổi lại, khung không đổi |
| 2,567–2,767 | 2,633 = 0,188 → máy: "✂ cắt nhảy?" · 2,733 = 0,169 · 2,767 = 0,096 → máy: "không cắt" | `s30-2.50.jpg` | Bàn tay úp từ trên xuống (2,567) → cả hai đuôi đỏ, chìm (2,633) → tay rút lên (2,733) | **✗ máy SAI ở 2,633.** Cốc đứng nguyên chỗ qua cả 10 khung; khung đổi vì tay che và màu LED đổi. Ở 2,767 máy đúng |
| 3,033 | 0,060 | `s30-ghep.jpg` hàng 1 | Hai đuôi đỏ → bật lên, xanh | ✗ phao nổi lại |
| **3,767** | **0,091: dưới mọi ngưỡng, máy không báo** | `s30-3.67.jpg` | 3,733: không có tay, mặt nước phẳng → 3,767: ngón tay **đã nằm trong nước**, nước gợn, vị trí phao khác | **✅ cắt nhảy, máy BỎ SÓT.** Cùng góc máy, nhưng tay không thể vào khung và ấn xong trong 33 ms. Bỏ đoạn chết giữa hai lần thử |
| 4,100 | 0,047 | `s30-ghep.jpg` hàng 2 | Ngón tay khuấy, ấn phao trái | ✗ động tác liền |
| 5,533–5,767 | 5,633 = 0,141 · 5,733 = 0,162 → máy: "✂ cắt nhảy?" · 5,767 = 0,091 | `s30-5.50.jpg` | Bàn tay úp (5,567) → cả hai đuôi đỏ (5,633) → tay rút (5,733) | **✗ máy SAI ở 5,733.** Giống hệt 2,633: tay chuyển động nhanh cộng với đổi màu |
| 6,033 · 6,233 | 0,052 · 0,053 | `s30-ghep.jpg` hàng 3–4 | Đỏ → xanh, phao bật lên rồi lắc | ✗ |
| 6,533–6,600 | 6,533 = 0,121 → máy: "không cắt" · 6,567 = 0,100 · 6,600 = 0,095 | `s30-6.43.jpg` | Tay úp lần ba → cả hai đuôi đỏ (6,567) | ✗ máy đúng |
| **7,233** | **0,674, mạnh · "✂ cắt" · bật sáng +52,9** | `s30-7.10.jpg` | Cốc nước, nền tối (7,200) → ban ngày, lan can inox, tay cầm thân phao xanh–hồng (7,233) | **✅ cắt cảnh thật.** "Bật sáng" ở đây là do đổi sang cảnh ban ngày, không phải đèn bật |
| 7,667–7,733 | 0,113 → máy: "không cắt" · 0,089 | `s30-7.53.jpg` | Tay thứ hai đưa chuôi phao (ống đen, vòng tím, đầu trắng) vào khung, nền đứng yên | ✗ máy đúng |

**Kết quả:** chỉ có **2 cắt thật** (3,767 cắt nhảy · 7,233 cắt cảnh), chia video thành **3 cảnh**. Trong 6 điểm máy báo, máy sai 2 (2,633 và 5,733 là bàn tay úp xuống) và bỏ sót 1 (3,767). Máy gắn "không cắt" đúng cả 3 điểm 2,767 · 6,533 · 7,667.
→ Bài học cho `gvv`: bàn tay úp xuống cộng với LED đổi màu cho điểm 0,14–0,19 với "giống" 0,53–0,62, nên máy xử thành "cắt nhảy". Còn cắt nhảy thật có tay hiện ra đột ngột thì chỉ được 0,09.

### Cú bật: đổi màu đuôi LED (đo % điểm ảnh đỏ)

Đếm điểm ảnh đỏ R>200, G<110, B<110 trên từng khung, ở hai vùng: **V1** = x 300–760, y 0–1300 (đuôi + miệng cốc), **V2** = x 300–760, y 950–1500 (đuôi chìm trong nước).
Cột xanh là G>200, R<160. Script ở `soi/do_do.py`, số từng khung ở `soi/do-do.txt`. Nền khi đuôi sáng nhiều màu (có đoạn cam): V1 đỏ 0,35–0,6 %, xanh 1,5–2,3 %.

| # | Xanh → đỏ (khung đầu tiên đỏ) | Đỏ tới | Ai làm | Đỉnh % đỏ | Ghi chú |
|---|---|---|---|---|---|
| 1 | **0,267 s** (0,233 vẫn xanh) | 0,600 (xanh lại 0,633) | Ngón tay ấn đuôi **phải** | V1 5,05 · V2 5,55 | **Lần đầu, ngay giây đầu.** Phao trái vẫn nhiều màu: hai trạng thái cùng một khung |
| 2 | 1,433 s | 1,800 | Ngón tay ấn đuôi **trái** | V2 2,48 | **Nháy** đỏ/tắt xen từng khung (1,467 · 1,533 · 1,633 · 1,733 về 0 %) |
| 3 | **2,633 s** (2,600 vẫn xanh) | 3,000 (xanh lại 3,033) | **Bàn tay úp cả hai phao** | **V1 11,59** · V2 9,05 | **Cú bật mạnh nhất**: cả hai đuôi đỏ, xanh về 0,00 % |
| — | 3,77–4,30 | — | Ngón tay khuấy, ấn phao trái | V1 ≤ 0,99 | **Không đổi đỏ** (xanh vẫn 1,2–3,7 %). Xem "Chỗ chưa chắc" |
| 4 | 4,933 s | ~5,30 | (không thấy tay, đuôi phải tự nháy) | V2 0,74 | Nhỏ: chỉ đầu đuôi phải đỏ nháy (`day-4.jpg` ô 0,9–1,2) |
| 5 | **5,633 s** (5,600 vẫn xanh) | 6,000 (xanh lại 6,033) | Bàn tay úp cả hai | V1 6,20 | Đỏ ngả hồng nên đếm thấp hơn; xanh về 0,00 % là dấu chắc chắn |
| 6 | **6,567 s** (6,533 vẫn xanh) | 6,800 (xanh lại 6,833) | Bàn tay úp cả hai | V2 4,57 | Lần cuối, 0,67 s trước khi cắt cảnh |

LED đổi **trong 1 khung (≤ 33 ms)**, không có đoạn sáng dần như đèn Giáng sinh (gói 3.9). Vì vậy mốc cú bật lấy luôn khung đầu tiên có màu đỏ.
**Giây đổi xanh → đỏ: 0,267 · (1,433 nháy) · 2,633 · (4,933 nháy nhỏ) · 5,633 · 6,567.** Mỗi lần đỏ kéo dài 0,23–0,40 s rồi phao nổi lên xanh lại.
Ba lần úp tay cách nhau 3,0 s và 0,93 s. Lần 1 → 3 cách nhau 2,37 s.

### Âm thanh

| Giây | Âm thanh | Số đo | Nguồn |
|---|---|---|---|
| 0–7,825 | **Nhạc có beat chạy suốt, không lời** | I = **−10,9 LUFS** · LRA **0,8 LU** · true peak **+0,6 dBFS** (vượt 0, bị nén cứng) · M dao động −8,0 → −14,1 | đo `ebur128` (cột M mỗi 0,1 s, xem `soi/`) |
| 0–7,825 | **Không có đoạn im nào** | `silencedetect` −45 dB/0,2 s: 0 đoạn · −35 dB/0,1 s: 0 đoạn | đo |
| — | Không có giọng nói | whisper 0 đoạn | whisper (`do.json`) |
| Nhịp | Phách ~**0,37 s** (~162 BPM, hoặc 81 nếu đếm nửa). **Trọng âm mạnh, dải rộng, cách nhau ~1,5 s: ~1,2 · ~2,7 · 4,21 · 5,72 · 7,21 s** | onset dải > 4 kHz: 0,09 · 0,46 · 0,85 · 1,21 · 1,60 · 1,97 · 3,46 · 4,21 · … · 5,72 · 6,47 · 7,21 · 7,59 · trung vị khoảng cách 0,369 s | đo (`soi/on.py`) + phổ `soi/pho.png` |
| 2,633 · 5,633 · 7,233 | Khớp tiếng–hình: hai cú úp tay đỏ **sớm hơn trọng âm ~0,09 s**. Cắt cảnh 7,233 **trùng trọng âm 7,21** (lệch +0,02) | — | đo, so hai bảng trên |
| Tên bài | ⬜ không xác định | — | Agent không nghe được. Không ghi tên để dùng lại |

Mức âm lượng 0,5 s của `gvv` (−7,6 → −22,8 dB) trùng với các đỉnh M ở trên. Đuôi 7,75 s −22,8 dB là nhạc **bị cắt cụt** chứ không tắt dần.

## Tầng 1 — Format

**Test phao điện trong ống nước trong, không lời, không chữ, nhạc beat.** Hai phao điện cắm trong một ống/cốc trụ trong suốt cao.
Phía sau: nửa trên là nền xanh đêm, nửa dưới là lan can sáng. Tay ấn hoặc úp phao chìm xuống → cả đuôi đổi đỏ → thả ra thì phao bật lên, đuôi sáng nhiều màu lại. Lặp 5 lần trong 7,2 s, rồi cắt sang 0,6 s cảnh ban ngày cận thân phao.

- **Angle:** "nhìn tận mắt: phao chìm là cả đuôi báo đỏ" (chức năng thật, không nói gì thêm).
- **Chữ trên hình: KHÔNG CÓ.** Đã quét cả 4 góc suốt video (lưới + `day-*` + `s30-*`): không phụ đề, không sticker, không watermark, không giá. Tên hàng chỉ có ở **tiêu đề YouTube**, nằm ngoài khung hình.
- **Tiếng:** nhạc beat chạy từ khung 0. Không có đoạn dạo nhạc tách riêng, không có chỗ "nhạc vào". Trọng âm ~1,5 s một lần (xem bảng âm).
- **Cú chốt:** 0,267 s (lần đầu) và **2,633 s (mạnh nhất)**. Không có CTA, không logo shop, không giá.
- **Kiểu dựng:** 2 cắt / 7,825 s = **0,26 cắt/giây**. Rất chậm: năng lượng nằm ở **hành động trong khung**, không nằm ở cắt. Nhịp: nhanh (0,27) – chậm (0,6–2,6) – mạnh (2,63) – chậm (3–5,5) – dồn (5,63 · 6,57) – đổi cảnh (7,23).
- **5 nước dựng đặc trưng** (luật dùng lại được):
  1. Máy **đứng yên một khung** suốt phép thử. Chỉ có tay và phao chuyển động, nên mọi lần đổi màu đều là "trước → sau trong một cảnh liền".
  2. **Kết quả trong 0,3 s đầu**: khung 0 đã có đèn sáng, ngón tay vào khung ở 0,13 s, đuôi đỏ ở 0,267 s.
  3. **Lặp phép thử ~1,5 s một lần và tăng dần**: ngón ấn một phao → ngón ấn phao kia → bàn tay úp cả hai (đỏ gấp đôi).
  4. **Cắt nhảy bỏ đoạn chết** giữa hai lần thử (3,767), giữ nguyên góc máy.
  5. **Đổi cảnh ở trọng âm cuối** (7,233 ≈ 7,21) sang cận thân phao ban ngày, rồi để video tự cắt.
- **beat_sync?** Chỉ một phần. Cắt cảnh và hai cú úp tay nằm trong vòng ≤ 0,1 s quanh trọng âm, còn lần 1 (0,267) và lần cuối (6,567) thì không. ⚠ Nghiêng ~60 % là dựng có canh theo nhạc ở các mốc chính, nhưng phần thử là quay liền.

## Tầng 2 — Cảnh theo giây

| # | Giây | Cỡ cảnh · máy | Cách làm hình | Vai trò | Hình | Ánh sáng | Vì sao hiệu quả |
|---|---|---|---|---|---|---|---|
| 1a | 0–0,63 | Trung, máy cố định (⚠ chân máy: khung không rung) | Quay thật ~90 %: gợn nước, giọt nước trên thành cốc, phản chiếu LED trong nước đúng vật lý, bóng ngón tay | **HOOK + bật lần 1** | Hai đuôi LED sáng nhiều màu (trái đầu cam, phải đầu xanh). Ngón tay vào ở 0,13 s, chạm đỉnh đuôi phải ở 0,233 s → **đuôi phải đỏ ở 0,267 s** → bật lên xanh ở 0,633 s | Nửa trên tối xanh, đuôi tự phát sáng. Ống nước sáng nhờ đèn phòng | Khung đầu đã có chuyện xảy ra (5b phát hiện 2), trả lời ngay, có đối chứng trái/phải trong cùng khung |
| 1b | 0,63–2,57 | như trên | như trên | Thân: lặp | Phao phải nhô cao lắc. Ngón tay ấn phao trái 1,37 → **trái đỏ nháy 1,43–1,80** → phao lắc | như trên | Chứng minh phao nào cũng đổi màu. ⚠ 0,63–1,37 và 1,80–2,57 không có gì mới (~0,8 s mỗi đoạn) |
| 1c | 2,57–3,75 | như trên | như trên | **Bật mạnh nhất** | **Bàn tay úp từ trên xuống, cả hai đuôi đỏ 2,633–3,000**, tay rút ra, hai phao bật lên xanh 3,033, nhô cao lắc | Tay che làm khung tối đi, đỏ phủ cả ống nước | Leo thang: một phao → hai phao, ngón → bàn tay |
| 2a | 3,767–5,53 | như trên (**cắt nhảy** vào 3,767, cùng góc máy) | như trên | Thân: lặp (yếu) | Ngón tay khuấy, ấn phao trái 3,77–4,30: **không đỏ**. Tay rút 4,3–4,9. Đỉnh đuôi phải nháy đỏ nhỏ 4,93–5,30 | như trên | ⚠ Đoạn yếu nhất: ấn mà không đỏ, có thể làm người xem hỏi "sao lần này không đỏ?" |
| 2b | 5,53–7,20 | như trên | như trên | Dồn lặp | **Úp tay lần 2 → đỏ 5,633–6,000**, nổi xanh. **Úp tay lần 3 → đỏ 6,567–6,800**, nổi xanh | như trên | Hai cú bật cách nhau 0,93 s, dồn trước khi kết |
| 3 | 7,233–7,825 | Cận, cầm tay, ngoài trời | Quay thật ~90 % | Kết / khoe hàng | Ban ngày, lan can inox, nhà gạch phía sau. Tay cầm phao **thân xanh dương → hồng**, đuôi vạch vàng–cam (có in chữ Hán, xem "Cần che"). Từ 7,667 tay thứ hai đưa **chuôi phao** (ống đen, vòng tím, đầu trắng) vào khung. **Dừng giữa động tác** | Ánh sáng ngày tự nhiên, trời âm u | Cho thấy thân phao thật trông thế nào. ⚠ Chỉ 0,6 s, cụt |

Dòng nhịp: **3 cảnh** (5 nhịp con) / 7,825 s. Cảnh dài nhất là cảnh 1 (0–3,75 s, 3,75 s), ngắn nhất là cảnh 3 (0,59 s).
**Ranh giới HOOK | THÂN: 0,63 s** (lần đỏ đầu khép lại khi phao nổi xanh). **THÂN | KẾT: 7,233 s.**

## (a) Kịch bản mô tả — video gốc

Toàn bộ không có lời, không có chữ, nhạc beat to chạy từ đầu tới cuối. Máy đứng yên, nhìn ngang miệng một **ống nước trụ trong suốt cao** đầy nước.
Trong ống cắm **hai phao điện**, chân phao chìm thấy rõ qua thành ống. Hai đuôi thẳng đứng nhô lên khỏi miệng ống, sáng thành từng đoạn xanh lá – cam xen nhau: đuôi trái có đầu cam, đuôi phải có đầu xanh.
Phía sau, nửa trên khung là nền xanh đêm, nửa dưới là lan can kiểu cổ điển màu kem (⚠ có thể là phông in, xem "Chỗ chưa chắc").

**0 → 0,63 s.** Khung đầu: hai đuôi đã sáng. 0,13 s: một ngón tay đi vào từ góc trên phải, ấn đỉnh đuôi phải ở 0,23 s.
**0,267 s: cả đuôi phải chuyển đỏ** và chìm xuống, trong khi đuôi trái vẫn nhiều màu. 0,63 s: thả tay, phao phải bật lên, đuôi xanh lại.
**0,63 → 2,57 s.** Phao phải nhô cao, lắc. 1,37 s: ngón tay ấn đuôi trái → 1,43–1,80 s: **đuôi trái đỏ nháy**. Hai phao lắc rồi đứng.
**2,57 → 3,75 s.** Một **bàn tay úp** từ trên xuống, ấn cả hai phao. **2,633 s: cả hai đuôi đỏ**, ánh đỏ phủ cả ống nước. Tay rút ra, 3,03 s cả hai bật lên xanh, nhô cao.
**3,767 s (cắt nhảy, cùng góc).** Ngón tay đã nằm trong nước, khuấy và ấn phao trái tới 4,3 s. **Lần này đuôi không đỏ.** Tay rút ra. 4,93–5,30 s: đỉnh đuôi phải nháy đỏ nhẹ.
**5,53 → 7,20 s.** Bàn tay úp lần 2: **5,633 s cả hai đuôi đỏ**, 6,03 s xanh lại. Bàn tay úp lần 3: **6,567 s đỏ**, 6,83 s xanh lại.
**7,233 s (cắt cảnh, ban ngày).** Ngoài ban công lan can inox, trời âm u, nhà gạch phía sau. Một tay cầm đỉnh đuôi, thả phao treo thẳng: thân xanh dương chuyển hồng, có in chữ.
7,67 s: tay thứ hai đưa chuôi phao (ống đen, vòng tím, đầu trắng) vào sát máy. **7,825 s: hết, nhạc bị cắt cụt.**

## Bốn câu của triết lý (kèm giây)

| Câu | Trả lời |
|---|---|
| **Đánh thức bằng gì?** | *Dưới lên:* khung 0 là **hai vạch LED sáng nhiều màu trên nền tối** (tương phản tối/sáng, màu bão hoà). Ngón tay chuyển động vào khung ở 0,13 s. *Trên xuống:* **không có trên hình**. Chỉ tiêu đề Shorts ("câu cá đêm cá ăn báo động") gọi đúng người câu đêm, nhưng nằm ngoài khung hình. Không có mặt người |
| **Câu hỏi mở là gì?** | Gần như **không có câu hỏi kéo dài**. "Ngón tay định làm gì?" được trả lời sau **0,13 s**. Sau đó chỉ còn những vòng nhỏ: "phao kia có đỏ không?" (1,43), "úp cả hai thì sao?" (2,63) |
| **Trả lời ở giây nào, bằng gì?** | **0,267 s** (lần đầu, một phao) và **2,633 s** (mạnh nhất, cả hai phao, đỏ 11,6 % khung). Chỉ bằng hình: không có SFX riêng. 2,633 sớm hơn trọng âm nhạc ~0,09 s |
| **Để lại gì?** | Hiểu chức năng ngay: "chìm là đỏ, nhìn xa vẫn thấy" → **giá trị thực tiễn**. Cảm xúc thấp–vừa (đã mắt, không oà). **Không có CTA, không có mồi bình luận** (6 bình luận). Kết cụt ở cảnh thân phao |

## Lý do ở lại theo từng giây

| Giây | Lý do ở lại |
|---|---|
| 0–0,23 | Đã mắt (LED nhiều màu trên nền tối) · đang tiến (ngón tay đang vào) |
| 0,27–0,63 | Trả lời + bất ngờ nhỏ (đỏ) · đối chứng trái/phải trong cùng khung |
| 0,63–1,37 | **Chỉ còn đã mắt** (phao lắc). ⚠ **Chỗ yếu**: 0,7 s không có gì mới |
| 1,37–1,80 | Đang tiến (lặp với phao thứ hai, đỏ nháy) |
| 1,80–2,57 | **Chỉ còn đã mắt.** ⚠ **Chỗ yếu**: 0,8 s chờ |
| 2,57–3,03 | **Leo thang**: bàn tay úp, cả hai đỏ (đỉnh) |
| 3,03–3,75 | Đã mắt (hai phao bật lên cao) |
| 3,77–4,30 | Đang tiến (tay đã trong nước, nhờ cắt nhảy). ⚠ **Không đỏ** → nhịp hụt |
| 4,30–5,53 | ⚠ **Đoạn yếu nhất (~1,2 s)**: tay rút ra, chỉ có một nháy đỏ nhỏ ở đầu đuôi phải (4,93) |
| 5,53–6,03 | Lặp lại cú mạnh (úp lần 2) |
| 6,03–6,83 | **Dồn**: úp lần 3 chỉ sau 0,93 s |
| 6,83–7,23 | Đã mắt (phao nổi) |
| 7,23–7,83 | **Mới lạ**: đổi sang ban ngày, thân phao thật. Kết cụt → ⚠ có thể kéo xem lại (vòng lặp vô tình, chưa đo) |

Nhịp đều ~1,5 s một lần thử. Video sống nhờ **đang tiến + đã mắt** chứ không nhờ "chưa xong", vì câu hỏi đã được khép từ 0,27 s.

## Cường độ hình ảnh — trục "cực" mỗi nhịp; bối cảnh định giá

| Nhịp | Trục |
|---|---|
| Khung đầu, hai đuôi LED | **Đã mắt** (vạch màu gọn, sáng trên nền tối) |
| Đổi đỏ (0,27 · 2,63 · 5,63 · 6,57) | **Bất ngờ nhỏ + trước/sau** (cả một vạch đổi màu tức thì). 2,63 có thêm **ấn tượng** (hai phao, đỏ phủ ống nước) |
| Cảnh ban ngày | Không cực trục nào: cảnh thường, trời âm u |

**Bối cảnh định giá:** ống nước tự chế, ban công nhà dân, tay trần → **hàng bình dân, "dân câu thử cho dân câu xem"**. Đúng tầm giá phao điện (~99 N₫ ở 17fishing). Không có chi tiết nào lệch tầm giá.

## Lớp đóng gói và âm thanh

- Chữ, sticker: **không có**, suốt 0–7,825 s, cả 4 góc (`goc-boc/luoi-*`, `soi/day-*`, `soi/s30-*`).
- SFX ↔ sự kiện hình: **không có SFX**. Chỉ có nhạc. Khớp tiếng–hình ở cú úp 2,633 và 5,633 (sớm hơn trọng âm ~0,09 s) và cắt 7,233 (trùng trọng âm). Lần 0,267 và 6,567 không khớp trọng âm. Nguồn: đo.

### Cần che (nếu dùng lại footage, mà không được dùng lại: xem "Không lấy")

| Giây xuất hiện–mất | Thứ | Vị trí | Xem ở |
|---|---|---|---|
| 7,233–7,825 | **Chữ Hán + biểu tượng con cá in trên thân phao** (⚠ đọc được chữ đầu giống "久", chưa chắc), có thể là nhãn hãng phao | Giữa khung, trên thân phao | `soi/ghep-cuoi.png` |
| 7,233–7,825 | Nhà và ban công của người khác | Nền | `soi/ghep-cuoi.png` |
| 0–7,825 | Tay người quay (không có mặt) | — | — |

## Điểm yếu

1. **Không có chữ trên hình.** Lướt tắt tiếng thì không biết đây là món gì, giá bao nhiêu, mua ở đâu. Tên hàng chỉ có ở tiêu đề Shorts.
2. **Hai đoạn chết ~0,8 s** (0,63–1,37 · 1,80–2,57) và **một đoạn yếu ~1,2 s** (4,30–5,53). Lần ấn 3,77–4,30 **không đỏ** nên dễ gây khó hiểu.
3. **Kết cụt** sau 0,6 s cảnh ngày. Không có CTA, logo hay giá. Chuôi phao đưa vào rồi video hết.
4. **Bằng tay ấn, không phải cá ăn.** Chưa có cảnh nào cho thấy chuyện xảy ra ngoài hồ thật (dạng 3 "nhịp phao" thì có).
5. Lớp hook trùng ý: hình đã nói hết, nên không có lớp nào mở vòng tò mò.

## (b) Vì sao viral — xếp hạng LÕI / Phụ

Nói đúng hơn là "vì sao **xem được**": không outlier (0,39×), view chủ yếu do kênh lớn.

| # | Yếu tố | Ở đâu | Mức | Bỏ nó thì mất gì / vì sao |
|---|---|---|---|---|
| 1 | **Cả đuôi đổi xanh → đỏ, thấy rõ, trong một cảnh liền không cắt** | 0,267 · 2,633 · 5,633 · 6,567 | **LÕI** | Mất **cú bật và lời hứa**: video chỉ còn hai vạch đèn. Cắt ngang giữa đổi màu là mất "thật" (form 2) |
| 2 | **Kết quả ngay giây đầu**: đèn sáng từ khung 0, đỏ ở 0,267 s | 0–0,63 | **LÕI** | Mất **hook**: khung đầu là thứ duy nhất giữ người xem trong video 7,8 s không chữ. Giấu cú đổi đỏ tới cuối thì không có gì để xem (khác hẳn khung Giáng sinh, gói 3.9) |
| 3 | **Lặp phép thử ~1,5 s một lần, tăng dần** (một phao → phao kia → bàn tay úp cả hai) | 0,27 → 6,57 | **LÕI** | Mất **thân**: còn lại 0,6 s. Lặp nhiều lần chứng minh "không ăn may", đỉnh 2,63 nhờ tăng dần |
| 4 | **Nền tối + nước trong để LED nổi** | toàn cảnh 1–2 | **LÕI** (đi cùng 1) | Nền sáng thì không đọc được màu đổi. Bằng chứng ngay trong video: ở cảnh 3 ban ngày đuôi không thấy sáng |
| 5 | Hai phao cạnh nhau, đối chứng một đỏ một nhiều màu trong cùng khung | 0,27–0,60 · 1,43–1,80 | Phụ (mạnh) | Cho thấy chỉ phao bị chìm mới đỏ. Một phao vẫn làm được nhưng mất đối chứng |
| 6 | Nhạc beat to, liên tục, trọng âm ~1,5 s, cắt cuối trùng trọng âm | toàn bài | Phụ | Giữ nhịp, che đoạn chết. Thay được bằng nhạc có giấy phép cùng nhịp |
| 7 | Máy đứng yên một khung | cảnh 1–2 | Phụ (mạnh) | Làm cho mỗi lần đổi màu là trước/sau cùng khung. Giữ được thì giữ |
| 8 | Cảnh ngày cận thân phao | 7,23–7,83 | Phụ (yếu) | Cho thấy hình dáng phao. Cụt, nên có thể làm tốt hơn |
| 9 | Không lời, không chữ, 7,8 s | — | Phụ | Xem hết, xem lại dễ. Nhưng tắt tiếng thì không biết món gì (điểm yếu 1) |

**Nguyên liệu khung này đòi** (thiếu thì M0 chặn): **phao điện thật** có chế độ đêm, **đổi đỏ khi bị ấn chìm** (phải kiểm trên hàng thật, xem câu hỏi 1) · ống/cốc nước trong cao · chỗ quay **tối** · chân máy · (nếu giữ yếu tố 5) phao thứ hai.

## Tầng 3 — Phán quyết chuyển sang AI · loại sản phẩm hợp / không hợp

| # | Phán quyết | Lý do |
|---|---|---|
| 1a–2b | ⚠ **Quay thật, không sinh AI** | Cú bật là chức năng thật của hàng. Đổi màu tức thì trong một cảnh liền là thứ AI dễ làm sai (lô phao trước: Muse đỏ sai nhịp, `khung-5-form.html` form 1). Shop đã có `video-01.mp4` quay thật, đổi đỏ ở ~5,0 · 7,75 · 10,25 · 13,75 s (`phao-ro-diec.md` §2) |
| 3 | 🔁 Đổi | Cảnh ngày cận thân phao → thân **xanh ngọc** của LED-425, kèm logo 17fishing. Không dùng thân phao có chữ Hán |
| Lớp chữ | ⚠ Thêm được (Phụ) | Gốc không có chữ, nên thêm chữ không thay yếu tố LÕI nào. Chữ phải là câu thật của trang ("Cá cắn là đuôi chuyển đỏ") |

**Câu hỏi cho sếp:**
1. Phao LED-425 có **đổi đỏ khi bị ấn chìm bằng tay** như video này không? Trang ghi "cảm biến bắt tín hiệu cá cắn" và "theo nhịp ăn của cá". Ngay trong video gốc, lần ấn 3,77–4,30 **không** đỏ. Demo bằng tay mà khác cách phao chạy ngoài hồ là **sai sự thật với khách** (sổ tay 0e).
2. Dạng 1 **đã bão hoà** (≥ 5 shop). Làm khung chính, hay chỉ mượn 2–3 s "tay úp → đỏ" làm bằng chứng trong một khung khác (như `khung-5-form.html` form 3 đã ghi)?
3. ⚠ Clip gốc nghi là đăng lại từ Douyin (chữ Hán trên thân phao, nhà kiểu nông thôn Trung Quốc). Chỉ học cấu trúc, đúng không?

**Loại sản phẩm hợp:** món có **trạng thái đổi nhìn thấy được trong 1 khung**, do tay gây ra được trên bàn (phao điện, đèn cảm ứng, đồ đổi màu theo nhiệt).
**Không hợp:** món cần bối cảnh thật mới thấy tác dụng (cần, máy câu, mồi), hoặc món không có trạng thái đổi.

## Không lấy

- Nhạc gốc: chỉ lấy **mốc**: beat chạy từ khung 0, trọng âm ~1,5 s, cắt cảnh cuối đặt trên trọng âm. Không tìm tên bài để dùng lại.
- Footage gốc: tay, ống nước, ban công, thân phao có chữ Hán. Tiêu đề nguyên văn "báo động 🚨" thì viết câu mới.
- Tên và logo Fishcamp, nhãn hãng phao in trên thân.

## Chỗ chưa chắc

- ⚠ **Quay thật ~90 %**: gợn nước, giọt nước, phản chiếu LED đúng vật lý, nháy LED từng khung (1,43–1,80). Cần gì để chắc: bản gốc chưa nén.
- ⚠ **Đăng lại từ Douyin ~70 %**: chữ Hán trên thân phao, kiến trúc nhà. Cần: tìm bản gốc trên Douyin (cần sếp, không lên web lúc này).
- ⚠ Nền cảnh 1–2 là **phông in/tranh ~55 %** (lan can mềm, màu bệt, lá cây góc trên trái như vẽ), hay ban công thật lúc chạng vạng ~45 %. Cần: soi khung gốc 1080p ở vùng nền.
- ⚠ Lần ấn 3,77–4,30 **không đỏ**: nghiêng ~60 % là cảm biến bắt chuyển động giật xuống đột ngột chứ không bắt độ sâu. Đổi ý nếu sếp thử LED-425 ấn chậm cũng đỏ. Kiểm bằng: sếp ấn phao thật chậm và nhanh, quay 30 fps.
- ⚠ beat_sync có chủ ý ~60 % (chỉ 3/6 mốc khớp ≤ 0,1 s).
- ⚠ Video dừng giữa động tác: kênh cắt cho tròn 8 s hay bản tải bị cụt? Cần: xem trên YouTube (sếp).
- Số % đỏ ở lần 5,633 thấp hơn thật vì đỏ ngả hồng (B > 110). Mốc giây thì vẫn chắc: xanh về 0,00 %.
- Bằng chứng viral: lift trung vị kênh ⬜.

## Ước tính hạn mức

3 cảnh, nên quay thật: 0 clip Muse. Nếu cảnh 3 dùng `video-01` của shop: 0 clip quay mới cho cảnh đó.

## So với phỏng đoán cũ (video-nganh.md dạng 1, đoán từ ảnh khung 25/50/75 %)

| Phỏng đoán | Đo thật | Kết luận |
|---|---|---|
| "Phao đã sáng … Ở khung 25 % đã thấy đèn" | Sáng từ **khung 0** | ✅ đúng, còn sớm hơn |
| "Ngành **không giấu** cú đổi màu" | Đổi đỏ ở **0,267 s** | ✅ đúng: sớm nhất có thể |
| "cốc nhựa hoặc chậu trắng, nền tối" | **Ống trụ trong suốt cao**. Nền chỉ tối ở nửa trên, nửa dưới là lan can sáng | 🟡 gần đúng |
| "**Ngón tay** ấn phao xuống thì đổi xanh → đỏ" | 2/5 lần là ngón tay, **3/5 lần là bàn tay úp cả hai phao**, và cú mạnh nhất là bàn tay | 🟡 thiếu |
| "Lặp lại **2–3 lần**" | **5 lần đổi đỏ** (+1 nháy nhỏ) trong 7,2 s, ~1,5 s một lần, tăng dần | ✗ sai số lần |
| "nhãn chữ trắng nền đen ghi tên hàng" | **Không có chữ nào trên hình** (video này) | ✗ sai với video này |
| "⬜ chưa nghe tiếng" | Nhạc beat không lời, −10,9 LUFS, không im, trọng âm ~1,5 s | đã lấp |
| "8–29 s" | 7,825 s | ✗ ngắn hơn khoảng đã ghi |
| (không đoán) | 2 phao đối chứng · cắt nhảy bỏ đoạn chết · **kết 0,6 s cảnh ngày cận thân phao** | mới |
| Form 3 trên `khung-5-form.html`: phép thử 0–1,5 · **hỏi 1,5–2,5** · làm 2,5–4,5 · **kết quả 4,5–6** · lặp 6–8,5 · kết 8,5–10 | Phép thử + kết quả **0–0,63**. **Không có nhịp "hỏi"**. Lặp 0,63–7,2 (chiếm 84 % độ dài). Kết 7,23–7,83 không có tên hàng hay thông số | ✗ sai thứ tự: kết quả đến ở **0,27 s**, không phải 4,5–6 s |

LÕI dạng 1 theo đo thật = **đổi đỏ trong một cảnh liền · kết quả ngay giây đầu · lặp tăng dần · nền tối**. "Câu hỏi" và "nhãn chữ" **không** phải LÕI của video này.

## Đề xuất cập nhật `video-nganh.md` dạng 1 (không tự sửa; người giữ tệp quyết)

1. Cột **Mở đầu**: "✅ đo jGbUc9o28TA (12/11): đuôi sáng từ khung 0; ngón tay vào 0,13 s; **đổi đỏ lần đầu 0,27 s** — không có nhịp hỏi/chờ." (bỏ ⚠ cho video này)
2. Cột **Cú bật**: "✅ đo: **5 lần đổi đỏ / 7,2 s (~1,5 s/lần), tăng dần ngón → bàn tay úp cả 2 phao; đỉnh 2,63 s**; đổi trong 1 khung; có 1 cắt nhảy (3,77) bỏ đoạn chết; kết 0,6 s cảnh ngày cận thân phao."
3. Cột **Thời lượng · âm · chữ**: "7,8 s · nhạc beat không lời −10,9 LUFS, không im · **không có chữ trên hình** (tên hàng chỉ ở tiêu đề) — dòng 'nhãn chữ trắng nền đen' chưa kiểm cho các video khác · ⚠ nghi đăng lại Douyin (chữ Hán trên thân phao)."
