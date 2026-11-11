# 04 · HddMedia/trendpulse-community · 11/11/2026

URL: https://github.com/HddMedia/trendpulse-community · **MIT** · 0 sao · **một commit duy nhất** "Initial release v0.1.0" (07/7/2026).

## Đã đọc (toàn bộ phần lõi)
`README.md` · `docs/SCORING.md` · `docs/DATA_SOURCES.md` · `docs/ROADMAP.md` · `src/trendpulse/services/feature_engine.py` ·
`services/scorer.py` · `services/matcher.py` · `services/pipeline.py` · `collectors/registry.py` · `collectors/provider_stub.py` ·
`collectors/manual.py` · `collectors/youtube.py` · `domain/models.py` · `tests/scenario/test_spam_campaign.py`, `test_organic_breakout.py`.

## Kiểm nhận định "TrendPulse chỉ có collector YouTube chạy được" → **ĐÚNG**, và còn yếu hơn thế
- `collectors/registry.py`: TikTok/Instagram/Facebook đều dựng bằng `ProviderBackedCollector`; `provider_stub.py` hàm `collect()`
  **trả `[]`** ("v0.1 intentionally does not scrape"). Có thêm `ManualSeedCollector` (`manual.py`) — chỉ để test/demo, nhập tay.
- YouTube (`collectors/youtube.py`) cần `YOUTUBE_API_KEY`; gọi `search.list` (order=date, 2 ngày gần nhất, theo từ khoá cấu hình)
  rồi `videos.list`. **Không lấy `shares`** (YouTube không trả) → engagement chỉ là (like + comment) / view.
- **Velocity thường bằng 0 trên thực tế**: lịch sử nằm trong RAM (`FeatureEngine._history`, deque 8 bản), không đọc lại từ DB;
  và mỗi chu kỳ là "discovery-only" — `ROADMAP.md` v0.2 ghi việc còn thiếu: *"revisit known content instead of discovery-only snapshots"*.
  Video chỉ có velocity khi tình cờ được tìm thấy lại ở chu kỳ sau, và mất hết khi khởi động lại.
- Cụm trend tính **trong một chu kỳ** (`pipeline.run_cycle` gọi `matcher.cluster(signals)` trên đúng lô vừa lấy), theo **hashtag đầu tiên**
  của mỗi video (`matcher.py`) — thuần chữ, không ngữ nghĩa.
- `mention_acceleration` cứng **1,0**, `baseline_anomaly` cứng **1,0** và **không được dùng** trong `scorer.py` (`docs/SCORING.md` tự nhận).

## Công thức thật trong mã

`feature_engine.py`:
```
velocity (view/giờ)   = (view_lần_sau − view_lần_trước) / số_giờ_giữa_hai_lần_đọc      ; ≤ 0 giờ → 0
acceleration          = velocity_hiện / velocity_trước ; nếu velocity_trước = 0: = 1,0 khi velocity = 0, ngược lại = 2,0 (cứng)
engagement_rate       = (like + comment + share) / max(view, 1)
creator_diversity     = số_creator_khác_nhau / số_video_trong_cụm
mention_velocity      = số_video_trong_cụm / max(khoảng_giờ_giữa_ngày_đăng_sớm_nhất_và_muộn_nhất, 0,25)
topic_expansion       = max(1, số_hashtag_khác_nhau / số_video)
```
`scorer.py` (`_scale_log(x, ref) = min(100, 100·ln(1+x)/ln(1+ref))`):
```
content_momentum   = 0,65·scale_log(max_velocity, 1.000.000) + 0,35·min(100, max_acceleration·20)
spread_momentum    = 0,70·scale_log(mention_velocity, 10.000) + 0,30·min(100, topic_expansion·25)
creator_diversity  = min(100, diversity·100)
engagement_quality = min(100, engagement_rate_trung_bình·1.000)        ; chạm trần ở 10 %
cross_platform     = min(100, (số_nền_tảng − 1)·40)
final = 0,30·content + 0,25·spread + 0,15·diversity + 0,10·engagement + 0,20·cross_platform
```
Giai đoạn (`stage_for`): < 40 Watching · 40 Rising · 55 Emerging · 70 Breakout · 85 Viral · ≥ 95 Mega Trend.

**Hệ quả tự tính từ công thức (không có trong tài liệu repo):**
- Chỉ một nền tảng chạy được → `cross_platform = 0` → **điểm tối đa 80** → hệ thống hiện tại **không bao giờ ra "Viral" hay "Mega Trend"**.
- 3 nền tảng mới được 80 điểm cross_platform; muốn 100 cần ≥ 4 nền tảng.
- "Giai đoạn" ở đây chỉ là **ngưỡng điểm cường độ**, không phải vòng đời: không có pha **đỉnh / bão hoà / giảm**. Không dùng thay được
  thang "mới nổi → tăng → đỉnh → bão hoà → giảm" của gói §3.10 / sổ tay VK11.
- Trọng số và ngưỡng do tác giả đặt; `README.md`: *"prototype defaults, not scientific claims"*; `ROADMAP.md` v0.5 mới có backtest.
- Hai bài test kịch bản chỉ kiểm "spam một nền tảng < 55" và "lan 3 nền tảng ≥ 70" bằng số nhập tay.

## Điểm rút ra dùng được (làm tay, không phần mềm)
1. **Đo velocity bằng 2 lần đọc số view có ghi ngày giờ** (cách nhau ≥ 12–24 giờ) → view/giờ; lần 3 → tăng tốc hay chậm lại.
   Hợp với gói §3.10 "số xem luôn đi kèm ngày đọc" và §3.4 "view đỉnh các bài cùng kiểu đang giảm". Mức: Cao về định nghĩa (là phép chia),
   chưa có ngưỡng nào đáng tin.
2. **Độ đa dạng creator = số kênh khác nhau / số video** trong cụm → nhiều video mà ít kênh = chiến dịch/seeding, không phải trend tự nhiên.
   Là phiên bản có số của luật "≥ 3 nguồn độc lập" (gói §3.10). Mức: Thấp (ý của repo, chưa kiểm).
3. Ghi cụm theo **khoá chuẩn hoá** (hashtag/từ khoá viết thường, bỏ dấu `#`) để đếm được qua các lần săn.

## Mức đáng học: **thấp** — 3 định nghĩa đo; không lấy điểm viral, không lấy giai đoạn
Trùng với sổ tay §7: "Không cộng thành một điểm viral duy nhất nếu chưa định nghĩa trọng số". TrendPulse làm đúng điều sổ tay cấm.
