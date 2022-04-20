import db_caller from "../db_interact/db_caller.js";

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
  
  //從request header取得jwt
  const token = req.headers.authorization.split(" ")[1];
  
  //解碼jwt取得user_id
  const decodedData = jwt.verify(token, secret);
  const user_id = decodedData?.id;
  const { nickname } = req.body;

  //註冊使用者到資料庫
  const db_result = db_caller.sign_up({user_id,nickname});

  let repsonse;

  if(db_result.success){
    response = {
      "success": true,
      "message": "註冊使用者成功",
      "data": db_result.data
    }
  }
  else{
    response = {
      "success": false,
      "message": "註冊使用者失敗",
      "data": undefined
    }
  }

  //回傳結果
  res.status(201).json(response);
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
  const user_id = decodedData?.id;

  //從資料庫取得使用者資料
  const db_result = db_caller.call_user_data(user_id);

  let response;

  if(db_result.success){
    response = {
      "success": true,
      "message": "取得使用者資料成功",
      "data": db_result.data
    }
  }
  else{
    response = {
      "success": false,
      "message": "取得使用者資料失敗",
      "data": undefined
    }
  }

  //回傳結果
  res.status(200).json(response);
};