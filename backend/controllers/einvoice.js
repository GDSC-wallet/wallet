import axios from "axios";
import qs from "qs";
import dotenv from "dotenv"

dotenv.config();

export const getEinvoice = async (req, res, next) => {
    
    const { startDate, endDate, cardNo, cardEncrypt } = req.query;
    const version = 0.5;
    const cardType = "3J0002";
    const expTimeStamp = 1000;
    const action = "carrierInvChk";
    const timeStamp = Math.floor(Date.now()/1000)+100; // suggested to add timestamp from 10 to 180
    const onlyWinningInv = "N";
    const uuid = process.env.UUID;
    const appID = process.env.APP_ID;
    const url = "https://api.einvoice.nat.gov.tw/PB2CAPIVAN/invServ/InvServ";

    //先查詢載具發票表頭

    await axios({
        method: 'post',
        url: url,
        data: qs.stringify({
            action: action,
            appID: appID,
            cardEncrypt: cardEncrypt,
            cardNo: cardNo,
            cardType: cardType,
            endDate: endDate,
            expTimeStamp: expTimeStamp,
            onlyWinningInv: onlyWinningInv,
            startDate: startDate,
            timeStamp: timeStamp,
            uuid: uuid,
            version: version
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }).then(response => {
        console.log(response.data);
        // 將收到的response.data.details[i].invNum用以查詢發票明細
        res.status(201).json(response.data);
    }).catch(err => {
        console.error(err);
        res.status(400).json(err);
    })
}
