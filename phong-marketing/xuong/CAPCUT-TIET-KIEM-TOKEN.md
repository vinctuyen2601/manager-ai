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
| **Mức 2**, lô thu-may-cau-as-v3 (video 15 giây, giọng 1 đoạn + nhạc, 12/11 chiều) | **0,75 triệu (đo thật)**, 40 lượt, ~9 phút | 18,8K | 25 |
| **Mức 3**, lô thu-may-cau-as-v4 (cùng lô, script `capcut-auto.py` tự bấm) | **0,21 triệu (đo thật)**, 10 lượt; script chạy 84 giây | 21K | **0** |
| **Mức 3**, lô thu-can-cau-v3 (video 81 giây, 5 đoạn + nhạc) | **0,09 triệu (đo thật)**, 4 lượt; script chạy 243 giây, ĐẠT ngay lần đầu, mốc lệch ≤ 0,01 s | 23K | **0** |
| Mục tiêu khi không có sự cố | ≤ 0,8 triệu | ≤ 15K | ≤ 25 |

## Mức 3: script tự bấm (`cong-cu/capcut-auto.py`), chạy được từ 12/11
```
python -I -X utf8 xuong/cong-cu/capcut-auto.py --du-an <tên> --video <mp4> --loi <tệp "giây|lời"> [--nhac "<tên bài>" --tim "<từ khoá>"] [--tu-buoc N] [--thu]
```
- Trước khi chạy: CapCut phải ở trên cùng. Sếp không dùng chuột hay bàn phím trong khoảng 2 phút script chạy.
- Script tự làm 7 bước: tạo và đặt tên dự án → nhập video, tắt tiếng, khoá → clip chữ đúng mốc (về 0 rồi bấm Right × số khung) → tạo giọng → nhạc (tìm theo tên bài, lấy kết quả đầu, kiểm tên trong draft) → cắt nhạc ở cuối video + 0,3 s → tự kiểm (lời, mốc, giọng BV074, tắt tiếng, nhạc).
- Nhật ký ghi ở `<thư mục lời>\<dự án>-auto.log`. **Bảng mã thoát:**

| Mã | Nghĩa | Phiên desktop làm gì |
|---|---|---|
| 0 | ĐẠT | Đo token, báo kết quả |
| 1 | Sai hoặc lỗi trong lúc bấm | Đọc nhật ký và chạy `kiem-draft.py`, sửa tối thiểu (1–2 thao tác), chạy tiếp bằng `--tu-buoc N`. Quá 2 lần thì chuyển sang mức 2 |
| 2 | Tham số sai, hoặc tệp lời bị chặn khi kiểm trước. **Chưa bấm gì vào CapCut** | Không tự sửa lời. Báo phiên VS Code dòng `KIEM TRUOC` để họ sửa tệp lời. Chỉ dùng `--bo-qua-kiem-truoc` khi phía giao việc nói rõ là cố ý |
| 3 | Khoá an toàn dừng (CapCut không ở trên cùng, có cửa sổ khác che) | Đưa CapCut lên trên cùng (xem dòng "Đưa CapCut lên trước" trong bảng toạ độ), rồi chạy tiếp bằng `--tu-buoc N` |
- Khoá an toàn: chỉ bấm khi cửa sổ trên cùng và cửa sổ dưới điểm bấm đều thuộc CapCut.exe; cấm vùng nút Xuất/Chia sẻ; kéo chuột vào góc màn hình để dừng gấp.
- Tên mới của dự án được ghi vào `root_meta_info.json` ngay khi bấm Lưu. `draft_meta_info.json` chỉ cập nhật muộn hơn, và thư mục chỉ đổi tên khi đóng dự án. Các script đều dò theo `root_meta_info.json`.
- Đã thử lô 81 giây 5 đoạn: bấm Right khoảng 2.000 lần mỗi đoạn không rớt phím, mốc lệch ≤ 0,01 s, bước clip chữ mất khoảng 2 phút.
- Đã sửa và thử thật (lô thu-may-cau-as-v5: đoạn đầu ở 2 s, ĐẠT, 106 s, 0,08 triệu token, 0 ảnh):
  - Chọn clip chữ không phụ thuộc vị trí clip đầu: bấm thước rồi Ctrl+A.
  - **Kiểm trước khi bấm** (mã thoát 2): hai mốc phải cách nhau ≥ 3,1 s, vì clip chữ mặc định dài 3 s. Giọng ước tính (số tiếng ÷ 4,3 giây) không được tràn sang đoạn sau. Nếu cố ý muốn chạy thì thêm `--bo-qua-kiem-truoc`.
  - Hàng của track nhạc được tính từ bố cục track trong draft. Nếu có nhiều track chữ hoặc nhiều track giọng thì script dừng, chuyển sang cắt nhạc bằng tay (mức 2).
- Chưa thử: CapCut đang thu nhỏ khi bắt đầu, bài nhạc chưa tải sẵn (script đã có nhánh bấm lần 2 nhưng chưa chạy thật). Lần đầu gặp các trường hợp này thì cho một phiên mức 2 đứng xem.

