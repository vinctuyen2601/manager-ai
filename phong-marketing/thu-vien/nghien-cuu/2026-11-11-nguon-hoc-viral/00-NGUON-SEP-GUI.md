# Viral Video Intelligence System
## Tài liệu nguồn học và khung kiến thức về cấu trúc video viral

- **Phiên bản:** 1.0
- **Ngày tổng hợp:** 11/11/2026
- **Mục đích:** Làm tài liệu nền để xây dựng Viral Video Structure Taxonomy và huấn luyện AI Agent phân tích, thiết kế, đánh giá video ngắn.
- **Phạm vi:** Tâm lý lan truyền, storytelling, cấu trúc video, hook, retention, hình ảnh, dựng phim, nền tảng và format ứng dụng đa ngành.

> Lưu ý: Không có cấu trúc nào bảo đảm video viral. Các framework trong tài liệu là mô hình phân tích và sáng tạo; cần kiểm chứng bằng dữ liệu thực tế theo ngành, đối tượng và nền tảng.

---

## 1. Nguồn chính thống từ nền tảng

### 1.1 YouTube

| Nguồn | Nội dung học | Liên kết |
|---|---|---|
| YouTube Creator Academy | Kiến thức dành cho nhà sáng tạo, phát triển kênh và nội dung | https://creatoracademy.youtube.com/ |
| YouTube Help – Measure key moments for audience retention | Đọc biểu đồ retention; hiểu intro, top moments, spikes và dips | https://support.google.com/youtube/answer/9314415?hl=en |
| YouTube Help – Understand your YouTube engagement | Watch time, average view duration, retention và tương tác | https://support.google.com/youtube/answer/9313698?hl=en |
| YouTube Analytics – Content tab tips | Cách diễn giải các khoảnh khắc giữ chân người xem | https://support.google.com/youtube/answer/12942217?hl=en |

**Cách khai thác cho Agent**
- Nhận diện đoạn mở đầu có khớp kỳ vọng từ tiêu đề/thumbnail hay không.
- Đánh dấu đoạn người xem rời đi (dips).
- Đánh dấu đoạn được xem lại hoặc chia sẻ (spikes), nhưng không mặc định spike luôn là tín hiệu tích cực: có thể người xem phải xem lại vì khó hiểu.
- So sánh video với các video có độ dài tương đương trên cùng kênh.
- Tách biệt chỉ số thu hút ban đầu, thời lượng xem và mức độ hài lòng.

### 1.2 TikTok

| Nguồn | Nội dung học | Liên kết |
|---|---|---|
| TikTok Creative Center | Thư viện quảng cáo, xu hướng, ví dụ sáng tạo và công cụ nghiên cứu | https://ads.tiktok.com/business/creativecenter/ |
| TikTok Creative Center – Trends | Khám phá hashtag, video và xu hướng theo thị trường/ngành | https://ads.tiktok.com/creative/creativeCenter/trends |
| About Creative Center | Giải thích các khu vực Inspiration, Top Ads, Trends và Creative Tools | https://ads.tiktok.com/help/article/creative-center?lang=en |
| How to use Trends | Hướng dẫn lọc xu hướng theo ngành và khoảng thời gian | https://ads.tiktok.com/resources/help/article/how-to-use-trends |
| TikTok for Business – Creative tools | Tổng quan công cụ sáng tạo của TikTok | https://ads.tiktok.com/business/vi/products/creative |

**Cách khai thác cho Agent**
- Lưu video tham khảo cùng thị trường, ngành, thời điểm và định dạng.
- Quan sát cách video mở đầu, cách đưa sản phẩm/thông điệp vào và thời điểm xuất hiện payoff.
- Phân tích các quảng cáo hiệu quả như case study, không sao chép máy móc.
- Theo dõi trend theo khu vực địa lý và ngành hàng; trend ở thị trường này không mặc nhiên phù hợp thị trường khác.

### 1.3 Meta / Facebook / Instagram

| Nguồn | Nội dung học | Liên kết |
|---|---|---|
| Meta Blueprint – Get discovered with Reels | Khóa học ngắn về tạo Reels để tiếp cận khách hàng mới và hiện tại | https://metaspark.facebookblueprint.com/student/path/219746-fb-ig-reels-course |
| Meta Blueprint | Trung tâm học tập về marketing và quảng cáo Meta | https://www.facebook.com/business/learn |

