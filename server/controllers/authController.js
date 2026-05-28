import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

// ======================================
// REGISTER USER
// ======================================
export const registerUser = async (
  req,
  res
) => {

  try {

    const {
      username,
      email,
      password
    } = req.body;

    // Check Existing User
    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return res.status(400).json({

        success: false,

        message:
          "User already exists",

      });

    }

    // Hash Password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({

      username,

      email,

      password:
        hashedPassword,

    });

    // Generate JWT Token
    const token = jwt.sign(

      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    // Response
    res.status(201).json({

      success: true,

      message:
        "Registration successful",

      token,

      user: {

        id: user._id,

        username:
          user.username,

        email:
          user.email,

      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        "Server Error",

    });

  }

};

// ======================================
// LOGIN USER
// ======================================
export const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body;

    // Find User
    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid email or password",

      });

    }

    // Compare Password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid email or password",

      });

    }

    // Generate JWT Token
    const token = jwt.sign(

      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );

    // Response
    res.status(200).json({

      success: true,

      message:
        "Login successful",

      token,

      user: {

        id: user._id,

        username:
          user.username,

        email:
          user.email,

      },

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        "Server Error",

    });

  }

};