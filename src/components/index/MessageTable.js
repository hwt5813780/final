import React, { Component } from 'react';
import { Table, Tag, Space, Popconfirm } from 'antd';
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
            dataIndex: 'profile',
            width: 50,
            },
            {
            title: 'Name',
            dataIndex: 'name',
            },
            {
            title: 'Written',
            dataIndex: 'written',
            },
            {
            title: 'Phone',
            dataIndex: 'phone',
            },
            {
            title: 'Mail',
            dataIndex: 'mail',
            },
            {
            title: 'Time',
            dataIndex: 'time',
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
