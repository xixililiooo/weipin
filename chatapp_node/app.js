let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let {Jwt} = require('./token/jwt');
let app = new express();
let httpserver = require('http').createServer(app);
let io = require('./socketIo/test');
io(httpserver);
let {userModel}  = require('./db/db_test')
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({    //使用cors实现跨域
    origin:"http://localhost:3000",
    method:['GET','PUT'],
    credentials:true
}))
app.use((req,res,next)=>{  //全局拦截函数，对权限路由进行token验证
    if(req.url!="/login"&&req.url!="/register"){
        console.log(req.url);
        console.log('你正在访问权限网站',req.url);
        let {token} = req.headers;
        // console.log(authorization );
        if(token ){
            (async ()=>{
                let jwt = new Jwt(token);
                let result = await jwt.decodeToken();
                console.log(result);
                let {username} = result; 
                let user = await userModel.findOne({username});
                if(!username||!user){
                    res.status(401).send('非法token');
                }else{
                    next();
                }
            })()
        }else{
            
            res.json({
                code:100,
                message:"你还没登陆"
            })
        }
    }else{
        next();
    }
})
app.get('/',(req,res)=>{
    res.send('xxx');
})
app.use('/register',require('./router/register'));
app.use('/login',require('./router/login'));
app.use('/update',require('./router/update'));
app.use('/getuser',require('./router/getuser'));
app.use('/getuserList',require('./router/getuserList'));
app.use('/msgList',require('./router/msgList'));
httpserver .listen(3100);