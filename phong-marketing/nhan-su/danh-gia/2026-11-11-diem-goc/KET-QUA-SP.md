# Kết quả chấm — Chuyên viên Sản phẩm · điểm gốc 11/11/2026

Giám khảo: agent chấm thang (không mở `09-KHOA-CHAM-MU.json`). Căn cứ: `HUONG-DAN-CHAM.md`, `DE-THI.md`,
`SP-lan1.md`, `SP-lan2.md`, đáp án sếp `phong-marketing/nhan-su/_kin/08-DAP-AN-SEP-KIN.md` (SP1–SP8 + mục sự thật xác nhận).
Ô e của R2 để trống — lấy từ chấm mù. **Không tính cấp L1–L5** (Trưởng phòng tính sau khi ghép).

## 0. Kiểm dòng "Đã đọc" — agent có đọc thật và trích đúng không

Đã mở từng tệp agent khai và dò chỗ được trích:

| Trích dẫn của agent | Có thật? |
|---|---|
| "Có sẵn pin" = câu hỏi số một, sếp xác nhận 21/09 (lan1 SP4, lan2 SP4) | ✅ `17fishing/CLAUDE.md` dòng 745–747 |
| Phao điện chép kèm hai đuôi (lan2 SP2) | ✅ `17fishing/CLAUDE.md` dòng 749–750 |
| Trang phao điện cũ bắt chọn 5 mức tải chì (lan1 SP4) | ✅ `17fishing/CLAUDE.md` dòng 904–909 |
| Freeship sổ shop 100.000đ (lan2 SP6, SP7) | ✅ `17fishing/CLAUDE.md` dòng 212 — lệch thật với trang (150.000đ) |
| 1 đơn; vết 2 đơn trả hàng bị xoá cứng (lan1 SP6) | ✅ `17fishing/QUAN-LY.md` dòng 228, 482, 540 |
| Giá phao shop 85k / 99k / 80k ngày 18/09 (lan2 SP7) | ✅ `chung/HANG-DOI-BAI-Y-DINH-MUA.md` dòng 174 |
| Meta "deceptive pricing", TikTok giảm giá lệch (lan2 SP7, gói vai 3.5) | ✅ `phong-marketing/nhan-su/vai/chuyen-vien-san-pham.md` dòng 121, 123 |
| "Không theo dõi đối thủ" (lan1 SP2, SP7) | ✅ `phong-marketing/CLAUDE.md` dòng 59 |
| `phao.yaml`: rủi ro gãy đuôi, nước vào khe pin; câu khung "pin bao lâu", "nhìn rõ bao xa" (lan2 SP4, SP6) | ✅ — **trừ một chỗ trích lệch**: lan2 SP4 ghi "Có chống nước không?" là "câu khung của danh mục", nhưng trong `phao.yaml` chống nước chỉ nằm ở `khongDuocNoiMacDinh`, không ở `cauHoiKhung` |
| Thông số 3 mã, mâu thuẫn ảnh 5 / QF-04, mục 6 cấm nói | ✅ `phong-marketing/khach-hang/17fishing/san-pham/phao-ro-diec.md` |

Kết luận: cả hai lượt đọc thật, trích đúng; một chỗ gán nguồn lệch nhỏ ở lan2 SP4. **Không lượt nào nói SAI sự thật
sản phẩm** (không câu nào khẳng định ngược với: chống nước, pin 12 h/~3 buổi/sạc được, cảm biến theo nhịp ăn, không kèm chì-dây,
chưa có ca đổi trả). Các điều đó agent đều để ⬜ "chưa biết" — không trừ điểm theo hướng dẫn.

---

## 1. Bảng điểm thô

### 1a. Câu thường — R2 (a–d, mỗi ô 0–2; e để trống)

