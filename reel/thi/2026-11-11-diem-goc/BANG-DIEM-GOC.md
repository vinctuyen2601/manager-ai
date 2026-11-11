# Bảng điểm gốc — Chuyên viên SP và Săn xu hướng (11/11/2026, trước mọi sửa đổi)

Nguồn: `KET-QUA-SP.md`, `KET-QUA-SXH.md` (chấm thang R1/R2/N6), `KET-QUA-CHAM-MU.md` + khoá `../../nghien-cuu/.../09-KHOA-CHAM-MU.json`
(chấm mù A/B, ghép vào ô e của R2: agent hơn 2 · hoà 1 · sếp hơn 0). Mỗi vai thi 2 lượt độc lập, lấy trung bình.

## Cấp năng lực

| Năng lực | Lượt 1 | Lượt 2 | TB | Cấp | Ghi chú |
|---|---|---|---|---|---|
| N1 Hiểu sản phẩm (SP) | 80,0 % | 83,3 % | 81,7 % | **L4** | Mạnh nhất. Bám thông số, gọi tên mã, chỉ ra ảnh trang sai |
| N2 Hiểu khách, tư vấn (SP) | 70,0 % | 75,0 % | 72,5 % | **L3** | SP3 tốt (chọn QF-02, khớp sếp); SP4 sót báo nhầm, bảo hành, giá; không tách nhóm khách |
| N3 Hiểu xu hướng ngành (SXH) | 70,0 % | 73,3 % | 71,7 % | **L3 ⚠** | ⚠ Thang chấm có vẻ rộng tay: chấm mù thua sếp ở SX1 cả 2 lượt, SX2 1 lượt. Thực tế nghiêng L2 |
| N4 Phân tích video (SXH) | 65,0 % | 70,0 % | 67,5 % | **L3** | Số đo đúng (khớp `do.json`), nhưng hướng sai do luật Giáng sinh trong gói |
| N5 Phán đoán thiếu dữ liệu (SP) | 43,3 % | 53,3 % | 48,3 % | **L2** | Ô "chọn phía" và "mức tự tin" gần như 0 ở 6/6 lượt-câu: "không biết, không đoán" |
| N5 Phán đoán thiếu dữ liệu (SXH) | 63,3 % | 80,0 % | 71,7 % | **L3** | Lệch lớn giữa 2 lượt (SX5 lệch 4 điểm) → **không ổn định** |
| N6 Dùng kho tri thức (cả hai) | thang ~97 % | — | — | **L2 theo độ phủ** | Thang chấm gần tối đa nhưng chỉ 2–5/8 câu chạm kho 17fishing; 0 lượt mở `GIONG-TRANG-SAN-PHAM.md`; SXH bỏ sót dòng giờ đông có sẵn ở `17fishing/QUAN-LY.md` |

Chấm mù tổng: agent hơn 19 · hoà 7 · sếp hơn 6 (32 cặp). Agent hơn ở tư vấn theo sản phẩm và phân tích video; sếp hơn ở
hiểu biết ngành (dạng video có thật trong ngành, mùa vụ) và sự thật chỉ người bán biết (pin 3 buổi).

## Giới hạn của phép đo (đọc trước khi tin số)
- Claude chấm Claude. Chấm mù không mù hẳn (văn phong "Dạ anh, em…" vs nhắn Zalo).
- Đáp án sếp rất ngắn ("bình thường", "ai cũng hợp") và có AI hỗ trợ soạn → bài dài dễ thắng về độ đủ.
- 2 lượt mỗi vai, 8 câu → mẫu nhỏ, chỉ là hướng. Chênh dưới ~10 điểm % giữa các lần thi sau đừng coi là tiến bộ thật.

## Nguyên nhân (giám khảo phân loại, Trưởng phòng đã kiểm dòng trích)

| # | Nguyên nhân | Loại | Bằng chứng | Năng lực bị ảnh hưởng | Sửa ở pha |
|---|---|---|---|---|---|
| 1 | Luật "không bịa" cho lời quảng cáo bị áp sang cả **phán đoán nội bộ gửi sếp** | luật gói đẩy sai | gói SP dòng 48, 49, 145; hồ sơ mục 6. SP5 lượt 2: "Nếu em đưa ra một con số… thì đó là bịa, và nó sẽ lọt vào lời quảng cáo" | N5 | **1** — tách sự thật (ra ngoài) / phán đoán (nội bộ, có %) |
| 2 | Khuôn phán đoán không đòi "điều gì làm đổi ý", không đòi ngưỡng + hạn cho phép kiểm | luật gói thiếu | gói SXH §2 ý 3 chỉ đòi "nghiêng ~70 %" → ô b = 1 ở 6/6 lượt | N5 | **1** — ô Phán đoán 4 cột |
| 3 | Bài học từ 3 video Giáng sinh viết thành luật chung | luật gói đẩy sai | gói SXH §3.9 dòng 246 "Cả 3 khung đều trả lời ở 7,8–7,9 s" → khuyên GIẤU cú đổi đỏ khỏi 1,5 s đầu, ngược sếp | N4 | **2** — chuyển sang gói ngành `giang-sinh-my`, gói nghề chỉ giữ cách đo |
| 4 | Gói vai không trỏ tới kho shop; `reel/CLAUDE.md` dòng 3 vẫn ghi "không phải công cụ của 17fishing" | đầu vào kém | độ phủ kho 2–5/8; 0 lượt mở giọng viết | N6, N2, N3 | **2** — mục "Trang bị" + `MUC-LUC.md` ngành |
| 5 | Hồ sơ phao thiếu 4 sự thật (chống nước, pin, cảm biến, không kèm chì dây) và mục 6 cấm "Độ nhạy cao" | đầu vào kém | cả 2 lượt loại đúng điểm mạnh số 1 sếp nêu | N1, N2 | **ngay sau điểm gốc** — áp 4 sự thật sếp đã xác nhận |
| 6 | 0 video đồ câu trong thư viện; gói không có dòng nào về ngành đồ câu VN | thiếu kiến thức | cả 2 lượt bỏ dạng "so độ nhạy hai phao" | N3 | **2b** — sếp gửi 3–5 video |

## Dự đoán (để bị số liệu phản bác — kiểm ở lần thi lại sau pha 1 và pha 2)
- Sau pha 1: **N5 (SP) từ L2 lên ≥ L3** (≥ 60 %), N5 (SXH) hai lượt lệch nhau < 10 điểm %.
- Sau pha 2: **N6 độ phủ kho ≥ 6/8 câu** mỗi lượt; N3 thắng hoặc hoà sếp ở SX1, SX2 trong chấm mù.
- Nếu pha 1 xong mà N5 (SP) không lên → nguyên nhân 1 sai, xem lại.
