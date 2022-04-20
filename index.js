import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";

import userRouter from "./routes/user.js";
import oauthRouter from "./routes/oauth.js";

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

app.use("/api/oauth", oauthRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  const result = {
    success: true,
    message: "",
    data: {},
  };
  res.status(200).send(result);
});

dotenv.config();

const PORT = process.env.PORT || 80;

app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);


// // login 成功回傳資料
// app.get('/api/profile' , async (req, res) => {

//     // Parse request

//     // 要求使用者資料函式呼叫
//     await db_caller.authenticate('user_7552f100-eba2-44e1-bc7f-7a1690fd4913')
//     .then(stt => {
//         console.log("User status: " + stt);
//     })
//     .catch(err => {
//         var errmsg = {
//             "success": false,
//             "message": "Authenticate error.",
//             "data": {}
//         };
//         res.send(errmsg);
//     })
//     await db_caller.call_user_data('user_7552f100-eba2-44e1-bc7f-7a1690fd4913')
//     .then(response => {
//         res.send(response);
//     })
//     .catch(err => {
//         var errmsg = {
//             "success": false,
//             "message": "Getting user data error.",
//             "data": {}
//         };
//         res.send(errmsg);
//     })
// });

// app.get('/api/wallet' , async (req, res) => {

//     // Parse request

//     await db_caller.call_wallet('wallet_dacbbdb7-4e2b-47ed-ad42-da878ab81890')
//     .then(response => {
//         res.send(response);
//     })
//     .catch(err => {
//         var errmsg = {
//             "success": false,
//             "message": "Getting wallet data error.",
//             "data": {}
//         };
//         res.send(errmsg);
//     })
// });
