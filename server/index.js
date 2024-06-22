const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const auth = require("./middleware/auth");

const app = express();
const mongourl = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());

console.log("Connecting to MongoDB...");

mongoose
  .connect(mongourl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const userSchema = new mongoose.Schema({
  firstname: { type: "string", unique: true },
  lastname: { type: "string", unique: true },
  username: { type: "string", unique: true },
  email: { type: "string", unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/api/signup", async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });
    
    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    if (!user) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid name or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/users", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/user/me", auth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/backup-users", async (req, res) => {
  try {
    const users = await User.find();
    const usersFolder = path.join(__dirname, "users");

    if (!fs.existsSync(usersFolder)) {
      fs.mkdirSync(usersFolder);
    }

    const backupFilePath = path.join(usersFolder, "users_backup.json");
    fs.writeFileSync(backupFilePath, JSON.stringify(users, null, 2));

    res
      .status(200)
      .json({ message: "Users backed up successfully", path: backupFilePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/update", auth, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const updatedData = {};

    if (username) updatedData.username = username;
    if (email) updatedData.email = email;
    if (password) updatedData.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      updatedData,
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/delete", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.userId);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
