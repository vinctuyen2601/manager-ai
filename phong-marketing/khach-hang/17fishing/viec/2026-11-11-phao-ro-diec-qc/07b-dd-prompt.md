---
viec: dd.viet-prompt
nganh: do-cau-vn
trang_thai: chan
nhan: [07-dd-ke-hoach-hinh.md, ../../san-pham/phao-ro-diec.md (mục 3, 3c, 4, 5, 6), ../../../../nhan-su/vai/dao-dien-hinh-anh.md (§3.1–3.3, §5, §7, §10, §11), ../../../../nhan-su/viec/dd-viet-prompt.md, ../../../../quy-che/LUAT-CHUNG.md, ../../../../quy-che/khuon/phieu-giao.md, ../../../../thu-vien/nganh/do-cau-vn/MUC-LUC.md, ../../../../thu-vien/nganh/do-cau-vn/video-nganh.md, ../../../../thu-vien/nganh/do-cau-vn/hoi-dap/phao.md, D:/my project/gen-video-viral/CLAUDE.md, README.md, src/prompt.ts, src/cat.ts (thứ tự nhịp), vi-du/v01-ban2-kich-ban.json]
giao: [07b-dd-prompt.md, ../../../../thu-nghiem/muse/prd-g01-phao-ro-diec/prd-g01-kich-ban.json (gitignore — bản chép nguyên văn ở cuối tệp này), ../../../../thu-nghiem/muse/prd-g01-phao-ro-diec/prd-g01-prompt.md (máy sinh), ../../../../thu-nghiem/muse/prd-g01-phao-ro-diec/prd-g01-ke-hoach-cat.json (máy sinh)]
con_thieu: [NL/o3-led.jpg + NL/to-san-pham.jpg — cần trên máy Linux (gvv CHẶN 2 dòng), NL/video-01.mp4 — cần trên máy Linux (gvv CHẶN 1 dòng), hạn mức Muse tuần còn lại]
chi_phi: "0 $ · 0 % hạn mức (không gọi dịch vụ sinh nào); ước khi sếp bấm: 7,0 % × 1,3 = 9,1 %"
ngay: 2026-11-11
---

⚠ Việc `dd.viet-prompt` **chưa có bộ thi** (`dd-viet-prompt.thi/` chưa lập); vai chưa thi theo ngành → mọi phần mang ⚠, nhìn lại ở pha 4.
`trang_thai: chan` **chỉ vì 3 tệp thật không có trên máy Windows** (không phải lỗi nội dung): ngoài 3 dòng đó máy báo **0 cảnh báo**, cổng M0 của hồ sơ qua. Mở chặn = chạy lại một lệnh trên máy Linux (mục "Mở chặn").

```
gvv prompt: 2026-11-11 · CHẶN: 3 (cả 3 = "không thấy tệp" trên máy Windows: o3-led.jpg, to-san-pham.jpg, video-01.mp4) · cảnh báo: 0 (sửa 0, giữ có lý do 0)
Ước tính máy: 7,0 % · ước ở bảng cảnh: 7,0 % · ×1,3 = 9,1 % · trần 10 %
```

| Ảnh | Ảnh thật (tệp) | Tờ SP | Render — chỉ bao bì | ve_tham_chieu |
|---|---|---|---|---|
| S1-K | `NL/o3-led.jpg` (video-01 @4,0, đã cắt bỏ dải chữ vàng + logo mờ) ⬜ cần trên máy Linux | `NL/to-san-pham.jpg` ⬜ cần trên máy Linux | — (không có bao bì trong cảnh) | ảnh 1 = ảnh THẬT, chép MỘT phao 1:1, đuôi trước tiên · ảnh 2 = tờ 4 ảnh thật, lấy mọi chi tiết thân + đuôi · phao chỉ lấy từ ảnh, bối cảnh chỉ lấy từ chữ |
| S2-K | — (không có sản phẩm; phao thường chung chung) | — | — | — (không tải ảnh) |

**Quét phủ định** (`grep -n -i -w -E "no|not|never|without|off|don't|nothing" prd-g01-prompt.md`): 6 dòng trúng, **0 chỗ do vai này viết**.

| Dòng prompt | Chữ trúng | Nguồn | Đã làm |
|---|---|---|---|
| 26 (ảnh S1-K), 38 (ảnh S2-K), 48 (clip S1), 73 (clip S2) | "No text or captions added." | câu máy | giữ — câu của máy |
| 27 (ảnh S1-K), 49 (clip S1) | "no buttons, no switch and no screen" · "NOT a round bobber … NOT a red-and-white float, NOT a white or foam float, NO soft or bent tail, NO light on the body, NO USB port …, NO large logo …" | khối hồ sơ (PRODUCT) | giữ — khối hồ sơ; chờ phép thử A/B gói §12.1, sửa thì Chuyên viên SP sửa ở hồ sơ |

