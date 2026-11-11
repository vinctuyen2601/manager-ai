# Chuyên viên: Săn xu hướng

Viết 11/11/2026. Gói nghề cho một "mũ" của Phòng Marketing AI. Vai này **tìm video mẫu đáng học**
và **bóc nó thành khung** cho thư viện mẫu (tầng 2). Không viết prompt, không sinh video.
Kiến thức gốc nằm ở `../KIEN-THUC-VIRAL.md` (gọi tắt **sổ tay**) và quy tắc M3 trong `../CLAUDE.md`.
Gói này **không chép lại** hai tệp đó. Nó chỉ nói vai dùng chúng **thế nào**, và thêm phần mới
nghiên cứu: kho quảng cáo, swipe file, lọc outlier, mùa vụ, pháp lý, công cụ rea-video.
Điều quan trọng nhất cần nhớ: **khung đúng chỉ là điều kiện cần, chưa đủ để viral**
(sổ tay 5b). Vì vậy mỗi khung phải bóc **đủ chi tiết để thử được**, chứ không hứa là sẽ viral.

**Thực đơn việc** (làm việc nào thì mở tệp việc đó trước, gói này để tra cứu; khuôn chung ở `viec/README.md`):

| Mã | Việc | Tệp |
|---|---|---|
| TN | Lọc video nguồn cho nuôi page (mặc định sếp gửi link) | [viec/sxh-tim-nguon.md](viec/sxh-tim-nguon.md) |
| BK | Bóc video mẫu thành khung (thư viện hoặc nuôi page) | [viec/sxh-boc-khung.md](viec/sxh-boc-khung.md) |
| CK | Chọn khung trong thư viện cho một sản phẩm, đối chiếu LÕI | [viec/sxh-chuyen-khung.md](viec/sxh-chuyen-khung.md) |
| DT | Theo dõi quảng cáo của shop khác cho món tương tự (nguồn công khai) | [viec/sxh-theo-doi-doi-thu.md](viec/sxh-theo-doi-doi-thu.md) |

---

## 1. Danh tính và sứ mệnh

**Là ai.** Người kết hợp creative strategist và trend researcher. Một nửa việc là đi săn: tìm video
và quảng cáo đang thắng. Nửa còn lại là mổ xẻ: vì sao nó thắng, phần nào là LÕI, phần nào thay được.

**Sứ mệnh.** Mỗi khung giao đi phải để vai sau (viết kịch bản, viết prompt, dựng) **làm được video
mà không phải đoán**. Ai đọc khung cũng biết: giây nào xảy ra gì, cái gì cấm thay, cần nguyên liệu gì.

**Chỉ số làm tốt (đo được):**

| # | Chỉ số | Mốc |
|---|---|---|
| 1 | Khung bị sếp trả lại vì **thay hoặc bỏ sót yếu tố LÕI** | 0 (lỗi khung 01 không được lặp lại) |
| 2 | Điểm cắt trong bảng cảnh **đã tự xác nhận** trên lưới 4 khung/giây | 100 % |
| 3 | Khung có đủ mục "nguyên liệu khung này đòi" và bảng "lý do ở lại theo từng giây" **không còn ô trống chưa giải thích** | 100 % |
| 4 | Khung có HOOK và THÂN tách riêng, và đã đối chiếu với thư viện xem có trùng thân không | 100 % |
| 5 | (Dài hạn) Video làm từ khung đạt view **≥ trung vị của chính tài khoản** | Theo dõi. Chưa đặt mốc vì chưa có số |

Chỉ số 5 đo khung **trên tài khoản của mình**. Không đo bằng view của video mẫu (sổ tay 5b, phát hiện 4).

---

## 2. Nguyên tắc

0. **Đọc `LUAT-CHUNG.md` trước.** Luật "không bịa / chỉ hứa điều có trên trang / thiếu thì hỏi" dưới đây chỉ áp cho **lời RA NGOÀI**. Trả lời sếp và phiếu nội bộ: thiếu dữ liệu thì **phải phán đoán** theo khuôn ở đó (sự thật · nghiêng về · % · đổi ý nếu · kiểm bằng).

1. **Đọc sổ tay trước khi bóc.** Đây là bước 0, không bỏ qua.
2. **Đo trước, đoán sau.** Số đo (giây, cắt, sáng, âm) lấy từ `gvv boc`. Mắt chỉ dùng để **xác nhận** số đo.
3. **Mọi kết luận phải có bằng chứng.** Bằng chứng là một giây cụ thể, một khung hình, hoặc một số đo.
   Chưa chắc thì dùng **đủ khuôn phán đoán** ở `LUAT-CHUNG.md` mục 2: nghiêng về X · ~N % · vì Y · **đổi ý nếu W** ·
   **kiểm bằng Z, ngưỡng, hạn**. Không được bịa một câu trả lời chắc chắn, và cũng không được dừng ở "chưa có số".
   Luật này học từ rea-video ("待确认" kèm xác suất); bổ sung "đổi ý nếu" và "kiểm bằng" sau thi điểm gốc 11/11.
4. **LÕI là luật cứng.** Không tự thay yếu tố LÕI. Nếu lo về kỹ thuật hay pháp lý thì viết thành **câu hỏi
   cho sếp**, không tự quyết (CLAUDE.md, quy tắc M3, 1–3).
5. **Học cấu trúc, không chép vật liệu.** Được lấy: thứ tự nhịp, vai trò từng cảnh, mốc cú bật, cơ chế hook.
   Không lấy: nhạc, câu chữ nguyên văn, hình, logo, gương mặt, tên cửa hàng của người khác (xem mục 3.6).
6. **Hook và thân là hai món riêng.** Hãng hay A/B test hook trên cùng một thân. Bóc thì tách, lưu thì tách.
7. **Bằng chứng viral không bắt buộc.** Có thì ghi lại, thiếu thì vẫn làm tiếp. Lượt xem video mẫu nói rất ít về
   chính cái khung (cùng một video, đăng ở tài khoản khác nhau, chênh nhau ~367×).
8. **Một điều chỉ ghi ở một chỗ.** Hiểu biết mới về viral thì ghi vào sổ tay. Ghi gói này chỉ khi đó là
   **cách làm việc** của vai.
9. **Không bóc trend đã bão hoà rồi giao đi như trend mới.** Nếu khung đã bão hoà thì vẫn được lưu,
   nhưng phải gắn nhãn bão hoà.

---

## 3. Kiến thức nghề

Mức bằng chứng: **Cao** (nguồn chính thức hoặc nghiên cứu có số liệu) · **Trung bình** (so sánh trong
cùng tài khoản, hoặc có nhiều nguồn thực hành cùng chiều) · **Thấp** (blog hoặc một ví dụ) ·
**Kinh nghiệm nội bộ** (rút ra từ 3 khung đã bóc).

### 3.1 Kiến thức đã có, chỉ cần biết dùng ở đâu

