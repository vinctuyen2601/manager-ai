---
viec: bk.chu-tren-hinh
nganh: do-cau-vn
trang_thai: xong
nhan: [05-bk-kich-ban.md, 04-tp-brief.md, ../../../../nhan-su/viec/bk-chu-tren-hinh.md, ../../../../nhan-su/vai/bien-kich.md (§3.4, §3.8, §11), ../../../../nhan-su/vai/tho-dung.md (§3.1, §3.3), ../../../../quy-che/khuon/phieu-giao.md, ../../../../thu-vien/nganh/do-cau-vn/MUC-LUC.md, ../../../../thu-vien/nganh/do-cau-vn/thuat-ngu.md]
giao: [06-bk-chu-tren-hinh.md]
con_thieu: [giây khung đỏ thật trong S1 (quyết định giây dòng 6–8), cỡ chữ đo bằng `tw` trên khung 720, lớp phủ vùng an toàn chính thức TikTok/Meta]
chi_phi: 0
ngay: 2026-11-11
---

⚠ Vai chưa thi theo ngành; việc này chưa có bộ thi riêng (thi gộp trong `bk-kich-ban-qc.thi/`).

# Chữ trên hình — PRD-G01 Phao điện LED-425 — cho Thợ dựng chèn bằng script

Nguồn: `05-bk-kich-ban.md`. Khung 720×1280. Chèn bằng script, **không** để Muse vẽ chữ.
**Vùng** (tho-dung §3.1, vùng dùng tạm: chừa trên 14 % = 179 px, dưới 35 % = từ 832 px, hai bên 16,7 % = 120 px):
`tren` = ngay dưới mép 179 px · `giua` = giữa khung · `duoi-an-toan` = sát trên mép 832 px (khối 2 dòng nằm khoảng y 700–830).
Ký tự đếm bằng máy (NFC, tính cả dấu cách và dấu câu). Mốc 20·X = 20 × số giây hiện. Giây là đề xuất, Thợ dựng chốt; **giây dòng có dấu ~ bám theo khung đỏ thật của S1**, không bám số.

## Bảng chữ

### Hook (0,0 → 2,5 s — mỗi bản một dòng; chữ khoá theo brief, không đổi câu)
| # | Bắt đầu (s) | Kết thúc (s) | Chữ | Ký tự | Mốc 20·X | Vùng | Ghi chú (emoji, viết hoa nhấn) |
|---|---|---|---|---|---|---|---|
| H1-1 | 0,0 | 2,5 | Nhịp này diếc ăn chưa? | 22 | 50 | tren | 1 dòng. Không emoji, không viết hoa nhấn (giọng cần thủ hỏi nhau). Chữ trắng viền tối — nền là mặt hồ đêm. Giữ chữ qua cú đỏ 1,5 s (hình trả lời, chữ không đổi) |
| H2-1 | 0,0 | 2,5 | Về khuya mắt mỏi | 16 | 50 | tren (nửa **trái**) | Ngắt 2 dòng: `Về khuya` / `mắt mỏi` — mỗi nửa khung chỉ ~240 px trong vùng an toàn. Chữ trắng, hơi mờ hơn bên phải |
| H2-2 | 0,0 | 2,5 | Nhìn màu là biết | 16 | 50 | tren (nửa **phải**) | Ngắt 2 dòng: `Nhìn màu` / `là biết`. Cùng cỡ, cùng hàng với H2-1. Tổng hai bên 32 ký tự / 2,5 s ≤ 50 ✅ |
| H3-1 | 0,0 | 2,5 | Mẹo câu diếc đêm: nhìn màu đuôi phao | 36 | 50 | tren (khối lớn ~1/3 trên khung) | Ngắt 2 dòng: `Mẹo câu diếc đêm:` / `nhìn màu đuôi phao`. Chữ tiêu đề **to**, đậm. Dòng 1 có thể tô vàng kim (màu logo). Không emoji |

