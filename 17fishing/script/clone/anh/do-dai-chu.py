# -*- coding: utf-8 -*-
"""Dò các DẢI CHỮ trong ảnh xưởng: hàng nào nhiều điểm TƯƠNG PHẢN thì là chữ.

Đo bằng máy thay vì ước lượng bằng mắt trên ảnh thu nhỏ — đã từng đo nhầm toạ
độ vì ảnh hiển thị bị co tỉ lệ khác nhau tuỳ tấm.

Bản đầu chỉ đếm điểm SÁNG, ngầm định nền tối. Chạy lên bộ ảnh cần lăng xê
Bennuo (nền kem) thì nó báo đúng một dải "y 0-1200", tức là cả tấm ảnh — sai
mà không có dấu hiệu gì, vì cả ảnh đều sáng hơn ngưỡng.

Nay tự nhận nền theo trung vị độ sáng của chính vùng đang dò, và ép được bằng
`--toi` / `--sang` khi tự nhận sai.

Dùng:
  python3 do-dai-chu.py anh/a06.jpg
  python3 do-dai-chu.py anh/a06.jpg --y 700 1200 --sang
  python3 do-dai-chu.py anh/a06.jpg --x 0 420 --it 40

GIỚI HẠN, phải biết trước khi tin nó: cách đo là đếm điểm chữ theo từng HÀNG
NGANG, nên nó chỉ sạch khi nền sau chữ tương đối đều. Ảnh có VẬT THỂ DỌC chạy
suốt tấm (cây cần, cái cột) thì hàng nào cũng có điểm tương phản, và mọi dải
dính liền thành một khối. Cách chữa: khoanh `--x` vào đúng cột chữ.

Đây là công cụ ĐỠ MẮT, không phải công cụ thay mắt. Luôn chạy
`viet-hoa-anh.py --soat` để nhìn khung đỏ trước khi chạy thật.
"""
import sys

from PIL import Image


def _co(px, x0, x1, y0, y1, nen_toi, nguong):
    """Đếm điểm chữ trên từng hàng."""
    if nen_toi:
        hop = lambda v: v > nguong       # noqa: E731  chữ sáng trên nền tối
    else:
        hop = lambda v: v < nguong       # noqa: E731  chữ sẫm trên nền sáng
    return [sum(1 for x in range(x0, x1) if hop(px[x, y])) for y in range(y0, y1)]


def nen_la_toi(im, x0, x1, y0, y1):
    """Trung vị độ sáng. Dùng trung vị chứ không dùng trung bình: một dải chữ
    trắng to trên nền tối kéo trung bình lên đủ để đảo kết luận."""
    m = im.crop((x0, y0, x1, y1))
    dp = sorted(m.getdata())
    return dp[len(dp) // 2] < 128


def dai(p, x0=0, x1=None, nguong=None, it_nhat=None, y0=0, y1=None, toi=None):
    im = Image.open(p).convert('L')
    y1 = y1 or im.height
    x1 = x1 or im.width
    if toi is None:
        toi = nen_la_toi(im, x0, x1, y0, y1)
    if nguong is None:
        nguong = 150 if toi else 120
    if it_nhat is None:
        # Tỉ lệ theo bề ngang vùng dò. Số cố định 8 (bản đầu) quá nhỏ với ảnh
        # 800px: mọi hàng đều đủ 8 điểm nên các dải dính thành một khối.
        it_nhat = max(8, (x1 - x0) // 25)
    px = im.load()
    dem = _co(px, x0, x1, y0, y1, toi, nguong)
    ra, dang = [], None
    for i, n in enumerate(dem):
        if n >= it_nhat and dang is None:
            dang = i
        elif n < it_nhat and dang is not None:
            if i - dang >= 6:
                ra.append((dang + y0, i + y0))
            dang = None
    if dang is not None:
        ra.append((dang + y0, len(dem) + y0))
    return ra, toi


def ngang(p, y0, y1, nguong=None, it_nhat=3, toi=None):
    """Biên trái/phải của chữ trong một dải."""
    im = Image.open(p).convert('L')
    if toi is None:
        toi = nen_la_toi(im, 0, im.width, y0, y1)
    if nguong is None:
        nguong = 150 if toi else 120
    px = im.load()
    hop = (lambda v: v > nguong) if toi else (lambda v: v < nguong)
    cot = [x for x in range(im.width)
           if sum(1 for y in range(y0, y1) if hop(px[x, y])) >= it_nhat]
    return (cot[0], cot[-1]) if cot else None


if __name__ == '__main__':
    a = sys.argv[1:]
    p = a[0]
    toi = True if '--toi' in a else (False if '--sang' in a else None)
    y0, y1 = 0, None
    if '--y' in a:
        i = a.index('--y')
        y0, y1 = int(a[i + 1]), int(a[i + 2])
    x0, x1 = 0, None
    if '--x' in a:
        i = a.index('--x')
        x0, x1 = int(a[i + 1]), int(a[i + 2])
    it = int(a[a.index('--it') + 1]) if '--it' in a else None
    ds, toi_ = dai(p, x0=x0, x1=x1, y0=y0, y1=y1, toi=toi, it_nhat=it)
    im = Image.open(p)
    print(f'{p}  {im.width}x{im.height}  nền {"TỐI" if toi_ else "SÁNG"}'
          f'{"" if toi is not None else " (tự nhận)"}  — {len(ds)} dải')
    if len(ds) == 1 and ds[0][1] - ds[0][0] > im.height * 0.8:
        print('  ⚠ một dải trùm gần hết ảnh. Hoặc nhận nhầm nền (--sang/--toi),'
              ' hoặc có vật thể dọc chạy suốt tấm — khoanh --x vào cột chữ.')
    for a_, b in ds:
        print(f'  y {a_:>5}-{b:<5} (cao {b-a_:>3})  x {ngang(p, a_, b, toi=toi_)}')
