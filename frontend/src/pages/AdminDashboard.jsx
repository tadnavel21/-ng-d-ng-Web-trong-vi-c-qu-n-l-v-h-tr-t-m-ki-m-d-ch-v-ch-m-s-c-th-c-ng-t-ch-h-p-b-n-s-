import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    // Thêm State để biết đang ở chế độ Thêm hay Sửa (lưu ID của dịch vụ đang sửa)
    const [editingId, setEditingId] = useState(null); 
    
    const [formData, setFormData] = useState({
        ten_dich_vu: '', loai_dich_vu: 'Spa', dia_chi: '', lat: '', lng: ''
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/services');
            const data = await response.json();
            
            // Console log để debug (Có thể xóa đi khi code đã chạy mượt)
            console.log("Dữ liệu Backend trả về:", data);

            if (Array.isArray(data)) {
                setServices(data);
            } else {
                setServices([]);
            }
        } catch (error) {
            console.error('Lỗi fetch data:', error);
            setServices([]);
        }
    };

    // ==========================================
    // XỬ LÝ LƯU (Dùng chung cho cả THÊM và SỬA)
    // ==========================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingId 
                ? `http://localhost:5000/api/services/${editingId}`
                : 'http://localhost:5000/api/services';
            
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setShowModal(false);
                setEditingId(null); 
                fetchServices();    
                setFormData({ ten_dich_vu: '', loai_dich_vu: 'Spa', dia_chi: '', lat: '', lng: '' });
                alert(editingId ? 'Cập nhật thành công!' : 'Thêm mới thành công!');
            } else {
                alert('Có lỗi xảy ra khi lưu dữ liệu');
            }
        } catch (error) {
            console.error('Lỗi post/put data:', error);
        }
    };

    // ==========================================
    // XỬ LÝ BẤM NÚT "SỬA"
    // ==========================================
    const handleEditClick = (srv) => {
        setEditingId(srv.id_diadiem); 
        setFormData({
            // Đã KHỚP LỆNH tên biến theo đúng Database của anh/chị
            ten_dich_vu: srv.ten_dich_vu || '', 
            loai_dich_vu: srv.loai_dich_vu || 'Spa',
            dia_chi: srv.dia_chi || '',
            lat: srv.lat || '',
            lng: srv.lng || ''
        });
        setShowModal(true);
    };

    // ==========================================
    // XỬ LÝ BẤM NÚT "XÓA"
    // ==========================================
    const handleDeleteClick = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này không?")) return;

        try {
            const response = await fetch(`http://localhost:5000/api/services/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchServices(); 
                alert('Đã xóa thành công!');
            } else {
                alert('Lỗi khi xóa dịch vụ');
            }
        } catch (error) {
            console.error('Lỗi delete data:', error);
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Quản lý Dịch vụ Thú cưng</h1>
                <button 
                    onClick={() => {
                        setEditingId(null);
                        setFormData({ ten_coso: '', loai_dichvu: 'Spa', dia_chi: '', toa_do_lat: '', toa_do_lng: '' });
                        setShowModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    + Thêm Dịch Vụ
                </button>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="min-w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600">Tên Dịch Vụ</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Loại</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Địa Chỉ</th>
                            <th className="px-6 py-4 font-semibold text-gray-600">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {services.map(srv => (
                            <tr key={srv.id_diadiem} className="hover:bg-gray-50">
                                {/* Đã KHỚP LỆNH hiển thị theo đúng tên biến từ Backend */}
                                <td className="px-6 py-4 font-medium text-gray-800">{srv.ten_coso}</td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                        {srv.loai_dichvu}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{srv.dia_chi}</td>
                                <td className="px-6 py-4">
                                    <button 
                                        onClick={() => handleEditClick(srv)}
                                        className="text-blue-500 hover:underline mr-3 font-medium"
                                    >
                                        Sửa
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteClick(srv.id_diadiem)}
                                        className="text-red-500 hover:underline font-medium"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Form Thêm/Sửa */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">{editingId ? 'Sửa thông tin dịch vụ' : 'Thêm dịch vụ mới'}</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input 
                                type="text" placeholder="Tên dịch vụ (VD: Spa Cún Yêu)" required
                                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                value={formData.ten_coso}
                                onChange={(e) => setFormData({...formData, ten_coso: e.target.value})}
                            />
                            <select 
                                className="border p-3 rounded-lg outline-none"
                                value={formData.loai_dichvu}
                                onChange={(e) => setFormData({...formData, loai_dichvu: e.target.value})}
                            >
                                <option value="Spa">Spa & Grooming</option>
                                <option value="Khách sạn">Khách sạn thú cưng</option>
                                <option value="Phòng khám">Phòng khám thú y</option>
                            </select>
                            <input 
                                type="text" placeholder="Địa chỉ chi tiết" required
                                className="border p-3 rounded-lg outline-none"
                                value={formData.dia_chi}
                                onChange={(e) => setFormData({...formData, dia_chi: e.target.value})}
                            />
                            <div className="flex gap-4">
                                <input 
                                    type="number" step="any" placeholder="Vĩ độ (Lat)" required
                                    className="border p-3 rounded-lg w-1/2 outline-none"
                                    value={formData.lat}
                                    onChange={(e) => setFormData({...formData, lat: e.target.value})}
                                />
                                <input 
                                    type="number" step="any" placeholder="Kinh độ (Lng)" required
                                    className="border p-3 rounded-lg w-1/2 outline-none"
                                    value={formData.lng}
                                    onChange={(e) => setFormData({...formData, lng: e.target.value})}
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Hủy</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
                                    {editingId ? 'Cập Nhật' : 'Lưu Dịch Vụ'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}