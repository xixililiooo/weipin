let express = require('express');
let {Jwt} = require('../token/jwt');
let {userModel,chatModel}  = require('../db/db_test')
let router = express.Router();
router.get('/',(req,res)=>{   //得到消息列表
    let {userid} = req.query;
    console.log(userid);
    (async ()=>{
        let filter = {password:0,__v:0}; //过滤器
        let users_arr = await userModel.find({},filter);
        let users = {};
        users_arr.forEach(item=>{  //构建users
            users[item._id] = {username:item.username,header:item.header}
        })
        let chatMsgs = await chatModel.find({"$or":[{from:userid},{to:userid}]},filter);  //构建跟自己相关的
        res.json({
            code:200,
            message:"获取成功",
            data:{
                users,
                chatMsgs
            }
        })
    })()
})
router.post('/',(req,res)=>{  //更新未读消息数量
    let from  = req.body.from;  //消息的来源
     let to = req.body.to;  //消息发给谁
     console.log(from);
     console.log(to);
        chatModel.find({from,to,read:false},function(err,result){
            if(err) console.log(err);
            console.log(result.length);
        })
    chatModel.updateMany({from,to,read:false},{read:true},{multi:true},function(err,doc){
            if(err) console.log(err);
            res.json({
                code:200,
                message:"修改成功",
                data:doc.nModified
            })
        });
})
module.exports = router;