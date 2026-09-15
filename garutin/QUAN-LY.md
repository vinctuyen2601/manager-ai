# Hồ sơ quản lý — cửa hàng trực tuyến GaRutin

Lập ngày 10/09/2026 · Cập nhật lần cuối 10/09/2026 · Người lập: `quan-ly-tai-san`

Mọi số trong hồ sơ này đều **tự đo**, kèm cách đo lại. Đừng tin số cũ — hãy chạy lại.

---

## 1. Tài sản này là gì và tạo giá trị bằng cách nào

Trang trại **gà rutin** (chim cút Nhật Bản) bán trực tuyến: gà giống, gà lẻ
trống/mái, combo cặp, trứng, và vật tư nuôi.

Chuỗi tạo giá trị **thật sự** đang chạy như sau:

```
bài viết blog  →  Google  →  người đọc  →  trang sản phẩm  →  ĐA SỐ chốt qua Zalo
   (74 bài)                   (~420/tháng)                      ↑ hệ thống không thấy
```

Nghĩa là: **blog là kênh kéo khách, sản phẩm là nơi thuyết phục, còn chốt đơn
thì diễn ra ngoài hệ thống.** Ba khoản đầu tư khác nhau, và chỉ hai khoản đầu
đo được.

Ba kho mã: `GaRutinBE` (NestJS + Postgres), `GaRutinWeb` (Next.js), `GaRutinCMS`
(Vite/React). Hạ tầng: một máy EC2 chạy PM2, CSDL Postgres **nhiều khả năng
nằm cùng máy** (`DB_HOST=localhost` trong SETUP.md), ảnh trên Cloudflare R2,
API sau CloudFront.

---

## 1b. Hiểu biết nghề — gà rutin và cách bán nó

*Học từ chính blog của shop (74 bài), chủ yếu bài "50 Câu Hỏi Thường Gặp" và
"Bảng Giá Gà Rutin 2026". Người quản lý chưa đọc hai bài này thì chưa đủ tư
cách nhận định về sản phẩm.*

### Con vật

Lai giữa **gà gô cánh đốm** và **chim cút ngực xanh**, gốc Đông Nam Á. Tên
"rutin" đến từ chất chống oxy hoá rutin có nhiều trong trứng.

```
trưởng thành   50–70 gram · cao 7–10 cm — một trong những giống nhỏ nhất thế giới
tuổi thọ       3–5 năm (tốt có thể 6–7)
màu lông       trên 20 màu. Phổ biến: nâu vàng (tự nhiên), trắng tuyết,
               đen hắc hê, vảy cá, vàng bông, xám bạc, lông xù (frizzle)
tính nết       nhận ra chủ sau 2–3 tuần, chạy lại khi nghe tiếng lắc hộp thức ăn
dị ứng         ít hơn hẳn chó mèo — ít rụng lông, ít bụi
chi phí nuôi   80.000–140.000đ/tháng cho 4–6 con
```

### Thuật ngữ phải biết

- **Bao đẻ** — cam kết gà mái sẽ đẻ. Đây là cam kết đặc thù của nghề và là thứ
  khách mua mái quan tâm nhất. Không biết từ này thì đọc mô tả không hiểu.
- **Hắc hê**, **vảy cá**, **bò sữa**, **vàng kem**, **lông xù (frizzle)** — tên
  màu lông, không phải tên giống.

### Giá phụ thuộc cái gì — theo chính bài viết của shop

> *"Các yếu tố ảnh hưởng đến giá gồm **độ tuổi**, **giới tính**, **màu lông**,
> nguồn gốc và chất lượng giống."*

### Khách lo gì trước khi mua — theo chính bài viết của shop

> *"Chọn gà từ trại uy tín, **đã tiêm vaccine**, có **cam kết bao đẻ**."*

Cộng thêm mối lo riêng của hàng sống: gà có sống nổi khi ship đi tỉnh không, và
chết dọc đường thì ai chịu.

### ⚠ Mâu thuẫn giữa nội dung và gian hàng

Đối chiếu năm tiêu chí trên với cả 20 mô tả sản phẩm (đo 10/09/2026):

| Khách được dạy phải hỏi | Sản phẩm có trả lời |
|---|---|
| Độ tuổi — yếu tố giá số 1 | **0/20** |
| Đã tiêm vaccine | **0/20** |
| Cách vận chuyển gà sống | **0/20** |
| Cam kết bao đẻ | 5/20 |
| Màu lông | 18/20 |

**Shop tự dạy khách phải hỏi tuổi và vaccine, rồi không ghi cả hai lên bất kỳ
sản phẩm nào.** Đây là việc đáng làm nhất của gian hàng — đáng hơn "viết mô tả
dài hơn", vì nó vá đúng chỗ khách đang phải nhắn Zalo để hỏi.

### ⚠ Giá không phản ánh độ hiếm

