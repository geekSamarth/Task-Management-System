import { Router } from "express";
import { userRegistrationValidator } from "../validators/user.validations";
import { validate } from "../middlewares/validator.middleware";
import { registerUser } from "../controllers/auth.controllers";

const router = Router();

router
  .route("/register")
  .post(userRegistrationValidator(), validate, registerUser);  //factory pattern

export default router;
