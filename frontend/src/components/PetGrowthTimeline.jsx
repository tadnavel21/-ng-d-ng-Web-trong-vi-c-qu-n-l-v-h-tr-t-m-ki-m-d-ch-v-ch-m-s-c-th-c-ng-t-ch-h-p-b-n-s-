import React, { useState, useEffect } from 'react';

export default function PetGrowthTimeline({ petId }) {
    const [logs, setLogs] = useState([]);
    const [formData, setFormData] = useState({ log_date: '', weight: '', height: '', notes: '' });
    const [loading, setLoading] = useState(false);

    // Fetch dữ liệu lộ trình từ API
    const fetchLogs = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/growth/${petId}`);
            if (response.ok) {
                const data = await response.json();
                setLogs(data);
            }
        } catch (error) {
            console.error("Lỗi kết nối API lấy log:", error);
        }
    };

    useEffect(() => {
        if (petId) fetchLogs();
    }, [petId]);

    // Xử lý gửi Form thêm mốc mới
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/growth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, pet_id: petId })
            });

            if (response.ok) {
                setFormData({ log_date: '', weight: '', height: '', notes: '' });
                fetchLogs(); // Re-fetch để cập nhật danh sách lập tức
            } else {
                alert("Có lỗi xảy ra khi thêm dữ liệu.");
            }
        } catch (error) {
            console.error("Lỗi khi thêm log:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                📈 Lộ Trình Tăng Trưởng Của Boss
            </h3>

            {/* Form thêm nhanh mốc mới */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-4 bg-slate-50 rounded-xl">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Ngày ghi nhận</label>
                    <input 
                        type="date" required
                        className="w-full text-sm p-2 rounded-lg border border-slate-200 bg-white"
                        value={formData.log_date}
                        onChange={e => setFormData({...formData, log_date: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Cân nặng (kg)</label>
                    <input 
                        type="number" step="0.1" placeholder="Ví dụ: 5.4"
                        className="w-full text-sm p-2 rounded-lg border border-slate-200 bg-white"
                        value={formData.weight}
                        onChange={e => setFormData({...formData, weight: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Chiều cao (cm)</label>
                    <input 
                        type="number" step="0.1" placeholder="Ví dụ: 30"
                        className="w-full text-sm p-2 rounded-lg border border-slate-200 bg-white"
                        value={formData.height}
                        onChange={e => setFormData({...formData, height: e.target.value})}
                    />
                </div>
                <div className="md:col-span-4 flex gap-2 items-end">
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-slate-500 mb-1">Tình trạng / Ghi chú sức khỏe</label>
                        <input 
                            type="text" placeholder="Hôm nay đi spa, tiêm nhắc lại mũi 7 bệnh..."
                            className="w-full text-sm p-2 rounded-lg border border-slate-200 bg-white"
                            value={formData.notes}
                            onChange={e => setFormData({...formData, notes: e.target.value})}
                        />
                    </div>
                    <button 
                        type="submit" disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all cursor-pointer h-[38px] disabled:opacity-50"
                    >
                        {loading ? 'Đang lưu...' : 'Ghi nhận'}
                    </button>
                </div>
            </form>

            {/* Thiết kế UI dạng Timeline */}
            {logs.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-4">Chưa có mốc tăng trưởng nào được ghi lại. Hãy nhập mốc đầu tiên nhé!</p>
            ) : (
                <div className="relative border-l-2 border-indigo-100 ml-4 space-y-6">
                    {logs.map((log) => (
                        <div key={log.id} className="relative pl-6 group">
                            {/* Điểm nút tròn trên dòng timeline */}
                            <div className="absolute -left-[7px] top-1.5 bg-indigo-600 w-3 h-3 rounded-full border-4 border-white group-hover:scale-125 transition-transform" />
                            
                            {/* Nội dung chi tiết mốc */}
                            <div className="text-xs font-semibold text-indigo-600 mb-1">
                                {new Date(log.log_date).toLocaleDateString('vi-VN')}
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 hover:shadow-md transition-shadow">
                                <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-700 mb-1">
                                    {log.weight && <span>⚖️ Cân nặng: <strong className="text-slate-900">{log.weight} kg</strong></span>}
                                    {log.height && <span>📏 Chiều dài: <strong className="text-slate-900">{log.height} cm</strong></span>}
                                </div>
                                {log.notes && (
                                    <p className="text-xs text-slate-500 italic bg-white p-2 rounded border border-dashed border-slate-200 mt-2">
                                        📝 {log.notes}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}