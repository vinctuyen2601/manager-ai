# -*- coding: utf-8 -*-
"""In lưới toạ độ lên ảnh để đọc box bằng mắt mà không phải nhẩm tỉ lệ.

  python3 luoi-toa-do.py anh/a41.jpg anh/a42.jpg

Vì sao cần: `do-dai-chu.py` chỉ ra được DẢI, không ra được ô; còn ước lượng ô
trên ảnh thu nhỏ thì sai lặng lẽ. Đã đặt ô tiêu đề a41 ở y 28-78 trong khi chữ
nằm ở y 58-100 — nửa dưới nét chữ Hán còn nguyên dưới dòng tiếng Việt mới, và
chỉ phát hiện ra khi mở ảnh thành phẩm.
"""
import os
import sys
from PIL import Image, ImageDraw, ImageFont
f = ImageFont.truetype(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'font', 'bvp-700.ttf'), 13)
for p in sys.argv[1:]:
    im = Image.open(p).convert('RGB')
    d = ImageDraw.Draw(im)
    for y in range(0, im.height, 50):
        d.line([(0, y), (im.width, y)], fill=(255, 0, 0), width=1)
        d.text((3, y + 1), str(y), font=f, fill=(255, 0, 0))
    for x in range(0, im.width, 100):
        d.line([(x, 0), (x, im.height)], fill=(0, 90, 255), width=1)
        d.text((x + 2, 2), str(x), font=f, fill=(0, 90, 255))
    ra = f'luoi-{os.path.basename(p).rsplit(".", 1)[0]}.png'
    im.save(ra)
    print(f'{p} {im.width}x{im.height} -> {ra}')
