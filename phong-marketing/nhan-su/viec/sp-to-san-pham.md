# Chuyên viên SP · tờ-sản-phẩm

Ghép 4–6 góc **thật** của sản phẩm (khung video quay thật, ảnh thật, ảnh khách) thành một ảnh 1080×1920 có nhãn — ảnh tham chiếu
tải kèm mọi prompt có sản phẩm. AI chép mọi thứ trong ảnh tham chiếu, kể cả cái sai, nên một ô render là một lỗi lặp ở mọi clip.
Kiến thức: `../vai/chuyen-vien-san-pham.md` §3.2, §3.3, §4 bước 9, §5 phần "Tờ sản phẩm". Tệp này chỉ giữ thứ tự làm và luật bắt buộc.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Trong `sp.dung-ho-so` (gói §4 bước 9) hoặc sau `sp.bo-sung-nguyen-lieu` khi có góc thật tốt hơn. Đạo diễn cần tờ cho luồng Quảng cáo bước 7 |
| Nhận | `khach-hang/<shop>/san-pham/<sp>.md` (mục 3b, 4, dòng "Mẫu đang bán") · thư mục nguyên liệu (`video-*`, lưới, `that-*.jpg`, `anh-*`, `them-*`) |
| Giao | `to-san-pham.json` · `to-san-pham.jpg` · dòng `**Tờ sản phẩm:** \`…\`` trong hồ sơ · phiếu giao |
| Xong khi | Bảng ô bên dưới đủ cột · đã mở ảnh ra xem · bảng kiểm gói §5 phần "Tờ sản phẩm" đủ dấu · phiếu giao đủ ô |

## Luật bắt buộc
1. **Nếu một ô là render, ảnh AI, hoặc mẫu khác dòng "Mẫu đang bán"** → loại ô đó, kể cả khi đó là góc duy nhất.
   Cột "Thật vì" phải ghi bằng chứng (video quay thật / ảnh khách / khớp khung thật nào). Trang lẫn hai mẫu → mọi ô phải cùng một mẫu.
2. **Nếu nhãn ô nói một trạng thái (OFF, ON, EMPTY…)** → khung đó phải cho thấy đúng trạng thái đó. Không chắc → nhãn chỉ nói góc
   (FRONT, IN HAND). Ví dụ: khung ổ trống mà đèn vẫn sáng không được dán "OFF" (thi 11/11).
3. **Nếu ô lấy từ video** → chọn giây `t` từ lưới 4 khung/giây (khung nét, không chuyển cảnh, không chữ/logo đè lên sản phẩm),
   ghi `video-NN @ t`. Hai ô cùng một ảnh (trùng md5) hoặc cùng một khung → bỏ một.
4. **Nếu có ít hơn 4 góc thật** → không đắp render cho đủ. Ghép tờ tạm từ các ô thật có (≥ 2), tên tệp có `-tam`,
   ghi góc thiếu vào `con_thieu` và gửi sếp theo [sp-bo-sung-nguyen-lieu.md](sp-bo-sung-nguyen-lieu.md). Dưới 2 ô thật → `trang_thai: chan`.
5. **Nếu chưa mở `to-san-pham.jpg` ra xem** → việc chưa xong. Xem: nhãn đọc được, sản phẩm không bị cắt mất bộ phận chính
   (ô cắt giữa để lấp đầy), không ô đen thừa ngoài ý muốn. Sai → sửa `t` hoặc đổi ô, ghép lại.

## Bước
1. Đọc hồ sơ mục 3b, 4 và dòng "Mẫu đang bán". Lấy ứng viên chỉ từ dòng Thật · đúng mẫu · Trạng thái *dùng được*.
2. Chọn 4–6 góc, ưu tiên theo gói §3.2: chính diện · cầm tay (thấy cỡ) · bộ phận chính TẮT · BẬT · phụ kiện · hộp.
   Thứ tự ưu tiên nguồn: video quay thật > ảnh khách > ảnh chụp nhà bán (gói §2 nguyên tắc 3).
3. Điền bảng ô (khuôn dưới), áp luật 1–3.
4. Viết `to-san-pham.json` **trong** thư mục nguyên liệu (đường dẫn tương đối tính từ thư mục tệp này; `t` bỏ trống với ảnh;
   tờ tạm thì `"ra": "to-san-pham-tam.jpg"`):
   ```json
   { "ra": "to-san-pham.jpg", "cot": 2,
     "o": [ { "tep": "video-01.mp4", "t": 3.25, "nhan": "IN HAND" },
            { "tep": "anh-04.jpg", "nhan": "FRONT" } ] }
   ```
5. Ghép. `to-san-pham` **chưa nối vào `cli.ts`** — gọi thẳng hàm (trong `D:/my project/gen-video-viral`, cần ffmpeg):
   `node --input-type=module -e "import {toSanPham} from './src/to-san-pham.ts'; console.log(toSanPham(process.argv[1]))" <đường/dẫn/to-san-pham.json>`
6. Mở ảnh ra xem (luật 5).
7. Thêm/sửa dòng `**Tờ sản phẩm:** \`<đường dẫn từ phong-marketing/>\`` ở đầu hồ sơ (hàm `docToSanPham` đọc đúng mẫu này; hiện `gvv prompt` chưa gọi hàm đó).
8. Phiếu giao.

## Khuôn đầu ra
Ghi vào phiếu giao, ô "Đã kiểm" (ô trống = chưa xong):
```
| Ô | Tệp @ giây | Nhãn | Thật vì | Mẫu | Thấy trạng thái nhãn nói? |
Đã mở ảnh xem: có — <nhận xét một dòng>   ·   Số ô thật: <n>/<4–6>   ·   Tệp: to-san-pham.jpg | to-san-pham-tam.jpg
```

## Thành công khi
- Đạo diễn tải đúng một ảnh là AI thấy đủ dáng, cỡ, trạng thái TẮT/BẬT của hàng thật.
- Không ô nào khiến AI vẽ bộ phận không có ở hàng giao.

## Thất bại khi
- Render store (đĩa than to, có cần đọc) làm tham chiếu "máy" → clip là một máy khác (Santa Spins 24/10, gói §9.2).
- Ảnh tham chiếu có vật lạ (băng cassette) → AI chép vào clip (gói Sổ lỗi L7).
- Trang lẫn ảnh AI hộp trắng với hàng thật acrylic → tờ trộn hai mẫu (thi 11/11).
- Một ảnh đăng 3 lần (trùng md5) chiếm 3 ô (thi 11/11).
- Nhãn trạng thái không khớp khung (ổ trống vẫn sáng, thi 11/11).

## Bộ thi
`sp-to-san-pham.thi/` ⬜ chưa có. Đề cần bẫy: thư mục có render đẹp hơn ảnh thật, ảnh trùng md5, khung video đang chuyển cảnh, chỉ có 3 góc thật.
