# Săn xu hướng · đào-bình-luận

Đọc bình luận dưới video (của shop hoặc video ngành) để lấy **chữ khách thật**: họ hỏi gì, chê gì, sợ gì, muốn mua gì.
Đầu ra nuôi gói ngành (`../../thu-vien/nganh/<ngành>/ngon-ngu-khach.md`) và phản đối cho Biên kịch.
Sếp chốt 11/11 tối: tệp việc riêng. Phương pháp học từ ScrapeCreators `skills/comment-mining` (MIT),
ghi chép ở `../../thu-vien/nghien-cuu/2026-11-11-repo-video-trend/01-scrapecreators-skills.md`. **Không dùng API trả phí.**

## Hợp đồng
| | |
|---|---|
| Khi chạy | Sếp gửi bình luận (chép hoặc ảnh chụp). Hoặc Trưởng phòng giao khi cần chữ khách cho một sản phẩm |
| Nhận | Phiếu: ngành · sản phẩm/chủ đề · **bình luận sếp gửi** (mỗi lô ghi video gốc: nền tảng, ID, ngày chụp) |
| Giao | `NN-sxh-binh-luan.md` trong thư mục lần chạy theo khuôn dưới · đề xuất dòng thêm vào `ngon-ngu-khach.md` (Trưởng phòng duyệt mới ghi) · phiếu giao (`../../quy-che/khuon/phieu-giao.md`) |
| Xong khi | Mỗi cụm có rổ, tần suất, cường độ và ≥ 1 trích nguyên văn · có dòng "lặp ở mấy video" · phiếu đủ ô |

## Luật bắt buộc
1. **Nếu không có bình luận sếp gửi** → `trang_thai: chan`. Không tự lên TikTok/Facebook đọc (chặn máy, đòi đăng nhập), không lách.
2. **Nếu chép lại một bình luận** → giữ **nguyên văn**, kể cả tiếng lóng, viết tắt, không dấu, sai chính tả. Bỏ tên và ảnh đại diện người bình luận.
3. **Nếu một ý chỉ có ở một video** → ghi "một video", không gọi là mô thức. Mô thức cần lặp ở **≥ 2 video khác kênh**.
4. **Nếu bình luận đến từ kênh của chính shop hoặc kênh bán hàng** → ghi rõ: kênh có thể đã xoá hoặc ẩn bình luận xấu (thiên lệch kiểm duyệt).
5. **Nếu bình luận khen/chê thông số** (pin, chống nước, độ nhạy…) → chỉ là lời khách, không thành sự thật sản phẩm. Muốn đưa vào lời ra ngoài thì qua Chuyên viên SP (`../../quy-che/LUAT-CHUNG.md`).

## Bước
1. Đọc phiếu. Không có bình luận → luật 1.
2. Làm sạch nhẹ: bỏ spam, bỏ trùng, bỏ tag bạn bè trơn. Giữ chữ khách (luật 2).
3. Xếp từng bình luận vào **9 rổ**: câu hỏi · phản đối · đau/phàn nàn · khen · bối rối · xin tính năng · muốn mua · tranh cãi · đùa/meme.
4. Gom thành cụm chủ đề. Chấm **tần suất** (số bình luận) và **cường độ** (1–3: nhắc qua · nói rõ · bức xúc/hỏi dồn).
5. Đếm cụm lặp ở mấy video, mấy kênh (luật 3, 4).
6. Rút ra: chữ khách dùng được cho hook/chữ trên hình · phản đối Biên kịch phải trả lời · câu hỏi Chuyên viên SP cần câu trả lời ✅.
7. Phiếu giao.

## Khuôn đầu ra
```
Ngành: …  ·  Chủ đề: …  ·  Số video: N (kênh: …)  ·  Số bình luận sau làm sạch: M  ·  Ngày chụp: …
| Cụm | Rổ | Tần suất | Cường độ 1–3 | Lặp ở (video · kênh) | Trích nguyên văn (≥ 1) |
Chữ khách đề xuất thêm vào ngon-ngu-khach.md: | chữ | nghĩa | nguồn (video, ngày) |
Phản đối cho Biên kịch: …  ·  Câu hỏi cần SP trả lời: …
```

## Thành công khi
- Biên kịch viết được hook bằng đúng chữ khách, trả lời được phản đối có thật.
- `ngon-ngu-khach.md` có thêm chữ từ bình luận, mục "Tin nhắn/bình luận thật" không còn trống.

## Thất bại khi
- Sửa chữ khách cho "chuẩn"; gọi một bình luận ồn là xu hướng; coi lời khen pin của khách là thông số.

## Bộ thi
`sxh-dao-binh-luan.thi/` ⬜ chưa có. Đề gợi ý: 40 bình luận của 3 video, có 1 bình luận ồn lặp từ một người, 1 câu không dấu
mang nghĩa khác khi thêm dấu (mồi/mới), 1 lời khen thông số sai với hồ sơ.
