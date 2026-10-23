# Máy làm Reel — Kế hoạch sản phẩm

> Bản chép từ tài liệu gốc ngày 23/10/2026, vá lại cùng ngày theo bản gốc rev 62 (quyết định Muse / độ dài). **Bản gốc sống ở Claude Docs:**
> https://claude.ai/artifact/AMhN1DQDB32o14HAAmA1da — có sơ đồ vẽ, cột ưu
> tiên chọn được, bình luận. Sửa thì sửa ở bản gốc rồi chép lại đây, đừng để
> hai bản lệch nhau. Bốn sơ đồ không chép được sang markdown; bản tĩnh của
> sơ đồ kiến trúc nằm ở `thiet-ke/so-do-ban-6.html`.

## 1. Tổng quan

Máy làm Reel là một tài sản AI độc lập: đưa vào một sản phẩm và một reel viral mẫu, nhận về video dọc 9:16 tiếng Anh (Mỹ) trong một thư mục. Nó không gắn với cửa hàng hay ngách nào, dùng cho mọi loại sản phẩm; nguồn sản phẩm chính là các cửa hàng Shopify.

**Vấn đề.** Một reel bán hàng tốn công quay, dựng, lồng tiếng. Các công cụ mã nguồn mở đã đọc mã đều hụt ở hai chỗ: nhân bản cấu trúc reel viral thì làm hời hợt, và không công cụ nào viết lại lời theo video đã sinh.

**Mục tiêu v1**

1. Từ một sản phẩm và một reel mẫu, ra một video đăng được mà không cần sửa tay ngoài việc xem lại.
2. Đổi sản phẩm thì chỉ sinh lại phần đổi, dùng lại khung đã bóc.
3. Chạy hàng loạt: một khung cho nhiều sản phẩm.

**Trong phạm vi**

- Ngôn ngữ en-US: lời thoại, giọng đọc, phụ đề.
- Mọi ngách sản phẩm. Nguồn sản phẩm: Shopify Admin API, nhập tay. Nguồn reel mẫu: TikTok, Facebook Reels, kho quảng cáo, tải tay.
- Đầu ra: thư mục video kèm đường dẫn, gồm cả reel tự đăng lẫn video quảng cáo; một job xuất nhiều bản cắt.
- Khung là skill Hypit chạy trong Claude Code. Sinh video có hai đường ngang hàng, người dùng chọn theo từng job: Muse (miễn phí, hạn mức tuần) hoặc Hypit + Seedance (trả tiền, chạy tự động). Làm trọn luồng bằng Muse trước.

**Không làm**

- Tự đăng lên mạng xã hội. Chủ dự án tự đăng tay.
- Tiếng Việt trong v1. Đây là gói tuỳ chọn làm sau.
- Dịch vụ cho nhiều khách cùng dùng (SaaS). Giấy phép Hypit cấm.
- Chép nhạc gốc của reel mẫu.
- Giao tài khoản, cookie hay mật khẩu cho dịch vụ trung gian.
- Đo doanh thu. Công cụ dừng ở thư mục video.

## 2. Người dùng và bối cảnh

Người dùng v1 là chính chủ dự án, nên công cụ ưu tiên dòng lệnh và Claude Code trước, giao diện web sau.

| Người dùng | Là ai | Cần gì |
| --- | --- | --- |
| Chủ dự án (chính) | Vừa lập trình viên TypeScript, vừa người làm nội dung; dùng Claude Code hằng ngày | Ra video nhanh, sửa được từng cảnh, biết trước chi phí |
| Người làm nội dung hộ (sau) | Làm video cho nhiều cửa hàng Shopify của khách, chạy máy trong tay mình | Chạy hàng loạt, tách thư mục theo cửa hàng |

**Kịch bản dùng**

1. **Một video.** Chọn một sản phẩm từ cửa hàng Shopify, chọn một khung trong thư viện, chọn người mẫu, xem ước tính chi phí rồi chạy. Nhận đường dẫn thư mục khi xong.
2. **Khung mới từ reel viral.** Dán link TikTok, Facebook Reels, quảng cáo, hoặc tải tệp lên; máy kiểm reel rồi bóc khung ba tầng, chủ dự án xem và sửa tay khung trước khi lưu vào thư viện.
3. **Một khung, nhiều sản phẩm.** Chọn một khung và đánh dấu nhiều sản phẩm. Mỗi sản phẩm ra một thư mục.
4. **Nhiều biến thể một sản phẩm.** Đổi câu hook, người mẫu hoặc giọng đọc để tự đăng thử so sánh.
5. **Sửa sau khi xem.** Chưa ưng câu hook thì sửa lời; máy chỉ sinh lại tiếng và dựng lại. Một cảnh lệch hình thì sinh lại đúng cảnh đó.

## 3. Yêu cầu

Có 32 yêu cầu chức năng, 26 cái bắt buộc cho v1. FR-25 đến FR-31 thêm sau, cho phần sơ chế và thư viện khung; ngày 23/10 FR-22 (đường Muse) lên bắt buộc và thêm FR-32 (nhiều bản cắt). Cột ưu tiên chọn lại được ngay trong bảng.

### Yêu cầu chức năng

