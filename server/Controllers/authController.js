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
    const token = Jwt.sign({ id: userExist._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = userExist._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
