# Thợ dựng · bản-địa-hoá

Làm sạch **video có sẵn** (Douyin, TikTok, nhà cung cấp…) rồi lắp lời mới: che chữ/logo theo danh sách "Cần che",
lồng giọng CapCut, nhạc hợp lệ, chữ mới. Kiến thức: `../vai/tho-dung.md` §3.6–3.7, §3.9, §4 bước 6. Đo kỹ thuật: `td-do-qc.md`.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Luồng Nuôi page bước 5 · luồng Quảng cáo hướng Lai (đoạn video nhà cung cấp) |
| Nhận | Video gốc + ID/tài khoản nguồn · phiếu `bk-loi-ban-dia` (lời theo giây, caption, **"Cần che"**, mục đích) · bảng chữ (`bk-chu-tren-hinh`) |
| Giao | `<ra>/<id>-ban-dia.mp4` · `<id>-clean.mp4` (đã che, chưa lời) · tệp tái lập (`dung.sh` + tệp lọc) · `BAN-DIA.md` (khuôn dưới) · phiếu giao (`../../quy-che/khuon/phieu-giao.md`, `viec: td.ban-dia-hoa`) |
| Xong khi | Mọi dòng "Cần che" có ảnh trước/sau · không còn chữ/logo nước ngoài trong lưới · đã chuyển `td-do-qc` |

## Luật bắt buộc
1. **Nếu một thứ cần che** (dòng trong "Cần che", hoặc tự thấy khi soát lưới) → che bằng lệnh có giây (`delogo`/`boxblur`/phủ khối
   chữ mới, `enable='between(t,a,b)'`), chụp ảnh trước/sau ở giây đó. Thứ tự thấy ghi cột "Từ đâu = tự thấy".
   Chữ nằm ở vùng UI che (dải dưới 35 %, sticker nền tảng ở góc) **vẫn phải che**: lúc chạy quảng cáo nó lộ ra.
2. **Nếu video gốc có giọng người nói** → bỏ hẳn track tiếng gốc khi lắp giọng mới (không hạ nhỏ). Muốn giữ tiếng nền thì
   phải có tiếng nền tách sạch; không có → dùng nhạc mới. Ô "Tiếng gốc" ghi đã làm gì.
3. **Nếu giọng CapCut cần tốc độ ngoài 0,8–1,15×** để vừa giây → không ép `atempo`; trả Biên kịch rút lời (gói §3.9).
4. **Nếu nhạc lấy từ thư viện CapCut hoặc TikTok CML** → ô "Nền tảng được phép" ghi "chỉ TikTok/CapCut" (bản Facebook/Instagram/YouTube dùng tiếng nền
   hoặc nhạc khác). **Không hỏi sếp về quyền** (sếp chốt 11/11 "bỏ kiểm quyền khỏi quy trình tạo video"; rủi ro tắt tiếng chỉ ghi một dòng trong phiếu).
5. **Nếu che ID/watermark tài khoản gốc** → caption phải có dòng `Nguồn:` ghi đúng ID đó (luật 1 của `bk-loi-ban-dia`).
   Caption thiếu dòng Nguồn → không che ID, ghi lý do vào phiếu.

## Bước
1. Kiểm đầu vào: video mở được, có phiếu lời, có "Cần che" (gói §6, dòng "Bản địa hoá"). Thiếu lời → làm `clean.mp4` trước.
2. Soát lưới 4 khung/giây cả video gốc. Đối chiếu từng ô với "Cần che"; thêm thứ tự thấy (luật 1).
3. Che → `<id>-clean.mp4`. Mẫu lệnh: `delogo=x=…:y=…:w=…:h=…:enable='between(t,a,b)'`; vùng rộng thì cắt vùng,
   `boxblur=20`, đè lại. Ảnh trước/sau: `-ss <giây> -frames:v 1`.
4. Giọng: CapCut TTS theo quy trình skill reup mục 7 (`C:/Users/PC/Downloads/cau-lenh-reup-video-auto.md`); tốc độ theo luật 3.
   Mỗi câu đặt theo mốc `starts` của lời mới, không theo giây của lời gốc (gói §3.6). Im 0,5–1 s quanh cú bật theo phiếu lời.
5. Chữ mới theo bảng chữ, bám câu thoại mới, trong dải an toàn (gói §3.1; số px ở `td-dung-qc` bước 6).
6. Tiếng: giọng + nhạc −12 dB dưới giọng, mờ dần 1,5 s cuối, rồi `loudnorm=I=-14:TP=-1.5:LRA=11` hai lượt (gói §4 bước 6).
7. Ghi tệp tái lập, chạy lại một lần. Chuyển `td-do-qc`. Phiếu giao.

## Khuôn đầu ra (`<ra>/BAN-DIA.md`)
```
Video gốc: <tệp> · Nguồn: <nền tảng>/<ID> · Mục đích: nuôi page | bán hàng · Thị trường: …
Tiếng gốc: bỏ hẳn | giữ tiếng nền tách sạch (<cách tách>)
Giọng: CapCut <tên giọng> · tốc độ min–max … × (trong 0,8–1,15)
Nhạc: <bài> · nguồn: <thư viện> · nền tảng được phép: … · nền tảng sẽ đăng: … · khớp: có | không → Cần sếp
Tái lập: <ra>/dung.sh + <tệp lọc> — chạy lại: có
## Che   | Giây | Thứ | Vị trí (x,y,w,h px) | Từ đâu: Cần che | tự thấy | Lệnh | Ảnh trước/sau |
## Chữ mới  | # | Từ | Đến | Chữ | y đầu–y cuối (px) | Trong dải an toàn |
```

## Thành công khi
- Xem lưới 4 khung/giây bản ra: không còn một chữ nước ngoài, logo hãng, sticker nền tảng nào.
- Người xem không nghe lẫn giọng gốc dưới giọng mới.
- Sếp biết nhạc được đăng ở nền tảng nào trước khi đăng.

## Thất bại khi
- `loudnorm` tự đẩy tần số âm lên 96 kHz → thêm `aresample=48000` sau loudnorm. Nguồn Douyin mang nhãn màu BT.601 → re-encode sang BT.709 hoặc `color.py --retag bt709` (ffmpeg-skill `check.py` bắt cả hai, thử 12/11).
- Chữ in sẵn "works very well" ở vùng UI che và sticker TikTok góc trên còn trong bản giao (thi 11/11, cả hai bài).
- Để lộ logo hãng (thi 11/11 bộ Biên kịch đề 03, bài đối chứng — lỗi ở khâu lời, Thợ dựng là chốt chặn cuối).
- Lặng 2,1 s giữa hai câu giọng (skill reup p05, gói §9).

## Bộ thi
`td-ban-dia-hoa.thi/` — chưa lập. Đề gợi ý: video của đề 03 `bk-kich-ban-qc.thi/` (lời tiếng Trung, ID gốc trên hình).
