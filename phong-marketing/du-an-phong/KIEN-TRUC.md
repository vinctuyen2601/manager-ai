# Phòng Marketing AI — Kiến trúc v0.2

Trạng thái: **Đề xuất, chờ sếp duyệt** · 11/11/2026 · Markdown-first, Git, Claude Code
Nguồn: bản v0.1 sếp đưa (bộ khung, 12 nguyên tắc) + lõi đã dựng và đo ngày 11/11 (`../nhan-su/danh-gia/`, `../thu-vien/nghien-cuu/2026-11-11-agent-chuyen-gia/`).
Ký hiệu trạng thái: ✅ có trong lõi và đã chạy · 🟡 có một phần · ⬜ chưa có.

Kiến trúc này phải đủ rõ để **thay một phần mà không đập cả khối**. Mỗi thành phần có một chỗ ở trên đĩa, một chủ, một định nghĩa.

---

## 1. Tầm nhìn
Một phòng marketing AI cho chủ shop làm một mình. Phòng **chứng minh năng lực trước khi được thuê**, làm việc theo quy trình,
học từ kết quả thật, và **bị chính dự đoán của mình phản bác**. Lõi là tệp Markdown/JSON trong git, chạy bằng Claude Code.
Lâu dài có SaaS làm **lớp nhìn**; SaaS đọc và ghi lõi, không có sự thật riêng.

## 2. Ba chủ thể

| Chủ thể | Là ai | Vai trò trong kiến trúc | Trạng thái |
|---|---|---|---|
| **Boss** | Chủ shop | Người quyết (mục tiêu, ngân sách, quyền, duyệt) **và nguồn tri thức khan hiếm nhất** (sự thật sản phẩm, đáp án chuẩn, video mẫu, chữ khách). Thời gian của Boss là tài nguyên được quản lý | ✅ |
| **Khách hàng (Shop)** | Doanh nghiệp được phục vụ: 17fishing, christmas-spins, merry-orb… | Ranh giới dữ liệu. Mọi thứ riêng của shop nằm trong `khach-hang/<shop>/` | ✅ |
| **Phòng (Organization)** | Phòng marketing AI | Vai, quy chế, thư viện dùng chung. **Không** dùng chữ "Organization" cho shop | ✅ |

## 3. Bốn lớp và các miền

```
            ┌──────────── bài học thăng hạng · sự thật mới Boss xác nhận ────────────┐
            ▼                                                                         │
 1 FOUNDATION ──► 2 CAPABILITIES ──► 3 EXECUTION ──► 4 INTELLIGENCE & IMPROVEMENT ───┤
 (biết gì)         (ai, làm bằng gì,   (đang làm gì,    (giỏi tới đâu, đoán đúng không,  │
                   theo cách nào)      làm ra gì)       học được gì)                     │
                          ▲                                                          │
                          └──────────── đào tạo: sửa luật, vai, việc ───────────────┘
            trục KHÁCH HÀNG cắt ngang lớp 1, 3, 4
```

