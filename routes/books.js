const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

// const { route } = require("./users");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Getting all books
 * Access: Public
 * Parameters: None
 */
router.get("/",(req,res)=>{
    res.
    status(200)
    .json({success:true, message:"got all the books", data: books });
})

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: None
 */
router.get("/issued", (req,res) => {
    const usersWithTheIssuedBook = users.filter((each) => {
        if(each.issuedBook) return each;
    });
    const issuedBooks = [];

    usersWithTheIssuedBook.forEach((each) => {
        const book = books.find((book) => (book.id === each.issuedBook));

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });
    if (issuedBooks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no books have been issued yet...",
      });
    } 
        return res.status(200).json({
            success: true,
            message: "users with the issued books...",
            data: issuedBooks,
        });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Getting all books by teir id
 * Access: Public
 * Parameters: ID
 */
router.get("/:id",(req,res)=>{
    const {id}= req.params;
    const book = books.find((each)=> each.id===id)

    if(!book){
        return res.status(404).json({
            success: false,
            message: "book not found",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Found the book by their id",
        data: book,
    });
});

/**
 * Route: /books/issued
 * Method: POST
 * Description: Adding a new book
 * Access: Public
 * Parameters: None
 * Data: id, name, genre, price, publisher, author
 */
router.post("/", (req,res) => {
    const { data } = req.body;

    if(!data) {
        return res.status(400).json({
            success: false,
            message: "no data to add a book"
        });
    }

    const book = books.find((each) => each.id === data.id);
    if (book) {
        return res.status(404).json({
            success: false,
            message: "id already exist!!"
        });
    }
    const allBooks = {...books, data};
    return res.status(201).json({
        success: true,
        message: "added book successfully",
        data: allBooks,
    })
});

/**
 * Route: /books/issued
 * Method: PUT
 * Description: Updating a book by its id
 * Access: Public
 * Parameters: id
 * Data: id, name, genre, price, publisher, author
 */
router.put("/updateBook/:id", (req,res) => {
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => each.id === id)

    if(!book){
        return res.status(400).json({
            success: false,
            message: "Book not found for this id"
        });
    }

    const updateData = books.map((each)=>{
        if(each.id === id){
            return {
                ...each,
                ...data
            };
        }

        return each;
    });
    return res.status(200).json({
        success: true,
        message: "updated a book by their id",
        data: updateData,
    });
});

module.exports = router;