| Câu | Lượt | a ngôn ngữ | b thị trường | c khách | d bám SP | **a–d /8** | e (chấm mù) |
|---|---|---|---|---|---|---|---|
| SP1 | lan1 | 2 | 1 | 1 | 2 | **6** | |
| SP1 | lan2 | 2 | 1 | 1 | 2 | **6** | |
| SP2 | lan1 | 2 | 1 | 1 | 2 | **6** | |
| SP2 | lan2 | 2 | 2 | 1 | 2 | **7** | |
| SP3 | lan1 | 2 | 1 | 2 | 2 | **7** | |
| SP3 | lan2 | 2 | 1 | 2 | 2 | **7** | |
| SP4 | lan1 | 1 | 2 | 0 | 1 | **4** | |
| SP4 | lan2 | 1 | 2 | 0 | 2 | **5** | |
| SP8 | lan1 | 1 | 1 | 2 | 2 | **6** | |
| SP8 | lan2 | 1 | 1 | 2 | 2 | **6** | |
| **Tổng** | lan1 | | | | | **29/40** | |
| **Tổng** | lan2 | | | | | **31/40** | |

### 1b. Câu ⓘ — R1 (a–e, mỗi ô 0–2, tối đa 10)

| Câu | Lượt | a phía | b tự tin | c lý do | d cách kiểm | e tách | **/10** |
|---|---|---|---|---|---|---|---|
| SP5 | lan1 | 0 | 0 | 1 | 1 | 2 | **4** |
| SP5 | lan2 | 0 | 0 | 1 | 2 | 2 | **5** |
| SP6 | lan1 | 0 | 0 | 2 | 1 | 2 | **5** |
| SP6 | lan2 | 0 | 0 | 2 | 1 | 2 | **5** |
| SP7 | lan1 | 0 | 0 | 1 | 1 | 2 | **4** |
| SP7 | lan2 | 1 | 0 | 2 | 1 | 2 | **6** |
| **Tổng** | lan1 | 0 | 0 | 4 | 3 | 6 | **13/30** |
| **Tổng** | lan2 | 1 | 0 | 5 | 4 | 6 | **16/30** |

### 1c. N6 — dùng kho (0–2 mỗi câu)

| Câu | lan1 | lan2 | Kho shop 17fishing lan1 | Kho shop 17fishing lan2 |
|---|---|---|---|---|
| SP1 | 2 | 2 | — | — |
| SP2 | 2 | 2 | — | `17fishing/CLAUDE.md` |
| SP3 | 2 | 2 | — | — |
| SP4 | 2 | 2 | `17fishing/CLAUDE.md`, `17fishing/QUAN-LY.md` | `17fishing/CLAUDE.md`, `17fishing/workflows/clone-san-pham/ho-so-danh-muc/phao.yaml` |
| SP5 | 2 | 2 | — | — |
| SP6 | 2 | 2 | `17fishing/QUAN-LY.md` | `phao.yaml`, `17fishing/CLAUDE.md` |
| SP7 | **1** | 2 | — | `chung/HANG-DOI-BAI-Y-DINH-MUA.md`, `17fishing/CLAUDE.md` |
| SP8 | 2 | 2 | — | — |
| **Tổng** | **15/16** | **16/16** | 2/8 câu chạm kho shop | 4/8 câu chạm kho shop |

**Kho shop chưa lượt nào chạm tới:** `17fishing/GIONG-TRANG-SAN-PHAM.md` (vốn từ dân câu dòng 136–140: "bắt nhịp · giật hụt ·
tín hiệu giả · hồ dịch vụ · hồ nhát mồi"; và 5 câu hỏi chủ shop dòng 191–195 — trong đó có đúng "Khách hỏi gì nhiều nhất trước
khi chốt" = SP4 và "Món này **không** hợp với ai?" = SP8), `17fishing/giong/`, blog shop (bài
`huong-dan-lua-chon-va-su-dung-phao-dien-cau-dem` được liệt kê ở `chung/HANG-DOI-BAI-Y-DINH-MUA.md` dòng 80).
Câu 1, 3, 8 không lượt nào mở `17fishing/CLAUDE.md` dòng 14 ("Khách là cần thủ, phần lớn câu đài hồ dịch vụ và câu đêm").

Lưu ý thang N6: thang hiện chỉ hỏi "đọc nguồn liên quan và trỏ nguồn" nên chấm hồ sơ sản phẩm là đủ 2 — điểm cao này **không**
phản ánh việc bỏ sót kho shop. Xem phân tích N6 ở mục 4.

### 1d. Độ lệch lan1 ↔ lan2

