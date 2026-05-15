# PHÂN TÍCH HỆ THỐNG ỨNG DỤNG WEB QUẢN LÝ VÀ HỖ TRỢ TÌM KIẾM DỊCH VỤ CHĂM SÓC THÚ CƯNG TÍCH HỢP BẢN ĐỒ SỐ

## 1. Giới thiệu đề tài
 Đề tài “Ứng dụng Web trong việc quản lý và hỗ trợ tìm kiếm dịch vụ chăm sóc thú cưng tích hợp bản đồ số” được thực hiện nhằm xây dựng một nền tảng trực tuyến toàn diện hỗ trợ cộng đồng những người nuôi thú cưng (Sen & Boss). Hệ thống giúp:
-  Quản lý thông tin tài khoản người dùng và hồ sơ chi tiết của thú cưng[cite: 91, 92].
-  Tích hợp bản đồ số định vị trực quan các cơ sở dịch vụ[cite: 93, 94].
-  Hỗ trợ tìm kiếm, kết nối nhanh chóng tới các phòng khám thú y, spa, cửa hàng thức ăn[cite: 53, 93].
-  Tạo không gian tương tác, hỏi đáp và đánh giá chất lượng dịch vụ[cite: 95, 96].

## 2. Mục tiêu hệ thống
-  Xây dựng hệ thống mạng xã hội thu nhỏ và quản lý hồ sơ thú cưng trực tuyến[cite: 79].
-  Tích hợp API bản đồ số (Google Maps/Mapbox) để định vị và tìm kiếm dịch vụ tiện ích quanh vị trí người dùng[cite: 53, 93, 97].
-  Hỗ trợ hệ thống Hỏi - Đáp (Q&A) kết nối người nuôi với các chuyên gia, bác sĩ thú y[cite: 52, 95].
-  Xây dựng phân hệ quản trị (Admin) để kiểm duyệt nội dung, quản lý danh mục dịch vụ và người dùng[cite: 60, 91].

## 3. Đối tượng sử dụng hệ thống
### 3.1. Admin (Quản trị viên)
Admin là người có quyền quản lý cao nhất toàn bộ hệ thống:
-  Quản lý và phân quyền tài khoản (Người dùng, Chủ dịch vụ)[cite: 91].
-  Kiểm duyệt nội dung bài đăng Hỏi-Đáp và các đánh giá dịch vụ[cite: 60, 61].
- Quản lý danh mục, thông tin các cơ sở dịch vụ thú cưng trên hệ thống.
- Xem báo cáo, thống kê tương tác hệ thống.

### 3.2. Người dùng (Chủ nuôi / Con sen)
Người dùng thông thường sử dụng hệ thống để:
-  Đăng ký/Đăng nhập tài khoản cá nhân[cite: 91].
-  Tạo và quản lý hồ sơ thông tin riêng cho các thú cưng của mình[cite: 92].
-  Tìm kiếm, định vị các phòng khám, cửa hàng, spa thú cưng trên bản đồ số[cite: 53, 93].
-  Tham gia đặt câu hỏi, thảo luận tại chuyên mục Hỏi-Đáp[cite: 52, 95].
-  Viết bình luận, thả tim đánh giá chất lượng các cơ sở dịch vụ[cite: 51, 96].

### 3.3. Chủ dịch vụ (Cơ sở Thú y / Spa / Pet Shop)
Đối tượng liên kết sử dụng hệ thống để:
- Đăng ký thông tin, vị trí tọa độ của cơ sở dịch vụ lên bản đồ số.
- Cập nhật thông tin chi tiết (giờ mở cửa, bảng giá, dịch vụ cung cấp).
-  Theo dõi và phản hồi các đánh giá, bình luận từ phía khách hàng[cite: 96].