**Cách khai thác cho Agent**
- Học cách thiết kế nội dung phù hợp trải nghiệm Reels.
- Phân biệt video organic với video quảng cáo.
- Khi dùng tài liệu về thông số quảng cáo, luôn kiểm tra phiên bản và ngày cập nhật.

---

## 2. Nghiên cứu học thuật về tính lan truyền

### 2.1 What Makes Online Content Viral?

- **Tác giả:** Jonah Berger và Katherine L. Milkman
- **Tạp chí:** Journal of Marketing Research, 2012
- **DOI:** 10.1509/jmr.10.0353
- **Liên kết:** https://journals.sagepub.com/doi/10.1509/jmr.10.0353
- **Bản ghi DOI:** https://doi.org/10.1509/jmr.10.0353

**Điểm cần học**
- Mối liên hệ giữa cảm xúc và khả năng chia sẻ nội dung.
- Nội dung tạo kích thích cảm xúc cao như awe, anger hoặc anxiety có thể có xu hướng được chia sẻ nhiều hơn trong bối cảnh nghiên cứu.
- Không chỉ cảm xúc tích cực/tiêu cực; mức độ kích hoạt cảm xúc cũng quan trọng.
- Kết quả nghiên cứu không phải công thức bảo đảm viral cho mọi video hoặc mọi nền tảng.

### 2.2 What makes a video go viral? An analysis of emotional contagion and Internet memes

- **Tác giả:** Rosanna E. Guadagno, Daniel M. Rempala, Shannon Murphy, Bradley M. Okdie
- **Tạp chí:** Computers in Human Behavior, 2013
- **DOI:** 10.1016/j.chb.2013.04.016
- **Liên kết:** https://www.sciencedirect.com/science/article/pii/S0747563213001192

**Điểm cần học**
- Phản ứng cảm xúc của người xem có liên quan đến ý định lan truyền video.
- Xem xét vai trò của nguồn phát video và bối cảnh xã hội.
- Dùng nghiên cứu như nền tảng giả thuyết; cần kiểm tra lại bằng dữ liệu nền tảng hiện tại.

---

## 3. Sách nền tảng về viral, ý tưởng và storytelling

### 3.1 Contagious: Why Things Catch On — Jonah Berger

- Trang sách chính thức: https://www.simonandschuster.com/books/Contagious/Jonah-Berger/9781451686579
- Trang tác giả: https://jonahberger.com/books/

**Mô hình STEPPS**
1. Social Currency – Giá trị xã hội: chia sẻ khiến người chia sẻ trông thú vị, hiểu biết hoặc có gu.
2. Triggers – Tác nhân gợi nhớ: yếu tố trong đời sống khiến người ta nhớ đến nội dung.
3. Emotion – Cảm xúc: nội dung tạo phản ứng cảm xúc.
4. Public – Tính công khai: hành vi/nội dung dễ được nhìn thấy và bắt chước.
5. Practical Value – Giá trị thực tiễn: thông tin hữu ích đáng chia sẻ.
6. Stories – Câu chuyện: thông điệp được gói trong câu chuyện dễ kể lại.

**Ứng dụng**
- Đánh giá động lực chia sẻ, không chỉ khả năng giữ chân.
- Phân tích vì sao người xem muốn gửi video cho bạn bè hoặc đăng lại.
- Không ép mọi video phải có đủ sáu yếu tố.

### 3.2 Made to Stick — Chip Heath và Dan Heath

- Trang sách chính thức: https://www.penguinrandomhouse.com/books/77687/made-to-stick-by-chip-heath-and-dan-heath/

**Mô hình SUCCESs**
- Simple – Đơn giản.
- Unexpected – Bất ngờ.
- Concrete – Cụ thể.
- Credible – Đáng tin.
- Emotional – Có cảm xúc.
- Stories – Có câu chuyện.

**Ứng dụng**
- Làm thông điệp dễ hiểu và dễ nhớ.
- Tạo sự bất ngờ nhưng vẫn liên quan đến nội dung.
- Dùng chi tiết cụ thể thay cho lời nói chung chung.
- Làm rõ bằng chứng và tính đáng tin.

---

## 4. Học cấu trúc hình ảnh, quay và dựng phim