| Mã | Yêu cầu | Nhóm | Ưu tiên |
| --- | --- | --- | --- |
| FR-01 | Kết nối một hoặc nhiều cửa hàng Shopify bằng token Admin API; liệt kê và tìm sản phẩm theo tên, collection | Đầu vào | Bắt buộc |
| FR-02 | Lấy tên, mô tả, giá, biến thể, ảnh của sản phẩm | Đầu vào | Bắt buộc |
| FR-03 | Nhập sản phẩm tay: tên, mô tả, giá, tải ảnh lên | Đầu vào | Bắt buộc |
| FR-04 | Dán link trang sản phẩm để lấy dữ liệu | Đầu vào | Để sau |
| FR-05 | Thư viện người mẫu: tải ảnh, đặt tên, đánh dấu đã có đồng ý dùng gương mặt | Đầu vào | Bắt buộc |
| FR-25 | Kiểm ảnh sản phẩm: độ nét, kích thước, tỉ lệ sản phẩm trong khung, chữ và watermark, góc chụp | Sơ chế | Bắt buộc |
| FR-26 | Sơ chế ảnh: tách nền, phóng ảnh, cắt, xoá chữ; ra tờ sản phẩm nhiều góc kèm kích thước thật | Sơ chế | Bắt buộc |
| FR-27 | Bản tóm tắt sản phẩm theo khuôn; trường trống thì hỏi người dùng; kiểm chéo mô tả với ảnh | Sơ chế | Bắt buộc |
| FR-28 | Kiểm ảnh người mẫu, sinh tờ nhiều góc, lấy vector khuôn mặt để so ở đầu ra | Sơ chế | Bắt buộc |
| FR-30 | Trạm kiểm dừng cho xem tờ sản phẩm trước khi tiêu tiền; chế độ duyệt hoặc tự chạy | Sơ chế | Bắt buộc |
| FR-06 | Nhận reel mẫu từ tệp tải lên | Thư viện khung | Bắt buộc |
| FR-07 | Nhận reel mẫu từ link TikTok, Facebook Reels, TikTok Creative Center, Meta Ad Library | Thư viện khung | Bắt buộc |
| FR-08 | Bóc khung ba tầng: format; cảnh theo giây kèm vai trò và lý do hiệu quả; phán quyết chuyển sang AI từng cảnh và loại sản phẩm hợp; tách khung thành HOOK và THÂN ghép được, nhận ra hai reel dùng chung một thân | Thư viện khung | Bắt buộc |
| FR-09 | Lưu khung, kèm bằng chứng viral nếu có (link, lượt xem, ngày; không bắt buộc vì reel đưa vào đã được chọn lọc); xem, sửa tay, lọc theo format và loại sản phẩm | Thư viện khung | Bắt buộc |
| FR-29 | Kiểm reel mẫu: kỹ thuật (dọc, phân giải, độ dài) và có chuyển được sang sản phẩm khác không | Thư viện khung | Bắt buộc |
| FR-31 | Gợi ý khung hợp cho một sản phẩm; loại khung có cảnh bất khả thi với sản phẩm đó | Thư viện khung | Nên có |
| FR-10 | Sinh kịch bản .svml từ bản tóm tắt sản phẩm, tờ người mẫu, khung; số cảnh và mốc cắt khớp khung | Kịch bản | Bắt buộc |
| FR-11 | Sinh video từng cảnh với tờ sản phẩm làm tham chiếu; khung cuối cảnh trước làm khung đầu cảnh sau | Sinh cảnh | Bắt buộc |
| FR-12 | Kiểm tự động mỗi cảnh (độ dài, khung đen, đứng hình, có sản phẩm, mặt người mẫu) và sinh lại cảnh hỏng, có trần số lần | Sinh cảnh | Bắt buộc |
| FR-13 | Sinh lại một cảnh lẻ theo yêu cầu | Sinh cảnh | Bắt buộc |
| FR-14 | Viết lại lời theo video đã ghép, dựa trên bảng ảnh có nhãn thời gian | Lời và tiếng | Bắt buộc |
| FR-15 | Đọc lời en-US, chọn giọng; lời dài hơn cảnh thì viết ngắn lại | Lời và tiếng | Bắt buộc |
| FR-16 | Nhạc nền từ kho có giấy phép, tự hạ nhạc khi có giọng; xuất thêm bản không nhạc | Lời và tiếng | Bắt buộc |
| FR-17 | Dựng MP4 1080×1920, phụ đề cháy hình, logo, khung kêu gọi (CTA) | Dựng | Bắt buộc |
| FR-18 | Lưu thư mục đầu ra: video, bản không phụ đề, ảnh bìa, lời thoại, kịch bản, báo cáo chi phí | Đầu ra | Bắt buộc |
| FR-19 | Chạy hàng loạt: một khung cho nhiều sản phẩm | Đầu ra | Nên có |
| FR-20 | Nhiều biến thể một sản phẩm: đổi hook, người mẫu, giọng; một thân ghép nhiều hook, chỉ sinh lại phần hook | Đầu ra | Nên có |
| FR-32 | Một job xuất nhiều bản cắt theo loại đầu ra: bản đầy đủ theo khung, bản ≤ 15 giây cho quảng cáo Meta, bản 6 giây tuỳ chọn; chỉ dựng lại từ cảnh đã sinh, không sinh thêm | Đầu ra | Bắt buộc |
| FR-21 | Ước tính chi phí trước khi chạy, ghi chi phí thật, dừng khi vượt trần ngân sách; với đường Muse, ước tính hạn mức tuần theo số cảnh của khung (mỗi cảnh một clip) | Chi phí | Bắt buộc |
| FR-22 | Chọn đường sinh video theo từng job: Muse (chạy bên trong Muse, mỗi cảnh một clip \~10 giây cắt đúng mốc của khung) hoặc Hypit + Seedance. Làm đường Muse trước | Sinh cảnh | Bắt buộc |
| FR-23 | Gói tiếng Việt: giọng vi-VN, font có dấu, lời tiếng Việt | Mở rộng | Để sau |
| FR-24 | Xuất bản nháp CapCut để sửa tay | Mở rộng | Để sau |

### Yêu cầu phi chức năng

