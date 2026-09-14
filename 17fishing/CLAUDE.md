# 17fishing — chỉ dẫn cho trợ lý

Đọc `~/my-project/CLAUDE.md` trước (vai trò, quyền hạn, bẫy chung), rồi tệp này.
Hồ sơ quản lý đầy đủ nằm ở `QUAN-LY.md` cùng thư mục — tệp này chỉ giữ thứ cần
biết NGAY khi bắt tay sửa mã.

---

## 1. Cửa hàng này bán gì

Đồ câu cá: cần, máy câu, phao, lưỡi, cước, ghế, phụ kiện. Khách là **cần thủ**,
phần lớn câu đài hồ dịch vụ và câu đêm.

Khác GaRutin ở một điểm chi phối: đây là **hàng công nghiệp có thông số**. Khách
so tải chì, chiều dài, độ cứng trước khi mua. Sản phẩm không có bảng thông số là
sản phẩm khách phải nhắn Zalo hỏi.

Tên miền: `17-fishing.com` · `admin.17-fishing.com` · `api.17-fishing.com`.

---

## 2. Quy mô thật — đo ngày 14/09/2026

```
khách / 30 ngày          859          lượt truy cập    1.381
sản phẩm                  11          bài viết          104
ĐƠN HÀNG, TOÀN BỘ LỊCH SỬ  2
Search Console (90 ngày)  95 từ khoá · 632 hiển thị · 10 nhấp
```

**Trang sản phẩm mạnh hơn blog, ngược với trực giác.** Số liệu 90 ngày:

```
/blog/        75 trang   7.872 hiển thị   CTR dưới 1%
/san-pham/     8 trang     731 hiển thị   CTR 9,0%
```

Ghế Zhongzhou ở **hạng 3,2 với 30 lượt nhấp** — trang mạnh nhất site. Đừng lặp
lại kết luận "sản phẩm chưa vào chỉ mục"; đã đo và **sai**.

Việc mua bán thật vẫn diễn ra qua Zalo và không vào hệ thống. Mọi tỉ lệ chuyển
đổi ở đây đều thiếu tử số.

---

## 3. Search Console — chỗ đã mất một vòng gỡ lỗi

Property của shop là loại **tiền tố URL**, không phải tên miền. Biến môi trường
phải là:

```
GSC_SITE_URL=https://17-fishing.com/      ← có https, có gạch chéo cuối
```

Khai `sc-domain:17-fishing.com` thì Google trả **"User does not have sufficient
permission"** — câu đó nói về quyền nhưng gốc rễ là gọi nhầm tên property, và
service account vẫn có quyền đầy đủ. Đã mất một vòng đi tìm nhầm chỗ.

`GET /admin/keywords/gsc-site` liệt kê property mà service account thật sự thấy
— dùng nó để phân biệt "chưa được thêm" với "khai sai dạng".

`GET /admin/keywords/gsc-trang` trả số liệu **theo trang**. Dữ liệu theo truy vấn
không trả lời được câu "trang sản phẩm có vào chỉ mục không".

---

## 4. Khuôn bố cục trang sản phẩm

Trang chi tiết dựng bằng **block**. Hiện có **21 block thuộc 16 nhóm dữ liệu**.

Trục chính của thiết kế, đừng làm ngược:

- **NHÓM** giữ nội dung và bộ ô nhập
- **BLOCK** chỉ là một cách bày nhóm đó ra

Nhiều block cùng nhóm (`diem-manh` và `diem-manh-bento`) đọc ghi **cùng một chỗ**
và có **y hệt bộ ô nhập**. Trước đây mỗi block khai ô riêng, nên soạn ở kiểu
thường rồi đổi sang bento là mất chỗ nhập cho hai ô riêng của bento.

`src/product-templates/registry.ts` là **nguồn sự thật**. Thêm block mới gồm ba
bước, không nhiều hơn:

```
1. khai báo ở registry.ts (backend)
2. viết component ở 17fishing-Web/src/components/khoi/
3. thêm một dòng vào boKhoi.tsx
```

