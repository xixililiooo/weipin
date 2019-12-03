import { combineReducers } from 'redux'
import {AUTH_SUCCESS,RECEIVE_USER,RESET_USER,GET_USER,GET_USER_LIST,RECEIVE_MSG,RECEIVE_MSG_LIST,READ_MSG} from './action-type'
let initUser = {
    username:'',
    password:'',
    type:'',
}
//产生user状态的reducer
function user(state=initUser,action){
    switch(action.type){
        case AUTH_SUCCESS:   //登陆成功或者注册成功
        let {header,type,token} = action.data;
        // console.log(action.data);
        return {...action.data};
        case RECEIVE_USER:  //更新用户信息
            return {...state,...action.data};
        case RESET_USER:  //重置用户信息
            return {...initUser,token:""};
        case GET_USER: 
            return {...state,...action.data};
        default : return state;
    }
}
let initUserList = [];
function userList(state=initUserList,action){  //产生userlist状态的reducer
    switch(action.type){
        case GET_USER_LIST:return action.data
        default: return state;
    }
}
let initChat = {
    users:{}, // { "userid":{username:"",header:""}}
    chatMsgs:[],
    unReadCount:0
}
function chat(state=initChat,action){
    switch(action.type){
        case RECEIVE_MSG_LIST: 
        // console.log('action',action.data.chatMsgs)
        // console.log('userid',action.data.userid)
        return{
            users:action.data.users,
            chatMsgs:action.data.chatMsgs,
            unReadCount:action.data.chatMsgs.reduce((pre,msg)=>pre+(!msg.read&&msg.to==action.data.userid?1:0),0)
        }
        case RECEIVE_MSG:
            let {chatMsg} = action.data;
            // console.log(chatMsg);
            return {   //
            users:state.users,  //保持不变
            chatMsgs:[...state.chatMsgs,chatMsg],
            unReadCount:state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
        }
        case READ_MSG:
            let {count,from,to} = action.data;
            // console.log(state.chatMsgs);
            // console.log('from',from);
            // console.log('to',to);
            return{
            users:state.users,  //保持不变
            chatMsgs:state.chatMsgs.map(msg=>{
                if(!msg.read&&msg.from==from&&msg.to==to){
                    return {...msg,read:true}   //不能直接更改
                }else{
                    return msg
                }
            }),
            unReadCount:state.unReadCount - count
        }
        default :return state
    }
}
export  default combineReducers({
    user,
    userList,
    chat
})
