# Mổ xẻ christmasspins.com — đo ngày 13/10/2026

Cửa hàng chủ shop chọn làm mẫu. Tệp này ghi **cơ chế**, không chép nội dung.

Nguồn: `curl` trang sản phẩm `/products/christmas-spins-music-player`,
460 KB HTML. Mọi con số dưới đây lấy từ chính trang đó.

---

## 1. Họ là ai

| | |
|---|---|
| Cửa hàng | `pjczf0-pe.myshopify.com` |
| Theme | **Shrine PRO 1.3.0** — `theme_store_id: null`, tức theme TRẢ TIỀN ngoài Shopify Theme Store |
| Tiền tệ | **AUD** — nhắm Úc, có chuyển tiền tệ theo nước người xem |
| Giá | **116 AUD**, gạch ngang 202 AUD |
| Đánh giá | 4,80 · **1.083 lượt** (Judge.me) |
| App bên thứ ba | **Judge.me** (đánh giá) · **parcelwill** (bảo hiểm vận chuyển) |

App stack mỏng đến bất ngờ: đúng **hai** app. Phần còn lại là section của
theme. Đây là điều đáng học nhất — không cần ba chục app.

---

## 2. Phễu, theo đúng thứ tự khách gặp

1. **Băng chữ chạy trên đỉnh** (4 thông điệp luân phiên): giảm giá có hạn ·
   miễn phí ship toàn cầu · hàng đã nạp sẵn · sắp hết · bảo đảm hoàn tiền 30 ngày
2. **Bằng chứng xã hội NGAY TRÊN TÊN SẢN PHẨM**: `(4.8/5) Loved by 1000+` và
   `200+ Bought This Week`
3. **Ba gạch đầu dòng lợi ích** thay cho mô tả dài
4. **Đồng hồ đếm ngược** "sale ends in 00:00:00"
5. **Nút mua**, rồi ngay dưới là **đếm tồn kho** "Only __ left" kèm câu
   "không bảo đảm nhập thêm trước 25/12"
6. **Ba lời chứng thực ngắn ngay trong trang sản phẩm**, mỗi lời kèm tên và
   thành phố ở BA nước khác nhau (US · UK · AU)
7. **Hộp "Everything Included"** — liệt kê từng món trong gói
8. **Hỏi đáp chặn phản đối số 1** ngay tại chỗ, không đẩy xuống cuối
9. **Khối bảo đảm** — nói rõ cả phần KHÁCH phải trả (phí gửi trả), không hứa suông
10. **Khối vận chuyển** — mốc "đặt trước 12/12 mới kịp Giáng sinh"
11. **Ba bước · không cần cài đặt** — mở hộp, thả đĩa, dán lên tủ lạnh
12. **Sáu lời chứng thực dài hơn**
13. **Hỏi đáp đầy đủ**
14. Giỏ hàng dạng ngăn kéo có **đồng hồ giữ chỗ** và bán kèm
    **Shipping Protection 6 USD**

---

## 3. Bốn cơ chế đáng mang sang, không cần chép chữ nào

| Cơ chế | Vì sao nó chạy |
|---|---|
| **Bằng chứng xã hội đặt TRÊN giá** | Khách đọc "1000+ người mua" trước khi nhìn con số, nên giá được neo vào đám đông chứ không vào ví |
| **Lời chứng thực nằm TRONG trang sản phẩm** | Không bắt khách cuộn xuống khu đánh giá. Đúng bài học đã đo ở 17fishing: hai phần ba người đọc biến mất ngay sau khối đầu |
| **Chặn phản đối tại chỗ** | Câu hỏi lớn nhất được trả lời ngay cạnh nút mua, không nằm ở cuối trang |
| **Bán kèm bảo hiểm vận chuyển** | 6 USD gần như lãi ròng, cộng vào mỗi đơn, khách tự tick |

**Mốc thời gian là thứ mạnh nhất cả trang** — "đặt trước 12/12". Nó không
phải khan hiếm giả; nó là sự thật về vận chuyển, nên vừa thúc giục vừa không
mất lòng tin.

---

## 4. HAI LỖI trong trang của họ — đừng chép mù

1. **Nhãn giá bị đảo ngược.** Trang hiện `Regular price $116.00` và
   `Sale price $202.00`. Đúng ra phải ngược lại. Đây là lỗi gắn biến trong
   theme của họ.
2. **Số phần trăm không khớp.** Băng chữ ghi `40% OFF`, huy hiệu ghi
   `SAVE 42%`, còn giá thật 116/202 ra **42,6%**.

Chép nguyên cấu trúc thì chép luôn cả hai lỗi này.

---

## 5. Ranh giới

**Lấy được:** cấu trúc phễu, thứ tự khối, cơ chế thúc giục, cách chặn phản
đối, bộ app (Judge.me + bảo hiểm ship).

**Không lấy:** mã theme Shrine PRO (có bản quyền, mua được ~320 USD trả một
lần), ảnh sản phẩm, câu chữ, và cái tên `Christmas Spins™`.

Tên là chỗ nguy nhất. Shopify gỡ cửa hàng vì khiếu nại nhãn hiệu nhanh hơn
nhiều so với vì bất cứ lý do nào khác.

---

## 6. Đồng hồ

Đo ngày 13/10/2026:

```
tới 25/12                73 ngày
tới mốc 12/12 của họ     60 ngày
trừ 6–12 ngày vận chuyển → cửa sổ bán thật khoảng 8 tuần
```

Hàng Giáng sinh mà dựng xong tháng 12 thì coi như bỏ một năm.
