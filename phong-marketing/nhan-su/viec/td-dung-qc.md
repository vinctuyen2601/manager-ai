# Thợ dựng · dựng-QC

Dựng **video thân** cho luồng Quảng cáo từ clip đã đạt + kế hoạch cắt + bảng chữ: bản reel và bản quảng cáo (thêm thẻ kết).
Kiến thức: `../vai/tho-dung.md`. Tệp này chỉ giữ thứ tự làm và luật bắt buộc. Đo kỹ thuật là việc **sau**: `td-do-qc.md`.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Luồng Quảng cáo bước 10 (sau `dd.kiem-clip`). Hoặc Trưởng phòng giao lẻ |
| Nhận | Clip đã đạt (phiếu `dd.kiem-clip`) · kế hoạch cắt JSON (`gvv prompt` sinh, hoặc viết tay) · bảng chữ (`bk-chu-tren-hinh`) · thẻ kết: logo PNG nền trong + slogan · phiếu brief (kênh, nền tảng đăng) |
| Giao | Thư mục `<ra>`: `<ten>-reel.mp4` · `<ten>-quang-cao.mp4` · danh sách cắt `<ten>.json` · **tệp tái lập** (`dung.sh` + tệp lọc) · `DUNG.md` (khuôn dưới) · phiếu giao (`../../quy-che/khuon/phieu-giao.md`, `viec: td.dung-qc`) |
| Xong khi | Mọi ô `DUNG.md` đã điền · chạy lại `dung.sh` ra cùng `tong_giay` · đã chuyển sang `td-do-qc` |

## Luật bắt buộc
1. **Nếu dựng bằng `gvv dung`** → chỉ để cắt/nối (`chu: []`, không `the_ket`): bản hiện tại đặt chữ ở y 0,117H và 0,69H
   (cả hai nằm trong vùng UI che, gói §3.1), thẻ kết mặc định 1,3 s, chưa chuẩn âm. Chữ, thẻ kết, tiếng làm bằng ffmpeg sau.
   Ghi lựa chọn vào ô "Công cụ dựng".
2. **Nếu tiếng nền/nhạc nằm sẵn trên clip nguồn mà video cắt nhiều đoạn** → không nối tiếng theo đoạn. Đặt **một mạch tiếng liền**
   dưới cả video (đoạn tiếng gốc có cú vào nhạc khớp cú bật), tiếng từng đoạn bỏ. Ô "Tiếng · liền mạch" ghi nguồn và giây lấy.
3. **Nếu xuất bản quảng cáo** → thẻ kết phải có logo PNG, hiện ≥ max(2,3 s; ký tự slogan ÷ 20). Không có logo → chỉ xuất reel,
   phiếu giao ghi thiếu bản quảng cáo. Hiện từ đen (`fade=in` trên nền đen) đẻ khung đen → hiện từ khung cuối của thân hoặc bỏ fade.
4. **Nếu soát lưới nguồn thấy chữ, nhãn, sticker, logo in sẵn** (kể cả ở vùng UI che và sticker nền tảng ở góc) → ghi từng thứ
   vào bảng "In sẵn từ nguồn" kèm giây, vị trí, cách xử lý. Bảng không có dòng nào → ghi "đã soát lưới 4 khung/giây: không có".

## Bước
1. Kiểm đầu vào: đủ clip, đúng tên, đủ độ dài (gói §4 bước 1, §6). Thiếu → dừng, báo theo câu mẫu gói §6.
2. Đọc ý đồ: khung, kịch bản, giây cú bật (gói §4 bước 2).
3. `node src/cli.ts cat <ke-hoach-cat>.json` → danh sách cắt; soát cú bật bằng dải 10 khung (gói §4 bước 3–4).
   Còn ⚠ → không dựng tiếp, báo.
4. Soát lưới 4 khung/giây **mọi clip nguồn** trong đoạn sẽ dùng (`fps=4,scale=120:-1,tile=8x…`) → bảng "In sẵn từ nguồn" (luật 4).
5. Dựng hình (luật 1). Tốc độ ≤ 1,25× (gói §2 nguyên tắc 4).
6. Chèn chữ theo bảng chữ. Khối chữ nằm trọn trong dải an toàn (gói §3.1): khung 720×1280 → y 180–832 px, x 120–600 px;
   khung 1080×1920 → y 269–1248 px, x 180–900 px. Dòng dài hơn dải → rút chữ, trả lại Biên kịch nếu phải đổi ý.
7. Tiếng (luật 2; gói §4 bước 6): `loudnorm=I=-14:TP=-1.5:LRA=11` hai lượt, AAC 192k 48 kHz.
8. Thẻ kết (luật 3) → bản quảng cáo.
9. Ghi `dung.sh` + tệp lọc vào `<ra>`; xoá bản ra, chạy lại `dung.sh` từ đầu, so `tong_giay`.
10. Chuyển `td-do-qc`. Không tự báo số đo trong `DUNG.md` — số đo nằm ở bảng của `td-do-qc`.
11. Phiếu giao.

## Khuôn đầu ra (`<ra>/DUNG.md`)
```
Tên: …  ·  Khung: tổng … s, neo_luc … s  ·  Cỡ: 720×1280@30 | 1080×1920@30
Công cụ dựng: gvv dung (chỉ cắt/nối) | ffmpeg — lý do: …
Tái lập: <ra>/dung.sh + <ra>/<tệp lọc> + <ra>/<ten>.json — chạy lại ra tong_giay = … s
Tiếng · liền mạch: <nguồn> giây … → … | tiếng đoạn · nhạc: <bài, nguồn, nền tảng được phép> | không nhạc
Thẻ kết: logo <tệp> · slogan … ký tự · hiện … s ≥ mốc … s · hiện từ: khung cuối | không fade
## Đoạn   | # | Nguồn | Từ | Đến | Tốc độ | Vai trò nhịp |
## Chữ     | # | Từ (s) | Đến (s) | Chữ | y đầu–y cuối (px) | x trái–phải (px) | Trong dải an toàn |
## In sẵn từ nguồn   | Nguồn | Giây | Thứ (chữ/nhãn/sticker/logo) | Vị trí | Xử lý: che / để — lý do |
```

## Thành công khi
- Người khác chạy `dung.sh` ra đúng tệp, không cần hỏi.
- Không nhảy tiếng ở điểm cắt; nhạc vào đúng cú bật.
- Sếp biết hết chữ in sẵn còn sót trước khi xem video.

## Thất bại khi
- Giao "sh dung.sh" mà tệp không đi kèm → không tái lập được (thi 11/11, bài đối chứng).
- Chữ in sẵn "works very well" (vùng UI che) và sticker TikTok góc trên lọt vào bản giao, không ai báo (thi 11/11, cả hai bài).
- Thẻ kết hiện từ đen → 1 khung đen ở 7,700 s (thi 11/11).
- Thẻ kết 1,3 s cho slogan 45 ký tự (video 01, gói §3.3).
- Tiếng đoạn chênh ~13 dB giữa các đoạn vì nối tiếng theo đoạn (video 01, gói §9).

## Bộ thi
`td-dung-qc.thi/` — chưa lập. Đề hồi quy: bài thi 11/11 (có gói 18 / đối chứng 15), chấm chung với `td-do-qc`.
