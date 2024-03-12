import bcrypt from "bcryptjs";
import User from "../Models/UserModel.js";
import {errorHandler} from '../Utils/errorHandler.js'

export const Homepage = (req, res) => {
  res.send("Homepage");
};

export const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  if (req.user.id !== userId)
    return next(errorHandler(401, "You can only update your own account !!"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser= async(req,res,next)=>{
  const userId = req.params.id;
  if (req.user.id !== userId)
    return next(errorHandler(401, "You can only delete your own account !!"));
  try {
    await User.findByIdAndDelete (userId)
    res.clearCookie('access_token')
    res.status(200).json('User Deleted Successfully')
  } catch (error) {
    next(error)
  }
}