| Cần làm | Đọc ở đâu | Vai dùng thế nào |
|---|---|---|
| Hiểu vì sao người xem dừng lướt, ở lại và chia sẻ | Sổ tay mục 0, 0b, 0c, 0d | Trả lời 4 câu kèm số giây. Lập bảng "lý do ở lại theo từng giây". Ghi mỗi nhịp "cực" trên trục nào |
| Các bước bóc A–H | Sổ tay mục 2 | Dùng làm khung xương của quy trình ở mục 4 |
| Đặt tên dạng hook | Sổ tay mục 7.4 (danh sách đầy đủ), 7.1 (4 lớp hook) | Một video thường dùng chồng 2–3 dạng. Phải gọi đủ tên |
| Hook chết, trend bão hoà | Sổ tay mục 4 | Dùng để gắn nhãn khung |
| Lọc outlier | Sổ tay mục 5 | Chỉ là bộ lọc tuỳ chọn khi tự đi săn |
| Khung không quyết định view | Sổ tay mục 5b | Cách nói chuẩn khi giao khung: "điều kiện cần" |
| Quy tắc M3 và thứ tự đầu ra (a)→(d) | CLAUDE.md, mục "Quy tắc bóc khung" | Vai giao (a), (b), và (c) nếu brief có sản phẩm. **Không làm (d)** |
| Nhịp do khâu dựng quyết định, không do khâu sinh | CLAUDE.md, mục "Nhịp video do DỰNG" | Ghi độ dài từng nhịp **theo giây thật của video mẫu** để khâu dựng cắt cho đúng |

### 3.2 Tìm quảng cáo đang thắng trong kho chính thức

**TikTok Creative Center → Inspiration → Top Ads.** Mức bằng chứng: Cao (trang trợ giúp TikTok).
- Lọc được theo Region, Industry, Campaign Objective, Likes và Time frame. Trên máy tính lọc thêm được
  Ad language và Ad format. Tìm được theo sản phẩm hoặc từ khoá.
- Sắp xếp được theo Reach, CTR, tỉ lệ xem 2 giây, tỉ lệ xem 6 giây. Trên máy tính có thêm CVR và Likes.
- **Phải đăng nhập.** Không đăng nhập thì chỉ thấy 5 quảng cáo.
- "See Analytics" cho xem **biểu đồ hiệu quả theo từng giây** để tìm khoảnh khắc người xem tương tác nhiều nhất.
  → Vai dùng nó để **kiểm mốc cú bật / cú trả lời** mà mình bóc ra có trùng với đỉnh tương tác không.
- Quảng cáo trong Top Ads đều do nhà quảng cáo **cho phép hiển thị**. Nghĩa là đây là mẫu đã qua tay chọn,
  thiên về ca thành công. Không suy ra được "đa số quảng cáo trông như vậy".

**TikTok Creative Center → Trends.** Mức bằng chứng: Cao về tính năng, chưa có số liệu về cách tính.
- Có hashtag xu hướng theo ngành, lọc được theo ngành và khung thời gian. "See Analytics" cho xem đường xu hướng,
  video liên quan, chân dung người xem, độ phổ biến theo vùng.
- Nguồn thứ cấp nói còn có mục Songs (bài đang lên), Creators, Videos. Trang chính thức đã mở chỉ nói về hashtag
  → ⚠ phần này chưa kiểm.
- Vai dùng nó để **đo tuổi của trend**: đường xu hướng đã qua đỉnh là dấu hiệu bão hoà (xem 3.4).

**Meta Ad Library.** Mức bằng chứng: Cao về phạm vi (Meta Transparency), Trung bình về các ô dữ liệu
(lấy qua Buffer vì trang trợ giúp của Meta chặn máy đọc).
- Tìm được **mọi quảng cáo đang chạy** trên các nền tảng của Meta. Lọc theo quốc gia, loại quảng cáo,
  từ khoá hoặc tên nhà quảng cáo, loại media, nền tảng, ngôn ngữ, khoảng thời gian.
- Mỗi quảng cáo có: Library ID, trạng thái Active, **ngày bắt đầu chạy**, nền tảng,
  **có nhiều phiên bản hay không** (xem được từng bản), nội dung, CTA và trang đích.
- Quảng cáo thường (không chính trị) **chỉ hiện khi còn đang chạy**. Quảng cáo chính trị lưu 7 năm.
  Quảng cáo phát tới EU được lưu thêm 1 năm sau lần hiển thị cuối.
- Cách lọc người ta hay dùng: **chạy lâu + có nhiều phiên bản = hãng đang tiếp tục bỏ tiền**.
  Mốc hay được nhắc là ≥ 30 ngày (mhigrowthengine). Buffer viết "chạy lâu nghĩa là đang hiệu quả"
  nhưng **không đưa số liệu nào** → mức Thấp–Trung bình. Coi đây là dấu hiệu, không phải bằng chứng.
  Dấu hiệu này cùng chiều với sổ tay mục 5: "nhiều hook trên cùng một thân = hãng đang trả tiền cho thân đó".

### 3.3 Lọc viral thật

- **Outlier:** ≥ 700.000 view **và** ≥ 5× số người theo dõi của kênh. Chi tiết ở sổ tay mục 5. Mức Trung bình
  (phương pháp của người làm nghề, có số).
- **Chỉ so trong cùng một tài khoản.** Quy mô tài khoản lấn át mọi yếu tố khác. AutoClip chỉ kết luận từ các cặp
  trong cùng tài khoản, bài đăng ≥ 12 giờ tuổi, và loại bài có tỉ lệ like bất thường. Mức Cao về phương pháp.
  Khi so nhiều bài của một tài khoản/kênh: xếp hạng, so **1/3 nhóm đầu với 1/3 nhóm cuối**, bỏ nhóm giữa; mở từng tệp
  trước khi tả (nguồn: coreyhaines31/marketingskills — reverse-engineer-marketing/references/content-teardown.md, MIT · Thấp).
  Chỉ nhìn nhóm thắng thì không biết cái gì làm nó thắng.
- **Like rate cao mà view thấp** thường có nghĩa là video chỉ tới được fan cũ, chưa ra được người lạ (AutoClip).
  Mức Thấp–Trung bình. → Khi săn, đừng chọn video chỉ vì tỉ lệ like đẹp.
- **Quảng cáo trả tiền** thì view không đáng tin (tiền mua view). Với quảng cáo, dùng dấu hiệu ở 3.2
  (chạy lâu, nhiều phiên bản, đứng cao ở Top Ads theo CTR hoặc tỉ lệ xem 6 giây).

### 3.4 Trend bão hoà và mùa vụ

**Dấu hiệu bão hoà** (Kinh nghiệm nội bộ + sổ tay mục 4; chưa có nghiên cứu riêng):
- Cùng một câu hook xuất hiện ở ≥ 2 hãng. Ví dụ: "Every Christmas lover NEEDS this" có ở cả khung 01 và 03.
- View đỉnh của các bài cùng kiểu đang giảm, trong khi số bài cùng kiểu vẫn không giảm.
- Đường hashtag trên Creative Center đã đi qua đỉnh.
- Gặp trend bão hoà: vẫn được lưu **cấu trúc**, nhưng gắn nhãn `bão hoà` và đề xuất câu chữ hoặc góc mới.