Kho `/kho-giao-dien` tự sinh từ khai báo và hiện **cảnh báo đỏ** khi khai mà thiếu
component. Chạy `npm run kiem-khoi` bên Web để so hai bên.

Khuôn dựng sẵn chỉ gieo khi CHƯA có — thêm block vào registry thì phải gọi
`POST /admin/product-templates/:id/khoi-phuc` mới nhận.

---

## 5. Bẫy đã trả giá — đọc kỹ

Đây là bẫy ở tầm **cửa hàng**. Bẫy của riêng từng repo nằm trong `CLAUDE.md` của
chính repo đó — mở repo nào thì tệp đó nạp theo, không cần tìm.


### Bỏ dấu chập từ khác nghĩa

Với vốn từ của shop này: **`mồi` và `mới` đều thành `moi`** — nguy nhất, vì hàng
chục tiêu đề có "cho người mới" còn mồi là cả nhóm hàng. Và **`cần` với `cân`**.
`phan-tich.ts` ghim bốn từ đó thành mã riêng trước khi bỏ dấu.

### Lượt xem từng bị công cụ nội bộ thổi phồng

Khung xem trước và kho giao diện dựng trang thật nên ghi lượt xem y như khách —
đã từng chiếm **10,1% tổng lượt 5 ngày**. Đã lọc và đã dọn rác. Ý nghĩa còn lại:
**số liệu trước 14/09/2026 vẫn còn lẫn**, đừng so hai bên mốc đó rồi kết luận
lượt khách giảm.

### Trôi dạt với GaRutin

Hai repo lệch nhau nhiều hơn tưởng. Riêng trong một ngày đã gặp: `uuid_generate_v4`
vs `gen_random_uuid`, canonical, `redirectTo` chỉ có một bên, video sản phẩm chỉ
GaRutin có. **Sửa một bên xong phải mở bên kia ra xem**, đừng giả định giống nhau.

---

## 6. Bản đồ API quản trị

Sau `JwtAuthGuard`, tiền tố `https://api.17-fishing.com/api`.

```
sản phẩm   GET/POST /admin/products · PATCH,DELETE /admin/products/:id
           GET /products/:slug        nhận cả slug lẫn uuid
khuôn      GET /product-templates · GET /product-templates/khoi   (công khai)
           PUT,DELETE /admin/product-templates/:id
           POST /admin/product-templates/:id/khoi-phuc
từ khoá    GET /admin/keywords/phan-tich · /gsc-san-sang · /gsc-site · /gsc-trang
           POST /admin/keywords/dong-bo-search-console
phân tích  GET /admin/analytics/{visits,table,sources,funnel,hours,devices,
                                 product-funnel,searches}
           GET,DELETE /admin/analytics/rac-cong-cu   dọn lượt xem của công cụ
đơn hàng   POST /orders/tinh-tien     máy chủ tự tính tiền, KHÔNG nhận giá từ web
```

---

## 7. Việc treo NGUY nhất

`GET /customers/phone/:phone` **trả 200 không cần token** — ai trên Internet cũng
tra được khách theo số điện thoại. Đã ghi trong hồ sơ từ 10/09, tới 14/09 vẫn
chưa sửa. Thiếu đúng một dòng `@UseGuards(JwtAuthGuard)`.

Phần còn lại xem `QUAN-LY.md` mục 8.

---

## 8. Vận hành

```
deploy    push vào main → GitHub Actions → EC2
          rm -rf node_modules && npm ci && build && migration && pm2 restart
          vài phút, KHÔNG có môi trường thử
kiểm tra  npx tsc -p tsconfig.build.json --noEmit
migration mới nhất: 1800000000055 — tiếp theo là 056
CMS + Web Vercel, tự deploy khi push
```

Tải tệp tối đa **18 MB** (`MediaController.TOI_DA`), khớp với `src/lib/upload.ts`
bên CMS. Lệch hai con số đó là người dùng bị từ chối sau khi đã chờ tải xong.

Ảnh tải lên tự chuyển WebP, xoay theo EXIF và chặn cạnh dài 1600px ở
`storage/r2.service.ts`.
