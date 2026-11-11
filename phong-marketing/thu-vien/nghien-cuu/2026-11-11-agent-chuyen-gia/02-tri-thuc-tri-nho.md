# Nhóm 2 "Tri thức, trí nhớ và tự cải thiện kỹ năng" — 11/11/2026

Mã tải về (chỉ đọc, không chạy, không dùng git):
`/tmp/claude-1000/-home-tuyennvdev-my-project-manager-ai/b3979266-831c-470e-a888-71cc908aa8b0/scratchpad/repo-nc/nhom2/<repo>/<repo>-HEAD/`.
Trong báo cáo, đường dẫn tệp tính từ gốc repo.

## Xác minh repo

Số sao, ngày và giấy phép lấy từ `api.github.com/repos/<owner>/<repo>` ngày 11/11/2026. "Push cuối" là `pushed_at`, gần đúng với commit cuối.

| Tên gợi ý | URL thật | Sao | Push cuối | Giấy phép | Có thật? |
|---|---|---|---|---|---|
| CowAgent (chatgpt-on-wechat) | https://github.com/zhayujie/CowAgent | 47.874 | 10/11/2026 | MIT | Có. `zhayujie/chatgpt-on-wechat` trả 301 về đây (đổi tên, không phải nhánh). Mô tả gợi ý đúng |
| TencentDB-Agent-Memory (Tencent) | https://github.com/TencentCloud/TencentDB-Agent-Memory | 30.767 | 10/11/2026 | MIT (tệp `LICENSE`; API ghi NOASSERTION) | Có, nhưng chủ là **TencentCloud**, không phải Tencent (`Tencent/...` trả 301). Mô tả 4 loại tài sản đúng |
| Tencent SkillHone | https://github.com/Tencent/SkillHone | 190 | 04/11/2026 | MIT (README; API ghi NOASSERTION) | Có. Mô tả gợi ý đúng. Bài báo EMNLP 2026 chỉ được README nhắc, tôi chưa đọc bài |
| Tencent SkillHub | https://github.com/Tencent/skillhub | 46 | 28/08/2026 | MIT (`LICENSE`) | Có, nhưng **mô tả sai phần lớn**. Repo chỉ chứa tài liệu Open API, plugin DeepSeek Harness và 2 skill. Kho skill thật (skillhub.cn, "13 vạn skill") là dịch vụ đóng, không có mã |
| (gần tên) SkillHub tự dựng | https://github.com/iflytek/skillhub | 5.393 | 10/11/2026 | Apache-2.0 | Có. Kho skill tự dựng cho doanh nghiệp (RBAC, audit). Chỉ đọc mô tả API, không tải. Hạ tầng nặng, không hợp với mình |

## Cơ chế đáng lấy

### M1. Wiki ngành có `purpose.md` + `schema.md` + `index.md` (TencentDB, phần MemoryKnowledge)
- **Làm gì.** Mỗi wiki có hai tệp khai báo: `purpose.md` (wiki này phục vụ lĩnh vực gì) và `schema.md` (loại trang nào, mỗi loại có trường gì, quy ước tên). Hai tệp được dán nguyên văn vào prompt khi nạp tài liệu mới. Mặc định là "kỹ thuật phần mềm"; muốn ngành khác thì viết lại hai tệp này. Trang = YAML frontmatter (`type`, `title`, `description`, `sources`, `tags`) + thân Markdown có `[[liên kết]]`. Thư mục theo loại: `sources/`, `entities/`, `concepts/`, `comparisons/`, `synthesis/`. `index.md` tự sinh, mỗi trang một dòng `* [Tiêu đề](đường dẫn) - mô tả một câu`, nhóm theo loại.
- **Tệp nguồn.** `MemoryKnowledge/src/engines/wiki/ingest-v2/template.ts` (DEFAULT_PURPOSE, DEFAULT_SCHEMA), `prompts.ts` (buildSystemPrompt: khuôn trang), `index-builder.ts` (sinh index, bỏ qua `index/schema/purpose/log/overview.md`).
- **Giải lỗi số** 1 và 2. Đây gần như đúng ý "gói NGÀNH dùng chung + mục lục để tra" của mình, thêm hai thứ mình chưa có: tệp `schema.md` nói rõ một trang ngành phải có trường gì, và trường `sources` trên mỗi trang trỏ về tài liệu thô.
- **Cách chuyển.** Dựng `nganh/do-cau-vn/` bằng Markdown thuần: `purpose.md`, `schema.md`, `index.md`, `log.md`, thư mục theo loại. Loại trang cho ngành mình có thể là: `loai-hang` (phao điện, cần, máy), `doi-thu`, `gia-thi-truong`, `kieu-video`, `thuat-ngu` (giọng người đi câu), `nguon`. Index do Trưởng phòng hoặc một script nhỏ sinh từ frontmatter.
- **Chi phí.** Thấp. Không cần hạ tầng. Tốn công chính ở việc viết `schema.md` cho đúng ngành.
- **Mức tin.** Đã đọc mã.

