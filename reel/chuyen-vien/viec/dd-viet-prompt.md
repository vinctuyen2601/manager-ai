# Đạo diễn hình ảnh · viết-prompt

Từ bảng cảnh đã lập, viết **kịch bản cảnh JSON** rồi để `gvv prompt` ghép prompt Muse + kế hoạch cắt. Máy dán khối hồ sơ
nguyên văn và chặn theo luật; phần việc của vai là cảnh, hành động từng giây, vai trò tham chiếu. Kiến thức: `../dao-dien-hinh-anh.md`.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Luồng Quảng cáo bước 7, ngay sau `dd.ke-hoach-hinh`. Hoặc khi `dd.kiem-clip` quyết sinh lại một cảnh |
| Nhận | Phiếu giao `dd.ke-hoach-hinh` + bảng cảnh · hồ sơ sản phẩm · hồ sơ nhân vật · tờ sản phẩm · thư mục media |
| Giao | `<ten>-kich-ban.json` · `<ten>-prompt.md` + `<ten>-ke-hoach-cat.json` (máy sinh) · phiếu giao |
| Xong khi | `gvv prompt` **0 dòng CHẶN** · mọi cảnh báo đã sửa hoặc ghi lý do · bảng quét phủ định không còn chỗ "mình viết" · phiếu giao đủ ô |

## Luật bắt buộc
1. **Nếu một ảnh hoặc clip có sản phẩm** (có trong `mo_ta` là đủ, kể cả khi quên khối) → `khoi` có `PRODUCT`; `tham_chieu` =
   ảnh/khung **THẬT** + tờ sản phẩm; `ve_tham_chieu` ghi vai từng ảnh ("copy the player from image 2, the real photo").
   Render chỉ được vai bao bì. Không có ảnh thật → không viết ảnh đó, trả cảnh về `dd.ke-hoach-hinh`.
2. **Nếu quét phủ định trúng ở phần mình viết** (`mo_ta`, `phong_cach`, `nhip`, `ve_tham_chieu`) → viết lại thành thứ **có**
   ("a thin grey ring around a black platter", "the phone screen is a plain dark glass surface", câu khoá bố cục gói §3.2).
   Trúng trong **khối hồ sơ** hoặc câu máy tự chèn → không sửa trong prompt; ghi `giữ` + nguồn ở bảng quét (bước 6).
3. **Nếu bảng cảnh ghi một bề mặt là "mặt trơn / tắt / quay đi" hoặc "chèn ở dựng"** → câu khẳng định tả bề mặt đó phải có trong
   `mo_ta` của ảnh và trong nhịp của mọi clip thấy bề mặt đó. Không câu nào bảo Muse vẽ nội dung lên bề mặt.
4. **Nếu `gvv prompt` báo CHẶN** → sửa đúng gốc theo bảng dưới rồi chạy lại. Không lách: không bỏ khối PRODUCT, không đổi
   cảnh có sản phẩm thành "chỉ chữ", không trỏ `tham_chieu` vào tệp bất kỳ cho có. Chặn do hồ sơ → `trang_thai: chan`,
   chuyển Chuyên viên SP; vai này không sửa hồ sơ.
5. **Nếu dòng "Ước tính" của máy cao hơn ước ở bảng cảnh, hoặc ×1,3 vượt 10 %** → không giao; quay lại `dd.ke-hoach-hinh`
   lấy bản rút gọn. Clip đã đạt thì ghi `"da_co": "<tep>.mp4"` (không tính hạn mức).

## Bước
1. Đọc phiếu giao kế hoạch hình. Cảnh `⬜ CHẶN` không đưa vào JSON.
2. Viết JSON theo khuôn gói **§7** (mẫu đủ: `D:/my project/gen-video-viral/vi-du/v01-ban2-kich-ban.json`). Mỗi khung đầu = một
   `anh`, mỗi đơn vị sinh = một `clip`. Ngôn ngữ shot gói §3.1, giữ đúng sản phẩm §3.2. Nhịp viết "quá trình + trạng thái cuối",
   dài hơn cần ~1,5×, phủ kín 0 → hết clip, một chuyển động chính mỗi nhịp, nhịp quan trọng ở đầu clip.
