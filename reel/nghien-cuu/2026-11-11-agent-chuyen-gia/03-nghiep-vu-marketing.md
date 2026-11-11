# Nhóm 3 Nghiệp vụ marketing: săn xu hướng và mổ xẻ quảng cáo — 11/11/2026

Mã tải về (chỉ đọc, không chạy): `scratchpad/repo-nc/nhom3/` của phiên này
(`/tmp/claude-1000/-home-tuyennvdev-my-project-manager-ai/b3979266-831c-470e-a888-71cc908aa8b0/scratchpad/repo-nc/nhom3/`).
Không gọi API của ScrapeCreators (không có khoá). Mọi nhận xét về độ phủ tiếng Việt là suy từ tài liệu, chưa đo.

## Xác minh repo

| Tên gợi ý | URL thật | Sao | Commit cuối (pushed_at) | Giấy phép | Có thật? |
|---|---|---|---|---|---|
| social-media-research-skills | https://github.com/ScrapeCreators/social-media-research-skills | 6.216 (API GitHub 11/11). Các trang danh mục ghi 338–392, đã cũ | 26/08/2026 | MIT | **Có, đúng mô tả.** 13 skill, toàn Markdown, 1.818 dòng. Mã duy nhất là `scripts/validate-skills.py` |
| Ad-Autopsy | https://github.com/shreelakham/Ad-Autopsy | 0 | 20/06/2026 (tạo 13/06) | **Không có** | **Có, nhưng là bài hackathon.** Đúng chuỗi mô tả (thu → xem video bằng AI → tổng hợp → khoảng trống → góc ngược). ~750 dòng Python. Thương hiệu gõ cứng Nivea đánh Dove |
| (thay thế cho Ad-Autopsy) | https://github.com/thatrebeccarae/claude-marketing, skill `competitor-ads-analyst` | 198 | 14/05/2026 | MIT | Có. Chỉ là tài liệu (SKILL + REFERENCE + EXAMPLES, 327 dòng), không có mã |

Các repo cùng tên khác tìm thấy qua API tìm kiếm GitHub: `anshuman-lang/ad-autopsy` (chẩn đoán chiến dịch hỏng, không phải mổ đối thủ),
`visualjox/ad-autopsy`, `visualjox/ad-autopsy-kit` (đã tải: chỉ `index.html` + ảnh PNG/GIF, là trang trưng bày, không có pipeline). Đều 0 sao.

---

## Cơ chế đáng lấy

### 1. Quy trình dựng hiểu biết ngành từ số 0 (câu hỏi a). Ghép từ 5 skill, repo không có sẵn skill này

**Sự thật cần biết trước:** không skill nào của ScrapeCreators tên là "học một ngành mới". Mỗi skill là một việc đơn lẻ.
Nhưng ghép 5 skill theo thứ tự dưới đây thì ra đúng thứ mình thiếu ở lỗi 1. Thứ tự ghép là **đề xuất của nhóm**, không phải của repo.

| Bước | Lấy từ skill | Thu gì | Lọc thế nào |
|---|---|---|---|
| 1. Định phạm vi | `trend-discovery` bước 1 | ngách, quốc gia, nền tảng, độ gấp | Repo nhắc riêng: "Do not ignore region. TikTok trends can be highly country-specific" |
| 2. Đối thủ | `competitor-social-research` bước 1–5 | hồ sơ, bài gần đây, nhịp đăng, trụ nội dung, dạng hook, CTA | Mỗi đối thủ so với **trung vị của chính nó**. Không so lượt xem thô giữa hãng to và hãng nhỏ |
| 3. Bài thắng | `outlier-post-finder` bước 2–6 | ≥ 20 bài/tài khoản, tách theo nền tảng và định dạng | `lift = view / trung vị`. ≥ 5× rất mạnh, 2–5× mạnh, 1,5–2× nhẹ. Dưới 10 bài thì ghi tin thấp |
| 4. Lời và bình luận của bài thắng | `transcript-intelligence`, `comment-mining` | lời nói nguyên văn, câu hỏi, phản đối, ý định mua | Bỏ spam, **giữ nguyên tiếng lóng và lỗi chính tả** |
| 5. Nói chuyện ngoài kênh của đối thủ | `social-listening-brief`, `product-demand-research` | Reddit, nhóm, tìm kiếm Google | "Do not claim market validation from a handful of comments" |
| 6. Quảng cáo | `ad-library-teardown` | Meta (lọc `country=VN`, `language=VI`), Google | Chạy lâu và lặp lại là dấu hiệu, không phải bằng chứng thắng |

