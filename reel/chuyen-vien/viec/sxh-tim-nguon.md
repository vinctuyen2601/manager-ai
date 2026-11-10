# Săn xu hướng · tìm-nguồn

Lọc video có sẵn (Douyin, TikTok, Reels…) làm **nguồn nuôi page**: video nào dùng được, video nào loại, vì sao.
**Mặc định sếp gửi link.** Tự đi tìm và tự tải (`yt-dlp`) **chưa được duyệt** (gói §12 câu 2, `luong/README.md` câu 5).
Kiến thức: `../san-xu-huong.md` §3.3 (lọc viral), §3.6 (pháp lý), §6 (điều kiện đủ). Tệp này chỉ giữ thứ tự và luật.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Luồng Nuôi page bước 1. Hoặc Trưởng phòng giao lẻ |
| Nhận | Phiếu: chủ đề page · thị trường · số video cần · **danh sách link sếp gửi** · tệp video sếp đã tải (nếu có) |
| Giao | `NN-sxh-nguon.md` trong thư mục lần chạy (`luong/README.md` mục 4) theo khuôn dưới · phiếu giao (`_phieu-giao.md`) |
| Xong khi | Mỗi link có một dòng kết luận **dùng / chờ / loại** kèm lý do · ô "Nguồn" và "Cần che sơ bộ" không trống · phiếu đủ ô |

## Luật bắt buộc
1. **Nếu chỉ có link, chưa có tệp video** → không tự tải, không xem qua bản quay màn hình. Ô "Tệp" = ⬜, kết luận = **chờ**,
   xin sếp tải bằng câu mẫu gói §6 (bản gốc, đặt vào `thu-nghiem/nguon/<lô>/NN-goc.mp4`). Không kết luận "dùng" khi chưa xem tệp.
2. **Nếu không ghi được nguồn** (nền tảng + ID/tài khoản gốc, lấy từ link hoặc **chữ ID trên hình**) → ô "Nguồn" = ⬜,
   kết luận tối đa là **chờ**. Video không ghi được nguồn không vào lô (Biên kịch cần dòng `Nguồn:` cho caption).
3. **Nếu video trượt một điều của bộ lọc nguồn** (`luong/nuoi-page.md`, dưới bảng) → **loại**, ghi điều trượt kèm giây.
   Người nổi tiếng hoặc logo hãng là **nhân vật chính**, hay chữ nước ngoài chiếm gần hết khung suốt video = không che được → loại, không "che cho qua".
4. **Nếu ghi "Cần che sơ bộ"** → đã mở **từng lưới khung** của cả video (gói §4 bước 3), kể cả góc nhỏ: sticker bình luận, ID,
   watermark nền tảng, giá. Mỗi thứ ghi giây xuất hiện–mất và vị trí. Chưa xem hết lưới thì ô này ghi ⬜, không ghi "không có".
5. **Nếu video có nhạc có lời, bài nổi tiếng, hoặc là quảng cáo của hãng khác** → ghi vào cột "Rủi ro" (gói §3.6).
   Nhạc thay được ở khâu dựng nên **không tự loại vì nhạc**; quảng cáo của hãng khác thì loại (bộ lọc nguồn).

## Bước
1. Đọc phiếu. Thiếu chủ đề page hoặc thị trường → `trang_thai: chan`, hỏi sếp (luồng Nuôi page "Chờ sếp").
2. Mỗi link: ghi nền tảng, ID video, tài khoản gốc nếu đọc được từ link (luật 2). Chưa có tệp → luật 1, sang link kế.
3. Có tệp: `gvv boc <tệp>` (gói §4 bước 3) để có thời lượng, **nội dung thật 0–X s**, lưới 4 khung/giây, lời gốc.
4. Xem từng lưới: tìm **giây cú bật** (cá lên, đớp mồi, kết quả hiện…) và mọi chữ/logo/sticker/ID (luật 4).
5. Chạy bộ lọc nguồn từng điều (luật 3). Ghi rủi ro (luật 5).
6. *(Tuỳ chọn, có số liệu)* Lọc outlier: ≥ 700.000 view **và** ≥ 5× follower (sổ tay §5). Không có số → ghi ⬜, không chặn.
7. Kết luận dùng / chờ / loại. Đủ số video cần chưa? Thiếu → ô "Cần sếp" xin thêm link.
8. Phiếu giao. Dòng "dùng" là đầu vào của `sxh-boc-khung` (chế độ nuôi page).

## Khuôn đầu ra
```
Chủ đề page: …  ·  Thị trường: …  ·  Cần: N video  ·  Đạt "dùng": M  ·  Ngày lọc: …
| # | Link | Nguồn (nền tảng · ID/tài khoản · lấy từ đâu) | Tệp (đường dẫn | ⬜) | Nội dung thật | Cú bật (giây · thứ gì) |
| Bộ lọc 5 điều (✅/✗ từng điều) | Cần che sơ bộ (giây · thứ · vị trí | ⬜ chưa xem hết lưới) | Rủi ro (nhạc · người · hãng) | Kết luận + lý do |
```
Ô trống = chưa xong. Không có gì thì ghi `—`.

## Thành công khi
- Biên kịch và Thợ dựng nhận dòng "dùng" là làm được, không phải mở lại link để tìm nguồn hay tìm chỗ che.
- Sếp đọc phiếu biết ngay cần tải thêm link nào, quyết rủi ro nhạc của lô nào.

## Thất bại khi
- Ghi "không có chữ cần che" khi chưa xem hết lưới; sót sticker bình luận nhỏ ở góc suốt video (thi 11/11, bài đối chứng — bài bóc khung).
- Chọn video chỉ vì tỉ lệ like đẹp (gói §3.3: like cao view thấp = chỉ tới fan cũ).
- Tự tải bằng công cụ chưa duyệt, hoặc kết luận "dùng" từ ảnh bìa.

## Bộ thi
`sxh-tim-nguon.thi/` ⬜ chưa có. Đề gợi ý: 4 link, 1 link không có ID gốc, 1 video có logo hãng làm nhân vật chính,
1 video có sticker nhỏ ở góc suốt video, 1 video chưa có tệp.
