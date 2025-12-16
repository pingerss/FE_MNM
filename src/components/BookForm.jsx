import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import motion

function BookForm({ onSubmit, currentBook, cancelEdit }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    published_year: ""
  });

  useEffect(() => {
    if (currentBook) {
      setFormData(currentBook);
    } else {
      setFormData({ title: "", author: "", price: "", published_year: "" });
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
    onSubmit(formData);
    if (!currentBook) {
      setFormData({ title: "", author: "", price: "", published_year: "" });
    }
  };

  // Cấu hình hiệu ứng cho input
  const inputAnimation = {
    focus: { scale: 1.02, borderColor: "#646cff", boxShadow: "0px 0px 8px rgba(100, 108, 255, 0.5)" },
    rest: { scale: 1 }
  };

  return (
    <motion.div 
      className="card" 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "15px", borderRadius: "12px", background: "#fff", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
    >
      <motion.h3 
        key={currentBook ? "edit" : "add"} // Key thay đổi để kích hoạt animation
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {currentBook ? "✏️ Cập nhật sách" : "📚 Thêm Sách Mới"}
      </motion.h3>
      
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {["title", "author", "price", "published_year"].map((field) => (
          <motion.input
            key={field}
            variants={inputAnimation}
            whileFocus="focus"
            initial="rest"
            type={field === "price" || field === "published_year" ? "number" : "text"}
            name={field}
            placeholder={
              field === "title" ? "Tên sách" : 
              field === "author" ? "Tên tác giả" : 
              field === "price" ? "Giá tiền" : "Năm xuất bản"
            }
            value={formData[field]} 
            onChange={handleInputChange} 
            required={field === "title" || field === "price"}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc", outline: "none" }}
          />
        ))}

        <div style={{ display: "flex", gap: "10px" }}>
          <motion.button 
            type="submit" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              backgroundColor: currentBook ? "#f39c12" : "#646cff", 
              color: "white", 
              flex: 1, 
              padding: "10px", 
              borderRadius: "6px", 
              border: "none", 
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {currentBook ? "Lưu thay đổi" : "Thêm sách"}
          </motion.button>
          
          <AnimatePresence>
            {currentBook && (
              <motion.button 
                type="button" 
                onClick={cancelEdit} 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: "#7f8c8d", color: "white", padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer" }}
              >
                Hủy
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>
    </motion.div>
  );
}

export default BookForm;