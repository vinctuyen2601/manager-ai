# Kết quả chấm — Săn xu hướng, điểm gốc 11/11/2026

Giám khảo: agent chấm (không mở `09-KHOA-CHAM-MU.json`). Đã đọc: `HUONG-DAN-CHAM.md`, `DE-THI.md`, `SXH-lan1.md`, `SXH-lan2.md`,
`08-DAP-AN-SEP-KIN.md` (SX1–SX8), gói vai `phong-marketing/nhan-su/vai/san-xu-huong.md` (toàn bộ), và mở lại các tệp agent khai ở "Đã đọc" để kiểm trích dẫn
(xem mục 1). Ô e của R2 để trống (lấy từ chấm mù A/B). Không tính cấp.

---

## 1. Kiểm trích dẫn và số đo (trước khi chấm)

**Trích dẫn kiểm được là đúng** (cả hai lượt):
- `phong-marketing/khach-hang/17fishing/san-pham/phao-ro-diec.md` dòng 27–28: "câu rô diếc ban đêm ở hồ dịch vụ", "mắt mỏi về khuya vẫn thấy" ✅
- `17fishing/CLAUDE.md` §2 (đo 14/09/2026): "ĐƠN HÀNG, TOÀN BỘ LỊCH SỬ 2" ✅ (lan2 "2 đơn"; lan1 "1–2 đơn" cũng không sai)
- `17fishing/QUAN-LY.md` dòng 42 "5 tháng tuổi", dòng 100 "đồ tiêu hao (lưỡi, cước, phao) 55k–150k", dòng 211–214 & 837–838 ngày 28/08: 247 lượt, 12–16h, 79 % điện thoại ✅
- `chung/_idx-17fishing.json`: có `chinh-phao-can-ban-chinh-4-cau-2`, `tin-hieu-phao-khi-cau-dai-va-khi-cau-lut-truyen-thong`, `mua-dong-nen-dung-phao-cau-dai-nao-…` ✅
- `phong-marketing/BAN-GIAO.md` §4: "chữ vào dải 14–65 % chiều cao" ✅ · `chung/NHAT-KY-QUYET-DINH.md` QĐ-14: Black Friday 27/11/2026 ✅
- `phong-marketing/thu-vien/so-tay/KIEN-THUC-VIRAL.md`: 1,7 s dừng (dòng 201), outlier ≥ 700.000 & ≥ 5× (413), 5b phát hiện 2 (430), ~367× (432) ✅
- `01-tp-nhan-viec.md`: hỏi cảnh phao trên nước ban đêm (dòng 34, 57), "Không đưa giá vào video" (54) ✅
- `luong/nuoi-page.md` dòng 23–24: bộ lọc nguồn (cú bật ~3 s, không người nổi tiếng/thương hiệu, chữ che được, ghi nguồn) ✅

**Trích dẫn sai / bỏ sót:**
- **lan1 SX5** nói: *"Trong `manager-ai/`, em chưa thấy chỗ nào đo lượng xem theo giờ… (em đã dò chữ "khung giờ", "theo giờ", "cuối tuần"…: không có số đo nào)"*.
  **Sai.** `17fishing/QUAN-LY.md` dòng 205: `giờ đông  12–16h (364) > 16–20h (307) > 08–12h (255)` (30 ngày 12/08→10/09). Dò bằng từ quá hẹp nên lọt.
- **lan2 SX5** tìm ra ngày 28/08 (dồn 12–16h) và lập luận đúng là một sự kiện làm lệch số; nhưng nói *"em chỉ thấy **một** dấu vết theo giờ"* — cũng bỏ sót dòng 205.
  Lập luận "đừng lấy một sự kiện làm quy luật" vẫn đứng được (247/1.294 lượt của tháng rơi vào 12–16h ngày đó), nên không trừ nặng.

**SX7 — đối chiếu lưới `luoi-01..03.jpg` và `do.json`:**

