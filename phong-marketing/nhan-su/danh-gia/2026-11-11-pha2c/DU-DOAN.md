# Pha 2c — nghiên cứu công khai video câu cá VN (thay cho pha 2b) · dự đoán ghi TRƯỚC

Ngày: 11/11/2026 (máy Windows). Sếp chốt: "kiến thức về video xu hướng được chia sẻ rầm rộ" → cho Săn xu hướng tự nghiên cứu
nguồn công khai trước, chưa chờ 3–5 video của sếp (R3 vẫn mở; sếp cũng sẽ tìm tài liệu bổ sung).

## Làm gì
1. Agent nghiên cứu (không mở `nhan-su/danh-gia/`, `nhan-su/_kin/`, `thu-vien/nghien-cuu/`) tìm nguồn công khai về video câu cá
   đang được xem ở VN → trang mới `thu-vien/nganh/do-cau-vn/video-nganh.md`, mỗi dòng có nguồn (URL + ngày đọc). Trang chặn máy → bỏ, không lách.
2. Trưởng phòng mở kiểm ngẫu nhiên nguồn.
3. Thi lại SX1, SX2 (đề pha 2, 2 lượt) → chấm mù A/B với đáp án sếp, khoá giải mã ở `../../_kin/`.

## Dự đoán
| # | Dự đoán | % | Ngưỡng đạt |
|---|---|---|---|
| P2c-1 | SX1: từ thua·thua lên **ít nhất 1 lượt hoà hoặc thắng** | ~55 % | ≥ 1/2 lượt không thua |
| P2c-2 | SX2: giữ **không thua** cả 2 lượt (pha 2: thắng·hoà) | ~75 % | 0/2 lượt thua |
| P2c-3 | Trang mới có **≥ 6 dạng video** có ≥ 2 nguồn độc lập mỗi dạng | ~60 % | đếm trong trang |

**Thêm trong lúc nghiên cứu chạy:** sếp gửi `video_trends_knowledge_base_v0.1.md` (giáo trình chung, tầng A) → bản gốc ở
`thu-vien/so-tay/video-trends-kb-v0.1.md`, phần gói còn thiếu nạp vào `nhan-su/vai/san-xu-huong.md` mục 3.10 (tách dạng/chủ đề/trend,
≥ 3 nguồn mới gọi trend, quy mô + giai đoạn, chấm sàng 8 ô). Hai thay đổi vào cùng lúc nên **không tách được phần nào nâng điểm**.
Dự đoán riêng cho 3.10: giúp SX1 **cách trả lời** (tách "bao nhiêu" theo loại, ít khẳng định trend từ 1 video) nhưng **không** thêm
dạng video VN nào → một mình nó không lật được thua·thua (~80 %).

Đổi ý nếu: nguồn công khai VN hầu hết bị chặn hoặc chỉ là bài chung chung tiếng Anh → P2c-1 rớt về ~30 %, khi đó R3 (video của sếp) là đường duy nhất.

## Kết quả (11/11/2026 tối) — chấm mù `KET-QUA-PHA2C.md`, khoá `../../_kin/12-KHOA-CHAM-PHA2C.json`
Kiểm nguồn trước khi thi: mở lại 4/4 video trích trong `video-nganh.md` (jGbUc9o28TA 629 N · smpCh8ZsPHo 2,58 Tr · OqMFqJWWrSo 1,28 Tr · tK0BaR0aMpA kênh "vườn cây ao cá") → khớp.

| # | Pha 2 | Pha 2c | Dự đoán |
|---|---|---|---|
| P2c-1 SX1 | thua · thua | **thắng · thắng** | ✅ đạt (vượt ngưỡng ≥ 1 lượt không thua) |
| P2c-2 SX2 | thắng · hoà | **thắng · thắng** | ✅ đạt |
| P2c-3 trang | — | 12 dạng, 11 dạng ≥ 3 kênh độc lập | ✅ đạt |
| 3.10 một mình không lật SX1 (~80 %) | — | không tách được (vào cùng lúc) | ⬜ không kiểm được |

**Vì sao thắng (giám khảo):** đếm có tầng (dạng / có phao / phao điện), ví dụ thật có kênh–view–độ dài, tách sự thật với phán đoán,
nối sang cách quay LED-425. **Vẫn thiếu so với đáp án sếp ở SX1:** câu và nấu tại chỗ, kéo cá lớn, câu đài thi đấu, hài/fail không
được gọi tên trong bài SX1 (dù trang `video-nganh.md` có dạng 10, 11) → agent chọn lọc theo việc phao, bỏ bức tranh rộng.

**Giới hạn — đọc trước khi tin con số:**
- Đáp án sếp SX1–SX2 là bản AI hỗ trợ, ngắn, **cố ý không nêu tên kênh**. Giám khảo thưởng "có ví dụ thật" → một phần chiến thắng là do
  dạng bài (dài, có số), không hẳn hiểu ngành sâu hơn sếp. Đúng hơn: **agent nay ngang tầm đáp án về độ phủ và hơn về bằng chứng**.
- Mọi số từ YouTube; TikTok/Reels (nơi chạy QC) bị chặn → chuyển sang hai nền tảng đó là giả định ~65 %.
- Claude chấm Claude; 2 câu × 2 lượt.

**Cấp N3 (hiểu xu hướng video ngành):** L2–3 → **L3–4** (L4 khi có số TikTok/Reels hoặc bóc được ≥ 1 khung thật đúng ngành).
R3 (video của sếp) **không còn chặn**; vẫn có giá trị để bóc khung thật và lấy số TikTok/Reels.
