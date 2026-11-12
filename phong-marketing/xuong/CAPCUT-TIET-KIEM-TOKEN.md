# Làm CapCut tiết kiệm token: quy trình và kinh nghiệm

Áp dụng cho các phiên **Claude desktop** điều khiển CapCut, nhận việc từ phiên VS Code của Phòng Marketing.
Rút ra từ 12/11/2026. Số liệu đo bằng `cong-cu/do-token.py`.

## Vì sao CapCut tốn token
1. **Lượt nào cũng đọc lại tất cả từ đầu.** Gồm hướng dẫn hệ thống và danh sách công cụ (khoảng 75 nghìn token), cả cuộc trò chuyện, và mọi ảnh đã chụp.
2. **Ảnh nằm lại trong lịch sử.** Một ảnh toàn màn hình khoảng 1.500 token, ảnh thu nhỏ hay vùng phóng to khoảng 300–600 token. Ảnh nào đã chụp cũng bị đọc lại ở mọi lượt sau.
3. **Làm bằng giao diện cần nhiều lượt.** Mỗi bước là một vòng nhìn → quyết định → bấm → kiểm. Một lô 81 giây cần khoảng 60 lượt.
4. **Phần Claude viết ra tính giá ×5.** Gồm toạ độ, lời thoại phải gõ, phần suy nghĩ.
5. **Lỗi giao diện làm số lượt tăng gấp đôi.** Ví dụ: hộp thoại trong suốt, menu không hiện, chụp màn hình lỗi.

## Số liệu thực tế (lô thu-can-cau: video 81 giây, giọng 5 đoạn + nhạc)
| Cách làm | Token quy đổi | Token/lượt | Ảnh |
|---|---|---|---|
| Phiên dài, kiểm bằng mắt (12/11 sáng) | ~1,8–2,1 triệu (ước tính) | 30–42K | ~110 |
| Phiên mới + kiểm bằng tệp dự án + ít ảnh (12/11 trưa) | **1,19 triệu (đo thật)** | **18K** | 36 |
| Mục tiêu khi không có sự cố | ≤ 0,8 triệu | ≤ 15K | ≤ 25 |

Lần đo 1,19 triệu vẫn gặp hai sự cố làm tăng chi phí: lần đầu bị từ chối quyền điều khiển, và chụp màn hình lỗi khoảng 10 phút.
Trong lần đo đó, hướng dẫn hệ thống chiếm khoảng 47%, việc tải bộ công cụ điều khiển màn hình chiếm khoảng 17%.

## 7 quy tắc
1. **Mỗi lô một phiên mới.** Không làm nhiều lô nối tiếp trong một phiên, vì ảnh và lịch sử của lô trước sẽ bị đọc lại ở mọi lượt của lô sau.
2. **Kiểm bằng tệp dự án, không kiểm bằng ảnh.** Sau mỗi nhóm thao tác, chờ "Tự động lưu" rồi chạy `cong-cu/kiem-draft.py`. Một lần chạy tốn khoảng 1–2 nghìn token, và chính xác hơn đọc timecode trên ảnh (ảnh từng lệch 0,07 s).
3. **Chụp ít, chụp nhỏ.**
   - Toàn màn hình: chỉ khi mới mở CapCut hoặc khi có lỗi, với `scale` ≤ 0.4.
   - Muốn đọc chữ: `zoom` một vùng nhỏ, `scale` ≤ 0.5.
   - Đọc timecode: zoom vùng (505,405)–(565,421).
   - Chỉ chụp ở chỗ dễ sai: hộp thoại chọn tệp, thẻ giọng (viền xanh), kết quả tìm nhạc.
4. **Gộp thao tác.** Mỗi lần `computer_batch` làm trọn một bước, ví dụ thêm một clip chữ (rê chuột, "+", bấm ô, Ctrl+A, gõ). Không chụp xen giữa các thao tác.
5. **Dùng toạ độ cố định ở bảng dưới, không dò lại.** Toạ độ lệch thì đo lại một lần và sửa bảng.
6. **Báo cáo gọn.** Nhắn phiên VS Code một lần khi xong, kèm kết quả `kiem-draft.py`. Không nhắn từng bước.
7. **Chỉ làm những việc chỉ CapCut làm được:** tạo giọng và chọn nhạc.
   - Không mở hộp thoại Xuất. Phiên VS Code lấy tệp bằng `capcut-draft.py` (xem CAPCUT-GIONG.md, mục "Cách lấy tệp").
   - Cắt, ghép, kiểm âm thanh làm bằng ffmpeg.

## Trước khi chạy lô (sếp làm)
- Thu nhỏ Arena và các cửa sổ hay ghim trên cùng. Không chạy công cụ xoá chữ (VSR) cùng lúc với CapCut.
- Mở sẵn CapCut ở trang chủ, cửa sổ phóng to toàn màn hình. Màn hình phải sáng, không ở chế độ khoá hay ngủ.
- Ngồi gần máy lúc phiên mới bắt đầu, để bấm cho phép khi hộp thoại xin quyền điều khiển hiện ra. Nếu để hộp thoại hết giờ thì bị tính là từ chối.
- (Nên làm) Tắt các kết nối không dùng cho phiên CapCut: Neon, Claude in Chrome, Docs. Phần hướng dẫn sẽ nhẹ hơn ở mọi lượt.

