# Sổ tay: Quay thật (điện thoại · tay + sản phẩm · hồ đêm)

Dùng chung cho mọi shop quay bằng điện thoại. Ví dụ chạy suốt sổ: **phao LED-425 của 17fishing**
(`../../khach-hang/17fishing/san-pham/phao-ro-diec.md`). Viết 11/11/2026, Đạo diễn hình ảnh.
**Ai quyết:** Đạo diễn quyết 5 việc: máy và vị trí máy, bố cục, chuyển động máy, ánh sáng, tông màu.
Thợ dựng chỉnh màu và đo theo tông Đạo diễn đặt ở mục F. Kết quả đo thuộc về Thợ dựng, còn quyết "đạt hay sinh lại / quay lại" thuộc về Đạo diễn.

Mức bằng chứng giống gói vai: **Cao** (tài liệu chính thức / đo lặp lại) · **TB** (bên thứ ba có thực hành, ≥ 2 nguồn khớp nhau) ·
**Thấp** (một nguồn, hoặc chỉ đọc qua tóm tắt tìm kiếm) · **Nội bộ** (đo trên tư liệu của mình) · **KTC** (kiến thức chung, chưa có nguồn đã mở).
Dòng nào có dưới 3 bằng chứng thì chỉ là **phán đoán** (`../../quy-che/LUAT-CHUNG.md` mục 3), ghi ⚠ kèm %.
Mã nguồn [N1]… ở cuối sổ.

---

## A. Máy, vị trí máy, cài máy

### A1. Điện thoại hay máy ảnh
| Điều | Nguồn · mức |
|---|---|
| **Dùng điện thoại.** Quay dọc 9:16 sẵn, luôn mang theo, đủ 4K. Cách quay POV cầm tay hợp feed ("vật cực, cách quay tự nhiên") | `KIEN-THUC-VIRAL.md` 0c · Nội bộ |
| Máy ảnh cảm biến lớn chỉ hơn ở cảnh **đêm** (ít nhiễu hơn). ⚠ Nghiêng ~70 % là chưa cần: ở cảnh đêm, nguồn sáng chính là đuôi phao, nền đen cho phép giữ ISO thấp (mục A4). Đổi ý nếu bản đêm quay bằng điện thoại vẫn nhiễu hột trên mặt nước sau `denoise.py` | KTC + Nội bộ |
| Camera gốc của máy thường **không** cho chỉnh tay đủ thứ. **Blackmagic Camera** miễn phí (iPhone, Android) chỉnh được fps, góc màn trập (shutter angle), WB, ISO; có histogram và focus peaking; ghi H.264/H.265/ProRes | App Store [N12] · Cao (trang hãng). Bản Android có lúc chỉ chạy trên Samsung/Pixel [N12b] · Thấp |
| Samsung có **Pro Video**: ISO, màn trập, WB theo Kelvin, nét tay. Hãng nhắc ISO cao thì nhiễu; đặt màn trập tay thì ISO không để Auto được | Samsung Support [N10] · Cao |

### A2. Đỡ máy
| Kiểu | Dùng khi | Ghi chú |
|---|---|---|
| **Chân máy** (gấp cao 1,5–1,8 m) + kẹp điện thoại | Mọi cảnh "chờ → bật", "trước → sau", cảnh đêm | Bắt buộc cho đêm. Thả chân thấp sát mặt nước |
| **Chân bạch tuộc** (~30 cm) | Bàn, bờ đá, quấn vào cọc hoặc tay ghế câu | Đặt máy **sát mặt nước 5–15 cm** |
| **Gimbal** | Một cảnh đi bộ dẫn vào hồ, lia theo tay | Không dùng cho cảnh cần máy đứng yên |
| **Cầm tay** (POV) | Tay cầm phao, lắp pin, buộc dây (cảnh ngày) | Kẹp khuỷu tay vào người, bật chống rung |

### A3. Độ cao, khoảng cách, tiêu cự cho vật nhỏ, dài, mảnh
Ống chính 1× của điện thoại (~26 mm tương đương), quay dọc thì góc nhìn dọc khoảng 65° (KTC, tính từ tiêu cự; chưa đo trên máy shop).
| Cảnh | Máy đặt đâu | Tính ra (⚠ tính toán, chưa đo thực địa) |
|---|---|---|
| Cả phao 40 cm trên bàn hoặc trong tay, đứng dọc | Máy cao ngang thân phao, cách **~45 cm**, ống 1× | Phao chiếm ~70 % chiều cao khung. Đuôi 0,85 mm rộng ~3 px ở khung 1920. Thấy được, nhưng mảnh như sợi chỉ |
| Đuôi trên mặt nước (~10 cm nhô lên) | Máy **sát mặt nước 5–15 cm**, cách **25–40 cm**, ống 1×. Hoặc lùi 60–80 cm và quay 4K rồi cắt 2× | Đuôi chiếm ~1/3 khung. Thả phao **gần bờ 0,5–1 m** (cần ngắn) để chân máy với tới |
| "Ngồi xa vẫn thấy" | Máy ở chỗ mắt người ngồi ghế câu (~1 m), phao cách 3–5 m | Đuôi chỉ là một vạch sáng. Đây chính là bằng chứng của câu "ngồi xa vẫn thấy" |
| Cận chi tiết (thân, hoa văn, chỗ lắp pin) | Ống 1× ở cự ly gần nhất còn lấy nét được, hoặc chế độ macro | Ban đêm **tránh ống tele** và ống góc rộng (⚠ ~65 %: ống phụ thu ít sáng hơn; ống góc rộng làm cong que thẳng ở mép khung) |

Luật: **que phải thẳng tuyệt đối** (mỏ neo hồ sơ 3c). Giữ phao ở giữa khung, không đặt sát mép. Máy để ngang mặt phẳng, không nghiêng.

