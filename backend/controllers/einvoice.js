import axios from "axios";
import qs from "qs";
import dotenv from "dotenv"

dotenv.config();

const decode = (rowData) => {
    let res = [];
    let offset = rowData.length;
    for (let i = 0; i < offset; i++) {
      res.push(String.fromCharCode((rowData.charCodeAt(i) - offset) % 65535))
    }
    return res.join("");
  };

export const getHeaders = async (req, res, next) => {

    // 從 req.session?.passport?.user 取得 jwt decode 的資料，不進行二次解密
    const user_id = req.session?.passport?.user?.user_id;

    const { startDate, endDate, cardNo, cardEncrypt } = req.query;
    const version = 0.5;
    const cardType = "3J0002";
    const expTimeStamp = 2147483647;
    const onlyWinningInv = "N";
    const uuid = user_id;
    const appID = process.env.APP_ID;
    const url = "https://api.einvoice.nat.gov.tw/PB2CAPIVAN/invServ/InvServ";
    //查詢載具發票表頭

    await axios({
        method: 'post',
        url: url,
        data: qs.stringify({
            action: "carrierInvChk",
            appID: appID,
            cardEncrypt: decode(cardEncrypt),
            cardNo: cardNo,
            cardType: cardType,
            endDate: endDate,
            expTimeStamp: expTimeStamp,
            onlyWinningInv: onlyWinningInv,
            startDate: startDate,
            timeStamp: Math.floor(Date.now()/1000)+100, // suggested to add timestamp from 10 to 180
            uuid: uuid,
            version: version
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }).then( async result => {
        var response = {};
        var status;
        if(result.data.code !== 200) {
            response = {
                success: false,
                message: "取得載具發票表頭資料失敗 error: " + result.data.msg,
                data: {}
            }
            status = 400;
        } else {
            response = {
                success: true,
                message: "取得載具發票表頭資料成功",
                data: {
                    headers: result.data
                }
            }
            status = 201;
        }
        console.log(response);
        res.status(status).json(response);
    }).catch(err => {
        var response = {
            success: false,
            message: "取得載具發票表頭失敗 error: " + err.message,
            data: {}
        };
        console.error(response);
        res.status(400).json(response);
    })
}


export const getDetails = async (req, res, next) => {

    // 從 req.session?.passport?.user 取得 jwt decode 的資料，不進行二次解密
    const user_id = req.session?.passport?.user?.user_id;

    const { cardNo, cardEncrypt, invNum, year, month, date } = req.query;
    const version = 0.5;
    const cardType = "3J0002";
    const expTimeStamp = 2147483647;
    const uuid = user_id;
    const appID = process.env.APP_ID;
    const url = "https://api.einvoice.nat.gov.tw/PB2CAPIVAN/invServ/InvServ";

    var queryYear = (Number(year)+1911).toString();
    var queryMonth = (Number(month) < 10) ? '0' + month : month;
    var queryDate = (Number(date) < 10) ? '0' + date : date;
    var invDate = queryYear+'/'+queryMonth+'/'+queryDate;

    await axios({
        method: 'post',
        url: url,
        data: qs.stringify({
            action: "carrierInvDetail",
            appID: appID,
            cardEncrypt: decode(cardEncrypt),
            cardNo: cardNo,
            cardType: cardType,
            expTimeStamp: expTimeStamp,
            invDate: invDate,
            invNum: invNum,
            timeStamp: Math.floor(Date.now()/1000)+100, // suggested to add timestamp from 10 to 180
            uuid: uuid,
            version: version
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }).then(result => {
        var response = {};
        var status;
        if(result.data.code !== 200) {
            response = {
                success: false,
                message: "取得載具發票明細資料失敗 error: " + result.data.msg,
                data: {}
            }
            status = 400;
        } else {
            response = {
                success: true,
                message: "取得載具發票明細資料成功",
                data: result.data
            }
            status = 201;
        }
        console.log(response);
        res.status(status).json(response);
    }).catch(err => {
        var response = {
            success: false,
            message: "取得載具發票明細資料失敗 error: " + err.message,
            data: {}
        }
        console.error(response);
        res.status(400).json(response);
    })
}
