"""Muc 3: tu bam CapCut theo trinh tu co dinh, kiem bang draft_content.json.

Claude chi can: dua CapCut len (khong bat buoc), chay script, doc ket qua.

Cach dung:
  python -I -X utf8 capcut-auto.py --du-an TEN --video VIDEO.mp4 --loi LOI.txt
         [--nhac "Ten bai" [--tim "tu khoa"]] [--them-giay 0.3] [--tu-buoc N] [--thu]

  --loi        tep "giay|loi", moi dong mot clip chu
  --nhac       ten bai trong thu vien CapCut (tim bang ten bai, lay ket qua dau)
  --tim        tu khoa tim (mac dinh = ten bai)
  --them-giay  cat nhac o cuoi video + so giay nay (mac dinh 0.3)
  --tu-buoc    chay tiep tu buoc N (1 tao du an, 2 nhap video, 3 chu, 4 giong, 5 nhac, 6 cat nhac, 7 kiem)
  --thu        chi in thao tac, khong bam

KHOA AN TOAN (bat buoc, khong tat):
  - Truoc moi lan bam/go: cua so nam duoi diem bam va cua so dang o tren cung phai thuoc tien trinh CapCut.exe,
    neu khong -> dung ngay (ma 3).
  - Cam bam vung goc phai tren (nut Xuat / Chia se): x>1250 va y<30 (khung 1456x819) -> dung ngay.
  - Keo chuot vao goc man hinh -> pyautogui FAILSAFE dung ngay.
  - Khong bao gio mo hop thoai Xuat.
Ma thoat: 0 DAT, 1 sai ket qua, 2 loi tham so/khong tim thay, 3 khoa an toan dung.
"""
import argparse, ctypes, glob, json, os, subprocess, sys, time, datetime

import pyautogui, pyperclip, win32con, win32gui, win32process

ctypes.windll.user32.SetProcessDPIAware()
pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0.05

GOC_DRAFT = os.path.expandvars(r"%LOCALAPPDATA%\CapCut\User Data\Projects\com.lveditor.draft")
W0, H0 = 1456, 819
SW, SH = ctypes.windll.user32.GetSystemMetrics(0), ctypes.windll.user32.GetSystemMetrics(1)
FPS = 30
THU = False
NHAT_KY = []


class DungAnToan(Exception):
    pass


def log(*a):
    s = datetime.datetime.now().strftime("%H:%M:%S ") + " ".join(str(x) for x in a)
    print(s, flush=True)
    NHAT_KY.append(s)


def P(x, y):
    return round(x * SW / W0), round(y * SH / H0)


def pid_ten(pid):
    try:
        out = subprocess.run(["tasklist", "/FI", f"PID eq {pid}", "/FO", "CSV", "/NH"],
                             capture_output=True, text=True).stdout
        return out.split(",")[0].strip('"').lower()
    except Exception:
        return ""


_cache = {}


def la_capcut(hwnd):
    if not hwnd:
        return False
    root = win32gui.GetAncestor(hwnd, 2)  # GA_ROOT
    _, pid = win32process.GetWindowThreadProcessId(root)
    if pid not in _cache:
        _cache[pid] = pid_ten(pid) == "capcut.exe"
    return _cache[pid]


def gac(x, y):
    """Khoa an toan truoc moi thao tac tai (x, y) khung 1456x819."""
    if x > 1250 and y < 30:
        raise DungAnToan(f"cam bam vung Xuat/Chia se ({x},{y})")
    if THU:
        return
    if not la_capcut(win32gui.GetForegroundWindow()):
        raise DungAnToan("cua so tren cung khong phai CapCut: " + win32gui.GetWindowText(win32gui.GetForegroundWindow()))
    px, py = P(x, y)
    if not la_capcut(win32gui.WindowFromPoint((px, py))):
        raise DungAnToan(f"diem ({x},{y}) khong nam tren cua so CapCut")


def bam(x, y, n=1, cho=0.4, ghi=""):
    gac(x, y)
    log(f"bam{'x'+str(n) if n > 1 else ''} ({x},{y}) {ghi}")
    if not THU:
        pyautogui.click(*P(x, y), clicks=n, interval=0.08)
        time.sleep(cho)


def re(x, y):
    gac(x, y)
    if not THU:
        pyautogui.moveTo(*P(x, y), duration=0.2)
        time.sleep(0.6)


