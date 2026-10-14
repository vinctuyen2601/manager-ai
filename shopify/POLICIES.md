# Policies — nội dung sẵn để dán vào Settings → Policies

Soạn ngày 14/10/2026.

## Vì sao phải làm

Hiện Settings → Policies **chỉ có Privacy policy**. Refund / Shipping / Terms
mới chỉ là **trang thường** (`/pages/...`).

Hệ quả: Shopify lấy link chân trang thanh toán **từ Settings → Policies**, nên
ở bước khách nhập thẻ, ba link đó **không hiện**. Đó đúng là lúc người ta muốn
xem chính sách đổi trả nhất. Một số cổng thanh toán cũng soi mục này.

## Tôi chưa tự làm được

App "Claude admin new" thiếu scope `read_legal_policies` và
`write_legal_policies`. API trả:

> Access denied for shopPolicies field. Required access: `read_legal_policies`

**Đường nhanh hơn:** thêm hai scope đó cho app, nói tôi một tiếng, tôi tạo cả
ba policy + sửa link chân trang + dựng chuyển hướng trong một lượt.

**Đường thủ công:** Admin → Settings → Policies, dán ba khối HTML dưới đây.

## Sau khi tạo xong — ĐỪNG QUÊN BƯỚC NÀY

Tạo policy xong thì mỗi chính sách tồn tại ở **hai URL**:
`/pages/refund-policy` và `/policies/refund-policy` — **trùng nội dung**, Google
sẽ thấy hai trang giống hệt.

Phải làm tiếp:
1. Menu `footer`: đổi ba link từ `/pages/...` sang `/policies/...`
2. Xoá ba trang `/pages/...` và dựng chuyển hướng 301 sang `/policies/...`

Không làm bước 2 thì trang cũ vẫn sống, vẫn được lập chỉ mục, và khách bấm từ
Google vào bản không còn được cập nhật.

---

## Refund policy

Dán vào ô **Refund policy** trong Settings → Policies.

```html
<h2>Before you return anything, contact us first</h2>
<p>Every return has to be authorised by us before you post it. Email
<a href="mailto:support@santaspinshop.com">support@santaspinshop.com</a> with your order number and the reason.
We reply with an authorisation and the correct return address. Parcels sent
back without authorisation can go missing, and we cannot refund what we never
receive.</p>

<h2>30-day money back</h2>
<p>You have 30 days from the day your order arrives to ask for a refund. You
do not have to explain why.</p>
<p>The item has to come back in a condition we can resell: complete, with the
discs and cable, and in its box.</p>
<p><strong>Christmas orders.</strong> Anything bought from 1 November has its
return window extended to 31 January, so a gift bought early can still be
returned after it is opened.</p>

<h2>Who pays return postage</h2>
<p>If it arrives damaged, faulty, or we sent the wrong thing, we cover it. Send
us a photo and we either replace it free or refund you in full. You will not
be asked to post a broken item back at your own cost.</p>
<p>If you simply changed your mind, return postage is yours. We recommend a
tracked service, because the refund depends on the parcel reaching us.</p>

<h2>How long a refund takes</h2>
<p>We process the refund within 3 business days of the parcel arriving, back to
the original payment method. Your bank or card issuer then takes its own time,
usually 5 to 10 business days.</p>
<p>Original shipping is refunded only where the return is our fault.</p>

<h2>Cancelling before dispatch</h2>
<p>Email us as soon as you can. If the order has not yet been handed to the
carrier we cancel it and refund in full. Once it is with the carrier it has to
be handled as a return.</p>

<h2>Things we cannot refund</h2>
<ul>
<li>Items returned without authorisation, or outside the window</li>
<li>Items returned incomplete, or damaged after delivery</li>
<li>Parcels lost on the way back when no tracked service was used</li>
</ul>
```

## Shipping policy

Dán vào ô **Shipping policy** trong Settings → Policies.

```html
<h2>Free worldwide shipping</h2>
<p>Shipping is free on every order, with tracking, and with no minimum spend.
We work with international carriers who hand your parcel to a local courier in
your country, so it arrives the same way your other post does.</p>

<h2>How long it takes</h2>
<ul>
<li>
<strong>Preparing your order:</strong> 2 to 3 business days</li>
<li>
<strong>In transit:</strong> 6 to 12 business days, depending on where you are</li>
</ul>
<p>Both can run longer during peak periods, which includes the weeks before
Christmas. We would rather say that plainly than promise a date we cannot
keep.</p>

<h2>Ordering for Christmas</h2>
<p><strong>Order by 12 December</strong> for delivery before Christmas. Orders
placed after that date will still be sent, but we cannot promise they arrive in
time.</p>

<h2>Tracking</h2>
<p>You get a tracking link by email as soon as the parcel leaves us. It can take
24 to 48 hours before the carrier shows any movement, which is normal and does
not mean anything is wrong.</p>

<h2>Address changes</h2>
<p>Once an order enters our shipping process we cannot change it, including the
address. We ship to the address entered at checkout, so please check it before
you pay.</p>

<h2>Customs and duties</h2>
<p>Most orders arrive with nothing further to pay. Some countries charge import
duty or tax on parcels from abroad, and where they do, that charge is set by
your country and is the recipient's responsibility.</p>

<h2>If a parcel goes missing</h2>
<p>If tracking has not moved for 10 business days, email us. We open a case with
the carrier and either resend or refund you. You do not have to chase the
courier yourself.</p>
```

## Terms of service

Dán vào ô **Terms of service** trong Settings → Policies.

```html
<p>These terms govern your use of this store and any purchase you make here. By
placing an order you agree to them.</p>

<h2>1. The store</h2>
<p>This store is hosted on Shopify Inc., which provides the platform we sell
through. You must be of legal age in the place you live, or have consent from a
parent or guardian, to buy from us.</p>

<h2>2. Products, prices and descriptions</h2>
<p>We describe each product as accurately as we can, including what is in the
box. Screen colours vary between devices, so a product may not look identical
to its photograph.</p>
<p>Prices are shown in the currency displayed at checkout and can change without
notice. If a price or a product detail is wrong, we may cancel the order and
refund you in full rather than hold you to an error.</p>
<p>We may limit quantities or decline an order where we have reason to.</p>

<h2>3. Orders and payment</h2>
<p>An order is an offer to buy. It is accepted when we confirm dispatch. Payment
is taken at checkout and handled by Shopify's payment providers; we do not
store your card details.</p>

<h2>4. Shipping and returns</h2>
<p>Delivery times, costs and the returns process are set out in our
<a href="/pages/shipping-policy">Shipping Policy</a> and
<a href="/pages/refund-policy">Refund Policy</a>, which form part of these
terms.</p>

<h2>5. Using the product</h2>
<p>The player is a consumer item for personal use. Loading your own audio files
onto it is your responsibility, including holding the rights to any music you
add.</p>

<h2>6. Our content</h2>
<p>Text, images and design on this site belong to us or are used with
permission. You may not copy or reuse them commercially without our written
consent.</p>

<h2>7. Liability</h2>
<p>Our liability for any order is limited to what you paid for it. Nothing here
removes rights you have under the consumer law of your own country.</p>

<h2>8. Changes</h2>
<p>We may update these terms. The version published here at the time of your
order is the one that applies to it.</p>

<h2>9. Contact</h2>
<p>Questions about these terms go to our <a href="/pages/contact">contact
page</a>.</p>
```