### M2. Trang khoá tay `locked: true` không bị máy ghi đè (TencentDB)
- **Làm gì.** Trang người sửa tay được gắn `locked: true`. Lần nạp tài liệu sau gặp trang khoá thì bỏ qua, không gộp, không ghi đè. Trang chưa khoá thì gộp: trang nhỏ (dưới 4.000 ký tự) viết lại cả trang, trang lớn chỉ **nối thêm** đoạn mới để khỏi làm rơi dữ kiện cũ. `sources` là hợp của nguồn cũ và mới. Xoá một tài liệu thô thì trang chỉ dựa vào nó bị xoá theo.
- **Tệp nguồn.** `ingest-v2/merge.ts`, `ingest-v2/frontmatter.ts` (isLocked), `ingest-v2/cascade.ts`.
- **Giải lỗi số** 2 và 4. Chủ shop sửa tay một trang ngành thì agent không được "đúc kết" đè lên.
- **Cách chuyển.** Một dòng `khoa: chu-shop` trong frontmatter. Luật trong `tp-duc-ket.md`: trang có `khoa` chỉ được đề xuất sửa, không sửa thẳng. Luật "trang lớn thì nối, không viết lại" đưa vào luật Đúc kết.
- **Chi phí.** Gần như bằng không.
- **Mức tin.** Đã đọc mã.

### M3. Nạp tài liệu thô hai bước: phân tích rồi mới sinh trang (TencentDB)
- **Làm gì.** Bước A: agent đọc tài liệu thô + danh sách trang đang có, chỉ ra "kế hoạch bóc": tóm tắt nguồn, thực thể, khái niệm, cái nào **đã có trang thì cập nhật**, cái nào mới, cặp nào nên liên kết. Có luật độ hạt: chỉ tách trang riêng khi (1) hiểu được độc lập, (2) có quan hệ riêng, (3) đủ nội dung hơn một câu. Bước B: sinh trang theo kế hoạch, bắt buộc có một trang `source` tóm tắt nguồn.
- **Tệp nguồn.** `ingest-v2/prompts.ts` (buildAnalysisSystemPrompt, buildGenerateFromAnalysisPrompt), `ingest-v2/index.ts`.
- **Giải lỗi số** 1 và 2. Đây là cách chưng cất kho thô (hồ sơ shop 1.175 dòng, 104 bài blog, truy vấn Search Console) thành gói ngành mà không đổ cả kho vào ngữ cảnh.
- **Cách chuyển.** Một tệp việc mới, ví dụ `sp-nap-nguon-nganh.md`: một agent con một nguồn, bước A ghi kế hoạch vào phiếu, Trưởng phòng duyệt, bước B ghi trang. Mỗi trang ghi `sources:` trỏ về dòng hồ sơ, URL bài blog, hoặc khoảng ngày GSC.
- **Chi phí.** Mỗi nguồn hai lượt agent. 104 bài blog thì nên gom theo chủ đề, không làm từng bài.
- **Mức tin.** Đã đọc mã (prompt). Chưa thấy số đo chất lượng của chính họ.

