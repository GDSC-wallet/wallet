export const getHeaders_check = async (req, res, next) => {
    try {
        const query = req.query;
        if(!!!query.startDate) {
            res.status(401).json({success:false,msg:"startDate is required"})
            return;
        }
        if(!!!query.endDate) {
            res.status(401).json({success:false,msg:"endDate is required"})
            return;
        }
        if(!!!query.cardNo) {
            res.status(401).json({success:false,msg:"cardNo is required"})
            return;
        }
        if(!!!query.cardEncrypt) {
            res.status(401).json({success:false,msg:"cardEncrypt is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
}

export const getDetails_check = async (req, res, next) => {
    try {
        const query = req.query;
        if(!!!query.invNum) {
            res.status(401).json({success:false,msg:"invNum is required"})
            return;
        }
        if(!!!query.year) {
            res.status(401).json({success:false,msg:"year is required"})
            return;
        }
        if(!!!query.month) {
            res.status(401).json({success:false,msg:"month is required"})
            return;
        }
        if(!!!query.date) {
            res.status(401).json({success:false,msg:"date is required"})
            return;
        }
        if(!!!query.cardNo) {
            res.status(401).json({success:false,msg:"cardNo is required"})
            return;
        }
        if(!!!query.cardEncrypt) {
            res.status(401).json({success:false,msg:"cardEncrypt is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
}
