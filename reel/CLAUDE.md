# Máy làm Reel — hồ sơ dự án

Tài sản thứ tư, bắt đầu 23/10/2026: **Phòng Marketing AI** cho các shop của chủ dự án (định hình 11/11/2026).
Ban đầu là máy làm reel tiếng Anh (Mỹ) độc lập; từ 11/11 phòng **được đọc kho của 17fishing và GaRutin** (chỉ đọc,
trỏ tới, không chép) và làm việc theo **ngành** — tri thức ngành ở `nganh/<ngành>/`, đọc `MUC-LUC.md` của ngành trước.

Đọc `~/my-project/CLAUDE.md` trước (vai trò, quyền hạn, bẫy chung), rồi tệp này.

## Tài liệu gốc — đọc trước khi làm gì

| Tài liệu | Ở đâu | Dùng khi |
|---|---|---|
| **Bàn giao phiên gần nhất** (việc đang dở, chờ sếp, sửa mã còn treo) | `BAN-GIAO.md` | **Đầu mỗi phiên** — có thì đọc trước tiên |
| Phòng Marketing AI: luồng phối hợp + việc từng vai | `luong/` · `chuyen-vien/viec/` | Chạy một video qua các vai |
| Kế hoạch sản phẩm (yêu cầu FR/NFR, module M0–M9, UI, kiến trúc, lộ trình) | Bản gốc: https://claude.ai/artifact/AMhN1DQDB32o14HAAmA1da · bản chép: `KE-HOACH.md` | Mọi quyết định về phạm vi và thứ tự làm. Sửa ở bản gốc rồi chép lại |
| Bản thiết kế sơ đồ (bản 6) | https://claude.ai/artifact/Poxf3b8AzDytHAyMC7HhTG | Nhìn nhanh luồng và lý do loại các repo khác |
| Việc giai đoạn 0 và kết quả đo | `GIAI-DOAN-0.md` cùng thư mục | Đang làm giai đoạn 0 |
| **Mã của máy: repo `gen-video-viral`** | `D:/my project/gen-video-viral` · remote `github.com/vinctuyen2601/gen-video-viral` (máy Windows: alias `github.com-vinctuyen2601`) | Mọi việc viết mã. Repo đó **chỉ chứa mã**; hiểu biết ghi ở đây |
| **Sổ tay viral** — vì sao video ngắn viral, bộ câu hỏi bóc (A–H), STEPPS, dạng hook, hook chết, quy tắc outlier | `KIEN-THUC-VIRAL.md` | **Trước khi bóc BẤT KỲ khung nào.** Cập nhật khi một video của máy thắng/thua rõ |

Kế hoạch là nguồn đúng. Tệp này chỉ giữ những gì một phiên mới cần để không
đi lạc, và những quyết định đã chốt với chủ dự án.

## Đã chốt với chủ dự án

