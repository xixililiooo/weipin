let express = require('express');
let router = express.Router();
let {userModel}  = require('../db/db_test');
let md5 = require('blueimp-md5');
let {Jwt} = require('../token/jwt');
router.post('/',(req,res)=>{
    let {username,password} = req.body;
    (async ()=>{
        let filter = {password:0,__v:0};
        let user = await userModel.findOne({username,password:md5(password)},filter);
        if(user){
            let jwt  = new Jwt({username});
            let token = await jwt.generateToken();
            user['token'] = token;
            user.token=token;
            console.log(user);
            res.json({
                code:200,
                message:"登陆成功",
                user
            })
        }else{
            res.json({
                code:100,
                message:"用户名或者密码错误"
            })
        }
    })()
})
module.exports = router;