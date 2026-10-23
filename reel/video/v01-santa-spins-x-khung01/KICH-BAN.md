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
| Clip A | | | |
| Ảnh K | | | |
| Clip B | | | |
