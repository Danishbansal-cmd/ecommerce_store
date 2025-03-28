require("dotenv").config();
const { createTransporterForEmail } = require("../../emailVerification/email");
const { emailTemplate } = require("../../emailVerification/emailTemplate");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Token = require("../../models/Token");
const bcrypt = require("bcrypt");
const Employee = require("../../models/Employee");
const Roles = require("../../models/Roles");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({success: false, message: "[Register User] Data not provided",
          data: {},
        });
    }

    //check for existing user
    const checkUser = await User.findOne({ $or: [{ username }, { email }] });
    if (checkUser)
      return res.status(400).json({
        success: false,
        message:
          "[Register User] User already exists with the same email or username! Please try again",
        data: null,
      });

    //hash password
    const hashPassword = await bcrypt.hash(password, 12);

    //create new user
    const newUser = await new User({
      username,
      email,
      password: hashPassword,
      role: "frontend_user",
    }).save();

    //respond with success
    return res
      .status(201)
      .json({
        success: true,
        message: "[Register User] User added successfully",
        data: newUser,
      });
  } catch (error) {
    res.status(401)
      .json({
        success: false,
        message: "[Register User] Some error occured",
        data: null,
      });
  }
};

const createUserByAdmin = async (req, res) => {
  try {
    const { username, email, password, roleId } = req.body;
    if (!username || !email || !password || !roleId) {
      return res.status(400).json({
        success: false,
        message: "[Create User] Data not provided",
        data: null,
      });
    }

    //check for existing user
    const checkUser = await User.findOne({ $or: [{ username }, { email }] });
    if (checkUser)
      return res.status(400).json({
        success: false,
        message:
          "[Create User] User already exists with the same email or username! Please try again",
        data: null,
      });

    //get the specific role
    const getRole = await Roles.findOne({ _id: roleId });
    if (!getRole)
      return res.status(400).json({
        success: false,
        message: "[Create User] Role does not exists! Please try again",
        data: null,
      });

    //hash password
    const hashPassword = await bcrypt.hash(password, 12);

    //create new user
    const newUser = await new User({
      username,
      email,
      password: hashPassword,
      role: getRole?.role ?? "user",
    }).save();

    if (!newUser)
      res.status(201).json({
        success: true,
        message: "[Create User] User added successfully",
        data: newUser,
      });

    const { firstname, lastname, phonenumber, departmentId, status } = req.body;

    if (
      !firstname ||
      !lastname ||
      !phonenumber ||
      !roleId ||
      !departmentId ||
      !status
    )
      return res.status(400).json({
        success: false,
        message: "[Add Employee] Data not provided",
        data: {},
      });

    console.log(newUser, "newUser");
    //create new emp
    const newEmp = new Employee({
      firstname,
      lastname,
      email,
      phonenumber,
      roleId,
      departmentId,
      status,
      userId: newUser?._id,
    });

    console.log(newEmp, "newEmp");
    const saveEmp = await newEmp.save();

    //respond with success
    return res
      .status(201)
      .json({ message: "[Add Employee] Added successfuly", data: saveEmp });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "[Create User by admin] Some error occured",
      data: {},
    });
  }
};

const tokenVerification = async (req, res, next) => {
    try {
      let token;
      req.user = null;
  
      // Check for token in Authorization Header
      const authHeader = req.header("Authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1].trim(); // Extract Bearer token and trim spaces
      }
  
      // If token not found in header, check in cookies
      if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token; // Extract token from HTTP-only cookie
      }
  
      // 🛑 Debugging: Log Token Received
      console.log("[DEBUG] Token received:", token);
  
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "[Check Token] No token provided. Expected in 'Authorization' header or 'cookies.token'."
        });
        }
  
      // Verify the token
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      
      // 🛑 Debugging: Log Verified User
      console.log("[DEBUG] Verified User:", verified);
  
      // Check if the user still exists in the database
      const userExists = await User.findById(verified.id);
      if (!userExists) {
        return res.status(403).json({ success: false, message: "[Check Token] User does not exist" });
      }
  
      // Attach verified user info to request
      req.user = verified;
      next();
    } catch (error) {
      console.error("[ERROR] Token Verification Failed:", error.message);
      return res.status(403).json({ success: false, message: "[Check Token] Invalid or expired token", error: error.message });
    }
};  

