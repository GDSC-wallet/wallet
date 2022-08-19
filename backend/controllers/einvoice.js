import axios from "axios";
import https from "https";
import qs from "qs";
import dotenv from "dotenv"

dotenv.config();

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
            cardEncrypt: cardEncrypt,
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
        var response = {
            success: true,
            message: "取得載具發票表頭資料成功",
            data: {
                headers: result.data
            }
        };
        console.log(response);
        res.status(201).json(response);
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
            cardEncrypt: cardEncrypt,
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
        var response = {
            success: true,
            message: "取得載具發票明細資料成功",
            data: result.data
        }
        console.log(response);
        res.status(201).json(response);
    }).catch(err => {
        var response = {
            success: false,
            message: "取得載具發票明細資料失敗error: " + err.message,
            data: {}
        }
        console.error(response);
        res.status(400).json(response);
    })
}