| Số agent nêu | Thực đo | Kết luận |
|---|---|---|
| 15,32 s · 720×1280 · 30 fps | `do.json`: dai 15,324 · 720×1280 · 30 | ✅ cả hai |
| Một điểm cắt 0,10 s | `diem_cat: [{t: 0.1}]` | ✅ cả hai |
| Đỏ lần 1–4: lan1 5,10–6,00 · 7,67–8,63 · 10,23 · 13,80; lan2 ~5,1–6,0 · 7,7–8,6 · 10,2–11,2 · 13,8–14,8 | Mốc đã đo 5,10 · 7,67 · 10,23 · 13,80. Lưới: đỏ thấy ở ô 5,00–5,75; 7,75–8,50; 10,25–11,00; 13,75–14,50 | ✅ cả hai khớp |
| 0–~1,5/2,2 s tay đứng yên, nền văn phòng, có thùng rác, LED gần như không thấy | Lưới 01 ô 0,00–1,75: đúng, thùng rác thấy rõ góc trên | ✅ |
| Phao trượt xuống lòng bàn tay (lan1 ~2,2–2,9; lan2 1,5–3,0) | Lưới 01: bắt đầu ~1,5, xong ~2,75 | ✅ (lan2 sát hơn) |
| Ánh đỏ hắt lên ngón cái từ 2,25 s (lan1) | Ô 2,25 và 2,50 có ánh đỏ ở ngón cái | ✅ |
| Chữ vàng "PHAO RÔ DIẾC ĐÈN LED SIÊU NHẠY" suốt video, ở 83–87 % chiều cao (lan2) | Dải chữ nằm ~84 % chiều cao ở mọi ô | ✅ |
| Sau 6,5 s gần như đứng im (lan2) | Lưới 02–03: tay gần như không đổi vị trí | ✅ |
| lan1: đỏ lần 1, 2 "gần phách"; lần 3, 4 "lệch phách" (nhịp 0,45 s từ 1,05 s) | Tự tính: lệch phách 0,00 · 0,13 · 0,18 · 0,15 s → lần 2 và lần 3–4 lệch xấp xỉ nhau | ⚠ phân biệt "gần/lệch" quá mảnh so với độ phân giải đo; không trừ (agent đã gắn ⚠ ~80 % cho phần tiếng) |

**Sự thật sản phẩm:** không lượt nào nói ngược sự thật đã xác nhận (chống nước, pin 12 h/~3 buổi, cảm biến theo nhịp ăn, không kèm chì-dây).
lan2 SX3 nêu "đuôi 0,85 mm" — đúng. Không có ô d nào bị 0 vì sai sự thật.

**Bịa số thị trường / tên kênh:** không có, cả hai lượt. Cả hai đều nói thẳng là không nêu tên kênh / link vì chưa kiểm.

---

## 2. Bảng điểm thô

### 2a. Câu thường — R2 (ô a–d, 0–2; ô e trống)

| Câu | Lượt | a ngôn ngữ | b thị trường/ngách | c khách | d bám SP | e | Tổng a–d /8 |
|---|---|---|---|---|---|---|---|
| SX1 | lan1 | 2 | 2 | 1 | 1 | — | 6 |
| SX1 | lan2 | 2 | 2 | 1 | 1 | — | 6 |
| SX2 | lan1 | 2 | 2 | 1 | 1 | — | 6 |
| SX2 | lan2 | 2 | 2 | 1 | 1 | — | 6 |
| SX3 | lan1 | 1 | 1 | 1 | 2 | — | 5 |
| SX3 | lan2 | 1 | 1 | 1 | 2 | — | 5 |
| SX7 | lan1 | 1 | 1 | 1 | 2 | — | 5 |
| SX7 | lan2 | 1 | 1 | 1 | 2 | — | 5 |
| SX8 | lan1 | 2 | 2 | 2 | 1 | — | 7 |
| SX8 | lan2 | 2 | 2 | 2 | 1 | — | 7 |
| **Cộng** | lan1 | | | | | | **29/40** |
| **Cộng** | lan2 | | | | | | **29/40** |

