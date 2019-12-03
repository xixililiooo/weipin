let {chatModel} =require('../db/db_test')
module.exports = function(server){
    let io = require('socket.io')(server);
    io.on('connection',function(socket){
        console.log('连接成功');
        socket.on('sendMsg',function({from,to,content}){
            // console.log(data);
            //收到用户发送的消息，存入数据库
            let chat_id = [from,to].sort().join('_');  //保证from_to和to_from一样
            let createTime = Date.now();  //消息发送时间
            new chatModel({from,to,content,chat_id,createTime}).save(function(err,chatMsg){
                if(err){
                    console.log(err);
                }
                    io.emit('receiveMsg',chatMsg);
            }); 
        })
    })
}