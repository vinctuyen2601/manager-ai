# -*- coding: utf-8 -*-
"""Lưới toạ độ cho MỘT VÙNG, phóng to — để đọc ô cho đúng."""
import sys
from PIL import Image, ImageDraw, ImageFont
F=ImageFont.truetype('/home/tuyennvdev/my-project/manager-ai/17fishing/script/clone/anh/font/bvp-700.ttf',12)
tep=sys.argv[1]; x0,y0,x1,y1=[int(v) for v in sys.argv[2:6]]
s=int(sys.argv[6]) if len(sys.argv)>6 else 3
im=Image.open(tep); im.seek(0) if getattr(im,'n_frames',1)>1 else None
im=im.convert('RGB').crop((x0,y0,x1,y1)).resize(((x1-x0)*s,(y1-y0)*s))
d=ImageDraw.Draw(im)
for y in range(y0-y0%10,y1,10):
    yy=(y-y0)*s
    if 0<=yy<im.height: d.line([(0,yy),(im.width,yy)],fill=(255,0,0)); d.text((3,yy+1),str(y),font=F,fill=(255,0,0))
for x in range(x0-x0%20,x1,20):
    xx=(x-x0)*s
    if 0<=xx<im.width: d.line([(xx,0),(xx,im.height)],fill=(0,90,255)); d.text((xx+2,2),str(x),font=F,fill=(0,90,255))
ra=sys.argv[7] if len(sys.argv)>7 else 'z-vung.png'
im.save(ra); print(ra, im.size)
