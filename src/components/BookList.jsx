import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

function BookList({ books, onEdit, onDelete }) {
  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div>
      <h2>Danh sách hiện có ({books.length})</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {/* AnimatePresence cho phép animate khi component bị unmount (xóa) */}
        <AnimatePresence mode='popLayout'>
          {books.length > 0 ? (
            books.map((book) => (
              <motion.li 
                key={book.id}
                layout // Tự động trượt các phần tử khác lên khi có phần tử bị xóa
                initial={{ opacity: 0, x: -50 }} // Trạng thái bắt đầu
                animate={{ opacity: 1, x: 0 }}   // Trạng thái hiển thị
                exit={{ opacity: 0, x: 100, scale: 0.8 }} // Trạng thái khi bị xóa
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{ 
                  background: "white",
                  marginBottom: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  border: "1px solid #eee", 
                  padding: "15px", 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div style={{ flex: 1 }}>
                  <motion.strong style={{ fontSize: "1.1em", display: "block" }}>{book.title}</motion.strong>
                  <div style={{ fontSize: "0.9em", color: "#666", marginTop: "4px" }}>
                    Tác giả: {book.author || "..."} | Năm: {book.published_year || "..."}
                  </div>
                  <div style={{ fontWeight: "bold", color: "#2ecc71", marginTop: "4px" }}>
                    {formatCurrency(book.price)}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onEdit(book)}
                    style={{ backgroundColor: "#f1c40f", color: "white", padding: "8px 12px", fontSize: "0.9em", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Sửa
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1, backgroundColor: "#c0392b" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(book.id)}
                    style={{ backgroundColor: "#e74c3c", color: "white", padding: "8px 12px", fontSize: "0.9em", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Xóa
                  </motion.button>
                </div>
              </motion.li>
            ))
          ) : (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              style={{ textAlign: "center", color: "#888", fontStyle: "italic" }}
            >
              Chưa có cuốn sách nào hoặc đang tải dữ liệu...
            </motion.p>
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default BookList;