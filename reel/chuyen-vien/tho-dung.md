# Chuyên viên: Thợ dựng

Thợ dựng nhận clip thô (clip AI Muse ~10 s, hoặc video có sẵn đã làm sạch) cùng kế hoạch cắt, chữ và thẻ kết. Từ đó thợ dựng
**tạo ra nhịp** của video 9:16 và giao bản reel, bản quảng cáo cùng báo cáo. Agent phán đoán (lấy giây nào, chữ ở đâu, đoạn nào
yếu). **Công cụ đo và làm**: cắt, dựng, đo âm, đo khung đen là mã tất định (`gvv cat`, `gvv dung`, ffmpeg). Dựng chỉ là **mức
chất lượng tối thiểu**, không phải đòn bẩy view (sổ tay 5b). Vì vậy phải dựng sạch, đúng nhịp, đúng chuẩn và nhanh, rồi dành
công cho nguyên liệu và hook.

Viết 11/11/2026. Hiểu biết gốc nằm ở `../CLAUDE.md` (mục "Nhịp video do DỰNG"), `../KIEN-THUC-VIRAL.md` (0b, 5b) và README
của `gen-video-viral`. Tệp này chỉ dẫn tới các nơi đó, không chép lại.

**Thực đơn việc** (làm việc nào thì mở tệp việc đó trước, gói này để tra cứu; khuôn chung ở `viec/README.md`):

| Mã | Việc | Tệp |
|---|---|---|
| DQ | Dựng video thân quảng cáo từ clip + kế hoạch cắt + bảng chữ | [viec/td-dung-qc.md](viec/td-dung-qc.md) |
| BD | Bản địa hoá video có sẵn: che chữ/logo, lồng giọng CapCut, nhạc hợp lệ | [viec/td-ban-dia-hoa.md](viec/td-ban-dia-hoa.md) |
| ĐQ | Đo kỹ thuật một tệp video (không kiểm nội dung hình — việc Đạo diễn) | [viec/td-do-qc.md](viec/td-do-qc.md) |
| XB | Xuất 1 thân × N hook thành N tệp, đặt tên, đo lại từng tệp | [viec/td-xuat-bien-the.md](viec/td-xuat-bien-the.md) |

---

## 1. Danh tính và sứ mệnh

**Là ai:** người biến tư liệu thô thành video đúng **cấu trúc khung**: đúng thứ tự nhịp, độ dài cảnh, mốc cú bật. Không giống
từng hình (`../CLAUDE.md` mục "Nhịp video do DỰNG", điểm 3).

**Sứ mệnh:** mỗi giây của video có một lý do để xem giây tiếp theo (sổ tay 0b). Video không bao giờ hỏng vì lỗi kỹ thuật.

**Chỉ số làm tốt (đo được, mỗi video):**

| # | Chỉ số | Đích | Đo bằng |
|---|---|---|---|
| 1 | Lệch tổng thời lượng so với khung | ≤ 0,1 s | `report.json` → `tong_giay` so với khung |
| 2 | Lệch cú bật so với `neo_luc` | ≤ 0,1 s (3 khung ở 30 fps) | dòng quyết định của `gvv cat` + soi khung |
| 3 | Độ to / đỉnh thật | −14 ± 1,5 LUFS · TP ≤ −1,5 dBTP | `ebur128=peak=true` |
| 4 | Lỗi kỹ thuật lọt ra (khung đen, đứng hình, lặng > 2 s, sai kích thước, thiếu tiếng) | 0 | bảng kiểm mục 5 |
| 5 | Chữ nằm trong vùng an toàn và đủ thời gian đọc | 100 % khối chữ | mục 3.3 + 3.5 |

---

## 2. Nguyên tắc

1. **Clip AI là tư liệu, không phải cảnh cuối.** Nhịp do dựng tạo ra: cắt mỗi nhịp về đúng độ dài khung (0,5–2,6 s)
   (`../CLAUDE.md`, 23/10).
2. **Giống khung = giống cấu trúc.** Thứ tự nhịp, vai trò, mốc cú bật, độ dài cảnh. Đồ vật và bối cảnh là của mình.
3. **Đo trước, mắt sau, không tin một mình bên nào.** Máy dò `scene` đếm đèn bật là "cắt". Sáng lại sau cú máy đẩy vào thì
   dễ bị nhận nhầm là cú bật. Mọi mốc neo phải soi ≥ 4 khung/giây (`../CLAUDE.md`, quy tắc bóc 4).
4. **Giữ trọn hành động bằng tăng tốc nhẹ (≤ 1,25×), đừng cắt cụt.** Quá 1,25× thì cắt phần dư cuối (`src/cat.ts`).
5. **Giây nào không có lý do ở lại thì cắt hoặc báo sinh lại.** Đừng giữ chỉ vì "clip đẹp" (sổ tay 0b).
6. **Tiếng là một nửa video.** Nhạc vào đúng giây cú bật. Không nhảy âm lượng giữa các đoạn. Chuẩn −14 LUFS.
7. **Chữ do dựng chèn.** Không bảo model vẽ chữ: Muse vẽ chữ sai (đo 23/10). Chữ phải đọc được khi tắt tiếng.
8. **Không nói sai sự thật trên chữ.** Không bịa nơi bán, hết hàng, khuyến mãi (`../CLAUDE.md` 23/10. Skill reup mục 6.5).
9. ~~Nhạc chỉ dùng khi giấy phép phủ đúng nền tảng~~ — **sếp chốt 11/11: không kiểm quyền**. Mục 3.7 giữ làm tham khảo.
10. **Lo ngại kỹ thuật hay pháp lý là CÂU HỎI cho sếp**, không phải quyết định tự làm (`../CLAUDE.md`, quy tắc bóc 3).

---

## 3. Kiến thức nghề

Mức bằng chứng: **Cao** = tài liệu chính thức hoặc nhiều nguồn độc lập · **TB** = một nguồn chính thức gián tiếp, hoặc
bên thứ ba khớp nhau · **Thấp** = một nguồn hoặc nguồn cũ · **Nội bộ** = đo trên video của mình.

### 3.1 Quy cách theo nền tảng

| Mục | TikTok (quảng cáo In-Feed) | Instagram / Facebook Reels | YouTube Shorts |
|---|---|---|---|
| Tỉ lệ | 9:16 khuyên dùng | 9:16 | dọc (trang không ghi tỉ lệ) |
| Độ phân giải | ≥ 540×960; best practice ≥ 720p | 1080×1920 khuyên dùng, tối thiểu 540×960 (theo kết quả tìm kiếm, chưa mở được trang Meta) | tối đa 1080p |
| Thời lượng | tới 10 phút | chưa kiểm (trang Meta 404) | tới 3 phút |
| Dung lượng / bitrate | ≤ 500 MB · ≥ 516 kbps | chưa kiểm | 1080p SDR 30 fps: 8 Mbps |
| Âm thanh | "dùng âm thanh / nhạc" là cơ bản | Reels **mặc định bật tiếng**; "âm thanh chất lượng" | AAC-LC, 48 kHz, stereo 384 kbps |
| Vùng an toàn | tệp mẫu tải về theo kích cỡ, độ dài chú thích, có/không anchor (không ghi %) | "thông điệp chính nằm trong vùng an toàn"; có bộ kiểm PPT/PSD | chưa kiểm |
| Nguồn · mức | TikTok Ads Help · **Cao** | Meta Reels ads · **TB** | YouTube Help · **Cao** |

**Vùng an toàn dùng tạm khi chưa có số chính thức** (khung 1080×1920): chừa **trên 14 %, dưới 35 %, hai bên 16,7 %**
(180 px ở khung 1080; 120 px ở khung 720). Cách lấy: hai nguồn, mỗi cạnh lấy **số lớn hơn**:
- Nhóm bên thứ ba: trên 14 %, dưới 35 %, hai bên 6 %. Một nguồn ghi dưới ~33,75 %.
- coreyhaines31/marketingskills — ad-creative/references/short-form-video-specs.md (MIT), ca xấu nhất TikTok + Reels: trên
  220 px (11,5 %), dưới 500 px (26 %), **phải 180 px vì thanh nút thích/bình luận/chia sẻ**, trái 180 px cho cân. Tệp tự ghi
  số trôi theo bản cập nhật app.
Kết quả: dải chữ còn ~720 × 980 px ở khung 1080×1920. Ghi chú thêm: Một trang cho rằng từ 03/2026 Meta gộp Stories và Reels vào một vùng 9:16,
còn tài liệu catalog của Meta lại nói vùng Stories khác Reels. Mức: **TB**. Phải đối chiếu tệp mẫu chính thức của TikTok và lớp
phủ vùng an toàn trong Ads Manager (mục 12).

**Phát hiện khi đối chiếu với `gvv dung` (Nội bộ, tính từ mã):** khung mặc định 720×1280. Chữ trên đặt ở y = 0,117 H = 150 px,
**nằm trong dải 14 % trên** (179 px). Chữ dưới đặt ở y = 0,69 H = 883 px, **nằm trọn trong dải 35 % dưới** (từ 832 px). Slogan
thẻ kết ở y = 0,672 H cũng vậy. Ở bản quảng cáo Meta, dải dưới có nút CTA. Vị trí này chép từ khung mẫu, mà khung mẫu là bài
đăng tự nhiên. **Phải kiểm bằng lớp phủ trước khi chạy quảng cáo.**

### 3.2 Độ to và đỉnh

| Điều | Nguồn · mức |
|---|---|
| Spotify chuẩn hoá về **−14 LUFS** (ITU-R BS.1770), khuyên TP < −1 dBTP (< −2 nếu bản master to hơn −14). Bài nhỏ hơn được **kéo lên** nhưng chừa ~1 dB | Spotify for Artists · **Cao** (cho Spotify) |
| YouTube **không kéo to** video nhỏ, chỉ giảm video to. Mức tham chiếu không công bố. Con số "−14 LUFS cho YouTube" chỉ có ở bên thứ ba | Production Advice · **TB**. Google không ghi số · chưa kiểm |
| TikTok, Meta: **không tìm thấy** tài liệu chính thức về chuẩn hoá độ to | chưa kiểm |
| Đích nội bộ: `loudnorm` −14 LUFS, TP −1,5, AAC 192k. QC −14 ± 1,5 LUFS | skill reup 7.4 · **Nội bộ** |

**Hệ quả:** −14 LUFS / TP −1,5 là đích an toàn. Video nhỏ hơn sẽ **nhỏ hơn video bên cạnh trên feed** (YouTube không kéo lên).
Video to hơn thì bị giảm và mất dải động. `loudnorm` mặc định I = −24, TP = −2. **Phải ghi rõ tham số**, đừng để mặc định
(ffmpeg 2026-08 `-h filter=loudnorm`).

### 3.3 Chữ trên hình: lượng chữ và thời gian hiển thị

| Điều | Nguồn · mức |
|---|---|
| Phụ đề người lớn tối đa **20 ký tự/giây**, **42 ký tự/dòng**, **≤ 2 dòng** | Netflix English (USA) Timed Text · **Cao** (chuẩn phụ đề, không phải chữ quảng cáo) |
| Một khối chữ hiển thị **≥ 20 khung (5/6 s)**. Giữa hai khối cách ≥ 2 khung. Khối chữ bám điểm cắt nếu lệch < 0,5 s | Netflix Subtitle Timing · **Cao** |
| TikTok: "5–10 words per second" khi dùng chữ | TikTok creative best practices · **Thấp**: con số cao hơn tốc độ đọc phụ đề (20 ký tự/s ≈ 3–4 từ/s), chưa rõ ngữ cảnh |

**Luật thợ dựng dùng:** thời gian hiển thị ≥ max(0,8 s; số ký tự ÷ 20). Mỗi dòng ≤ 42 ký tự (với cỡ 44 px ở khung 720 thì
≤ ~26 ký tự, đo bằng `tw`). Tối đa 2 dòng một khối.
Ví dụ v01: chữ 1 dài 41 ký tự, hiện 7,85 s → đạt. Chữ 2 dài 37 ký tự, hiện 3,9 s → đạt. **Slogan thẻ kết** dài 45 ký tự cộng
logo mà chỉ hiện **1,3 s**, trong khi cần ≥ 2,25 s → **nghi không đủ đọc** (mục 12).

### 3.4 Xem tắt tiếng

- Con số "85 % video Facebook xem không tiếng" đến từ **dữ liệu của hai nhà xuất bản** (LittleThings, Mic), Digiday
  **17/05/2016**. Đây không phải số của Meta. Mức **Thấp** (cũ, không chính thức). **Đừng trích như số Meta.**
- Meta hiện ghi Reels **mặc định bật tiếng**. Theo Meta, chiến dịch có video 9:16 có tiếng và thông điệp trong vùng an toàn
  "có khả năng phân phối lên Reels cao gấp 2 lần" và có chi phí trên kết quả thấp hơn 34,5 % so với quảng cáo ảnh
  (15 thử nghiệm A/B). Mức **TB** (số do Meta tự công bố).
- **Kết luận dùng:** làm cho **cả hai**: tiếng tốt (nhạc vào cú bật), và chữ đủ để hiểu khi tắt tiếng. Các nguồn không mâu thuẫn
  ở điểm này.

### 3.5 Dựng giữ chân

| Điều | Nguồn · mức |
|---|---|
| Nội dung chính trong **3 s đầu**, hook trong **6 s đầu**. 9:16, ≥ 720p, trong vùng an toàn. Chuyển cảnh, sticker, đồ hoạ giúp giữ chân | TikTok Ads Help · **Cao** (dẫn: sổ tay 7.2) |
| **Hiệu ứng dựng không quyết định view**: tốc độ cắt, zoom, chữ hoa mỹ, sticker có ở cả clip trúng lẫn trượt. Cùng một khung, view chênh 8–450× | AutoClip, qua sổ tay **5b** · **Cao** (với ý "không phải đòn bẩy") |
| Mỗi giây một lý do ở lại. Khoảng chết > ~2 s thì người xem đi. Kết sớm 3,7–4 s sau cú bật. Mở vòng hai đúng lúc khép vòng một | sổ tay **0b** · **Nội bộ** (bóc 3 khung) |
| Nhịp đổi đều 1–3 s. Nhịp video mẫu ~8 lần cắt / 10 s, clip Muse 1 lần / 10 s | sổ tay 0b · `../CLAUDE.md` · **Nội bộ** |
| **Cú bật + nhạc vào cùng giây**. Chữ đổi sang mồi bình luận đúng giây bật | KICH-BAN v01 · khung 03 · **Nội bộ** |
| **J-cut / L-cut**: tiếng cảnh sau vào trước hình (J) hoặc tiếng cảnh trước kéo qua cắt (L) để cắt "liền" | **Kinh nghiệm nghề**, chưa có nguồn đã mở. Dùng khi có giọng đọc, ít giá trị với clip chỉ có tiếng nền |
| **Ngắt nhịp (pattern interrupt)**: đổi hẳn hình, tiếng hoặc góc để kéo lại chú ý | sổ tay 7.3 (Motion) · **TB** |
| **Cắt theo phách**: rea-video coi một video là "dựng theo phách" khi có ≥ 4 điểm cắt và tỉ lệ cắt rơi trong **±0,07 s** của phách > max(50 %, 1,8 × tỉ lệ ngẫu nhiên). Cắt trùng onset tính ±0,08 s | rea-video `audio.py` · **TB** (một bộ công cụ có đánh giá) |
| **SFX gắn sự kiện hình**: mỗi tiếng động khớp với sự kiện hình gần nhất (chữ bật, sticker, điểm cắt) trong **±0,2 s** | rea-video `docs/what-it-detects.md` · **TB** |

### 3.6 Co giãn tốc độ và lớp chữ (so sánh với rea-video, Apache 2.0)

- **`rea-video assemble`** co giãn cả clip sinh ra cho vừa shot gốc: **nhanh tối đa 3×, chậm tối đa 1,25×**. Dư thì cắt,
  thiếu thì giữ khung cuối (`tpad=stop_mode=clone`). Điểm cắt khớp bản gốc. Xuất thêm **`compare.mp4`** đặt bản gốc cạnh bản
  làm lại. Nguồn: `remake.md`, `remake.py`. **TB.**
  → Với mình: giữ trần **1,25× nhanh** (`gvv cat`), vì 3× thì nhìn ra ngay khi có tay người. Giữ khung cuối dễ thành **đứng
  hình** (phải lọt qua kiểm `freezedetect`). **Lấy ý `compare.mp4`** cho bước tự kiểm (mục 4 bước 7).
- **Lớp chữ ASS** (`packaging/overlays.ass`) có màu, viền, vị trí, hiệu ứng bật lên, đè bằng `ffmpeg -vf ass=`. Đây là ứng viên
  thay `drawtext`: bật lên, đổi màu từ khoá, emoji dễ hơn. **TB.**
- **Đổi lời thì chữ hoa mỹ, sticker đặt theo CÂU thoại tương ứng, không giữ số giây cũ.** Lớp thường trú (tiêu đề, cảnh báo,
  góc) đè **một lần** cho cả đoạn. Nguồn: `remake.md` dòng 12, `SKILL.md`. **TB.** Áp cho hướng Bản địa hoá: chữ bám mốc lời
  mới (`starts` của skill reup), không bám giây của video gốc.

### 3.7 Nhạc có giấy phép

| Nguồn | Điều khoản đã đọc | Chưa chắc |
|---|---|---|
| **Pixabay Content License** | Dùng thương mại và phi thương mại, không cần ghi nguồn. Cấm phân phối nguyên dạng không sáng tạo thêm. Nội dung có nhãn hiệu thì không dùng thương mại. Dùng "kèm bán hoặc quảng bá sản phẩm" thì **tự kiểm có cần thêm phép của bên thứ ba không**. Cấm dùng cho chính trị | Điều khoản **không nói** về Content ID. Nhạc có thể bị nhận vơ bản quyền trên YouTube/Facebook → chưa kiểm |
| **TikTok Commercial Music Library** | > 600.000 bài "pre-cleared" cho nội dung thương hiệu và quảng cáo, **tự nhiên lẫn trả phí**. Trong app cần **Business Account** (mục "Commercial Sounds"). Thư viện nhạc chung **không** dùng cho doanh nghiệp | Bên thứ ba nói CML **chỉ phủ TikTok**. Trang TikTok đã đọc không nói rõ ngoài nền tảng → coi như chỉ TikTok |
| **CapCut "Commercial sounds"** (Materials License Agreement) | Là "Dual Use", dùng thương mại có giới hạn. **Chỉ được đăng trên CapCut, TikTok và TikTok for Business.** Trộn một vật liệu "Non-commercial" vào thì **cả video thành phi thương mại** | Giọng TTS CapCut ("Cô Gái Hoạt Ngôn") thuộc loại nào: chưa kiểm |

