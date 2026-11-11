---
loai: hoi-dap
nguon: [17fishing/CLAUDE.md:11-16, 17fishing/CLAUDE.md:561-568, 17fishing/CLAUDE.md:829-832, 17fishing/CLAUDE.md:863-866, 17fishing/CLAUDE.md:940-997, 17fishing/QUAN-LY.md:68-75, 17fishing/QUAN-LY.md:105-108, 17fishing/GIONG-TRANG-SAN-PHAM.md:93-104, 17fishing/HANG-DOI-BAI.md:45-79, 17fishing/giong/vi-du-da-duyet.json, 17fishing/san-pham/can-lang-xe-bennuo/mo-ta-saoluu-truoc-sua-20260930.json, 17fishing/workflows/clone-san-pham/ho-so-danh-muc/*.yaml, reel/san-pham/phao-ro-diec.md:27, reel/san-pham/phao-ro-diec.md:70, chung/HANG-DOI-BAI-Y-DINH-MUA.md:79-81]
ngay: 2026-11-11
muc_tin: trung-binh
khoa: false
---
# Hỏi đáp: chọn đồ theo kiểu câu

Khách mua theo **lối câu**, không mua "đồ câu" chung. Trang này nối lối câu với món shop đang bán.

## Bảng nhanh: lối câu → món của shop

| Lối câu | Món shop có | Món shop KHÔNG có | Nguồn · nhãn |
|---|---|---|---|
| Câu đài hồ dịch vụ, ban ngày | phao nano (Chuanze 120k, Ngọc Liên Sơn 80k), lưỡi ISENI 55k, cước Chuanze 0.8–4.0 | chì, cần tay phổ thông | ✅ `gia.md` · `17fishing/CLAUDE.md:963-967` · sếp 11/11 |
| Câu đêm rô phi, diếc | phao rô diếc LED-425 (99k) | | ✅ `reel/san-pham/phao-ro-diec.md:27` |
| Câu đêm chép, trắm | phao điện chuyên chép | | ✅ `reel/san-pham/phao-ro-diec.md:12, 70` |
| Săn hàng (trắm đen, tra, lăng) | cần đài Strong Bull từ 1,6tr, ghế | | ✅ `17fishing/QUAN-LY.md:70` · `17fishing/CLAUDE.md:994` |
| Lăng xê, câu lục, câu xa | cần Bennuo, máy NAG / AS H1 / Tokushima | | ✅ `can-lang-xe.yaml` · mô tả Bennuo |
| Ngồi bờ cả buổi | ghế Zhongzhou, ghế AK Power, túi ZKAI | gác cần | ✅ `17fishing/QUAN-LY.md:113-118` |
| Mồi, cám | | cám, hương liệu, mồi giả lure | ✅ `17fishing/QUAN-LY.md:113-118` (đo 10/09) |

## Cần

**C1. Cần đài khác cần lăng xê chỗ nào?**
✅ Cần đài là cần tay, **không có khoen dẫn, không có chân máy**, câu bằng chính cây cần. Cần lăng xê có khoen dẫn, chân máy, cước chạy trên cần. Thông số đáng giá cũng khác: cần đài nói tải chì, độ cứng; cần lăng xê nói chì ném được, số khoen, đường kính khoen đỉnh. `ho-so-danh-muc/can-lang-xe.yaml:3-14`

**C2. Lăng xê với lục khác gì, lấy cây nào?**
✅ Theo mô tả Bennuo (bản 30/09):
- **Lăng xê:** ném chì ra xa rồi chờ. Ngọn mảnh hơn, bắt tín hiệu tốt hơn, nhẹ hơn: cỡ 4m5 nặng 566 g, sức kéo 12,5 kg.
- **Lục:** giật và kéo thẳng cá lớn lên. Cỡ 4m5 nặng 820 g, sức kéo 15 kg. Ghì được con cá mà cây lăng xê phải dìu.
- Cả chín cỡ ném được chì **200–250 g tính cả mồi**. Vượt là gãy ngọn, lỗi dùng, không bảo hành được.
- Khoen gấp sát thân: cây 4m5 thu còn **128 cm**, vừa cốp xe.

**C3. Mua cần lăng xê rồi còn cần gì?**
✅ Máy cuộn lớn chứa được vài trăm mét cước, và cước trục số 8 trở lên. Cước câu đài số nhỏ đứt ngay cú ném đầu. Mô tả Bennuo (bản 30/09)
✅ Cảnh cần lăng xê phải có máy lắp vào. Không quay cần lăng xê ở hồ dịch vụ nhỏ kiểu câu đài: sai lối câu. `can-lang-xe.yaml:110-118`

**C4. Người mới nên lấy cần nào?**
✅ Lời khuyên shop giữ: "4H, cỡ 3m6 dễ dùng nhất cho người mới". `17fishing/CLAUDE.md:945-946`
✅ **Shop hiện không có cần đó.** Cần đài duy nhất là Strong Bull săn hàng, mà mô tả của nó ghi "người mới tập thì đừng bắt đầu bằng cần này". **Đừng đẩy người mới sang Strong Bull.** Trỏ về danh mục, không bịa món thay thế. `17fishing/CLAUDE.md:947-967`

**C5. Strong Bull kéo được cá bao nhiêu?**
✅ Chỉ nói thông số in trên ảnh: **"10KG tải tĩnh MAX"**. Banner cùng ảnh ghi "cá nặng 100 pound": cấm chép, hai số đánh nhau. `17fishing/CLAUDE.md:863-866`

**C6. Khách hỏi gì về cần?**
✅ "Cần này câu cá cỡ nào?" · "Thu gọn còn bao nhiêu, xe máy chở được không?" · "Cầm có nặng tay không khi câu cả buổi?" · "Gãy ngọn thì mua đốt lẻ được không?" `can-cau.yaml:31-35`
✅ Với cần đắt, câu số 1 là **bảo hành khi nổ lóng**. `17fishing/QUAN-LY.md:108` · ⬜ shop chưa ghi chính sách.

## Máy câu

**M1. Chọn cỡ máy nào?**
✅ Máy NAG: năm cỡ 8000–14000 **cùng** lực hãm 20 kg, cùng vòng bi, cùng ~600 g, cùng giá. Chọn cỡ là chọn **mét cước**: 8000 chứa 230 m cước 0.35, đủ câu bờ, hồ lớn. 10000 chứa 550 m, hợp phần lớn anh em. 14000 chứa 950 m, cho câu lục, câu biển. Chọn dư một bậc không hại, chọn thiếu không chữa được. `17fishing/giong/vi-du-da-duyet.json`

**M2. Máy cỡ 12000 câu tay được không?**
✅ Câu mẫu shop dùng: "cỡ nhỏ nhất đã là 12000, câu tay thì quá to" (máy AS H1). `17fishing/GIONG-TRANG-SAN-PHAM.md:95`

**M3. Câu biển được không?**
✅ Máy spinning không kín nước. Câu biển về phải tráng nước ngọt. Không nói "chống nước mặn" trừ khi hãng công bố. `17fishing/GIONG-TRANG-SAN-PHAM.md:96` · `may-cau.yaml:71-73`

**M4. Lực hãm 20 kg là kéo được cá 20 kg?**
✅ Khách hay hỏi đúng câu này. `may-cau.yaml:67` · ⬜ đáp án shop chốt chưa có. Đừng trả lời "có".

**M5. Khách lo gì nhất với máy?**
✅ "To cỡ nào". Cần cảnh máy trên tay người. Còn: nặng tay không, thuận tay trái được không, bao lâu có hàng. `may-cau.yaml:37-40, 64-69`

## Cước, lưỡi

**L1. Cước shop có cỡ nào?**
✅ 0.8 · 1.0 · 1.2 · 1.5 · 2.0 · 2.5 · 3.0 · 4.0. Số **14 là cỡ lưỡi** lớn nhất, không phải cước. `17fishing/CLAUDE.md:561-568`

**L2. Lưỡi ISENI có gì?**
✅ Lưỡi carbon, đuôi lệch 14°, đóng sâu vào môi cá khi giật nhẹ. Đánh giá thật: "lưỡi đuôi lệch 14 độ này ăn cá nhát cực tốt". `17fishing/QUAN-LY.md:77, 302-303`

## Ghế

**G1. Khách hỏi gì về ghế?**
✅ Chịu bao nhiêu kg · gấp lại để cốp xe được không · bờ dốc, kè đá có vững không · chỉnh mấy nấc. `ghe.yaml:31-35`
✅ Ghế không người ngồi thì không ai đoán được to bằng nào. Cảnh phải có người ngồi, đất dốc. `ghe.yaml:54-56`

**G2. Chân ghế Zhongzhou chỉnh bao nhiêu cm?**
✅ **Chưa chốt** (16 hay 18 cm). Đừng nói số. `17fishing/CLAUDE.md:829-832`

## Câu lửng, câu theo loài

- ✅ Hàng đợi bài có "câu lửng theo loài: trắm, chép, tra" và "câu lửng bằng cần máy". `17fishing/HANG-DOI-BAI.md:55-62`
- ⬜ Hồ sơ chưa có hướng dẫn câu lửng cụ thể. Đừng tự chế kỹ thuật.

## Luật chung khi khuyên chọn

- ✅ Câu "món này không hợp với anh" được nói khi nó giúp chọn đúng. Mua nhầm cỡ là trả hàng, mất ship, ăn đánh giá xấu. `17fishing/GIONG-TRANG-SAN-PHAM.md:93-108`
- ✅ Shop không bán Shimano, Daiwa. Đừng so thương hiệu. `17fishing/HANG-DOI-BAI.md:76-79`