def keo(x1, y1, x2, y2, ghi=""):
    gac(x1, y1); gac(x2, y2)
    log(f"keo ({x1},{y1})->({x2},{y2}) {ghi}")
    if not THU:
        pyautogui.moveTo(*P(x1, y1)); pyautogui.mouseDown(); time.sleep(0.3)
        pyautogui.moveTo(*P((x1 + x2) // 2, (y1 + y2) // 2), duration=0.4)
        pyautogui.moveTo(*P(x2, y2), duration=0.4); time.sleep(0.3); pyautogui.mouseUp()
        time.sleep(2)


def phim(*k, n=1, cho=0.3, nhanh=False):
    gac(700, 400)
    log(f"phim {'+'.join(k)} x{n}")
    if not THU:
        if len(k) > 1:
            pyautogui.hotkey(*k)
        else:
            pyautogui.press(k[0], presses=n, interval=0.004 if nhanh else 0.03)
        time.sleep(cho)


def dan(chu, cho=0.5):
    gac(700, 400)
    log(f"dan '{chu[:40]}...'" if len(chu) > 40 else f"dan '{chu}'")
    if not THU:
        pyperclip.copy(chu); time.sleep(0.15)
        pyautogui.hotkey("ctrl", "a"); pyautogui.press("delete"); pyautogui.hotkey("ctrl", "v")
        time.sleep(cho)


# ---------- cua so ----------
def cua_so_capcut():
    ds = []
    def cb(h, _):
        if win32gui.IsWindowVisible(h) and la_capcut(h) and win32gui.GetWindowText(h) == "CapCut":
            l, t, r, b = win32gui.GetWindowRect(h)
            if r - l > 600:
                ds.append((h, (l, t, r, b)))
    win32gui.EnumWindows(cb, None)
    return ds


def dua_len():
    ds = cua_so_capcut()
    if not ds:
        raise DungAnToan("CapCut chua mo")
    h = max(ds, key=lambda x: (x[1][2] - x[1][0]) * (x[1][3] - x[1][1]))[0]
    if win32gui.IsIconic(h):
        win32gui.ShowWindow(h, win32con.SW_RESTORE)
    try:
        win32gui.SetForegroundWindow(h)
    except Exception as e:
        log("SetForegroundWindow loi:", e)
    time.sleep(1.5)
    if not la_capcut(win32gui.GetForegroundWindow()):
        raise DungAnToan("khong dua duoc CapCut len tren cung (hay bam bieu tuong CapCut tren thanh tac vu roi chay lai)")


def dang_o_editor():
    for h, (l, t, r, b) in cua_so_capcut():
        if r - l >= SW - 10 and b - t >= SH - 100:
            return True
    return False


# ---------- draft ----------
def tim_draft(ten):
    # Ten moi duoc ghi vao root_meta_info.json ngay khi bam Luu; draft_meta_info.json chi cap nhat muon hon.
    try:
        r = json.load(open(os.path.join(GOC_DRAFT, "root_meta_info.json"), encoding="utf-8"))
        for d in r.get("all_draft_store", []):
            if d.get("draft_name") == ten and os.path.isdir(d.get("draft_fold_path", "")):
                return d["draft_fold_path"]
    except Exception:
        pass
    for meta in glob.glob(os.path.join(GOC_DRAFT, "*", "draft_meta_info.json")):
        try:
            if json.load(open(meta, encoding="utf-8")).get("draft_name") == ten:
                return os.path.dirname(meta)
        except Exception:
            pass
    return None


def doc_draft(ten, moi_hon=0, cho_toi_da=40):
    """Cho CapCut tu luu (mtime > moi_hon) roi doc draft."""
    if THU:
        return None
    het = time.time() + cho_toi_da
    while time.time() < het:
        d = tim_draft(ten)
        if d:
            f = os.path.join(d, "draft_content.json")
            if os.path.getmtime(f) > moi_hon:
                time.sleep(0.5)
                try:
                    return json.load(open(f, encoding="utf-8"))
                except Exception:
                    pass
        time.sleep(2)
    return None


def tom_tat(dc):
    texts = {m["id"]: json.loads(m.get("content", "{}")).get("text", "") for m in dc["materials"].get("texts", [])}
    auds = {m["id"]: m for m in dc["materials"].get("audios", [])}
    kq = {"video": [], "chu": [], "giong": [], "nhac": [], "tat_tieng": [], "khoa": []}
    for t in dc["tracks"]:
        att = t.get("attribute", 0)
        for s in t["segments"]:
            st = s["target_timerange"]["start"] / 1e6; du = s["target_timerange"]["duration"] / 1e6
            m = s.get("material_id")
            if t["type"] == "video":
                kq["video"].append((st, du))
                if att & 1: kq["tat_tieng"].append("video")
                if att & 4: kq["khoa"].append("video")
            elif m in texts:
                kq["chu"].append((round(st, 2), texts[m]))
            elif m in auds and auds[m]["type"] == "text_to_audio":
                kq["giong"].append((round(st, 2), round(du, 2), auds[m].get("tone_speaker", "")))
            elif m in auds and auds[m]["type"] == "music":
                kq["nhac"].append((round(st, 2), round(du, 2), auds[m].get("name", "")))
    for k in ("chu", "giong", "nhac"):
        kq[k].sort()
    return kq


# ---------- cac buoc ----------
def b1_tao_du_an(a):
    if dang_o_editor():
        bam(83, 13, cho=1.2, ghi="Menu")
        bam(108, 183, cho=4, ghi="Quay lai trang chu")
    t0 = time.time()
    bam(600, 113, cho=7, ghi="Tao du an")
    if not THU and not dang_o_editor():
        raise DungAnToan("khong vao duoc trinh dung sau khi Tao du an")
    bam(1412, 415, cho=1.8, ghi="Sua doi")
    bam(790, 252, n=3, cho=0.3, ghi="o Ten")
    dan(a.du_an)
    bam(635, 625, cho=2.5, ghi="Luu")
    if not THU:
        het = time.time() + 30
        while time.time() < het and not tim_draft(a.du_an):
            time.sleep(2)
        d = tim_draft(a.du_an)
        if not d:
            raise RuntimeError("khong thay du an moi trong draft (dat ten that bai?)")
        log("du an:", os.path.basename(d))


def b2_nhap_video(a):
    bam(300, 190, cho=1.2, ghi="Nhap")
    bam(280, 215, cho=3, ghi="Tu thiet bi")
    bam(350, 357, cho=0.4, ghi="o File name")
    dan(os.path.abspath(a.video))
    phim("enter", cho=5)
    keo(152, 143, 120, 620, "video xuong timeline")
    bam(72, 624, cho=0.6, ghi="tat tieng video")
    bam(34, 624, cho=0.6, ghi="khoa video")


def ve_moc(giay, ghi=""):
    bam(139, 467, cho=0.6, ghi="thuoc ve 0 " + ghi)
    n = round(giay * FPS)
    if n:
        phim("right", n=n, cho=0.8, nhanh=True)


def b3_chu(a, loi):
    bam(132, 42, cho=1.5, ghi="tab Van ban")
    for i, (g, l) in enumerate(loi, 1):
        ve_moc(g, f"doan {i} -> {g}s")
        re(140, 100)
        bam(165, 122, cho=1.8, ghi="+ van ban mac dinh")
        bam(1222, 120, n=3, cho=0.3, ghi="o chu")
        dan(l, cho=0.8)


def b4_giong(a, loi):
    # Chon moi clip chu ma khong phu thuoc vi tri: bam thuoc de timeline nhan ban phim
    # (giu nguyen lua chon), roi Ctrl+A. Track video da khoa nen chi chon clip chu.
    bam(139, 467, cho=0.6, ghi="thuoc (timeline nhan ban phim)")
    phim("ctrl", "a", cho=0.8)
    bam(1265, 42, cho=1.0, ghi="tab TTS")
    bam(1265, 42, cho=2.5, ghi="tab TTS lan 2")
    bam(1007, 110, cho=2.0, ghi="* Yeu thich")
    bam(1140, 163, cho=1.2, ghi="the Co Gai Hoat Ngon")
    t0 = time.time()
    bam(1411, 416, cho=3, ghi="Tao loi noi")
    if THU:
        return
    het = time.time() + 120
    while time.time() < het:
        dc = doc_draft(a.du_an, t0, 10)
        if dc and len(tom_tat(dc)["giong"]) >= len(loi):
            log("giong:", tom_tat(dc)["giong"]); return
        time.sleep(4)
    raise RuntimeError("het 120 s ma chua du clip giong")


def vi_tri_nhac(co_giong):
    return 712 if co_giong else 673


def b5_nhac(a):
    bam(139, 467, cho=0.6, ghi="thuoc ve 0")
    bam(93, 42, cho=1.5, ghi="tab Am thanh")
    bam(285, 77, cho=0.4, ghi="o tim")
    dan(a.tim or a.nhac)
    phim("enter", cho=4.5)
    for lan in (1, 2):
        t0 = time.time()
        bam(474, 113, cho=10 if lan == 1 else 4, ghi=f"ket qua 1 (lan {lan}: tai hoac +)")
        if THU:
            return
        dc = doc_draft(a.du_an, t0, 15)
        nh = tom_tat(dc)["nhac"] if dc else []
        if nh:
            if nh[0][2] != a.nhac:
                raise RuntimeError(f"them nham bai: {nh[0][2]} (can {a.nhac})")
            log("nhac:", nh); return
    raise RuntimeError("bam 2 lan ma chua co nhac trong draft")


def dai_video_draft(ten, mac_dinh):
    if THU:
        return mac_dinh
    dc = doc_draft(ten, 0, 5)
    v = tom_tat(dc)["video"] if dc else []
    return round(v[0][1], 3) if v else mac_dinh


TIENG_MOI_GIAY = 4.3   # do 12/11: 45 tieng = 10,5 s; 5 doan thu-can-cau ~4,3 tieng/s
CLIP_CHU_MAC_DINH = 3.0


def kiem_truoc(loi, dv):
    """Bao loi neu bo cuc lam CapCut day clip sang track moi (lam lech toa do)."""
    van_de = []
    for i, (g, l) in enumerate(loi):
        uoc = len(l.split()) / TIENG_MOI_GIAY
        if i + 1 < len(loi):
            g2 = loi[i + 1][0]
            if g2 <= g:
                van_de.append(f"doan {i+2} ({g2}s) khong sau doan {i+1} ({g}s)")
            elif g2 - g < CLIP_CHU_MAC_DINH + 0.1:
                van_de.append(f"doan {i+1}->{i+2}: cach {g2-g:.2f}s < 3,1s (clip chu mac dinh 3s se sang track moi)")
            elif g + uoc > g2 - 0.2:
                van_de.append(f"doan {i+1}: giong uoc {uoc:.1f}s ({len(l.split())} tieng) se tran sang doan {i+2} o {g2}s")
        elif g + uoc > dv + 0.5:
            van_de.append(f"doan cuoi: giong uoc {uoc:.1f}s vuot cuoi video ({dv:.2f}s)")
    return van_de


def vi_tri_nhac_draft(ten):
    """Tinh hang y cua clip nhac tu bo cuc track trong draft; loi neu bo cuc khac thuong."""
    if THU:
        return 712
    dc = doc_draft(ten, 0, 5)
    tr = dc["tracks"]
    auds = {m["id"]: m["type"] for m in dc["materials"].get("audios", [])}
    so_chu = sum(1 for t in tr if t["type"] == "text")
    am = [t for t in tr if t["type"] == "audio"]
    loai = [{auds.get(s.get("material_id")) for s in t["segments"]} for t in am]
    so_giong = sum(1 for x in loai if "text_to_audio" in x)
    if so_chu != 1 or so_giong != 1:
        raise RuntimeError(f"bo cuc track khac thuong: {so_chu} track chu, {so_giong} track giong -> cat nhac bang tay (muc 2)")
    idx = next((i for i, x in enumerate(loai) if "music" in x), None)
    if idx is None:
        raise RuntimeError("khong thay track nhac")
    return 673 + 39 * idx


def b6_cat_nhac(a, co_giong, dai_video):
    dai_video = dai_video_draft(a.du_an, dai_video)
    cat = dai_video + a.them_giay
    bam(300, vi_tri_nhac_draft(a.du_an), cho=0.6, ghi="chon clip nhac")
    ve_moc(cat, f"cat {cat:.2f}s")
    bam(157, 447, cho=1.0, ghi="Tach")
    phim("delete", cho=1.0)


def dai_video(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                         capture_output=True, text=True).stdout.strip()
    return float(out)


def main():
    global THU
    ap = argparse.ArgumentParser()
    ap.add_argument("--du-an", required=True)
    ap.add_argument("--video", required=True)
    ap.add_argument("--loi", required=True)
    ap.add_argument("--nhac")
    ap.add_argument("--tim")
    ap.add_argument("--them-giay", type=float, default=0.3)
    ap.add_argument("--tu-buoc", type=int, default=1)
    ap.add_argument("--thu", action="store_true")
    ap.add_argument("--bo-qua-kiem-truoc", action="store_true")
    a = ap.parse_args()
    THU = a.thu
    loi = [(float(x.split("|", 1)[0]), x.split("|", 1)[1].strip())
           for x in open(a.loi, encoding="utf-8").read().splitlines() if "|" in x]
    if not loi or not os.path.isfile(a.video):
        print("thieu loi hoac video"); return 2
    dv = dai_video(a.video)
    vd = kiem_truoc(loi, dv)
    if vd:
        for x in vd:
            log("KIEM TRUOC:", x)
        if not a.bo_qua_kiem_truoc:
            log("DUNG truoc khi bam: sua tep loi (gian moc / rut gon loi) hoac them --bo-qua-kiem-truoc")
            return 2
    log(f"bat dau: du an {a.du_an} | video {dv:.2f}s | {len(loi)} doan | nhac: {a.nhac or '-'} | man {SW}x{SH} | thu={THU}")
    if a.tu_buoc > 1 and not THU and not tim_draft(a.du_an):
        print("chua co du an", a.du_an); return 2
    t_bd = time.time()
    try:
        if not THU:
            dua_len()
        buoc = [(1, lambda: b1_tao_du_an(a)), (2, lambda: b2_nhap_video(a)), (3, lambda: b3_chu(a, loi)),
                (4, lambda: b4_giong(a, loi))]
        if a.nhac:
            buoc += [(5, lambda: b5_nhac(a)), (6, lambda: b6_cat_nhac(a, True, dv))]
        for n, f in buoc:
            if n >= a.tu_buoc:
                log(f"== buoc {n}")
                if not THU:
                    dua_len() if not la_capcut(win32gui.GetForegroundWindow()) else None
                f()
    except DungAnToan as e:
        log("DUNG (khoa an toan):", e); ghi_nhat_ky(a); return 3
    except Exception as e:
        log("LOI:", e); ghi_nhat_ky(a); return 1
    if THU:
        log("(thu) xong"); return 0
    # buoc 7: kiem cuoi
    log("== buoc 7 kiem cuoi")
    dc = doc_draft(a.du_an, 0, 5)
    time.sleep(10)
    dc = doc_draft(a.du_an, 0, 5) or dc
    kq = tom_tat(dc)
    if kq["video"]:
        dv = kq["video"][0][1]
    loi_sai = []
    if len(kq["chu"]) != len(loi): loi_sai.append(f"so clip chu {len(kq['chu'])}/{len(loi)}")
    for (g, l), (st, tx) in zip(loi, kq["chu"]):
        if abs(st - g) > 0.3: loi_sai.append(f"moc {g} -> {st}")
        if tx.strip() != l.strip(): loi_sai.append(f"chu sai o {g}s")
    if len(kq["giong"]) != len(loi): loi_sai.append(f"so clip giong {len(kq['giong'])}/{len(loi)}")
    if any("BV074" not in x[2] for x in kq["giong"]): loi_sai.append("giong khong phai BV074 (Co Gai Hoat Ngon)")
    if "video" not in kq["tat_tieng"]: loi_sai.append("video chua tat tieng")
    if a.nhac:
        if not kq["nhac"]: loi_sai.append("chua co nhac")
        else:
            st, du, ten = kq["nhac"][0]
            if ten != a.nhac: loi_sai.append(f"sai bai {ten}")
            if abs(st) > 0.05 or abs(st + du - (dv + a.them_giay)) > 0.1: loi_sai.append(f"nhac {st}->{st+du:.2f}s (can 0->{dv+a.them_giay:.2f})")
            if len(kq["nhac"]) > 1: loi_sai.append(f"co {len(kq['nhac'])} clip nhac")
    log("chu:", [(x[0], x[1][:25]) for x in kq["chu"]])
    log("giong:", kq["giong"]); log("nhac:", kq["nhac"]); log("tat tieng:", kq["tat_tieng"], "khoa:", kq["khoa"])
    log(f"thoi gian: {time.time()-t_bd:.0f}s")
    log("KET QUA:", "DAT" if not loi_sai else "SAI -> " + "; ".join(loi_sai))
    ghi_nhat_ky(a)
    return 0 if not loi_sai else 1


def ghi_nhat_ky(a):
    try:
        p = os.path.join(os.path.dirname(os.path.abspath(a.loi)), f"{a.du_an}-auto.log")
        open(p, "a", encoding="utf-8").write("\n".join(NHAT_KY) + "\n\n")
        print("nhat ky:", p)
    except Exception:
        pass


if __name__ == "__main__":
    sys.exit(main())