const loginUser = async (req, res) => {
  console.log("Received Body:", req.body);
  try {
    const { usernameOrEmail, password } = req.body;

    // Validate input
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ // Step 2: Send JSON response
        success: false,
        message: "[Login User] Data not provided",
        data: null,
      });
    }

    // Check if user exists
    const checkUser = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "[Login User] User does not exist",
        data: null,
      });
    }

    // Check if password is correct
    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "[Login User] Incorrect password! Please try again",
        data: null,
      });
    }

    // Create token
    const tokenData = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "300m" }
    );

    // Set cookie and return response
    res.cookie("token", tokenData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      maxAge: 60 * 60 * 1000, // 1 hour expiry
    });

    return res.status(200).json({
      success: true,
      message: "[Login User] Logged in successfully",
      data: {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
        token: tokenData,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "[Login User] Internal Server Error",
      data: null,
    });
  }
};


const logoutUser = async (req, res) => {
  try {
     // ✅ Clear the authentication cookie
     res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  // Ensure it's secure (use false for local testing)
    });
    
    return res.status(200).json({
      success: true,
      data: null,
      message: "[Logout User] Logged Out Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "[Logout User] Some Error Occured",
      data: null,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    if (!allUsers)
      return res.status(403).json({
        success: false,
        data: null,
        message: "[Get All Users] Not Successfull",
      });

    res.status(201).json({
      success: true,
      data: allUsers,
      message: "[Get All Users] Retrieved Users Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "[Get All Users] Some Error Occured",
      data: null,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId, "userId");
    const deleteUser = await User.findOneAndDelete({ _id: userId });
    if (!deleteUser)
      return res.status(400).json({
        success: false,
        data: null,
        message: "[Delete User] Does not Exist",
      });

    res.status(200).json({
      success: true,
      data: deleteUser,
      message: "[Delete User] User Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "[Delete User] Some Error Occured",
      data: null,
    });
  }
};

const sendEmailVerificationLink = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("checkpoint 1");
    console.log(email, "email from verification");

    // send the verification link to the entered email
    const token = jwt.sign({ email }, process.env.EMAIL_SECRET, {
      expiresIn: "300m",
    });
    const verificationLink = `http://localhost:5173/verify-email/?token=${token}`;

    console.log("checkpoint 2");

    //emailOptions - who sends what to whom
    const sendEmail = async (emailOptions) => {
      let emailTransporter = await createTransporterForEmail();
      const response = await emailTransporter.sendMail(emailOptions);
      return response;
    };

    console.log("checkpoint 3");
    console.log(verificationLink, "verificationLink");

    sendEmail({
      subject: "Test",
      html: emailTemplate(`${verificationLink}`),
      // text: `${verificationLink}`,
      to: email,
      from: process.env.EMAIL,
    }).then((data) => {
      console.log(data, "data");
      if (Object.keys(data).length > 0) {
        return res
        .status(200)
          .json({
            data: data,
            message:
              "[Email Verification] Verification Email Sent Successfully",
            success: true,
          });
      } else {
        return res
        .status(400)
          .json({
            data: null,
            message:
              "[Email Verification] Verification Email Cannot be Sent! Try again Later",
            success: false,
          });
      }
    });
  } catch (error) {
    res
      .status(200)
      .json({
        data: error,
        message: "[Email Verification] Some Error occured",
        success: false,
      });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const token = req.query.token;

    // verify the token that is received from the body, when the user click on the verification link
    const verifyTokenData = jwt.verify(token, process.env.EMAIL_SECRET);

    // if it fails to verify the token and it is empty
    if (!verifyTokenData) {
      return res
      .status(400)
        .json({
          success: false,
          message: "[Verify Email] Invalid token",
          data: null,
        });

      // if the token is not empty and data is being sent into the token
    } else {
      const { email } = verifyTokenData;
      console.log("checkpoint 2");

      // Check if already verified
      const findUserVerified = await User.findOne({ email }).select("verified");

      // chech if user is not in database
      if (!findUserVerified) {
        return res
        .status(400)
          .json({
            success: false,
            message: "[Verify Email] User is not in Database",
            data: null,
          });
      }

      // if user is already verified
      if (findUserVerified["verified"] === "verified") {
        return res
          .status(200)
          .json({
            success: true,
            message: "[Verify Email] Email is Already Verified",
            data: findUserVerified,
          });
      }

      // find user associated with this email and update
      const findUserAndUpdate = await User.findOneAndUpdate(
        { email },
        { verified: "verified" },
        { new: true, runValidators: true }
      );

      return res
      .status(200)
        .json({
          success: true,
          message: "[Verify Email] Email Verified Successfully",
          data: findUserAndUpdate,
        });
    }
  } catch (error) {
    return res
      .status(400)
      .json({
        success: false,
        message: "[Verify Email] Token Invalid or Some Error Occured",
        data: null,
      });
  }
};

const sendPasswordResetEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // find user associated with this email
    const findUser = await User.findOne({ email });

    // if user not found
    if (!findUser) {
      return res.status(400).json({
        success: false,
        message:
          "[Send Password Reset Email] There is no user associated with this email",
        data: null,
      });
    }

    // if user found, create token
    const token = await new Token({
      userId: findUser._id,
      token: jwt.sign({ email }, process.env.TOKEN_SECRET),
    }).save();

    const resetPasswordLink = `${process.env.BASEURL}/reset-password/${findUser?._id}/${token?.token}`;
    console.log(resetPasswordLink, "resetPasswordLink");

    //emailOptions - who sends what to whom
    const sendEmail = async (emailOptions) => {
      let emailTransporter = await createTransporterForEmail();
      const response = await emailTransporter.sendMail(emailOptions);
      return response;
    };

    sendEmail({
      subject: "Password Reset",
      html: emailTemplate(`${resetPasswordLink}`),
      to: findUser?.email,
      from: process.env.EMAIL,
    })
      .then((data) => {
        console.log(data, "data");
        if (Object.keys(data).length > 0) {
          return res
          .status(200)
            .json({
              data: data,
              message: "[Password Reset Email] Sent Successfully",
              success: true,
            });
        } else {
          return res
          .status(400)
            .json({
              data: null,
              message:
                "[Password Reset Email] Some Error Occured! Try again Later",
              success: false,
            });
        }
      })
      .catch((error) => {
        return res
          .status(400)
          .json({
            data: error,
            message:
              "[Password Reset Email] Some Error Occured! Try again Later",
            success: false,
          });
      });
  } catch (error) {
    return res
      .status(400)
      .json({
        data: null,
        message: "[Password Reset Email] Some Error Occured! Try again Later",
        success: false,
      });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { userId, token } = req.params;

    // find user
    const findUser = await User.findById(userId);
    if (!findUser)
      return res
      .status(400)
        .json({
          message: "[Reset Password] invalid link or expired",
          data: null,
          success: false,
        });

    console.log(findUser, "findUser");
    // find the associated token
    const findToken = await Token.findOne({
      userId: findUser._id,
      token: token,
    });
    console.log(findToken, "findToken");
    // if token not found
    if (!findToken) {
      return res
        .status(400)
        .json({
          message: "[Reset Password] invalid link or expired",
          data: null,
          success: false,
        });
    }

    //hash the password before saving it
    const hashPassword = await bcrypt.hash(password, 12);

    // update the password and save it
    findUser.password = hashPassword;
    await findUser.save();

    // delete the token
    await findToken.deleteOne();

    // returning success
    return res
      .status(200)
      .json({
        message: "[Reset Password] Password Reset Successfully",
        data: null,
        success: true,
      });
  } catch (error) {
    console.log(error, "backend error");
    return res
    .status(500)
      .json({
        data: error,
        message: "[Reset Password] Some Error Occured! Try again Later",
        success: false,
      });
  }
};

const isAdmin = async (req, res, next) => {
  // Check if the user is an admin
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "[Auth] Unauthorized access. Only admins can perform this action.",
      data: null,
    });
  }
  next();
}

module.exports = {
  loginUser,
  tokenVerification,
  verifyEmail,
  resetPassword,
  sendPasswordResetEmail,
  registerUser,
  createUserByAdmin,
  logoutUser,
  getAllUsers,
  deleteUser,
  sendEmailVerificationLink,
  isAdmin
};
