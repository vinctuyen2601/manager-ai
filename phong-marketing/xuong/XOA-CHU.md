# Xoá chữ cứng trong video — video-subtitle-remover (VSR)

**Trạng thái 12/11/2026: CHẠY ĐƯỢC trên GPU (GTX 1660 Super).** Sếp duyệt cài 12/11 (thay "Maris Engine" không còn trên máy) và duyệt vá 1 dòng để chạy Python 3.11.

## Cài đặt
- Repo `github.com/YaoFANGUK/video-subtitle-remover` (Apache-2.0), v1.4.0, ở `D:/tools/video-subtitle-remover`.
- **Commit chốt: `e109b9ddc1d0e8f153199dfa05c1d767546906d8`** (30/06/2026).
- Đã đọc README, requirements, Dockerfile, workflow build, `backend/main.py` và các script trên đường CLI. Không có chỉ dẫn lạ. Mạng trong code: chỉ GUI kiểm bản mới (GitHub API + `accelerate.xdow.net`); CLI không gọi mạng. `.condarc` trỏ mirror Thanh Hoa — không dùng.
- **Model nằm sẵn trong repo GitHub**, không tải thêm: STTN-auto 66 MB, STTN-det 66 MB, LaMa 197 MB, ProPainter 191 MB, PP-OCRv5 det 89 MB (0,59 GB).
- venv `.venv` = **CPython 3.11.15 có sẵn trên máy** (uv, `C:/Users/PC/AppData/Roaming/uv/python/`). README đòi 3.12+, máy không có → dùng 3.11 kèm bản vá 1 dòng ở dưới.
- Gói: `paddlepaddle==3.0.0` bản CPU (PyPI; code luôn dò chữ trên CPU), `torch==2.7.0+cu118` + `torchvision==0.22.0+cu118` (download.pytorch.org), `requirements.txt`.
- Dung lượng: venv 7,1 GB · .git 1,0 GB · model 0,59 GB · ffmpeg đóng gói 0,25 GB → **~9,1 GB** trên ổ D.
- Trong venv có hai bản OpenCV (`opencv-python 4.11` của repo + `opencv-contrib-python 4.10` do paddlex kéo về); bản đang nạp là 4.10, chạy ổn.

## Bản vá cục bộ (trên commit gốc `e109b9d` — cập nhật repo xong phải vá lại; `git diff` để xem)
1. `backend/inpaint/sttn_auto_inpaint.py` dòng 245: trong f-string đổi `frame_info['len']` → `frame_info["len"]`. Lý do: kiểu dấu nháy này chỉ Python ≥ 3.12 hiểu; trên 3.11 báo `SyntaxError` lúc nạp và **mọi chế độ** đều hỏng. Quét cả repo bằng parser 3.11: đây là dòng lỗi duy nhất.
2. `backend/tools/ffmpeg_cli.py`: `ffmpeg_path` dùng biến `VSR_FFMPEG` hoặc `ffmpeg` trong PATH (ffmpeg 8) trước; `ffmpeg.exe` đóng gói trong repo chỉ còn là dự phòng. Bỏ `os.chmod` trên tệp ffmpeg.

## Cách gọi
```bash
cd D:/tools/video-subtitle-remover        # bắt buộc: config/config.json đọc theo thư mục hiện tại
PADDLE_PDX_DISABLE_MODEL_SOURCE_CHECK=True PYTHONIOENCODING=utf-8 \
.venv/Scripts/python backend/main.py \
  -i "<vào>.mp4" -o "<ra>.mp4" \
  -c YMIN YMAX XMIN XMAX \                # vùng chữ theo pixel; lặp -c nếu nhiều vùng; KHÔNG có -c = cả khung (dễ xoá nhầm)
  --inpaint-mode sttn-det                 # sttn-auto | sttn-det | lama | propainter | opencv
```
**Chọn thuật toán:**
- **`sttn-auto`**: không dò chữ, tô lại **cả hình chữ nhật `-c` ở mọi khung**. Dùng khi chữ nằm trong **hộp có nền** hoặc vùng không có sản phẩm đi qua. Thứ gì đi qua vùng đó cũng bị xoá, kể cả chữ in trên hàng.
- **`sttn-det`** (mặc định nên dùng cho phụ đề chạy): dò chữ bằng PP-OCRv5 (CPU) và chỉ tô ô chữ nằm **trọn trong** `-c`. Ô dò được mà cao hơn rộng (chữ dọc) thì bỏ qua → giữ được chữ in dọc thân cần. Chậm hơn do bước dò.
- `lama`: dò như `sttn-det` rồi tô từng khung — chậm, và để lại nền hộp chữ (xem thử 1).
- `propainter`: tốn VRAM nhất; 6 GB khó chạy 1080×1920 — chưa thử.

