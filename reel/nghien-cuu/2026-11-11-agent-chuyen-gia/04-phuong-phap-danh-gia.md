# Nhóm 4 Phương pháp: kiến trúc agent, đánh giá, huấn luyện · 11/11/2026

Trả lời chính lỗi 3 (thiếu chính kiến khi thiếu dữ liệu) và lỗi 5 (không có thước đo chuyên gia). Phụ: lỗi 2 (nạp tri thức) và cách xếp 4 lớp tri thức.

Mã tải về: `scratchpad/repo-nc/nhom4/<repo>/` (tarball HEAD ngày 11/11/2026, không chạy mã, không dùng git).
Đường dẫn trong báo cáo tính từ gốc mỗi repo.

## Xác minh repo

Số sao, commit cuối, giấy phép lấy từ `api.github.com/repos/<owner>/<repo>` ngày 11/11/2026 (trường `pushed_at`).

| Tên gợi ý | URL thật | Sao | Commit cuối | Giấy phép | Có thật? |
|---|---|---|---|---|---|
| Hello-Agents | https://github.com/datawhalechina/hello-agents | 86.646 | 13/10/2026 | CC BY-NC-SA 4.0 (`LICENSE.txt`; API báo NOASSERTION) | Có. Đúng mô tả. 16 chương + 13 chương phụ (`Extra-Chapter/`) |
| agent_learning | https://github.com/Haozhe-Xing/agent_learning | 665 | 24/10/2026 | MIT | Có. Chủ là Haozhe-Xing. Mô tả "23 chương" **sai**: `src/zh/SUMMARY.md` có 31 mục chương, số tới chương 25. Có `reference-agent/` thật |
| MARTI | https://github.com/TsinghuaC3I/MARTI | 574 | 20/08/2026 | MIT | Có. Đúng mô tả (RL đa agent, ICLR 2026) |
| UnicomAI/wanwu | https://github.com/UnicomAI/wanwu | 2.385 | 10/11/2026 | Apache-2.0 | Có. Đúng mô tả. Nền tảng Go + docker-compose |

Lưu ý mức tin chung:
- Hello-Agents: thư viện `hello_agents` (chứa `LLMJudge`, `WinRateEvaluator`) **không nằm trong repo này**. Mã ví dụ `code/chapter12/*.py` chỉ gọi nó. Nên mọi thứ về chấm điểm là "đọc tài liệu + mã ví dụ + tệp kết quả mẫu", không phải mã lõi.
- agent_learning: tác giả tự ghi nhiều lớp đánh giá là "脚手架" (giàn giáo), chưa từng chạy thật (`src/zh/chapter_20_evaluation/06_agent_evaluation.md` dòng 761, `07_ab_testing.md` dòng 498). Mã chạy được duy nhất là `reference-agent/src/reference_agent/evaluation/harness.py`.

## Cơ chế đáng lấy

### A. Đánh giá (lỗi 5)

**A1. Chấm ba tầng: quy tắc → LLM theo rubric → người chấm ca then chốt**
- Làm gì: quy tắc (đếm, dò chuỗi) lọc nhanh và rẻ. LLM chấm phần cần hiểu nghĩa. Người chỉ chấm vài ca quyết định.
- Tệp: `agent_learning/src/zh/chapter_20_evaluation/01_evaluation_methods.md` mục "三种评估方法" và bảng "评估方法对比" (dòng 224–410). Hello-Agents dùng đúng bộ ba LLM Judge + Win Rate + kiểm tay: `docs/chapter12/Chapter12-Agent-Performance-Evaluation.md` mục 12.4.1.
- Giải lỗi: 5.
- Cách chuyển: tầng quy tắc là một tệp `cham-tu-dong.md` liệt kê phép dò trên bài nộp (có con số % không? có trỏ tệp nguồn không? có nhắc đối thủ/giá thị trường không?). Agent chấm chạy `grep` trước khi đọc. Tầng LLM là agent con chấm mù như bộ thi `bk-kich-ban-qc.thi` đang làm. Tầng người: chủ shop chỉ chấm 2–3 câu "phỏng vấn" mỗi vai, không chấm cả bộ.
- Chi phí: thấp. Đã có sẵn khung chấm mù, chỉ thêm tầng quy tắc.
- Mức tin: đọc tài liệu.

