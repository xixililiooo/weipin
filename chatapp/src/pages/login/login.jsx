import React, { Component } from 'react';
import {List,InputItem,WhiteSpace,WingBlank,Radio,NavBar,Button,Toast} from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../action/actions'
const ListItem = List.Item;
class Login extends Component {
    state={
        username:'',  //用户名
        password:'',  //密码
    }
    toRegister=()=>{
        this.props.history.replace('/register');
    }
    login=()=>{
       this.props.login(this.state);
    }
    handleChange(prop,value){
        this.setState({
            [prop]:value
        })
    }
    render() {
        if(this.props.user.token){
                return <Redirect to="/"></Redirect>  
        }
        return (
            <div>
            <NavBar>微聘</NavBar>
            <WingBlank>
            <List>
            <InputItem type="text" placeholder="请输入用户名" onChange={val=>{this.handleChange('username',val)}}>用户名</InputItem>
            <WhiteSpace size="md"/>
            <InputItem type="password" placeholder="请输入密码" onChange={val=>{this.handleChange('password',val)}}>密码</InputItem>

            <WhiteSpace size="md"/>
            <Button type="primary" onClick={this.login}>登陆</Button>
            <WhiteSpace size="md"/>
            <Button onClick={this.toRegister}>还没有注册？</Button>
             </List>
            </WingBlank>
        </div>
        )
    }
}
export default  connect(
    state=>state,
    {login}
)(Login)