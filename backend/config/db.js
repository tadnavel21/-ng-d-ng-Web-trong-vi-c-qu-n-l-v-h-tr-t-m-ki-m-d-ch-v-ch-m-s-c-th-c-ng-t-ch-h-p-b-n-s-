const mysql = require('mysql2');

// Khởi tạo kết nối đến MySQL (XAMPP)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Tên đăng nhập mặc định của XAMPP
  password: '',      // Mật khẩu mặc định của XAMPP là để trống
  database: 'petcare_db' // Tên cơ sở dữ liệu của chúng ta
});

// Kiểm tra kết nối
db.connect((err) => {
  if (err) {
    console.error('❌ Lỗi kết nối Database:', err.message);
  } else {
    console.log('✅ Đã kết nối thành công tới Database petcare_db!');
  }
});

// Xuất file ra để các API khác (như growth.js) có thể dùng chung
module.exports = db;