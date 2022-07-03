import User from "../db_interact/user.js";
import jwt from "jsonwebtoken";

const secret = 'GDSC_WALLET';


export const authenticate = async (id) => {
    return await User.user_exist(id)
        .then(results => {
            console.log('results :', results);
            if(results.length === 0) {
                return false;
            } else {
                return true;
            }
        }).catch(err => {
            return err;
        });
};

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
export const signUp = async (req, res, next) => {

    try{
        // 從 req.decodedData 取得 jwt decode 的資料，不進行二次解密
        const {channel,channel_id,email,username,user_id} = req.decodedData;
        const { nickname } = req.body;

        if(nickname===undefined||nickname===null||nickname==="") {
            res.status(400).json({success:false,message:"nickname is required.",data:{}});
        }
        //註冊使用者到資料庫
        await User.insert_user(user_id, channel, channel_id, email, username, nickname)
            .then(result => {
                next(result);
            })
            .catch(err => {
                next(err);
            })
    }
    catch(err) {
        next(err);
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
export const getUserProfile = async (req, res, next) => {

    // 從 req.decodedData 取得 jwt decode 的資料，不進行二次解密
    const user_id = req.decodedData?.user_id;

    const query = req.query

    const current_time = query.time_choosen ? query.time_choosen : new Date().toISOString().split('Z')[0].split('T').join(" ");

    var user_status;
    var selected_wallet;
    var response = {};
    //從資料庫取得使用者資料
    await User.get_user(user_id, current_time)
        .then(async results => {
            if(results.length > 0)
                user_status = true;
            else
                user_status = false;
            // 確認被選擇的wallet, 而被選擇的wallet必須只有一個
            for(let i = 0; i < results.length; ++i) {
                if(results[i].selected == 1) {
                    selected_wallet = results[i].wallet_id;
                    break;
                }
            }
            // 將資料轉成需要的JSON格式
            var Data = {
                success: user_status,
                message: "取得user資料成功",
                data: {
                    user_id: results[0].id,
                    username: results[0].username,
                    nickname: results[0].nickname,
                    selected_wallet_id: selected_wallet,
                    wallets:[]
                }
            };

            // 填寫wallets陣列和wallets陣列中的records陣列
            for(let i = 0; i < results.length;) {
                // construct a wallet object
                var wallet_obj = {
                    "wallet_id": results[i].wallet_id,
                    "wallet_name": results[i].wallet_name,
                    "wallet_total": results[i].wallet_total,
                    "wallet_description": results[i].wallet_description,
                    "selected": results[i].selected,
                    "record_num": results[i].record_num,
                    "records": [],
                    "tags": [],
                };
                // construct record and tag array
                var record_arr = [];
                var j = 0;
                if(results[i].selected == 1) {
                    for(j = 0; j < results[i].record_num; ++j) {
                        // 若已經沒有資料或已是不同wallet,則提早break
                        if(i + j >= results.length || results[i+j].wallet_id != results[i].wallet_id)
                            break;
                        var record_obj = {
                            record_id: results[i+j].record_id,
                            wallet_record_tag_id: results[i+j].wallet_record_tag_id,
                            record_ordinary: results[i+j].record_ordinary,
                            record_name: results[i+j].record_name,
                            record_description: results[i+j].record_description,  //
                            record_amount: results[i+j].record_amount,    //
                            record_type: results[i+j].record_type,    //
                            record_date: results[i+j].record_date,    //
                            record_created_time: results[i+j].record_created_time,
                            record_updated_time: results[i+j].record_updated_time,
                        }
                        record_arr.push(record_obj);
                    }
                    await User.get_wallet_tag(selected_wallet)
                        .then(results => {
                            var tag_arr = [];
                            for(var i = 0; i < results.length; ++i) {
                                var tag_obj = {
                                    tag_id: results[i].tag_id,
                                    tag_wallet_id: results[i].tag_wallet_id,
                                    tag_ordinary: results[i].tag_ordinary,
                                    tag_name: results[i].tag_name,
                                    tag_type: results[i].tag_type,
                                    tag_created_time: results[i].tag_created_time,
                                    tag_updated_time: results[i].tag_updated_time,
                                    tag_color: results[i].tag_color
                                }
                                tag_arr.push(tag_obj);
                            }
                            wallet_obj.tags = tag_arr;
                        })
                        .catch(err => {
                            var response = {
                                success: false,
                                message: "取得user資料失敗",
                                data: {}
                            }
                            console.log(response);
                            res.status(400).json(response);
                        })
                }
                if(j == 0) i++;
                else
                    i += j;
                // put record array into wallet object and put wallet object into response.data.wallets
                wallet_obj.records = record_arr;
                //console.log(wallet_obj);
                Data.data.wallets.push(wallet_obj);
            }
            response = Data;
            console.log(response);
            res.status(201).json(response);
        }).catch(err => {
            var response = {
                success: false,
                message: "取得user資料失敗",
                data: {}
            }
            console.log(response);
            res.status(400).json(response);
        });
};