Tệp nguồn: `skills/<tên>/SKILL.md`. Mỗi skill có cùng một khung: Overview · When to Use · nguồn dữ liệu · Workflow · **Output Format** (khuôn Markdown cố định) · Common Pitfalls.
Sáu nguyên tắc chung ở `README.md` mục Design Principles: chỉ dữ liệu công khai · có URL cho mọi trích dẫn · so với nền của chính tài khoản · giữ nguyên văn · kết bằng việc làm được.

**Giải lỗi:** 1 (chính). Một phần lỗi 3: mọi khuôn đầu ra đều có ô `Confidence: High/Medium/Low` và mục `Caveats`.

**Cách chuyển sang hệ mình.** Một tệp việc mới `viec/sxh-dung-nganh.md` cho vai Săn xu hướng. Chạy **một lần cho mỗi ngành**, ra thư mục `nganh/do-cau-vn/`.
Thứ tự đề xuất (thêm bước 0 và 7–8 mà repo không có):

0. **Đọc kho nội bộ trước khi ra ngoài** (lỗi 2). `17fishing/CLAUDE.md` mục 1–2, 7 · `GIONG-TRANG-SAN-PHAM.md` mục 7 · `giong/van-mau-chu-shop.txt` ·
   `gsc-trang` + `admin/keywords` · bảng `search_logs`. Ra danh sách "đã biết" và **từ khoá hạt giống**.
   Ví dụ đã có sẵn trong hồ sơ: đối thủ `vuadocau.com` (17fishing/CLAUDE.md dòng 104), ghế Zhongzhou là trang mạnh nhất.
1–6. Như bảng trên. Tìm bằng **tiếng Việt có dấu**. Tham số `region` của TikTok chỉ đặt proxy, **không lọc theo nước**
   (`skills/scrapecreators-api/SKILL.md` mục Common Optional Params; OpenAPI `/v1/tiktok/search/keyword` nói cùng ý).
   Nên muốn ra video Việt thì phải tìm bằng chữ Việt.
7. **Ghi ra bộ câu hỏi ngành cố định**, mỗi ô có nguồn, ngày, mức tin. Bộ câu hỏi này cũng là đề phỏng vấn cho lỗi 5.
8. **Sếp duyệt một lượt.** Câu nào sếp sửa thì ghi vào sổ lỗi của vai. Không có bước này thì hiểu biết ngành chỉ là hiểu biết của internet.

