import User from "../models/user.models.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/api-response.js";
import {
  sendMail,
  emailVerificationMailGenContent,
  resetPasswordMailGenContent,
} from "../utils/mail.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, email, password } = req.body;
  // check if the user is already exists or not
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "Email already registered!");
    }
    // create a new user in the database

    const user = await User.create({
      username,
      fullname,
      email,
      password,
    });
    if (!user) {
      throw new ApiError(500, "Oops! registration failed from our side");
    }
    //importing the generated token from the user model

    const { hashedToken, unHashedToken, tokenExpiry } =
      User.generateVerificationToken();

    user.verificationToken = hashedToken;
    user.verificationTokenExpiry = tokenExpiry;

    await user.save();

    // creating a verification url to send to the user through email
    const verificationUrl = `${process.env.BASE_URL}:${process.env.PORT}/api/v1/verify-email/${unHashedToken}`;

    // sending the mail to the user for verifying their email




    console.log(user);
  } catch (error) {
    throw new ApiError(500, "User registraion failed!");
  }
});

export const verifyEmail = asyncHandler(async (req, res) => {});

export const resendEamilVerification = asyncHandler(async (req, res) => {});

export const loginUser = asyncHandler(async (req, res) => {});

export const refreshAccessToken = asyncHandler(async (req, res) => {});

export const forgotPassword = asyncHandler(async (req, res) => {});

export const resetPassword = asyncHandler(async (req, res) => {});

export const getUserProfile = asyncHandler(async (req, res) => {});

export const changeCurrentPassword = asyncHandler(async (req, res) => {});

export const logout = asyncHandler(async (req, res) => {});

export const uploadAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.files?.avatar[0]?.path
  if(!avatarLocalPath){
    throw new ApiError(400,'Avatar file is required')
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath)
});

export const updateAvatar = asyncHandler(async (req, res) => {});
