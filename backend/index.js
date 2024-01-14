import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()
const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "mysql123",
    database : "test"
})

app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    res.json("Hello this is backend")
})

app.get("/books", (req, res) => {
    const query = "SELECT * FROM books"
    db.query(query, (error, data) => {
        if(error){return res.json(error)}
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const query = "INSERT INTO books (`title`, `desc`, `price`) VALUES (?)"
    const values = [req.body.title, req.body.desc, req.body.price]

    db.query(query, [values], (error, data) => {
        if(error) return res.json(error)
        return res.json("Book has been created successfully")
    })
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id
    const query = "DELETE FROM books WHERE id = ?"

    db.query(query, [bookId], (error, data) => {
        return res.json("Book has been deleted successfully")
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id
    const query = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        
    ]

    db.query(query, [...values, bookId], (error, data) => {
        return res.json("Book has been updated successfully")
    })
})

app.listen(3000, () => {
    console.log("Server initialized port 3000");
})