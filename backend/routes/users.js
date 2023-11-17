// const router =  require("express").Router();
// const User = require("../models/User");
// const bcrypt = require("bcrypt");

// //register
// router.post("/register",async (req,res)=>{
//     try{
//         //generate new password
//         const salt= await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.password,salt);

//         //create new user
//         const newUser = new User({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password,
//         });

//         //save user and send response
//         const user = await newUser.save();
//         res.status(200).json(user._id);
//     }catch(err){
//         res.status(500).json(err);
//     }
// });

// //login
// router.post("/login",async (req,res)=>{
//     try{
//         //find user
//         const user = await User.findOne({ username: req.body.username });
//         console.log(req.body.username);
//         if(!user){
//             return res.status(400).json("Wrong username or password!");
//         }

//         //validate user
//         const validPassword = await bcrypt.compare(
//             req.body.password,
//             user.password
//             );

//         if(validPassword){
//             return res.status(400).json("Wrong username or password!");
//         }

//         //send res
//         res.status(200).json({_id: user._id,username: user.username})
//     }catch(err){
//         res.status(500).json(err)
//     }
// });

// module.exports = router


const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Create a JWT token for the user
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token, user: { _id: user._id, username: user.username } });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    console.log("User from the database:", user);

    if (!user) {
      console.log("User not found");
      return res.status(400).json("Wrong username or password!");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    console.log("Valid Password:", validPassword);

    if (!validPassword) {
      console.log("Invalid Password");
      return res.status(400).json("Wrong username or password!");
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    console.log("Login successful");
    res.status(200).json({ token, user: { _id: user._id, username: user.username } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json(err);
  }
});

module.exports = router;