```
Trống hắc he 7 màu (Hiếm)      70.000đ   ← ghi là hiếm
Trắng / Trống xám / Mái xám …  70.000đ   ← chín màu thường, cùng giá
Mái vàng                      100.000đ
```

Bài viết nói màu lông ảnh hưởng giá, nhưng một con ghi "Hiếm" lại bằng giá màu
thường, còn màu thường lại đắt hơn. **Hoặc nhãn "Hiếm" vô nghĩa, hoặc đang bán
hớ.** Chỉ chủ shop trả lời được — xem mục 8.

Hai sản phẩm **"Mái vàng" trùng cả tên lẫn giá 100.000đ** — gần như chắc chắn
là bản ghi lặp.

---

## 2. Quy mô thật — đo ngày 10/09/2026

```
sản phẩm      20        mô tả: ngắn nhất 64 · trung vị 124 · dài nhất 2.208
                        13/20 dưới 300 ký tự · 13/20 chưa có video · 0 thiếu ảnh
                        2 sản phẩm TRÙNG TÊN "Mái vàng"
bài viết      74        chưa bài nào được gộp/chuyển hướng 301
khách 30 ngày 422       (972 lượt)
từ khoá       203       gộp 1 · bổ sung 68 · viết mới 57 · sửa tiêu đề 51 · đã tốt 11
review        5         toàn 5 sao, KHÔNG cái nào gắn với đơn hàng
đơn hàng      10        toàn bộ lịch sử — nhưng xem mục dưới
phễu 30 ngày  13/20 sản phẩm có tương tác · chạm 43 · thêm giỏ 4 · đặt 3 · bán 3
```

### Con số đơn hàng bị nhiễm — đừng dùng thô

Đọc từng đơn thì thấy **3 trong 10 không phải khách thật**: một đơn tên đúng
chữ `"test"` (27/07, 330.000đ), một đơn tên `"T"` (09/05), một đơn tên
`"VN_Ngu Oila\tN"` có ký tự tab — rác hoặc máy.

Còn lại **7 đơn thật: 4 xác nhận, 3 huỷ.** Và theo thời gian:

```
T5/2026   2 đơn — cả hai huỷ (1 trong đó là rác)
T7/2026   5 đơn — 2 xác nhận, 3 huỷ (1 trong đó là "test")
T9/2026   3 đơn — 3 xác nhận, 0 huỷ     ← hai tuần gần nhất
```

**Xu hướng đang tốt lên**, không phải đứng yên. Nói "10 đơn trong toàn bộ lịch
sử" là mô tả đúng nhưng gây hiểu sai.

### Cách đo lại

```bash
TOKEN=...   # POST /api/auth/login
A=https://api.garutin.com/api
curl -s "$A/products?limit=300"                     # mô tả, ảnh, video, trùng tên
curl -s "$A/posts?limit=500"                        # MẶC ĐỊNH CHỈ 12 — phải đặt limit
curl -s "$A/admin/analytics/visits?from=…&to=…"     -H "authorization: Bearer $TOKEN"
curl -s "$A/admin/analytics/product-funnel?from=…&to=…" -H "authorization: Bearer $TOKEN"
curl -s "$A/admin/orders?limit=300"                 -H "authorization: Bearer $TOKEN"
curl -s "$A/admin/keywords/phan-tich"               -H "authorization: Bearer $TOKEN"
```

---

## 3. Phần tạo ra giá trị lớn nhất → ưu tiên bảo vệ

**74 bài viết blog.** Đây là kênh kéo khách duy nhất đo được, và là khoản đầu
tư lớn nhất tính bằng công sức — hàng trăm giờ viết, không thể dựng lại nhanh.
Thứ hạng Google gắn với chúng còn khó lấy lại hơn: mất bài thì mất luôn thứ
hạng, và xây lại mất nhiều tháng.

**20 sản phẩm cùng ảnh trên R2.** Ảnh gà chụp thật, không mua được.

**Quan hệ khách hàng nằm trên Zalo.** Có giá trị nhất, và **hoàn toàn không
nằm trong tài sản này** — không ai sao lưu được nó.

---

## 4. Mất gì thì không lấy lại được → danh sách bảo vệ

> ### ⚠ Không tìm thấy bất kỳ cơ chế sao lưu CSDL nào
>
> Đã tra `.github/workflows/`, `package.json`, `SETUP.md`: không có `pg_dump`,
> không có snapshot, không có lịch sao lưu, không có tài liệu phục hồi.
>
> Cộng với việc Postgres nhiều khả năng chạy **cùng máy EC2** với ứng dụng:
> một sự cố ổ đĩa là mất 74 bài viết, 20 sản phẩm, toàn bộ số liệu truy cập và
> đơn hàng — **vĩnh viễn**.
>
> Đây là rủi ro lớn nhất của tài sản này, lớn hơn mọi vấn đề nội dung hay SEO
> gộp lại. Cần xác minh ngay: AWS có bật snapshot tự động không? Nếu có thì
> **đã từng thử phục hồi chưa?** Một bản sao lưu chưa từng phục hồi thử thì
> chưa phải bản sao lưu.