3. Ô `kiem` của mỗi ảnh/clip = những mỏ neo `dd.kiem-clip` sẽ soi (lấy từ danh sách nhận diện trong hồ sơ, không tự nghĩ).
4. Chạy (thư mục `D:/my project/gen-video-viral`): `node src/cli.ts prompt <ten>-kich-ban.json`. Thoát mã 2 = có CHẶN.
5. Xử lý từng dòng theo bảng dưới. Chạy lại tới 0 CHẶN.
6. Quét phủ định trên `<ten>-prompt.md`: `grep -n -i -w -E "no|not|never|without|off|don't|nothing" <ten>-prompt.md`.
   Mỗi chỗ trúng một dòng trong bảng quét. Hai nguồn **biết trước sẽ báo nhầm**:
   - câu máy chèn `No text or captions added.` (mọi ảnh, mọi clip) → `giữ — câu của máy`;
   - khối PRODUCT Santa Spins: "never remove it", "When OFF", "no two alike", "NOT round … NO screen" → `giữ — khối hồ sơ`,
     ghi vào "Suy ra ⚠" của phiếu (chờ phép thử A/B gói §12.1; sửa thì Chuyên viên SP sửa ở hồ sơ).
7. Đọc lại toàn bộ khối sau ghép: câu tự mâu thuẫn (sổ lỗi gói §10, "Khối tự mâu thuẫn") → báo Chuyên viên SP. Soát gói §5.
8. Phiếu giao `dd.viet-prompt`. Phần cho sếp chạy Muse theo gói §11: ảnh → kiểm → clip, tên tệp `<clip>.mp4`, kèm % hạn mức.

**Báo của `gvv prompt` → làm gì**
| Máy báo | Làm |
|---|---|
| ✗ hồ sơ chưa đạt M0 / không có khối PRODUCT | Dừng. Chuyển Chuyên viên SP |
| ✗ khối "X" không có trong hồ sơ | Chép đúng tên khối chữ hoa trong hồ sơ. Hồ sơ thật thiếu → Chuyên viên SP |
| ✗ có sản phẩm mà không có ảnh tham chiếu thật · cảnh có SP phải bắt đầu từ ảnh có SP thật | Thêm ảnh thật vào `tham_chieu`, `khung_dau` trỏ ảnh đó. Không có → bỏ cảnh khỏi đợt, xin ảnh |
| ✗ không thấy ảnh tham chiếu / clip đã có / khung đầu | Sửa tên tệp (tính từ `thu_muc_media`). Không đổi sang tệp khác cho qua |
| ✗ clip > 10 s | Tách hai clip nối khung (gói §3.5 "nối khung") |
| ✗ nhịp chồng · căn "neo" thiếu `neo_luc` | Sửa mốc · lấy giây cú bật từ khung |
| ⚠ hở nhịp · nhịp cuối chưa tới hết clip | Mô tả nốt (hở thì Muse bịa) |
| ⚠ có vẻ bảo Muse vẽ chữ | Bỏ chữ khỏi nhịp; chữ thuộc bảng `bk.chu-tren-hinh` |
| ⚠ có tay/người thiếu khối CHARACTER | Thêm khối từ hồ sơ nhân vật |
| ⚠ cửa sổ dựng < 1,2× | Kéo dài nhịp đó (đích 1,5×) hoặc ghi lý do giữ |

## Khuôn đầu ra
Ô bắt buộc đầu phiếu giao (hoặc dưới bảng cảnh trong `KICH-BAN.md`):
```
gvv prompt: <ngày> · CHẶN: 0 · cảnh báo: <n> (sửa <a>, giữ có lý do <b>)
Ước tính máy: <x> % · ước ở bảng cảnh: <y> % · trần 10 %
| Ảnh | Ảnh thật (tệp) | Tờ SP | Render — chỉ bao bì | ve_tham_chieu |
| Dòng prompt | Chữ trúng | Nguồn: mình viết · khối hồ sơ · câu máy | Đã làm: sửa thành … / giữ vì … |
```

## Thành công khi
- Sếp dán thẳng vào Muse, không phải sửa chữ nào; mỗi ảnh có sản phẩm tải kèm ảnh thật + tờ sản phẩm.
- Không câu phủ định nào do vai này viết.

## Thất bại khi
- Prompt dày câu phủ định ("does not morph", "no text…") (thi 11/11, bài đối chứng). Nhắc tên vật là gọi vật ra (gói §3.2).
- Tham chiếu duy nhất là render → Muse chép tay đĩa, ra máy khác (ảnh M, 23/10).
- "OFF" làm mất vòng LED (ảnh K lần 1, video 01).

## Bộ thi
`dd-viet-prompt.thi/` — **chưa lập**. Đề hồi quy: đề của bài thi 11/11 (hoà 16–16); chấm thêm bảng quét phủ định.
