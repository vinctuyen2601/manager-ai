"""Do chi phi token cua mot phien Claude Code (tinh quy doi).

Cach dung:
  python -I -X utf8 do-token.py <tep phien .jsonl>
  python -I -X utf8 do-token.py --moi-nhat     (lay phien sua gan nhat trong ~/.claude/projects)

Quy doi theo gia: input x1, doc lai bo nho dem x0.1, ghi bo nho dem x2, Claude viet ra x5.
In: tong token quy doi, so luot, token/luot, so thao tac may, so lan chup/zoom, so phut lam.
"""
import json, sys, os, glob, datetime


def main():
    if len(sys.argv) < 2:
        print(__doc__); return 2
    f = sys.argv[1]
    if f == "--moi-nhat":
        ds = glob.glob(os.path.expanduser("~/.claude/projects/*/*.jsonl"))
        f = max(ds, key=os.path.getmtime)
    rows = [json.loads(l) for l in open(f, encoding="utf-8") if l.strip()]
    turns, order, act, shot, ts = {}, [], 0, 0, []
    for r in rows:
        if r.get("timestamp"):
            ts.append(datetime.datetime.fromisoformat(r["timestamp"].replace("Z", "+00:00")))
        if r.get("type") != "assistant":
            continue
        m = r["message"]; mid = m["id"]
        if mid not in turns:
            turns[mid] = {}; order.append(mid)
        turns[mid] = m.get("usage", turns[mid])
        for x in m.get("content", []):
            if isinstance(x, dict) and x.get("type") == "tool_use" and x["name"].startswith("mcp__computer-use__"):
                if x["name"].endswith("computer_batch"):
                    acts = x["input"].get("actions", [])
                    act += len(acts)
                    shot += sum(1 for y in acts if y.get("action") in ("screenshot", "zoom"))
                else:
                    act += 1
                    shot += x["name"].endswith(("screenshot", "zoom"))

    def eff(u):
        return (u.get("input_tokens", 0) + 0.1 * u.get("cache_read_input_tokens", 0)
                + 2 * u.get("cache_creation_input_tokens", 0) + 5 * u.get("output_tokens", 0))

    tot = sum(eff(turns[m]) for m in order)
    ts.sort()
    phut = sum(min((b - a).total_seconds(), 300) for a, b in zip(ts, ts[1:])) / 60
    n = max(len(order), 1)
    print(f"Phien: {os.path.basename(f)}")
    print(f"Tong quy doi: {tot/1e6:.2f} trieu | luot {len(order)} | {tot/n/1e3:.1f}K/luot")
    print(f"Thao tac may {act} | chup/zoom {shot} | ~{phut:.0f} phut lam")
    return 0


if __name__ == "__main__":
    sys.exit(main())
