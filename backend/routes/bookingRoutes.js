// backend/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// API [POST] - Khách hàng đặt lịch mới
router.post('/', (req, res) => {
    const { username, id_diadiem, ten_dich_vu, ngay_gio, ghi_chu } = req.body;

    if (!username || !id_diadiem || !ngay_gio) {
        return res.status(400).json({ error: 'Vui lòng cung cấp đủ thông tin đặt lịch!' });
    }

    const query = `INSERT INTO DatLich (username, id_diadiem, ten_dich_vu, ngay_gio, ghi_chu) 
                   VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [username, id_diadiem, ten_dich_vu, ngay_gio, ghi_chu], (err, result) => {
        if (err) {
            console.error('Lỗi khi đặt lịch:', err);
            return res.status(500).json({ error: 'Lỗi server khi đặt lịch' });
        }
        res.status(201).json({ message: '🎉 Đặt lịch thành công! Vui lòng chờ xác nhận.' });
    });
});

module.exports = router;