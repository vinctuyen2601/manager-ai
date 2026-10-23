# Video 01 — Santa Spins × khung 01 (FrostGlow)

Video đầu tiên đi trọn luồng (23/10/2026). Đường sinh: **Muse**. Khung:
`../../khung/reel-01-frostglow.md`. Tệp media ở `thu-nghiem/muse/` (gitignore).

## Bản đồ cảnh: khung gốc → video này

Khung gốc 9 cảnh / 11,8 s. Gộp còn **5 cảnh / ~12 s**: bỏ xe đẩy (gộp vào hook),
gộp ba cảnh "nhiều phòng" thành một cảnh lùi máy. **Chỉ 2 clip sinh mới** (~6 %
hạn mức tuần); 2 clip đã sinh và đạt hôm nay được dùng lại.

| # | Giây | Vai trò (khung) | Hình | Nguồn | Cắt từ |
|---|---|---|---|---|---|
| 1 | 0–3,6 | Hook (cảnh 1a, 1b, 2) | ⬜ **Kệ siêu thị đầy hộp sản phẩm**, rút một hộp, giơ mặt hộp vào máy, thả vào xe đẩy — chờ ảnh mặt ngoài hộp | **Sinh mới** — clip A (viết lại) | — |
| 2 | 2,5–5,0 | Khoe hàng (cảnh 3) | Máy đứng trên bàn cạnh túi đĩa, hai tay nhấc lên, xoay mặt về máy quay | **Sinh mới** — clip B | 0–2,5 s |
| 3 | 5,0–7,0 | Lắp + căng (cảnh 4–5) | Máy trên cửa tủ lạnh, tay ấn đĩa vào giữa | `clip1c.mp4` (đã đạt) | 0–2,0 s |
| 4 | 7,0–9,5 | **Reveal** (cảnh 6) | Vòng đèn bừng sáng, đĩa quay, đẩy cận | `clip1c.mp4` | 2,0–4,5 s |
| 5 | 9,5–12,0 | Chứng minh / kết (cảnh 7–9) | Lùi máy: cả máy trên tủ lạnh + cây thông | `clip2d.mp4` (đã đạt, nối liền clip1c bản 2) | 6,5–9,0 s |

⚠ Cảnh 3–4 lấy **đầu** clip1c, cảnh 5 lấy **cuối** clip2d — clip2d nối liền với
**cuối** clip1c, nên cắt bỏ giữa làm mất mạch nối liền đó. Ở đây là hai cảnh khác
nhau (cắt cứng theo khung), chấp nhận được. Xem bản dựng rồi quyết.

**Reveal phải rơi đúng chỗ nhạc "vào"** (khung gốc: lời hát vào 6,8 s → đèn 7,9 s).
Nhạc chưa chọn (mục 13 kế hoạch) → bản thử 1 để tiếng gốc của clip Muse, bản thử 2 khi
có nhạc có giấy phép thì canh lại mốc cảnh 4.

## Chữ trên hình (viết mới, không chép "Every CHRISTMAS lover NEEDS this")

`This fridge plays Christmas 🎄` — cố định 0–12 s, trắng viền đen, giữa trên như khung.

## ~~Clip A — hộp giao trước cửa~~ — BỎ (23/10)

> 🔴 **Sai khung:** chủ dự án chỉ ra hook gốc là **kệ siêu thị đầy hộp sản phẩm đẹp**, không phải nhặt hộp ngoài cửa. Viết lại clip A (cảnh 1a kệ + 1b giơ mặt hộp + 2 xe đẩy) khi có **ảnh mặt ngoài hộp đóng**. Prompt dưới đây giữ làm lịch sử, KHÔNG dùng.

### (cũ) Clip A — sinh mới, KHÔNG tải ảnh nào

```
media-generation, type video, --orientation vertical

Vertical 9:16, handheld first-person view. A plain brown cardboard delivery box with
no logos or writing sits on a snowy front porch next to a doormat and a small
wreath. A hand in a cream knit sweater reaches down and picks the box up, lifting it
toward the camera. Soft winter daylight, warm light from the front door.
No text, no logos, no brand names anywhere.
```

Không có sản phẩm trong cảnh → không cần ảnh, không có gì để méo. Hộp **trơn** cố ý:
hộp có chữ là chỗ Muse vẽ sai (đo 23/10).

## Clip B — chỉ tải MỘT ảnh: `v1-canh2-mo-hop-9x16.jpg`

```
media-generation, type video, --orientation vertical, --image-file v1-canh2-mo-hop-9x16.jpg

Use only this image as the first frame. Vertical 9:16 close-up on a kitchen table.
Two hands in a cream knit sweater lift the square clear-acrylic music player from
the table and slowly turn it to face the camera, a small bag of round music discs
beside it. A decorated Christmas tree glows softly out of focus behind.
Keep the player exactly as in the image: square clear acrylic frame, four silver
corner screws, printed album-art panel, warm-white LED ring around the black disc,
progress bar and play controls at the bottom. Do not change its shape, size or
printed artwork. No new text or logos.
```

Ảnh khung đầu là **ảnh khách thật** cắt dọc và phóng ×1,8 (720×720 → 720×1280) →
hơi mềm; đúng loại "ảnh xấu" M0 phải cảnh báo. Ghi lại chất lượng clip ra.

## Dựng (trợ lý làm bằng ffmpeg sau khi có clip A, B)

Cắt theo bảng trên → đưa về 720×1280 · 30 fps → nối → chữ trên hình → xuất
`v01-santa-spins.mp4` (bản đầy đủ). Bản ≤ 15 s cho quảng cáo Meta = chính nó (12 s).
Bản 6 s: cảnh 1 (1 s) + cảnh 4 + cảnh 5 (đầu).

Chưa có: nhạc có giấy phép, CTA (khung gốc không có CTA — giữ đúng khung).

## Kết quả

| Clip | Lần sinh | Giữ đúng sản phẩm? | Ghi chú |
|---|---|---|---|
| A | | — (không có sản phẩm) | |
| B | | | |
