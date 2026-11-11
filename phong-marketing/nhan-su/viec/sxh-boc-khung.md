# Săn xu hướng · bóc-khung

Video mẫu → khung: điểm cắt đã soi, hook, LÕI/Phụ, âm thanh **đã đo**, chữ/logo cần che. Hai chế độ:
**thư viện** (khung đầy đủ, khuôn gói §7, dùng cho Quảng cáo) và **nuôi page** (bản rút gọn cho Biên kịch + Thợ dựng).
Kiến thức: `../vai/san-xu-huong.md` §4 bước 0–11, §5 (bảng kiểm), §7 (khuôn), §10 (sổ lỗi); sổ tay `../../thu-vien/so-tay/KIEN-THUC-VIRAL.md` §2 (A–H).

## Hợp đồng
| | |
|---|---|
| Khi chạy | Luồng Nuôi page bước 2 (chế độ nuôi page) · luồng Quảng cáo bước 3 khi thư viện không có khung chuyển được (chế độ thư viện) · sếp giao lẻ |
| Nhận | **Tệp video** (không bóc từ link hay ảnh chụp, gói §6) · mục đích: thư viện / nuôi page · sản phẩm nếu brief có |
| Giao | Thư viện: `khung/reel-NN-<hãng>-<đặc điểm>.md` (gói §7). Nuôi page: `NN-sxh-boc.md` trong thư mục lần chạy · phiếu giao |
| Xong khi | Mọi điểm cắt ✅/✗ · mọi dòng âm có nguồn · có giây cú bật · bảng kiểm gói §5 đủ (thư viện) · phiếu đủ ô |

## Luật bắt buộc
1. **Nếu có chỗ nghi là cắt** — máy báo ở ngưỡng 0,3 hay 0,15, máy gắn cờ ⚠ "đèn", **điểm cảnh 0,08–0,15** (dưới ngưỡng),
   hoặc mắt thấy đổi góc/nhảy vật trên lưới → cắt khung dày ±0,5 s quanh đó (lệnh dưới) và xem **từng khung**.
   Ghi vào "Bảng điểm cắt đã soi": khung trước, khung sau, ✅ thật / ✗ giả + lý do. Cờ "đèn" **không** tự là ✗.
2. **Nếu ghi một dòng âm thanh** → ô "Nguồn" phải là **đo** (`ebur128` / `silencedetect` / phổ, ghi số dB) · **whisper** · **nghe** (tệp, giây).
   "Im", "câm", "gần như câm" chỉ ghi khi `silencedetect` xác nhận **cả đoạn**. Không đo được → "suy từ hình ⬜", không làm căn cứ LÕI.
3. **Nếu sắp tả một cảnh, chữ, sticker hay đồ vật** → đã mở lưới/khung dày **đúng giây đó**; ô "Xem ở" ghi tên ảnh.
   Lớp chữ quét **suốt video, cả bốn góc**: sticker bình luận, ID, watermark, giá. Không thấy trong ảnh thì không tả.
4. **Nếu bỏ một yếu tố đi thì mất cú hook, cú bật hoặc lời hứa** → LÕI, ghi "bỏ nó thì mất gì". Lo pháp lý/kỹ thuật
   (biển hãng, logo, sai sự thật với shop) → câu hỏi cho sếp, **không** thay ở tầng 3 (gói §2 ý 4, §9 khung 01).
5. **Nếu chưa có bằng chứng nhìn thấy được** cho "AI hay quay thật", loài, cân nặng, tên bài nhạc → "⚠ nghiêng về X ~N %" + cần gì để chắc (gói §2 ý 3, §3.7).

