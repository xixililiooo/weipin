import React, { Component } from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import "../../assets/css/index.css"
const Item = TabBar.Item;
 class Footer extends Component {
     static propTypes = {
         navList:PropTypes.array.isRequired,
         unReadCount:PropTypes.number.isRequired
     }
    render() {
        let path = this.props.location.pathname;
        let {navList} = this.props;
        // console.log(navList);
        navList= navList.filter(nav=>!nav.hide);
        // console.log(navList);
        return (
            <div>
                <TabBar className="stick_tab">
                    {
                        navList.map(item=>(
                        <Item title={item.title}
                        badge={item.path=="/message"&&this.props.unReadCount>0?this.props.unReadCount:0}
                        key={item.path}
                        icon={{uri:require(`./images/${item.icon}.png`)}}
                        selectedIcon={{uri:require(`./images/${item.icon}-select.png`)}}
                        selected={path==item.path}
                        onPress={()=>{
                            this.props.history.replace(item.path);
                        }}
                        ></Item>
                        
                        ))
                    }
                </TabBar>
            </div>
        )
    }
}
export default withRouter(Footer);