| Ngày | Quyết định |
|---|---|
| 23/10 | Khung là **skill Hypit** (hypit-ai/hypit) chạy trong Claude Code. Đã đọc mã và loại ClipForge (nhân bản viral gần như giả, dán link trả 6 cảnh gõ cứng), ai-video-studio (2 commit, đẩy ảnh lên uguu.se công khai), ArcReel (không có nhân bản viral, AGPL), Pixelle-Video |
| 23/10 | **Tiếng Anh (Mỹ) trước.** Tiếng Việt là gói tuỳ chọn làm sau |
| 23/10 | **Không tự đăng mạng xã hội.** Đầu ra là thư mục video + đường dẫn; chủ dự án tự đăng |
| 23/10 | **Mọi ngách sản phẩm.** ~~Nguồn sản phẩm chính là Shopify Admin API, phụ là nhập tay~~ → thay 24/10, xem dưới |
| 23/10 | **Reel mẫu** lấy từ TikTok, Facebook Reels, kho quảng cáo (TikTok Creative Center, Meta Ad Library) và tải tay. **Chưa dùng công cụ trả phí** (PipiAds, Foreplay) |
| 23/10 | **Khung ba tầng:** format (playbook Hypit) → cảnh theo giây → phán quyết chuyển sang AI + loại sản phẩm hợp. Kèm bằng chứng viral |
| 23/10 | **M0 sơ chế nguyên liệu** đứng trước mọi bước tốn tiền |
| 23/10 | **Trần chi phí $10 / video.** Vượt trần thì dừng và hỏi |
| 23/10 | **Video mặc định 15 giây** |
| 23/10 | **Người mẫu: ảnh người thật do chủ dự án đưa vào.** Không đưa thì AI tạo theo mô tả cho hợp sản phẩm và ngữ cảnh video |
| 23/10 | Thư mục làm việc ở đây, `manager-ai/reel` |
| 23/10 | ~~Giai đoạn 0 gọi model qua HypiHub~~ → **bỏ HypiHub vì đắt** (chủ dự án xem giá, cùng ngày). Đường thử chính: **Muse, chạy bằng skill bên trong Muse** (miễn phí, 1 tỉ token). Dự phòng: BytePlus ModelArk trực tiếp, Seedance 720p khoảng $0,15/giây ≈ $2–3/video 15 giây (số quy đổi của bên thứ ba, chưa kiểm). Giọng: TTS chạy ở máy hoặc CLI `tts` của Muse thay ElevenLabs |
| 23/10 | Chủ dự án sẽ tự làm **phép thử 10 phút trong Muse** ở máy nhà trước khi mình viết skill hay sửa kế hoạch. Cách làm ở `GIAI-DOAN-0.md` |
| 23/10 | ~~Chưa cài skill Hypit~~ → **chủ dự án cho cài cùng ngày** ("ok cài đi"), máy `David-PC`: skill `npx skills add hypit-ai/hypit -g -a claude-code -y` → `~/.claude/skills/hypit` (Gen/Socket/Snyk: Safe / 0 alerts / Low Risk); chương trình `npm i -g @hypit/hypit` → **0.3.1** (ghim bản này cho giai đoạn 0). Chưa nối nhà cung cấp nào, chưa có khoá, chưa tốn tiền. Máy khác thì phải cài lại |
| 23/10 | **3 sản phẩm thử:** Santa Spins, Santa's Memory Globe (store Shopify, thị trường Mỹ) và một món 17fishing có ảnh 1688 dính chữ Trung (ca ảnh xấu để thử M0) |
| 23/10 | Sau 5 clip chủ dự án định bỏ Muse ("yếu… hạn chế thời lượng, quay ra cách 1"); clip thứ 6 (chỉ tải MỘT ảnh = khung cuối clip 1) **nối khớp và giữ đúng sản phẩm** → chủ dự án: "muse làm tốt lắm". **Chưa chốt** Muse hay Seedance làm đường chính — ràng buộc thật của Muse là hạn mức tuần + clip cố định 10 s ~720p, không phải chất lượng. Ghi chép đường Seedance để dùng khi cần: **Hypit + Seedance gọi thẳng BytePlus ModelArk** (không HypiHub). Hypit KHÔNG có provider BytePlus phát hành sẵn → trợ lý viết provider trong project từ mẫu `examples/provider-package/packages/provider-videos` (mẫu chính là Seedance, có ô `firstFrame` → nối cảnh ghi thẳng vào lệnh gọi). Giá BytePlus tính theo token; quy đổi bên thứ ba ≈ $0,10–0,15/giây 720p → 15 s ≈ $1,5–2,3 trước sinh lại — **chưa kiểm trên trang giá chính thức** |
| 23/10 | **CHỐT: hai đường sinh video ngang hàng, người dùng chọn theo từng job** — Muse (miễn phí, hạn mức tuần, clip 10 s ~720p) hoặc Hypit + Seedance gọi BytePlus (trả tiền, chạy tự động). Chủ dự án: "đường nào cũng cần làm… cho user chọn". **Thứ tự: hoàn thiện cả luồng bằng đường Muse trước; đường Hypit/Seedance để TODO.** Hệ quả với kế hoạch: FR-22 "Nguồn video Muse — Để sau" thành **Bắt buộc**, và nguồn video là một lựa chọn trong job (cùng kiểu adapter như `ProductSource`). Phải sửa ở bản gốc Claude Docs rồi chép lại `KE-HOACH.md` |
| 23/10 | **Độ dài video KHÔNG cố định 15 s** — "15 giây" ở trên bị thay. Đầu ra gồm cả **reel lẫn video quảng cáo**. **CHỐT:** (1) **khung viral quyết định độ dài** — tổng giây và mốc từng cảnh (cảnh 1, 2, 3…) lấy từ khung M3, không phải tham số gõ tay; (2) **loại đầu ra quyết định bản cắt thêm**, một job xuất **nhiều bản cùng lúc** (đầy đủ theo khung · ≤ 15 s cho quảng cáo Meta · 6 s bumper tuỳ chọn) — chỉ dựng lại, không sinh thêm; (3) **không đặt trần độ dài riêng**: độ dài theo cảnh của khung; trần $10 và hạn mức Muse vẫn chặn qua bước ước tính |
| 23/10 | **Muse cắt clip theo cảnh** (agent Muse xác nhận): sinh ~10 s rồi cắt đúng 3 s / 5 s…, giữ dọc, hình, tiếng, kiểm lại thời lượng. Hệ quả: **mỗi cảnh của khung = một clip Muse**, nên hạn mức tính theo **số cảnh**, không theo số giây — khung 15 s có 5 cảnh × 3 s = 5 clip ≈ **15 % hạn mức tuần** (~3 %/clip, đo 23/10). Khung nhiều cảnh ngắn tốn hạn mức nhất; bước ước tính phải đếm cảnh |
| 23/10 | **Bằng chứng viral KHÔNG bắt buộc** (link, lượt xem, ngày): "input vào là viral chọn lọc rồi". Có thì ghi, thiếu không chặn lưu khung. FR-09 và M3 trong kế hoạch phải sửa theo |
| 23/10 | **Một video trọn luồng trước**, rồi mới thêm khung mới, **lần lượt từng dạng** (không gom 3 reel một lúc). Video đầu: Santa Spins × khung 01 FrostGlow, qua Muse |
| 23/10 | **Tách HOOK và THÂN** trong mỗi khung (chủ dự án: "Ok tách nhé"), sau khi đo khung 02 = thân khung 01 + hook khác (hãng A/B test hook). Một thân ghép nhiều hook = nhiều biến thể, chỉ sinh lại phần hook. Sửa FR-08, FR-20 và thực thể `template` trong kế hoạch |
| 23/10 | Chữ trên hình: chủ dự án giao trợ lý chọn "miễn phù hợp và viral" — nhưng vẫn theo luật: không nói điều sai sự thật (nơi bán, hết hàng) |
| 24/10 | **Cửa 0 QUA** (chủ dự án: video 01 "cũng tạm tạm… sang step tiếp"). Giữ hình sản phẩm: qua **khi mọi cảnh có sản phẩm bắt đầu từ ảnh sản phẩm thật**; chi phí $0 (Muse), ~25 % hạn mức tuần cho video 01. **Sang giai đoạn 1** |
| 24/10 | **Tên máy: `gen-video-viral`** (lệnh `gvv`), repo mã riêng. Thứ tự giai đoạn 1: **dựng** (✅ 24/10, tái tạo đúng video 01) → **bóc khung — phần đo** (✅ 24/10, `gvv boc`) → **`gvv cat` tự đề xuất danh sách cắt** (chủ dự án hỏi "danh sách cắt dựa vào gì": khung + kịch bản + đo clip thật + hồ sơ thương hiệu; mốc neo = cú bật đo bằng độ sáng; ✅ 24/10, video 01: 6/6 nhịp lệch ≤ 0,25 s so với dựng tay. Bài học: đèn LED sáng DẦN ~0,5 s (+7–10 độ sáng), không nhảy — đo đoạn tăng trong cửa sổ prompt và đòi sáng hơn mức cũ, vì sáng lại sau cú máy đẩy vào dễ bị nhận nhầm) → hồ sơ sản phẩm từ link (✅ 24/10, `gvv san-pham` + cổng kiểm) → ghép prompt (✅ 24/10, `gvv prompt`: kịch bản cảnh JSON do trợ lý viết → prompt dán nguyên văn khối hồ sơ + kế hoạch cắt cho `gvv cat`; video 01 khớp 100 % bản tay). Muse vẫn do người chạy tay. **Bài học 24/10:** ghép nguyên văn lộ ra khối PRODUCT tự mâu thuẫn (vòng tắt "frosted white" vs "thin grey" — sửa 3b thêm câu mới mà không xoá câu cũ) → có thể là nguyên nhân vòng đèn clip M trông sáng trước cú bật. **Sửa khối thì thay câu cũ, không chồng thêm** |
| 24/10 | **Nguồn sản phẩm = link trang chủ dự án gửi**, không kết nối Shopify ("Tạm thời chỉ lấy sản phẩm tôi gửi link thôi, sau tôi cũng sẽ share như thế không cần kết nối với shopify"). `gvv san-pham <link>` chỉ đọc trang công khai (`<link>.js` / JSON-LD / og:), không token. Ép thị trường Mỹ `?country=US` — không ép thì máy ở VN nhận giá VND. M1 "Admin GraphQL API" trong kế hoạch bị thay: sửa ở bản gốc Claude Docs rồi chép lại |
| 24/10 | **Cổng kiểm nguyên liệu sản phẩm: ĐỦ mới xong bước sơ chế** ("phải đạt đủ thì mới xong bước xử lý thô, nếu không đạt thì hãy nói rõ yêu cầu đến user cần cung cấp thêm"). Chặn: mô tả rỗng · < 3 ảnh cạnh ngắn ≥ 800px · không cỡ thật VÀ không video để đo tỉ lệ · không logo · hồ sơ còn ⬜ ở mục 1/1b/3/5/6. Cảnh báo: không video · không giá · chỉ có tỉ lệ từ video. Mỗi mục chặn của người dùng phải đi kèm **câu yêu cầu cụ thể** (gửi gì, cỡ nào, góc nào) — ghi `CAN-BO-SUNG.md`, trợ lý chuyển nguyên văn cho chủ dự án. Ngưỡng là điểm khởi đầu, chỉnh theo kết quả thật |
| 11/11 | **Định hình sản phẩm (party mode BMAD):** ứng dụng = **Phòng Marketing AI** cho chủ shop. Phần 1 = xưởng nội dung (ưu tiên video; sau là ảnh, bài viết); phần 2 = kế hoạch, đăng, quảng cáo, phân tích. **Dùng nội bộ trước**; đo bằng số liệu + người chấm. Video **2 hướng một đường ống**: Tạo mới (AI theo khung viral) và Bản địa hoá (video có sẵn → thị trường đích VN/Mỹ), có hướng lai. Khung **3 tầng** (kiến thức agent · hiểu biết sản phẩm · quy trình Học→Làm→Duyệt→Đánh giá→Đúc kết) + 4 cuộc họp có biên bản. **Hạt nhân AI = Claude** (tạm thời), chạy xuyên suốt, vai = "mũ"; kiến thức giữ Markdown/JSON trung lập. Trưởng phòng **tự chạy**, vượt ranh giới quyền thì thảo luận với sếp. **Kiểm duyệt tạm bỏ** (thử nghiệm). Sơ đồ: https://claude.ai/artifact/Sy6dwQMtu8AtMoAkwZJQeL · gói kiến thức 6 vai: `chuyen-vien/` |
| 11/11 | **Hai mục đích video:** **nuôi page** (thu hút người xem, lấy lượt thích page) làm chủ yếu theo hướng **Bản địa hoá** video viral có sẵn (reup), chọn đúng ngách gần sản phẩm; **quảng cáo** (ra đơn) theo hướng Tạo mới / lai với sản phẩm thật. Rủi ro đã nêu một lần: Facebook/TikTok giảm phân phối nội dung đăng lại không nguyên bản → video nuôi page phải được biến đổi thật (giọng kể, góc nhìn, hook, kết mời theo dõi). Chọn page chạy thử và chi tiết từng bước: **bàn ở phần workflow** |
| 11/11 | **Bỏ kiểm quyền khỏi quy trình tạo video** ("bỏ việc check quyền trong quá trình tạo video"). Không vai nào hỏi sếp về quyền dùng video nguồn, nhạc, giọng TTS. Gỡ ở: 2 luồng, `tp-nhan-viec`, `td-dung-qc` (luật 5), `dd-ke-hoach-hinh`, `td-ban-dia-hoa`, gói Trưởng phòng / Đạo diễn / Thợ dựng. Kiến thức giấy phép trong gói (Thợ dựng §3.7) giữ làm tham khảo. Rủi ro đã nêu MỘT lần, đừng nhắc lại: Facebook/TikTok có thể tắt tiếng hoặc giảm phân phối video dùng nhạc/hình có chủ. Video mẫu 17fishing là video của chính shop |
| 11/11 | **Phòng được ĐỌC kho của 17fishing và GaRutin** ("được phép để thêm kinh nghiệm hiểu về sản phẩm") — lật một phần dòng đầu tệp "không phải công cụ của 17fishing hay GaRutin". Chỉ đọc và **trỏ tới** (hồ sơ shop, giọng viết, blog, Search Console), không chép sang `reel/`. Ghi vẫn chỉ trong `reel/` |
| 11/11 | **Không theo dõi đối thủ** ("có nhiều đối thủ lắm nhưng đối thủ không cần quan tâm"). Bỏ lớp `doi-thu/` và việc mổ quảng cáo đối thủ khỏi phương án kiến trúc. Vẫn được học từ **video viral trong ngách** bất kể ai làm — đó là bằng chứng xu hướng, không phải theo dõi đối thủ |
| 11/11 | **Hướng lâu dài: AGENT TỰ CHỦ** (party mode, sếp chọn b: "tất nhiên là b"). Sếp giao **mục tiêu** (vd "tuần này 3 video cho phao"), Trưởng phòng tự lên kế hoạch, tự chọn việc, chỉ báo khi xong hoặc vướng. Gói vai dạy agent **tự quyết**, không chỉ làm theo. Workflow cứng hiện tại là giàn giáo, nới dần theo điểm bộ đề |
| 11/11 | **KHÔNG xây phần mềm** (sếp chọn b). Bản thiết kế SaaS "AI Marketing Department" (sếp trao đổi với AI khác, chép ở `nghien-cuu/2026-11-11-agent-chuyen-gia/07-tham-khao-blueprint.md`) chỉ dùng **tham khảo** để xây bộ của mình trên tệp + Claude Code. Chứng minh phòng trên các shop của sếp trước. Lấy ý: cấp năng lực L1–L5 theo từng năng lực, phân tích nguyên nhân yếu, claim 4 tầng, "reviewer không phán hiệu quả kinh doanh" |
| 11/11 | **Lâu dài: dựng SaaS làm LỚP NHÌN trực quan, LÕI vẫn là kiến trúc hiện tại** (sếp, chiều 11/11 — điều chỉnh dòng "KHÔNG xây phần mềm"). Lõi = tệp Markdown/JSON + Claude Code: gói nghề, gói ngành, thư viện bằng chứng, sổ kinh nghiệm, luồng, phiếu giao, bộ đề. SaaS đọc/ghi lõi đó và hiển thị, không thay nó. Thứ tự vẫn: chứng minh phòng trên shop của sếp trước (pha 2b–4), rồi mới làm lớp nhìn |
| 11/11 | **Lập đội trước mọi việc** (sếp): "việc đầu tiên là tìm nhân sự phù hợp, chứng minh khả năng thì mới được boss thuê"; Trưởng phòng nhận đầu vào, lập đội, đánh giá, đào tạo, xin tài nguyên qua **checklist + quiz** (`chuyen-vien/viec/tp-lap-doi.md`, `doi/<shop>/`). Quiz 11/11: báo sếp chỉ khi cần/xong mốc · sếp hỏi thẳng từng vai · vai chưa đạt mà sếp muốn giao → **ba bên cùng đào tạo trước** · vai L4 tự làm việc nội bộ, đăng/tiêu tiền/sửa web phải hỏi |
| 23/10 | Muse (muse.ai) chỉ là nhánh thử, chạy **bên trong** Muse. Không dùng useapi.net, AutoMuse (giao mật khẩu, cookie Meta cho bên thứ ba) |