| Nguồn | Nội dung học | Liên kết |
|---|---|---|
| StudioBinder | Cinematography, shot types, visual storytelling, blocking và filmmaking | https://www.studiobinder.com/blog/ |
| Blackmagic Design – DaVinci Resolve Training | Tài liệu và bài tập chính thức về editing, color, Fusion và Fairlight audio | https://www.blackmagicdesign.com/products/davinciresolve/training |
| PremiumBeat Blog | Bài hướng dẫn về dựng phim, âm thanh, hậu kỳ và sản xuất video | https://www.premiumbeat.com/blog/ |

**Các chủ đề cần đưa vào thư viện**
- Visual hook: hình ảnh mở đầu.
- Shot composition: bố cục khung hình.
- Camera movement: chuyển động máy quay.
- Visual storytelling: kể chuyện bằng hình ảnh.
- Editing rhythm: nhịp dựng.
- Pattern interrupt: thay đổi nhịp/hình/âm thanh để làm mới sự chú ý.
- Sound design: âm thanh tạo cảm xúc và nhấn hành động.
- Text overlay: chữ trên màn hình.
- Transition: chuyển cảnh.
- Visual payoff: hình ảnh trả lời lời hứa hoặc sự tò mò đã tạo ra.

---

## 5. Taxonomy khởi đầu: các nhóm cấu trúc video

Taxonomy dưới đây là bộ phân loại làm việc ban đầu. Một video có thể thuộc nhiều nhóm hoặc kết hợp nhiều cấu trúc.

### A. Story-driven – Kể chuyện
- Story Arc: thiết lập → xung đột → cao trào → kết thúc.
- Plot Twist: dẫn người xem đến một kỳ vọng rồi đảo chiều hợp lý.
- POV Story: kể từ góc nhìn của một nhân vật.
- Transformation: trước → quá trình → sau.
- Day-in-the-life: một ngày/chuỗi trải nghiệm.
- Origin Story: nguồn gốc hoặc hành trình hình thành.
- Conflict & Resolution: vấn đề → nỗ lực → giải quyết.

### B. Educational – Giáo dục/chia sẻ kiến thức
- Explainer: giải thích một khái niệm.
- Listicle / Top X: danh sách có thứ tự.
- Tutorial: hướng dẫn từng bước.
- Myth Busting: nêu hiểu lầm → kiểm chứng → kết luận.
- Mistakes to Avoid: lỗi thường gặp → hậu quả → cách sửa.
- Case Study: bối cảnh → hành động → kết quả → bài học.
- Comparison: đặt hai hay nhiều lựa chọn cạnh nhau.

### C. Entertainment – Giải trí
- Reaction: phản ứng trước tình huống/nội dung.
- Prank / Surprise: bất ngờ hoặc trò đùa có bối cảnh phù hợp.
- Satisfying: hành động/quy trình tạo cảm giác thỏa mãn.
- Social Experiment: thử nghiệm hành vi xã hội.
- Challenge: thử thách với luật chơi rõ ràng.
- Duet / Remix / Response: phản hồi hoặc phát triển nội dung có sẵn.

### D. Commercial – Thương mại/bán hàng
- Product Showcase: trình diễn sản phẩm.
- Unboxing: mở hộp và khám phá.
- Demonstration: chứng minh sản phẩm hoạt động.
- Problem → Solution: vấn đề → giải pháp.
- Testimonial: trải nghiệm/đánh giá khách hàng.
- Comparison: so sánh sản phẩm hoặc phương án.
- Objection Handling: nêu nghi ngại → giải đáp bằng bằng chứng.
- Offer-led: ưu đãi → giá trị → hành động.

### E. Community & Identity – Cộng đồng/bản sắc
- Relatable Moment: tình huống người xem thấy mình trong đó.
- Insider Knowledge: kiến thức nội bộ/ngách.
- Shared Identity: sở thích hoặc bản sắc chung.
- Debate / Opinion: quan điểm có luận cứ, khơi gợi thảo luận.
- UGC Prompt: khuyến khích người xem đóng góp nội dung.

---

## 6. Các framework cấu trúc cần nghiên cứu

| Framework | Trình tự | Phù hợp |
|---|---|---|
| AIDA | Attention → Interest → Desire → Action | Quảng cáo, bán hàng |
| PAS | Problem → Agitation → Solution | Nêu vấn đề và giải pháp |
| BAB | Before → After → Bridge | Chuyển đổi, cải thiện |
| Story Arc | Setup → Conflict → Climax → Resolution | Kể chuyện |
| Open Loop | Mở câu hỏi → trì hoãn → giải đáp | Tạo tò mò và duy trì xem |
| Curiosity Gap | Điều đã biết ↔ điều muốn biết | Hook, nội dung khám phá |
| Pattern Interrupt | Thiết lập nhịp → phá nhịp → tiếp tục | Làm mới sự chú ý |
| Loop Ending | Kết thúc nối lại mở đầu | Video loop, xem lại |