### Thân chung (giống nhau cho H1, H2, H3)
| # | Bắt đầu (s) | Kết thúc (s) | Chữ | Ký tự | Mốc 20·X | Vùng | Ghi chú (emoji, viết hoa nhấn) |
|---|---|---|---|---|---|---|---|
| T-1 | 2,5 | 4,93 | Thử cảm biến | 12 | 48 | duoi-an-toan | Chữ **nhỏ** (vai phụ, cảnh tay). **Không** "cá cắn" trên cảnh này. Dải chữ vàng gốc (y ~1060–1120) che riêng bằng mảng mờ/màu nền, **không** đặt chữ mới lên chỗ đó (ngoài vùng an toàn). Tắt 2 khung trước điểm cắt 5,0 |
| T-2 | 5,0 | ~6,03 (2 khung trước khung đỏ) | Nhiều màu là đang chờ | 21 | 20,6 → cần hiện **≥ 1,05 s** | duoi-an-toan | Nằm trên vùng nước tối dưới đuôi phao (không che đuôi). **Dự phòng:** nếu khung đỏ đến trước 6,12 s → thay bằng `Đang chờ cá` (11 ký tự, ≥ 0,8 s). Không rút giây dòng này |
| T-3 | ~6,1 (đúng khung đỏ đầu tiên) | 10,5 | Cá cắn là đuôi chuyển đỏ | 24 | 88 | duoi-an-toan, dòng 1 | **Cú bật — đổi chữ đúng khung đỏ.** Chữ đậm hơn T-2; được tô **đỏ** chữ "đỏ" (khớp hình). Không emoji. Giữ liền một vị trí sang thẻ kết (làm slogan) — không tắt, không nhảy chỗ ở 8,5 s |
| T-4 | 7,1 | 8,43 | Ngồi xa vẫn thấy | 16 | 26,6 | duoi-an-toan, dòng 2 | Vào khi đuôi về nhiều màu. Chữ thường, nhỏ hơn T-3. Tắt 2 khung trước 8,5 |
| T-5 | 8,5 | 10,5 | Nhắn Zalo shop chọn mã | 22 | 40 | duoi-an-toan, dòng 2 (thay T-4) | **CTA.** Nền vàng kim chữ tối (nút giả) cho nổi khỏi slogan. Không số điện thoại, không giá |
| (logo) | 8,5 | 10,5 | — logo `NL/logo-17fishing.png` | — | — | giua | Không phải chữ; ghi để Thợ dựng chừa chỗ. Nền thẻ tối/đen để vàng kim nổi |

Đếm khối duoi-an-toan (≤ 2 dòng × 42): 6,1–7,1 một dòng (T-3) · 7,1–8,43 hai dòng (T-3 + T-4) · 8,5–10,5 hai dòng (T-3 + T-5) ✅. Dòng mới vào ở mỗi mốc chỉ một dòng → đọc kịp.

### Bản cắt 6 s (C6)
| # | Bắt đầu (s) | Kết thúc (s) | Chữ | Ký tự | Mốc 20·X | Vùng | Ghi chú |
|---|---|---|---|---|---|---|---|
| C6-0 | 0,0 | 2,5 | (chữ hook của bản đi kèm: H1-1 / H2-1+H2-2 / H3-1) | 16–36 | 50 | như trên | như trên |
| C6-1 | ~3,0 (đúng khung đỏ S1) | 6,0 | Cá cắn là đuôi chuyển đỏ | 24 | 60 | duoi-an-toan, dòng 1 | Cú bật. Mang liền sang thẻ |
| C6-2 | 4,9 | 6,0 | Nhắn Zalo shop chọn mã | 22 | 22 | duoi-an-toan, dòng 2 | **Sát mốc** (22 = 22). Không rút dưới 1,1 s; nếu Thợ dựng buộc phải rút thẻ còn 1,0 s thì đổi thành `Nhắn Zalo chọn mã` (17) ⚠ |

### Bản đối chứng (V00)
| # | Bắt đầu (s) | Kết thúc (s) | Chữ | Ký tự | Mốc 20·X | Vùng | Ghi chú |
|---|---|---|---|---|---|---|---|
| V0-1 | 0,0 | 8,73 | Thử cảm biến | 12 | 175 | duoi-an-toan | Cùng cỡ, cùng chỗ T-1. Dải chữ vàng che như bản chính. Tắt 2 khung trước thẻ |
| V0-2 | 8,8 | 10,8 | Cá cắn là đuôi chuyển đỏ | 24 | 40 | duoi-an-toan, dòng 1 | Slogan trên thẻ (không có trên cảnh tay) |
| V0-3 | 9,1 | 10,8 | Nhắn Zalo shop chọn mã | 22 | 34 | duoi-an-toan, dòng 2 | Vào chậm 0,3 s sau slogan để không phải đọc 46 ký tự cùng lúc trong 2,0 s |
| (logo) | 8,8 | 10,8 | — logo | — | — | giua | như bản chính |