### 2b. Câu ⓘ — R1 (5 ô, 0–2)

| Câu | Lượt | a phía | b tự tin | c lý do | d cách kiểm | e tách | Tổng /10 |
|---|---|---|---|---|---|---|---|
| SX4 | lan1 | 2 | 1 | 2 | 1 | 2 | 8 |
| SX4 | lan2 | 2 | 1 | 2 | 1 | 2 | 8 |
| SX5 | lan1 | 1 | 1 | 1 | 1 | 1 | 5 |
| SX5 | lan2 | 1 | 1 | 2 | 2 | 2 | 8 |
| SX6 | lan1 | 1 | 1 | 1 | 1 | 2 | 6 |
| SX6 | lan2 | 2 | 1 | 2 | 1 | 2 | 8 |
| **Cộng** | lan1 | | | | | | **19/30** |
| **Cộng** | lan2 | | | | | | **24/30** |

### 2c. N6 — dùng kho (0–2) và có tới kho shop 17fishing không

| Câu | lan1 | Kho shop (lan1) | lan2 | Kho shop (lan2) |
|---|---|---|---|---|
| SX1 | 2 | không | 2 | **có** — `chung/_idx-17fishing.json` (blog phao) |
| SX2 | 2 | **có** — `17fishing/QUAN-LY.md`, `17fishing/CLAUDE.md` | 2 | **có** — `_idx-17fishing.json`, `17fishing/CLAUDE.md` |
| SX3 | 2 | không (chỉ hồ sơ SP trong `phong-marketing/`) | 2 | không |
| SX4 | 2 | không | 2 | không |
| SX5 | 1 | **có** — nhưng dò hụt (xem mục 1) | 2 | **có** — `QUAN-LY.md` (28/08), `17fishing/CLAUDE.md` |
| SX6 | 2 | **có** — `QUAN-LY.md`, `~/my-project/CLAUDE.md` | 2 | **có** — `QUAN-LY.md`, `17fishing/CLAUDE.md`, `NHAT-KY-QUYET-DINH.md` QĐ-14, `_idx-17fishing.json` |
| SX7 | 2 | không | 2 | không |
| SX8 | 2 | không | 2 | **có** — `17fishing/CLAUDE.md` §1 |
| **Cộng** | **15/16** | 3/8 câu | **16/16** | 5/8 câu |

Không lượt nào mở **giọng viết** của shop, nội dung bài blog (chỉ đọc tên URL trong chỉ mục), hay số Search Console thật. lan2 *đề xuất* `gsc-trang` (đúng bẫy 8 % trong CLAUDE gốc §6) nhưng không tra.

### 2d. Độ lệch lan1 ↔ lan2 (tổng thang của câu + N6)

| Câu | lan1 | lan2 | Chênh | Cờ ≥ 2 |
|---|---|---|---|---|
| SX1 | 6 + 2 | 6 + 2 | 0 | |
| SX2 | 6 + 2 | 6 + 2 | 0 | |
| SX3 | 5 + 2 | 5 + 2 | 0 | |
| SX4 | 8 + 2 | 8 + 2 | 0 | |
| SX5 | 5 + 1 | 8 + 2 | **4** | 🚩 |
| SX6 | 6 + 2 | 8 + 2 | **2** | 🚩 |
| SX7 | 5 + 2 | 5 + 2 | 0 | |
| SX8 | 7 + 2 | 7 + 2 | 0 | |

Hai câu lệch đều là câu ⓘ thiếu dữ liệu. Câu có dữ liệu (SX7) hay có khuôn trong gói (SX8) ổn định giữa hai lượt.

---

## 3. Lý do từng ô

