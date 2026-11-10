# Thợ dựng · đo-QC (kỹ thuật)

Đo **kỹ thuật** một tệp video bằng số: độ to, khung đen, đứng hình, lặng, lệch hình/tiếng, chữ trong vùng an toàn, thời gian đọc.
**Không** chấm nội dung hình (giống sản phẩm thật, vật lạ, liền mạch cảnh) — đó là việc Đạo diễn (`viec/README.md`, chia việc kiểm).
Kiến thức: `../tho-dung.md` §3.1–3.3, §3.8, §5, §7 (khuôn `qc.json`).

## Hợp đồng
| | |
|---|---|
| Khi chạy | Ngay sau `td-dung-qc`, `td-ban-dia-hoa`, và cho **từng tệp** của `td-xuat-bien-the`. Luồng Quảng cáo bước 10, Nuôi page bước 5 |
| Nhận | Tệp video · `DUNG.md`/`BAN-DIA.md` của bước trước (chữ, toạ độ, in sẵn) · khung (tổng, `neo_luc`) · `report.json` nếu có |
| Giao | `<ra>/<ten>-qc.md` (bảng dưới) · `<ten>-qc.json` (khuôn gói §7) · ảnh phủ `an-toan-<giây>.png` · phiếu giao (`_phieu-giao.md`, `viec: td.do-qc`) |
| Xong khi | Mọi dòng bảng có lệnh đã chạy, số đo, đạt/không · số trong phiếu = số trong bảng |

## Luật bắt buộc
1. **Nếu một dòng bảng không có lệnh chép nguyên văn đã chạy** → dòng đó là "chưa đo", không được ghi "đạt".
   Ngưỡng dùng đúng cột "Ngưỡng" dưới; đổi ngưỡng thì ghi lý do ngay ô đó.
2. **Khung đen đo bằng `blackdetect=d=0.03`** (≈ 1 khung ở 30 fps), không dùng d=0.1 như gói §3.8/§5 đang ghi.
   Có dòng `black_start` → ghi giây; nằm ở chỗ hiện/mờ từ đen (thẻ kết, đầu video) → trả bước dựng sửa, không ghi "chủ ý".
3. **Nếu số tự báo** (của bước dựng, của phiếu trước, của chính mình lần trước) **khác số đo lại** → lấy số đo lại, ghi cả hai ở
   cột "Tự báo"; dòng đó không đạt cho tới khi giải thích được chênh lệch.
4. **Nếu khối chữ — kể cả chữ/nhãn in sẵn từ nguồn — có phần nằm ngoài dải an toàn** → dòng không đạt, kèm ảnh phủ ở giây đó.
   Không lấy lý do "UI sẽ che": bản quảng cáo và bản xem ngoài app vẫn thấy.
5. **Nếu thấy lỗi nội dung hình** khi xem lưới → không chấm, ghi một dòng vào "Suy ra ⚠" của phiếu: "chuyển Đạo diễn: giây …, thấy …".

## Bước
1. Đặt `V=<tệp>`; lấy cỡ khung (W, H) và `neo_luc` từ khung/`DUNG.md`.
2. Chạy lần lượt các lệnh ở bảng, chép lệnh và kết quả vào bảng. Không đọc số từ báo cáo dựng thay cho lệnh.
3. Chữ: với mỗi khối ở `DUNG.md` (bảng "Chữ" và "In sẵn từ nguồn") → chụp ảnh phủ vùng an toàn (lệnh gói §5, mục Chữ) ở giữa
   thời gian hiện; đo thời gian hiện so với mốc đọc.
4. Lưới 4 khung/giây cả video (gói §4 bước 8) để soát chữ còn sót; nội dung hình → luật 5.
5. Viết `qc.json`: `dat` = mọi dòng đạt; dòng không đạt vào `loi` kèm giây. Phiếu giao: `trang_thai: chan` khi còn dòng không đạt.

## Khuôn đầu ra (`<ra>/<ten>-qc.md`)
| # | Mục | Lệnh đã chạy (nguyên văn) | Ngưỡng | Đo được | Tự báo | Đạt |
|---|---|---|---|---|---|---|
| 1 | Cỡ, fps, mã | `ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,codec_name,pix_fmt -of csv=p=0 $V` | `h264,W,H,30/1,yuv420p` | | | |
| 2 | Luồng tiếng | `ffprobe -v error -select_streams a:0 -show_entries stream=codec_name,sample_rate,channels -of csv=p=0 $V` | `aac,48000,2` | | | |
| 3 | Lệch hình/tiếng | `ffprobe -v error -show_entries stream=codec_type,duration -of csv=p=0 $V` | \|hình − tiếng\| ≤ 0,1 s | | | |
| 4 | Tổng thời lượng | `ffprobe -v error -show_entries format=duration -of csv=p=0 $V` | khung ± 0,1 s (quảng cáo = thân + thẻ kết) | | | |
| 5 | Khung đen | `ffmpeg -i $V -vf blackdetect=d=0.03:pix_th=0.10 -an -f null - 2>&1 \| grep black_start` | rỗng | | | |
| 6 | Đứng hình | `ffmpeg -i $V -vf freezedetect=n=0.003:d=0.5 -an -f null - 2>&1 \| grep freeze_start` | rỗng, hoặc mỗi dòng có lý do dựng | | | |
| 7 | Độ to, đỉnh thật | `ffmpeg -nostats -i $V -af ebur128=peak=true -f null - 2>&1 \| tail -12` | I −14 ± 1,5 LUFS · TP ≤ −1,5 dBTP | | | |
| 8 | Lặng | `ffmpeg -i $V -af silencedetect=n=-45dB:d=2 -f null - 2>&1 \| grep silence_duration` | rỗng | | | |
| 9 | Nhảy tiếng ở điểm cắt | `ebur128=metadata=1` + `ametadata=print:key=lavfi.r128.S`, đọc ±0,4 s quanh mỗi `moc_cat` | chênh ≤ 6 dB (đề xuất, gói §12.6) | | | |
| 10 | Cú bật | dải 10 khung quanh `neo_luc` (gói §4 bước 4) | `neo_luc` ± 0,1 s | | | |
| 11 | Tăng tốc | `report.json` → `doan[].toc_do` | ≤ 1,25× | | | |
| 12+ | Chữ khối k: vùng | ảnh phủ `an-toan-<giây>.png` (lệnh gói §5) | trọn trong y 14–65 % H, x 16,7–83,3 % W | | | |
| 12+ | Chữ khối k: đọc | ký tự, giây hiện, số dòng | hiện ≥ max(0,8 s; ký tự ÷ 20) · ≤ 2 dòng | | | |

Ô trống = chưa đo. Dòng "Chữ" lặp cho mọi khối, cả chữ in sẵn còn để lại.

## Thành công khi
- Ai chạy lại các lệnh trong bảng cũng ra đúng số trong bảng.
- Phiếu giao không có số nào không nằm trong bảng.

## Thất bại khi
- Báo "khung đen: 0" vì dùng `blackdetect` d=0,1; thực có 1 khung đen ở 7,700 s (thẻ kết hiện từ đen). Bài có gói dùng d=0,03
  nên tự bắt và sửa (thi 11/11).
- Chữ in sẵn "works very well" ở dải dưới và sticker TikTok góc trên lọt qua bảng đo, không bài nào báo (thi 11/11, cả hai bài).
- `loudnorm` chạy mặc định → ra −24 LUFS (gói §10).

## Bộ thi
`td-do-qc.thi/` — chưa lập. Đề hồi quy: bản dựng thi 11/11 (có gói 18 / đối chứng 15), bẫy khung đen 7,700 s.
