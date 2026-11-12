# Danh mục công cụ (G5 · kiến trúc v0.2: Tools độc lập với vai, có quyền dùng)

Mức quyền theo `../quy-che/QUYEN-TU-CHU.md`. Đổi máy thì kiểm lại cột "Cần để chạy".

**Hai máy (kiểm 12/11/2026):** Linux `~/my-project/` (ffmpeg 4.4.2) · **Windows** `D:/my project/gen-video-viral` + `C:/Users/PC/OneDrive/Desktop/my project/manager-ai` — Node 23.11, **ffmpeg 8** (bản 2026-08-27, có `-/filter_complex`), Python 3.10.10, numpy 1.26.4, faster-whisper 1.2.1. Media (`thu-nghiem/`) không theo git: mỗi máy một bản.

| Công cụ | Làm gì | Vai được dùng | Mức | Cần để chạy (máy Linux 11/11) | Lỗi đã biết |
|---|---|---|---|---|---|
| `gvv boc <video>` | Bóc video: điểm cắt, độ sáng, âm, lưới 4 khung/giây | Săn xu hướng, Đạo diễn | L0 | `~/my-project/gen-video-viral`, Node ≥ 22, ffmpeg | Không đo được **đổi màu** LED (chỉ đo độ sáng cả khung). Từ 12/11 (`9af8246`): cắt ngưỡng thích nghi, phân 5 loại cắt/nháy/đèn giữ sáng/cắt nhảy/chuyển động, bảng nguồn gốc tệp (đọc nhãn AI IPTC) · vung máy rất nhanh vẫn báo cắt · `gvv cat` còn ngưỡng cũ |
| `gvv san-pham <link>` + `--kiem` | Lấy sản phẩm từ trang công khai + cổng M0 | **chỉ Chuyên viên SP** (một agent một shop một lúc — lỗi 429) | L0 | như trên | Lấy nhầm video của **sản phẩm khác** trên trang · cổng coi đường kính 0,85 mm là kích thước thật |
| `gvv tim "<từ khoá>"` (`--ngay --toi-da --dai --trung-vi`) | Tìm video viral YouTube qua **Data API v3 chính thức**: view, sub, ×sub, cờ outlier §5, view/ngày, lift trung vị, kênh lặp → `tim-<ngày>.md/.json`; **không tải video** | Săn xu hướng | L0 | `YT_API_KEY` (env hoặc `.env` repo — không in, không ghi tệp khác) · nhánh `tim-video-viral` (worktree `D:/my project/gvv-tim`), **đã gộp main 12/11 (`3039dd8`)** | Chưa chạy thật (chưa có khoá) · `videoDuration=short` của YouTube = < 4 phút · ~102 đơn vị/từ khoá, `--trung-vi` +2/kênh · không có TikTok/Facebook |
| `gvv cat`, `gvv prompt`, `gvv dung` | Đề xuất cắt, ghép prompt Muse, dựng | Đạo diễn, Thợ dựng | L2 | như trên | Danh sách sửa còn treo: `../BAN-GIAO.md` mục 4 |
| tờ sản phẩm (`src/to-san-pham.ts`) | Ghép tờ 9:16 từ khung thật | Chuyên viên SP | L2 | ffmpeg ≥ 7 cho lệnh có sẵn | Với ffmpeg 4.4.2: chạy bộ lọc `boLocTo` qua `-filter_complex_script` |
| ffmpeg / ffprobe | Đo, cắt, dựng | mọi vai làm hình | L0–L2 | ffmpeg 4.4.2 (apt) | — |
| **Muse** (muse.ai) | Sinh ảnh/clip | **sếp bấm tay** | L3 | tài khoản sếp, hạn mức tuần | — |
| API quản trị 17fishing (GET) | Số liệu, sản phẩm, Search Console theo trang | Chuyên viên SP, Săn xu hướng, Trưởng phòng | L0 | `~/.17fishing-admin-token` — **không in, không ghi vào tệp** | Bảng từ khoá chưa đồng bộ từ 22/09 |
| API quản trị 17fishing (POST/PATCH) | Tạo/sửa sản phẩm | Trưởng phòng | **L3** | như trên | — |
| Hỏi sếp trắc nghiệm (AskUserQuestion) | Quiz ≤ 4 câu | Trưởng phòng | L1 | phiên có người | — |
| Artifact claude.ai | Trang phác thảo, lớp nhìn tạm | Trưởng phòng | L2 (riêng tư) | đăng nhập claude.ai | Trang riêng tư; chia sẻ do sếp làm |
| **ffmpeg-skill 3.4.3** (`~/.claude/skills/ffmpeg-skill`, MIT) | 42 lệnh: cắt, ghép, fit 9:16, chữ, chuẩn âm, chỉnh màu/LUT, `check.py` kiểm chuẩn nền tảng, `look.py` lưới khung | Thợ dựng, Đạo diễn | L0 (đo) · L2 (dựng) | Windows: Python 3.10 + ffmpeg 8, `doctor` 0 thiếu bắt buộc (12/11). Linux: chưa cài | Chưa có vectorscope/waveform (dùng ffmpeg gốc, ghi ngoại lệ) · chưa dùng dựng bản nào, mới dùng `check.py` |
| Script dựng lô phao (`thu-nghiem/out/prd-g01/dung.py`, `qc.py`, `tach-logo.py`) | Dựng ffmpeg thẳng, đo QC, tách logo từ watermark | Thợ dựng | L2 | Windows, ngoài git | **Viết riêng cho một lô** — nên gộp vào `gvv` hoặc thay bằng ffmpeg-skill |
| `tools/boc-loi.py` (faster-whisper) | Bóc lời có giờ từng từ, **có tiếng Việt** | Săn xu hướng, Biên kịch | L0 | Python + faster-whisper | — |
| WebSearch / WebFetch / `curl` | Đọc trang công khai (YouTube đọc được) | mọi vai nghiên cứu | L0 | — | TikTok, Facebook, Creative Center, Meta Help **chặn máy** — không lách |
| `gh api` (chỉ đọc) | Đọc repo GitHub làm nghiên cứu | mọi vai nghiên cứu | L0 | `gh` đã đăng nhập | — |
| **yt-dlp** | Tải video từ link | Săn xu hướng, Đạo diễn | L1 (sếp duyệt 12/11/2026) | Windows: có sẵn (`Python310/Scripts/yt-dlp`). Linux: chưa | chỉ link sếp gửi · tải về máy (`thu-nghiem/`, không git) để bóc khung · không đăng lại · không đăng nhập, không cookie, không lách chặn |
| Claude in Chrome / trình duyệt trong app | Xem TikTok/Reels qua trình duyệt đã đăng nhập của sếp | Săn xu hướng | **chưa bật** | Bật tiện ích + sếp cho từng trang | Đề xuất 11/11, chưa duyệt |
| rea-video | Bóc cảnh, nguồn gốc, cách quay, phách | — | **không cài** (12/11) | — | Không tiếng Việt; `--vlm` gửi video ra ngoài. Đã học ý vào `gvv boc` (gộp main 12/11) |
| **video-subtitle-remover** (`D:/tools/video-subtitle-remover`, Apache-2.0, commit `e109b9d` + 2 bản vá cục bộ) | Xoá chữ cứng/phụ đề trong video (STTN-auto/STTN-det/LaMa) — cách gọi, số đo: `XOA-CHU.md` | Thợ dựng | L2 (sếp duyệt cài 12/11/2026) | Windows: venv `.venv` (Py 3.11 + torch 2.7 cu118 + paddle CPU, ~9 GB), GPU 1660S. Linux: chưa | Chậm: 9,5–16,6 s/1 s video (dò chữ trên CPU) · `sttn-det` xoá nhầm **chữ ngang trên tem/nhãn sản phẩm** lọt vào vùng → phải soi lại · `sttn-auto` xoá mọi thứ trong vùng · thay "Maris Engine" |
