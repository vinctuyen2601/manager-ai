# Phỏng vấn Chuyên viên Sản phẩm — 12/11/2026

Ngành: do-cau-vn · nhan: `hoi-dap/phao.md`, `hoi-dap/mua-hang.md`, `gia.md` (+ `MUC-LUC.md`, `ngon-ngu-khach.md` mục 0 và 8)

### SP-1
Trả lời:

Tin gửi khách (Zalo, giọng shop, gửi nguyên văn):

> Dạ anh, pin phao dùng tối đa 12 giờ liên tục, khoảng 3 buổi câu đêm, sạc lại được ạ. Câu đêm anh cứ để đèn sáng, cá cắn là cả đuôi chuyển đỏ, ngồi xa vẫn thấy. Mỗi phao shop tặng kèm 1 pin CR425. Anh hay câu thâu đêm thì nhắn shop lấy thêm 1 viên dự phòng cho chắc nhé.
>
> Phao đang 99.000đ/cây, cả 3 mã cùng giá. Anh lấy 2 cây (198.000đ) là được freeship, vì shop freeship cho đơn từ 150.000đ. Anh nhận hàng, kiểm đúng ý rồi mới thanh toán ạ.
>
> Anh cho shop biết cây cần anh dài bao nhiêu để shop chọn mã cho vừa: cần 2m7–4m5 lấy QF-01, 3m6–5m4 lấy QF-02, hay gió hoặc thả xa tới 6m3 thì lấy QF-03. Phao không kèm chì và dây anh nhé.

Ghi chú cho anh (nội bộ, không gửi khách):
- Em **không** viết "được, sáng cả đêm" cho chắc. Sếp nói "tối đa 12 giờ, khoảng 3 buổi", tức một buổi cỡ 4 giờ. Một đêm dài thì có thể sát hoặc thiếu. Nên em đưa đúng số của anh và gợi ý mang pin dự phòng, chứ không hứa.
- "Bớt": hồ sơ không có giảm giá nào khi mua 2 cây, nên em chỉ trả bằng thứ có thật là freeship (đúng ngưỡng 150k). Em không viết "shop không giảm" vì em không biết web có cài combo cho món này không (repo Web vừa lên khối "Combo giảm giá", commit 5091111 và 5970096). Anh xem trang phao có combo không: có thì thêm một câu về combo, còn nếu anh muốn bớt tay thì anh tự thêm.
- Giá 99k là số đo ngày 11/11. Giá đổi thì sửa câu thứ hai.
- Rủi ro câu tiếp theo: khách sẽ hỏi "sạc bằng gì". Hồ sơ không có, mà CR425 thường là pin dùng một lần (hồ sơ dòng 61, ⚠). Anh trả lời giúp em một câu để em ghi vào hồ sơ, đừng để người trực Zalo tự giải thích.

Phán đoán ("sáng suốt đêm"):
Sự thật: pin tối đa 12 giờ liên tục, khoảng 3 buổi câu đêm (sếp, 11/11). Không có số đo nào cho một đêm thật.
Phán đoán: nghiêng về chuyện một viên **không đủ** cho một đêm câu trọn 12 giờ, ~60 %. Lý do: "tối đa" thường là con số lúc pin mới, và cách anh quy ra "3 buổi" ngầm hiểu mỗi buổi khoảng 4 giờ. Em đổi ý nếu anh đã tự để đèn sáng liền ≥ 10 giờ mà đèn vẫn đổi màu rõ.
Kiểm bằng: anh để 1 cây sáng liền từ 18h tới 6h, cứ 2 giờ chụp đuôi một lần. Ngưỡng: tới giờ thứ 10 đèn còn sáng rõ và còn đổi đỏ khi lắc thì được nói "câu trọn đêm". Hạn 15/11.

Đã đọc: `khach-hang/17fishing/san-pham/phao-ro-diec.md` dòng 30 (giá 99k, đồng giá, quà pin), 35–39 (bảng mã), 42, 61 (pin 12 h, ⚠ CR425), 62 (không kèm chì dây), 72 (freeship 150k, COD, nhắn Zalo chọn mã), 95 (phản đối "hết pin", "cần thêm nhắn shop"), 130 ("ngồi xa vẫn thấy"), 177 (pin nói đúng lời sếp) · `thu-vien/nganh/do-cau-vn/gia.md` dòng 16, 48 (2 cây 198k đạt freeship), 63–65 (combo là luật quà trên giỏ) · `hoi-dap/mua-hang.md` dòng 25, 29 · `hoi-dap/phao.md` dòng 35, 45 · `quy-che/LUAT-CHUNG.md` dòng 7–16 · `ngon-ngu-khach.md` dòng 22 (chưa có tin Zalo thật) · `khach-hang/17fishing/HO-SO.md` dòng 19–20 · git log repo 17fishing Web (commit 5091111, 5970096)

