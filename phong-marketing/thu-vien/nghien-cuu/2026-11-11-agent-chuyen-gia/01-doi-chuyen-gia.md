# Nhóm 1 · Tổ chức đội chuyên gia và điều phối · 11/11/2026

Mã tải về (tarball HEAD, không dùng git, không chạy mã):
`/tmp/claude-1000/-home-tuyennvdev-my-project-manager-ai/b3979266-831c-470e-a888-71cc908aa8b0/scratchpad/repo-nc/nhom1/<repo>/<repo>-HEAD/`.
Đường dẫn tệp bên dưới tính từ gốc repo. Sao và ngày lấy từ API GitHub ngày 11/11/2026.

## Xác minh repo

| Tên gợi ý | URL thật | Sao | Đẩy mã cuối | Giấy phép | Có thật? |
|---|---|---|---|---|---|
| geekan/MetaGPT | https://github.com/FoundationAgents/MetaGPT (geekan chuyển hướng sang đây) | 71.239 | 21/01/2026 | MIT | Có. Sai chủ. Gần 10 tháng không đẩy mã |
| camel-ai/camel | https://github.com/camel-ai/camel | 18.024 | 09/11/2026 | Apache-2.0 | Có, đúng tên |
| modelscope/agentscope | https://github.com/agentscope-ai/agentscope (modelscope chuyển hướng sang đây) | 35.762 | 11/11/2026 | Apache-2.0 | Có. Bản HEAD là **2.0.12dev**: `MsgHub` của bản 1.x **không còn** trong mã |
| Tencent youtu-agent | https://github.com/TencentCloudADP/youtu-agent | 4.634 | 09/11/2026 | MIT (tệp `LICENSE`; API báo NOASSERTION vì có lời đầu của Tencent) | Có, đúng tên |

## (a) Một "chuyên gia" gồm những gì, kiến thức ngành nằm ở đâu

| Repo | Thành phần một vai | Kiến thức ngành nằm ở |
|---|---|---|
| MetaGPT | `profile`, `goal`, `constraints`, `desc` ghép bằng `PREFIX_TEMPLATE = "You are a {profile}, named {name}, your goal is {goal}."` (`metagpt/roles/role.py` dòng 51–52, 131–134) · `actions` (việc làm được) · `_watch` (loại tin mình nhận) · `instruction` + `_retrieve_experience()` trả về ví dụ mẫu (`metagpt/roles/architect.py`, `metagpt/prompts/di/architect.py` `ARCHITECT_EXAMPLE`) | Rải trong **chỉ dẫn của từng ô đầu ra** (`ActionNode.instruction` + `example`, vd `metagpt/actions/write_prd_an.py`: "nếu không nói ngôn ngữ thì dùng Vite, React, MUI") và trong ví dụ mẫu. Không có tầng ngành tách riêng |
| CAMEL | Chỉ là tên vai + câu luật trong system prompt (`camel/prompts/ai_society.py` `ASSISTANT_PROMPT`: "Never forget you are a {assistant_role}… Never flip roles!") | Không có chỗ nào. Ngành hoàn toàn nằm trong trọng số mô hình |
| AgentScope 2.x | `name`, `system_prompt`, `model`, `toolkit` (công cụ + MCP + **skill**), cấu hình ngữ cảnh (`src/agentscope/agent/_agent.py` dòng ~127, `agent/_config.py`) | **Skill dạng thư mục `SKILL.md`** có frontmatter `name`/`description` (`src/agentscope/skill/_local_loader.py`). Prompt chỉ liệt kê tên + mô tả + thư mục, agent phải tự gọi công cụ đọc mới thấy nội dung (`src/agentscope/tool/_toolkit.py` `DEFAULT_SKILL_INSTRUCTION`) |
| Youtu-Agent | YAML: `agent.name`, `agent.instructions`, `model`, `toolkits` (`configs/agents/practice/math_agent.yaml`). Vai trong đội có thêm `desc`, `strengths`, `weaknesses` (`configs/agents/orchestra/base.yaml`) | Trong `instructions` và **khối kinh nghiệm học được nối vào cuối instructions** (xem (c)). Có hỗ trợ skill `.agent/skills/<tên>/SKILL.md` (`docs/howto/skills.md`) |