Phần mình viết dùng câu khẳng định thay phủ định: "the tail itself is unlit" (S2), "its body stays below the waterline and only its straight tail glows" (S1), câu khoá bố cục "The float, the water and the distant bank are the only things that ever appear; the composition stays exactly as it is in the first frame." Không nhắc tay/người/cần/cá ở bất cứ đâu (nhắc tên là gọi vật ra — gói §3.2).

## Mở chặn (máy Linux, trước bước 8)

1. `ls NL/` phải thấy `o3-led.jpg`, `to-san-pham.jpg`, `video-01.mp4`, `logo-17fishing.png`.
2. Chép JSON ở cuối tệp này vào `thu-nghiem/muse/prd-g01-phao-ro-diec/prd-g01-kich-ban.json` (đường dẫn trong JSON là **tương đối**, chạy được ở cả hai máy).
3. Trong `gen-video-viral`: `node src/cli.ts prompt <…>/thu-nghiem/muse/prd-g01-phao-ro-diec/prd-g01-kich-ban.json` → phải thoát mã 0, "0 CHẶN". Chữ prompt không đổi (máy chỉ kiểm tệp).

## Cho sếp chạy Muse (gói §11) — ảnh trước, kiểm, rồi clip

**Thứ tự:** (1) sinh **ảnh S1-K** và **ảnh S2-K** song song → (2) soi từng ảnh theo dòng "Kiểm"; sai thì sinh lại ảnh, **chưa** sinh clip → (3) **clip S1** chỉ tải ảnh S1-K; **clip S2** chỉ tải ảnh S2-K → (4) tải clip về `NL/` đặt tên đúng `S1.mp4`, `S2.mp4`.
**Hạn mức:** 2 ảnh × 0,5 + 2 clip × 3 = **7,0 %** tuần (×1,3 sinh lại = 9,1 %). Thiếu hạn mức thì bỏ S2-K + S2 (mất kiểu mở đầu so sánh) → 3,5 %.
**Luật dừng (03b, mặc định sếp):** clip S1 phải sinh lại quá 2 lượt thì bỏ kiểu so sánh (không sinh S2-K, S2).

Dán nguyên các khối dưới (máy ghép, khối PRODUCT nguyên văn hồ sơ mục 5):

### Ảnh S1-K — tải `o3-led.jpg` + `to-san-pham.jpg`

```
media-generation, type image, --orientation vertical
Reference: o3-led.jpg, to-san-pham.jpg (image 1: a REAL close-up photo of the exact float with its tail LED glowing in several colours, copy ONE float from it 1:1, tail first; image 2: a sheet of four REAL photos of the same float, use it for every detail of the body and the tail. The float comes only from the images; the setting comes only from the text)

Vertical 9:16 photo, deep night at an ordinary Vietnamese commercial fishing pond. Close-up, camera low just above the water, locked still, eye level with the tail. One single LED-425 float stands perfectly upright in calm dark water at the horizontal centre of the frame. Its mint-turquoise body sits below the surface as a faint glimmer, and the upper part of its needle-thin, perfectly straight tail rises out of the water, several segments above the surface, each segment glowing its own colour (pinkish white, green or amber) like a string of lit beads. The waterline crosses the frame just below the middle; the lower half of the frame is calm black water with soft ripples and a small coloured reflection of the glowing tail. Far behind, softly out of focus: the dark opposite bank with two or three dim warm lamps and a row of fishing umbrellas. The glowing tail is the brightest thing in the frame. Natural phone-camera look, slight grain. The float, the water and the distant bank are the only things in the frame; the composition stays exactly as described. No text or captions added.
PRODUCT (keep exactly): LED-425 electric bite-alarm fishing float, a slim stick float with a light-up tail. SHAPE: one long, thin, perfectly straight stick about 40 cm long; from bottom to top: a short thin black stem, a slim spindle-shaped body that is widest just below its top and tapers down to the stem, a short black neck, then a very long thin straight tail. MATERIAL & COLOUR: the body is glossy mint-turquoise with one thin black ring near its top, a soft dark-teal ink-wash pattern of tall pointed leaves on its lower half, and a tiny round stamp near the bottom; the tail is a rigid, needle-thin glass rod painted in short alternating segments of red, lime-yellow and orange separated by thin black bands. FRONT: no buttons, no switch and no screen on the float. KEY PART: the tail. Unlit, it shows only the painted red, lime-yellow and orange segments. When the night LED is on, each tail segment glows its own colour — pinkish white, green or amber — like a string of lit beads. When a fish bites, every glowing segment of the tail turns bright red at the same moment. The tail is ALWAYS visible and always perfectly straight. SCALE (from real footage): the body is thinner than an adult finger and longer than the width of an adult palm; the tail is longer than the body. INCLUDED: one small CR425 pin battery. Reproduce the product 1:1 from the reference image: same shape, same colours, all surface details. NOT a round bobber or ball float, NOT a red-and-white float, NOT a white or foam float, NO soft or bent tail, NO light on the body (only the tail glows), NO USB port or charging cable, NO large logo or writing on the float.
```

