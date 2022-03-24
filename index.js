import express from "express";
import mongoose from "mongoose";
import { pool,client,sequelize } from './postgres.js'

import cors from "cors";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import GoogleStrategy from "passport-google-oauth20";

import userRouter from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import productRoutes from "./routes/product.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// Add headers
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://nccucourseguide.herokuapp.com"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use("/course", courseRoutes);
app.use("/user", userRouter);
app.use("/product", productRoutes);

dotenv.config();

const CONNECTION_URL =
  "mongodb+srv://william:reverse321@cluster0.mhbnf.mongodb.net/nccu-course-guide?retryWrites=true&w=majority";

const PORT = process.env.PORT || 80;

try {
  await sequelize.authenticate();
  console.log('sequelize postgres Connection has been established successfully.');
  
  // clients will also use environment variables
  // for connection information
  await client.connect()
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
