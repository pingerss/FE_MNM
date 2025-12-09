import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // 1. State lưu danh sách sách
  const [books, setBooks] = useState([]);

  // 2. State lưu dữ liệu nhập từ form
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    published_year: ""
  });

  // Cấu hình đường dẫn API (Nếu chạy local thì dùng localhost, nếu đã deploy lên Render thì thay link Render vào đây)
  const API_URL = "https://my-api-server-txbx.onrender.com/api/books"; 
  // const API_URL = "https://ten-app-cua-ban.onrender.com/api/books";

  // Hàm lấy dữ liệu sách (GET)
  const fetchBooks = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => console.error("Lỗi khi tải sách:", error));
  };

  // Gọi API khi component vừa chạy lần đầu
  useEffect(() => {
    fetchBooks();
  }, []);

  // Hàm xử lý khi người dùng nhập liệu vào ô input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Hàm xử lý khi bấm nút Thêm sách (POST)
  const handleAddBook = (e) => {
    e.preventDefault(); // Chặn reload trang

    // Validate nhanh
    if (!formData.title || !formData.price) {
      alert("Vui lòng nhập tên sách và giá!");
      return;
    }

    // Gọi API thêm sách
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Thêm sách thành công!");
        
        // Cách 1: Load lại toàn bộ danh sách từ server
        fetchBooks(); 
        
        // Reset form về rỗng
        setFormData({ title: "", author: "", price: "", published_year: "" });
      })
      .catch((error) => console.error("Lỗi khi thêm:", error));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Quản Lý Sách</h1>

      {/* --- FORM THÊM SÁCH --- */}
      <div className="card" style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
        <h3>Thêm Sách Mới</h3>
        <form onSubmit={handleAddBook} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          
          <input
            type="text"
            name="title"
            placeholder="Tên sách (Ví dụ: Đắc Nhân Tâm)"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          
          <input
            type="text"
            name="author"
            placeholder="Tên tác giả"
            value={formData.author}
            onChange={handleInputChange}
          />
          
          <input
            type="number"
            name="price"
            placeholder="Giá tiền (VNĐ)"
            value={formData.price}
            onChange={handleInputChange}
            required
          />

          <input
            type="number"
            name="published_year"
            placeholder="Năm xuất bản"
            value={formData.published_year}
            onChange={handleInputChange}
          />

          <button type="submit" style={{ backgroundColor: "#646cff", color: "white", padding: "10px", cursor: "pointer" }}>
            Lưu sách
          </button>
        </form>
      </div>

      <hr />

      {/* --- DANH SÁCH SÁCH --- */}
      <h2>Danh sách hiện có ({books.length})</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {books.length > 0 ? (
          books.map((book) => (
            <li 
              key={book.id} 
              style={{ 
                borderBottom: "1px solid #eee", 
                padding: "10px 0", 
                display: "flex", 
                justifyContent: "space-between" 
              }}
            >
              <div>
                <strong>{book.title}</strong>
                <div style={{ fontSize: "0.9em", color: "#666" }}>
                  Tác giả: {book.author || "Chưa rõ"} | Năm: {book.published_year || "N/A"}
                </div>
              </div>
              <div style={{ fontWeight: "bold", color: "#2ecc71" }}>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book.price)}
              </div>
            </li>
          ))
        ) : (
          <p>Chưa có cuốn sách nào hoặc đang tải dữ liệu...</p>
        )}
      </ul>
    </div>
  );
}

export default App;