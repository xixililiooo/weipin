let express = require('express');
let router = express.Router();
let {Jwt} = require('../token/jwt');
let {userModel}  = require('../db/db_test')
router.post('/',(req,res)=>{ //实现用户更新信息
    let user = req.body;
    console.log(user);
    let {token} = req.headers;
    (async ()=>{
        let filter = {password:0,__v:0}; //过滤器
        let jwt = new Jwt(token);
        let result = await jwt.decodeToken();
        console.log(result);
        let {username} = result; 
        await userModel.update({username:username},user);
        user = await userModel.findOne({username},filter);
        res.json({
            code:200,
            message:"保存成功",
            user:user
        })
    })()
})
module.exports = router;