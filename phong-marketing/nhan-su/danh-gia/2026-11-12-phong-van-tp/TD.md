# Phỏng vấn Thợ dựng — 12/11/2026

Em trả lời anh bốn câu dưới đây. Câu nào thiếu dữ liệu thì em vẫn chọn một hướng, theo khuôn phán đoán của luật chung.
Đường dẫn ghi tương đối từ `phong-marketing/`.

### TD-1
Trả lời: Lô sau em xuất **1080×1920 ngay từ đầu**, không đợi `check.py` nhắc nữa. Anh cũng đã để mặc định "Có" cho câu xuất lại 1080 rồi. Cụ thể em làm khác bốn chỗ:
1. **Lấy hình từ bản gốc to nhất, cắt rồi thu nhỏ về 1080×1920.** Video shop có bản 4K 2160×3840. Lô phao em cắt từ 4K rồi thu về 720, lô sau thu về 1080 thì nét hơn mà không mất gì. Clip Muse chỉ có 704×1248 hoặc 720×1280, buộc phải phóng khoảng 1,5 lần (em dùng `lanczos`). Phóng như vậy **không thêm chi tiết**, chỉ để qua chuẩn và để chữ cùng thẻ kết vẽ ở 1080 cho nét. Em sẽ ghi rõ đoạn nào là hình phóng, để anh và Đạo diễn biết chỗ nào có thể hơi mềm.
2. **Đổi toạ độ an toàn và cỡ chữ theo khung mới.** Dải chữ ở khung 1080 là y 269–1248, x 180–900 (khung 720 là y 180–832, x 120–600). Vẽ chữ ở 1080 thì cỡ phải nhân 1,5. Cỡ chữ thân ở lô phao là ~36 px/720, Trưởng phòng đã chê hơi nhỏ trên điện thoại, nên lô sau em không nhân 1,5 cho đủ mà để chữ **to hơn mức tương đương**: ít nhất ~60 px ở khung 1080.
3. **Sửa đích kiểm trong `qc.py` và bảng kiểm** sang `h264,1080,1920,30/1,yuv420p`. Nếu không sửa, máy sẽ báo sai ngược. Sau đó em chạy lại `check.py --platform tiktok` (và `reels` nếu đăng Facebook) trên từng tệp, đích là **0 trượt và 0 cảnh báo cỡ**.
4. Mọi thứ đi qua một biến cỡ khung trong `dung.py`, để đổi qua lại giữa 720 và 1080 chỉ mất một dòng.

Sự thật: lần chạy `check.py` lô phao ra 0 trượt và 2 cảnh báo, một là 720×1280 < 1080 (00-dieu-phoi dòng 19). Việc lô sau đã chốt là "Thợ dựng xuất 1080×1920" (cùng dòng). BAN-TRINH câu 4 có mặc định "Có, nếu sếp chưa đăng".
Phán đoán: nghiêng về chỗ xuất 1080 **giúp thật cho đoạn cắt từ video shop 4K, còn với đoạn Muse thì gần như không** · ~70 % · vì Muse ra 704–720 px, phóng không tạo chi tiết · đổi ý nếu soi khung cạnh nhau thấy đoạn Muse phóng nhoè rõ hơn bản 720 (nhòe do phóng lanczos kèm nén lại).
Kiểm bằng: `look.py H1-1080.mp4 --compare H1-720.mp4 --at 1.4` (đoạn Muse) và `--at 3.5` (đoạn shop) · ngưỡng: đoạn shop nét hơn thấy bằng mắt, đoạn Muse không tệ hơn · hạn: ngay bản đầu tiên của lô sau.
Đã đọc: `khach-hang/17fishing/viec/2026-11-11-phao-ro-diec-qc/00-dieu-phoi.md` dòng 16 (bản 4K 2160×3840), 18 (chữ ~36 px/720 hơi nhỏ), 19 (cảnh báo `check.py`, việc lô sau) · `…/BAN-TRINH.md` dòng 125 · `…/10-td-dung.md` dòng 17, 44, 68 (cắt từ 4K, phóng 1,24×) · `nhan-su/viec/td-dung-qc.md` dòng 35–36 (dải an toàn 720/1080) · `nhan-su/vai/tho-dung.md` dòng 230 (đích kiểm 720 hoặc 1080), 428 (câu mở 12.3) · `du-an-phong/GIAI-DOAN-0.md` dòng 183 (Muse 704×1248/720×1280 phải phóng) · `xuong/CONG-CU.md` dòng 20 · `~/.claude/skills/ffmpeg-skill/SKILL.md` (grep `check.py`, `fit.py --height 1080`).

