let express = require('express');
let router = express.Router();
let {Jwt} = require('../token/jwt');
let {userModel}  = require('../db/db_test')
router.get('/',(req,res)=>{
    let {token} = req.headers;
    (async ()=>{
        let filter = {password:0,__v:0}; //过滤器
        let jwt = new Jwt(token);
        let result = await jwt.decodeToken();
        let {username} = result; 
        user = await userModel.findOne({username},filter);
        user['token'] = token;
        res.json({
            code:200,
            message:"获取成功",
            user:user
        })
    })()
})
module.exports = router;