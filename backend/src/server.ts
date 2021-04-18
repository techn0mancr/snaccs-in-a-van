/* Import required libraries and types */
import express from "express";
import { Router, Request, Response } from "express";

/* Connect to the database */
require("./models");

/* Set up server app */
const app = express();
const port: number = +(process.env.PORT || 48080);
app.use(express.json()); //allows app to Json request body
app.use(express.urlencoded({extended:true})); //allows app to read formdata type of request body

/* Register routes */
import routes from "./routes";

app.get("/", (req: Request, res:Response) => {
    res.status(200).json({
        "message": "Welcome to snaccoverflow"
    })
})

app.use("/api", routes);

/* Listen for incoming connections */
app.listen(port, () => {
    console.log(`API listening on port ${port}.`);
});