| Mã | Yêu cầu | Vì sao |
| --- | --- | --- |
| NFR-01 | Job chạy nền, sống qua khởi động lại; nối tiếp job của nhà cung cấp theo ID, không gửi lại lệnh tốn tiền | Một video gồm nhiều lệnh gọi trả tiền, mất một lệnh là mất tiền |
| NFR-02 | Mỗi job có ước tính và trần chi phí; vượt trần thì dừng và hỏi | Sinh lại cảnh lặp vô hạn là cách đốt tiền nhanh nhất |
| NFR-03 | Khoá API để trong biến môi trường, không bao giờ ghi vào thư mục đầu ra hay log | Thư mục đầu ra sẽ được chia sẻ |
| NFR-04 | Không đẩy ảnh sản phẩm, ảnh người mẫu lên dịch vụ chứa tệp công khai ẩn danh | ai-video-studio làm vậy mặc định; ảnh người mẫu là dữ liệu cá nhân |
| NFR-05 | Mọi đầu ra kèm kịch bản .svml và tham số để chạy lại | Sửa một chỗ không phải làm lại từ đầu |
| NFR-06 | Đổi model video, TTS, LLM chỉ bằng cấu hình | Model bị khai tử giữa chừng là chuyện đã gặp |
| NFR-07 | Đầu ra JSON của LLM phải qua kiểm schema ngay trong vòng thử lại; giới hạn độ dài ép bằng mã | Dặn trong prompt không đủ |
| NFR-08 | Mỗi bước ghi log và trạng thái, xem được job đang ở đâu | Job dài nhiều phút, cần biết đang kẹt chỗ nào |
| NFR-09 | Tuân điều kiện giấy phép Hypit: không chạy SaaS nhiều khách, giữ logo trên CLI và báo cáo | Vi phạm thì mất quyền dùng khung |

## 4. Chức năng chi tiết

Máy gồm mười module chạy nối nhau, từ M0 đến M9. M0 và M3 là hai chỗ quyết định chất lượng nguyên liệu: nguyên liệu xấu thì mọi bước sau đều tốn tiền sinh lại. Mỗi module có đầu vào, đầu ra và trường hợp lỗi rõ ràng, để hỏng ở đâu thì chạy lại từ đó.

### M0. Kiểm và sơ chế nguyên liệu (FR-25 đến FR-28, FR-30)

Trạm kiểm đứng trước mọi bước tốn tiền. Mỗi lỗi xử lý theo một trong ba mức: **chặn** khi thiếu thứ không bù được, **tự sơ chế** khi máy sửa được, **cảnh báo** khi vẫn chạy được nhưng dễ hỏng.

| Nguyên liệu | Đạt khi | Máy đo bằng gì | Sơ chế | Thành phẩm |
| --- | --- | --- | --- | --- |
| Ảnh sản phẩm | Đủ nét, đủ lớn; sản phẩm chiếm phần lớn khung; nhiều góc, có cận logo; không chữ, watermark, ảnh ghép | Kích thước điểm ảnh; phương sai Laplacian; tách nền rồi tính tỉ lệ diện tích; LLM thị giác gán góc chụp và dò chữ | Phóng ảnh (Real-ESRGAN); tách nền; cắt sát; xoá chữ bằng inpainting; sinh góc thiếu và đánh dấu là ảnh sinh | Tờ sản phẩm |
| Thông tin sản phẩm | Đủ: là gì, cho ai, ba điểm bán, thông số, kích thước thật, điều không được nói | LLM rút theo khuôn và đếm trường trống; kiểm chéo mô tả với ảnh (màu, hình dáng) | Hỏi người dùng các trường trống; không cho LLM tự điền | Bản tóm tắt sản phẩm |
| Ảnh người mẫu | Mặt nhìn thẳng, đủ sáng, một người, không che mặt; có nửa hoặc toàn thân nếu khung cần; đã đồng ý | Phát hiện khuôn mặt, đếm người, đo sáng và nét | Sinh tờ nhiều góc; lấy vector khuôn mặt (insightface) | Tờ người mẫu và vector |
| Reel mẫu | Xem M3 | | | Khung ba tầng |

- **Tờ sản phẩm** là tham chiếu bắt buộc cho mọi cảnh có sản phẩm. Kích thước thật đi vào mọi prompt, vì AI hay vẽ sai tỉ lệ.
- **Bản tóm tắt sản phẩm** là nguồn duy nhất cho lời thoại, nên lời không thể hứa điều sản phẩm không có.
- **Vector khuôn mặt** dùng lại ở bước kiểm đầu ra: so với mặt trong từng cảnh để biết người mẫu có bị đổi mặt không.
- **Hai chế độ:** "duyệt" dừng cho xem tờ sản phẩm trước khi tiêu tiền, mặc định ở giai đoạn đầu; "tự chạy" khi đã tin ngưỡng.
- **Ngưỡng:** lúc đầu chỉ cảnh báo. Mỗi cảnh ghi chỉ số nguyên liệu nó dùng cùng kết quả kiểm cảnh đó; sau vài chục cảnh mới biết chỉ số nào gây hỏng và đặt ngưỡng chặn.

### M1. Nguồn sản phẩm (FR-01 đến FR-04)

- **Vào:** token Admin API của cửa hàng, hoặc dữ liệu nhập tay.
- **Ra:** hồ sơ sản phẩm chuẩn hoá gồm tên, mô tả, giá, biến thể, danh sách ảnh, link gốc.
- **Cách làm:** một giao diện `ProductSource`, mỗi nguồn một adapter. Shopify đọc qua Admin GraphQL API bằng token của app tạo bằng Shopify CLI.
- **Lỗi cần xử lý:** token hết quyền; sản phẩm không có ảnh; mô tả rỗng thì báo thiếu chứ không để LLM bịa điểm bán.

### M2. Thư viện người mẫu (FR-05)

- **Vào:** ảnh người thật do chủ dự án đưa, kèm tên và xác nhận đồng ý. Không có ảnh thì AI tạo người mẫu theo mô tả, hợp với sản phẩm và ngữ cảnh của khung.
- **Ra:** tài sản `@[tên]` kèm ảnh nhiều góc nhìn.
- **Cách làm:** từ một ảnh gốc, sinh một tờ ảnh nhiều góc nhìn để làm tham chiếu (ý tưởng từ ClipForge, ArcReel).
- **Chặn:** người mẫu chưa đánh dấu đồng ý thì không chọn được trong job.

### M3. Thư viện khung viral (FR-06 đến FR-09, FR-29, FR-31)

