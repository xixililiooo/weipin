import React, { Component } from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import {getuser} from '../../action/actions'
import {connect} from 'react-redux'
import  DrInfo from '../dr-info/dr-info'
import  HrInfo from '../hr-info/hr-info'
import {NavBar} from 'antd-mobile'
import Personal from '../personal/personal';
import Message from '../message/message';
import {redirect} from '../../util/redirect'
import Footer from '../../component/footer/footer'
import DR from '../dr/dr'
import HR from '../hr/hr'
import Chat from '../chat/chat'
class Main extends Component {

    navList = [
        {
            path:"/dr",
            component:DR,
            title:"hr列表",
            icon:'dr',
            text:'dr'
        },
        {
            path:"/hr",
            component:HR,
            title:"dr列表",
            icon:'hr',
            text:'hr'
        },
        {
            path:"/message",
            component:Message,
            title:"消息列表",
            icon:'message',
            text:'message'
        },
        {
            path:"/personal",
            component:Personal,
            title:"用户中心",
            icon:'personal',
            text:'personal'
        }
    ]
    render() {
        console.log(this.props.unReadCount)
       if(window.localStorage.getItem('token')&&!this.props.user.token){
        this.props.getuser();
            return null;
       }else if(!window.localStorage.getItem('token')&&!this.props.user.token){
                return <Redirect to="/login"></Redirect>
       }
     else{
         let path = this.props.location.pathname;
        if(path=="/"){
            path = redirect(this.props.user.header,this.props.user.type);
            console.log(path);
            return <Redirect to={path}></Redirect>
        }
     }
     let {navList} = this;
     let path = this.props.location.pathname;
    //  console.log(path);
     let currentNav = navList.find(nav=>nav.path==path);
     if(currentNav){
        //  console.log(this.props);
        if(this.props.user.type=="hr"){
           navList[0].hide  = true;
        }else{
           navList[1].hide  = true;
        }
     }
        return (
            <div>
                {currentNav?(<NavBar  className="stick-header">{currentNav.title}</NavBar>):null}
                <Switch>
                    {
                        navList.map(item=>(<Route path={item.path} component={item.component} key={item.path}></Route>))
                    }
                    <Route path="/hr-info" component={HrInfo}></Route>
                    <Route path="/dr-info" component={DrInfo}></Route>
                    <Route path="/chat/:_id" component={Chat}></Route>
                </Switch>
                {currentNav?(<Footer navList={navList} unReadCount={this.props.unReadCount}></Footer>):null}
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user,unReadCount:state.chat.unReadCount}),
    {getuser}
)(Main)
