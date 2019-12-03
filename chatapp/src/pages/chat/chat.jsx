import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import {sendMsg,readMsg} from '../../action/actions'
import QueueAnim from 'rc-queue-anim'
import '../../assets/css/index.css'
let Item = List.Item;

class Chat extends Component {
    state = {
        content: '',
        isShow: false // 是否显示表情列表
      }
      handleSend=()=>{
          let from  = this.props.user._id;  //消息从自己发出
          console.log(this.props); 
          let to = this.props.match.params._id; //消息发给谁
          let content = this.state.content; //消息的内容
          if(content){
            this.props.sendMsg({from,to,content});
            this.setState({
              content:''
            })
          }
      }
      toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({isShow})
        if(isShow) {
          // 异步手动派发resize事件,解决表情列表显示的bug
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
          }, 0)
        }
      }
      componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
      }
      componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)

      }
      componentWillUnmount () { // 在退出之前
        // 发请求更新消息的未读状态
        let to = this.props.user._id; //获取用户本身的id
        let from= this.props.match.params._id; //获取对方的id
        this.props.readMsg({from,to});
        // console.log('componentdidmount');
      }
      componentWillMount () {
        // 初始化表情列表数据
        const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
          ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
          ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
          ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
        this.emojis = emojis.map(emoji => ({text: emoji}))
      }
    render() {
      let {users,chatMsgs} = this.props.chat;
      let userid = this.props.user._id; //获取用户本身的id
      let targetid = this.props.match.params._id; //获取对方的id
      // console.log(this.props);
      let chatid = [userid,targetid].sort().join("_"); // 获取chatid,标志着我跟对方的聊天或者对方跟我的聊天
      let singleChat = chatMsgs.filter(msg=>msg.chat_id==chatid);
      // console.log(singleChat);
      if(!users[targetid]){   //在页面刷新的时候，请求的数据可能还没有回来，此时users为{},但是还是会往下渲染，此时渲染users[target]会报错
      //所以要判断此时请求的数据回来了吗？如果没有回来，先返回null,等请求数据回来后更新redux，就会引起组件重新渲染
        return null; 
      }
        return (
            <div id='chat-page'>
            <NavBar
              icon={<Icon type='left'/>}
              className='stick-header'
              onLeftClick={()=> this.props.history.goBack()}
            >
              {users[targetid].username}
            </NavBar>
            <List style={{marginTop:50, marginBottom: 50}}>
              {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
              {/* <QueueAnim type='left'> */}
                {
                  singleChat.map((msg,index)=>{
                    if(msg.to==userid){
                      return (
                        <Item
                      key={index}
                      thumb={<img src={require(`../../assets/images/${this.props.user.header}.png`)} />}
                    >
                      {msg.content}
                    </Item>
                      )
                    }else{
                      return (
                        <Item
                        className='chat-me'
                        key={index}
                        extra={<img src={require(`../../assets/images/${users[targetid].header}.png`)} />}
                      >
                        {msg.content}
                      </Item>
                      )    
                    } 
                  })
                }
              {/* </QueueAnim> */}
    
            </List>
    
            <div className='am-tab-bar' >
              <InputItem
                placeholder="请输入"
                value={this.state.content}
                onChange={val => this.setState({content: val})}
                onFocus={() => this.setState({isShow: false})}
                extra={
                  <span>
                    <span onClick={this.toggleShow} style={{marginRight:5}}>😊</span>
                    <span onClick={this.handleSend}>发送</span>
                  </span>
                }
              />
              {this.state.isShow ? (
                <Grid
                  data={this.emojis}
                  columnNum={8}
                  carouselMaxRow={4}
                  isCarousel={true}
                  onClick={(item) => {
                    this.setState({content: this.state.content + item.text})
                  }}
                />
              ) : null}
    
            </div>
          </div>
        )
    }
}
export default  connect(
    state=>({user:state.user,chat:state.chat}),
    {sendMsg,readMsg}
)(Chat)