- **Nguồn reel:** link TikTok, Facebook Reels, quảng cáo từ TikTok Creative Center (Top Ads) và Meta Ad Library, hoặc tải tệp lên. Tải bằng `hypit media fetch` hoặc yt-dlp.
- **Phạm vi:** mọi ngách. Khung không gắn với ngành nào; tầng 3 ghi loại sản phẩm nào hợp.
- **Khung ba tầng:**
    1. **Format**, theo các playbook của Hypit: lời dẫn kèm demo, UGC người nói vào máy, xếp hạng, người dẫn giải thích, phim ngắn, phỏng vấn đường phố.
    2. **Cảnh theo giây:** mốc bắt đầu và kết thúc, cỡ cảnh, chuyển động máy, vai trò (hook, nỗi đau, khoe, chứng minh, kêu gọi), lời gốc, chữ trên hình, vì sao hiệu quả (giữ chân, thuyết phục, nhịp, chuyển đổi); cộng BPM và điểm beat.
    3. **Phán quyết chuyển sang AI** cho từng cảnh: dùng thẳng, đổi cách thể hiện, hoặc không làm được, kèm lý do; và loại sản phẩm hợp (vật nhỏ cầm tay, vật dài, đồ mặc, đồ dùng trong nhà, đồ điện tử…). Reel viral do người thật quay, nhiều động tác AI chưa làm được trong một cảnh.
- **Bằng chứng viral:** link gốc, nền tảng, lượt xem, số người theo dõi kênh, ngày đăng. Máy không lấy được thì nhập tay; thiếu cũng không chặn lưu khung (chốt 23/10).
- **Cách bóc:**
    1. Đo ở máy bằng công cụ có sẵn của Hypit: `boundaries` dò điểm cắt, `tiles` lưới khung có nhãn giờ, `transcribe` lời theo từng từ. Không phải tự viết phần này.
    2. LLM thị giác xem lưới khung kèm số liệu đo, điền ba tầng theo schema.
    3. Hỏi lại từng cảnh với khung độ phân giải gốc, vì lượt ảnh lưới hay sót chi tiết.
- **Kiểm reel (FR-29):** kỹ thuật (dọc, đủ phân giải, độ dài); và chuyển được không. Reel ăn khách nhờ người nổi tiếng, meme hay câu chuyện riêng thì đánh dấu "không chuyển được".
- **Gợi ý khung cho sản phẩm (FR-31):** ghép từng cảnh của khung với tờ sản phẩm, loại khung có cảnh bất khả thi với sản phẩm đó.
- **Không lấy:** bản nhạc gốc, lời gốc nguyên văn, hình gốc.
- **Người duyệt:** chủ dự án xem và sửa khung trước khi lưu. Khung tốt dùng lại cho mọi sản phẩm cùng loại nên đáng một lần xem tay.
- **Việc nặng nhất là nội dung, không phải công cụ:** xây vài chục khung đầu tiên, trải nhiều format và loại sản phẩm.

**Quy tắc bóc khung** (chốt 23/10, sau lỗi ở khung đầu: trợ lý thay mất cú hook "kệ siêu thị + hộp đẹp" vì lo AI vẽ sai chữ):

1. Bước **"Vì sao viral"** viết trước tầng 3: mỗi yếu tố gắn mức **Lõi** (bỏ là mất viral) hoặc **Phụ**.
2. Tầng 3 không được thay yếu tố Lõi. Làm không được thì đánh dấu "không chuyển được cho sản phẩm này" hoặc hỏi chủ dự án.
3. Lo ngại kỹ thuật, pháp lý là câu hỏi cho chủ dự án, không phải quyết định của máy.
4. Soi từ 4 khung mỗi giây và xác nhận từng điểm cắt: máy dò cắt cảnh báo nhầm khi độ sáng đổi đột ngột.
5. Mỗi khung ghi "nguyên liệu khung này đòi" (ví dụ ảnh mặt ngoài hộp đóng); thiếu thì M0 chặn.

### M4. Kịch bản (FR-10)

- **Vào:** bản tóm tắt sản phẩm, tờ người mẫu, khung.
- **Ra:** tệp `.svml` cho một biến thể: lời trong `<script>`, cảnh và tiếng gắn theo từ, prompt hình và prompt chuyển động tách riêng.
- **Ràng buộc bằng mã:** số cảnh và mốc cắt phải khớp khung; sai thì từ chối và sinh lại, không chỉ dặn trong prompt.

### M5. Sinh cảnh (FR-11 đến FR-13)

- **Vào:** danh sách cảnh trong `.svml`.
- **Ra:** mỗi cảnh một clip, kèm trạng thái kiểm.
- **Cách làm:** mỗi cảnh sinh một khung tĩnh trước, giữ nguyên hình sản phẩm bằng image-to-image, rồi ảnh thành video. Hai chế độ nối: lấy khung cuối thật của cảnh trước, hoặc ghim khung tĩnh của cảnh sau.
- **Kiểm tự động:** đủ độ dài, không khung đen hay đứng hình, LLM thị giác xác nhận có sản phẩm đúng hình. Hỏng thì sinh lại đúng cảnh đó, tối đa theo trần cấu hình.
- **Tiền:** lệnh gửi job không bao giờ tự thử lại, trừ lỗi 429; thăm dò lỗi thì báo "không rõ" chứ không báo "hỏng".

### M6. Ghép (FR-17, phần đầu)

- Đưa mọi clip về 1080×1920, cùng số khung hình mỗi giây, nối theo mốc cắt của khung.

### M7. Viết lại lời (FR-14)

- **Vào:** video đã ghép.
- **Cách làm:** cắt khung thành bảng ảnh có nhãn thời gian và cờ CUT, BLACK, FREEZE (ý tưởng ArcReel); LLM xem bảng ảnh rồi viết lại lời cho khớp từng đoạn hình.
- **Ra:** lời mới ghi đè vào `<script>` của `.svml`. Chỉ tiếng và phụ đề sinh lại, hình giữ nguyên.
- Đây là phần không công cụ nào đã đọc có, và là lý do chính để tự xây.

