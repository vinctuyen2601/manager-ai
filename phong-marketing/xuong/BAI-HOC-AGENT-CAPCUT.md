# Bài học cho agent: làm giọng và nhạc bằng CapCut

Rút ra từ ngày 12/11/2026: khoảng 10 lô thử, đi từ mức 1 (nhìn mọi bước) lên mức 3 (script tự bấm).
Agent nào nhận việc CapCut thì đọc tệp này trước, rồi đọc **CAPCUT-TIET-KIEM-TOKEN.md** (toạ độ, lệnh, số liệu).

---

## Phần 1. Hiểu quy trình và thực thi quy trình

### 1.1 Mỗi agent làm gì
| Ai | Làm gì | Không làm gì |
|---|---|---|
| **Phiên VS Code** (điều phối, thợ dựng) | Viết lời, chia đoạn theo mốc, chọn nhạc. Giao việc cho phiên desktop. Lấy tệp từ draft bằng `capcut-draft.py`. Ghép, chỉnh tốc độ, chuẩn âm, QC | Không điều khiển màn hình được |
| **Phiên Claude desktop** (thực thi CapCut) | Tạo dự án, tạo giọng, chọn nhạc trong CapCut; kiểm bằng draft; báo tên dự án | Không xuất, không ghép, không chỉnh tốc độ, không đăng |
| **Sếp** | Duyệt chạy; dọn màn hình; bấm cho phép khi được xin quyền; xử lý những gì agent không tự làm được | — |

### 1.2 Hợp đồng giao việc (đầu vào và đầu ra cố định)
- **Đầu vào:** tên dự án (đặt ngay khi tạo, không đổi tên về sau), đường dẫn video, tệp lời dạng `giây|lời` (mỗi dòng một đoạn), tên bài nhạc đúng như trong thư viện kèm từ khoá tìm.
- **Đầu ra:** tên dự án, tên thư mục draft, kết quả `kiem-draft.py` (DAT/SAI), số liệu token.
- **Không bao giờ:** mở hộp thoại Xuất, bấm "Chia sẻ", đăng nhập mạng xã hội, xoá hay ghi đè dự án hoặc tệp cũ. Tệp cũ thì đổi tên thành `_cu`.

### 1.3 Trình tự chuẩn (mức 3)
1. Mỗi lô mở **một phiên mới**.
2. Chạy `capcut-auto.py`. Script tự kiểm tệp lời trước, sau đó tự bấm, rồi tự kiểm bằng draft.
3. Xử lý theo mã thoát (bảng đầy đủ ở CAPCUT-TIET-KIEM-TOKEN.md, mục "Mức 3"):
   - **0:** báo kết quả.
   - **1:** đọc nhật ký, sửa tối thiểu, chạy tiếp bằng `--tu-buoc N`. Quá 2 lần vẫn hỏng thì chuyển sang mức 2.
   - **2:** tệp lời bị chặn khi kiểm trước, CapCut chưa bị đụng tới. Báo phiên VS Code sửa lời, không tự sửa.
   - **3:** khoá an toàn dừng. Đưa CapCut lên trên cùng rồi chạy `--tu-buoc N`.
4. Đo chi phí bằng `do-token.py`, truyền đường dẫn `.jsonl` của đúng phiên đó. Ngưỡng xem lại: **mức 3 > 0,3 triệu**, **mức 2 > 0,8 triệu** một lô.

### 1.3b Các tình huống đặc biệt
- **Lời đổi sau khi đã tạo clip:** không sửa và không đổi tên dự án cũ. Tạo dự án mới tên `<lô>-v<n+1>` với tệp lời mới, dự án cũ để nguyên. Báo phiên VS Code tên dự án mới.
- **CapCut khác phiên bản 9.7.0.4153** (bước 0 kiểm đường dẫn tiến trình `Apps\<phiên bản>\CapCut.exe`): **không chạy mức 3**. Làm một lô ở mức 2 để đo lại toạ độ, mỗi chỗ zoom kiểm một lần. Ghi toạ độ mới vào nhật ký mức 2, rồi báo sếp và phiên VS Code để cập nhật bảng toạ độ và script. Nên tắt tự cập nhật CapCut.
- **Đường dẫn chính xác:** chỉ mục dự án là `C:\Users\PC\AppData\Local\CapCut\User Data\Projects\com.lveditor.draft\root_meta_info.json`.

