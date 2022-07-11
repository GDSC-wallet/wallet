import Debtor from "../db_interact/debtor.js";

// 基本上不會用到
export const get_record_debtors = async (req, res, next) => {
    const { record_id } = req.query;

    await Debtor.get_record_debtors(record_id)
        .then(results => {
            var response = {
        
            };
            // data process
            next(response);
        })
        .catch(err => {
            next(err);
        })
}


export const get_all_debtors = async (req, res, next) => {

    // 從 req.session?.passport?.user 取得 jwt decode 的資料，不進行二次解密
    const user_id = req.session?.passport?.user?.user_id;

    await Debtor.get_all_debtors(user_id)
        .then(results => {
            var response = {

            };
            // data process
            next(response);
        })
        .catch(err => {
            next(err);
        })
}


export const insert_debtor = async (req, res, next) => {

    const { debtor_name, debtor_amount } = req.body;

    // 從 req.session?.passport?.user 取得 jwt decode 的資料，不進行二次解密
    const debtor_user_id = req.session?.passport?.user?.user_id;
    await Debtor.insert_debtor(debtor_user_id, debtor_name, debtor_amount)
        .then(result => {
            next(result);
        })
        .catch(err => {
            next(err);
        })
}


export const insert_debtor_record = async (req, res, next) => {
    
    const { record_id, debtor_id } = req.body;

    await Debtor.insert_debtor_record(record_id, debtor_id)
        .then(result => {
            next(result);
        })
        .catch(err => {
            next(err);
        })
}


export const delete_debtor_record = async (req, res, next) => {

    const { record_id, debtor_id } = req.body;

    await Debtor.delete_debtor_record(record_id, debtor_id)
        .then(result => {
            next(result);
        })
        .catch(err => {
            next(err);
        })
}


export const update_debtor = async (req, res, next) => {

    const { debtor_id, debtor_name, debtor_amount } = req.body;

    await Debtor.update_debtor(debtor_id, debtor_name, debtor_amount)
        .then(result => {
            next(result);
        })
        .catch(err => {
            next(err);
        })
}


export const delete_debtor = async (req, res, next) => {

    const { debtor_id } = req.body;

    await Debtor.delete_debtor(debtor_id)
        .then(result => {
            next(result);
        })
        .catch(err => {
            next(err);
        })
}