**Chuẩn bị:** đầu vào AV1 thì OpenCV giải được nhưng chậm (mất 33 s chỉ để đọc 1562 khung) → chuyển H.264 trước: `ffmpeg -i in.mp4 -c:v libx264 -crf 16 -preset fast -c:a copy in-h264.mp4`. Đo vùng: cắt dải quanh phụ đề ở 3–6 khung bằng `crop` + `drawgrid` 10 px, lấy hộp bao lớn nhất rồi nới thêm 10–20 px.

**Đầu ra:** H.264 (libx264), giữ tiếng gốc (ghép bằng ffmpeg), giữ nguyên số khung và thời lượng.

## Thử 1 — `nguon/2026-11-12-test/01-goc.mp4` (31,2 s, 1080×1920, 50 fps, AV1 → H.264)
Chữ: hộp **nền trắng đặc**, chữ đen, y 1415–1488, x 80–1000 (rộng 87 % khung) → `-c 1405 1500 70 1010`.

| Cách | Thời gian | / 1 s video | GPU (nvidia-smi 2 s/lần) | Kết quả (tự xem lưới 1 khung/giây) |
|---|---|---|---|---|
| **STTN-auto** → `01-goc-sach.mp4` | 297 s xử lý (348 s cả nạp) | **~9,5 s** | có dùng: TB 77 %, đỉnh 99 %, VRAM 4,4 GB | **Đạt.** Cả 31 khung không còn chữ, không còn hộp. Chỗ tô hơi nhoè, có vân khi vật đi qua dải (chân tượng, hộp lưới ở giây 5) — nhìn kỹ mới thấy. Ngoài dải hình không hỏng |
| LaMa | 1169 s (dò chữ CPU ~1,7 khung/s chiếm phần lớn) | ~37 s | TB 31 %, VRAM 1,8 GB | **Trượt**: chữ hết nhưng **nền trắng của hộp còn thành một thanh mờ** ở mọi khung (chỉ tô trong ô chữ OCR dò được) |
| ffmpeg `delogo=x=70:y=1405:w=940:h=95` | 16 s (CPU) | ~0,5 s | — | Hết chữ, nhưng dải 940×95 thành **vệt kéo dọc rất lộ** — không dùng được khi vùng to |

