import { useState, useEffect } from "react";
import "./App.css";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
// Import các thành phần cần thiết từ framer-motion
import { motion } from "framer-motion";

function App() {
  // --- GIỮ NGUYÊN PHẦN LOGIC CODE CŨ ---
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  // LƯU Ý: Đảm bảo URL này chính xác với server của bạn đang chạy
  const API_URL = "https://my-api-server-txbx.onrender.com/api/books";

  const fetchBooks = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("Lỗi tải sách:", err));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleFormSubmit = (formData) => {
    if (editingBook) {
      // Logic Sửa
      fetch(`${API_URL}/${editingBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Cập nhật thành công!");
          fetchBooks();
          setEditingBook(null);
        })
        .catch((err) => console.error("Lỗi sửa:", err));
    } else {
      // Logic Thêm
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then(() => {
          // Bỏ alert để trải nghiệm mượt mà hơn
          fetchBooks();
        })
        .catch((err) => console.error("Lỗi thêm:", err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa cuốn sách này?")) {
      // Optimistic UI: Xóa ngay trên giao diện để tạo cảm giác nhanh
      setBooks(books.filter(b => b.id !== id)); 
      
      fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => {
           // Đã xóa thành công trên server
        })
        .catch((err) => {
          console.error("Lỗi xóa:", err);
          // Nếu lỗi thì tải lại danh sách cũ để đồng bộ
          fetchBooks(); 
        });
    }
  };

  const startEditing = (book) => {
    setEditingBook(book);
    // Cuộn mượt lên đầu container thay vì đầu trang
    document.querySelector('.app-container')?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingBook(null);
  };

  // --- PHẦN CẤU HÌNH ANIMATION MỚI ---

  // 1. Variant cho Container chính (Chứa toàn bộ nội dung)
  // Nó sẽ điều khiển việc xuất hiện lần lượt của các phần tử con (staggerChildren)
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren", // Container hiện trước
        staggerChildren: 0.15 // Các con hiện cách nhau 0.15s
      }
    }
  };

  // 2. Variant cho các phần tử con (Tiêu đề, Form, List)
  // Chúng sẽ trượt từ dưới lên một chút và hiện rõ
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // 3. Variant riêng cho đường kẻ ngang (HR)
  const hrVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { 
      scaleX: 1, 
      opacity: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };


  return (
    // --- LỚP NỀN NGOÀI CÙNG (BACKGROUND WRAPPER) ---
    <div style={{ 
      minHeight: "100vh", 
      width: "100%",
      // Gradient nền chuyển từ xám xanh nhẹ sang xám ấm
      background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)", 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      boxSizing: "border-box",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" 
    }}>
      
      {/* --- CONTAINER CHÍNH CỦA APP --- */}
      <motion.div 
        className="app-container" // Thêm class để dễ query khi scroll
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          maxWidth: "800px", 
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)", // Nền trắng hơi trong suốt
          backdropFilter: "blur(10px)", // Hiệu ứng mờ kính (glassmorphism) nhẹ
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)" // Đổ bóng tạo chiều sâu
        }}
      >
        {/* Phần tử con 1: Tiêu đề */}
        <motion.div variants={itemVariants} style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "#2c3e50", margin: "0", fontSize: "1.8rem" }}>
            <u>Phạm Đức Duy- THứ 4 ca 2 </u>
          </h1>
          <h2 style={{ color: "#34495e", marginTop: "10px", fontSize: "1.5rem" }}>Quản Lý Sách 📖</h2>
        </motion.div>

        {/* Phần tử con 2: Form */}
        <motion.div variants={itemVariants}>
          <BookForm
            onSubmit={handleFormSubmit}
            currentBook={editingBook}
            cancelEdit={cancelEdit}
          />
        </motion.div>

        {/* Phần tử con 3: Đường kẻ */}
        <motion.hr 
          variants={hrVariants}
          style={{ margin: "30px 0", border: "0", borderTop: "2px solid #ecf0f1", transformOrigin: "center" }} 
        />

        {/* Phần tử con 4: Danh sách */}
        <motion.div variants={itemVariants}>
          <BookList books={books} onEdit={startEditing} onDelete={handleDelete} />
        </motion.div>

      </motion.div>
    </div>
  );
}

export default App;