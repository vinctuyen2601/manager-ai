# 06 · nihalsinghverma/open-content-studio · 11/11/2026 (lướt)

URL: https://github.com/nihalsinghverma/open-content-studio · **MIT** · 0 sao · push cuối 08/9/2026.

## Đã đọc
`README.md` (dòng 1–46, 170–300 + grep) · `src/analysis/analyze.py` · `src/transcription/transcribe.py` ·
`src/script/generate.py` (dòng 1–260, 580–790). Không đọc `src/visuals/generate_prompts.py`, `src/images_generate.py`, `data/`.

## Thực trạng thật — README nói nhiều hơn mã làm
- README mục 1 kể các "đặc điểm kể chuyện" rút ra: *pacing · target audience · emotional structure · hook style · repetition patterns ·
  visual storytelling techniques · narrative progression · engagement patterns*.
- Mã thật (`analyze.py`): **chỉ đọc lời** (whisper → văn bản), gửi cho qwen2.5:7b qua Ollama một lời nhắc xin 10 mục **chữ tự do**:
  chủ đề · khán giả · ý cốt lõi · hook · cấu trúc kể · yếu tố cảm xúc · lặp/mô thức · cảnh có thể dựng · vì sao hấp dẫn · 3 ý mới.
  **Không có trường có cấu trúc, không đo pacing** (không đọc hình, không đo cắt, không có giây). "Pacing" chỉ là model đoán từ lời.
- README (dòng ~175–190) tự ghi whisper sai với bài hát thiếu nhi, nhạc đè lời → "transcript là tín hiệu, không phải sự thật".
- Đầu ra hiện chỉ cho **một** thể loại: truyện thiếu nhi tiếng Hindi 35–50 s. Bước hình/giọng/dựng: "NEXT/PLANNED".

## Cách chuyển phân tích thành kịch bản (`src/script/generate.py`)
- Khung 8 cảnh cố định: HOOK → SETUP → GOAL → PROBLEM → ESCALATION → TWIST → RESOLUTION → PUNCHLINE; mỗi cảnh 4–7 s, tổng 35–50 s.
- Luật cho model: mỗi cảnh phải đổi tình thế; nhân vật làm **hành động thấy được khác nhau** mỗi cảnh; vấn đề lớn dần trước twist;
  twist làm lời giải khả thi; kết là **trò đùa bằng hình**, không phải bài học lặp lại. Mỗi câu tả hình phải có: nhân vật · bối cảnh ·
  hành động riêng · đạo cụ quan trọng · cảm xúc hoặc chi tiết đáng quay. Giữ đồng nhất màu/quần áo/phụ kiện nhân vật giữa các cảnh.
- **Chống chép nguồn**: không đưa phân tích thô vào lời nhắc viết mà chỉ đưa "đặc điểm đã lọc an toàn"; dùng **hạt truyện độc lập**
  (3 tiền đề viết sẵn, chọn tất định theo ID video); kiểm sau khi viết:
  · danh sách **từ cấm** lấy từ cốt truyện nguồn (khỉ, kẹo, ăn uống…) — có từ nào → làm lại;
  · **Jaccard theo từ** giữa các cảnh với nhau > **0,82** → báo "hai cảnh quá giống" (lưu ý: so **giữa các cảnh**, **không** so với nguồn);
  · sai số cảnh/thứ tự/thời lượng → gửi lỗi lại cho model viết lại, tối đa 3 lần.

## Điểm rút ra
1. Luật "mỗi cảnh một hành động thấy được khác nhau" và "kết bằng hình, không bằng lời răn" → kiểm được cho Biên kịch (`bk-kich-ban-qc`). Mức: Thấp.
2. Danh sách từ cấm lấy từ nguồn → cách rẻ để kiểm "không chép phần thể hiện" (gói §3.6) khi chuyển khung. Mức: Thấp.
3. Cảnh báo: phân tích **chỉ từ lời** bỏ mất cú bật bằng hình — đúng loại video của shop (cá lên, phao chìm, đèn đổi màu). Không lấy cách đó.

## Mức đáng học: **thấp**