**Cảnh báo:** Các framework trên là công cụ tư duy, không phải luật cứng. Không nên áp dụng AIDA/PAS vào mọi video giải trí hoặc biến mọi video thành quảng cáo.

---

## 7. Bộ khung phân tích một video

Mỗi video tham khảo nên được phân tích theo schema sau:

```yaml
video:
  id: ""
  url: ""
  platform: ""
  creator: ""
  industry: ""
  language: ""
  published_at: ""
  duration_seconds: null
  views_at_capture: null
  likes_at_capture: null
  comments_at_capture: null
  shares_at_capture: null
  captured_at: ""

classification:
  primary_format: ""
  secondary_formats: []
  objective: "" # awareness | education | entertainment | conversion
  audience: ""
  confidence: ""

structure:
  - start_seconds: 0
    end_seconds: 3
    segment: "hook"
    spoken_text: ""
    on_screen_text: ""
    visual_description: ""
    audio_description: ""
    narrative_function: ""
    psychological_mechanism: ""
  - start_seconds: 3
    end_seconds: 8
    segment: "development"
    spoken_text: ""
    on_screen_text: ""
    visual_description: ""
    audio_description: ""
    narrative_function: ""
    psychological_mechanism: ""

analysis:
  hook_type: ""
  curiosity_mechanism: ""
  emotional_triggers: []
  retention_devices: []
  pattern_interrupts: []
  payoff: ""
  cta: ""
  shareability_hypothesis: ""
  strengths: []
  weaknesses: []
  reusable_patterns: []
  industry_adaptations: []

evidence:
  source_links: []
  observed_facts: []
  hypotheses: []
  limitations: []
```

**Quy tắc phân tích**
- Phân biệt điều quan sát trực tiếp với suy luận của Agent.
- Không suy đoán lượt xem, retention hoặc tỷ lệ chuyển đổi nếu không có dữ liệu.
- Lượt xem cao không tự chứng minh cấu trúc là nguyên nhân thành công.
- Lưu ngày chụp số liệu vì view/like/comment thay đổi theo thời gian.
- Khi có thể, so sánh nhiều video cùng ngành, cùng nền tảng và khoảng thời gian.

---

## 8. Schema cho tài liệu kiến thức của từng format

Mỗi format nên có một file Markdown độc lập:

```yaml
---
id: "FORMAT_ID"
name: "Format Name"
category: "story-driven"
version: 1
status: "research"
evidence_level: "observed-pattern"
sources: []
related_formats: []
industries: []
platforms: []
---
```

Nội dung file:
1. Định nghĩa.
2. Mục tiêu truyền thông.
3. Cơ chế tâm lý.
4. Cấu trúc tổng quát.
5. Các biến thể.
6. Hook phù hợp.
7. Cách triển khai theo từng độ dài.
8. Kỹ thuật hình ảnh và dựng.
9. Ngành nghề phù hợp.
10. Ví dụ video đã phân tích.
11. Lỗi thường gặp.
12. Điều kiện không nên sử dụng.
13. Bằng chứng, nguồn tham khảo và mức độ tin cậy.

---

## 9. Cấu trúc thư mục đề xuất

```text
viral-video-intelligence/
├── README.md
├── 00-foundations/
│   ├── attention-economy.md
│   ├── psychology-of-virality.md
│   ├── storytelling-principles.md
│   └── platform-distribution.md
├── 01-taxonomy/
│   ├── taxonomy.md
│   ├── story-driven/
│   ├── educational/
│   ├── entertainment/
│   ├── commercial/
│   └── community-identity/
├── 02-hooks/
│   ├── verbal-hooks.md
│   ├── visual-hooks.md
│   └── audio-hooks.md
├── 03-retention/
│   ├── open-loops.md
│   ├── curiosity-gaps.md
│   ├── pattern-interrupts.md
│   └── payoff-design.md
├── 04-production/
│   ├── cinematography.md
│   ├── editing-rhythm.md
│   ├── sound-design.md
│   └── text-overlay.md
├── 05-platforms/
│   ├── youtube.md
│   ├── tiktok.md
│   ├── facebook-instagram.md
│   └── platform-comparison.md
├── 06-industries/
│   ├── ecommerce.md
│   ├── fashion.md
│   ├── food-beverage.md
│   ├── beauty.md
│   ├── fishing-outdoor.md
│   └── education.md
├── 07-case-studies/
│   ├── successful-videos/
│   ├── underperforming-videos/
│   └── comparative-studies/
├── 08-analysis-schemas/
│   ├── video-analysis.schema.yaml
│   └── format-knowledge-template.md
└── 09-evaluation/
    ├── analysis-rubric.md
    ├── evidence-quality.md
    └── learning-log.md
```

