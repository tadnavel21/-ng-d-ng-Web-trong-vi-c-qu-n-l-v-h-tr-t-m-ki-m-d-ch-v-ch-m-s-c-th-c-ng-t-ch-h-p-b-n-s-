import React, { useState, useEffect } from 'react';

export default function QAPage() {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');

    useEffect(() => { fetchQA(); }, []);

    const fetchQA = async () => {
        const res = await fetch('http://localhost:5000/api/qa');
        const data = await res.json();
        setQuestions(data);
    };

    const submitQuestion = async () => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        await fetch('http://localhost:5000/api/qa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user.name, cau_hoi: newQuestion })
        });
        setNewQuestion('');
        fetchQA();
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">💬 Góc Hỏi - Đáp</h2>
            
            {/* Form gửi câu hỏi */}
            <div className="mb-8">
                <textarea 
                    value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)}
                    className="w-full p-4 border rounded-lg" placeholder="Bạn có thắc mắc gì về thú cưng?"
                />
                <button onClick={submitQuestion} className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg">Gửi câu hỏi</button>
            </div>

            {/* Danh sách hiển thị */}
            <div className="space-y-4">
                {questions.map(q => (
                    <div key={q.id_hoi_dap} className="p-4 border-b">
                        <p className="font-bold">❓ {q.cau_hoi}</p>
                        {q.cau_tra_loi ? (
                            <p className="text-green-600 mt-1">✅ Admin: {q.cau_tra_loi}</p>
                        ) : (
                            <p className="text-gray-400 italic text-sm">Đang chờ bác sĩ trả lời...</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}