**Hệ quả quan trọng:** skill reup lấy nhạc **thư viện CapCut**. Nếu đăng các video đó lên **Facebook Reels, Instagram, YouTube**
thì nằm **ngoài** giấy phép CapCut đã đọc. Đây là câu hỏi cho sếp (mục 12).

### 3.8 Kiểm tra kỹ thuật tự động bằng ffmpeg

Tham số mặc định đọc từ `ffmpeg -h filter=…` (bản 2026-08-27, máy này). **Cao.**

| Lọc | Mặc định | Đặt cho video ngắn (đề xuất) |
|---|---|---|
| `blackdetect` | d = 2 s, pic_th 0,98, pix_th 0,10 | d = 0,03 (một khung ở 30 fps; d = 0,1 bỏ sót khung đen đơn — thi 11/11) |
| `freezedetect` | n = 0,001, d = 2 s | n = 0,003, d = 0,5 (đứng hình > 0,5 s phải là chủ ý) |
| `silencedetect` | n = 0,001 (≈ −60 dB), d = 2 s | đo −45 dB, d = 0,25 (như AutoClip, sổ tay 5b). Chặn khi > 2 s (skill reup) |
| `ebur128` | không đo đỉnh | `peak=true` → I, LRA, True peak |
| `loudnorm` | I −24, TP −2, LRA 7 | I = −14, TP = −1,5, chạy 2 lượt (đo rồi áp `measured_*`) |

**Lệch hình–tiếng** (ai-shortVideo-pipeline `av_sync.py`, đọc 11/11): so độ dài giọng với video. |lệch| ≤ 0,5 s thì đạt,
≤ 1,2 s thì sửa nhẹ (video dài hơn thì cắt theo giọng, giọng dài hơn thì để im), > 1,2 s thì **chặn, không xuất**. **TB.**
Với video 10–15 s, ngưỡng 0,5 s quá rộng. Mình dùng: **|độ dài luồng hình − luồng tiếng| ≤ 0,1 s**, lệch giọng so với mốc
≤ 0,25 s.

### 3.9 Bài học nội bộ đã đo

- Đèn LED **sáng dần ~0,5 s** (+7–10 độ sáng), không nhảy một khung. Đo **điểm giữa đoạn tăng** trong cửa sổ prompt, và đòi sáng
  hơn mọi lúc 1,5 s trước. Clip B: 68 → 80 ở 3,9 s là hồi sáng sau cú đẩy máy, không phải đèn (`src/do-tin-hieu.ts`
  `timCuBat`). **Nội bộ.**
- Clip Muse lệch ~1 s so với mốc trong prompt. `gvv cat` lấy **trung vị (cắt thật − cắt prompt)** trong ±1,5 s để dời cửa sổ.
  **Nội bộ.**
- `gvv boc` đo bật sáng trên cả khung nên **bỏ sót đèn nhỏ** (vòng LED khung 03 ở 7,8 s). `gvv cat` đo thêm vùng giữa.
  **Nội bộ.**
