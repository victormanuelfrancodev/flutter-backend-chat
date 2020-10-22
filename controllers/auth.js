const { response } = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const User= require('../models/user');
const { generarJWT }  = require('../helpers/jwt');

const createUser = async(req,res = response) => {

    const { email, password } = req.body;
    try{  
        const existEmail = await User.findOne({email});
        if(existEmail){
            return res.status(400).json({
                ok:false,
                msg:'the email exist, please try with other email'
            })
        }
        const user = new User(req.body);

        //security
        const salt = bcrypt.genSaltSync();
        user.password= bcrypt.hashSync(password, salt);

        await user.save();
    
        //Generar jwt
        // const token = await
        const token = await generarJWT(user.id);

            res.json({
                ok:true,
                user,
                token
            })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'contact admin'
        })
    }
}

const login= async( req, res = response) => {
    const { email, password } = req.body;

    try{
        const userDB = await User.findOne({email});
        if (!userDB){
            return res.status(404).json({
                ok:false,
                msg:'email dont found'
            });
        }

        const validPassword = bcrypt.compareSync(password, userDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok:false,
                msg:'password no is valid'
            });
        }
        //genera el jwt
        const token = await generarJWT( userDB.id);
        res.json({
            ok:true,
            usuario:userDB,
            token
        })
    }catch(error){

    }

    return res.json({
        ok:true,
        msg:'login',
    });
}

const renewToken = async(req, res = response) => {
    const uid = req.uid;
    const token = await generarJWT(uid);
    const user = await User.findById(uid);

    res.json({
        ok:true,
        token,
        user,
    });
}

module.exports = {
    createUser,
    login,
    renewToken
}