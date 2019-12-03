import React, { Component } from 'react'
import {connect} from 'react-redux'
import {List,Result,WhiteSpace, Button,Modal} from 'antd-mobile'
import {actionReset} from '../../action/actions'
let Item = List.Item;
let Brief  = Item.Brief;
 class Personal extends Component {
     logout = ()=>{   //登出执行函数
         Modal.alert('退出','确定退出吗?',[  //确认模态框
             {
                 text:"取消"
             },{
                 text:"确定",
                 onPress:()=>{
                    window.localStorage.removeItem('token');  //清除token
                    this.props.actionReset();  //执行同步action，清除redux中的user数据
                 }
             }
         ])
     }
    render() {
        let {username,header,salary,company,position,info} = this.props.user;
        return (
            <div style={{marginBottom:50,marginTop:50}}>
                <Result
                    img={<img src={require(`../../../assets/images/${header}.png`)} style={{width:50}} />}
                    title={username}
                    message={company}
                >

                </Result>
                 <List renderHeader={()=>"相关信息"}>
                    <Item multipleLine>
                            <Brief>职位:{position}</Brief>
                            <Brief>简介;{info}</Brief>
                            {salary?(
                                <Brief>薪资:{salary}</Brief>
                            ):null}
                    </Item>
                 </List>
                 <WhiteSpace></WhiteSpace>
                 <Button type="warning"  onClick={this.logout}>退出登陆</Button>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {actionReset}
)(Personal)
