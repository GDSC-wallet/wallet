export const profile_check = async (req, res, next) => {
    try {
        const query = req.query;
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

export const signUp_check = async (req, res, next) => {
    const body = req.body
    try {
        if(!!!body.nickname){
            res.status(401).json({success:false,msg:"nickname is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};

export const update_user_check = async (req, res, next) => {
    const body = req.body
    try {
        if(!!!body.nickname){
            res.status(401).json({success:false,msg:"nickname is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
};
