# Luồng · Quảng cáo (Tạo mới · Lai)

**Mục đích:** video bán hàng cho một sản phẩm, một thị trường. **Đầu ra:** 1 thân × 3 hook, đã dựng, đã đo, sẵn đăng/chạy.
**Đầu vào từ sếp:** link sản phẩm + thị trường (+ kênh, bản reel hay quảng cáo nếu có). Cách chạy chung: [README.md](README.md).

## Các bước

| # | Việc (vai.việc) | Nhận | Giao | Cổng | Nếu chặn |
|---|---|---|---|---|---|
| 1b | **[Cổng KẾ HOẠCH — sếp duyệt]** (sếp chốt 11/11) | Phiếu 01 | **Bản trình**: 1 trang + chi tiết 12 mục (khuôn `nhan-su/viec/tp-ke-hoach-tuan.md`) | Sếp trả lời "duyệt" hoặc sửa | Không chạy bước 3 trở đi (bước 2 được chạy để có số liệu cho bản trình) |
| 1 | `tp.nhan-viec` 🟡 | Tin nhắn sếp | Phiếu nhận việc: sản phẩm, thị trường, kênh, hạn | Có link + thị trường | Hỏi sếp, kèm "Ý sếp là <tên gần nhất>?" |
| 2 | `sp.dung-ho-so` 🟡 | Link | Hồ sơ `khach-hang/<shop>/san-pham/<tên>.md` + tờ sản phẩm + phiếu M0 | M0 = ĐẠT | **Dừng luồng.** Báo sếp danh sách cần bổ sung (một lần) |
| 3 | `sxh.chuyen-khung` 🟡 | Hồ sơ · thư viện khung | Khung đã chọn + lý do + phần phải đổi | Có khung chuyển được | Chạy `sxh.boc-khung` trên video mẫu sếp gửi; không có thì hỏi |
| 4 | `tp.brief` 🟡 | Phiếu 1–3 | Brief + ước hạn mức Muse | ≤ 40 % hạn mức tuần | Hỏi sếp (kèm bản rút gọn rẻ hơn) |
| 5 | `bk.kich-ban-qc` ✅ | Brief · hồ sơ · khung | Kịch bản + 3 hook | Mọi câu khẳng định có nguồn; cú lộ cụ thể | Quay lại bước 5 (tối đa 1 lần), rồi báo |
| 6 | `bk.chu-tren-hinh` ✅ | Kịch bản | Bảng chữ cho Thợ dựng | Mọi dòng đạt mốc đọc | Quay lại bước 6 |
| 7 | `dd.ke-hoach-hinh` → `dd.viet-prompt` 🟡 | Kịch bản · hồ sơ · tờ sản phẩm | Bảng cảnh (cột "Bề mặt hiển thị") + `gvv prompt` | `gvv prompt` không báo chặn | Quay lại bước 7 |
| 8 | **[Sếp bấm Muse]** | Tệp prompt | Ảnh/clip trong thư mục video | — | — |
| 9 | `dd.kiem-clip` 🟡 (nội dung hình) | Clip · tờ sản phẩm | Clip đạt / danh sách sinh lại | Giống sản phẩm thật, không vật lạ | Sinh lại ≤ 2 lần/cảnh, rồi báo sếp |
| 10 | `td.dung-qc` → `td.xuat-bien-the` → `td.do-qc` 🟡 (kỹ thuật) | Clip đạt · kế hoạch cắt · bảng chữ | Video thân + 3 bản hook | −14 LUFS, không khung đen, chữ trong vùng an toàn | Quay lại bước 10 |
| 11 | `tp.bao-cao` (khuôn báo cáo, không phải việc riêng) | Mọi phiếu | Báo cáo sếp: tệp video, đã tự quyết, cần sếp | — | — |

✅ = có tệp việc, đã thi · 🟡 = có tệp việc, chưa thi (gọi kèm ⚠, Trưởng phòng mở kiểm kỹ).

**Giữa mọi bước** Trưởng phòng chạy `tp.dieu-phoi` (đọc phiếu → mở tệp kiểm → rẽ nhánh → giao bước kế; nhật ký `00-dieu-phoi.md`).
**Sau bước 11:** `tp.hop` (cuối lô) → `tp.duc-ket`.

**Hướng Lai:** bước 3 chọn video nhà cung cấp làm thân; bước 7 chỉ lập cảnh **còn thiếu**; bước 8 chỉ sinh cảnh đó.

## Chạy song song được
- Bước 3 chạy cùng bước 2 khi đã biết loại sản phẩm (khung không phụ thuộc chi tiết hồ sơ).
- Bước 6 chạy cùng bước 7.

## Đo sau khi chạy (cho Đúc kết)
Số lần bị chặn · số lần quay lại từng bước · số lần sinh lại Muse · % hạn mức đã dùng · số lần sếp phải can thiệp ·
thời gian từ link tới video xong. Sau khi đăng: hook rate từng bản hook (gói Biên kịch §1, chỉ số 5).

## Chạy thử
Lần đầu: Santa Spins (hồ sơ đã có, hạn ship Giáng sinh 12/12). Chưa chạy.
