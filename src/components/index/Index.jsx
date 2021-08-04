import React, { Component } from 'react'; 
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import { Card, Avatar, Row, Col, Button, Statistic, Table, Icon } from 'antd';
import zysoft from '../../style/img/avatar.jpg';
import './index.less';
import CountUp from 'react-countup';
import ReactEcharts from 'echarts-for-react';
import CreateMessageForm from './MessageForm';
import axios from "axios";
import moment from "moment";
import CollectionCreateForm from "../form/CustForm";
import FormData from './request/messagedata.json';
import FormTable from './MessageTable';
import MessageForm from "./MessageForm";
const { Meta } = Card;


const data = [{
    key: '1',
    profile: <Avatar style={{ backgroundColor: '#f56a00' }}>Z</Avatar>,
    name: 'John Brown',
    phone: '7894 685 275',
    written: 'Please take the used cars of Jack out of the warehouse！',
    mail: 'marinus.jagesar@example.com',
    time: '2015-03-01 17:55:21',
}, {
    key: '2',
    profile: <Avatar style={{ backgroundColor: '#7265e6' }}>H</Avatar>,
    name: 'Jim Green',
    phone: '7824 234 123',
    written: 'I have added 23 used cars on 03/02/2021',
    mail: 'zachary.lavigne@example.com',
    time: '2015-06-03 18:22:13',
},{
    key: '3',
    profile: <Avatar style={{ backgroundColor: '#ffbf00' }}>A</Avatar>,
    name: 'Joe Black',
    phone: '7835 214 634',
    written: 'Do not add more Volvo cars without any labels.',
    mail:'levi.willis@example.com',
    time: '2016-01-02 23:11:01',
},{
    key: '4',
    profile: <Avatar style={{ backgroundColor: '#00a2ae' }}>O</Avatar>,
    name: 'Jim Red',
    phone: '7454 088 045',
    written: 'I have added 41 used cars on 15/02/2021',
    mail: 'tobias.pedersen@example.com',
    time: '2016-12-21 13:03:59',
},{
    key: '5',
    profile: <Avatar style={{ backgroundColor: '#48ae6a' }}>Y</Avatar>,
    name: 'Jake White',
    phone: '7152 251 213',
    written: 'Some car information is not complete, please check that',
    mail: 'lígio.carvalho@example.com',
    time: '2017-03-06 10:19:07',
},{
    key: '6',
    profile: <Avatar style={{ backgroundColor: '#ae007c' }}>U</Avatar>,
    name: 'Smith White',
    phone: '7122 151 233',
    written: 'The warehouse will be closed on the next Sunday, please notice that.',
    mail: 'samuel.leon@example.com',
    time: '2017-11-03 13:43:33',
}];