### SX1 — có bao nhiêu xu hướng
- **lan1** · a=2: "hồ dịch vụ", "buộc thẻo, cân chì, ủ mồi", "nháy phao". · b=2: năm họ video gắn nhãn "⚠ hiểu biết chung, chưa đo cái nào"; trùng 4/8 dạng sếp nêu (cá cắn-giật, phao cận, mẹo, mở hộp/thử, hài). Thiếu "so độ nhạy hai phao", "câu và nấu tại chỗ", "thi đấu đếm cá". · c=1: chỉ nói "đúng ngách nhất của mình", không tách nhóm khách. · d=1: "phao điện câu đêm", "thử độ nhạy như video anh quay" — đúng nhưng chung.
- **lan2** · a=2: "đóng cá", "chọn tải chì", "chỉnh phao". · b=2: bảng 5 nhóm có cột "riêng về phao", trỏ blog shop có >10 bài phao (`_idx-17fishing.json`). · c=1: không có chân dung khách. · d=1: "Đuôi phao điện sáng… đổi màu khi cá ăn. Gần nhất với món của shop" — đúng, chung.
- Cả hai đúng ý chính của sếp "không có con số cố định".

### SX2 — 3 kiểu đang được xem nhiều
- **lan1** · a=2: "đọt cần cong", "dắt cá", "mép vợt", "cân phao 5–7 vạch". · b=2: ba kiểu, nói rõ "em không chỉ được video có thật nào… Nêu tên kênh lúc này là bịa". · c=1: một chân dung ("câu rô diếc ban đêm ở hồ dịch vụ"). · d=1: kiểu 2 mô tả phao điện chung chung.
- **lan2** · a=2: "đóng cá", "chỉnh phao 4 câu 2", "đọc tín hiệu phao". · b=2: ba kiểu kèm ~70 %, kiểu 3 trỏ đúng bài blog shop làm nguyên liệu. · c=1: một chân dung (17fishing/CLAUDE §1). · d=1: "sát nhất với phao LED-425" — chưa nói đặc tính nào.
- Cả hai bỏ kiểu (3) của sếp: **review/thử hai phao cạnh nhau, xem phao nào báo sớm hơn** — kiểu sát nhất với món đang bán.

### SX3 — 1,5 s đầu
- **lan1** · a=1: "câu rô diếc đêm", "phao nhấp" — ít thuật ngữ. · b=1: lập luận toàn bằng sổ tay chung (50 ms, 5b), tự nhận "chưa thử trên video đồ câu nào". · c=1: một nhóm ("câu rô diếc đêm"). · d=2: đuôi LED trên nền tối, đuôi đổi màu, "đỏ = cá cắn" — đặc tính đúng, khác biệt.
- **lan2** · a=1 · b=1 (như lan1) · c=1 · d=2: thêm "đuôi 0,85 mm", đề xuất dùng đoạn 2,75–3 s của video thật, cảnh báo "không nói 'cá cắn' ở cảnh cầm tay".
- ⚠ **Lệch ý chính với sếp, cả hai lượt:** sếp: *"Đúng một thứ: phao sáng đổi màu trong tối… đúng khoảnh khắc cá đớp"* trong 1–2 s đầu. Agent làm ngược: lan1 *"Chưa cho thấy cú đỏ ngay… giữ tới khoảng 7–8 s"*; lan2 *"đừng lộ trong 1,5 s đầu. Cả 3 khung mẫu đều trả lời ở 7,8–7,9 s"*. Không trừ vào ô nào của R2 (không phải sai sự thật SP), nhưng đây là nguyên nhân chính ở N4 (mục 4).

### SX4 ⓘ — đêm hay ngày
- **lan1** · a=2: *"em nghiêng về câu đêm ~70 %"*. · b=1: có số, có "mặt trái" (ngày hợp kiểu giật cá lớn, đêm nhòe) nhưng không nói kết quả nào sẽ làm đổi sang ngày. · c=2: *"đuôi LED gần như không thấy khi phao còn ở trước nền sáng (0–2,5 s, lưới 01)"*, hồ sơ mục 1, sổ tay 0c. · d=1: cùng hook, hai thân ngày/đêm, so thời gian xem — cụ thể nhưng không ngưỡng, không hạn. · e=2: sự thật có nguồn, phán đoán gắn ~70 %.
- **lan2** · a=2: *"em nghiêng ~70 % về đêm"*. · b=1: "Hai rủi ro làm em không nói chắc hơn" — giới hạn, chưa phải điều kiện đổi ý. · c=2: trỏ `03-sxh-khung.md`, trang SP. · d=1: "so tỉ lệ xem 3 s và độ giữ từ giây 4… lấy trung bình tài khoản làm mốc" — có thước, thiếu hạn. · e=2.
- Cả hai nghiêng đúng phía sếp và nêu đúng rủi ro quay đêm nhiễu.

