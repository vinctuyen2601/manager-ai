# Giọng văn bán hàng của 17fishing

Chủ shop chê giọng AI **bốn lần**. Ba lần đầu tôi chữa bằng cách viết thêm quy
tắc rồi tự chấm là đạt — trượt cả ba. Lần thứ tư chủ shop đưa **văn mẫu**, và
đo ra mới thấy tôi hiểu ngược hoàn toàn.

## Hai tệp trong thư mục này

| tệp | là gì |
|---|---|
| `van-mau-chu-shop.txt` | mẫu chủ shop đưa 28/09/2026 (mô tả máy Daiwa RS trên một trang bán đồ câu Việt). **Đọc trước khi viết.** |
| `vi-du-da-duyet.json` | bài máy câu NAG tôi viết theo mẫu đó, chủ shop duyệt: "nghe ổn ổn rồi đó". Đây là ví dụ đã chạy trên hàng thật. |

## Vì sao ba lần đầu trượt

Tôi gọt cho câu ngắn lại, bỏ từ hoa mỹ, thêm lời rào sau mỗi lời khen. Đó là
giọng người **đánh giá** sản phẩm. Chủ shop muốn giọng người **bán**.

Đo hai bài cạnh nhau thì mọi dấu hiệu giọng của mẫu đều **bằng 0** trong bài
tôi viết, và câu tôi ngắn bằng nửa (12,3 từ so với 32).

## Đo bằng máy, đừng tự chấm

```
python3 ../script/clone/do-giong.py --san-pham <uuid>
python3 ../script/clone/do-giong.py bai.txt
```

Bộ đếm in bảng mật độ từng dấu hiệu cạnh mật độ của mẫu, và **dừng hẳn** nếu
bắt được lời hứa vượt thông số.

## Ranh giới

Đánh bóng **chữ** thì thoải mái — chủ shop cho phép từ 22/09/2026: *"cứ ghi rõ
và đánh bóng chữ vì mình bán hàng mà phải nói tốt về sản phẩm mới có người
mua"*.

Đánh bóng **số** thì không. Mọi con số khớp bảng thông số của xưởng, và không
hứa thứ vượt thông số: kéo được cá bao nhiêu ký, ném xa bao nhiêu mét, chống
nước tuyệt đối. Đó là chỗ sinh đơn trả hàng.