Mức 2 chỉ tốn 0,75 triệu cho cả giọng lẫn nhạc. Mức 1 chỉ riêng phần giọng của lô này đã tốn 0,95 triệu. Token mỗi lượt vẫn khoảng 18K vì phần hướng dẫn hệ thống cố định. Muốn giảm tiếp thì phải bớt số lượt (đi lên mức 3) hoặc làm nhẹ phần hướng dẫn (tắt kết nối không dùng).

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
4. **Gộp thao tác.** Mỗi lần `computer_batch` làm trọn một bước, ví dụ thêm một clip chữ (rê chuột, "+", bấm ô, dán lời). Không chụp xen giữa các thao tác.
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
| Đưa CapCut lên trước | Kiểm bằng PowerShell trước, không chụp ảnh: lấy `MainWindowHandle` của tiến trình CapCut, xem `IsIconic` (cửa sổ có đang thu nhỏ không). Nếu thu nhỏ thì `open_application` không đưa lên được: mở File Explorer, rồi bấm biểu tượng CapCut trên thanh tác vụ, đo ngày 12/11 ở **(977,800)**. Thứ tự biểu tượng có thể đổi |
| Gõ chữ dài hoặc có dấu | **Không dùng `type`**, vì nó từng dán nhầm nội dung clipboard (chuỗi tiếng Nhật, đường dẫn lạ). Dùng `write_clipboard` → bấm ô → Ctrl+A → Delete → Ctrl+V |
| Trang chủ | Menu (83,13) → Quay lại trang chủ (108,183). Tạo dự án (600,113) |
| Đặt tên dự án | Sửa đổi (1412,415) → bấm 3 lần ô Tên (790,252), dán tên (`write_clipboard` + Ctrl+A + Ctrl+V) → Lưu (635,625) |
| Nhập video | Nhập (300,190) → Từ thiết bị (280,215) → ô File name (350,357), dán đường dẫn, zoom kiểm, Enter → kéo (152,143) xuống (120,620) |
| Track video | Tắt tiếng (72,624), khoá (34,624) |
| Thước timeline | y=467, mốc 0 ở x=139. Video 81 s: 5,28 px/giây; video 15 s: khoảng 30,4 px/giây. Bấm gần đích, đọc timecode, rồi bấm Left/Right đúng (đích − hiện tại) × 30 lần (1 lần = 1/30 s). Thước **không phải lúc nào cũng hút vào cuối video** |
| Clip chữ | Tab Văn bản (132,42) → rê chuột vào (140,100) → "+" (165,122) → bấm 3 lần ô chữ (1222,120), dán lời (`write_clipboard` + Ctrl+A + Ctrl+V) |
| Chọn mọi clip chữ | Khoá track video trước. Bấm clip chữ đầu (146,585), rồi Ctrl+A |
| Tạo giọng | Tab TTS (1265,42) bấm 2 lần → ★ **(1007,110)**, nằm sát bên trái "Xu hướng"; đúng mục thì có tiêu đề "Yêu thích" phía trên lưới thẻ → "Cô Gái Hoạt Ngôn" (1140,163), zoom kiểm viền xanh → Tạo lời nói (1411,416), chờ khoảng 25 giây |
| Nhạc | Tab Âm thanh (93,42) → ô tìm (285,77), dán từ khoá, zoom kiểm chữ → bấm **nút** ở cột x=474 trên hàng của bài (nút tải ⬇ hoặc "+"; không bấm vào tên bài). Chờ 10 giây → **kiểm draft đã có `music` chưa** → chưa có thì mới bấm nút "+" lần hai |
| Cắt nhạc | Chọn clip nhạc (300,712) → bấm thước gần cuối video → đọc timecode → Left/Right tới cuối video + 0,3 s → Tách (157,447) → Delete |
| Nhạc đã tải sẵn | Kết quả tìm hiện "+" thay vì nút tải. Bấm "+" một lần là thêm. "Upbeat Acoustic Groove" ở hàng y≈385 khi tìm "upbeat acoustic" |
| Tắt tiếng track giọng / nhạc | x=72 trên hàng của track đó (giọng y≈673, nhạc y≈712 khi có đủ 3 track) |

## Mức 2: chạy theo toạ độ, chỉ nhìn ở điểm kiểm (đang học từ 12/11)
Các bước **MÙ** thì làm trong `computer_batch` mà không chụp ảnh nào. Bước **KIỂM** dùng một lần zoom nhỏ (`scale` ≤ 0.5) đúng vùng ghi trong bảng. Bước **TỆP** chạy `kiem-draft.py`. Sai thì sửa và kiểm lại đúng bước đó. Mỗi lô ghi **nhật ký mức 2** (mẫu ở cuối mục) để chuẩn bị cho mức 3 (script tự bấm).

