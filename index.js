//NODE MODULES
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import morgan from "morgan";
import passport from "passport";
import dotenv from "dotenv";
import helmet from "helmet";
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

//ROUTER
import oauthRouter from "./routes/oauth.js";
import userRouter from "./routes/user.js";
import walletRouter from "./routes/wallet.js";
import recordRouter from "./routes/record.js";
import tagRouter from "./routes/tag.js";
dotenv.config();

const app = express();

//資訊安全專區，因為仍在開發中，故先註解掉
//出處：https://expressjs.com/en/advanced/best-practice-security.html
// app.use(helmet())
// app.set('trust proxy', 1) // trust first proxy
// app.use(session({
//   secret: 's3Cur3',
//   name: 'sessionId'
// }))

//設定logger，將每個request寫到access.log裡
//若要deploy到server，請將下四行註解掉
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

//設定express
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//設定localhost port
const PORT = process.env.PORT || 80;
app.listen(PORT, () =>console.log(`Server Running on Port: http://localhost:${PORT}`))

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
app.use("/oauth", oauthRouter);
app.use("/api/user", userRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/record", recordRouter);
app.use("/api/tag", tagRouter);

//API:測試SERVER在線
app.get("/api", (req, res) => {
  const result = {
    success: true,
    message: "hello from GDSC WALLET",
    data: {},
  };
  res.status(200).send(result);
});

// Host dist
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

//const PORT = process.env.PORT || 80;


//***********04/21測試用********** */
/*
//若DB已設定，請手動將DB_IS_SET設成true
const DB_IS_SET = false;

if(DB_IS_SET){

    //連線到MYSQL
    const connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        multipleStatements: true
    });
    connection.connect(function(err){
        if(err){
            return err;
        }
        else{
            //若測試連上ＤＢ成功，則啟動server
            console.log("Successfully connect to mysql : root@localhost ");
            app.listen(PORT, () =>console.log(`Server Running on Port: http://localhost:${PORT}`))
            connection.end();
        }
    });
}
else{
*/
    //若未設定DB，直接啟動server
    //app.listen(PORT, () =>console.log(`Server Running on Port: http://localhost:${PORT}`))
//}
