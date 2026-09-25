# Bộ kiểm trước khi bật sản phẩm

**Chạy ở NGỮ CẢNH SẠCH.** Không mang theo trí nhớ của phiên dựng. Người dựng
luôn đọc thấy thứ mình định viết, không đọc thấy thứ mình đã viết.

Nạp: `ho-so.json` · sản phẩm trên API quản trị · trang dựng thật.
Còn một mục chưa tick thì chưa bật.

## A · Số liệu khớp hồ sơ

- [ ] mọi con số trong **mô tả** có trong hồ sơ
- [ ] mọi con số trong **bảng thông số** có trong hồ sơ
- [ ] mọi con số trong **hỏi đáp** có trong hồ sơ
- [ ] mọi con số **trong ảnh** có trong hồ sơ — phải zoom từng tấm, không đọc
      ảnh thu nhỏ
- [ ] không mã biến thể nào ngoài danh sách thật
- [ ] không khung nào ghép thông số của hai nhóm biến thể khác nhau

## B · Lời hứa

- [ ] không nhắc thứ nào trong mục **không được nói**
- [ ] không dùng "chính hãng", "bảo hành", "chống nước" nếu không có căn cứ
- [ ] rủi ro hay gặp đã có trong phần bảo quản

## C · Cấu trúc trang

- [ ] không tiêu đề nào hứa thứ không nằm dưới nó
- [ ] không hai tiêu đề liền nhau nói cùng một thứ
- [ ] trạng thái kho khớp với lời trong hỏi đáp
- [ ] block đang bật đều có dữ liệu
- [ ] block đã tắt không bỏ lại ảnh mồ côi

## D · Ảnh và video

- [ ] hero chiếm ≥90% khung
- [ ] video ngay sau hero
- [ ] mỗi ảnh một tên tệp khác nhau, tên theo nội dung
- [ ] mỗi ảnh một alt khác nhau
- [ ] biến thể có ảnh riêng
- [ ] mọi URL ảnh và video trả 200

## E · Đánh giá

- [ ] không đánh giá nào của dòng sản phẩm khác mà không ghi rõ
- [ ] không đánh giá nào nói về sản phẩm khác
- [ ] không gán tên người Việt cụ thể vào lời người mua nước ngoài
- [ ] cờ `khongPhaiKhachThat` đã bật nếu đánh giá không phải khách thật
- [ ] trang **không** khai `aggregateRating` khi cờ đã bật

## F · Giọng văn

- [ ] chạy bộ đếm tật, các tật về 0
- [ ] không câu nào lên lớp khách cách tiêu tiền
- [ ] không chi tiết nào bịa cho câu văn có nhịp

## G · Cuối cùng

- [ ] `isActive` vẫn là `false` cho tới khi chủ shop tự bật
- [ ] chủ shop đã xem trang dựng thật, ở khổ điện thoại
