export const get_wallet_check = async (req, res, next) => {
    try {
        const query = req.query;
        if(!!!query.wallet_id){
            res.status(401).json({success:false,msg:"wallet_id is required"})
            return;
        }
        if(!!!query.time_choosen) {
            res.status(401).json({success:false,msg:"time_choosen is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const search_record_check = async (req, res, next) => {
    try {
        const query = req.query;
        if(!!!query.wallet_id){
            res.status(401).json({success:false,msg:"wallet_id is required"})
            return;
        }
        if(!!!query.search_str) {
            res.status(401).json({success:false,msg:"search_str is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const insert_wallet_check = async (req, res, next) => {
    const body = req.body
    try {
        if(!!!body.wallet_name) {
            res.status(401).json({success:false,msg:"wallet_name is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const update_wallet_check = async (req, res, next) => {
    const body = req.body
    try {
        if(!!!body.wallet_id){
            res.status(401).json({success:false,msg:"wallet_id is required"})
            return;
        }
        if(!!!body.wallet_name){
            res.status(401).json({success:false,msg:"wallet_name is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }

};

export const delete_wallet_check = async (req, res, next) => {
    try {
        if(!!!body.wallet_id){
            res.status(401).json({success:false,msg:"wallet_id is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};