### TD-2
Trả lời: Lệch 1,5 s thì vượt ngưỡng 1 s của luật, nên trước khi xuất bản cuối em làm theo thứ tự:
1. **Tìm xem lệch so với cái gì.** Kịch bản không đòi chữ vào ở một giây cố định. Nó đòi chữ "Cá cắn là đuôi chuyển đỏ" **hiện đúng khung đỏ đầu tiên**. Em đo lại % điểm ảnh đỏ trên tệp ra, khung nào có R > 200, G < 110, B < 110 vượt nền ≥ 4 lần thì là khung đỏ đầu, rồi so với giây chữ vào.
   - **Chữ vào muộn hơn khung đỏ** thì đó là lỗi dựng của em. Em kéo chữ về đúng khung đỏ (±1 khung), dựng lại bằng `dung.sh`, đo lại. Lỗi này em tự sửa, không cần ai duyệt.
   - **Chữ vẫn trùng khung đỏ, chỉ là cú đỏ trong clip rơi muộn 1,5 s so với giây kịch bản ghi** (clip Muse hay lệch mốc ~1 s) thì chữ giữ nguyên theo khung đỏ. Lúc đó chính cú bật lệch kịch bản, và em sang bước 2.
2. **Ghi bảng "Lệch kịch bản"** trong `DUNG.md`, đủ ba cột: dòng gốc (giây, chữ), dòng dựng (giây thật, khung đỏ đo được), vì sao. Em ghi kèm hệ quả: cú trả lời muộn hơn thì người xem phải chờ lâu hơn, và có thể có khoảng trống > 2 s không có lý do ở lại.
3. **Trả Biên kịch xem trước khi xuất bản cuối.** Sếp chốt điều này ngày 12/11, em không tự quyết. Biên kịch có thể chọn rút hook hoặc dời chữ trước đó cho khít, hoặc báo sinh lại clip. Trong lúc chờ em vẫn làm đủ QC trên bản nháp, để Biên kịch duyệt xong là xuất được ngay.

Em cũng nhận một điểm hụt của chính mình ở lô phao. Kịch bản đặt cú lộ ở ~6,1 s, còn bản dựng vào ở 5,000 s (H1) và 5,033 s (H3), tức sớm ~1,1 s, lệch hơn 1 s. Lúc đó em có ghi mốc thật trong phiếu nhưng **không lập bảng lệch và không trả Biên kịch**. Cũng ở lô đó em bỏ "Nhiều màu là đang chờ" mà không hỏi. Từ lô sau, luật 5 có hiệu lực thì em làm đủ.

Đã đọc: `nhan-su/viec/td-dung-qc.md` dòng 24–26 (luật 5: lệch > 1 s → bảng "Lệch kịch bản" + trả Biên kịch, sếp chốt 12/11) · `khach-hang/17fishing/viec/2026-11-11-phao-ro-diec-qc/05-bk-kich-ban.md` dòng 16 (chữ "hiện đúng khung đỏ đầu tiên", cú lộ ~6,1 s), 44 · `…/10-td-dung.md` dòng 19–20 (5,000 / 5,033), 25 (cách đo % đỏ), 38 · `nhan-su/vai/tho-dung.md` dòng 198 (Muse lệch ~1 s), 261 (ô trống > 2 s) · `thu-vien/so-tay/QUAY-THAT.md` mục F4 bước 1 (dòng ~291).

### TD-3
Trả lời: Anh đã chốt ngày 11/11 là không kiểm quyền nữa, nên em **vẫn dùng nhạc đó và không đem chuyện quyền ra hỏi lại**. Anh hỏi thẳng thì em trả lời bằng phán đoán:

Sự thật: nhạc nền là rãnh tiếng có sẵn trong video shop tự quay (−8 LUFS, phách đều ~150 BPM, có vạch giai điệu). Em **chưa nghe được** vì máy không có loa, nên chưa biết tên bài và chưa biết có lời hay không (10-td-dung dòng 51, 58). Shop đã tự đăng video gốc với nhạc này. Phía TikTok, thư viện nhạc chung không dùng cho doanh nghiệp, quảng cáo phải dùng nhạc Commercial (gói §3.7).
Phán đoán: nghiêng về **không bị tắt tiếng khi đăng thường** · ~60 % · vì đây là video của chính shop, đã đăng một lần, và dạng nhạc giống nhạc nền không lời phổ biến. Nhưng **khi chạy tiền thì rủi ro cao hơn rõ**, em nghiêng ~55 % là TikTok sẽ từ chối hoặc đòi đổi nhạc nếu bài không nằm trong thư viện Commercial. Còn Facebook tắt tiếng hay không phụ thuộc bài có nằm trong kho nhận diện bản quyền của họ không (kiến thức chung, lý do yếu). Đổi ý nếu anh nghe thấy lời hát, hoặc nhận ra một bài thịnh hành Douyin/TikTok: khi đó em nghiêng ~70 % là Facebook sẽ tắt tiếng hoặc giảm phân phối.
Kiểm bằng: (1) anh nghe 5 giây đầu bản H1, mất ~1 phút. (2) Đăng thường một bản và xem trong 24 h có thông báo "âm thanh đã bị tắt / hạn chế" trên Facebook hay TikTok không · ngưỡng: có bất kỳ thông báo nào thì đổi nhạc · hạn: trước khi chạy tiền, chậm nhất 14/11/2026.
Đường lui đã sẵn: đổi nhạc chỉ là thay nguồn `[0:a]` trong `dung.py` rồi chạy `bash dung.sh`. Bài mới có thể là tiếng gốc S1, hoặc nhạc Commercial khi đăng TikTok.