| Câu | Thang | lan1 | lan2 | Δ | Cờ | N6 Δ |
|---|---|---|---|---|---|---|
| SP1 | R2 a–d | 6 | 6 | 0 | | 0 |
| SP2 | R2 a–d | 6 | 7 | +1 (ô b) | | 0 |
| SP3 | R2 a–d | 7 | 7 | 0 | | 0 |
| SP4 | R2 a–d | 4 | 5 | +1 (ô d) | | 0 |
| SP5 | R1 | 4 | 5 | +1 (ô d) | | 0 |
| SP6 | R1 | 5 | 5 | 0 | | 0 |
| SP7 | R1 | 4 | 6 | **+2** (ô a, c) | ⚑ | +1 |
| SP8 | R2 a–d | 6 | 6 | 0 | | 0 |

Một cờ ⚑ (SP7). Nguyên nhân chênh: lan2 tìm ra tệp giá trong kho (`chung/HANG-DOI-BAI-Y-DINH-MUA.md`), lan1 không — tức chênh
do **việc tìm kho có may rủi**, không do cách lập luận khác. Phần còn lại ổn định (Δ ≤ 1).

---

## 2. Lý do từng ô — câu ⓘ (R1)

### SP5 — pin được mấy buổi câu đêm (sếp: "3 buổi câu")

**lan1 = 4**
- a = 0 · từ chối chọn: *"Em không biết, và em không đoán số."*
- b = 0 · không có mức tự tin nào.
- c = 1 · lý do có trỏ hồ sơ nhưng chỉ nói vì sao KHÔNG có số (*"Trang không ghi thời lượng pin… hồ sơ để ⬜ và mục 6 còn cấm"*), không có lý do nào về đại lượng (loại pin, độ dài buổi câu).
- d = 1 · có cách kiểm cụ thể, rẻ nhưng không ngưỡng/hạn: *"lắp pin mới, để đuôi sáng liên tục, ghi lúc bắt đầu và lúc tắt"*.
- e = 2 · tách sạch: *"Điều em nói được: pin CR425, shop tặng 1 viên… lâu không dùng thì tháo pin ra (trang)"*.

**lan2 = 5**
- a = 0 · *"Em không trả lời bằng con số được, anh ạ."*
- b = 0 · không có.
- c = 1 · như lan1: lý do là vắng dữ liệu (*"Em đã đọc mô tả, FAQ, đánh giá, chữ trên video và chữ trên 8 ảnh, không chỗ nào có ⬜"*).
- d = 2 · cụ thể, rẻ, có hạn và điểm dừng: *"để trong chậu nước tối rồi ghi giờ bắt đầu và giờ đèn yếu hẳn. Một đêm là có số giờ. Chia cho độ dài một buổi câu đêm anh hay tính (ví dụ 4–5 tiếng)"*.
- e = 2 · mọi câu có ✅/⬜; câu đề xuất trả khách *"Câu đó đúng 100 %"* chỉ chứa sự thật đã kiểm.

### SP6 — đổi trả vì lỗi gì nhất (sếp: "100% nhận hàng không trả hàng")

**lan1 = 5**
- a = 0 · liệt kê 4 rủi ro ngang nhau, không nghiêng: *"Nói 'lỗi nào nhiều nhất' lúc này là bịa."* — dữ liệu agent có (1 đơn, không lý do trả) đủ để nghiêng về "gần như chưa có ca nào" mà agent không nói ra.
- b = 0 · không có.
- c = 2 · trỏ số liệu cụ thể: *"Cả hệ thống 17fishing chỉ có 1 đơn còn lại; có vết 2 đơn trả hàng tháng 4/2026 nhưng chính hai đơn đó đã bị xoá cứng"* (đúng `QUAN-LY.md`).
- d = 1 · *"Nếu anh có nhớ khách từng trả phao điện vì gì… anh kể em một câu"* — rẻ nhưng không ngưỡng, không hạn.
- e = 2 · *"chỉ ra rủi ro đổi trả theo hồ sơ (⚠ suy, không phải số đo)"*.

**lan2 = 5**
- a = 0 · *"Em không nói 'lỗi hay gặp nhất' được, vì không có gì để đếm."*
- b = 0 · không có.
- c = 2 · trỏ `phao.yaml` `ruiRoHayGap`, trang ("lỗi nhà sản xuất đổi 1 đổi 1"), và phát hiện lệch freeship 150k/100k có thật.
- d = 1 · có ngưỡng nhưng không hạn: *"mỗi lần đổi trả… nhắn em một dòng (mã nào, lỗi gì). Sau khoảng 10 ca em xếp được"* — với shop chưa có ca nào, ngưỡng 10 ca có thể không bao giờ tới.
- e = 2 · từng mục gắn ✅/⚠/⬜ và nguồn.

