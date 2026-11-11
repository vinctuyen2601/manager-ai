# Biên kịch · kịch-bản-QC

Viết kịch bản **Tạo mới** cho một sản phẩm: thân theo giây + 3 biến thể hook. Dùng cho reel tự đăng lẫn quảng cáo.
Kiến thức: `../vai/bien-kich.md`. Tệp này chỉ giữ thứ tự làm và luật bắt buộc.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Luồng Quảng cáo, sau brief của Trưởng phòng. Hoặc Trưởng phòng giao lẻ |
| Nhận | Phiếu brief (thị trường, kênh, bản reel/quảng cáo, thời lượng) · hồ sơ sản phẩm (hoặc trang sản phẩm nếu chưa có hồ sơ) · khung có nhịp và giây cú bật |
| Giao | `KICH-BAN.md` theo khuôn gói §7 (thân + biến thể hook) · phiếu giao (`../../quy-che/khuon/phieu-giao.md`) |
| Xong khi | Bảng kiểm gói §5 đủ ô · số đo đạt mốc · **cú lộ có hình và lời cụ thể** · phiếu giao đủ ô |

## Luật bắt buộc
1. **Nếu tên sản phẩm trong brief không khớp tên trên hồ sơ/trang** → phiếu giao mở bằng "Ý sếp là <tên gần nhất>?",
   viết kịch bản cho món gần nhất (đánh dấu ⚠). Tên trong brief **không xuất hiện** ở chữ trên hình, lời, mồi bình luận, thẻ cuối.
   Không có món nào gần → `trang_thai: chan`, không viết.
2. **Nếu thiếu sự thật cho cú lộ** → vẫn viết cú lộ bằng **thứ nhìn thấy được** trong video/ảnh thật của trang
   (sản phẩm làm việc của nó) + lời cảm xúc chủ quan. Chỉ câu khẳng định đo được mới để `[CẦN: <dòng hồ sơ>]`.
   Cú lộ không bao giờ để trống — kịch bản không quay được là việc chưa xong.
3. **Nếu một chữ nào là giá, giá gạch, % giảm, ưu đãi, khan hiếm** → xoá khỏi lời, chữ, CTA và hook (gói §2.2–2.3),
   kể cả khi trang có ghi. Giá nằm ở trang sản phẩm.
4. **Nếu câu là sự thật kiểm được** (phép kiểm một câu, gói §3.5) → ô "Sự thật dựa vào" phải trỏ dòng hồ sơ/trang.
   Trang ghi công dụng sức khoẻ, an toàn, "clinically", số liệu → coi là claim cần chứng minh, không chép chỉ vì trang có.
5. **Nếu sản phẩm chưa có số đo hook nào** → 3 hook **khác dạng** (lô khám phá). **Nếu đã có hook thắng** → biến thể đổi **một trục** (gói §3.8).

## Bước
1. Đọc phiếu brief. Thiếu thị trường đích → hỏi (gói §6). Đối chiếu tên sản phẩm (luật 1).
2. Chép **bảng sự thật được nói** và **danh sách cấm** từ hồ sơ (gói §4 bước 2). Chưa có hồ sơ → lấy từ trang, ghi rõ dòng.
3. Lưới giây từ khung: giây hook · giây cú lộ · giây CTA (gói §4 bước 3).
4. **Viết cú lộ trước**, rồi thân, rồi CTA. Hook viết sau cùng — hook phải hứa đúng thứ cú lộ trả.
5. Đo độ dài (gói §3.4). Không đạt → sửa bước 4.
6. Viết 3 hook theo luật 5. Mỗi hook điền đủ cột "Tiền đề hook hứa gì" và "Cầu nối 3–15 s" (gói §7, khuôn biến thể).
   Loại hook trong danh sách hook chết (sổ tay §4) và hook mòn ("person who has everything", "perfect gift").
7. Tự soát: gói §5 + **quét chữ** trên toàn kịch bản (cho tới khi có `do-loi.py`):
   `$` `~~` `%` `off` `sale` `deal` `only` `left` `#1` `best` `nhất` `giảm` `freeship` + **tên trong brief nếu luật 1 đã kích hoạt**.
   Mỗi chỗ trúng: sửa hoặc ghi lý do giữ.
8. Viết phiếu giao. Ô "Cần sếp" lời thường, tối đa 3 câu, mỗi câu có mặc định.

## Khuôn đầu ra
Khuôn kịch bản và khuôn biến thể hook: gói **§7** (không chép lại ở đây). Thêm hai ô bắt buộc đầu tệp:
```
Tên sản phẩm dùng: <tên trên trang>  ·  Khớp brief: có | không → "Ý sếp là …?" ở phiếu giao
Cú lộ: <giây> — Hình: <thứ nhìn thấy> — Lời/chữ: <…>
```

## Thành công khi
- Quay được ngay: mọi giây có hình cụ thể, cú lộ có thật.
- Không câu khẳng định nào thiếu nguồn; không giá, không khan hiếm.
- Sếp đọc phiếu giao trong 1 phút biết cần trả lời gì.

## Thất bại khi
- Tên sản phẩm không tồn tại vẫn nằm trên thẻ cuối / mồi bình luận (thi 11/11).
- Cú lộ ghi "dựng khi có trang" → bản giao không quay được (thi 11/11).
- Giá gạch trong CTA, hook dựa vào giá (thi 11/11, bài đối chứng).
- Kịch bản dày mã nội bộ, ô "Cần sếp" phải đọc gói mới hiểu (thi 11/11).
- Cú lộ muộn (6,5 s trong 15 s) và đoạn giữa hook với cú lộ chỉ có một dòng chữ đứng yên (thi lại 11/11). Hook ≤ 1,5 s thì
  mỗi 2–3 s sau đó phải có một lý do ở lại (sổ tay §0b).
- 3 hook dùng chung một hình → chỉ khác chữ, chưa phải "khác dạng" (thi lại 11/11). Lô khám phá: mỗi hook đổi cả **hình mở** hoặc **âm mở**.

## Bộ thi
`bk-kich-ban-qc.thi/`