**A2. So cặp với đáp án chuẩn (win rate), mốc 50 % = ngang chuyên gia**
- Làm gì: thay vì chấm tuyệt đối 1–5, đưa giám khảo hai bài (bài agent, bài chuẩn) và hỏi bài nào hơn. Thắng ≈ 50 % nghĩa là ngang bài chuẩn. Dưới nhiều là kém.
- Tệp: Hello-Agents `docs/chapter12/...md` mục 12.4.1 (2) và 12.4.5 (`COMPARISON_PROMPT`). Kết quả chạy thật: `code/chapter12/data_generation/evaluation_results/20251011_123929/win_rate/win_rate_report_20251011_124322.md` (20 lần so, thắng 25 %). Tệp này cho thấy thư viện có **xáo vị trí A/B** (bài sinh ra lúc ở ô A lúc ở ô B), nhưng nhãn "生成题目" trong báo cáo ghi theo ô A nên đọc nhầm được.
- Giải lỗi: 5. Đây là cách biến "toàn là newbie" thành con số: **bài chuẩn = câu trả lời của chủ shop** (người đi câu thật) cho cùng câu hỏi.
- Cách chuyển: mỗi câu phỏng vấn, chủ shop trả lời trước bằng giọng nói/ghi chú ngắn (5 phút/câu). Giám khảo agent con nhận A/B đã xáo, không biết bài nào của ai. Ghi "thắng/thua/hoà" + lý do. Lưu ý: prompt mẫu của Hello-Agents ghi thẳng "Problem A - Generated" và "Problem B - AIME Real", tức là **không mù**. Mình phải bỏ nhãn đó.
- Chi phí: thời gian chủ shop viết đáp án chuẩn (một lần, dùng lại nhiều vòng). Đề tiếp theo cần giữ kín đáp án khỏi gói.
- Mức tin: đọc tài liệu + tệp kết quả thật.

**A3. Loại câu hỏi "không có đáp án" (Null Query) trong bộ đề**
- Làm gì: bộ đề MultiHopRAG mà wanwu dùng để tự chấm có 4 loại câu: suy luận, so sánh, **không đủ dữ liệu**, thời gian. Ở loại "không đủ dữ liệu", F1 của mọi hệ thống đều dưới 0,1 (Dify 0,018, wanwu-GraphRAG 0,089). Tức là xử lý câu thiếu dữ liệu là chỗ yếu nhất của mọi hệ.
- Tệp: `wanwu/configs/microservice/bff-service/static/manual/2.资源库/知识库/万悟RAG-指标评测（发布版）.md`.
- Giải lỗi: 3 và 5.
- Cách chuyển: mỗi bộ đề vai phải có ≥ 30 % câu **cố ý thiếu dữ liệu**. Khác MultiHopRAG ở đáp án đúng: với mình, đáp án đúng **không phải từ chối** mà là "nghiêng về X, ~N %, vì Y, kiểm bằng Z". Ví dụ cho Săn xu hướng: "Kiểu video câu phao đêm có đang lên ở VN không?" (không có số liệu TikTok). Ví dụ cho Chuyên viên SP: "Phao điện rô diếc giá 85k của mình rẻ hay đắt so với thị trường?" khi chưa tra Shopee.
- Chi phí: thấp, chỉ là viết đề.
- Mức tin: đọc tài liệu (bảng số là wanwu tự công bố, chỉ lấy cách phân loại câu, không tin bảng điểm).

**A4. Bộ đề cố định + tách đề hồi quy và đề giữ kín + chạy lặp**
- Làm gì: bộ đề không đổi theo thời gian để so trước/sau. Giữ một phần đề không bao giờ dùng để sửa gói (hold-out), tránh "học tủ". Mỗi đề chạy 3–5 lần lấy trung bình vì LLM ngẫu nhiên. Nhiều giám khảo để giảm thiên lệch.
- Tệp: `agent_learning/reference-agent/data/eval_samples.jsonl` (khuôn mỗi dòng một đề) và `harness.py` (hàm `evaluate` trả `pass_rate`); bảng "A/B 测试注意事项" ở `src/zh/chapter_20_evaluation/07_ab_testing.md` dòng 467–479; "设计要点" ở `06_agent_evaluation.md` dòng 797–803.
- Giải lỗi: 5.
- Cách chuyển: bộ thi `bk-kich-ban-qc.thi` đã có đề hồi quy (01) và đề giữ kín (02, 03). Thêm: (1) mỗi đề chạy **2 lần** mỗi phía (có gói / không gói), ghi cả hai điểm; (2) bảng "Lịch sử điểm" ghi thêm cột độ lệch giữa hai lần. Nếu hai lần lệch ≥ 2 điểm thì chênh lệch có gói/không gói dưới mức đó là nhiễu.
- Chi phí: gấp đôi lượt agent con mỗi vòng thi.
- Cảnh báo: agent_learning khuyên ≥ 30 ca mỗi biến thể. Mình có 2–3 đề × 8 tiêu chí. Kết quả chỉ là **hướng**, không phải bằng chứng thống kê. Ghi rõ điều đó trong bảng điểm, cùng tinh thần "đừng đo bằng doanh thu" trong `CLAUDE.md` gốc.
- Mức tin: đã đọc mã (harness) + tài liệu.