Kết luận (a): **không repo nào có "gói ngành" dùng chung giữa các vai.** Ba repo có khái niệm gần nhất là skill nạp theo nhu cầu
(AgentScope, Youtu) và ví dụ mẫu theo vai (MetaGPT). Hướng 4 lớp đang bàn (nghề · ngành · bằng chứng · kinh nghiệm) **đi xa hơn** cả bốn repo ở điểm này.
Ý đáng lấy là **cách nạp**: mục lục ngắn luôn có trong prompt, nội dung chỉ đọc khi cần.

## Cơ chế đáng lấy

### 1. Kinh nghiệm học từ so sánh nhóm lần chạy (Youtu-Agent, Training-Free GRPO)
- **Làm gì:** cùng một đề chạy N lần (`grpo_n: 5`), chấm từng lần (0–1). Chỉ học từ đề **có lần đúng lần sai** (điểm TB nằm giữa 0 và 1;
  đề toàn đúng hay toàn sai bị bỏ). Bốn bước LLM: tóm tắt từng lần chạy → so lần tốt với lần xấu, rút **tối đa k kinh nghiệm** →
  so với kho hiện có, ra lệnh `ADD | UPDATE | DELETE | NONE` dạng JSON → gộp các lệnh cả lô (DELETE thắng UPDATE, gộp ADD trùng).
  Kho kinh nghiệm được **nối nguyên văn vào cuối `instructions`** của agent, mỗi dòng `[G7]. Tên ngắn: một câu`.
- **Tệp:** `utu/practice/experience_updater.py` (4 bước, lọc "chỉ nhóm đúng một phần" ở dòng ~80) · `utu/prompts/practice/experience.yaml`
  (4 cặp prompt, khuôn "When [điều kiện], [chiến lược]") · `utu/practice/training_free_grpo.py` `_create_agent_config_with_experiences` ·
  kết quả thật: `configs/agents/practice/math_practice_agent.yaml` (27 kinh nghiệm G0–G26).
- **Giải lỗi:** 4 (học từ kết quả), một phần 5.
- **Chuyển sang mình:** không chạy mã (cần DB, 128 lượt song song, đáp án đúng). Lấy **ba luật** đưa vào `tp-duc-ket`:
  (1) chỉ rút bài học từ cặp **thắng/thua cùng đề** (video A vs B cùng sản phẩm, bài thi có gói vs không gói), không rút từ một video lẻ;
  (2) mỗi bài học ghi dạng "Khi <điều kiện>, <làm gì>", một câu, có mã `[K12]`;
  (3) mỗi lần đúc kết phải xét từng bài học mới là ADD / UPDATE / DELETE / NONE so với Sổ lỗi hiện có. `tp-duc-ket` luật 4 đã gần giống (không thêm dòng trùng); thêm DELETE là phần thiếu.
  Chi phí: chỉ sửa một tệp việc. Bài học lấy từ video đăng thật cần số đo sau đăng, việc đó nhóm khác lo.
- **Cảnh báo:** kho kinh nghiệm của họ chỉ **lớn dần** (27 dòng sau 1 lượt), không có trần. Mình đã có luật "tệp việc tối đa 5 luật", giữ luật đó.
- **Mức tin:** đã đọc mã và prompt.

### 2. Bàn giao chỉ qua một bản viết cho người chưa thấy gì (AgentScope 2.x SOP)
- **Làm gì:** mỗi bước SOP có `executor` và `verifier`. Bước sau **chỉ nhận bản bàn giao** của bước trước, không thấy tệp, công cụ, hội thoại.
  Ô bàn giao ép bằng schema: *"They cannot see your files, your tools' output or this conversation, only this. Write it for someone who has seen none of your work."*
  Người kiểm trả `passed` + `message`, và `message` **được chuyển nguyên văn** cho lần làm lại, nên phải "name the specific claims, files or values at fault".
  Tối đa `max_attempts=3`, lần làm lại được nhắc "attempt 2 of 3".
- **Tệp:** `src/agentscope/sop/_schema.py` (`_Handover`, `_Verdict`, `SOPStep._brief`, `_question`) · `src/agentscope/sop/_engine.py` `_handover` ("Nothing else crosses") · `src/agentscope/sop/_state.py` `VerificationResult`.
- **So với phiếu giao của mình** (`phong-marketing/quy-che/khuon/phieu-giao.md`): phiếu của mình **giàu hơn** (đã kiểm có nguồn / suy ra ⚠ / còn thiếu ⬜ / cần sếp).
  Khác biệt đáng lấy là hai câu luật, không phải khuôn:
  (1) bước sau **không được** mở lại bài của bước trước trừ tệp ở dòng `giao`; mình đang để ngỏ;
  (2) khi Trưởng phòng trả việc, lời trả phải chỉ đúng **dòng / giá trị sai** và được dán nguyên văn vào lần giao lại, kèm "lần 2/3". Kiểm duyệt độc lập đang tạm bỏ, nhưng Trưởng phòng vẫn mở tệp kiểm (`tp-dieu-phoi`), nên áp được ngay.
