import express = require("express");
import {Request, Response} from "express";

const app = express();
const port: number = +(process.env.PORT || 3000);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, world!");
});

app.listen(port, () => {
    console.log("Backend listening on port " + port);
});
