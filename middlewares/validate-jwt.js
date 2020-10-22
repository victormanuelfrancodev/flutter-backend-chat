const jwt = require('jsonwebtoken');

const validateJWT = (req,res,next) => {
    //read token
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            mgs:'No token exist'
        });
    }
    try{
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    }catch(error){
        return res.status(401).json({
            ok:false,
            mgs:'Token invalidate'
        });
    }
    
}

module.exports = {
    validateJWT
}