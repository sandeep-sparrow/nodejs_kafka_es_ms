import express from "express";
import catalogRouter from "./api/catalog.routes";

const app = express();
app.use(express.json());

app.use("/", catalogRouter);

app.get("/", (req, res, next) => {
    return res.json({ msg: "Hello There!"});
});

export default app;