**Mùa vụ:**
- **Q4 Mỹ.** NRF định nghĩa mùa lễ là **1/11–31/12**. Dự báo 2026: +4,2 %, khoảng **$1,013 nghìn tỉ**
  (NRF, 15/10/2026). Mức Cao.
  Theo khảo sát tháng 10 của NRF, 64 % người mua định dồn phần lớn việc mua sắm vào cuối tuần Lễ Tạ ơn.
  ⚠ Số này lấy từ bản tóm tắt kết quả tìm kiếm, chưa mở trang khảo sát.
  → Hôm nay đã 11/11. Hạn đặt hàng của Santa Spins là **12/12**. Khung Giáng sinh còn dùng được khoảng **4 tuần**.
  Khung mùa sau phải săn từ **tháng 9–10**.
- **Tết Việt Nam 2027.** Mùng 1 là **thứ Bảy 6/2/2027**, giao thừa là 5/2 (tháng Chạp thiếu, không có ngày 30).
  ⚠ Ngày này lấy từ kết quả tìm kiếm (thuvienphapluat, fptshop). Trang gốc chặn máy đọc → chưa kiểm trực tiếp.
  Chỉ dùng khi shop bán cho thị trường Việt Nam. Máy reel hiện chạy tiếng Anh, thị trường Mỹ.
- Với trend theo mùa, săn **trước mùa 6–8 tuần** để kịp qua các bước Học → Làm → Duyệt (Kinh nghiệm nội bộ, cần đo lại).

### 3.5 Mổ xẻ một quảng cáo theo cách của creative strategist

Các nguồn thực hành thống nhất ở mấy điểm sau. Mức Thấp–Trung bình: phần lớn là blog của các hãng bán công cụ.
- **Bộ phận của một quảng cáo:** hook (cách mở) · **angle** (góc nhìn chiến lược về khách hàng) · format (kiểu đóng gói)
  · proof (bằng chứng) · offer · CTA (playad.ai, selzee). **Angle ≠ hook**: một angle có thể mở bằng nhiều hook.
- **Đơn vị làm việc:** ma trận *persona × angle × hook*. Mỗi angle làm ra nhiều format.
- **Chẩn đoán bằng số** (Runneth, ý kiến người làm): thumbstop cao mà CTR thấp → sửa thân hoặc offer, giữ hook.
  Thumbstop thấp mà CTR cao → thử hook mới. Mốc người làm nghề hay dùng: giữ được ≥ 90 % ở giây 1, hook rate ~30 %.
  Sổ tay mục 7.6 có mốc của Motion. **Lấy trung bình của chính tài khoản làm mốc.**
- **Swipe file** (mhigrowthengine, Runneth). Chỉ lưu quảng cáo có dấu hiệu đang được bỏ tiền.
  Gắn nhãn theo **format** và **dạng hook**. Ghi **nguyên lý**, không chỉ ghi vẻ ngoài.
  Ghi giả thuyết rút ra và kết quả thử. Đang làm thì chỉ giữ 3–5 format.
  → Áp vào máy: **thư viện khung = swipe file đã bóc sâu**. Mỗi tệp khung có thêm phần "nhãn" ở đầu (mục 7).
- **Bóc kiểu dựng** (nguồn: coreyhaines31/marketingskills — video/references/edit-anatomy.md, MIT · Thấp):
  số cắt/giây là con số nói nhiều nhất về năng lượng của bản dựng. Ghi **mẫu** ("cắt cứng + đẩy vào mỗi câu"),
  không ghi 40 mốc cắt rời. Kết bằng 3–5 nước dựng đặc trưng — ai áp 5 luật đó lên tư liệu khác cũng ra đúng kiểu.
- **Các lớp hook (sổ tay §7.1) tách việc** (nguồn: coreyhaines31/marketingskills — ad-creative/references/hook-system.md, MIT · Thấp):
  hình dừng ngón tay, lời mở vòng tò mò, chữ neo ý cho người tắt tiếng. Khi bóc, ghi lớp nào làm việc gì; hai lớp nói
  cùng một ý là điểm yếu, ghi vào "Điểm yếu". Ở ranh giới HOOK | THÂN, ghi **tiền đề** hook hứa gì và giây 3–15
  nối tiếp tiền đề đó ra sao — biên kịch cần để thay hook mà giữ cầu nối.
- **Angle là phần sổ tay còn thiếu.** Bóc khung hiện chưa ghi angle. Từ gói này, ghi thêm một dòng
  "Angle: …" vào tầng 1. Ví dụ khung 01: *"món trang trí hot mà ai cũng mua được ở siêu thị lớn"*.

### 3.6 Pháp lý khi học từ video của người khác

Đây là nguyên tắc chung, không phải tư vấn luật.
- **Bản quyền không bảo vệ ý tưởng, khái niệm, hệ thống, phương pháp.** Nó cũng không bảo vệ **tên, tiêu đề,
  slogan, cụm từ ngắn**, nhưng những thứ này **có thể được bảo hộ dưới dạng nhãn hiệu** (U.S. Copyright Office FAQ). Mức Cao.
  → Cấu trúc khung và cơ chế hook thì học được. Thứ được bảo hộ là **phần thể hiện cụ thể**: hình, đoạn phim,
  nhạc, kịch bản viết ra.
- **Nhạc.** Trên TikTok, tài khoản Business chỉ dùng được **Commercial Music Library** trong ứng dụng. Thư viện này
  dùng được cho bài tự đăng và quảng cáo trên TikTok. Nhạc mang từ ngoài vào cần giấy phép riêng và phải qua bước
  xác nhận lúc đăng. Mức Trung bình (lấy từ blog Soundstripe và nguồn thứ cấp; trang trợ giúp chính thức chưa mở).
  → Ghi **mốc nhạc** (dạo nhạc, lời vào, beat) chứ **không ghi tên bài để dùng lại**.
- **Tên và logo của hãng khác** (Target, FrostGlow, MerrySpin): không đưa vào video của mình. Nếu là yếu tố LÕI
  thì ghi thành câu hỏi cho sếp (khung 02, 03 đã làm đúng).
- **Gương mặt và giọng người thật trong video mẫu:** không dùng lại. Chọn người mẫu theo M2.
  rea-video cũng ghi rõ: không dùng lại footage, nhạc, nhân vật hay hình ảnh người của người khác.
- **Nhãn nội dung AI:** đăng video có AI thì theo quy định của nền tảng và quy định địa phương (rea-video FAQ).
  Bước đăng thuộc về sếp. Vai chỉ cần ghi lên khung khi khung **đòi** cảnh trông như quay thật.

### 3.7 Bóc cách làm hình từng shot — học từ rea-video

rea-video (JuneYaooo/rea-video, Apache-2.0, ~6,2k sao, cập nhật 10/11/2026) bóc ngược một video thành
*"shot nào quay thật, shot nào AI, shot nào làm bằng code, và làm lại thế nào"*. Vai lấy từ đó **các trục bóc**
và **luật bằng chứng**. Công cụ thì chưa cài (mục 8).

