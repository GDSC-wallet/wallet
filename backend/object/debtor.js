export const get_debtor_records_check = async (req, res, next) => {
    try {
        const query = req.query;
        if(!!!query.debtor_id){
            res.status(401).json({success:false,msg:"debtor_id is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const insert_debtor_check = async (req, res, next) => {
    const body = req.body
    try {
        if(!!!body.debtor_name) {
            res.status(401).json({success:false,msg:"debtor_name is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const update_debtor_check = async (req, res, next) => {
    const body = req.body
    try {
        if(!!!body.debtor_id){
            res.status(401).json({success:false,msg:"debtor_id is required"})
            return;
        }
        if(!!body.debtor_name){
            res.status(401).json({success:false,msg:"debtor_name is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }

};

export const delete_debtor_check = async (req, res, next) => {
    const body = req.body
    try {
        if(!!!body.debtor_id){
            res.status(401).json({success:false,msg:"debtor_id is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};
