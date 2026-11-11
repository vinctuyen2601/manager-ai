# 01 · Pipeline thật của rea-video (đọc mã)

Repo JuneYaooo/rea-video, nhánh `main`, commit đầu `3669923` (11/11/2026 08:55 UTC), Apache-2.0, ★6964, gói `rea-video 0.1.0`.
Chỉ đọc qua `gh api …/contents` và `…/git/trees`. Không clone, không chạy. Mọi nhận định dưới đây là **đọc từ mã**, chưa chạy thử trên máy mình.

## 0. Tổng quan một lần chạy `rea-video decompose video.mp4 -o out/`

Hàm `decompose()` trong `rea_video/pipeline.py` (dòng 87–343). Mặc định: `use_vlm=False`, `ocr=True`, `stems=True`, `packaging=True`,
`asr=True` (ASR chỉ chạy khi đã cài thêm `sherpa-onnx`), `max_shots_vlm=60`, `lang="zh"` (có `--lang en`).

| # | Bước | Tệp mã | Công cụ thật | Đầu ra (khoá trong `breakdown.json`) |
|---|---|---|---|---|
| 1 | Đọc thông số + nguồn gốc | `media.py`, `probe.py` | `ffprobe` (bắt buộc có trên PATH, `require_tools`) + quét byte trong container | `source{…}`, `provenance{hints, evidence}` |
| 2 | Dò điểm cắt | `shots.py` | **OpenCV + numpy**, ảnh thu nhỏ rộng 96 px của *mọi khung*. **Không dùng `ffmpeg scene`** | `shots[].start/end/transition_in/boundary_score/beats/flash_s` |
| 3 | Âm thanh | `audio.py` | **chỉ numpy** (tự viết STFT, HPSS, tự tương quan; không librosa/scipy) | `audio{voice, music{tempo_bpm, beats, key, section_changes}, sfx, cuts_on_beat_ratio, beat_synced_edit, energy_curve}` |
| 4 | Tách tiếng (chạy nền song song) | `stems.py` | UVR MDX-Net "Inst HQ 3" ONNX ~67 MB, `onnxruntime` CPU | `stems/original.wav`, `vocals.wav`, `music.wav` |
| 5 | Lớp đóng gói | `packaging.py`, `overlay.py` | RapidOCR (ONNX, PP-OCR) ~2 khung/s, tối đa 240 lần; khung xám dày 10 khung/s để chỉnh mốc | `packaging{text_cues, stickers, sfx_anchored}`, `subtitles.srt`, `overlays.ass`, `timeline.json` |
| 6 | Đặc trưng từng shot | `features.py`, `classify.py` | numpy/OpenCV: nhiễu cảm biến, khung lặp (24→30), bảng màu, vùng phẳng, Ken Burns… | `shots[].features`, `deterministic{probs, evidence, facts}` |
| 7 | Mặt người | `faces.py` | YuNet (OpenCV FaceDetectorYN, ONNX ~230 KB) | `shots[].faces`, `face_area` |
| 8 | Cách quay ("aspects") | `aspects/*.py` | numpy/OpenCV đo trên chủ thể (mặt hoặc vùng nét nhất) | `shots[].aspects{framing, camera, lighting, grade, editing, format}` |
| 9 | Chuyển động đồ hoạ (chỉ shot code/screen) | `motion.py` | OpenCV | `shots[].motion{events, palette}`, `*_strip.jpg` |
| 10 | Ảnh | `visual.py`, `media.py` | ffmpeg cắt khung đầu/cuối độ phân giải đầy, OpenCV ghép tấm | `storyboard.jpg`, `shots/shot_NNN.jpg`, `_first.jpg`, `_last.jpg` |
| 11 | VLM (**chỉ khi `--vlm`**) | `vlm.py` | Bất kỳ API **tương thích OpenAI** có ảnh/video | `shots[].vlm`, `whole_video_vlm` |
| 12 | ASR (tuỳ chọn) | `speech.py` | sherpa-onnx + SenseVoice int8 ~160 MB + Silero VAD | `speech.lines[]` |
| 13 | Bộ nhớ sửa sai | `memory.py` | tệp JSON ở `~/.rea-video` | áp lại các lần `correct` trước |
| 14 | Dung hợp + báo cáo | `pipeline.finalize`, `report.py`, `narrative.py` | — | `summary`, `report.md`, `report.html`, `audio.png` |