export default class MIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            timeRange: '',
            visible: false, //新建窗口隐藏
            dataSource: [],
            count: data.length,
            selectedRowKeys: [],
            tableRowKey: 0,
            isUpdate: false,
            loading: true,
        };
    }
    //地址级联选择

    //时间选择
    //渲染
    //重置按钮

    //新建信息弹窗
    CreateItem = () => {
        this.setState({
            visible: true,
            isUpdate: false,
        });
        const form = this.form;
        form.resetFields();
    };
    //接受新建表单数据
    saveFormRef = (form) => {
        this.form = form;
    };
    //填充表格行
    handleCreate = () => {
        const { dataSource, count } = this.state;
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);

            values.key = count;
            values.createtime = moment().format("YYYY-MM-DD hh:mm:ss");

            form.resetFields();
            this.setState({
                visible: false,
                dataSource: [...dataSource, values],
                count: count+1,
            });
        });
    };
    //取消
    handleCancel = () => {
        this.setState({ visible: false });
    };
    CountUp(){
        let today = ["Car In Today(Number)","Car Out Today(Number)","Cost Today","Selling Today"];
        let yesterday = ["Car In","Car Out","Cost","Selling"];
        let TCount = ["21","19","412.25","612.43"];
        let YCount = ["17","23","334.12","432.52"];
        let cu = today.map(function(item,index){
            return(
                <Col md={6} key={item}>
                    <Card bordered={false} style={{Height:182,marginBottom:24 }}>
                        <Row gutter={16} style={{marginBottom:24}}>
                            <Col span={12}>
                                <Statistic title={today[index]} valueStyle={{ fontSize:28}} value={TCount[index]} />
                            </Col>
                            <Col span={12}>
                                <h2></h2>
                                <Statistic title="Yesterday" valueStyle={{ fontSize:18}} value={YCount[index]}/>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Statistic
                                    title="Daily Rate"
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{ color: '#479200',fontSize:14}}
                                    prefix={<Icon type="arrow-up" />}
                                    suffix="%"
                                />
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title="Week-on-week"
                                    value={-3.28}
                                    precision={2}
                                    valueStyle={{ color: '#a81919',fontSize:14 }}
                                    prefix={<Icon type="arrow-down" />}
                                    suffix="%"
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            )
        });
        return cu;
    }
    getNumberOption(){
        let option = {
            backgroundColor: "#fff",
            color: ['rgb(151,201,235)', 'rgb(246,152,152)'],
            title: [{
                text: 'Car Quantity',
                left: '2%',
                top: '6%',
                textStyle: {
                    fontSize: 14.0,
                    fontWeight:'normal',
                },
            }],
            tooltip: {
                trigger: 'axis'
            },
            grid:{
                left:'6%',
                width:'90%',
            },
            legend: {
                //x: 300,
                top: '7%',
                right: '3%',
                textStyle: {
                    color: 'gray',
                },
                data: ['Car In', 'Car Out']
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine:{
                    lineStyle:{
                        color:'lightgray',
                    },
                },
                axisLabel:{
                    color:'gray'
                },
                data: ['31/07', '01/08', '02/08', '03/08', '04/08', '05/08', '06/08']
            },
            yAxis: {
                min: 0,
                max: 100,
                type: 'value',
                axisLine:{
                    lineStyle:{
                        color:'lightgray',
                    },
                },
                axisLabel:{
                    color:'gray'
                },
            },
            series: [{
                name: 'Car In',
                smooth: true,
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                data: [10, 40, 32, 20, 80, 90, 97]
            }, {
                name: 'Car Out',
                smooth: true,
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                data: [70, 50, 50, 87, 90, 80, 70]
            }]
        };
        return option;
    }
    getValueOption(){
        let option = {
            backgroundColor: "#fff",
            color: ['rgb(83,199,41)', 'rgb(103,111,186)'],
            title: [{
                text: 'Costs & Sales',
                left: '2%',
                top: '6%',
                textStyle: {
                    fontSize: 14.0,
                    fontWeight:'normal',
                },
            }],
            tooltip: {
                trigger: 'axis'
            },
            grid:{
                left:'6%',
                width:'90%',
            },
            legend: {
                //x: 300,
                top: '7%',
                right: '3%',
                textStyle: {
                    color: 'gray',
                },
                data: ['cost', 'sale']
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine:{
                    lineStyle:{
                        color:'lightgray',
                    },
                },
                axisLabel:{
                    color:'gray'
                },
                data: ['31/07', '01/08', '02/08', '03/08', '04/08', '05/08', '06/08']
            },
            yAxis: {
                min: 0,
                max: 500,
                type: 'value',
                axisLine:{
                    lineStyle:{
                        color:'lightgray',
                    },
                },
                axisLabel:{
                    color:'gray'
                },
            },
            series: [{
                name: 'cost',
                smooth: true,
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                data: [231.23, 152.13, 254.15, 231.34, 153.63, 335.52, 197.31]
            }, {
                name: 'sale',
                smooth: true,
                type: 'line',
                symbolSize: 8,
                symbol: 'circle',
                data: [421.81, 235.25, 313.54, 213.24, 325.24, 334.12, 212.14]
            }]
        };
        return option;
    }
    render() {
        const { userName, timeRange, selectedRowKeys: [],dataSource, visible, isUpdate, loading } = this.state;
        return (
            <div style={{position:"relative",top:'24px'}}>
                <div className='mindex'>
                    <Row gutter={16}>
                        {this.CountUp()}
                    </Row>
                    <Row gutter={16}>
                        <Col md={12}>
                            <Card
                                bordered={false}
                                style={{marginBottom:24}}
                                bodyStyle={{padding: 0,height:'277px',overflow:'hidden'}}>
                                <ReactEcharts
                                    option={this.getNumberOption()}
                                />
                            </Card>
                        </Col>
                        <Col md={12}>
                            <Card
                                bordered={false}
                                style={{marginBottom:24}}
                                bodyStyle={{padding: 0,height:'277px',overflow:'hidden'}}>
                                <ReactEcharts
                                    option={this.getValueOption()}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Card bordered={false}>
                                <Row>
                                    <div style={{display:"flex",marginBottom:'20px',float: "right"}}>
                                        <Button size="large" type="primary" onClick={this.CreateItem} >Post Message</Button>
                                    </div>
                                    <div >
                                        <h3>Message board</h3>
                                    </div>
                                </Row>
                                <Row>
                                    <FormTable
                                        dataSource={data}
                                        pagination = {false}
                                        checkChange={this.checkChange}
                                        onDelete={this.onDelete}
                                        editClick={this.editClick}
                                    />
                                    {isUpdate?
                                        <CreateMessageForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleUpdate} title="Edit Used Car" okText="Complete"
                                        /> : <CreateMessageForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleCreate} title="New Message" okText="Post"
                                        />}
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
   