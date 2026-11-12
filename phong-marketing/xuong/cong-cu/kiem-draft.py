"""Kiem du an CapCut bang tep draft (khong can chup man hinh).

Cach dung:
  python -I -X utf8 kiem-draft.py <ten du an hoac ten thu muc> [tep loi "giay|loi"] [--sai 0.3]

In ra: thu muc, tung track (tat tieng/khoa), moc + do dai tung clip (giay),
loi cua clip chu, loai/ten am thanh. Neu co tep loi: doi chieu moc va chu, in OK/SAI.
Ma thoat: 0 = dat, 1 = sai, 2 = khong tim thay du an.
"""
import json, os, sys, glob

GOC = os.path.expandvars(r"%LOCALAPPDATA%\CapCut\User Data\Projects\com.lveditor.draft")


def tim_du_an(ten):
    p = os.path.join(GOC, ten)
    if os.path.isfile(os.path.join(p, "draft_content.json")):
        return p
    # ten moi nam o root_meta_info.json ngay khi bam Luu; draft_meta_info.json cap nhat muon hon
    try:
        r = json.load(open(os.path.join(GOC, "root_meta_info.json"), encoding="utf-8"))
        for d in r.get("all_draft_store", []):
            if d.get("draft_name") == ten and os.path.isdir(d.get("draft_fold_path", "")):
                return d["draft_fold_path"]
    except Exception:
        pass
    for meta in glob.glob(os.path.join(GOC, "*", "draft_meta_info.json")):
        try:
            if json.load(open(meta, encoding="utf-8")).get("draft_name") == ten:
                return os.path.dirname(meta)
        except Exception:
            pass
    return None


def chu_cua(mat):
    try:
        return json.loads(mat.get("content", "{}")).get("text", "")
    except Exception:
        return mat.get("content", "")


def main():
    args = sys.argv[1:]
    sai = 0.3
    if "--sai" in args:
        i = args.index("--sai")
        sai = float(args[i + 1])
        args = args[:i] + args[i + 2:]
    a = args
    if not a:
        print(__doc__)
        return 2
    d = tim_du_an(a[0])
    if not d:
        print("KHONG TIM THAY du an:", a[0])
        return 2
    dc = json.load(open(os.path.join(d, "draft_content.json"), encoding="utf-8"))
    mtime = os.path.getmtime(os.path.join(d, "draft_content.json"))
    import datetime
    print("Thu muc:", os.path.basename(d), "| luu luc", datetime.datetime.fromtimestamp(mtime).strftime("%H:%M:%S"))
    texts = {m["id"]: chu_cua(m) for m in dc["materials"].get("texts", [])}
    auds = {m["id"]: m for m in dc["materials"].get("audios", [])}
    chu = []
    for t in dc["tracks"]:
        att = t.get("attribute", 0)
        nhan = []
        if att & 1: nhan.append("TAT TIENG")
        if att & 4: nhan.append("KHOA")
        print(f"\n[{t['type']}] {' '.join(nhan) or 'binh thuong'}")
        for s in t["segments"]:
            st = s["target_timerange"]["start"] / 1e6
            du = s["target_timerange"]["duration"] / 1e6
            mid = s.get("material_id")
            them = ""
            if mid in texts:
                them = texts[mid][:60]
                chu.append((st, texts[mid]))
            elif mid in auds:
                m = auds[mid]
                them = f"{m.get('type')} | {m.get('name', '')[:45]}"
            print(f"  {st:7.2f}s  dai {du:6.2f}s  {them}")
    if len(a) < 2:
        return 0
    loi = [l.split("|", 1) for l in open(a[1], encoding="utf-8").read().splitlines() if "|" in l]
    chu.sort()
    ok = len(loi) == len(chu)
    print(f"\nDoi chieu {a[1]}: can {len(loi)} clip chu, co {len(chu)}")
    for i, (g, l) in enumerate(loi):
        if i >= len(chu):
            print(f"  {i+1}: THIEU clip"); ok = False; continue
        lech = chu[i][0] - float(g)
        dung_chu = chu[i][1].strip() == l.strip()
        dat = abs(lech) <= sai and dung_chu
        ok &= dat
        print(f"  {i+1}: moc {float(g):.2f} -> {chu[i][0]:.2f} (lech {lech:+.2f}) | chu {'DUNG' if dung_chu else 'SAI'} | {'OK' if dat else 'SAI'}")
    print("KET QUA:", "DAT" if ok else "SAI")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
