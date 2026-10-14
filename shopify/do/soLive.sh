#!/usr/bin/env bash
# So tep tren theme LIVE voi ban trong repo TRUOC khi push. Dung lai (exit 1)
# neu khac — KHONG bao gio tu bo ban live.
#
#   bash soLive.sh <thu-muc-repo-theme> <tep> [tep...]
#   vd: bash soLive.sh "/d/my project/shop-christmasspin" sections/header-group.json assets/custom.css
#
# VI SAO CO TEP NAY: ngay 14/10/2026 cach lam cu la
#   git stash -> theme pull -> git diff --stat -> git checkout -- . -> stash pop
# Lenh `git diff --stat` CO in ra "header-group.json | 7 ++++---" — tuc la chu
# shop da sua header trong trinh soan theme — nhung chuoi lenh van chay tiep,
# `git checkout` xoa ban live vua keo ve, roi push de len. Mat thay doi do,
# khong doc lai duoc. Phep kiem co bao, chi la khong ai dung lai nghe.
#
# Keo vao thu muc TAM rieng nen ban live con nguyen de doc, va so sanh bo qua
# CRLF (git tren Windows doi dau dong, khong phai thay doi that).
set -u
REPO="$1"; shift
TAM="$(mktemp -d)"
cp "$REPO/shopify.theme.toml" "$TAM/" 2>/dev/null
# Shopify CLI ban Windows khong doc duoc duong dan /tmp cua Git Bash — doi
# sang dang Windows neu co cygpath. `--force` vi pull vao thu muc rong thi
# CLI khong nhan ra la thu muc theme (bay da ghi trong BAY-DA-TRA-GIA.md).
DICH="$TAM"; command -v cygpath >/dev/null && DICH="$(cygpath -w "$TAM")"
ARGS=(); for f in "$@"; do ARGS+=(--only "$f"); done
( cd "$TAM" && shopify theme pull -e live --no-input --force "${ARGS[@]}" --path "$DICH" >/dev/null 2>&1 )
# Shopify tu gan khoi chu thich "IMPORTANT: ... auto-generated" vao dau tep
# JSON sau moi lan ghi. Khong phai thay doi cua ai — bo no o CA HAI ve truoc
# khi so, neu khong lan nao cung bao do gia.
boChuThich() { sed '1{/^\/\*/!b};1,/\*\//{/^\/\*/,/\*\//d}' | tr -d '\r'; }
# Voi tep .json thi so theo NGU NGHIA, khong so theo chuoi: Shopify ghi lai
# JSON theo thu tu khoa khac sau moi lan luu trong trinh soan theme, va mot
# tep thieu dau xuong dong cuoi cung bao do.
#
# Ngay 14/10/2026 phep so nay bao product.json "KHAC tren live" voi mot khoi
# diff trong do co `giam2`/`giam3` — hai o quyet dinh gia hien ra cho khach.
# Doc thoang qua thi tuong live mat hai o do. That ra ca hai ben deu co, chi
# nam o dong khac. Mat mot vong soi moi loai duoc.
#
# Bao dong gia nguy hiem dung bang bo sot: ai cung se hoc cach lo phep kiem.
chuanHoa() {
  case "$1" in
    *.json) python3 -c "
import json,re,sys
s=re.sub(r'^\s*/\*.*?\*/','',sys.stdin.read(),flags=re.S)
try: print(json.dumps(json.loads(s), indent=2, sort_keys=True, ensure_ascii=False))
except Exception: sys.stdout.write(s)
" ;;
    *) cat ;;
  esac
}
# So voi ban DA COMMIT (HEAD), khong phai thu muc lam viec: thu muc lam viec
# dang chua chinh sua sap push, so voi no thi lan nao cung bao do — chinh
# minh tu bao dong gia ve viec minh dang lam (do 14/10/2026).
banRepo() { git -C "$REPO" show "HEAD:$1" 2>/dev/null | boChuThich; }
KHAC=0
for f in "$@"; do
  if [ ! -f "$TAM/$f" ]; then echo "?? $f: khong keo duoc tu live"; KHAC=1; continue; fi
  if ! diff -q <(banRepo "$f" | chuanHoa "$f") <(boChuThich < "$TAM/$f" | chuanHoa "$f") >/dev/null 2>&1; then
    echo "!! $f KHAC tren live (so voi HEAD):"
    echo "   < repo    > live"
    diff <(banRepo "$f" | chuanHoa "$f") <(boChuThich < "$TAM/$f" | chuanHoa "$f") | head -40
    KHAC=1
  else
    echo "ok $f"
  fi
done
if [ "$KHAC" = 1 ]; then
  echo
  echo "DUNG LAI. Ban live giu o: $TAM"
  echo "Doc diff o tren, dua thay doi cua chu shop vao repo, roi moi push."
  exit 1
fi
rm -rf "$TAM"
