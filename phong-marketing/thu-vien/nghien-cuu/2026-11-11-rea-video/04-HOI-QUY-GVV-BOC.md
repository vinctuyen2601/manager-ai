# 04 · Hồi quy `gvv boc`: bản cũ (main) với bản mới (nhánh `boc-cat-thich-nghi`)

Ngày 12/11/2026. Mã: `D:/my project/gen-video-viral`, nhánh `boc-cat-thich-nghi` (chưa merge). Làm ý G1, G1b, G5 ở `02-so-voi-gvv-boc.md` mục 3.
Chạy `gvv boc` thật (cả whisper) bằng hai bản trên cùng máy. Đầu ra để ở scratchpad, không commit video.

## 1. Đáp án: soi từng khung, không lấy nguyên bảng cảnh viết tay

Mỗi điểm còn tranh cãi đều đã mở lưới **từng khung** (passthrough, ghi giây) và xem tận mắt.

| Video | Cắt thật (giây) | Ghi chú khi soi |
|---|---|---|
| orb `video-02.mp4` | 1,02 · 1,66 · 2,54 · 3,89 · 5,12 · 6,58 (6) | **Đáp án giao "cắt ~2,23–2,25 s, điểm 0,134" không khớp với tệp này.** Điểm scene ở 2,0–2,5 s chỉ 0,000–0,009. Cắt mặt sau → mặt trước nằm ở **2,538 s, điểm 0,408**: rơi giữa hai ô 2,25 và 2,5 của lưới 4 khung/giây, nên tệp việc ghi "2,25 → 2,5". Bản cũ vẫn bắt được. Cắt 0,134 của đề thi 11/11 chưa tìm thấy tệp nào trên máy (đã grep cả `manager-ai`). Tệp test tổng hợp thay vào chỗ này (mục 4) |
| khung 01 | 3,63 · 6,20 · 6,97 · 7,43 · 8,47 · 9,47 · 10,67 · 11,80 (8) | 7,90 = **đèn**, không phải cắt. Mốc 1,6 (1a/1b) và 2,7 trong bảng tay là **nhịp**, không phải cắt: soi khung thấy một lần lia/vung liền |
| khung 02 | 3,43 · 6,00 · 6,80 · 7,27 · 8,27 · 9,30 · 10,47 · 11,60 (8) | 7,70 = đèn. 2,7 (đếm → giật vải) và 3,00 là một cảnh liền |
| khung 03 | 4,23 · **5,10** · 6,00 · 11,63 (4) | **Bảng tay sót 5,10**: hộp nhìn từ trên xuống → cận hai tay cầm hộp, đổi khung hình. 3,8 (giật vải) **không** phải cắt |
| phao `video-01.mp4` | 0,10 (1) | 0,10 là **cắt nhảy** ở đầu video (tay dịch chỗ, cùng nền). Từ 0,10 đến 15,2 s là một cảnh liền, 0 cắt |
| `S1.mp4` (Muse) | không có | |
| *(thêm)* orb `video-01.mp4` | 2,25 (1) | Cắt điểm 0,160 giữa hai đoạn trình chiếu. Hai bản đều bắt |

## 2. Kết quả

| Video | Bản cũ: đúng / sót / báo nhầm | Bản cũ: cờ đèn | Bản mới: đúng / sót / báo nhầm | Bản mới: phân xử |
|---|---|---|---|---|
| orb v02 | 6 / 0 / **1** (5,89: vuốt màn hình) | — | 6 / 0 / **0** | 5,89 → chuyển động ✔ |
| khung 01 | 8 / 0 / 1 (2,70) | 7,9 "đèn?" ✔ | 8 / 0 / 1 (2,70) | 7,90 → đèn giữ sáng ✔ · 0,10 → chuyển động ✔ |
| khung 02 | 8 / 0 / 0 | 7,7 "đèn?" ✔ | 8 / 0 / 0 | 7,70 → đèn giữ sáng ✔ · 3,00 → chuyển động ✔ |
| khung 03 | 4 / 0 / 0 | — | 4 / 0 / 0 | |
| phao v01 | 1 / 0 / 0 | — | 1 / 0 / 0 | 0,10 → **cắt nhảy?** (đúng loại) |
| S1 | 0 / 0 / 0 | — | 0 / 0 / 0 | Nguồn gốc: **IPTC `trainedAlgorithmicMedia`, phát hành Meta** |
| **Cộng** | **27 / 0 / 2** | 2/2 đúng | **27 / 0 / 1** | 5/5 điểm loại bỏ đều đúng |

- Đạt mục tiêu: 0 cắt giả trên video phao và S1. Không tệ hơn bản cũ trên 3 khung. Bớt được một báo nhầm (orb 5,89).
- Báo nhầm còn lại (khung 01, **2,70**) có ở **cả hai bản**. Đó là cú vung máy rất nhanh: trong 5 khung ảnh trượt quá xa
  nên phép so khung t−2 ↔ t+3 (dịch ±2 điểm ảnh) không nhận ra là cùng cảnh (giống = 0,17).
