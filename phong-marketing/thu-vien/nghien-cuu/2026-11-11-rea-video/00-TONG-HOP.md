# Tổng hợp · rea-video lần 2 · 11/11/2026

JuneYaooo/rea-video · Apache-2.0 · ★6964 · đầu nhánh `3669923` (11/11 08:55 UTC). Chỉ đọc bằng `gh api`, không clone, không chạy, không gọi API.
Chi tiết: `01-pipeline.md` (mã từng bước) · `02-so-voi-gvv-boc.md` · `03-thay-doi-tu-10-11.md`.
Mức bằng chứng: **Cao** · **TB** (một nguồn có đo, do tác giả tự đo) · **Thấp** · **Mã** (đọc mã, chưa chạy) · **Nội bộ**.

## 1. Năm điều mới so với lần đọc 10–11/11

1. **Con số độ chính xác mà phòng đang trích là con số đẹp.** Với video bán hàng Douyin mà quy tắc chưa từng thấy: chỉ máy được **46,4 %**,
   thêm Gemini được 63,9 %, thêm agent xem ảnh được **97,5 %**. Talking head ban đêm, chỉ máy: 51 %. Gói Săn xu hướng §3.7 cần sửa (`03-…`).
2. **Dò cắt của họ không dùng `ffmpeg scene`.** Họ dùng ngưỡng thích nghi theo trung vị cục bộ, có dò cắt nhảy, và chỉ bỏ "nháy sáng" khi **ảnh quay về như cũ**.
   Recall 95 % / precision 94 % trên 9 clip gắn nhãn tay. Đúng hai lỗi `gvv boc` mắc ở bài thi 11/11.
3. **Không có tiếng Việt** ở ASR (SenseVoice: zh/en/ja/ko/yue) và ở OCR (chỉ zh/ja). faster-whisper của mình tốt hơn cho lời tiếng Việt.
4. **Narrative line** (8 vai) mới thêm. Phần này **không đo gì**, do VLM hoặc agent gán. Có ích cho Biên kịch như một khuôn.
5. **VLM tắt theo mặc định.** Bật lên thì nó gửi clip 480p ≤ 12 s mỗi shot **và cả video 480p có tiếng** tới API ngoài. Chạy offline thì không gửi gì
   (chỉ tải model từ GitHub, có kiểm SHA-256; không thấy telemetry).

## 2. Bảng lấy gì