**A5. Chấm cả đường đi, không chỉ bài nộp (Agent-as-Judge)**
- Làm gì: giám khảo đọc cả chuỗi bước (nghĩ gì, gọi công cụ gì, thấy gì) chứ không chỉ kết quả. Sáu khía cạnh: đạt mục tiêu, chọn công cụ, dùng công cụ, sửa lỗi, hiệu quả, chất lượng suy luận.
- Tệp: `agent_learning/src/zh/chapter_20_evaluation/06_agent_evaluation.md` dòng 7–200 (`TrajectoryAspect`, `_review_steps`).
- Giải lỗi: 2 và 5. Lỗi 2 là "có kho mà không đọc". Chấm bài nộp không bắt được. Chấm đường đi thì bắt được.
- Cách chuyển: không cần mã. Yêu cầu agent con ghi vào phiếu giao một ô **"Đã đọc"**: danh sách tệp đã mở trong `nganh/` và thư viện bằng chứng. Tầng quy tắc (A1) kiểm ô đó có ít nhất một tệp ngành. Muốn chắc hơn thì đối chiếu với nhật ký công cụ của phiên.
- Chi phí: rất thấp.
- Mức tin: đọc tài liệu. Tác giả tự nói lớp này chưa chạy trên tập đề thật.

**A6. Bánh cóc (ratchet): sửa gói chỉ giữ khi điểm không giảm**
- Làm gì: mỗi vòng chỉ sửa **một** tệp kỹ năng, chấm lại trên bộ đề cố định, điểm cao hơn thì giữ, không thì hoàn lại. Giám khảo là agent con độc lập để tránh "tự sửa tự chấm". Người duyệt diff giữa các vòng.
- Tệp: Hello-Agents `Extra-Chapter/Extra10-Agent自进化.md` mục "3. Darwin Skill" (dòng 87–122) và mục "评估器比生成器更重要" (dòng 281–285). Repo gốc Darwin Skill (`alchaincyf/darwin-skill`) nhóm 4 **chưa đọc**.
- Giải lỗi: 4 và 5. Việc Đúc kết hiện ghi bài học vào gói mà không ai đo gói có tốt lên không.
- Cách chuyển: thêm một bước vào `tp-duc-ket.md`: sau khi sửa gói vai X, chạy lại bộ thi của X. Điểm giảm thì hoàn lại bản sửa và ghi vào sổ kinh nghiệm "bài học này chưa vào gói được". Không cần git revert tự động: chủ shop/Trưởng phòng quyết.
- Chi phí: một vòng thi mỗi lần sửa gói. Chỉ áp cho vai đã có bộ thi.
- Mức tin: đọc tài liệu (chương phụ tóm tắt repo khác).

**Ví dụ rubric viết lại được (khuôn 0–2 mỗi tiêu chí, mô tả từng mức như bộ thi hiện tại)**

Rubric có mô tả từng mức là cải tiến so với nguồn: cả Hello-Agents (`EVALUATION_PROMPT`, thang 1–5 chỉ có tên tiêu chí) lẫn MARTI (`marti/agent_workflows/judge_workflow.py` dòng 155, "Score: 8/10" không mốc) đều không neo mức. Thang không neo thì hai giám khảo cho hai điểm khác nhau. Giữ khuôn 0–2 có mô tả mà bộ thi `bk-kich-ban-qc.thi` đang dùng.

*Rubric R1 · Phán đoán khi thiếu dữ liệu (dùng chung mọi vai, cho câu loại A3)*