**Kiểm:** MỘT phao duy nhất, đứng thẳng giữa khung, chỉ phần đuôi nhô khỏi mặt nước (thân xanh ngọc chìm, mờ dưới nước) · đuôi thẳng tuyệt đối, mảnh như kim — sai nếu cong, mềm, to · đuôi sáng NHIỀU MÀU theo đoạn (trắng hồng, xanh lá, vàng cam) như chuỗi hạt — sai nếu cả đuôi một màu hoặc đã đỏ · chỉ đuôi sáng; thân không phát sáng; không phao tròn, không phao trắng/xốp, không cổng sạc · không tay, không người, không cần câu trong khung; không chữ, không logo; không viên pin nào trong cảnh (khối PRODUCT có câu INCLUDED … battery) · mặt nước chiếm nửa dưới (đường nước ~45–60 % chiều cao) — chừa chỗ chữ ở vùng nước tối

### Ảnh S2-K — KHÔNG tải ảnh nào (cảnh không có sản phẩm)

```
media-generation, type image, --orientation vertical
Reference: 

Vertical 9:16 photo, deep night at an ordinary Vietnamese commercial fishing pond, same framing as a matching shot: close-up, camera low just above the water, locked still, eye level with the tail. One plain generic stick float stands upright at the horizontal centre of the frame; the upper part of its thin tail rises out of the dark water, painted in faded matte bands of dull orange and black, and the tail itself is unlit. A harsh white flashlight beam from the shore hits the tail and the water around it: a bright glare spot and a long white streak of reflection on the ripples wash over the painted bands, so the bands blur together and are hard to tell apart. The waterline crosses the frame just below the middle; the lower half is dark water with ripples. Far behind, softly out of focus: the dark opposite bank with two or three dim warm lamps and a row of fishing umbrellas. Natural phone-camera look, slight grain. The float, the water, the beam and the distant bank are the only things in the frame; the composition stays exactly as described. No text or captions added.
```

**Kiểm:** phao chung chung: đuôi sơn cam/đen bạc màu, KHÔNG phát sáng, không xanh ngọc — không được giống LED-425 · vệt đèn soi trắng gắt làm vạch khó đọc (đúng ý 'về khuya mắt mỏi') · cùng khuôn với S1-K: phao giữa khung, đường nước ngay dưới giữa khung, góc thấp sát mặt nước · không tay, không người, không chữ, không nhãn hiệu

### Clip S1 — 10 s · CHỈ tải **ảnh S1-K**