### SX5 ⓘ — khung giờ đăng
- **lan1** · a=1: *"mức nghiêng chỉ ~50 %: buổi tối 19–22 giờ"* — 50 % là không chọn. · b=1: số có, không điều kiện đổi ý. · c=1: suy luận "đi làm ban ngày, cuối tuần ra hồ", không nguồn. · d=1: Insights sau ~10 video, tracking theo giờ, đăng xoay 2–3 tuần — thiếu ngưỡng. · e=1: khẳng định sai là kho không có số theo giờ (mục 1) — trình bày như sự thật đã dò.
- **lan2** · a=1: "chiều tối trước khi ra hồ và lúc ngồi chờ cá", *"Em nghiêng ~55 %, gần như đoán"*. · b=1. · c=2: trỏ `QUAN-LY.md` 28/08 (247 lượt, 12–16h, 79 % điện thoại) và giải thích vì sao không dùng được. · d=2: *"rải bài ở 3 khung (trưa · 18–20h · 21–23h)… ghi view sau 48 giờ và so với trung vị… Đừng đổi cùng lúc cả giờ lẫn kiểu video"* — rẻ, có hạn, có mốc. · e=2.
- Sếp: 6h · 11h · 18h. Phép thử của lan2 phủ 2/3 mốc của sếp.

### SX6 ⓘ — tháng mua nhiều
- **lan1** · a=1: mở bằng *"Em **không biết**"*, rồi nghiêng ~50 % "tháng 4–9". · b=1. · c=1: tuổi site và đơn qua Zalo có nguồn, nhưng giả thuyết "trời nóng câu đêm nhiều" không nguồn. · d=1: sổ Zalo, Google Trends 5 năm — không ngưỡng, không hạn. · e=2.
- **lan2** · a=2: *"em nghiêng ~60 % là phao **ít mùa vụ hơn** đồ bền"* — rõ, và trùng sếp ("tháng nào cũng giống nhau"). · b=1. · c=2: `QUAN-LY.md` (đồ tiêu hao 55k–150k), bài blog "mùa đông nên dùng phao câu đài nào". · d=1: `gsc-trang` theo tháng, mốc 01/12 của QĐ-14, sổ Zalo — có hạn nhưng không ngưỡng; mốc BF đo lượt xem, không đo mùa. · e=2.

### SX7 — video sếp quay
- **lan1** · a=1: ít từ dân câu; dùng từ nghề video. · b=1: nhận xét người xem "không hiểu đỏ = cá cắn" — có ý ngách, mỏng. · c=1: "Chữ không gọi tên ai", không tách nhóm người xem. · d=2: bốn mốc đỏ, cảnh liền, ánh hắt — đúng số đo (mục 1).
- **lan2** · a=1 · b=1 · c=1: thêm "lạ với người chưa thấy phao điện", "thấy cỡ thật" — vẫn một lớp. · d=2: như lan1, thêm chuyển động, vùng an toàn chữ 14–65 %, 3 khung lượt quay khác.
- Khớp nguyên tắc sếp ("giữ ở tính năng; mất ở chỗ tính năng không nổi bật"): cả hai chỉ đúng cú đỏ 5,1 s là chỗ giữ, và "không ai hiểu vì sao đuôi đỏ" là chỗ mất — đây là phần ô e (thêm ý) cần chấm mù xét.

