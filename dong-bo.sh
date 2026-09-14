#!/usr/bin/env bash
# Đồng bộ tài liệu quản lý giữa repo này, ~/.claude và sáu repo mã nguồn.
#
# Ba việc tách bạch, không có chế độ "tự đoán":
#   cai   — repo  → ~/.claude   (dựng máy mới, hoặc lấy lại bản đã commit)
#   luu   — ~/.claude → repo    (sau khi sửa, để commit)
#   kiem  — soát dây nối: repo mã nguồn có thật sự nhập hồ sơ dự án không
#
# Cố ý không gộp cai/luu thành một lệnh "sync": đồng bộ hai chiều tự động là
# cách chắc chắn nhất để một hôm nào đó bản cũ đè mất bản mới mà không ai biết.
set -euo pipefail
GOC="$(cd "$(dirname "$0")" && pwd)"
DICH="$HOME/.claude"
MA="$HOME/my-project"

# repo → dự án. Nguồn sự thật của phép kiểm bên dưới.
declare -A DUAN=(
  [GaRutinBE]=garutin      [GaRutinWeb]=garutin      [GaRutinCMS]=garutin
  [17fishing-BE]=17fishing [17fishing-Web]=17fishing [17fishing-CMS]=17fishing
)

case "${1:-}" in
  cai)
    mkdir -p "$DICH/agents" "$DICH/skills"
    cp -v "$GOC/agents/"*.md "$DICH/agents/"
    cp -rv "$GOC/skills/"* "$DICH/skills/"
    echo "→ Đã cài. Khởi động lại Claude Code để nạp agent mới."
    ;;

  luu)
    cp -v "$DICH/agents/quan-ly-tai-san.md" "$GOC/agents/"
    cp -rv "$DICH/skills/quan-ly" "$GOC/skills/"
    cp -v "$MA/CLAUDE.md" "$GOC/chung/CLAUDE.md"
    echo "→ Đã chép về repo. Xem 'git diff' rồi commit."
    ;;

  kiem)
    # Hỏng ở đây là hỏng IM LẶNG: phiên vẫn chạy, chỉ là không biết gì về shop.
    # Đúng loại lỗi đã mất cả ngày 14/09 mới nhận ra, nên phải có phép kiểm.
    loi=0
    for repo in "${!DUAN[@]}"; do
      duan="${DUAN[$repo]}"
      tep="$MA/$repo/CLAUDE.md"
      ho_so="$GOC/$duan/CLAUDE.md"
      lenh="~/my-project/manager-ai/$duan/CLAUDE.md"

      # Không dùng cú pháp @ của Claude Code: đã đo 14/09/2026, @ chỉ với tới
      # tệp nằm TRONG repo đang mở, trỏ ra ngoài thì bỏ qua không báo gì.
      # Chi tiết phép đo: README.md.
      if   [[ ! -f "$tep" ]];                        then ket="THIẾU CLAUDE.md"; loi=1
      elif [[ ! -f "$ho_so" ]];                      then ket="hồ sơ $duan không tồn tại"; loi=1
      elif ! grep -qF "$lenh" "$tep";                then ket="không trỏ tới hồ sơ $duan"; loi=1
      elif ! grep -qF "BẮT BUỘC đọc" "$tep";         then ket="thiếu lệnh bắt buộc đọc"; loi=1
      elif grep -qE "^@" "$tep";                     then ket="còn dòng @ (không nạp được, xem README)"; loi=1
      else ket=""
      fi

      if [[ -n "$ket" ]]; then printf '   ✗ %-16s %s\n' "$repo" "$ket"
      else                     printf '   ✓ %-16s → %s\n' "$repo" "$duan"; fi
    done
    [[ $loi -eq 0 ]] && echo "→ Sáu repo đều trỏ đúng hồ sơ dự án." \
                     || { echo "→ Có repo đứt dây nối, sửa CLAUDE.md của nó." >&2; exit 1; }
    ;;

  *)
    echo "Dùng: $0 cai | luu | kiem" >&2
    exit 1
    ;;
esac
