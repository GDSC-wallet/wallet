export const get_record_check = async (req, res, next) => {
    try {
        const query = req.query;
        if(!!!query.record_id){
            res.status(401).json({success:false,msg:"record_id is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const get_month_records_check = async (req, res, next) => {
    try {
        const query = req.query;
        if(!!!query.wallet_id){
            res.status(401).json({success:false,msg:"wallet_id is required"})
            return;
        }
        if(!!!query.time_choosen){
            res.status(401).json({success:false,msg:"time_choosen is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const insert_record_check = async (req, res, next) => {
    const body = req.body
    try {
        if(!!!body.wallet_id){
            res.status(401).json({success:false,msg:"wallet_id is required"})
            return;
        }
        if(!!!body.wallet_record_tag_id){
            res.status(401).json({success:false,msg:"wallet_record_tag_id is required"})
            return;
        }
        if(!!!body.record_ordinary){
            res.status(401).json({success:false,msg:"record_ordinary is required"})
            return;
        }
        if(!!!body.record_name){
            res.status(401).json({success:false,msg:"record_name is required"})
            return;
        }
        if(!!!body.record_amount){
            res.status(401).json({success:false,msg:"record_amount is required"})
            return;
        }
        if(!!!body.record_type){
            res.status(401).json({success:false,msg:"record_type is required"})
            return;
        }
        if(!!!body.record_date){
            res.status(401).json({success:false,msg:"record_date is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const batch_record_check = async (req, res, next) => {
    const body = req.body
    try {
        if(!!!body.records){
            res.status(401).json({success:false,msg:"records is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
}

export const update_record_check = async (req, res, next) => {
    const body = req.body
    try {
        if(!!!body.record_id){
            res.status(401).json({success:false,msg:"record_id is required"})
            return;
        }
        if(!!!body.record_wallet_id){
            res.status(401).json({success:false,msg:"record_wallet_id is required"})
            return;
        }
        if(!!!body.wallet_record_tag_id){
            res.status(401).json({success:false,msg:"wallet_record_tag_id is required"})
            return;
        }
        if(!!!body.record_ordinary){
            res.status(401).json({success:false,msg:"record_ordinary is required"})
            return;
        }
        if(!!!body.record_name){
            res.status(401).json({success:false,msg:"record_name is required"})
            return;
        }
        if(!!!body.record_amount){
            res.status(401).json({success:false,msg:"record_amount is required"})
            return;
        }
        if(!!!body.record_type){
            res.status(401).json({success:false,msg:"record_type is required"})
            return;
        }
        if(!!!body.record_date){
            res.status(401).json({success:false,msg:"record_date is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const delete_record_check = async (req, res, next) => {
    const body = req.body;
    try {
        if(!!!body.record_id){
            res.status(401).json({success:false,msg:"record_id is required"})
            return;
        }
        if(!!!body.record_wallet_id){
            res.status(401).json({success:false,msg:"record_wallet_id is required"})
            return;
        }
        if(body.record_amount == null || body.record_amount == undefined){
            res.status(401).json({success:false,msg:"record_amount is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};
