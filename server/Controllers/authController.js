import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../Utils/errorHandler.js";
import Jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User Created Successfully");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) return next(errorHandler(404, "User Not Found!"));
    const validPassword = bcrypt.compareSync(password, userExist.password);
    if (!validPassword) return next(errorHandler(401, "Invalid Password"));
    const token = Jwt.sign({ id: userExist._id }, process.env.JWT_SECRET,{ expiresIn: "1d" });
    const { password: pass, ...rest } = userExist._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET,{ expiresIn: "1d" });
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const name =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-3);
      const generatePassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatePassword, 10);
      const newUser = new User({
        username: name,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = Jwt.sign({ id: newUser._id }, process.env.JWT_SECRET,{ expiresIn: "1d" });
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res.clearCookie('access_token')
    res.status(200).json('User Logout Successfull')
  } catch (error) {
    next(error)
  }
};
