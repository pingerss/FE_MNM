import React from 'react';

function BookList({ books, onEdit, onDelete }) {
  // Hàm format tiền tệ
  const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div>
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
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div style={{ flex: 1 }}>
                <strong>{book.title}</strong>
                <div style={{ fontSize: "0.9em", color: "#666" }}>
                  Tác giả: {book.author || "..."} | Năm: {book.published_year || "..."}
                </div>
                <div style={{ fontWeight: "bold", color: "#2ecc71" }}>
                  {formatCurrency(book.price)}
                </div>
              </div>

              <div style={{ display: "flex", gap: "5px" }}>
                <button 
                  onClick={() => onEdit(book)}
                  style={{ backgroundColor: "#f1c40f", color: "white", padding: "5px 10px", fontSize: "0.8em" }}
                >
                  Sửa
                </button>
                <button 
                  onClick={() => onDelete(book.id)}
                  style={{ backgroundColor: "#e74c3c", color: "white", padding: "5px 10px", fontSize: "0.8em" }}
                >
                  Xóa
                </button>
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

export default BookList;