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
| 23/10 | **Chưa cài skill Hypit.** Chủ dự án sẽ tự cài; đừng tự chạy `npx skills add` |
| 23/10 | **3 sản phẩm thử:** Santa Spins, Santa's Memory Globe (store Shopify, thị trường Mỹ) và một món 17fishing có ảnh 1688 dính chữ Trung (ca ảnh xấu để thử M0) |
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