### SX8 — lấy video kiểu gì để làm lại
- **lan1** · a=2: "câu đài, rô diếc, hồ dịch vụ, câu lure, câu biển". · b=2: 5 điều kiện + giả thuyết Douyin 台钓 ~65 %, ghi rõ "chưa xem video Douyin nào". · c=2: *"Video câu biển hay câu lure kéo về người khác"* — tách nhóm và nói ai mua. · d=1: nối về phao điện câu đêm, chung.
- **lan2** · a=2: "đóng cá", "câu đài rô phi, diếc". · b=2: 3 nhóm xếp ưu tiên ⚠ + bộ lọc + "biến đổi thật". · c=2: *"Video 'săn cá khủng'… kéo view nhưng kéo sai người"*, *"page có người theo dõi đúng tệp thì video quảng cáo phao cũng trúng người"*. · d=1.
- Cả hai thiếu 2/6 dạng của sếp: **review thiết bị** và **mở hộp/bộ sưu tập**; lan1 cũng thiếu "mẹo" ở danh sách nên lấy (có ở SX1).

---

## 4. Phân tích nguyên nhân năng lực yếu

Tỉ lệ thô (không quy cấp): N3 = SX1+SX2+SX8 R2 a–d: lan1 19/24 · lan2 19/24. N4 = SX3+SX7: 10/16 · 10/16.
N5 = SX4–6 R1: 19/30 · 24/30. N6: 15/16 · 16/16.

### N3 — Hiểu xu hướng ngành (ô c, d kéo xuống; thiếu dạng sếp coi là chính)

1. **Đầu vào kém** — chính. Cả hai lượt mở đầu: *"Thư viện khung của em đang có **0 video đồ câu**: cả 3 khung đều là đồ trang trí Giáng sinh ở Mỹ"*. Không web, không link. Agent xử lý đúng (không bịa), nhưng không có gì để đếm.
2. **Thiếu kiến thức** — gói vai không có một dòng nào về ngách đồ câu VN. Mùa vụ chỉ có Q4 Mỹ và Tết (gói dòng 138–147), và dòng 147 ghi *"Máy reel hiện chạy tiếng Anh, thị trường Mỹ"*. `grep 17fishing` trong gói: 0 kết quả. Hệ quả: dạng sếp xem là sát nhất với món đang bán — **"so độ nhạy hai phao"** (SX1, SX2 (3)) — không lượt nào nêu.
3. **Luật trong gói đẩy sai hướng (nhẹ)** — gói định nghĩa vai là *"tìm video mẫu đáng học và bóc nó thành khung"* (dòng 3–4); chỉ số làm tốt (dòng 30–38) toàn về khung. Không có mục "khách là ai / ai mua". Ô c chỉ đạt 2 ở SX8 — đúng câu duy nhất có tệp luồng (`nuoi-page.md`) bắt nghĩ về người theo dõi page.

### N4 — Phân tích video (đo rất tốt, nhưng diễn giải theo luật Giáng sinh)

1. **Kỹ năng đo: không yếu.** Mọi số ở SX7 khớp `do.json` và lưới (mục 1). Đây là phần mạnh nhất của cả bài.
2. **Luật trong gói đẩy sai hướng** — chính. Gói §3.9 dòng 246: *"Cả 3 khung đều trả lời câu hỏi ở **7,8–7,9 s**"* (n = 3, cùng ngành Giáng sinh) bị dùng như luật cho video phao:
   lan1 SX3 *"giữ tới khoảng 7–8 s, đúng mốc trả lời của cả 3 khung đã bóc"*; lan2 SX3 *"đừng lộ trong 1,5 s đầu. Cả 3 khung mẫu đều trả lời ở 7,8–7,9 s"*; lan2 SX7 *"đặt sao cho lần đỏ đầu rơi vào khoảng giây 7–8"*.
   Sếp nói ngược: cú đổi màu **chính là** hook ("đèn đổi màu vừa là điểm hấp dẫn vừa là điểm bán"). Gói không gắn nhãn "chỉ đúng với ngành/kiểu khung này" cho mốc 7,8 s.