### M4. Cổng phân loại 5 lớp trước khi ghi bài học (TencentDB, phần Skill)
- **Làm gì.** Trước khi ghi gì từ một hội thoại, agent rà phải xếp mỗi mẩu vào đúng một lớp: **Skill** (cách làm lặp lại được) · **Memory** (sở thích, chỉ dẫn lâu dài của người dùng) · **Wiki** (kiến thức lĩnh vực, thuật ngữ) · **Code-Graph** · **Tạm thời** (tên tệp, lỗi một lần, mã đơn). Chỉ lớp Skill được ghi vào skill. Bản "STRICT" thêm điểm 4 chiều (định vị 30, ranh giới 25, khái quát 20, thực thi được 25), phải đạt ≥72 và mỗi chiều ≥12. Mặc định "khi phân vân thì im". Khuôn SKILL.md bắt buộc: Khi dùng · Khi KHÔNG dùng · Đầu vào · Các bước · Luật quyết định · Đầu ra · Tiêu chí kiểm/dừng · Bẫy.
- **Tệp nguồn.** `MemoryCore/src/core/skill/prompts/skill-review-prompt-strict.ts`, bản nới tay `skill-review-prompt.ts`.
- **Giải lỗi số** 4. Nó là luật "một bài học một chỗ" của `tp-duc-ket.md` nhưng viết thành cổng có thể chấm.
- **Cách chuyển.** Đổi 5 lớp sang 4 lớp + tạm thời của mình: gói nghề theo vai · gói ngành · thư viện bằng chứng · sổ kinh nghiệm · tạm thời (không ghi). Thêm cột "Lớp" vào bảng khuôn đầu ra của `tp-duc-ket.md`. Khuôn 8 mục có thể so với `_khuon-viec.md` để xem thiếu mục nào ("Khi KHÔNG dùng" thường thiếu).
- **Chi phí.** Thấp. Chỉ sửa khuôn.
- **Mức tin.** Đã đọc mã (prompt).

### M5. Bóc kinh nghiệm có kiểu, có độ ưu tiên, có dòng gốc (TencentDB, L1)
- **Làm gì.** Từ hội thoại nhóm, bóc 4 kiểu: sự thật công việc · việc cần làm · **phương pháp** · tài sản. Phương pháp có `method_type` ∈ `sop | principle | constraint | anti_pattern | heuristic | evaluation_criterion`. Mỗi mục có `priority` 0–100 (dưới 70 thì bỏ) và `source_message_ids`. Có luật: một người gợi ý mà chưa ai xác nhận thì **không** được ghi thành quyết định của nhóm.
- **Tệp nguồn.** `MemoryCore/src/core/prompts/l1-extraction.ts` (dòng ~180–360).
- **Giải lỗi số** 4.
- **Cách chuyển.** Dòng sổ kinh nghiệm thêm ba trường: kiểu (theo 6 giá trị trên), mức (cao/vừa), "thấy ở" (phiếu, giây video, ngày). Luật "chỉ ghi khi chủ shop đã chốt" hợp đúng với quyền hạn của mình (agent đề xuất, không tự quyết).
- **Chi phí.** Thấp.
- **Mức tin.** Đã đọc mã (prompt).

### M6. Mục lục tri thức dán thẳng vào prompt, có trần kích thước (CowAgent)
- **Làm gì.** `knowledge/index.md` (mỗi trang một dòng `[Tiêu đề](đường dẫn) — tóm tắt một dòng`) được dán vào system prompt **mỗi lượt**. Dưới 8.000 ký tự thì dán nguyên. Trên đó chỉ dán tiêu đề. Quá 20.000 ký tự thì cắt, kèm câu "còn N mục, đọc `index.md` hoặc tìm bằng `memory_search`". Trang chi tiết chỉ đọc khi cần. Skill cũng thế: prompt chỉ có tên + mô tả + đường dẫn mỗi skill, thân SKILL.md đọc khi dùng.
- **Tệp nguồn.** `agent/prompt/builder.py` (`_INDEX_FULL_CHARS`, `_INDEX_MAX_CHARS`, `_compact_knowledge_index`, `_build_knowledge_section`), `agent/skills/formatter.py`, khuôn index ở `skills/knowledge-wiki/SKILL.md`.
- **Giải lỗi số** 2. Agent không đọc được kho vì không ai đưa mục lục cho nó. Đây là cách đưa rẻ nhất.
- **Cách chuyển.** Agent con Claude Code không có system prompt riêng. Thay bằng: phiếu giao của Trưởng phòng **luôn dán** `nganh/do-cau-vn/index.md` (giữ dưới ~8.000 ký tự) + ghi rõ 2–5 trang phải đọc cho việc đó. Có một phép kiểm `wc -c index.md` trong `tp-dieu-phoi.md`.
- **Chi phí.** Khoảng 2.000 token mỗi agent. Thấp.
- **Mức tin.** Đã đọc mã.