- Cắt điểm thấp (G1): trên 6 video này không có cắt nào dưới 0,15 nên chưa thấy được lợi ích thật. Lợi ích đã chứng minh bằng
  test tổng hợp: cắt điểm 0,137, ngưỡng cũ không bắt, ngưỡng mới bắt (mục 4).

## 3. Tham số và vì sao chọn

**Ngưỡng thích nghi (G1): k = 2,5, c = 0,06** (giữ mức khởi điểm của rea-video). Trung vị lấy ở ±0,5 s, không tính khung đang xét.
Shot ngắn nhất 0,12 s: trong ±0,12 s chỉ giữ đỉnh cao nhất. Bỏ khung ≤ 0,08 s.

| k · c | đúng | sót | nhầm (sau phân xử) |
|---|---|---|---|
| **2,5 · 0,06** | 27 | 0 | 1 (khung 01 2,70) |
| 2,0 · 0,04 | 27 | 0 | 5 |
| 2,5 · 0,04 | 27 | 0 | 3 |
| 2,5 · 0,08 | 27 | 0 | 1 |
| 3,0 · 0,08 | 27 | 0 | 0 |

Không chọn 3,0 · 0,08 dù mẫu này ra 0 nhầm. Nó chỉ bỏ được một điểm 2,70, mà điểm đó lại đang tranh cãi. Đổi lại ngưỡng sàn ở
đoạn tĩnh tăng từ ~0,07 lên ~0,095, ở đoạn hơi động từ ~0,135 lên ~0,17. Thứ đã làm hỏng việc trong đề thi 11/11 là **sót cắt**
(0,134), không phải báo nhầm. Người soi gạch một điểm thừa thì rẻ hơn nhiều so với đi tìm một điểm thiếu. Nếu thêm video mà
báo nhầm kiểu "vung máy" nhiều lên thì xét lại.

**Phân xử (G1b)**: ảnh xám 64 px của mọi khung, giải mã một lần. So khung **t−2** với **t+3**.
"Giống" = trung bình tương quan ZNCC theo ô 8×8, thử dịch ±2 px. Mỗi ô tự trừ trung bình rồi chia độ lệch chuẩn, tức là phần
"cấu trúc" của SSIM trên **ảnh xám đã cân sáng**. Không dùng `ssim`/`psnr` của ffmpeg vì hai lý do: nó không cân sáng (đèn bật
làm SSIM tụt), và phải gọi ffmpeg tua từng điểm. Viết bằng TS thì hàm thuần, test được.

| Đo được (27 cắt thật · 2 đèn · 3 chuyển động · 1 cắt nhảy) | Giá trị |
|---|---|
| Giống ở cắt thật | −0,06 … **0,20** |
| Giống ở đèn khung 01/02 | 0,64–0,65. Sáng lên 43 % điểm ảnh, tối đi **0 %** |
| Giống ở chuyển động trong cảnh | **0,46** … 0,89 |
| Giống ở cắt nhảy phao 0,10 | 0,69. Điểm / trung vị ×39. Sáng lên 13 %, tối đi 15 % |

Luật, theo thứ tự:
1. Giống < **0,4** (giữa khe 0,20–0,46): cắt.
2. Ảnh **quay về** (chênh trước↔sau < ½ chênh trước↔giữa): nháy.
3. Cấu trúc giữ và **sáng lên** (≥ 2 % điểm ảnh sáng thêm > 12 mức, gấp ≥ 2 lần chỗ tối đi): **đèn bật rồi giữ sáng**.
4. Đổi đột ngột ở đoạn tĩnh (điểm ≥ **10 × trung vị**): **cắt nhảy?**, vẫn tính là cắt.
5. Còn lại: chuyển động.

Bước 4 cần có vì luật cũ "giống thì không cắt" sẽ xoá mất cắt nhảy thật ở video phao 0,10 s.

Áp phân xử cho **mọi** điểm nghi, không chỉ điểm gần lần bật sáng. Ảnh đã giải mã sẵn nên không tốn thêm gì, mà lại gỡ được
cả báo nhầm do chuyển động (orb 5,89). Luật cũ "sát bật sáng ≤ 0,25 s = có thể là đèn" (`danhDauCatDoSang`) đã bị bỏ.
`timBatSang` giữ nguyên.

**Ca đèn LED giữ sáng của mình** (đuôi phao đổi đỏ, vòng LED khung 03): điểm scene ở đó chỉ 0,011–0,044, tức là **không bao giờ
thành điểm nghi**. Thử ép phân xử thì ra giống 0,71–0,89, nghĩa là cũng **không cắt**. Tuy vậy nhãn ra là "chuyển động", không
phải "đèn": vùng đỏ quá nhỏ ở 64 px và tay đang cử động (sáng lên 1,5–4 %, tối đi 4–9 %).