- **Giải lỗi:** gián tiếp lỗi 1–2 (giảm ngữ cảnh rác để còn chỗ cho gói ngành).
- **Chi phí:** sửa `_phieu-giao.md` và `tp-dieu-phoi.md`, thêm 2 luật.
- **Mức tin:** đã đọc mã.

### 3. Tin nhắn mang ĐƯỜNG DẪN, không mang nội dung (MetaGPT)
- **Làm gì:** vai đăng tin vào môi trường chung, vai khác nhận theo **loại việc sinh ra tin** (`cause_by in self.rc.watch`) hoặc theo tên người nhận.
  Bản PRD đi kèm tin là **danh sách tệp đã đổi** (`changed_files`, `prd_filenames`, `project_path`) chứ không phải nội dung; vai sau tự mở tệp.
- **Tệp:** `metagpt/roles/role.py` `_observe` (dòng ~399–420) · `metagpt/environment/base_env.py` `publish_message` · `metagpt/actions/write_prd.py` dòng 137–187.
- **So với mình:** phiếu giao đã có `nhan:` / `giao:` là đường dẫn. Mình đã làm đúng ý này. Cơ chế "đăng ký theo loại tin" thì **không cần**: luồng của mình tuyến tính, Trưởng phòng gọi trực tiếp.
- **Mức tin:** đã đọc mã.

### 4. Ô đầu ra bắt buộc có "điều chưa rõ" (MetaGPT ActionNode)
- **Làm gì:** mỗi đầu ra là cây ô có `key`, `expected_type`, `instruction`, `example`. PRD bắt buộc có ô `Anything UNCLEAR` và ô phân tích đối thủ.
- **Tệp:** `metagpt/actions/write_prd_an.py` (`ANYTHING_UNCLEAR`, `NODES`), `metagpt/actions/action_node.py` (có `auto_review` / `human_review` rồi `revise`).
- **Giải lỗi:** 3 (thiếu chính kiến). Ý chuyển: đổi ô "Suy ra ⚠" trong phiếu giao thành ô bắt buộc có khuôn
  **"Nghiêng về X · ~70 % · vì Y · kiểm bằng Z"**. Ép bằng khuôn ô (như ActionNode), đừng dặn bằng lời; bài thi 11/11 đã cho thấy luật nằm ngoài ô bắt buộc thì không chặn được lỗi (`tp-duc-ket` luật 4).
- **Chi phí:** sửa một khuôn. **Mức tin:** đã đọc mã (khuôn ô); ý "xác suất + cách kiểm" là của nhóm này đề xuất, MetaGPT không có.

### 5. Kho quy trình theo vai, chọn tối đa 3 theo mục lục (CAMEL Workforce)
- **Làm gì:** sau mỗi việc, worker tự tóm tắt thành một tệp Markdown theo khuôn `WorkflowSummary`: `agent_title`, `task_title` (cấm tên riêng của ca), `task_description`, `tools`, `steps`,
  `failure_and_recovery_strategies` (triệu chứng · nguyên nhân · cách sửa · cách xác minh), `notes_and_observations`, `tags` (3–10).
  Lưu ở `workforce_workflows/<vai>/*.md`. Lần sau agent đọc **mục lục (tiêu đề, mô tả, nhãn)** rồi tự chọn **tối đa 3 tệp** (`default_max_files_to_load=3`) để nạp.
- **Tệp:** `camel/utils/context_utils.py` `WorkflowSummary` · `camel/societies/workforce/workflow_memory_manager.py` (`load_workflows`, `_select_relevant_workflows` dòng ~1178) · `camel/societies/workforce/utils.py` `WorkflowConfig`.
- **Giải lỗi:** 2 (đọc được kho mà không ngợp ngữ cảnh) và 4.
- **Chuyển sang mình:** đây là mẫu tốt nhất cho **thư viện bằng chứng** và **gói ngành**: mỗi thư mục có `MUC-LUC.md` (một dòng/tệp: tiêu đề · mô tả · nhãn), tệp việc ghi
  "đọc mục lục `nganh/do-cau-vn/`, chọn ≤ 3 tệp hợp việc, ghi tên đã chọn vào ô `nhan:` của phiếu". Trưởng phòng kiểm ô `nhan:` để biết agent có đọc ngành thật không.
  Chi phí: viết mục lục, giữ cập nhật (bẫy "bản đồ quên cập nhật" của `CLAUDE.md` §5, nên dò bằng `ls` khi đúc kết).