### SP-2
Trả lời:

**Chữ thì đúng. Cảnh thì không trái sự thật ở ý chính, nhưng đang cho người xem thấy ba điều hồ sơ chưa kiểm và một điều sai.**

Đúng (✅):
- "Cá cắn là đuôi chuyển đỏ" là chữ trên trang (hồ sơ dòng 51, 130). Cơ chế "cảm biến bắt tín hiệu cá cắn thì cả đuôi chuyển đỏ" có từ trang, sếp và video thật (dòng 56).
- Khi phao chìm, cả đuôi vẫn một màu đỏ, đuôi thẳng, chỉ đuôi sáng, đúng khối PRODUCT.
- Phao bị cá kéo chìm là chuyện thường của mọi phao. Nó không hứa tính năng nào mới (đồng ý với Đạo diễn ở 09 dòng 80).

Chưa kiểm (⚠, hình đang khẳng định thay mình):
1. **Đỏ thấy rõ xuyên nước.** Video thật chỉ có đỏ trong không khí, trên tay, trong phòng. Chưa ai thấy đèn đỏ của hàng thật khi đuôi ngập dưới nước, nhất là ở xa. Bản dựng còn đặt "Ngồi xa vẫn thấy" ngay sau cảnh này, nên đây là khẳng định nặng nhất.
2. **Đỏ giữ liền ~3,5 s.** Clip AI đỏ từ 1,42 s tới hết, không về nhiều màu. Ở video thật, mỗi lần đỏ chỉ ~0,75–1 s rồi về nhiều màu (hồ sơ dòng 128). Hàng thật có giữ đỏ suốt lúc cá kéo không thì chưa biết, sếp chỉ nói "theo nhịp ăn".
3. **Chìm sâu.** Hồ sơ chỉ cho nói "chống nước, có gioăng", không kèm độ sâu (dòng 178). Cảnh chìm ngắn thì chấp nhận được. Nếu ai cắt cảnh này thành "ngâm nước vẫn sáng" thì sai luật.

Sai:
4. **Có sợi dây buộc ở đỉnh đuôi**, rõ nhất từ ~3,0 s của S1, tức nằm đúng đoạn 5,0–7,5 s của H1, đoạn đang chạy chữ "Cá cắn là đuôi chuyển đỏ". Câu đài buộc dây ở chân phao. Dân câu nhìn là biết hình giả, mà đó lại là khung mang chữ chốt. Ngoài ra còn khối tối ở mép nước (0–1,65 s).

Lệch thông điệp (không sai sự thật, nhưng phải báo):
5. Điểm bán là "tín hiệu là đổi **màu**, không phải chờ phao chìm", và rô diếc "ăn nhẹ, phao chìm ít" (hồ sơ dòng 90, 92; 03b dòng 55). Cảnh chìm mạnh làm người xem hiểu "phao chìm là biết", tức cái phao nào cũng làm được. Nó cũng lệch chữ hook "Nhịp này diếc ăn chưa?", vì diếc ít khi kéo kiểu đó.

Còn phải kiểm ngoài hình:
6. **Nhãn nội dung AI.** S1 là clip AI (Muse). TikTok bắt gắn nhãn AIGC (gói vai §3.5). Khi đăng, anh nhớ bật nhãn này.
7. **Thân A sau khi cắt bỏ dải chữ vàng**: phải xem có lộ mã in trên thân không (chi tiết ở SP-4).

Phán đoán:
Sự thật: chữ ✅ (dòng 51, 56). Video thật chỉ có đỏ trên tay, mỗi lần ~0,75–1 s (dòng 128). Clip S1 có dây ở đỉnh đuôi (09 dòng 26).
Phán đoán: nghiêng về **giữ chữ, nhưng dời chữ "Cá cắn là đuôi chuyển đỏ" về khung đỏ lúc đuôi còn đứng trên mặt nước (S1 1,42–1,65 s, hoặc khung trên tay ở Thân A), và cắt hoặc ngắn đoạn đỏ dưới nước có dây** · ~70 % · vì dây ở đỉnh đuôi rơi đúng khung mang chữ chốt, còn "đỏ xuyên nước, ngồi xa vẫn thấy" chưa có bằng chứng từ hàng thật · đổi ý nếu phép kiểm dưới đây cho thấy đỏ hiện rõ dưới nước và giữ ≥ 2 s; khi đó chỉ còn phải xoá dây hoặc sinh lại.
Kiểm bằng: anh thả 1 cây vào xô hoặc chậu nước trong phòng tối, kéo dây ở chân cho đuôi ngập ~10 cm, quay điện thoại từ xa 3 m. Ngưỡng: đỏ nhìn rõ qua nước và giữ ≥ 2 s thì giữ cảnh, kém hơn thì dời chữ như trên. Hạn: trước khi bật quảng cáo trả tiền, chậm nhất 14/11. Clip đó cũng là cảnh thật "dưới nước" mà kho đang thiếu.

