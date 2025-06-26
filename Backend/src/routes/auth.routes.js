import { Router } from "express";
import {
  resendVerificationMailValidator,
  userRegistrationValidator,
} from "../validators/user.validations";
import { validate } from "../middlewares/validator.middleware";
import {
  registerUser,
  resendEamilVerification,
  verifyEmail,
} from "../controllers/auth.controllers";

const router = Router();

router
  .route("/register")
  .post(userRegistrationValidator(), validate, registerUser); //factory pattern

router.route("/verify/:token").get(verifyEmail);
router
  .route("/resendEmail")
  .post(resendVerificationMailValidator(), validate, resendEamilVerification);

export default router;