- **Mức tin:** đã đọc mã.

### 6. Bộ chấm và tác nhân tự kiểm (Youtu-Agent eval + workforce)
- **Bộ đánh giá trông ra sao:** dữ liệu là JSONL, mỗi dòng `{dataset, source, question, answer}` (`docs/practice.md`), nạp vào **SQLite** qua `scripts/data/upload_dataset.py`.
  Mỗi mẫu là một dòng bảng `EvaluationSample` (`utu/db/eval_datapoint.py`): câu hỏi, đáp án đúng, câu trả lời, quỹ đạo, `correct`, `reward` 0–1, `confidence`, `stage` (init → rollout → judged).
  Chấm bằng **hàm `verify_func(sample) -> {reward, reasoning}`** (`utu/practice/verify/math.py` so biểu thức; `webwalker.py` hỏi LLM "CORRECT/INCORRECT")
  hoặc mẫu prompt giám khảo (`utu/prompts/eval/judge_templates.yaml`, chép từ BrowseComp: trích đáp án cuối · lý do · đúng/sai · độ tin).
  Cấu hình đề ở YAML (`configs/eval/data/gaia_val.yaml`: tên bộ, cột câu hỏi, cột đáp án).
- **Có dùng làm "bộ đề phỏng vấn có thang chấm" không:** **khuôn thì có, thang chấm thì không.** Giám khảo của họ là **nhị phân so với đáp án đúng**; không có rubric nhiều tiêu chí.
  Bài thi của mình (`phong-marketing/nhan-su/viec/bk-kich-ban-qc.thi/README.md`, 8 tiêu chí × 0–2, chấm mù, đề hồi quy + đề kín) **đã tốt hơn** phần chấm của Youtu.
  Thứ đáng lấy: (1) mỗi đề là **một bản ghi có trạng thái** (chưa chạy / đã chạy / đã chấm) và **mã lần thi** `exp_id`, chạy lại tiếp được; (2) giám khảo phải **trích câu trả lời cuối trước rồi mới chấm**, và ghi lý do theo từng tiêu chí; (3) chạy mỗi đề **nhiều lần** để thấy độ dao động, vì cơ chế 1 cần đề "lúc đúng lúc sai".
  Thang chấm cho phỏng vấn chuyên gia nên lấy từ bài thi của mình, không từ đây.
- **Tự kiểm của worker:** `TASK_CHECK_PROMPT` (5 câu tự hỏi rồi `<task_check>yes|no`) và `TASK_REFLECTION_PROMPT` cho lần làm lại (`utu/prompts/agents/workforce/executor.yaml`); planner chấm `success | partial success | failed` (`utu/prompts/agents/workforce/planner.yaml`). CAMEL có bản tương tự cho điểm 0–100 (`camel/societies/workforce/prompts.py` `QUALITY_EVALUATION_RESPONSE_FORMAT`).
- **Giải lỗi:** 5. **Mức tin:** đã đọc mã và prompt.

### 7. Giao việc phải tự đủ (Youtu-Agent assigner)
- `utu/prompts/agents/workforce/assigner.yaml`: *"The assigned agent will NOT have access to information from other agents… detailed_task_description must be completely self-contained"*.
  Kèm hồ sơ năng lực mỗi worker: `desc`, `strengths`, **`weaknesses`** (`configs/agents/orchestra/base.yaml`).
- **Chuyển:** thêm dòng "Yếu / không làm được" vào đầu mỗi gói vai, để Trưởng phòng không giao sai (vd Săn xu hướng không có dữ liệu quảng cáo đối thủ thì phải nói thế). Giải một phần lỗi 3. **Mức tin:** đã đọc prompt và YAML.