| # | Bước | Cách | Kiểm gì |
|---|---|---|---|
| 0 | Xin quyền, đưa CapCut lên, kiểm phiên bản | PowerShell: đường dẫn tiến trình có `9.7.0.4153` không, cửa sổ có đang thu nhỏ không (`IsIconic`). Thêm 1 ảnh `scale` 0.3 | Đúng phiên bản; không có cửa sổ nào che. CapCut có thể đang mở dự án cũ: chỉ đi Menu → Trang chủ, không sửa gì |
| 1 | Tạo dự án, đặt tên | MÙ | Tên dự án ở giữa thanh tiêu đề. Thư mục draft vẫn là `1112 (n)`; `kiem-draft.py` tự tìm theo tên |
| 2 | Nhập video: dán đường dẫn (`write_clipboard` + Ctrl+V) | MÙ, rồi KIỂM zoom (100,348)–(560,366) trước khi Enter | Đường dẫn đúng |
| 3 | Kéo video xuống timeline (chờ 3 s sau Enter), tắt tiếng, khoá track | MÙ. Kiểm bằng TỆP ở bước 5: zoom 0.4 không đủ nét để thấy biểu tượng tắt tiếng/khoá | — |
| 4 | Clip chữ (mỗi đoạn: bấm thước → đọc timecode → Left/Right → "+" → dán lời) | Timecode: KIỂM zoom (505,405)–(565,421) `scale` 1. Phần còn lại MÙ | Mốc ±0,3 s |
| 5 | Kiểm toàn bộ chữ | TỆP: chờ khoảng 10 giây cho CapCut tự lưu, rồi chạy `kiem-draft.py <dự án> <tệp lời>` | KET QUA: DAT |
| 6 | Chọn chữ → TTS ×2 → ★ → thẻ giọng | MÙ, rồi KIỂM zoom (1000,95)–(1456,430) `scale` 0.5 | Thẻ "Cô Gái Hoạt Ngôn" có viền xanh |
| 7 | Tạo lời nói, chờ 25 giây | MÙ, rồi TỆP | Có đủ số clip `text_to_audio` |
| 8+9 | Nhạc: dán chữ tìm, Enter, chờ 3 s | MÙ, rồi một lần KIỂM zoom (100,60)–(500,430) `scale` 0.5 | Chữ tìm đúng, tên bài, toạ độ y của hàng |
| 10 | Tải (chờ 10 giây) → "+" → cắt ở cuối video + 0,3 s → Delete | MÙ (đọc timecode bằng KIỂM như bước 4) | — |
| 11 | Kiểm cuối | TỆP | Đúng lời, đúng mốc, có nhạc tới cuối video + 0,3 s, track video tắt tiếng |

**Mẫu nhật ký mức 2** (ghi vào `<thư mục lô>\<dự án>-nhat-ky-muc2.md`):
| Bước | MÙ đúng ngay? | Phải sửa gì | Thời gian chờ thực tế | Ghi chú cho script mức 3 |
|---|---|---|---|---|

## Xử lý sự cố, tránh tốn lượt
| Dấu hiệu | Làm gì |
|---|---|
| Chụp màn hình báo "no screen sources" | Đừng chụp lại liên tục. Làm tiếp theo toạ độ cố định, kiểm bằng `kiem-draft.py`, và nhờ sếp đánh thức hoặc kết nối lại màn hình |
| Cửa sổ hay hộp thoại CapCut trong suốt | Dừng, báo sếp. Đừng thử nhiều lần. Kiểm GPU (VSR có đang chạy không) |
| Menu xổ xuống không hiện trên ảnh | Đừng chụp lại. Bỏ qua bước đó, hoặc dùng cách khác (phím tắt, ô tìm kiếm) |
| Bấm vào dự án cũ mà mở ra dự án khác | Không sửa tệp nội bộ CapCut. Tạo dự án mới |
| Lỡ kéo thanh trượt hay đổi số | Ctrl+Z ngay, rồi zoom kiểm lại một lần |
| Hộp thoại xin quyền bị từ chối | Hỏi sếp một câu rồi dừng. Không tự xin lại nhiều lần |
| Ô tìm kiếm hiện chữ lạ (dán nhầm clipboard) | Ctrl+A, Delete, dán lại bằng `write_clipboard` + Ctrl+V, zoom kiểm |

## Đo chi phí sau mỗi lô
```
python -I -X utf8 xuong/cong-cu/do-token.py --moi-nhat
```
`--moi-nhat` lấy tệp phiên được sửa gần nhất. Nếu có phiên khác (ví dụ VS Code) đang chạy cùng lúc thì nó có thể lấy nhầm. Khi đó truyền thẳng đường dẫn tệp `.jsonl` của phiên CapCut, nằm trong `C:\Users\PC\.claude\projects\<thư mục dự án>\`. Ghi kết quả vào sổ lô: token quy đổi, số lượt, token/lượt, số ảnh, số phút. Ngưỡng xem lại: **mức 3 > 0,3 triệu** hoặc **mức 2 > 0,8 triệu** một lô → tìm sự cố của lô đó.