## Quy tắc bóc khung (M3) — rút ra từ lỗi khung 01, 23/10

**Bước 0: đọc `KIEN-THUC-VIRAL.md` và đi đủ bộ câu hỏi A–H trong đó.**

**Đầu vào từ người dùng — CHỈ 5 thứ** (chủ dự án chốt 23/10: "nhiều quá, có những thứ là kiến thức của bạn tự quyết và tự định hình được"):

1. **Video mẫu** — người dùng đưa, hoặc máy lấy từ **thư viện khung** của mình.
2. **Thông tin sản phẩm** và các đặc điểm.
3. **Hình ảnh sản phẩm.**
4. **Hình ảnh người mẫu**, nếu có.
5. **Yêu cầu, mô tả thêm, lưu ý, hướng dẫn** của người dùng.

**Mọi thứ khác máy TỰ QUYẾT, không hỏi:** bóc khung + vì sao viral · hồ sơ sản phẩm (tự gom từ 2 và 3) ·
**nhân vật** (tự thiết kế theo tệp khách và mức giá khi không có 4) · **bối cảnh** · thông điệp, chữ trên hình,
mồi bình luận · nhạc · chia clip, khung đầu, prompt · dựng. Căn cứ: `KIEN-THUC-VIRAL.md`.

**Chỉ hỏi người dùng khi:** thiếu thứ mà **chỉ người dùng mới biết** trong 2 và 3 (kích thước thật, mặt sau, phụ kiện
thật, bao bì thật) **và** thứ đó cần cho cảnh đang làm; hoặc có điều có thể **sai sự thật / rủi ro pháp lý** (nêu một
lần, người dùng chốt). Không thì tự suy, đánh dấu ⚠ "suy ra", làm tiếp.