3. **Thiếu kiến thức ngách** — ô a, b, c của SX3/SX7 đều 1: phân tích nói bằng từ nghề video (hook, thân, 0b, 0c), gần như không có từ của người câu hay câu hỏi "người xem này có cần mua phao không" (ý thứ hai trong đáp án SX7 của sếp).

### N5 — Phán đoán khi thiếu dữ liệu (ô b và d luôn 1; lan1 hay bỏ phiếu trắng)

1. **Luật trong gói đẩy sai hướng** — gói §2 ý 3 (dòng 49–50): *"ghi '⚠ chưa chắc, nghiêng về X ~70 %' và nói còn thiếu gì để chắc"*. Agent làm đúng khuôn này — cả hai SX4 ra đúng "~70 %" — nhưng khuôn không đòi **điều gì làm đổi ý**, nên ô b 6/6 lần chỉ đạt 1. Bảng sổ lỗi dòng 429 cũng chỉ đòi "nghiêng về X ~N %".
2. **Thiếu kỹ năng** — phép thử không có ngưỡng: gói dòng 38 *"Chưa đặt mốc vì chưa có số"* và §3.5 *"Lấy trung bình của chính tài khoản làm mốc"* — không chỗ nào dạy đặt ngưỡng "hơn X % thì kết luận" và hạn. Ô d chỉ đạt 2 một lần (lan2 SX5, nhờ dùng "trung vị + 48 giờ" ở gói §11).
3. **Luật đẩy về phía từ chối (lan1)** — CLAUDE gốc §7 *"Không bao giờ bịa số"* và gói *"Không được bịa một câu trả lời chắc chắn"* được lan1 đọc thành phiếu trắng: SX6 *"Em **không biết**"*, SX5/SX6 nghiêng "~50 %". lan2 cùng luật mà vẫn chọn phía (SX6 ~60 % "ít mùa vụ") → luật không bắt buộc từ chối, nhưng không dạy cách chọn. Đây là nguồn chính của độ lệch 🚩 ở SX5, SX6.
4. **Thiếu kỹ năng tìm** (lan1 SX5) — dò bằng cụm "khung giờ", "theo giờ" nên lọt dòng `giờ đông 12–16h` trong `QUAN-LY.md`, rồi khẳng định "không có số đo nào". Gói không có chỉ dẫn nào về số liệu có sẵn trong kho shop (xem N6).

### N6 — Dùng kho (điểm cao, độ sâu mỏng)

Không yếu theo thang (15/16, 16/16), nhưng:
1. **Luật trong gói thiếu chỉ đường** — gói không trỏ tới kho 17fishing/GaRutin (0 dòng), dù `phong-marketing/CLAUDE.md` 11/11 đã cho phép đọc "hồ sơ shop, giọng viết, blog, Search Console". Agent tự tìm tới: lan1 3/8 câu, lan2 5/8 câu — phụ thuộc may rủi của từng lượt.
2. **Đầu vào kém** — chỉ mục blog `_idx-17fishing.json` chỉ có URL/tiêu đề; không lượt nào mở được số đọc, số GSC theo trang, hay giọng viết, nên kho shop chỉ dùng làm "có bài về chủ đề X", chưa thành bằng chứng nhu cầu.

---

## 5. Ghi chú cho người tổng hợp
- R2 hai lượt bằng nhau 29/40 — thang 0–2 thô, khác biệt thật nằm ở độ sâu SX7 và nguồn SX1/SX2, phần đó để ô e (chấm mù) bắt.
- Đề nghị sửa gói trước lần thi sau (không sửa trong lần chấm này): gắn nhãn phạm vi cho mốc 7,8 s (§3.9); thêm "điều gì làm em đổi ý" và "ngưỡng + hạn" vào khuôn ⚠ (§2 ý 3, sổ lỗi); thêm trỏ tới kho 17fishing (QUAN-LY khách/giờ, blog, gsc-trang).
