# Biên kịch · lời-bản-địa

Viết lời mới (lồng tiếng + chữ trên hình + câu kết) cho **video có sẵn** (Douyin, nhà cung cấp…) theo thị trường đích.
Bản địa hoá không phải dịch. Kiến thức: `../vai/bien-kich.md` §3.6–3.7, §4 bước 4–7.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Luồng Nuôi page (sau khi Săn xu hướng chọn nguồn) · luồng Quảng cáo hướng Lai |
| Nhận | Video gốc (hoặc mô tả theo giây) · JSON lời gốc nếu có · **mục đích**: nuôi page hay bán hàng · thị trường · hồ sơ sản phẩm (chỉ khi bán hàng) |
| Giao | Lời theo giây + chữ trên hình + caption · danh sách thứ cần che cho Thợ dựng · phiếu giao |
| Xong khi | Số đo đạt mốc · ô "Ngôi kể" và "Nguồn" đã điền · phiếu giao đủ ô |

## Luật bắt buộc
0. **Nếu là reup / bản địa hoá** (sếp chốt 12/11: "reup thì chỉ trích xuất text → biến thành giọng văn phù hợp người Việt, chứ không phải tự nghĩ")
   → nguồn ý **chỉ** gồm: lời gốc đã phiên âm (whisper, có giây) · chữ trên hình gốc (poster, phụ đề, nhãn — đọc từ lưới, ghi giây) ·
   caption/hashtag gốc. Lập bảng **"Chữ gốc → Việt"** (nguyên văn · nghĩa · câu Việt) rồi mới viết lời. **Không thêm ý không có trong nguồn**
   (không lấy thêm từ trang sản phẩm); chỉ được **bỏ** ý sai sự thật với hàng của shop, ý cấm (giá, khan hiếm, tên hãng), ý B2B. Nguồn quá ít
   (chỉ nhạc, 1–2 dòng chữ) → lời ngắn đúng bằng chừng đó, phần còn lại để hình + nhạc; không độn. Không có chữ lẫn lời → viết theo đúng thứ đang hiện trên hình.
1. **Nếu mục đích = nuôi page** (video không phải của mình) → kể ở **ngôi người xem/bình luận viên** ("ông anh này", "con cá này"),
   không ngôi người câu ("mình câu", "về nhà vợ hỏi cá đâu"). Caption ghi `Nguồn: <nền tảng>/<tài khoản nếu biết>`.
   Câu kết = mời **thích/theo dõi page** + một mồi bình luận. Không "nhắn shop".
   **Nếu mục đích = bán hàng** → bộ giọng gói §3.6 hoặc §3.7 nguyên vẹn (VN: CTA nhắn tin nguyên văn).
2. **Nếu video gốc có tên hãng, chữ nước ngoài, logo, người giới thiệu** → không nhắc trong lời; liệt kê từng thứ kèm giây
   vào "Cần che" cho Thợ dựng.
3. **Nếu chi tiết chỉ ước bằng mắt** (cân nặng, kích thước, loài) **hoặc khó tin với dân trong nghề** (vd chép ăn lure) → nói dạng hỏi
   hoặc "cỡ", hoặc thành mồi bình luận ("anh em đoán mấy ký?"); không khẳng định; ghi vào "Suy ra ⚠".
4. **Nếu có cú bật** (cá lên, đèn sáng, kết quả hiện) → im 0,5–1 s quanh cú bật; chữ đổi thay lời (gói §10 "Lời đè cú bật").

## Bước
1. Điền ô đầu tệp: mục đích · thị trường · ngôi kể · nguồn (luật 1).
2. Lưới giây từ video: cảnh · cú bật · chỗ có chữ/logo cần che (luật 2).
3. *(Có lời gốc)* bóc ý, bỏ câu chữ (gói §4 bước 4).
4. Viết lời theo giây, chừa im ở cú bật. Viết chữ trên hình **chia việc** với lời, không chép lời (gói §3.8).
5. Đo (gói §3.4): âm tiết, tốc độ dự kiến 0,85–1,08×, ký tự/giây chữ.
6. Câu kết theo mục đích (luật 1). Ít nhất một câu vui — đúng ngôi kể.
7. Phiếu giao.

## Khuôn đầu ra
```
Mục đích: nuôi page | bán hàng  ·  Thị trường: …  ·  Ngôi kể: người xem | người bán  ·  Nguồn: …
## Số đo   (âm tiết · tốc độ dự kiến · chữ dài nhất / thời gian hiện)
## Theo giây  | Giây | Hình | Lời | Chữ trên hình | Ghi chú (im, cú bật) |
## Câu kết · Caption (có dòng Nguồn nếu nuôi page)
## Cần che (cho Thợ dựng)  | Giây | Thứ cần che | Vị trí |
```

## Thành công khi
- Người xem không thể hiểu nhầm page là người quay video.
- Đọc vừa thời lượng, có khoảng thở ở cú bật.
- Thợ dựng che được mọi chữ/logo mà không phải xem lại video để tìm.

## Thất bại khi
- "Về nhà vợ hỏi cá đâu" trong video nuôi page → thành nhận vơ (thi 11/11). Câu này hợp giọng **người bán**, không hợp reup.
- Không ghi nguồn video (thi 11/11).
- Khẳng định cân nặng ước bằng mắt như sự thật.

## Bộ thi
`bk-loi-ban-dia.thi/` (đề 2 của bài thi 11/11 dùng làm đề hồi quy).
