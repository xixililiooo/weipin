import React, { Component } from 'react'
import {connect} from 'react-redux' 
import {List,NavBar,InputItem,TextareaItem,Button,WhiteSpace} from 'antd-mobile';
import HeaderSelector from '../../component/header_select'
import {update} from '../../action/actions'
import {Redirect} from 'react-router-dom'
 class DrInfo extends Component {
    state={
        header:"", //用户头像
        position:"", //用户寻求的职位
        info:"",
        salary:""//工资
     }
    handleChange(prop,value){
        this.setState({
            [prop]:value
        })
    }
    setHeader=(header)=>{
        this.setState({
            header:header
        })
    }
    save = ()=>{
        console.log(this.state);
        this.props.update(this.state);
    }
    render() {
        if(this.props.user.header){
            return <Redirect to="/dr"></Redirect>
        }
        return (
            <div>
                <NavBar>dr信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
                <List>
                <WhiteSpace></WhiteSpace>
                    <InputItem placeholder="求职岗位" onChange={(val)=>{this.handleChange("position",val)}}>求职岗位</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem placeholder="输入个人简介" onChange={(val)=>{this.handleChange("info",val)}}>个人简介</InputItem>
                    <WhiteSpace></WhiteSpace>
                </List>
                <Button type="primary" onClick={this.save}>保存</Button>
            </div>
        )
    }
}
export default connect(
    state=>state,
    {update}
)(DrInfo)