### M7. Gán tri thức theo agent (CowAgent: dùng chung trừ khi có bản riêng · TencentDB: "trang bị")
- **Làm gì.** CowAgent: mỗi agent đọc thư mục `skills/`, `knowledge/` dùng chung, **trừ khi** thư mục riêng của agent đó tồn tại. Không cần cấu hình, có thư mục là có bản riêng. TencentDB: mỗi tài sản (Memory, Skill, Wiki, CodeGraph) có `private | team | restricted | agent` và được gắn cố định vào agent ("loadout"), sau đó mới tìm theo câu hỏi trong phạm vi được phép. Proxy chọn tối đa **một** skill mỗi lượt, có lựa chọn "không chọn cái nào".
- **Tệp nguồn.** CowAgent `common/state_dir.py` (`_shared_or_own`), `docs/multi-agent/team.mdx`. TencentDB README mục "Memory isn't a global prompt — it's the Agent's loadout", `MemoryProxy/src/selection/strategies/choice.ts`.
- **Giải lỗi số** 2.
- **Cách chuyển.** Không cần ACL. Mỗi gói vai thêm mục "Trang bị": trang nào trong `nganh/do-cau-vn/` vai này luôn đọc (vd Săn xu hướng: `kieu-video/*`, `doi-thu/*`; Chuyên viên SP: `gia-thi-truong/*`, `loai-hang/*`). Gói ngành dùng chung mặc định. Shop thứ hai (GaRutin) thì thêm `nganh/ga-rutin/` và phiếu giao chọn ngành. Đúng mô hình "dùng chung trừ khi có bản riêng".
- **Chi phí.** Thấp.
- **Mức tin.** CowAgent đã đọc mã. TencentDB phần ACL chỉ đọc README, phần chọn skill đã đọc mã.

### M8. Vòng sửa skill có cổng kiểm (SkillHone)
- **Làm gì.** Thấy lỗi tái hiện được trong một skill thì **dừng việc chính**, không sửa ngay. Trình tự: (1) loại trừ lỗi môi trường, giới hạn lượt, cấu hình người dùng; (2) tìm Issue cùng gốc, Issue trùng nhận diện bằng dấu vân tay tiêu đề + thân; (3) viết **một phép thử nhỏ tái hiện lỗi** trong `.test/`, đây là thứ duy nhất được ghi trước khi có Issue; (4) tạo Issue kèm phép thử; (5) vai sửa làm trên nhánh riêng, sửa cả SKILL.md + scripts + references; (6) chủ (host) **tự chạy lại** phép thử, không tin lời vai sửa; không qua thì không có PR; (7) PR + một bản ghi Wiki "đã hỏng gì, đã sửa gì". Gộp mặc định phải người duyệt.
- **Tệp nguồn.** `skills/skillhone-auto-optimization/SKILL.md`, `src/cli.ts` (`finalizeRepair`: chạy `runIssueTests`, không qua thì `failed`), `src/core/tracker.ts` (bảng `issue.fingerprint`, `issue_test`, `wiki_entry`).
- **Giải lỗi số** 4 và 5. So với Đúc kết của mình: `tp-duc-ket.md` đã có "ghi lỗi một chỗ" và "đề xuất thi lại", nhưng **thi lại chỉ là đề xuất**, không chặn việc sửa gói. SkillHone đảo thứ tự: đề hồi quy viết **trước** khi sửa, và sửa chỉ được giữ khi đề đó qua.
- **Cách chuyển.** Sửa luật 3 của `tp-duc-ket.md`: lỗi nào sửa vào gói vai thì trước hết thêm một đề hồi quy vào `<việc>.thi/`, rồi agent con sửa gói, rồi chạy lại đề đó, không qua thì hoàn lại bản cũ. Luật 4 (lỗi lặp) giữ, thêm "tìm theo tên lỗi" như dấu vân tay.
- **Chi phí.** Mỗi lần sửa gói thêm một lượt thi (vài agent con). Vừa phải.
- **Mức tin.** Đã đọc mã.

### M9. Bộ thi tách 3 phần, đề kín không lọt vào gói (SkillHone, đường benchmark)
- **Làm gì.** Bộ đề nằm ở **repo riêng**, khoá lại trước khi tối ưu. Ba phần: `probe` (đưa cho agent sửa xem để biết sai gì), `pr_val` (dùng chọn bản sửa, agent sửa không được xem), `test` (chỉ chạy một lần ở cuối). Bản sửa phải tăng điểm `probe` ít nhất 0,02 và không được tụt `pr_val` quá 0,02. Đáp án và mã chấm không bao giờ vào skill, Issue, hay prompt. Lỗi hay gặp nhất trong `probe` thành Issue tiếp theo.
- **Tệp nguồn.** `skills/skillhone-benchmark-optimization/SKILL.md`, `src/core/benchmark.ts` (`failureCategory`, `validationRegression <= 0.02`, `minimumImprovement = 0.02`).
- **Giải lỗi số** 5. Bộ thi Biên kịch hiện có (23/24 vs 18/24) chấm một bộ đề. Không có phần kín thì gói sẽ "học thuộc đề".
- **Cách chuyển.** Bộ đề phỏng vấn chuyên gia chia hai: đề mở (agent Đúc kết được xem) và đề kín (chỉ Trưởng phòng chấm). Thư mục `.thi/` thêm `kin/`, luật trong `tp-duc-ket.md`: agent sửa gói không được nhận tệp trong `kin/`. Không cần repo riêng.
- **Chi phí.** Viết gấp đôi đề. Chấm mù tốn agent.
- **Mức tin.** Đã đọc mã. Con số +15,8 điểm GAIA trong README chưa kiểm.

