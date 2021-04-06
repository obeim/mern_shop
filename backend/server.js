import dotenv from "dotenv";
import express, { urlencoded } from "express";
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoutes.js";
import usersRoute from "./routes/usersRoute.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
//////////
dotenv.config();
connectDB();
///////
const app = express();
///// middware
app.use(express.json());
app.use(urlencoded({ extended: false }));
/////////

app.use("/api/products", productRoute);
app.use("/api/users", usersRoute);

app.use(errorHandler);
app.use(notFound);

app.get("/", (req, res) => {
  res.send("api is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`app is running in port ${PORT}`));