| Tiêu chí | 0 | 1 | 2 |
|---|---|---|---|
| a. Chọn phía | "Em không biết" / liệt kê mọi khả năng ngang nhau | Nghiêng nhưng rào đến mức không dùng được | Nói rõ "nghiêng về X" |
| b. Mức tự tin | Không có | Chữ ("khá chắc") | Con số hoặc khoảng (~70 %) **và** nói điều gì sẽ làm đổi ý |
| c. Lý do | Không có / chung chung ("thường thì") | Lý do hợp lý nhưng không trỏ nguồn | Trỏ tệp, số liệu, video mẫu cụ thể (gói ngành, GSC, bằng chứng) |
| d. Cách kiểm | Không có / "cần thêm dữ liệu" | Có phép kiểm nhưng mơ hồ, không chi phí | Phép kiểm cụ thể, rẻ, có ngưỡng và hạn (vd "đăng 2 bản hook, sau 48 h bản nào giữ người xem 3 s hơn 10 % thì chốt") |
| e. Tách sự thật và phán đoán | Trộn, hoặc bịa số làm như sự thật | Có tách nhưng không nhất quán | Sự thật có nguồn, phán đoán gắn nhãn rõ |

*Rubric R2 · Hiểu biết ngành (đề riêng mỗi vai, đáp án chuẩn do chủ shop viết)*

| Tiêu chí | 0 | 1 | 2 |
|---|---|---|---|
| a. Ngôn ngữ dân câu | Từ ngữ người ngoài ("cá đẹp", "câu vui") | Đúng từ nhưng ít | Dùng đúng thuật ngữ ngách (phao, nhạy, đài, mồi) như trong `giọng viết người đi câu` |
| b. Đối thủ / thị trường | Không nhắc | Nhắc chung "shop khác" | Nêu tên/kênh/giá cụ thể có nguồn hoặc nói rõ đã ước |
| c. Khách là ai | "Mọi người thích câu cá" | Một chân dung | Phân biệt được nhóm (câu đài, câu lăng xê, câu đêm) và nhóm nào mua món này |
| d. Bám sản phẩm thật | Nói đặc tính không có trên trang | Đúng nhưng chung | Đặc tính khác biệt cụ thể so với hàng cùng loại |
| e. So với đáp án chủ shop | Thua rõ | Hoà | Thắng hoặc thêm ý chủ shop chưa nghĩ tới (win rate theo A2) |

Mục tiêu đo: R1 ≥ 8/10 trên câu thiếu dữ liệu, R2 win rate với chủ shop ≥ 40 %. Hai mốc này là **đề xuất của nhóm 4**, chưa có cơ sở số, cần chủ shop chốt.

### B. Context engineering: nạp đúng phần tri thức (lỗi 2)

**B1. Nạp sẵn ít, tra khi cần (just-in-time) qua tham chiếu nhẹ**
- Làm gì: không nhồi cả kho vào ngữ cảnh. Nạp trước một phần nhỏ giá trị cao (quy ước, mục lục). Phần còn lại để agent tự mở bằng đường dẫn khi cần. Tên tệp, thư mục, ngày tháng tự nó là tín hiệu ("tiết lộ dần").
- Tệp: Hello-Agents `docs/chapter9/Chapter9-Context-Engineering.md` mục 9.2.2 (dòng 80–92). Chương này viết lại gần như nguyên ý bài "Effective context engineering" của Anthropic.
- Giải lỗi: 2.
- Cách chuyển: gói ngành `nganh/do-cau-vn/` có một tệp `MUC-LUC.md` ≤ 1 trang được **nạp bắt buộc** cho mọi agent con làm việc ngành đó. Mỗi dòng: đường dẫn · một câu tóm tắt · "đọc khi nào" · ngày cập nhật. Ví dụ: `hoi-dap/gia-thi-truong.md · giá phao điện trên Shopee/TikTok Shop theo tầm · đọc khi đề cập giá, đối thủ · 11/11/2026`. Hồ sơ shop 1.175 dòng và 104 bài blog **không nạp**, chỉ được trỏ tới.
- Chi phí: viết mục lục một lần, cập nhật khi thêm tệp.
- Mức tin: đọc tài liệu.

**B2. Ba tầng nạp (mô tả → thân → tài nguyên)**
- Làm gì: tầng 1 luôn có (~100 từ: tên + mô tả khi nào dùng). Tầng 2 nạp khi kích hoạt (< 500 dòng). Tầng 3 mở khi cần, script thì chạy chứ không đọc.
- Tệp: Hello-Agents `Extra-Chapter/Extra08-如何写出好的Skill.md` mục 5.1 (dòng 275–293).
- Giải lỗi: 2.
- Cách chuyển: gói vai hiện ~400–500 dòng là tầng 2, đã sát trần. Phần ngành không được nhét thêm vào gói vai. Gói vai chỉ chứa **một dòng trỏ** tới `MUC-LUC.md` của ngành đang làm. Phiếu giao của Trưởng phòng ghi rõ ngành nào.
- Chi phí: thấp. Có thể phải cắt bớt gói vai khi tách phần Giáng sinh ra thành gói ngành riêng.
- Mức tin: đọc tài liệu.