**Cửa chặn trước MỌI prompt:** máy phải tự dựng xong **hồ sơ sản phẩm** (`san-pham/<sp>.md`, có **khối mô tả chuẩn**
dán nguyên văn vào prompt) và — nếu cảnh có người — **hồ sơ nhân vật** (`nhan-vat/<ten>.md`). Mọi cảnh có sản phẩm
phải bắt đầu từ **ảnh khung đầu có sản phẩm thật** (Muse lấy ảnh tải lên làm khung đầu). Đo 23/10: clip A — cảnh không
có sản phẩm Muse làm rất đẹp; cảnh có sản phẩm mà không có ảnh thì Muse **bịa** (vali chứa tấm vuông trắng + đĩa than).

Bản bóc đầu của khung 01 sai ở khâu đánh giá: thay cú hook "kệ siêu thị + hộp
đẹp" bằng "hộp giao trước cửa" vì lo Muse vẽ sai chữ và lo "ngụ ý bán lẻ". Chủ dự
án bắt được. Từ đó:

1. **Mục "Vì sao viral — xếp hạng" là bắt buộc, viết TRƯỚC tầng 3.** Mỗi yếu tố
   gắn mức **LÕI** (bỏ là mất viral) hoặc **Phụ**.
2. **Tầng 3 không được thay yếu tố LÕI.** Làm không được thì ghi "không chuyển
   được cho sản phẩm này" hoặc hỏi chủ dự án — không tự thay rồi viết vào kịch bản.