```
media-generation, type video, --orientation vertical, 10 seconds, --image-file <ảnh S1-K>

Use only this image as the first frame. Vertical 9:16, one continuous take for the whole clip, camera locked on a tripod at water level, deep night at an ordinary commercial fishing pond. The float stays upright at the centre of the frame for the whole clip; its body stays below the waterline and only its straight tail glows. Calm dark water, soft natural ripples, quiet night sound of water and insects. The float, the water and the distant bank are the only things that ever appear; the composition stays exactly as it is in the first frame. No text or captions added.
PRODUCT (keep exactly): LED-425 electric bite-alarm fishing float, a slim stick float with a light-up tail. SHAPE: one long, thin, perfectly straight stick about 40 cm long; from bottom to top: a short thin black stem, a slim spindle-shaped body that is widest just below its top and tapers down to the stem, a short black neck, then a very long thin straight tail. MATERIAL & COLOUR: the body is glossy mint-turquoise with one thin black ring near its top, a soft dark-teal ink-wash pattern of tall pointed leaves on its lower half, and a tiny round stamp near the bottom; the tail is a rigid, needle-thin glass rod painted in short alternating segments of red, lime-yellow and orange separated by thin black bands. FRONT: no buttons, no switch and no screen on the float. KEY PART: the tail. Unlit, it shows only the painted red, lime-yellow and orange segments. When the night LED is on, each tail segment glows its own colour — pinkish white, green or amber — like a string of lit beads. When a fish bites, every glowing segment of the tail turns bright red at the same moment. The tail is ALWAYS visible and always perfectly straight. SCALE (from real footage): the body is thinner than an adult finger and longer than the width of an adult palm; the tail is longer than the body. INCLUDED: one small CR425 pin battery. Reproduce the product 1:1 from the reference image: same shape, same colours, all surface details. NOT a round bobber or ball float, NOT a red-and-white float, NOT a white or foam float, NO soft or bent tail, NO light on the body (only the tail glows), NO USB port or charging cable, NO large logo or writing on the float.

0.0–1.2s: Hold still: the tail glows in its several colours, pinkish white, green and amber segments, and the water around it is calm with tiny ripples.
1.2–1.5s: The tail dips very slightly, a few millimetres, and a small ring of ripples spreads from it.
1.5s: At this instant every glowing segment of the tail turns bright red at the same moment; the red light reflects on the ripples around it.
1.5–2.4s: The tail stays fully bright red and bobs gently down and up once; the red reflection trembles on the water.
2.4–2.8s: The tail returns to its several colours, pinkish white, green and amber.
2.8–6.0s: Long calm hold: the tail stands still and perfectly straight, glowing in its several colours; slow soft ripples drift across the dark water.
6.0–6.3s: The tail dips very slightly again; a small ring of ripples spreads from it.
6.3s: Every glowing segment of the tail turns bright red at the same moment, red light spreading across the ripples.
6.3–7.3s: The tail stays fully bright red and steady, its red reflection shimmering on the water.
7.3–7.7s: The tail returns to its several colours, pinkish white, green and amber.
7.7–10.0s: Calm hold to the end: the tail stands straight in its several colours on the still dark water; the frame stays exactly the same.
```

**Dựng lấy:** hook-h1 (0.0–3.8s → 2.5s, cú bật rơi 1.5s) · than-b (4.0–10.0s → 3.5s, cú bật rơi 6.1s)

**Kiểm:** MỘT cảnh liền, máy đứng yên, phao giữa khung suốt clip · đuôi thẳng, mảnh; chỉ đuôi sáng, thân chìm không sáng · nhiều màu → nhấp khẽ → CẢ đuôi đỏ cùng lúc (~1 s) → về nhiều màu; có 2 lần đỏ, lần đầu ≤ ~2,5 s · đỏ là đỏ tươi trên MỌI đoạn đang sáng — sai nếu chỉ một đoạn đỏ · không tay, cần, cá, người hiện ra; xem kỹ 2 giây cuối (vật lạ, trôi phong cách)

### Clip S2 — 8 s · CHỈ tải **ảnh S2-K**

```
media-generation, type video, --orientation vertical, 8 seconds, --image-file <ảnh S2-K>

Use only this image as the first frame. Vertical 9:16, one continuous take for the whole clip, camera locked at water level, deep night at an ordinary commercial fishing pond. The generic float stays upright at the centre of the frame for the whole clip; its painted tail stays unlit and is lit only by the harsh white flashlight beam from the shore. The float, the water, the beam and the distant bank are the only things that ever appear; the composition stays exactly as it is in the first frame. No text or captions added.

0.0–2.0s: Hold: the painted tail stands in the white glare; ripples drift through the bright reflection streak.
2.0–2.6s: The tail dips very slightly, a tiny movement half lost in the glare and the shimmering reflection.
2.6–5.0s: The tail rises back and stands still; the glare keeps washing over the painted bands.
5.0–8.0s: Calm hold to the end: the beam wavers slightly, the tail stays in the glare, the frame stays the same.
```

**Kiểm:** phao vẫn là phao thường, đuôi KHÔNG phát sáng suốt clip · cú nhấp 2,0–2,6 s khó nhận ra trong loá (đúng ý so sánh) · một cảnh liền, máy đứng yên, phao giữa khung

**Ghi chú tải ảnh S2-K:** máy in dòng `Reference:` trống — với S2-K **không tải ảnh nào**, chỉ dán chữ (cảnh không có sản phẩm).

## Cho Thợ dựng (gói §11) — `prd-g01-ke-hoach-cat.json`