Lệnh khác (`cli.py`): `stems`, `probe`, `tiles` (lưới khung theo đoạn, `--every 0.5`), `summary`, `review` / `apply-review`
(agent tự xem ảnh thay VLM), `correct`, `prefs`, `memory`, `eval`, và nhóm làm lại `remake-plan`, `remake-run` (gọi capsule-cinema, **tốn tiền**),
`assemble`, `capsule-draft`.

## 1. Dò điểm cắt — `shots.py`

- Mỗi khung: khoảng cách histogram màu Bhattacharyya + chênh pixel ảnh xám + **tỉ lệ diện tích đổi** + độ sáng trung bình.
- `score = 0.6·hist + 0.4·min(1, 4·pix)`. **Ngưỡng thích nghi**: so với trung vị cục bộ cửa sổ ±0,5 s.
- Cắt cứng khi một trong bốn điều kiện:
  `strong`: score > 0,30 **và** > 2,5 × trung vị + 0,06 **và** diện tích đổi > 25 % ·
  `relative`: diện tích đổi > 45 % và > 3 × trung vị + 0,2 ·
  `still_swap`: đổi slide giữa hai bố cục đứng yên ·
  `jump`: **cắt nhảy** (cùng máy, cùng nền, chủ thể nhảy chỗ): đổi ≥ 17 %, gấp ≥ 2,5 lần 6 khung hai bên, hai bên yên, ảnh không quay về.
- **Loại nháy sáng**: `_brief_flash` (sáng lên rồi tắt quá nửa trong 2 khung, ảnh quay về) và `_back_to_before` → **không** tính là cắt.
  `_flash`: cắt mở bằng chớp trắng thì vẫn là cắt, ghi `transition_in="flash"`.
- Còn dò: mờ qua đen/trắng (`fade`), hoà tan (`dissolve`: khung giữa là trộn tuyến tính của hai đầu, phần dư < 0,20), lau (`wipe`).
- Shot ngắn nhất 0,35 s, ngoại lệ **0,12 s** nếu hai đầu đều là cắt cứng sạch.
- Đánh giá (CHANGELOG): 9 clip gắn nhãn tay từng khung, **recall 95 %, precision 94 %**. Clip "tay cầm điện thoại bán hàng" 92 % / 100 %.
  Tự nhận: vuốt màn hình điện thoại vẫn bị tính là cắt.
- **Chưa rõ** với ca của mình: đèn LED bật **và giữ sáng** không phải "nháy". Nếu diện tích đổi > 25 % thì mã này vẫn có thể gọi là cắt. Chưa kiểm.

## 2. Âm thanh — `audio.py` (numpy thuần, 22 050 Hz)

- **Giọng**: dải 300–3400 Hz, điều biến âm tiết 3–8 Hz, có khoảng ngắt → `voice.present/ratio/segments`, cao độ f0.
- **Nhạc**: lớp hài âm liên tục kéo qua chỗ ngắt lời, hoặc có phách đều → `music.segments`.
- **Held-tone (mới 11/11)**: một cao độ giữ suốt (bíp, còi vuông, ù điện 50 Hz) **không phải nhạc** → `music.steady_tone.hz`.
- **BPM**: tự tương quan đường onset bộ gõ trong khoảng 60–190 BPM, ưu tiên quãng 75–180. Thêm `tempo_alternatives` (½×, 2×).
  **Mới 11/11**: pad/drone không có trống → `no_beat`, không báo BPM giả.
- Lưới phách: chọn pha tốt nhất rồi bắt vào đỉnh onset ±3 hop (~35 ms). Giọng: Krumhansl. Đổi đoạn nhạc: chroma + độ to, cửa sổ 4 s.
- **Khớp cắt–phách**: `cuts_on_beat_ratio` = tỉ lệ cắt cách phách < **0,07 s**. Cơ hội ngẫu nhiên = số phách/giây × 0,14.
  `beat_synced_edit` = ≥ 4 cắt **và** tỉ lệ > max(0,5; 1,8 × ngẫu nhiên). Thêm `cuts_on_onset_ratio` (±0,08 s).