## Thử 2 — `nuoi-page/2026-11-12-thu2/v02-goc.mp4` → `v02-sach.mp4`
Video thật (Douyin, 81,5 s, 720×1280, H.264 30 fps, 2446 khung), phụ đề Trung chữ trắng viền mờ, **không có hộp nền**, chạy gần suốt video. Trên cần/máy có chữ in thật: "X SCAPE 240…", "4000", tem cảnh báo vàng.
- **Vùng đo** (soi khung 2/14/30/50/66/76/80 s, lưới 10 px): chữ y 900–940, x 65–655 → **`-c 885 955 40 680`**.
- **Lệnh:** `--inpaint-mode sttn-det` (không dùng `sttn-auto` vì chữ in trên cần đi qua dải ở giây 7–25).
- **Thời gian:** 1355 s xử lý (1393 s cả nạp) → **~16,6 s / 1 s video**. Dò chữ CPU ~2,7 khung/s chiếm ~15 phút, tô STTN ~5 khung/s.
- **GPU:** có dùng — đỉnh 98 %, TB 24 % (phần lớn thời gian là dò chữ trên CPU), VRAM đỉnh 5,8 GB/6 GB (sát trần).
- **Đầu ra:** 2446 khung, 81,53 s, giữ tiếng. Lưới 1 khung/4 s: `v02-luoi-goc.jpg`, `v02-luoi-sach.jpg` cùng thư mục.
- **Tự xem** (lưới 1 khung/4 s + dải phụ đề 1 khung/giây cả 82 giây, soi gần các giây 12/14/16,5/18/22/36/45/64):
  - **Phụ đề: hết ở cả 82 khung.** Chỗ tô trên đá, cỏ, da tay gần như không thấy vết; đầu ngón tay đi qua dải hơi méo (giây 12).
  - **Chữ in trên cần "X SCAPE 240" vẫn giữ** ở giây 21–25, kể cả khi phụ đề đè ngang (giây 22).
  - **Lỗi 1 — tem cảnh báo vàng trên cần (khoảng giây 17–19) bị xoá chữ, thành mảng nhoè trắng-vàng.** Chữ ngang nhỏ trên tem nằm trọn trong dải nên OCR coi là phụ đề. Vi phạm "giữ chữ in trên hàng" — cần sửa trước khi đăng (xem dưới).
  - **Lỗi 2 — giây 13–14:** chữ "SCA" trên cần nằm ngay dưới phụ đề "杆子瞬间加长" nên bị tô nhoè cùng. Phụ đề che sẵn chữ in nên không cứu được bằng tô lại.
  - Ngoài dải hình không hỏng.
- **Cách sửa lỗi 1 (chưa làm — cần duyệt):** (a) ghép lại khung gốc cho đoạn giây 17–19 nếu đoạn đó không có phụ đề; hoặc (b) vá thêm 1 chỗ trong `video_inpaint` để bỏ qua ô chữ cao < 25 px (phụ đề cao ~40 px, chữ trên tem ~10 px).
- **So với delogo** (cùng vùng 640×70): delogo nhanh (vài giây) nhưng để vệt kéo ngang/dọc dọc theo cả dải và xoá luôn chữ in trên cần mỗi lần cần đi qua — không dùng được cho phụ đề chạy.

## Chỗ còn yếu
- **Chậm:** 9,5–16,6 s cho 1 s video; bước dò chữ chạy trên CPU (paddle CPU) là nút thắt chính.
- `sttn-det` coi **mọi chữ ngang trong vùng** là phụ đề → tem/nhãn chữ ngang trên sản phẩm lọt vào dải sẽ bị xoá. Phải soi lại những đoạn sản phẩm đi qua dải.
- `sttn-auto` không phân biệt phụ đề với chữ in trên hàng → chỉ dùng khi vùng không có sản phẩm đi qua.
- Vùng tô càng to thì vết càng lộ; STTN để lại nhoè/vân khi vật chuyển động đi qua vùng.
- VRAM đỉnh 5,8 GB ở 720×1280 (sttn-det) — video 1080p dài hơn có thể tràn 6 GB.
- Cửa sổ không cần GUI; mỗi lần chạy in quảng cáo QFluentWidgets ra log (vô hại).

## Bản vá 3 (12/11/2026) — nới đầu/cuối mỗi đoạn phụ đề (sếp: "trừ đầu đuôi 0,1–0,2 s")
- Gốc lỗi: `backend/tools/subtitle_detect.py` `find_subtitle_frame_no` chỉ OCR mỗi `SAMPLE_STEP` = 2–4 khung rồi điền giữa hai mẫu → các khung **trước mẫu đầu / sau mẫu cuối** của mỗi câu không bị xoá → chữ Trung loé vài ms (sếp thấy khi xem v02).
- Sửa: sau bước điền, gom các khung liên tiếp thành đoạn, **nới mỗi đoạn thêm `pad = max(SAMPLE_STEP, round(VSR_PAD_S × fps))` khung ở hai đầu** (mặc định `VSR_PAD_S=0.2` → 6 khung ở 30 fps), dùng hộp chữ của khung đầu/cuối đoạn. Thêm `import os`.
- Gọi: `VSR_PAD_S=0.2` trong môi trường (0 = tắt nới). Cập nhật repo VSR thì vá lại (cùng 2 bản vá trước).

