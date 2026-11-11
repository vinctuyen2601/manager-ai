# Phòng Marketing AI — Kiến trúc v0.2

Trạng thái: **ĐÃ DUYỆT** (sếp, 11/11/2026 — thay v0.1) · khoảng cách G1–G9 đã lấp cùng ngày (mục 11) · Markdown-first, Git, Claude Code
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
| | **Agents** | Một **phiên bản** của gói vai đang giữ chức danh, kèm hồ sơ năng lực | `nhan-su/vai/<vai>.md` @ commit, ghi ở `khach-hang/<shop>/doi/DOI.md` | ✅ |
| | **Skills** | Tệp việc: làm gì, theo bước nào, khuôn đầu ra, bộ thi | `nhan-su/viec/` | ✅ |
| | **Tools** | Khả năng hành động, độc lập với vai, có danh mục và quyền dùng | `xuong/CONG-CU.md` | ✅ |
| | **Workflows** | Luồng nối các việc, không gắn cứng vào một agent | `quy-che/luong/` | ✅ |
| | **Policies** | Luật chung, quyền tự chủ, luật lời nói, nhịp | `quy-che/LUAT-CHUNG.md`, `QUYEN-TU-CHU.md`, `NHIP.md` | ✅ |
| **3 Execution** | **Works** | Một đơn vị việc có mục tiêu, chủ, trạng thái, hạn | `khach-hang/<shop>/viec/README.md` (danh sách) + `<lần chạy>/` | ✅ |
| | **Orchestration** | Trưởng phòng điều phối, phiếu giao, nhật ký | `00-dieu-phoi.md`, phiếu giao | ✅ |
| | **Requests** | Thứ phòng xin Boss: checklist, quiz, hộp "Cần anh" | `khach-hang/<shop>/doi/CHECKLIST-SEP.md`, `TAI-NGUYEN.md` | ✅ |
| | **Assets** | Thành phẩm **của mình**: kịch bản, prompt, video, có phiên bản | chữ: trong Work (git) · media: `thu-nghiem/` trên máy Linux này (sếp chốt 11/11) · sổ: cột Thành phẩm của `viec/README.md` | 🟡 chưa có thành phẩm nào |
| **4 Intelligence** | **Evaluations** | Đánh giá agent (bộ đề, cấp L1–L5 theo năng lực) và đánh giá work (chất lượng, KPI) | `nhan-su/danh-gia/`, `nhan-su/_kin/`, `khach-hang/<shop>/kinh-nghiem/SO-LIEU.md` | 🟡 đánh giá work chờ video đầu tiên |
| | **Predictions** | Phán đoán có %, cách kiểm, hạn. Thứ duy nhất chứng minh **đoán đúng** chứ không chỉ **biết cách đoán** | `khach-hang/<shop>/kinh-nghiem/DU-DOAN.md` | ✅ 2 dự đoán, hạn 15/12 |
| | **Lessons** | Bài học có nguồn, bằng chứng, **phạm vi áp dụng**, độ tin, trạng thái kiểm chứng | khuôn `quy-che/khuon/bai-hoc.md` · sổ theo phạm vi: `nhan-su/BAI-HOC.md`, `khach-hang/<shop>/kinh-nghiem/BAI-HOC.md`, gói ngành | ✅ |

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

**6.4 Nhịp kích hoạt** 🟡 `quy-che/NHIP.md`
Bảng việc theo nhịp: mở phiên · dự đoán tới hạn · số liệu 48h/7 ngày · kế hoạch thứ Hai · sếp trả lời. Còn thiếu cách **tự mở phiên**:
sếp chốt sau sẽ điều khiển qua **Claude Remote**; lịch tự động để sau khi bảng chạy ổn bằng tay.

## 7. Quản trị

**7.1 Hành động** ✅ `quy-che/QUYEN-TU-CHU.md` (L0 quan sát · L1 đề xuất · L2 làm nội bộ · L3 ra ngoài). Vai L4 được L2; L3 luôn hỏi Boss.
Ngoại lệ một lần ghi ngày và lời Boss.

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
| Observability | Nhật ký điều phối, ô "Đã đọc", ô `chi_phi` trong phiếu, git log | ✅ |
| Scheduling | `quy-che/NHIP.md`; tự mở phiên qua Claude Remote (sau) | 🟡 |
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

## 11. Khoảng cách: lõi so với v0.2 — đã lấp 11/11/2026

| # | Thiếu | Đã làm | Còn |
|---|---|---|---|
| G1 | Số liệu sau đăng | Khuôn `quy-che/khuon/so-lieu-sau-dang.md` (sếp nhập tay, 48h + 7 ngày) · sổ `khach-hang/17fishing/kinh-nghiem/SO-LIEU.md` | Kênh đăng: hỏi khi nhập việc |
| G2 | Agent chưa tách phiên bản | Agent = `<vai>@<commit>`; ghi commit cả 3 đợt thi vào `DOI.md`; luật trong `tp-lap-doi` | — |
| G3 | Không có danh sách Works | `khach-hang/<shop>/viec/README.md` cho 3 shop | — |
| G4 | L0–L3 chưa thành bảng | `quy-che/QUYEN-TU-CHU.md` (cấp năng lực → mức; ngoại lệ có ngày) | — |
| G5 | Không có danh mục Tools | `xuong/CONG-CU.md` (vai được dùng, mức, cần gì, lỗi đã biết) | — |
| G6 | Media lạc khi đổi máy | Sếp chốt: media ở `thu-nghiem/` máy Linux này, điều khiển từ xa qua Claude Remote; chữ theo git | Media cũ trên máy Windows không chuyển |
| G7 | Lessons chưa có khuôn | `quy-che/khuon/bai-hoc.md` + 3 sổ theo phạm vi, đã ghi 10 bài học ngày 11/11 | — |
| G8 | Không có nhịp kích hoạt | `quy-che/NHIP.md` | Tự mở phiên (Claude Remote / lịch) |
| G9 | Không ghi chi phí | Ô `chi_phi` trong phiếu giao + cột chi phí trong danh sách Works | — |

## 12. Quyết định
- 11/11: duyệt v0.2 thay v0.1 · lấp G1–G9 trước khi làm video · media giữ ở máy Linux, sau điều khiển qua Claude Remote.
- Còn mở: cách tự mở phiên (G8) · kênh đăng và mục tiêu (nhập việc, sau khi thuê đội).
