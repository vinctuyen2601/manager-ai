# -*- coding: utf-8 -*-
"""Đo GIỌNG một bài viết theo khuôn quảng cáo chủ shop 17fishing duyệt.

  python3 do-giong.py bai.txt
  python3 do-giong.py --san-pham <uuid>          # đọc thẳng từ API quản trị
  python3 do-giong.py bai.txt --mau van-mau.txt  # so với một mẫu khác

Vì sao cần: chủ shop chê giọng AI BỐN lần, và cả bốn lần tôi tự chấm là đạt.
Tự chấm không chạy — phải đo và dán bảng cho chủ shop xem.

Và lần thứ tư mới lòi ra là tôi hiểu NGƯỢC: suốt ba vòng tôi gọt cho câu ngắn
lại, bỏ từ hoa mỹ, thêm lời rào, tức là viết như người ĐÁNH GIÁ sản phẩm. Chủ
shop muốn giọng người BÁN. Đo với văn mẫu thật thì mọi dấu hiệu giọng của mẫu
đều BẰNG 0 trong bài tôi viết, còn câu tôi ngắn bằng nửa.

KHUÔN duyệt ngày 28/09/2026, đo từ mẫu chủ shop đưa (mô tả máy Daiwa RS):
câu trung bình 32 từ; xem bảng DAU bên dưới cho mật độ từng dấu hiệu.

RANH GIỚI: bộ đếm này chỉ đo CHỮ. Số liệu vẫn phải khớp bảng thông số của
xưởng, và tuyệt đối không hứa thứ vượt thông số (kéo được cá bao nhiêu ký,
ném xa bao nhiêu mét). Đánh bóng chữ thì được, bịa số thì không.
"""
import json
import os
import re
import subprocess
import sys

# mật độ trong văn mẫu, đơn vị phần nghìn từ
DAU = {
    'vượt trội / hiệu năng / hiệu suất': (r'vượt trội|hiệu năng|hiệu suất', 10.4),
    'cực kỳ / vô cùng':                  (r'cực kỳ|vô cùng',                 7.8),
    'hoàn hảo / tối ưu':                 (r'hoàn hảo|tối ưu',                7.8),
    'mang đến / mang lại':               (r'mang đến|mang lại',              7.8),
    'thiết kế / thiết bị':               (r'thiết kế|thiết bị',              7.8),
    'anh em / cần thủ':                  (r'anh em|cần thủ',                 7.8),
    'đảm bảo':                           (r'đảm bảo',                        5.2),
    'bền bỉ / đáng nể / đẳng cấp':       (r'bền bỉ|đáng nể|đẳng cấp',        5.2),
    'trải nghiệm':                       (r'trải nghiệm',                    2.6),
    'không chỉ … mà còn':                (r'không chỉ',                      2.6),
}
DAI_CAU_MAU = 32.0

# Những thứ vẫn CẤM dù giọng có bóng tới đâu. Đây là lời hứa, không phải chữ.
CAM = {
    'hứa cỡ cá kéo được':  r'kéo được cá \d|cá (trăm|năm chục|\d+) (ký|cân|kg)',
    'hứa tầm ném':         r'ném xa \d|xa (trăm|\d+) ?(m\b|mét)',
    'hứa chống nước tuyệt đối': r'chống nước tuyệt đối|kín nước|không bao giờ (gỉ|hỏng|gãy)',
}


def chu_tu_san_pham(pid):
    t = open(os.path.expanduser('~/.17fishing-admin-token')).read().strip()
    r = subprocess.run(['curl', '-s', '-m', '40',
                        'https://api.17-fishing.com/api/admin/products?limit=80',
                        '-H', 'Authorization: Bearer ' + t],
                       capture_output=True, text=True).stdout
    d = json.loads(r)
    it = d if isinstance(d, list) else (d.get('data') or d.get('items'))
    p = next(x for x in it if x['id'] == pid)
    s = re.sub(r'<[^>]+>', ' ', p.get('description') or '')
    bd = p.get('blockData') or {}
    for k in ('diem-manh', 'huong-dan'):
        for x in (bd.get(k) or {}).get('items', []):
            s += ' ' + x.get('noiDung', '')
    for x in (bd.get('cau-hoi') or {}).get('items', []):
        s += ' ' + x.get('dap', '')
    return p['name'], s


def do(t):
    cau = [x for x in re.split(r'(?<=[.!?])\s+', t) if len(x.strip()) > 3]
    w = len(t.split())
    return cau, w


def main():
    a = sys.argv[1:]
    if '--san-pham' in a:
        ten, t = chu_tu_san_pham(a[a.index('--san-pham') + 1])
    else:
        tep = next((x for x in a if not x.startswith('--')), None)
        if not tep:
            print(__doc__)
            sys.exit(1)
        ten = tep
        t = open(tep, encoding='utf-8').read()

    cau, w = do(t)
    dai = w / max(1, len(cau))
    print(f'{ten}\n{len(cau)} câu · {w} từ · trung bình {dai:.1f} từ/câu '
          f'(mẫu {DAI_CAU_MAU})\n')
    print(f'{"dấu hiệu":34s} {"bài này":>9s} {"mẫu":>7s}')
    thieu = []
    for k, (rx, mau) in DAU.items():
        c = len(re.findall(rx, t)) * 1000 / max(1, w)
        dau_hieu = '·' if c >= mau * 0.5 else '↓'
        if c < mau * 0.5:
            thieu.append(k)
        print(f'{k:34s} {c:>8.1f}‰ {mau:>6.1f}‰  {dau_hieu}')

    if dai < DAI_CAU_MAU * 0.75:
        print(f'\n⚠ CÂU QUÁ NGẮN ({dai:.1f} so với {DAI_CAU_MAU}). Đây là tật '
              'nặng nhất của tôi: viết như người đánh giá, không như người bán.')
    if thieu:
        print(f'\n⚠ {len(thieu)} dấu hiệu dưới nửa mật độ mẫu: ' + ', '.join(thieu))

    vi = [(k, m.group()) for k, rx in CAM.items()
          for m in re.finditer(rx, t, re.I)]
    print()
    if vi:
        print(f'🔴 {len(vi)} chỗ HỨA VƯỢT THÔNG SỐ — đánh bóng chữ thì được, '
              'hứa quá thì không:')
        for k, v in vi:
            print(f'   {k}: "{v}"')
        sys.exit(1)
    print('✓ không có chỗ nào hứa vượt thông số')


if __name__ == '__main__':
    main()
