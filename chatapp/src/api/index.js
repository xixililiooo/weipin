import Axios from '../request/request';
/*
    登陆的user包含了username,password,type
*/
export const reqRegister=(user)=>{   //实现注册提交
    return Axios.post('http://116.62.50.105:3100/register',user);
}
export const reqLogin = (user)=>{  //实现登陆提交
    return Axios.post('http://116.62.50.105:3100/login',user);
}
/*

*/
export const reqUserUpdate = (user)=>{  //实现用户修改提交
    return Axios.post('http://116.62.50.105:3100/update',user);
}
export const reqGetUser = (user)=>{  //实现用户修改提交
    return Axios.get('http://116.62.50.105:3100/getuser');
}
export const reqGetUserList = (type)=>{
    return Axios.get(`http://116.62.50.105:3100/getuserList?type=${type}`);
}
export const reqGetChatMsgList=(userid)=>{   //实现消息列表
    return Axios.get(`http://116.62.50.105:3100/msgList?userid=${userid}`)
}
export const reqReadMsg = ({from,to})=>{
    console.log(from,to);
    return Axios.post("http://116.62.50.105:3100/msgList",{from,to});
}