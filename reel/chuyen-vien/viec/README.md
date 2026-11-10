# Việc của từng chuyên viên (workflow loại 2)

Gói kiến thức (`../<vai>.md`) trả lời **biết gì**. Tệp việc ở đây trả lời **làm gì, theo bước nào, giao ra cái gì**.
Luồng phối hợp của cả phòng (loại 1, ở `../../luong/`) chỉ gọi **tên việc**, không chép bước.
Chốt 11/11/2026 (party mode): giải phẫu agent = danh tính + kiến thức (gói) + **thực đơn việc** (tệp ở đây) + Sổ lỗi + phiếu giao.

**Luật viết tệp việc** (học từ bài thi 11/11 và `obra/superpowers` — writing-skills, MIT):
- Luật bắt buộc **≤ 5 dòng**, viết dạng **"Nếu <thấy được> → <làm gì>"**. Không viết câu cấm chung chung: gói đã có luật mà agent vẫn phạm.
- Luật nằm trong **ô bắt buộc của khuôn đầu ra** thì agent không bỏ qua được. Ô trống = việc chưa xong.
- Bước nào gói đã tả thì **dẫn tới mục gói**, không chép lại.
- Mỗi việc có **bộ thi** cạnh nó (`<việc>.thi/`). Sửa tệp việc hoặc mục gói nó dẫn tới → thi lại bộ đó.
  Việc chưa qua bộ thi thì chưa được gọi trong luồng.

**Khuôn chung:** [_khuon-viec.md](_khuon-viec.md) · **Phiếu giao chung:** [_phieu-giao.md](_phieu-giao.md)

| Vai | Việc | Trạng thái |
|---|---|---|
| Biên kịch | [bk-kich-ban-qc](bk-kich-ban-qc.md) · [bk-loi-ban-dia](bk-loi-ban-dia.md) · [bk-chu-tren-hinh](bk-chu-tren-hinh.md) | bản mẫu, đang thi |
| Trưởng phòng | nhận-việc · kế-hoạch-tuần · brief · họp · đúc-kết | ⬜ |
| Chuyên viên SP | dựng-hồ-sơ · bổ-sung-nguyên-liệu · tờ-sản-phẩm | ⬜ |
| Săn xu hướng | tìm-nguồn · bóc-khung · chuyển-khung · theo-dõi-đối-thủ | ⬜ |
| Đạo diễn | kế-hoạch-hình · viết-prompt · kiểm-clip (nội dung hình) | ⬜ |
| Thợ dựng | dựng-QC · bản-địa-hoá · đo-QC (kỹ thuật) · xuất-biến-thể | ⬜ |

Chia việc kiểm (đã bỏ vai Kiểm duyệt): **Đạo diễn kiểm nội dung hình** (giống sản phẩm thật, vật lạ),
**Thợ dựng kiểm kỹ thuật** (độ to, khung đen, vùng an toàn). Không vai nào kiểm phần của vai kia.
