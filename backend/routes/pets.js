const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const verifyToken = require('../middleware/authMiddleware');

// 1. Cấu hình Multer để lưu ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// ==========================================
// [GET] LẤY DANH SÁCH PET (CHỈ CỦA CHỦ NHÂN)
// ==========================================
router.get('/', verifyToken, (req, res) => {
    const userId = req.user.id; // Rút ID từ thẻ bài JWT

    if (!userId) {
        return res.status(401).json({ error: "Lỗi thẻ bài không chứa ID người dùng!" });
    }

    const sql = "SELECT * FROM Pets WHERE user_id = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: "Lỗi Server" });
        res.json(results);
    });
});

// ==========================================
// [POST] THÊM BOSS MỚI (ĐÓNG DẤU CHỦ NHÂN)
// ==========================================
router.post('/', verifyToken, upload.single('avatar'), (req, res) => {
    const { pet_name, pet_type, age, weight, growth_diary } = req.body;
    const avatar = req.file ? req.file.filename : null;
    
    // Lấy ID chủ nhân từ thẻ bài Token
    const userId = req.user.id; // (Hoặc req.user.id_user tuỳ vào file auth.js của anh/chị)

    // SỬA CHỮ id_user THÀNH user_id CHO KHỚP VỚI DATABASE
    const sql = "INSERT INTO Pets (user_id, pet_name, pet_type, age, weight, avatar, growth_diary) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [userId, pet_name, pet_type, age, weight, avatar, growth_diary], (err, result) => {
        if (err) {
            console.error("Lỗi khi thêm Boss:", err); // Dòng này đã in ra lỗi cho chúng ta bắt ban nãy
            return res.status(500).json({ error: "Không thể thêm thú cưng" });
        }
        res.status(201).json({ message: "Thêm thành công!" });
    });
});

// ==========================================
// [DELETE] XÓA BOSS (CHỈ XÓA ĐƯỢC PET CỦA MÌNH)
// ==========================================
router.delete('/:id', verifyToken, (req, res) => {
    const id_pet = req.params.id;
    const userId = req.user.id;

    // Phải khớp cả id_pet VÀ user_id thì mới cho xóa, tránh hacker can thiệp
    const sql = "DELETE FROM Pets WHERE id_pet = ? AND user_id = ?";
    db.query(sql, [id_pet, userId], (err, result) => {
        if (err) return res.status(500).json({ error: "Lỗi Server" });
        res.json({ message: "Đã xóa hồ sơ!" });
    });
});

module.exports = router;