Các khoản khác trong danh sách bảo vệ:

- **Ảnh sản phẩm trên R2** — R2 không tự có phiên bản cũ. Xoá là mất.
- **Khoá bí mật**: `JWT_SECRET`, `DB_PASSWORD`, `GSC_PRIVATE_KEY`,
  `R2_SECRET_ACCESS_KEY`, `RESEND_API_KEY`, `SERPER_API_KEY`. Chỉ tồn tại
  trong `.env` trên máy chủ. Mất máy là mất khoá.
  *Điểm tốt:* đã kiểm lịch sử git — chưa bao giờ commit nhầm `.env`, chỉ có
  `.env.example`.
- **Thứ hạng tìm kiếm** — không phải tệp, nhưng mất thì mất nhiều tháng.

---

## 5. Đang âm thầm xấu đi

**13/20 sản phẩm có mô tả gần như trống** (trung vị 124 ký tự; 17fishing cùng
hệ là 1.671). Không tự tốt lên, và mỗi ngày trôi qua là mất khách âm thầm —
khách xem rồi đi, không ai báo.

**Công cụ đã xây nhưng chưa dùng.** Chức năng gộp bài với chuyển hướng 301 đã
hoàn thành, nhưng **chưa bài nào được gộp** (`redirectTo` = 0/74). 51 từ khoá
đang ở trạng thái "sửa tiêu đề" — việc rẻ nhất trong tất cả, chưa làm.

**Dữ liệu đơn hàng nhiễm đơn test** và chưa được dọn. Càng để lâu càng khó
phân biệt, và mọi thống kê về sau đều lệch.

**Trường tên khách nhận rác** — có đơn chứa ký tự tab trong tên.

**Phụ thuộc LLM mục ruỗng theo thời gian.** Đã hai lần model bị khai tử giữa
chừng (`llama-3.3-70b`, `gemini-2.5-flash`). Sẽ còn xảy ra.

**7/20 sản phẩm không có tương tác nào trong 30 ngày** — chưa rõ vì hàng không
ai cần hay vì không ai tìm thấy.

---

## 6. Ngữ nghĩa dễ hiểu sai — bẫy đã có người mắc

| Bẫy | Sự thật |
|---|---|
| "Khách xem" = người thấy sản phẩm | Chỉ đếm người **mở trang chi tiết**. Nút thêm giỏ nằm trên thẻ ở trang danh sách nên `xem 0 · thêm giỏ 1` là **đúng** |
| Tỉ lệ thêm giỏ = giỏ ÷ lượt xem | Phải chia cho `reachers` (khách có bất kỳ tương tác nào). Chia cho `viewers` từng ra **300%** |
| Lượt truy cập = người thật | Đã lọc bot và lọc sự kiện phễu. Từng có ngày `/blog:` — đường dẫn không tồn tại — chiếm **28%** lưu lượng |
| utm_source ⇒ chiến dịch của shop | Chiến dịch nhận bằng `utm_campaign`. ChatGPT tự gắn `utm_source=chatgpt.com` |
| Tỉ lệ mua phản ánh sức bán | **Thiếu tử số** — đa số đơn chốt Zalo, không vào hệ thống |

Chi tiết đầy đủ ở `CLAUDE.md` cùng thư mục.

---

## 7. Chỗ tôi mù, và cần gì để hết mù

**Toàn bộ việc bán hàng qua Zalo.** Không thấy gì: bao nhiêu đơn, khách hỏi gì,
vì sao không chốt. Đây là mảng mù lớn nhất và nó làm hỏng mọi kết luận về
chuyển đổi. *Hết mù bằng cách:* nhập đơn Zalo vào hệ thống, dù chỉ nhập tay.

**Không biết có sao lưu ở tầng hạ tầng hay không.** Tôi chỉ đọc được mã và API,
không nhìn được bảng điều khiển AWS. *Hết mù bằng cách:* chủ shop kiểm và ghi
lại kết quả vào mục 4.

**Không biết vì sao 3 đơn thật bị huỷ.** Hệ thống không lưu lý do huỷ. *Hết mù
bằng cách:* thêm trường lý do, hoặc chủ shop nhớ lại và ghi vào mục 10.

**Khối "trực tiếp" 598 lượt/14 ngày chưa soi.** Với tiền lệ `/blog:`, nghi phần
lớn là máy quét. Chưa kiểm. *Hết mù bằng cách:* đối chiếu user agent và mẫu
đường dẫn.

**Không biết 7 sản phẩm im lặng là do đâu.** Cần đối chiếu với Search Console
xem có ai tìm chúng không.

---

