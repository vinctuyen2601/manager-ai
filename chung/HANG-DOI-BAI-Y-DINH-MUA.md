# Hàng đợi bài nhắm Ý ĐỊNH MUA — cả hai shop

Lập 18/09/2026 sau khi chủ shop chốt: **bán qua web là mục tiêu, đơn Zalo được
đơn nào hay đơn đó, không tính vào**.

---

## Vì sao loại bài này, không phải bài kỹ thuật

Đo 90 ngày, 17fishing:

| loại trang | hiển thị | CTR |
|---|---|---|
| trang sản phẩm | 1.009 (11%) | **8,8%** |
| bài blog | 8.374 (89%) | 1,3% |

**Một hiển thị vào trang sản phẩm đáng giá gấp 6,8 lần** một hiển thị blog. Bài
kỹ thuật kéo hiển thị nhưng gần như không kéo người; việc của bài ý định mua là
đẩy hiển thị về phía trang sản phẩm.

**Và quan trọng hơn: đây là vấn đề LƯU LƯỢNG, không phải chuyển đổi.** 17fishing
có 194 người xem sản phẩm trong *toàn bộ lịch sử* và 2 đơn. Gấp đôi tỉ lệ chỉ
thêm 2 đơn; gấp 5 lượng người xem thì thêm 8 đơn ở đúng tỉ lệ hiện tại. Tối ưu
checkout ở quy mô này là tối ưu quá sớm.

---

## Phép kiểm bắt buộc trước khi viết

Chạy `POST /admin/keywords/doi-thu` với `{keywords:[…]}` — nó gọi serper phía
máy chủ và tự kết luận `voi-toi-duoc` hoặc `kho-voi-toi`.

**Bỏ truy vấn nào trang một bị sàn chiếm.** Đây chính là phép kiểm đã bác trang
"mua chuồng gà rutin" ở QĐ-01.

---

## 17fishing — VIẾT MỚI, 3 bài

Kho ở **Đông Tiên Hưng, Hưng Yên** (sát Hà Nội). Chưa có bài ý định mua nào:
2/89 bài, trong khi GaRutin 8/52.

### 1. Mua đồ câu ở Hà Nội — ưu tiên cao nhất
`mua đồ câu cá hà nội` → **voi-toi-duoc · 0 sàn · 1 mạng xã hội**

Trang một toàn shop nhỏ: docautuankiet, cancau24h, vuadocau, adocau, cộng một
bài toplist. Không có Shopee, không có Lazada. Đây là truy vấn dễ với tới nhất
trong tất cả những gì đo được hôm nay.

**Phải trung thực về địa chỉ:** kho ở Hưng Yên, không phải Hà Nội. Viết như một
shop online giao Hà Nội nhanh, đừng giả vờ có cửa hàng ở nội thành.

Dẫn tới: `/san-pham` và các trang danh mục.

### 2. Cần câu tay chính hãng
`cần câu tay chính hãng` → **voi-toi-duoc · 1 sàn · 0 mạng xã hội**

Cụm 4 truy vấn: `chính hãng`, `8h chính hãng`, `shimano nhật chính hãng`,
`daiwa chính hãng`. Đối thủ là shop chuyên (vuadocau, krf.vn, shopcancau,
ngocbienfishing) — **và vietnam-fishing.com đứng số 1**.

Shop **không bán Shimano/Daiwa**, nên đừng viết bài so thương hiệu rồi không
bán được gì. Góc đúng: nhận biết hàng thật, rồi dẫn vào Thanh Long và Strong
Bull.

Cẩn thận trùng với `ky-1-…` (*Chọn Cần Câu Tốt: Sáu Thứ Kiểm Được Bằng Tay*) —
bài đó nói về CHẤT LƯỢNG, bài này nói về HÀNG THẬT. Nếu viết mà thấy lặp quá
thì mở rộng bài cũ thay vì đẻ bài mới.

### 3. Phao câu đài giá bao nhiêu
`phao câu đài giá rẻ` + `phao câu đài chính hãng` → **voi-toi-duoc · 1 sàn**

Shopee đứng #1 nhưng phần còn lại là shop chuyên. Dẫn vào 3 phao đang bán, có
giá thật: phao điện 85.000đ, Chuanze 99.000đ, Ngọc Liên Sơn 80.000đ.

---

## GaRutin — KHÔNG viết mới, sửa 2 bài đã có

**Bằng chứng để không viết thêm bài "mua gà rutin ở [tỉnh]":**

| bài | hiển thị |
|---|---|
| `mua-ga-rutin-tp-hcm` | **1.626 · 120 nhấp** |
| `mua-ga-rutin-mien-tay` | **0** |
| `mua-ga-rutin-dong-nai-binh-duong-vung-tau` | **0** |

Cùng khuôn, cùng cách viết, nhưng chỉ bài TP HCM chạy — **vì trại ở Bình Tân,
TP HCM thật**. Ý định địa phương ăn thua ở chỗ có mặt thật, không ở chỗ gọi tên
tỉnh. Thí nghiệm đó đã chạy hai lần và thất bại hai lần; đừng chạy lần ba.

### 1. `chon-giong-ga-rutin` — 5 hiển thị, **0 link sản phẩm**
`mua con giống gà rutin` và `giống gà rutin mua ở đâu` đều **voi-toi-duoc**, và
GaRutin **không có mặt trên trang một** của cả hai. Đối thủ: lolipet.net,
gionggiacam.net, binhquan.com.vn. Sàn chỉ chiếm 1 chỗ.

Việc: đổi tiêu đề nhắm thẳng truy vấn mua, và thêm liên kết sản phẩm.

### 2. `ga-rutin-giong-tp-hcm` — 4 hiển thị, **0 link sản phẩm**
Cùng vùng với bài đang thắng. Thêm liên kết sản phẩm.

---

## Bỏ hẳn

**Cụm trứng gà rutin.** Nhu cầu lớn — `trứng gà rutin mua ở đâu`, `giá bán
trứng`, `thu mua trứng`, `1 quả bao nhiêu tiền` — nhưng:

1. `trứng gà rutin mua ở đâu` → **kho-voi-toi**, Shopee #1 và 4 mạng xã hội
2. **Trại không bán trứng.** 20 sản phẩm không có món trứng nào.

Kéo người tìm mua trứng về một trang không bán trứng là mua lưu lượng không
tiêu được. Chỉ mở lại nếu trại bắt đầu bán trứng có phôi.
