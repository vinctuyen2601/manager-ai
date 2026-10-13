# Shopify — chỉ dẫn cho trợ lý

Đọc `~/my-project/CLAUDE.md` trước (vai trò, quyền hạn, bẫy chung), rồi tệp này.

Tài sản thứ ba, bắt đầu 13/10/2026. Hai tệp cùng thư mục:
`MAU-CHRISTMASSPINS.md` (mổ xẻ cửa hàng mẫu) và `BAY-DA-TRA-GIA.md`
(**đọc trước khi gõ lệnh `shopify` nào**).

---

## 0. QUYỀN PUBLISH — chủ shop chốt 13/10/2026

> **Store còn khoá mật khẩu → publish thẳng, KHÔNG hỏi.**
> **Store đã mở bán → đẩy lên theme chưa xuất bản, đưa link xem trước, chờ
> chủ shop gật rồi mới publish.**

Nguyên văn chủ shop: *"Khi store còn khoá mật khẩu — tôi publish thẳng,
không hỏi. Không ai thấy, hỏi chỉ tốn thời gian của anh. OK nhé"*

**Vì sao:** đây là ngoại lệ có chủ đích cho luật "mọi thứ gửi ra ngoài phải
hỏi trước" ở `CLAUDE.md` gốc. Khoá mật khẩu bật thì mặt tiền trả 302 về
`/password`, không một người lạ nào xem được, nên publish lúc đó không phải
là "gửi ra ngoài" — nó chỉ là đổi bản dựng mà chính chủ shop đang xem.

**Cách kiểm trước khi publish — bắt buộc, một lệnh:**

```bash
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://<store>.myshopify.com
# 302 -> /password  = còn khoá  -> publish thẳng
# 200               = đã mở bán -> PHẢI hỏi
```

Đừng nhớ theo trí nhớ phiên trước. Chủ shop tắt khoá lúc nào không báo.

**Luôn giữ đường lùi:** theme cũ sau khi bị thay vẫn nằm ở trạng thái
`unpublished`. Ghi lại id của nó trong câu trả lời để lùi được ngay.

---

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
