import React, { Component } from 'react'
import {connect} from 'react-redux'
import UserList from '../../component/userlist/userlist'
import {getuserList} from '../../action/actions'
import {Redirect} from 'react-router-dom'
class HR extends Component {
    componentDidMount(){
        // console.log(this.props)
        this.props.getuserList("dr",this.props.userid);
    }
    render() {
        if(this.props.type!="hr"){
            return <Redirect to="/dr"></Redirect>
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
)(HR)
