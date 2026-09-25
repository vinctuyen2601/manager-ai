# -*- coding: utf-8 -*-
"""Bước 3c · Thay chữ Trung trên ảnh xưởng bằng chữ Việt, theo KẾ HOẠCH.

Vì sao chạy theo kế hoạch chứ không sửa tay từng ảnh: bộ ảnh 1688 có 20-70
tấm. Sửa tay thì mỗi lần chạy lại ra một kết quả khác, và không ai rà soát
được đã đổi những gì. Kế hoạch là một tệp JSON đọc được, soát được, chạy lại
được — và chính nó là thứ chủ shop duyệt trước khi ảnh lên web.

Kế hoạch (ke-hoach-anh.json):

{
 "thuMucVao": "anh", "thuMucRa": "anh-viet",
 "anh": [
  {"tep": "a06.jpg",
   "dai": [
     {"y": [120, 190], "x": [40, 520], "chu": "CẦN LĂNG XÊ 3M6",
      "nen": "toi", "dam": true, "canh": "trai", "co": 44,
      "mau": [255,255,255]},
     {"y": [980, 1010], "x": [60, 740], "bo": true}
   ]}
 ]
}

  nen: "trang" tô trắng · "toi" nhân bản dải dọc · "anh" làm mờ rồi phủ tối
  bo: true  -> chỉ xoá, không viết gì đè lên
  co: BẮT BUỘC đặt khi nhiều dải nằm cạnh nhau trên cùng một hàng. Để tự co
      thì ô chữ ngắn phình to, ba cột cạnh nhau nhìn thành ba khối rời.

Chạy:
  python3 viet-hoa-anh.py ke-hoach-anh.json           # làm thật
  python3 viet-hoa-anh.py ke-hoach-anh.json --thu     # chỉ kiểm, không ghi
  python3 viet-hoa-anh.py ke-hoach-anh.json --soat    # vẽ khung đỏ để soát toạ độ
"""
import json
import os
import sys

from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from viet import mo, phu, to, nen, viet, xoa, cot_sach  # noqa: E402


def mot_anh(vao, ra, dai_ds, soat=False):
    im = Image.open(vao).convert('RGB')
    canh = ImageDraw.Draw(im) if soat else None
    for d in dai_ds:
        y0, y1 = d['y']
        x0, x1 = d.get('x') or [0, im.width]
        box = (x0, y0, x1, y1)

        if soat:
            canh.rectangle(box, outline=(255, 0, 0), width=3)
            continue

        kieu = d.get('nen', 'toi')
        if kieu == 'trang':
            to(im, box, (255, 255, 255))
        elif kieu == 'anh':
            # Nhân bản dải dọc trên ảnh chụp ra vệt sọc ngang thấy rõ; làm mờ
            # rồi phủ tối là cách duy nhất cho kết quả sạch ở đây.
            mo(im, box, d.get('mo', 18))
            phu(im, box, tuple(d.get('phuMau', [0, 0, 0])), d.get('phuDuc', 110))
        elif kieu == 'phang':
            to(im, box, nen(im, (x0, y0, min(x0 + 8, x1), y1)))
        else:
            xoa(im, box, d.get('cotSach'))

        if not d.get('bo'):
            chu = d.get('chu', '').strip()
            if chu:
                viet(im, box, chu,
                     dam=d.get('dam', True),
                     mau=tuple(d.get('mau', [255, 255, 255])),
                     canh=d.get('canh', 'giua'),
                     co=d.get('co'))
    os.makedirs(os.path.dirname(ra) or '.', exist_ok=True)
    im.save(ra, quality=94)


def main():
    args = sys.argv[1:]
    tep = next((a for a in args if not a.startswith('--')), None)
    if not tep:
        print(__doc__)
        sys.exit(1)
    thu = '--thu' in args
    soat = '--soat' in args

    kh = json.load(open(tep, encoding='utf-8'))
    vao_tm = kh.get('thuMucVao', 'anh')
    ra_tm = kh.get('thuMucRa', 'anh-viet')
    # --soat PHẢI ghi ra chỗ khác. Bản đầu lấy thẳng `thuMucRa` của kế hoạch,
    # nên chạy soát một cái là đè sạch thư mục ảnh thành phẩm bằng ảnh vẽ
    # khung đỏ — mất hết công của lần chạy thật trước đó, mà không báo gì.
    if soat:
        ra_tm = ra_tm.rstrip('/') + '-soat'

    loi = []
    for m in kh['anh']:
        p = os.path.join(vao_tm, m['tep'])
        if not os.path.exists(p):
            loi.append(f"thiếu tệp {p}")
            continue
        w, h = Image.open(p).size
        for i, d in enumerate(m['dai']):
            y0, y1 = d['y']
            x0, x1 = d.get('x') or [0, w]
            # Toạ độ ngoài khung là lỗi IM LẶNG: PIL cắt bớt rồi vẫn lưu ảnh,
            # nên tấm hỏng trông y như tấm thành công cho tới lúc mở ra xem.
            if not (0 <= y0 < y1 <= h and 0 <= x0 < x1 <= w):
                loi.append(f"{m['tep']} dải {i}: toạ độ ngoài khung ảnh {w}x{h}")
            if y1 - y0 < 8:
                loi.append(f"{m['tep']} dải {i}: dải cao {y1-y0}px, quá mỏng để viết chữ")
            if not d.get('bo') and not d.get('chu', '').strip():
                loi.append(f"{m['tep']} dải {i}: không có 'chu' mà cũng không đánh dấu 'bo'")

    if loi:
        print(f"DỪNG — {len(loi)} lỗi trong kế hoạch:")
        for x in loi:
            print('  ', x)
        sys.exit(1)

    tong_dai = sum(len(m['dai']) for m in kh['anh'])
    print(f"kế hoạch hợp lệ: {len(kh['anh'])} ảnh, {tong_dai} dải chữ")
    if thu:
        print("--thu: không ghi tệp nào")
        return

    for m in kh['anh']:
        mot_anh(os.path.join(vao_tm, m['tep']),
                os.path.join(ra_tm, m['tep']), m['dai'], soat=soat)
    print(f"-> {ra_tm}/  ({len(kh['anh'])} tấm)")
    if soat:
        print("Ảnh chỉ vẽ KHUNG ĐỎ, chưa đổi chữ. Mở xem khung có trùm đúng chữ Trung không.")
    else:
        print("PHẢI MỞ XEM từng tấm. Chưa nhìn thì chưa biết dải vá có lộ không.")


if __name__ == '__main__':
    main()