Đã đọc: `khach-hang/17fishing/san-pham/phao-ro-diec.md` dòng 51, 56–58, 90, 92, 128, 130, 169 (khối PRODUCT), 177–178 · `viec/2026-11-11-phao-ro-diec-qc/09-dd-kiem-clip.md` dòng 26 (vật lạ ①–④), 36 (bảng cắt H1), 79–80, 97 · `10-td-dung.md` dòng 19, 38, 48, 53 · `03b-sxh-khung.md` dòng 55 · `BAN-TRINH.md` dòng 40–42, 95 · `nhan-su/vai/chuyen-vien-san-pham.md` dòng 130–131 (TikTok: khớp trang đích, nhãn AI) · `hoi-dap/phao.md` dòng 47–48

### SP-3
Trả lời:

**Hồ sơ không có số độ sâu chịu nước và không có số giờ ngâm.** Hai con số khách hay nghe nhầm với nhau:
- "Nước sâu 1–3,5 m" (trang ✅) là **độ sâu chỗ câu** mà phao hợp, không phải phao chịu được 3,5 m nước. Phao đứng nổi, chỉ thân với chân ngập vài chục cm. Nó chỉ xuống sâu khi cá kéo, mà kéo thì chỉ vài giây.
- Chống nước: sếp chỉ cho nói "chống nước, có gioăng". Cấm kèm độ sâu, chuẩn IP, "ngâm thoải mái" (dòng 178). Gửi khách thì chỉ nói hai ý này.

Phán đoán (nội bộ):
Sự thật: chống nước, có gioăng (sếp 11/11). Trang dặn "lau khô, tháo pin nếu lâu không dùng". Khung ngành ghi rủi ro "phao điện vào nước ở khe pin nếu vặn không chặt" (`hoi-dap/phao.md` dòng 79). Shop chưa gặp ca đổi trả nào (dòng 42). Không có số đo độ sâu hay giờ ngâm.
Phán đoán: nghiêng về **ngâm trọn một buổi câu đêm (≤ 12 giờ) ở độ sâu làm việc bình thường (dưới 0,5 m) không hỏng, nếu gioăng vặn chặt** · ~70 % · vì món này làm ra để ngâm nước cả buổi mỗi lần câu, và chỗ dễ hỏng là khe pin (rủi ro ngành) chứ không phải thời gian ngâm · chìm sâu 1 m trở lên lâu (rơi xuống đáy, mắc cỏ) thì em không nghiêng bên nào được quá 50 %, không có dữ liệu nào cả · đổi ý nếu có khách báo đèn chập chờn hoặc có hơi nước trong thân sau 1–2 buổi, hoặc thử ngâm dưới đây thấy ẩm khe pin.
Kiểm bằng: (1) sếp ngâm 1 cây đứng trong xô nước 12 giờ, rồi tháo pin xem khe pin. (2) Buộc chì cho 1 cây chìm đáy xô sâu ~1 m trong 1 giờ. Ngưỡng: khe pin khô, đèn còn sáng nhiều màu và còn đổi đỏ thì ghi "ngâm 12 h đạt, chìm 1 m/1 h đạt" vào hồ sơ dưới nhãn "shop tự thử", **vẫn không đưa ra lời quảng cáo** cho tới khi sếp duyệt câu chữ. Hạn 15/11. Câu "hỏng sau bao lâu" chỉ trả lời được bằng số đổi trả theo thời gian. Lô hàng đầu chạy 30 ngày (tới ~12/12) thì đếm số ca "vào nước".

Nếu khách hỏi đúng câu này, tin gửi khách:
> Dạ phao chống nước, có gioăng anh ạ. Phao hợp chỗ nước sâu 1–3,5 m. Anh nhớ vặn chặt chỗ lắp pin, câu xong lau khô, lâu không dùng thì tháo pin ra là được ạ.

Đã đọc: `khach-hang/17fishing/san-pham/phao-ro-diec.md` dòng 27, 41 (nước sâu 1–3,5 m), 42, 60, 71 (cất phao), 111 (chưa biết chỗ lắp pin), 178, 185 · `thu-vien/nganh/do-cau-vn/hoi-dap/phao.md` dòng 47–48, 76, 79 · `MUC-LUC.md` dòng 19 · `quy-che/LUAT-CHUNG.md` dòng 18–29

### SP-4
Trả lời:

