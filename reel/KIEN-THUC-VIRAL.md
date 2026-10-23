# Sổ tay: vì sao một video ngắn viral — và cách đo

Trợ lý tự chắt lọc ngày 23/10/2026, sau khi chủ dự án chỉ ra khung 01 bị phân tích sai
("không thể không biết gì mà phân tích được"). **Đọc tệp này trước khi bóc bất kỳ khung
nào.** Không chép tài liệu nguồn — chỉ giữ cái dùng được cho việc của máy: **video ngắn bán
sản phẩm** (reel tự đăng + quảng cáo), không phải video giải trí hay nói chuyện.

## Nguồn đã đọc (23/10/2026)

Điểm vào: GitHub topic [viral-marketing](https://github.com/topics/viral-marketing)
(29 repo; đọc kỹ 6 cái liên quan, bỏ phần bán dịch vụ tăng view).

| Repo | Lấy được gì | Độ tin |
|---|---|---|
| [shixinzhang/tiktok-viral-hooks](https://github.com/shixinzhang/tiktok-viral-hooks) | 4 câu hỏi kiểm mỗi video; tên các dạng hook; "đường cảm xúc theo giây"; mật độ từ khoá | Trung bình — các bài bóc **do AI viết hàng loạt**, thiên về video có lời nói. Dùng khung, không dùng kết luận |
| [kangarooking/contagious-skill](https://github.com/kangarooking/contagious-skill) | **STEPPS** (Jonah Berger, *Contagious*) — 6 chiều chấm 1–5 | Cao về lý thuyết; tác giả skill tự ghi giới hạn: rút từ ca thành công (thiên kiến sống sót), ca Mỹ 2010–2012, không có trọng số giữa 6 chiều |
| [w-avw/instagram-viral-reels-research-claude-skill](https://github.com/w-avw/instagram-viral-reels-research-claude-skill) | Quy tắc **outlier**; "xem từng khung + bóc tiếng, không đọc caption"; thẻ "kịch bản nguyên văn → công thức có chỗ trống → bản của mình" | Cao (phương pháp của Ava Yuergens, có số) |
| [geethikaisuru/viral-hook-writer-for-textheavy-formats](https://github.com/geethikaisuru/viral-hook-writer-for-textheavy-formats) | 12 dạng hook chữ trên hình; **14 kiểu hook chết**; **một clip × nhiều hook, đổi trên MỘT trục** | Cao, tác giả tự ghi "không đảm bảo viral" |
| [lichenyan0901-lgtm/viral-post-distiller](https://github.com/lichenyan0901-lgtm/viral-post-distiller) | Bóc 4 mô-đun (bìa/tiêu đề · cấu trúc · cảm xúc/nhu cầu · "gen viral") rồi **chuyển gen** sang chủ đề mới | Trung bình (Douyin/Xiaohongshu) |
| [rohanvibe/ViralVision-AI-Shorts-Analyzer](https://github.com/rohanvibe/ViralVision-AI-Shorts-Analyzer) | Đo bằng máy: cường độ chuyển động 3 s đầu, **khớp tiếng–hình** (đỉnh âm thanh có trùng điểm cắt không) | Ý tưởng tốt, repo nhỏ, chưa kiểm |

Giấy phép: tiktok-viral-hooks là CC BY-NC-SA — chỉ lấy ý, không chép bài bóc của họ.

## 1. Ba việc một video phải làm, theo thứ tự

1. **Dừng ngón tay (0–1 s).** Quyết định bằng **khung hình đầu**, trước cả chữ. Khung đầu
   phải có *đồ vật / căn phòng / người* mà đúng người xem nhận ra ngay. Khung "đẹp nhưng
   chung chung" (sản phẩm trên nền trắng, nền gradient) chết ở giây đầu.
2. **Giữ lại (1 s → hết).** Bằng **một lời hứa** trong 3 s đầu và **trả lời hứa muộn nhất
   có thể**, giữa chừng có **cú ngắt nhịp** (đổi cảnh, đổi chữ, đổi tiếng) để không ai lướt.
3. **Lan / hành động (sau khi xem).** Thuật toán đọc: xem hết, xem lại, bình luận, chia sẻ,
   lưu. Người xem chỉ làm những việc đó khi có **lý do** — STEPPS trả lời "lý do gì".

## 2. Bộ câu hỏi bóc mỗi video — bắt buộc, theo thứ tự

**A. Đo bằng máy trước** (không đoán):
- Thông số, độ dài **nội dung thật** (bỏ màn kết nền tảng).
- Điểm cắt: ffmpeg `scene` hai ngưỡng → **tự xác nhận từng điểm** ở ≥ 4 khung/giây (đèn bật,
  chớp sáng bị đếm nhầm là cắt).
- Lời theo từ (`cong-cu/boc-loi.py`) + mức âm lượng theo thời gian → biết đâu là giọng, đâu
  là nhạc, **nhạc "vào" ở giây nào**.
- **Khớp tiếng–hình:** cú chốt có rơi đúng chỗ nhạc vào/beat không? (khung 01: lời hát
  6,8 s → đèn 7,9 s).

**B. Bốn câu hỏi** (gốc từ tiktok-viral-hooks, sửa cho video sản phẩm):
1. **3 giây đầu hứa gì?** Viết lời hứa thành một câu.
2. **Hứa được trả ở giây nào?** (payoff). Càng muộn càng giữ chân — miễn đường tới đó không
   chán.
3. **Cái gì giữ người xem giữa chừng?** Liệt kê từng cú ngắt nhịp kèm giây.
4. **Công thức một dòng có chỗ trống**: "[gọi tên người xem] + [vật bí ẩn] → [mở] → [bật trong
   một cảnh liền, khớp nhạc] → [bằng chứng dồn nhanh]".

**C. Đặt tên hook** (một video thường chồng 2–3 dạng):

| Dạng | Nhận ra bằng | Gặp ở |
|---|---|---|
| Khoảng trống tò mò | Nói *có* cái gì đó mà không nói *là gì* ("this") | khung 01, 03 |
| Gọi đích danh, hẹp | "Every Christmas lover", "Christmas Moms" — đúng người thấy mình | 01, 02, 03 |
| Đếm ngược / chờ đợi | "3, 2, 1", hứa một khoảnh khắc sắp tới | 02, 03 |
| Mở quà / lộ hàng | Vải, hộp, giấy che → giật ra | 02, 03 |
| "Store find" | Thấy ở siêu thị, kệ đầy, tự tay lấy | 01, 03 |
| Đảo kỳ vọng | "3 lý do đừng mua…" mà thật ra là khen | (học từ nguồn) |
| Con số cụ thể | Một con số thật làm hết việc | (nguồn) |
| Trước / sau | Một khung tối → sáng, bừa → gọn | thân 01–03 |
| Câu hỏi hai lựa chọn | "Vứt đi hay sạc lại được?" | (nguồn) |

**D. Đường cảm xúc theo giây** — viết thành dòng: *tò mò (0–3) → hồi hộp (3–7) → vỡ oà (7,9)
→ thoả mãn (8–12)*. Chỗ nào phẳng quá 3 s là chỗ người xem lướt.

**E. STEPPS — chấm 1–5, một câu lý do mỗi chiều, chỉ ra chiều yếu nhất:**
- **S** Social currency — chia sẻ cái này làm *người chia sẻ* trông thế nào? (tinh mắt, biết
  quà hay, biết hàng hot)
- **T** Triggers — thứ gì **hằng ngày** nhắc lại sản phẩm? (mùa, nơi chốn, đồ vật)
- **E** Emotion — cảm xúc **kích thích cao** (thích thú, kinh ngạc, buồn cười, lo) mới lan;
  cảm xúc thấp (dễ chịu, hài lòng) không.
- **P** Public — người khác **nhìn thấy** được việc dùng/mua không?
- **P** Practical value — có giúp ai không (ý tưởng quà, mẹo)? → người ta gửi cho bạn bè.
- **S** Stories — thông tin có nằm **trong một câu chuyện** đáng kể lại, và **sản phẩm là
  trung tâm câu chuyện** (không phải chèn vào)?

**F. Tín hiệu thuật toán:** độ dài (ngắn → xem hết, xem lại), có **mồi bình luận** không và từ
khoá là gì, có lý do **lưu / gửi** không, có kết lửng để **xem lại** không.

**G. Chữ trên hình:** 6–10 chữ; câu nói thường (không "giọng quảng cáo"); **khớp với hình**;
không hỏi câu người xem không hỏi; không con số bịa.

**H. Phần LÕI / Phụ** → rồi mới tới tầng 3 (quy tắc trong `CLAUDE.md`).

## 3. Kiểm ngược trên 3 khung đã bóc

| | Khung 01 FrostGlow kệ | Khung 02 FrostGlow người | Khung 03 MerrySpin |
|---|---|---|---|
| Lời hứa 3 s | "thứ mọi người yêu Giáng sinh cần" | "đếm 3-2-1 sẽ lộ ra gì đó" | như 01 + "dưới vải là gì" |
| Trả lời hứa | **7,9 s** (đèn bật) | 3,2 s (lộ hộp) + 7,7 s | 3,8 s (lộ hộp) + **7,8 s** (đèn) |
| Ngắt nhịp | 2,7 (xe) · 3,6 (về nhà) · 6,2 (lắp) · 7,4 (tối) | 2,7 (giật vải) · rồi như 01 | 3,8 (giật vải) · 4,2 (về bếp) · 7,8 (**đổi chữ**) |
| S | 3 — "tôi biết món hot" | 3 | 3 |
| T | 4 — mùa Giáng sinh | 4 | **5** — **tủ lạnh**: mở hằng ngày, máy nằm ngay đó |
| E | 4 — kinh ngạc lúc tường sáng | 4 | 3 — vòng đèn nhỏ, ít "oà" hơn |
| P | 3 — kệ siêu thị đầy = "nhiều người mua" | 2 | 3 |
| P (thực dụng) | 3 — ý tưởng trang trí/quà | 3 | 4 — quà tặng rõ ràng |
| S (chuyện) | 4 — hành trình mua → bật | 3 | 3 |
| Mồi tương tác | không | không | **"Comment MERRY"** (= tên hãng) |
| Chiều yếu nhất | Public / không mồi bình luận | Public | Emotion (cú bật nhỏ) |

**Áp vào Santa Spins:** điểm mạnh tự nhiên là **T** (gắn tủ lạnh = nhắc mỗi ngày) và **P thực
dụng** (quà Giáng sinh). Điểm cần bù là **E**: vòng đèn nhỏ hơn bức tường bông tuyết → cú bật
phải dựa thêm vào **tiếng nhạc bắt đầu phát** (chức năng thật của máy) và cảnh đủ tối.

## 4. Luật làm hook và biến thể (từ viral-hook-writer)

- **Một thân × nhiều hook** là cách rẻ nhất để tìm hook thắng — đúng như FrostGlow làm
  (khung 01 vs 02). Khớp quyết định tách HOOK/THÂN.
- Một lô hook **chỉ đổi trên MỘT trục** (giọng điệu · ai nói · độ cụ thể). Đổi lung tung
  thì video thắng không dạy được gì.
- **Hook chết** hay gặp nhất với hàng của mình: câu "giọng quảng cáo" (*Unlock the magic of
  Christmas*), khung đầu là sản phẩm trên nền trắng, câu hỏi không ai hỏi (*Looking for the
  perfect gift?*), con số không thật, chữ và hình nói hai chuyện khác nhau, câu giải thích
  ("In this video I'll show you…").
- **Trend bão hoà:** cùng một câu ("Every Christmas lover NEEDS this") đã có ≥ 2 hãng dùng
  (khung 01, 03). Vào sớm thì ăn, vào muộn thì hết. Dấu hiệu: lượt xem đỉnh giảm trong khi
  số bài cùng kiểu không giảm.

## 5. Có thật là "video viral" không — quy tắc outlier

Video đáng học là video **tự nó** kéo người xem, không nhờ tài khoản lớn:
**≥ 700.000 lượt xem VÀ ≥ 5 lần số người theo dõi** của kênh (phương pháp Ava Yuergens).
Chủ dự án đã chốt bằng chứng viral không bắt buộc (reel đưa vào đã chọn lọc) — nên đây là
**bộ lọc tuỳ chọn** khi máy tự đi tìm reel, không phải điều kiện nhận khung.

Một dấu hiệu khác cho video **quảng cáo**: hãng chạy **nhiều hook trên cùng thân** (khung
01 vs 02) = họ đang trả tiền cho nó → thân đó bán được.

## 6. Giới hạn của chính sổ tay này

- Viết từ ca thành công → thiếu ca thất bại để đối chứng. Mỗi video mình làm ra nên ghi lại
  lượt xem thật (chủ dự án tự đăng) để sửa sổ tay bằng số của chính mình.
- STEPPS không có trọng số; điểm 1–5 ở mục 3 là **phán đoán của trợ lý**, không phải số đo.
- Cập nhật tệp này mỗi khi một video của máy thắng hoặc thua rõ ràng.