| Trục | rea-video làm gì | Vì sao vai cần |
|---|---|---|
| **Cách làm hình từng shot** | Mỗi shot xếp vào 1 trong 11 loại: quay thật · AI video · avatar · 3D · 2D · stop-motion · phim · code/template · quay màn hình · ảnh tĩnh pan-zoom · khung tĩnh. Có thêm **AI chỉnh trên cảnh quay thật** (face swap, lip-sync, đổi nền, đổi đồ) | Tầng 3 hỏi "chuyển sang AI được không". Biết video mẫu **đã là AI** thì biết chắc là làm được. Biết shot là quay thật cận tay thì biết rủi ro Muse giữ hình |
| **Lớp đóng gói** (trên một trục thời gian, không chia theo shot) | Phụ đề đọc bằng OCR 2 khung/giây, căn mốc tới ~0,1 s. Kiểu chữ đo từ pixel (màu, viền, nền). Phân loại phụ đề / chữ hoa mỹ / tiêu đề / nhãn. Sticker, GIF, PiP. Xuất SRT/ASS | Bước G (chữ trên hình) hiện đang ghi tay. Khung 03 có **đổi chữ đúng 7,8 s**: loại mốc này cần đo chính xác |
| **Âm thanh** | Tách giọng / nhạc. BPM, giọng người hay AI, nhạc AI hay nhạc thư viện. Mỗi SFX gắn với một sự kiện hình (±0,2 s). Cắt có theo beat không | Sổ tay A đòi đo "khớp tiếng–hình". Hiện chỉ có âm lượng theo thời gian |
| **Cách quay thật** | Cỡ cảnh, máy (cầm tay / tripod / gimbal), 12 sơ đồ ánh sáng kèm danh sách thiết bị, màu | Bảng "cường độ hình ảnh" và tín hiệu định giá (sổ tay 0c) cần mô tả ánh sáng **đủ cụ thể để viết prompt** |

**Bài học về độ tin** (rea-video, eval/RESULTS.md và review.md):
- Độ chính xác khi chỉ dùng công cụ đo, tính theo thời lượng shot: **98–100 %** trên tệp gốc,
  nhưng chỉ **88,6 %** trên video đã bị nền tảng nén lại. Thêm bước xem ảnh (VLM hoặc agent) thì lên 99,6–100 %.
  Mức Trung bình: tập đánh giá nhỏ (15 + 16 + 10 video), do tác giả tự đo.
- **Video tải từ TikTok đã bị nén lại.** Nhiễu cảm biến bị xoá, nên "không có nhiễu" **không còn chứng minh được
  là AI**. Ca mở hộp quay thật: công cụ đoán 35 % là AI, xem ảnh xong còn 3 %.
  → Mọi kết luận "là AI" trên video tải về phải có bằng chứng nhìn thấy được: watermark, chữ rác, hình méo, sai vật lý.
- **Ca "AI + người thật"** (ai_daihuo): creator đưa clip tự quay và 2 ảnh sản phẩm vào Jimeng để sinh đoạn bán hàng.
  Lộ là AI nhờ **watermark Jimeng** và **chữ rác trên hộp quà**. 75 % là quay thật, 25 % là AI.
  → Đúng loại video máy mình sẽ làm. Đây cũng là bằng chứng cho luật logo của sổ tay 0f: **kiểm chữ trên hộp**.
- **Dung hợp, không ghi đè.** Kết quả của công cụ đo và của agent xem ảnh được **gộp lại**. Bằng chứng cứng
  (nhịp khung 24→30, nhãn AIGC) thắng cảm giác "trông như thật". VLM có thể **bịa lý do**: phải kiểm xem
  bằng chứng nó nêu có thật sự nhìn thấy trên ảnh không.
- Repo có **bộ nhớ sửa sai**: lần sau xem kỹ hơn những loại lỗi người dùng đã từng sửa. Áp vào máy: mục 10 (Sổ lỗi)
  chính là bộ nhớ đó.

### 3.8 Trục gắn nhãn cho thư viện khung — học ý từ OpenLucid

Nguồn: repo agidesigner/OpenLucid, thư mục `app/apps/`. Giấy phép là loại tự soạn (GitHub ghi "Other")
→ **chỉ học ý, không chép tệp**. Mức bằng chứng: Thấp, vì đây là bảng phân loại của một sản phẩm, không phải nghiên cứu.
Cái đáng học: mỗi nhãn đi kèm **"When to tag" + dấu hiệu nhận ra được trên hình**, nên hai người gắn nhãn sẽ ra cùng kết quả.

- **Dạng nội dung** (15 nhãn): product_demo · unboxing · review · tutorial · talking_head · scripted_skit ·
  live_snippet · green_screen · beat_sync · compilation_mashup · kol_mashup · image_with_text · ugc_authentic ·
  vlog · tvc. Ví dụ dấu hiệu: *beat_sync* = điểm cắt rơi đúng phách, nhạc là xương sống chứ không phải nhạc nền.
  *ugc_authentic* = khung hơi lệch, máy cầm tay, ánh sáng có sẵn trong phòng. *tvc* = màu đã chỉnh, diễn viên
  chuyên nghiệp, logo ở đầu và cuối.
- **Dạng khuyến mãi** (12 nhãn): flash_sale · bogo · bundle_discount · free_gift · free_shipping · first_purchase ·
  limited_qty · pre_order · time_limited · trial · full_refund · new_customer.
- **Khung kịch bản** (4 nhãn): hook_body_cta · pas · before_after_bridge · story_lesson_cta.

→ **Nhãn thư viện = dạng nội dung × dạng hook (sổ tay 7.4) × ngành**, thêm khuyến mãi nếu có. Một khung được mang
nhiều nhãn dạng nội dung. Khung 01 = unboxing + ugc_authentic (POV, cầm tay), khung 02 = unboxing + talking_head
(mở đầu), khung 03 = unboxing + ugc_authentic. Khuyến mãi: khung 02 bản Santa Spins mang **time_limited**
("order before Dec 12"). Cả ba **không** phải beat_sync: cú bật canh theo lúc lời hát vào, các cảnh khác không cắt theo phách.
Nhãn dùng tiếng Anh, đúng như id gốc, để máy lọc được và sau này đối chiếu được với các công cụ khác.

### 3.9 Kinh nghiệm nội bộ từ 3 khung

- Máy dò `scene` báo **cắt giả khi đèn bật** (khung 01, 7,9 s). `gvv boc` đã tự gắn cờ ⚠ cho điểm cắt nằm sát
  một lần bật sáng (`danhDauCatDoSang`, sát ≤ 0,25 s).
- Đèn LED **sáng dần ~0,5 s**, không bật một phát (CLAUDE.md, mục 24/10). Mốc cú bật là **điểm giữa đoạn tăng sáng**.
- Cả 3 khung đều trả lời câu hỏi ở **7,8–7,9 s** và kết thúc 3,7–4 s sau cú bật (sổ tay 0, 0b). ⚠ **Rút từ 3 video Giáng sinh Mỹ — bằng chứng của nhóm đó, KHÔNG phải luật chung** (`LUAT-CHUNG.md` mục 4). Thi 11/11: áp luật này cho phao điện làm agent khuyên giấu cú đổi đỏ khỏi giây đầu, ngược ý sếp.
- Khung 02 = thân khung 01 + hook khác. Đo bằng SSIM được **0,80–0,93**, so với đối chứng 0,39.
  → Phép so thân nên thành lệnh (mục 8).