| # | Lấy gì | Cho vai | Đưa vào tệp | Cần gì | Giấy phép | Bằng chứng |
|---|---|---|---|---|---|---|
| 1 | **Ngưỡng cắt thích nghi**: điểm cảnh > 2,5 × trung vị ±0,5 s + 0,06 là ứng viên, kể cả khi < 0,15. Thêm cột "điểm / trung vị" | Săn xu hướng | `gvv boc` (`doCat`) · `sxh-boc-khung.md` luật 1 | không (ffmpeg) | Apache-2.0, viết lại, ghi nguồn | TB (CHANGELOG: recall 79 → 95 %) |
| 2 | **Đèn hay cắt: xem ảnh có quay về không** (khung t+3 so với t−2). Bỏ luật "sát bật sáng = có thể là đèn" | Săn xu hướng | `gvv boc` (`danhDauCatDoSang`) · tệp việc luật 1 | không | như trên | TB + Nội bộ (thi 11/11: 2/2 cờ đèn là cắt thật) |
| 3 | **In thẻ nguồn gốc**: encoder, khoá `aigc*`, C2PA. Tên mô hình trong tiêu đề/mô tả **không** tính | Săn xu hướng | `gvv boc` (bảng "Nguồn gốc") · gói §3.7 | không (ffprobe) | như trên | Mã |
| 4 | **Nhịp 24→30** (khung lặp đều) chỉ là gợi ý *nguồn 24 fps* (AI **hoặc** máy 24p), không phải bằng chứng AI | Săn xu hướng, Đạo diễn | gói §3.7 · tệp việc luật 5 | không | — | TB (họ đo: máy 24p bị gọi AI 89 %) |
| 5 | **BPM + lưới phách + tỉ lệ cắt rơi vào phách** (±0,07 s, so với mức ngẫu nhiên = phách/s × 0,14) | Thợ dựng, Săn xu hướng | `tools/boc-phach.py` mới trong gvv · `tho-dung.md` §3.5 | numpy: **đã có** trên máy | như trên | TB (BPM 2/2, tập nhỏ) |
| 6 | **Held-tone / no_beat**: một cao độ giữ suốt thì không phải nhạc, không có trống thì không có BPM | Thợ dựng, Săn xu hướng | `sxh-boc-khung.md` luật 2 | không | — | Mã |
| 7 | **SFX trong bản trộn giọng + nhạc: máy gần như đoán mò** (precision ~0,2). Ghi SFX phải dựa vào nghe/phổ, không dựa vào máy | Săn xu hướng, Thợ dựng | tệp việc luật 2 | không | — | TB (tác giả tự nhận) |
| 8 | **8 vai narrative** (hook · context · info · proof · turn · payoff · cta · mood), gộp các shot cùng vai thành bước. "Giữ trình tự, thay ca của mình" | Biên kịch | khuôn khung (cột "Vai") · tệp việc Biên kịch | không. Đổi khuôn cần sếp duyệt | Apache-2.0 | Thấp (khuôn, không đo) |
| 9 | **Từ vựng cách quay**: giữ máy (selfie / người khác cầm / tripod / gimbal / giá top-down), ống kính, tốc độ, góc máy, 9 câu hỏi ánh sáng (key, cứng/mềm, fill, rim, catchlight, practicals, nhiệt màu) | Đạo diễn | `dao-dien-hinh-anh.md` (bảng đọc video mẫu) | không | Apache-2.0 | TB (đã có trong prompt, chưa có đo độc lập) |
| 10 | **12 sơ đồ ánh sáng kèm thiết bị**, nhất là **"product still"** (nền liền, softbox trên đầu + 2 bên, bọc vải tản cho vật bóng) và "đêm thiếu sáng" | Đạo diễn | `dao-dien-hinh-anh.md` | không | Apache-2.0, dịch, ghi nguồn | Thấp (bảng kinh nghiệm). Họ tự ghi: chuyển mã làm sai số độ cứng và fill |
| 11 | **Tách giọng/nhạc** (UVR MDX 67 MB, CPU) rồi chạy whisper trên kênh giọng | Săn xu hướng, Thợ dựng | `gvv boc` (tuỳ chọn) | **cài, cần sếp duyệt** | Apache-2.0 (model UVR: chưa kiểm giấy phép) | TB (SDR 19,7 dB, 1 ca) |
| 12 | **Thứ tự soi**: soi trước shot máy kém chắc nhất và dài nhất. Báo cáo ghi rõ "chỉ soi a/n" | Săn xu hướng | `sxh-boc-khung.md` bước 3 | không | — | Mã |

## 3. Giúp riêng từng vai

- **Săn xu hướng** (thiếu nhất là đo giây thật): ý 1, 2, 3, 12 sửa đúng hai lỗi thi 11/11 mà không cần cài gì. Ý 5–7 cho phần âm.
  Nhãn "AI / quay thật" của máy **không** đủ làm bằng chứng trên tệp TikTok (46 %). Luật "phải có bằng chứng nhìn thấy được" vẫn đúng.
- **Đạo diễn** ("quay thật"): ý 9 thành khuôn câu hỏi khi xem video mẫu. Ý 10 thành bảng tra đèn cho cảnh sản phẩm.
  Máy chỉ đo được 3 mức giữ máy và tỉ lệ sáng. Lia/dolly/zoom và nguồn đèn vẫn phải người đọc ảnh.
- **Thợ dựng**: ý 5 (có phải cắt theo phách không, có số so với ngẫu nhiên). Ý 6, 7 để đừng tin SFX của máy.
  Lớp chữ ASS và neo chữ theo câu đã có ở §3.6.
- **Biên kịch**: ý 8. Lời thì vẫn dùng faster-whisper (có tiếng Việt, có giờ từng từ). ASR của rea-video không dùng được.

## 4. Đánh giá thật (`eval/RESULTS.md` ngày 11/11, do tác giả tự đo, không có kiểm độc lập)

| Phần | Số | Ghi chú |
|---|---|---|
| Cách làm hình, chỉ máy, tệp gốc | 98,3 % (tập chỉnh) · 99,6 % · 98,9 % (holdout) | Holdout 1 đã sửa quy tắc sau lần chạy đầu. Chia theo clip, không theo nhà sản xuất |
| Tệp đã chuyển mã (WeChat, 10 clip, tập dev) | máy 88,6 % → + Gemini 99,6 % → + agent 100 % | Là tập phát triển |
| **Lần đầu gặp: bán hàng Douyin (2 clip)** | **máy 46,4 % · + Gemini 63,9 % · + agent 97,5 %** | Cảnh tay từ trên xuống, tĩnh, sau chuyển mã bị gọi là AI. Máy quay màn hình điện thoại bị gọi là 3D/AI |
| Talking head Douyin (2 clip, dev) | máy 75,5 % (đêm 51 %, trong nhà 99 %) · + agent 96,7 % | |
| Điểm cắt (9 clip gắn nhãn tay) | recall 95 %, precision 94 % | Vuốt màn hình vẫn bị tính là cắt |
| Tư liệu thật (ảnh chụp màn hình, ảnh chèn) | 97–99,6 %. **Holdout2 lần đầu 75,6 %** | Ảnh nền tối/trong mờ, web giao diện tối bị bỏ sót |
| Âm | giọng 5/5 · BGM 4/4 · BPM 2/2 · giọng 2/2 · SFX 2/4 · nguồn nhạc 2/5 | SFX precision ~0,2. Nhạc Suno và nhạc thư viện không phân biệt được |
| Agent **không** xem được ảnh (DeepSeek) | lật máy 4 lần, sai 2 | Từ đó có luật "không xem được ảnh thì không lật" |

