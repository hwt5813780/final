import React, { Component } from 'react';
import axios from 'axios';
import './form.less'
import Mock from 'mockjs';
import moment from 'moment';
import { message, Row, Col, Input, Icon, DatePicker, Button, Tooltip, Popconfirm } from 'antd';

import BreadcrumbCustom from '../common/BreadcrumbCustom';
import FormData from './request/formdata.json';
import CollectionCreateForm from './CustForm';
import CreateOutForm from './OutForm';
import FormTable from './FormTable';

const Search = Input.Search;
const InputGroup = Input.Group;
const options = [];
const { RangePicker } = DatePicker;
Mock.mock('/formdata', FormData);


//数组中是否包含某项
function isContains(arr, item){
    arr.map(function (ar) {
        if(ar === item){
            return true;
        }
    });
    return false;
}
//找到对应元素的索引
function catchIndex(arr, key){ //获取INDEX
    arr.map(function (ar, index) {
        if(ar.key === key){
            return index;
        }
    });
    return 0;
}
//替换数组的对应项
function replace(arr, item, place){ //arr 数组,item 数组其中一项, place 替换项
    arr.map(function (ar) {
        if(ar.key === item){
            arr.splice(arr.indexOf(ar),1,place)
        }
    });
    return arr;
}

export default class UForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            timeRange: '',
            visible: false, //新建窗口隐藏
            dataSource: [],
            count: FormData.length,
            selectedRowKeys: [],
            tableRowKey: 0,
            isCreate: false,
            isUpdate: false,
            isDelete: false,
            loading: true,
        };
    }
    //getData
    getData = () => {
        axios.get('/formdata')
            .then(function (response) {
                // console.log(response.data);
                this.setState({
                    dataSource: response.data,
                    loading:false
                })
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
    };
    //用户名输入
    onChangeUserName = (e) => {
        const value = e.target.value;
        this.setState({
            userName: value,
        })
    };
    //用户名搜索
    onSearchUserName = (value) => {
        // console.log(value);
        const { dataSource } = this.state;
        this.setState({
            dataSource: dataSource.filter(item => item.id.indexOf(value) !== -1),
            loading: false,
        })
    };
    //地址级联选择

    //时间选择
    //渲染
    componentDidMount(){
        this.getData();
    }
    //搜索按钮
    btnSearch_Click = () => {

    };
    //重置按钮
    btnClear_Click = () => {
        this.setState({
            userName: '',
            timeRange: '',
            dataSource: [],
            count: FormData.length,
        });
        this.getData();
    };
    //新建信息弹窗
    CreateItem = () => {
        this.setState({
            visible: true,
            isCreate: true,
            isUpdate: false,
            isDelete: false,
        });
        const form = this.form;
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
    //批量删除
    MinusClick = () => {
        const { dataSource, selectedRowKeys } = this.state;
        this.setState({
            dataSource: dataSource.filter(item => !isContains(selectedRowKeys, item.key)),
        });
    };
    //单个删除
    onDelete = () => {
        this.setState({
            visible: true,
            isCreate: false,
            isUpdate: false,
            isDelete: true,});
    };
    //确认删除
    ConfirmDelete = (key) => {
        const form = this.form;
        const { dataSource, tableRowKey } = this.state;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);

            values.key = tableRowKey;
            values.createtime = moment().format("YYYY-MM-DD hh:mm:ss");

            this.setState({
                visible: false,
                dataSource: replace(dataSource, tableRowKey, values)
            });
        });
    };
    //点击修改
    editClick = (key) => {
        const form = this.form;
        const { dataSource } = this.state;
        const index = catchIndex(dataSource, key);
        this.setState({
            visible: true,
            tableRowKey: key,
            isCreate: false,
            isUpdate: true,
            isDelete: false,
        });
    };
    //更新修改
    handleUpdate = () => {
        const form = this.form;
        const { dataSource, tableRowKey } = this.state;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);

            values.key = tableRowKey;
            values.createtime = moment().format("YYYY-MM-DD hh:mm:ss");

            this.setState({
                visible: false,
                dataSource: replace(dataSource, tableRowKey, values)
            });
        });
    };
    //单选框改变选择
    checkChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys: selectedRowKeys});
    };
    render(){
        const { userName,isCreate,isDelete, timeRange, selectedRowKeys: [],dataSource, visible, isUpdate, loading } = this.state;
        return(
            <div>
                <BreadcrumbCustom paths={['Home','Car List']}/>
                <div className='formBody'>
                    <Row gutter={16}>
                        <div className='btnOpera' style={{display:"flex",marginRight:'10px'}}>
                            <RangePicker size="large" />
                        </div>
                        <div className='function' >
                            <Button size="large" name='plus' onClick={this.CreateItem} type="primary"  style={{marginLeft:'10px'}}>Add Used Car</Button>
                            <Button size="large" type="primary" onClick={this.btnClear_Click} style={{marginLeft:'10px',background:'#f8f8f8', color: '#108ee9'}}>Reset List</Button>
                        </div>
                    </Row>
                    <FormTable
                        dataSource={dataSource}
                        checkChange={this.checkChange}
                        onDelete={this.onDelete}
                        editClick={this.editClick}
                        loading={loading}
                    />
                    {isCreate?<CollectionCreateForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleCreate} title="New Used Car" okText="Create"
                        /> : <a></a>}
                    {isUpdate?
                        <CollectionCreateForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleUpdate} title="Edit Used Car" okText="Complete"
                    /> : <a></a>}
                    {isDelete?
                        <CreateOutForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.ConfirmDelete} title="Car Sign Out" okText="Complete"
                        /> : <a></a>}
                </div>
            </div>
        )
    }
}