import express from "express";
import { userAuth } from "../middlewares/auth";
import {
    createContent,
    deleteContent,
    getContentBulk,
    getContentById,
    updateContent,
} from "../controllers/content";

const contentRouter = express.Router();

contentRouter.post("/", userAuth, createContent);

contentRouter.get("/", userAuth, getContentBulk);

contentRouter.get("/:id", userAuth, getContentById);

contentRouter.put("/:id", userAuth, updateContent);

contentRouter.delete("/:id", userAuth, deleteContent);



export default contentRouter;
