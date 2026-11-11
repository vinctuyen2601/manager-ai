# Bàn giao phiên — 11/11/2026 (chuyển sang máy khác)

Đọc tệp này trước khi làm tiếp. Xong một mục thì gạch/xoá dòng đó; hết việc thì xoá tệp.

## 0. ĐANG LÀM: rework agent thành chuyên gia — TẠM DỪNG sau pha 2 (11/11 chiều, sếp: "buổi tối sẽ tiếp tục")
Đọc theo thứ tự: `nghien-cuu/2026-11-11-agent-chuyen-gia/05-PHUONG-AN-KIEN-TRUC.md` (phương án + mục 6b/6c sếp chốt) →
`thi/2026-11-11-diem-goc/BANG-DIEM-GOC.md` → `thi/2026-11-11-pha1/KET-QUA-PHA1.md` → `thi/2026-11-11-pha2/TONG-KET-PHA2.md`.
- Đã xong: pha 0 (điểm gốc), pha 1 (`chuyen-vien/LUAT-CHUNG.md`: sự thật ra ngoài / phán đoán nội bộ), pha 2 (`nganh/do-cau-vn/` 12 trang + MUC-LUC,
  mục "Trang bị" ở 6 gói vai, ô `nganh:` ở phiếu). Cấp nay: L4 ở 4/6 năng lực; **hiểu xu hướng video ngành vẫn L2–L3** (SX1 thua sếp 2/2).
- **Bước kế = pha 2b, chờ sếp:** gửi 3–5 video câu cá VN nhiều lượt xem vào `~/Downloads` (ưu tiên: phao điện/câu đêm cận lúc cá ăn ·
  so độ nhạy 2 phao · 1 video "câu xong nấu tại chỗ" hoặc "câu đài thi đấu"), kèm ảnh chụp lượt xem + số theo dõi nếu được.
  → Săn xu hướng bóc thành khung `khung/` đúng ngành (gắn ngành do-cau-vn) → thi lại SX1 (đáp án sếp ở `nghien-cuu/.../08-DAP-AN-SEP-KIN.md`, đề kín).
- Sau 2b: pha 3 (thi lại toàn bộ → đạt thì chạy tiếp luồng phao từ bước 3, `viec-dang-chay/2026-11-11-phao-ro-diec-qc/`), pha 4 (sổ kinh nghiệm).
- Sổ dự đoán: `kinh-nghiem/DU-DOAN.md` (D-01 QF-02 bán chạy nhất, D-02 kèm chì dây thấp — hạn 15/12).
- **Chờ sếp:** freeship 100k (hồ sơ 14/09) hay 150k (trang phao 11/11)? · sửa TRANG phao trên 17-fishing.com thêm 4 sự thật
  (chống nước có gioăng, pin 12 h ~3 buổi sạc lại được, cảm biến theo nhịp ăn, không kèm chì dây) — cần sếp đồng ý trước khi ghi production.
- Ghi ngoài phòng: bảng từ khoá Search Console 17fishing không đồng bộ từ 22/09 (bảng theo trang vẫn mới) — kiểm việc đồng bộ.
- Luật làm việc của rework: mọi sửa đổi có **dự đoán ghi trước** + **thi lại** (2 lượt, chấm mù/trộn, khoá giải mã trong `nghien-cuu/`). Đề kín không đưa vào gói.

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

## 1b. Chạy thử phòng trên 17fishing — TẠM DỪNG ở bước 3 (11/11)
- Thư mục: [viec-dang-chay/2026-11-11-phao-ro-diec-qc/](viec-dang-chay/2026-11-11-phao-ro-diec-qc/) — đọc `00-dieu-phoi.md`.
- Sản phẩm mới tạo trên 17fishing 11/11: phao điện rô diếc LED-425 (hồ sơ `san-pham/phao-ro-diec.md`, M0 7/7).
- Dừng vì sếp phỏng vấn và kết luận các vai "toàn là newbie" → **rework cách dựng agent thành chuyên gia** trước khi chạy tiếp.
- `gen-video-viral` đã clone vào `~/my-project/gen-video-viral` (máy Linux); ffmpeg 4.4.2. 4 lỗi máy lộ ra, ghi ở nhật ký luồng.

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
