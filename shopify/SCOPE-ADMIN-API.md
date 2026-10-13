# Scope Admin API cho app "Claude admin"

Chủ shop chốt 13/10/2026: cấp đủ quyền của vai quản lý cửa hàng.

## Chuỗi dán vào ô Scopes

```
read_products,write_products,read_product_listings,write_product_listings,
read_inventory,write_inventory,read_locations,
read_publications,write_publications,
read_content,write_content,read_online_store_pages,write_online_store_pages,
read_online_store_navigation,write_online_store_navigation,
read_themes,write_themes,read_files,write_files,read_script_tags,write_script_tags,
read_translations,write_translations,read_locales,write_locales,
read_markets,write_markets,read_shipping,write_shipping,
read_discounts,write_discounts,read_price_rules,write_price_rules,
read_gift_cards,write_gift_cards,
read_metaobjects,write_metaobjects,read_metaobject_definitions,write_metaobject_definitions,
read_orders,write_orders,read_draft_orders,write_draft_orders,read_order_edits,write_order_edits,
read_fulfillments,write_fulfillments,
read_assigned_fulfillment_orders,write_assigned_fulfillment_orders,
read_merchant_managed_fulfillment_orders,write_merchant_managed_fulfillment_orders,
read_third_party_fulfillment_orders,write_third_party_fulfillment_orders,
read_customers,write_customers,read_checkouts,write_checkouts,
read_analytics,read_reports,write_reports,
read_shopify_payments_payouts,read_shopify_payments_disputes,
read_resource_feedbacks,write_resource_feedbacks
```

Dán thì bỏ hết xuống dòng, thành một chuỗi liền cách nhau bằng dấu phẩy.

## Sáu scope cần DUYỆT RIÊNG

Shopify xếp nhóm **Protected customer data**. Chỉ tick trong ô Scopes là chưa
đủ, phải bật thêm ở mục riêng trong cấu hình app:

```
read_customers  read_orders  read_draft_orders
read_fulfillments  read_checkouts  read_all_orders
```

`read_all_orders` (đơn cũ hơn 60 ngày) còn phải xin Shopify duyệt bằng tay.
Chưa cần thì đừng thêm.

## Vì sao từng nhóm

| Nhóm | Dùng vào việc |
|---|---|
| products, listings, inventory | sửa sản phẩm, giá, tồn kho; khối "Only X left" đọc tồn kho thật |
| publications | bật kênh Online Store — chính lỗi đã làm mất mươi phút ngày 13/10 |
| content, pages, navigation | trang chính sách, trang liên hệ, menu, bài blog |
| themes, files, script_tags | đọc `settings_data.json` TRƯỚC khi push, tránh lặp lỗi xoá App Embed |
| discounts, price_rules, gift_cards | chiến dịch khuyến mãi |
| markets, shipping, translations, locales | bán đa quốc gia, đổi tiền tệ, phí ship |
| orders, fulfillments | theo dõi đơn, đối soát với DSers |
| analytics, reports, payouts | báo cáo — phần việc chính của vai quản lý |

## Rủi ro đi kèm, ghi để nhớ

Client secret của app này **đã nằm trong lịch sử trò chuyện** ngày 13/10. Token
chỉ sống 24 giờ, nhưng ai có secret thì đổi được token mới bất cứ lúc nào, và
giờ token đó mở được gần như toàn bộ cửa hàng.

**Xoay lại secret** ở Dev Dashboard, rồi ghi lại vào
`~/.shopify-store-app-creds`. Làm một lần, không mất gì.
