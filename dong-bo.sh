#!/usr/bin/env bash
# Đồng bộ tài liệu agent giữa repo này và ~/.claude
#
# Hai chiều tách bạch, không có chế độ "tự đoán":
#   cai  — repo  → ~/.claude   (dựng máy mới, hoặc lấy lại bản đã commit)
#   luu  — ~/.claude → repo    (sau khi sửa, để commit)
#
# Cố ý không gộp thành một lệnh "sync": đồng bộ hai chiều tự động là cách chắc
# chắn nhất để một hôm nào đó bản cũ đè mất bản mới mà không ai biết.
set -euo pipefail
GOC="$(cd "$(dirname "$0")" && pwd)"
DICH="$HOME/.claude"

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
    cp -v "$HOME/my-project/CLAUDE.md" "$GOC/CLAUDE-chung.md"
    echo "→ Đã chép về repo. Xem 'git diff' rồi commit."
    ;;
  *)
    echo "Dùng: $0 cai | luu" >&2
    exit 1
    ;;
esac
