const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Đường dẫn tới file kết nối mysql2 của anh/chị

// 1. Lấy danh sách lộ trình tăng trưởng của một Pet (Sắp xếp theo ngày mới nhất)
router.get('/:petId', (req, res) => {
    const { petId } = req.params;
    const query = 'SELECT * FROM PetGrowthLogs WHERE pet_id = ? ORDER BY log_date DESC';

    db.query(query, [petId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy log tăng trưởng:', err);
            return res.status(500).json({ message: 'Lỗi server nội bộ' });
        }
        res.status(200).json(results);
    });
});

// 2. Thêm một cột mốc tăng trưởng mới
router.post('/', (req, res) => {
    const { pet_id, log_date, weight, height, notes } = req.body;

    // Validate dữ liệu đầu vào cơ bản
    if (!pet_id || !log_date) {
        return res.status(400).json({ message: 'Thiếu thông tin pet_id hoặc ngày ghi nhận!' });
    }

    const query = 'INSERT INTO PetGrowthLogs (pet_id, log_date, weight, height, notes) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [pet_id, log_date, weight || null, height || null, notes || null], (err, result) => {
        if (err) {
            console.error('Lỗi khi lưu log tăng trưởng:', err);
            return res.status(500).json({ message: 'Không thể thêm lộ trình tăng trưởng' });
        }
        res.status(201).json({ 
            message: 'Thêm cột mốc tăng trưởng thành công!', 
            logId: result.insertId 
        });
    });
});

module.exports = router;