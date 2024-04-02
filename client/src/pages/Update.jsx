import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [books, setBooks] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  // console.log(bookId);
  function handleChange(e) {
    setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:8800/books/" + bookId,
        books
      );
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(books);
  return (
    <div className="form">
      <h1>Update book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="desc"
        onChange={handleChange}
        name="description"
      />
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Update;