### M10. Rà soát sau phiên: mặc định im, sửa NGUỒN chứ đừng ghi triệu chứng (CowAgent)
- **Làm gì.** Khi hội thoại rảnh 10 phút và đủ 6 lượt, một agent cô lập (chỉ có `read/write/edit/ls/memory_search/memory_get`) đọc lại bản ghi. Mặc định trả `[SILENT]`. Chỉ được báo khi **thật sự đã sửa tệp**. Thứ tự giá trị: sửa skill > làm nốt việc đã hứa > ghi tri thức > ghi trí nhớ (hiếm nhất). Luật then chốt: lỗi nằm trong skill thì **sửa skill**, cấm ghi "skill X sai chỗ Y" vào trí nhớ. Danh sách **không được ghi**: lỗi môi trường, câu phủ định về công cụ ("công cụ X không chạy"), chuyện kể một lần, lỗi tạm đã tự hết. Trước mỗi lần rà chụp lại tệp để hoàn tác. Skill gốc của sản phẩm bị khoá ghi.
- **Tệp nguồn.** `agent/evolution/prompts.py` (EVOLUTION_SYSTEM_PROMPT), `agent/evolution/executor.py` (`_ALLOWED_TOOLS`, bảo vệ skill gốc), `agent/evolution/backup.py`, `agent/evolution/trigger.py`.
- **Giải lỗi số** 4.
- **Cách chuyển.** Lấy nguyên danh sách "không được ghi" và luật "sửa nguồn" vào `tp-duc-ket.md`. Việc này hợp với nguyên tắc "im lặng khi không có gì đáng nói" trong CLAUDE.md gốc. Hoàn tác thì mình đã có git trong `manager-ai`, không cần chụp riêng. Không cần trình kích hoạt tự động.
- **Chi phí.** Gần như bằng không.
- **Mức tin.** Đã đọc mã.

### M11. Thang chấm TRACE có script kiểm khuôn (SkillHub)
- **Làm gì.** Chấm một skill theo 5 chiều, 15 mục con, mỗi mục (0, 5] với bảng mô tả từng mức. Ví dụ `adaptability.boundary`: 5 = nói rõ làm được/không làm được, phạm vi, ràng buộc đầu vào ra; 1 = không nói gì. Thiếu thì cho 1–2. Mỗi mục hai lý do (cho người làm, cho người dùng). Cấm chấm khi chưa đọc gói. Báo cáo JSON phải qua `validate_trace_scores.py` mới được giao.
- **Tệp nguồn.** `skills/skillhub-trace-evaluator/SKILL.md`, `references/*.md`, `scripts/validate_trace_scores.py`, `docs/api/evaluation.md`.
- **Giải lỗi số** 5 (thước đo chất lượng của GÓI), không đo trực tiếp "chuyên gia".
- **Cách chuyển.** Lấy ý "mỗi mức điểm có mô tả quan sát được" và "script kiểm khuôn điểm trước khi giao" cho bộ đề phỏng vấn. Có thể dùng 2 mục `boundary` và `trigger` để rà 6 gói vai.
- **Chi phí.** Thấp.
- **Mức tin.** Đã đọc tài liệu và rubric. Không chạy script.

