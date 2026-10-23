# Giai đoạn 0 — phép thử

Mục đích: biết **AI video có giữ được hình sản phẩm đủ tốt để đăng không** và
**một video 15 giây thật sự tốn bao nhiêu**, trước khi viết dòng mã sản phẩm nào.

Chưa đặt ngày: qua cửa bằng số đo, không theo lịch.

## Cửa 0 — qua khi cả hai đúng

1. Sản phẩm giữ đúng hình dáng, màu, logo qua các cảnh có sản phẩm.
2. Chi phí thật một video 15 giây nằm dưới trần **$10**.

Không qua thì đổi model video rồi thử lại, chứ không sang giai đoạn 1.

## Tiếp tục ở máy khác — đọc trước

Ngày 23/10 dừng ở đây, chủ dự án chuyển sang máy ở nhà. Máy cũ (máy công ty)
đã kiểm: Node 22.22 đủ; **ffmpeg chưa có**; không GPU. Máy nhà chưa kiểm gì.

Việc đầu tiên ở máy mới:

1. `cd ~/my-project/manager-ai && git pull`
2. Kiểm công cụ: `node -v` (cần ≥ 22.15), `ffmpeg -version`, `python3 --version`. Thiếu ffmpeg thì cài.
3. ~~Tạo tài khoản HypiHub~~ — bỏ, đắt. Làm **phép thử Muse** bên dưới trước.
4. Chủ dự án tự cài skill Hypit khi sẵn sàng (chưa cho phép tự cài).

### Máy Windows `David-PC` — kiểm 23/10/2026

| | có | đủ? |
|---|---|---|
| Node | v23.11.1 | ✅ (cần ≥ 22.15) |
| ffmpeg / ffprobe | bản 2026-08-27 (gyan.dev essentials) | ✅ |
| Python | 3.10.10 — gọi bằng **`python`**, KHÔNG phải `python3` (`python3` là lối tắt Microsoft Store, in "Python was not found") | ✅ cho rembg, Real-ESRGAN; whisperx cần ≥ 3.9 |
| GPU | **NVIDIA GTX 1660 SUPER 6 GB** + Intel UHD 730 | đủ chạy whisperx model `small`/`medium`, rembg, Real-ESRGAN ở máy; không đủ chạy model video ở máy (không cần) |
| RAM | 32 GB | ✅ |
| pnpm | ✅ 12.15.0 (cài 23/10, `npm i -g pnpm`) | |
| yt-dlp | ✅ 2026.10.21 (cài 23/10, `python -m pip install -U yt-dlp`) | M3 tải reel mẫu |
| Hypit | ✅ skill + chương trình **0.3.1** (cài 23/10) | `hypit doctor` chỉ chạy TRONG một project Hypit (`package.json` có `hypit.project: true`) — chưa tạo; tạo khi thử Seedance, đặt trong `thu-nghiem/` (đã gitignore) |

Máy này cũng là máy làm theme Shopify (`D:/my project/shop-christmasspin`).

## Phép thử Muse — 10 phút, không tốn tiền

Câu hỏi duy nhất: **Muse có giữ đúng hình sản phẩm qua 2 clip nối nhau không?**

1. Vào muse.ai, tải lên 2–3 ảnh Santa Spins. Đặt tên tệp bằng chữ ASCII, ví dụ `santa-spins-front.jpg`; tên có dấu hay chữ Trung bị từ chối.
2. Nhờ agent chạy `media-generation` dạng video, `--orientation vertical`, ảnh sản phẩm làm `--image-file`:
   - **Clip 1:** cận cảnh tay cầm xoay sản phẩm chậm, nền sạch.
   - **Clip 2:** sản phẩm được dùng thật. Lấy khung cuối clip 1 làm khung đầu để nối liền.
3. Tải 2 clip về, xem và ghi vào bảng kết quả bên dưới:
   - Logo, chữ, màu, hình dáng có đúng ảnh gốc không? Cảnh nào sai?
   - Tỉ lệ kích thước có hợp lý không?
   - Clip dài bao nhiêu giây, độ phân giải bao nhiêu, có tiếng gốc không?
   - Hạn mức tuần giảm bao nhiêu % sau 2 clip?
4. Nếu còn thời gian, thử thêm 1 clip có ảnh người mẫu thật, để xem mặt giữ được tới đâu.

### Bộ ảnh + prompt đã chuẩn bị (23/10/2026)

Ảnh ở `reel/thu-nghiem/muse/` (gitignore — **chỉ có trên máy `David-PC`**;
máy khác chạy lại: tải 5 ảnh từ `skinsolutions.online/products/santa-spins-music-box.js`).

