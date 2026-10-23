# Video 01 — Santa Spins × khung 01 (FrostGlow)

Đường sinh: **Muse**. Khung: `../../khung/reel-01-frostglow.md` (đọc "Phân tích lại theo sổ
tay" trước). Media ở `thu-nghiem/muse/` (gitignore).

**Bản 3 — viết lại 23/10 theo sổ tay mục 0–0d.** Bản cũ trong lịch sử git.

## Cách chia clip (chủ dự án 23/10)

Muse sinh tối đa **10 s** một clip → **không băm video thành clip 1–3 s**. Mỗi clip gần trọn
10 s và **chứa nhiều đoạn ngắn**, prompt mô tả từng đoạn theo mốc giây. Video ~12 s = **2 clip
video + 1 ảnh khung đầu** (≈ 6–7 % hạn mức tuần).

| Clip | Phần của khung | Dùng trong video | Tải lên Muse |
|---|---|---|---|
| **A** | Siêu thị → xe đẩy → mở hộp ở phòng khách → gắn lên tủ lạnh (ban ngày) | 0 → 7,4 s | **không tải ảnh** |
| **K** (ảnh) | Khung đầu cảnh tối: máy trên tủ lạnh, đèn TẮT, tay cầm đĩa | — | `santa-spins-hand-disc-9x16.jpg` làm tham chiếu |
| **B** | TỐI: đặt đĩa → bật → cận đĩa → đổi đĩa → toàn cảnh bếp | 7,4 → ~11,9 s | **chỉ ảnh K** |

## Giữ nguyên từ khung (LÕI)

POV, chỉ thấy tay **áo len đan kem** · một dòng chữ cố định gọi danh tính, không nói sản phẩm
làm gì · thứ tự **siêu thị → xe đẩy → mở hộp → lắp → TỐI bật → leo thang** · **ngày → tối** ·
cú bật trong **một cảnh liền**, ngay sau chỗ nhạc vào · ~12 s, kết ngay sau đỉnh.

## Sửa điểm yếu của khung gốc

- Thêm **mồi bình luận** đúng giây đèn sáng (học khung 03): chữ thứ hai `Comment "SANTA" if you'd want one 🥹🎁`.
- Cú bật nhỏ hơn bức tường → bù **bao la**: đèn sáng **cùng lúc nhạc vang**, rồi lùi ra thấy **cả căn bếp đổi không khí**.

## Kịch bản mô tả (video cuối, ~12 s)

| Giây | Cảnh | Nguồn |
|---|---|---|
| 0 → 1,6 | Lối siêu thị lớn (trần cao, đèn sáng, kệ kim loại trắng xếp kín **hàng trăm vali đỏ khoá vàng** giống hệt nhau); tay áo len kem với vào kệ, rút một vali | A |
| 1,6 → 2,6 | Giơ **mặt trước vali** sát máy: da đỏ, hai khoá cài vàng | A |
| 2,6 → 3,6 | Thả vali vào xe đẩy tay cầm xanh | A |
| 3,6 → 4,6 | Phòng khách ban ngày: bàn trà đá sáng, cây thông đèn vàng, lò sưởi treo tất; đặt vali lên bàn | A |
| 4,6 → 6,2 | Bật hai khoá, mở nắp: lót kem, **máy vuông ở giữa, 9 đĩa xếp quanh**, chữ vàng trong nắp | A |
| 6,2 → 7,4 | Bếp ban ngày: áp máy lên cửa tủ lạnh trắng, gắn hai đĩa nam châm bên dưới | A |
| 7,4 → 7,9 | **TỐI.** Bếp tắt đèn, chỉ còn đèn cây thông ấm phía sau; máy tắt; tay đưa một đĩa lại gần | B |
| **7,9** | **Đặt đĩa → vòng đèn trắng ấm bừng sáng, đĩa quay, nhạc vào**; chữ đổi sang mồi bình luận | B |
| 7,9 → 9,1 | Giữ, tay rút ra, máy đẩy nhẹ vào | B |
| 9,1 → 10,1 | Cận: đĩa quay, từng hạt LED | B |
| 10,1 → 11,1 | Tay đổi sang đĩa khác — đèn vẫn sáng | B |
| 11,1 → ~11,9 | Lùi rộng: cả bếp tối, chỉ có vòng đèn máy + đèn cây thông + dây đèn | B |

**Chữ 1** (0 → 7,8 s), trên cùng: `Christmas people, you NEED to see this... 🎄😍`
**Chữ 2** (7,9 → hết), nửa dưới: `Comment "SANTA" if you'd want one 🥹🎁`
Chữ và nhạc **trợ lý chèn khi dựng** (ffmpeg) — không bảo Muse vẽ chữ (Muse vẽ chữ sai, đo 23/10).

## Prompt Muse

### Clip A — 10 s — KHÔNG tải ảnh nào

```
media-generation, type video, --orientation vertical, 10 seconds

Vertical 9:16, handheld first-person POV, phone camera, natural light, slightly shaky.
Only the hands are visible, in a cream cable-knit sweater. No faces. No text, no logos,
no brand names anywhere. Ambient sound only, no music.

0.0–1.6s: A wide aisle of a large bright big-box store, high ceiling with bright lights,
tall white metal shelves on both sides stacked full with hundreds of identical red
leatherette gift cases, each with two gold latches on the front and a plain red lid.
A hand reaches into the shelf and pulls one case out.
1.6–2.6s: The hand lifts the case close to the camera, showing the front: red
leatherette, two shiny gold latches.
2.6–3.6s: The hand lowers the case into a shopping cart with a blue handle.
3.6–4.6s: Cut to a cozy living room in daylight: a light marble coffee table, a decorated
Christmas tree with warm white lights behind, a fireplace with stockings. Both hands set
the red case down on the table.
4.6–6.2s: The thumbs flip open the two gold latches and lift the lid. Inside, on cream
lining: a square white music player in the center and nine round black music discs with
colorful labels arranged around it; elegant gold script printed inside the lid.
6.2–7.4s: Cut to a bright kitchen in daylight: a hand presses the square player flat onto
a white fridge door, then sticks two round discs onto the door below it.
7.4–10.0s: Hold on the fridge door, the hand moves out of frame.
```

Vì sao **không tải ảnh**: Muse lấy ảnh tải lên làm **khung đầu** (đo 23/10) — clip này bắt đầu
ở siêu thị, không có ảnh nào đúng cảnh đó. Sản phẩm chỉ hiện nhỏ (4,6–7,4 s) → chấp nhận Muse tự
vẽ; nếu sai nhiều thì sinh lại riêng đoạn mở hộp từ ảnh `santa-spins-giftbox.jpg`.

### Ảnh K — khung đầu clip B — tải `santa-spins-hand-disc-9x16.jpg`

```
media-generation, type image, --orientation vertical
Reference: santa-spins-hand-disc-9x16.jpg

Same square clear-acrylic music player as the reference, mounted on a white fridge door,
same printed album-art panel, four silver corner screws, progress bar and controls at the
bottom. It is NIGHT: the kitchen lights are off, the room is dark, lit only by the warm
glow of a decorated Christmas tree and string lights softly out of focus behind. The LED
ring around the centre is OFF (dark). Nine round music discs are stuck on the fridge door
below the player in a neat 3×3 grid. A hand in a cream knit sleeve holds one disc a few
centimetres from the centre of the player. Handheld phone photo, natural, no text added.
```

Kiểm ảnh K trước khi làm clip B: máy **vuông**, đúng mặt in, vòng đèn **tắt**, cảnh **tối**. Sai thì
sinh lại ảnh (rẻ hơn sinh lại video).

### Clip B — 10 s — CHỈ tải ảnh K

```
media-generation, type video, --orientation vertical, 10 seconds, --image-file <ảnh K>

Use only this image as the first frame. Vertical 9:16, handheld POV, dark kitchen at night
lit by Christmas tree lights. Same square clear-acrylic player, same printed panel; it is
NOT round. No text, no logos added. No people except the hand.

0.0–1.0s: The hand slowly brings the disc to the centre of the player; the LED ring is
still off.
1.0s: The disc touches the centre and clicks into place: the LED ring instantly lights up
warm white, the disc starts spinning, warm light spills onto the hand and the fridge door,
and cheerful Christmas music starts playing from the player.
1.0–2.2s: Hold the shot, the hand pulls away, the camera pushes in slightly.
2.2–3.2s: Close-up of the spinning disc and the glowing ring of tiny LED beads.
3.2–4.2s: The hand swaps the disc for another disc with a red label; the ring stays lit.
4.2–10.0s: The camera slowly pulls back to reveal the whole dark kitchen: the glowing
player on the fridge, the 3×3 grid of discs below it, the decorated Christmas tree and
string lights glowing warm in the background.
```

## Dựng (trợ lý làm sau khi có clip A, B)

1. Clip A: lấy **0 → 7,4 s**.
2. Clip B: lấy từ **0,5 s** (để cú bật ở 1,0 s của B rơi đúng **7,9 s** của video) tới ~**5,0 s** →
   video dài ~**11,9 s**.
3. Đưa về 720×1280 (Muse ra 704×1248 / 720×1280), nối, chèn **chữ 1, chữ 2**.
4. Nhạc: chưa có kho nhạc có giấy phép → bản thử dùng tiếng của clip B (nếu Muse cho tiếng nhạc
   lúc đĩa quay) hoặc để trống; khi có nhạc thì canh **chỗ nhạc vào = 7,9 s**.
5. Xuất: bản đầy đủ (~12 s) = cũng là bản ≤ 15 s cho quảng cáo Meta; bản 6 s = 0–1,6 + 7,4–9,1 + 11,1–11,9.

## Kiểm khi có clip (ghi vào bảng dưới)

Theo mục 0b: **giây nào không có lý do ở lại** → đoạn đó phải sinh lại hoặc cắt. Theo 0c: mỗi nhịp
còn "cực" không (kệ có **đầy** không, phòng khách có **ấm** không, bếp có **tối** thật không).

| Thứ | Lần sinh | Đạt? | Ghi chú |
|---|---|---|---|
| Ảnh K | 1 | ❌ một phần | Máy giữ dáng tốt; **mất vòng LED** ("OFF" bị hiểu là không có đèn); **9 đĩa lặp nhãn** (Andy Williams ×5); đĩa nhỏ so với mâm; chép cả băng cassette từ ảnh tham chiếu — **vì prompt không có hồ sơ sản phẩm** |
| Clip A | 1 | ✅ 0–4,6 s · ❌ phần còn lại | **Muse cắt cảnh đúng thứ tự** trong một clip (4,58 s, 7,33 s; lệch ~1 s so với prompt). Siêu thị kệ kín vali đỏ khoá vàng: **rất đẹp, dùng được**. Phòng khách đẹp, đặt vali lên bàn 4,6–5,9 s dùng được. **Bên trong vali: tấm vuông trắng + chục đĩa than → SAI**; tủ lạnh: hộp trắng trơn như bộ phát wifi + đĩa than 45 vòng → **SAI**. Cảnh không có sản phẩm = đẹp; có sản phẩm mà không có ảnh = bịa |

## Bản 3.1 — sau clip A, có hồ sơ sản phẩm + video thật (23/10)

**Luật mới:** mọi cảnh có sản phẩm **bắt đầu từ ảnh có sản phẩm thật** (Muse lấy ảnh tải lên làm khung đầu) + dán **khối
mô tả chuẩn** từ `../../san-pham/santa-spins.md` và `../../nhan-vat/me-giang-sinh-01.md`. Tủ lạnh = **inox** (đúng video thật).

| Đoạn video cuối | Giây | Nguồn |
|---|---|---|
| Siêu thị → xe đẩy | 0 → 4,2 | **Clip A lần 1**, 0 → 4,2 s ✅ |
| Đặt vali đóng lên bàn phòng khách | 4,2 → 5,2 | **Clip A lần 1**, 4,6 → 5,6 s ✅ |
| Vali đã mở, nhấc máy ra → gắn tủ lạnh inox | 5,2 → 7,4 | **Clip M** (mới, từ **ảnh M**) |
| TỐI: đặt đĩa → bật → cận → đổi đĩa → toàn cảnh | 7,4 → ~12 | **Clip B** (mới, từ **ảnh K bản 2**) |

### Ảnh M — vali mở trên bàn phòng khách · tải **`santa-spins-giftbox.jpg`**

```
media-generation, type image, --orientation vertical
Reference: santa-spins-giftbox.jpg (this is the exact open gift case and its contents)

Vertical 9:16 handheld phone photo, first-person view looking down at a light marble
coffee table in a cozy living room in daylight; a decorated Christmas tree with warm white
lights and a fireplace with red stockings softly out of focus behind. On the table: the
exact open gift case from the reference, seen from slightly above.
GIFT CASE OPEN (keep exactly): cream lining inside. The inside of the lid is cream with
gold-foil pine branches in the corners and an elegant gold script title. The square
acrylic player sits in the centre, and the nine round discs with nine different labels sit
in round slots arranged around it, with the crimson case edge and the two gold latches at
the front.
Two hands rest on the front edge of the case: cream cable-knit sweater sleeves, short
nude-pink nails, one thin gold ring. No text added, no other objects in the case.
```

### Clip M — 10 s · CHỈ tải **ảnh M**

```
media-generation, type video, --orientation vertical, 10 seconds, --image-file <ảnh M>

Use only this image as the first frame. Vertical 9:16, handheld first-person POV, natural
daylight, slightly shaky. No text, no logos added, no faces.
PRODUCT (keep exactly): the square music player in the centre of the case: a white-bordered
acrylic frame with four small silver corner screws, a printed 3×3 grid of Christmas album
covers, a thin line of text at the top, a printed progress bar and play controls at the
bottom; in the centre a round black platter with a thin grey LED ring around it (OFF).
It is small, about one and a half hands wide. NOT round, NOT a vinyl record, NOT a speaker.
Only her hands are visible: cream cable-knit sweater sleeves, short nude-pink nails, one
thin gold ring.

0.0–2.0s: Slow push-in over the open case, showing the player and the nine discs.
2.0–4.0s: Both hands lift the player out of the case and turn it toward the camera.
4.0–4.5s: Cut to a modern kitchen in daylight: a stainless steel fridge door with a few
cute Christmas magnets (a red bow, a candy cane, a gingerbread man).
4.5–6.5s: A hand presses the same player flat onto the fridge door; it holds by magnet.
6.5–9.0s: The hand sticks three of the round discs onto the door beside the player, each
with a different label.
9.0–10.0s: The hand moves away; hold on the fridge door.
```

### Ảnh K bản 2 — cảnh tối · tải **`that-vong-den-tat-dang-dat-dia.jpg`** (khung thật 6,0 s của video store)

```
media-generation, type image, --orientation vertical
Reference: that-vong-den-tat-dang-dat-dia.jpg (real photo of the exact product)

The same shot as the reference, same player, same disc, same hand position, same stainless
steel fridge door and magnets, but at NIGHT: the kitchen lights are off and the room is dark,
lit only by the warm glow of a decorated Christmas tree and string lights softly out of focus
behind. The LED ring on the player is OFF: a thin grey ring around the black platter. A hand
in a cream cable-knit sweater sleeve, short nude-pink nails, one thin gold ring, holds one
disc just in front of the centre of the player. Keep the player small (about one and a half
hands wide), white-bordered, square, with its printed album-cover panel. Handheld phone photo,
natural, no text added.
```

Kiểm ảnh K2 trước khi làm clip B: **vòng đèn còn thấy (xám mảnh)**, máy **nhỏ, vuông, viền trắng**, cảnh **tối thật**.

### Clip B bản 2 — 10 s · CHỈ tải **ảnh K2**

```
media-generation, type video, --orientation vertical, 10 seconds, --image-file <ảnh K2>

Use only this image as the first frame. Vertical 9:16, handheld POV, dark kitchen at night lit
by Christmas tree lights. Same small square white-bordered player with its printed album-cover
panel; NOT round, NOT a vinyl record. When OFF the LED ring is a thin grey ring; when a disc is
placed it instantly glows warm white. No text added. No people except the hand.

0.0–1.0s: The hand slowly brings the disc to the centre of the player; the ring is still off.
1.0s: The disc touches the centre and clicks into place: the LED ring instantly glows warm white,
the disc starts spinning, warm light spills onto the fingers and the fridge door, and cheerful
Christmas music starts playing from the player.
1.0–2.2s: Hold, the hand pulls away, the camera pushes in slightly.
2.2–3.2s: Close-up of the spinning disc inside the glowing ring.
3.2–4.2s: The hand swaps the disc for another disc with a different label; the ring stays lit.
4.2–10.0s: The camera slowly pulls back to reveal the dark kitchen: the glowing player on the
stainless steel fridge, discs with different labels stuck beside it, the Christmas tree and
string lights glowing warm in the background.
```

**Thứ tự:** ảnh M và ảnh K2 làm song song (không phụ thuộc nhau) → gửi trợ lý kiểm → clip M (từ M) và clip B (từ K2).
**Hạn mức:** 2 ảnh + 2 clip ≈ 6–7 %.


## Bản 3.2 — hộp mới (ảnh H1), sinh lại đoạn siêu thị (23/10)

Chủ dự án: hộp clip A "sang trọng nhưng không đẹp" (đỏ phẳng, không hoạ tiết, không dấu Giáng sinh, không "nói" sản phẩm — như hộp
xì gà; trượt trục **đẹp** và **khao khát**, sổ tay 0c). Chọn **hướng 1**: ảnh **H1** (`anh-H1-lan1.jpg`) đạt → hộp chuẩn trong hồ sơ.
Đoạn siêu thị + đặt lên bàn của clip A **bỏ** (hộp cũ). Bối cảnh, tay, xe đẩy, phòng khách của clip A đẹp → giữ nguyên mô tả.

### Ảnh S — khung đầu siêu thị · tải **`anh-H1-logo.jpg`** (H1 đã ghép logo thật)

```
media-generation, type image, --orientation vertical
Reference: anh-H1-logo.jpg (the exact gift case design to repeat on the shelves)

Vertical 9:16 handheld phone photo, first-person view in a wide aisle of a large bright big-box
store: high ceiling with bright lights, tall white metal shelves on both sides stacked full with
hundreds of identical copies of the reference gift case, each lying flat, wider than it is tall,
lids slightly angled toward the camera so the gold pine corners, the round Santa Spins logo badge
in the centre of each lid and the champagne-gold satin bows are visible, two gold latches on each long front edge. A rich, warm,
festive wall of red and gold. A hand in a cream cable-knit sweater sleeve, short nude-pink nails,
one thin gold ring, grips one case at chest height, its lid facing the camera, close enough that its Santa Spins logo
badge is large and sharp. No other words, logos or text anywhere.
```

### Clip A2 — 10 s · CHỈ tải **ảnh S**

```
media-generation, type video, --orientation vertical, 10 seconds, --image-file <ảnh S>

Use only this image as the first frame. Vertical 9:16, handheld first-person POV, phone camera,
natural light, slightly shaky. Only her hands are visible: cream cable-knit sweater sleeves, short
nude-pink nails, one thin gold ring. No faces. No text or logos except the Santa Spins badge already
on the cases. Ambient sound only.
GIFT CASE (keep exactly as in the first frame): deep crimson leatherette with a soft sheen, gold-foil
pine branches with red berries in the lid corners, the round Santa Spins logo badge (a cream ring with dark green lettering "SANTA SPINS" on top and "MUSIC BOX" below, a red vinyl record with a gold centre in the middle, small holly sprigs on the sides) in the
centre of the lid, a champagne-gold satin bow on one corner, two gold latches on the long front edge, lying
flat, wider than it is tall.

0.0–1.2s: The hand holds the case up close to the camera and tilts it slightly: light glints on the
gold pine branches, the Santa Spins logo badge and the satin bow, the full shelves behind.
1.2–2.0s: The hand lowers the case a little, revealing more of the long aisle full of identical cases.
2.0–3.0s: The hand lowers the case into a shopping cart with a blue handle.
3.0–3.4s: Cut to a cozy living room in daylight: a light marble coffee table, a decorated Christmas
tree with warm white lights, a fireplace with red stockings.
3.4–5.5s: Both hands set the same case down on the coffee table and rest on the two gold latches.
5.5–10.0s: Slow push-in on the case on the table, the logo, bow and gold details glowing warmly.
```

### Ghép video cuối (cập nhật)

| Giây | Nguồn |
|---|---|
| 0 → 3,0 | Clip A2 0 → 3,0 (khoe hộp → lối kệ → xe đẩy) |
| 3,0 → 4,6 | Clip A2 3,0 → 4,6 (đặt vali đóng lên bàn) |
| 4,6 → 7,4 | Clip M (vali mở → nhấc máy → tủ lạnh inox) |
| 7,4 → ~12 | Clip B bản 2 (tối → bật) |

Ảnh M (vali mở) giữ nguyên: mép đỏ + hai khoá vàng của vali mở khớp hộp mới.

**Logo (23/10):** hộp mang **logo Santa Spins thật** ở giữa nắp. Sau khi có **ảnh S**, trợ lý **ghép lại logo thật** lên nắp chiếc hộp
trên tay (khung đầu) trước khi đưa vào clip A2 — Muse giữ thứ có sẵn trong khung đầu tốt hơn tự vẽ chữ. Logo trên các hộp xa trên
kệ nhỏ, có méo cũng không đọc được nên chấp nhận.

**Ảnh S lần 1 (23/10): ✅ ĐẠT** (`anh-S-lan1.jpg`, 1152×2048) — kệ kín hàng trăm hộp có logo + nơ (bao la), hộp trên tay đẹp, **logo đúng
từng chữ** (không cần ghép lại), tay đúng hồ sơ nhân vật. Khung đầu đã là **hộp trên tay** → clip A2 mở bằng nhịp **khoe hộp** (1b) thay vì
rút khỏi kệ (1a); kệ kín phía sau vẫn giữ "store find". Hộp đứng dọc như ảnh H1 — nhất quán trong cả video, chấp nhận.

**Clip A2 lần 1 (23/10): ✅ dùng được** (`v01-clipA2-lan1.mp4`) — khoe hộp, logo rõ, hạ xuống xe đẩy (thấy xe ở 2,5 s), **cắt** sang phòng
khách ở 2,79 s, đặt hộp lên bàn; 5,5–10 s đẩy chậm (dư). Chỉ 1 lần cắt → nhịp do dựng. Dùng: **0 → 2,8 s** (tăng tốc 1,1×) + **3,6 → 4,8 s**.
**Bản dựng nháp nhịp** `v01-nhap-nhip.mp4` (10 s, cắt 2,5 · 3,8 · 6,4 · 7,4): A2 + clip1c + clip2d (clip tủ lạnh ban ngày cũ, có băng
cassette — chỉ để thử nhịp). Bản thật thay bằng clip M + clip B.