| Clip | Dùng đoạn nào | Bỏ đoạn nào, vì sao |
|---|---|---|
| S1 | **hook-h1** 0,0–3,8 s → 2,5 s, đỏ rơi 1,5 s · **than-b** 4,0–10,0 s → 3,5 s, đỏ rơi 6,1 s · H2 phải 0,3–2,8 s (đỏ ~1,2 s) · H3 2,8–5,2 s (chưa đỏ, chậm ×0,96; dự phòng 7,7–10,0) · C6 lấy đoạn than-b | 2 giây cuối (8–10 s) chỉ làm dự phòng: Muse hay trôi/thêm vật lạ ở đuôi clip |
| SHOP (`video-01.mp4`) | **than-a** 6,1–10,1 s → 2,5 s, đỏ 7,67 rơi 3,77 s (tức lấy 6,40 → 8,90) | đỏ lần 1 (5,10), lần 3 (10,23), lần 4 — luật "chỉ một lần đỏ" (03b) |
| S2 | H2 trái 0,0–3,0 s → 2,5 s; ghép đôi dọc với S1 (mỗi bên cắt giữa 360 px — phao nằm giữa khung) | — |

⚠ Ba điều phải biết trước khi chạy `gvv cat`:
1. **Thứ tự nhịp** trong kế hoạch cắt máy sinh là `hook-h1, than-b, than-a` (máy xếp theo thứ tự clip trong JSON, `src/cat.ts`). Bản H1 đúng là **hook-h1 → than-a → than-b**: chuyển khối `than-a` lên thứ hai trước khi `gvv cat --dung`.
2. **Cú bật của món này là đổi MÀU, không phải bật SÁNG.** `gvv cat` đo cú bật bằng độ sáng tăng; nhiều màu → đỏ có thể không sáng hơn → máy sẽ báo "⚠ KHÔNG đo được cú bật". Khi đó đo khung đỏ bằng % điểm ảnh đỏ như phiếu 03 (R > 200, G < 110, B < 110) rồi đặt tay.
3. Kế hoạch cắt chỉ dựng **bản H1** (mốc so trong lô). H2 (chia đôi) và H3 dựng tay theo bảng trên; chữ theo bảng 06 (máy không có vùng `duoi-an-toan`).

---

## Đã kiểm (có nguồn)
- `gvv prompt` chạy 11/11 trên máy Windows: thoát mã 2, **3 CHẶN đều là "không thấy tệp"**, 0 cảnh báo; hồ sơ qua cổng M0 (không có dòng chặn hồ sơ) — đầu ra lệnh
- Khối PRODUCT dán nguyên văn từ hồ sơ mục 5 (máy ghép, không gõ tay) — `prd-g01-prompt.md` dòng 27, 49
- Mọi ảnh/clip có sản phẩm có `PRODUCT` + ảnh thật + tờ sản phẩm; S2 không có SP nên không khối, không tham chiếu — dd-viet-prompt luật 1
- Quét phủ định: 0 chỗ "mình viết"; 6 dòng trúng = câu máy + khối hồ sơ — bảng quét trên
- Không nhịp nào bảo Muse vẽ chữ/logo; không nhắc tay/người (máy không báo thiếu CHARACTER) — đầu ra lệnh
- Nhịp phủ kín 0 → 10 s (S1) và 0 → 8 s (S2), không hở — đầu ra lệnh (0 cảnh báo hở)
- Cửa sổ dựng: hook-h1 3,8/2,5 = 1,52× · than-b 6,0/3,5 = 1,71× · than-a 4,0/2,5 = 1,6× (≥ 1,2×, đích 1,5×) — JSON
- Ước máy 7,0 % = ước bảng cảnh 07 — dd-viet-prompt luật 5 qua
- Đọc lại khối sau ghép: không thấy câu tự mâu thuẫn với cảnh (khối tả "When the night LED is on…/When a fish bites…" khớp nhịp)

## Suy ra ⚠
- **Khối PRODUCT có câu "INCLUDED: one small CR425 pin battery."** — câu này có ích cho cảnh mở gói nhưng trong cảnh mặt hồ có thể gọi Muse vẽ **một viên pin** vào khung (nhắc tên là gọi vật ra, gói §3.2). Đã thêm vào dòng "Kiểm" của S1-K. Đề xuất cho Chuyên viên SP (vai này không sửa hồ sơ): tách câu INCLUDED ra khỏi khối dán cho cảnh không có gói
- Phao đứng trên nước chỉ nổi phần đuôi (câu 2–4 vạch); prompt cho "several segments above the surface" — nhiều vạch hơn thực tế một chút để đuôi đủ to trong khung; cần thủ có thể thấy "chưa cân chuẩn" — `hoi-dap/phao.md`, hồ sơ dòng 41
- Mốc đỏ trong prompt (1,5 s · 6,3 s) sẽ lệch ~1 s trên clip thật — gói §3.3; cửa sổ dựng đã rộng ≥ 1,5× để hút độ lệch

