import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use(cartRoutes);
app.use(orderRoutes);

app.use("/", (req: Request, res: Response, _ : NextFunction) => {
    return res.status(200).json({ message: "I am healthy!" });
});

export default app;