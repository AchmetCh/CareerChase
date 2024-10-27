const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const PRIVATE_KEYS = process.env.PRIVATE_KEY;

//Register new user
exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, PRIVATE_KEYS, {
      expiresIn: "1h",
    });
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    });
    res.json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

//Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid email or" });
    const token = jwt.sign({ id: user._id }, PRIVATE_KEYS, { expiresIn: "1h" });
    res
    .cookie("access_token", token, {httpOnly: true, maxAge: 3600000}) // 1 hour
    .status(200)
    res.json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error });
  }
};
