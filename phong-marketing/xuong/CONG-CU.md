# Danh mục công cụ (G5 · kiến trúc v0.2: Tools độc lập với vai, có quyền dùng)

Mức quyền theo `../quy-che/QUYEN-TU-CHU.md`. Đổi máy thì kiểm lại cột "Cần để chạy".

| Công cụ | Làm gì | Vai được dùng | Mức | Cần để chạy (máy Linux 11/11) | Lỗi đã biết |
|---|---|---|---|---|---|
| `gvv boc <video>` | Bóc video: điểm cắt, độ sáng, âm, lưới 4 khung/giây | Săn xu hướng, Đạo diễn | L0 | `~/my-project/gen-video-viral`, Node ≥ 22, ffmpeg | Không đo được **đổi màu** LED (chỉ đo độ sáng cả khung) |
| `gvv san-pham <link>` + `--kiem` | Lấy sản phẩm từ trang công khai + cổng M0 | **chỉ Chuyên viên SP** (một agent một shop một lúc — lỗi 429) | L0 | như trên | Lấy nhầm video của **sản phẩm khác** trên trang · cổng coi đường kính 0,85 mm là kích thước thật |
| `gvv cat`, `gvv prompt`, `gvv dung` | Đề xuất cắt, ghép prompt Muse, dựng | Đạo diễn, Thợ dựng | L2 | như trên | Danh sách sửa còn treo: `../BAN-GIAO.md` mục 4 |
| tờ sản phẩm (`src/to-san-pham.ts`) | Ghép tờ 9:16 từ khung thật | Chuyên viên SP | L2 | ffmpeg ≥ 7 cho lệnh có sẵn | Với ffmpeg 4.4.2: chạy bộ lọc `boLocTo` qua `-filter_complex_script` |
| ffmpeg / ffprobe | Đo, cắt, dựng | mọi vai làm hình | L0–L2 | ffmpeg 4.4.2 (apt) | — |
| **Muse** (muse.ai) | Sinh ảnh/clip | **sếp bấm tay** | L3 | tài khoản sếp, hạn mức tuần | — |
| API quản trị 17fishing (GET) | Số liệu, sản phẩm, Search Console theo trang | Chuyên viên SP, Săn xu hướng, Trưởng phòng | L0 | `~/.17fishing-admin-token` — **không in, không ghi vào tệp** | Bảng từ khoá chưa đồng bộ từ 22/09 |
| API quản trị 17fishing (POST/PATCH) | Tạo/sửa sản phẩm | Trưởng phòng | **L3** | như trên | — |
| Hỏi sếp trắc nghiệm (AskUserQuestion) | Quiz ≤ 4 câu | Trưởng phòng | L1 | phiên có người | — |
| Artifact claude.ai | Trang phác thảo, lớp nhìn tạm | Trưởng phòng | L2 (riêng tư) | đăng nhập claude.ai | Trang riêng tư; chia sẻ do sếp làm |
