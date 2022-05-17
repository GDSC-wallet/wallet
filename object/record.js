export const get_record_check = async (req, res) => {
    try {
        const query = req.query;
        if(!!query.record_id){
            res.status(401).json({success:false,msg:"record_id is required"})
        }
        next();
      } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
      }
};

export const create_record_check = async (req, res) => {
    const body = req.body
    try {
        if(!!body.wallet_id){
            res.status(401).json({success:false,msg:"record_id is required"})
        }

        next();
      } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const update_record_check = async (req, res) => {
    const body = req.body
    try {
        if(!!body.record_id){
            res.status(401).json({success:false,msg:"record_id is required"})
        }
        if(!!body.record_wallet_id){
            res.status(401).json({success:false,msg:"record_wallet_id is required"})
        }

        next();
      } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }

};

export const delete_record_check = async (req, res) => {
    try {
        if(!!body.record_id){
            res.status(401).json({success:false,msg:"record_id is required"})
        }
        next();
      } catch (error) {
        console.log('error :', error);
        res.status(401).json({success:false,msg:"record_id is required"})
      }
};