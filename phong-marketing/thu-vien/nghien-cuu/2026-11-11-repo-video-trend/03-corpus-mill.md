# 03 · cahlen/corpus-mill · 11/11/2026

URL: https://github.com/cahlen/corpus-mill · **Apache-2.0** · 4 sao · push cuối 06/5/2026 · ~30K dòng, một người làm lúc rảnh.

## Đã đọc
`README.md` (dòng 1–260) · `src/corpus_mill/catalog/schema.py` · `src/corpus_mill/stages/fuse.py` · `src/corpus_mill/_event_id.py` ·
`src/corpus_mill/stages/prep.py` · `src/corpus_mill/stages/vlm.py` (grep) · `src/corpus_mill/stages/virality.py` (dòng 1–80) ·
`src/corpus_mill/stages/auto_clips.py` (dòng 1–60) · `src/corpus_mill/stages/music_detect.py` (đầu + hằng số) ·
`src/corpus_mill/dossier.py` (đầu + grep phán quyết) · mẫu `examples/state_of_gpt/stage_c_vlm…sample.jsonl`, `stage_h_hot.intel_hot_v1.jsonl`.

## Thực trạng thật
- README tự ghi: *"not an out-of-the-box product"*, cần GPU NVIDIA ~16 GB+, Ollama, pyannote (token HF), Qwen2.5-VL-7B; "bugs are to be expected".
- Thiết kế cho **video dài có người nói** (livestream, podcast, hội thảo). Ví dụ kèm theo là bài nói 42 phút, chạy ~12 phút trên RTX 5090.
- Lấy mẫu hình **thưa**: `prep.extract_keyframes(every_seconds=5.0)`; VLM chỉ chú thích **1/6 khung** (`CORPUS_MILL_VLM_SAMPLE_EVERY=6`)
  → **mỗi 30 giây một câu tả**. Với reel 15 giây = 0–1 câu tả. **Sai cỡ hoàn toàn cho việc của mình.**

## Schema sự kiện có mốc thời gian (phần đáng học nhất)
`catalog/schema.py` — mọi tầng trích xuất đều ghi ra **một kiểu dòng duy nhất**:

| Trường | Ý nghĩa |
|---|---|
| `stream_id` | video nào |
| `event_id` | mã **tất định** (uuid5 từ nội dung + phiên bản model, `_event_id.py`) → chạy lại không sinh trùng; đổi phiên bản thì giữ cả hai để so |
| `t_start_ms`, `t_end_ms` | khoảng thời gian (ms); sự kiện tức thời thì bằng nhau |
| `event_type` | **danh sách đóng** 12 loại: transcript_turn · scene_caption · detection · ocr_text · audio_event · chat_message · entity_mention · money_mention · product_match · merchant_resolution · key_moment · shoppable_observation |
| `attrs` | nội dung riêng của loại (vd. `{"frame": "f_000007.jpg", "caption": …}`; `{"kind": "brand", "surface": …, "canonical_name": …, "source_event_id": …}`) |
| `source_stage`, `model_version` | tầng nào, model/phiên bản nào ghi ra |
| `confidence` | 0–1 hoặc rỗng |

- Bước G (`fuse.py`) gộp mọi tệp JSONL các tầng, khử trùng theo `event_id`, **xếp theo `t_start_ms`** → một bảng thời gian duy nhất.
- Luật trong tệp: thêm loại sự kiện mới **chỉ** bằng cách thêm vào danh sách đóng và ghi hợp đồng `attrs` — "không có nơi nào khác giữ nghĩa sự kiện".
- Sự kiện sinh từ sự kiện khác giữ `source_event_id` → truy ngược được đến dòng lời gốc.

→ Áp vào máy: các bảng của `sxh-boc-khung` (điểm cắt · âm thanh · cần che · theo giây) **thực chất là các loại sự kiện trên một trục**.
Không cần phần mềm: chỉ cần mỗi dòng có **giây bắt đầu–kết thúc · loại (từ danh sách đóng) · nguồn (đo/whisper/mắt + tên ảnh) · độ tin**.
Bảng hiện có đã gần đủ; thiếu là **danh sách loại đóng** và cột "độ tin" thống nhất.

## Các lớp trích xuất và cái làm được bằng ffmpeg + Claude đọc ảnh, không GPU

| Lớp (tệp) | Trong repo dùng gì | Không GPU thay bằng | Ghi chú |
|---|---|---|---|
| A · prep (`stages/prep.py`) | ffmpeg: âm mono 16 kHz, khung mỗi 5 s | ffmpeg (đã có) | `gvv boc` đã dày hơn |
| B · ASR (`stages/asr.py`) | Whisper-large-v3 GPU | faster-whisper CPU (đã có trong `gvv boc`) | |
| B · tách người nói (`asr_diar.py`, `diarize.py`) | pyannote 3.1 GPU + token HF | ⬜ | reel ít khi nhiều người nói — bỏ |
| C · tả cảnh/OCR (`stages/vlm.py`) | Qwen2.5-VL-7B | **Claude đọc lưới khung** (đã làm) | |
| Mặt người (`face_detect_yunet_dlib.py`) | YuNet + dlib (CPU được) | ⬜ không cần | |
| Nhạc (`stages/music_detect.py`) | ffmpeg `astats` + lời whisper | **ffmpeg + faster-whisper, đã có** | xem dưới |
| Dấu vân tay hình/âm (`forensics_pdq.py`, chromaprint) | pdqhash, chromaprint (CPU) | cần cài (nhóm B) | để so thân hai video, thay SSIM tay |
| H · thực thể/khoảnh khắc (`intel.py`) | Qwen2.5/Qwen3 qua Ollama GPU | Claude | |

**Luật dò nhạc** (`music_detect.py`, hằng số dòng 49–51): một đoạn **≥ 5,0 s không có lời whisper** và RMS (ffmpeg `astats`) **> −42 dB**
= "có thể là nhạc"; lời xen trong nhạc cách nhau ≤ 1,2 s vẫn tính là nhạc. Mục đích: tắt tiếng vùng nhạc để tránh gậy bản quyền,
**không nhận dạng bài**. Ngưỡng chọn cho livestream; với reel 15 s cần hạ ngưỡng độ dài (⚠ chưa đo trên video của mình).
Liên quan gói §3.6 (nhạc) và sxh-boc-khung luật 2 (âm phải đo).

**Bảng phán quyết chỉ dựa bằng chứng** (`dossier.py` đầu tệp): 4 phán quyết `verified_true · verified_false · insufficient_evidence ·
not_adjudicable`; "nếu không trích được bằng chứng thì là not_adjudicable"; mỗi phán quyết phải trỏ `stream_id + event_id`; ghi chồng
**chỉ thêm dòng mới** trỏ về phán quyết cũ (không xoá). → Cùng tinh thần "tách sự thật và phán đoán" (05 §2); hữu ích cho Chuyên viên
sản phẩm khi kiểm claim.

**Điểm viral** (`virality.py`, `auto_clips.py`): cửa sổ 30 s trượt 5 s, cộng mật độ tín hiệu theo trọng số tay; tác giả tự ghi đây là
"máy sinh ứng viên rẻ", **không phải xếp hạng**, "đừng tinh chỉnh trọng số, không tổng quát được". → Không lấy.

## Mức đáng học: **trung bình** — lấy schema sự kiện và luật dò nhạc; không dựng