- SFX: xung bộ gõ mạnh, không phải âm tiết, không nằm trên lưới trống. Loại thô: whoosh/ding/pop/click/impact/typing.
  `packaging.anchored_sfx`: xung trong cửa sổ −0,08…+0,15 s quanh lúc chữ bật hoặc sticker vào.
- `sound_source.per_clip_audio`: nền tiếng có "nhảy" ở điểm cắt không. Clip mang tiếng riêng (AI có tiếng, máy quay) thì nhảy.
  Lồng tiếng + BGM phủ cả video thì không.
- `energy_curve`: dB mỗi 0,5 s (gần với "âm lượng" của `gvv boc`).

## 3. Tách tiếng — `stems.py`

UVR-MDX-NET-Inst_HQ_3.onnx tải từ `github.com/TRvlvr/model_repo` và **kiểm SHA-256**. Mô hình đoán phần nhạc, giọng = gốc − nhạc.
CPU, 44,1 kHz, cache ở `~/.cache/rea-video/models` (đổi bằng `REA_VIDEO_MODELS`). Từ 11/11 chạy song song với bước phân tích shot.
Tác giả đo: SDR giọng 19,7 dB. **SFX dạng xung rơi vào kênh giọng** (tự nhận).

## 4. Lớp đóng gói và OCR — `packaging.py` (99 KB), `overlay.py`

- RapidOCR: Python ≤ 3.12 dùng `rapidocr-onnxruntime`, ≥ 3.13 dùng `rapidocr` 3. **Ngôn ngữ OCR chỉ có `zh` (Trung + Anh có sẵn) và `ja`** (`util.OCR_LANGS`).
  **Không có tiếng Việt**: chữ có dấu sẽ mất dấu hoặc sai (suy từ mã, chưa chạy). `REA_OCR_REC_MODEL` chỉ được nạp khi `lang` có trong `_REC_MODELS`, nên với `zh` nó bị bỏ qua.
- Gom dòng thành khối, theo dõi qua thời gian thành cue có start/end. Chỉnh mốc bằng khung xám 10 khung/s (~0,1 s).
  Đọc kiểu chữ từ pixel: màu chữ, viền, nền, gradient, tô màu từ khoá, cỡ, nghiêng. Đọc hiệu ứng vào/ra: cut / pop / fade / slide / gõ chữ.
- Loại: `subtitle` · `huazi` (chữ hoa mỹ) · `title` · `label` · `counter` · `scene` (chữ in trên vật, đi theo hình).
- Sticker: vùng hiện ra/mất giữa shot, hoặc sống qua điểm cắt. Phân loại động (GIF) / tĩnh / PiP. Tự nhận: **recall sticker khoảng một nửa**.
- Neo chữ vào **câu thoại**: chữ hoa mỹ rơi vào câu nào, ở giây thứ mấy trong câu.

## 5. Phân loại cách làm hình — `classify.py`, `features.py`

11 nhãn: `live_action, ai_video, avatar, cg_3d, code_render, screen_capture, still_motion, static_hold, anim_2d, stop_motion, film_footage`.
Bằng chứng đo: `noise_sigma`, `temporal_noise` (nhiễu cảm biến), `dup_ratio` + `pulldown` ("24→30": mô hình sinh thường ra 24 fps,
đổi sang 30 fps thì có 20 % khung lặp), `flat_ratio`, `palette95`, `kenburns_score`, `local_motion_ratio`, `graphic_score`.
**Nhận biết chuyển mã của nền tảng** (thẻ `Tencent CAPD MTS` / `Wxmm_` / `vid:v…`): khi đó "không nhiễu" thôi không đẩy về AI.
`probe.py`: chữ ký phần mềm (Veo/SynthID, Sora, Runway, Pika, Vidu, Kling, …), khoá AIGC (`aigc, ai_generated, aigc_label, contentproducer, produceid`),
hộp C2PA/JUMBF. **Mới 11/11**: tên mô hình chỉ xuất hiện trong *tiêu đề/mô tả do người gõ* thì chỉ ghi "yếu", không cộng điểm.

## 6. Cách quay — `aspects/`

