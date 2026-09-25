"""
Bộ công cụ thay chữ Trung trong ảnh 1688 bằng chữ Việt.

Vì sao không dùng thư viện dịch ảnh: chữ trên các ảnh này nằm trên dải màu
phẳng hoặc trên ảnh tối, nên che rồi vẽ lại cho kết quả sạch hơn nhiều so với
mọi cách tự động — và quan trọng hơn, chữ viết ra là chữ TÔI chọn, không phải
bản dịch máy của một câu quảng cáo tiếng Trung.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageStat

# Đường dẫn font tính theo VỊ TRÍ TỆP NÀY, không theo thư mục đang đứng.
# Bản đầu dùng đường dẫn tương đối nên chỉ chạy được khi đứng đúng một chỗ —
# mà bước Việt hoá ảnh thì luôn chạy trong thư mục ảnh của sản phẩm.
import os
_TM = os.path.dirname(os.path.abspath(__file__))
F7 = os.path.join(_TM, 'font', 'bvp-700.ttf')
F4 = os.path.join(_TM, 'font', 'bvp-400.ttf')

def font(dam, co):
    return ImageFont.truetype(F7 if dam else F4, co)

def mo(im, box, ban_kinh=18):
    """Xoá chữ bằng cách LÀM MỜ chính vùng đó.

    Tốt hơn tô một ô màu phẳng khi nền là ảnh chụp: dải mờ vẫn giữ sắc độ và
    chuyển màu của nền nên không lộ ra như một miếng vá."""
    v = im.crop(box).filter(ImageFilter.GaussianBlur(ban_kinh))
    im.paste(v, box[:2])

def phu(im, box, mau=(0, 0, 0), duc=110):
    """Phủ một lớp màu mờ lên vùng — dùng sau `mo` để chữ mới nổi lên."""
    lop = Image.new('RGBA', (box[2] - box[0], box[3] - box[1]), (*mau, duc))
    im.paste(Image.alpha_composite(im.crop(box).convert('RGBA'), lop).convert('RGB'), box[:2])

def to(im, box, mau):
    ImageDraw.Draw(im).rectangle(box, fill=mau)

def nen(im, box):
    """Màu trung bình của một vùng — để tô đè cho khớp nền phẳng."""
    return tuple(int(x) for x in ImageStat.Stat(im.crop(box)).mean[:3])

def vua(chu, dam, rong, co_toi_da):
    """Cỡ chữ lớn nhất mà vẫn lọt chiều ngang cho trước."""
    co = co_toi_da
    while co > 8:
        f = font(dam, co)
        if f.getbbox(chu)[2] <= rong: return f
        co -= 1
    return font(dam, 8)

def viet(im, box, chu_, dam=True, mau=(255, 255, 255), canh='giua', co=None, khoang=0):
    """Viết chữ vào giữa (hoặc trái) một ô, tự co cho vừa."""
    d = ImageDraw.Draw(im)
    rong = box[2] - box[0]
    f = font(dam, co) if co else vua(chu_, dam, rong, box[3] - box[1])
    if f.getbbox(chu_)[2] > rong: f = vua(chu_, dam, rong, f.size)
    l, t, r, b = f.getbbox(chu_)
    if canh == 'giua':  x = box[0] + (rong - (r - l)) / 2
    elif canh == 'phai': x = box[2] - (r - l)
    else:               x = box[0]
    y = box[1] + ((box[3] - box[1]) - (b - t)) / 2 - t
    d.text((x, y), chu_, font=f, fill=mau)

def mo_anh(p): return Image.open(p).convert('RGB')

def cot_sach(im, y0, y1, rong=10, tru=(), gan=None):
    """Tìm cột dọc SẠCH NHẤT trong khoảng dòng cho trước.

    "Sạch" = ĐỒNG ĐỀU nhất theo chiều ngang trong dải đó: không có chữ, không
    có đường kẻ, không có vật thể cắt qua.

    Bản đầu chọn cột TỐI nhất, ngầm định nền tối nên tối = sạch. Chạy lên ảnh
    nền kem của cần lăng xê Bennuo thì nó chọn đúng thân cần màu vàng đậm —
    cột "tối nhất" tấm ảnh — rồi kéo ngang ra thành một vệt vàng loang trùm
    cả khối tiêu đề. Sai theo kiểu nhìn là thấy, nhưng chỉ thấy khi đã mở ảnh
    ra xem, nên nó vẫn lọt nếu tin vào script.

    Tiêu chí mới không nhìn tới màu nền: cột nào biến thiên ít nhất theo chiều
    NGANG (giữa các điểm trong bề rộng mẫu) và theo chiều DỌC thì cột đó phẳng.
    Nền chuyển màu dọc vẫn đạt, vì chênh lệch giữa hai dòng liền nhau rất nhỏ.

    `gan` là tâm ngang của ô đang vá. Nền nhiều tấm còn chuyển màu theo chiều
    NGANG nữa: bản trước lấy cột phẳng nhất toàn ảnh, rơi vào mép phải trắng,
    và miếng vá giữa nền kem hiện ra thành một hình chữ nhật trắng. Phạt theo
    khoảng cách để cột mẫu nằm sát ô cần vá.
    """
    g = im.convert('L')
    px = g.load()
    tot, diem_tot = None, 10 ** 9
    ys = list(range(y0, min(y1, im.height), 2))
    if not ys:
        return 0
    for x in range(0, im.width - rong, 4):
        if any(a <= x <= b for a, b in tru):
            continue
        # Biến thiên ngang: trong một dòng, điểm sáng nhất lệch điểm tối nhất
        # bao nhiêu. Chữ hay đường kẻ làm số này vọt lên ngay.
        ngang_ = max(max(px[x + i, y] for i in range(rong))
                     - min(px[x + i, y] for i in range(rong)) for y in ys)
        # Biến thiên dọc giữa hai dòng liền kề: bắt các mép ngang (đáy ảnh
        # nhỏ, viền khung) mà phép đo ngang bỏ sót.
        doc_ = max(abs(px[x, ys[k]] - px[x, ys[k - 1]]) for k in range(1, len(ys))) if len(ys) > 1 else 0
        diem = ngang_ * 2 + doc_
        if gan is not None:
            diem += abs(x - gan) / max(1, im.width) * 60
        if diem < diem_tot:
            tot, diem_tot = x, diem
    return tot if tot is not None else 0


def xoa(im, box, x_sach=None, rong_mau=10):
    """Xoá chữ bằng cách NHÂN BẢN một dải dọc sạch ở cùng độ cao.

    Tô một ô màu phẳng thì lộ ngay: nền mấy ảnh này là dải chuyển màu theo
    CHIỀU DỌC, nên một ô cùng màu ở mọi dòng sẽ sáng hơn nền ở trên và tối hơn
    ở dưới — đã dính đúng thế ở bản đầu, các ô vá hiện rõ thành hình chữ nhật.

    Lấy đúng cột `x_sach` (mép ảnh, hoặc khe giữa hai cột chữ) rồi kéo ngang ra
    thì dải chuyển màu khớp từng dòng một.
    """
    x0, y0, x1, y1 = box
    if x_sach is None:
        x_sach = cot_sach(im, y0, y1, rong_mau, tru=[(x0 - 6, x1 + 6)], gan=(x0 + x1) // 2)
    dai_ = im.crop((x_sach, y0, x_sach + rong_mau, y1)).resize((x1 - x0, y1 - y0))
    # Làm mượt nhẹ: kéo ngang một dải 10px ra 700px để lại vệt sọc thấy rõ.
    im.paste(dai_.filter(ImageFilter.GaussianBlur(1.2)), (x0, y0))

def hang_sach(im, x0, x1, y0, y1, cao=6, tru=()):
    """Tìm HÀNG NGANG sạch nhất quanh một ô — bản đối xứng của `cot_sach`.

    Dùng khi nền chuyển màu theo chiều NGANG. Nhân bản dải DỌC rồi kéo ngang
    (hàm `xoa`) giữ được gradient dọc nhưng LÀM PHẲNG gradient ngang, nên trên
    thẻ có nền sáng dần từ trái sang phải, miếng vá hiện ra thành một khối màu
    đều sáng hơn hẳn phần nền quanh nó. Đúng lỗi đó ở ảnh so sánh a31.
    """
    g = im.convert('L')
    px = g.load()
    xs = list(range(x0, min(x1, im.width), 4))
    if not xs:
        return max(0, y0 - cao)
    tot, diem_tot = None, 10 ** 9
    for y in range(max(0, y0 - 120), min(im.height - cao, y1 + 120)):
        if y0 - cao <= y <= y1 or any(a <= y <= b for a, b in tru):
            continue
        doc_ = max(max(px[x, y + i] for i in range(cao))
                   - min(px[x, y + i] for i in range(cao)) for x in xs)
        diem = doc_ * 2 + abs(y - (y0 + y1) // 2) / max(1, im.height) * 60
        if diem < diem_tot:
            tot, diem_tot = y, diem
    return tot if tot is not None else max(0, y0 - cao)


def xoa_ngang(im, box, y_sach=None, cao_mau=6):
    """Xoá chữ bằng cách nhân bản một dải NGANG sạch, kéo dọc xuống.

    Giữ nguyên gradient theo chiều ngang. Cặp với `xoa` (giữ gradient dọc);
    chọn cái nào là theo chiều nền chuyển màu, không theo thói quen.
    """
    x0, y0, x1, y1 = box
    if y_sach is None:
        y_sach = hang_sach(im, x0, x1, y0, y1, cao_mau)
    dai_ = im.crop((x0, y_sach, x1, y_sach + cao_mau)).resize((x1 - x0, y1 - y0))
    im.paste(dai_.filter(ImageFilter.GaussianBlur(1.2)), (x0, y0))
