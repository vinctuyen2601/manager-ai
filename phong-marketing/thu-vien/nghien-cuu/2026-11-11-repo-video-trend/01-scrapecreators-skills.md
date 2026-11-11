# 01 · ScrapeCreators/social-media-research-skills · 11/11/2026

URL: https://github.com/ScrapeCreators/social-media-research-skills · **MIT** (tệp `LICENSE`, thêm ngày 26/8/2026)
· 6.231 sao · push cuối 26/8/2026 · đọc qua `gh api .../contents`, không cài.

## Đã đọc (toàn bộ, trừ phần bảng endpoint của skill API chỉ đọc lướt)
`README.md`, `AGENTS.md`, `CLAUDE.md`, `scripts/validate-skills.py`, và 13 tệp `skills/<tên>/SKILL.md`:
outlier-post-finder · transcript-intelligence · comment-mining · competitor-social-research · ad-library-teardown ·
trend-discovery · influencer-prospecting · audience-research · social-listening-brief · product-demand-research ·
creator-profile-teardown · content-repurposing · scrapecreators-api (đọc dòng 1–80 và 240–300).

**Thực trạng thật:** repo chỉ là 13 tệp markdown + 1 script kiểm frontmatter. **Không có thư mục `references/`**, không có
tệp "chuẩn bằng chứng" riêng. Luật bằng chứng nằm rải trong mục "Common Pitfalls" / "Quality Guardrails" của từng skill
và 6 "Design Principles" trong `README.md`. Mọi skill workflow đều khai `requires.env: SCRAPECREATORS_API_KEY`
trong frontmatter, nhưng **phần phương pháp tách khỏi API được**: API chỉ là lớp lấy dữ liệu.

## Skill nào làm được không cần API

| Skill | Phần phương pháp | Không API thì lấy dữ liệu bằng gì | Phụ thuộc API |
|---|---|---|---|
| outlier-post-finder | trung vị kênh, lift, 3 mức, tách nền tảng/định dạng | sếp gửi ≥ 10 link cùng kênh + số view đọc trên trang | thấp |
| comment-mining | 9 rổ phân loại, cụm theo tần suất × cường độ, trích nguyên văn | sếp chép/chụp bình luận | thấp |
| transcript-intelligence | 6 đoạn: hook/setup/claim/evidence/payoff/CTA, "content atoms" | `gvv boc` đã có faster-whisper | không |
| competitor-social-research | trụ nội dung, nhịp đăng, khoảng trống | làm tay, nguồn công khai | thấp |
| ad-library-teardown | 8 trục cụm thông điệp, "active ≠ thắng" | Meta Ad Library làm tay (gói §3.2) | thấp |
| trend-discovery | 2–4 nguồn, theo vùng, xếp theo sức bằng chứng | Creative Center làm tay | trung bình (feed trending) |
| creator-profile-teardown | định vị, trụ, "What Not to Copy" | làm tay | thấp |
| content-repurposing | content atoms → định dạng khác, ghi nguồn cảm hứng | không cần dữ liệu ngoài | không |
| product-demand-research | cụm đau/workaround/thay thế; chấm tần suất · cường độ · độ mới · dấu hiệu sẵn trả tiền | làm tay | thấp |
| social-listening-brief | cụm chủ đề + cảm xúc, "không phải theo dõi toàn diện" | làm tay | trung bình |
| influencer-prospecting | chấm 1–5 trên 6 trục | làm tay | trung bình |
| audience-research | khung chấm hợp thị trường | dữ liệu nhân khẩu chỉ có qua `/v1/tiktok/user/audience` (26 credit) | **cao** |
| scrapecreators-api | — (chỉ là bảng 110 endpoint) | — | **toàn bộ** |

Chi phí API (theo `skills/scrapecreators-api/SKILL.md` mục "Credit Costs"): đa số 1 credit/lần gọi; audience 26 credit;
transcript +10 credit khi bật `use_ai_as_fallback`; Google ads chi tiết 25 credit. **Giá tiền mỗi credit không ghi trong repo**
→ ⚠ chưa kiểm. Giới hạn ghi trong mục "Known Limitations": transcript chỉ cho video **< 2 phút**; tham số `region` **chỉ đổi
proxy, không lọc theo vùng**; Threads chỉ thấy 20–30 bài; Facebook 3 bài/trang. **Không thấy endpoint Douyin** trong bảng.

## Điểm rút ra theo từng skill

**outlier-post-finder** (`skills/outlier-post-finder/SKILL.md`, mục Workflow bước 3–5)
- Lấy ≥ 20 bài gần nhất; giữ số thô trước khi gộp điểm. Nền tảng video: view là chỉ số chính.
- Mốc = **trung vị** (không dùng trung bình, để một bài viral không kéo lệch). Tách mốc theo nền tảng và theo định dạng (reel/carousel, short/long).
- `view_lift = view_bài / trung_vị_view`; `engagement_lift` tương tự. Nhãn: **≥ 5× huge · 2–5× strong · 1,5–2× mild**.
- Dưới 10 bài → độ tin thấp. Không so view thô giữa kênh lớn và kênh nhỏ. Không trộn TikTok/IG/YouTube vào một mốc.
- "Why it worked" xét: hook, chủ đề, format, cảm xúc, tính thời sự, uy tín người nói, tranh cãi, bình luận cho thấy muốn mua.
- So với sổ tay §5 (≥ 700.000 view **và** ≥ 5× follower): cách của sổ tay so với **follower**, cách này so với **trung vị bài cùng kênh**.
  Hai cái đo hai thứ khác nhau; kênh mua follower hoặc kênh có follower "chết" thì trung vị đúng hơn. Mức bằng chứng: Thấp–Trung bình
  (phương pháp người làm nghề, repo không có dữ liệu kiểm ngưỡng 1,5/2/5).

