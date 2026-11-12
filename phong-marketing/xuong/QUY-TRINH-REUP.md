# Quy trình reup đã chạy thử (12/11/2026) — công cụ + lệnh

Chạy thử 2 lô trên máy Windows: `thu-nghiem/nuoi-page/2026-11-12-thu/` (máy câu AS, 17,6 s, poster chữ Trung) và
`2026-11-12-thu2/` (cần câu rút, 81,5 s, giọng Trung + phụ đề chạy suốt). Luật lời: `../nhan-su/viec/bk-loi-ban-dia.md` luật 0.
Quy trình gốc của sếp: `C:/Users/PC/Downloads/cau-lenh-reup-video-auto.md`.

## Công cụ
| Công cụ | Ở đâu | Dùng cho |
|---|---|---|
| `gvv boc` (gen-video-viral) | `D:/my project/gen-video-viral` · `node src/cli.ts boc <video>` | Điểm cắt, nguồn gốc tệp, lời gốc (faster-whisper, có giây), nháp khung |
| ffmpeg 8 / ffprobe | PATH | Đo, cắt poster, khung dọc nền mờ, lưới khung, ghép, chuẩn âm |
| yt-dlp | PATH (Python 3.10) | Tải link sếp gửi (khi nguồn là link) |
| video-subtitle-remover (VSR) | `D:/tools/video-subtitle-remover` (commit e109b9d, venv 3.11, 2 bản vá) | Xoá phụ đề/chữ chạy — `XOA-CHU.md` |
| CapCut (phiên **Claude desktop mới mỗi lô**, mức 3 `cong-cu/capcut-auto.py`) | app CapCut 9.7.0.4153 | Chỉ tạo giọng "Cô Gái Hoạt Ngôn" + chọn nhạc thư viện, **không xuất gì** — đọc trước `BAI-HOC-AGENT-CAPCUT.md`, `CAPCUT-TIET-KIEM-TOKEN.md`, `CAPCUT-GIONG.md` |
| `tools/capcut-draft.py` · `tools/ghep-lo.py` (gen-video-viral) | `D:/my project/gen-video-viral/tools/` | Lấy giọng + nhạc từ dự án CapCut · ghép cả lô + QC |
| ffmpeg-skill 3.4.3 | `~/.claude/skills/ffmpeg-skill` | `check.py --platform reels` (QC), `color.py --retag bt709`, `look.py` (lưới xem) |
| faster-whisper | `tools/boc-loi.py` | Lời gốc; kiểm nhạc không lời (0 đoạn) |
| Agent vai | phiên VS Code | Biên kịch (lời), agent cài/chạy VSR; Trưởng phòng điều phối, ghép, QC |

