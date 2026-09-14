# manager-ai — trí nhớ của người quản lý

Repo này giữ **hiểu biết về cửa hàng**, tách khỏi mã nguồn. Mã nằm ở sáu repo
kia; những gì một người quản lý cần biết để làm việc trên chúng thì nằm ở đây.

## Cách sắp xếp: theo DỰ ÁN, không theo repo

```
chung/CLAUDE.md         vai trò, quyền hạn, bẫy dùng chung cả hai shop
                        (bản sao lưu vết của ~/my-project/CLAUDE.md)

garutin/CLAUDE.md       hiểu biết GaRutin — tự nạp vào cả 3 repo GaRutin
garutin/QUAN-LY.md      hồ sơ đầy đủ: việc treo, số liệu, rủi ro

17fishing/CLAUDE.md     hiểu biết 17fishing — tự nạp vào cả 3 repo 17fishing
17fishing/QUAN-LY.md    hồ sơ đầy đủ

agents/quan-ly-tai-san.md   agent nhận bàn giao và trông coi một tài sản
skills/quan-ly/SKILL.md     bản chạy trong cuộc trò chuyện, không tách phiên
```

**Một shop = một hồ sơ, ba repo cùng dùng.** Trước đây hiểu biết GaRutin nằm
trong `GaRutinBE/CLAUDE.md`, nên phiên làm ở `GaRutinWeb` hay `GaRutinCMS`
**không nạp gì cả** — và suốt ngày 14/09 việc chủ yếu làm đúng ở Web và CMS.
Đó là lý do phải đo lại nhiều thứ lẽ ra đã biết.

Cách chữa sai là chép hồ sơ sang cả ba repo. Không làm vậy: ba bản sẽ trôi dạt,
y hệt `tracking.service.ts` hai shop. Chỉ giữ một bản, các repo trỏ vào.

## Cách các repo nạp hồ sơ

`CLAUDE.md` của mỗi repo chứa một dòng nhập:

```
@~/my-project/manager-ai/garutin/CLAUDE.md
```

Claude Code đọc dòng `@` này và **nhập thẳng nội dung tệp** vào phiên — một bản
duy nhất nhưng nạp tự động ở cả ba repo.

`QUAN-LY.md` cố ý **không** nhập: nó dài hàng trăm dòng, nhét vào mọi phiên là
làm loãng. Repo chỉ ghi đường dẫn để mở khi cần.

Phần còn lại của `CLAUDE.md` mỗi repo là **bẫy riêng của repo đó** — thứ chỉ
đúng với chính nó, ví dụ `loading.tsx` không được nằm trong `/san-pham` của
`17fishing-Web`. Loại đó ở lại repo, không đưa lên đây.

## Luật chia: cái gì ở đâu

Một điều chỉ được ghi **đúng một chỗ**. Hỏi "điều này còn đúng nếu đổi sang repo
khác của cùng shop không?":

| Còn đúng | Ví dụ | Ghi ở |
|---|---|---|
| ✔ cả ba repo | bán gì, quy mô thật, đọc bảng phân tích thế nào, việc treo | `manager-ai/<dự án>/` |
| ✘ chỉ một repo | `loading.tsx` không được nằm trong `/san-pham`, `VITE_*` nhúng lúc build | `CLAUDE.md` của repo đó |
| ✔ cả hai shop | quyền hạn, git, CloudFront 30 giây, bẫy tiếng Việt | `~/my-project/CLAUDE.md` |

Ghi hai chỗ thì sáu tháng nữa hai chỗ nói khác nhau, và không ai biết chỗ nào
đúng. Đã dọn một lượt ngày 14/09/2026: bốn cái bẫy đang nằm cả ở hồ sơ lẫn thẻ
repo.

Kiểm dây nối còn nguyên:

```bash
./dong-bo.sh kiem
```

## Đồng bộ với ~/.claude

Agent và skill phải nằm ở `~/.claude` mới chạy được, nhưng `~/.claude` không
được repo nào theo dõi — máy hỏng là mất. Nên giữ bản gốc ở đây và chép qua lại:

```bash
./dong-bo.sh cai      # repo → ~/.claude   (máy mới, hoặc lấy lại bản đã commit)
./dong-bo.sh luu      # ~/.claude → repo   (sau khi sửa, để commit)
git add -A && git commit -m "..." && git push
```

**Chép chứ không symlink.** Symlink chạy được trong git nhưng hỏng lặng lẽ khi
đổi máy hoặc đổi đường dẫn nhà — lúc đó agent đơn giản là không nạp, không có
thông báo nào.

## Vì sao tên là `manager-ai`

Sáu repo đều `.gitignore` mục `.claude`, nên tài liệu để trong đó không đưa vào
git được. `GaRutinBE` có ngoại lệ `!.claude/agents/` nhưng thư mục đó rỗng —
ngoại lệ vô dụng mà không ai biết cho tới khi kiểm. Tên này nằm ngoài mọi luật
ignore.

Remote dùng alias `git@github-personal:...`. Khoá SSH mặc định xác thực nhầm
sang tài khoản công ty.
