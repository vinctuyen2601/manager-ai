# Khuôn hồ sơ doanh nghiệp — lớp 1 · Foundation (lập 11/11/2026)

Một tệp cho mỗi shop: `khach-hang/<shop>/HO-SO.md`. Là thứ phòng **biết về doanh nghiệp** — không phải về ngành (gói ngành),
không phải về sản phẩm (hồ sơ sản phẩm). **Trỏ tới** hồ sơ shop có sẵn, không chép.

Viết **hai đợt**, theo kịch bản Trưởng phòng ↔ sếp (`../../nhan-su/viec/tp-lap-doi.md`):

```
---
loai: ho-so-doanh-nghiep
shop: <mã shop>
nganh: <mã ngành trong thu-vien/nganh/>
ngay: <YYYY-MM-DD>
khoa: false        # true ở dòng nào = sếp đã sửa tay, máy không ghi đè
---

## Phần 1 — Trưởng phòng tự khảo sát (TRƯỚC khi đội được thuê; sếp sửa chỗ sai)
| Ô | Nội dung | Nguồn | Sếp xác nhận |
| Bán gì | <loại hàng, số món, dải giá> | | ⬜ / ✅ ngày |
| Cho ai | <nhóm khách chính> | | |
| Chốt đơn ở đâu | <web · Zalo · sàn · cửa hàng> | | |
| Ở đâu, giao thế nào | <kho, cửa hàng, phí ship, freeship> | | |
| Đang mạnh ở đâu | <món/trang/kênh có số liệu tốt> | | |
| Đang thiếu gì | <chỗ hổng phòng thấy> | | |
| Điều không được nói | <luật shop: xuất xứ, phóng đại…> | | |

## Phần 2 — Nhập việc (SAU khi sếp thuê đội; hỏi bằng quiz)
| Ô | Nội dung | Ngày chốt |
| Kênh đăng | <page, tài khoản, ai đăng> | |
| Mục tiêu | <con số + ngày> | |
| Hạn mức chi | <công cụ, quảng cáo / tháng> | |
| Quyền tự chủ | <bảng L0–L3: việc nào tự làm, việc nào hỏi> | |
| Số liệu sau đăng lấy từ đâu | <ai mang về, bao lâu một lần> | |
```