## 4. Chức năng hệ thống
### 4.1. Chức năng dành cho Admin
- **Đăng nhập hệ thống:** Đăng nhập bằng tài khoản quản trị và kiểm tra quyền truy cập.
-  **Quản lý người dùng:** Thêm, sửa thông tin hoặc khóa tài khoản vi phạm quy chuẩn[cite: 62].
- **Quản lý danh mục dịch vụ:** Phê duyệt thông tin địa điểm dịch vụ mới do Chủ dịch vụ đăng ký.
-  **Kiểm duyệt nội dung:** Xử lý các báo cáo bài viết Hỏi-Đáp hoặc bình luận có nội dung phản cảm, toxic[cite: 61].

### 4.2. Chức năng dành cho Người dùng
-  **Đăng nhập/Đăng ký:** Tạo tài khoản mới hoặc đăng nhập tài khoản có sẵn[cite: 91].
-  **Quản lý hồ sơ thú cưng (Pet Profile):** Nhập và chỉnh sửa tên, giống loài, tuổi, sở thích, nhật ký tăng trưởng[cite: 49, 92].
-  **Tìm kiếm trên Bản đồ (Pet Map):** Bật định vị, tìm kiếm dịch vụ quanh vị trí hiện tại, xem tuyến đường đi trực quan[cite: 53, 93, 94].
-  **Tương tác Hỏi-Đáp (Q&A):** Tạo bài viết đặt câu hỏi, trả lời thảo luận phân loại theo chủ đề (sức khỏe, dinh dưỡng)[cite: 52, 95].
-  **Đánh giá & Phản hồi:** Để lại bình luận, thả tim, chấm điểm sao cho địa điểm dịch vụ đã trải nghiệm[cite: 51, 96].

### 4.3. Chức năng dành cho Chủ dịch vụ
- **Quản lý thông tin cơ sở:** Nhập tên cửa hàng, địa chỉ, số điện thoại, định vị tọa độ trên bản đồ.
- **Cập nhật trạng thái:** Cập nhật danh mục dịch vụ hiện có, chương trình khuyến mãi.

## 5. Phân tích Use Case
### 5.1. Danh sách Use Case
| STT | Use Case | Actor |
|---|---|---|
| 1 | Tổng quát hệ thống | Admin, Người dùng, Chủ dịch vụ |
| 2 | Quản lý tài khoản & Phân quyền | Admin |
| 3 | Quản lý hồ sơ Thú cưng | Người dùng |
| 4 | Tìm kiếm dịch vụ trên Bản đồ số | Người dùng |
| 5 | Đăng bài Hỏi-Đáp chuyên môn | Người dùng |
| 6 | Kiểm duyệt bài đăng & Báo cáo | Admin |
| 7 | Đăng ký thông tin điểm dịch vụ | Chủ dịch vụ |
| 8 | Đánh giá / Bình luận dịch vụ | Người dùng |

## 6. Phân tích Use Case chi tiết
### 6.1. Use Case tổng quát
- **Mục đích:** Mô tả bức tranh tổng quan chức năng của hệ thống theo từng nhóm tác nhân sử dụng.
-  **Actor:** Admin, Người dùng, Chủ dịch vụ[cite: 91].
-  **Yêu cầu cần có:** Hệ thống phân tách rõ không gian lướt bản đồ, quản lý hồ sơ boss của người dùng và bảng điều khiển duyệt tin của Admin[cite: 49, 53, 60].

### 6.2. Use Case: Quản lý hồ sơ Thú cưng
- **Actor:** Người dùng (Con sen).
-  **Mô tả:** Người dùng thực hiện thêm mới, chỉnh sửa thông tin hoặc cập nhật nhật ký tăng trưởng cho thú cưng trong kho lưu trữ của mình[cite: 49, 92].

### 6.3. Use Case: Tìm kiếm dịch vụ trên Bản đồ số
- **Actor:** Người dùng.
-  **Mô tả:** Người dùng sử dụng thanh tìm kiếm hoặc bộ lọc để quét các phòng khám/spa xung quanh bán kính hiện tại dựa trên tích hợp Google Maps API[cite: 53, 93, 97].

### 6.4. Use Case: Kiểm duyệt bài đăng & Báo cáo
- **Actor:** Admin.
-  **Mô tả:** Admin rà soát các bài viết Q&A hoặc các đánh giá dịch vụ bị cộng đồng gắn cờ báo cáo vi phạm để thực hiện xóa bỏ hoặc nhắc nhở[cite: 61].

