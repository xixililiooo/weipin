import React, { Component } from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief
function getLastMsgs(chatMsgs,userid){ //对chatMsgs按照chat_id进行分组,并且得到每个组的最后消息组成的数组
    let lastMsgs = {};  //存放所有会话的最后一条消息
    // console.log(chatMsgs);
    // console.log(chatMsgs);
    chatMsgs.forEach(msg=>{
        // console.log(msg.read);
        if(msg.to===userid && !msg.read) {
            msg.unReadCount = 1
          } else {
            msg.unReadCount = 0
          }
        let chat_id = msg.chat_id;
        let lastMsg = lastMsgs[chat_id];
        if(!lastMsg){
            lastMsgs[chat_id] = msg;
        }else{
            const unReadCount = lastMsg.unReadCount + msg.unReadCount
            if(msg.createTime>lastMsg.createTime){
                lastMsgs[chat_id] = msg;
            }
          lastMsgs[chat_id].unReadCount = unReadCount
        }  //确保消息是最后一条
    })
    let lastmsgs = Object.values(lastMsgs);
    lastmsgs.sort((m1,m2)=>{
        return m2.createTime-m1.createTime;
    })
    // console.log(lastmsgs);
    return lastmsgs;
}
 class Message extends Component {
    render() {
        // console.log('render');
        let {user} = this.props;
        let {users,chatMsgs} = this.props.chat;
        // console.log(this.props);
        let userid = user._id;
        // console.log(chatMsgs);
        let lastMsgs = getLastMsgs(chatMsgs,userid);
        // console.log('lastmsg',lastMsgs);
        return (
            <div>
                <List style={{marginTop:50, marginBottom: 50}}>

{
  lastMsgs.map(msg =>{
    // 得到目标用户的id
    const targetid = msg.to===user._id ? msg.from : msg.to
    // 得到目标用户的信息
    const targetUser = users[targetid]
    // console.log(targetUser);
    return (
      <Item
        key={msg._id}
        extra={<Badge text={msg.unReadCount}/>}
        thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
        arrow='horizontal'
        onClick={() => this.props.history.push(`/chat/${targetid}`)}
      >
          {targetUser.username}
        <Brief> {msg.content}</Brief>
      </Item>
    )
  })
}
</List>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user,chat:state.chat}),
    {}
)(Message)