## 8. Việc còn treo, ai đang chờ quyết

| Việc | Chờ ai |
|---|---|
| Xác minh sao lưu CSDL — **gấp nhất** | chủ shop kiểm AWS |
| `mua-ga-rutin-ha-noi-uy-tin`: giữ hay gộp? (shop có ship Hà Nội không?) | chủ shop quyết — **đừng tự gộp** |
| Gộp 17 bài quận huyện về `mua-ga-rutin-tp-hcm` | chủ shop chạy |
| Dọn 2 sản phẩm trùng tên "Mái vàng" (trùng cả giá 100.000đ) | chủ shop quyết giữ cái nào |
| **"Trống hắc he 7 màu (Hiếm)" bán 70.000đ bằng màu thường** — nhãn hiếm vô nghĩa hay bán hớ? | chủ shop quyết |
| Bổ sung **tuổi** và **đã tiêm vaccine** vào cả 20 mô tả | chủ shop cấp thông tin, tôi soạn |
| Xoá 3 đơn test khỏi dữ liệu | chủ shop quyết |
| 17fishing chưa nối Search Console | |
| Mã chết: `crawl-to-drafts` (không có lối vào), trang `/keywords-cu` | |
| ✅ | **21 trang "Mua Gà Rutin [quận]"** — 20/21 ĐÃ gộp về mua-ga-rutin-tp-hcm từ trước, đang 308 trên bản chạy thật | — | **XONG từ trước. Tôi báo động nhầm vì đọc danh sách CMS mà không nhìn cột redirectTo** |
| 🟠 | **Gộp 3 bài "gà rutin không đẻ" + 2 bài "bao lâu đẻ trứng"** — chùm "không đẻ" đang 0 hiển thị | Google không biết chọn bài nào nên không chọn bài nào | chủ shop |
| 🟠 | **Gom 6 bài về chuồng thành cụm có trang trụ** — chùm 919 hiển thị, trận trực tiếp với lolipet | 6 bài cùng hạng 6–10, chia phiếu nhau | chủ shop duyệt bài nào làm trụ |
| 🟠 | **Xoay token admin GaRutin** — đã dán vào chat 15/09, hết hạn 04/10 | toàn quyền gian hàng cho ai đọc được đoạn chat | chủ shop |

---

## 9. Nhịp kiểm đề xuất

Chưa thống nhất với chủ shop — đây là đề xuất.

| Nhịp | Kiểm gì | Phát hiện được chuyện gì |
|---|---|---|
| Tuần | mô tả sản phẩm < 300 ký tự; sản phẩm có khách xem mà không ai thêm giỏ | hàng trên kệ đang mất khách |
| Tuần | từ khoá mới trong Search Console | nhu cầu mới chưa có nội dung đón |
| Tháng | so số liệu với mục 2 | tài sản đang lớn hay teo |
| Tháng | **kiểm sao lưu có phục hồi được không** | rủi ro mất trắng |
| Quý | phụ thuộc: model LLM còn sống không, khoá còn hạn không | mục ruỗng âm thầm |

---

## 10. Nhật ký quyết định

| Ngày | Quyết gì | Vì sao | Kết quả |
|---|---|---|---|
| 09/09/2026 | Phễu tính mẫu số bằng `reachers` thay `viewers` | tỉ lệ ra 300% và chia cho 0; nút thêm giỏ nằm ngoài trang chi tiết | đã sửa, số về đúng khoảng |
| 09/09/2026 | Không đếm trang 404 là lượt xem | `/blog:` chiếm 28% lưu lượng một ngày | đã sửa |
| 09/09/2026 | Chiến dịch nhận bằng `utm_campaign`, tách nhóm "trợ lý AI" | ChatGPT tự gắn utm_source, làm hỏng ranh giới quảng cáo/tự nhiên | đã sửa |
| 09/09/2026 | Ép trần độ dài SEO bằng mã, không bằng prompt | prompt ghi ≤158, chạy thật ra 160/182/161 | đã sửa |
| 10/09/2026 | Vai trợ lý thu về **quản lý gian hàng và tiếp thị** | 3/7 trách nhiệm quản lý có đủ dữ liệu; đơn hàng và sổ sách mù | |
| 10/09/2026 | Hoãn xây bot Telegram, dùng Remote Control trước | Remote Control phủ 2/3 yêu cầu với chi phí xây bằng 0 | đang thử |

---

## 11. Hiểu biết tích luỹ

*Chỉ thêm, không xoá. Sai thì viết đính chính bên dưới, giữ nguyên dòng cũ.*

