# 02 · So rea-video với `gvv boc`

`gvv boc` = `D:/my project/gen-video-viral/src/boc.ts` + `do-tin-hieu.ts` + `tools/boc-loi.py` (đọc ngày 11/11).
rea-video = mã ở `01-pipeline.md`. Phần "Chưa kiểm" nghĩa là đọc mã mà suy ra, chưa chạy trên video của mình.

## 1. Bảng so từng phần

| Phần | `gvv boc` hiện có | rea-video có | Khoảng cách · nên làm gì |
|---|---|---|---|
| Điểm cắt | `ffmpeg select=gt(scene,X)` ở 2 ngưỡng cố định 0,3 và 0,15, gộp các điểm cách nhau < 0,15 s | Ngưỡng **thích nghi** theo trung vị cục bộ ±0,5 s. Có cắt nhảy, punch-in, mờ, hoà tan, lau, shot ngắn ≥ 0,12 s. Recall 95 % / precision 94 % trên 9 clip | **Lớn nhất.** gvv đã bỏ sót cắt ở 2,23 s (điểm 0,134 < 0,15, thi 11/11). **Học ý viết vào gvv** (mục 3, ý G1) |
| Phân biệt đèn với cắt | Cờ ⚠ "đèn" khi cắt cách lần bật sáng < 0,25 s. Thi 11/11: cả 2 cờ đều là cắt thật | `_brief_flash` + `_back_to_before`: chỉ bỏ khi ảnh **quay về** như trước trong 2–3 khung. Chớp mở cảnh thì vẫn là cắt | Ý đúng: **phân xử bằng "ảnh có quay về không"**, không bằng độ sáng. Đèn bật rồi giữ sáng: rea-video cũng chưa chắc xử đúng (chưa kiểm) |
| Bật sáng / cú bật | `timBatSang`: Y tăng ≥ 12 so với trung vị 0,6 s trước. Có đo vùng giữa khung cho vòng LED | Không có khái niệm "cú bật". Chỉ có `flash_s` (thời gian chớp tắt dần) | **gvv mạnh hơn.** Giữ nguyên |
| Lưới khung | 4 khung/s, 6 s mỗi tấm, có ghi giây | `storyboard.jpg`, tấm đầu-giữa-cuối mỗi shot, `tiles --every`, `zoom_cmd` | Ngang nhau. Lệnh khung dày của tệp việc đã đủ |
| Âm lượng | RMS mỗi 0,25 s, trung bình 0,5 s | `energy_curve` mỗi 0,5 s, `silence_ratio`, RMS, đỉnh | Ngang nhau. Tệp việc còn đòi `ebur128` / `silencedetect` (đúng hơn cả hai) |
| Giọng / nhạc / SFX | Không | Có giọng, có nhạc, nhạc ra sao. SFX thô. Ghi nhận held-tone | Học ý (G3). Lưu ý **SFX trong bản trộn giọng + nhạc gần như đoán mò** (precision ~0,2) |
| BPM + phách + khớp cắt | Không | BPM, lưới phách, `cuts_on_beat_ratio` ±0,07 s so với mức ngẫu nhiên, `beat_synced_edit` | **Học ý viết vào gvv** (G2), chỉ cần numpy |
| Tách giọng / nhạc | Không | UVR MDX ONNX CPU 67 MB | Đáng có. Chạy whisper trên **kênh giọng** thì bớt bịa chữ. Cần sếp duyệt cài |
| Lời | faster-whisper `small`, có giờ từng từ, **có tiếng Việt** | SenseVoice zh/en/ja/ko/yue, **không có tiếng Việt**, giờ trong câu dài chỉ là ước | **gvv tốt hơn cho mình.** Không dùng ASR của rea-video |
| OCR chữ trên hình | Không (agent đọc ảnh) | RapidOCR ~2 khung/s, mốc chỉnh tới ~0,1 s, kiểu chữ, hiệu ứng vào/ra, xuất SRT/ASS. **Chỉ zh/ja** | Có ích với mẫu tiếng Anh/Trung. Với chữ tiếng Việt: mất dấu (suy từ mã), agent vẫn phải đọc |
| Sticker / logo / PiP | Không (agent quét bốn góc) | Dò vùng hiện/mất, recall ~50 % (tự nhận) | Không thay được bước quét bằng mắt. Chỉ để gợi ý |
| Cách làm hình (thật / AI / code…) | Không, để agent viết | 11 nhãn + xác suất + bằng chứng. Nhịp khung 24→30, thẻ chuyển mã, AIGC, C2PA | Học ý (G4, G5). Trên video TikTok tải về: chỉ dùng máy thì **46 %** (mục 2 của 00) → không dùng một mình |
| Cách quay | Không | Cỡ cảnh từ mặt, kiểu giữ máy, tỉ lệ sáng, độ ấm, teal-orange, 12 sơ đồ đèn + thiết bị | Cho Đạo diễn. Đọc **thuật ngữ và bảng** là đủ. Cài để đo thì tuỳ (mục 4) |
| Nguồn gốc tệp | Không | `probe.py`: thẻ encoder, khoá AIGC, C2PA | **Rẻ nhất để thêm** (G5): `ffprobe -show_format -show_streams` in thẻ |
| Narrative line | Khuôn "Bốn câu", "Lý do ở lại theo từng giây" | 8 vai mỗi shot, gộp thành chuỗi bước | Cho Biên kịch. Thêm cột "vai" vào khung (G6) |
| Bộ nhớ sửa sai | Sổ lỗi §10 (người viết) | `~/.rea-video` áp lại lần `correct` cũ cho **cùng tệp** | Sổ lỗi của mình rộng hơn. Không cần |
| Đầu ra | `do.json`, `khung-nhap.md` có ô ⬜ theo sổ tay | `breakdown.json` (~11 nhóm), `report.md/html`, SRT, ASS, stems | Khác mục đích. gvv viết cho khung viral của mình. Giữ gvv làm "khung", rea-video (nếu cài) chỉ để **bơm số đo** |

