# Lồng giọng CapCut bằng computer use — chạy từ phiên **Claude desktop**

Sếp bật Computer use 12/11/2026 (Claude desktop → Settings → This computer → Computer use).
Phiên VS Code **không có** công cụ điều khiển máy → bước này chỉ chạy được trong một phiên mở từ **Claude desktop**.
Quy trình gốc của sếp: `C:/Users/PC/Downloads/cau-lenh-reup-video-auto.md` mục 7 (tiếng) và mục 9 (toạ độ CapCut).

## Câu giao việc (dán vào phiên Claude desktop khi lô đã có lời)
```
Đọc C:/Users/PC/OneDrive/Desktop/my project/manager-ai/phong-marketing/xuong/CAPCUT-GIONG.md và
C:/Users/PC/Downloads/cau-lenh-reup-video-auto.md mục 7.1–7.2 và mục 9.
Lô: <tên lô> · tệp lời: <đường dẫn tệp lời theo đoạn 15–20 s, ≤ 470 ký tự/đoạn> · dự án CapCut: <tên>.
Xin quyền app CapCut (và File Explorer nếu cần), rồi: dán từng đoạn lời vào clip chữ đúng mốc → tab
"Chuyển văn bản thành lời nói" (bấm 2 lần) → ★ Yêu thích → "Cô Gái Hoạt Ngôn" → Tạo lời nói một lần cho cả lô →
tốc độ để 1,0x → Xuất → **bỏ chọn Video, chỉ chọn Âm thanh, định dạng MP3** → tên <lô>_voice → Xuất → Đóng.
KHÔNG bao giờ bấm "Chia sẻ".
Chụp màn hình trước khi bấm nếu toạ độ không khớp (toạ độ trong tài liệu đo trên màn IP2709S, khung 1456x819).
Xong báo đường dẫn tệp giọng; không ghép, không chỉnh tốc độ trong CapCut.
```

## Luật
- Chỉ thao tác trong CapCut và File Explorer; không mở link, không đăng nhập tài khoản mạng xã hội, **không bấm "Chia sẻ"/đăng**.
- Toạ độ là của màn cũ → luôn chụp màn hình và tìm nút theo chữ trước khi bấm.
- Ghép giọng, chỉnh tốc độ (0,8–1,15×), nhạc, chuẩn âm: Thợ dựng làm bằng script/ffmpeg-skill ở phiên VS Code (`td-ban-dia-hoa`).

## Bài học lần chạy thử đầu (12/11/2026, "thu-may-cau-as")
- **Chỉ xuất âm thanh (MP3)**, không xuất video (sếp chốt 12/11): nhẹ, đúng thứ cần, không phải tách lại.
- **Tắt tiếng track video trước khi xuất** — lần xuất đầu lẫn tiếng gốc của video (−9 dB). Phiên desktop tự phát hiện và xuất lại.
- CapCut xuất vào thư mục mặc định (`Desktop/fb reels/fb đồ câu lục/videos/`), không phải thư mục lô → phiên desktop phải báo đường dẫn.
- Giọng 45 tiếng = 10,54 s ở 1,0x (tỉ lệ 0,94 so với 4 tiếng/giây).
- (12/11, lô thu-can-cau) **Cửa sổ ARENA** ghim trên cùng che hộp thoại Xuất → sếp thu nhỏ trước khi chạy. Hộp thoại Xuất có lúc hiện **trống** trên ảnh chụp (lỗi vẽ) → chưa đo được ô "Âm thanh"; tạm xuất 480P rồi tách MP3 bằng ffmpeg.
- CapCut **đứng hình khi xuất** → đường lui tốt: ghép giọng từ các tệp `.wav` TTS CapCut đã tạo trong `<thư mục dự án>\textReading`, đặt theo mốc trong `draft_content.json` (khớp bản xuất tới mili giây). Sau đó tắt hẳn rồi mở lại CapCut.
- Mở dự án cũ có thể **mở nhầm dự án khác** (tệp thông tin trỏ thư mục cũ) → không sửa tệp nội bộ CapCut, tạo dự án mới.
- Đọc mốc clip từ `draft_content.json`, không đọc bằng mắt trên timecode (lệch ~0,06 s).
- Nhạc: tìm "upbeat acoustic" ra nhạc thư viện không lời; kiểm "không lời" bằng whisper (0 đoạn = không lời).
