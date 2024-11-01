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
  })
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

/**
  * Route: /users/subscription-details/:id
  * Method: GET
  * Description: get all user subscription details
  * Access: Public
  * Parameters: ID
  */
 router.get("/subscription-details/:id", (req,res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if(!user){
    return res.status(404).json({
      success: false,
      message: "user with the id does not exist",
    });
  }
  const getDateInDays = (data = "") => {
    let date;
    if(data === ""){
      date = new Date();
    } else {
      date = new Date(data)
    }
    let days = Math.floor(date / (1000* 60* 60* 24));
    return days;
  };

  const subscriptionType = (date) => {
    if((user.subscriptionType === "Basic")) {
      date = date + 90;
    } else if ((user.subscriptionType === "Standard")) {
      date = date + 180;
    } else if ((user.subscriptionType === "Premium")) {
      date = date + 365;
    }
    return date;
  };

  // Jan 1 1970 UTC
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  console.log("returnDate", returnDate);
    console.log("currentDate", currentDate);
      console.log("subscriptionDate", subscriptionDate);
        console.log("subscriptionExpiration", subscriptionExpiration);

  const data = {
    ...user,
    isSubscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate 
      ? 0 
      : subscriptionExpiration - currentDate,
    fine : 
      returnDate < currentDate 
      ? subscriptionExpiration <= currentDate 
        ? 100 
        : 50 
      : 0,
  };
  return res.status(200).json({
    success: true,
    message: "subscription detail for the user is:",
    data,
  })
 });

module.exports = router;