import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooksData() {
      try {
        const res = await axios.get("http://localhost:8800/books");
        console.log(res.data);
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBooksData();
  }, []);

  async function handleDelete(id) {
    try {
      const res = await axios.delete("http://localhost:8800/books/" + id);
      console.log(res.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div>
        <h1>Book Shop</h1>
        <div className="books">
          {books.map((book) => (
            <div key={book.id} className="book">
              <img src={book.cover} alt="" />
              <h2>{book.title}</h2>
              <p>{book.description}</p>
              <span>Rs {book.price}</span>
              <button className="delete" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
              <button className="update">
                <Link to={`/update/${book.id}`}>Update</Link>
              </button>
            </div>
          ))}
        </div>
        <button className="addHome">
          <Link to="/add">Add new book</Link>
        </button>
      </div>
    </>
  );
};

export default Books;