**B3. Bố cục "bánh mì kẹp" theo chỗ mô hình chú ý nhất**
- Làm gì: đầu ngữ cảnh: vai + trạng thái việc + ghi chú. Giữa: tư liệu tra được, lịch sử, kết quả công cụ. Cuối: yêu cầu hiện tại. Lý do: thông tin ở giữa dễ bị bỏ sót.
- Tệp: `agent_learning/src/zh/chapter_context_engineering/04_practice_context_builder.md` mục "阶段 4：Construct" (dòng 266–320). Hello-Agents dùng khuôn tương tự `[Role & Policies] [Task] [Evidence] [Output]`: `docs/chapter9/...md` dòng 129–137, 466–482.
- Giải lỗi: 2.
- Cách chuyển: sửa `_phieu-giao.md` theo thứ tự: Vai + luật cứng → Đã biết (tóm tắt bước trước) → Tư liệu (đường dẫn, không dán nội dung dài) → **Việc cần làm + khuôn nộp ở cuối cùng**.
- Chi phí: gần như không.
- Mức tin: đã đọc mã minh hoạ.

**B4. Agent con trả về bản cô đặc; nén ưu tiên "không sót" trước "gọn"**
- Làm gì: agent con khám phá trong ngữ cảnh sạch, chỉ trả về tóm tắt 1.000–2.000 token. Khi nén ngữ cảnh: tối ưu độ phủ trước, độ gọn sau.
- Tệp: Hello-Agents `docs/chapter9/...md` mục 9.2.3 (dòng 94–119).
- Giải lỗi: 2.
- Cách chuyển: đặt trần độ dài cho ô "Kết quả" của phiếu giao. Ô "Đã đọc" (A5) giữ đường dẫn để bước sau tự mở khi cần, khỏi chép lại.
- Chi phí: không.
- Mức tin: đọc tài liệu.

**B5. Siêu dữ liệu cho từng tài liệu + "thử trúng" (hit test) cho kho**
- Làm gì: wanwu cho mỗi tài liệu các khoá siêu dữ liệu có kiểu (chuỗi/số/ngày) để lọc khi tra. Có màn "命中测试": gõ câu hỏi, xem đoạn nào trúng. Có **kho hỏi đáp riêng** (问答库) tách khỏi kho tài liệu.
- Tệp: `wanwu/configs/microservice/bff-service/static/manual/2.资源库/知识库/创建知识库、问答库/元数据.md`, `.../命中测试/创建命中测试.md`, `.../创建知识库、问答库/创建问答库.md`, `.../命中测试/元数据过滤.md`.
- Giải lỗi: 2 (và giúp lỗi 1 có chỗ chứa).
- Cách chuyển, chỉ lấy ý:
  - Đầu mỗi tệp trong `nganh/` và thư viện bằng chứng có khối khai báo 4 khoá: `nguon` · `ngay` · `loai` (su-that / phan-doan / mau-video / doi-thu) · `do-tin` (da-kiem / chua-kiem). Agent lọc bằng `grep` theo khoá.
  - Kho hỏi đáp: `nganh/do-cau-vn/hoi-dap/*.md`, mỗi mục là một câu hỏi thật của khách hoặc của chủ shop + câu trả lời chuẩn. Kho này **trùng nguồn với bộ đề A2**: một câu hỏi vừa dạy agent vừa dùng để thi. Phải tách: câu nào đã vào kho thì chỉ dùng làm đề hồi quy.
  - Thử trúng: kèm mỗi gói ngành 10 câu hỏi + tệp phải mở để trả lời. Mỗi lần sắp xếp lại gói, cho agent con đọc mục lục rồi trả lời "mở tệp nào". Sai thì sửa mục lục, không sửa nội dung.
- Chi phí: thấp, toàn Markdown.
- Mức tin: chỉ đọc tài liệu hướng dẫn sử dụng. Không đọc mã Go.

### C. Phán đoán có mức tự tin thay vì dừng ở "không biết" (lỗi 3)

