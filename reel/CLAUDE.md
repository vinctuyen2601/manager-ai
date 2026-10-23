# Máy làm Reel — hồ sơ dự án

Tài sản thứ tư, bắt đầu 23/10/2026. **Không phải công cụ của 17fishing hay
GaRutin**: một tài sản AI độc lập, đưa vào một sản phẩm + một reel viral mẫu,
ra video dọc 9:16 tiếng Anh (Mỹ) trong một thư mục.

Đọc `~/my-project/CLAUDE.md` trước (vai trò, quyền hạn, bẫy chung), rồi tệp này.

## Tài liệu gốc — đọc trước khi làm gì

| Tài liệu | Ở đâu | Dùng khi |
|---|---|---|
| Kế hoạch sản phẩm (yêu cầu FR/NFR, module M0–M9, UI, kiến trúc, lộ trình) | Bản gốc: https://claude.ai/artifact/AMhN1DQDB32o14HAAmA1da · bản chép: `KE-HOACH.md` | Mọi quyết định về phạm vi và thứ tự làm. Sửa ở bản gốc rồi chép lại |
| Bản thiết kế sơ đồ (bản 6) | https://claude.ai/artifact/Poxf3b8AzDytHAyMC7HhTG | Nhìn nhanh luồng và lý do loại các repo khác |
| Việc giai đoạn 0 và kết quả đo | `GIAI-DOAN-0.md` cùng thư mục | Đang làm giai đoạn 0 |

Kế hoạch là nguồn đúng. Tệp này chỉ giữ những gì một phiên mới cần để không
đi lạc, và những quyết định đã chốt với chủ dự án.

## Đã chốt với chủ dự án

| Ngày | Quyết định |
|---|---|
| 23/10 | Khung là **skill Hypit** (hypit-ai/hypit) chạy trong Claude Code. Đã đọc mã và loại ClipForge (nhân bản viral gần như giả, dán link trả 6 cảnh gõ cứng), ai-video-studio (2 commit, đẩy ảnh lên uguu.se công khai), ArcReel (không có nhân bản viral, AGPL), Pixelle-Video |
| 23/10 | **Tiếng Anh (Mỹ) trước.** Tiếng Việt là gói tuỳ chọn làm sau |
| 23/10 | **Không tự đăng mạng xã hội.** Đầu ra là thư mục video + đường dẫn; chủ dự án tự đăng |
| 23/10 | **Mọi ngách sản phẩm.** Nguồn sản phẩm chính là Shopify Admin API, phụ là nhập tay |
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
| 23/10 | Muse (muse.ai) chỉ là nhánh thử, chạy **bên trong** Muse. Không dùng useapi.net, AutoMuse (giao mật khẩu, cookie Meta cho bên thứ ba) |

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
