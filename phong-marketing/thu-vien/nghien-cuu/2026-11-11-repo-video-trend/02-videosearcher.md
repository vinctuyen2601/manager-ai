# 02 · StefanoGarzoni/VideoSearcher-AgenticAI · 11/11/2026

URL: https://github.com/StefanoGarzoni/VideoSearcher-AgenticAI · **KHÔNG có giấy phép** (API trả `license: null`;
`README.md` mục cuối tự ghi "not an open-source license grant") → **chỉ học ý, không chép mã/văn.**
0 sao · push cuối 28/10/2026 · đồ án nhóm Politecnico di Milano (7/2026).

## Đã đọc
`README.md` · `docs/PRIVATE_COMPONENTS.md` · `docs/VLM_COMPONENTS.md` · `docs/RESULTS.md` · `docs/MODEL_COMPARISON.md` (dòng 1–90)
· `tools/ffmpeg-frames-mcp/frames_server.py` · `tools/scene-detect-mcp/scene_detect_main.py` (grep) ·
`agents-container/videosearcher_agents/orchestrator/main_agent.py` (grep các "PIPELINE CHAINS" A–H) ·
`tests/ground_truth/schema.md` · `tests/ground_truth/videos/f-35/vqa.json` (đầu tệp) · `tests/metrics/scene_check.py`.
Danh sách cây thư mục đầy đủ (`git/trees/HEAD?recursive=1`).

## Kiểm nhận định "VideoSearcher thiếu framework thị giác" → **ĐÚNG**, cần nói chính xác hơn
- `README.md` khung "Source snapshot": *"One underlying vision framework … is not distributed here … the full VQA/segmentation
  stack cannot be built from this repository alone."*
- `docs/PRIVATE_COMPONENTS.md` mục 1: thiếu `VLMs-Testing-Framework` (cung cấp `ModelInterfaces` cho `VqaAgent` và
  `SegmentationPipelines` = GroundingDINO + SAM2). Hai Dockerfile chép `/vlm_src` lúc build → **không build được**.
  `local-ai-service/run_agentic_system.sh` dừng có chủ ý khi thiếu.
- Phần **còn mã thật**: các máy chủ MCP ffmpeg (cắt khung, tách âm, nén), faster-whisper, grep lời, PySceneDetect, web search,
  tóm tắt; bộ điều phối; bộ test + ground truth dạng cấu trúc (đã bỏ ảnh khung và lời TED vì bản quyền).
- Chạy đủ cần GPU NVIDIA ~38 GB VRAM (`docs/VLM_COMPONENTS.md` mục 6: Phi-4-reasoning-vision-15B ~30 GB + segmentation ~3 GB + điều phối ~5 GB).
- Thêm một điểm bản tóm tắt chưa nói: **không có giấy phép** — kể cả phần mã có sẵn cũng không được dùng lại.

## Kiến trúc agent hiểu video (học ý)
- Một LLM điều phối nhỏ (mặc định Gemma-4-E2B, 2B) **không tự chạy công cụ**, chỉ gọi "handoff" sang agent chuyên trách.
  Lời nhắc hệ thống ghi sẵn 8 chuỗi A–H (vd. G = "tìm lúc nói cụm X rồi xem hình lúc đó": tách âm → whisper → grep lời → lấy giây →
  cắt khung → hỏi VLM). Có luật "đường dẫn chuyền nguyên văn, không tự dựng" vì model 2B hay làm hỏng đường dẫn.
- **Mốc thời gian là chất keo giữa các giác quan**: whisper xuất mỗi dòng `[MM:SS.mmm]`, grep giữ nguyên tiền tố đó, điều phối
  đọc ra giây rồi gọi cắt khung đúng giây (`docs/VLM_COMPONENTS.md` mục 3).
  → Với mình: lời theo từ của `gvv boc` đã có giây; luật "tả hình ở giây nào thì mở khung giây đó" (sxh-boc-khung luật 3) là cùng ý.
- Luật chống bịa trong chuỗi G: "nếu tìm lời ra 0 kết quả → báo không thấy, **không bịa mốc thời gian**".

## Cách lấy mẫu khung hình
- `extract_frames(video, t_start, t_end, fps=1.0)` → danh sách `{frame_path, timestamp}`. Mặc định **1 khung/giây**.
- Khi hỏi VLM, điều phối chỉ chuyền **`first_frame_path`** — tức VQA trả lời trên **một khung**, không phải chuỗi khung.
  Đây là điểm yếu với video ngắn mà cú bật nằm trong ~0,5 s (đèn LED sáng dần, gói §3.9). Lưới 4 khung/giây + khung dày
  10 khung/giây của mình **dày hơn nhiều**.
- Dò cảnh: PySceneDetect `ContentDetector(threshold=27.0)`.

## Bộ đề / benchmark (phần đáng học nhất)
- **Ground truth theo từng video, mỗi giác quan một tệp** (`tests/ground_truth/schema.md`): transcript · grep · audio · vqa · segmentation · scene_detect.
- **VQA**: mỗi câu có `q_type` ∈ {identify · count · attribute · spatial · **true_negative**}; `required_facts` (**phải có hết**, AND),
  `acceptable_keywords` (**có một là được**, OR), `min_answer_length`. Câu true_negative hỏi thứ **không có** trong khung
  (vd. "có máy bay trong ảnh không?" → đáp án "không").
- **Gold / silver**: gold = người kiểm; silver (`is_silver: true`) = máy sinh, trượt thì phải soi tay trước khi kết luận.
  Transcript silver có luật chống vòng tròn: model làm đáp án (`large-v3`) phải khác model bị chấm (`small`).
- **Điểm cắt**: `expected_cuts` + `tolerance_s` (1,0 s) + `method: hand-verified frame inspection`. Chấm (`tests/metrics/scene_check.py`):
  đếm cảnh lệch ≤ 3 **và** cut recall ≥ 0,7 trong dung sai.
- **3 mức lời giao việc** cho cùng một bài: vague · clear · algorithmic → đo độ bền khi sếp giao mơ hồ (22 kịch bản × 3 = 66 bài/model).
- 14 chỉ số, trong đó: chọn đúng agent đúng thứ tự (handoff) · số lần gọi thừa · xử lý lỗi (bài cố ý không làm được → phải từ chối ngay bước đầu).
- **Bài học về nhiễu** (`docs/RESULTS.md`): lần chạy tốt nhất của Qwen3.6-A3B là 95,5 %, chạy lại 2 lần còn 89,4 % và 90,9 %
  (trung bình 90,2 %). Tác giả tự viết: chọn lần chạy cao nhất là **thiên lệch chọn người thắng**. Mức: Trung bình (đo thật, mẫu nhỏ).
  → Bằng chứng cho đề xuất A4 của `../2026-11-11-agent-chuyen-gia/04-phuong-phap-danh-gia.md` (mỗi đề chạy ≥ 2 lần).

## Mức đáng học: **trung bình** — chỉ phần thiết kế bộ đề và nguyên tắc "mốc thời gian là keo"
Không dựng được, không được chép. Lấy cấu trúc đề (loại câu, AND/OR, gold/silver, dung sai mốc, 3 mức lời) và tự viết lại bằng chữ của mình.
