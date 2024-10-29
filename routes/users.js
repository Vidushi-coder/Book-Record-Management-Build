const express = require('express');
const { users } = require("../data/users.json");

const router = express.Router();
/**
 * Route: /
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */

//localhost
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
  * Route: /:id
  * Method: GET
  * Description: Get single users by their id
  * Access: Public
  * Parameters: Id
  */
router.get("/:id", (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  console.log(req.params);
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User found",
    data: user,
  });
});

/**
  * Route: /
  * Method: POST
  * Description: creating a new user
  * Access: Public
  * Parameters: None
  */
router.post("/", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => each.id === id);

  if (user) {
    return res.status(404).json({
      success: false,
      message: "User  with the id exists",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    success: true,
    message: "User added successfully",
    data: users,
  });
});

/**
  * Route: /:id
  * Method: PUT
  * Description: updating a user by id
  * Access: Public
  * Parameters: ID
  */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user doesn't exist!",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "user updated!!",
    data: updateUserData,
  });
});

/**
  * Route: /:id
  * Method: DELETE
  * Description: deleting a user by their id
  * Access: Public
  * Parameters: ID
  */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user doesn't exist!",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res
    .status(200)
    .json({ success: true, message: "Deleted User..", data: users });
});

module.exports = router;