## Mẫu câu giao việc (dán vào phiên mới)
```
Đọc C:/Users/PC/OneDrive/Desktop/my project/manager-ai/phong-marketing/xuong/CAPCUT-TIET-KIEM-TOKEN.md và làm đúng 7 quy tắc.
Lô: <tên lô> · dự án CapCut: <tên> (đặt ngay khi tạo, không đổi) · video: <đường dẫn> · lời: <tệp "giây|lời">
Việc: tắt tiếng + khoá track video → clip chữ đúng mốc → Tạo lời nói "Cô Gái Hoạt Ngôn" 1,0x
(→ nhạc: "<bài>" cắt ở cuối video + 0,3 s). Kiểm bằng kiem-draft.py tới khi KET QUA: DAT.
Không mở Xuất, không bấm "Chia sẻ". Xong nhắn phiên VS Code: tên dự án + tên thư mục + kết quả kiem-draft.
```

## Toạ độ cố định (khung ảnh chụp 1456x819, CapCut phóng to)
| Việc | Toạ độ / thao tác |
|---|---|
| Xin quyền | `request_access ["CapCut","capcut.exe","File Explorer"]`, kèm `clipboardWrite` |
| Đưa CapCut lên trước | `open_application "Capcut"`. Không được thì mở File Explorer, rồi bấm biểu tượng CapCut trên thanh tác vụ (y≈800, x≈963–997) |
| Trang chủ | Menu (83,13) → Quay lại trang chủ (108,183). Tạo dự án (600,113) |
| Đặt tên dự án | Sửa đổi (1412,415) → bấm 3 lần ô Tên (790,252), Ctrl+A, gõ tên → Lưu (635,625) |
| Nhập video | Nhập (300,190) → Từ thiết bị (280,215) → ô File name (350,357), gõ đường dẫn, Enter → kéo (152,143) xuống (120,620) |
| Track video | Tắt tiếng (72,624), khoá (34,624) |
| Thước timeline | y=467, mốc 0 ở x=139. Video 81 s: 5,28 px/giây; video 15 s: khoảng 29 px/giây. Chỉnh từng khung bằng phím Left/Right (1/30 s) |
| Clip chữ | Tab Văn bản (132,42) → rê chuột vào (140,100) → "+" (165,122) → bấm 3 lần ô chữ (1222,120), Ctrl+A, gõ lời |
| Chọn mọi clip chữ | Khoá track video trước. Bấm clip chữ đầu (146,585), rồi Ctrl+A |
| Tạo giọng | Tab TTS (1265,42) bấm 2 lần → ★ (1018,111) → "Cô Gái Hoạt Ngôn" (1140,163), zoom kiểm viền xanh → Tạo lời nói (1411,416), chờ khoảng 25 giây |
| Nhạc | Tab Âm thanh (93,42) → ô tìm (285,77), gõ xong zoom kiểm chữ → kết quả ở x=474: bấm 1 lần để tải (chờ 10 giây), bấm lần nữa để thêm "+" |
| Cắt nhạc | Chọn clip nhạc → đưa đầu dòng phát tới cuối video (bấm thước sẽ hút vào cuối video) → Right ×9 → Tách (157,447) → Delete |
| Tắt tiếng track giọng / nhạc | x=72 trên hàng của track đó (giọng y≈673, nhạc y≈712 khi có đủ 3 track) |

## Xử lý sự cố, tránh tốn lượt
| Dấu hiệu | Làm gì |
|---|---|
| Chụp màn hình báo "no screen sources" | Đừng chụp lại liên tục. Làm tiếp theo toạ độ cố định, kiểm bằng `kiem-draft.py`, và nhờ sếp đánh thức hoặc kết nối lại màn hình |
| Cửa sổ hay hộp thoại CapCut trong suốt | Dừng, báo sếp. Đừng thử nhiều lần. Kiểm GPU (VSR có đang chạy không) |
| Menu xổ xuống không hiện trên ảnh | Đừng chụp lại. Bỏ qua bước đó, hoặc dùng cách khác (phím tắt, ô tìm kiếm) |
| Bấm vào dự án cũ mà mở ra dự án khác | Không sửa tệp nội bộ CapCut. Tạo dự án mới |
| Lỡ kéo thanh trượt hay đổi số | Ctrl+Z ngay, rồi zoom kiểm lại một lần |
| Hộp thoại xin quyền bị từ chối | Hỏi sếp một câu rồi dừng. Không tự xin lại nhiều lần |
| Ô tìm kiếm hiện chữ lạ (dán nhầm clipboard) | Ctrl+A, Delete, gõ lại, zoom kiểm |

## Đo chi phí sau mỗi lô
```
python -I -X utf8 xuong/cong-cu/do-token.py --moi-nhat
```
`--moi-nhat` lấy tệp phiên được sửa gần nhất. Nếu có phiên khác (ví dụ VS Code) đang chạy cùng lúc thì nó có thể lấy nhầm. Khi đó truyền thẳng đường dẫn tệp `.jsonl` của phiên CapCut, nằm trong `C:\Users\PC\.claude\projects\<thư mục dự án>\`. Ghi kết quả vào sổ lô: token quy đổi, số lượt, token/lượt, số ảnh, số phút. Một lô 81 giây vượt 1,2 triệu token thì xem lại lô đó gặp sự cố gì.