### SP7 — 99k đắt hay rẻ (sếp: "bình thường")

**lan1 = 4**
- a = 0 · *"Em không có giá thị trường của phao điện khác để nói đắt hay rẻ… nên em không phán."*
- b = 0 · không có.
- c = 1 · lý do đáng tiền hợp lý (ngày+đêm, kèm pin, COD) nhưng không có số so sánh nào; tệp giá trong kho có mà không mở.
- d = 1 · *"nếu anh cho em vài mức giá phao điện anh hay thấy, em sẽ ghi vào hồ sơ"* — mơ hồ.
- e = 2 · tách số có nguồn (giá, freeship 150k) khỏi gợi ý: *"em ghi là gợi ý, anh quyết có đẩy hay không"*.

**lan2 = 6**
- a = 1 · nghiêng "cao trong nhóm phao của shop" (*"99k là giá cao nhất trong nhóm phao của shop, đắt hơn phao điện chép 14k"*) nhưng với đúng câu hỏi thì rào: *"'Đắt hay rẻ với người câu rô diếc hồ dịch vụ' thì em không đo được ⬜"*. Phía nghiêng còn hơi ngược sếp ("bình thường") nhưng có lý.
- b = 0 · chỉ có *"⚠ Số cũ gần 2 tháng"* — là chất lượng dữ liệu, không phải mức tự tin.
- c = 2 · trỏ tệp và số: *"phao điện chép 85.000 ₫ · phao nano Chuanze 99.000 ₫ · phao nano Ngọc Liên Sơn 80.000 ₫ ✅ chung/HANG-DOI-BAI-Y-DINH-MUA.md"*.
- d = 1 · *"chạy video 1–2 tuần rồi đếm số người nhắn Zalo hỏi mua, xem có ai chê giá không"* — có hạn, ngưỡng không rõ.
- e = 2 · ✅/⚠/⬜ nhất quán; thêm ý giá trị: rủi ro "giá gốc 199k + đồng hồ đếm ngược" với luật Meta/TikTok.

---

## 3. Lý do từng ô — câu thường (R2)

### SP1 — là gì, cho ai, hoạt động thế nào
- **lan1 6** · a=2 (câu đài, tải chì, hồ dịch vụ, vạch phao, mắt phao, cắn nhẹ) · b=1 (người mua = lời shop trên trang, nói rõ chưa có dữ liệu khách; không bối cảnh ngách) · c=1 (một chân dung "câu đài rô phi, diếc, hay câu đêm ở hồ dịch vụ"; không tách mắt kém / chiều tối / câu ngày như sếp) · d=2 (thông số 3 mã đúng, đổi đỏ đo theo giây, đảo pin, bắt hai lỗi ảnh 5 và QF-04).
- **lan2 6** · a=2 (thêm "cân 5–7 vạch, câu 2–4 vạch", "nhấp nhanh") · b=1 · c=1 · d=2.
- So sếp: sếp nói cảm biến "theo độ chìm/nhịp ăn" và nhóm "mắt kém, trời mờ, nền nước tối" — hai lượt để cơ chế ⬜ (đúng, chưa được biết) và không nêu nhóm mắt kém.

### SP2 — điểm mạnh so với phao điện khác
- **lan1 6** · a=2 · b=1 (so với phương án thay thế từ trang; "phao điện thường chỉ một màu là em suy") · c=1 · d=2.
- **lan2 7** · a=2 · b=2 (so có nguồn với phao điện chép của shop *"kèm hai đuôi… ✅ 17fishing/CLAUDE.md"*, tải 1,5–3,5 g) · c=1 · d=2.
- So sếp: sếp kể độ nhạy, đèn dứt khoát, pin 12 h sạc được, chống nước. Agent chủ động **loại** "độ nhạy cao" (*"Điều em không đưa vào điểm mạnh… 'Độ nhạy cao'"*) theo hồ sơ mục 6 — đây là điểm mạnh số một của sếp. Không trừ ô d (không sai sự thật), nhưng là lệch hướng do đầu vào (mục 4, N1).

