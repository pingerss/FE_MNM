import { useState, useEffect } from "react";

function BookForm({ onSubmit, currentBook, cancelEdit }) {
  // State lưu dữ liệu form
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    published_year: ""
  });

  // useEffect này chạy mỗi khi "currentBook" thay đổi (khi bấm nút Sửa)
  useEffect(() => {
    if (currentBook) {
      setFormData(currentBook); // Điền thông tin sách cần sửa vào form
    } else {
      setFormData({ title: "", author: "", price: "", published_year: "" }); // Reset form nếu không sửa gì
    }
  }, [currentBook]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert("Vui lòng nhập tên sách và giá!");
      return;
    }
    // Gửi dữ liệu ra ngoài cho App.jsx xử lý
    onSubmit(formData);
    // Reset form sau khi gửi (chỉ reset nếu đang ở chế độ thêm mới)
    if (!currentBook) {
        setFormData({ title: "", author: "", price: "", published_year: "" });
    }
  };

  return (
    <div className="card" style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
      <h3>{currentBook ? "Cập nhật sách" : "Thêm Sách Mới"}</h3>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text" name="title" placeholder="Tên sách"
          value={formData.title} onChange={handleInputChange} required
        />
        <input
          type="text" name="author" placeholder="Tên tác giả"
          value={formData.author} onChange={handleInputChange}
        />
        <input
          type="number" name="price" placeholder="Giá tiền"
          value={formData.price} onChange={handleInputChange} required
        />
        <input
          type="number" name="published_year" placeholder="Năm xuất bản"
          value={formData.published_year} onChange={handleInputChange}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit" style={{ backgroundColor: currentBook ? "#f39c12" : "#646cff", color: "white", flex: 1 }}>
            {currentBook ? "Lưu thay đổi" : "Thêm sách"}
          </button>
          
          {/* Nút hủy chỉ hiện khi đang sửa */}
          {currentBook && (
            <button type="button" onClick={cancelEdit} style={{ backgroundColor: "#7f8c8d", color: "white" }}>
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookForm;