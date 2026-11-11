# Đề bài nghiên cứu — biến agent của Phòng Marketing AI thành chuyên gia (11/11/2026)

Tệp này là đề chung cho 4 nhóm nghiên cứu. Mỗi nhóm đọc hết tệp này trước.

## Bối cảnh: hệ thống hiện tại
- Phòng Marketing AI = một phiên Claude Code đội "mũ" Trưởng phòng, giao việc cho **agent con** (Agent tool) theo **luồng** (`reel/luong/`).
  Mỗi agent con nạp: gói vai (`reel/chuyen-vien/<vai>.md`, ~400–500 dòng) + tệp việc (`reel/chuyen-vien/viec/*.md`) + phiếu giao của bước trước.
- 6 vai: Trưởng phòng, Chuyên viên SP, Săn xu hướng, Biên kịch, Đạo diễn hình ảnh, Thợ dựng. Kiểm duyệt độc lập tạm bỏ.
- Có sẵn: bộ thi cho 1 việc (Biên kịch, chấm mù có gói vs không gói, 23/24 vs 18/24), phiếu giao chuẩn, nhật ký điều phối, việc Đúc kết (ghi bài học vào gói).
- Tri thức lưu dạng **Markdown/JSON trung lập** trong git (repo `manager-ai`). Mã công cụ video ở repo `gen-video-viral` (Node, ffmpeg).
- **Ràng buộc:** chạy trong Claude Code, một người vận hành (chủ shop), không có máy chủ/DB riêng cho agent, ngân sách nhỏ, ngữ cảnh mỗi agent có hạn.
  Cơ chế đòi hạ tầng nặng (vector DB, RL training, server đa tenant) → chỉ lấy Ý, ghi rõ "không lấy mã".
- Đã nghiên cứu trước đây (đừng lặp lại): `coreyhaines31/marketingskills`, `obra/superpowers`, `agidesigner/OpenLucid`, MoneyPrinterTurbo, Hypit,
  AutoClip research note, OpenMontage. Xem `reel/chuyen-vien/*.md` phần nguồn.

## Lỗi cần giải — phát hiện từ buổi chủ shop phỏng vấn 2 agent (11/11)
Chạy thử trên sản phẩm thật (phao điện rô diếc của shop đồ câu 17fishing, thị trường VN). Chủ shop kết luận "toàn là newbie":
1. **Không có hiểu biết ngành.** Cả 6 gói viết cho đồ trang trí Giáng sinh bán ở Mỹ. Săn xu hướng: 0 khung mẫu ngành đồ câu, 0 kiến thức về xu hướng video câu cá VN.
   Chuyên viên SP: biết sản phẩm chắc nhưng chỉ trong phạm vi trang shop, không biết đối thủ, giá thị trường.
2. **Kho tri thức ngành có sẵn trên máy nhưng agent không được đọc** (hồ sơ shop 1.175 dòng, giọng viết người đi câu, 104 bài blog, truy vấn Search Console).
3. **Thiếu chính kiến khi thiếu dữ liệu**: trung thực ("em không biết") nhưng dừng ở đó, không nói "nghiêng về X, ~70 %, vì Y, kiểm bằng Z".
4. **Không học từ kết quả thật**: chưa có vòng ghi kết quả video sau khi đăng → cập nhật tri thức.
5. **Không có thước đo "chuyên gia"**: chỉ có phỏng vấn bằng cảm giác.

Hướng thiết kế đang bàn (chưa chốt): tách 4 lớp — gói nghề theo vai · gói NGÀNH dùng chung (vd `nganh/do-cau-vn/`) · thư viện bằng chứng
(video mẫu đã bóc, quảng cáo đối thủ) · sổ kinh nghiệm — và dùng **bộ đề phỏng vấn có thang chấm** làm thước đo.

## Mục tiêu sếp chốt (11/11, sau khi giao việc nghiên cứu)
Câu hỏi "newbie ở chỗ nào nhất?" — sếp: **"Mọi thứ đều thiếu"**. Đích thiết kế là agent có đủ 5 năng lực:
1. **Chuyên môn** (nghề + ngành) · 2. **Tự học** · 3. **Tích luỹ kinh nghiệm** · 4. **Phân tích** · 5. **Suy nghĩ và phán đoán riêng**.
Phương án kiến trúc phải chỉ ra lớp/cơ chế nào phục vụ năng lực nào, và đo từng năng lực bằng gì.

## Việc của mỗi nhóm
1. **Xác minh repo có thật** (danh sách do một AI khác gợi ý, có thể sai tên/chủ/mô tả). Tìm đúng URL bằng WebSearch nếu cần.
   Ghi: URL thật, sao, ngày commit cuối, giấy phép. Repo không tồn tại → ghi "không tìm thấy", đừng bịa.
2. **Đọc mã và tài liệu THẬT**, không chỉ README: tải tarball vào thư mục RIÊNG trong scratchpad
   `/tmp/claude-1000/-home-tuyennvdev-my-project-manager-ai/b3979266-831c-470e-a888-71cc908aa8b0/scratchpad/repo-nc/<nhom>/<repo>/`
   bằng `curl -sL https://codeload.github.com/<owner>/<repo>/tar.gz/HEAD | tar xz -C <thư mục>`.
   **Không dùng lệnh `git`** (luật chủ shop: không chạy git ngoài `~/my-project`). **Không chạy mã của repo** (chỉ đọc). API GitHub không xác thực chỉ 60 lượt/giờ dùng chung 4 nhóm → hạn chế.
3. Với mỗi cơ chế đáng học, trả lời:
   - Nó làm gì, ở tệp nào (trỏ đường dẫn trong repo).
   - Giải lỗi số mấy ở trên.
   - Chuyển sang hệ thống của mình thế nào (Markdown + agent con Claude Code), cần gì, tốn gì. Hay chỉ lấy ý.
   - Mức tin: đã đọc mã · chỉ đọc tài liệu · chỉ đọc README.
4. Nói rõ cái gì **KHÔNG** nên học và vì sao (quá nặng, demo đồ chơi, quảng cáo nhiều hơn mã).

## Khuôn báo cáo (ghi vào `reel/nghien-cuu/2026-11-11-agent-chuyen-gia/<số>-<nhom>.md`)
```
# Nhóm <tên> — <ngày>
## Xác minh repo (bảng: tên gợi ý · URL thật · sao · commit cuối · giấy phép · có thật?)
## Cơ chế đáng lấy (mỗi cơ chế: làm gì · tệp nguồn · giải lỗi số · cách chuyển · chi phí · mức tin)
## Không nên lấy (và vì sao)
## Đề xuất cho kiến trúc của mình (3–7 gạch đầu dòng, xếp ưu tiên)
## Câu hỏi còn mở
```
Tiếng Việt, câu ngắn, không gạch ngang giữa câu. Mọi khẳng định trỏ được về tệp/URL. Trả về cho Trưởng phòng: đường dẫn báo cáo + 5 dòng tóm tắt.
Không sửa tệp nào khác trong `manager-ai`. Không commit.