### A4. Cài máy (làm **trước** khi bấm quay, rồi khoá lại)
| Cài | Đặt | Vì sao · nguồn · mức |
|---|---|---|
| **Khoá phơi sáng / nét (AE/AF lock)** | iPhone: chạm và giữ lên **đuôi phao** tới khi hiện "AE/AF Lock", rồi vuốt xuống để giảm sáng (nét vẫn giữ). Chạm lại hoặc đóng app là mất khoá | iPhonePhotographySchool [N13] · TB; thao tác trong chế độ Video qua tóm tắt tìm kiếm [N13b] · Thấp. Có báo cáo khoá phơi sáng **trôi nhẹ** theo bố cục trên vài đời iPhone → dùng Blackmagic Camera khi cần chắc |
| **Khoá cân trắng** | iPhone (iOS 17 trở lên): Cài đặt → Camera → Quay video → **Khoá cân bằng trắng** (theo bài bên thứ ba). Blackmagic/Pro: đặt số Kelvin | [N14] · Thấp (chưa mở được trang Apple). Lý do: AWB **đuổi theo màu đèn**. Khi cả đuôi đỏ, AWB kéo khung về phía ngược đỏ, nên đỏ nhạt đi (mục F) |
| **fps** | **25 fps** mặc định, vì lưới điện VN là 50 Hz và có thể có đèn hồ trong khung. Cần chậm thì 50 fps (1/100) | Sony: vùng 50 Hz dùng 1/50 hoặc 1/100 để tránh nhấp nháy, đèn LED vẫn có thể sọc [N8] · Thấp (tóm tắt) + KTC (50 Hz). Clip Muse là 24 fps (Nội bộ). Dựng chung thì Thợ dựng quy về một fps |
| **Màn trập 180°** | Màn trập = 1 ÷ (2 × fps): 25 fps → **1/50**, 50 fps → 1/100 | StudioBinder [N2] · Cao (chuẩn nghề, 2 nguồn khớp) |
| **ISO đêm** | Đặt **theo đuôi**: hạ phơi sáng tới khi đoạn đỏ không còn trắng ở lõi. ⚠ Nghiêng ~65 % là ISO 200–800 đủ, vì đuôi tự sáng; nền nước để đen | Kinh nghiệm chụp LED: ~ −2 đến −3 EV, phơi sáng cho vật sáng chứ không cho nền tối [N9] · Thấp. Phải đo thực địa |
| **Pro / thủ công** | Cảnh đêm và cảnh so sánh: **thủ công hết** (fps, màn trập, ISO, WB, nét). Cảnh ngày tay cầm: tự động + khoá AE/AF là đủ | [N10] [N12] · Cao |
| **HDR video** | **Tắt** (quay SDR) | Dolby Vision/HDR từ iPhone từng bị **bạc màu hoặc quá sáng** khi lên Instagram/Facebook. Instagram iOS sửa từ 11/2025, Facebook và Android chưa rõ [N15] · Thấp. ffmpeg-skill cũng ghi "HDR mã hoá lại qua đường SDR sẽ phẳng" [N18] · Cao (tài liệu công cụ). Lỡ quay HDR thì `color.py --to-sdr` |
| **Chế độ Đêm / Night Sight Video / Video Boost** | **Tắt** cho mọi cảnh có cú đổi màu | ⚠ ~70 %: xử lý ghép nhiều khung (Pixel còn xử lý trên đám mây [N16] · Thấp) có thể làm nhoè hoặc trễ mốc đổi đỏ và làm đỏ lệch màu. Night mode của iPhone là chế độ **ảnh** (trang Apple không đọc được). Đổi ý nếu thử A/B 10 s cho thấy mốc đỏ và màu không đổi |
| **Tự giảm fps khi tối** (Auto FPS / auto low-light) | **Tắt** | ⚠ KTC: máy tự kéo dài màn trập thì đuôi nhoè và lệch 180°. Trang Apple không đọc được |
| **Độ phân giải** | 4K dọc nếu máy chịu được (để cắt 2×), xuất 1080×1920 | Thợ dựng 3.1 · Cao |

---

## B. Bố cục 9:16

| Luật | Cụ thể (khung 1080×1920) | Nguồn · mức |
|---|---|---|
| **Vùng an toàn** | Để trống chữ quan trọng khỏi **trên 14 %, dưới 35 %, hai bên 16,7 %** (180 px). Dải còn lại ~720 × 980 px | `../../nhan-su/vai/tho-dung.md` 3.1 · TB. Kiểm bằng `look.py --safe tiktok` / `--safe reels` [N18] |
| **Một vật chính** | Mỗi khung một trọng tâm: đuôi phao. Thân phao, tay, cần là phụ | `KIEN-THUC-VIRAL.md` 0d.2 · Cao |
| **Mỏ neo** | Mọi cỡ cảnh giữ **que thẳng + đuôi sáng theo đoạn** để người xem biết vẫn là món đó | Gói ĐD 3.1 (AdCraft) · TB; hồ sơ 3c |
| **Đặt vật** | Đuôi phao ở **x ≈ 40–45 %** (lệch trái, vì cột nút thích/bình luận nằm bên phải), giữa dải y 35–60 % | ⚠ ~65 %, suy từ vùng an toàn |
| **Đường nước** | Đường chân trời hoặc bờ xa ở **khoảng 1/4–1/3 trên**, nằm ngang tuyệt đối, **giữ nguyên suốt cảnh** | Nội bộ: S1 đường bờ ở ~10 % và đứng yên thì đạt; S2 ở ~20 % và trôi thì hỏng ghép đôi (`09-dd-kiem-clip.md`) |
| **Đường dẫn mắt** | Que phao dọc chính là đường dẫn. Tay đi vào khung từ dưới hoặc bên trái, ngón tay chỉ về đuôi. Mặt người (nếu có) nhìn vào phao | `KIEN-THUC-VIRAL.md` 0d.4 · TB |
| **Chừa chỗ cho chữ** | Dải y 14–30 % (trên đường nước, trời hoặc bờ tối) là chỗ cho chữ hook. Nước tối ở dưới chịu được lớp nút giao diện | ⚠ ~60 % |
| **Nền** | Đêm: nền đen sạch, không đèn đường lọt vào khung. Ngày: nước trơn, không rác, không người lạ | `KIEN-THUC-VIRAL.md` 0c "bối cảnh định giá" · Thấp |

---

## C. Chuyển động máy