| Tệp | Từ ảnh store | Dùng |
|---|---|---|
| `santa-spins-hand-disc-9x16.jpg` | ảnh 2 (1600², cắt 900×1600) | **khung đầu clip 1** |
| `santa-spins-hand-disc.jpg` | ảnh 2 nguyên | tham chiếu |
| `santa-spins-real-photo.jpg` | ảnh 4 = ảnh khách thật (720²) | tham chiếu: đúng hàng thật |
| `du-phong-santa-spins-merry-design.jpg` | ảnh 3 | **KHÔNG dùng chung** — xem 🔴 dưới |

Bỏ: ảnh 1 (chữ + icon in đè, ghép đĩa) và ảnh 5 (chỉ có chữ).

🔴 **M0 bắt được lỗi nguyên liệu ngay ca đầu:** store có **hai mẫu mặt máy
khác nhau** — ảnh 2 + ảnh khách là bìa album ghép ("THIS IS THE SHINING
STAR…"), ảnh 1 + ảnh 3 là "Merry Christmas" hộp quà. Đưa cả hai vào thì model
trộn, không đo được "giữ hình". Chọn bản ghép bìa vì ảnh khách thật là bản đó.

🔴 **Mặt máy in bìa album thật** (Mariah Carey, Wham!, Frank Sinatra, Bobby
Helms, Decca) — đem vào video quảng cáo là rủi ro bản quyền / hình người nổi
tiếng; chính ảnh store cũng vậy. Chủ dự án quyết; M0 sau này nên có mục dò
"mặt người thật / logo hãng khác trên sản phẩm".

**Clip 1** — khung đầu `santa-spins-hand-disc-9x16.jpg`, tham chiếu thêm `santa-spins-real-photo.jpg`:

```
media-generation, type video, --orientation vertical, --image-file santa-spins-hand-disc-9x16.jpg

Vertical 9:16 close-up. A hand gently presses the round black music disc onto the
centre of the square clear-acrylic music player mounted on a white fridge door,
then lets go. The white LED ring around the centre lights up softly and the disc
starts to spin slowly. Static camera with a very slow push-in. Warm indoor light,
soft out-of-focus Christmas lights in the background.
Keep the player exactly as in the reference: square clear acrylic frame, four
silver corner screws, printed album-art panel, progress bar and play controls along
the bottom, glowing ring in the centre. Do not change its shape, proportions or
printed artwork. Do not add any new text, logos or faces. Natural hand, five fingers.
```

**Clip 2** — khung đầu = **khung cuối của clip 1** (tải clip 1, lấy khung cuối:
`ffmpeg -sseof -0.1 -i clip1.mp4 -frames:v 1 clip1-last.jpg`):

```
media-generation, type video, --orientation vertical, --image-file clip1-last.jpg

Continue the same shot. The disc keeps spinning and the ring keeps glowing. The
camera slowly arcs about 20 degrees to the right and pulls back, revealing the
side edge and thickness of the acrylic player on the fridge door and a cosy
kitchen with a decorated Christmas tree and warm string lights behind it.
Same player, same artwork, same lighting as the first frame. Do not change the
player's shape, size or printed artwork. No new text, logos or people.
```

Clip 2 cố ý **đổi góc nhìn** (vòng sang bên, lộ độ dày): đó mới là phép thử
giữ hình thật — đứng yên một góc thì model nào cũng giữ được.

**Đọc kết quả:**
- Sản phẩm giữ đúng ở cả 2 clip → viết skill "Máy làm Reel" chạy trong Muse làm đường chính.
- Sản phẩm méo hoặc sai logo → chuyển sang BytePlus Seedance (khoảng $2–3/video), Muse chỉ để thử.

## Việc

- [x] Chốt trần chi phí, người mẫu, độ dài (23/10: $10 · ảnh thật, thiếu thì AI tạo · 15 giây)
- [x] Chốt nhà cung cấp giai đoạn 0: ~~HypiHub~~ → Muse trước, BytePlus dự phòng (23/10)
- [ ] **Phép thử Muse 10 phút** (mục trên)
- [x] Cài ffmpeg trên máy chạy (máy `David-PC` có sẵn)
- [x] Cài skill Hypit + chương trình 0.3.1 (chủ dự án cho cài 23/10)
- [x] Chọn 3 sản phẩm ở 3 ngách khác nhau, có cả ảnh đẹp lẫn ảnh xấu (23/10, bảng dưới)
- [ ] Làm M0 bằng tay cho 3 sản phẩm đó: kiểm ảnh, sơ chế, ra tờ sản phẩm + bản tóm tắt
- [ ] Chọn 3 reel viral tiếng Anh (TikTok, Facebook Reels, Top Ads), khác ngách và khác format; ghi lượt xem, ngày đăng
- [ ] Thử Muse: 3 clip dọc, ghi lại sản phẩm và mặt người mẫu có giữ được không
- [ ] Cài skill Hypit vào Claude Code, chạy 1 video qua Seedance
- [ ] Ghi chi phí thật và số lần sinh lại mỗi cảnh vào bảng dưới
- [ ] Quyết Cửa 0: đi tiếp, đổi model, hay dừng

## Sản phẩm thử

| # | Sản phẩm | Ngách | Nguồn | Ảnh (tốt / xấu) | Ghi chú M0 |
|---|---|---|---|---|---|
| 1 | Santa Spins | Quà Giáng sinh | Store Shopify (`../shopify/`) | Ảnh store, chưa kiểm | |
| 2 | Santa's Memory Globe™ | Quà cá nhân hoá | Store Shopify (`../shopify/SAN-PHAM-2-MEMORY-ORB.md`) | Ảnh store, chưa kiểm | |
| 3 | Một món 17fishing, chưa chọn món nào | Đồ câu cá | API 17fishing | Ảnh 1688 dính chữ Trung: ca ảnh xấu | Cần xoá chữ, dịch mô tả sang tiếng Anh |

## Reel mẫu

| # | Link | Nền tảng | Format | Lượt xem | Ngày đăng | Chuyển được? |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |

## Kết quả đo

Mỗi lần chạy một dòng. Không xoá dòng hỏng — dòng hỏng là dữ liệu để đặt ngưỡng M0.

| Ngày | Sản phẩm | Reel | Model video | Số cảnh | Lần sinh tổng | Cảnh giữ đúng SP lần đầu | Mặt người mẫu giữ? | Chi phí USD | Đăng được? | Ghi chú |
|---|---|---|---|---|---|---|---|---|---|---|
| 23/10 | Santa Spins | — (phép thử Muse) | Muse `media-generation` | 1 (clip 1) | 1 | ✅ **giữ đúng**: khung vuông, 4 ốc, ô bìa album, thanh điều khiển, chữ "THIS IS THE SHINING STAR…", nhãn đĩa đọc được kể cả khi quay | — (không có người) | $0 (Muse; % hạn mức tuần: chủ dự án chưa ghi) | gần được | 10,0 s · **704×1248** (dưới 1080×1920, phải phóng) · 24 fps · có tiếng AAC mono 24 kHz, nhỏ (TB −30 dB). Đẩy máy vào **mạnh hơn "very slow"**: kết thúc cận sát đĩa, mất khung máy |
| 23/10 | Santa Spins | — | Muse | 1 (clip 2, lần 1) | 1 | ❌ **méo**: khung vuông → **đĩa tròn** in ghép bìa; vòng đèn trắng → **RGB đổi màu**; rồi lia sang cây thông, máy còn bé ở mép | — | $0 | không | Chủ dự án chạy **không** có `clip1-last.jpg` → khung đầu clip 2 = ảnh gốc, không nối với clip 1. Tiếng to hơn (TB −19,6 dB, đỉnh −3,2). Kết luận tạm: nhìn thẳng thì giữ, **đổi góc thì méo** |
| 23/10 | Santa Spins | — | Muse | 1 (clip 2, lần 2: lùi thẳng, nói rõ "SQUARE, not round", đèn trắng) | 2 | ⚠ **hình dáng giữ** (vuông, 4 ốc, lưới bìa, thanh điều khiển, đèn trắng ấm, 10 s không méo) — **chữ in bị vẽ lại**: tiêu đề "THIS IS THE SHINING STAR…" → "ANDY WILLIAMS CHRISTMAS ALBUM / It's the Most Wonderful Time of the Year", "MARIAH CHERRY CHRISTMAS", bìa Bobby Helms lặp, logo "BELMS" bịa | — | $0 | không (chữ sai) | **960×960 VUÔNG** dù có `--orientation vertical`; khung đầu **không phải** `clip1-last.jpg` mà là ảnh tham chiếu vuông `santa-spins-hand-disc.jpg` → Muse lấy ảnh tải lên làm khung đầu và theo tỉ lệ của nó. **Bài học: mỗi clip chỉ tải MỘT ảnh, đúng tỉ lệ 9:16.** Phép nối clip 1 → clip 2 vẫn **chưa thử được** lần nào |

**Đọc tới đây (3 clip):**
1. Hình dáng sản phẩm: giữ khi nhìn thẳng / lùi thẳng; **méo khi đổi góc**.
2. **Chữ nhỏ in trên sản phẩm trôi** khi cảnh rộng ra — sản phẩm có nhiều chữ/bìa in là ca khó.
   M0 nên có cờ "sản phẩm có chữ in nhỏ" → ưu tiên cảnh cận hoặc chèn ảnh thật (B-roll) thay vì sinh.
3. Muse: 704×1248 khi đúng dọc; cần phóng lên 1080×1920.
