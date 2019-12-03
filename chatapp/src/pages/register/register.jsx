import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {register} from '../../action/actions'
import {List,InputItem,WhiteSpace,WingBlank,Radio,NavBar,Button, Toast} from 'antd-mobile';
const ListItem = List.Item;
 class Register extends Component {
    state={
        username:'',
        password:'',
        password_again:'',
        type:'hr'
    }
    toLogin=()=>{
        this.props.history.replace('/login')
    }
    register=()=>{
        let {username,password,type,password_again} = this.state;
        if(password!=password_again){    //判断密码是否一样
            Toast.fail('两次输入的密码不一致');
        }else{
            this.props.register({username,password,type});
        }
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
                <InputItem type="password" placeholder="请确认密码" onChange={val=>{this.handleChange('password_again',val)}}>确认密码</InputItem>
                <ListItem>
                    <span>用户类型</span>
                    &nbsp;  &nbsp;  &nbsp;  &nbsp;
                    <Radio onChange={()=>{this.handleChange('type','hr')}} checked={this.state.type=="hr"}>hr</Radio>
                    &nbsp;  &nbsp;  &nbsp;  &nbsp;
                    <Radio onChange={()=>{this.handleChange('type','dr')}} checked={this.state.type=="dr"}>dreamer</Radio>
                </ListItem>
                <WhiteSpace size="md"/>
                <Button type="primary" onClick={this.register}>注册</Button>
                <WhiteSpace size="md"/>
                <Button onClick={this.toLogin}>已有账户</Button>
                 </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>state,
    {register}
)(Register)
