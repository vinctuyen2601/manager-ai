# Nhịp làm việc — hằng ngày, hằng tuần, hằng tháng

Tài liệu này định nghĩa **việc lặp lại**, khác với việc phát sinh. Nó tồn tại
vì một lý do đo được: ngày 15/09/2026 phát hiện chỉ 10/88 URL của garutin.com
có trong chỉ mục Google, tình trạng đó kéo dài nhiều tháng mà không ai biết —
vì không có gì tự chạy khi không ai hỏi.

---

## Nguyên tắc nền

**Im lặng khi không có gì đáng nói.** Mọi phép đo dưới đây đều có ngưỡng. Trong
ngưỡng thì không báo. Báo cáo rỗng làm hỏng lòng tin nhanh hơn không báo cáo.

**Đo theo nhịp thứ đó thật sự đổi.** Search Console trễ 2 ngày và dao động ngày
qua ngày lớn hơn xu hướng thật. Đo thứ hạng hằng ngày là tạo báo động giả rồi
tự tay tắt thông báo. Thứ đổi hằng ngày: lỗi kỹ thuật, đơn hàng. Thứ đổi hằng
tuần: chỉ mục, lưu lượng. Thứ đổi hằng tháng: thứ hạng, đối thủ.

**Thời gian của chủ shop là thứ khan hiếm nhất.** Một người vừa là chủ, vừa lập
trình, vừa viết nội dung, vừa chốt đơn. Phần việc hằng ngày của chủ shop phải
dưới 10 phút, nếu không nó sẽ bị bỏ sau hai tuần.

---

## HẰNG NGÀY

### Chủ shop — dưới 10 phút

| Việc | Thời gian | Khi nào dừng |
|---|---|---|
| Bấm "Yêu cầu lập chỉ mục" 10 URL trong Search Console | 5 phút | khi tỉ lệ chỉ mục > 70% |
| Ghi đơn Zalo vào CMS: tên · món · **khách biết shop qua đâu** | 30 giây/đơn | không bao giờ |

Dòng thứ hai quan trọng hơn vẻ ngoài của nó. Đơn chốt qua Zalo không được ghi
thì **mọi tỉ lệ liên quan tới mua hàng đều thiếu tử số** — người quản lý đang
tối ưu một cái bóng của việc kinh doanh. Trường "biết shop qua đâu" là thứ duy
nhất nối lưu lượng với doanh thu.

### Máy — tự động, chỉ báo khi vượt ngưỡng

| Đo | Báo khi |
|---|---|
| API và web còn sống | có mã 5xx |
| URL trong sitemap trả 404 | > 0 |
| Liên kết nội bộ trỏ vào trang chuyển hướng | > 0 |
| Deploy gần nhất có thành công không | **GitHub tự gửi email** — không dựng thêm |

Bốn dòng này đều là lỗi đã xảy ra thật, nên chúng lặp lại được.

Chạy bằng `node manager-ai/script/canh-hang-ngay.mjs`. **Im lặng và thoát mã 0
là bình thường**; có vấn đề thì in ra và thoát mã 1.

Bằng chứng nó đáng có: chạy lần đầu ngày 15/09/2026 là bắt ngay 3 liên kết nội
bộ trỏ vào trang vừa gộp cùng ngày hôm đó. Không có nó thì ba liên kết chết đó
nằm im tới khi có người tình cờ rà lại.

### Đầu mỗi phiên làm việc — người quản lý, 5 dòng

Không phải họp. Mỗi lần chủ shop mở phiên, người quản lý mở đầu bằng đúng năm
dòng, không dài hơn:

1. Có gì vượt ngưỡng từ lần trước không
2. Dự đoán nào tới hạn kiểm, đúng hay sai
3. Một việc đáng làm nhất hôm nay, kèm lý do bằng số
4. Một việc đang chờ quyết định của chủ shop
5. Hết

Không có gì ở dòng 1 và 2 thì nói "không có gì" rồi sang dòng 3 ngay.

---

## ĐO ĐƯỢC GÌ VỀ VIỆC RA TIỀN — cập nhật 18/09/2026

Từ 18/09 cả hai shop ghi nhận **`zalo_click`** và **`phone_click`**, bắt bằng
một bộ nghe chung ở tầng document trong `TrackVisit`. Trước đó chỉ có `view`,
`add_to_cart`, `begin_checkout`, `purchase` — **thiếu đúng bước ra tiền**, vì
đơn thật chốt qua Zalo.

Đây là thứ phải xem hằng tuần từ nay: **bấm Zalo trên mỗi trang nào**. Nó là
cầu duy nhất nối lưu lượng với doanh thu khi đơn không đi qua giỏ hàng.

### Số nền trước khi có phép đo này (90 ngày, đo 18/09/2026)

