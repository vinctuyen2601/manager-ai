# Khuôn gói ngành — dùng chung mọi ngành (lập 11/11/2026, pha 2)

Gói ngành = hiểu biết về MỘT ngành mà cả 6 vai dùng chung (lớp 2, `../nghien-cuu/2026-11-11-agent-chuyen-gia/05-PHUONG-AN-KIEN-TRUC.md`).
Gói vai dạy **cách làm**; gói ngành cho biết **khách là ai, nói gì, mua khi nào, nội dung gì chạy được**. Khuôn wiki học từ TencentDB-Agent-Memory (nhóm 2).

## Thư mục
```
nganh/<ma-nganh>/
  MUC-LUC.md         ≤ 1 trang, ~60 dòng. Agent con nạp BẮT BUỘC tệp này, rồi tự chọn ≤ 3 trang cần đọc.
                      Mỗi dòng: `đường dẫn` · 1 câu tóm tắt · ĐỌC KHI <tình huống> · ngày cập nhật
  muc-dich.md        ngành này phục vụ shop nào, sản phẩm nào, ranh giới (không có gì)
  khach-hang.md      các nhóm khách, ai mua món gì, vì sao, sợ gì
  thuat-ngu.md       vốn từ của người trong ngành; từ người ngoài hay dùng sai; từ CẤM (thổi phồng)
  ngon-ngu-khach.md  chữ THẬT khách gõ/hỏi: truy vấn Google, tìm kiếm trên site, câu hỏi Zalo — có tần suất
  mua-vu.md          mùa vụ, giờ, ngày — có số thì ghi số + nguồn
  gia.md             mặt bằng giá trong shop theo loại hàng; ngưỡng freeship; quà tặng kèm
  noi-dung-thang.md  nội dung nào của shop đang có người tìm/đọc (trang, bài) và vì sao; dạng video trong ngách
  hoi-dap/           mỗi tệp một chủ đề: câu hỏi ngành + đáp án có nguồn (thử trúng: 10 câu ở hoi-dap/_thu-trung.md)
  nhat-ky.md         nạp gì, từ đâu, ngày nào, ai sửa
```

## Luật mỗi trang
1. Frontmatter bắt buộc:
   ```
   ---
   loai: khach-hang | thuat-ngu | ngon-ngu-khach | mua-vu | gia | noi-dung | hoi-dap | muc-dich
   nguon: [<đường dẫn tệp + dòng, hoặc endpoint API + khoảng ngày>]
   ngay: <YYYY-MM-DD>
   muc_tin: cao | trung-binh | thap
   khoa: false        # true = sếp đã sửa tay, máy không được ghi đè
   ---
   ```
2. **Trỏ tới, không chép.** Hồ sơ shop (`../../17fishing/…`) là nguồn gốc. Trang ngành rút ý + trỏ dòng. Chỉ chép nguyên văn khi là
   chữ của khách (truy vấn, câu hỏi) hoặc câu ngắn của sếp.
3. Mỗi ý một nhãn: ✅ có nguồn · ⚠ suy ra (từ đâu) · ⬜ chưa biết. Không có nhãn = lỗi.
4. Số liệu ghi kèm khoảng ngày đo. Bảng từ khoá Search Console chỉ thấy ~8 % lượt hiển thị (`../../CLAUDE.md` mục "Đo đạc") — dùng
   để biết **truy vấn nào có mặt**, không để tính tổng.
5. Mỗi trang ≤ ~150 dòng. Dài hơn thì tách.
6. Nạp **hai bước**: (a) đọc nguồn, ghi danh sách ý rút ra kèm dòng nguồn vào `nhat-ky.md`; (b) mới viết trang.

## Cấm đưa vào gói ngành
- Đáp án bài thi (`../nghien-cuu/**/08-*`, `../thi/**`) — gói ngành phải làm agent giỏi lên, không phải chép đáp án.
- Khoá, token, dữ liệu cá nhân của khách (tên, số điện thoại).
- Theo dõi đối thủ (sếp chốt 11/11 không quan tâm đối thủ).