**comment-mining** (`skills/comment-mining/SKILL.md`)
- Làm sạch nhẹ: bỏ spam/trùng, **giữ tiếng lóng, lỗi chính tả** nếu là ngôn ngữ khách.
- 9 rổ: câu hỏi · phản đối · phàn nàn/nỗi đau · khen · bối rối · yêu cầu/ý tính năng · ý định mua · tranh cãi · đùa/meme/văn hoá.
- Cụm chủ đề, chấm **tần suất** và **cường độ**, mỗi cụm có trích nguyên văn. Khuôn: bảng Theme · Type · Frequency · Intensity · Quote.
- Luật: "tách một bình luận ồn khỏi một mô thức lặp lại"; không suy rộng thị trường từ bình luận của một bài; nhắc thiên lệch do kiểm duyệt.
- Áp vào shop đồ câu: đây chính là nguồn cho `nganh/do-cau-vn/ngon-ngu-khach.md` (05 §1) và phản đối cho Biên kịch.

**competitor-social-research** (`skills/competitor-social-research/SKILL.md`, bước 5–6)
- Trục phân tích: trụ nội dung · format · kiểu hook · nhịp đăng · offer/CTA · có dùng mặt người sáng lập không · mẫu bình luận.
- Khoảng trống: chủ đề đối thủ né · **format thắng nhưng ít đối thủ dùng** · câu hỏi khán giả chưa ai trả lời · hook yếu/lặp · nền tảng bỏ trống.
- Luật: nói "có vẻ / gợi ý" khi suy chiến lược từ nội dung công khai; không xác nhận trùng tên hãng khi có nhiều hãng cùng tên.

**ad-library-teardown** (`skills/ad-library-teardown/SKILL.md`)
- Ghi mỗi quảng cáo: nền tảng, trang, ID, **ngày bắt đầu**, loại creative, chữ, headline, CTA, URL đích.
- Cụm thông điệp theo 8 trục: nỗi đau · persona · offer · proof · tính năng/lợi ích · phản đối được xử lý · so sánh/thay thế · khẩn cấp/giảm giá.
- Mục "What They Appear to Be Testing" → suy từ các phiên bản lặp. "Recommended Tests" chỉ từ mô thức lặp và khoảng trống, "not random ideas".
- Luật: **active ≠ đang thắng**; lặp lại thường là tín hiệu; không bịa chi tiêu/CVR/nhắm chọn. Cùng chiều gói §3.2.

**trend-discovery** (`skills/trend-discovery/SKILL.md`)
- 6 bước: định ngách + vùng + nền tảng + độ gấp → 2–4 nguồn → chuẩn hoá bằng chứng (URL, creator, số, ngày, âm thanh/hashtag)
  → cụm theo chủ đề/format/hook/âm thanh/meme/nỗi đau → **xếp theo sức bằng chứng, không theo view** → đổi thành ý làm được.
- Luật: không gọi trend từ một bài; trend TikTok rất theo quốc gia; không khuyên nhảy trend không hợp thương hiệu.
- Gói §3.10 đã đòi ≥ 3 nguồn độc lập — chặt hơn repo. Thứ mới: khuôn bảng `Trend | Platforms | Evidence | Why it matters | Content angle`.

**transcript-intelligence** (`skills/transcript-intelligence/SKILL.md`)
- Chia lời thành: hook · setup · claim chính · bằng chứng/ví dụ · payoff · CTA. Rút "content atoms" (ý đứng riêng được).
- Luật: không tóm từ tiêu đề khi được yêu cầu phân tích lời; lời AI bóc có thể sai → đánh dấu **approximate**; mỗi trích dẫn có URL.

**creator-profile-teardown** — khuôn có mục **"What Not to Copy"**; "không suy nhân quả từ hiệu quả".
**product-demand-research** — tín hiệu: "I wish" / "is there a tool" / "how do I", workaround, so sánh/thay thế; phán quyết Strong/Medium/Weak + độ tin riêng.
**content-repurposing** — "Adapt structure and insight, not unique wording"; "đừng bỏ hook gốc nếu nó là phần mạnh nhất" (với mình: bỏ, vì gói §3.6 — chỉ giữ **cơ chế** hook).
**influencer-prospecting** — 6 trục chấm 1–5: niche fit · audience fit · reach · engagement quality · brand safety · contactability.

## Mức đáng học: **cao** (phương pháp) · **không** (API)
Phương pháp ngắn, viết theo luồng, có khuôn đầu ra, khớp với lối tệp việc của PM. Không có số liệu kiểm chứng nào trong repo
→ mọi ngưỡng chỉ ở mức Thấp–Trung bình. Chép ý được (MIT, ghi nguồn).