| Kiểu | Làm bằng | Dùng cho | Luật |
|---|---|---|---|
| **Đứng yên (locked-off)** | Chân máy, hẹn giờ hoặc remote Bluetooth | **"chờ → bật", "trước → sau", "so sánh", mọi cảnh đêm** | Máy đứng yên là bắt buộc: khoá AE/AF/WB, không chạm máy trong lúc quay. Đổi vật chứ không đổi máy |
| **Đẩy vào (push-in)** | **Làm ở dựng**: cắt dần từ khung 4K | Nhấn cú đổi đỏ | Rẻ, không rủi ro. Tối đa ~1,3× trong 1–2 s |
| **POV cầm tay** | Tay | Tay cầm phao, lắp pin, đảo pin, cất ống | Chậm, theo 3–5 bước (cầm → đưa lại gần → dừng → buông). Gói ĐD 3.1 |
| **Ngẩng / cúi (tilt)** | Cầm tay hoặc gimbal | Từ tay hoặc thùng mồi lên tới phao | Một chuyển động mỗi cảnh |
| **Đi vào (walk-in)** | Gimbal | Cảnh mở toàn hồ lúc chạng vạng | Không dùng làm thân. Chỉ là cảnh "bao la" (0d.9) |
| **Lia theo (pan)** | Chân máy có đầu xoay | Theo phao từ lúc quăng tới lúc đứng | Lia chậm, dừng hẳn trước khi cảnh bắt đầu |

**Từ vựng khi đọc video mẫu** (rea-video `aspects/camera.py`, `framing.py` [N26] · Mã): giữ máy = tự cầm (camera trước) / người khác cầm / chân máy / gimbal / giá quay từ trên xuống ·
ống = góc rộng trước / ống chính / tele · tốc độ = thường / chậm / tua nhanh / đổi tốc / tua ngược · cỡ cảnh ECU / CU / MCU / MS / FS / LS.
Máy của họ chỉ tự đo được 3 mức (cầm tay / máy di chuyển / đứng yên); lia, dolly, zoom vẫn phải người xem.

**Khi nào máy phải đứng yên:** khi người xem cần **so** (trước/sau, đã/chưa đỏ, phao A/B). Máy động thì người xem không biết cái gì đổi.
Lỗi đã thấy: S2 bị máy lùi dần nên hỏng ghép đôi (Nội bộ).

---

## D. Ánh sáng: 12 thiết lập

Ký hiệu sơ đồ (nhìn từ trên xuống): `M` máy · `P` phao/sản phẩm · `K` đèn chính · `F` đèn phụ · `H` tấm hắt ·
`B` đèn sau · `☼` mặt trời · `~~~` mặt nước. Thiết bị ghi mã ở mục E.

