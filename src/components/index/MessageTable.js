import React, { Component } from 'react';
import { Table, Tag, Space, Icon, Popconfirm } from 'antd';
import moment from 'moment';

export default class InTable extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { checkChange, onDelete, editClick, dataSource, loading } = this.props;
        const rowSelection = {
                onChange: checkChange,
                getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };
        const columns = [
            {
            title: 'Profile',
            width: 50,
            dataIndex: 'profile',
            },
            {
            title: 'Name',
            width: 80,
            dataIndex: 'name',
            },
            {
            title: 'Written',
            width: 300,
            dataIndex: 'written',
            },
            {
            title: 'Phone',
            dataIndex: 'phone',
            width: 80,
            },
            {
            title: 'Mail',
            dataIndex: 'mail',
            width: 150,
            },
            {
            title: 'Time',
            dataIndex: 'time',
            width: 100,
            }
            ];

        return(
            <Table
                columns={columns}
                dataSource={dataSource}
                bordered={true}
                className='formTable'
                loading={loading}
            />
        )

    }
}
