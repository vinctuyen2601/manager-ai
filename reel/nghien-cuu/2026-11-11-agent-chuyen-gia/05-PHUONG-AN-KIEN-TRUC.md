# Phương án kiến trúc — agent chuyên gia cho Phòng Marketing AI (bản 1, chờ sếp duyệt)

Ráp từ 4 báo cáo nghiên cứu (01–04 cùng thư mục), party mode 11/11/2026. Đích: 5 năng lực sếp chốt —
**chuyên môn · tự học · tích luỹ kinh nghiệm · phân tích · phán đoán riêng**.

## 0. Kết luận nghiên cứu trong 5 dòng
1. Không repo nào có "gói ngành dùng chung giữa các vai". Hướng 4 lớp của mình đi xa hơn cả 14 repo; thứ cần học là **cách nạp, cách sửa, cách chấm**.
2. Không lấy mã framework nào (MetaGPT, AgentScope, CowAgent, TencentDB, MARTI, wanwu). Tất cả chuyển được thành Markdown + agent con.
3. Lỗi "thiếu chính kiến" do chính tài liệu chống ảo giác dạy ra ("nói thẳng không biết"). Sửa bằng cách **tách sự thật khỏi phán đoán**, không bỏ tính trung thực.
4. Tự học không có phản hồi thật = tự củng cố. Kinh nghiệm chỉ đến từ **dự đoán có ngày kiểm** và **kết quả sau khi đăng**.
5. Không đo thì không biết giỏi lên. **Chấm điểm gốc trước khi sửa gì.**

## 1. Bốn lớp tri thức (agent mang theo gì)

| Lớp | Thư mục | Loại trí nhớ | Phục vụ năng lực | Nạp thế nào |
|---|---|---|---|---|
| 1 · **Gói nghề** theo vai | `chuyen-vien/<vai>.md` (đã có, cắt phần Giáng sinh/Mỹ sang lớp 2) | thủ tục | chuyên môn (nghề) | nạp cả, ≤ 500 dòng. Thêm 2 mục: **"Trang bị"** (được đọc lớp nào) · **"Yếu / không làm được"** |
| 2 · **Gói ngành** dùng chung 6 vai | `nganh/<ngành>/` vd `nganh/do-cau-vn/`, `nganh/giang-sinh-my/` | ngữ nghĩa | chuyên môn (ngành), phân tích | **chỉ nạp `MUC-LUC.md` ≤ 1 trang**, agent tự chọn ≤ 3 trang cần đọc |
| 3 · **Thư viện bằng chứng** | `khung/` (bóc sâu) + `nganh/<ngành>/doi-thu/` (mổ rộng 10–20 quảng cáo) | sự kiện của người khác | phân tích | tra khi cần, trỏ từ mục lục ngành |
| 4 · **Sổ kinh nghiệm** | `kinh-nghiem/` — mỗi video: dự đoán · ngày kiểm · kết quả thật · bài học | sự kiện của chính mình | kinh nghiệm, tự học | Đúc kết đọc; bài học lặp ≥ 2 lần mới **thăng hạng** lên lớp 1 hoặc 2 |

**Khuôn gói ngành** (theo wiki TencentDB, đã đọc mã):
```
nganh/do-cau-vn/
  MUC-LUC.md          ≤ 1 trang: mỗi dòng = đường dẫn · 1 câu tóm tắt · đọc khi nào · ngày
  muc-dich.md         ngành này phục vụ ai, ranh giới
  khuon.md            các loại trang của ngành (khách · ngôn ngữ · đối thủ · giá · mùa vụ · nội dung thắng · hỏi đáp)
  khach-hang.md       nhóm cần thủ (câu đài, lăng xê, câu đêm…), ai mua món nào
  ngon-ngu-khach.md   chữ thật của khách: GSC + tìm kiếm trên site + câu Zalo + bình luận công khai (cột nguồn, tần suất)
  doi-thu/            mỗi đối thủ một trang + bảng thông điệp × đối thủ có cột "khoảng trống"
  mua-vu.md · gia-thi-truong.md · noi-dung-thang.md
  hoi-dap/            câu hỏi ngành + đáp án có nguồn — dùng luôn làm đề phỏng vấn
  nhat-ky.md          nạp gì, khi nào, từ đâu
```
Mỗi trang có frontmatter: `loai · nguon · ngay · muc_tin · khoa`. `khoa: true` = sếp đã sửa tay, máy không ghi đè.
**Trỏ tới** hồ sơ shop (`17fishing/CLAUDE.md`, `GIONG-TRANG-SAN-PHAM.md`, blog), **không chép** — hai shop đã từng trôi dạt vì chép.