### 09/09/2026 · Đọc mã rồi kết luận mà không đo dữ liệu là đoán, không phải chẩn đoán
**Điều đã biết:** Khi phễu hiện "thêm giỏ 1 · tỉ lệ 0", tôi đọc SQL rồi kết
luận mẫu số bị thổi phồng bởi lượt xem cũ từ trước khi bật đo. Kéo dữ liệu thật
về thì ngược hẳn: mẫu số bị **thiếu**, vì khách thêm giỏ từ trang danh sách mà
không mở trang chi tiết.
**Biết bằng cách:** đối chiếu bảng theo trang với bảng phễu cùng một ngày — hai
sản phẩm có người thêm giỏ đều không nằm trong danh sách trang được xem.
**Hệ quả về sau:** với tài sản này, mã cho biết *ý nghĩa*, chỉ dữ liệu mới cho
biết *sự thật*. Luôn kéo số trước khi kết luận.

### 09/09/2026 · Phép đo của chính mình cũng có thể sai
**Điều đã biết:** Báo "chưa deploy" ba lần liền, trong khi bản mới đã lên từ
lâu. Biểu thức lọc đường dẫn chunk không nhận dấu ngoặc vuông nên chưa bao giờ
tải đúng tệp cần kiểm.
**Hệ quả về sau:** khi kết quả đo mâu thuẫn với điều hợp lý, nghi công cụ đo
trước khi nghi hệ thống.

### 09/09/2026 · Ràng buộc đo được thì ép bằng mã, đừng nài nỉ trong prompt
**Điều đã biết:** Prompt ghi "TUYỆT ĐỐI không quá 158 ký tự"; chạy thật ba lần
ra 160, 182, 161. Thêm chữ nài nỉ chỉ làm phần suy luận dài ra và gây hỏng
khác.
**Hệ quả về sau:** độ dài, định dạng, danh sách cho phép — ép bằng mã. Prompt
chỉ lo phần không đo được.

### 09/09/2026 · Nhà cung cấp LLM khác nhau hành xử khác nhau, và im lặng
**Điều đã biết:** Cùng một lệnh lúc chạy lúc trả 500. Nguyên nhân: một nhà phớt
lờ `response_format` và trả văn xuôi; `callLLM` coi đó là thành công nên ba nhà
còn lại không bao giờ được thử.
**Hệ quả về sau:** mọi phép kiểm chất lượng phải nằm **trong** vòng dự phòng,
không nằm ở nơi gọi. Lỗi phụ thuộc nhà cung cấp trông y hệt lỗi ngẫu nhiên.

### 10/09/2026 · Một con số tổng có thể che giấu điều ngược lại
**Điều đã biết:** "10 đơn trong toàn bộ lịch sử" nghe như shop đứng yên. Mở
từng đơn ra: 3 cái là rác/test, còn 7 đơn thật, và **ba đơn tháng 9 đều xác
nhận** — xu hướng đang tốt lên.
**Biết bằng cách:** liệt kê từng đơn kèm tên khách, ngày, trạng thái.
**Hệ quả về sau:** với dữ liệu ít, đừng bao giờ dùng số tổng. Mở hết ra mà đọc
— chỉ có mười dòng.

### 10/09/2026 · Chỗ nguy hiểm nhất là chỗ chưa ai nhìn
**Điều đã biết:** Cả ngày sửa mẫu số của một phân số, trong khi không ai kiểm
xem cơ sở dữ liệu có được sao lưu không. Hoá ra không tìm thấy cơ chế nào.
**Hệ quả về sau:** chạy giai đoạn "mất gì thì không lấy lại được" **trước**
mọi việc tối ưu. Việc tối ưu luôn hấp dẫn hơn và luôn được làm trước nếu không
có kỷ luật.

### 15/09/2026 · Cụm "chuồng" không thiếu trang bán — thiếu thứ hạng

**Điều đã biết:** Tôi định viết một trang mới nhắm "mua chuồng gà rutin" vì
thấy cụm chuồng có 919 hiển thị mà "không bài nào nhắm ý định mua". Kéo số ra
thì giả thiết sai ở cả ba tầng:

- 919 hiển thị đó **gần như toàn truy vấn hướng dẫn** — `cách làm chuồng`
  (177 ht), `làm chuồng` (64), `chuồng đẹp` (41), `2 tầng` (19), `mẫu đẹp`
  (14). Hai truy vấn thương mại thật (`mua chuồng nuôi gà rutin`,
  `chuồng gà rutin giá rẻ`) đều **0 hiển thị** — chúng đến từ Autocomplete,
  là tín hiệu nhu cầu chứ chưa phải nhu cầu đo được.
- Bài trụ `lam-chuong-ga-rutin` **đã bán hàng sẵn**: bảng so sánh "tự làm hay
  mua sẵn", giá 1.100.000đ/1.500.000đ, 4 liên kết sản phẩm ở mốc 70% và 87%
  độ dài, cộng FAQ "Mua chuồng gà rutin ở đâu, giá bao nhiêu?".
- Autocomplete cho `chuồng gà rutin` trả về 5/9 biến thể là tự làm (2 tầng,
  thùng xốp, đẹp, ngoài trời, tự làm) — **bài trụ đã có mục riêng cho cả năm**.