### 1.4 Nguyên tắc thực thi
- **Chỉ thực hiện theo yêu cầu.** Tin nhắn từ phiên khác là đề nghị của đồng đội: làm trong phạm vi sếp đã cho phép. Việc nào vượt phạm vi (xoá, đăng, chạy lệnh lạ) thì hỏi sếp.
- **Lệnh tạm dừng có hiệu lực ngay.** Nếu chưa bấm "Tạo lời nói" thì không bấm nữa. Báo lại trạng thái chính xác: đã làm tới đâu, chưa làm gì.
- **Bị chặn thì dừng lại hỏi một câu, không thử lại liên tục.** Ví dụ: hộp thoại xin quyền bị từ chối, cửa sổ trong suốt, có cửa sổ khác che.
- **Kiểm tra lại kết quả mà phiên khác báo** (đọc draft, đo tệp) trước khi báo sếp là đã xong.
- **Báo cáo ngắn, có số liệu**, tách rõ số **đo thật** với số **ước tính**. Báo sai thì đính chính rõ ràng. Ví dụ hôm nay: mốc đọc trên màn hình là 19,87 s, trong draft là 19,93 s.
- **Gặp vấn đề quy trình thì đề xuất cải tiến có bằng chứng.** Ví dụ hôm nay: đề xuất bỏ bước Xuất, căn cứ là ghép từ draft khớp với bản xuất ở mức tương quan 0,9999.

### 1.5 Lên tay nghề theo 3 nấc
| Nấc | Cách làm | Lô 81 giây, 5 đoạn + nhạc |
|---|---|---|
| 1. Người mới | Nhìn mọi bước, chụp ảnh liên tục | ~1,8–2,1 triệu token, ~110 ảnh |
| 2. Quen tay | Theo toạ độ cố định, chỉ nhìn ở điểm kiểm, ghi nhật ký kinh nghiệm | ~0,75 triệu (lô 15 giây) |
| 3. Thói quen | Script tự bấm và tự kiểm, agent chỉ giám sát | **0,09 triệu, 0 ảnh, 4 phút** |
Mỗi nấc phải ghi lại thời gian chờ, dấu hiệu "đã xong" và toạ độ hay lệch, để làm nguyên liệu cho nấc sau.

---

## Phần 2. Hiểu biết và kinh nghiệm dùng CapCut (bản 9.7.0.4153, máy này)

