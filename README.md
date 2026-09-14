# manager-agent — bộ tài liệu người quản lý tài sản

Thư mục này là **nguồn sự thật** cho agent quản lý và bộ chỉ dẫn đi kèm.

## Vì sao có thư mục này

Trước đây các tệp chỉ nằm ở `~/.claude/` — thư mục cấu hình của Claude Code trên
máy cá nhân. Hai hệ quả:

- **Không repo nào theo dõi chúng.** Tệp agent 27 KB, viết qua nhiều buổi, chỉ
  tồn tại đúng một bản trên một máy. Máy hỏng là mất.
- **Sáu repo đều `.gitignore` mục `.claude`**, nên không đưa vào repo được. Riêng
  `GaRutinBE` có ngoại lệ `!.claude/agents/` nhưng thư mục đó rỗng — ngoại lệ vô
  dụng, và không ai biết cho tới khi kiểm.

Tên `manager-agent` nằm ngoài mọi luật ignore nên không bị chặn.

## Nội dung

```
agents/quan-ly-tai-san.md   agent nhận bàn giao và trông coi một tài sản bất kỳ
skills/quan-ly/SKILL.md     bản chạy trong cuộc trò chuyện, không tách phiên riêng
CLAUDE-chung.md             bản sao chỉ dẫn chung của ~/my-project/CLAUDE.md
```

`CLAUDE-chung.md` là **bản sao để lưu vết**, không phải bản đang chạy. Bản chạy
là `~/my-project/CLAUDE.md`. Sửa bản chạy trước, rồi `./dong-bo.sh luu` để chép
sang đây.

## Cài lên máy mới

```bash
./dong-bo.sh cai      # chép từ thư mục này sang ~/.claude
```

## Sau khi sửa tài liệu

Sửa ở `~/.claude` rồi chép ngược về đây để commit:

```bash
./dong-bo.sh luu
git add -A && git commit -m "..." && git push
```

**Chép chứ không symlink.** Symlink trong git chạy được nhưng hỏng lặng lẽ khi
đổi máy hoặc đổi đường dẫn nhà, và lúc đó agent đơn giản là không nạp — không có
thông báo nào. Chép thì thấy ngay tệp có hay không.

## Cần làm một lần

Thư mục này **chưa có remote**. Cần tạo repo trên GitHub rồi:

```bash
git remote add origin git@github-personal:<tài-khoản>/manager-agent.git
git push -u origin main
```

Nhớ dùng alias `github-personal` — khoá SSH mặc định xác thực nhầm sang tài khoản
công ty.