## Còn thiếu ⬜
- `o3-led.jpg`, `to-san-pham.jpg`, `video-01.mp4` (+ `logo-17fishing.png` cho thẻ kết) — chỉ ở máy Linux; chặn giao `gvv prompt` 0 CHẶN và bước 10
- Hạn mức Muse tuần còn lại — brief 04 câu 1 (mặc định đủ)

## Phán đoán
- **Chạy lại trên Linux ra 0 CHẶN ⬜:** nghiêng về có · ~85 % · vì 3 dòng chặn đều là tệp vắng, phiếu 02 ô `giao` ghi đúng các tên `NL/o1..o4-*.jpg`, `NL/to-san-pham.jpg`, và `video-01.mp4` có ở bước 3 (`goc.mp4` trùng byte) · đổi ý nếu `o3-led.jpg` thật ra mang tên khác (phiếu 02 chỉ ghi chắc `o1-cam-tay`, `o2-than`, `o3-led`, `o4-do` ở bảng ô) · kiểm bằng lệnh ở "Mở chặn", ngưỡng thoát mã 0, hạn trước bước 8
- **Muse vẽ thêm viên pin vào cảnh S1 ⬜:** nghiêng về **không** · ~75 % · vì câu INCLUDED nằm giữa khối dài, còn mô tả cảnh và câu khoá bố cục liệt kê đủ vật có mặt · đổi ý nếu S1-K có vật nhỏ lạ nổi trên nước · kiểm bằng dòng "Kiểm" S1-K, ngưỡng 0 vật lạ, hạn lượt ảnh đầu
- **`gvv cat` đo được cú đỏ bằng độ sáng ⬜:** nghiêng về **không** đo được · ~60 % · vì đổi nhiều màu (có trắng hồng sáng) sang đỏ thường không tăng độ sáng; phiếu 03 phải tự đo bằng % điểm ảnh đỏ · đổi ý nếu máy in "cú bật đo được ở …" trùng khung đỏ nhìn bằng mắt · kiểm bằng chạy `gvv cat` rồi so 2 khung quanh mốc, ngưỡng lệch ≤ 0,25 s, hạn bước 10

## Đã tự quyết (sếp không cần làm gì)
- JSON đặt ở `thu-nghiem/` (gitignore) để đầu ra máy sinh không lẫn vào thư mục việc; chép nguyên văn JSON ở cuối tệp này để mang sang máy Linux
- Tham chiếu thân SP là `o3-led.jpg` (đã xoá chữ), không phải `that-bat-nhieu-mau.jpg` (dính dải chữ vàng)
- S2 dài 8 s (đủ 2,5 s hook + dư), cùng giá một clip
- Không chèn bảng chữ vào kế hoạch cắt — chữ là của bảng 06, Thợ dựng chèn

## Cần sếp (tối đa 3, viết lời thường)
1. Prompt đã viết xong nhưng máy kiểm báo thiếu 3 tệp (ảnh mẫu thật của phao và video anh quay) vì các tệp đó chỉ có trên máy Linux. Em ghép lại trên máy Linux bằng một lệnh trước khi anh bấm Muse được không? Mặc định nếu anh không trả lời: ghép lại trên máy Linux, chữ prompt giữ nguyên, rồi mới đưa anh bấm.
2. Nếu cảnh phao trên mặt hồ chỉ ra **một** lần đổi đỏ (em xin hai lần để dùng cho cả đoạn mở và đoạn giữa), anh cho sinh lại một lượt (thêm khoảng 3 % hạn mức) hay dùng chung một lần đỏ đó? Mặc định nếu anh không trả lời: sinh lại một lượt; quá 2 lượt thì bỏ kiểu mở đầu so sánh như đã chốt.

---

## Phụ lục — kịch bản cảnh JSON (chép nguyên văn `thu-nghiem/muse/prd-g01-phao-ro-diec/prd-g01-kich-ban.json`)