### M8. Âm thanh (FR-15, FR-16)

- Đọc lời en-US, đo độ dài thật. Dài hơn cảnh thì quay lại M7 viết ngắn, không tăng tốc giọng quá mức.
- Căn từ bằng whisperx để phụ đề khớp từng chữ.
- Trộn nhạc có giấy phép, tự hạ nhạc khi có giọng.

### M9. Dựng và đầu ra (FR-17 đến FR-21)

- Gắn tiếng, phụ đề, logo, khung kêu gọi; xuất bản có và không phụ đề, ảnh bìa.
- Ghi thư mục đầu ra (mục 7) và in đường dẫn.
- Ghi sổ chi phí từng lệnh gọi trả tiền vào báo cáo của job.

## 5. Luồng người dùng và giao diện

Giao diện web làm ở giai đoạn 2; v1 chạy bằng dòng lệnh và Claude Code với đúng các bước này. Mọi việc đi qua năm màn hình chính, ba thư viện và một trang cài đặt.

*(Sơ đồ luồng màn hình: Trang chủ → Tạo video → Xác nhận → Theo dõi job → Kết quả → Mở thư mục output. Ba thư viện Sản phẩm, Thư viện khung, Người mẫu nối vào Tạo video. Kết quả → Sửa lời / sinh lại cảnh → quay về Theo dõi job.)*

Từ Kết quả, sửa lời hoặc sinh lại một cảnh đưa về Theo dõi job, nhưng chỉ chạy lại phần đổi.

### Các màn hình

| Màn hình | Hiển thị | Hành động | Trạng thái cần thiết kế |
| --- | --- | --- | --- |
| 1. Trang chủ | Danh sách job mới nhất trước: sản phẩm, khung, trạng thái, chi phí, thời gian | Tạo video; mở job; lọc theo cửa hàng | Chưa có job: hướng dẫn tạo video đầu tiên |
| 2. Tạo video | Bốn bước: sản phẩm (một hoặc nhiều) → khung → người mẫu → giọng, nhạc, độ dài | Chọn từ thư viện; thêm mới ngay tại chỗ | Sản phẩm thiếu ảnh hoặc mô tả: cảnh báo, không cho đi tiếp |
| 3. Xác nhận | Ước tính chi phí theo từng phần, trần ngân sách, số video sẽ ra | Chạy; quay lại sửa | Ước tính vượt trần: nút Chạy bị khoá, nói rõ vượt bao nhiêu |
| 4. Theo dõi job | Xem trước 9:16, danh sách cảnh với trạng thái, tiền đã tiêu so với trần | Sinh lại một cảnh; xem lỗi; huỷ job | Đang sinh, hỏng, không rõ, chạm trần chi phí |
| 5. Kết quả | Video, lời thoại, bảng ảnh kiểm, báo cáo chi phí | Mở thư mục; copy đường dẫn; sửa lời; tạo biến thể | Video chưa qua kiểm: hiện cảnh báo ngay trên video |
| Thư viện khung | Reel mẫu, khung đã bóc dạng dòng thời gian cảnh | Tải reel; sửa cảnh; duyệt khung | Đang bóc; chưa duyệt (không dùng được trong job) |
| Người mẫu | Ảnh gốc, tờ nhiều góc nhìn, cờ đồng ý | Tải ảnh; đánh dấu đồng ý | Chưa đồng ý: không chọn được |
| Cài đặt | Cửa hàng Shopify, model từng vai trò, bảng giá, trần mặc định | Thêm cửa hàng; thử kết nối | Token sai quyền: nói rõ thiếu quyền nào |

### Màn hình quan trọng nhất

*(Bản phác màn Theo dõi job: trên cùng là tên sản phẩm, khung, giọng và "Đã tiêu / trần"; bên trái là khung xem trước 9:16; bên phải là danh sách cảnh, mỗi cảnh một nhãn trạng thái đạt / sinh lại 2/3 / đang sinh / chờ; dưới cùng là nút Sửa lời, Huỷ job, Mở thư mục.)*

Màn Theo dõi job là nơi chủ dự án ngồi lâu nhất. Trạng thái cảnh vừa có màu vừa có chữ, và tiền đã tiêu luôn ở góc trên.

### Nguyên tắc thiết kế

- Tiết chế: một màu nhấn duy nhất, chỉ dành cho hành động chính của màn hình (Chạy, Mở thư mục).
- Màu trạng thái tách khỏi màu nhấn: đạt, cảnh báo, hỏng; luôn kèm chữ, không dựa vào màu.
- Tiền hiển thị trước khi tiêu (màn Xác nhận) và trong khi tiêu (Theo dõi job).
- Video xem trước đúng tỉ lệ 9:16, vì đó là cách người xem thật sẽ thấy.
- Có chế độ tối; ưu tiên màn hình máy tính, không cần bản điện thoại ở v1.
- Lỗi nói điều gì sai và cách sửa, ví dụ "Token thiếu quyền read_products".

## 6. Kiến trúc kỹ thuật

Máy là một ứng dụng chạy trên một máy, dựng quanh skill Hypit trong Claude Code. Chỉ các lệnh sinh video, giọng đọc và LLM đi ra ngoài.

*(Sơ đồ kiến trúc — bản tĩnh ở `thiet-ke/so-do-ban-6.html`: đầu vào Shopify / ảnh người mẫu / reel viral → M0 Kiểm và sơ chế nguyên liệu → M1, M2, M3 → M4 Claude Code + skill Hypit → Runtime Hypit (M5, M6) cạnh Job + SQLite → M7 → M8 → M9 → thư mục output. Runtime gọi API nhà cung cấp bên ngoài.)*

