# Shopify — chỉ dẫn cho trợ lý

Đọc `~/my-project/CLAUDE.md` trước (vai trò, quyền hạn, bẫy chung), rồi tệp này.

Tài sản thứ ba, bắt đầu 13/10/2026. Hai tệp cùng thư mục:
`MAU-CHRISTMASSPINS.md` (mổ xẻ cửa hàng mẫu) và `BAY-DA-TRA-GIA.md`
(**đọc trước khi gõ lệnh `shopify` nào**).

---

## 0. QUYỀN PUBLISH — chủ shop nới rộng 13/10/2026

> **Store chưa bán thật → publish thẳng, KHÔNG hỏi.**
> **Store đã bán thật → đẩy lên theme chưa xuất bản, đưa link xem trước,
> chờ chủ shop gật rồi mới publish.**

Nguyên văn: *"bạn tự publish đi nhé, chưa lên online thì cứ thoải mái mà
host nhé"*

**Mốc này đã đổi một lần trong cùng ngày, đọc kỹ.** Bản đầu tôi ghi mốc là
"còn khoá mật khẩu". Vài giờ sau chủ shop tắt khoá, phép kiểm của tôi bắt
được và tôi dừng lại hỏi — chủ shop nói cứ publish. Nên **mốc thật không
phải khoá mật khẩu, mà là CÓ KHÁCH THẬT CHƯA.**

Hiện trạng 13/10/2026: store mở công khai (trả 200), nhưng chưa chạy quảng
cáo, chưa có sản phẩm, chưa có đơn nào. Tức là chưa ai vào.

**Dấu hiệu phải quay lại hỏi trước khi publish — bất kỳ cái nào:**

- đã chạy quảng cáo, hoặc đang có lưu lượng thật
- đã có đơn hàng
- chủ shop nói store đã mở bán

Chưa thấy dấu hiệu nào thì cứ publish, báo lại sau. **Luôn ghi id theme cũ**
trong câu trả lời — nó chuyển sang `unpublished` chứ không mất, nên lùi lại
được ngay.

## 1. Cửa hàng

```
store      5jxr9j-bp.myshopify.com
admin      https://5jxr9j-bp.myshopify.com/admin
repo       ~/my-project/shop-christmasspin
           git@github-personal:vinctuyen2601/shop-christmasspin
theme nền  Horizon (theme mặc định mới của Shopify, dùng theme blocks)
```

Mẫu chủ shop chọn để dựng theo: `christmasspins.com` — bán một sản phẩm
duy nhất, 116 AUD, nhắm Úc. Xem `MAU-CHRISTMASSPINS.md`.

**Đây là tài sản MỚI, chưa bán được đồng nào.** Đừng so với 17fishing hay
GaRutin, và đừng suy số liệu từ hai shop kia sang.

---

## 2. Ranh giới khi "dựng theo mẫu"

Chủ shop yêu cầu làm giống mẫu 100%, ảnh và logo tự thay sau. Đã chốt
13/10/2026 là làm thế này:

| Lấy | Không lấy |
|---|---|
| cấu trúc phễu, thứ tự khối | mã theme Shrine PRO (có bản quyền) |
| cơ chế thúc giục, cách chặn phản đối | ảnh sản phẩm |
| bảng màu, font | câu chữ nguyên văn |
| bộ app | tên thương hiệu `Christmas Spins™` |

Câu chữ viết mới, làm đúng việc của bản gốc. Mất hai mươi phút, và đó là
thứ duy nhất bên kia kiện được.

---

## 3. Quyết định đã chốt, đừng bàn lại

**KHÔNG mua Shrine PRO (~320 USD).** Đếm ngày 13/10: Horizon có sẵn 39
section và 94 block, phủ gần hết cơ chế của mẫu — kể cả `product-inventory`
(đếm tồn kho), `accordion`, `comparison-slider`, `marquee`. Thiếu đúng đồng
hồ đếm ngược và đồng hồ giữ chỗ giỏ hàng, cả hai đã tự viết xong.

**Đồng hồ đếm ngược mặc định đếm tới MỐC CÓ THẬT** (hạn gửi hàng), không
quay vòng mỗi ngày, và hết hạn thì tự ẩn. Chủ shop vẫn bật được chế độ quay
vòng bằng một ô chọn trong trình soạn theme nếu muốn.

---

## 4. Việc còn treo — chỉ chủ shop làm được

- Tạo sản phẩm. **Chưa có sản phẩm nào**, nên trang sản phẩm 14 khối chưa
  xem được
- Menu điều hướng: Home / Contact / Track Your Order
- Chính sách đổi trả và vận chuyển ở Settings › Policies
- Trang `/pages/contact`
- App: Judge.me (đánh giá) + một app bảo hiểm vận chuyển
- Ảnh và logo
- Đổi tên store, đang còn là mặc định **"My Store"**

---

## 5. Đồng hồ mùa vụ

Hàng Giáng sinh. Đo ngày 13/10/2026: còn 73 ngày tới 25/12, trừ 6–12 ngày
vận chuyển thì **cửa sổ bán thật khoảng 8 tuần**. Dựng xong tháng 12 là bỏ
cả năm. Ràng buộc này chi phối mọi thứ tự ưu tiên ở đây.