| Lớp | Miền | Định nghĩa ngắn | Ở đâu | |
|---|---|---|---|---|
| **1 Foundation** | **Facts** | Sự thật về doanh nghiệp và sản phẩm, có trạng thái xác nhận. Sai = nói láo với khách | `khach-hang/<shop>/HO-SO.md`, `khach-hang/<shop>/san-pham/` | ✅ |
| | **Knowledge** | Tri thức ngành dùng chung nhiều shop: khách, chữ khách, giá, mùa vụ, hỏi đáp | `thu-vien/nganh/<ngành>/` | ✅ |
| | **Evidence** | Bằng chứng học từ bên ngoài, có ngày và nguồn: khung video viral, nghiên cứu | `thu-vien/khung/`, `thu-vien/nghien-cuu/` | 🟡 0 khung ngành đồ câu |
| **2 Capabilities** | **Roles** | Chức danh: trách nhiệm, quyền, báo cáo cho ai | `nhan-su/vai/<vai>.md` (phần đầu) | 🟡 gộp với Agent |
| | **Agents** | Một **phiên bản** của gói vai đang giữ chức danh, kèm hồ sơ năng lực | `nhan-su/vai/<vai>.md` @ commit | ⬜ chưa tách phiên bản |
| | **Skills** | Tệp việc: làm gì, theo bước nào, khuôn đầu ra, bộ thi | `nhan-su/viec/` | ✅ |
| | **Tools** | Khả năng hành động, độc lập với vai, có danh mục và quyền dùng | `xuong/` | ⬜ chưa có danh mục |
| | **Workflows** | Luồng nối các việc, không gắn cứng vào một agent | `quy-che/luong/` | ✅ |
| | **Policies** | Luật chung, quyền tự chủ, luật lời nói | `quy-che/` | 🟡 L0–L3 chưa thành bảng |
| **3 Execution** | **Works** | Một đơn vị việc có mục tiêu, chủ, trạng thái, hạn | `khach-hang/<shop>/viec/<lần chạy>/` | 🟡 không có danh sách chung |
| | **Orchestration** | Trưởng phòng điều phối, phiếu giao, nhật ký | `00-dieu-phoi.md`, phiếu giao | ✅ |
| | **Requests** | Thứ phòng xin Boss: checklist, quiz, hộp "Cần anh" | `khach-hang/<shop>/doi/CHECKLIST-SEP.md`, `TAI-NGUYEN.md` | ✅ |
| | **Assets** | Thành phẩm **của mình**: kịch bản, prompt, video, có phiên bản | phiếu giao + `thu-nghiem/` | 🟡 media không theo git, không có sổ |
| **4 Intelligence** | **Evaluations** | Đánh giá agent (bộ đề, cấp L1–L5 theo năng lực) và đánh giá work (chất lượng, KPI) | `nhan-su/danh-gia/`, `nhan-su/_kin/` | 🟡 mới có đánh giá agent |
| | **Predictions** | Phán đoán có %, cách kiểm, hạn. Thứ duy nhất chứng minh **đoán đúng** chứ không chỉ **biết cách đoán** | `khach-hang/<shop>/kinh-nghiem/DU-DOAN.md` | ✅ 2 dự đoán, hạn 15/12 |
| | **Lessons** | Bài học có nguồn, bằng chứng, **phạm vi áp dụng**, độ tin, trạng thái kiểm chứng | sổ lỗi trong gói vai, `DAO-TAO.md` | 🟡 chưa có khuôn chung |

## 4. Định nghĩa lõi

**Role và Agent.** Role là chỗ ngồi; Agent là **phiên bản gói vai** đang ngồi chỗ đó (`<vai>@<commit>`). Mọi kết quả thi ghi kèm commit
của gói lúc thi. Sửa gói = agent mới; so điểm hai phiên bản thì biết lần sửa có ích không. Thay agent không phải vẽ lại tổ chức.

**Fact.** Bốn tầng: *sự thật có nguồn* · *đã chứng minh bằng kết quả* · *giả thuyết marketing* · *cấm nói*. Boss xác nhận thì khoá (`khoa: true`).

**Work.** Mục tiêu · chủ (một vai chịu trách nhiệm cuối) · người làm · luồng · đầu vào · đầu ra · phụ thuộc · trạng thái
(`mới → chờ nguyên liệu → đang làm → chờ Boss → xong | bỏ`) · hạn · đánh giá.

**Lesson.** Nguồn (work nào) · bằng chứng · **phạm vi**: một sản phẩm / một shop / một ngành / mọi ngành · độ tin · trạng thái
(`mới → lặp lại ≥ 2 lần → đã thăng hạng vào gói | bị bác`). Lesson Giáng sinh "trả lời ở giây 7,8" bị viết thành luật mọi ngành là lỗi đã gặp.

**Prediction.** Ai đoán · đoán gì · % · đổi ý nếu · kiểm bằng · ngưỡng · hạn · kết quả (ghi cả khi sai).

**Request.** Xin gì · cho vai/năng lực nào · Boss mất bao lâu · không có thì làm gì · chặn hay không. Hỏi được bằng lựa chọn → quiz.

## 5. Phạm vi bộ nhớ