## 7. Use Case Diagram (Mô tả sơ đồ)
-  **Tác nhân Admin:** Đăng nhập hệ thống -> Quản lý tài khoản -> Kiểm duyệt nội dung -> Quản lý danh mục dịch vụ[cite: 60, 91].
-  **Tác nhân Người dùng:** Đăng nhập hệ thống -> Quản lý hồ sơ thú cưng -> Tìm kiếm trên bản đồ số -> Đăng bài Hỏi-Đáp -> Đánh giá dịch vụ[cite: 49, 52, 53, 91, 96].
- **Tác nhân Chủ dịch vụ:** Đăng nhập hệ thống -> Đăng ký thông tin điểm dịch vụ -> Phản hồi đánh giá.

## 8. Activity Diagram (Sơ đồ hoạt động)
### 8.1. Activity Diagram — Đăng nhập
Bắt đầu -> Nhập tài khoản/mật khẩu -> Hệ thống kiểm tra dữ liệu -> Đúng? -> Xác định vai trò (Admin/Người dùng/Chủ dịch vụ) -> Vào giao diện tương ứng -> Kết thúc. (Nếu Sai -> Hiển thị cảnh báo báo lỗi -> Quay lại màn hình nhập).

### 8.2. Activity Diagram — Tìm kiếm dịch vụ trên Bản đồ số
 Bắt đầu -> Người dùng truy cập tab Pet Map -> Hệ thống yêu cầu quyền truy cập GPS -> Người dùng đồng ý -> Bản đồ tải vị trí hiện tại -> Người dùng nhập từ khóa/Chọn bộ lọc (Ví dụ: "Phòng khám thú y") -> Hệ thống truy vấn Database & API bản đồ -> Hiển thị các ghim vị trí trực quan lên màn hình -> Kết thúc[cite: 53, 93, 94].

### 8.3. Activity Diagram — Tạo hồ sơ thú cưng
Bắt đầu -> Người dùng chọn "Thêm thú cưng" -> Nhập thông tin (Tên, tuổi, giống, ảnh) -> Nhấn Lưu -> Hệ thống kiểm tra tính hợp lệ -> Hợp lệ?  -> Lưu dữ liệu vào Database -> Hiển thị hồ sơ mới trong danh sách -> Kết thúc[cite: 49, 92].

## 9. Sequence Diagram (Sơ đồ tuần tự)
### 9.1. Sequence Diagram — Đăng nhập
User -> Login Page: Nhập thông tin tài khoản
Login Page -> Server Backend: Gửi yêu cầu xác thực dữ liệu
Server Backend -> Database: Truy vấn thông tin tài khoản và kiểm tra password
 Database -> Server Backend: Trả về kết quả (Hợp lệ / Không hợp lệ) và thông tin vai trò (Role) [cite: 91]
Server Backend -> Login Page: Chuyển hướng người dùng vào giao diện tương ứng (User Dashboard / Admin Page)

### 9.2. Sequence Diagram — Tìm kiếm dịch vụ trên bản đồ
User -> Map Page: Chọn danh mục dịch vụ cần tìm (Ví dụ: "Spa Thú cưng")
Map Page -> Server Backend: Gửi tọa độ hiện tại của User + Danh mục yêu cầu
Server Backend -> Database: Lọc danh sách địa điểm thỏa mãn điều kiện bán kính khoảng cách
Database -> Server Backend: Trả về danh sách địa điểm và tọa độ tương ứng
 Server Backend -> Map API (Google Maps): Gửi danh sách dữ liệu tọa độ để vẽ ghim vị trí [cite: 97]
 Map API -> Map Page: Trả về giao diện bản đồ đã được dựng sẵn các điểm ghim trực quan [cite: 94]
 Map Page -> User: Hiển thị bản đồ dịch vụ hoàn chỉnh cho người dùng tương tác [cite: 94]

