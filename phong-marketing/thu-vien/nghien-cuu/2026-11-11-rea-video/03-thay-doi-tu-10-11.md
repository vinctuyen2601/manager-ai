# 03 · rea-video đã đổi gì từ 10/11/2026

Nguồn: `gh api repos/JuneYaooo/rea-video/commits?since=2026-11-09` và patch của từng commit. Đầu nhánh: `3669923` (11/11 08:55 UTC).
Cột "Đáng lấy": **Có** = đưa vào tệp phòng · **Ý** = học ý, không cài · **Không**.

| Ngày (UTC) | Commit | Đổi gì (đọc patch) | Đáng lấy | Cho ai |
|---|---|---|---|---|
| 10/11 16:38 | `e200a5e` | Gửi User-Agent khi gọi VLM | Không | — |
| 10/11 16:38–16:39 | `f691cb6`, `fabf832` | Clip thử chuyển động viết bằng ffmpeg (test) | Không | — |
| 10/11 17:19 | `89e27e0` | Nhãn trên ảnh theo ngôn ngữ báo cáo. `install_skill.sh` tự chọn Python 3.10–3.14 | Không | — |
| 11/11 02:32 | `4828db5` | Cài OCR gọn hơn (rapidocr 3 cho Python ≥ 3.13, gỡ `opencv-python` xung đột). Dò phụ đề và âm tốt hơn. Báo cáo tiếng Anh sạch hơn | Ý: cài thì đọc `setup.md` mới | Thợ kỹ thuật (nếu cài) |
| 11/11 04:07 | `89e81a5` | **Held-tone**: một cao độ giữ suốt (bíp, còi, ù 50 Hz) không còn bị gọi là nhạc. **Không có trống → `no_beat`**, không báo BPM giả. Tách tiếng chạy **song song** với phân tích shot | **Có** (luật đo âm) | Săn xu hướng, Thợ dựng |
| 11/11 05:22 | `e054db5` | Bền hơn khi giải mã và gọi VLM (400/413 = nội dung bị từ chối, không phải dịch vụ chết; cache hỏng thì hỏi lại). **Provenance**: tên mô hình chỉ có trong tiêu đề/mô tả **do người gõ** thì chỉ ghi "yếu", không cộng điểm. So tên theo đầu từ ("vidu" không khớp "individual") | **Có** (luật bằng chứng) | Săn xu hướng |
| 11/11 06:01 | `c173a41` | Ghi tài liệu `--max-vlm-shots` (mặc định 60 lần gọi) | Ý | — |
| 11/11 06:12 | `c8359fc` | **Narrative line**: 8 vai mỗi shot (hook, context, info, proof, turn, payoff, cta, mood), gộp thành chuỗi bước. SKILL.md dặn: *giữ trình tự, thay ca và vật liệu của mình, đừng chỉ đổi nhân vật chính* | **Có** | Biên kịch, Săn xu hướng |
| 11/11 06:48 | `03d2e2a` | **ASR tuỳ chọn** `[asr]` = sherpa-onnx + SenseVoice (~160 MB), chạy trên kênh giọng. Báo cáo ghi "chỉ gửi a/n shot cho VLM". Eval chặt hơn | Ý: **chạy ASR trên kênh giọng**. Không dùng SenseVoice (**không có tiếng Việt**) | Săn xu hướng |
| 11/11 06:53 | `5333662` | Dọn `eval/RESULTS.md` (−344 dòng nhật ký). README sửa câu *"shot boundaries are all correct"* thành **"recall 95 %, precision 94 % trên 9 clip gắn nhãn tay"**. Bảng chính đổi sang số **giải mã lại từ đầu**: 98,3 / 99,6 / 98,9 % | **Có**: sửa số trong gói | Săn xu hướng |
| 11/11 07:04 | `9779c88` | Nút nhóm WeChat trên README | Không | — |
| 11/11 07:24 | `6f2d38e` | **README tiếng Việt** (`i18n/README_vi.md`, 243 dòng) + sơ đồ `docs/rea-flow_vi.svg`. PR #33 của cộng đồng (Huyvux12), tác giả sửa nhãn ở `3669923` | Ý: sếp đọc nhanh được. Bản dịch cộng đồng, chưa kiểm từng câu | Sếp |
| 11/11 07:53 | `ec2499c` | Escape dấu `\|` trong bảng ca ai_daihuo | Không | — |

## Thay đổi có từ trước nhưng phòng chưa ghi (thấy trong `CHANGELOG.md` hiện tại)

- **Viết lại dò điểm cắt**: cắt nhảy / punch-in, bỏ chớp lửa và đèn nháy, giữ shot 0,12 s giữa hai cắt sạch, giữ biên mạnh nhất chứ không lấy biên đầu.
  Recall 79 → 95 %, precision 91 → 94 %. Clip bán hàng: 44 → 94 %.
  → **Bằng chứng mạnh nhất** cho ý G1 / G1b ở `02-…`.
- `assemble`: co giãn **cả clip** sinh ra cho vừa shot gốc (≤ 3× nhanh, ≤ 1,25× chậm). Gói Thợ dựng §3.6 đã ghi.
- Lớp đóng gói **theo câu thoại**: chữ hoa mỹ neo vào câu chứ không neo vào giây. Lớp thường trú đè một lần. `remake-plan` cảnh báo `overlays_in_frames` (khung tham chiếu còn chữ gốc). Gói Thợ dựng §3.6 và Đạo diễn đã ghi.

## Phải sửa trong gói phòng (đề xuất, chưa sửa)

1. `san-xu-huong.md` §3.7 "Bài học về độ tin": câu *"98–100 % trên tệp gốc"* → **98,3 / 99,6 / 98,9 %** (giải mã lại). Thêm dòng
   **"lần đầu gặp video bán hàng Douyin: chỉ máy 46,4 %, + Gemini 63,9 %, + agent xem ảnh 97,5 %; talking head đêm chỉ máy 51 %"**. Đây là loại video gần mình nhất.
2. `san-xu-huong.md` §3.7, dòng 205: "~6,2k sao, cập nhật 10/11" → ★6964, đầu nhánh `3669923` 11/11.
3. `san-xu-huong.md` §8, dòng rea-video: "tải model tách tiếng ~67 MB" → thêm *"ASR của nó không có tiếng Việt; OCR chỉ zh/ja"*.
4. `tho-dung.md` §3.5, dòng "Cắt theo phách": giữ nguyên, thêm *"không có trống thì không có BPM (no_beat); một cao độ giữ suốt thì không phải nhạc"*.
