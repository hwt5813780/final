import React, { Component } from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Badge } from 'antd';
import { Link } from 'react-router-dom';
import history from './history';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

export default class HeaderCustom extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: props.collapsed,
        }
        this.logout = this.logout.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        this.onCollapse(nextProps.collapsed);
    }
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
        });
    };
    logout(){
        localStorage.removeItem("mspa_user");
        history.push('/login');
    }
    render(){
        return (
            <Header style={{ Height: '48px', background: '#fff', padding: 0 }} className="header">
                <LegacyIcon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.props.toggle}
                />
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '48px', float: 'right' }}
                >
                    <SubMenu 
                        title={<span>
                            <UserOutlined style={{fontSize:16, color: '#00aaff' }} />{this.props.username}
                        </span>}
                        >
                        <Menu.Item key="logout" style={{textAlign:'center'}} className="logout">
                            <span onClick={this.logout}>logout</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        );
    }
} 