**C1. Phát hiện quan trọng: tài liệu chống ảo giác đẩy agent về phía lỗi 3**
- agent_learning `src/zh/chapter_21_security/02_hallucination.md` dòng 243–290 dạy gắn 4 mức tin 🟢🟡🔴⚪, trong đó ⚪ = "直接说我不知道" (nói thẳng không biết). Mục `appendix/prompt_templates.md` dòng 65: "不确定的信息请说明，不要编造".
- Đây đúng là hành vi chủ shop chê. Gói vai của mình có thể đang mang luật kiểu này (trung thực, không bịa) mà không có luật đối trọng.
- Giải lỗi: 3.
- Cách chuyển: tách hai loại phát biểu, luật khác nhau:
  - **Sự thật** (giá, số liệu, tên đối thủ): phải có nguồn, không có thì ghi "chưa kiểm". Giữ nguyên luật chống bịa.
  - **Phán đoán** (cái gì sẽ chạy, khách thích gì, nên làm gì): **cấm** trả lời "không biết" trống. Bắt buộc 4 ô: nghiêng về · ~% · vì · kiểm bằng. Đây chính là rubric R1.
- Mức tin: đọc tài liệu. Phần tách hai loại là đề xuất của nhóm 4.

**C2. Khuôn phát biểu có cấu trúc (FactClaim) + chuỗi kiểm chứng (CoVe)**
- Làm gì: mỗi phát biểu kèm `confidence` và `source` (null nếu không có). CoVe: sau khi trả lời, tự sinh câu hỏi kiểm, trả lời độc lập từng câu, rồi sửa bài.
- Tệp: `agent_learning/src/zh/chapter_21_security/02_hallucination.md` dòng 360–420 (`FactClaim`, `StructuredAnswer`), "策略 7" CoVe.
- Giải lỗi: 3.
- Cách chuyển: thêm vào `_phieu-giao.md` ô "Phán đoán" dạng bảng: `Nhận định · Nghiêng về · ~% · Vì (nguồn) · Kiểm bằng · Ai/khi nào kiểm`. Câu hỏi kiểm kiểu CoVe chính là cột "Kiểm bằng", nhưng thay vì để LLM tự trả lời (vẫn là đoán), biến nó thành **việc thật** cho vai khác hoặc cho vòng sau (tra Shopee, xem 10 video đứng đầu, đăng thử 2 bản).
- Chi phí: thấp.
- Mức tin: đọc tài liệu.

**C3. Vòng phản tỉnh có người soát riêng, thêm câu soát "có né phán đoán không"**
- Làm gì: Thực hiện → Soát → Sửa. Người soát là một lời nhắc/agent riêng, soát 4 mặt: sai sự thật, lỗ hổng lập luận, đường vòng, thiếu thông tin.
- Tệp: Hello-Agents `docs/chapter4/Chapter4-Building-Classic-Agent-Paradigms.md` mục 4.4.1 và 4.4.5 (chi phí). agent_learning `src/zh/chapter_planning/04_reflection.md`.
- Giải lỗi: 3.
- Cách chuyển: trước khi nộp phiếu, agent con tự chạy danh sách soát 5 câu: 4 câu trên + **"Có câu nào em trả lời 'không biết/cần thêm dữ liệu' mà chưa kèm nghiêng về, %, cách kiểm không?"** Không cần agent thứ hai cho mọi việc (tốn gấp đôi). Chỉ dùng agent soát riêng ở vòng thi.
- Chi phí: vài dòng trong mỗi tệp việc.
- Mức tin: đã đọc mã ví dụ (Hello-Agents 4.4.3).

**C4. Hiệu chỉnh mức tự tin bằng sổ đối chiếu (ý của nhóm 4, không có mã trong repo nào)**
- agent_learning nhắc "校准训练" (huấn luyện cho tự tin khớp tỉ lệ đúng) nhưng là huấn luyện mô hình, mình không làm được.
- Phần làm được: mỗi phán đoán có % trong phiếu giao được chép vào `chung/NHAT-KY-QUYET-DINH.md` (đã có, đúng tinh thần "bị chính số liệu của mình phản bác"). Mỗi quý gom theo nhóm: các câu nói ~70 % thì có ~70 % đúng không. Lệch thì ghi vào gói vai: "vai X hay tự tin quá ở loại câu Y".
- Giải lỗi: 3 và 4.
- Chi phí: thấp, nhưng cần ≥ 20 phán đoán đã kiểm mới đọc được gì.

### D. Trí nhớ: phân loại và ánh xạ sang 4 lớp của mình