**Hệ quả về sau:** trang thứ tư sẽ tranh slot với chính bài trụ đang giữ hạng
8,9–9,4 trên hai truy vấn gốc. Đúng cái bẫy đã phải gộp bỏ 20 trang cửa ngõ.
Trước khi viết trang mới cho một cụm, **đọc bài đang xếp hạng trong cụm đó
đã** — ba lần trong dự án này giả thiết "chưa có bài" đều sai.

### 15/09/2026 · Trang sản phẩm gần như vô hình trên Google

**Điều đã biết (Search Console, 90 ngày, đo 15/09/2026):**

| loại trang | số trang | hiển thị | nhấp |
|---|---|---|---|
| khác (chủ yếu trang chủ) | 4 | 5.479 | 36 |
| blog | 13 | 8.684 | 283 |
| **sản phẩm** | **5** | **23** | **0** |

Sản phẩm chiếm **0,16% hiển thị và 0 nhấp** trên tổng 14.186 hiển thị. Không
trang chuồng nào xuất hiện, dù hai sản phẩm chuồng có **5 liên kết nội bộ mỗi
cái** — nhiều nhất trong 20 sản phẩm.

**Đã loại trừ:** có trong sitemap (20/89 URL), SSR đầy đủ, canonical đúng,
`<title>` và meta description viết riêng, H1 đúng, không có thẻ noindex.

**Còn lại là giả thiết chưa kiểm được:** chèn ép cùng tên miền (Google hiếm khi
cho hai URL cùng site vào một truy vấn, mà bài trụ đang giữ slot), và thẩm
quyền tên miền thấp. Kiểm được khi có khoá serper.dev để đọc SERP thật.

### 15/09/2026 · Từ khoá gốc "gà rutin" là chỗ rò lớn nhất, không phải cụm chuồng

**Điều đã biết:** `gà rutin` — **1.276 hiển thị, 5 nhấp, CTR 0,4%, hạng 9,5**.
Một truy vấn này chiếm **30% toàn bộ hiển thị của site**. Hạng 9,5 là đáy trang
một, nơi CTR gần như bằng không.

So sánh trong cùng bảng: `mua gà rutin ở tphcm` hạng 5,1 → CTR 9,3%;
`gà rutin tphcm` hạng 5,0 → 7,7%. Tức là ở hạng 5 site này thu 8–9%.

**Hệ quả:** kéo `gà rutin` từ 9,5 về khoảng 5 đổi được **5 nhấp → ~100
nhấp/tháng** — lớn hơn toàn bộ cụm chuồng (919 ht, 18 nhấp) cộng lại. Mọi đề
xuất về cụm nhỏ nên xếp sau việc này.

### 15/09/2026 · Lỗi dữ liệu: mô tả sản phẩm 1,5 triệu tự mâu thuẫn

**Điều đã biết:** Mô tả "Chuồng nuôi gà rutin cao cấp size lớn" là bản sao của
bản 60cm, chỉ đổi tiêu đề và bảng thông số; gạch đầu dòng giữa bài vẫn ghi
`Kích thước 60 × 40 × 45cm`. Khách đọc thấy 80 ở đầu, 60 ở giữa, 80 ở cuối.
**Đã sửa 15/09/2026** (một chuỗi, kiểm lại trên production: 0 chỗ còn ghi 60).

**Chưa sửa:** hai mô tả chuồng còn lại giống nhau khoảng 95% — trùng lặp nội
dung giữa hai sản phẩm cùng site. Viết lại là đổi lời chào hàng, cần chủ shop
duyệt.

**Hệ quả về sau:** sản phẩm nhân bản từ sản phẩm khác thì phải rà **toàn bộ**
mô tả, không chỉ tiêu đề và bảng thông số.

### 15/09/2026 · serper.dev không trả "Mọi người cũng hỏi" và "Tìm kiếm liên quan" — đã gỡ

**Điều đã biết:** Chức năng khám phá từ khoá thiết kế ba nguồn: Google
Autocomplete (miễn phí) cộng hai khối mua qua serper.dev. Hai khối mua tiền
**luôn trả về mảng rỗng**.

**Biết bằng cách:** gọi thẳng `https://google.serper.dev/search` từ chính máy
chủ, bốn truy vấn:

| truy vấn | organic | peopleAlsoAsk | relatedSearches |
|---|---|---|---|
| gà rutin | 6 | 0 | 0 |
| nuôi gà cảnh | — | 0 | 0 |
| câu cá | — | 0 | 0 |
| cách nuôi gà | — | 0 | 0 |

Phản hồi chỉ có ba trường cấp một: `searchParameters`, `organic`, `credits`.
"Câu cá" là truy vấn rộng, chắc chắn có khối "Tìm kiếm liên quan" khi tìm bằng
trình duyệt — nên đây không phải chuyện ngách hẹp. Tài liệu serper ghi hai
trường đó chỉ xuất hiện "khi có", và đã có người dùng khác báo chúng luôn rỗng.