Định dạng ghi ra (đề xuất):
```
nganh/do-cau-vn/
  TONG-QUAN.md       bảng 12–15 câu hỏi ngành · trả lời · nguồn (URL/tệp) · ngày · mức tin
  doi-thu.md         mỗi đối thủ: kênh, trung vị view, 3 bài vượt nền, trụ nội dung, dạng hook, giá
  ngon-ngu-khach.md  câu nguyên văn · loại · nguồn · tần suất (xem cơ chế 2)
  mau-video.md       chỉ mục: một dòng một video/quảng cáo đã mổ nhẹ, trỏ sang khung/ nếu đã bóc sâu
  mua-vu.md          mùa cá, mùa câu, lễ, ngày đẩy hàng
  chua-biet.md       câu chưa trả lời được · nghiêng về X ~N % · kiểm bằng gì
```
**Chi phí.** Nếu dùng ScrapeCreators: phần lớn endpoint 1 credit/lượt (`scrapecreators-api/SKILL.md` mục Credit Costs).
Ước tính thô của nhóm cho một lượt dựng ngành: 5 đối thủ × ~5 lượt + 15 bài thắng × ~3 lượt (chi tiết, lời, bình luận) + ~20 lượt tìm kiếm ≈ **100–150 credit**.
Gói nhỏ nhất $47 / 25.000 credit; tài khoản mới có 100 credit miễn phí (theo kết quả tìm kiếm, **chưa mở trang giá**).
Không dùng API thì làm tay bằng WebSearch/WebFetch: rẻ nhưng chậm, và Meta Ad Library chặn máy đọc (gói vai mục 12 đã ghi 403).
**Mức tin:** đã đọc toàn bộ 13 SKILL.md. Chưa gọi API thật.

### 2. Comment mining: rút ngôn ngữ thật của khách (câu hỏi b)

**Làm gì** (`skills/comment-mining/SKILL.md`). Lấy bình luận kèm số like, ngày, URL. Làm sạch nhẹ. Xếp mỗi bình luận đáng giữ vào 9 giỏ:
câu hỏi · phản đối · than phiền · khen · bối rối · đề nghị · **ý định mua** · tranh cãi · đùa/văn hoá.
Gom thành chủ đề, chấm **tần suất × cường độ**, mỗi chủ đề một câu trích nguyên văn. Đầu ra có mục **"Exact Language to Reuse"**.
Rào chắn: ghi cỡ mẫu và mức tin · tách "một bình luận to tiếng" khỏi "mẫu lặp lại" · không suy ra cả thị trường từ một bài · không lưu thông tin định danh.
`product-demand-research` thêm các mẫu câu cần săn: "ước gì", "có cái nào", "làm sao để", cách chữa cháy tự chế, so sánh với món khác.

**So với kho của shop:**

| Nguồn | Cho biết gì | Thiếu gì |
|---|---|---|
| Search Console theo từ khoá | Khách gõ gì trên Google. Ngắn, thường bỏ dấu | **Chỉ thấy ~8 % hiển thị thật** (CLAUDE.md chung mục 6). Không có phản đối, không có lời chê |
| `search_logs` (ô tìm trên site) | Khách đã vào shop tìm gì | Rất ít dòng. 4 dòng đầu là truy vấn thử (17fishing/CLAUDE.md dòng 1152) |
| 5 câu Zalo (`GIONG-TRANG-SAN-PHAM.md` mục 7) | Câu hỏi trước khi chốt, lời chê, chỗ khách phân vân | Là **trí nhớ của chủ shop**, không phải tin nhắn gốc. Không có tần suất |
| Bình luận dưới video câu cá VN (chưa có) | Nguyên văn, tiếng nghề, phản đối, ý định mua, có đếm được | Nghiêng về người hay bình luận. Không phải khách của mình |

Hai lỗ của mình mà comment mining lấp được: **phản đối có tần suất** và **tiếng nghề nguyên văn**. Hai thứ này đúng là chỗ `GIONG-TRANG-SAN-PHAM.md` mục 7 nói "tôi không tự tạo ra được".
Thứ comment mining **không** thay được: câu Zalo của chính khách mình. Đó vẫn là nguồn hạng nhất.