### SP3 — người mới chọn mã nào
- **lan1 7** · a=2 · b=1 (một ước có nhãn: *"Phần 'người mới hay cầm cần ngắn' là em suy"*) · c=2 (tách người mới cần ngắn / cần ≥ 3m6 / hay gió thả xa) · d=2. Chọn **QF-02** — trùng suy luận "cỡ trung" của sếp.
- **lan2 7** · a=2 · b=1 · c=2 · d=2. Chọn QF-02 có điều kiện cần ≥ 3m6; lý do "không nhẹ tới mức gió lăn tăn là lắc liên tục, báo tín hiệu ảo" khớp ý sếp (phao quá nhạy làm người mới rối). Lỗi nhỏ tự mâu thuẫn: bảng ghi QF-01 cho "2m7 – dưới 3m6" nhưng đoạn dưới ghi "cần 2m7–3m3" — không phải sai sự thật sản phẩm.

### SP4 — khách hay hỏi gì trước khi chốt
- Sếp kể 7 câu: nhạy/báo nhầm · pin bao lâu, thay/sạc, mua đâu · chống nước · câu ngày · bảo hành đổi trả · có kèm chì-dây · giá so phao thường.
- **lan1 4** · a=1 (ngôn ngữ thường, ít từ ngách) · b=2 (nguồn thật về người mua: "câu hỏi số một" 21/09, 1 đơn, mua qua Zalo) · c=0 (không phân biệt ai hỏi gì) · d=1 (chỉ 2 mục gắn được câu trả lời của sản phẩm; trùng sếp 3/7: pin bao lâu, chống nước, thay/mua pin).
- **lan2 5** · a=1 · b=2 · c=0 · d=2 (mỗi câu hỏi gắn trạng thái sản phẩm: CR425 ✅, bảng mã ✅, câu ngày FAQ ✅, thời lượng ⬜; trùng sếp 4/7: + câu ngày).
- Cả hai bỏ sót: báo nhầm (dù trang có "báo tín hiệu ảo"), bảo hành (dù trang có "đổi 1 đổi 1 7 ngày"), chì-dây, giá.

### SP8 — không hợp với ai (sếp: "ai cũng hợp")
- **lan1 6** · a=1 · b=1 · c=2 (6 nhóm: chép trắm, hồ > 3,5 m, gió/thả xa, cần < 2m7, bờ đá/kè, người đòi số chắc) · d=2.
- **lan2 6** · a=1 · b=1 (gợi ý bán chéo phao chép) · c=2 (6 nhóm + chủ động KHÔNG xếp người mới, câu sông vào "không hợp" vì trang không nói) · d=2.
- Khác sếp nhưng có nguồn trang (FAQ chép trắm) → theo ghi chú đáp án tính vào ô e chấm mù, không trừ.

---

## 4. Phân tích nguyên nhân theo năng lực

Điểm thô theo năng lực (chưa có ô e, chưa quy cấp):

| Năng lực | Câu | lan1 | lan2 |
|---|---|---|---|
| N1 Hiểu sản phẩm | SP1, SP2, SP8 (a–d) | 18/24 (75 %) | 19/24 (79 %) |
| N2 Hiểu khách | SP3, SP4 (a–d) | 11/16 (69 %) | 12/16 (75 %) |
| N5 Phán đoán thiếu dữ liệu | SP5–7 (R1) | 13/30 (43 %) | 16/30 (53 %) |
| N6 Dùng kho | 8 câu | 15/16 | 16/16 |

### N5 — yếu nhất, và yếu cùng một kiểu: ô a và ô b = 0 ở 6/6 lượt-câu (trừ một ô a = 1)

