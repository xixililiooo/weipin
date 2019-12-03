import {reqLogin,reqRegister,reqUserUpdate,reqGetUser,reqGetUserList, reqGetChatMsgList,reqReadMsg} from '../api/index';
import {AUTH_SUCCESS,RECEIVE_USER,RESET_USER,GET_USER,GET_USER_LIST,RECEIVE_MSG,RECEIVE_MSG_LIST,READ_MSG} from './action-type'
import {Toast} from 'antd-mobile' 
import io from 'socket.io-client';
function InitIO(userid,dispatch){
    if(!io.socket){
        io.socket = io("ws://116.62.50.105:3100");
        io.socket.on('receiveMsg',function(chatMsg){
            // console.log('客户端接受消息',chatMsg);
            // console.log('userid',userid);
            // console.log(userid==chatMsg.from)
     
            if(userid==chatMsg.from||userid==chatMsg.to){
                dispatch(actionMsg({chatMsg,userid}));
            }
        })
    }
}
async function getMsg(userid,dispatch){
    // console.log('init',userid);
    InitIO(userid,dispatch);
    // console.log(userid);
    let response = await reqGetChatMsgList(userid);
    let result = response.data;
    if(result.code==200){
        let {users,chatMsgs} = result.data;
        dispatch(actionMsgList({users,chatMsgs,userid}));
    }
}
//同步action
export let actionMsg = ({chatMsg,userid})=>({
    type:RECEIVE_MSG,
    data:{chatMsg,userid}
})
export let actionMsgList=({users,chatMsgs,userid})=>({  //获取消息列表的同步action
    type:RECEIVE_MSG_LIST,
    data:{users,chatMsgs,userid}
})
export let actionLogin=(user)=>({  //登陆的同步action
    type:AUTH_SUCCESS,
    data:user
})
export let actionRegister=(user)=>({ //注册的同步action
    type:AUTH_SUCCESS,
    data:user
})
export let actionReceive=(user)=>({  //完善用户信息的同步action
    type:RECEIVE_USER,
    data:user
})
export let actionReset=()=>({  //重置用户信息的同步action
    type:RESET_USER
})
export let actionGet=(user)=>({  //获取用户信息的同步action
    type:GET_USER,
    data:user
})
export let actionGetUserList=(userlist)=>({  //获取用户列表的同步action
    type:GET_USER_LIST,
    data:userlist
})
export let actionReadMsg = ({count,from,to})=>({
    type:READ_MSG,
    data:{count,from,to}
})
//注册的异步action
export  let register = (user_)=>{
    return async dispatch=>{
        let response = await reqRegister(user_);
        let {code,message,user} = response.data;
        if(code==200){
            // console.log(user);
            let userid = user._id;  //获取用户的userid来，通过userid来获取消息列表
            // console.log('register',userid);
            window.localStorage.setItem('token',user['token']);  //将token存在本地
            getMsg(userid,dispatch);   //注册成功直接登陆的时候就要获取消息列表
            Toast.success(message);   //提示注册成功
      dispatch(actionRegister(user));   //分发注册的同步action，修改redux
  
        }else{
            Toast.fail(message);  //注册失败提示信息
        }
    }
}
//登陆的异步action
export let login = (user_)=>{
    return async dispatch=>{
        let response = await reqLogin(user_);
        let {code,message,user} =response.data;
        if(code==200){
            let userid = user._id;  //获取用户的userid来，通过userid来获取消息列表
            Toast.success(message);
            getMsg( userid,dispatch);   //直接登陆的时候就要获取消息列表
            window.localStorage.setItem('token',user['token']);
            dispatch(actionLogin(user));
        }else{
            Toast.fail(message);
        }
    }
}
export let update = (user_)=>{  //更新的异步action
    return async dispatch=>{
        let response = await reqUserUpdate(user_);
        let {user,code} = response.data;
        if(code==200){
            dispatch(actionReceive(user));
            Toast.success('保存成功');
        }else{
            Toast.fail('保存失败');
        }
    }
}
export let getuser=()=>{   //获取用户信息的异步action
    return async dispatch=>{
        let response = await reqGetUser();
        if(!response){
            dispatch(actionReset());
            return;
        }
        let {code,user} = response.data;
        if(code==200){
            let userid = user._id;  //获取用户的userid来，通过userid来获取消息列表
            getMsg( userid,dispatch);   //实现自动登陆登陆的时候就要获取消息列表
            dispatch(actionGet(user))
        }
    }
}
export let getuserList=(type,userid)=>{  //获取用户列表的异步action
    return async dispatch=>{
        let response = await reqGetUserList(type);
        let {code,userList} = response.data;
        if(code==200){
           dispatch(actionGetUserList(userList));
            getMsg( userid,dispatch);  
        }else{
            Toast.fail('获取用户信息失败');
        }
    }
}
export let sendMsg = ({from,to,content})=>{   //发送消息的异步action
    return  dispatch=>{
        // console.log('发送消息',{from,to,content});
        io.socket.emit('sendMsg',{from,to,content});
    }
}
export let readMsg = ({from,to})=>{   //读取消息的异步action
    return async dispatch=>{
        let response = await reqReadMsg({from,to});
        let result = response.data;
        if(result.code==200){
            // console.log(result.data);
            let count = result.data;
            dispatch(actionReadMsg({count,from,to}));
        }
    }
}


