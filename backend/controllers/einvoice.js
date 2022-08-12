import axios from "axios"
import dotenv from "dotenv"

dotenv.config();

export const getEinvoice = async (req, res, next) => {
    
    const { startDate, endDate, cardNo, cardEncrypt } = req.query;
    const version = 0.5;
    const cardType = "3J0002";
    const expTimeStamp = 2000;
    const action = "carrierInvChk";
    const timeStamp = new Date().getTime() + 100;   // suggested to add timestamp from 10 to 180
    const onlyWinningInv = "N";
    const uuid = 109703041;
    const appID = process.env.APP_ID;


    //先查詢載具發票表頭
    await axios.post({
        method: "post",
        baseURL: "https://api.einvoice.nat.gov.tw",
        url: "/PB2CAPIVAN/invServ/InvServ",
        params: {
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
        },
        "Content-Type": "application/x-www-form-urlencoded"
    }).then(response => {
        //若成功,查詢每一發票的明細
    }).catch(err => {

    })
}
