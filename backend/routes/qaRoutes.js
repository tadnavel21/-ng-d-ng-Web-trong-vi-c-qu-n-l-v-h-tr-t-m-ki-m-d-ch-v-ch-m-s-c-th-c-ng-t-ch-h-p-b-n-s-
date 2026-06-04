const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Lấy tất cả câu hỏi
router.get('/', (req, res) => {
    db.query('SELECT * FROM HoiDap ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).json({ error: 'Lỗi server' });
        res.json(results);
    });
});

// Người dùng gửi câu hỏi
router.post('/', (req, res) => {
    const { username, cau_hoi } = req.body;
    db.query('INSERT INTO HoiDap (username, cau_hoi) VALUES (?, ?)', [username, cau_hoi], (err) => {
        if (err) return res.status(500).json({ error: 'Gửi thất bại' });
        res.status(201).json({ message: 'Đã gửi câu hỏi!' });
    });
});

// Admin trả lời (Dành riêng cho Admin)
router.put('/:id', (req, res) => {
    const { cau_tra_loi } = req.body;
    db.query('UPDATE HoiDap SET cau_tra_loi = ?, trang_thai = "Đã trả lời" WHERE id_hoi_dap = ?', 
    [cau_tra_loi, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: 'Trả lời thất bại' });
        res.json({ message: 'Đã trả lời thành công!' });
    });
});

module.exports = router;