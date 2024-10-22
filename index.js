const express = require("express");
const { books } = require("./users.json");

const app = express();

const PORT =8081;

app.use(express.json());

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

app.get("/",(req,res) => {
    res.status(200).json({
        message: "Server is up and running :-)",
        data: "hey",
    })
})

/**
 * Route: /usersn
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */

app.get("/users", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesn't exits",
  });
});

app.listen(PORT, () => {
    console.log('Server is running at port 8081')
});