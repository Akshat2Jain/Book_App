import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
// parse application/json
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

// getting boooks
app.get("/books", (req, res) => {
  const q = "select * from books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log("Server is working fine");
    return res.json(data);
  });
});

// posting books
app.post("/books", (req, res) => {
  const q =
    "Insert into books ( `title`,`description`,`price`,`cover`) values (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
  // console.log(values);
  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
      res.json(err);
    }
    return res.json("Booked saved succesfully");
  });
});
// deleting the books
app.delete("/books/:id", function (req, res) {
  const bookId = req.params.id;
  const q = "Delete from books where id= ?";
  db.query(q, [bookId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json("Book has been deleted successfully");
  });
});
// updating the books
app.put("/books/:id", function (req, res) {
  const bookId = req.params.id;
  const q =
    "update books set `title`=?,`description`=?,`price`=?,`cover`=? where id=?";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json("Book has been updated successfully");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend");
});
