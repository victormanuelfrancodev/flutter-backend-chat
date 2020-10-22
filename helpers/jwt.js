const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
   return new Promise ((resolve,reject)=>{
    const payload = {
        uid
    };

    jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn:'48h'
    },( err,token )=>{
        if(err){
           reject('I cant create JWT');
        }else{
            resolve(token);
        }
    });
   });
}

module.exports = {
    generarJWT
}