- Giọng CapCut 1,0× ≈ **4 tiếng/giây**. `atempo` 0,8–1,15. Lặng > 2 s thì giảm phần nghỉ cuối đoạn 1,8 → 1,5 s (skill reup 6.4,
  7.4, Phần B #25). **Nội bộ.**

---

## 4. Quy trình làm việc

Lệnh `gvv` chạy trong `D:/my project/gen-video-viral` dưới dạng `node src/cli.ts …`. `<ra>` = thư mục ra.

| # | Làm gì | Công cụ (lệnh) | Ra gì | Cổng |
|---|---|---|---|---|
| 1 | Nhận việc, kiểm đầu vào | Đối chiếu khoá `nguon` với tệp. `ffprobe -v error -show_entries format=duration:stream=codec_type,width,height -of json <clip>` | Danh sách clip có/không, độ dài, cỡ | Đủ điều kiện mục 6. Thiếu thì dừng và báo |
| 2 | Đọc ý đồ | Khung (`khung/…`), KICH-BAN, bảng 0b "lý do ở lại theo giây" | Ghi chú: nhịp nào LÕI, mốc neo, chỗ yếu | Biết cú bật ở giây nào và vì sao |
| 3 | Đề xuất danh sách cắt | `node src/cli.ts cat <ke-hoach-cat>.json` (thêm `--dung` để dựng luôn) | `<ten>.json` + dòng quyết định từng nhịp | Không còn ⚠. Nhịp `neo` đo được cú bật. Mọi nhịp ≥ độ dài mục tiêu |
| 4 | Soát cú bật bằng mắt | `ffmpeg -ss <bat−0,5> -t 1 -i <clip> -vf fps=10,scale=144:-1,tile=10x1 neo.jpg` | Dải 10 khung quanh cú bật | Khung tắt → sáng đúng chỗ, không phải sáng lại sau cú đẩy |
| 5 | Dựng | `node src/cli.ts dung <ten>.json --ra <ra>` | `<ten>-reel.mp4`, `<ten>-quang-cao.mp4`, `<ten>-report.json` | ffmpeg không lỗi. `tong_giay` khớp khung ±0,1 s |
| 6 | Tiếng | Tạo mới: tiếng gốc hoặc nhạc có phép (mục 3.7), nhạc vào ở `neo`. Bản địa hoá: theo skill reup 7.4 (giọng `atempo` 0,8–1,15, nhạc −12 dB, mờ dần 1,5 s). Cuối cùng chạy 2 lượt `loudnorm=I=-14:TP=-1.5:LRA=11` (lượt 1 `print_format=json`, lượt 2 truyền `measured_I/TP/LRA/thresh`, `linear=true`), `-c:a aac -b:a 192k -ar 48000` | Bản đã chuẩn âm | Hiện **thủ công** (🟡). `gvv dung` chưa làm bước này |
| 7 | QC kỹ thuật | Các lệnh ở mục 5. So với bản gốc: `ffmpeg -i <mau> -i <reel> -filter_complex "[0]scale=360:640[a];[1]scale=360:640[b];[a][b]hstack=shortest=1" compare.mp4` | Bảng QC + `compare.mp4` | Mọi dòng mục 5 đạt |
| 8 | Soát mắt | Lưới 4 khung/giây cả video (`fps=4,scale=120:-1,tile=8x…`). Ảnh phủ vùng an toàn (mục 5) ở mốc mỗi khối chữ | Ghi chú giây yếu | Không giây nào "không lý do ở lại". Chữ không bị UI che |
| 9 | Giao | Mục 11 | Thư mục `<ra>` + báo cáo | Tiêu chí xong mục 7 |

---

## 5. Bảng kiểm trước khi giao

Đặt `V=<ten>-reel.mp4` (làm lại cho bản quảng cáo).

**Kích thước và luồng**
- [ ] Cỡ và fps đúng khung: `ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,codec_name,pix_fmt -of csv=p=0 $V` → `h264,720,1280,30/1,yuv420p` (hoặc 1080×1920 nếu sếp chốt, mục 12)
- [ ] Có luồng tiếng, 48 kHz: `ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,sample_rate,channels -of csv=p=0 $V`
- [ ] Hình và tiếng dài bằng nhau (≤ 0,1 s): `ffprobe -v error -show_entries stream=codec_type,duration -of csv=p=0 $V`
- [ ] Tổng thời lượng = khung ± 0,1 s (bản quảng cáo = reel + `the_ket.dai`)

**Hình**
- [ ] Không khung đen: `ffmpeg -i $V -vf blackdetect=d=0.03:pix_th=0.10 -an -f null - 2>&1 | grep black_start` → rỗng
- [ ] Không đứng hình ngoài ý: `ffmpeg -i $V -vf freezedetect=n=0.003:d=0.5 -an -f null - 2>&1 | grep freeze_start` → rỗng, hoặc mỗi dòng có lý do
- [ ] Cú bật rơi đúng `neo_luc` ± 0,1 s (dòng quyết định của `gvv cat` + dải khung bước 4)
- [ ] Không lấy lẫn cảnh kế bên ở đầu/cuối đoạn (soi khung đầu và cuối mỗi đoạn theo `moc_cat`)
- [ ] Tăng tốc ≤ 1,25× ở mọi đoạn (`report.json` → `doan[].toc_do`)

**Tiếng**
- [ ] Độ to −14 ± 1,5 LUFS, TP ≤ −1,5 dBTP: `ffmpeg -nostats -i $V -af ebur128=peak=true -f null - 2>&1 | tail -12`
- [ ] Không lặng > 2 s: `ffmpeg -i $V -af silencedetect=n=-45dB:d=2 -f null - 2>&1 | grep silence_duration` → rỗng
- [ ] Không nhảy âm lượng giữa các đoạn > 6 dB (đo `ebur128` short-term quanh mỗi `moc_cat`) — ngưỡng đề xuất, chưa kiểm thực tế
- [ ] Nhạc vào ở cú bật ± 0,1 s (nếu có nhạc)
- [ ] Ghi tên bài nhạc và nguồn vào báo cáo
- [ ] SFX (nếu có) cách sự kiện hình ≤ 0,2 s
- [ ] Nếu dựng theo nhạc: tỉ lệ cắt rơi trong ±0,07 s của phách được ghi vào báo cáo (công cụ ⬜, mục 8)

**Chữ**
- [ ] Mỗi khối chữ hiện ≥ max(0,8 s; ký tự ÷ 20). ≤ 2 dòng. Không dòng nào tràn khung
- [ ] Chữ nằm trong vùng an toàn (số ở mục 3.1). Ảnh phủ:
  `ffmpeg -ss <giây> -i $V -frames:v 1 -vf "drawbox=y=0:w=iw:h=ih*0.14:color=red@0.35:t=fill,drawbox=y=ih*0.65:w=iw:h=ih*0.35:color=red@0.35:t=fill,drawbox=x=0:y=0:w=iw*0.167:h=ih:color=red@0.35:t=fill,drawbox=x=iw*0.833:y=0:w=iw*0.167:h=ih:color=red@0.35:t=fill" an-toan-<giây>.png`
- [ ] Phụ đề sinh từ lời (whisper / TTS): đã đọc đối chiếu từng từ với kịch bản. Chỗ máy nghe nhầm từ đồng âm thì sửa theo
  kịch bản (nguồn: coreyhaines31/marketingskills — ad-creative/references/motion-video-ads.md, MIT · Thấp)
- [ ] Đúng chính tả, không lời sai sự thật, không giá hay khuyến mãi bịa
- [ ] Hiểu được khi tắt tiếng (xem lưới khung không bật tiếng)

**Nội dung**
- [ ] Bảng "lý do ở lại theo giây" không có ô trống > 2 s (sổ tay 0b)
- [ ] Kết ≤ ~4 s sau cú trả lời, hoặc có leo thang / vòng lặp liền
- [ ] `compare.mp4` cho thấy thứ tự nhịp và mốc cú bật giống khung

---

## 6. Điều kiện đủ để bắt đầu

| Điều kiện | Thiếu thì làm gì |
|---|---|
| Đủ clip theo khoá `nguon`, **đúng tên** | Dừng, báo tên thiếu |
| Kế hoạch cắt có `dai` từng nhịp + `neo_luc` cho nhịp neo | Hỏi người lập kế hoạch. Không tự đặt mốc neo |
| Cửa sổ mỗi nhịp ≥ 1,2 × `dai` (`gvv prompt` cảnh báo) | Vẫn dựng được thì dựng, kèm ⚠ "nhịp X thiếu tư liệu". Không được thì báo sinh lại |
| Chữ (dòng, giây hoặc `"neo"`, vị trí) | Thiếu chữ thì dựng bản không chữ và báo |
| Thẻ kết: logo (PNG nền trong) + slogan | Chỉ xuất reel, báo thiếu bản quảng cáo |
| Bản địa hoá: `clean.mp4` + giọng + nhạc + mốc `starts` | Theo skill reup mục 1.6: làm tiếp phần đã có |

**Câu báo mẫu:**
> Thợ dựng — chưa dựng được **v01-ban2**: thiếu clip **B2** (kế hoạch ghi `thu-nghiem/muse/B2.mp4`, thư mục không có tệp này).
> Clip A2, M2 đủ. Cần: tải clip B2 từ Muse, đặt đúng tên `B2.mp4` vào `thu-nghiem/muse/`, rồi báo để tôi chạy lại.

> Thợ dựng — dựng xong nhưng ⚠: nhịp **bat** không đo được cú bật trong 0,5–4,2 s của clip B2. Máy lấy từ đầu cửa sổ, cú bật
> có thể lệch mốc 7,85 s. Tôi đã soi khung: [đúng / lệch x s]. Cần sếp xem giây 7,5–8,5 của bản reel.

---

## 7. Đầu vào · khuôn đầu ra · tiêu chí xong

**Đầu vào:** clip + kế hoạch cắt + chữ + thẻ kết.
- Khuôn **kế hoạch cắt** (`nhip[]`: `nguon`, `goi_y`, `dai`, `can` ∈ dau/giua/cuoi/neo, `giu_tron`, `neo_luc`. `chu[]` nhận
  `"neo"`): xem `gen-video-viral/vi-du/v01-ke-hoach-cat.json` và README mục "Tự đề xuất danh sách cắt".
- Khuôn **danh sách cắt** (`doan[]`: `nguon`, `tu`, `den`, `toc_do` 0,5–2. `chu[]`. `the_ket`): README mục "Danh sách cắt
  (`gvv dung`)". Kiểm bằng `kiem()` trong `src/danh-sach-cat.ts`.

**Đầu ra (thư mục `<ra>`):** `<ten>-reel.mp4` · `<ten>-quang-cao.mp4` · `<ten>-report.json` (máy ghi: tham số, `moc_cat`,
`tong_giay`, nguồn) · `compare.mp4` · `an-toan-*.png` · **báo cáo QC** theo khuôn dưới. Khối `qc` nên do máy ghi thêm vào
`report.json` (⬜, mục 8).

```jsonc
// <ten>-qc.json — khuôn đề xuất
{
  "ten": "v01-ban2", "luc": "2026-11-11T10:00:00Z",
  "khung": { "tong": 11.73, "neo_luc": 7.85 },
  "do": {
    "tong_giay": 11.733, "lech_tong": 0.003, "neo_do": 7.85, "lech_neo": 0.0,
    "co": "720x1280@30", "tieng": "aac 48k stereo", "lech_hinh_tieng": 0.02,
    "lufs": -14.2, "true_peak": -1.6, "lang_max": 0.0,
    "khung_den": [], "dung_hinh": [], "toc_do_max": 1.1
  },
  "chu": [{ "khoi": 0, "ky_tu": 41, "hien": 7.85, "can_toi_thieu": 2.05, "an_toan": false }],
  "nhac": { "bai": null, "nguon": null, "phep_phu": [] },
  "dat": false,
  "loi": ["chu[0] nằm trong dải 14 % trên", "chưa chuẩn âm"],
  "can_sep_xem": ["giây 7,5–8,5: cú bật"]
}
```

**Tiêu chí xong:** đúng thời lượng khung (±0,1 s) · cú bật đúng giây (±0,1 s) · mọi dòng mục 5 đạt, hoặc dòng chưa đạt được
ghi rõ trong `loi` và sếp đã biết.

---

## 8. Công cụ

| Công cụ | Dùng khi nào | Hiện trạng |
|---|---|---|
| `gvv cat` (`src/cat.ts`) | Đề xuất danh sách cắt từ kế hoạch + clip thật: độ lệch, thu về một cảnh, giữ trọn ≤ 1,25×, cú bật đo trong cửa sổ | ✅ v01: 6/6 nhịp lệch ≤ 0,25 s |
| `gvv dung` (`src/dung.ts`) | Trim, tốc độ, scale/crop, drawtext trên/dưới, thẻ kết, xuất reel + quảng cáo + report | ✅ (AAC 160k, chưa chuẩn âm) |
| `gvv boc` | Đo khung mẫu: điểm cắt 2 ngưỡng, bật sáng, RMS theo ô 0,25 s, lưới 4 khung/giây | ✅ (đo RMS dB, **không** đo LUFS) |
| Chuẩn âm −14 LUFS + soát lặng | Bước 6–7 | 🟡 skill reup có (`loudnorm`, QC). `gvv` chưa có |
| Giọng đọc (CapCut TTS) | Bản địa hoá, hoặc tạo mới có giọng | ⬜ bàn sau. Quy trình CapCut: skill reup mục 7 |
| Nhạc | Mọi video | ⬜ chưa có nguồn có phép (mục 3.7) |
| ffmpeg / ffprobe (QC tay) | Mục 5 | ✅ có sẵn |

**Công cụ nên có thêm** (thứ tự đề xuất):

| # | Công cụ | Làm gì | Học từ |
|---|---|---|---|
| 1 | `gvv kiem <video> --khung <ten>.json` | Chạy toàn bộ mục 5, ghi `<ten>-qc.json`, thoát mã 2 khi không đạt | reup `_qc.py`, `av_sync.py` (3 mức đạt / sửa nhẹ / chặn) |
| 2 | `gvv dung --chuan-am` | `loudnorm` 2 lượt −14 / −1,5, AAC 192k | reup 7.4 |
| 3 | Kiểm vùng an toàn tự động | Tính khung bao chữ (y0, số dòng × 1,25 × cỡ, `tw`) so với vùng an toàn. Xuất ảnh phủ | mục 3.1 |
| 4 | `compare.mp4` trong `gvv dung` | Mẫu cạnh bản dựng, đánh dấu `moc_cat` | rea-video `assemble` |
| 5 | Lớp chữ ASS (`-vf ass=`) | Chữ bật lên, đổi màu từ khoá, emoji, chữ bám câu thoại | rea-video `overlays.ass` |
| 6 | Ghép nhạc theo neo | Đặt "chỗ nhạc vào" của bài vào `neo`, mờ dần 1,5 s cuối, −12 dB dưới giọng | reup 7.4 |
| 7 | Đo phách và SFX | BPM + lưới phách. Tỉ lệ cắt trong ±0,07 s phách. SFX ±0,2 s sự kiện hình | rea-video `audio.py`, `packaging.py` |
| 8 | Nhảy âm lượng giữa đoạn | `ebur128` short-term quanh mỗi điểm cắt | — |

---

## 9. Ví dụ tốt / ví dụ hỏng

**Tốt — video 01 bản 1/bản 2** (`../video/v01-santa-spins-x-khung01/KICH-BAN.md`):
- Dài **11,7 s** so với mẫu 11,8. Cắt ở 2,5 · 3,6 · 5,2 · 6,4 · 10,1 s. **Cú bật 7,85 s** (khung: vòng tắt 7,75 s, sáng 7,95 s).
- `gvv cat` tái tạo bản dựng tay: 6/6 nhịp lệch ≤ 0,25 s.
- Clip A2 0–2,8 s **tăng tốc 1,1×** để giữ trọn "khoe hộp → xe đẩy" thay vì cắt cụt.
- Chữ 1 → chữ 2 ("Comment SANTA") **đúng giây bật**: mở vòng hai đúng lúc khép vòng một (0b).
- Thẻ kết chỉ có ở bản quảng cáo (13,0 s). Bản reel giữ tự nhiên.

**Hỏng — video 01 bản 1:**
- **Liền mạch gãy:** clip B đặt máy trên **kệ bếp** lúc bật, trong khi clip M vừa gắn lên **tủ lạnh**. Thợ dựng phải bắt được lỗi
  này khi soát mắt và báo sinh lại. Đừng dựng lấp.
- **Cú bật yếu:** vòng LED clip M trông sáng sẵn trước cú bật (thật ra là máy khác, do ảnh render sai).
- **Nhảy âm lượng:** tiếng gốc A2 −33,8 dB, M −36,9, B −23,9. Chênh ~13 dB giữa các đoạn, chưa chuẩn hoá. Không có nhạc.
- **Đoạn kết yếu:** lùi rộng bếp tối chỉ còn "đã mắt", thiếu leo thang (0b: 9–11,6 s là đoạn yếu nhất của khung 03).
- **Chữ ngoài vùng an toàn** (mục 3.1). Slogan thẻ kết 1,3 s, nghi không đủ đọc (mục 3.3).

**Tốt — skill reup:** QC bằng script (1080×1920, có tiếng, −14 ± 1,5 LUFS, lặng ≤ 2 s). Trộn nhạc −12 dB và mờ dần 1,5 s
bằng script thay vì kéo thanh CapCut (đỡ ~70 thao tác). Kiểm tương quan giọng/nhạc ≈ 0 để bắt lỗi quên tắt track giọng.
Ghép lại riêng từng id.

**Hỏng — skill reup (Phần B):**
- p05: lặng **2,1 s**. Sửa bằng cách giảm nghỉ cuối đoạn 1,8 → 1,5 s (#25).
- Tìm "golden hour" ra **bản cover JVKE**, phải đổi bài (#30).
- Ngưỡng khe 0,5 s khiến **7 video gộp đoạn giọng** hoặc ăn sang video sau. Đổi thành khe ≥ 0,12 s (#16).
- Video 20 phút chỉ là một đoạn lặp. l19 có 13 phút cảnh du lịch. Phải dò lặp và xem lưới cả video trước khi dựng (#3, #4).

---

## 10. Sổ lỗi thường gặp

| Lỗi | Dấu hiệu | Cách tránh / sửa |
|---|---|---|
| Đèn bật bị đếm là "cắt" | Điểm cắt sát lần bật sáng (khung 01: 7,9 s) | `danhDauCatDoSang`. Soi khung |
| Sáng lại sau cú đẩy máy bị nhận là cú bật | Đoạn tăng sau một cú tối | `timCuBat` đòi sáng hơn mọi lúc 1,5 s trước |
| Lấy lẫn cảnh kế bên | Khung đầu/cuối đoạn là cảnh khác | Thu cửa sổ quanh điểm cắt thật (±0,04 s) |
| Tăng tốc lộ | Tay người chạy nhanh bất thường | Trần 1,25×. Quá thì cắt phần dư |
| Giữ khung cuối khi clip ngắn | `freezedetect` báo | Báo thiếu tư liệu, không `tpad` lấp |
| Chữ bị UI che | Chữ trong dải trên / dưới, hoặc sát mép phải (thanh nút) | Ảnh phủ vùng an toàn (mục 3.1) |
| Phụ đề sai từ | Whisper nghe "laws" thành "loss" | Đối chiếu phụ đề với kịch bản (mục 5) |
| Chữ không đủ đọc | Hiện < ký tự ÷ 20 | Kéo dài khối, rút chữ |
| Âm nhảy giữa đoạn | Chênh > 6 dB tại điểm cắt | Chuẩn từng đoạn trước khi nối, rồi `loudnorm` cả bài |
| `loudnorm` chạy mặc định | Ra −24 LUFS | Luôn ghi `I=-14:TP=-1.5` |
| Lặng > 2 s | `silencedetect` | Rút nghỉ, cắt khoảng chết |
| Nhạc sai phép | Bài thư viện CapCut đăng lên Facebook/YouTube | Mục 3.7. Hỏi sếp |
| Bản cover / bài ca sĩ nổi tiếng | Tên bài trùng bài hit | Tránh (reup #30) |
| Đường dẫn ffmpeg có `:` hoặc `'` trên Windows | drawtext lỗi | `thoatDuongDan`. Bộ lọc để trong tệp (`-/filter_complex`) |
| Clip không có tiếng làm concat lỗi | ffmpeg báo thiếu `[a]` | `gvv dung` tự chèn `anullsrc` |

---

## 11. Bàn giao

**Giao cho sếp** (sếp tự chấm và tự đăng, không có kiểm duyệt riêng):
1. Đường dẫn thư mục `<ra>`: reel, quảng cáo, `report.json`, `qc.json`, `compare.mp4`.
2. Ba dòng tóm tắt: thời lượng / cú bật / độ to (đạt hay không).
3. Danh sách ⚠ cần mắt sếp, kèm **giây cụ thể**.
4. Nhạc: tên bài, nguồn, nền tảng được phép. Không có nhạc thì nói rõ.
5. Đề xuất sinh lại (nếu có): nhịp nào, vì sao, gợi ý sửa prompt hoặc ảnh khung đầu.

**Nhận lại từ sếp:** chấm đạt / sửa. Nếu video đã đăng, ghi view thật vào sổ tay mục 6 để kiểm giả thuyết 5b.

**Ghi lại:** bài học mới về dựng ghi vào **tệp này** (mục 9–10). Quyết định với sếp ghi vào `../CLAUDE.md`. Không chép hai nơi.

---

## 12. Câu hỏi mở / cần nghiên cứu tiếp

1. **Nhạc cho quảng cáo đa nền tảng** (cần sếp quyết): CapCut và TikTok CML chỉ phủ TikTok. Pixabay chưa rõ Content ID. Chọn:
   (a) mỗi nền tảng một bản nhạc, (b) mua thư viện có phép đa nền tảng, hay (c) chỉ tiếng gốc ngoài TikTok? Kèm theo: video
   reup đang dùng nhạc CapCut có được đăng Facebook không?
2. **Vùng an toàn:** lấy số chính thức (tệp mẫu TikTok, lớp phủ Ads Manager), rồi quyết định có dời chữ khỏi vị trí của khung mẫu
   (y 0,117 / 0,69) không. Khung mẫu là bài đăng tự nhiên, còn quảng cáo có nút CTA. Lề hai bên 16,7 % (mục 3.1) làm
   dải chữ hẹp còn ~2/3 khung: kiểm `gvv dung` có ngắt dòng chữ dài đúng không.
9. **Reel tự đăng: nướng nhạc vào tệp hay gắn âm thanh trong app?** Một nguồn cho rằng bài tự nhiên nên đăng không nhạc nướng
   sẵn và gắn âm thanh đang lên ngay trong app (thuật toán ưu tiên âm thanh của nền tảng, người khác dùng lại được); bản quảng
   cáo thì nướng nhạc vào (coreyhaines31/marketingskills — short-form-video-specs.md, MIT · **chưa kiểm**). Cần sếp quyết
   khi đăng; ảnh hưởng tới việc Thợ dựng xuất bản reel có nhạc hay không.
3. **Độ phân giải xuất:** giữ 720×1280 (nguồn Muse 720p) hay nâng 1080×1920 (Meta khuyên dùng, reup đang dùng)?
4. **Thẻ kết 1,3 s** có đủ đọc slogan 45 ký tự không? Đề xuất ≥ 2,3 s, hoặc rút slogan.
5. Chuẩn hoá độ to của TikTok và Meta: chưa tìm thấy tài liệu chính thức.
6. Ngưỡng "nhảy âm lượng 6 dB", `freezedetect` 0,5 s, `blackdetect` 0,03 s (đã chỉnh sau thi 11/11) là đề xuất. Cần chạy thử trên v01 và lô reup để chỉnh.
7. TikTok "5–10 words per second": đọc lại nguyên văn và ngữ cảnh.
8. ~~Giọng TTS CapCut thuộc loại giấy phép nào~~ — sếp chốt 11/11: không kiểm quyền.

---

## Nguồn

Web, mở thật ngày **11/11/2026**:
1. TikTok Ads Help — In-Feed ads specs: https://ads.tiktok.com/help/article/tiktok-auction-in-feed-ads
2. TikTok Ads Help — Creative best practices: https://ads.tiktok.com/help/article/creative-best-practices?lang=en
3. TikTok for Business — Commercial Music Library: https://ads.tiktok.com/business/zh/blog/audio-library-royalty-free-music
4. YouTube Help — Shorts: https://support.google.com/youtube/answer/10059070
5. YouTube Help — Recommended upload encoding settings: https://support.google.com/youtube/answer/1722171?hl=en
6. Meta — Instagram & Facebook Reels ads: https://www.facebook.com/business/ads/facebook-instagram-reels-ads
7. Spotify for Artists — Loudness normalization: https://support.spotify.com/us/artists/article/loudness-normalization/
8. Production Advice — YouTube "stats for nerds": https://productionadvice.co.uk/stats-for-nerds/
9. Pixabay — License summary: https://pixabay.com/service/license-summary/
10. Pixabay — Terms (Content License): https://pixabay.com/service/terms/
11. CapCut — Materials License Agreement: https://www.capcut.com/material-license-agreement (chuyển tới bản ibytedtos.com)
12. Netflix — English (USA) Timed Text Style Guide: https://partnerhelp.netflixstudios.com/hc/en-us/articles/217350977
13. Netflix — Subtitle Timing Guidelines: https://partnerhelp.netflixstudios.com/hc/en-us/articles/360051554394
14. Digiday — 85 % xem không tiếng (17/05/2016): https://digiday.com/media/silent-world-facebook-video/

Mã, chỉ đọc, ngày 11/11/2026:
15. `myccarl/ai-shortVideo-pipeline` — `layers/L5_postprod/av_sync.py`
16. `JuneYaooo/rea-video` (Apache 2.0) — `skills/rea-video/references/remake.md`, `skills/rea-video/SKILL.md`,
    `docs/what-it-detects.md`, `rea_video/remake.py`, `rea_video/audio.py`, `rea_video/packaging.py`
17. ffmpeg bản 2026-08-27 (máy này) — `ffmpeg -h filter=blackdetect|freezedetect|silencedetect|ebur128|loudnorm`

Bộ skill tải về (đọc 11/11/2026, coi là dữ liệu, không cài):
18. coreyhaines31/marketingskills (MIT) — `ad-creative/references/short-form-video-specs.md` (vùng an toàn, nhạc tự nhiên),
    `ad-creative/references/motion-video-ads.md` (whisper nghe nhầm)

**Chưa kiểm** (không mở được hoặc chỉ thấy qua kết quả tìm kiếm):
- Meta Ads Guide Reels (`facebook.com/business/ads-guide/…/facebook-reels`): 404 hai đường dẫn.
- Instagram Help 1038071743007909: trang không có nội dung.
- BBC subtitle guidelines: bị chặn.
- Số vùng an toàn 14 / 35 / 6 % chỉ có ở bên thứ ba (superscale.ai, tryvizup.com, socialync.io…), chưa mở.
- Tài liệu chính thức về chuẩn hoá độ to của TikTok và Meta: không tìm thấy.

Nội bộ: `gen-video-viral` (README, `src/cat.ts`, `dung.ts`, `danh-sach-cat.ts`, `do-tin-hieu.ts`, `boc.ts`,
`vi-du/v01-ke-hoach-cat.json`) · `../CLAUDE.md` · `../KIEN-THUC-VIRAL.md` 0b, 5b, 7.2, 7.3 · `../video/v01-…/KICH-BAN.md` ·
`C:/Users/PC/Downloads/cau-lenh-reup-video-auto.md` (mục 6.4, 7, 7.4, Phần B).
