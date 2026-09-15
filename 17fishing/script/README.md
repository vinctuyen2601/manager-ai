# Script đo và sửa — 17fishing

Chạy bằng `node <tệp>.mjs`. Tệp nào ghi vào production đều đọc token từ
`~/.17fishing-admin-token` (không in ra, không vào commit) và có `--hoan-tac`.

| tệp | làm gì |
|---|---|
| `audit.mjs` | soát tiêu đề, mô tả, canonical, og:image, h1, alt trên trang chủ + danh sách + mọi sản phẩm |
| `quet404.mjs` | thử từng trang Search Console đang xếp hạng, tìm trang chết. Cần `trang.json` từ `GET /admin/keywords/gsc-trang` |
| `lien-gay.mjs` | bò từ sitemap, thu liên kết nội bộ, thử từng cái |
| `sua-tieu-de.mjs` | đặt `seoTitle` cho bài viết · `--thu` xem trước · `--hoan-tac` |
| `sua-tieu-de-sp.mjs` | đặt `seoTitle` cho sản phẩm · `--thu` · `--hoan-tac` |
| `sua-lien-ket.mjs` | sửa liên kết gãy trong nội dung bài |
| `dung-combo.mjs` | dựng 2 dạng combo thử rồi kiểm bằng `tinh-tien` · `--xoa` để dọn |

## Ba luật đã trả giá mới có

**Kiểm độ dài BẰNG MÃ.** Prompt dặn "không quá N ký tự" mà chạy thật vẫn tràn.
`sua-tieu-de*.mjs` chặn ở 48 và **dừng hẳn** nếu có một dòng sai — không ghi
một phần rồi báo xong.

**Không bịa slug.** Lần đầu tôi suy slug từ tiêu đề: 14/22 sai. Bộ kiểm chặn
kịp. Luôn lấy slug từ API, đừng đoán.

**So khớp đường dẫn phải chặn ở dấu nháy.** `/blog/ky-thuat-cau-ca` khớp chuỗi
con vào `/blog/ky-thuat-cau-ca-me-...`.