Đã đọc: `CLAUDE.md` (phòng) dòng 89 (sếp chốt 11/11 bỏ kiểm quyền, rủi ro tắt tiếng đã nêu một lần) · `nhan-su/vai/tho-dung.md` dòng 65 (nguyên tắc 9), 170 (TikTok CML, thư viện chung không cho doanh nghiệp) · `khach-hang/17fishing/viec/2026-11-11-phao-ro-diec-qc/10-td-dung.md` dòng 7, 51, 58, 63, 76 · `…/BAN-TRINH.md` dòng 99, 124.

### TD-4
Trả lời: Đây là dấu hiệu **đỏ đã cháy sang cam**. Em **không chỉnh màu để che**, vì sai màu là nói sai về sản phẩm, và cá cắn thì mọi đoạn phải ra đỏ. Em làm như sau:
1. **Dừng chỉnh màu cảnh đó, ghi số.** Em ghi giây hoặc khung, số và % điểm ảnh R = 255 & G > 150 trong vùng đuôi (ở đây 3 %). Kèm theo là số điểm ảnh đỏ đúng (R > 200, G < 110, B < 110) so với nền, và góc hue vùng đuôi so với khung thật `that-ca-can-do-2.jpg`. Em xuất một ảnh cắt vùng đuôi để Đạo diễn nhìn.
2. **Báo Đạo diễn quyết.** Em đề xuất quay lại với phơi sáng hạ −2 đến −3 EV, khoá cân trắng cố định ~5000–5600 K, không để AWB. Theo phân vai, em chỉ đo, quyết dùng hay quay lại là việc Đạo diễn.
3. **Không làm mấy việc "cứu"**: không đẩy bão hoà đỏ, không nâng mức đen mặt nước đêm, không dùng LUT. Kênh R đã chạm trần thì dựng không lấy lại được tỉ lệ R:G.
4. Trong lúc chờ quyết, em không đặt chữ "Cá cắn là đuôi chuyển đỏ" lên cảnh đó, vì chữ khẳng định màu đỏ mà hình lại ra cam.

Phán đoán cho Đạo diễn (nội bộ):
Sự thật: luật chỉnh màu ghi R = 255 & G > 150 là cháy sang cam. Ngưỡng 150 là phán đoán, chưa chỉnh theo đo thực. Chưa có cảnh quay thật nào để làm mốc.
Phán đoán: nghiêng về **3 % này là lõi bóng LED bị chói, chưa làm hỏng cú đỏ** · ~60 % · vì 3 % nhỏ, thường tụ ở tâm từng hạt sáng, quanh đó vẫn có thể đỏ đúng · đổi ý nếu ảnh cắt cho thấy viền hạt sáng ngả cam hoặc vàng, hoặc hue vùng đuôi lệch > ~10° so với khung thật, hoặc số điểm ảnh đỏ đúng không vượt nền ≥ 4 lần. Khi đó là cháy thật và phải quay lại.
Kiểm bằng: đo hue và bão hoà vùng đuôi (`signalstats`/`vectorscope`, ngoại lệ ffmpeg gốc) so với `that-ca-can-do-2.jpg`, cộng xem ảnh cắt trên điện thoại · ngưỡng: lệch ≤ 10° và người xem gọi là "đỏ" chứ không phải "cam" · hạn: trước khi đặt chữ, cùng ngày nhận cảnh. Dù kết quả thế nào em vẫn báo con số, và người quyết là Đạo diễn.

Đã đọc: `nhan-su/viec/td-chinh-mau.md` dòng 16 (luật 1), 19 (luật 4 cảnh đêm), 20 (luật 5 lệch hue > 10°), 41 (thất bại khi cứu đỏ cháy) · `thu-vien/so-tay/QUAY-THAT.md` mục F1 (dòng ~250–258: R chạm trần → cam, hạ phơi sáng −2…−3 EV), F2 (đêm khoá 5000–5600 K), F3 (không LUT, không nâng đen), F4 cách đo "đỏ đúng" bước 1–3 (dòng ~291–293) · `nhan-su/vai/tho-dung.md` dòng 40 (Thợ dựng làm và đo, Đạo diễn quyết) · `khach-hang/17fishing/san-pham/phao-ro-diec.md` dòng 50, 110, 126 (cá cắn: mọi đoạn ĐỎ; khung đỏ sạch nhất).
