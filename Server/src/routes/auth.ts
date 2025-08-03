import express, { Request, Response } from "express";
import validateInput from "../middlewares/validate";
import { logOutUser, signInUser, signUpUser } from "../controllers/auth";

const authRouter = express.Router();

authRouter.post("/signup", validateInput, signUpUser);

authRouter.post("/signin", signInUser);

authRouter.post("/logout", logOutUser);

export default authRouter;