**Đã loại trừ trước khi kết luận** (mất khá nhiều vòng, ghi lại để khỏi lặp):
khoá đúng và còn hạn mức (40 ký tự, gọi thẳng ra HTTP 200); mã nguồn đúng bản
mới trên máy chủ; bản biên dịch trong `dist` có thay đổi; tiến trình đã khởi
động lại. Từng nghi `pm2 restart` không nạp `.env` mới — **sai**: app dùng
`ConfigModule.forRoot()`, tức dotenv tự đọc tệp mỗi lần tiến trình khởi động,
nên `--update-env` là thừa.

**Đã làm:** gỡ hai kênh `cau-hoi` và `lien-quan`. Giữ lại thì mỗi lần gọi tốn
một credit để nhận về hai con số 0.

**Hệ quả về sau:** đừng thử lại. Autocomplete là nguồn chính và vẫn chạy tốt,
không cần khoá nào.

### 15/09/2026 · Cùng lời gọi đó lại trả lời được câu đắt hơn nhiều

**Điều đã biết:** `organic` luôn đầy đủ. Đó chính là thứ Search Console không
bao giờ cho biết: mình đứng hạng 9 **giữa những ai**.

Hai trang một khác nhau cho cùng một con số hạng, mà dẫn tới hai kế hoạch
ngược nhau:

- toàn Shopee, TikTok, Facebook → Google xếp theo **loại trang**, không theo
  chất lượng bài. Viết thêm nội dung không kéo được hạng. Việc đúng là bỏ từ
  khoá đó, dồn sang truy vấn có ý định cụ thể hơn.
- toàn blog và shop nhỏ → với tới được, đáng đầu tư.

**Đã làm:** `POST keywords/doi-thu` (tối đa 10 từ mỗi lượt vì trần 30 giây của
CloudFront) và `GET keywords/hang-dau`. Không lưu CSDL, không migration — SERP
hết hạn nhanh, lưu lại chỉ tạo ra bảng số cũ mà ai đọc cũng tưởng là hiện tại.
28 phép kiểm cho phần thuần ở `kiem/doi-thu.ts`.

**Hệ quả về sau:** trước khi đề xuất đầu tư vào bất kỳ từ khoá nào, đọc trang
một của nó đã. Chi phí một credit trên hạn mức 2.500.

### 15/09/2026 · "Hạng 7–9" hoá ra là TRANG HAI, không phải đáy trang một

**Điều đã biết:** Suốt nhiều phiên đã ghi "mọi trang kẹt hạng 7–9" và tìm cách
đẩy lên hạng 5. Đọc trang một thật thì giả định nền sai: **trang một chỉ có
7–9 vị trí tự nhiên**, không phải 10. Phần còn lại là băng video, ảnh, mua sắm.

| truy vấn | vị trí tự nhiên trên trang một | hạng GSC của mình |
|---|---|---|
| gà rutin | 7 | 9,5 |
| mua gà rutin ở tphcm | 9 | 5,1 |
| chuồng nuôi gà rutin | 7 | 8,9 |

Hạng 9,5 mà trang một hết chỗ ở vị trí 7 nghĩa là **đang ở trang hai**. Đó là
lời giải cho CTR 0,4% — con số luôn trông vô lý nếu tin rằng hạng 9,5 nằm cuối
trang một.

**Kiểm chéo:** quét 20 truy vấn nhiều hiển thị nhất, garutin.com **không có mặt
trên trang một ở 19/20**. Lần duy nhất xuất hiện là truy vấn thương hiệu
"garutin", hạng 3.

**Hệ quả về sau:** đừng đọc `position` của Search Console như thứ hạng trên
trang một. Với ngách này nó thường là trang hai. Khoảng cách tới trang một xa
hơn nhiều so với những gì các phiên trước đã ghi, và mọi ước lượng kiểu "kéo
từ 9,5 về 5 được ~100 nhấp" đều lạc quan quá mức — trước hết phải vào được
trang một đã.

### 15/09/2026 · Bản đồ trang một: ai thật sự đang giữ chỗ

**Điều đã biết (20 truy vấn, 15/09/2026):** đếm số lần xuất hiện trên trang một

| tên miền | số lần | loại |
|---|---|---|
| facebook.com | 34 | nhóm và bài đăng |
| lolipet.net | 20 | đối thủ trực tiếp |
| tiktok.com | 19 | video |
| youtube.com | 19 | video |
| marketplace.tripmap.vn | 13 | rao vặt |
| shopee.vn | 12 | sàn |

13/20 truy vấn có sàn cộng mạng xã hội chiếm quá nửa trang một, tương ứng
**46% tổng lượt hiển thị**.