M0 được tô nổi vì mọi nguyên liệu phải qua đó trước khi máy tiêu tiền. M7 ghi lời mới ngược vào tệp .svml của M4, nên sửa lời chỉ sinh lại tiếng và dựng. Muse chưa vẽ trong sơ đồ: nó là đường sinh video thứ hai, ngang hàng với runtime Hypit, chạy bên trong Muse; mỗi cảnh một clip, cắt đúng mốc của khung rồi tải về cho M6 ghép.

### Công nghệ

| Lớp | Công nghệ | Lý do |
| --- | --- | --- |
| Điều phối, viết kịch bản | Claude Code + skill Hypit, ngôn ngữ SVML | Đã đọc mã; kịch bản sửa được, chạy lại được |
| Runtime | Hypit trên Node 22, pnpm | Nhà cung cấp video, ảnh, giọng có sẵn |
| Module tự viết | TypeScript | Cùng ngôn ngữ với chủ dự án và Hypit |
| Hàng đợi job | Bảng job trong SQLite, một tiến trình worker | Đủ cho một máy; không cần Redis |
| Xử lý media | ffmpeg, ffprobe, Chromium headless | Hypit dựng bằng hai thứ này |
| Bóc lời, căn từ | whisperx (Python), gọi qua tiến trình con | Chạy ở máy, không tốn tiền |
| Giao diện (giai đoạn 2) | Next.js chạy cục bộ | Chủ dự án quen; chỉ đọc CSDL và gọi lệnh của máy |
| Bí mật | Tệp `.env`, không commit | NFR-03 |
| Sơ chế nguyên liệu (M0) | rembg hoặc SAM tách nền, Real-ESRGAN phóng ảnh, insightface vector khuôn mặt, OpenCV đo độ nét; image-to-image của Hypit để xoá chữ và sinh góc thiếu | Phần lớn chạy ở máy, không tốn tiền; chỉ xoá chữ và sinh góc gọi API |

### Ranh giới giữa các phần

- M3 (bóc khung) và M7 (viết lại lời) viết độc lập với Hypit, chỉ nhận và trả tệp, JSON. Đây là hai phần giá trị riêng của máy; giữ độc lập để thay được khung nếu Hypit ngừng.
- Mỗi nguồn sản phẩm là một adapter của `ProductSource`; thêm nguồn mới không đụng chỗ khác.
- Nhà cung cấp video mới viết theo mẫu provider của Hypit: gửi, thăm dò, lấy về.
- Giao diện không chứa logic; mọi việc đều làm được từ dòng lệnh.

## 7. Dữ liệu và thư mục đầu ra

Trạng thái nằm trong SQLite; tệp nặng (video, ảnh, tiếng) nằm trên đĩa, CSDL chỉ giữ đường dẫn. Một máy chạy một người dùng nên SQLite đủ; cần nhiều máy thì chuyển sang Postgres.

### Thực thể

| Thực thể | Trường chính | Ghi chú |
| --- | --- | --- |
| `store` | id, loại nguồn, tên miền, tham chiếu tới khoá | Khoá không lưu trong bảng, chỉ tên biến môi trường |
| `product` | id, store_id, id gốc, tên, mô tả, giá, biến thể (JSON), ảnh gốc (JSON), tờ sản phẩm (đường dẫn), bản tóm tắt (JSON), kích thước thật, đồng bộ lúc | Bản chụp tại lúc chạy, để video tái lập được |
| `talent` | id, tên, ảnh gốc, tờ nhiều góc nhìn, vector khuôn mặt, đã đồng ý, ghi chú nguồn | Người mẫu |
| `template` | id, tên, format, nền tảng và link gốc, tệp reel, bằng chứng viral (lượt xem, theo dõi, ngày đăng), cảnh (JSON, kèm phán quyết AI), loại sản phẩm hợp, chuyển được hay không, BPM, tổng giây, đã duyệt | Khung bóc từ reel viral; cảnh gắn nhãn phần HOOK hoặc THÂN, hai khung có thể trỏ chung một thân (chốt 23/10) |
| `job` | id, loại (đơn, hàng loạt), trạng thái, trần chi phí, tạo lúc | Một lần bấm chạy |
| `variant` | id, job_id, product_id, template_id, talent_id, giọng, tệp .svml, trạng thái, thư mục đầu ra | Một video đầu ra |
| `shot` | id, variant_id, thứ tự, mốc giây, prompt, id job của nhà cung cấp, trạng thái, số lần sinh, kết quả kiểm | `provider_task_id` để nối tiếp sau khởi động lại |
| `cost_entry` | id, variant_id, nhà cung cấp, model, đơn vị, số lượng, USD, lúc | Mỗi lệnh gọi trả tiền một dòng |
| `input_check` | id, đối tượng (sản phẩm, người mẫu, reel), chỉ số đo (JSON), mức (đạt, cảnh báo, chặn), đã sơ chế gì, lúc | Ghép với kết quả kiểm cảnh để đo ngược ra ngưỡng chặn |

Trạng thái của `shot`: chờ → đã gửi → đang sinh → đã về → đạt, hoặc hỏng → sinh lại. "Không rõ" là trạng thái riêng khi thăm dò lỗi, không tính là hỏng.

### Thư mục đầu ra

```
output/
  <cửa-hàng>/
    <sản-phẩm>/
      <biến-thể>-<ngày>/
        video.mp4            bản có phụ đề, để đăng
        video-clean.mp4      bản không phụ đề
        cover.jpg            ảnh bìa
        script.txt           lời thoại cuối cùng
        caption.txt          gợi ý chú thích và hashtag khi tự đăng
        reel.svml            kịch bản để chạy lại
        shots/               từng clip cảnh
        report.json          tham số, model, chi phí, kết quả kiểm
```

Không có khoá API hay token nào trong thư mục này, vì nó sẽ được chia sẻ.

## 8. Nhà cung cấp AI và chi phí

Chi phí thật mỗi video chưa ai đo; giai đoạn 0 phải đo ra số này trước khi cam kết gì. Hai con số đang có đều do dự án tự công bố: Hypit ghi khoảng 1,15 USD mỗi video, video-clone-lite ghi khoảng 5 tệ cho 15 giây.

