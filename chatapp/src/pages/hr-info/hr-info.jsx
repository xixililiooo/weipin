import React, { Component } from 'react'
import {connect} from 'react-redux' 
import {List,NavBar,InputItem,TextareaItem,Button,WhiteSpace} from 'antd-mobile';
import HeaderSelector from '../../component/header_select'
import {update} from '../../action/actions'
import {Redirect} from 'react-router-dom'
 class HrInfo extends Component {
     state={
        header:"", //用户头像
        position:"", //用户寻求的职位
        info:"",
        company:"",  //hr的公司
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
            return <Redirect to="/hr"></Redirect>
        }
        return (
            <div>
                <NavBar>hr信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
                <List>
                <WhiteSpace></WhiteSpace>
                    <InputItem placeholder="输入招聘职位" onChange={(val)=>{this.handleChange("position",val)}}>招聘职位</InputItem>

                    <InputItem placeholder="输入公司名称"  onChange={(val)=>{this.handleChange("company",val)}}>公司名称</InputItem>

                    <InputItem placeholder="输入职位薪资"  onChange={(val)=>{this.handleChange("salary",val)}}>职位薪资</InputItem>

                    <InputItem placeholder="输入职位要求"  onChange={(val)=>{this.handleChange("info",val)}}>招聘要求</InputItem>
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
)(HrInfo)