| Aspect | Đo bằng máy | Hỏi người đọc ảnh (VLM / agent) |
|---|---|---|
| `framing` | Cỡ cảnh từ chiều cao mặt (mặt/khung ≥ 0,40 ECU, ≥ 0,25 CU, ≥ 0,14 MCU, ≥ 0,08 MS, ≥ 0,04 FS) hoặc diện tích vùng nét | góc máy (ngang mắt / chúc / top-down / ngước), bố cục |
| `camera` | Hỗ trợ máy từ chuyển động toàn cục: rung = cầm tay, trượt mượt = gimbal/lia, đứng = tripod | `camera_support`, `lens`, `speed` (slow-mo, timelapse, đổi tốc), `setups`, `gear_guess` |
| `lighting` | Tỉ lệ sáng hai nửa chủ thể (2:1 = 1 stop), bên chính, trên/dưới, độ rộng chuyển sáng-tối (hẹp = sáng cứng), độ ấm Lab b*, mờ nền | `key_light`, `light_quality`, `fill_light`, `rim_light`, `catchlight`, `practicals`, `color_temp`, `lighting_setup` |
| `grade` | Bão hoà, tương phản, mức đen/trắng (đen nâng = film), teal-orange (b* vùng tối/sáng trung tính) | `color_grade`, `grade_overall` (LUT, filter CapCut) |
| `editing` | Vị trí máy (gom theo bố cục màu nền 6×10), cắt nhảy, punch-in ≥ 1,2×, **tỉ lệ cắt rơi vào chỗ ngắt giọng**, tỉ lệ chèn | `editing` |
| `fmt` | talking_head / desk (top-down) / product (cầm tay) / vlog | `format` |

