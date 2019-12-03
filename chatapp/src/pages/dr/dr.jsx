import React, { Component } from 'react'
import {connect} from 'react-redux'
import UserList from '../../component/userlist/userlist'
import {getuserList} from '../../action/actions'
import {Redirect} from 'react-router-dom'
class DR extends Component {
    componentDidMount(){
        // console.log(this.props)
        this.props.getuserList("hr",this.props.userid);
    }
    render() {
        if(this.props.type!="dr"){
            return <Redirect to="/hr"></Redirect>
        }
        return (
            <div>
                <UserList userList={this.props.userList}></UserList>
            </div>
        )
    }
}
export default  connect(
    state=>({userList:state.userList,userid:state.user._id,type:state.user.type}),
    {getuserList}
)(DR)
