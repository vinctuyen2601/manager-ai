# Săn xu hướng · theo-dõi-đối-thủ

Shop khác đang chạy quảng cáo gì cho **món tương tự** món của mình: angle, dạng hook, format, chạy bao lâu, mấy phiên bản.
Chỉ dùng **nguồn công khai**, không đăng nhập, không lách chặn. Ra **dấu hiệu** để chọn khung và góc mới, không ra bằng chứng viral.
Kiến thức: `../vai/san-xu-huong.md` §3.2 (kho quảng cáo), §3.3 (lọc), §3.5 (mổ xẻ, swipe file), §3.6 (pháp lý), §3.8 (nhãn).

## Hợp đồng
| | |
|---|---|
| Khi chạy | Việc mới, **chưa có trong luồng nào**. Trưởng phòng giao lẻ: trước `sxh-chuyen-khung` khi thư viện thiếu khung cho loại hàng, hoặc định kỳ theo mùa |
| Nhận | Phiếu: món của mình (tên trên hồ sơ, loại hàng) · thị trường · từ khoá hoặc tên shop đối thủ sếp biết (nếu có) |
| Giao | `NN-sxh-doi-thu.md` trong thư mục lần chạy theo khuôn dưới · phiếu giao |
| Xong khi | Mỗi nguồn đã thử có trạng thái · mỗi quảng cáo ghi có link/ID · phần tổng hợp nói rõ đủ mẫu hay chưa · phiếu đủ ô |

## Luật bắt buộc
1. **Nếu trang đòi đăng nhập, hiện captcha, trả 403/429 hoặc chỉ cho xem vài kết quả** → dừng ở nguồn đó, ô "Trạng thái" ghi
   `chặn: <lý do>`, xin sếp mở tay bằng câu mẫu gói §6. Không đổi IP, không giả trình duyệt, không mượn tài khoản, không công cụ cào.
   Một lúc chỉ **một** agent gọi một trang (`luong/README.md` mục 6: 12 agent cùng gọi → bị chặn hàng loạt).
2. **Nếu ghi một quảng cáo** → ô Link/ID, **ngày bắt đầu chạy**, **số phiên bản** phải điền (hoặc ⬜). Chỉ gọi "đang được bỏ tiền" khi
   chạy ≥ 30 ngày hoặc có nhiều phiên bản — và ghi là **dấu hiệu**, không phải bằng chứng (gói §3.2). Không dùng view/like của quảng cáo.
3. **Nếu tả hook, cú bật, chữ trên hình** → chỉ từ thứ đã xem thật (video phát được, ảnh đã mở). Chỉ thấy ảnh bìa → ghi
   "chỉ thấy ảnh bìa", để ⬜ phần còn lại. Muốn bóc sâu → đề xuất `sxh-boc-khung`, cần sếp tải tệp.
4. **Nếu rút ra ý cho shop mình** → ghi **nguyên lý** (angle, dạng hook, format, nhịp), không câu chữ, hình, nhạc, tên hãng nguyên văn (gói §3.6).
   Giá, khuyến mãi, claim của đối thủ chỉ ghi vào cột "Khuyến mãi" để biết, không đưa vào đề xuất.
5. **Nếu có dưới 3 quảng cáo cho món tương tự** → phần tổng hợp mở bằng "Chưa đủ mẫu để nói xu hướng", không suy rộng từ 1–2 quảng cáo.

## Bước
1. Đọc phiếu. Đổi món của mình thành 3–5 từ khoá theo **ngôn ngữ thị trường đích** (tên loại hàng, công dụng thấy được).
2. Thử từng nguồn trong bảng "Nguồn" theo thứ tự; ghi trạng thái (luật 1).
3. Mỗi quảng cáo tìm được: điền một dòng (luật 2–3). Gắn nhãn dạng nội dung, dạng hook (sổ tay §7.4), khuyến mãi (gói §3.8).
4. Tổng hợp: angle nào lặp, dạng hook nào lặp, câu hook nào thấy ở ≥ 2 hãng (= dấu hiệu bão hoà, gói §3.4), góc nào chưa ai làm.
5. Đề xuất: quảng cáo nào đáng bóc thành khung (kèm lý do theo luật 2), góc mới cho Biên kịch. Phiếu giao.

## Nguồn (công khai, không đăng nhập)
| Nguồn | Xem được gì | Trạng thái công cụ |
|---|---|---|
| Meta Ad Library (trang web) | Quảng cáo **đang chạy**, ngày bắt đầu, số phiên bản, CTA, trang đích | ⬜ làm tay; trang trợ giúp chặn máy đọc (403, gói §12) |
| Meta Ad Library API | Như trên, lọc theo quốc gia, ngày | ⬜ chưa kiểm quyền với quảng cáo thường (gói §12) |
| TikTok Creative Center · Top Ads | Quảng cáo đã chọn lọc, đo theo giây | ⬜ không đăng nhập chỉ thấy 5 → nhờ sếp (gói §6) |
| TikTok Creative Center · Trends | Đường hashtag, tuổi trend | ⬜ làm tay |
| Trang sản phẩm công khai của shop đối thủ | Video trên trang, cách gọi tên món | ⬜ làm tay; chỉ đọc, không đặt hàng, không điền form |
| Kho quảng cáo khác (TikTok cho EU, Google) | — | ⬜ ⚠ chưa có trong gói, chưa kiểm; chưa dùng |

## Khuôn đầu ra
```
Món của mình: …  ·  Thị trường: …  ·  Từ khoá đã tìm: …  ·  Ngày tìm: …  ·  Số quảng cáo: N (đủ mẫu: có | chưa)
## Nguồn đã thử          | Nguồn | Trạng thái: xem được / chặn: <lý do> / ⬜ chưa thử |
## Quảng cáo             | # | Shop | Link · ID | Bắt đầu chạy | Phiên bản | Đã xem: video / ảnh bìa | Angle | Dạng hook | Format | Khuyến mãi |
## Tổng hợp (dấu hiệu)   angle lặp · hook lặp · câu thấy ở ≥ 2 hãng · góc chưa ai làm
## Đề xuất               | Quảng cáo nên bóc | Vì sao (ngày chạy / phiên bản) |  ·  Góc mới cho Biên kịch (nguyên lý, không câu chữ)
```

## Thành công khi
- Sếp biết trong 1 phút: đối thủ đang dồn tiền vào kiểu video nào, và mình nên thử góc nào khác.
- Không dòng nào bịa từ ảnh bìa; không lần nào bị chặn vì gọi dồn.

## Thất bại khi
- Việc mới, chưa chạy thật. Lỗi dự đoán từ việc gần: tả thân quảng cáo khi chỉ thấy ảnh bìa (giống lỗi tả chi tiết không có
  trong hình, thi 11/11); nhiều agent cùng gọi một trang → bị chặn hàng loạt (thi 11/11, `luong/README.md` mục 6).

## Bộ thi
`sxh-theo-doi-doi-thu.thi/` ⬜ chưa có. Việc này chưa được gọi trong luồng nào.