| Điểm | Điểm scene | Giống | Sáng lên / tối đi |
|---|---|---|---|
| Phao 5,27 | 0,011 | 0,89 | 3,1 / 3,8 % |
| Phao 7,67 | 0,025 | 0,81 | 4,2 / 8,8 % |
| Phao 10,23 | 0,022 | 0,86 | 2,5 / 5,7 % |
| Phao 13,80 | 0,029 | 0,87 | 2,7 / 5,9 % |
| S1 1,42 | 0,019 | 0,86 | 1,5 / 3,8 % |
| Vòng LED khung 03, 7,8–8,0 | 0,031–0,044 | 0,71–0,85 | |

Một ô sáng lớn bật lên rồi giữ (test tổng hợp) thì ra đúng nhãn **đèn giữ sáng** (giống 0,79, sáng lên 30 %, tối đi 0 %).

**Nguồn gốc (G5)** gồm: encoder, handler, ngày tạo, make/model, khoá AIGC, hộp C2PA/JUMBF (quét các hộp cấp đầu của MP4, trừ
mdat), chữ ký phần mềm. Có thêm **XMP IPTC `DigitalSourceType`**, vì soi S1 thấy clip Muse mang
`trainedAlgorithmicMedia` + `dc:publisher=Meta`. Đây là bằng chứng AI mạnh, rea-video không đọc. Tên mô hình trong
tiêu đề/mô tả chỉ ghi "không tính". Đã sửa một báo nhầm: `adobe:ns:meta` là không gian tên của mọi gói XMP, không phải Adobe.
Bốn video TikTok (khung 01–03, orb) chỉ có `Core Media` / `Lavf`, không có thẻ máy quay.

## 4. Test

43/43 xanh (`npm test`). Test mới:
- `tests/cat-thich-nghi.test.ts`: trung vị cục bộ; bắt 0,134 ở đoạn tĩnh; bỏ 0,2 ở đoạn rung; shot ngắn 0,12 s; giống cấu
  trúc; phân xử đủ 5 loại trên ảnh giả.
- `tests/boc-tong-hop.test.ts` (ffmpeg lavfi):
  - Cắt mềm smptebars → rgbtestsrc tương phản 0,2, **điểm 0,137**: `doCat(0,15)` cũ ra rỗng, bản mới ra "cắt".
  - Ô sáng bật rồi giữ: thành điểm nghi, phân xử là "đèn giữ sáng".
  - Ô sáng dần trong 0,5 s: không có điểm nghi.
  - Nguồn gốc tệp ffmpeg.
- `tests/nguon-goc.test.ts`: encoder / máy quay / chữ người gõ; AIGC + C2PA; IPTC + bẫy adobe:ns:meta.

Test cũ `danhDauCatDoSang` đã bỏ cùng với luật của nó. Các test khác giữ nguyên.

## 5. Rủi ro còn lại

- Cú vung/lia rất nhanh vẫn có thể bị báo là cắt (khung 01, 2,70), giống bản cũ.
- Mẫu hồi quy nhỏ (27 cắt, 2 đèn). Chưa có video thật nào có cắt dưới 0,15. Đề thi 0,134 vẫn chưa tìm ra tệp.
- Ngưỡng "cắt nhảy" (×10) chỉ dựa trên một điểm thật. Một cú đèn **nhỏ** bật đúng lúc tay giật có thể rơi vào "cắt nhảy?",
  nhưng khi đó vẫn có cờ để soi.
- Đèn nhỏ giữ sáng thì gắn nhãn "chuyển động" chứ không phải "đèn". Kết luận "không cắt" vẫn đúng.
- `gvv cat` vẫn dùng hai ngưỡng cố định cũ (không thuộc phạm vi việc này).

## Bổ sung 12/11 — video thật đầu tiên sau khi gộp (reel-04 Fishcamp, khung `thu-vien/khung/reel-04-fishcamp-phao-dien-coc.md`)
Săn xu hướng soi khung dày từng điểm: **đúng 1 (7,233) · sót 1 (3,767, cắt nhảy điểm 0,091) · báo nhầm 2 (2,633, 5,733 "nhảy?" = bàn tay úp + LED đổi màu)**.
Ca khó mới: **LED đổi màu trong 1 khung + tay chuyển động cùng lúc** → điểm scene cao như cắt nhảy. Cắt nhảy thật 0,091 vẫn dưới ngưỡng thích nghi.
→ Luật `sxh-boc-khung` "soi mọi điểm, kể cả dưới ngưỡng" vẫn bắt buộc. Ứng viên sửa: ngưỡng "nhảy?" xét thêm % điểm ảnh đổi màu cục bộ.
