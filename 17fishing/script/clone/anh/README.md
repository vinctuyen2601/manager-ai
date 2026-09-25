# Việt hoá chữ trên ảnh xưởng — bước 3c

Ảnh 1688 đầy chữ Trung, và phần đáng giá nhất của sản phẩm (bảng thông số) hay
nằm hẳn trong ảnh. Bước này thay chữ đó bằng chữ Việt.

## Vì sao không dùng công cụ dịch ảnh

Chữ viết lên ảnh là chữ **ta chọn**, lấy từ Bảng sự thật, không phải bản dịch
máy của một câu quảng cáo tiếng Trung. Và nhiều dải **không được dịch**: chính
sách đổi trả, bảo hành, mốc giao hàng của xưởng là cam kết của xưởng với người
mua sỉ Trung Quốc. Bê sang trang bán lẻ Việt Nam là hứa thay người khác.

## Cách chạy

```bash
cd <thư mục ảnh sản phẩm>            # nơi có thư mục anh/ và ke-hoach-anh.json
D=~/my-project/manager-ai/17fishing/script/clone/anh

python3 $D/do-dai-chu.py anh/a06.jpg --x 0 420    # dò toạ độ dải chữ
python3 $D/viet-hoa-anh.py ke-hoach-anh.json --thu    # chỉ kiểm kế hoạch
python3 $D/viet-hoa-anh.py ke-hoach-anh.json --soat   # vẽ khung đỏ để soát
python3 $D/viet-hoa-anh.py ke-hoach-anh.json          # làm thật
```

`--soat` ghi ra `<thuMucRa>-soat`, không đụng ảnh thành phẩm.

## Ba lần đã dính, đừng dính lại

**1. Cột mẫu để vá phải DÒ BẰNG MÁY, và tiêu chí không được phụ thuộc màu nền.**
Bản đầu chọn cột TỐI nhất (ngầm định nền tối). Gặp ảnh nền kem thì nó chọn đúng
thân cần màu vàng đậm rồi kéo ngang ra thành vệt vàng loang trùm cả tiêu đề.
Nay chọn cột ĐỒNG ĐỀU nhất, và phạt theo khoảng cách tới ô cần vá — không phạt
thì nó lấy mép phải trắng, miếng vá hiện thành hình chữ nhật trắng giữa nền kem.

**2. Bộ dò dải chữ cũng từng ngầm định nền tối.** Đếm điểm SÁNG trên ảnh nền kem
thì mọi hàng đều đạt ngưỡng, kết quả trả về đúng một dải trùm cả tấm. Nay tự
nhận nền theo trung vị độ sáng. Và nó vẫn bó tay khi có **vật thể dọc** chạy
suốt ảnh — khoanh `--x` vào cột chữ.

**3. Cỡ chữ phải đặt cứng khi nhiều ô nằm cạnh nhau.** Để tự co cho vừa thì ô
chữ ngắn phình to, ba ô cạnh nhau nhìn thành ba khối rời.

## Font

Be Vietnam Pro, nằm trong `font/`. DejaVu có đủ dấu nhưng xấu.
