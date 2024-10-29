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

 


module.exports = router;