---

## 10. Lộ trình nghiên cứu đề xuất

### Phase 1 – Nền tảng
- Tâm lý chú ý và lan truyền.
- Storytelling.
- Các framework cấu trúc.
- Hook và curiosity.

### Phase 2 – Taxonomy
- Phân loại các format.
- Tách cấu trúc chính và biến thể.
- Xây dựng tài liệu riêng cho từng format.
- Xác định ngành và mục tiêu phù hợp.

### Phase 3 – Mổ xẻ video thực tế
- Thu thập video theo ngành và nền tảng.
- Chia video thành các phân đoạn có timestamp.
- Ghi lại lời thoại, chữ, hình ảnh, âm thanh và chức năng từng đoạn.
- Phân tích cả video hiệu quả và kém hiệu quả.

### Phase 4 – Đánh giá và học hỏi
- So sánh nhiều video có cùng mục tiêu.
- Kiểm tra giả thuyết bằng dữ liệu.
- Cập nhật mức độ tin cậy.
- Ghi nhận pattern tái sử dụng và điều kiện áp dụng.

### Phase 5 – Ứng dụng
- Nhận brief sản phẩm/ngành hàng.
- Chọn mục tiêu và đối tượng.
- Đề xuất format và hook.
- Tạo kịch bản, storyboard và kế hoạch sản xuất.
- Đánh giá kết quả sau khi đăng để cải thiện đề xuất tiếp theo.

---

## 11. Nguyên tắc chất lượng tri thức

Mọi nội dung trong Knowledge Base nên được gắn một trong các nhãn:

- `research-backed`: Có nghiên cứu học thuật hỗ trợ.
- `platform-recommended`: Nền tảng chính thức khuyến nghị.
- `practitioner-insight`: Kinh nghiệm chuyên gia/người thực hành.
- `observed-pattern`: Pattern quan sát từ tập video.
- `untested-hypothesis`: Giả thuyết chưa kiểm chứng.

Không biến một ví dụ thành quy luật. Không đánh đồng viral với hiệu quả kinh doanh. Không đánh đồng view với retention, share, lead hoặc conversion.

**Nguyên tắc thiết kế Agent:** Học nguyên lý trước, nhận diện cấu trúc sau, rồi mới lựa chọn và kết hợp công thức. Agent cần giải thích được vì sao chọn một cấu trúc, điều kiện nào khiến nó phù hợp và bằng chứng nào hỗ trợ lựa chọn đó.

---

## 12. Danh sách link nhanh

1. YouTube Creator Academy — https://creatoracademy.youtube.com/
2. YouTube Audience Retention — https://support.google.com/youtube/answer/9314415?hl=en
3. YouTube Engagement — https://support.google.com/youtube/answer/9313698?hl=en
4. TikTok Creative Center — https://ads.tiktok.com/business/creativecenter/
5. TikTok Trends — https://ads.tiktok.com/creative/creativeCenter/trends
6. TikTok Creative Center Help — https://ads.tiktok.com/help/article/creative-center?lang=en
7. Meta Blueprint Reels — https://metaspark.facebookblueprint.com/student/path/219746-fb-ig-reels-course
8. Berger & Milkman (2012) — https://doi.org/10.1509/jmr.10.0353
9. Guadagno et al. (2013) — https://doi.org/10.1016/j.chb.2013.04.016
10. Contagious — https://www.simonandschuster.com/books/Contagious/Jonah-Berger/9781451686579
11. Made to Stick — https://www.penguinrandomhouse.com/books/77687/made-to-stick-by-chip-heath-and-dan-heath/
12. StudioBinder — https://www.studiobinder.com/blog/
13. DaVinci Resolve Training — https://www.blackmagicdesign.com/products/davinciresolve/training
14. PremiumBeat — https://www.premiumbeat.com/blog/
15. Jonah Berger Books — https://jonahberger.com/books/