Tác giả tự nhận: chỉ **3 mẫu quay thật** (đều 60 fps Douyin) · chưa có mẫu Ken Burns thật · số "+VLM/+agent" là **trộn lại từ câu trả lời trong cache**,
chưa đo lại từ đầu · chỉ bật VLM mà không có agent thì từng **kém hơn chỉ dùng máy** ở holdout · talking head tối và shot ngắn 3D lông bị phân loại sai.

## 5. Có nên cài rea-video không

**Khuyến nghị: chưa cần cài. Làm ý 1–3 trong `gvv boc` trước** (0 phụ thuộc, sửa đúng lỗi đã đo).
Cài khi cần **tách giọng** hoặc **lớp chữ OCR cho mẫu tiếng Anh**, với điều kiện:
- Cài **venv riêng**, chốt commit `3669923`: `pip install "rea-video[ocr] @ git+…@3669923"`. Gỡ `opencv-python` rồi cài lại headless (theo `setup.md`).
  **Không** chạy `install_skill.sh` (nó tự link skill vào `~/.claude/skills`), **không** cài `[asr]`.
- Chỉ chạy `decompose` / `stems` / `tiles` / `review`. **Không** đặt biến `REA_VLM_*`, **không** dùng `--vlm`, **không** dùng `remake-run`.
- Kết quả là **ý kiến thứ hai** cạnh bảng điểm cắt đã soi. Nhãn AI/thật của nó không được làm căn cứ LÕI.

Chi phí ước (**chưa đo trên máy**): Python 3.10.10 có sẵn, numpy 1.26.4 và onnxruntime 1.23.2 đã có. Còn phải cài opencv-headless, Pillow, PyYAML, rapidocr
(ước 100–200 MB trong venv). Model: UVR 67 MB + YuNet 0,23 MB. **Không GPU, không API key.**
Tốc độ tác giả đo: ~1 phút cho 30 s. Mở hộp 72 s: 104 s.
Rủi ro: repo đổi nhiều lần mỗi ngày (bản 0.1.0) · Windows có xử lý đường dẫn Unicode nhưng chưa ai trong phòng chạy · giấy phép riêng của model UVR chưa kiểm.

## 6. Không nên làm

- Không trích "98–100 %" khi nói về video tải từ TikTok. Con số gần mình nhất là **46 % chỉ máy**.
- Không dùng `--vlm` với Gemini/GPT/proxy. Nó gửi cả video có mặt và giọng người, trái luật phòng.
- Không dùng ASR SenseVoice hay OCR của nó cho chữ tiếng Việt.
- Không coi SFX, sticker (recall ~50 %), nguồn nhạc (2/5) mà máy báo là đã kiểm.
- Không để agent mù ảnh (chỉ đọc JSON) lật kết luận của máy.
- Không chạy `remake-run` / capsule-cinema (tốn tiền, ngoài phạm vi).

## 7. Câu hỏi cho sếp

1. **Cho sửa `gvv boc` theo ý 1–3** (ngưỡng thích nghi, phân xử đèn bằng "ảnh quay về", bảng nguồn gốc)?
   *Mặc định: có. Làm ở một nhánh, chạy lại đề thi 11/11 làm hồi quy trước khi gộp.*
2. **Cài rea-video offline trong venv riêng** để tách giọng và lấy OCR cho mẫu tiếng Anh?
   *Mặc định: chưa. Xét lại sau khi xong câu 1, nếu bài thi tiếp theo vẫn sai ở phần âm.*
3. **Thêm cột "Vai" (8 vai narrative) vào khuôn khung**, gộp với câu hỏi 5 đang treo ở gói Săn xu hướng §12?
   *Mặc định: thêm vào khuôn rút gọn "nuôi page" trước, khuôn thư viện để sau.*