## Không nên lấy (và vì sao)
- **Toàn bộ hạ tầng TencentDB** (MemoryProxy, MemoryPanel, MongoDB, ACL theo user/role, CodeGraph, đo dùng qua ClickHouse). Ba dịch vụ + LLM riêng + proxy chặn mọi lệnh gọi model. Quá nặng cho một người không có máy chủ. Chỉ lấy khuôn wiki và prompt.
- **Tìm kiếm lai vector + FTS5 + rerank của CowAgent** (`agent/memory/`, hơn 3.000 dòng `conversation_store.py`). Gói ngành của mình vài chục trang, mục lục + `grep` là đủ.
- **Deep Dream ghi đè MEMORY.md mỗi đêm** (`agent/memory/summarizer.py`). LLM viết lại cả tệp, giữ ~30 mục, "mới thắng cũ". Dễ mất dữ kiện và mất dấu nguồn. Mình đã có nhật ký quyết định có dự đoán và ngày kiểm, tốt hơn.
- **Luật "ghi vào kho không cần hỏi"** trong prompt CowAgent (`builder.py`: "Don't ask … just write it"). Ngược với quyền hạn của mình (agent đề xuất, chủ shop chốt), và dễ làm kho phình rác.
- **Đầu prompt "Err on the side of loading"** (TencentDB `skill-listing-prompt.ts`, chép từ Hermes). Bảo agent nạp mọi skill hơi liên quan. Ngữ cảnh mình có hạn nên làm ngược lại: phiếu giao chỉ định trang.
- **CLI, SQLite, worktree, DeepSeek Harness và gộp tự động của SkillHone.** Chỉ cần quy trình, không cần công cụ. Gộp tự động trái luật "push main = deploy" và "hỏi trước".
- **Kho skill SkillHub và iflytek/skillhub.** Chợ skill và kho tự dựng giải chuyện phân phối skill cho nhiều đội. Mình có một người, một repo.
- **Con số quảng cáo.** PersonaMem 48 % → 76 % (TencentDB), GAIA +15,8 (SkillHone): chưa có cách kiểm, không dùng làm lý do.

## Đề xuất cho kiến trúc của mình (xếp ưu tiên)
1. **Dựng `nganh/do-cau-vn/` theo khuôn wiki của TencentDB** (M1, M2): `purpose.md`, `schema.md` (loại trang của ngành đồ câu), `index.md` mỗi trang một dòng, `log.md`, frontmatter có `sources` và `khoa`. Giải lỗi 1, 2. Rẻ nhất, hiệu quả lớn nhất.
2. **Phiếu giao luôn dán `index.md` ngành + chỉ định trang phải đọc; mỗi gói vai có mục "Trang bị"** (M6, M7). Giữ index dưới ~8.000 ký tự. Giải lỗi 2.
3. **Tệp việc nạp nguồn hai bước** (M3) để chưng cất hồ sơ shop, blog, GSC thành trang ngành có dấu nguồn. Làm sau mục 1 vì cần `schema.md` trước.
4. **Sửa `tp-duc-ket.md`**: thêm cột "Lớp" theo cổng 5 lớp (M4), danh sách "không được ghi" và luật "sửa nguồn, đừng ghi triệu chứng" (M10), kiểu kinh nghiệm `method_type` và luật "chỉ ghi khi đã chốt" (M5). Giải lỗi 4.
5. **Đảo thứ tự thi lại**: đề hồi quy viết trước, sửa gói sau, chỉ giữ bản sửa khi đề qua (M8). Biến "đề xuất thi lại" thành cổng.
6. **Bộ đề phỏng vấn chuyên gia chia mở/kín, thang chấm có mô tả từng mức, script kiểm khuôn điểm** (M9, M11). Giải lỗi 5.

## Câu hỏi còn mở
- Ai duyệt trang ngành đầu tiên? Nếu chủ shop không có giờ đọc thì `khoa` gần như không dùng, và trang do máy chưng cất sẽ không ai soát.
- `schema.md` cho đồ câu VN nên có những loại trang nào? Cần chủ shop góp ý ít nhất một lần, vì đây là chỗ hiểu biết ngành thật sự nằm.
- Gói ngành đặt ở `phong-marketing/thu-vien/nganh/` hay ở tầng `manager-ai/` để cả quản lý cửa hàng (SEO, blog) dùng chung? Hồ sơ shop hiện nằm ở `manager-ai/<dự án>/CLAUDE.md`.
- Bộ đề kín cần bao nhiêu câu để chênh 0,02 có nghĩa? Với 24 câu, một câu đã là 0,04. Ngưỡng của SkillHone không chép thẳng được.
- Vòng ghi kết quả video sau đăng (lỗi 4, phần "học từ kết quả thật") không repo nào trong nhóm này giải. Cả ba chỉ học từ hội thoại và lỗi khi chạy, không từ số đo ngoài đời. Cần nhóm khác hoặc tự thiết kế.
- Lỗi 3 (chính kiến khi thiếu dữ liệu) không có cơ chế nào trong nhóm này. Gần nhất là mục "Luật quyết định" trong khuôn SKILL.md của TencentDB, chưa đủ.