## Bước
1. Đọc nền: sổ tay §0–0f, 2, 4, 5b, 7 · gói §10 (gói §4 bước 0). Kiểm điều kiện đủ (gói §6).
2. `gvv boc <tệp>` → `do.json`, `luoi-NN.jpg`, `khung-nhap.md` (gói §4 bước 3). Ghi **nội dung thật 0–X s**.
3. Liệt kê chỗ nghi (luật 1), soi khung dày, lập bảng điểm cắt. Mốc cú bật đèn = **điểm giữa đoạn tăng sáng** (gói §3.9).
4. Đo âm (luật 2): `ebur128` theo 0,1 s cho cả video, `silencedetect` cho mọi đoạn định ghi "im", whisper cho lời.
5. Quét lớp chữ/sticker/logo theo trục thời gian (luật 3) → bảng "Cần che".
6. **Nuôi page:** điền khuôn rút gọn, có lời gốc hay không, rồi sang bước 9.
7. **Thư viện:** (a) → phân tích B–G → (b) LÕI/Phụ → tách HOOK|THÂN, so thư viện → nguyên liệu + tầng 3 → (c) nếu brief có
   sản phẩm (gói §4 bước 5–10). Không viết prompt.
8. Tự soát bảng kiểm gói §5, lưu `khung/` (gói §4 bước 11).
9. Phiếu giao + 5 dòng bàn giao (gói §11).

**Lệnh đo** (ffmpeg, chạy trên `goc.mp4`):
```
ffmpeg -i goc.mp4 -vf "select='gt(scene,0.08)',metadata=print" -an -f null -       # điểm cảnh dưới ngưỡng máy
ffmpeg -ss <a> -t 1 -i goc.mp4 -vf "fps=10,scale=360:-1,tile=5x2" soi-<a>.jpg      # khung dày quanh giây a
ffmpeg -i goc.mp4 -af ebur128 -f null -                                            # độ to mỗi 0,1 s (cột M)
ffmpeg -i goc.mp4 -af silencedetect=n=-45dB:d=0.2 -f null -                        # đoạn im thật
ffmpeg -i goc.mp4 -lavfi showspectrumpic=s=1200x400 pho.png                         # phổ: tiếng ngắn, SFX
```

## Khuôn đầu ra
Thư viện: khuôn gói §7, **bắt buộc** thêm bảng điểm cắt. Nuôi page: khuôn rút gọn.
```
## Bảng điểm cắt đã soi     | Giây | Máy (điểm cảnh · ngưỡng · cờ) | Xem ở (ảnh) | Trước → sau | ✅/✗ + lý do |
## Theo giây (nuôi page)    | Giây | Hình | Cú bật? | Xem ở |        Cú bật: <giây> — <thứ gì> — đo bằng: <sáng / mắt>
## Âm thanh                 | Giây | Âm (giọng / nhạc / SFX / im) | Số đo (dB, LUFS) | Nguồn: đo / whisper / nghe / suy từ hình ⬜ |
## Cần che                  | Giây xuất hiện–mất | Thứ (chữ / sticker / ID / logo / người) | Vị trí | Xem ở |
Lời gốc: có (ngôn ngữ, đã bóc whisper) | không  ·  Nguồn video: <nền tảng / ID>
```

## Thành công khi
- Không điểm cắt nào chưa soi; người dựng cắt theo bảng mà không phải xem lại video.
- Mọi câu về âm thanh kiểm lại được bằng một lệnh.
- Thợ dựng che hết chữ/logo theo bảng "Cần che".

## Thất bại khi
- Tin máy: máy bỏ sót cắt 2,23 s (điểm cảnh 0,134, dưới ngưỡng 0,15). Bài có gói bắt được nhờ soi khung quanh mọi chỗ nghi (thi 11/11).
- Gạch bỏ điểm máy gắn cờ "đèn" mà không soi — ở thi 11/11 cả 2 điểm như vậy đều là cắt thật.
- Ghi cảnh cuối "gần như câm" trong khi có cụm −16 dB ở 15,28–15,71 s (thi 11/11, bài có gói) → âm phải đo.
- Sót ô sticker bình luận nhỏ ở góc suốt video; tả chi tiết không có trong hình (thi 11/11, đối chứng).
- Thay yếu tố LÕI ở tầng 3 (khung 01 bản đầu, gói §9).

## Bộ thi
`sxh-boc-khung.thi/` ⬜ chưa lập thư mục. Đề 11/11 (gói thắng 17–12) dùng làm đề hồi quy.
