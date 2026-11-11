# Săn xu hướng · đọc-số

Đọc số liệu sau đăng (48 h và 7 ngày) của một lô, kết luận giả thuyết của brief **đúng / sai / chưa đủ số**, và chỉ ra sửa hook hay sửa thân.
Kiến thức: `../vai/san-xu-huong.md` §3.11 (8 luật đọc số) · sổ tay `../../thu-vien/so-tay/KIEN-THUC-VIRAL.md` §8 · ô số theo `../../quy-che/khuon/so-lieu-sau-dang.md`.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Sau khi sếp gửi số 48 h hoặc 7 ngày (`../../quy-che/NHIP.md` dòng "Số liệu sau đăng") · trước `tp-duc-ket` của lô |
| Nhận | Số / ảnh chụp sếp gửi từng bản · brief của lô (giả thuyết, ngưỡng, hạn) · bảng cảnh / mốc cắt của từng bản (phiếu dựng) · bình luận (nếu có) |
| Giao | `NN-sxh-doc-so-<48h|7n>.md` trong thư mục lần chạy theo khuôn dưới · dòng kết quả vào sổ dự đoán (`khach-hang/<shop>/kinh-nghiem/DU-DOAN.md`) · phiếu giao |
| Xong khi | Mỗi bản đủ 3 ô dừng / ở lại / làm gì (hoặc `chưa thấy`) · giả thuyết có kết luận + lý do · mỗi dự đoán của lô có dòng đúng/sai/chưa đủ |

## Luật bắt buộc
1. **Nếu một bản < 100 lượt xem** → ghi số, kết luận `chưa đủ số` cho bản đó; không nói về điểm rơi hay hook tốt/xấu.
2. **Nếu so hai bản** → so **tỉ lệ** (xem ≥ 3 s ÷ lượt xem; thời lượng xem TB ÷ độ dài), chỉ khi cùng nền tảng, cùng nguồn (tự nhiên/chạy tiền), độ dài gần nhau. Không so số đếm.
3. **Nếu có xem lại hoặc thời lượng TB > độ dài** → đọc bình luận trước khi gọi là điểm mạnh ("đâu?", "không thấy", "AI à" = khó hiểu).
4. **Nếu có điểm rơi** → ghi giây, đặt cạnh bảng cảnh của bản đó; gọi tên nhịp (hook / nối nguồn / sau cú bật). Không có đồ thị → ô ghi `chưa thấy`, không suy hình dạng đường.
5. **Nếu kết luận trái dự đoán đã ghi** → ghi rõ "sai", kèm điều làm đổi ý; không viết lại dự đoán.

## Bước
1. Chép số từng bản vào bảng (ghi giờ chụp, nền tảng, nguồn). Thiếu ô → `chưa thấy`.
2. Tính 3 tỉ lệ mỗi bản (luật 2). Đánh dấu bản < 100 lượt xem (luật 1).
3. Soi điểm rơi / xem lại theo bảng cảnh (luật 3, 4).
4. Chẩn đoán: dừng tốt + ở lại kém = sửa thân · dừng kém = thử hook mới (gói §3.11, dòng cuối).
5. Kết luận giả thuyết brief theo đúng ngưỡng brief; ghi kết quả từng dự đoán vào sổ dự đoán.
6. Đề xuất cho lô sau (≤ 3 dòng), phiếu giao.

## Khuôn đầu ra
```
Lô: <mã> · Mốc: 48 h | 7 ngày · Chụp lúc: <ngày giờ> · Nền tảng · nguồn: <…>
| Bản | Lượt xem | Xem ≥ 3 s | DỪNG = ÷ | TG xem TB | Độ dài | Ở LẠI = ÷ | Xem hết % | Bình luận · chia sẻ · Zalo | Điểm rơi (giây · nhịp) | Đủ số? |
Giả thuyết brief: "<nguyên văn>" · ngưỡng <…> → ĐÚNG | SAI | CHƯA ĐỦ SỐ · vì <…>
Dự đoán của lô: | # | vai | dự đoán | % | kết quả | ghi chú |
Chẩn đoán: sửa hook | sửa thân | giữ — vì <…>  ·  Đề xuất lô sau: …
```

## Thành công khi
- Trưởng phòng đúc kết được mà không phải mở lại ảnh chụp số.
- Mỗi dự đoán của lô có kết quả, kể cả khi sai.

## Thất bại khi
- So số đếm giữa hai bản được phát cho số người khác nhau.
- Gọi một bản 40 lượt xem là "thắng".

## Bộ thi
`sxh-doc-so.thi/` ⬜ — đề gợi ý: 3 bản, một bản 60 lượt xem, một bản xem lại nhiều vì khó hiểu (bình luận "đâu?"), một bản dừng tốt mà ở lại kém.
