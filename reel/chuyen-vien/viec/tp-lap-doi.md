# Trưởng phòng · lập-đội

Nhận một shop (hoặc một mục tiêu mới), **lập đội, đánh giá từng vai, đào tạo, xin tài nguyên cần sếp**, tới khi báo được "đội sẵn sàng".
Sếp chốt 11/11/2026: "việc đầu tiên là tìm nhân sự phù hợp, chứng minh khả năng của team thì họ mới được boss thuê" · "giai đoạn đầu sẽ là
trao đổi của trưởng phòng và boss". Quy trình rút từ buổi rework 11/11 (`../../thi/`, `../../nghien-cuu/2026-11-11-agent-chuyen-gia/`).
Kiến thức: `../truong-phong.md`, `../LUAT-CHUNG.md`, khuôn gói ngành `../../nganh/KHUON-GOI-NGANH.md`.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Shop mới · ngành mới · mục tiêu mới cần vai chưa có · định kỳ khi một vai bị chấm tụt |
| Nhận | Tin nhắn sếp (link shop, mục tiêu sơ bộ) · `doi/<shop>/` nếu đã có · kho của shop (chỉ đọc) |
| Giao | `doi/<shop>/` gồm `DOI.md` (vai, cấp, lịch sử thi) · `DAO-TAO.md` · `TAI-NGUYEN.md` (xin sếp) · `BAO-CAO.md` (đội sẵn sàng chưa) |
| Xong khi | Mỗi vai đội cần có cấp từng năng lực từ bài thi thật · mỗi năng lực dưới L3 có nguyên nhân + việc đào tạo · `TAI-NGUYEN.md` xếp ưu tiên · sếp đã đọc `BAO-CAO.md` |

## Luật bắt buộc
1. **Nếu chưa tự khảo sát shop và ngành** → không hỏi sếp câu nào tra được từ kho/web. Ứng viên không đi phỏng vấn mà hỏi "công ty bán gì".
2. **Nếu xin sếp một tài nguyên** → ghi đủ 5 ô: xin gì · cho vai/năng lực nào · sếp mất bao lâu · không có thì làm sao (mặc định) · chặn hay không.
   Tối đa 3 mục "chặn" một lần. Câu chỉ cần sau khi thuê (page, mục tiêu, hạn mức, quyền) → để sau, không hỏi trong lúc lập đội.
3. **Nếu chấm một vai** → bộ đề ≥ 30 % câu thiếu dữ liệu · mỗi đề 2 lượt · đáp án sếp kín (agent thi không đọc) · chấm mù có khoá giải mã
   · không tính cấp trên một lượt.
4. **Nếu sửa gói/luật/gói ngành để đào tạo** → ghi **dự đoán trước** (năng lực nào lên tới đâu) vào `DAO-TAO.md`, rồi thi lại. Dự đoán sai → ghi sai.
5. **Nếu báo "sẵn sàng"** → mỗi vai ghi cấp + giới hạn phép đo (Claude chấm Claude, mẫu nhỏ). Vai dưới L3 ở năng lực việc cần → "chưa thuê", chỉ làm nháp.

## Bước
1. **Khảo sát** (không hỏi sếp): kho shop, trang web, Search Console nếu có quyền. Có gói ngành chưa? Chưa → giao `sxh-dung-nganh`.
2. **Lập đội**: mục tiêu cần vai nào. Không thi vai đội chưa cần (vd chỉ làm hồ sơ sản phẩm → chỉ SP).
3. **Đánh giá**: soạn bộ đề theo ngành (câu thường + ≥ 30 % câu thiếu dữ liệu); xin sếp đáp án (`TAI-NGUYEN.md`); thi 2 lượt; chấm mù + chấm thang; ra cấp.
4. **Tìm nguyên nhân** mỗi năng lực < L3: thiếu kiến thức · thiếu kỹ năng · đầu vào kém · luật trong gói đẩy sai. Kiểm dòng trích.
5. **Xin tài nguyên**: gom các thứ chỉ sếp có, xếp ưu tiên theo "chặn vai nào".
6. **Đào tạo**: sửa đúng lớp (luật chung / gói vai / gói ngành / thư viện bằng chứng), ghi dự đoán, thi lại. Lặp.
7. **Báo cáo** theo khuôn dưới. Sếp duyệt → vai đạt được giao việc thật, cấp = mức tự chủ ban đầu.

## Khuôn `BAO-CAO.md` (đọc dưới 1 phút)
```
KẾT LUẬN: <đội sẵn sàng cho việc X chưa — 1 câu>
ĐỘI: | Vai | Cấp từng năng lực việc cần | Trạng thái: sẵn sàng · đang học · chưa thi · chưa thuê |
CẦN ANH (tối đa 3, mục chặn trước): <tài nguyên · anh mất · không có thì>
ĐÃ LÀM TỪ LẦN TRƯỚC: <đào tạo gì · dự đoán · kết quả>
GIỚI HẠN PHÉP ĐO: <1–2 dòng>
```

## Thành công khi
- Sếp đọc `BAO-CAO.md` một phút là biết đội làm được gì và cần mình đưa gì.
- Mỗi lần đào tạo có số trước/sau và dự đoán ghi trước.

## Thất bại khi
- Hỏi sếp câu tra được (ứng viên hỏi "công ty bán gì").
- Đi thẳng vào sản phẩm và video khi đội chưa hiểu ngành (chạy thử 11/11: dừng ở bước 3, phải quay lại dựng ngành).
- Báo "giỏi lên" bằng cảm giác, không có bài thi.
- Đưa đáp án sếp vào gói (đề kín bị lộ → điểm vô nghĩa).

## Bộ thi
Chưa có. Người chấm Trưởng phòng ở việc này là **sếp**, qua chất lượng `BAO-CAO.md` và `TAI-NGUYEN.md`.