Nguồn phân loại: Hello-Agents `docs/chapter8/Chapter8-Memory-and-Retrieval.md` mục 8.1.1 (giác quan / làm việc / dài hạn chia thủ tục, ngữ nghĩa, sự kiện) và 8.2.5 (bốn loại trong mã: làm việc, sự kiện, ngữ nghĩa, tri giác). agent_learning `src/zh/chapter_hermes/05_memory.md` (Hermes giữ trí nhớ dài hạn bằng **Markdown thuần**: `MEMORY.md`, `USER.md`, `skills/`, mỗi dòng kinh nghiệm có ngày).

| Lớp của mình | Loại trí nhớ | Lý do | Mẹo lấy từ nguồn |
|---|---|---|---|
| Gói nghề theo vai `chuyen-vien/<vai>.md` + `viec/*.md` | **Thủ tục** (biết làm thế nào) | Cách làm, khuôn, luật. Không phụ thuộc ngành | Hermes coi `skills/` là "能力记忆". Giữ < 500 dòng (B2) |
| Gói ngành `nganh/do-cau-vn/` | **Ngữ nghĩa** (biết cái gì) | Sự thật ổn định về thị trường, khách, đối thủ, thuật ngữ | Mỗi mục có ngày + nguồn (Hermes 3.2 ý 3). Có mục lục (B1) và kho hỏi đáp (B5) |
| Thư viện bằng chứng (video mẫu đã bóc, quảng cáo đối thủ) | **Sự kiện của người khác** + **tri giác** (ảnh, video) | Ca cụ thể có thời điểm, dùng để so, không phải luật | Hello-Agents tách kho riêng theo kiểu phương tiện (8.2.5 (4)). Mình: một tệp `.md` mô tả mỗi ca, trỏ tới tệp video, khoá siêu dữ liệu B5 |
| Sổ kinh nghiệm | **Sự kiện của chính mình** | "Video X đăng ngày Y, hook Z, kết quả W" | Có thao tác `consolidate` và `forget` (Hello-Agents 8.2.3): định kỳ gộp nhiều sự kiện thành một bài học ngữ nghĩa, xoá thứ hết hạn |
| Phiếu giao + nhật ký điều phối trong một luồng | **Làm việc** (ngắn hạn) | Chỉ sống trong một lần chạy | Hết luồng thì hoặc rút vào sổ, hoặc bỏ |

Đường thăng hạng (lấy từ Extra10 dòng 287–295 "能先在记忆层解决，就不要急着改技能"):
sổ kinh nghiệm → (lặp lại ≥ 2 lần) → gói ngành hoặc gói vai → (qua bộ thi, A6) → giữ.
Ngưỡng "lặp ≥ 2" lấy từ `should_extract` ở `agent_learning/src/zh/chapter_hermes/04_self_evolving_skills.md` dòng 36–100.
**Không lấy** luật "失败的任务不提炼" (việc thất bại không rút bài) của cùng tệp: với mình, ca thất bại là bài học giá trị nhất, đúng như `CLAUDE.md` gốc nói về mục sai trong nhật ký. Ca thất bại vào sổ dưới dạng **bẫy**, chỉ không được thăng thành **quy trình** khi chưa kiểm.

## Không nên lấy

- **MARTI, toàn bộ mã.** Huấn luyện RL đa agent, yêu cầu tối thiểu ~8 GPU 80 GB, nhiều cấu hình là 8 GPU **mỗi agent** (`README.md` dòng 121, 135); thí nghiệm dùng 3 nút × 8 H200 (dòng 205). Mình không huấn luyện mô hình, chỉ viết Markdown cho Claude. Ý duy nhất gần dùng được là luồng "người sinh + người chấm" (`marti/agent_workflows/judge_workflow.py`), nhưng mẫu chấm mặc định là "Score: x/10" không neo mức (dòng 155), yếu hơn bộ thi đang có. Không lấy gì.
- **wanwu, nền tảng.** Go + nhiều dịch vụ docker-compose, vector DB, GraphRAG, đa tenant, phân quyền kho (`知识库权限.md`). Đòi máy chủ riêng, trái ràng buộc. Bảng điểm MultiHopRAG là tự công bố, có tính quảng cáo ("比Dify高 17.2%"). Chỉ lấy ý ở B5 và A3.
- **Benchmark công khai trong Hello-Agents ch.12** (BFCL gọi hàm, GAIA trợ lý tổng quát, sinh đề toán AIME). Đo năng lực chung của mô hình, không đo hiểu biết ngành đồ câu VN. Chỉ lấy phương pháp (A1, A2).
- **Hạ tầng trí nhớ Hello-Agents ch.8** (Qdrant, Neo4j, SQLite, điểm phân rã theo thời gian bằng công thức). Đòi DB. Ý "kèm ngày, biết hết hạn" làm bằng một dòng ngày trong Markdown là đủ.
- **`reference-agent` của agent_learning làm bộ chấm.** `eval_samples.jsonl` có 3 đề toán, chấm bằng "chuỗi có chứa '96'". Đồ chơi, tác giả tự nhận là "弱判定". Chỉ lấy khuôn "một dòng một đề + tỉ lệ đạt".
- **Lớp `AgentAsJudge`, `RegressionTestSuite`, `ABTest` của agent_learning.** Tác giả ghi là giàn giáo chưa chạy thật. Chỉ lấy danh mục tiêu chí.
- **Tự viết lại kỹ năng tự động (Hermes `offline_improve`, ngưỡng giữ > 90 %, bỏ < 50 %).** Cần hàng chục lượt dùng mỗi kỹ năng mới tính được tỉ lệ. Mình làm vài video mỗi tuần. Giữ người duyệt (A6).
- **Thang 1–10 hoặc 1–5 không mô tả mức** (Hello-Agents `EVALUATION_PROMPT`, agent_learning `LLMJudge`). Giám khảo LLM có thiên lệch vị trí và thiên lệch bài dài (agent_learning `01_evaluation_methods.md` dòng 296). Thang không neo làm thiên lệch nặng hơn.

