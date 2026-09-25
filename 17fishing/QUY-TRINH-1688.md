# Quy trình clone sản phẩm về 17fishing

Sáu bước, theo đúng trình tự đã chạy thật lần đầu (máy câu AS dòng HA,
24–25/09/2026). Mọi bẫy ghi ở đây đều đã trả giá.

Bước 1 phụ thuộc nguồn hàng. Năm bước còn lại dùng chung cho mọi nguồn.

---

## Bước 1 · Yêu cầu tài liệu cần để clone

**Trợ lý nói rõ cần gì, chủ shop lấy về.** Đây là khâu duy nhất chủ shop phải
tự tay làm, vì cần đăng nhập.

Cần đúng hai thứ, dạng **mã HTML của phần tử**, không phải ảnh chụp:

| Cần | Lấy ở đâu |
|---|---|
| Khối **thông tin sản phẩm** | phần tử bao cả giá, biến thể, thuộc tính, thư viện ảnh |
| Khối **đánh giá** | bấm "xem tất cả đánh giá", cuộn hết, rồi lấy phần tử danh sách |

Cách lấy: chuột phải vào vùng đó → Inspect → chuột phải node cha → Copy →
Copy outerHTML → dán vào chat.

Hoặc dán `trich-1688.js` vào Console, nó tự gom thành JSON.

**Bẫy ở bước này:**

- **Đánh giá KHÔNG nằm trong trang lưu.** Phải bấm nút mở danh sách trước.
  Lưu trang bằng Ctrl+S mà chưa bấm thì chỉ được đúng một đánh giá.
- **Ảnh mô tả cũng không nằm trong trang.** Chúng ở
  `itemcdn.tmall.com/1688offer/<mã trong detailUrl>`. Bảng thông số kỹ thuật
  thật nằm trong bộ ảnh này.
- **Khối JSON lặp ba lần** trong HTML. Không khử trùng lặp thì 9 biến thể đọc
  ra thành 27.

---

## Bước 2 · Extract thông tin, ảnh, video và dịch mô tả

Máy làm trọn. Ra được:

- mã sản phẩm, tên gốc, tên xưởng
- danh sách biến thể: tên, giá gốc, tồn kho
- bảng thuộc tính
- ảnh thư viện, ảnh mô tả, video
- đánh giá: người mua, số sao, ngày, cỡ đã mua, nội dung, ảnh kèm

**Thông số kỹ thuật nằm TRONG ẢNH, phải đọc bằng mắt.** Không grep được. Tìm
tấm có chữ 产品参数 hoặc bảng kẻ ô.

**Bẫy ở bước này — tất cả đã dính:**

| Bẫy | Hậu quả |
|---|---|
| Ảnh đánh giá là **mẫu khác** | Suýt đăng ảnh máy xanh ngọc cho máy đồng cổ |
| Đánh giá gộp theo **gian hàng** | 6/8 đánh giá là dòng cũ, cách 6–7 năm |
| "6000+ đánh giá" | Chỉ ~300 có chữ, 8 có ảnh. Còn lại là chấm sao câm |
| Bảng cân nặng đóng gói | Điền cho có: cả 9 cỡ ghi 350g, thật là 285–697g |
| Ảnh "mới" trong mô tả | Phần lớn là banner bán chéo mẫu khác |
| Video | CDN chặn tải từ ngoài. Chủ shop phải "Save video as" |

---

## Bước 3 · Chuẩn hoá theo cách viết của người Việt

Không phải dịch. Là **viết lại**.

- **Tên sản phẩm**: dịch máy luôn sai. "bánh xe quay" là máy câu. "tàu câu
  kiểu quay" là máy câu spinning.
- **Từ vựng phải theo shop, không theo từ điển.** Đếm từ đồng nghĩa trong
  hàng đang bán rồi mới viết. Shop dùng "vòng bi", tôi viết "bạc đạn", chủ shop
  phải hỏi lại.
- **Giọng văn**: câu ngắn, chấm thay vì gạch ngang, nói việc câu cá chứ không
  bình luận về sản phẩm. Chạy bộ đếm tật trước khi lưu, xem
  `GIONG-TRANG-SAN-PHAM.md`.

**Dựng BẢNG SỰ THẬT ở đây.** Một bảng chốt mọi con số, cộng ba dòng
**không được nói**:

- thứ nhà sản xuất không công bố (chống nước mặn → không nhận câu biển)
- thứ ảnh không kiểm được (lớp phủ là phủ hay màu xuyên thân)
- mã/cỡ không tồn tại trong dòng