Bảng `SETUPS` trong `aspects/lighting.py`: **12 sơ đồ ánh sáng có danh sách thiết bị**: ngược sáng ngoài trời · nắng gắt · mát/râm ·
low key · high key · đèn màu RGB/neon · **product still (nền liền, softbox trên đầu + 2 bên, bọc vải tản cho vật bóng)** · đêm thiếu sáng ·
ngược sáng trong nhà · sáng phẳng chính diện (ring light 18") · key + fill 45° · một đèn bên.
Tác giả tự ghi: chuyển mã làm bẹp vùng tối, nên **độ cứng sáng và mức fill là hai số kém tin nhất**.

## 7. VLM — `vlm.py`

- Cấu hình bằng biến môi trường `REA_VLM_BASE_URL/API_KEY/MODEL` (hoặc `VIDEO_ANALYSIS_*`, `GEMINI3_*` của capsule-cinema). Gọi `POST {base}/chat/completions`.
  Chấp nhận `http://localhost` (cảnh báo khi http tới máy khác). Về lý thuyết chạy được với một VLM cục bộ có API kiểu OpenAI. Tác giả chỉ đo với Gemini.
- **Gửi đi gì** (`REA_VLM_MEDIA=both` mặc định): mỗi đơn vị (1 shot, hoặc tối đa 8 mảnh cắt nhảy ≤ 12 s) gửi **clip 480p ≤ 12 s**
  + khung đầu + tấm ghép + khung cuối, base64. Thêm **một lần gửi cả video 480p có tiếng** (`whole_vlm=True`).
  → Gửi nguyên mặt người và giọng ra ngoài.
- Giới hạn 60 lần gọi. Ưu tiên shot máy kém chắc nhất và dài nhất (`vlm_units`). Từ 11/11 báo cáo ghi rõ "chỉ gửi a/n shot".
- `SHOT_PROMPT` (dòng 267): 11 nhãn kèm dấu hiệu phân biệt, `ai_edits` (face swap, lip-sync, đổi đồ, đổi nền…), `embedded_assets`,
  `replication.video_prompt` (**"quá trình + trạng thái cuối, không viết câu phủ định"**), `aspects`.
- `WHOLE_PROMPT` (dòng 352): `hook` 3 s đầu, `segments[]` có `role` + `beat` (narrative line), `narration.lines` có giây, `music` (BPM, nguồn, `beat_synced_cuts`),
  `sfx[]` có `sync_with`, `text_effects`, `stickers`, `characters`/`scenes`/`props` gắn với số shot.
- Dung hợp: VLM đồng ý với máy thì lấy. Hai bên xem ảnh cùng phản đối máy thì **không** bắt buộc đổi (đã thử đa số 3 bên: tụt 98,4 → 91,9 %).

## 8. Agent tự xem ảnh thay VLM — `review.py`

`rea-video review out/` sinh `review_tasks.json`: mỗi shot có ảnh, gợi ý của máy, `priority=high` cho shot kém chắc, `zoom_cmd` để cắt khung dày.
Agent điền `review_answers.json` (cùng câu hỏi với SHOT_PROMPT, thêm `narrative{role, point}`, `split_suggestion`) → `apply-review`.
Trọng số agent 0,85 (kéo về đều trước khi hợp). **Luật**: agent không xem được ảnh thì không được lật kết luận của máy.

## 9. Narrative line — `narrative.py` (mới 11/11)

8 vai: `hook` (gây chú ý) · `context` (bối cảnh) · `info` (thông tin) · `proof` (bằng chứng) · `turn` (bẻ lái) · `payoff` (kết luận) · `cta` (kêu gọi hành động) · `mood` (cảm xúc, không thêm thông tin).
**Không đo gì.** Vai lấy từ agent review (ưu tiên) hoặc từ `WHOLE_PROMPT.segments` khớp theo thời gian. Các shot liền nhau cùng vai thì gộp thành một bước.
Mục đích tác giả ghi: *"làm lại mà chỉ thay chủ thể thì vẫn giữ lập luận của người khác — giữ trình tự bước, thay bằng ca và vật liệu của mình"*.

## 10. ASR — `speech.py` (mới 11/11)

sherpa-onnx + **SenseVoice: zh / en / ja / ko / yue. Không có tiếng Việt.** Chạy trên kênh giọng đã tách (nhạc làm ASR bịa chữ).
Câu dài > 6 s: giờ từng câu là **ước theo số chữ** (`timing: estimated`). Chỉ đầu và cuối đoạn là đo thật.

## 11. Chạy trên Windows, GPU, API

- Phụ thuộc lõi: numpy, opencv-python-headless, Pillow, PyYAML, onnxruntime. Tuỳ chọn: `[ocr]` rapidocr, `[asr]` sherpa-onnx. Cần ffmpeg + ffprobe trên PATH.
- **Không cần GPU**: mọi ONNX đều chỉ định `CPUExecutionProvider`. **Không cần API key** nếu không bật `--vlm`.
- Mã có xử lý Windows: `util.read_image` dùng `np.fromfile` để mở đường dẫn không phải ASCII. `install_skill.sh` là bash (chạy qua Git Bash được) và **tự link skill vào `~/.claude/skills`**,
  nên đừng dùng nếu chưa duyệt. Thay bằng `pip install` trong venv riêng.
- Python 3.10 của máy: thuộc nhánh `rapidocr-onnxruntime`, phải gỡ `opencv-python` kéo theo rồi cài lại headless (setup.md ghi rõ).
- Mạng: chỉ `util.fetch` để tải model (UVR 67 MB, YuNet 230 KB, SenseVoice 160 MB + VAD nếu có `[asr]`; RapidOCR zh đi kèm wheel), đều kiểm SHA-256.
  Ngoài ra chỉ có VLM. **Không thấy telemetry** (grep `urlopen|requests|http.client` chỉ ra hai chỗ đó).
- Tốc độ tác giả đo (không VLM): 30 s ≈ 1 phút. Mở hộp 72 s, 68 shot: 104 s. Talking head 166 s: 206 s.

## Tệp đã đọc trong repo

`pyproject.toml`, `CHANGELOG.md`, `eval/RESULTS.md`, `README.md`, `docs/cli.md`, `skills/rea-video/SKILL.md`, `skills/rea-video/references/setup.md`,
`rea_video/{pipeline, shots, audio, stems, speech, narrative, vlm, review, packaging (đầu tệp + anchored_sfx), overlay, probe, faces, util, media, cli}.py`,
`rea_video/aspects/{__init__, camera, framing, lighting, grade, editing, fmt, subject}.py`, `tests/test_ocr_lang.py`, patch của 10 commit ở `03-…`.
