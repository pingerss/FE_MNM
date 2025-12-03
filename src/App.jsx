import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data); // Lưu data vào state để hiển thị
      })
      .catch((error) => console.error("Lỗi:", error));
  }, []);

  return (
    <>
      <h1>Danh sách sản phẩm</h1>

      {/* Hiển thị dữ liệu */}
      <ul>
        {products.length > 0 ? (
          products.map((item) => (
            <li key={item.id}>
              <strong>{item.name}</strong> - Giá: {item.price}₫
            </li>
          ))
        ) : (
          <p>Đang tải dữ liệu...</p>
        )}
      </ul>

      <hr />

      <h2>Vite + React</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
