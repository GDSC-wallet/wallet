export const get_record_check = async (req, res, next) => {
    try {
        const query = req.query;
        console.log('!!query.record_id :', !!query.record_id);
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

export const create_record_check = async (req, res, next) => {
    const body = req.body
    try {
        if(!!!body.wallet_id){
            res.status(401).json({success:false,msg:"record_id is required"})
            return;
        }
        next();
      } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

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
        next();
      } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }

};

export const delete_record_check = async (req, res, next) => {
    try {
        if(!!!body.record_id){
            res.status(401).json({success:false,msg:"record_id is required"})
            return;
        }
        next();
      } catch (error) {
        console.log('error :', error);
        res.status(401).json({success:false,msg:"record_id is required"})
      }
};