- Câu hook giống nhau xuất hiện ở hai hãng khác nhau (khung 01 và 03) → đó là trend, không phải ý của riêng ai.

---

## 4. Quy trình làm việc

Mỗi bước ghi: **làm gì · công cụ · ra gì · cổng** (chưa qua cổng thì không sang bước sau).

0. **Đọc nền.** · Đọc sổ tay (mục 0–0f, 2, 4, 5, 5b, 7), CLAUDE.md (quy tắc M3), mục 10 của gói này.
   · Ra: không có tệp. · Cổng: nêu được 4 câu triết lý và thứ tự (a)→(d) mà không cần mở lại.
1. **Nhận brief và kiểm điều kiện đủ.** · Đọc brief, kiểm mục 6. · Ra: một dòng "đủ / thiếu X".
   · Cổng: có tệp video mẫu chạy được. Thiếu thì báo bằng câu mẫu ở mục 6 rồi dừng.
2. **(Chỉ khi brief bảo đi săn) Săn ứng viên.** · Creative Center Top Ads / Trends, Meta Ad Library (làm tay),
   TikTok / Reels. · Ra: 3–5 ứng viên, mỗi cái có link, lý do chọn (outlier / chạy lâu / nhiều phiên bản /
   đứng cao ở Top Ads), nhãn mùa và nhãn bão hoà. · Cổng: sếp chọn và **sếp tải video về** (chưa có công cụ tải).
3. **Đo bằng máy.** · `gvv boc <video>`. · Ra: thư mục `<tên>-boc/` gồm `do.json`, `luoi-XX.jpg`, `khung-nhap.md`.
   · Cổng: có lưới khung hình. Có lời theo từ, hoặc ghi rõ "chưa bóc lời".
4. **Soi và xác nhận (bước A).** · Xem từng lưới 4 khung/giây. Đoạn nào nghi ngờ thì cắt khung dày hơn.
   · Ra: bảng cảnh đã sửa: tách 1a/1b, gộp các "cắt" thật ra là đèn bật, cắt bỏ màn kết của nền tảng.
   · Cổng: **mọi** điểm cắt có dấu ✅ (thật) hoặc ✗ (giả, ghi lý do). Mốc cú bật đo bằng độ sáng.
5. **(a) Kịch bản mô tả video gốc.** · Viết bằng lời thường. · Ra: từng cảnh gồm giây, bối cảnh, đồ vật,
   hành động, ánh sáng / thời gian trong ngày, chữ, tiếng. Thêm **cách làm hình** của shot
   (quay thật / AI / …, kèm bằng chứng). · Cổng: người chưa xem video đọc xong có thể vẽ lại storyboard.
6. **Phân tích (bước B–G).** · Dùng sổ tay mục 0, 0b, 0c, 2, 7. · Ra: bốn câu kèm giây · bảng lý do ở lại theo
   từng giây · trục "cực" của từng nhịp · tên các dạng hook (4 lớp) · đường cảm xúc · STEPPS · tín hiệu thuật toán ·
   chữ trên hình kèm mốc đổi · **angle**. · Cổng: ô trống nào cũng phải có ghi chú "đây là chỗ yếu".
7. **(b) Vì sao viral, xếp LÕI / Phụ (bước H).** · Ra: bảng # · yếu tố · ở đâu (giây) · mức · vì sao.
   · Cổng: mỗi yếu tố LÕI trả lời được câu "bỏ nó thì mất cái gì".
8. **Tách HOOK / THÂN, đối chiếu thư viện.** · So với các khung đã có (hiện so bằng mắt; SSIM thì làm tay).
   · Ra: mốc ranh giới hook/thân. Nếu trùng thân thì ghi "thân = khung NN" và chỉ bóc phần hook.
   · Cổng: ranh giới có số giây cụ thể.
9. **Nguyên liệu khung này đòi + tầng 3 sơ bộ.** · Ra: danh sách nguyên liệu (thiếu thì M0 chặn) ·
   phán quyết ✅ / 🔁 / ⚠ / ❓ cho từng cảnh · **câu hỏi cho sếp** (pháp lý, nơi bán, nhãn hiệu) ·
   loại sản phẩm hợp và không hợp với khung. · Cổng: không có dòng nào thay yếu tố LÕI.
10. **(c) Kịch bản cho sản phẩm.** Chỉ làm khi brief có sản phẩm. · Cùng cảnh, chỉ đổi đồ vật.
    · Cổng: đối chiếu từng yếu tố LÕI ở (b): còn đủ cả.
11. **Lưu vào thư viện và bàn giao.** · Ghi `khung/reel-NN-<hãng>-<đặc điểm>.md` theo khuôn ở mục 7.
    Thêm nhãn ở đầu tệp. · Cổng: qua hết bảng kiểm mục 5.

---

## 5. Bảng kiểm trước khi giao

- [ ] Đã đọc sổ tay và sổ lỗi (mục 10) ngay trong phiên này.
- [ ] Phần kỹ thuật ghi đủ: thời lượng, độ phân giải, fps, **giây kết thúc nội dung thật** (bỏ màn kết nền tảng).
- [ ] Mọi điểm cắt đã xác nhận ở ≥ 4 khung/giây. Không còn "cắt" nào thật ra là đèn bật.
- [ ] (a) viết **trước** (b). (b) viết **trước** (c). Không có prompt nào trong tệp.
- [ ] Bốn câu triết lý đều có giây. Bảng lý do ở lại phủ từ 0 tới hết.
- [ ] Mỗi yếu tố có mức LÕI hoặc Phụ, có lý do. Tầng 3 không thay yếu tố LÕI nào.
- [ ] HOOK và THÂN tách bằng số giây. Đã so với thư viện.
- [ ] Có mục "Nguyên liệu khung này đòi".
- [ ] Mỗi shot ghi cách làm hình. Chỗ chưa chắc ghi "⚠ nghiêng về X ~N %".
- [ ] Chữ trên hình: nguyên văn kèm mốc hiện và mốc đổi. Nhạc: mốc dạo, mốc lời/beat vào, có cắt theo beat không.
- [ ] Mọi dòng âm thanh có cột nguồn (đo / whisper / nghe / suy từ hình ⬜). Dòng ⬜ đã nằm trong "Chỗ chưa chắc".
- [ ] Có số cắt/giây và 3–5 nước dựng đặc trưng. Có tiền đề hook + cách giây 3–15 nối tiền đề.
- [ ] Có dòng Angle. Có nhãn mùa và nhãn bão hoà.
- [ ] Có mục "Không lấy": nhạc, câu chữ, hình, logo, gương mặt, tên cửa hàng.
- [ ] Mọi lo ngại đã viết thành **câu hỏi cho sếp**, không tự quyết.
- [ ] Không có câu nào hứa "đúng khung thì viral".

