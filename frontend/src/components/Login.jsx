import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

// 1. SỬA Ở ĐÂY: Nhận prop setUser từ App.jsx truyền vào
const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); 

  // Xử lý khi người dùng gõ vào form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý luồng Đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Xóa lỗi cũ trước khi gửi

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Lưu thẻ bài (Token) và Thông tin user vào máy
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('userInfo', JSON.stringify(data.user));

        // 2. THÊM Ở ĐÂY: Gọi hàm báo cho App.jsx biết để cập nhật Navbar ngay lập tức
        setUser(data.user);

        // 3. KIỂM TRA ROLE ĐỂ CHUYỂN HƯỚNG BẰNG ROUTER
        if (data.user.role === 'admin') {
            navigate('/admin'); // Chuyển thẳng vào Admin Dashboard
        } else {
            navigate('/'); // Chuyển về Trang chủ / Bản đồ cho User
        }
      } else {
        // Nếu sai mật khẩu hoặc tài khoản, hiện lỗi từ Backend
        setError("⚠️ " + data.error);
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Lỗi kết nối đến máy chủ!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Đăng Nhập</h2>
        
        {/* Vùng hiển thị lỗi */}
        {error && (
          <div className="p-4 rounded-lg mb-6 text-sm font-medium bg-red-50 text-red-600 border border-red-200">
            {error}
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

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-4"
          >
            Vào Hệ Thống
          </button>

          {/* Dòng chữ chuyển sang trang Đăng ký */}
          <p className="text-sm text-center text-gray-600 mt-6">
            Chưa có tài khoản?{' '}
            <button 
              type="button" 
              onClick={() => navigate('/register')}  
              className="text-blue-600 hover:text-blue-700 font-bold hover:underline transition-colors focus:outline-none"
            >
              Đăng ký ngay
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;