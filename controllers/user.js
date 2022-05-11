import db_caller from "../db_interact/db_caller.js";
import jwt from "jsonwebtoken";

const secret = 'GDSC_WALLET';

//****************************註冊使用者*****************************
// URL: "/api/signup"
// Method: POST
// Header: Authorization: Bearer {jwt}
// Body:
// {
//     "nick_name": "my_name"
// }
// Param: None
// Success Response:
// {
//     "success": true,
//     "message": "",
//     "data": {}
// }
// Error Response:
// {
//     "success": false,
//     "message": "Some error occurs.",
//     "data": {}
// }
export const signUp = async (req, res) => {

    try{
        //從request header取得jwt
        const token = req.headers.authorization;

        //解碼jwt取得user_id
        const decodedData = jwt.verify(token, secret);
        const {email,username,user_id} = decodedData;
        const { nickname } = req.body;

        if(nickname===undefined||nickname===null||nickname==="") {
            res.status(400).json({success:false,message:"nickname is required.",data:{}});
        }

        //註冊使用者到資料庫
        await db_caller.sign_up(user_id, channel, channel_id, email, username, nickname)
            .then(result => {
                var response = {
                    "success": true,
                    "message": "註冊使用者成功",
                    "data": result
                }
                res.status(201).json(response);
            })
            .catch(err => {
                var response = {
                    "success": false,
                    "message": "註冊使用者失敗",
                    "data": undefined
                }
                res.status(201).json(response);
            })
    }
    catch(err) {
        throw err;
    }
};

//****************************取得使用者資料*****************************
// URL: "/api/profile"
// Method: GET
// Header: Authorization: Bearer {jwt}
// Body: None
// Param: None
// Success Response:
// {
//   "success": true,
//   "message": "",
//   "data": {
//       "user_id": "user_",
//       "user_name": "uese",
//       "user_nick_name": "UESR",
//       "selected_wallet_id": "wallet_2c36aaad-2d40-48cb-9e36-9d3a841ffb37",
//       "wallets" :[
//           {
//               "wallet_id": "wallet_2c36aaad-2d40-48cb-9e36-9d3a841ffb37",
//               "wallet_name": "my-wallet",
//               "selected": true,
//               "records": [
//                   {
//                       "record_id":"record_0e0d10d0-531b-4f0d-abc2-f157b9f27dfd",
//                       "wallet_record_tag_id":"tag_80d4a691-14bd-494c-98e1-8187a669e0d2",
//                       "record_ordinary": "",
//                       "record_name": "Some name",
//                       "record_description": "Some description",
//                       "record_amount": "100",
//                       "record_type": "income",
//                       "record_date": "1648912357",
//                       "record_created_time": "1648912357",
//                       "record_updated_time": "1648912357",
//                   },
//               ]
//           },
//       ]
//   }
// }
// Error Response:
// {
//     "success": false,
//     "message": "Some error occurs.",
//     "data": {}
// }
export const getUserProfile = async (req, res) => {
    //從request header取得jwt
    const token = req.headers.authorization.split(" ")[1];

    //解碼jwt取得user_id
    const decodedData = jwt.verify(token, secret);
    const user_id = decodedData?.user_id;

    //從資料庫取得使用者資料
    await db_caller.call_user_data(user_id)
        .then(response => {
            res.status(200).json(response);
        })
        .catch(result => {
            var response = {
                "success": false,
                "message": "取得使用者資料失敗",
                "data":{}
            }
            res.status(200).json(response);
        })
};