| | 17fishing | GaRutin |
|---|---|---|
| Hiển thị Google | 9.432 | 14.612 |
| Nhấp | 199 | 316 |
| CTR | 2,11% | 2,16% |
| Người xem sản phẩm | 194 | 89 |
| Vào trang đặt hàng | 17 | 6 |
| Đặt xong | 2 | 6 |

### CTR chia theo LOẠI TRANG, không theo thứ hạng

| loại | hạng | CTR |
|---|---|---|
| Trang sản phẩm 17fishing | 3–6 | **9–14%** |
| `mua-ga-rutin-tp-hcm` (ý định mua) | 5,9 | **7,4%** — 120 nhấp |
| Bài kỹ thuật 17fishing | 7–9 | **0–0,8%** |

Trang trả lời **"mua ở đâu"** được bấm gấp 10–20 lần trang trả lời **"làm thế
nào"**, ở cùng thứ hạng. 17fishing có **2/89** bài loại đó; GaRutin có **8/52**
và đó là bài mạnh nhất của họ.

### Facebook là kênh khác hẳn

17fishing, toàn bộ lịch sử:

| nguồn | khách | trang/khách | đơn |
|---|---|---|---|
| direct | 524 | 2,0 | 0 |
| **facebook** | **122** | **6,8** | **1** |
| google | 109 | 1,9 | 0 |

Khách từ page Facebook xem **gấp 3,4 lần** số trang, và là nguồn **duy nhất** có
đơn được ghi nhận. Chủ shop xác nhận có page FB gắn link web.

Việc chưa làm: **gắn UTM vào link trên page FB**. Hiện mọi thứ gộp thành
"facebook", không tách được link hồ sơ với từng bài đăng.

---

## HẰNG TUẦN — khoảng 20 phút

Đo sáu con số, so với tuần trước:

| Đo | Ngưỡng báo |
|---|---|
| Tỉ lệ lập chỉ mục | giảm, hoặc < 60% |
| Hiển thị 7 ngày so với 7 ngày trước | lệch > 25% |
| Nhấp 7 ngày so với 7 ngày trước | lệch > 25% |
| Google đọc sitemap lần cuối | quá 14 ngày |
| Sản phẩm không có bài nào dẫn tới | > 2 |
| Đơn Zalo tuần này, theo nguồn | — luôn xem |

**Xem xét và phát triển** — ba câu, trả lời bằng số chứ không bằng cảm nhận:

- Tuần này đã đẩy cái gì lên production?
- Con số nào đổi, và có đúng như dự đoán lúc quyết định không?
- Việc gì đang chặn việc khác?

**Một thảo luận mỗi tuần**, chỉ một, chọn theo thứ tự:

1. Tuần có việc "mất là không lấy lại được" chưa làm → bàn việc đó
2. Có dự đoán sai → bàn vì sao sai, sửa cách nghĩ ở đâu
3. Không có gì → chủ shop kể chuyện bán hàng: khách hỏi gì nhiều nhất trên
   Zalo tuần này. Đây là nguồn dữ liệu người quản lý không có cách nào tự lấy,
   và nó thường đáng giá hơn cả sáu con số ở trên.

---

## HẰNG THÁNG — khoảng 1 giờ

- Quét lại toàn bộ chỉ mục cả hai shop, so mốc nền
- Đọc lại trang một của 20 truy vấn nhiều hiển thị nhất — đối thủ có đổi không
- Rà mô tả sản phẩm: giá đúng chưa, thông số có tự mâu thuẫn không
  *(ngày 15/09/2026 phát hiện mô tả chuồng 1,5 triệu ghi 60cm ở giữa bài và
  80cm ở đầu và cuối — không ai thấy suốt nhiều tháng)*
- Xem lại tỉ lệ chia công sức giữa hai shop
- Đóng hoặc gia hạn từng dự đoán trong nhật ký quyết định

---

## HẰNG QUÝ

- Xoay token quản trị, kể cả khi chưa lộ
- Kiểm sao lưu CSDL bằng cách **phục hồi thử**, không phải bằng cách nhìn cấu hình
- Đọc lại toàn bộ hồ sơ này, xoá phần không còn đúng

---

## Việc KHÔNG nên làm hằng ngày

Ghi ra để khỏi bị cám dỗ:

- **Xem thứ hạng từ khoá.** Dao động ngày lớn hơn xu hướng, nhìn hằng ngày chỉ
  sinh lo lắng và quyết định vội.
- **Viết thêm bài.** Trên site có tỉ lệ lập chỉ mục thấp, thêm bài là thêm URL
  không được đọc. Viết khi có lý do, không viết theo lịch.
- **Đổi tiêu đề, meta liên tục.** Google cần vài tuần mới phản ánh; đổi trước
  khi kịp đo là tự xoá dấu vết của chính mình.
- **Báo cáo khi không có gì.** Xem nguyên tắc nền.
