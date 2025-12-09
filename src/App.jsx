import { useState, useEffect } from "react";
import "./App.css";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);
  
  // State này dùng để biết đang sửa cuốn nào (null = đang thêm mới)
  const [editingBook, setEditingBook] = useState(null);

  // URL API (Thay đổi URL của bạn tại đây)
  const API_URL = "https://my-api-server-txbx.onrender.com/api/books"; 

  // --- 1. LẤY DỮ LIỆU (GET) ---
  const fetchBooks = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Lỗi tải sách:", err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // --- 2. XỬ LÝ SUBMIT (THÊM HOẶC SỬA) ---
  const handleFormSubmit = (formData) => {
    if (editingBook) {
      // Logic SỬA (PUT)
      fetch(`${API_URL}/${editingBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Cập nhật thành công!");
          fetchBooks(); // Tải lại danh sách
          setEditingBook(null); // Thoát chế độ sửa
        })
        .catch((err) => console.error("Lỗi sửa:", err));
    } else {
      // Logic THÊM (POST)
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Thêm thành công!");
          fetchBooks();
        })
        .catch((err) => console.error("Lỗi thêm:", err));
    }
  };

  // --- 3. XỬ LÝ XÓA (DELETE) ---
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa cuốn sách này?")) {
      fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Đã xóa sách!");
          fetchBooks();
        })
        .catch((err) => console.error("Lỗi xóa:", err));
    }
  };

  // --- 4. CÁC HÀM PHỤ TRỢ ---
  const startEditing = (book) => {
    setEditingBook(book); // Chuyển form sang chế độ sửa và điền dữ liệu
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang để sửa
  };

  const cancelEdit = () => {
    setEditingBook(null); // Quay về chế độ thêm mới
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Quản Lý Sách </h1>

      {/* Gọi Component Form */}
      <BookForm 
        onSubmit={handleFormSubmit} 
        currentBook={editingBook} 
        cancelEdit={cancelEdit}
      />

      <hr />

      {/* Gọi Component List */}
      <BookList 
        books={books} 
        onEdit={startEditing} 
        onDelete={handleDelete} 
      />
    </div>
  );
}

export default App;