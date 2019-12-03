import React, { Component } from 'react'
import {Grid,List} from 'antd-mobile';
import PropTypes from 'prop-types';
export default class HeaderSelector extends Component {
    static propTypes = {
        setHeader:PropTypes.func.isRequired
    }
    constructor(){
        super();
        this.headerList = [];
        for(let i = 0;i<20;i++){
            this.headerList.push({
                text:`头像${i+1}`,
                icon:require(`../../assets/images/头像${i+1}.png`)
            })
        }
    }
    state={
        icon:null
    }
    handleSelect=({text,icon})=>{
        this.setState({
            icon:icon
        })
        this.props.setHeader(text);
    }
    render() {
        let {icon} = this.state;
        let headerText = icon?(<div>
            已经选择头像：<img src={icon} />
        </div>):"请选择头像"
        return (
            <div>
                <List renderHeader={()=>headerText}>
                    <Grid data={this.headerList}
                    columnNum={5}
                    onClick={(el)=>{this.handleSelect(el)}}
                    >

                    </Grid>
                </List>

            </div>
        )
    }
}