**lolipet.net có mặt ở gần như mọi truy vấn, thường ở vị trí 1–2.** Đây là đối
thủ duy nhất đáng nghiên cứu kỹ; các tên còn lại hoặc là nền tảng, hoặc là báo
chí viết một lần (baohaiphong.vn, afamily.vn) chứ không cạnh tranh lâu dài.

**Hệ quả về sau:** với ngách này, nội dung blog cạnh tranh với **nhóm Facebook
và video TikTok**, không phải với blog khác. Trước khi đề xuất viết bài cho một
truy vấn, đọc trang một của nó — nếu quá nửa là nền tảng thì bài viết không
phải công cụ đúng.

### 15/09/2026 · lolipet.net thắng bằng quy mô, không bằng nội dung

**Điều đã biết:** lolipet.net đứng trên garutin.com ở gần như mọi truy vấn của
ngách này (có mặt 20/20 trang một đã quét, thường ở vị trí 1–2). Đọc thẳng
trang của họ thì **nội dung của mình tốt hơn ở mọi mặt đo được**:

| | lolipet | GaRutin |
|---|---|---|
| Bài "làm chuồng" | 1.834 từ · 17 đề mục | **2.683 từ · 37 đề mục** |
| Thẻ H1 trang hub | **4 thẻ** (lỗi) | 1 |
| Schema | Organization, Breadcrumb | Article, Product, LocalBusiness, FAQ, Offer… |

Khác biệt nằm ở quy mô và cấu trúc:

| | lolipet | GaRutin |
|---|---|---|
| Tổng URL trong sitemap | **2.105** | 90 |
| Liên kết nội bộ mỗi trang | **125–132** | 38–43 |
| Trang hub cho gà rutin | **8** | 0 |

Và họ **không phải shop gà rutin** — họ bán chó, mèo, bò sát, thỏ, hamster,
sóc, nhím, vẹt; gà rutin chỉ là 45/2.105 URL. Họ thắng ở ngách của mình bằng
thẩm quyền tích luỹ từ việc bán mọi thứ.

Một chi tiết đáng chú ý về cách họ làm: **bài viết về gà rutin của họ đăng dưới
dạng `/product/`, không phải `/blog/`** — nằm trong loại bài sản phẩm của
WooCommerce nên vào sitemap sản phẩm và nằm trong cấu trúc danh mục của cửa
hàng. Họ có hub theo nhu cầu: `/ga-rutin/` (hạng 2 cho "gà rutin", 1.644 từ) và
sáu hub con — gà đẹp, lồng chuồng, thức ăn, phụ kiện, thông tin cách nuôi,
combo.

**Hệ quả về sau:** **viết thêm bài không kéo được hạng ở ngách này.** Ba chùm
lớn — chuồng, gà, cách nuôi — mình đã sâu hơn đối thủ rồi. Đòn bẩy nằm ở cấu
trúc và số liên kết, không nằm ở số chữ.

### 15/09/2026 · /san-pham để trống tín hiệu mạnh nhất của nó

**Điều đã biết:** `/san-pham` là trang danh mục duy nhất của site, tương đương
`/ga-rutin/` của lolipet — trang đang giữ hạng 2 cho truy vấn đáng giá nhất
ngách. Trang của mình có **344 từ** và thẻ H1 ghi **"🐦 Tất cả sản phẩm"**,
trong khi thẻ `<title>` lại nhắm đúng ("Mua Gà Rutin Cảnh…"). Hai tín hiệu nói
hai chuyện khác nhau, và H1 — thứ mạnh nhất — dùng cho cụm không ai tìm.

**Đã sửa 15/09/2026:** H1 đổi thành "Mua gà rutin cảnh thuần chủng"; thêm phần
mở đầu, khoảng giá lấy từ danh mục sống, mục combo, mục chuồng, mục đặt hàng và
khối dẫn sang bài hướng dẫn. Chân trang nâng từ 4 lên khoảng 16 liên kết, lấy
từ API chứ không gõ cứng slug, và xuất hiện trên cả 90 trang.

**Hệ quả về sau:** khi thêm trang mới, kiểm H1 có nhắm cụm người ta thật sự gõ
không. Thẻ `<title>` đúng không cứu được H1 sai.

### 10/09/2026 · Về cách chủ shop làm việc
**Điều đã biết:** Thích nói thẳng, kéo lại ngay khi tôi lan man sang kiến trúc
thay vì trả lời câu được hỏi. Ưu tiên đã nêu rõ: **sản phẩm + review > bài viết
SEO > vận hành**. Không muốn nghe hứa hẹn doanh thu.
**Hệ quả về sau:** trả lời đúng câu được hỏi trước, đề xuất mở rộng sau và phải
ngắn.

---

*Hồ sơ này do người quản lý lập và tự cập nhật. Sửa số thì sửa kèm ngày đo.*
