import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [books, setBooks] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });
  const navigate = useNavigate();
  function handleChange(e) {
    setBooks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/books", books);
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(books);
  return (
    <div className="form">
      <h1>Add new book</h1>
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
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default Add;