## 2. Ba luật hành xử (agent làm việc thế nào)

1. **Tách sự thật và phán đoán** (lỗi 3). Sự thật phải có nguồn, thiếu thì ghi "chưa kiểm". Phán đoán **cấm bỏ trống**:
   phiếu giao có ô bắt buộc **"Phán đoán: nghiêng về X · ~N % · vì Y (nguồn) · kiểm bằng Z (rẻ, có ngưỡng, có hạn)"**.
2. **Đếm bằng chứng trước khi kết luận** (bài học ngược Ad-Autopsy). < 3 bằng chứng thì chỉ được viết "nghiêng về X ~N %", không viết thành sự thật.
3. **Khai đã đọc gì.** Phiếu giao có ô **"Đã đọc"** (trang nào của lớp 2–4). Tầng chấm quy tắc bắt được "có kho mà không đọc".

Phiếu giao xếp kiểu **bánh mì kẹp**: vai + luật cứng ở đầu → đã biết → tư liệu (đường dẫn) → **việc cần làm + khuôn nộp ở cuối**.
Trả việc phải dán nguyên văn chỗ sai + "lần k/3".

## 3. Hai vòng lặp (agent giỏi lên thế nào)

**Vòng tự học — vào ngành mới** (việc mới `sxh-dung-nganh`, quy trình 0–8 của nhóm 3):
kho nội bộ trước → đối thủ → bài vượt nền của chính tài khoản (≥ 1,5× trung vị) → bình luận, lời khách → quảng cáo Meta `country=VN`.
Nạp **hai bước**: phân tích nguồn trước, sinh trang sau, mỗi ô ghi nguồn + ngày + mức tin.

**Vòng kinh nghiệm — sau mỗi lô** (sửa `tp-duc-ket`):
- Mỗi video ra kèm **dự đoán + ngày kiểm** (như `NHAT-KY-QUYET-DINH.md` của vai quản lý shop). Tới hạn thì ghi số thật, **kể cả khi sai**.
- Rút bài học **theo cặp thắng/thua** (Youtu): chỉ chỗ có lần đúng lần sai mới rút. Mỗi bài học đối chiếu kho rồi ra một lệnh: **thêm · sửa · xoá · bỏ qua**.
- "Sửa nguồn, đừng ghi triệu chứng". Có danh sách "không được ghi".
- **Bánh cóc:** viết đề hồi quy TRƯỚC, sửa gói SAU, chỉ giữ bản sửa khi đề qua và điểm không tụt.
- Sổ hiệu chỉnh %: khi có ≥ 20 phán đoán có %, so "nói 70 %" với tỉ lệ đúng thật.

## 4. Thước đo (biết agent đã thành chuyên gia chưa)

**Bộ đề phỏng vấn mỗi vai:** 6–8 câu · **≥ 30 % câu cố ý thiếu dữ liệu** · đề mở (để luyện) và đề kín (không lọt vào gói).
**Sếp viết đáp án chuẩn trước.** Chấm ba tầng: quy tắc (khuôn, ô Đã đọc) → LLM chấm mù so cặp với đáp án sếp → sếp soát mẫu.
Mỗi đề chạy 2 lần, ghi độ lệch. Thang có mô tả từng mức (04, mục A):
- **R1 Phán đoán khi thiếu dữ liệu** — chọn phía · mức tự tin · lý do có nguồn · cách kiểm · tách sự thật/phán đoán (0–2 mỗi ô)
- **R2 Hiểu biết ngành** — ngôn ngữ dân câu · đối thủ/thị trường · khách là ai · bám sản phẩm thật · so với đáp án sếp

| Năng lực | Đạt khi (đề xuất, sếp chốt mốc) |
|---|---|
| Chuyên môn | R2 so cặp thắng/hoà đáp án sếp ≥ 40 % |
| Phán đoán | R1 ≥ 8/10 trên câu thiếu dữ liệu |
| Phân tích | Câu "đọc số liệu này rút ra gì" có ≥ 1 ý sếp chưa tự thấy (sếp chấm) |
| Tự học | Gói ngành mới qua 10 câu thử trúng trong `hoi-dap/` |
| Kinh nghiệm | Lần chạy sau không lặp lỗi đã ghi ở sổ; tỉ lệ dự đoán đúng tăng |

Ba câu sếp đã hỏi 11/11 là 3 câu đầu của bộ đề SP và SXH.

## 5. Lộ trình

