import React, { useState } from 'react';

const Register = ({ onSwitchView }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user' // Mặc định là Khách hàng
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Xử lý khi người dùng gõ vào form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý khi bấm nút Đăng ký
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsError(false);
        setMessage("🎉 " + data.message);
        // Có thể thêm lệnh chuyển hướng sang trang Đăng nhập tại đây
      } else {
        setIsError(true);
        setMessage("⚠️ " + data.error);
      }
    } catch (error) {
      setIsError(true);
      setMessage("⚠️ Lỗi kết nối đến máy chủ!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Tạo Tài Khoản</h2>
        
        {/* Vùng hiển thị thông báo lỗi/thành công */}
        {message && (
          <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${isError ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
            <input 
              type="text" 
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Nhập tên đăng nhập..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Nhập mật khẩu..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bạn là ai?</label>
            <select 
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="user">Khách hàng (Tìm dịch vụ)</option>
              <option value="provider">Nhà cung cấp (Chủ dịch vụ)</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-4"
          >
            Đăng Ký Ngay
          </button>
          {/* Dòng chữ chuyển sang trang Đăng nhập */}
            <p className="text-sm text-center text-gray-600 mt-6">
            Đã có tài khoản?{' '}
            <button 
                type="button" 
                onClick={onSwitchView} 
                className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-colors focus:outline-none"
            >
                Đăng nhập ngay
            </button>
            </p>
        </form>
      </div>
    </div>
  );
};

export default Register;