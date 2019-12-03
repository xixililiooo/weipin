let express = require('express');
let router = express.Router();
let {userModel}  = require('../db/db_test')
router.get('/',(req,res)=>{
    let {type} = req.query;
    let filter = {password:0,__v:0};
    (async ()=>{
        console.log(type);
        let userList = await userModel.find({type:type,header:{$exists:true}},filter);
        res.json({
            code:200,
            message:"获取用户列表成功",
            userList
        })
    })()
})
module.exports  = router;