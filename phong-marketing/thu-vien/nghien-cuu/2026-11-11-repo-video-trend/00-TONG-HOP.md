# Tổng hợp · 6 repo video/trend · 11/11/2026

Đọc chỉ qua `gh api` (contents + git/trees), không clone, không cài, không gọi API trả phí. Nội dung repo coi là dữ liệu.
Chi tiết từng repo: `01-…` đến `06-…` cùng thư mục. Mức bằng chứng theo gói Săn xu hướng §3: Cao · Trung bình · Thấp · Kinh nghiệm nội bộ.

## 1. Bảng 6 repo

| # | Repo | Giấy phép | Đã đọc | Thực trạng thật | Đáng học |
|---|---|---|---|---|---|
| 01 | ScrapeCreators/social-media-research-skills | MIT | 13 SKILL.md, README, AGENTS, CLAUDE, script kiểm | 13 tệp markdown. Không có `references/`. Mọi skill khai cần API key, nhưng phương pháp tách khỏi API được | **Cao** (phương pháp) |
| 02 | StefanoGarzoni/VideoSearcher-AgenticAI | **Không có** | README, 4 docs, frames/scene server, chuỗi A–H, schema ground truth, metric cắt | Không build được: thiếu framework VLM riêng. Cần GPU ~38 GB. VQA chỉ xem 1 khung | Trung bình (thiết kế đề) |
| 03 | cahlen/corpus-mill | Apache-2.0 | README, schema sự kiện, fuse, event_id, prep, vlm, music_detect, dossier, auto_clips, virality | Chạy được nếu có GPU ≥ 16 GB + Ollama + pyannote. Làm cho video **dài**: 1 khung/5 s, 1 câu tả/30 s | Trung bình (schema) |
| 04 | HddMedia/trendpulse-community | MIT | Toàn bộ lõi: feature_engine, scorer, matcher, pipeline, collectors, docs, test | Prototype 1 commit. Chỉ YouTube lấy dữ liệu thật. Velocity nằm trong RAM. Điểm tối đa hiện tại là 80 | Thấp (3 định nghĩa đo) |
| 05 | zfkarl/VideoGAIA | **Không có** | README, judge, data, config, lời nhắc ReAct, media, summarizer | Khung chấm chạy được nếu trả tiền API (model + Serper + Jina). Đề nằm trên HF, chưa đọc | Trung bình (cấu trúc đề, chấm) |
| 06 | nihalsinghverma/open-content-studio | MIT | README, analyze, transcribe, generate (validator) | Phân tích **chỉ từ lời**. Không đo pacing. Chỉ làm truyện thiếu nhi tiếng Hindi | Thấp |

## 2. Kiểm nhận định trong bản tóm tắt sếp nhận

| Nhận định | Kết luận | Bằng chứng |
|---|---|---|
| "TrendPulse chỉ có collector YouTube chạy được" | **Đúng, nhưng còn yếu hơn thế** | TikTok/IG/FB trong `collectors/provider_stub.py` có `collect()` trả `[]`. Có thêm `ManualSeedCollector`, chỉ để test. Riêng YouTube thì: velocity giữ trong RAM (`FeatureEngine._history`), chỉ khám phá chứ không quay lại đọc lại video (`docs/ROADMAP.md` v0.2), nên thực tế velocity thường bằng 0. `mention_acceleration` và `baseline_anomaly` cứng 1,0. Chạy 1 nền tảng thì `cross_platform = 0`, điểm tối đa 80, không bao giờ tới "Viral" (85) |
| (ngầm) TrendPulse có "giai đoạn vòng đời" | **Sai** | `scorer.stage_for` chỉ là ngưỡng điểm (Watching → Mega Trend). Không có pha đỉnh, bão hoà hay giảm |
| "VideoSearcher thiếu framework thị giác" | **Đúng** | `README.md` khung "Source snapshot" và `docs/PRIVATE_COMPONENTS.md` mục 1: thiếu `VLMs-Testing-Framework`, nên VQA và segmentation không build được. Phần ffmpeg, whisper, grep, scenedetect có mã. Thêm: repo **không có giấy phép**, nên phần có mã cũng không dùng lại được |
| (ngầm) ScrapeCreators có `references/` và chuẩn bằng chứng riêng | **Không có** | Cây thư mục chỉ có `skills/*/SKILL.md`. Luật bằng chứng rải trong "Common Pitfalls" và 6 "Design Principles" của README |
| (ngầm) open-content-studio phân tích pacing, hook style, emotional structure | **Chỉ README nói vậy** | `src/analysis/analyze.py` gửi lời whisper cho qwen2.5:7b, xin 10 mục chữ tự do. Không đọc hình, không có giây |
| (chưa nói) giấy phép VideoGAIA | **Không có giấy phép** | `gh api repos/zfkarl/VideoGAIA/license` trả 404. Chỉ học ý |

