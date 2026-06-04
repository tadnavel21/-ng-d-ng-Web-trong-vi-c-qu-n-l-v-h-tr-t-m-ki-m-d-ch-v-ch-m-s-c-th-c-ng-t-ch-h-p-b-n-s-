const jwt = require('jsonwebtoken');
const SECRET_KEY = "petcare_secret_key_2024"; // Phải giống hệt key lúc đăng nhập

const verifyToken = (req, res, next) => {
    // Lấy token từ header của Frontend gửi lên
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ error: "Truy cập bị từ chối! Chưa có Token." });

    try {
        // Cắt bỏ chữ "Bearer " để lấy đúng chuỗi token
        const token = authHeader.replace("Bearer ", "");
        const verified = jwt.verify(token, SECRET_KEY);
        
        // Gắn thông tin user (gồm id, username, role) vào req để các API sau sử dụng
        req.user = verified; 
        next(); // Cho phép đi tiếp vào API
    } catch (err) {
        res.status(400).json({ error: "Token không hợp lệ hoặc đã hết hạn!" });
    }
};

module.exports = verifyToken;