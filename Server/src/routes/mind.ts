import express from "express";
import { userAuth } from "../middlewares/auth";
import { fetchSharedBrain, shareBrain } from "../controllers/mind";

const brainRouter = express.Router();

brainRouter.post("/share", userAuth, shareBrain);
brainRouter.get("/share/:hash", fetchSharedBrain);

export default brainRouter;
