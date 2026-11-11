---
viec: td.dung-qc → td.xuat-bien-the → td.do-qc
nganh: do-cau-vn
trang_thai: xong
nhan: [00-dieu-phoi.md (2 dòng cuối), 05-bk-kich-ban.md, 06-bk-chu-tren-hinh.md, 07-dd-ke-hoach-hinh.md, 09-dd-kiem-clip.md, ../../san-pham/phao-ro-diec.md (1b logo, 3b, 6 cấm), ../../../../nhan-su/vai/tho-dung.md, ../../../../nhan-su/viec/td-dung-qc.md, td-xuat-bien-the.md, td-do-qc.md, ../../../../quy-che/khuon/phieu-giao.md, ../../../../BAN-GIAO.md §4, gen-video-viral/CLAUDE.md, NL/video-01.mp4, NL/video-01-4k.mp4, NL/S1.mp4]
giao: [thu-nghiem/out/prd-g01/prd-g01-H1.mp4, prd-g01-H3.mp4, prd-g01-cat6s.mp4, prd-g01-doi-chung.mp4, qc.json, QC.md, DUNG.md, dung.sh, dung.py, qc.py, tach-logo.py, logo-17-tach.png, loc/*.txt, chu/*.png, an-toan/*.png (16 ảnh phủ), neo/*.jpg, *-report.json, 10-td-dung.md]
con_thieu: [logo PNG gốc của shop (đang dùng bản tách từ video), tên bài + có lời hay không của nhạc nền video shop, nghe thử tiếng nước S1 đã kéo +29 dB]
chi_phi: "0 $ · 0 % hạn mức Muse · 0 lượt dịch vụ trả phí (chỉ ffmpeg + Python trên máy)"
ngay: 2026-11-11
---

⚠ Ba việc `td.*` **chưa có bộ thi**; vai chưa thi theo ngành đồ câu → cả bài ⚠, nhìn lại ở pha 4.
OUT = `thu-nghiem/out/prd-g01/`. Dựng **thẳng bằng ffmpeg** (`dung.py`), không qua `gvv dung` (3 lỗi đã biết ở BAN-GIAO §4). Tái lập: `bash OUT/dung.sh` — đã xoá 4 tệp ra, chạy lại: cùng tong_giay, qc dat=true cả 4.

## Tệp ra · mốc cắt thật · số đo (mọi số từ `qc.json`, đo lại trên tệp ra)

| Tệp (720×1280@30, H.264 + AAC 48k) | Dài (s) | Đoạn (giây ra ← nguồn) | Khung đỏ đầu đo trên tệp | Chữ cú lộ vào | LUFS / LRA / TP | Khung đen | Đứng hình | Nhảy tiếng ở cắt (M, dB) | QC |
|---|---|---|---|---|---|---|---|---|---|
| `prd-g01-H1.mp4` | 9,500 | 0–2,5 ← S1 0–2,5 · 2,5–5,0 ← shop 6,40–8,90 · 5,0–7,5 ← S1 2,5–5,0 · 7,5–9,5 thẻ | hook **1,433** (09: 1,42) · Thân B **5,000** | 5,000 | −14,1 / 0,9 / −5,7 | 0 | từ 7,5 (thẻ tĩnh, chủ ý) | 1,2 · 0,3 · 0,3 | ✅ |
| `prd-g01-H3.mp4` | 10,500 | 0–2,5 ← S1 0–1,375 chậm ×0,54 (nội suy) · 2,5–5,0 ← shop · 5,0–8,5 ← S1 1,375–4,875 · 8,5–10,5 thẻ | hook: không đỏ ✓ · Thân B **5,033** (09: 5,04) | 5,033 | −14,1 / 1,9 / −5,4 | 0 | từ 8,5 (thẻ) | 5,4 · 0,3 · 0,2 | ✅ |
| `prd-g01-cat6s.mp4` | 6,000 | 0–2,5 ← S1 0–2,5 · 2,5–4,4 ← S1 2,5–4,4 · 4,4–6,0 thẻ | hook **1,433** · đoạn 2 đỏ từ **2,500** | 2,500 | −14,2 / 1,4 / −5,4 | 0 | từ 4,433 (thẻ) | 1,2 · 0,2 | ✅ |
| `prd-g01-doi-chung.mp4` | 10,800 | 0–8,8 ← shop 0,10–8,90 · 8,8–10,8 thẻ | không áp (đỏ trên tay 5,07 · 7,57) | — | −13,9 / 0,4 / −5,9 | 0 | từ 9,1 (thẻ, sau khi CTA vào) | 0,3 | ✅ |

Cả 4: lệch hình/tiếng 0,000 s · không lặng > 2 s · tăng tốc max 1,0× · mọi khối chữ trọn trong x 120–600 / y 180–832 và đủ giờ đọc (bảng `QC.md`, ảnh `an-toan/`) · md5 khác nhau từng đôi (b8d9a633 · 98a17110 · c7312b9e · 65498d67).
Lệnh đo (nguyên văn trong `qc.py`): ffprobe (cỡ/tiếng/độ dài) · `blackdetect=d=0.03:pix_th=0.10` · `freezedetect=n=0.003:d=0.5` · `ebur128=peak=true` · `silencedetect=n=-45dB:d=2` · `ebur128=metadata=1` (S và M ±0,4 s quanh mốc cắt) · % điểm ảnh đỏ R>200,G<110,B<110 từng khung.

## Biến thể (td.xuat-bien-the)
| Tệp | Mã hook | Dạng/trục đổi | Hook dài | Nối (s) | Thân (tệp + giây vào) | Tổng | neo_luc mới | LUFS / TP | QC |
|---|---|---|---|---|---|---|---|---|---|
| H1 | H1 đoán nhịp | hình S1 có đỏ + chữ câu hỏi | 2,5 | 2,5 | shop 6,40 + S1 từ 2,50 | 9,5 | 1,433 · 5,000 | −14,1 / −5,7 | QC.md §H1 ✅ |
| H3 | H3 mẹo chữ lớn | hình S1 chưa đỏ (chậm) + chữ mẹo | 2,5 | 2,5 | shop 6,40 + S1 từ 1,375 | 10,5 | 5,033 | −14,1 / −5,4 | QC.md §H3 ✅ |
| C6 | H1 | bản cắt | 2,5 | — | S1 2,50–4,40 | 6,0 | 1,433 · 2,500 | −14,2 / −5,4 | ✅ |
| V00 | — (đối chứng) | không hook | — | — | shop 0,10–8,90 | 10,8 | — | −13,9 / −5,9 | ✅ |
H2 **không xuất** (bỏ theo mặc định 09). Thân B H1 ≠ H3 (khác giây vào S1) — đúng theo 09 vì S1 chỉ có một lần đỏ; **Thân A giống hệt** ở H1/H3 (cùng đoạn shop, cùng chữ). Tên tệp theo lệnh giao (`prd-g01-*.mp4`), không theo mẫu tên dài của gói — đổi khi đăng.

## Đã kiểm (có nguồn)
- Mốc cắt đúng 09: H1 hook ra = Thân B vào = S1 2,50; H3 = S1 khung 33 (1,375 s); không khung S1 nào dùng hai lần — `*-report.json` `doan[]`, đo đỏ trên tệp
- Chữ cú lộ "Cá cắn là đuôi chuyển đỏ" vào **đúng khung đỏ đầu Thân B** (H1 5,000 · H3 5,033 · C6 2,500); chữ hook H1 giữ qua cú đỏ 1,433 — `qc.json` + dải 10 khung `neo/H1-1.43.jpg`, `neo/H3-5.03.jpg` (đã mở xem)
- Chữ tiếng Việt đúng dấu ở cả 4 bản — mở lưới 4 khung/giây từng bản + ảnh phủ vùng an toàn (arialbd.ttf, NFC)
- Dải chữ vàng shop **không còn trong khung** (cắt 4K phần y < 1035, thu về 720×1280); logo mờ góc trên trái giữ — lưới khung H1/H3/V00
- Không khung đen (`blackdetect d=0.03` rỗng cả 4); thẻ kết cắt thẳng, nền xanh than Y≈58
- Âm −13,9…−14,2 LUFS, TP −5,4…−5,9 dBTP (loudnorm 2 lượt, linear) — `qc.json`
- H1/C6: nhạc vào 1,417 s, khung đỏ đầu 1,433 s → lệch 0,017 s (≤ 0,1) — `loc/prd-g01-H1.txt` (`adelay=1417`)
- Logo thẻ kết tách được **sạch** từ watermark 4K: 61 khung, giữ điểm ảnh vàng kim đứng yên (nền trôi), tô lại vàng đều — `logo-17-tach.png` 306×301 nền trong; đủ vòng tròn, "17" lưỡi câu + cá, gạch ngang, "FISHING" (xem `_tam/logo-xem.png`)
- Quét chữ trên hình theo hồ sơ mục 6: không giá, không xuất xứ, không "tự động", không số đánh giá — 6 câu chữ đều lấy nguyên từ 05/06

## Suy ra ⚠
- **Đuôi đỏ ở Thân B nằm ở y ~780–1180 / 1280 — trong dải 35 % dưới** (chỗ chú thích + nút app đè), vì trong S1 thật phao bị kéo chìm xuống nửa dưới khung — từ ảnh phủ `an-toan/prd-g01-H3-7.23.png`. Hình cú lộ có thể bị chữ mô tả của app che một phần.
- Chữ Thân B dời lên y 326–450 (06 ghi y 700–830) để không che đuôi đỏ; ở H3 0,5 s đầu Thân B (đuôi còn dựng cao) dòng slogan cắt ngang phần trên đuôi — `an-toan/`
- H3 hook kéo chậm ×0,54 bằng nội suy: soi khung từng ảnh không thấy vỡ/nhoè rõ ở vòng sóng 0–0,7 s; 2 khung cuối hook giữ (0,067 s) — `_tam/h3-cham.png`. Chưa xem chạy thật trên điện thoại
- Nhạc nền = rãnh tiếng video shop (−8 LUFS, phách đều ~150 BPM, có vạch giai điệu) — có thể là nhạc thịnh hành Douyin/TikTok có lời; không nghe được trên máy này
- Tiếng nước S1 gốc rất nhỏ (−41 LUFS) nên phải kéo +29 dB để không hụt tiếng ở hook / không nhảy > 6 dB ở cắt 2,5 s của H3 (đo được 5,4 dB) — có thể lộ tiếng xì nền
- Chuyển Đạo diễn: khối tối ở mép nước dưới đuôi (H1/H3/C6 giây 0–1,65) và dây ở đỉnh đuôi vẫn thấy trên bản dựng như 09 đã ghi — không chấm thêm
- Thẻ kết tĩnh → `freezedetect` báo đứng hình đúng từ mốc thẻ (chủ ý, không phải lỗi)

## Còn thiếu ⬜
- Logo PNG gốc — ảnh hưởng độ nét logo thẻ kết (bản tách 306 px, hiện 300 px — không phóng)
- Tên bài nhạc / có lời không — ảnh hưởng quyền dùng ngoài TikTok và cảm giác "nhạc lạc"
- Nghe thử trên loa: tiếng nước kéo +29 dB, nhạc vào 1,42 s

## Phán đoán
- **Logo tách đủ dùng ⬜:** nghiêng về **đủ cho lô này** · ~80 % · vì bản tách giữ đủ nét chi tiết và hiển thị đúng 1:1 cỡ tách (không phóng) · đổi ý nếu sếp thấy viền vòng tròn đứt/mờ trên điện thoại · kiểm bằng sếp xem 2 s cuối H1, hạn trước khi chạy quảng cáo; có PNG gốc thì thay `logo-17-tach.png` rồi `bash dung.sh` (1 lệnh)
- **Nhạc shop có lời/khó hợp cảnh hồ đêm ⬜:** nghiêng về **dùng được** · ~65 % · vì shop đã tự đăng video với nhạc này, mức dồn nén giống nhạc nền không lời phổ biến · đổi ý nếu nghe thấy lời hát hoặc bài nổi tiếng · kiểm bằng sếp nghe H1 0–5 s, hạn trước khi đăng; đổi bài = thay nguồn `[0:a]` trong `dung.py`
- **Đuôi đỏ bị chú thích app che ⬜:** nghiêng về **không hỏng cú lộ** · ~60 % · vì đuôi ở giữa ngang (x ~360), chú thích TikTok/Reels dồn trái và chỉ 2–3 dòng ở 80–90 % cao; khoảnh khắc đổi đỏ (hook 1,43 s) xảy ra khi đuôi còn dựng cao, ngoài vùng che · đổi ý nếu xem trước trong Ads Manager thấy đuôi bị che quá nửa · kiểm bằng xem trước bản H1 trong TikTok Ads Manager/Meta, ngưỡng đuôi đỏ thấy ≥ 2/3 chiều dài, hạn trước khi chạy

## Đã tự quyết (sếp không cần làm gì)
- Dựng thẳng ffmpeg, chữ vẽ PIL (đo được khung bao, đúng dấu) — tránh 3 lỗi `gvv dung`
- Che dải chữ vàng bằng **cắt khung từ bản 4K** (phóng 1,24×, vẫn nét) thay vì mảng mờ — thử `delogo` trước, để lại vệt xám thấy rõ trên tay
- Chữ Thân B dời lên trên vùng nước tối, "Thử cảm biến" đặt trên mặt bàn — để không che đuôi phao
- Một mạch nhạc liền (rãnh tiếng shop) căn khớp Thân A; H1/C6 nhạc vào đúng khung đỏ; H3 nhạc vào ở cắt 2,5 s
- Đối chứng giữ đúng 05/06 (shop 0,10–8,90 + thẻ, CTA vào sau slogan 0,3 s); C6 thẻ 1,6 s theo 09
- Không xuất H2, không sinh thêm clip

## Cần sếp (tối đa 3, viết lời thường)
1. Logo ở cuối video em tách từ dấu mờ trong video của anh (nhìn đã sạch, đủ vòng tròn và chữ FISHING). Anh có tệp logo gốc thì gửi em để thay cho nét hơn không? Mặc định nếu anh không trả lời: dùng bản tách.
2. Cả 4 bản em dùng nhạc nền có sẵn trong video anh quay (em không nghe được trên máy này). Anh nghe thử 5 giây đầu bản H1 xem nhạc có lời hát hay là bài nổi tiếng không? Mặc định nếu anh không trả lời: giữ nhạc này.
3. Ở đoạn cuối, đuôi phao đỏ nằm ở nửa dưới màn hình, chỗ chữ mô tả của app hay đè lên. Anh muốn em phóng to khung để đẩy đuôi lên (hình sẽ mờ hơn một chút) không? Mặc định nếu anh không trả lời: giữ như hiện tại, xem trước trong trình quảng cáo rồi tính.
