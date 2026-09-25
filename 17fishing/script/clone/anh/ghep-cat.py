# -*- coding: utf-8 -*-
"""Ghép 45 lát của khối mô tả thành ảnh dài, rồi CẮT LẠI ở hàng trống.

Vì sao: khối mô tả 1688 là MỘT ảnh dài bị cắt ra rồi ghép lại bằng thẻ <img>.
Xử lý từng lát rời có hai cái hại. Một, chỗ cắt của xưởng rơi tuỳ tiện — đo
được 10/44 ranh giới cắt vào giữa nội dung, và nếu rơi đúng vào một dòng chữ
thì xoá được nửa trên mà nửa dưới nằm ở lát khác, sai lặng lẽ. Hai, mình mất
quyền chọn chỗ cắt.

Ghép lại rồi cắt ở hàng TRỐNG thì cả hai cái hại đó biến mất.

Ảnh động phải đứng riêng, không ghép được vào ảnh tĩnh — nên ảnh dài tách
thành ba đoạn, hai ảnh động nằm xen giữa.
"""
import os, json
from PIL import Image

# nguồn của từng lát sau khi Việt hoá; None = bỏ hẳn lát đó
NGUON = {
 'd01':'lat-viet/d01.jpg','d02':'lat/d02.jpg','d03':'lat/d03.jpg',
 'd04':'lat-viet/d04.jpg','d05':'lat-viet/d05.jpg',
 'd06':None,                      # cam kết bảo hành của xưởng với khách sỉ TQ
 'd07':'lat-viet/d07.jpg','d08':'anh-viet/a31.jpg',
 'd09':None,                      # quảng cáo máy trong bộ combo
 'd10':'lat-viet/d10.jpg','d11':'lat-viet/d11.jpg',
 'd13':'lat-viet/d13.jpg','d14':'lat-viet/d14.jpg',
 'd15':'anh-viet/a37.jpg','d16':'anh-viet/a38.jpg','d17':'lat-viet/d17.jpg',
 'd18':None,                      # giấy chứng nhận sáng chế, toàn chữ Trung
 'd19':'anh-viet/a41.jpg','d20':'anh-viet/a42.jpg',
 'd22':'anh-viet/a43.jpg','d23':'anh-viet/a44.jpg','d24':'anh-viet/a45.jpg',
 'd25':'lat/d25.jpg','d26':'anh-viet/a47.jpg','d27':'anh-viet/a48.jpg',
 'd28':'lat/d28.jpg','d29':'lat-viet/d29.jpg','d30':'lat-viet/d30.jpg',
 'd31':'lat/d31.jpg','d32':'lat/d32.jpg',
 'd33':'anh-viet/a54.jpg','d34':'anh-viet/a55.jpg',
 'd35':None,'d36':None,'d37':None,'d38':None,'d39':None,   # máy trong bộ combo
 'd40':'lat/d40.jpg','d41':'lat/d41.jpg','d42':'lat/d42.jpg',
 'd43':'lat/d43.jpg','d44':'lat/d44.jpg','d45':'lat/d45.jpg',
}
DOAN = [
 ('a', ['d01','d02','d03','d04','d05','d06','d07','d08','d09','d10','d11']),
 ('b', ['d13','d14','d15','d16','d17','d18','d19','d20']),
 ('c', ['d22','d23','d24','d25','d26','d27','d28','d29','d30','d31','d32',
        'd33','d34','d35','d36','d37','d38','d39','d40','d41','d42','d43','d44','d45']),
]

def hang_trong(im, y0, y1):
    """Hàng nào gần như không đổi màu theo chiều ngang thì cắt ở đó được."""
    g=im.convert('L'); px=g.load()
    tot=None; diem=10**9
    for y in range(y0, min(y1, im.height)):
        v=[px[x,y] for x in range(0, im.width, 8)]
        d=max(v)-min(v)
        if d<diem: diem, tot = d, y
    return tot, diem

os.makedirs('ra', exist_ok=True)
manh=[]
for ten, ds in DOAN:
    ims=[Image.open(NGUON[k]).convert('RGB') for k in ds if NGUON.get(k)]
    H=sum(i.height for i in ims)
    c=Image.new('RGB',(790,H),'white'); y=0
    for i in ims: c.paste(i,(0,y)); y+=i.height
    print(f'đoạn {ten}: {len(ims)} lát -> 790x{H}')

    # cắt lại: mỗi mảnh ~1300px, mốc cắt dời tới hàng trống nhất trong +-140px
    moc=[0]; y=0
    while H-y > 1700:
        uv=y+1300
        m,d = hang_trong(c, max(y+900, uv-140), min(H-200, uv+140))
        moc.append(m); y=m
    moc.append(H)
    for k in range(len(moc)-1):
        m=c.crop((0,moc[k],790,moc[k+1]))
        p=f'ra/mota-{ten}{k+1}.jpg'; m.save(p, quality=92)
        manh.append(p)
        print(f'   {os.path.basename(p)}  790x{m.height}')
json.dump(manh, open('manh.json','w'))
print(f'\ntổng {len(manh)} mảnh')