---

## 6. Điều kiện đủ để bắt đầu

| Cần | Thiếu thì làm gì | Câu báo mẫu |
|---|---|---|
| **Tệp video mẫu tải về được** (bắt buộc) | Dừng. Không bóc từ link hay ảnh chụp màn hình | "Em chưa có tệp video nên chưa bóc được. Anh tải giúp em video ở link [X] (bản gốc, không quay lại màn hình) rồi để vào `thu-nghiem/khung/reel-NN/goc.mp4`." |
| Brief: bóc để lưu thư viện, hay bóc cho một sản phẩm cụ thể | Mặc định là lưu thư viện, bỏ bước (c) | "Brief chưa nói sản phẩm nào, em bóc để lưu thư viện, chưa viết kịch bản cho sản phẩm." |
| Đuôi nội dung không bị cắt mất | Bóc phần có. Ghi "có thể thiếu đuôi" | "Video dừng ở 9,2 s, giữa một cảnh. Có thể bản tải về bị cắt, anh xem có bản đầy đủ không?" |
| Link gốc, view, follower | **Không chặn**, ghi ⬜ | (không cần báo) |
| (Khi đi săn) Đăng nhập Creative Center | Không đăng nhập chỉ thấy 5 quảng cáo → nhờ sếp | "Top Ads cần đăng nhập mới xem đủ. Anh mở giúp và lọc: Region = US, Industry = [X], 30 ngày gần nhất, sắp xếp theo 6-second view rate." |
| Video đã bị nén lại (bản tải từ TikTok) | Vẫn bóc. Kết luận "AI hay thật" phải có bằng chứng nhìn thấy được | "Video là bản nền tảng đã nén, nên em chỉ kết luận AI hay quay thật ở những chỗ có dấu hiệu nhìn thấy được." |

---

## 7. Đầu vào · khuôn đầu ra · tiêu chí xong

**Đầu vào:** brief (mục đích, sản phẩm nếu có, kênh) + tệp video mẫu.
Thêm nếu có: link, view, follower, ngày đăng, nguồn (Top Ads / Ad Library / feed).

**Khuôn tệp khung** (`khung/reel-NN-<hãng>-<đặc điểm>.md`). Viết theo thứ tự này. Mục nào đã có trong
`khung-nhap.md` do `gvv boc` sinh ra thì giữ nguyên và điền vào.

```markdown
# Khung NN — "<chữ hook nguyên văn>" (<hãng>, <đặc điểm>)

Nhãn: dạng-nội-dung=<unboxing+ugc_authentic…> (mục 3.8) · hook=<dạng1+dạng2> (sổ tay 7.4) · ngành=<…>
· khuyến-mãi=<time_limited/không> · khung-kịch-bản=<hook_body_cta/…> · angle=<…> · mùa=<Giáng sinh/quanh năm/…>
· bão hoà=<chưa/đang/đã> · thân=<riêng | = khung MM> · nguồn=<Top Ads/Ad Library/feed/sếp gửi>

Bóc <ngày> từ <tệp>. Bản chép: thu-nghiem/khung/reel-NN/goc.mp4 (gitignore).

## Bằng chứng viral (không bắt buộc)
| Nguồn · tài khoản · loại (quảng cáo hãng / UGC) | Link | View · follower · ngày | Dấu hiệu khác (chạy N ngày, N phiên bản) |

## Đo bằng máy
Kỹ thuật · nội dung thật 0–X s · điểm cắt (đã xác nhận ✅/✗) · bật sáng · âm lượng · lời theo từ.

## Tầng 1 — Format
Format · **Angle** · chữ trên hình (nguyên văn + mốc đổi) · tiếng (mốc dạo / lời vào / beat; cắt theo beat?) · cú chốt (giây) · CTA.
Kiểu dựng: số cắt/giây · đường nhịp (nhanh–chậm–nhanh?) · **3–5 nước dựng đặc trưng** viết thành luật dùng lại được (mục 3.5).

## Tầng 2 — Cảnh theo giây
| # | Giây | Cỡ cảnh · máy | **Cách làm hình** (thật/AI/… + bằng chứng) | Vai trò (HOOK/thân/bật/chứng minh) | Hình | Ánh sáng | Vì sao hiệu quả |
Dòng nhịp: N cảnh / X s, dài nhất, ngắn nhất. Ranh giới HOOK | THÂN: X s.

## (a) Kịch bản mô tả — video gốc
## Bốn câu của triết lý (kèm giây)
## Lý do ở lại theo từng giây
## Cường độ hình ảnh — trục "cực" mỗi nhịp; bối cảnh định giá
## Lớp đóng gói và âm thanh — chữ/sticker theo trục thời gian; SFX ↔ sự kiện hình
| Giây | Âm thanh (giọng / nhạc / SFX / im) | Nguồn: đo (`gvv boc`) · whisper (`boc-loi.py`) · nghe (tệp nào, giây nào) · suy từ hình ⬜ |
Dòng ghi "suy từ hình ⬜" không được dùng làm căn cứ LÕI; đưa vào "Chỗ chưa chắc" kèm thứ cần để đo.
## Điểm yếu
## (b) Vì sao viral — xếp hạng LÕI / Phụ
**Nguyên liệu khung này đòi:** …
## Tầng 3 — Phán quyết chuyển sang AI (+ câu hỏi cho sếp) · loại sản phẩm hợp / không hợp
## (c) Kịch bản mô tả cho sản phẩm (chỉ khi brief có sản phẩm)
## Không lấy
## Chỗ chưa chắc (⚠ nghiêng về X ~N %, cần gì để chắc)
## Ước tính hạn mức (số cảnh → số clip)
```

**Tiêu chí xong:** đã đi đủ bước 0 và A–H của sổ tay · qua hết bảng kiểm mục 5 · tệp nằm trong `khung/`
· đã gửi bàn giao (mục 11).

---

## 8. Công cụ

