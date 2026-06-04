import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

// Import các components
import PetMap from './components/PetMap';
import PetProfile from './components/PetProfile';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './pages/AdminDashboard'; // Import trang Admin của chúng ta
import QAPage from './pages/QAPage';  
// ==========================================
// TẠO COMPONENT LÕI ĐỂ SỬ DỤNG ĐƯỢC HOOK ROUTER
// ==========================================
function AppContent() {
  // Bỏ activeTab đi, dùng URL của trình duyệt làm chuẩn
  const location = useLocation(); 
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userInfoString = localStorage.getItem('userInfo');

    if (token) {
      if (userInfoString) {
        setUser(JSON.parse(userInfoString));
      } else {
        setUser({ name: role === 'admin' ? 'Admin' : 'Khách', role: role });
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/'); // Đá về trang chủ (Bản đồ)
    alert('Đã đăng xuất thành công!');
  };

  // Hàm phụ trợ để làm sáng menu đang được chọn (thay thế cho activeTab === '...')
  const checkActive = (path) => location.pathname === path ? 'border-b-2 border-white pb-1' : '';

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* ========================================== */}
      {/* THANH ĐIỀU HƯỚNG (GIỮ NGUYÊN 100% UI CỦA ANH/CHỊ) */}
      {/* ========================================== */}
      <nav className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold cursor-pointer tracking-wide" onClick={() => navigate('/')}>
            🐾 PetCare System
          </h1>
          
          <ul className="flex space-x-8 font-semibold text-lg items-center">
            {/* Thay thẻ <li> thuần thành thẻ <Link> hoặc dùng navigate để đổi URL */}
            <li className={`hover:text-blue-200 cursor-pointer transition-all ${checkActive('/')}`}>
              <Link to="/">Bản đồ dịch vụ</Link>
            </li>
            
            <li className={`hover:text-blue-200 cursor-pointer transition-all ${checkActive('/profile')}`}>
              <Link to="/profile">Hồ sơ Boss</Link>
            </li>
            
            <li className={`hover:text-blue-200 cursor-pointer transition-all ${checkActive('/qa')}`}>
              <Link to="/qa">Hỏi - Đáp</Link>
            </li>

            {/* Link ẩn chỉ dành cho Admin */}
            {user && user.role === 'admin' && (
               <li className={`hover:text-yellow-300 text-yellow-400 cursor-pointer transition-all ${checkActive('/admin')}`}>
                 <Link to="/admin">⚙️ Quản trị</Link>
               </li>
            )}

            {user ? (
              <div className="flex items-center space-x-4 bg-blue-700 px-3 py-1.5 rounded-lg shadow-inner">
                <span className="text-yellow-300 font-medium">👋 Xin chào, {user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-bold transition-all"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <li className={`hover:text-blue-200 cursor-pointer transition-all ${checkActive('/login') || checkActive('/register')}`}>
                <Link to="/login">Đăng nhập</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* ========================================== */}
      {/* KHU VỰC HIỂN THỊ NỘI DUNG DỰA THEO ĐƯỜNG DẪN URL */}
      {/* ========================================== */}
      <main className="container mx-auto mt-6 p-4">
        <Routes>
          {/* Mặc định vào web là mở Bản đồ */}
          <Route path="/" element={<PetMap />} />

          {/* Trang Hồ sơ: Giữ nguyên logic khóa tính năng siêu hay của anh/chị */}
          <Route path="/profile" element={
            user ? <PetProfile /> : (
              <div className="text-center mt-20 p-8 bg-white rounded-lg shadow-md max-w-md mx-auto">
                <div className="text-6xl mb-4">🔒</div>
                <h2 className="text-2xl font-bold text-gray-800">Tính năng bị giới hạn</h2>
                <p className="text-gray-500 mt-2">
                  Vui lòng đăng nhập tài khoản để có thể quản lý hồ sơ thú cưng của riêng bạn.
                </p>
                <button 
                  onClick={() => navigate('/login')}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                  Đi đến Đăng nhập ngay
                </button>
              </div>
            )
          } />

          {/* Trang Hỏi đáp */}
          <Route path="/qa" element={
            <div className="text-center mt-20">
              <h2 className="text-3xl font-bold text-gray-700">💬 Diễn đàn Hỏi - Đáp</h2>
              <p className="text-gray-500 mt-2">Nơi kết nối cộng đồng và chuyên gia thú y</p>
              <p className="mt-6 text-xl text-orange-500 font-medium italic">🛠️ Tính năng này sẽ được xây dựng ở bước tiếp theo!</p>
            </div>
          } />

          {/* Trang Đăng nhập & Đăng ký */}
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Trang Admin (Cửa bảo vệ cấp cao) */}
          <Route path="/admin" element={
             user && user.role === 'admin' ? <AdminDashboard /> : (
               <div className="text-center mt-20 text-red-600 text-2xl font-bold">
                 ⛔ BẠN KHÔNG CÓ QUYỀN TRUY CẬP TRANG NÀY!
               </div>
             )
          } />
          <Route path="/qa" element={<QAPage />} />
        </Routes>
      </main>
    </div>
  );
}

// Bọc toàn bộ AppContent vào Router
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;