3. **Lo ngại của trợ lý (kỹ thuật, pháp lý) là CÂU HỎI cho chủ dự án**, không phải
   quyết định. Nêu một lần, chủ dự án chốt.
4. **Soi ≥ 4 khung/giây** và tự xác nhận từng điểm cắt: máy dò `scene` báo nhầm khi
   độ sáng đổi (đèn bật ở khung 01 bị đếm là "cắt").
5. Mỗi khung ghi **"nguyên liệu khung này đòi"** → thành mục M0 phải CHẶN khi thiếu.
6. **Thứ tự đầu ra** (chủ dự án chốt 23/10): **(a) kịch bản mô tả video gốc** — từng cảnh
   bằng lời thường: giây, bối cảnh, đồ vật, hành động, ánh sáng/thời gian trong ngày, chữ,
   tiếng ("Cảnh 1, 0–2,7 s: lấy hộp từ kệ siêu thị, bỏ vào xe đẩy → Cảnh 3: mở hộp ở phòng
   khách ban ngày…"); **(b) vì sao viral, xếp hạng**; **(c) kịch bản mô tả cho sản phẩm**,
   cùng cảnh, chỉ đổi đồ vật; **(d) prompt** từng cảnh — sau cùng, khi (c) đã chốt và đủ
   nguyên liệu. Không nhảy thẳng tới prompt. Mẫu: `khung/reel-01-frostglow.md` +
   `video/v01-santa-spins-x-khung01/KICH-BAN.md`.

## Nhịp video do DỰNG, không do sinh (23/10)

Chủ dự án: *"tốc độ khung hình cũng như nội dung video không thể giống video mẫu"*. Đo clip A2: chuyển động TB **10,6**
(mẫu 8,6) — hình không chậm; 24 vs 30 fps mắt không thấy. Cái khác là **nhịp cắt**: A2 có **1 lần cắt / 10 s**, mẫu ~8. Muse ra
**tư liệu thô**: mỗi nhịp dài hơn cần, cuối clip hay kéo một đoạn chậm dài (A2: phòng khách 7 s).

1. **Clip Muse = tư liệu, không phải cảnh cuối.** Prompt cho mỗi nhịp **dài hơn cần ~1,5×** để có chỗ cắt.
2. **Máy dựng làm nhịp:** cắt từng nhịp về đúng độ dài của khung (0,5–2,6 s), tăng tốc nhẹ 1,05–1,2× nếu cần, xuất 30 fps.
   Bản nháp `thu-nghiem/muse/v01-nhap-nhip.mp4` (23/10): chỉ từ clip có sẵn đã cắt được ở 2,5 · 3,8 · 6,4 · 7,4 s.
3. **Giống khung = giống CẤU TRÚC** (thứ tự nhịp, vai trò, mốc cú bật, độ dài cảnh), **không** giống từng hình. Đồ vật,
   bối cảnh, sản phẩm là của mình.

## Luật riêng của thư mục này

- **Không commit video, ảnh, âm thanh.** `manager-ai` là repo hồ sơ, đẩy lên
  GitHub thường xuyên; tệp media làm phình repo mãi mãi. `.gitignore` đã chặn.
  Commit số đo và ghi chép, không commit nguyên liệu.
- **Ảnh người mẫu là dữ liệu cá nhân.** Không đẩy lên dịch vụ chứa tệp công
  khai, không commit, không gửi cho dịch vụ nào ngoài nhà cung cấp sinh video.
- **Khoá API để trong `.env`** (đã chặn trong `.gitignore`), không bao giờ dán
  vào cuộc trò chuyện.
- Khi giai đoạn 1 bắt đầu viết mã sản phẩm thật, cân nhắc tách repo riêng:
  README của `manager-ai` ghi repo này "chỉ giữ hiểu biết, không chứa mã".

## Liên quan

- `../shopify/` — các store Shopify của chủ dự án (Santa Spins, Memory Orb),
  thị trường Mỹ, tiếng Anh. Ứng viên tự nhiên cho sản phẩm thử ở giai đoạn 0.
  `../shopify/SCOPE-ADMIN-API.md` ghi quyền Admin API đã có.