```json
{
  "ten": "prd-g01",
  "ho_so": "../../../khach-hang/17fishing/san-pham/phao-ro-diec.md",
  "thu_muc_media": "../../san-pham/phao-ro-diec/phao-dien-cam-bien-ro-diec-tieu-ngu-nhi-led-425",
  "khung": { "rong": 720, "cao": 1280, "fps": 30 },
  "anh": [
    {
      "ten": "S1-K",
      "tham_chieu": ["o3-led.jpg", "to-san-pham.jpg"],
      "ve_tham_chieu": "image 1: a REAL close-up photo of the exact float with its tail LED glowing in several colours, copy ONE float from it 1:1, tail first; image 2: a sheet of four REAL photos of the same float, use it for every detail of the body and the tail. The float comes only from the images; the setting comes only from the text",
      "mo_ta": "Vertical 9:16 photo, deep night at an ordinary Vietnamese commercial fishing pond. Close-up, camera low just above the water, locked still, eye level with the tail. One single LED-425 float stands perfectly upright in calm dark water at the horizontal centre of the frame. Its mint-turquoise body sits below the surface as a faint glimmer, and the upper part of its needle-thin, perfectly straight tail rises out of the water, several segments above the surface, each segment glowing its own colour (pinkish white, green or amber) like a string of lit beads. The waterline crosses the frame just below the middle; the lower half of the frame is calm black water with soft ripples and a small coloured reflection of the glowing tail. Far behind, softly out of focus: the dark opposite bank with two or three dim warm lamps and a row of fishing umbrellas. The glowing tail is the brightest thing in the frame. Natural phone-camera look, slight grain. The float, the water and the distant bank are the only things in the frame; the composition stays exactly as described.",
      "khoi": ["PRODUCT"],
      "kiem": [
        "MỘT phao duy nhất, đứng thẳng giữa khung, chỉ phần đuôi nhô khỏi mặt nước (thân xanh ngọc chìm, mờ dưới nước)",
        "đuôi thẳng tuyệt đối, mảnh như kim — sai nếu cong, mềm, to",
        "đuôi sáng NHIỀU MÀU theo đoạn (trắng hồng, xanh lá, vàng cam) như chuỗi hạt — sai nếu cả đuôi một màu hoặc đã đỏ",
        "chỉ đuôi sáng; thân không phát sáng; không phao tròn, không phao trắng/xốp, không cổng sạc",
        "không tay, không người, không cần câu trong khung; không chữ, không logo; không viên pin nào trong cảnh (khối PRODUCT có câu INCLUDED … battery)",
        "mặt nước chiếm nửa dưới (đường nước ~45–60 % chiều cao) — chừa chỗ chữ ở vùng nước tối"
      ]
    },
    {
      "ten": "S2-K",
      "tham_chieu": [],
      "mo_ta": "Vertical 9:16 photo, deep night at an ordinary Vietnamese commercial fishing pond, same framing as a matching shot: close-up, camera low just above the water, locked still, eye level with the tail. One plain generic stick float stands upright at the horizontal centre of the frame; the upper part of its thin tail rises out of the dark water, painted in faded matte bands of dull orange and black, and the tail itself is unlit. A harsh white flashlight beam from the shore hits the tail and the water around it: a bright glare spot and a long white streak of reflection on the ripples wash over the painted bands, so the bands blur together and are hard to tell apart. The waterline crosses the frame just below the middle; the lower half is dark water with ripples. Far behind, softly out of focus: the dark opposite bank with two or three dim warm lamps and a row of fishing umbrellas. Natural phone-camera look, slight grain. The float, the water, the beam and the distant bank are the only things in the frame; the composition stays exactly as described.",
      "kiem": [
        "phao chung chung: đuôi sơn cam/đen bạc màu, KHÔNG phát sáng, không xanh ngọc — không được giống LED-425",
        "vệt đèn soi trắng gắt làm vạch khó đọc (đúng ý 'về khuya mắt mỏi')",
        "cùng khuôn với S1-K: phao giữa khung, đường nước ngay dưới giữa khung, góc thấp sát mặt nước",
        "không tay, không người, không chữ, không nhãn hiệu"
      ]
    }
  ],
  "clip": [
    {
      "ten": "S1",
      "khung_dau": "S1-K",
      "dai": 10,
      "phong_cach": "Vertical 9:16, one continuous take for the whole clip, camera locked on a tripod at water level, deep night at an ordinary commercial fishing pond. The float stays upright at the centre of the frame for the whole clip; its body stays below the waterline and only its straight tail glows. Calm dark water, soft natural ripples, quiet night sound of water and insects. The float, the water and the distant bank are the only things that ever appear; the composition stays exactly as it is in the first frame.",
      "khoi": ["PRODUCT"],
      "nhip": [
        { "tu": 0, "den": 1.2, "mo_ta": "Hold still: the tail glows in its several colours, pinkish white, green and amber segments, and the water around it is calm with tiny ripples." },
        { "tu": 1.2, "den": 1.5, "mo_ta": "The tail dips very slightly, a few millimetres, and a small ring of ripples spreads from it." },
        { "tu": 1.5, "mo_ta": "At this instant every glowing segment of the tail turns bright red at the same moment; the red light reflects on the ripples around it." },
        { "tu": 1.5, "den": 2.4, "mo_ta": "The tail stays fully bright red and bobs gently down and up once; the red reflection trembles on the water." },
        { "tu": 2.4, "den": 2.8, "mo_ta": "The tail returns to its several colours, pinkish white, green and amber." },
        { "tu": 2.8, "den": 6.0, "mo_ta": "Long calm hold: the tail stands still and perfectly straight, glowing in its several colours; slow soft ripples drift across the dark water." },
        { "tu": 6.0, "den": 6.3, "mo_ta": "The tail dips very slightly again; a small ring of ripples spreads from it." },
        { "tu": 6.3, "mo_ta": "Every glowing segment of the tail turns bright red at the same moment, red light spreading across the ripples." },
        { "tu": 6.3, "den": 7.3, "mo_ta": "The tail stays fully bright red and steady, its red reflection shimmering on the water." },
        { "tu": 7.3, "den": 7.7, "mo_ta": "The tail returns to its several colours, pinkish white, green and amber." },
        { "tu": 7.7, "den": 10.0, "mo_ta": "Calm hold to the end: the tail stands straight in its several colours on the still dark water; the frame stays exactly the same." }
      ],
      "dung": [
        { "ten": "hook-h1", "tu": 0, "den": 3.8, "dai": 2.5, "can": "neo", "neo_luc": 1.5 },
        { "ten": "than-b", "tu": 4.0, "den": 10.0, "dai": 3.5, "can": "neo", "neo_luc": 6.1 }
      ],
      "kiem": [
        "MỘT cảnh liền, máy đứng yên, phao giữa khung suốt clip",
        "đuôi thẳng, mảnh; chỉ đuôi sáng, thân chìm không sáng",
        "nhiều màu → nhấp khẽ → CẢ đuôi đỏ cùng lúc (~1 s) → về nhiều màu; có 2 lần đỏ, lần đầu ≤ ~2,5 s",
        "đỏ là đỏ tươi trên MỌI đoạn đang sáng — sai nếu chỉ một đoạn đỏ",
        "không tay, cần, cá, người hiện ra; xem kỹ 2 giây cuối (vật lạ, trôi phong cách)"
      ]
    },
    {
      "ten": "SHOP",
      "da_co": "video-01.mp4",
      "dai": 15.32,
      "phong_cach": "",
      "nhip": [{ "tu": 0, "den": 15.32, "mo_ta": "video thật của shop (cầm tay, đổi đỏ 4 lần)" }],
      "dung": [
        { "ten": "than-a", "tu": 6.1, "den": 10.1, "dai": 2.5, "can": "neo", "neo_luc": 3.77 }
      ]
    },
    {
      "ten": "S2",
      "khung_dau": "S2-K",
      "dai": 8,
      "phong_cach": "Vertical 9:16, one continuous take for the whole clip, camera locked at water level, deep night at an ordinary commercial fishing pond. The generic float stays upright at the centre of the frame for the whole clip; its painted tail stays unlit and is lit only by the harsh white flashlight beam from the shore. The float, the water, the beam and the distant bank are the only things that ever appear; the composition stays exactly as it is in the first frame.",
      "nhip": [
        { "tu": 0, "den": 2.0, "mo_ta": "Hold: the painted tail stands in the white glare; ripples drift through the bright reflection streak." },
        { "tu": 2.0, "den": 2.6, "mo_ta": "The tail dips very slightly, a tiny movement half lost in the glare and the shimmering reflection." },
        { "tu": 2.6, "den": 5.0, "mo_ta": "The tail rises back and stands still; the glare keeps washing over the painted bands." },
        { "tu": 5.0, "den": 8.0, "mo_ta": "Calm hold to the end: the beam wavers slightly, the tail stays in the glare, the frame stays the same." }
      ],
      "kiem": [
        "phao vẫn là phao thường, đuôi KHÔNG phát sáng suốt clip",
        "cú nhấp 2,0–2,6 s khó nhận ra trong loá (đúng ý so sánh)",
        "một cảnh liền, máy đứng yên, phao giữa khung"
      ]
    }
  ],
  "the_ket": {
    "logo": "../../san-pham/phao-ro-diec/phao-dien-cam-bien-ro-diec-tieu-ngu-nhi-led-425/logo-17fishing.png",
    "slogan": ["Cá cắn là đuôi chuyển đỏ"],
    "dai": 2.0
  }
}
```