## 2. rea-video làm được mà gvv chưa (theo câu hỏi của sếp)

- **Phân loại thật / AI / code**: có, 11 nhãn, nhưng mạnh nhất trên **tệp gốc**. Trên tệp TikTok/Douyin tải về chưa từng thấy: 46 % chỉ với máy, 97,5 % khi có agent xem ảnh.
- **Chuyển động máy**: đo được 3 mức (cầm tay / di chuyển mượt / đứng yên) từ chuyển động toàn cục. Lia, tilt, dolly, zoom, ống kính: **phải hỏi người đọc ảnh**.
- **Ánh sáng**: đo tỉ lệ, bên chính, độ cứng, độ ấm, rồi ánh xạ ra 12 sơ đồ. Đèn viền, hình đèn phản chiếu trong mắt, nguồn đèn: hỏi người đọc ảnh.
- **Nhịp cắt theo beat**: có, kèm mức ngẫu nhiên để không ăn may.
- **OCR chữ**: có, cho chữ Trung/Anh/Nhật.
- **Tách tiếng**: có (giọng / phần còn lại). Không tách riêng SFX khỏi nhạc.

## 3. Ý nên viết vào `gvv boc` (không cần cài rea-video). Giấy phép Apache-2.0 cho phép chép, nhưng mình **viết lại bằng TS**, ghi nguồn

| # | Ý | Cách làm trong gvv | Cần gì |
|---|---|---|---|
| G1 | **Ngưỡng cắt thích nghi + cắt nhảy** | Lấy `lavfi.scene_score` của **mọi khung** (`select='gte(scene,0)',metadata=print`). Đánh dấu ứng viên khi điểm > 2,5 × trung vị ±0,5 s + 0,06 (kể cả khi < 0,15). Ghi cột "điểm / trung vị cục bộ" để tệp việc soi | không (ffmpeg có sẵn) |
| G1b | **Phân xử đèn vs cắt bằng "ảnh quay về"** | Với mỗi cờ ⚠ đèn: so khung t+3 với khung t−2 (`ssim` hoặc `psnr` của ffmpeg). Giống nhau → đèn/nháy. Khác → cắt. Bỏ luật "sát bật sáng 0,25 s = có thể là đèn" | không |
| G2 | **BPM + phách + tỉ lệ cắt rơi vào phách** | Thêm `tools/boc-phach.py` (numpy: STFT → HPSS trung vị → onset → tự tương quan 60–190 BPM). Xuất `beats[]`, `cuts_on_beat_ratio` (±0,07 s), mức ngẫu nhiên, cờ `beat_synced` | numpy: **đã có** (numpy 1.26.4 trên Python 3.10.10, kiểm 11/11). Máy có sẵn cả onnxruntime 1.23.2, chưa có opencv |
| G3 | Held-tone: một cao độ giữ suốt thì không ghi "nhạc". Không có trống thì không ghi BPM | Trong G2 | — |
| G4 | **Nhịp khung 24→30** (khung lặp đều 1/5) là gợi ý nguồn 24 fps (AI hoặc máy 24p), **không phải bằng chứng AI** | `ffmpeg -vf mpdecimate` hoặc `freezedetect` đếm khung trùng theo shot | không |
| G5 | **In thẻ nguồn gốc**: encoder, handler, khoá có `aigc`, hộp C2PA. **Tên mô hình trong tiêu đề/mô tả thì không tính** | `ffprobe -show_format -show_streams -of json` → bảng "Nguồn gốc" trong `khung-nhap.md` | không |
| G6 | Cột **"vai trong câu chuyện"** (8 vai) trong bảng cảnh của khung nháp | Sửa `vietNhap` | không. Cần sếp duyệt khuôn (đã có câu hỏi 5 ở gói §12) |
| G7 | Chạy whisper trên **kênh giọng đã tách** khi video có nhạc to | Chỉ làm được khi có công cụ tách (rea-video `stems` hoặc UVR riêng) | cài, cần sếp duyệt |

Thứ tự đề xuất: G1 + G1b (đúng chỗ đau nhất, 0 phụ thuộc) → G5 → G2/G3 → G4 → G6 → G7.

## 4. Cái nên dùng thẳng rea-video (nếu sếp duyệt cài)

Chỉ **chế độ offline** (`decompose` **không** `--vlm`), kèm agent tự xem ảnh (`review` / `apply-review`):
- `rea-video stems <video>`: lấy `vocals.wav` để nghe/đo, rồi cho whisper chạy trên đó.
- `decompose … --lang en`: lấy `audio.music.beats`, `cuts_on_beat_ratio`, `packaging` (chữ Anh/Trung), `aspects.lighting/grade` để đối chiếu với điểm cắt của gvv.
  Coi là **ý kiến thứ hai**, không thay bảng điểm cắt đã soi.
- Không dùng: `remake-run` (gọi capsule-cinema trả phí), `install_skill.sh` (tự chèn skill vào `~/.claude`), `--vlm` với dịch vụ ngoài.
