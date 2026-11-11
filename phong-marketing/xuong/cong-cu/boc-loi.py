# Boc loi theo tu bang faster-whisper (chay o may, mien phi). Dung: python boc-loi.py <video> [model]
import sys, json
from faster_whisper import WhisperModel
vid = sys.argv[1]; size = sys.argv[2] if len(sys.argv) > 2 else "small"
m = WhisperModel(size, device="cpu", compute_type="int8")
segs, info = m.transcribe(vid, word_timestamps=True, vad_filter=True)
out = {"ngon_ngu": info.language, "xac_suat": round(info.language_probability, 3), "doan": []}
for s in segs:
    out["doan"].append({"bd": round(s.start, 2), "kt": round(s.end, 2), "chu": s.text.strip(),
                        "tu": [[round(w.start, 2), round(w.end, 2), w.word.strip()] for w in (s.words or [])]})
print(json.dumps(out, ensure_ascii=False, indent=1))
