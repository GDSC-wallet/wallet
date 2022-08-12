export const get_tag_check = async (req, res, next) => {
    try {
        const query = req.query;
        if(!!!query.tag_id){
            res.status(401).json({success:false,msg:"tag_id is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const insert_tag_check = async (req, res, next) => {
    const body = req.body
    try {
        if(!!!body.tag_wallet_id){
            res.status(401).json({success:false,msg:"tag_wallet_id is required"})
            return;
        }
        if(!!!body.tag_ordinary){
            res.status(401).json({success:false,msg:"tag_ordinary is required"})
            return;
        }
        if(!!!body.tag_name){
            res.status(401).json({success:false,msg:"tag_name is required"})
            return;
        }
        if(!!!body.tag_type){
            res.status(401).json({success:false,msg:"tag_type is required"})
            return;
        }
        if(!!!body.tag_color){
            res.status(401).json({success:false,msg:"tag_color is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const update_tag_check = async (req, res, next) => {
    const body = req.body
    try {
        if(!!!body.tag_id){
            res.status(401).json({success:false,msg:"tag_id is required"})
            return;
        }
        if(!!!body.tag_ordinary){
            res.status(401).json({success:false,msg:"tag_ordinary is required"})
            return;
        }
        if(!!!body.tag_name){
            res.status(401).json({success:false,msg:"tag_name is required"})
            return;
        }
        if(!!!body.tag_type){
            res.status(401).json({success:false,msg:"tag_type is required"})
            return;
        }
        if(!!!body.tag_color){
            res.status(401).json({success:false,msg:"tag_color is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const delete_tag_check = async (req, res, next) => {
    const body = req.body;
    try {
        if(!!!body.tag_id){
            res.status(401).json({success:false,msg:"tag_id is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const update_all_tag_check = async (req, res, next) => {
    const body = req.body;
    try {
        if(!!!body.tags){
            res.status(401).json({success:false,msg:"tags is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};