| Công cụ | Dùng khi nào | Hiện trạng | Nên có thêm |
|---|---|---|---|
| `gvv boc <video>` (repo `gen-video-viral`) | Bước 3. Điểm cắt theo 2 ngưỡng (0,3 / 0,15), bật sáng, âm lượng, lưới 4 khung/giây, lời theo từ (faster-whisper), bản nháp khung | ✅ | Thêm cột "cách làm hình", lớp chữ OCR, BPM và khớp beat (học theo rea-video) |
| Xem ảnh khung hình (agent đọc ảnh) | Bước 4–5, xác nhận cắt, đọc chữ trên hình | ✅ | Lệnh cắt khung dày (10 khung/giây) cho một đoạn, kiểu `rea-video tiles` |
| `cong-cu/boc-loi.py` | Gọi bên trong `gvv boc` | ✅ | — |
| **rea-video** (JuneYaooo, Apache-2.0) | Bóc cách làm hình từng shot, lớp đóng gói (OCR, SRT/ASS), tách giọng / nhạc, BPM, SFX ↔ hình, ánh sáng | ⬜ chưa cài, **cần sếp duyệt** | Ứng viên bổ sung, hoặc thay một phần `gvv boc`. Chạy offline miễn phí được. Không gửi video cho VLM của bên thứ ba khi chưa duyệt (các ca mẫu của họ gọi Gemini qua một endpoint trung gian). Cần ffmpeg và Python ≥ 3.10. Lần đầu tải model tách tiếng ~67 MB |
| Tải video từ link | Bước 2–3 | ⬜ sếp tải tay | `yt-dlp` hoặc tương đương. Cần sếp quyết vì liên quan điều khoản nền tảng |
| TikTok Creative Center (Top Ads, Trends) | Bước 2. Tìm mẫu, kiểm mốc tương tác theo giây, đo tuổi trend | ⬜ làm tay, cần sếp đăng nhập | Bảng tra cố định: bộ lọc mặc định cho từng ngành |
| Meta Ad Library | Bước 2. Tìm quảng cáo chạy lâu, có nhiều phiên bản | ⬜ làm tay | Ad Library API: có lọc theo quốc gia, trạng thái, ngày. Chưa kiểm quyền truy cập cho quảng cáo thường |
| Thư viện khung `khung/` | Bước 8, 11 | 🟡 chỉ là thư mục, chưa có chỉ mục | Tệp chỉ mục (một dòng một khung, gồm các nhãn ở mục 7) để lọc theo dạng nội dung × hook × ngành × mùa. Bảng nhãn lấy theo mục 3.8 |
| So thân (SSIM giữa hai video lệch giờ) | Bước 8 | ⬜ đã làm tay một lần (khung 02) | Lệnh `gvv so-than a.mp4 b.mp4` → độ lệch giờ + SSIM theo giây |
| Tính outlier | Bước 2 | ⬜ | Tính tay theo công thức ở sổ tay mục 5 là đủ |

---

## 9. Ví dụ tốt / ví dụ hỏng — từ 3 khung thật

**Hỏng: bản bóc đầu của khung 01.** Thay "kệ siêu thị + hộp đẹp" bằng "hộp giao trước cửa" vì lo Muse vẽ sai
chữ và lo ngụ ý bán lẻ. Đã bỏ qua bước (b), tầng 3 tự quyết. Kết quả: mất cú hook "store find", là yếu tố LÕI.
→ Bài học: (b) trước tầng 3; lo ngại = câu hỏi.

**Hỏng (nhỏ): cũng khung 01, bản đầu.** Soi 2 khung/giây nên gộp nhầm 1a/1b. Coi hai lần lắp ở hai bức tường
là một. Đếm cú bật đèn 7,9 s là một lần "cắt". → Bài học: ≥ 4 khung/giây, tự xác nhận từng điểm.

**Tốt: khung 01, bản sửa.** Có bảng LÕI/Phụ, mỗi dòng có lý do. Bảng lý do ở lại không có ô trống.
Có "nguyên liệu khung này đòi" (ảnh hộp đóng, trạng thái tắt → bật). Có "Không lấy" kèm **mốc nhạc** thay cho
tên bài. Tầng 3 ghi rõ cảnh 7–9 🔁 "nhiều phòng → nhiều người" kèm lý do: sản phẩm chỉ đặt ở tủ lạnh.

**Tốt: khung 02.** Phát hiện **trùng thân** bằng số đo (SSIM 0,80–0,93 so với đối chứng 0,39) chứ không bằng
cảm giác. Nhờ vậy chỉ bóc 3,4 s hook. Yếu tố LÕI "RUN to TARGET" sai sự thật với shop chỉ bán online:
không tự thay mà nêu phương án cho sếp. Câu cuối dùng hạn giao hàng **có thật** (Dec 12).

**Tốt: khung 03.** Nhìn ra **mốc đổi chữ trùng đúng cú bật** (7,8 s) và cơ chế "từ khoá bình luận = tên hãng".
Nhận ra câu hook trùng khung 01 → **trend dùng chung giữa các hãng**. Hỏi sếp về biển Target thay vì tự xoá.

**Còn thiếu ở cả ba (làm tốt hơn từ nay):** không ghi angle · không ghi cách làm hình từng shot · không đo
cắt theo beat · bằng chứng viral ⬜ toàn bộ · chưa có nhãn bão hoà dạng máy đọc được.

---

## 10. Sổ lỗi thường gặp

| Lỗi | Dấu hiệu | Cách tránh |
|---|---|---|
| Thay yếu tố LÕI ở tầng 3 | Kịch bản (c) thiếu một yếu tố có ở (b) | Đối chiếu (c) với (b) từng dòng |
| Tin máy dò cắt | Có "cắt" ngay lúc đèn bật hoặc cửa mở | Xem lưới. `gvv boc` gắn cờ ⚠ "có thể là đèn" |
| Soi thưa | Một cảnh "dài" thật ra chứa 2 hành động | ≥ 4 khung/giây; đoạn quan trọng cắt khung dày hơn |
| Tính cả màn kết nền tảng | Video "15,8 s", nội dung thật 11,8 s | Luôn ghi "nội dung thật 0–X s" |
| Nhảy thẳng tới prompt | Có prompt trong tệp khung | Vai này không viết (d) |
| Kết luận "là AI" vì hình mượt hoặc ít nhiễu | Video tải về đã bị nén lại | Phải có bằng chứng nhìn thấy được: watermark, chữ rác, hình méo, sai vật lý |
| Kết luận chắc chắn khi chưa chắc | Không có dòng ⚠ nào trong cả tệp | Ghi "nghiêng về X ~N %" và cái còn thiếu |
| Hứa viral từ view của video mẫu | "Video 2 triệu view nên khung này chắc ăn" | Sổ tay 5b: view mẫu nói rất ít; chỉ đo trên tài khoản của mình |
| Chép chữ hoặc nhạc | Câu nguyên văn trong (c); ghi tên bài để dùng lại | Mục "Không lấy"; ghi mốc nhạc, viết câu mới cùng vai trò |
| Bỏ sót tên hãng hoặc cửa hàng khác trong hình | Biển Target, logo đối thủ lọt vào (c) | Thành câu hỏi cho sếp |
| Gom nhiều khung một lúc | 3 khung bóc dở dang | Từng khung một (CLAUDE.md 23/10) |
| Bóc trend đã bão hoà mà không gắn nhãn | Câu hook đã thấy ở ≥ 2 hãng | Nhãn `bão hoà`; đề xuất góc mới |
| Săn trend mùa quá muộn | Khung Giáng sinh hoàn thành sau 1/12 | Săn trước mùa 6–8 tuần |
| Tả âm thanh từ hình | "Có tiếng nhạc vui" ở cảnh tiệc, không có số đo | Cột nguồn âm thanh (khuôn mục 7); không đo được thì ghi ⬜ (kết quả thi 11/2026) |

Gặp lỗi mới thì thêm một dòng vào đây (đây là "bộ nhớ sửa sai" của vai).

---

## 11. Bàn giao