**Cách chuyển.** Một tệp `nganh/do-cau-vn/ngon-ngu-khach.md`, một dòng một câu:
`câu nguyên văn · giỏ (9 giỏ trên) · sản phẩm/nhóm · nguồn (GSC / search_logs / Zalo-chủ-shop / URL bình luận) · số lần gặp · ngày`.
Vai Biên kịch và Chuyên viên SP đọc tệp này thay vì tự nghĩ câu.
Hai luật riêng cho tiếng Việt, lấy từ bẫy đã trả giá (CLAUDE.md chung mục 6): **gom chủ đề không bỏ dấu** ("lông" khác "lồng") và **đếm theo tập từ**, không theo chuỗi con.
**Giải lỗi:** 1, 2. **Chi phí:** ~1 credit cho mỗi trang bình luận. Làm tay thì đọc bình luận YouTube qua WebFetch được ở mức vài chục dòng.
**Mức tin:** đã đọc tài liệu skill. Chưa thử trên bình luận tiếng Việt.

### 3. Mổ quảng cáo hai tầng: rộng nhẹ cho nhiều quảng cáo, sâu cho một hai cái (câu hỏi c)

Đây là phát hiện quan trọng nhất của nhóm. **Ba nguồn đều mổ ở tầng "nhiều quảng cáo của một đối thủ"**. Thư viện khung của mình chỉ có tầng "một video thật sâu".

| | Khung của mình (`khung/*.md` + `gvv boc`) | Ba nguồn đã đọc |
|---|---|---|
| Đơn vị | 1 video | 10–20 quảng cáo của 3–5 đối thủ |
| Độ sâu | Theo giây, điểm cắt đo ở 4 khung/giây, LÕI/Phụ, nguyên liệu, tầng 3 | Mỗi quảng cáo vài ô: hook, angle, offer, CTA, định dạng, ngày chạy |
| Câu hỏi trả lời | "Làm lại video này thế nào" | "Đối thủ đang nói gì, lặp lại cái gì, **bỏ trống cái gì**" |

Các mảnh đáng lấy cho tầng rộng:
- **Bảng thông điệp × đối thủ có cột "Khoảng trống?"** (`claude-marketing/skills/competitor-ads-analyst/REFERENCE.md`, mục Messaging Matrix). Hàng là nỗi đau/lợi ích, cột là đối thủ, ô ghi "chính / có nhắc / không dùng".
  Áp vào đồ câu: hàng có thể là "ném xa", "bền nước mặn", "giá rẻ hơn hàng hãng", "dễ cho người mới", "bảo hành".
- **Phân loại mỗi quảng cáo theo loại thông điệp và tầng phễu** (cùng tệp, mục Categorize): nỗi đau / giải pháp / bằng chứng / ưu đãi / dạy / thương hiệu × đầu / giữa / cuối phễu.
- **Mục "What They Appear to Be Testing"** (`ad-library-teardown/SKILL.md`): quảng cáo lặp lại, nhiều phiên bản. Cùng ý với phát hiện thân trùng của khung 02 (SSIM).
- **Mỗi mẫu phải kèm danh sách ad_id làm chứng** (`Ad-Autopsy/contracts.md`, trường `patterns[].ad_ids`, ví dụ "6 of 8 ads open with a problem-shot"). Mẫu không có id chứng thì không được viết.
- **Tách quan sát khỏi đề xuất** (`competitor-ads-analyst/SKILL.md` Key Principles 3) và "Date everything".

**Cách chuyển.** Thêm vào việc DT (`viec/sxh-theo-doi-doi-thu.md`) một bước "mổ nhẹ": mỗi quảng cáo một dòng trong `nganh/do-cau-vn/mau-video.md`,
lấy từ chữ quảng cáo + lời nói + 1–3 khung hình, **không chạy `gvv boc`**. Xong 10–20 dòng thì viết bảng thông điệp × đối thủ.
Chỉ 1–2 quảng cáo đứng đầu (chạy lâu, nhiều bản, hoặc lift cao) mới đi tiếp sang BK, bóc sâu thành khung.
Dòng `Angle:` mà gói vai mục 3.5 đang đòi thêm chính là cột angle của tầng rộng. Hai tầng nối nhau qua cột này.
**Giải lỗi:** 1 (biết đối thủ đang nói gì, giá ra sao), một phần lỗi 3 (khoảng trống có đếm được thì mới nghiêng được).
**Chi phí:** chỉ là thêm một khuôn bảng và một bước trong tệp việc. Lấy dữ liệu thì như cơ chế 1.
**Mức tin:** đã đọc mã Ad-Autopsy, đã đọc tài liệu hai skill còn lại.

