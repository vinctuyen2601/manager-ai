# Sau khi đặt hàng: quà, hướng dẫn, mã vận đơn

Soạn sẵn ngày 14/10/2026 để **cổng thanh toán thông là dán vào chạy luôn**.

---

## 0. Điều quan trọng nhất, đọc trước

**Không cần thu email trên trang cảm ơn.** Shopify bắt buộc có email (hoặc số
điện thoại) mới đặt được đơn; nó nằm sẵn ở `order.email`. Dựng form thu lại là
làm lại việc đã xong, và khách bỏ qua form thì mất email của chính đơn đó.

🔴 **Phải kiểm một thiết lập:** Admin → Settings → Checkout → *Customer contact
method*. Nếu đang là **"Phone number or email"** thì sẽ có đơn **không có
email** — đúng thứ cần để gửi quà. Đặt về **Email**.

Nhãn ô liên hệ trên checkout hiện ghi "Email or Phone" (khoá
`shopify.checkout.contact.contact_method_title` trong locale theme). Đổi thiết
lập xong thì sửa nhãn này cho khớp, nếu không chữ hứa một đằng ô nhập một nẻo.

---

## 1. Hai trang hướng dẫn — ĐÃ TẠO, đang sống

| trang | nội dung |
|---|---|
| `/pages/setup-guide` | mở hộp → thả đĩa → dán lên tủ lạnh → sạc → xử lý khi không lên đèn |
| `/pages/change-the-songs` | cắm vào máy tính → sao lưu 9 bài gốc → kéo MP3 của mình vào → tháo an toàn → cách phục hồi |

Để là **trang web, không phải PDF**: khách mở trên điện thoại được ngay, không
phải tải, và sửa nội dung không cần gửi lại email cho ai.

### 🔴 Hai chỗ trong hướng dẫn cần chủ shop xác nhận

1. **Cơ chế đĩa NFC khớp với tệp nhạc.** Tôi KHÔNG biết mỗi đĩa nhận bài theo
   tên tệp, theo thứ tự, hay theo mã ghi trong đĩa. Bản hiện tại viết an toàn:
   *"thay một bài rồi thử trước khi thay hết, giữ nguyên tên và vị trí tệp"*.
   Hỏi nhà cung cấp cho chính xác rồi tôi viết lại cho dứt khoát — hướng dẫn
   sai ở bước này thì khách làm theo và hỏng, tệ hơn là không có hướng dẫn.
2. **Trang sản phẩm đang hứa "video guide" ở BA chỗ** (Everything Included ·
   Can I Change the Songs? · FAQ). Chưa có video nào. Hoặc anh quay/xin nhà
   cung cấp, hoặc đổi chữ thành "step-by-step guide" — sửa mất một phút, nói
   tôi là làm.

---

## 2. Email xác nhận đơn — nơi gửi quà và hướng dẫn

Admin → Settings → Notifications → **Order confirmation** → Edit code.
Chèn khối dưới đây **ngay trước** phần tóm tắt đơn.

Vì sao đặt ở email chứ không chỉ ở trang cảm ơn: email tự gửi cho **mọi** đơn,
và nó là thứ khách quay lại tìm. Tab trang cảm ơn thì đóng là mất.
Đặt ở đây cũng **xoá hẳn** việc thủ công "nhớ gửi quà cho từng đơn" — việc kiểu
đó hỏng âm thầm, và hỏng đúng lúc đơn nhiều nhất.

```html
<table class="row" style="margin-top:24px;border-top:1px solid #e5e5e5;">
  <tr><td style="padding-top:24px;">
    <h3 style="margin:0 0 8px;font-size:17px;color:#1a1a1a;">While your parcel is on its way</h3>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#555;">
      Everything below works right now — no need to wait for the box to arrive.
    </p>

    <p style="margin:0 0 10px;font-size:14px;line-height:1.6;">
      🎁 <strong>Your Christmas Mystery Gift</strong><br>
      <a href="{{ shop.url }}/pages/CHUA-CO" style="color:#C30F16;">Open your gift</a>
    </p>

    <p style="margin:0 0 10px;font-size:14px;line-height:1.6;">
      📦 <strong>Setting it up</strong><br>
      <a href="{{ shop.url }}/pages/setup-guide" style="color:#C30F16;">How to set up your Santa Spins Music Box</a>
    </p>

    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;">
      🎵 <strong>Putting your own songs on it</strong><br>
      <a href="{{ shop.url }}/pages/change-the-songs" style="color:#C30F16;">How to swap in your own MP3s</a>
    </p>

    <p style="margin:0;font-size:13px;line-height:1.6;color:#888;">
      A tracking link follows in a separate email the moment your parcel leaves us.
    </p>
  </td></tr>
</table>
```