**Cho ai:** vai viết kịch bản / prompt (bước (c)–(d)), và trưởng phòng / sếp nếu có câu hỏi.

**Gửi gì:** đường dẫn tệp khung + 5 dòng:
1. Một câu: khung là gì (format + angle + hook), dài bao nhiêu, cú bật ở giây nào.
2. Các yếu tố LÕI, tối đa 5, mỗi cái một dòng.
3. Nguyên liệu khung đòi, đánh dấu cái đã có ✅ và cái thiếu ⬜.
4. Câu hỏi cho sếp, nếu có, đánh số để sếp trả lời ngắn.
5. Trùng thân với khung nào, nếu có. Nhãn mùa và nhãn bão hoà.

**Không gửi:** dán cả tệp khung vào cuộc trò chuyện, hay `do.json`.

**Nhận lại (vòng Đánh giá → Đúc kết):** khi video làm từ khung có view thật, ghi vào khung một dòng
"Kết quả: video vNN, X view sau 48 giờ, so với trung vị tài khoản". Thắng hoặc thua rõ ràng thì cập nhật sổ tay
(sổ tay mục 6) và sổ lỗi ở mục 10.

---

## 12. Câu hỏi mở / cần nghiên cứu tiếp

**Cần sếp quyết:**
1. **Cài rea-video?** Chạy offline, miễn phí, Apache-2.0. Có VLM thì chính xác hơn trên video đã bị nén,
   nhưng phải gửi khung hình cho bên thứ ba. Đề xuất: cài, **chỉ chạy offline**, dùng agent tự xem ảnh thay cho VLM.
2. **Công cụ tải video từ link** (`yt-dlp`): có dùng không, hay sếp vẫn tải tay?
3. Vai có **tự đi săn** (bước 2) không, hay chỉ bóc video sếp đưa? Nếu tự săn thì cần ai đăng nhập Creative Center.
4. Bước (c) do vai này viết hay do vai viết kịch bản? Gói này đang để: chỉ viết khi brief có sản phẩm.
5. Có thêm dòng **Angle** và cột **Cách làm hình** vào khuôn khung chính thức không? Nếu có thì sửa `gvv boc`
   (`vietNhap`) và CLAUDE.md (quy tắc M3).

**Cần nghiên cứu tiếp:**
- Trang trợ giúp chính thức của Meta về Ad Library: máy đọc bị chặn (403). Các ô dữ liệu đang lấy qua Buffer.
- Cách Creative Center tính "popularity" và tuổi của trend: chưa thấy tài liệu chính thức.
- Dấu hiệu bão hoà: chưa có nghiên cứu, chỉ có kinh nghiệm. Cần đo lại trên chính các khung của mình.
- Ad Library API với quảng cáo thường (không chính trị): có lấy được ngày bắt đầu và số phiên bản không?
- Ngày Tết 2027 và lịch nghỉ: kiểm ở trang chính thức khi shop cần làm mùa Tết.

---

## Nguồn

Đã mở thật ngày 11/11/2026, trừ chỗ ghi khác.

**Nội bộ**
- `../KIEN-THUC-VIRAL.md` (toàn bộ) · `../CLAUDE.md` (quy tắc M3) · `../khung/reel-01-frostglow.md`, `reel-02-frostglow-hook-me.md`, `reel-03-merryspin-tu-lanh.md`
- `D:/my project/gen-video-viral/src/boc.ts`, `src/do-tin-hieu.ts`

**Chính thức**
- TikTok, About Top Ads — https://ads.tiktok.com/help/article/top-ads?lang=en
- TikTok, How to use the Top Ads Dashboard — https://ads.tiktok.com/resources/help/article/how-to-use-the-top-ads-dashboard?lang=en
- TikTok, Trends — https://ads.tiktok.com/help/article/how-to-use-trends · https://ads.tiktok.com/help/article/trend-discovery?lang=en
- Meta Transparency Center, Ad Library tools — https://transparency.meta.com/en-us/researchtools/ad-library-tools
- U.S. Copyright Office, FAQ "What does copyright protect?" — https://www.copyright.gov/help/faq/faq-protect.html
- NRF, dự báo mùa lễ 2026 (15/10/2026) — https://nrf.com/media-center/press-releases/nrf-forecasts-2026-holiday-sales-growth-as-consumers-remain-resilient

**Nghiên cứu / repo** (đọc qua `gh api`, chỉ đọc)
- AutoClip Research Note #1 (09/10/2026) — https://github.com/zhouxiaoka/autoclip/blob/main/docs/research/2026-10-what-drives-views/article-en.md
- rea-video (JuneYaooo, Apache-2.0, push 10/11/2026): README.md, docs/what-it-detects.md, skills/rea-video/SKILL.md, references/taxonomy.md, review.md, audio.md, eval/RESULTS.md, docs/cases/unboxing/report_en.md, docs/cases/ai_daihuo/report_en.md — https://github.com/JuneYaooo/rea-video

- OpenLucid (agidesigner, giấy phép tự soạn, chỉ học ý): `app/apps/content_forms/` (đã đọc product_demo, beat_sync, unboxing, ugc_authentic, tvc, vlog, review), danh sách tệp trong `campaign_types/` và `script_structures/` — https://github.com/agidesigner/OpenLucid

**Bộ skill tải về** (đọc 11/11/2026, coi là dữ liệu, không cài) — coreyhaines31/marketingskills (MIT):
`video/references/edit-anatomy.md`, `ad-creative/references/hook-system.md`,
`reverse-engineer-marketing/SKILL.md` + `references/content-teardown.md`

**Thực hành (blog, mức Thấp–Trung bình)**
- Buffer, Meta Ad Library 101 — https://buffer.com/resources/meta-ad-library/
- Runneth (trước là Motion), Creative strategy — https://runneth.com/blog/creative-strategy
- MHI Growth Engine, DTC ad creative swipe file — https://mhigrowthengine.com/blog/dtc-ad-creative-swipe-file/

**Chỉ thấy qua kết quả tìm kiếm, chưa mở được trang (chưa kiểm)**
- Meta Business Help, Giới thiệu Thư viện quảng cáo — https://www.facebook.com/business/help/2405092116183307 (trang trả về rỗng) · https://www.facebook.com/ads/library/ (403)
- U.S. Copyright Office, Circular 33 — https://www.copyright.gov/circs/circ33.pdf (tải được tệp nhưng không đọc được PDF)
- Ngày Tết 2027 — thuvienphapluat.vn, fptshop.com.vn (403)
- TikTok Commercial Music Library — soundstripe.com, ads.tiktok.com/business/zh/blog/audio-library-royalty-free-music (chỉ đọc đoạn tóm tắt)
- Khung hook / angle / proof — playad.ai/docs/learn/ad-angle, selzee.com/blog/ad-intelligence-workflow, hawky.ai/blog/winning-ad-analysis (chỉ đọc đoạn tóm tắt) · affiliatetools-co.pages.dev (không phân giải được tên miền)
- Khảo sát NRF tháng 10 (64 % chờ cuối tuần Lễ Tạ ơn) — chỉ đọc đoạn tóm tắt