### 4. Bài học ngược từ mã Ad-Autopsy: tổng hợp bịa khi đầu vào rỗng

Đọc mã mới thấy, README không nói.
- `synthesize.py` dòng 45–60, hàm `load_per_ad()`: đọc `segs = v.get("unified", [])` rồi **chỉ giữ `ad_id`**, vứt hết hook, cảm xúc, lời nói.
  LLM nhận một danh sách toàn id.
- Kết quả có lưu trong repo, `cache/autopsy.json`: mục `patterns` tự thừa nhận "dataset contains only ad_id identifiers… recurrence analysis requires substantive content data".
  Vậy mà `gap`, `opportunity` và kịch bản `counter_creative` vẫn được viết đầy đủ và tự tin, từ hiểu biết sẵn có của model về Dove. Prompt có câu "never invent metrics" mà không chặn được.
- `perceive.py` dòng 13–23: JSON hỏng thì trả về "—" **không báo lỗi**. Dòng 92: ghép cảnh vào **từng đoạn lời**, nên cảnh không có lời bị mất hẳn. Video không lời thì rỗng toàn bộ.
- `scraper.py` dòng 58–60: thực ra kéo **bài đăng thường** từ hồ sơ TikTok (10 bài), không phải quảng cáo.

**Giải lỗi:** 3, theo chiều ngược. "Có chính kiến" mà không gắn với bằng chứng đếm được thì thành bịa. Đây đúng là rủi ro khi sửa lỗi 3 quá tay.
**Cách chuyển.** Một luật cổng cho mọi bước tổng hợp: **đếm bằng chứng trước khi viết kết luận**. Ví dụ "mẫu X: 6/8 quảng cáo, id …".
Dưới 3 bằng chứng thì chỉ được viết "nghiêng về X ~N %", không được viết khoảng trống hay góc ngược.
Agent kiểm (hoặc Trưởng phòng) đếm lại số id. Chi phí: một dòng trong bảng kiểm. **Mức tin:** đã đọc mã và tệp kết quả.

### 5. Khuôn skill gọn và trình kiểm khuôn

`AGENTS.md` mục Authoring: skill "workflow-first", không đổ danh sách endpoint. Phần gọi API gom về **một** skill định tuyến (`scrapecreators-api`), các skill nghiệp vụ trỏ sang.
`scripts/validate-skills.py`: kiểm frontmatter có `name`, `description` ≤ 1024 ký tự, thân không rỗng.
Gói vai của mình dài 400–500 dòng. Skill của họ 80–150 dòng, vì công cụ tách riêng.
**Cách chuyển:** chỉ lấy ý. Bảng công cụ ở mục 8 các gói vai có thể gom về một tệp `reel/cong-cu.md` dùng chung cho 6 vai. **Giải lỗi:** không trực tiếp, giảm tải ngữ cảnh.
**Mức tin:** đã đọc mã.

---

## Câu hỏi (d): công cụ, khoá, có chạy được trong Claude Code không

| Repo | Cần gì | Chạy trong Claude Code? |
|---|---|---|
| social-media-research-skills | `SCRAPECREATORS_API_KEY`. Gọi `curl` với header `x-api-key`. Skill khai `allowed-tools: Bash, Read, Write, WebFetch`. Có `.claude-plugin/plugin.json` | **Có**, đúng định dạng skill. Nhưng ta không cài nguyên gói: chỉ chép ý vào tệp việc. Khoá phải đặt ở biến môi trường, không dán vào chat (CLAUDE.md chung mục 3) |
| Ad-Autopsy | `BRIGHTDATA_API_KEY`, `VIDEO_DB_API_KEY`, `TOKENROUTER_API_KEY` + Kimi K2.5, Flask, React, `yt-dlp`, python-pptx | **Không hợp.** Ba dịch vụ trả tiền, máy chủ Flask, và đẩy video lên đám mây VideoDB. Không giấy phép nên cũng không được chép mã |
| claude-marketing / competitor-ads-analyst | Không cần khoá. Agent tự mở thư viện quảng cáo trên web | Có, nhưng phần "tự mở" sẽ vấp 403 của Meta (gói vai mục 12 đã gặp) |