**Hồ sơ** (sự thật chỉ ghi một chỗ, đã có, em làm gọn lại):
- Dòng "Mẫu đang bán" (dòng 12) là chỗ duy nhất định mã: QF-01/02/03 ✅ trang + sếp. QF-04 ≈2,0 g là mẫu khác, không bán, không dùng. Các dòng khác chỉ trỏ về đây.
- Sửa hai chỗ lệch: (a) dòng 17 còn ghi "mặc định … ⚠" trong khi dòng 12 đã ✅. Em đổi dòng 17 thành trỏ về dòng 12, khỏi thành hai câu nói khác nhau (lỗi L2). (b) Mục 4: `anh-04` có "Không dùng cho: mọi thứ" mà trạng thái vẫn "đã xem". Em đổi thành **bỏ**. `anh-01` giữ "đã xem", chỉ dùng tham khảo 3 trạng thái đuôi, cấm mọi cảnh cận thân.
- Giữ `anh-01`, `anh-04` trong "Tham chiếu cấm" (dòng 164) và trong mục 6 (dòng 182). Trong hỏi đáp có sẵn câu cho người trực Zalo: "Shop bán 3 mã QF-01, 02, 03" (`hoi-dap/phao.md` dòng 36).

**Video:**
- Không ảnh trang nào làm khung đầu hay tờ sản phẩm (đã đúng). Hình chỉ lấy từ `video-01` thật. Khối PRODUCT có "NO large logo or writing on the float", nên AI không tự in mã.
- **Việc phải kiểm ngay:** ở video gốc, mã in trên thân của 3 phao bị dải chữ vàng che (hồ sơ dòng 107, 118: mã ⬜). Thợ dựng đã cắt bỏ dải vàng (10-td-dung dòng 40). Vậy Thân A (shop 6,40–8,90 s) có thể đang lộ chữ mã. Em mở khung Thân A ở độ phân giải gốc 4K. Nếu đọc được "QF-04" thì che hoặc cắt khung. Nếu đọc được QF-01/02/03 thì ghi mã thật vào dòng 118 (lấp ô ⬜).

**Trang** (việc của anh, em không tự sửa vì sếp tự đẩy trang lên):
- Đề nghị gỡ `anh-01` và `anh-04` khỏi trang, hoặc cắt hoặc che phần chữ "QF-04 ≈2.0g". Thay bằng `anh-06/07/08` (đúng mã) hoặc một khung thật từ video. Lý do: khách thấy QF-04 trong ảnh mà nhận QF-02 là đúng ca "hàng không như hình". Quảng cáo TikTok còn đòi sản phẩm khớp trang đích. Gỡ `anh-04` thì mất luôn những lời trang không có ("Lọc tín hiệu báo ảo", "Mẫu phao nâng cấp 2026"…).
- Câu hỏi duy nhất cho anh: shop có định bán thêm mã 2,0 g (QF-04) không? Mặc định nếu anh không trả lời: **không**. Hồ sơ giữ nguyên, trang gỡ hoặc che 2 ảnh. Nếu có bán thì em thêm một dòng vào bảng mã (cần dài, nặng, tải chì, cần phù hợp do anh gửi) và bỏ cấm.

Phán đoán (vì sao có QF-04):
Sự thật: QF-04 ≈2,0 g in trên thân ở `anh-01`, `anh-04`. Trang, bảng thông số và sếp chỉ có 3 mã.
Phán đoán: nghiêng về chuyện nhà cung cấp làm cả dòng 4 mức tải chì (1,2 / 1,5 / 1,8 / 2,0 g) rồi dùng chung một bộ ảnh cho mọi listing, còn shop chỉ nhập 3 mã · ~75 % · vì số tăng đều theo tải chì, "2,0g" là cách ghi tải chì (`thuat-ngu` / `hoi-dap/phao.md` H1), và nhà bán hay dùng lại ảnh cho nhiều listing (gói vai §3.4) · đổi ý nếu anh nói QF-04 là hàng khác thân hoặc khác đuôi · kiểm bằng anh hỏi nơi nhập hàng "có mã 2,0g không", hạn 14/11. Việc này chỉ quyết định có thêm mã sau này hay không. Không cần chờ nó mới gỡ ảnh.

Đã đọc: `khach-hang/17fishing/san-pham/phao-ro-diec.md` dòng 12, 17, 77, 107, 118, 149, 152, 157, 164, 169, 182, 197 · `viec/2026-11-11-phao-ro-diec-qc/02-sp-ho-so.md` dòng 76, 84 · `10-td-dung.md` dòng 40 · `thu-vien/nganh/do-cau-vn/hoi-dap/phao.md` dòng 14–15, 35–36 · `nhan-su/vai/chuyen-vien-san-pham.md` dòng 119 (nhà bán dùng lại ảnh), 130 (TikTok: khớp trang đích), 395–396 (lỗi L2, L3)