**Đối chiếu với bảng `SETUPS` của rea-video** [N26] (12 sơ đồ có thiết bị; tác giả tự ghi rằng chuyển mã của nền tảng làm sai số đo độ cứng sáng và mức đèn phụ). Mức: Thấp (bảng kinh nghiệm, chưa đo độc lập).
| rea-video | Ở sổ này | Lấy / khác |
|---|---|---|
| key_fill (chính 45° + phụ) · hard_side (một đèn bên) | D1 (và biến thể sáng bên) · D2 | Khớp. Lấy thêm: "một đèn sát bên, góc thấp cho bóng dài; bên kia không hắt hoặc dùng thẻ đen hút sáng" |
| product_still (nền liền, đèn tán trên đầu + 2 bên) | D6, D4 | Lấy: **bọc vật bóng bằng vải tản** để không thấy bóng đèn và người phản chiếu (thân xanh ngọc bóng) |
| high_key · soft_front (ring light 18", sáng phẳng) | D4 | Sáng phẳng làm mất khối, chỉ dùng cho cảnh thông số |
| low_key (đèn có ống chụp, nền đen, thẻ đen chặn sáng lan) | D5 | Khớp |
| back_lit (trong nhà, ngược cửa sổ) · outdoor_soft (râm/âm u) | D7 | Khớp |
| outdoor_sun (nắng gắt; tránh nắng đỉnh đầu, quay khi nắng xiên) | D8 | Khớp. Mình thêm CPL cho mặt nước |
| outdoor_backlit (ngược sáng, giờ vàng, viền vật) | D3 (bản ngoài trời) | Khớp |
| colored_ambient (RGB/neon) | **Không dùng** | Đèn màu trùng màu đoạn LED và màu tín hiệu đỏ |
| ambient_low_light (đêm, đèn sẵn có; bật chế độ Đêm; đèn LED ấm 3200 K yếu cạnh ống kính) | D10–D12 | **Khác:** mình **tắt** chế độ Đêm (A4) và không đặt đèn cạnh ống kính chiếu vào đuôi |
| — (không có) | **D9 giờ xanh · D10 đèn phao là nguồn chính · D11 hắt mặt nước · D12 cận tay đêm** | Bảng rea-video không có cảnh **đêm ở hồ mà đèn sản phẩm là nguồn chính**, nên bốn kiểu này là của mình |

**D1 · Đèn chính mềm + tấm hắt (soft key + bounce)**
| | |
|---|---|
| Sơ đồ | `K(tán) ↘ P ← H` · `M` phía trước. K lệch 45° bên trái, cao hơn sản phẩm, chiếu chéo xuống; H trắng ở phía tối |
| Tác dụng | Khối rõ, bóng mềm. Xích H lại gần thì bóng mờ, đẩy ra xa thì tương phản hơn. Đèn phụ yếu hơn đèn chính, đủ sáng thì nhãn và vân bị phẳng |
| Dùng cho shop | Phao **trên bàn**, cận thân xanh ngọc và hoa văn. Đèn đặt **sát mặt bên** thay vì 45° thì nổi vân hơn (biến thể "sáng bên") |
| Tối thiểu | 1 đèn LED mini + giấy hoặc xốp trắng · Nguồn: Ulanzi [N3] · TB; No Film School [N4] · TB |

**D2 · Ba điểm (three-point)**
| | |
|---|---|
| Sơ đồ | `K` 60° trái · `F` 60° phải (yếu hơn) · `B` sau, trên P · `M` ở giữa |
| Tác dụng | Chuẩn nghề: chính tạo khối, phụ nhấc bóng, sau tách vật khỏi nền. Đèn chính và phụ đứng hai bên máy, lệch khoảng 60° |
| Dùng cho shop | Cảnh "giới thiệu" 3 mã QF-01/02/03 đứng cạnh nhau trên bàn |
| Tối thiểu | 2 đèn + 1 tấm hắt (thay cho F) · StudioBinder [N1] · Cao; No Film School [N4] · TB |

**D3 · Ngược sáng / viền (backlight / rim, kicker)**
| | |
|---|---|
| Sơ đồ | `B` phía sau P, chếch 30–45°, nằm ngoài khung · `M` phía trước · nền đen |
| Tác dụng | Vẽ một **viền sáng** dọc mép que. Vật mảnh 0,85 mm tách hẳn khỏi nền tối |
| Dùng cho shop | Đuôi thuỷ tinh **ban ngày** (đuôi sơn) trên nền tối. Cảnh "đuôi cứng, thẳng" |
| Tối thiểu | 1 đèn + giấy đen chắn để đèn không rọi thẳng vào ống kính · [N1][N4] · TB. ⚠ Nguy cơ loá ống kính: luôn chắn |

**D4 · Sáng cao nền trắng (high-key)**
| | |
|---|---|
| Sơ đồ | Nền giấy trắng uốn cong · `K` tán lớn phía trên trước · `F` hoặc `H` hai bên |
| Tác dụng | Sáng, gần như không bóng. Kiểu ảnh sàn thương mại điện tử |
| Dùng cho shop | Ảnh hoặc cảnh **thông số** (chiều dài từng mã cạnh thước). Đừng dùng làm hook: đây là mức "trung bình", người xem lướt qua (0c) |
| Tối thiểu | Giấy A2 trắng + 1 đèn tán + 1 tấm hắt · StudioBinder [N1] · Cao |

**D5 · Nền đen, sáng thấp, phao tự sáng (low-key, practical trong nhà)**
| | |
|---|---|
| Sơ đồ | Phòng tối · P (đèn LED bật) trên nền vải đen hoặc trong chậu nước tối · không đèn chính, hoặc chỉ một H rất xa |
| Tác dụng | Đèn phao là nguồn duy nhất, màu đoạn LED rõ, tương phản mạnh |
| Dùng cho shop | Dạng "test trong chậu" (ngành đang dùng nhiều, `video-nganh.md` dạng 1), cảnh dự phòng khi trời mưa. Phơi sáng theo đuôi như D10 |
| Tối thiểu | Chậu sẫm màu + vải đen · No Film School (low key, practical) [N4] · TB. Nội bộ: video-01 quay trong phòng sáng nên **lẫn ánh đèn phòng** ở 0–2 s |

**D6 · Đèn tán trên đầu, quay từ trên xuống (diffused overhead / top-down)**
| | |
|---|---|
| Sơ đồ | `K` tán ngay trên P · `M` chĩa thẳng xuống · P nằm trên mặt bàn gỗ hoặc vải |
| Tác dụng | Bóng ít và đều, bố cục phẳng gọn |
| Dùng cho shop | **So sánh** 3 mã nằm song song, phao + pin + ống đựng (cảnh "trong hộp có gì") |
| Tối thiểu | 1 đèn tán + tay đèn hoặc giá treo · StudioBinder [N1] · Cao |

**D7 · Ánh cửa sổ + tấm hắt (window light + bounce)**
| | |
|---|---|
| Sơ đồ | `☼ cửa sổ` bên trái → P ← `H` bên phải · `M` 90° so với cửa sổ |
| Tác dụng | Mềm, tự nhiên, rẻ nhất. Phải tắt đèn trần để không **trộn màu** đèn |
| Dùng cho shop | **Tay cầm** phao trong nhà: lắp pin, đảo pin, cất ống (cảnh mẹo) |
| Tối thiểu | Cửa sổ + xốp trắng · Ulanzi (tắt nguồn sáng trộn) [N3] · TB; No Film School (natural + bounce) [N4] · TB |

**D8 · Ngoài hồ ban ngày: nắng xiên + kính phân cực (CPL)**
| | |
|---|---|
| Sơ đồ | `☼` chếch 90° so với hướng máy · `M` sát mặt nước → P `~~~` · H cho tay nếu là cảnh tay |
| Tác dụng | CPL cắt **loá phản chiếu trên mặt nước**, mạnh nhất khi máy vuông góc với mặt trời; xoay kính và nhìn màn hình để chỉnh. Mất tới ~2 stop sáng |
| Dùng cho shop | Đuôi **sơn** (chế độ ngày, đảo pin) đứng trên nước; tay buộc phao. Tránh 11–14 h (nắng gắt từ trên đầu) |
| Tối thiểu | Kính CPL kẹp điện thoại · Wikipedia [N7] · TB; tổng hợp nhiều bài CPL [N7b] · TB. **Không dùng CPL ban đêm** (mất sáng, mà đèn phao không phải ánh phản chiếu) |

**D9 · Giờ xanh: trời làm đèn phụ (blue hour, ambient fill)**
| | |
|---|---|
| Sơ đồ | Trời sau hoàng hôn ở phía sau hoặc bên cạnh · `M` sát nước → P (LED bật) · không đèn thêm |
| Tác dụng | Trời còn đủ sáng để thấy **mặt nước, bờ, cây** (không khí, "bao la"), trong khi đuôi LED đã nổi. Đây là cách rẻ nhất để có "đêm có bối cảnh" |
| Dùng cho shop | Hook toàn cảnh "hồ dịch vụ về chiều". Cảnh "chờ" trước cú đỏ |
| Tối thiểu | Không cần thêm gì. **Rất ngắn ở VN**: giờ xanh ngắn hơn gần xích đạo vì mặt trời lặn dốc (mức chung 20–30 phút ở vĩ độ trung bình) [N11] · TB. ⚠ Hà Nội 11/2026: lặn ~17 h 15 (KTC; timeanddate chặn) → cửa sổ ~17 h 20–17 h 40 |

**D10 · Đêm: đèn phao là nguồn chính, không đèn phụ (practical-as-key)**
| | |
|---|---|
| Sơ đồ | `bờ xa (đen)` / `~~~~ P (đuôi LED) ~~~~` / `M` (chân máy, sát nước 5–15 cm, cách 25–40 cm) · không có đèn nào khác |
| Tác dụng | Đúng chuẩn "practical": nguồn sáng nằm ngay trong khung. Đuôi sáng nổi trên nền đen, có **vệt phản chiếu của đuôi trên mặt nước** (tự nhiên, nên giữ) |
| Dùng cho shop | **Thân của mọi video đêm**: chờ (nhiều màu) → đỏ. Cũng là cảnh "ngồi xa vẫn thấy" (máy lùi 3–5 m) |
| Cài | Thủ công: 25 fps · 1/50 · ISO thấp · WB khoá · **phơi sáng theo đoạn đỏ** (lõi đỏ không trắng) · nét tay đặt trên đuôi |
| Tối thiểu | Chân máy + remote · StudioBinder/No Film School (practical) [N1][N4] · TB; LED quá sáng mất màu [N9] · Thấp |

**D11 · Đêm: hắt nhẹ mặt nước, đèn có lý do (motivated low fill)**
| | |
|---|---|
| Sơ đồ | `F (tán, 1–5 %)` ← **ngoài khung**, cao 1–1,5 m, chếch 60–90° so với hướng máy, chiếu **xuống mặt nước cách phao ~1 m**, không chiếu vào phao / `~~~~ P ~~~~` / `M` |
| Tác dụng | Mặt nước có **vân sóng mờ**, người xem hiểu đây là hồ thật chứ không phải phòng tối. Lý do của đèn: đèn hồ hoặc đèn đội đầu của người câu |
| Dùng cho shop | Bản đêm cần bối cảnh sau giờ xanh. Cảnh **"trước"** của "trước → sau" (phao thường + đèn soi) dùng chính đèn này, nhưng chĩa thẳng để **cố ý** tạo loá |
| Luật chống loá | ① đèn phụ không bao giờ rọi vào đuôi · ② không thấy **cột sáng** trong không khí (bài học S2: đèn soi thành cột sáng đặc chéo, loá trắng trên phao) · ③ đèn **trắng trung tính hoặc hơi ấm**; **cấm đèn đỏ** (trùng màu tín hiệu cá cắn), cấm xanh lá hoặc vàng cam (trùng màu đoạn LED) · ④ đuôi vẫn phải là vật sáng nhất khung |
| Tối thiểu | 1 đèn LED chỉnh được độ sáng và nhiệt màu, chân hoặc tay kẹp · No Film School (motivated) [N4] · TB; Nội bộ S2 (`09-dd-kiem-clip.md`) |

**D12 · Đêm, cận tay: phao + chút sáng cho da (practical + soft hand fill)**
| | |
|---|---|
| Sơ đồ | `F` tán, **rất yếu**, đặt ngang bên cạnh, chiếu vào tay, không chiếu vào đuôi · P trong tay (LED bật) · `M` 30–45 cm, chân máy hoặc POV |
| Tác dụng | Thấy tay, móng, thao tác (đảo pin, thả phao) mà đuôi vẫn là vật sáng nhất |
| Dùng cho shop | Cảnh test "cầm phao lên, đuôi đổi màu", cảnh mẹo "đảo chiều pin". Chống **loá màu đèn lên lòng bàn tay** (video-01 @5,25 s có loá vàng trên da): giữ đuôi cách da ≥ 3–5 cm, xoay đuôi để nó không chĩa vào lòng bàn tay |
| Tối thiểu | Đèn gắn điện thoại có chỉnh độ sáng, hoặc đèn mini + tán · [N3] · TB; Nội bộ (`phao-ro-diec.md` 3b) |

**Ba luật đêm dùng chung cho D10–D12** (tóm tắt mục 3 điều quan trọng nhất trong báo cáo):
1. **Phơi sáng cho đuôi, không cho nền.** Lõi đỏ trắng hoặc cam là sai màu. Hạ EV tới khi hết, rồi khoá AE.
2. **Mọi thứ khoá tay**: WB (để AWB không đuổi theo cú đỏ), fps, màn trập, nét. Tắt HDR và chế độ Đêm.
3. **Đèn phụ chỉ chạm nước, không chạm đuôi.** Không cột sáng, không đèn màu. Lau ống kính trước khi quay (vết mỡ tay tạo quầng quanh điểm sáng · KTC).

---

## E. Thiết bị: 3 mức (giá VN tham khảo, đọc 11/11/2026)

Giá có ghi "khuyến mãi tới 23:59 11/11" thì sau hôm đó có thể đổi. ⬜ = không thấy giá VN, không ghi số.
| Mã | Món | Giá (VND) | Thấy ở đâu |
|---|---|---|---|
| T1 | Chân máy kiêm gậy, cao 1,8 m, Ulanzi SK-21 | **560.000** (niêm yết 890.000) | thegioididong.com, trang sản phẩm [N19] |
| T2 | Chân bạch tuộc 32 cm, Ulanzi MT33 | **370.000** (490.000) | thegioididong.com [N20] |
| T3 | Chân + gậy 1,5 m kèm remote Bluetooth, Ulanzi MT-85 | ⬜ (chỉ thấy tên trong kết quả tìm kiếm) | thegioididong.com (chưa mở) |
| L1 | Đèn gắn điện thoại, Ulanzi LM21, 2500/5600/8000 K, CRI ≥ 95 | **400.000** (550.000) | dienmayxanh.com [N21] |
| L2 | Đèn LED Ulanzi VL120RG, 2500–9000 K, CRI 95+, có màu | **660.000** (850.000) | thegioididong.com [N22] |
| L3 | Tay đèn Ulanzi LS04 | 450.000 | bài mytour.vn cập nhật 15/10/2026 [N23] (giá người viết mua, không phải giá shop) |
| G1 | Gimbal DJI Osmo Mobile 7 | **1.320.000** (1.980.000) | cellphones.com.vn [N24] |
| K1 | Kính CPL kẹp điện thoại 52 mm | ⬜ ở shop VN (desertcart.vn hàng nhập 1.195.533 ₫, chỉ thấy qua tìm kiếm) | — |
| H1 | Tấm hắt 5-in-1 60 cm | ⬜ ở shop VN (desertcart.vn 2.095.195 ₫, hàng nhập) | — |
| H0 | Xốp trắng A3, giấy đen, vải đen, chậu sẫm | ⬜ (hàng văn phòng phẩm) | — |
| A1 | App Blackmagic Camera | **0** | App Store [N12] |

| Mức | Gồm | Tổng ước |
|---|---|---|
| **Tối thiểu** (đủ cho D1, D5, D7, D8 không CPL, D9, D10, D12) | T1 + L1 + H0 + A1 + điện thoại sẵn có | **~960.000 ₫** + H0 (⬜, ước vài chục nghìn) |
| **Vừa** (thêm D3, D6, D11, cảnh bàn bạch tuộc, đi vào hồ) | Tối thiểu + T2 + L2 + G1 | **~3,31 tr ₫** (+ K1 ⬜) |
| **Đủ** (đủ D2 ba đèn, D8 có CPL) | Vừa + L2 thứ hai + L3 + K1 + H1 | **~4,42 tr ₫ + K1 + H1 (⬜)** |

⚠ Không mua theo bảng này khi sếp chưa duyệt. Thứ tự mua nghiêng ~70 % là: **chân máy trước, đèn sau, gimbal sau cùng**,
vì 4/5 form cần máy đứng yên và cảnh đêm không cần đèn.

---

## F. Chỉnh màu: Đạo diễn đặt tông, Thợ dựng làm và đo

### F1. Luật màu thật
**Sai màu là nói sai về sản phẩm.** Mỏ neo màu (hồ sơ 3, 3c): thân **xanh ngọc bóng** · đuôi sơn **đỏ / vàng chanh / cam**, ngăn bằng vạch đen ·
LED: **trắng hồng / xanh lá / vàng cam** · cá cắn: **mọi đoạn ĐỎ**. Đỏ ra cam hoặc hồng thì người xem không còn thấy "cá cắn là đuôi chuyển đỏ".

| Lỗi | Cơ chế | Sửa | Nguồn · mức |
|---|---|---|---|
| Đỏ LED ra **cam / vàng** | Kênh R chạm trần (255) trong khi G còn tăng, nên tỉ lệ R:G bị mất | **Hạ phơi sáng lúc quay.** Dựng không cứu được kênh đã cháy | Bob Atkins; hỏi đáp UniquePhoto [N9] · Thấp → TB (3 nguồn khớp nhau, đều là hỏi đáp hoặc bài cá nhân) |
| Đỏ ra **hồng / trắng** | LED quá sáng tràn sang cả kênh G và B | Như trên, −2 đến −3 EV làm điểm bắt đầu | [N9] · Thấp |
| Đỏ **nhạt dần** khi cả đuôi đỏ | AWB lấy vùng sáng nhất làm chuẩn rồi kéo ngược màu | **Khoá WB** trước khi quay | [N9] · Thấp + cơ chế AWB · KTC |
| Phơi đúng mà vẫn lệch sắc nhẹ | LED phổ hẹp, bộ lọc màu của cảm biến | Chỉnh hue nhẹ ở dựng, so với khung thật | [N9] · Thấp |

### F2. Cân trắng
| Cảnh | Đặt khi quay | Dựng |
|---|---|---|
| Ngày (nắng, bóng râm) | Khoá WB ở **~5600 K** (preset Daylight), hoặc khoá AWB trên tờ giấy trắng hoặc thẻ xám | Thẻ xám ở khung đầu → đưa về **chấm giữa vectorscope** |
| Giờ xanh | **Giữ 5600 K**, đừng ấm hoá. Trời xanh là màu thật của giờ đó | Không kéo về trung tính |
| Đêm (D10–D12) | **Khoá cố định** (⚠ nghiêng ~60 % về 5000–5600 K, để đỏ ra đỏ và đoạn trắng hồng ra trắng hồng như video-01). Không dùng AWB | Đặt cạnh khung thật `that-ca-can-do-2.jpg` (khung đỏ sạch nhất) và `that-bat-nhieu-mau.jpg` để so |
Thẻ xám ở mỗi cảnh (giữ 2 s trước khi quay) là phép đo rẻ nhất: vật xám phải là **một chấm ở giữa vectorscope**, lệch là có ám màu [N6] · TB.

### F3. Tông đề xuất cho 17fishing (Đạo diễn đặt)
**"Thật, sạch, đêm đen trung tính."** Ngày: trung tính hơi ấm, độ bão hoà giữ nguyên hoặc +5 %. Đêm: nước **đen trung tính**
(không đẩy xanh cổ vịt), đuôi đúng màu hàng thật. Lý do: kiểu "teal & orange" sẽ kéo thân xanh ngọc và đỏ đuôi đi chỗ khác,
tức là đổi màu sản phẩm. Cách quay tự nhiên hợp feed (0c). ⚠ Nghiêng ~70 % · đổi ý nếu sếp có bộ nhận diện màu riêng cho shop.

Đo tông của video mẫu theo rea-video `aspects/grade.py` [N26] · Mã: bão hoà, tương phản, mức đen/trắng (phân vị 2 % / 98 % của L*; đen bị nâng = kiểu "film"),
teal-orange = b* của điểm ảnh gần trung tính ở 20 % tối nhất và 20 % sáng nhất. Họ ghi: **chuyển mã của nền tảng làm bão hoà giảm nhẹ và đè bẹp vùng tối**.
Hệ quả cho mình: không nâng đen để "giữ" mặt nước đêm; không bù bão hoà quá tay cho đỏ đuôi.

**LUT: không dùng LUT tạo phong cách.** Chỉ dùng LUT kỹ thuật khi quay Log (Apple Log, Blackmagic). Mức tối thiểu thì **không quay Log**.
Lý do: LUT là phép cơ học, còn "đẹp" phải có người quyết [N18] · Cao; và LUT áp lên mọi màu, kể cả màu sản phẩm.

### F4. Thợ dựng làm bằng gì (đã đọc SKILL.md và `--help`, chưa chạy lên tệp thật)
| Việc | Công cụ | Ghi chú |
|---|---|---|
| Chỉnh cân trắng, phơi sáng, bão hoà | `color.py in.mp4 --correct --temperature K --tint T --exposure E --saturation S` | Có cả lift/gamma/gain, levels, curves |
| LUT (chỉ LUT kỹ thuật) | `color.py in.mp4 --lut x.cube --lut-strength 0.6` | Đọc tệp `.cube` |
| HDR → SDR | `color.py clip.mov --to-sdr` (tonemap hable) | Khi lỡ quay HDR |
| Mức hợp chuẩn | `check.py final.mp4 --levels bt709` · kẹp: `color.py … --legalize bt709` | Đếm điểm ảnh ngoài dải |
| Mắt xem, so trước/sau | `look.py in.mp4 --at 5.04` · `look.py a.mp4 --compare b.mp4 --at 5` | Rút khung PNG để soi |
| **Vectorscope / waveform** | **Skill không có script.** ffmpeg (bản trên máy này) có bộ lọc `vectorscope`, `waveform`, `signalstats`, `lut3d`, `colortemperature`, `huesaturation` (`ffmpeg -filters`) | Đây là ffmpeg gốc ngoài skill (skill dặn không chạy ffmpeg gốc). Thợ dựng đã dùng ffmpeg gốc cho `blackdetect`, nên ghi rõ là ngoại lệ |

**Cách đo "đỏ đúng" (Thợ dựng chạy, Đạo diễn đọc):**
1. Cắt vùng đuôi (x 150–550 ở khung 720, như `09-dd-kiem-clip.md`). Đếm điểm ảnh **R > 200, G < 110, B < 110** trên khung đỏ. Nền vượt ≥ 4× là có cú đỏ (Nội bộ: S1 từ 44–112 lên 562).
2. Trên khung đỏ: điểm ảnh có **R = 255 và G > 150** là đỏ **đã cháy sang cam** → báo Đạo diễn (quay lại, không chỉnh màu che lỗi). ⚠ ngưỡng 150 là phán đoán, cần chỉnh theo đo thực.
3. Vectorscope của vùng đuôi đỏ phải nằm **cùng góc với vùng đỏ của khung thật** `that-ca-can-do-2.jpg`. ⚠ Lệch > ~10° là sai màu (ngưỡng phán đoán; kiểm lại khi có cảnh quay thật đầu tiên). `signalstats` cho trung bình hue và bão hoà của vùng cắt (tên khoá theo tài liệu ffmpeg, chưa chạy thử).
4. Thân xanh ngọc (cảnh ngày): đo như bước 3, so với `that-tat-cam-tay.jpg`.
Hue tính theo góc, bão hoà tính theo khoảng cách tới tâm; giữ màu trong các ô đích [N6] · TB (Larry Jordan + Videomaker/StudioBinder qua tìm kiếm).

---

## G. Danh sách cảnh một buổi: phao LED-425, hồ dịch vụ, 60–90 phút

**Đến hồ ~16 h 30.** Mục tiêu: nguyên liệu cho **5–6 video**: V1 chờ → bật · V2 trước → sau · V3 test · V4 so sánh · V5 mẹo · V6 "ngồi xa vẫn thấy".
Chuẩn bị ở nhà: sạc đèn và điện thoại, lau ống kính, 3 mã QF-01/02/03, pin CR425, một **phao thường** (cho "trước"), đèn soi, thẻ xám, khăn đen.
**Trung thực:** cảnh kích cảm biến bằng tay hoặc kéo dây thì chữ phải ghi **"thử cảm biến"**, không ghi "cá cắn" (`BAN-TRINH.md` mục 11 #6).
Chỉ cảnh cá cắn thật mới được gọi là cá cắn.

| # | Giờ | Form · video | Máy (vị trí) | Đèn | Quay | Ghi chú |
|---|---|---|---|---|---|---|
| 1 | 16:35 | Mẹo · V5 | Tay cầm POV, 35 cm, ống 1× | D7/D8 (ngày, bóng râm) | 3 × 15 s | Đảo chiều pin: ngày ↔ đêm. Cận chỗ lắp pin (hồ sơ còn ⬜ chỗ này). Thẻ xám 2 s |
| 2 | 16:45 | So sánh · V4 | Chân máy, từ trên xuống hoặc đứng dọc, 45 cm | D8 hoặc D6 (tấm hắt) | 2 × 10 s | 3 mã nằm song song, cạnh thước. Không lộ mã QF-04 |
| 3 | 16:50 | Test (ngày) · V3 | Sát nước 10 cm, cách 30 cm, chân máy | D8 + CPL (nếu có) | 2 × 20 s | Đuôi sơn đứng trên nước, đọc vạch như phao thường |
| 4 | 17:00 | Toàn cảnh · V6/hook | Gimbal đi bộ ra ghế câu | D8 → D9 | 2 × 15 s | Cảnh "bao la" của hồ, không phải thân |
| 5 | 17:15 | Chờ → bật · V1 | Chân máy sát nước 5–15 cm, 25–40 cm, khoá hết | **D9** | **Quay liên tục 15–20 phút** | Đèn bật (đảo pin chế độ đêm). Chờ cá thật. Đây là cảnh quý nhất: có trời, có nước, có cú đỏ thật |
| 6 | 17:20 | Trước → sau (vế "sau") · V2 | Như #5, **không xê dịch máy** | D9 | 2 × 20 s | Nếu #5 đang chạy thì quay ngay sau #5, cùng khung |
| 7 | 17:40 | Trước → sau (vế "trước") · V2 | **Cùng vị trí, cùng cài máy**, đổi sang phao thường | D11, đèn soi chĩa thẳng (cố ý loá) | 2 × 15 s | Dân câu tự thấy cái khó. Máy không động. AI không sinh được cảnh này (bài học H2) |
| 8 | 17:50 | Chờ → bật · V1 | Như #5 | **D10** (đêm, không đèn) | Liên tục 15 phút | Phơi sáng theo đỏ. Nếu chưa có cá cắn thật thì quay thêm 2 × 10 s "thử cảm biến" (ghi nhãn đúng) |
| 9 | 18:05 | Ngồi xa vẫn thấy · V6 | Ngang mắt người ngồi ghế (~1 m), phao 3–5 m | D10 | 2 × 30 s | Bằng chứng cho câu "ngồi xa vẫn thấy". 4K để cắt |
| 10 | 18:10 | Chờ → bật (bối cảnh) · V1/V6 | Như #8 | **D11** (hắt nước 1–5 %) | 2 × 30 s | Có vân nước. Kiểm không có cột sáng, đuôi là vật sáng nhất |
| 11 | 18:15 | Test · V3 | Chân máy 35 cm, ngang tay | **D12** | 3 × 10 s | Nhấc phao khỏi nước, đuôi đổi màu, tay rõ. Giữ đuôi cách lòng bàn tay |
| 12 | 18:20 | Mẹo · V5 | POV, 35 cm | D12 | 2 × 15 s | "Nhìn màu đuôi": nhiều màu = đang chờ, đỏ = cá cắn. Cất phao: lau khô, tháo pin, cho vào ống |
| 13 | 18:25 | Chèn (B-roll) | Bạch tuộc trên tay ghế | D10/D11 | 3 × 10 s | Tay cầm cần, mặt nước, thùng mồi, cho dựng chen |

**Tổng ~110 phút có mặt ở hồ, ~75–90 phút quay** (hai cảnh chờ chạy song song với việc sắp đồ). Ra 13 cảnh cho 6 video.
⚠ Rủi ro chính: không có cá cắn thật trong 30 phút chờ (#5, #8). Khi đó V1 dùng cảnh "thử cảm biến" có nhãn, và chọn hồ hoặc giờ cá ăn mạnh cho buổi sau.
Kiểm ngay tại hồ (2 phút sau #8): mở clip trên điện thoại, phóng to khung đỏ. **Lõi đỏ trắng hoặc cam thì hạ EV và quay lại ngay.**

---

## Nguồn (đọc ngày 11/11/2026)

**Đọc được (mở trang):**
- [N1] StudioBinder — Film lighting techniques: https://studiobinder.com/blog/film-lighting-techniques/ · Cao (trường nghề)
- [N2] StudioBinder — What is shutter speed (180°): https://www.studiobinder.com/blog/what-is-shutter-speed/ · Cao
- [N3] Ulanzi — Lighting small products for phone video: https://www.ulanzi.com/blogs/knowledges/product-video-lighting-small-products-phone · TB (hãng đèn; bài không có số)
- [N4] No Film School — 13 film lighting techniques: https://nofilmschool.com/film-lighting-techniques-and-examples · TB
- [N6] Larry Jordan — Learn how to read video scopes: https://larryjordan.com/articles/learn-how-to-read-video-scopes/ · TB
- [N7] Wikipedia — Polarizing filter (photography): https://en.wikipedia.org/wiki/Polarizing_filter_(photography) · TB
- [N9] UniquePhoto Q&A — bright LED turning orange/white: https://www.uniquephoto.com/community/qa/how-do-i-photograph-a-bright-led-light-source-without-it-turning-orange-or-white · Thấp
- [N10] Samsung Support — Pro mode: https://www.samsung.com/ae/support/mobile-devices/how-to-use-the-cameras-pro-mode-on-samsung-galaxy-phones · Cao
- [N11] Wikipedia — Blue hour: https://en.wikipedia.org/wiki/Blue_hour · TB
- [N12] App Store — Blackmagic Camera: https://apps.apple.com/be/app/id6449580241 · Cao
- [N13] iPhonePhotographySchool — AE/AF lock: https://iphonephotographyschool.com/ae-af-lock/ · TB
- [N19] TGDĐ — Ulanzi SK-21: https://www.thegioididong.com/gay-tu-suong/chan-tripod-magnetic-tu-bung-chan-nhanh-1-8m-ulanzi-sk-21
- [N20] TGDĐ — Ulanzi MT33: https://www.thegioididong.com/gay-tu-suong/chan-tripod-bach-tuoc-32cm-ulanzi-mt33
- [N21] Điện Máy Xanh — Ulanzi LM21: https://www.dienmayxanh.com/den-thong-minh/den-livestream-magnetic-gan-dien-thoai-2w-500mah-ulanzi-lm21
- [N22] TGDĐ — Ulanzi VL120RG: https://www.thegioididong.com/den-thong-minh/den-livestream-led-rgb-full-color-120-bong-5w-3100mah-ulanzi-vl120rg
- [N23] mytour.vn — Thiết lập ánh sáng quay video dưới 15 triệu (cập nhật 15/10/2026): https://mytour.vn/vi/blog/bai-viet/huong-dan-cach-thiet-lap-anh-sang-cho-quay-video-duoi-15-trieu-dong.html · Thấp
- [N24] CellphoneS — DJI OM 7: https://cellphones.com.vn/tay-cam-chong-rung-dji-om-7.html
- [N25] VnExpress — Quay video đẹp bằng smartphone (29/4/2016): https://vnexpress.net/quay-video-dep-bang-smartphone-3395174.html · Thấp (cũ; "chỉnh ISO, WB trước khi quay")

- [N26] JuneYaooo/rea-video (Apache-2.0, commit `3669923`), đọc bằng `gh api …/contents`, chỉ đọc, không cài: `rea_video/aspects/lighting.py` (bảng `SETUPS`), `camera.py`, `framing.py`, `grade.py` (đọc docstring và bảng). Ghi chép của phòng: `../nghien-cuu/2026-11-11-rea-video/01-pipeline.md` mục 6, `00-TONG-HOP.md` ý 9–10 · Thấp (bảng kinh nghiệm) / Mã

**Chỉ thấy qua kết quả tìm kiếm (Thấp):** [N7b] các bài CPL (PetaPixel, Digital Camera World, Shotkit) · [N8] Sony Support, chống nhấp nháy 50 Hz (sony.com.au 00122281) ·
[N12b] Neowin, Blackmagic Camera Android · [N13b] Apple Support/Community, AE/AF trong Video · [N14] Tom's Guide/Nerdschalk, Khoá WB iOS 17 ·
[N15] MacRumors, Croma, HDR Dolby Vision lên Instagram · [N16] Pixel Camera Help, Night Sight Video/Video Boost · Bob Atkins, red clipping · Videomaker, vectorscope.

**Bị chặn / không đọc được:** B&H Explora, product-photography-lighting (403) · Apple Support: video recording settings, advanced camera settings, Night mode
(trang trả về khung không có nội dung) · Tom's Guide (cắt cụt) · timeanddate, giờ lặn Hà Nội (403) · Shopee tìm kiếm (trống) · 2 trang danh mục TGDĐ/CellphoneS (404).

**Nội bộ:** `../../khach-hang/17fishing/san-pham/phao-ro-diec.md` (3, 3b, 3c) · `../../khach-hang/17fishing/viec/2026-11-11-phao-ro-diec-qc/09-dd-kiem-clip.md`, `BAN-TRINH.md` ·
`../nganh/do-cau-vn/video-nganh.md` · `KIEN-THUC-VIRAL.md` 0c, 0d · `../../nhan-su/vai/tho-dung.md` 3.1 ·
`~/.claude/skills/ffmpeg-skill/SKILL.md` + `color.py / look.py / check.py --help` [N18] · `ffmpeg -h filter=vectorscope|signalstats`, `ffmpeg -filters` (bản trên máy này).
