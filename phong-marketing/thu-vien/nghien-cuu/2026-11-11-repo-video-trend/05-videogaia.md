# 05 · zfkarl/VideoGAIA · 11/11/2026

URL: https://github.com/zfkarl/VideoGAIA · **KHÔNG có giấy phép** (`gh api repos/zfkarl/VideoGAIA/license` → 404; API `license: null`)
→ **chỉ học ý, không chép mã/lời nhắc.** 95 sao · push cuối 18/8/2026 · bài báo arXiv 2608.14718.
Dữ liệu đề (271 câu) nằm trên Hugging Face `Karl28/VideoGAIA`, **không nằm trong repo** → chưa đọc đề thật.

## Đã đọc
`README.md` · `videogaia/judge.py` · `videogaia/data.py` · `videogaia/agent_loop/config.py` · `videogaia/agent_loop/agent.py`
(lời nhắc ReAct dòng 1–140 + grep) · `videogaia/agent_loop/media.py` (grep) · `videogaia/agent_loop/summarizer.py` (đầu tệp) ·
`run_eval.py` (grep) · `tests/test_data.py`.

## Cách dựng bộ đề
- Mỗi đề một dòng JSONL: `sample_id · question_en · answer · video.local_path (+ duration_sec) · category · difficulty`.
- **Độ khó 2 mức: L1 / L2**. **Category** theo lĩnh vực kiến thức (trong test thấy "Culture", "History"). Báo cáo tách độ chính xác
  theo tổng · theo category · theo độ khó (`evaluator.py` dòng ~462–480). Định nghĩa L1/L2 nằm trong bài báo, **chưa đọc** ⚠.
- Bước kiểm đề trước khi tốn lượt gọi (`--validate-input-only`): trùng ID, thiếu câu hỏi/đáp án/tệp video, đếm category và độ khó.
- Loại câu: "video deep-research" — đáp án là một **thực thể/nơi/sự kiện/hướng/mã/số/ngày** cụ thể, thường phải nhìn video rồi tra web
  (vd. đọc biển hiệu trong video → tìm tên chính thức).

## Cách chấm
- Giám khảo LLM trả **đúng một ký tự 1/0**, nhiệt độ 0 (`judge.py`, `JUDGE_PROMPT`). Luật chấm: tương đương **ngữ nghĩa**, nhận bí danh,
  viết tắt, bản dịch; giải thích thêm được nếu không mâu thuẫn; số phải đúng giá trị (trừ làm tròn/đổi đơn vị);
  **trả lời rỗng, chỉ rào đón, lạc đề hay mâu thuẫn → 0**.
- Giám khảo chính + giám khảo dự phòng (chỉ dùng khi giám khảo chính lỗi sau N lần thử). Câu trả lời rỗng → 0 ngay, không gọi giám khảo.
- Ghi kết quả từng đề ngay sau khi chấm; chạy lại cùng thư mục thì bỏ qua đề đã xong.

## Cách agent xem video (học ý)
- **Thô → mịn**: tin nhắn đầu gửi kèm **20 khung lấy đều cả video** (`config.max_frames = 20`, cạnh dài ≤ 1280 px); agent chỉ gọi
  `VideoAnalysisAction(start_time, end_time, max_frames)` khi khung thô không đủ, để lấy mẫu dày một đoạn.
  → Đúng cách `sxh-boc-khung` đang làm (lưới cả video → khung dày ±0,5 s quanh chỗ nghi). Repo này là bằng chứng ngoài cho cách đó.
- `VideoAnalysisAction` **chỉ có hình, cấm hỏi âm thanh** (luật 3 trong lời nhắc). Video quảng cáo của mình phụ thuộc âm → bộ đề kiểu
  VideoGAIA **thiếu hẳn trục âm**, mình phải tự thêm.
- **Chống bịa quan sát**: bộ phân tích câu trả lời **từ chối** mọi thẻ `<observation>` do model tự viết; quan sát chỉ do runner chèn
  sau khi công cụ thật chạy (`agent.py` dòng ~414). → Áp vào máy: ô "Xem ở" phải trỏ **ảnh có thật trong thư mục `-boc/`**; tầng quy tắc
  (04 A1) kiểm được bằng `ls`.
- Hết lượt mà chưa chắc → được phép trả `unknown` (ví dụ 5 trong lời nhắc) — nhưng giám khảo chấm 0. Khác luật của mình
  (05 §2: phán đoán cấm bỏ trống, phải "nghiêng về X ~N %").

## Mức đáng học: **trung bình** — cấu trúc đề (category × L1/L2, đáp án ngắn có bí danh, chấm 1/0), luật chống bịa quan sát
Không chạy được nếu không trả tiền: cần endpoint model đa phương thức + Serper (tìm web) + Jina (đọc trang).
