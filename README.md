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

## Cách các repo lấy hồ sơ: ĐỌC, không tự nạp

`CLAUDE.md` của mỗi repo dài 25 dòng và không chứa hiểu biết nào — nó chỉ ra
lệnh đọc `manager-ai/<dự án>/CLAUDE.md` trước khi bắt tay.

### Đã thử tự nạp bằng `@` và KHÔNG được — đừng thử lại

Claude Code có cú pháp `@đường/dẫn` để nhập tệp vào `CLAUDE.md`. Đo ngày
14/09/2026 bằng cách chạy một phiên riêng rồi hỏi một con số chỉ có trong hồ sơ:

| Khai thế nào | Kết quả |
|---|---|
| `@~/my-project/manager-ai/17fishing/CLAUDE.md` | ✗ không nạp |
| `@../manager-ai/17fishing/CLAUDE.md` | ✗ không nạp |
| `@manager-ai/17fishing/CLAUDE.md` đặt ở `CLAUDE.md` gốc | ✗ không nạp |
| `@.ho-so/thu.md` — tệp nằm **trong chính repo** | ✓ nạp |

**`@` chỉ với tới tệp nằm trong repo đang mở.** Trỏ ra ngoài thì bị bỏ qua
**không một lời báo nào** — tệp vẫn ghi "tự nạp", phiên vẫn chạy, chỉ là mù.

Nên chọn cách đọc tay: tốn một lần đọc tệp, nhưng không có mắt xích nào hỏng
ngầm được. Tệp có hay không thấy ngay.

## Luật chia: cái gì ở đâu

Một điều chỉ được ghi **đúng một chỗ**. Hỏi "điều này còn đúng nếu đổi sang repo
khác của cùng shop không?":

| Còn đúng | Ví dụ | Ghi ở |
|---|---|---|
| ✔ cả ba repo | bán gì, quy mô thật, đọc bảng phân tích thế nào, việc treo | `manager-ai/<dự án>/` |
| ✘ chỉ một repo | `loading.tsx` không được nằm trong `/san-pham`, `VITE_*` nhúng lúc build | `manager-ai/<dự án>/` mục "Bẫy theo repo" |
| ✔ cả hai shop | quyền hạn, git, CloudFront 30 giây, bẫy tiếng Việt | `~/my-project/CLAUDE.md` |

Ghi hai chỗ thì sáu tháng nữa hai chỗ nói khác nhau, và không ai biết chỗ nào
đúng.

Kể cả bẫy của riêng một repo cũng để ở đây, **không** để trong repo đó. Sáu repo
là sáu chỗ phải nhớ cập nhật, và trong đúng một buổi sáng đã có bốn cái bẫy nằm
cả hai nơi. Repo chỉ giữ mã.

Kiểm dây nối còn nguyên:

```bash
./dong-bo.sh kiem
```

## Ba lớp — đừng trộn vào nhau

```
LỚP 1  TÁC NHÂN   ai làm việc          agents/ + skills/   → cài vào ~/.claude
LỚP 2  HỒ SƠ      biết gì về shop      garutin/ 17fishing/ → đọc tay khi cần
LỚP 3  MÃ         sửa cái gì           sáu repo            → chỉ chứa mã
```

Lớp 1 **không biết gì về hai cửa hàng** — nó là định nghĩa nghề quản lý, giao
cho tài sản nào cũng chạy được. Lớp 2 mới là hiểu biết riêng của shop. Tách ra
để sửa vai không đụng kiến thức, và ngược lại.

## Tác nhân quản lý: gọi thế nào

Có hai cách gọi, khác nhau ở chỗ **có bàn lại được hay không**.

### `/quan-ly` — bàn cùng, ngay trong hội thoại (dùng cái này là chính)

Giữ nguyên ngữ cảnh phiên đang chạy, hỏi lại được ngay, làm từng chặng báo từng
chặng. Chặn được khi thấy đi sai hướng, thay vì đọc một bản dài rồi mới phát
hiện lệch từ đầu.

Skill **thừa hưởng toàn bộ công cụ của phiên** — sửa mã, git, gọi API ghi. Và
đó là chủ ý: người quản lý ở đây là **quản lý gia làm việc trực tiếp với chủ**,
chủ giao gì thì làm nấy, không phải cởi vai ra mới được đụng vào mã.

### Agent `quan-ly-tai-san` — giao rồi chờ báo cáo

Chạy phiên riêng với `Bash, Read, Grep, Glob, Write, Edit`. Lưu ý: `Write` và
`Edit` **không hề bị chặn về kỹ thuật** — ranh giới là kỷ luật, không phải công
cụ. Khác biệt thật so với skill: agent nền **không hỏi lại được giữa chừng**,
nên "được giao" phải đọc ra từ việc chủ đã nêu, không được suy đoán.

Dùng khi **nhận bàn giao một tài sản MỚI** (bảy giai đoạn khảo sát, mục 4 của
định nghĩa) hoặc khi muốn một bản rà soát độc lập.

### Ranh giới thật: được giao, hay tự cho là nên làm

Không phải "vai quản lý thì không được sửa mã". Là:

| Tình huống | Làm gì |
|---|---|
| Chủ giao, hoặc nằm gọn trong việc chủ vừa giao | làm |
| Mình thấy đáng làm, chủ chưa nói | **đề xuất**, đừng tự tay làm |
| Không hoàn tác được — xoá, ghi đè, đổi giá, gửi ra ngoài | hỏi trước, kể cả khi đã được giao phần việc lớn hơn |

Có sẵn công cụ không phải là lý do để tự quyết.

### Với hai shop đã có hồ sơ thì bỏ qua giai đoạn khảo sát

`garutin/` và `17fishing/` đã là hồ sơ hoàn chỉnh. Vào vai xong thì **đọc hồ sơ,
đừng khảo sát lại từ đầu** — bảy giai đoạn là để nhận tài sản chưa có hồ sơ.
Số cũ hơn một ngày thì đo lại, và nói rõ đo lúc nào.

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
