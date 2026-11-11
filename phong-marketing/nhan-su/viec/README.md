# Việc của từng chuyên viên (workflow loại 2)

Gói kiến thức (`../<vai>.md`) trả lời **biết gì**. Tệp việc ở đây trả lời **làm gì, theo bước nào, giao ra cái gì**.
Luồng phối hợp của cả phòng (loại 1, ở `../../quy-che/luong/`) chỉ gọi **tên việc**, không chép bước.
Chốt 11/11/2026 (party mode): giải phẫu agent = danh tính + kiến thức (gói) + **thực đơn việc** (tệp ở đây) + Sổ lỗi + phiếu giao.

**Luật viết tệp việc** (học từ bài thi 11/11 và `obra/superpowers` — writing-skills, MIT):
- Luật bắt buộc **≤ 5 dòng**, viết dạng **"Nếu <thấy được> → <làm gì>"**. Không viết câu cấm chung chung: gói đã có luật mà agent vẫn phạm.
- Luật nằm trong **ô bắt buộc của khuôn đầu ra** thì agent không bỏ qua được. Ô trống = việc chưa xong.
- Bước nào gói đã tả thì **dẫn tới mục gói**, không chép lại.
- Mỗi việc có **bộ thi** cạnh nó (`<việc>.thi/`). Sửa tệp việc hoặc mục gói nó dẫn tới → thi lại bộ đó.
  Việc chưa qua bộ thi được gọi kèm ⚠ (xem bảng dưới).

**Khuôn chung:** [../../quy-che/khuon/khuon-viec.md](../../quy-che/khuon/khuon-viec.md) · **Phiếu giao chung:** [../../quy-che/khuon/phieu-giao.md](../../quy-che/khuon/phieu-giao.md)

| Vai | Việc | Trạng thái |
|---|---|---|
| Biên kịch | [bk-kich-ban-qc](bk-kich-ban-qc.md) · [bk-loi-ban-dia](bk-loi-ban-dia.md) · [bk-chu-tren-hinh](bk-chu-tren-hinh.md) | ✅ đã thi (23/24 vs đối chứng 18/24) |
| Trưởng phòng | [tp-lap-doi](tp-lap-doi.md) (lập đội, đánh giá, đào tạo, xin tài nguyên — chạy TRƯỚC mọi luồng cho shop mới) · [tp-nhan-viec](tp-nhan-viec.md) · [tp-dieu-phoi](tp-dieu-phoi.md) · [tp-ke-hoach-tuan](tp-ke-hoach-tuan.md) · [tp-brief](tp-brief.md) · [tp-hop](tp-hop.md) · [tp-duc-ket](tp-duc-ket.md) | 🟡 có tệp, chưa thi |
| Chuyên viên SP | [sp-dung-ho-so](sp-dung-ho-so.md) · [sp-bo-sung-nguyen-lieu](sp-bo-sung-nguyen-lieu.md) · [sp-to-san-pham](sp-to-san-pham.md) | 🟡 có tệp, chưa thi |
| Săn xu hướng | [sxh-tim-nguon](sxh-tim-nguon.md) · [sxh-boc-khung](sxh-boc-khung.md) · [sxh-chuyen-khung](sxh-chuyen-khung.md) · [sxh-theo-doi-doi-thu](sxh-theo-doi-doi-thu.md) | 🟡 có tệp, chưa thi |
| Đạo diễn | [dd-ke-hoach-hinh](dd-ke-hoach-hinh.md) · [dd-viet-prompt](dd-viet-prompt.md) · [dd-kiem-clip](dd-kiem-clip.md) (nội dung hình) | 🟡 có tệp, chưa thi |
| Thợ dựng | [td-dung-qc](td-dung-qc.md) · [td-ban-dia-hoa](td-ban-dia-hoa.md) · [td-do-qc](td-do-qc.md) (kỹ thuật) · [td-xuat-bien-the](td-xuat-bien-the.md) | 🟡 có tệp, chưa thi |

**Sếp chốt 11/11:** mẫu Biên kịch đã chứng minh cách viết này tốt hơn, nên các vai còn lại **viết mới, tạm chưa thi**.
Việc 🟡 được gọi trong luồng, phiếu giao đánh dấu ⚠ và Trưởng phòng mở kiểm kỹ đầu ra (`tp-dieu-phoi`).
Lỗi lộ ra khi chạy thật → `tp-duc-ket` ghi vào "Thất bại khi" và thành đề thi khi lập bộ thi.

Chia việc kiểm (đã bỏ vai Kiểm duyệt): **Đạo diễn kiểm nội dung hình** (giống sản phẩm thật, vật lạ),
**Thợ dựng kiểm kỹ thuật** (độ to, khung đen, vùng an toàn). Không vai nào kiểm phần của vai kia.
