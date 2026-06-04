import React, { useState, useEffect } from 'react';
import PetGrowthTimeline from './PetGrowthTimeline';

const PetProfile = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);
  
  const [formData, setFormData] = useState({
    pet_name: '', pet_type: '', age: '', weight: '', growth_diary: ''
  });
  
  // State mới để lưu file ảnh người dùng chọn
  const [avatarFile, setAvatarFile] = useState(null);

  // 1. CẬP NHẬT HÀM LẤY DANH SÁCH: Gửi kèm Token
  const fetchPets = () => {
    const token = localStorage.getItem('token'); // Lấy thẻ bài từ máy
    
    fetch('http://localhost:5000/api/pets', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Nhét thẻ bài vào Header
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Không có quyền truy cập");
        return res.json();
      })
      .then((data) => {
        setPets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi khi lấy dữ liệu:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hàm bắt sự kiện khi người dùng chọn file ảnh
  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  // 2. CẬP NHẬT HÀM XÓA: Gửi kèm Token
  const handleDelete = (id_pet) => {
    const token = localStorage.getItem('token');
    
    // Hiển thị bảng hỏi xác nhận để tránh bấm nhầm
    if (window.confirm("Anh/chị có chắc chắn muốn xóa hồ sơ của Boss này không?")) {
      fetch(`http://localhost:5000/api/pets/${id_pet}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // Nhét thẻ bài vào Header
        }
      })
      .then(res => res.json())
      .then(data => {
        alert('Đã xóa hồ sơ thành công!');
        fetchPets(); // Load lại danh sách để thẻ biến mất ngay lập tức
      })
      .catch(err => console.error("Lỗi khi xóa:", err));
    }
  };

  // 3. CẬP NHẬT HÀM THÊM MỚI: Gửi kèm Token
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // Vì có file, ta KHÔNG dùng JSON.stringify nữa, mà dùng đối tượng FormData
    const formDataToSend = new FormData();
    formDataToSend.append('pet_name', formData.pet_name);
    formDataToSend.append('pet_type', formData.pet_type);
    formDataToSend.append('age', formData.age);
    formDataToSend.append('weight', formData.weight);
    formDataToSend.append('growth_diary', formData.growth_diary);
    
    // Nếu có chọn file ảnh thì đính kèm vào
    if (avatarFile) {
      formDataToSend.append('avatar', avatarFile);
    }

    fetch('http://localhost:5000/api/pets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}` // Vẫn nhét thẻ bài vào, nhưng tuyệt đối KO set Content-Type
      },
      body: formDataToSend
    })
    .then(res => res.json())
    .then(data => {
      alert('Tạo hồ sơ thành công!');
      setShowModal(false); 
      setFormData({ pet_name: '', pet_type: '', age: '', weight: '', growth_diary: '' }); 
      setAvatarFile(null);
      fetchPets(); 
    })
    .catch(err => console.error("Lỗi gửi dữ liệu:", err));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-bold text-gray-500 animate-pulse">
          🐾 Đang tải hồ sơ các Boss...
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">📋 Hồ Sơ Các Boss</h2>
          <p className="text-gray-500 mt-2">Quản lý nhật ký tăng trưởng và thông tin sức khỏe</p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
        >
          <span className="text-xl">+</span> Thêm Boss Mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <div 
              key={pet.id_pet} 
              className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* PHẦN HIỂN THỊ ẢNH TẢI LÊN */}
              <div className="h-48 bg-gradient-to-r from-orange-100 to-amber-50 flex items-center justify-center overflow-hidden">
                {pet.avatar ? (
                  <img 
                    src={`http://localhost:5000/uploads/${pet.avatar}`} 
                    alt={pet.pet_name} 
                    className="max-w-full max-h-full object-contain object-center"
                  />
                ) : (
                  <span className="text-7xl">🐶</span> // Nếu không có ảnh thì hiện icon mặc định
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{pet.pet_name}</h3>
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                    {pet.pet_type}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100">
                    <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Tuổi</p>
                    <p className="text-lg font-bold text-gray-700">{pet.age} tuổi</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-2xl text-center border border-gray-100">
                    <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Cân nặng</p>
                    <p className="text-lg font-bold text-gray-700">{pet.weight} kg</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <p className="text-gray-500 italic text-sm line-clamp-2 w-3/4">
                    "{pet.growth_diary || 'Chưa có nhật ký nào được ghi chép.'}"
                  </p>
                  <div className="flex gap-4 items-center">
                    <button 
                        onClick={() => setSelectedPetId(pet.id_pet)} 
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-bold py-2 px-3 rounded transition-colors whitespace-nowrap"
                    >
                        📈 Lộ trình
                    </button>
                    <button className="text-blue-500 font-bold hover:underline text-sm">Sửa</button>
                    <button onClick={() => handleDelete(pet.id_pet)} className="text-red-500 font-bold hover:underline text-sm">Xóa</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50 transition-colors" onClick={() => setShowModal(true)}>
             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl text-gray-400 mb-4">+</div>
            <p className="text-gray-500 text-lg font-semibold">Chưa có hồ sơ thú cưng nào. Hãy thêm Boss mới nhé!</p>
          </div>
        )}
      </div>
      
      {selectedPetId && (
        <div className="mt-8 border-t-2 border-dashed border-slate-200 pt-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800">Chi tiết lộ trình</h3>
                <button 
                    onClick={() => setSelectedPetId(null)}
                    className="text-sm text-red-500 hover:text-red-700 font-semibold"
                >
                    Đóng lộ trình ✖
                </button>
            </div>
            <PetGrowthTimeline petId={selectedPetId} />
        </div>
    )}

      {/* KHU VỰC BẢNG NHẬP LIỆU */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-md flex items-center justify-center z-50 transition-all">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-5 text-gray-400 hover:text-red-500 text-2xl font-bold">×</button>
            
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Tạo Hồ Sơ Boss Mới</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* CHỖ TẢI ẢNH LÊN */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Ảnh đại diện (Avatar)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Tên gọi</label>
                  <input type="text" name="pet_name" value={formData.pet_name} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="VD: Miu Miu" />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Giống loài</label>
                  <input type="text" name="pet_type" value={formData.pet_type} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="VD: Mèo Anh" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Tuổi</label>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Cân (kg)</label>
                  <input type="number" step="0.1" name="weight" value={formData.weight} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-2">Ghi chú (Nhật ký)</label>
                <textarea name="growth_diary" value={formData.growth_diary} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Bé thích ăn pate..."></textarea>
              </div>

              <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg mt-4 transition-colors">
                💾 Lưu Hồ Sơ
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetProfile;