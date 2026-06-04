import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix lỗi mất icon mặc định của Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// COMPONENT CON: Xử lý hiệu ứng "Bay" (FlyTo)
const MapController = ({ selectedLocation }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.toa_do_lat, selectedLocation.toa_do_lng], 16, {
        animate: true,
        duration: 1.5 
      });
    }
  }, [selectedLocation, map]);

  return null;
};

const PetMap = () => {
  const [services, setServices] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const markerRefs = useRef({});
  const centerPosition = [21.0285, 105.8542];

  // State cho modal đặt lịch
  const [bookingModal, setBookingModal] = useState({ show: false, service: null });
  const [bookingData, setBookingData] = useState({ ngay_gio: '', ghi_chu: '' });

  // Gọi API lấy dữ liệu
  useEffect(() => {
    fetch('http://localhost:5000/api/locations')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error("Lỗi khi tải dữ liệu bản đồ:", error));
  }, []);

  // Xử lý khi click vào một dịch vụ ở danh sách bên trái
  const handleServiceClick = (service) => {
    setSelectedLocation(service);
    const marker = markerRefs.current[service.id_diadiem];
    if (marker) {
      marker.openPopup();
    }
  };

  // Xử lý gửi đặt lịch
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    
    if (!userInfo.username && !userInfo.name) {
      alert("⚠️ Bạn cần đăng nhập để sử dụng tính năng đặt lịch!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userInfo.username || userInfo.name,
          id_diadiem: bookingModal.service.id_diadiem,
          ten_dich_vu: bookingModal.service.ten_dich_vu || bookingModal.service.name,
          ngay_gio: bookingData.ngay_gio,
          ghi_chu: bookingData.ghi_chu
        })
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setBookingModal({ show: false, service: null });
        setBookingData({ ngay_gio: '', ghi_chu: '' });
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Lỗi đặt lịch:", error);
      alert("Không thể kết nối đến server!");
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] w-full bg-gray-50">
      
      {/* CỘT TRÁI: DANH SÁCH DỊCH VỤ */}
      <div className="w-1/3 bg-white p-4 shadow-lg overflow-y-auto z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📍 Dịch vụ quanh đây</h2>
        
        <div className="space-y-4">
          {services.map((service) => (
            <div 
              key={service.id_diadiem} 
              onClick={() => handleServiceClick(service)}
              className={`p-4 border rounded-xl hover:shadow-md transition-all cursor-pointer 
                ${selectedLocation?.id_diadiem === service.id_diadiem ? 'border-blue-500 bg-blue-100' : 'border-blue-100 hover:border-blue-400 bg-blue-50/50'}`}
            >
              <h3 className="font-bold text-lg text-gray-800">{service.ten_coso}</h3>
              <p className="text-sm text-gray-500 font-medium mb-2">{service.loai_dichvu}</p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <span>📌</span> {service.dia_chi}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CỘT PHẢI: BẢN ĐỒ */}
      <div className="w-2/3 h-full relative z-0">
        <MapContainer 
          center={centerPosition} 
          zoom={14} 
          scrollWheelZoom={true} 
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController selectedLocation={selectedLocation} />

          {/* SỬA LỖI Ở ĐÂY: Dùng service thay vì srv */}
          {services.map((service) => (
            <Marker 
              key={service.id_diadiem} 
              position={[service.toa_do_lat, service.toa_do_lng]}
              ref={(ref) => markerRefs.current[service.id_diadiem] = ref}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-blue-600">{service.ten_coso}</h3>
                  <p className="text-sm text-gray-600">{service.dia_chi}</p>
                  <button 
                    onClick={() => setBookingModal({ show: true, service: service })} // Dùng service, không phải srv
                    className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-1.5 px-3 rounded shadow transition-all"
                  >
                    🗓️ Đặt lịch ngay
                  </button>
                  <p className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">{service.loai_dichvu}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* MODAL ĐẶT LỊCH */}
      {bookingModal.show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999]">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Đặt lịch dịch vụ</h2>
            <p className="text-blue-600 font-semibold mb-4 border-b pb-2">
              📍 {bookingModal.service.ten_dich_vu || bookingModal.service.name}
            </p>
            
            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày giờ đến</label>
                <input 
                  type="datetime-local" required
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  value={bookingData.ngay_gio}
                  onChange={e => setBookingData({...bookingData, ngay_gio: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú cho cơ sở (nếu có)</label>
                <textarea 
                  rows="3" placeholder="VD: Bé cún nhà mình hơi nhát người..."
                  className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
                  value={bookingData.ghi_chu}
                  onChange={e => setBookingData({...bookingData, ghi_chu: e.target.value})}
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-3 mt-2">
                <button 
                  type="button" 
                  onClick={() => setBookingModal({ show: false, service: null })} 
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-orange-500 text-white font-bold rounded-lg shadow hover:bg-orange-600"
                >
                  Xác nhận đặt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetMap;