const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware cơ bản
app.use(cors());
app.use(express.json());

// Cấp quyền cho giao diện truy cập vào thư mục 'uploads' để xem ảnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==========================================
// TRẠM KIỂM SOÁT ĐỊNH TUYẾN (ROUTING)
// ==========================================

// 1. API Xác thực (Đăng ký/Đăng nhập)
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api/services', serviceRoutes);

// 2. API Quản lý Thú cưng (Gọi đúng file code mới!)
const petRoutes = require('./routes/pets');
app.use('/api/pets', petRoutes);

// 3. API Bản đồ
const locationRoutes = require('./routes/locations');
app.use('/api/locations', locationRoutes);

// 4. API Lộ trình tăng trưởng
const growthRoutes = require('./routes/growth');
app.use('/api/growth', growthRoutes);
//5. API đặt lịch
const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);
//6.QA hỏi đáp
const qaRoutes = require('./routes/qaRoutes');
app.use('/api/qa', qaRoutes);
app.listen(5000, () => {
    console.log('Server chạy cổng 5000');
});
// ==========================================
// KHỞI ĐỘNG SERVER
// ==========================================
app.listen(5000, () => console.log('🚀 Server Backend đang chạy tại http://localhost:5000'));