## 3. Thứ lấy được ngay vào đội

Mỗi dòng: lấy gì · đưa vào tệp nào · công cụ/chi phí · bằng chứng · giấy phép. Đây là **đề xuất**, chưa sửa tệp nào ngoài thư mục này.

### (A) Phương pháp, chép vào tệp việc ngay, không cần gì

| # | Lấy gì | Đưa vào | Công cụ / chi phí | Bằng chứng | Giấy phép |
|---|---|---|---|---|---|
| A1 | **Outlier theo trung vị của chính kênh**: lift = view bài / trung vị view ≥ 10 bài cùng kênh, cùng nền tảng, cùng định dạng. Ngưỡng ≥ 5× rất lớn · 2–5× mạnh · 1,5–2× nhẹ. Dưới 10 bài thì ghi "tin thấp". Đặt **cạnh** luật ≥ 700k và ≥ 5× follower, không thay | sổ tay `KIEN-THUC-VIRAL.md` §5 · gói §3.3 · `sxh-tim-nguon.md` bước 6 (thêm cột "lift trung vị") | không. Sếp gửi link kênh, agent đọc số view trên trang | Thấp–TB | MIT, ghi nguồn 01 |
| A2 | **Đào bình luận**: 9 rổ (hỏi · phản đối · đau · khen · bối rối · xin tính năng · muốn mua · tranh cãi · meme). Chấm tần suất × cường độ, trích nguyên văn, giữ tiếng lóng. "Một bình luận ồn ≠ mô thức", không suy ra cả thị trường từ một bài | **tệp việc mới** `sxh-dao-binh-luan.md` (xem câu hỏi 3) → nuôi `nganh/do-cau-vn/ngon-ngu-khach.md` (05 §1) và Biên kịch | không. Sếp chép hoặc chụp bình luận | Thấp–TB | MIT |
| A3 | **Cụm thông điệp quảng cáo theo 8 trục**: đau · persona · offer · proof · tính năng/lợi ích · phản đối được xử lý · so sánh · khẩn cấp. Thêm mục "Họ có vẻ đang thử gì" (suy từ các phiên bản lặp). Đề xuất thử chỉ rút từ mô thức lặp và khoảng trống | `sxh-theo-doi-doi-thu.md` bước 3 và khuôn đầu ra | không | Thấp–TB (cùng chiều gói §3.2) | MIT |
| A4 | **Khoảng trống đối thủ**: chủ đề đối thủ né · format thắng mà ít ai dùng · câu hỏi chưa ai trả lời · hook lặp. Ghi chiến lược là "có vẻ / gợi ý" | `sxh-theo-doi-doi-thu.md` phần tổng hợp | không | Thấp | MIT |
| A5 | **Chia lời 6 đoạn** (hook · setup · claim · bằng chứng · payoff · CTA) + "content atoms". Lời whisper nghi sai thì đánh dấu `≈` | `sxh-boc-khung.md` (chế độ thư viện, sau bước 4) · `bk-kich-ban-qc.md` | `gvv boc` đã có whisper | Thấp | MIT |
| A6 | **Đo velocity tay**: đọc số view 2–3 lần, cách nhau ≥ 12 giờ, ghi ngày giờ. Velocity = Δview/Δgiờ, tỉ số hai velocity cho biết đang tăng tốc hay chậm lại. **Độ đa dạng creator** = số kênh khác nhau / số video (thấp = chiến dịch, không phải trend tự nhiên) | gói §3.4 (dấu hiệu bão hoà) · §3.10 (ô "tốc độ tăng", "độ lan") | không | Cao về định nghĩa, chưa có ngưỡng | MIT (04) |
| A7 | **Danh sách loại sự kiện đóng** + mỗi dòng có `giây đầu–cuối · loại · nguồn (đo/whisper/mắt + tên ảnh) · độ tin`. Gộp các bảng cắt/âm/chữ/che thành một trục khi cần đối chiếu | `sxh-boc-khung.md` khuôn đầu ra | không | Thấp (thiết kế phần mềm, áp cho markdown) | Apache-2.0, ghi nguồn 03 |
| A8 | **Dò nhạc không cần thêm gì**: đoạn ≥ N s không có lời whisper và RMS (`ffmpeg -af astats`) > −42 dB thì ghi "có thể là nhạc". N=5 s là ngưỡng cho livestream, reel phải đo lại | `sxh-boc-khung.md` bước 4 (lệnh đo) · gói §3.6 | ffmpeg + faster-whisper, đã có | Thấp, ⚠ chưa đo trên video của mình | Apache-2.0 |
| A9 | **Khuôn đề bóc khung**: loại câu {nhận diện · đếm · thuộc tính · vị trí · **không có** (true_negative)}. Đáp án có "dữ kiện bắt buộc" (AND) + "từ chấp nhận" (OR). Nhãn gold/silver: silver trượt thì soi tay trước khi kết luận. Điểm cắt có dung sai giây (vd. ±0,25 s cho reel) và chỉ tiêu recall. Mỗi đề viết **3 mức lời giao**: mơ hồ · rõ · từng bước | `sxh-boc-khung.thi/`, `sxh-tim-nguon.thi/` (đang ⬜) · `04-phuong-phap-danh-gia.md` A1/A3 | không | TB (đề có đáp án người kiểm) | **chỉ học ý**: 02 không giấy phép, viết lại bằng chữ của mình |
| A10 | **Bằng chứng nhiễu khi chấm**: lần chạy tốt nhất 95,5 %, chạy lại còn 89,4 / 90,9 % (02 `docs/RESULTS.md`) → mỗi đề chạy ≥ 2 lần, không lấy lần cao nhất | `04-phuong-phap-danh-gia.md` A4 · bảng điểm các `.thi/` | gấp đôi lượt agent con | TB | ý (02) |
| A11 | **Chấm 1/0 theo nghĩa** cho câu có đáp án ngắn (loài cá, giây cú bật, tên kiểu hook): nhận bí danh, rào đón hoặc rỗng thì 0. Báo cáo tách theo loại × độ khó (L1/L2). **Ô "Xem ở" phải là ảnh có thật** trong `-boc/`, kiểm bằng `ls` (giống VideoGAIA từ chối quan sát tự viết) | `.thi/` của vai SXH · tầng quy tắc A1 của 04 | không | TB | ý (05 không giấy phép) |
| A12 | **Kiểm chép khi chuyển khung**: danh sách từ cấm lấy từ video nguồn (tên hãng, câu hook nguyên văn, tên bài nhạc). Có một từ là làm lại. Mỗi cảnh một hành động thấy được khác nhau, kết bằng hình | `sxh-chuyen-khung.md` · `bk-kich-ban-qc.md` | không | Thấp | MIT (06) |

