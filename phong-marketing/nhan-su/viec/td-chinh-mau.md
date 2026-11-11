# Thợ dựng · chỉnh-màu

Chỉnh màu cảnh quay theo **tông Đạo diễn đặt**, rồi **đo** để chứng minh màu sản phẩm đúng hàng thật. Sai màu là nói sai về sản phẩm.
Kiến thức: sổ tay `../../thu-vien/so-tay/QUAY-THAT.md` §F (F1 luật màu thật · F2 cân trắng · F3 tông 17fishing · F4 công cụ + cách đo "đỏ đúng").
Sếp chốt 11/11/2026: Đạo diễn đặt tông, Thợ dựng làm và đo.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Trong `td-dung-qc`, sau khi nối đoạn và trước khi đặt chữ · chỉ với cảnh **quay thật** (clip Muse: chỉ đo, không chỉnh trừ khi Đạo diễn yêu cầu) |
| Nhận | Cảnh quay (có 2 s thẻ xám nếu phiếu đi quay có) · tông đích từ Đạo diễn (`dd-ke-hoach-quay` hoặc sổ tay F3) · khung thật đối chiếu màu của sản phẩm (hồ sơ: `that-*.jpg`) |
| Giao | Cảnh đã chỉnh (thư mục `thu-nghiem/`) · bảng đo màu trong phiếu dựng (`NN-td-dung.md`, mục "Màu") · ảnh so trước/sau |
| Xong khi | Mỗi cảnh có sản phẩm có 1 dòng đo đủ ô · không vùng sản phẩm nào lệch quá ngưỡng · cảnh cháy màu đã báo Đạo diễn |

## Luật bắt buộc
1. **Nếu khung sản phẩm có điểm ảnh R = 255 và G > 150 ở vùng phải đỏ** → đỏ **đã cháy sang cam**: không chỉnh để che, báo Đạo diễn (quay lại, hạ phơi sáng). Ghi số điểm ảnh.
2. **Nếu cảnh có thẻ xám** → cân trắng bằng thẻ xám trước mọi chỉnh khác (thẻ phải về tâm vectorscope). Không có → dùng khung thật của hồ sơ làm mốc.
3. **Nếu định dùng LUT** → chỉ LUT kỹ thuật cho cảnh quay Log; không LUT tạo phong cách (sổ tay F3).
4. **Nếu cảnh đêm** → không nâng mức đen, không đẩy bão hoà đỏ quá tay (nền tảng nén đã đè vùng tối, giảm bão hoà nhẹ).
5. **Nếu góc hue vùng sản phẩm lệch > ~10° so với khung thật** → chưa xong; ghi ⚠ ngưỡng còn là phán đoán tới khi có cảnh quay thật đầu tiên.

## Bước
1. Rút khung đại diện mỗi cảnh (`look.py` của ffmpeg-skill hoặc ffmpeg) và khung thật đối chiếu.
2. Kiểm cháy màu (luật 1) — dừng sớm nếu cháy.
3. Cân trắng (luật 2), rồi phơi sáng / bão hoà theo tông (`color.py --correct …`).
4. Đo: đếm điểm ảnh đỏ đúng, cháy; hue + bão hoà vùng sản phẩm (`signalstats` / `vectorscope` của ffmpeg gốc — ngoại lệ ghi rõ, sổ tay F4).
5. Kiểm mức hợp chuẩn (`check.py --levels bt709`).
6. Ghi bảng đo + ảnh so trước/sau vào phiếu dựng.

## Khuôn đầu ra (mục "Màu" trong phiếu dựng)
```
Tông đích: <từ Đạo diễn> · Thẻ xám: có | không · LUT: không | kỹ thuật <tên>
| Cảnh | Vùng sản phẩm | Điểm ảnh đỏ đúng / cháy | Hue vùng (°) · khung thật (°) · lệch | Bão hoà | Mức đen | Chỉnh đã làm (lệnh) | Đạt? |
Ảnh so trước/sau: <đường dẫn>
```

## Thành công khi
- Đuôi đỏ trên video ra cùng màu khung thật; Đạo diễn đọc bảng là duyệt, không phải mở video.

## Thất bại khi
- Chỉnh bão hoà để "cứu" đỏ đã cháy cam — sản phẩm trông sai màu (sổ tay F1).
- Áp LUT phong cách lên cảnh có sản phẩm.

## Bộ thi
`td-chinh-mau.thi/` ⬜ — chờ cảnh quay thật đầu tiên (cần một cảnh đỏ cháy và một cảnh đúng để làm đề).