Giới hạn của ScrapeCreators đối với **đồ câu Việt Nam** (đọc từ `scrapecreators-api/SKILL.md` và OpenAPI):
- **Không có Zalo, không có Shopee.** Có TikTok Shop (tìm sản phẩm, đánh giá). Giá thị trường Shopee vẫn phải làm tay.
- **Không có TikTok Ad Library / Creative Center.** Quảng cáo chỉ có Meta, Google, LinkedIn, Reddit.
- Meta Ad Library lọc được `country=VN`, `language`, `status`, `media_type`, khoảng ngày (OpenAPI `/v1/facebook/adLibrary/search/ads`, đã mở).
- Bài nhóm Facebook: chỉ **3 bài mỗi trang**. Cộng đồng câu cá Việt Nam sống nhiều ở nhóm Facebook, nên chỗ này tốn credit nhất.
- Lời nói video: chỉ video **dưới 2 phút**. Video hướng dẫn câu cá dài trên YouTube thì dùng `/v1/youtube/video/transcript`, cũng có giới hạn đó.

---

## Không nên lấy (và vì sao)

- **Mã Ad-Autopsy.** Bài hackathon 1 tuần, 0 sao, không giấy phép, thương hiệu gõ cứng, bước tổng hợp bị lỗi mất dữ liệu (cơ chế 4). Chỉ lấy hình dạng JSON `patterns[].ad_ids` và bài học ngược.
- **Lược đồ mổ cảnh của Ad-Autopsy** (`perceive.py` dòng 78–84: hook, cảm xúc, 4 loại hình, tín hiệu lời). Nông hơn khung của mình nhiều. Còn hỏi "có hút trong 10 giây đầu không" cho **mọi** cảnh, kể cả cảnh giây 20.
- **Bước sinh deck .pptx.** Không ai trong hệ thống của mình cần slide.
- **Bảng phân loại nỗi đau và giá trị của `competitor-ads-analyst`** (Time, Money, Complexity, Scale, Integration…). Viết cho SaaS. Đồ câu cần bộ hàng riêng do vai tự dựng từ comment mining.
- **`influencer-prospecting`, `content-repurposing`, `audience-research` (phần nhân khẩu học 26 credit/lượt).** Không phục vụ 5 lỗi hiện tại.
- **Cài nguyên gói skill ScrapeCreators.** Gói skill của họ tối ưu cho việc bán API. Mình cần quy trình viết bằng tiếng Việt, gắn kho nội bộ ở bước 0, và cổng đếm bằng chứng mà gói của họ không có.

---

## Đề xuất cho kiến trúc của mình (xếp ưu tiên)

