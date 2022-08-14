import axios from "axios";
import qs from "qs";
import dotenv from "dotenv"

dotenv.config();

export const getEinvoice = async (req, res, next) => {
    
    const { startDate, endDate, cardNo, cardEncrypt } = req.query;
    const version = 0.5;
    const cardType = "3J0002";
    const expTimeStamp = 2147483647;
    const onlyWinningInv = "N";
    const uuid = process.env.UUID;
    const appID = process.env.APP_ID;
    const url = "https://api.einvoice.nat.gov.tw/PB2CAPIVAN/invServ/InvServ";

    //先查詢載具發票表頭

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
            message: "取得載具發票明細資料成功"
            data: {
                headers: []
            }
        };
        // 將收到的result.data.details[i].invNum用以查詢發票明細
        var headers = result.data.details;

        for(let i = 0; i < headers.length; ++i) {
            // transform date format
            var year = (Number(headers[i].invDate.year)+1911).toString();
            var month = (Number(headers[i].invDate.month) < 10) ?
                '0'+headers[i].invDate.month :
                headers[i].invDate.month;
            var date = (Number(headers[i].invDate.date) < 10) ?
                '0'+headers[i].invDate.date :
                headers[i].invDate.date;
            var invDate = year+'/'+month+'/'+date;

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
                    invNum: headers[i].invNum,
                    timeStamp: Math.floor(Date.now()/1000)+100, // suggested to add timestamp from 10 to 180
                    uuid: uuid,
                    version: version
                }),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then(result => {
                console.log(result.data);
                response.data.headers.push(result.data);
            }).catch(err => { throw err; })
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