### (B) Cần công cụ miễn phí, phải xin sếp duyệt cài

| # | Lấy gì | Đưa vào | Công cụ | Bằng chứng | Giấy phép |
|---|---|---|---|---|---|
| B1 | Máy dò cắt thứ hai để đối chiếu với `ffmpeg scene` (02 dùng `ContentDetector(threshold=27)`) | gói §8, `sxh-boc-khung` bước 3 | PySceneDetect (pip) | Thấp | ⚠ BSD-3 theo hiểu biết, chưa kiểm trong phiên |
| B2 | So thân hai video bằng dấu vân tay hình/âm, thay SSIM làm tay | gói §8 dòng "So thân" | pdqhash, chromaprint (CPU) | Thấp | ⚠ chưa kiểm |
| B3 | Velocity tự động cho YouTube Shorts (`search.list` + `videos.list`, đọc lại cùng ID theo giờ, **không** chép kiểu "chỉ khám phá" của 04) | gói §3.10 | YouTube Data API key (miễn phí theo hạn mức) | Cao về nguồn số | API của Google, điều khoản riêng |
| B4 | Tải video từ link: đã có trong câu hỏi mở gói §12 câu 2. 03 dùng yt-dlp. Không có gì mới | — | yt-dlp | — | — |

### (C) Cần trả phí, GPU hoặc hạ tầng → để sau