## Đề xuất cho kiến trúc của mình (xếp ưu tiên)

1. **Luật tách "sự thật / phán đoán" vào mọi gói vai + ô "Phán đoán" 4 cột trong `_phieu-giao.md`** (C1, C2). Rẻ nhất, đánh thẳng vào lỗi 3. Làm trước khi viết gói ngành.
2. **Bộ đề phỏng vấn mỗi vai: 6–8 câu, ≥ 30 % câu cố ý thiếu dữ liệu, chủ shop viết đáp án chuẩn trước** (A2, A3). Chấm bằng R1 + R2, so cặp mù với đáp án chủ shop. Chấm điểm gốc **trước** khi viết gói ngành, để có số trước/sau. Bắt đầu với Săn xu hướng và Chuyên viên SP (hai vai bị chê nặng nhất).
3. **Gói ngành dạng mục lục + tra khi cần** (B1, B2, B5): `MUC-LUC.md` ≤ 1 trang nạp bắt buộc, mọi tệp có 4 khoá siêu dữ liệu, kho `hoi-dap/`, 10 câu thử trúng. Hồ sơ shop và blog chỉ được trỏ tới.
4. **Ô "Đã đọc" trong phiếu giao + tầng chấm quy tắc** (A1, A5). Bắt được lỗi 2 mà không cần đọc bài.
5. **Bánh cóc cho việc Đúc kết** (A6): sửa gói xong phải qua bộ thi của vai đó. Điểm giảm thì hoàn lại.
6. **Chạy mỗi đề 2 lần, ghi độ lệch** (A4) để biết chênh lệch nào là thật. Ghi rõ trên bảng điểm: mẫu nhỏ, chỉ là hướng.
7. **Sổ hiệu chỉnh % trong `NHAT-KY-QUYET-DINH.md`** (C4). Làm sau cùng, khi đã có ≥ 20 phán đoán có %.

## Câu hỏi còn mở

- Chủ shop có thời gian viết đáp án chuẩn cho ~15 câu (2 vai × 6–8) không? Không có đáp án chuẩn thì A2 không chạy được, chỉ còn chấm tuyệt đối.
- Giám khảo là Claude, thí sinh cũng là Claude. Thiên lệch "cùng họ mô hình" có làm điểm cao giả không? Không repo nào trong nhóm 4 đo điều này. Cách rẻ để kiểm: cho chủ shop chấm mù lại 3 cặp, so với điểm của giám khảo agent.
- Câu hỏi đã vào kho `hoi-dap/` thì thành đề lộ. Ai giữ danh sách đề kín, để ở đâu cho agent con không đọc được (ngoài `manager-ai`? thư mục riêng không có trong mục lục?).
- Mốc "R1 ≥ 8/10, win rate ≥ 40 %" là đề xuất chưa có cơ sở. Cần chủ shop chốt "chuyên gia" nghĩa là ngang mình hay hơn mình.
- Repo Darwin Skill (`alchaincyf/darwin-skill`) có rubric 8 chiều 100 điểm cho tệp kỹ năng. Nhóm 4 chỉ đọc bản tóm tắt trong Hello-Agents. Có đáng đọc mã gốc ở vòng sau không.