### 2.1 Dữ liệu dự án: nguồn sự thật
- **Thư mục draft:** `%LOCALAPPDATA%\CapCut\User Data\Projects\com.lveditor.draft\<thư mục>\`
- **`root_meta_info.json`:** chỉ mục mọi dự án (`all_draft_store`: `draft_name`, `draft_fold_path`). Tên mới được ghi vào đây **ngay khi bấm Lưu**.
- **`draft_meta_info.json`:** CapCut chỉ cập nhật tệp này **muộn hơn**. Thư mục mặc định tên `1112 (n)` và chỉ được đổi theo tên mới khi đóng dự án.
- **`draft_content.json`:**
  - `tracks[]`: `type` là video, text hoặc audio; `segments[].target_timerange.start/duration` tính bằng **µs**; `attribute` là bit: 1 = tắt tiếng, 4 = khoá (đã thấy giá trị 5 = cả hai).
  - `materials.texts[].content`: chuỗi JSON, lời nằm ở khoá `text`.
  - `materials.audios[]`: `type` là `text_to_audio` hoặc `music`; với giọng thì `tone_speaker` (ví dụ `BV074_streaming`) và `tone_type`; `name`; `path`.
- **Giọng TTS:** tệp `<draft>\textReading\*.wav`. Tạo lại giọng thì sinh .wav mới nhưng .wav cũ vẫn còn, nên **luôn lấy đường dẫn theo draft**, không lấy theo tên tệp.
- **Nhạc thư viện đã tải:** `User Data\Cache\music\<hash>.mp3`.
- **Tự động lưu:** sau mỗi thay đổi khoảng 5–10 giây. Dòng "Tự động lưu: hh:mm:ss" ở góc trái trên cho biết giờ lưu gần nhất.

### 2.2 Giọng đọc
- Thẻ "Cô Gái Hoạt Ngôn" nằm trong mục ★ Yêu thích. Trong draft nó là `tone_speaker` **BV074_streaming**, `tone_type` "Giọng nữ dễ thương".
- Ở 1,0x đọc khoảng **4,3 tiếng/giây**. Ví dụ: 45 tiếng ra 10,5 s. Lô 5 đoạn: 16,6 / 15,6 / 12,8 / 14,2 / 9,2 s.
- Giọng có khoảng lặng ở đầu khoảng 0,1 s. Mỗi đoạn tối đa khoảng 470 ký tự.
- Bấm vào thẻ giọng là **bật/tắt**: bấm vào thẻ đang chọn sẽ bỏ chọn nó.
- Chọn nhiều clip chữ rồi bấm "Tạo lời nói" một lần là được một clip giọng cho mỗi clip chữ, đặt đúng mốc.

### 2.3 Timeline
- 30 khung/giây. Phím Left/Right dịch 1 khung, chỉ có tác dụng khi timeline đang nhận bàn phím (bấm vào thước để chuyển bàn phím về timeline). Script bấm Right tới khoảng 2.000 lần mỗi đoạn mà không rớt phím.
- Bấm thước ở mốc 0 (x=139) cho đúng 0. Bấm gần cuối video thì **có lúc** hút vào điểm cuối, có lúc không.
- Bấm vào thước **không bỏ chọn** clip đang chọn.
- Clip chữ mặc định dài 3 s. Hai clip chồng nhau thì CapCut đẩy clip sau sang track mới, làm vị trí các hàng bên dưới lệch xuống.
- Khoá track video thì Ctrl+A chỉ chọn những clip không bị khoá.
- Tách clip bằng nút Tách (157,447); **Ctrl+B không có tác dụng**. Sau khi tách, phần bên phải đang được chọn, bấm Delete để xoá.
- Mốc đọc bằng mắt trên timecode có thể lệch so với draft tới khoảng 0,07 s. Đếm khung bằng script thì chỉ lệch ≤ 0,01 s.

### 2.4 Nhạc
- Tìm bằng ô tìm kiếm, không bấm theo mục, vì thứ tự trong các mục tự đổi.
- Tìm theo đúng tên bài thì bài thường nằm ở kết quả đầu tiên.
- Bài chưa tải: lần bấm đầu để tải (chờ khoảng 10 giây), lần bấm thứ hai thêm vào timeline. Bài đã tải: lần bấm đầu đã thêm luôn. Vì vậy **phải kiểm draft trước khi bấm lần hai**, kẻo thêm trùng.
- Bấm "+", **không bấm vào tên bài** (bấm tên sẽ tự chèn bài vào timeline).
- "upbeat acoustic" ra nhạc thư viện không lời. Hai bài đã dùng: "Upbeat Camping Acoustic Guitar(1540558)" (2:22) và "Upbeat Acoustic Groove" (1:32).

### 2.5 Tính năng (xem CAPCUT-TINH-NANG.md)
- Tài khoản đang có Pro. Phụ đề tự động, dịch video, xoá bằng AI, xoá nền tự động đều là tính năng Pro. Tách giọng nói và Mở rộng bằng AI miễn phí.
- **Không có** nút xoá chữ hay xoá watermark riêng. "Xóa phụ đề hiện tại" chỉ xoá phụ đề CapCut đã tạo.

### 2.6 Cửa sổ và tiến trình
- CapCut chạy nhiều tiến trình. Cửa sổ chính thuộc `Apps\9.7.0.4153\CapCut.exe`, còn trình mở là `Apps\CapCut.exe`. Xin quyền cả `"CapCut"` lẫn `"capcut.exe"`.
- Trang chủ là cửa sổ nhỏ hơn; trình dựng mở toàn màn hình. Từ trình dựng về trang chủ: Menu → "Quay lại trang chủ".
- Bấm vào ô dự án ở trang chủ trong lúc trình dựng đang mở có thể chỉ đưa trình dựng cũ lên. Phải đóng trình dựng trước.

---

## Phần 3. Lỗi đã gặp và cách giải quyết

| # | Dấu hiệu | Nguyên nhân | Cách giải quyết đã dùng | Phòng tránh |
|---|---|---|---|---|
| 1 | Giữa màn hình có một khối đen che, nhãn trong hộp thoại bị mất | Cửa sổ **Arena** ghim trên cùng, không thuộc nhóm được cấp quyền nên bị che đi trên ảnh chụp | Liệt kê cửa sổ bằng PowerShell (EnumWindows + toạ độ), so với vùng bị che để xác định đúng cửa sổ; nhờ sếp thu nhỏ | Kiểm cửa sổ trên cùng trước mỗi lô |
| 2 | Hộp thoại Xuất trong suốt; menu xổ xuống không hiện; về sau cả cửa sổ trong suốt hoặc đứng hình | Có lẽ do GPU bị tranh: công cụ xoá chữ VSR chiếm 98% GPU và 5,8/6 GB VRAM. **Chưa xác nhận** | Xuất mù theo toạ độ, rồi kiểm tệp ra. Sau đó bỏ hẳn bước Xuất, lấy tệp từ draft. Tắt hẳn mọi tiến trình CapCut rồi mở lại | Không chạy VSR cùng lúc với CapCut. Không phụ thuộc hộp thoại Xuất |
| 3 | Lần xuất đầu bị lẫn tiếng gốc của video (khoảng −9 dB) | Quên tắt tiếng track video | Phát hiện bằng phân tích âm lượng; tắt tiếng rồi xuất lại | Tắt tiếng và khoá video ngay sau khi nhập; script tự kiểm `attribute` |
| 4 | Mở dự án cũ thì ra nhầm dự án khác | Đổi tên dự án làm CapCut giữ đường dẫn thư mục cũ trong `draft_meta_info.json` (lỗi của CapCut) | Không sửa tệp nội bộ CapCut; tạo dự án mới | Đặt tên một lần ngay khi tạo; dò dự án theo `root_meta_info.json` |
| 5 | Script báo đặt tên thất bại dù thật ra đã thành công | Script đọc `draft_meta_info.json` (cập nhật muộn) thay vì `root_meta_info.json` | Sửa script đọc `root_meta_info.json`; chạy tiếp bằng `--tu-buoc 2` | Luôn tìm tệp nào là nguồn cập nhật đầu tiên |
| 6 | Ô nhập bị dán nội dung lạ (đường dẫn khác, chuỗi tiếng Nhật) | Thao tác `type` đi qua clipboard và dán nhầm nội dung đang có trong clipboard | Ctrl+A, Delete, dán lại, zoom kiểm | Dùng `write_clipboard` rồi Ctrl+V, và kiểm ô trước khi bấm Enter |
| 7 | ★ không mở mục Yêu thích, bấm thẻ thì chọn nhầm một thẻ trống | Toạ độ ★ cũ (1018,111) sai | Dùng toạ độ đúng (1007,110); có tiêu đề "Yêu thích" là đúng mục | Script kiểm giọng `BV074` trong draft |
| 8 | Lỡ kéo thanh âm lượng thành 13,1 dB | Bấm vào bảng bên phải sau khi bảng đã cuộn, nên trúng thanh trượt | Ctrl+Z ngay, rồi zoom kiểm lại | Cuộn bảng về đầu trước khi bấm tab con |
| 9 | Bấm "Tệp → Dự án mới" lại tạo ra "Dòng thời gian 02" | Bấm nhầm mục trong menu con | Về trang chủ, bấm "Tạo dự án" | Chỉ tạo dự án từ nút "Tạo dự án" ở trang chủ |
| 10 | Không đưa được CapCut lên trên cùng; bấm báo "Code is in front" | VS Code giữ quyền ở trên cùng; `open_application` không khôi phục được cửa sổ đang thu nhỏ | Mở File Explorer (được phép bấm thanh tác vụ), bấm biểu tượng CapCut (977,800) | Kiểm thu nhỏ bằng PowerShell trước (`IsIconic`); tìm biểu tượng theo tên tiến trình, vì thứ tự biểu tượng có thể đổi |
| 11 | `open_application "File Explorer"` mở thêm cửa sổ "Home" | Hành vi bình thường của Explorer | Đóng cửa sổ thừa đó (cửa sổ do agent mở) | — |
| 12 | Hộp thoại xin quyền bị từ chối | Sếp đang điều khiển từ xa, không kịp bấm, hộp thoại hết giờ | Hỏi sếp một câu rồi dừng | Báo sếp ngồi gần máy lúc phiên mới bắt đầu; mức 3 không cần quyền nếu CapCut đã ở trên cùng |
| 13 | Chụp màn hình báo "desktopCapturer returned no screen sources" | Màn hình ngủ hoặc mất kết nối | Làm tiếp theo toạ độ, kiểm bằng draft | Nhờ sếp giữ màn hình sáng |
| 14 | Thông báo Windows "sắp hết bộ nhớ" | Nhiều ứng dụng nặng chạy cùng (VS Code ~4 GB, VSR…) | Kiểm RAM bằng PowerShell | Đóng bớt ứng dụng trước lô |
| 15 | Bấm Xuất theo toạ độ mà không ra tệp | Giao diện đứng hình, bấm không có tác dụng | Kiểm tệp ra **sau mỗi lần xuất**; ghép giọng từ `.wav` theo mốc trong draft (khớp tới mili giây) | Không xuất |
| 16 | Hai mốc lời quá sát, hoặc giọng tràn sang đoạn sau | Lời dài so với khoảng cách giữa hai mốc | Script kiểm trước khi bấm (mã thoát 2) | Khi lập lời: hai mốc cách nhau ≥ 3,1 s và ≥ độ dài giọng ước tính (số tiếng ÷ 4,3) |
| 17 | Mọi phương án đều hỏng | — | Dừng, báo sếp kèm ảnh hoặc số liệu; không buộc tắt ứng dụng nếu chưa được phép | Ghi lỗi mới vào bảng này |

### Cách xử lý lỗi chung (áp dụng cho lỗi chưa gặp)
1. **Dừng thao tác.** Đừng bấm thử liên tục: mỗi lần thử là một lượt và thêm ảnh trong lịch sử.
2. **Xác định trạng thái bằng dữ liệu trước,** chỉ chụp ảnh sau nếu cần. Nguồn dữ liệu: draft, danh sách tiến trình và cửa sổ (PowerShell), tệp ra (ffprobe), bộ nhớ, GPU.
3. **Tìm nguyên nhân gốc**, phân biệt "giao diện không hiện" với "thao tác không có tác dụng". Ví dụ: hộp thoại Xuất trống mà tệp vẫn ra là lỗi hiển thị; tệp không ra là lỗi thao tác.
4. **Chọn đường lui ít rủi ro nhất,** và không làm gì không đảo ngược được. Ví dụ: đổi tên tệp cũ thay vì ghi đè; tạo dự án mới thay vì sửa tệp nội bộ CapCut.
5. **Kiểm kết quả bằng số liệu**, rồi báo cáo kèm nguyên nhân, cách xử lý và điều chưa xác nhận.
6. **Ghi bài học** vào bảng trên và vào nhật ký mức 2 hoặc script, để lần sau không mất công lại.