**Nguyên nhân chính: luật trong gói đẩy sai hướng.** Gói vai và hồ sơ chỉ có một luật cho "không biết": hỏi, không bịa. Không
dòng nào tách **phán đoán nội bộ có nhãn gửi sếp** khỏi **lời hứa trong quảng cáo**, nên agent coi mọi con số ước là "bịa".
- Gói vai `phong-marketing/nhan-su/vai/chuyen-vien-san-pham.md` dòng 48: *"Ba nhãn, không có nhãn thứ tư: ✅ đã kiểm · ⚠ suy ra · ⬜ chưa biết."* — có nhãn ⚠ nhưng không có quy định ⚠ phải kèm mức tin.
- Dòng 49: *"Chỉ hứa điều có trên trang… Thiếu thì hỏi, không bịa."*
- Dòng 145: *"không có dòng → 'hồ sơ không có, cần hỏi sếp'"*.
- Hồ sơ `phong-marketing/khach-hang/17fishing/san-pham/phao-ro-diec.md` mục 6: *"Không bịa số giờ pin — trang không ghi."*
- Bằng chứng agent chập hai thứ: lan2 SP5 *"Chính anh cũng đã chốt luật 'không bịa số giờ pin' (HS mục 6). Nếu em đưa ra một con số kiểu 'khoảng X buổi' thì đó là bịa, và nó sẽ lọt vào lời quảng cáo."* — agent đang áp luật quảng cáo lên câu hỏi phán đoán của sếp.