| Vai trò | Lựa chọn đầu | Dự phòng | Ghi chú |
| --- | --- | --- | --- |
| Tác tử viết kịch bản | Claude trong Claude Code, qua skill Hypit | — | Đã có sẵn, không tốn thêm API |
| LLM thị giác (bóc khung, kiểm cảnh, viết lại lời) | Claude Sonnet 5.5 qua API | Claude Opus 5.5 cho ca khó | Ghim tên model trong biến môi trường |
| Ảnh khung tĩnh, giữ hình sản phẩm | gpt-image, nano-banana, Seedream (Hypit có sẵn) | — | Dùng bản image-to-image |
| Video từng cảnh, đường Hypit | Seedance | Kling, Wan, MiniMax, Pixverse | Trả tiền, chạy tự động, làm sau. Gọi thẳng BytePlus ModelArk; Hypit chưa có provider BytePlus nên phải tự viết |
| Video từng cảnh, đường Muse | Muse, chạy bên trong Muse | — | Miễn phí, làm trước. Sinh khoảng 10 giây rồi cắt đúng mốc cảnh; khoảng 720p; khoảng 3% hạn mức tuần mỗi clip (đo 23/10) |
| Giọng đọc en-US | ElevenLabs | FishAudio | Cả hai có trong Hypit |
| Bóc lời, căn từ | whisperx chạy ở máy | — | Không tốn tiền, cần máy đủ mạnh |
| Nhạc nền | Kho nhạc có giấy phép | Openverse CC | Chưa chọn kho, xem mục 13 |

**Cách ước tính chi phí một video** (FR-21): cộng từng phần theo bảng giá trong cấu hình.

```latex
C = \sum_{cảnh} (g_{video} \cdot s_c \cdot (1 + r) + g_{ảnh}) + g_{TTS} \cdot k + g_{LLM}
```

Trong đó s là số giây của cảnh, r là tỉ lệ sinh lại đo được, k là số ký tự lời thoại. Tỉ lệ sinh lại là biến quyết định: nếu mỗi cảnh phải sinh hai lần thì phần video tăng gấp đôi.

## 9. Chất lượng và kiểm thử

Một video **đạt** khi chủ dự án đăng được mà không phải mở phần mềm dựng nào. Danh sách dưới đây là cách đo điều đó; máy tự kiểm những mục kiểm được, còn lại người xem.

### Tiêu chí video đạt

| Tiêu chí | Ai kiểm | Cách kiểm |
| --- | --- | --- |
| Sản phẩm đúng hình dáng, màu, logo ở mọi cảnh có sản phẩm | Máy, rồi người | LLM thị giác so khung với ảnh gốc |
| Người mẫu không đổi mặt giữa các cảnh | Máy, rồi người | So vector khuôn mặt từng cảnh với vector gốc từ M0, rồi xem bảng ảnh trong báo cáo |
| Số cảnh và mốc cắt khớp khung | Máy | So với khung JSON |
| Không khung đen, đứng hình, chữ vỡ do AI | Máy | ffmpeg đo, LLM soi khung |
| Lời nói khớp hình đang hiện | Người | Xem video |
| Lời không tràn quá cảnh | Máy | Độ dài tiếng thật so với mốc cảnh |
| Lời không hứa điều mô tả sản phẩm không nói | Máy, rồi người | LLM đối chiếu lời với hồ sơ sản phẩm |
| Nhạc có giấy phép | Máy | Chỉ lấy từ kho đã cấu hình, ghi nguồn vào báo cáo |

### Kiểm thử phần mềm

1. **Hàm thuần có test đơn vị:** tính mốc cắt, kiểm schema khung, ép độ dài lời, ước tính chi phí, dựng đường dẫn thư mục.
2. **Chạy khô không tốn tiền:** nhà cung cấp giả trả clip mẫu có sẵn, để chạy trọn luồng chín bước trong CI.
3. **Bộ mẫu hồi quy:** ba reel mẫu cố định cùng khung đã duyệt tay. Sửa module bóc khung thì so kết quả với bộ này.
4. **Kiểm trên dữ liệu thật:** trước khi viết bộ phân loại trên đầu ra của một API, in tập giá trị có thật rồi mới viết. Không đoán chuỗi trạng thái.
5. **Kiểm chi phí:** mỗi bản phát hành chạy một video thật và so chi phí thật với ước tính.

## 10. Rủi ro, pháp lý và tuân thủ

Rủi ro lớn nhất là kỹ thuật, không phải pháp lý: AI video có thể không giữ được hình sản phẩm đủ tốt để đăng. Giai đoạn 0 tồn tại để biết điều này trước khi viết mã.

| Rủi ro | Hậu quả | Cách giảm |
| --- | --- | --- |
| Sản phẩm bị biến dạng, sai logo giữa các cảnh | Video không đăng được, hoặc quảng cáo sai sản phẩm | Khung tĩnh image-to-image từ ảnh gốc; kiểm tự động; giai đoạn 0 chọn model |
| Người mẫu đổi mặt | Video trông giả | Tờ nhiều góc nhìn làm tham chiếu; nối khung cuối sang khung đầu |
| Tỉ lệ sinh lại cao | Chi phí tăng nhiều lần | Trần số lần sinh lại và trần chi phí mỗi job |
| Nhạc của reel mẫu có bản quyền | Nền tảng tắt tiếng hoặc gỡ video | Chỉ bóc nhịp và cấu trúc; nhạc từ kho có giấy phép |
| Nhân bản quá sát reel của người khác | Bị tố sao chép | Chỉ lấy nhịp, cỡ cảnh, vai trò cảnh; lời, hình, chữ đều viết mới |
| Gương mặt người mẫu dùng khi chưa đồng ý | Tranh chấp về hình ảnh cá nhân | Bắt buộc đánh dấu đồng ý trước khi chọn được (M2) |
| Video AI không gắn nhãn | Instagram, TikTok hạ hoặc gỡ bài | `caption.txt` nhắc bật nhãn AI-generated khi tự đăng |
| Lời hứa điều sản phẩm không có | Quảng cáo sai sự thật theo luật Mỹ (FTC) | LLM đối chiếu lời với mô tả sản phẩm; không bịa lời chứng thực của khách |
| Tài khoản Muse bị khoá | Mất đường sinh video miễn phí | Còn đường Hypit + Seedance thay thế; không dùng useapi.net, AutoMuse (giao mật khẩu, cookie cho bên thứ ba) |
| Giấy phép Hypit | Mất quyền dùng khung nếu chạy SaaS nhiều khách | Dùng nội bộ hoặc làm hộ khách bằng máy của mình; hỏi lại nếu định mở cho khách tự dùng |
| Hypit đổi hướng hoặc ngừng | Khung không còn được vá | Ghim phiên bản; giữ M3, M7 độc lập với Hypit để thay khung được |
| Model video bị khai tử | Job đang chạy hỏng | Ghim tên model trong cấu hình, có model dự phòng |

