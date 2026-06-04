const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Gọi file kết nối cơ sở dữ liệu của chúng ta

// [GET] /api/locations - Lấy danh sách tất cả các điểm dịch vụ
router.get('/', (req, res) => {
    // Câu lệnh SQL lấy toàn bộ dữ liệu từ bảng DiaDiemDichVu
    const sql = "SELECT * FROM DiaDiemDichVu";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Lỗi khi truy vấn bản đồ:", err);
            return res.status(500).json({ error: "Lỗi Server khi tải bản đồ" });
        }
        // Gửi mảng dữ liệu về cho Frontend
        res.json(results);
    });
});

module.exports = router;