| Phạm vi | Chứa | Ở đâu |
|---|---|---|
| **Nghề** (mọi shop, mọi ngành) | Gói vai, tệp việc, luật chung, sổ tay viral | `nhan-su/`, `quy-che/`, `thu-vien/so-tay/` |
| **Ngành** (mọi shop cùng ngành) | Gói ngành, khung video ngành | `thu-vien/nganh/`, `thu-vien/khung/` |
| **Khách hàng** (một shop) | Hồ sơ, sản phẩm, đội, việc, dự đoán | `khach-hang/<shop>/` |
| **Work** (một lần chạy) | Phiếu giao, nhật ký, thành phẩm | `khach-hang/<shop>/viec/<lần chạy>/` |

Không có bộ nhớ riêng của agent: agent không nhớ gì giữa các phiên. Thứ tương đương là **sổ lỗi theo vai** trong gói vai.
Agent không nạp cả kho: nạp **mục lục** rồi tự chọn ≤ 3 trang, khai trong ô "Đã đọc".

## 6. Vòng đời

**6.1 Lập đội (trước mọi việc)** — `nhan-su/viec/tp-lap-doi.md` ✅
Boss đưa link shop → Trưởng phòng tự khảo sát, viết hồ sơ phần 1 → đề xuất đội → bộ đề, Boss viết đáp án → thi 2 lượt, chấm mù →
tìm nguyên nhân → đào tạo (có dự đoán) → thi lại → báo cáo "đội sẵn sàng" → **Boss thuê từng vai** → nhập việc (hồ sơ phần 2).

**6.2 Chu trình việc**
Boss đưa mục tiêu → Trưởng phòng lập Work → chọn luồng → **cổng cấp năng lực** (vai chưa đạt: Trưởng phòng + vai + Boss cùng đào tạo
trước) → agent nạp mục lục, làm, ghi phiếu (có ô Phán đoán) → Trưởng phòng mở tệp kiểm → Assets → Boss duyệt bước tốn tiền hoặc ra ngoài
→ đăng → **số liệu sau đăng** ⬜ → kiểm dự đoán → Lessons.

**6.3 Vòng học**
Đánh giá chỉ ra nguyên nhân (thiếu kiến thức · thiếu kỹ năng · đầu vào kém · luật đẩy sai) → sửa **đúng lớp** → ghi dự đoán trước →
thi lại → giữ nếu đạt, hoàn lại nếu tụt (bánh cóc). Bài học lặp ≥ 2 lần mới thăng hạng vào gói vai hoặc gói ngành.

**6.4 Nhịp kích hoạt** ⬜
Claude không tự thức dậy. Cần: lịch (vd Trưởng phòng lên kế hoạch tuần mỗi thứ Hai), sự kiện (Boss trả lời một câu "Cần anh",
dự đoán tới hạn). Chưa có thì phòng chỉ chạy khi Boss mở chat.

## 7. Quản trị

**7.1 Hành động** (L0 quan sát · L1 đề xuất · L2 làm nội bộ · L3 ra ngoài). Vai L4 được L2; đăng bài, tiêu tiền, sửa trang web, xoá dữ liệu
→ hỏi Boss (quiz 11/11). 🟡 chưa thành bảng trong `quy-che/`.

**7.2 Lời nói** ✅ `quy-che/LUAT-CHUNG.md`. Lời ra ngoài chỉ nói Fact đã xác nhận. Lời nội bộ bắt buộc phán đoán đủ 5 ô. Dưới 3 bằng chứng
độc lập không viết thành kết luận. Bài học một ngành không phải luật ngành khác.

**7.3 Dữ liệu.** Đáp án Boss và khoá chấm ở `nhan-su/_kin/`, agent thi không đọc. Không chép kho shop, chỉ trỏ tới. Không theo dõi đối thủ.
Không đưa khoá, token, dữ liệu cá nhân khách vào tệp.

**7.4 Thời gian của Boss.** Mỗi lần hỏi Boss phải đi qua checklist: tối đa 3 mục chặn, mỗi mục có mặc định, câu chọn được thì quiz.
Báo Boss chỉ khi cần Boss hoặc xong mốc.