1. **Tệp việc `viec/sxh-dung-nganh.md`** theo quy trình 0–8 ở cơ chế 1. Bước 0 bắt buộc đọc kho nội bộ. Đầu ra là thư mục `nganh/do-cau-vn/` 6 tệp. Đây là lớp "gói NGÀNH dùng chung" trong hướng thiết kế đang bàn.
2. **`nganh/do-cau-vn/ngon-ngu-khach.md`** gộp 4 nguồn (GSC, search_logs, câu Zalo của chủ shop, bình luận công khai) vào một bảng có cột nguồn và tần suất. Biên kịch và Chuyên viên SP đọc chung.
3. **Mổ quảng cáo hai tầng.** Thêm bước mổ nhẹ + bảng thông điệp × đối thủ có cột khoảng trống vào việc DT. Chỉ quảng cáo đứng đầu mới sang BK bóc sâu.
4. **Luật cổng "đếm bằng chứng trước khi kết luận"** cho mọi bước tổng hợp, kèm ngưỡng ≥ 3 bằng chứng. Đặt song song với luật "nghiêng về X ~N %" để sửa lỗi 3 mà không đẻ ra lỗi bịa.
5. **Bộ câu hỏi ngành trong `TONG-QUAN.md` dùng luôn làm đề phỏng vấn** (lỗi 5). Agent trả lời không cần mở tệp thì đạt.
6. **Thử ScrapeCreators bằng 100 credit miễn phí** trước khi mua: một kênh YouTube câu cá VN + một tìm kiếm Meta Ad Library `country=VN`. Đo xem có ra bình luận tiếng Việt dùng được không. Cần sếp tạo tài khoản và đặt khoá.

---

## Câu hỏi còn mở

1. Sếp có cho dùng dịch vụ cào dữ liệu trả tiền (ScrapeCreators) không, hay vai chỉ làm tay bằng WebSearch/WebFetch?
2. Sếp có lưu được **tin nhắn Zalo gốc** của khách (xuất hoặc chụp) không? Đó là nguồn ngôn ngữ khách tốt nhất, hơn mọi bình luận công khai.
3. Đối thủ chính của 17fishing là ai, ngoài `vuadocau.com`? Ai chạy quảng cáo Facebook nhiều nhất? Câu này sếp trả lời 1 phút, máy mò thì tốn hàng chục lượt.
4. Chưa kiểm: tìm TikTok bằng tiếng Việt qua ScrapeCreators có ra video Việt không, khi `region` chỉ là proxy.
5. Chưa kiểm: giá ScrapeCreators ($47 / 25.000 credit, 100 credit miễn phí) lấy từ kết quả tìm kiếm, chưa mở trang giá.
6. Ước tính 100–150 credit cho một lượt dựng ngành là ước tính của nhóm, chưa đo.

---

## Nguồn

- ScrapeCreators/social-media-research-skills (MIT, tải 11/11/2026): `README.md`, `AGENTS.md`, `CLAUDE.md`, `.claude-plugin/plugin.json`, `scripts/validate-skills.py`,
  `skills/{trend-discovery, comment-mining, ad-library-teardown, audience-research, competitor-social-research, social-listening-brief, product-demand-research, outlier-post-finder, transcript-intelligence, scrapecreators-api}/SKILL.md`
- OpenAPI ScrapeCreators (đã mở): https://docs.scrapecreators.com/v1/facebook/adLibrary/search/ads/openapi.json · https://docs.scrapecreators.com/v1/tiktok/search/keyword/openapi.json
- shreelakham/Ad-Autopsy (không giấy phép, tải 11/11/2026): `README.md`, `contracts.md`, `scraper.py`, `perceive.py`, `synthesize.py`, `deck.py`, `cache/autopsy.json`, `cache/output/*.json`
- thatrebeccarae/claude-marketing (MIT): `skills/competitor-ads-analyst/SKILL.md`, `REFERENCE.md`
- visualjox/ad-autopsy, visualjox/ad-autopsy-kit: đã tải, chỉ có HTML + ảnh
- Giá ScrapeCreators (chỉ qua kết quả tìm kiếm): https://scrapecreators.com/credits-never-expire · https://aisotools.com/pricing/scrape-creators
- Nội bộ: `reel/chuyen-vien/san-xu-huong.md`, `reel/chuyen-vien/viec/sxh-*.md`, `reel/khung/reel-02-frostglow-hook-me.md`, `17fishing/CLAUDE.md`, `17fishing/GIONG-TRANG-SAN-PHAM.md`, `17fishing/giong/README.md`, `~/my-project/CLAUDE.md` mục 6
