# Trưởng phòng · kế-hoạch-tuần

Đầu tuần: xếp các việc sếp đã giao thành **gói tuần** — món nào làm tuần này, ai làm, ngày nào, tốn bao nhiêu hạn mức Muse.
Kiến thức: `../vai/truong-phong.md` §3.2 (ước tính), §4 bước 6, khuôn §7.3, §12 (trần). Tệp này chỉ giữ thứ tự làm và luật bắt buộc.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Họp đầu tuần (`tp-hop`) · khi sếp giao thêm việc làm vỡ kế hoạch tuần đang chạy |
| Nhận | Phiếu `01-tp-nhan-viec.md` của các thư mục chưa xong trong `khach-hang/<shop>/viec/` · hạn mức Muse còn lại · biên bản họp cuối tuần trước |
| Giao | `khach-hang/<shop>/viec/tuan-<YYYY-MM-DD của thứ Hai>.md` theo khuôn dưới · phiếu giao (`../../quy-che/khuon/phieu-giao.md`) |
| Xong khi | Mọi món có mã, người làm, ngày, ước % · tổng × 1,3 ≤ hạn mức còn trừ 10 % dự phòng · mỗi gói ≤ 40 % · lịch bằng ngày thật |

## Luật bắt buộc
1. **Nếu ước hạn mức** → đếm **số clip và số ảnh** (clip ≈ 3 %, ảnh ≈ 0,5 %), nhân 1,3, giữ 10 % dự phòng.
   Không đếm theo giây (gói §3.2, sổ lỗi §10).
2. **Nếu một gói × 1,3 > 40 % hạn mức tuần, hoặc tổng tuần vượt phần còn lại** → cắt theo thứ tự: bản 6 s → hook thứ 3 →
   dời cả video sang tuần sau. Đưa lên "Cần sếp" kèm bản rút gọn và % của từng phương án.
3. **Nếu chưa biết hạn mức Muse còn bao nhiêu** → dùng số còn lại theo sổ tuần trước, ⚠, và hỏi sếp **đúng một câu**
   (sếp là người bấm Muse nên chỉ sếp có số thật).
4. **Nếu hai món Quảng cáo rơi vào cùng ngày bấm Muse** → xếp nối tiếp (một lúc một luồng Quảng cáo).
   Việc Nuôi page không tốn Muse → lấp vào ngày trống.
5. **Nếu món có hạn ngoài** (vd hạn ship Giáng sinh 12/12) → xếp trước, mốc tính lùi từ hạn đó. Mốc khác tính từ ngày có
   link, viết bằng ngày thật; nguyên liệu tới trễ thì lịch lùi theo (thi 11/11).

## Bước
1. Liệt kê việc treo: thư mục chưa có báo cáo cuối. Đọc phần đầu phiếu mới nhất của từng thư mục (`trang_thai`).
2. Số món mỗi việc: mặc định 1 thân × 3 hook (gói §13 câu 2 — chưa chốt, ghi ⚠).
3. Ước từng món (luật 1). Có kịch bản thì chạy `gvv prompt`; chưa có thì đếm theo số cảnh của khung đã chọn.
4. Xếp ngày (luật 4–5), cộng ~20 % thời gian dự phòng (gói §3.2).
5. Kiểm trần (luật 2). Cắt bớt bản 6 s, dời lịch ≤ 2 ngày là tự quyết (§12) → ghi "Đã tự quyết".
6. Viết bảng tuần + phiếu giao. Dòng "Tóm cho sếp" và ô "Cần sếp" viết tên video, %, ngày thật — không mã món.

## Khuôn đầu ra
```
# Tuần <thứ Hai dd/mm> — hạn mức Muse còn <%> (✅ sếp báo | ⚠ ước từ sổ tuần trước)
Tóm cho sếp (3 dòng, lời thường):
  Tuần này ra <n> video cho <sản phẩm/page>.  Dùng khoảng <%> hạn mức Muse.
  Ngày anh cần bấm Muse: <thứ, ngày>.  Ngày anh chấm thẻ: <thứ, ngày>.
| Mã món | Thư mục việc | Mô tả | Người làm | Ngày | Clip/ảnh | Ước % × 1,3 | Trạng thái |
Tổng: <%> · Dự phòng 10 %: <%> · Còn lại: <%>
Đã cắt / dời: <món · lý do · sang ngày>
```
Mã món và trạng thái theo gói §7.3. Sau khuôn là phiếu giao chung.

## Thành công khi
- Sếp biết đúng ngày nào phải bấm Muse, ngày nào chấm thẻ, mà không đọc bảng.
- Cuối tuần, hạn mức thật lệch ước ≤ 30 % (chỉ số 2, gói §1).

## Thất bại khi
- Lịch viết "D0+3", "khung 03" ở phần cho sếp → sếp không biết hôm nào phải làm gì (thi 11/11).
- Lịch đặt cứng theo ngày nhận tin; link tới trễ thì cả lịch sai. Bài có gói tính từ ngày có link nên tự lùi (thi 11/11).
- Ước theo giây → lệch xa (23/10, sổ lỗi §10).
- Quên hệ số sinh lại → hết hạn mức giữa tuần (sổ lỗi §10).

## Bộ thi
`tp-ke-hoach-tuan.thi/` — chưa có. Chưa thi thì dùng kèm ⚠ và Trưởng phòng soát tay tổng %.
