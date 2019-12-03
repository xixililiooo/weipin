let jwt = require('jsonwebtoken');
class Jwt{
    constructor(data){
        this.data = data;
    }
    generateToken(){  //用于生成token的函数
        let data = this.data;
        let createTime = Math.floor(Date.now()/1000);
        let secretkey = "hello world";
        return new Promise((reslove,reject)=>{
            jwt.sign(data,secretkey,{expiresIn:60*60},(err,token)=>{
                if(err){
                    console.log(err);
                }
                reslove(token);
            })
        })
    }
    decodeToken(){
        let token = this.data;
        let secretkey = "hello world";
        return new Promise((reslove,reject)=>{
            jwt.verify(token,secretkey,(err,result)=>{
                if(err){
                   reslove({});
                }else{
                    reslove(result);
                }
            })
        })
    }
}
module.exports ={
    Jwt
}