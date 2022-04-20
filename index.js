//NODE MODULES
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import morgan from "morgan";
import passport from "passport";
import dotenv from "dotenv";
import mysql from 'mysql'
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

//ROUTER
import userRouter from "./routes/user.js";
import oauthRouter from "./routes/oauth.js";
dotenv.config();

const app = express();

//設定logger，將每個request寫到log.txt
//若要deploy到server，請將下四行註解掉
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

//設定express
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//設定跨域
app.use(cors());

//設定session
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//設定request body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//設定cors，測試時請註解掉
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://nccucourseguide.herokuapp.com"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

//ROUTES
app.use("/api/oauth", oauthRouter);
app.use("/api/user", userRouter);

//API:測試SERVER在線
app.get("/", (req, res) => {
  const result = {
    success: true,
    message: "hello from GDSC WALLET",
    data: {},
  };
  res.status(200).send(result);
});

const PORT = process.env.PORT || 80;

//連線到MYSQL
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PGPASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true
});
connection.connect(function(err){
    if(err){
        return err;
    }
    else{
        //若連上ＤＢ，則啟動server
        console.log("Successfully connect to mysql : root@localhost ");
        app.listen(PORT, () =>console.log(`Server Running on Port: http://localhost:${PORT}`))
    }
});


//若未設定DB，直接啟動server
//app.listen(PORT, () =>console.log(`Server Running on Port: http://localhost:${PORT}`))
