export const getEinvoice_check = async (req, res, next) => {
    try {
        const query = req.query;
        if(!!!query.startDate) {
            res.staus(401).json({success:false,msg:"startDate is required"})
            return;
        }
        if(!!!query.endDate) {
            res.staus(401).json({success:false,msg:"endDate is required"})
            return;
        }
        if(!!!query.cardNo) {
            res.staus(401).json({success:false,msg:"cardNo is required"})
            return;
        }
        if(!!!query.cardEncrypt) {
            res.staus(401).json({success:false,msg:"cardEncrypt is required"})
            return;
        }
        next();
    } catch (error) {
        console.log('error :', error);
        res.status(401).json({status:"token expired",msg:error})
    }
}