## Soát theo luật tệp việc
| Luật | Kết quả |
|---|---|
| 1. ≤ 20·X, ≤ 2 dòng × 42 | Mọi dòng đạt. Sát mốc: T-2 (21/≥1,05 s), C6-2 (22/1,1 s) — có dự phòng |
| 2. Chữ không lặp lời đọc | Không có lời đọc → chữ là lớp mang ý duy nhất cho người tắt tiếng. Đọc ngang: chữ không tả lại hình (T-2 nói ý nghĩa của nhiều màu, T-3 nói ý nghĩa của đỏ, không nói "phao đang đỏ") |
| 3. Chữ ở giây cú bật ≤ ~40 ký tự | T-3 24 ký tự · C6-1 24 ký tự ✅ |
| 4. Vùng đặt | Mọi chữ trong vùng an toàn dùng tạm. Không chữ nào ở dải 35 % dưới hay sát mép phải (cột nút nền tảng) |
| Quét từ cấm (`$ ~~ % off sale deal only left #1 best nhất giảm freeship`, "siêu sáng", "tự động", xuất xứ) trên cột "Chữ" | 0 trúng |

---

## Đã kiểm (có nguồn)
- Mọi chữ lấy nguyên từ `05-bk-kich-ban.md` (đã có cột "Sự thật dựa vào" ở đó); chữ 3 hook nguyên văn brief 04
- Mốc đọc: ≤ 20 ký tự/s, ≤ 42 ký tự/dòng, ≤ 2 dòng, hiện ≥ 0,8 s, hai khối cách ≥ 2 khung — gói Biên kịch §3.4, tho-dung §3.3
- Vùng an toàn dùng tạm trên 14 % / dưới 35 % / hai bên 16,7 % — tho-dung §3.1
- Dải chữ vàng gốc ở y ~1060–1120 / 1280 (82–87 %) — 03b "Số đo video shop" → nằm trong dải 35 % dưới, nên không đặt chữ mới lên đó

## Suy ra ⚠
- Chữ Thân B đặt ở `duoi-an-toan` (trên vùng nước tối dưới đuôi) — phao đứng giữa khung, đuôi thẳng đứng chiếm cột giữa phía trên mặt nước; đặt chữ dưới để không che đuôi. Đạo diễn hình ảnh nên khung S1 để mặt nước nằm khoảng 45–60 % chiều cao
- Bề rộng nửa khung H2 ~240 px → phải ngắt 2 dòng — tính từ lề 120 px mỗi bên ở khung 720
- Tô đỏ chữ "đỏ" ở T-3 — ý dựng, không phải chữ mới

## Còn thiếu ⬜
- Khung đỏ thật của S1 — dời giây T-2, T-3, T-4, C6-1
- Cỡ chữ thật đo bằng `tw` — ảnh hưởng việc H3-1 có vừa 2 dòng ở cỡ tiêu đề không
- Lớp phủ vùng an toàn chính thức của TikTok/Meta — ảnh hưởng vị trí `duoi-an-toan` ở bản quảng cáo Meta (có nút CTA dưới)

## Phán đoán
- **Khung đỏ S1 ⬜:** như phiếu 05 — nghiêng về đỏ ~5,8–6,5 s tổng · ~65 % · kiểm bằng Thợ dựng đo khung đỏ, ngưỡng T-2 ≥ 1,05 s, hạn khi có S1
- **H3-1 vừa 2 dòng ở cỡ tiêu đề ⬜:** nghiêng về vừa · ~75 % · vì dòng dài nhất 18 ký tự, tho-dung §3.3 ghi cỡ 44 px ở khung 720 chứa ~26 ký tự/dòng → còn chỗ tăng cỡ ~1,4× · đổi ý nếu `tw` đo dòng 2 > 480 px ở cỡ chọn · kiểm bằng `tw`, ngưỡng ≤ 480 px, hạn bước 10
- **`duoi-an-toan` bị nút CTA quảng cáo Meta che ⬜:** nghiêng về không bị che · ~60 % · vì khối chữ dừng ở y ≤ 830, trên mép 35 % dưới (lấy số lớn hơn của hai nguồn) · đổi ý nếu lớp phủ Ads Manager cho thấy nút CTA lấn trên 65 % chiều cao · kiểm bằng xem trước trong Ads Manager, ngưỡng khối chữ không chạm lớp phủ, hạn trước khi chạy quảng cáo

## Đã tự quyết (sếp không cần làm gì)
- Slogan vào ở cú bật và nằm liền sang thẻ kết, thẻ chỉ thêm một dòng CTA — đủ giờ đọc, không lặp
- Không đặt chữ mới lên chỗ dải chữ vàng gốc — chỗ đó bị nút nền tảng che; che dải riêng
- CTA có nền vàng kim (màu logo) để tách khỏi slogan
- Bản đối chứng: CTA vào chậm 0,3 s sau slogan để không vượt mốc đọc

## Cần sếp (tối đa 3, viết lời thường)
—