**Nguyên nhân phụ: thiếu kỹ năng (gói không dạy cách nói mức tin).** `grep "tự tin|nghiêng|%"` trong gói vai: không có dòng nào
dạy nói "nghiêng về X, ~Y %, điều gì làm đổi ý". Ô b = 0 ở cả 6 lượt-câu. Ở SP6 agent có đủ số để nghiêng ("1 đơn, không ghi
nhận lý do trả" → gần như chưa có ca đổi trả, đúng ý sếp) mà không biết biến nó thành phán đoán.

**Nguyên nhân phụ: đầu vào kém (đề).** `DE-THI.md` không đánh dấu ⓘ, không nói câu nào là câu phán đoán, không xin mức tin —
agent không có tín hiệu nào rằng ở câu này "nói không biết" là trả lời thiếu.

Không phải thiếu kiến thức: ô c và e cao (lý do có nguồn, tách nhãn tốt) — agent biết dữ kiện, chỉ không dám kết luận.

### N1 — khá, hụt ở b (thị trường) và c (khách), và lệch hướng ở SP2

- **Đầu vào kém (hồ sơ):** điểm mạnh số một của sếp ("độ nhạy cao") bị hồ sơ mục 6 cấm: *"Không dùng lời chỉ có trên ảnh mà chữ trang không có: … 'Độ nhạy cao' kiểu con số."* Cả hai lượt vì thế xếp "độ nhạy cao" vào danh sách **không** dùng. Các điểm mạnh còn lại của sếp (pin 12 h sạc được, chống nước, cảm biến theo nhịp ăn) nằm ⬜ trong hồ sơ mục 2 — agent không thể biết.
- **Thiếu kiến thức:** không có trang ngành (`nganh/do-cau-vn/` chưa tồn tại — đo `ls` 11/11) về thị trường phao điện, nên ô b dừng ở 1 khi không có tệp giá; lan2 lên 2 ở SP2 chỉ nhờ tìm thấy dữ kiện phao chép trong `17fishing/CLAUDE.md`.
- **Thiếu kỹ năng (nhẹ):** ô c = 1 ở SP1, SP2 dù kho có sẵn chân dung khách: `17fishing/CLAUDE.md` dòng 14 *"Khách là cần thủ, phần lớn câu đài hồ dịch vụ và câu đêm"* — không lượt nào mở ở SP1/SP2.

### N2 — SP3 tốt (7/8, trùng sếp), SP4 yếu (4–5/8)

- **Thiếu kỹ năng:** SP4 bỏ sót 3 câu sếp kể mà dữ kiện trả lời **có sẵn trong hồ sơ**: báo nhầm (hồ sơ mục 2 *"Phao quá nhẹ so với gió sẽ lắc liên tục, báo tín hiệu ảo"*), bảo hành (*"Đổi trả 7 ngày Lỗi nhà sản xuất đổi 1 đổi 1"*), giá. Agent coi "khách hay hỏi gì" là câu cần dữ liệu đếm, không suy từ nỗi lo của người mua. Ô c = 0 ở cả hai lượt: không tách ai hỏi gì (người mới hỏi chọn mã, dân câu đêm hỏi pin…).
- **Luật trong gói đẩy sai hướng (một phần):** gói vai dòng 154: *"Nếu < 5 điểm dữ liệu cho một nhóm khách thì không viết thành 'khách thường…'"* — agent áp đúng luật này (lan1 *"em không xếp hạng 'nhiều nhất' bằng số được"*, lan2 *"em không có nhật ký câu hỏi thật… để xếp hạng ⬜"*), nên co lại danh sách thay vì đưa danh sách có nhãn ⚠.
- **Thiếu kiến thức ngành:** "có kèm chì và dây không" là câu dân câu hỏi nhưng không nằm ở đâu trong kho (cả `phao.yaml` `cauHoiKhung` cũng không có). Kho không có lớp tri thức ngành.
- **Đầu vào kém / không tìm tới:** `17fishing/GIONG-TRANG-SAN-PHAM.md` dòng 191 có đúng câu *"Khách hỏi gì nhiều nhất trước khi chốt món này?"* trong bộ 5 câu phải hỏi chủ shop, và dòng 63 *"Chỗ này tôi không tự bịa được. Những dòng đó phải lấy từ chủ shop."* — đọc được thì agent đã có khung và có lý do chính đáng để xin sếp. Không lượt nào mở (xem N6).

### N6 — điểm thang gần tối đa, nhưng độ phủ kho shop thấp và có may rủi

Thang N6 cho 15/16 và 16/16 vì hồ sơ sản phẩm là nguồn liên quan ở mọi câu. Điểm yếu thật nằm ngoài thang:
- Chỉ 2/8 (lan1) và 4/8 (lan2) câu chạm kho 17fishing; **không lượt nào** mở `GIONG-TRANG-SAN-PHAM.md` (vốn từ dân câu → ô a; 5 câu chủ shop → SP4, SP8), `17fishing/giong/`, hay blog.
- Tìm kho có may rủi: lan1 không thấy tệp giá, lan2 thấy → lệch ⚑ ở SP7.

Nguyên nhân:
- **Đầu vào kém (gói vai không trỏ kho shop):** `grep "17fishing|GIONG|QUAN-LY|chung/"` trong `phong-marketing/nhan-su/vai/chuyen-vien-san-pham.md` chỉ ra một dòng (423), nói về ảnh 1688 — gói không có đường dẫn nào tới hồ sơ shop, giọng viết, blog hay tệp giá.
- **Đầu vào kém (luật thư mục cho phép nhưng không chỉ đường):** `phong-marketing/CLAUDE.md` dòng 58 cho phép *"Phòng được ĐỌC kho của 17fishing và GaRutin… (hồ sơ shop, giọng viết, blog, Search Console)"* nhưng không ghi tệp nào; trong khi dòng 3 cùng tệp vẫn mở đầu *"Không phải công cụ của 17fishing hay GaRutin"*. Chính tài liệu nghiên cứu đã đoán trước lỗi này: `02-tri-thuc-tri-nho.md` dòng 64 *"Agent không đọc được kho vì không ai đưa mục lục cho nó."*
- **Thiếu kỹ năng (nhẹ):** agent tự tìm được `17fishing/CLAUDE.md` nhưng không lần sang tệp cùng thư mục (`GIONG-TRANG-SAN-PHAM.md` nằm ngay cạnh), và lan1 không tìm "giá phao" trong `chung/`.

### Tóm tắt nguyên nhân

| Năng lực | Nguyên nhân chính | Nguyên nhân phụ |
|---|---|---|
| N5 | Luật gói đẩy sai hướng (dòng 48, 49, 145 + hồ sơ mục 6: "không bịa" áp lên cả phán đoán nội bộ) | Thiếu kỹ năng nói mức tin; đề không đánh dấu ⓘ |
| N1 | Đầu vào kém (hồ sơ ⬜ pin/chống nước/cảm biến; mục 6 cấm "độ nhạy cao") | Thiếu kiến thức ngành; chưa dùng chân dung khách trong kho |
| N2 | Thiếu kỹ năng (không suy câu hỏi từ nỗi lo người mua, không tách nhóm khách) | Luật dòng 154 làm co danh sách; thiếu kiến thức ngành (chì-dây) |
| N6 | Đầu vào kém (gói vai không có mục lục kho shop) | Thiếu kỹ năng lần tệp lân cận; thang N6 không đo độ phủ kho |
