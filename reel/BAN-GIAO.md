# Bàn giao phiên — 11/11/2026 (chuyển sang máy khác)

Đọc tệp này trước khi làm tiếp. Xong một mục thì gạch/xoá dòng đó; hết việc thì xoá tệp.

## 1. Đang chạy dở: quảng cáo Memory Orb (luồng Quảng cáo, dừng ở bước 3/11)
- Thư mục: [viec-dang-chay/2026-11-11-orb-qc/](viec-dang-chay/2026-11-11-orb-qc/) — đọc `00-dieu-phoi.md` (nhật ký) rồi phiếu số lớn nhất.
- Hồ sơ: [san-pham/orb.md](san-pham/orb.md) (Memory Orb™, merryorb.store, $59.99, Mỹ ✅). Cổng M0 chặn: trang **không có mô tả**.
- Khung: không khung nào trong thư viện chuyển nguyên được (`03-sxh-khung.md`).
- **Chờ sếp 2 câu** (mỗi câu có mặc định — sếp nói "đi theo mặc định" là chạy):
  1. Nhờ nhà cung cấp quay 3–5 s quả cầu TẮT → PHÁT không cắt, ảnh hộp, và cho biết: có tiếng không, pin, đường kính cm, trong hộp có gì.
     Mặc định: không cảnh hộp, không nhắc tiếng/pin/cỡ.
  2. Gửi video mẫu cùng loại để bóc khung mới (A) hay dùng bản tự ghép "phủ vải → 3-2-1 → treo cây → tối bật phát video → mời bình luận" (B).
     Mặc định: B, để kịp bấm Muse thứ Sáu 13/11.
- Bước kế khi có trả lời: `tp.brief` (bước 4) → `bk.kich-ban-qc` → `bk.chu-tren-hinh` → `dd.ke-hoach-hinh`/`dd.viet-prompt` → sếp bấm Muse.
- **Media không theo git** (`thu-nghiem/` bị gitignore). Ở máy mới, tải lại nguyên liệu:
  `node src/cli.ts san-pham https://merryorb.store/products/orb --ra <manager-ai>/reel/thu-nghiem/san-pham/orb`
  (chạy trong `gen-video-viral`), rồi ghép lại tờ sản phẩm từ cấu hình đã lưu ở `san-pham/to-san-pham/orb.json`
  (tên tệp ảnh/khung lấy từ phiếu `02-sp-ho-so.md`; `that-*.jpg` và `trang-anh/` phải tách/tải lại theo bảng trong phiếu đó).

## 2. Video 01 Santa Spins bản 2 — chờ sếp chạy Muse
Prompt sẵn: `gen-video-viral/vi-du/v01-ban2-prompt.md` (ảnh M2, K2; clip M2, B2). Xong thì `gvv cat vi-du/v01-ban2-ke-hoach-cat.json --dung`.
Media Santa Spins cũng ở `thu-nghiem/` (không theo git); cấu hình tờ sản phẩm: `san-pham/to-san-pham/santa-spins.json`.

## 3. Đã làm trong phiên 11/11 (đã commit)
- Thi 6 vai (có gói vs không gói, chấm mù): gói thắng ở việc đo/quy trình, thua khi đầu vào sai → sửa bằng ô bắt buộc + luật "nếu → thì".
  Biên kịch viết lại theo tệp việc rồi thi lại: **23/24 vs 18/24**. Sếp chốt: các vai khác viết mới, tạm chưa thi.
- Workflow 2 tầng: [luong/](luong/) (Quảng cáo, Nuôi page) + [chuyen-vien/viec/](chuyen-vien/viec/) (tệp việc 6 vai, phiếu giao chung).
- Kiến thức từ bộ skill `coreyhaines31/marketingskills` + `obra/superpowers` (MIT) đã vào 5 gói (đọc từ máy cũ, không cài).

## 4. Sửa mã `gen-video-viral` (các agent phát hiện, CHƯA làm)
- `src/to-san-pham.ts` đã commit nhưng **chưa nối**: thêm lệnh `gvv to-san-pham`; `gvv prompt` đọc dòng `**Tờ sản phẩm:**` (`docToSanPham`) và tự thêm làm tham chiếu đầu cho ảnh có PRODUCT, cảnh báo khi thiếu.
- `gvv prompt`: bỏ câu tự chèn "No text or captions added." (phủ định) → câu khẳng định; quét phủ định chỉ trên phần mình viết; báo khi `mo_ta` nhắc sản phẩm mà thiếu khối PRODUCT; in ×1,3 và trần 10 %/video; ô `be_mat` (bề mặt hiển thị) trong JSON.
- `gvv dung`: chữ vào dải 14–65 % chiều cao (đang 0,117H/0,69H, bị UI che); thẻ kết ≥ 2,3 s, bỏ `fade` từ đen (sinh khung đen); `--chuan-am` loudnorm −14 LUFS/TP −1,5; một mạch tiếng nền liền; ghi tệp lọc + lệnh cạnh `report.json`.
- Cổng M0 (`kiem-nguyen-lieu.ts` dòng ~26): `timKichThuoc` bắt nhầm "Open media 1 in modal" thành "1 in"; đếm cả ảnh trùng md5 → khử trùng ảnh như video.
- Thêm `gvv kiem` (đo QC: ebur128, `blackdetect d=0.03`, freeze, silence, vùng an toàn → `qc.json`).
- Không có tuỳ chọn đảo ngược đoạn khi dựng (Đạo diễn cần cho "sinh từ hộp mở rồi đảo").

## 5. Chờ sếp chốt (party mode)
- Lệnh khởi chạy `/quang-cao`, `/nuoi-page`: (A) lệnh slash, (B) kịch bản Workflow, hay A+B (đội đề xuất A+B; Quảng cáo 2 lượt cắt ở nút Muse; chạy khô trước).
- Họp & kế hoạch tuần: nhịp tuần hay 2 tuần · sếp duyệt bằng chat hay bình luận trên trang · số liệu tuần trước nhập tay? · cuộc "Mở việc" cho mọi video hay chỉ khi mới.
  Mẫu giả lập (họp nội bộ, kế hoạch 1 trang + bản chi tiết 11 mục, họp sếp) có trong lịch sử chat; khuôn chi tiết **chưa** ghi vào `tp-ke-hoach-tuan.md`.
  Góp ý chưa áp: thêm số liệu sau 48 h (xem, xem >3 s, bình luận từ khoá), lộ trình mùa 4 tuần, chỉ gửi mục có thay đổi, hệ số sinh lại lấy từ sổ.
- 5 câu ở [luong/README.md](luong/README.md) (ai bấm Muse, mức báo, sếp duyệt ở đâu, page nuôi thử, nguồn video).

## 6. Tham chiếu
- Party mode BMAD: lệnh ở `17fishing Web/.claude/commands/bmad-party-mode.md`, workflow + danh sách agent ở `GaRutin BE/_bmad/` (repo BE).
- Bản phác thảo Phòng Marketing AI: https://claude.ai/artifact/Sy6dwQMtu8AtMoAkwZJQeL · Báo cáo MoneyPrinterTurbo: https://claude.ai/artifact/JidF8N7C2RCLyNufqew3Bv
- Bộ skill tải về (chỉ trên máy cũ): `C:/Users/PC/Downloads/Claude Skills-20261110T183725Z-1-001/` — đã chắt vào gói, máy mới không cần.
