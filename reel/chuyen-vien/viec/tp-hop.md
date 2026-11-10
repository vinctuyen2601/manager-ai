# Trưởng phòng · họp

Bốn cuộc họp có biên bản. Họp = party mode: Trưởng phòng chủ trì, mỗi lượt gọi **2–3 vai liên quan nhất** (gói §3.4, dòng BMAD).
Họp phải ra **quyết định** hoặc **bước kế** — không ra bàn luận suông.
Kiến thức: `../truong-phong.md` §4 (bước 3, 5, 9–10, 12), §12 (cách thảo luận với sếp). Tệp này chỉ giữ thứ tự làm và luật bắt buộc.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Đầu tuần · khi một phiếu `chan` mà cột "Nếu chặn" của luồng không gỡ được · cuối mỗi lô · cuối tuần |
| Nhận | Theo bảng dưới (cột "Đọc") |
| Giao | Họp gắn một việc: `viec-dang-chay/<thư mục>/<số kế>-tp-hop-<loại>.md`; họp tuần: `viec-dang-chay/tuan-<ngày>-hop-<loại>.md` · phiếu giao |
| Xong khi | Biên bản có ô **Quyết định** và **Bước kế** · mỗi câu hỏi sếp có cột "chặn bước" và mặc định |

| Họp | Khi | Gọi ai (≤ 3) | Đọc | Ra gì |
|---|---|---|---|---|
| **Đầu tuần** | Thứ Hai | SP + Săn xu hướng (+ Biên kịch nếu có việc Quảng cáo) | Việc treo · biên bản cuối tuần trước | Chạy `tp-ke-hoach-tuan`; chọn khung/ý tưởng từ 2–3 phương án (gói §4 bước 5) |
| **Gỡ chặn** | Phiếu `chan` lần 2 ở cùng bước, hoặc hai vai đẩy lỗi cho nhau | Vai bị chặn + vai giao đầu vào cho nó | Phiếu chặn + tệp ở dòng `giao` | Một trong ba: sửa đầu vào · đổi phương án · báo sếp |
| **Cuối lô** | Luồng xong bước cuối | Vai có lỗi trong lô | Mọi phiếu trong thư mục | Tự kiểm trước khi trình (gói §4 bước 9) → báo cáo khuôn §7.4 → gọi `tp-duc-ket` |
| **Cuối tuần** | Thứ Sáu, hoặc khi gói tuần xong | Vai còn việc treo | Bảng tuần · sổ chi phí | Hạn mức thật so với ước · việc chuyển tuần sau · báo cáo tuần khuôn §7.4 |

## Luật bắt buộc
1. **Nếu một vai trong họp cần hỏi sếp** → dừng vòng, ghi câu hỏi kèm mặc định, làm tiếp phần không phụ thuộc.
   Không để cả phòng chờ (gói §3.4, BMAD).
2. **Nếu bàn 2 lượt mà không có phương án mới** → Trưởng phòng chốt theo điểm liên quan · khả năng bán · sẵn sàng nguyên liệu,
   ghi lý do. Phương án "sẵn sàng nguyên liệu" ≤ 2 không được chọn.
3. **Nếu ghi một câu hỏi là "chặn"** → cột "chặn bước" ghi số bước bị dừng. Không ghi được → không chặn, làm theo mặc định
   (thi 11/11: bài đối chứng gắn "chặn" cho cả 6 câu).
4. **Nếu họp cần dữ liệu web về sản phẩm** → chỉ Chuyên viên SP lấy; vai khác đọc hồ sơ
   (thi 11/11: 12 agent cùng gọi một shop → lỗi 429 hàng loạt).
5. **Nếu một vai nói phần mình "xong"** → Trưởng phòng mở tệp kiểm trước khi ghi vào ô Quyết định (`tp-dieu-phoi` luật 1).

## Bước
1. Chọn loại họp, gọi vai theo bảng (tối đa 3).
2. Mỗi vai nhận: câu hỏi họp (1 câu) + phiếu liên quan + khuôn trả lời (phương án, nguồn, ước %).
3. Lượt 1: mỗi vai đưa phương án hoặc ý kiến, có nguồn.
4. Trưởng phòng chốt (luật 2) hoặc gọi lượt 2 cho đúng vai còn thiếu.
5. Viết biên bản. Quyết định chỉ ghi thêm; đổi quyết định thì ghi dòng mới, nêu lý do bỏ cái cũ (gói §3.4).
6. Phiếu giao. Có việc cho sếp → báo cáo khuôn §7.4 (cuối lô, cuối tuần) hoặc báo giữa chừng 3 dòng (gỡ chặn).

## Khuôn đầu ra
```
# Họp <đầu tuần | gỡ chặn | cuối lô | cuối tuần> — <ngày> — <thư mục việc hoặc tuần>
Có mặt: <vai> · Câu hỏi họp: <1 câu>
| Phương án | Ai đưa | Liên quan 1–5 | Khả năng bán 1–5 | Sẵn sàng nguyên liệu 1–5 | Nguồn |
Quyết định: <…> — vì <…> — đổi được tới bước <…>             (bắt buộc)
Bước kế: <việc> · <vai> · <ngày thật>                          (bắt buộc)
| Câu hỏi sếp (lời thường) | Chặn bước số / không | Mặc định |
```
Sau biên bản là phiếu giao chung.

## Thành công khi
- Mỗi cuộc họp kết thúc bằng một việc có người làm và ngày.
- Sếp chỉ nhận câu hỏi thật sự cần sếp, mỗi câu có mặc định.

## Thất bại khi
- Họp gọi cả 5 vai cùng lúc → trùng việc, tốn token (gói §3.4).
- Mọi câu hỏi đều gắn "chặn" → sếp không biết câu nào gấp (thi 11/11).
- Nhiều agent cùng lấy dữ liệu một shop trong họp → 429 (thi 11/11).
- Biên bản không có ô Quyết định → lô sau bàn lại từ đầu.

## Bộ thi
`tp-hop.thi/` — chưa có. Chưa thi thì dùng kèm ⚠.