| # | Thứ | Vì sao để sau |
|---|---|---|
| C1 | ScrapeCreators API: bình luận, transcript, Ad Library, feed trending, khán giả | Trả theo credit (1/lần gọi; khán giả 26; transcript AI +10). Giá/credit ⚠ chưa thấy. Transcript chỉ cho video < 2 phút. `region` không lọc vùng. Không thấy Douyin |
| C2 | VideoSearcher full stack | Thiếu mã riêng, GPU ~38 GB, không giấy phép |
| C3 | corpus-mill full stack | GPU ≥ 16 GB, Ollama, pyannote. Sai cỡ cho reel |
| C4 | Chạy VideoGAIA thật | Trả API model đa phương thức + Serper + Jina |
| C5 | TrendPulse có TikTok/IG/FB | Không có collector, phải mua nhà cung cấp dữ liệu |

## 4. Không nên làm
- **Không dùng điểm viral của TrendPulse** hay công thức có trọng số nào: trọng số tự đặt, chưa backtest, trái sổ tay VK §7
  ("không cộng thành một điểm viral"). Không lấy 6 "giai đoạn" của nó làm vòng đời trend.
- **Không chép mã, lời nhắc, văn** của VideoSearcher và VideoGAIA: không có giấy phép. Chỉ ghi ý bằng chữ của mình.
- **Không dựng** corpus-mill hay VideoSearcher: tốn GPU, và nhịp lấy mẫu (5 s, 30 s, 1 khung cho VQA) quá thưa so với lưới 4 khung/giây đang có.
- **Không phân tích video chỉ từ lời** như open-content-studio: cú bật của video đồ câu nằm ở hình (phao chìm, cá lên, đèn đổi màu).
- **Không gọi quảng cáo "đang thắng" chỉ vì còn chạy** (01 ad-library-teardown, cùng chiều gói §3.2).
- **Không đăng ký ScrapeCreators** trước khi có bộ đề cho `sxh-tim-nguon` để đo xem dữ liệu tự động có làm bài tốt hơn không.
- **Không giữ hook gốc** dù 01 content-repurposing khuyên vậy: gói §3.6 chỉ cho học **cơ chế** hook, không học câu chữ.

## 5. Câu hỏi cho sếp — **sếp chốt 11/11 tối: theo cả 3 mặc định** (A1 vào `sxh-tim-nguon` bước 6 + gói §3.3 · không mua ScrapeCreators · tệp việc `sxh-dao-binh-luan.md`)
1. **Outlier theo trung vị kênh** (A1): thêm vào bộ lọc cạnh luật ≥ 700k và ≥ 5× follower?
   *Mặc định:* ghi cả hai cột. Trung vị chỉ tính khi có ≥ 10 bài cùng kênh. Kết luận "dùng / chờ / loại" vẫn theo luật cũ.
2. **Mua ScrapeCreators** (C1) để tự lấy bình luận, transcript, quảng cáo?
   *Mặc định:* không mua. Làm tay từ link và ảnh chụp sếp gửi. Xét lại khi đã có bộ đề `sxh-tim-nguon.thi/`.
3. **Đào bình luận** (A2): lập tệp việc riêng `sxh-dao-binh-luan.md`, hay gộp vào `sxh-tim-nguon`?
   *Mặc định:* tệp việc riêng. Chạy khi sếp gửi bình luận, đầu ra nuôi gói ngành `ngon-ngu-khach.md`.