### 9.3. Sequence Diagram — Đăng bài Hỏi-Đáp (Q&A)
 User -> Q&A Page: Nhập nội dung câu hỏi và chọn chủ đề (Sức khỏe/Dinh dưỡng) [cite: 52, 95]
Q&A Page -> Server Backend: Gửi chuỗi dữ liệu bài đăng
Server Backend -> Database: Thực hiện câu lệnh INSERT lưu bài đăng mới
Database -> Server Backend: Xác nhận lưu trữ dữ liệu thành công
Server Backend -> Q&A Page: Thông báo đăng bài thành công và hiển thị lên bảng tin cộng đồng

## 10. Class Diagram (Sơ đồ lớp)
- **Class NguoiDung:** ID; TenDangNhap; MatKhau; HoTen; VaiTro (Admin/User/Owner); Email; SDT;  NgayTao [cite: 91]
- **Class ThuCung:** ID_ThuCung; ID_NguoiDung (Khoá ngoại); TenBoss; GiongLoai; Tuoi; CanNang; AnhDaiDien;  NhatKyTangTruong [cite: 49, 92]
- **Class DiaDiemDichVu:** ID_DiaDiem; TenCoSo; LoaiDichVu (Clinic/Spa/PetShop); DiaChi; ToaDo_Lat; ToaDo_Lng; SoDienThoai;  GioMoCua [cite: 53, 93]
- **Class BaiDangQA:** ID_BaiDang; ID_NguoiDung (Khoá ngoại); ChuDe; TieuDe; NoiDung; NgayDang;  TrangThai [cite: 52, 95]
- **Class DanhGia BinhLuan:** ID_DanhGia; ID_NguoiDung (Khoá ngoại); ID_DiaDiem (Khoá ngoại); DiemSao; NoiDungBinhLuan; LuotThaTim;  NgayTao [cite: 51, 96]

### Quan hệ giữa các Class:
-  Lớp `NguoiDung` sở hữu quan hệ `1 --- *` với lớp `ThuCung` (Một chủ nuôi có thể có nhiều thú cưng)[cite: 49].
-  Lớp `NguoiDung` tương tác quan hệ `1 --- *` với lớp `BaiDangQA` và lớp `DanhGiaBinhLuan`[cite: 51, 52].
-  Lớp `DiaDiemDichVu` nhận quan hệ `1 --- *` từ lớp `DanhGiaBinhLuan` (Một địa điểm nhận được nhiều phản hồi từ cộng đồng)[cite: 96].

## 11. Thiết kế cơ sở dữ liệu sơ bộ
- **Bảng NguoiDung (Users):**
  `id_user` (INT, PK) | `username` (VARCHAR) | `password` (VARCHAR) | `fullname` (VARCHAR) | `role` (VARCHAR) | `email` (VARCHAR) |  `phone` (VARCHAR) [cite: 91]
- **Bảng ThuCung (Pets):**
  `id_pet` (INT, PK) | `id_user` (INT, FK) | `pet_name` (VARCHAR) | `pet_type` (VARCHAR) | `age` (INT) | `weight` (FLOAT) | `avatar` (VARCHAR) |  `growth_diary` (TEXT) [cite: 49, 92]
- **Bảng DiaDiemDichVu (Services_Location):**
  `id_location` (INT, PK) | `shop_name` (VARCHAR) | `service_type` (VARCHAR) | `address` (VARCHAR) | `latitude` (DOUBLE) | `longitude` (DOUBLE) | `phone` (VARCHAR) |  `hours` (VARCHAR) [cite: 53, 93]
- **Bảng BaiDangQA (QA_Posts):**
  `id_post` (INT, PK) | `id_user` (INT, FK) | `category` (VARCHAR) | `title` (VARCHAR) | `content` (TEXT) |  `created_at` (DATETIME) [cite: 52, 95]
- **Bảng DanhGiaBinhLuan (Reviews_Comments):**
  `id_review` (INT, PK) | `id_user` (INT, FK) | `id_location` (INT, FK) | `rating_stars` (INT) | `comment_text` (TEXT) | `likes_count` (INT) |  `created_at` (DATETIME) [cite: 51, 96]
