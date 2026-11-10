# Thợ dựng · xuất-biến-thể

Ghép **1 thân × N hook** thành N tệp sẵn đăng/chạy, đặt tên theo mẫu, đo lại **từng tệp**. Biến thể chỉ có giá trị khi
thân giống hệt nhau giữa các bản — khác ở đâu thì số đo hook rate mới so được.
Kiến thức: `../tho-dung.md` §3.5, §5, §7; khuôn biến thể hook ở `../bien-kich.md` §7.

## Hợp đồng
| | |
|---|---|
| Khi chạy | Luồng Quảng cáo bước 10, sau khi thân qua `td-do-qc` đạt. Hoặc Trưởng phòng giao thêm hook cho thân đã có |
| Nhận | Thân đã đạt (`<ten>-reel.mp4`, `DUNG.md`, `qc.md`) · bảng biến thể hook trong `KICH-BAN.md` (mã hook, hình mở, âm mở, chữ hook, cầu nối) · clip hook đã qua `dd.kiem-clip` · nền tảng đăng |
| Giao | N tệp video · `<ra>/BIEN-THE.md` (khuôn dưới) · N bảng `qc.md` + `qc.json` (`td-do-qc`) · tệp tái lập · phiếu giao (`_phieu-giao.md`, `viec: td.xuat-bien-the`) |
| Xong khi | Mỗi tệp có dòng trong `BIEN-THE.md` và bảng đo riêng đạt · thân giống nhau giữa các bản (cột "Thân") |

## Luật bắt buộc
1. **Nếu một hook không có mã trong bảng biến thể của `KICH-BAN.md`** → không xuất bản đó; ghi vào phiếu. Không tự chế hook.
2. **Nếu ghép thân bằng cách dựng lại thân** cho từng bản → sai; mọi bản dùng **cùng tệp thân** đã đo, chỉ thay đoạn hook.
   Cột "Thân" ghi tên tệp thân + giây bắt đầu lấy thân; khác nhau giữa các bản → không phải biến thể.
3. **Nếu hook dài khác hook gốc** → mọi mốc sau điểm nối dời theo: ghi `neo_luc` mới, giây chữ mới của từng bản; tổng thời lượng
   theo bản, không theo thân.
4. **Nếu nhạc/tiếng nền chạy qua điểm nối hook → thân** → đặt một mạch tiếng liền dưới cả bản (như `td-dung-qc` luật 2),
   không nối hai đoạn tiếng. Điểm nối nằm ở cột "Nối (s)" để `td-do-qc` đo nhảy tiếng và khung đen tại đó.
5. **Nếu một tệp chưa có bảng `td-do-qc` riêng** (chép số của thân hay của bản khác) → tệp đó chưa xong. Ô "QC" trống = chưa giao.

## Bước
1. Kiểm đầu vào: thân đã đạt (`qc.json` → `dat: true`), đủ clip hook, mã hook khớp kịch bản (luật 1).
2. Với mỗi hook: dựng đoạn hook (cắt, chữ hook trong dải an toàn — số px ở `td-dung-qc` bước 6), nối vào thân bằng bộ lọc
   `concat` có mã hoá lại (không `-c copy` giữa hai tệp mã hoá khác nhau).
3. Tiếng cả bản (luật 4) → `loudnorm=I=-14:TP=-1.5:LRA=11` hai lượt **trên từng bản** (gói §4 bước 6). Bản quảng cáo: thêm thẻ kết
   theo `td-dung-qc` luật 3.
4. Đặt tên (mẫu dưới). Kiểm không có hai tệp trùng: `certutil -hashfile <tệp> MD5` (hoặc `md5sum`) khác nhau từng đôi.
5. Chạy `td-do-qc` cho **từng tệp**. Bản nào không đạt → sửa bản đó, đo lại bản đó.
6. Ghi tệp tái lập (một `xuat.sh` sinh đủ N bản). Phiếu giao.

**Mẫu tên:** `<san-pham>-<thi-truong>-h<k>-<ma-hook>-<reel|qc>-<YYMMDD>.mp4`
vd `santa-spins-us-h2-tay-mo-hop-qc-261111.mp4`. Không dấu, không khoảng trắng, chữ thường.

## Khuôn đầu ra (`<ra>/BIEN-THE.md`)
```
Thân: <tệp thân> · đo thân: <qc.md> dat=true · Nền tảng: … · Tái lập: <ra>/xuat.sh — chạy lại: có
```
| Tệp | Mã hook | Dạng/trục đổi | Hook dài (s) | Nối (s) | Thân (tệp + giây vào) | Tổng (s) | neo_luc mới | LUFS / TP | QC (tệp, đạt) |
|---|---|---|---|---|---|---|---|---|---|

Cột LUFS/TP chép từ `qc.md` của chính tệp đó, không chép của thân.

## Thành công khi
- Đặt N bản cạnh nhau: từ điểm nối trở đi giống nhau, chỉ hook khác.
- Sếp/Trưởng phòng đọc tên tệp biết ngay bản nào là hook nào, cho nền tảng nào.
- Mọi bản đều có bảng đo riêng.

## Thất bại khi
- Bản biến thể có khung đen ở điểm nối vì chỉ đo thân (dự phòng theo bẫy khung đen thi 11/11 — chưa xảy ra ở việc này).
- 3 hook dùng chung một hình mở → chỉ khác chữ, chưa phải biến thể khác dạng (thi lại 11/11, `bk-kich-ban-qc`).
  Thợ dựng thấy thì ghi "Suy ra ⚠" cho Trưởng phòng, vẫn xuất theo kịch bản.

## Bộ thi
`td-xuat-bien-the.thi/` — chưa lập.
