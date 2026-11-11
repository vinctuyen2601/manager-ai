# Biên kịch · chữ-trên-hình

Tách chữ trên hình từ kịch bản thành **danh sách cho Thợ dựng chèn bằng script**. Không bảo AI video vẽ chữ (gói §11.2).

## Hợp đồng
| | |
|---|---|
| Khi chạy | Ngay sau `bk-kich-ban-qc` hoặc `bk-loi-ban-dia`, trước khi giao Thợ dựng |
| Nhận | Kịch bản theo giây |
| Giao | Bảng chữ (khuôn dưới) · phiếu giao |
| Xong khi | Mọi dòng đạt mốc đọc và có vùng đặt |

## Luật bắt buộc
1. **Nếu một dòng chữ hiện X giây** → tối đa 20·X ký tự, ≤ 2 dòng × 42 ký tự (gói §3.4). Vượt → rút chữ, không kéo dài giây.
2. **Nếu chữ lặp đúng câu lời đọc** → viết lại để chữ làm việc khác lời (neo ý cho người tắt tiếng) (gói §3.8).
3. **Nếu chữ nằm ở giây cú bật** → ≤ ~40 ký tự (mồi bình luận).
4. **Vùng đặt** lấy theo vùng an toàn của Thợ dựng (`../vai/tho-dung.md` §3.1), chỉ ghi tên vùng: `tren` | `giua` | `duoi-an-toan`.

## Khuôn đầu ra
| # | Bắt đầu (s) | Kết thúc (s) | Chữ | Ký tự | Mốc 20·X | Vùng | Ghi chú (emoji, viết hoa nhấn) |
|---|---|---|---|---|---|---|---|

## Thất bại khi
- Chữ bị cắt hoặc bị nút TikTok che vì đặt ngoài vùng an toàn.
- Chữ hiện quá ngắn để đọc.

## Bộ thi
Chưa có — thi gộp trong `bk-kich-ban-qc.thi/` (chấm bảng chữ đi kèm).
