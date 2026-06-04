// backend/routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Lấy danh sách tất cả dịch vụ (Có thể thêm điều kiện WHERE provider_id = ? sau này)
router.get('/', (req, res) => {
    const query = 'SELECT * FROM DiaDiemDichVu ORDER BY id_diadiem DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách dịch vụ:', err);
            return res.status(500).json({ error: 'Lỗi server khi tải dữ liệu' });
        }
        res.status(200).json(results);
    });
});

// Thêm dịch vụ mới
router.post('/', (req, res) => {
    const { ten_dich_vu, loai_dich_vu, dia_chi, lat, lng } = req.body;
    
    // Validate cơ bản từ phía Backend
    if (!ten_dich_vu || !dia_chi || !lat || !lng) {
        return res.status(400).json({ error: 'Vui lòng điền đủ thông tin và tọa độ' });
    }

    const query = 'INSERT INTO DiaDiemDichVu (ten_coso, loai_dichvu, dia_chi, toa_do_lat, toa_do_lng) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [ten_dich_vu, loai_dich_vu, dia_chi, lat, lng], (err, result) => {
        if (err) {
            console.error('Lỗi khi thêm dịch vụ:', err);
            return res.status(500).json({ error: 'Không thể thêm dịch vụ lúc này' });
        }
        res.status(201).json({ id: result.insertId, message: 'Thêm dịch vụ thành công!' });
    });
});
// ==========================================
// [DELETE] Xóa một dịch vụ
// ==========================================
router.delete('/:id', (req, res) => {
    const serviceId = req.params.id;
    
    // LƯU Ý: Đổi 'id_dich_vu' thành tên cột ID thật trong bảng DiaDiemDichVu của anh/chị
    const query = 'DELETE FROM DiaDiemDichVu WHERE id_diadiem = ?';
    
    db.query(query, [serviceId], (err, result) => {
        if (err) {
            console.error('Lỗi khi xóa dịch vụ:', err);
            return res.status(500).json({ error: 'Lỗi server khi xóa' });
        }
        res.status(200).json({ message: 'Đã xóa dịch vụ thành công' });
    });
});

// ==========================================
// [PUT] Cập nhật (Sửa) thông tin dịch vụ
// ==========================================
router.put('/:id', (req, res) => {
    const serviceId = req.params.id;
    const { ten_dich_vu, loai_dich_vu, dia_chi, lat, lng } = req.body;

    // LƯU Ý: Tên các cột (name, type, address, lat, lng) phải khớp với Database của anh/chị
    // Và đổi 'id_dich_vu' thành cột ID thật
    const query = 'UPDATE DiaDiemDichVu SET ten_coso=?, loai_dichvu=?, dia_chi=?, toa_do_lat=?, toa_do_lng=? WHERE id_diadiem=?';
    
    db.query(query, [ten_dich_vu, loai_dich_vu, dia_chi, lat, lng, serviceId], (err, result) => {
        if (err) {
            console.error('Lỗi khi cập nhật dịch vụ:', err);
            return res.status(500).json({ error: 'Lỗi server khi cập nhật' });
        }
        res.status(200).json({ message: 'Cập nhật dịch vụ thành công' });
    });
});
module.exports = router;