## Không nên lấy (và vì sao)
- **Mã của cả bốn framework.** Đều là Python chạy vòng agent riêng, gọi API mô hình riêng. Mình chạy trong Claude Code với Agent tool; không có chỗ cắm.
- **Training-Free GRPO chạy thật** (Youtu): cần DB, đáp án đúng, 50 đề × 5 lần × song song 128. Video của mình không có "đáp án đúng" và mỗi lần chạy tốn hạn mức Muse. Chỉ lấy ý (cơ chế 1).
- **Meta-agent tự sinh agent** (Youtu `utu/meta/simple_agent_generator.py`, CAMEL `CREATE_NODE_PROMPT`): chỉ hỏi người dùng mục tiêu, đầu ra, rồi chọn công cụ. Sinh ra system prompt một đoạn, **không có kiến thức ngành**. Đúng kiểu "newbie" mà chủ shop chê. README quảng cáo "81 % tổng hợp công cụ thành công" nhưng đó là sinh mã công cụ, không phải năng lực chuyên gia.
- **Role-playing / inception prompting của CAMEL** (`camel/prompts/ai_society.py`): hai agent đóng vai người ra lệnh và người làm, dặn "never flip roles". Giải bài toán giữ vai, không giải bài toán thiếu hiểu biết. Mình không bị lỗi đổi vai.
- **Kho kinh nghiệm truy vấn ngữ nghĩa của MetaGPT** (`metagpt/exp_pool/`): cần vector DB, chấm 1–10 bằng một câu hỏi chung chung ("score from a human perspective", `exp_pool/scorers/simple.py`). Nặng và chấm yếu.
- **Môi trường đăng ký theo loại tin** (MetaGPT `_watch`, AgentScope 1.x `MsgHub`): cho hệ đa agent chạy song song tự phát. Luồng của mình tuyến tính, Trưởng phòng điều phối; thêm lớp này chỉ thêm chỗ hỏng. Lưu ý thêm: `MsgHub` mà AI gợi ý **đã bị bỏ** ở AgentScope 2.x.
- **MetaGPT nói chung:** gần 10 tháng không đẩy mã, SOP gõ cứng cho công ty phần mềm (PRD → thiết kế → mã). Ý thì đã nói ở trên, phần còn lại không hợp ngành.

## Đề xuất cho kiến trúc của mình (xếp ưu tiên)
1. **Mỗi thư mục tri thức có `MUC-LUC.md`, agent chọn ≤ 3 tệp và khai trong ô `nhan:`** (CAMEL Workforce). Áp ngay cho kho đã có trên máy (hồ sơ shop 1.175 dòng, giọng người đi câu, 104 bài blog) thay vì bắt nạp nguyên. Giải lỗi 2 trực tiếp, chi phí thấp nhất.
2. **Ô bắt buộc "Nghiêng về X · ~N % · vì Y · kiểm bằng Z"** trong phiếu giao, thay ô "Suy ra ⚠" tự do (ý ActionNode). Giải lỗi 3. Thêm vào bài thi một tiêu chí chấm ô này.
3. **Đúc kết theo cặp thắng/thua, ra lệnh ADD/UPDATE/DELETE/NONE với Sổ lỗi** (Youtu Training-Free GRPO). Sửa `tp-duc-ket.md`. Giải lỗi 4 khi có số đo sau đăng.
4. **Bộ đề phỏng vấn = bài thi hiện có + 3 thứ của Youtu:** mã lần thi, trạng thái từng đề, chạy mỗi đề ≥ 2 lần; giám khảo trích câu trả lời rồi mới chấm. Giữ thang 0–2 nhiều tiêu chí của mình. Giải lỗi 5.
5. **Trả việc kèm lời sai cụ thể, dán nguyên văn, "lần k/3"** (AgentScope SOP `_Verdict`). Sửa `tp-dieu-phoi.md`.
6. **Thêm dòng "Yếu / không làm được" ở đầu mỗi gói vai** (Youtu `weaknesses`). Rẻ, giúp Trưởng phòng giao đúng và giúp vai tự nói "không biết, nghiêng về…".

## Câu hỏi còn mở
- Gói ngành `nganh/do-cau-vn/` dùng chung giữa vai sẽ to cỡ nào trước khi cơ chế "mục lục + chọn 3" không đủ? Chưa repo nào trong nhóm này có lời đáp; cần đo bằng một lần chạy thật.
- Cơ chế 1 cần **cùng một đề chạy nhiều lần** để có thắng/thua. Với video, cặp so sánh tự nhiên là gì: hai hook trên cùng thân (đã có A/B ở khung 02), hay hai video cùng sản phẩm? Phụ thuộc số đo sau đăng (nhóm khác).
- Kinh nghiệm của Youtu nối thẳng vào instructions và tăng mãi. Sổ lỗi của mình sẽ phình theo đúng kiểu đó nếu không có luật xoá. Ai và khi nào được DELETE một bài học?
- Chưa đọc bài báo arXiv 2510.08191 (chỉ đọc mã); con số "+5,4 % AIME 2025" là lời README, chưa kiểm.
