import React, { Component } from 'react';
import { Table, Tag, Space, Icon, Popconfirm } from 'antd';
import moment from 'moment';

export default class FormTable extends Component{
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
                title: 'ID',
                width: 50,
                dataIndex: 'id',
            },
            {
                title: 'Profile',
                width: 50,
                dataIndex: 'profile',
                render: (record) => <img src={record} style={{width:'50px',borderRadius:'50%'}} />,
            },
            {
                title: 'Name',
                width: 100,
                dataIndex: 'name',
            },
            {
                title: 'Position',
                width: 100,
                dataIndex: 'position',
            },
            {
                title: 'Phone',
                width: 100,
                dataIndex: 'phone',
            },
            {
                title: 'Email',
                width: 150,
                dataIndex: 'email',
            },
            {
                title: 'Purchase Quantity',
                dataIndex: 'purchase quantity',
                width: 100,
            },
            {
                title: 'Purchase Cost',
                dataIndex: 'purchase cost',
                width: 100,
            },
            {
                title: 'Sale Quantity',
                dataIndex: 'sale quantity',
                width: 100,
            },
            {
                title: 'Sale Value',
                dataIndex: 'sale value',
                width: 100,
            },
            {
                title: 'Action',
                dataIndex: 'opera',
                width: 100,
                render: (text, record) =>(
                    <space size={"middle"}>
                        <a onClick={() => editClick(record.key)}>Edit</a>
                        <a style={{marginLeft:30}}><Popconfirm title="Are you sure to delete this staff member?" okText="Yes" cancelText="No" onConfirm={() => onDelete(record.key)}>Delete</Popconfirm></a>
                    </space>)
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
