/*
    测试使用mongodb
*/
/*连接到数据库*/

let mongoose = require('mongoose');
let md5 = require('blueimp-md5');
mongoose.connect('mongodb://localhost:27017/chatapp');
let conn = mongoose.connection;
conn.on('connected',function(){
    console.log('数据库连接成功');
})
/*定义表结构，Schema*/
const userSchema = new mongoose.Schema({
    username:{type:String,require:true}, //用户名
    password:{type:String,require:true}, //用户密码
    type:{type:String,require:true},  //用户类别
    header:{type:String}, //用户头像
    position:{type:String}, //用户寻求的职位
    info:{type:String}, //用户的信息
    company:{type:String},  //hr的公司
    salary:{type:String}, //工资
    token:{type:String}
})

const chatSchema = new mongoose.Schema({
    to:{type:String,required:true},  //消息是谁发的
    from:{type:String,required:true}, //消息是发给谁的
    chat_id:{type:String,required:true}, //消息的id  
    content:{type:String,required:true}, //消息内容
    read:{type:Boolean,default:false}, //是否以及读取
    createTime:{type:Number} //消息的创建时间
})
/*获得定义的model*/
const userModel = mongoose.model('user',userSchema);
// let usermodel = new userModel({username:"chenjianyong",password:md5("chjj"),type:"hr"});
// usermodel.save((err,doc)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(doc);
//     }
// });
// userModel.find(function(err,result){
//     console.log(result);
// })
const chatModel = mongoose.model('chat',chatSchema);
module.exports = {
    userModel,
    chatModel
}

// userModel.findOne({username:"chenjianyong"},(err,doc)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(doc);
//     }
// })