## Các bước
| # | Bước | Ai | Lệnh / cách | Ra |
|---|---|---|---|---|
| 1 | Nhận tệp, chép sang đường dẫn không dấu | TP | `cp "<tệp sếp>" <lô>/vNN-goc.mp4` + `NGUON.txt` | `vNN-goc.mp4` |
| 2 | Bóc | TP | `node src/cli.ts boc vNN-goc.mp4` · lưới `ffmpeg -vf "fps=…,scale=150:-1,tile=9x2"` | `vNN-goc-boc/` (cắt, nguồn gốc, lời gốc) · `luoi.jpg` |
| 3 | Đọc chữ gốc | TP / BK | xem poster/phụ đề trên lưới; lời gốc từ whisper; hashtag tên tệp | bảng "Chữ gốc → Việt" |
| 4a | Làm sạch — chữ chỉ ở poster đầu/cuối | TP | cắt `-ss/-to` bỏ poster, **lùi vào 0,2 s mỗi đầu đoạn cắt** (sếp chốt 12/11: chữ loé vài ms ở ranh giới); ô video nhỏ giữa nền trang trí → `crop` + khung dọc nền mờ (`scale…increase,crop,boxblur` + `overlay`) | `vNN-doc.mp4` 1080×1920 |
| 4b | Làm sạch — phụ đề chạy suốt | agent VSR | `.venv/Scripts/python backend/main.py -i IN -o OUT -c YMIN YMAX XMIN XMAX --inpaint-mode sttn-det` với `VSR_PAD_S=0.2` (**nới mỗi đoạn phụ đề 0,2 s đầu + cuối** — bản vá 3; giữ chữ in trên hàng; ~16 s/1 s video) | `vNN-sach.mp4` |
| 5 | Lời Việt | Biên kịch | luật 0: **chỉ trích chữ gốc** → văn phong Việt; ý cấm thì **thay câu chung chung** (giá mềm, xưởng lớn uy tín, nhắn shop); đoạn 15–20 s ≤ 470 ký tự, ~4 tiếng/s | `LOI.md` · `loi-capcut.txt` (`giây|lời`) |
| 6 | Giọng | phiên Claude desktop **mới cho mỗi lô**, chạy **`xuong/cong-cu/capcut-auto.py`** (mức 3, tự bấm + tự kiểm) (mẫu câu giao việc: `CAPCUT-TIET-KIEM-TOKEN.md`; kiểm bằng `cong-cu/kiem-draft.py`) | SendMessage giao việc → CapCut: nhập video (tắt tiếng) → clip chữ đúng giây → TTS "Cô Gái Hoạt Ngôn" 1,0x → **không xuất**: chờ tự lưu, rồi `python -I tools/capcut-draft.py <dự án> <lô> --lo <lô>` lấy giọng + nhạc từ dự án | `<lô>_voice.mp3` |
| 7 | Nhạc | phiên Claude desktop | thư viện CapCut, ô tìm kiếm, mỗi video 1 bài, không lời — lấy ra cùng lệnh `capcut-draft.py` ở bước 6 | `<lô>_music.mp3` + `.json` |
| 8 | Kiểm nhạc không lời | TP | `python -I tools/boc-loi.py <music>.mp3` → 0 đoạn | — |
| 9 | Ghép **cả lô** | TP | `python -I tools/ghep-lo.py <thư mục lô> [--chi <id>] [--video <id>=<tệp sạch>] --check` — bỏ tiếng gốc; giọng đã đúng mốc (từ `capcut-draft.py`); nhạc −12 dB + mờ 1,5 s cuối; `amix` → `loudnorm I=-14:TP=-1.5` → 48 kHz; 1080×1920 BT.709 (`setparams`) | `<id>-final-nhac.mp4` |
| 10 | QC | TP | `--check` của `ghep-lo.py`: 1080×1920, BT.709, có tiếng 48 kHz, −14 ± 1,5 LUFS, TP ≤ −1,5 (dung sai 0,1), độ dài khớp video ±0,1 s, không lặng giọng > 2 s **trong** một đoạn lời → bảng ĐẠT/SAI, mã thoát 1 nếu SAI. Kiểm chéo: `check.py --platform reels` | — |
| 11 | Gửi sếp | TP | bản xem 540×960 nếu > 30 MB | — |

## Luật đã chốt trong lúc chạy (12/11)
- **Trừ đầu đuôi 0,1–0,2 s** ở mọi ranh giới cắt và mọi đoạn phụ đề, để không còn khung chữ Trung loé vài ms (sếp).
- Reup chỉ trích xuất chữ gốc → văn phong Việt, không tự nghĩ (sếp).
- Ý bị cấm thay câu chung chung, không để trống; "giá mềm" được nói; "hàng xuất khẩu Âu Mỹ" được nói dạng kể lại (sếp).
- CapCut **không xuất gì** (12/11, thay luật "chỉ xuất MP3"): lấy giọng + nhạc từ dự án bằng `tools/capcut-draft.py`; CapCut chạy bằng `cong-cu/capcut-auto.py` (mức 3). Không bấm "Chia sẻ".
- Không hỏi sếp về quyền nhạc (quyết định 11/11).

**Thứ tự chạy (12/11):** xoá chữ (VSR, GPU) và CapCut **không chạy cùng lúc** — card 6 GB không đủ cho cả hai (CapCut lỗi vẽ/đứng hình). Kết quả kiểm khung: trước bản vá 3 còn 3 khung phụ đề (14,23 · 14,27 · 20,73 s), sau bản vá 0.

## Chỗ yếu còn lại
Xoá chữ chậm (~16 s/1 s video, dò chữ trên CPU) · VSR xoá nhầm chữ nhỏ trên tem sản phẩm · whisper nghe nhầm tiếng Trung (sửa bằng phụ đề trên hình).
