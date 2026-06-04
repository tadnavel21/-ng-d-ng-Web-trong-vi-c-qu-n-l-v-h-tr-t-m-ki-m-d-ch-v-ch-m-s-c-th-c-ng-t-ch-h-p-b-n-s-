const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Thư viện cấp phát token
const db = require('../config/db');

// Khóa bí mật để ký JWT (Trong thực tế sẽ giấu vào file .env)
const SECRET_KEY = "petcare_secret_key_2024";

// ==========================================
// [POST] /api/auth/register - ĐĂNG KÝ (BẢN ULTRA-DEBUG)
// ==========================================
router.post('/register', async (req, res) => {
    console.log("👉 ĐANG CHẠY VÀO API ĐĂNG KÝ..."); // Theo dõi xem API có được gọi không
    const { username, password, role } = req.body;
    console.log("📦 Dữ liệu nhận được từ Frontend:", { username, password, role });

    if (!username || !password) {
        console.log("❌ Lỗi: Thiếu dữ liệu!");
        return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
    }

    try {
        const checkUserSql = "SELECT * FROM Users WHERE username = ?";
        console.log("🔍 Đang kiểm tra tài khoản trùng...");
        
        db.query(checkUserSql, [username], async (err, results) => {
            if (err) {
                console.error("🚨 LỖI TẠI BƯỚC SELECT DB:", err.message);
                return res.status(500).json({ error: "Lỗi Server khi kiểm tra DB" });
            }
            
            if (results.length > 0) {
                console.log("⚠️ Tên đăng nhập đã tồn tại!");
                return res.status(400).json({ error: "Tên đăng nhập đã tồn tại!" });
            }

            try {
                console.log("🔐 Đang băm mật khẩu...");
                const hashedPassword = await bcrypt.hash(password, 10);
                
                const userRole = role || 'user'; 
                const insertSql = "INSERT INTO Users (username, password, role) VALUES (?, ?, ?)";
                
                console.log("💾 Đang lưu vào Database...");
                db.query(insertSql, [username, hashedPassword, userRole], (err, result) => {
                    if (err) {
                        console.error("🚨 LỖI TẠI BƯỚC INSERT DB:", err.message);
                        return res.status(500).json({ error: "Không thể tạo tài khoản" });
                    }
                    console.log("✅ Đăng ký THÀNH CÔNG!");
                    res.status(201).json({ message: "Đăng ký tài khoản thành công!" });
                });
            } catch (hashError) {
                console.error("🚨 LỖI TẠI BƯỚC MÃ HÓA BCRYPT:", hashError);
                return res.status(500).json({ error: "Lỗi mã hóa mật khẩu" });
            }
        });
    } catch (error) {
        console.error("🚨 LỖI HỆ THỐNG:", error);
        res.status(500).json({ error: "Lỗi hệ thống" });
    }
});

// ==========================================
// [POST] /api/auth/login - ĐĂNG NHẬP
// ==========================================
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
    }

    try {
        const sql = "SELECT * FROM Users WHERE username = ?";
        db.query(sql, [username], async (err, results) => {
            if (err) return res.status(500).json({ error: "Lỗi Server" });

            // 1. Kiểm tra tài khoản có tồn tại không
            if (results.length === 0) {
                return res.status(401).json({ error: "Tài khoản không tồn tại!" });
            }

            const user = results[0];

            // 2. BƯỚC QUAN TRỌNG: So sánh mật khẩu thô với chuỗi mã hóa trong DB
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: "Sai mật khẩu!" });
            }

            // 3. Cấp phát Token (Thẻ bài) có hạn sử dụng 1 ngày
            const token = jwt.sign(
                { id: user.id_user, username: user.username, role: user.role }, // <-- SỬA Ở ĐÂY
                SECRET_KEY,
                { expiresIn: '1d' }
            );

            // 4. Trả kết quả về cho Frontend
            res.json({
                message: "Đăng nhập thành công!",
                token: token,
                user: { name: user.username, role: user.role }
            });
        });
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ error: "Lỗi hệ thống" });
    }
});

module.exports = router;