## 11. Lộ trình

Việc đầu tiên là hai phép thử rẻ, chưa viết dòng mã sản phẩm nào. Qua mỗi cửa bằng số đo, không theo lịch; chưa đặt ngày vì chưa biết giai đoạn 0 cho kết quả gì.

| Giai đoạn | Nội dung | Cửa để qua |
| --- | --- | --- |
| 0 · Phép thử | 3 clip dọc trong Muse với ảnh sản phẩm và người mẫu; 1 video bằng Hypit qua Seedance. Đo chi phí thật mỗi video và tỉ lệ sinh lại. Chưa viết mã sản phẩm. | Cửa 0: sản phẩm giữ đúng hình qua các cảnh, và chi phí thật nằm dưới trần đã quyết |
| 1 · MVP dòng lệnh | M0 sơ chế nguyên liệu, M3 thư viện khung ba tầng, M4 kịch bản qua Hypit, M5–M6 sinh và ghép, M7 viết lại lời, M8–M9. Nhập sản phẩm tay, một khung, một video mỗi lần; kết quả vào thư mục output. | Cửa 1: 3 video liên tiếp đạt tiêu chí mục 9 mà không sửa tay |
| 2 · Hàng loạt | Adapter Shopify, job chạy nền với SQLite, nối tiếp job sau khởi động lại, trần chi phí. Một khung cho nhiều sản phẩm; giao diện web năm màn hình. | Cửa 2: một lô sản phẩm chạy hết không cần can thiệp, chi phí thật khớp ước tính |
| 3 · Mở rộng | Nhiều biến thể mỗi sản phẩm, nguồn video Muse, xuất bản nháp CapCut, dán link sản phẩm. Gói tiếng Việt khi cần. | — |

Không qua Cửa 0 thì đổi model video rồi thử lại, chứ không sang giai đoạn 1.

**Đổi ngày 23/10, hình trên chưa vẽ lại:** đường sinh video Muse chuyển lên giai đoạn 1 và làm trước; đường Hypit + Seedance thành việc để sau (TODO). Cửa 0 đo trên Muse trước.

Việc cụ thể của giai đoạn 0 và bảng ghi kết quả: `GIAI-DOAN-0.md`.

## 12. Đo lường thành công

Máy đo chất lượng sản xuất của chính nó, không đo doanh thu, vì nó dừng ở thư mục video. Mọi số dưới đây lấy từ `report.json` và bảng `cost_entry`. Ngưỡng đặt sau giai đoạn 0, khi đã có số đo thật.

| Chỉ số | Cách tính | Trả lời câu hỏi |
| --- | --- | --- |
| Tỉ lệ video đạt không sửa | Số video đăng được ngay chia tổng số video | Máy có thay được công dựng tay không |
| Số lần sinh lại trung bình mỗi cảnh | Tổng lần sinh chia số cảnh | Model video có hợp không |
| Tỉ lệ cảnh giữ đúng sản phẩm | Cảnh qua kiểm sản phẩm ngay lần đầu chia cảnh có sản phẩm | Rủi ro số một đã được giải chưa |
| Chi phí mỗi video | Tổng `cost_entry` của một biến thể, USD | Có đáng tiền so với thuê người dựng không |
| Độ lệch ước tính chi phí | Chi phí thật chia ước tính | Trần ngân sách có đáng tin không |
| Thời gian ra video | Từ lúc bấm chạy tới lúc có thư mục | Chạy hàng loạt có khả thi không |

Lượt xem sau khi đăng nằm ngoài máy. Muốn biết khung nào hiệu quả thì chủ dự án ghi tay lượt xem vào thư viện khung.

## 13. Câu hỏi mở

Bốn câu đã chốt ngày 23/10, bốn câu còn mở. Chưa dùng công cụ trả phí để tìm reel (PipiAds, Foreplay).

- [x] Trần chi phí mỗi video là bao nhiêu USD? → $10 / video (23/10)
- [x] Người mẫu là người thật hay do AI tạo? → Ảnh người thật do chủ dự án đưa vào; không đưa thì AI tạo theo mô tả cho hợp sản phẩm và ngữ cảnh video (23/10)
- [x] Độ dài video mặc định? → không cố định: theo cảnh của khung viral; mỗi job xuất nhiều bản cắt (FR-32) (23/10)
- [ ] Dùng kho nhạc có giấy phép nào?
- [ ] Máy chạy ở đâu: máy cá nhân hay máy chủ riêng? whisperx cần máy đủ mạnh.
- [ ] v1 dòng lệnh cùng Claude Code có đủ không, hay cần giao diện web ngay?
- [x] Thư mục làm việc đặt ở đâu? → manager-ai/reel (23/10); cân nhắc tách repo riêng khi bắt đầu viết mã giai đoạn 1.
- [ ] Có định cho khách tự dùng máy không? Nếu có, phải xem lại giấy phép Hypit.