| Pha | Việc | Cần sếp | Xong khi |
|---|---|---|---|
| **0** | Viết bộ đề SP + SXH, **chấm điểm gốc** agent hiện tại | ~30 phút viết đáp án chuẩn | Có bảng điểm gốc |
| **1** | Sửa khung chung: phiếu giao (Phán đoán, Đã đọc, bánh mì kẹp), luật sự thật/phán đoán vào 6 gói, mục Trang bị + Yếu | — | Thi lại R1 tăng |
| **2** | Dựng `nganh/do-cau-vn/`: khuôn + nạp hai bước từ kho nội bộ (hồ sơ 17fishing, giọng viết, blog, GSC) | Duyệt khuôn; trả lời đối thủ chính | Thi lại R2 tăng; 10 câu thử trúng |
| **2b** | Nguồn ngoài: web + thử cào dữ liệu (100 lượt miễn phí) | Quyết dùng dịch vụ trả phí; tạo tài khoản, khoá | Có ≥ 1 trang đối thủ + ngôn ngữ khách từ bình luận |
| **3** | Thi lại SP + SXH → đạt thì **chạy tiếp luồng phao** từ bước 3 | Duyệt điểm | Phiếu 03 mới chọn được khung đúng ngành hoặc nói rõ vì sao chưa |
| **4** | Vòng kinh nghiệm: `kinh-nghiem/` + `tp-duc-ket` mới; chạy khi video phao được đăng | Mang số liệu sau đăng về (hoặc nối API) | Dự đoán đầu tiên được kiểm đúng hạn |

## 6. Không lấy (và vì sao)
Mã của mọi framework (hạ tầng nặng, Python/Go server) · meta-agent tự sinh agent (đầu ra không có kiến thức ngành = newbie) ·
vector DB / Qdrant / Neo4j · RL training (MARTI đòi ~8 GPU 80 GB mỗi agent) · thang 1–10 không mô tả mức ·
tự viết lại kỹ năng không người duyệt · Deep Dream ghi đè trí nhớ · role-playing kiểu CAMEL.

## 6b. Sếp đã chốt (11/11, sau bản 1)
- Được đọc kho 17fishing và GaRutin, chỉ trỏ tới — câu mở 1 đóng.
- **Không theo dõi đối thủ** → bỏ `doi-thu/`, bỏ mổ quảng cáo đối thủ tầng rộng, R2 ô "thị trường" chấm theo người mua + nội dung trong ngách.
  Thư viện bằng chứng (lớp 3) chỉ còn: video viral trong ngách (ai làm cũng được) + video của chính shop.
- Bộ đề nháp: `06-BO-DE-NHAP.md`, chờ sếp điền đáp án.

## 6c. Lấy từ bản tham khảo SaaS (07) — sếp chốt KHÔNG xây phần mềm, chỉ lấy ý
- **Cấp năng lực L1–L5 theo từng năng lực** (ma trận ở 06). Cấp quyết định việc được giao → nối thẳng với hướng tự chủ: cấp càng cao càng nới workflow.
- **Phân tích nguyên nhân trước khi sửa** (kiến thức / kỹ năng / đầu vào / ràng buộc) — thêm vào `tp-duc-ket`.
- **Claim 4 tầng** trong hồ sơ sản phẩm: sự thật có nguồn · đã chứng minh bằng kết quả · giả thuyết marketing · cấm nói.
- **Reviewer/Trưởng phòng chỉ chấm chất lượng sáng tạo**; hiệu quả kinh doanh chỉ kết luận bằng số liệu sau đăng.
- Bảng quyền tự chủ L0 quan sát · L1 đề xuất · L2 làm nội bộ · L3 hành động bên ngoài (đăng, tiêu tiền) — ghi vào gói Trưởng phòng khi chuyển sang tự chủ.
- Không lấy: đa tenant, DB, giao diện, workflow engine, tình báo đối thủ, kiểm duyệt bản quyền (trái quyết định sếp 11/11).

## 7. Câu hỏi còn mở
1. Phòng được **đọc (trỏ tới)** kho 17fishing và GaRutin? Lật quyết định "tài sản độc lập" trong `reel/CLAUDE.md`.
2. Sếp có ~30 phút viết đáp án chuẩn cho bộ đề không? Không có thì chấm lệch về phía Claude chấm Claude.
3. Dùng dịch vụ cào dữ liệu trả phí (ScrapeCreators, ~$47/25.000 lượt — giá chưa kiểm trên trang chính thức)?
4. Có xuất được tin nhắn Zalo gốc của khách không? Ngoài vuadocau.com, đối thủ chính là ai?
5. Mốc đạt R1 ≥ 8/10, R2 ≥ 40 % — chưa có cơ sở số, sếp chốt hay để sau điểm gốc.