🔴 `pages/CHUA-CO` là chỗ giữ chỗ — **chưa có ebook**. Xem mục 4.

---

## 3. Mã vận đơn — Shopify đã tự làm, đừng dựng thêm

- Gắn mã vận đơn vào fulfillment → Shopify **tự gửi** email *Shipping
  confirmation*. Không phải việc thủ công.
- Mỗi đơn có **trang trạng thái riêng** (link trong email xác nhận), tự hiện
  tracking khi có.
- `/pages/track-your-order` hiện tại **chỉ là chữ** — 0 form, 0 input. Nó giải
  thích "link được gửi qua email, kiểm thư rác" và phải làm gì nếu 10 ngày chưa
  nhúc nhích. Không tra cứu được.

### Mắt xích quyết định

**Mã vận đơn từ AliExpress phải về được Shopify.** DSers làm tự động nếu bật
đồng bộ. Tôi **chưa xác nhận được DSers còn cài hay không** — app của tôi bị từ
chối ở `appInstallations` (thiếu scope `read_apps`).

Và một vấn đề đã biết của hàng dropship: **mã vận đơn AliExpress thường không
khớp danh sách hãng vận chuyển mặc định của Shopify**, nên link tracking ra
trang trống. Đó là lý do phần lớn store kiểu này dùng một app tracking
(17TRACK, ParcelPanel): vừa chuẩn hoá hãng, vừa cho một trang tra cứu thật
thay cho trang chữ hiện tại. **Chưa cài, chưa đề xuất chính thức** — để sau khi
có đơn thật rồi xem có cần không.

---

## 4. Ebook "Christmas Mystery Gift" — CHƯA CÓ, cần chủ shop

Trang đang hứa "+ 1x Christmas Mystery Gift (FREE)" ở **cả ba gói**. Trong
Shopify Files không có tệp nào ngoài ảnh và hai video — **không có ebook**.

Trang sản phẩm cố tình không nói nó là gì ("mystery"), nên anh còn tự do chọn.
Hai hướng hợp với sản phẩm:

- **Danh sách phát** — gợi ý bài cho từng khoảnh khắc Giáng sinh (sáng mở quà,
  bữa tối, tối muộn), kèm hướng dẫn nạp bài nào vào đĩa nào.
- **Sổ tay giữ kỷ niệm** — cách dùng một đĩa để ghi lời nhắn, ý tưởng tặng
  theo năm.

Nói tôi chọn hướng nào thì tôi viết, dựng thành trang như hai hướng dẫn trên,
rồi thay `pages/CHUA-CO` trong email.

---

## 5. Việc theo thứ tự

| ai | việc | khi nào |
|---|---|---|
| chủ shop | kiểm *Customer contact method* đặt về **Email** | trước đơn đầu tiên |
| chủ shop | xác nhận DSers còn bật đồng bộ tracking | trước đơn đầu tiên |
| chủ shop | hỏi nhà cung cấp cơ chế đĩa ↔ tệp nhạc | trước khi quảng cáo |
| chủ shop | chốt "video guide" hay "step-by-step guide" | một phút |
| chủ shop | chọn hướng ebook | khi rảnh |
| trợ lý | dán khối vào Order confirmation | khi cổng thông |
| trợ lý | khối tải nhanh ở trang cảm ơn | khi cổng thông |
| trợ lý | viết ebook | sau khi chốt hướng |

**Không việc nào ở đây chạy được trước khi có cổng thanh toán** — chưa có đơn
thì không có email nào để gửi, không có mã vận đơn nào để tra.