## 8. Giao thức đánh giá ✅
Đề ≥ 30 % câu thiếu dữ liệu · đáp án Boss kín · mỗi đề 2 lượt · chấm mù có khoá giải mã · chấm thang có mô tả từng mức ·
**dự đoán ghi trước khi sửa** · ghi rõ giới hạn (Claude chấm Claude, mẫu nhỏ, văn phong lộ) · chênh dưới ~10 điểm % không coi là tiến bộ.
Điểm thi đo **biết cách**; Predictions đo **đúng thật**.

## 9. Nền tảng — thứ tương đương đang dùng

| Năng lực | Hiện dùng | |
|---|---|---|
| Runtime | Claude Code (VS Code, web, desktop); sau: Claude Agent SDK trên máy chủ | ✅ |
| Orchestration | Trưởng phòng + luồng + agent con | ✅ |
| Communication | Phiếu giao có khuôn | ✅ |
| Memory / Retrieval | Tệp + mục lục + "≤ 3 trang" | ✅ |
| Governance | `quy-che/` + bảng quyết định trong `CLAUDE.md` | 🟡 |
| Observability | Nhật ký điều phối, ô "Đã đọc", git log | 🟡 chưa có ghi chi phí |
| Scheduling | — | ⬜ |
| Lớp nhìn | Trang artifact phác thảo; sau: SaaS | 🟡 |

## 10. Nguyên tắc
1. Phòng tách khỏi Agents; Role tách khỏi Agent; Agent là phiên bản, thay được.
2. Tools và Workflows không thuộc riêng agent nào.
3. **Fact tách khỏi Asset**: thứ đúng về doanh nghiệp ≠ thứ phòng làm ra ≠ bằng chứng học từ người khác.
4. Works có trạng thái và vòng đời riêng.
5. Bộ nhớ có phạm vi nghề · ngành · khách hàng · work; trỏ tới, không chép.
6. **Lời ra ngoài chỉ nói sự thật; lời nội bộ bắt buộc phán đoán.**
7. Evaluations dựa trên bằng chứng, theo giao thức mục 8; Lessons kiểm chứng trước khi thành tri thức chung.
8. **Mọi thay đổi agent có dự đoán ghi trước và thi lại.**
9. **Boss là nguồn tri thức; thời gian Boss được quản lý.**
10. Lập đội trước mọi việc; cấp năng lực quyết định quyền tự chủ.
11. Quyền tối thiểu cần thiết; mọi hoạt động quan trọng truy vết được.
12. Lõi chạy được không cần SaaS; SaaS không có sự thật riêng.

## 11. Khoảng cách: lõi hiện tại so với v0.2 (xếp theo mức chặn)

| # | Thiếu | Làm gì | Tốn |
|---|---|---|---|
| G1 | Số liệu sau đăng | Định nghĩa đường về: Boss nhập tay vài số mỗi tuần vào `khach-hang/<shop>/kinh-nghiem/` | nhỏ, cần Boss |
| G2 | Agent chưa tách phiên bản | Ghi commit gói vai vào mọi bài thi và `doi/DOI.md` | rất nhỏ |
| G3 | Không có danh sách Works | `khach-hang/<shop>/viec/README.md`: bảng việc, chủ, trạng thái, hạn | nhỏ |
| G4 | L0–L3 chưa thành bảng | `quy-che/QUYEN-TU-CHU.md` | nhỏ |
| G5 | Không có danh mục Tools | `xuong/CONG-CU.md`: công cụ, vai được dùng, cần gì để chạy | nhỏ |
| G6 | Assets không có sổ, media lạc khi đổi máy | Sổ thành phẩm trong mỗi Work; quyết nơi giữ media (ổ đám mây?) | vừa, cần Boss |
| G7 | Lessons chưa có khuôn chung | Khuôn Lesson theo mục 4, dùng trong `tp-duc-ket` | nhỏ |
| G8 | Không có nhịp kích hoạt | Lịch chạy Claude Code hoặc routine | vừa |
| G9 | Không ghi chi phí | Ghi hạn mức Muse, lượt gọi trả phí vào phiếu | nhỏ |

## 12. Quyết định còn mở
1. Duyệt v0.2 (thay v0.1).
2. Thứ tự lấp khoảng cách G1–G9, hay làm video phao trước rồi lấp theo chỗ vướng thật.
3. Media (G6) giữ ở đâu khi làm trên nhiều máy.
