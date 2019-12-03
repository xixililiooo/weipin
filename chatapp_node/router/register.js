let express = require('express');
let router = express.Router();
let {userModel}  = require('../db/db_test');
let {Jwt} = require('../token/jwt');
let md5 = require('blueimp-md5');
router.get('/',(req,res)=>{
    res.send('///')
})
/*
        注册的post
        username:Strng,
        password:String,
        password_again:String,
        用户类别：type:String

        response:
        code:200  --》注册成功
        code:100  --》用户名已经存在
*/
router.post('/',(req,res)=>{
        let {username,password,type} = req.body;
        console.log(username,password);
        (async ()=>{
            let filter = {password:0,__v:0};
            let result  = await userModel.findOne({
                username
            });
            if(!result){
                let usermodel = new userModel({username,type,password:md5(password)});
                await usermodel.save();
                let user  = await userModel.findOne({
                    username
                },filter);
                // console.log(result);
                let jwt  = new Jwt({username});
                let token = await jwt.generateToken();
                user['token'] = token;
                res.json({
                    code:200,
                    message:"注册成功",
                    user:user
                })
            }else{
                res.json({
                    code:100,
                    message:"用户名已经注册"
                })
            }
        })()
})
module.exports = router;