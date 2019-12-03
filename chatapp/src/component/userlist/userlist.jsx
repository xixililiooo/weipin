import React, { Component } from 'react'
import {PropTypes} from 'prop-types'
import {WingBlank,WhiteSpace,Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import "../../assets/css/index.css"
let Header = Card.Header;
let Body = Card.Body;
 class UserLIst extends Component {
    static propTypes = {
        userList:PropTypes.array.isRequired
    }
    render() {
        let {userList} = this.props;
        return (
            <div style={{marginBottom:50,marginTop:50}}>
                {
                    userList.map((item,index)=>
                        (
                            <WingBlank key={index}>
                            <Card onClick={()=>{this.props.history.push(`/chat/${item._id}`)}}>
                                <Header thumb={<img src={require(`../../assets/images/${item.header}.png`)}/>}
                                extra={item.username}
                                >
                                </Header>
                                <Body>
                                    <div>职位:{item.position}</div>
                                    {
                                        item.company?(
                                            <div>公司:{item.company}</div>
                                        ):null
                                    }
                                    {
                                        item.salary?(
                                            <div>薪资:{item.salary}</div>
                                        ):null
                                    }
                                    <div>简介:{item.info}</div>
                                </Body>
                            </Card>
                            <WhiteSpace />
                            </WingBlank>
                        )
                        )
                }
          
            </div>
        )
    }
}
export default withRouter(UserLIst);