Bảng này là đầu vào của bước 4 và bước 6. Không có nó thì mỗi khâu chế ra một
phiên bản thông số riêng, và đó là thứ ngốn thời gian nhất lần đầu.

---

## Bước 4 · Dùng API quản trị tạo bản nháp, đủ các block

Luôn tạo ở `isActive: false`. Bật là quyết định của chủ shop.

Thứ tự bắt buộc, khâu sau phụ thuộc khâu trước:

1. Tải ảnh **kèm tên SEO** — hộp thoại trong CMS gợi ý sẵn
2. `POST /admin/products` với `templateId`, `blockOrder`, `blockData`
3. Biến thể: tên, giá, **ảnh riêng theo nhóm cỡ**
4. Nội dung từng block, lấy từ Bảng sự thật

**Block phải khớp nhau.** Kiểm ba thứ hay lệch:

- tiêu đề hứa thứ không nằm dưới nó ("Bảng thông số" mà không có bảng)
- `stockStatus` nói ngược với hỏi đáp
- block bật mà rỗng, hoặc block tắt bỏ lại ảnh mồ côi

`diem-manh-bento` đọc dữ liệu ở khoá `diem-manh`. Các block cùng nhóm dùng
chung một khoá, xem `nhom` trong registry của backend.

---

## Bước 5 · Tạo đánh giá dựa trên đánh giá đã có

**Được phép:** dịch đánh giá thật, giữ mã ẩn danh của người mua, ghi nguồn
một lần ở tiêu đề khối.

**Không được phép:** gắn tên người Việt cụ thể vào lời người mua nước ngoài.
Đó là bịa lời chứng thực, và là luật chủ shop tự đặt trong `CLAUDE.md`.

**Chọn lọc, không lấy hết.** Từ 10 đánh giá lấy 6. Bỏ:

- cái khen tràn không có chi tiết nào ("sao đồ nhà bạn tốt thế")
- cái **viết về sản phẩm khác** (có người khen cần câu trong đánh giá máy câu)
- cái chỉ nói vận chuyển và đóng gói của người bán bên kia

**Giữ cái chê.** Một cái 1 sao trong bộ bảy làm cả bộ đáng tin hơn, và nó là
đánh giá hữu ích nhất cho người mua.

**Bắt buộc bật cờ** `blockData['danh-gia'].khongPhaiKhachThat = true`. Không
bật là khai sao giả cho Google, mức phạt gỡ ngôi sao của **cả website**.

---

## Bước 6 · Tạo prompt cho Stitch

Stitch cần ba thứ: **ảnh sản phẩm gốc**, **thông tin sản phẩm**, và **prompt**.

Chi tiết ở `PROMPT-STITCH.md`. Hai điều cốt lõi:

1. **Khối sự thật dán nguyên văn lên đầu mọi prompt.** Stitch chế ra thông số
   nghe rất hợp lý. Đợt đầu nó ghi `HA5000`, `HA6000` (không tồn tại),
   `HA12000 cối nông` (thật là cối sâu), `5.1:1` cạnh `hãm 15kg` (hai thông số
   không đi cùng nhau), và `đánh biển` (trái với hỏi đáp cùng trang).
2. **Prompt phải chứa hiểu biết về thiết kế đồ câu**, không chỉ thông số. Lớp
   chữ sai cách biến ảnh chuyên nghiệp thành biển quảng cáo chợ đêm.

---

## Kiểm trước khi bật

- [ ] mọi số trong ảnh, mô tả, hỏi đáp, bảng thông số **khớp Bảng sự thật**
- [ ] không có mã cỡ nào ngoài danh sách thật
- [ ] không tiêu đề nào hứa thứ không nằm dưới nó
- [ ] `stockStatus` khớp lời trong hỏi đáp
- [ ] block bật đều có dữ liệu, block tắt không bỏ lại ảnh mồ côi
- [ ] hero ≥90% khung, video ngay sau hero
- [ ] tên tệp mỗi ảnh một khác
- [ ] cờ `khongPhaiKhachThat` đã bật
- [ ] mọi URL ảnh trả 200

---

## Thời gian thật

Sản phẩm đầu: cả một buổi dài, phần lớn là gỡ bẫy và làm lại.
Từ sản phẩm thứ hai, theo quy trình này: khoảng **2 giờ**, chủ shop mất ~40
phút (lấy tài liệu, chạy Stitch, duyệt).
