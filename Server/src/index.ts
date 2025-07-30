import express from "express";
import jsonwebtoken from "jsonwebtoken";
import { UserModel } from "./db";

const app = express();
app.use(express.json())

app.post("api/v1/signup", async (req, res) => {

    const { username, password } = req.body;

    await UserModel.create({
        username, password
    })
    res.json({
        message: "User signed up "
    })
})

app.post("api/v1/signin", async (req, res) => {
    const { username, password } = req.body;

    await UserModel.find({
        username, password
    })
    res.json({
        message: "User signed up "
    })
})

app.post("api/v1/content", (req, res) => {

})

app.get("api/v1/content", (req, res) => {

})

app.delete("api/v1/content", (req, res) => {

})

app.post("api/v1/mindlink/share", (req, res) => {

})

app.get("api/v1/mindlink/:sharelink", (req, res) => {

})

app.listen(3000)

