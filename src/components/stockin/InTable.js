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
            title: 'ID',
            width: 100,
            dataIndex: 'id',
            },
            {
            title: 'Make',
            width: 100,
            dataIndex: 'make',
            },
            {
            title: 'Model',
            width: 100,
            dataIndex: 'model',
            },
            {
            title: 'Staff',
            dataIndex: 'staff',
            width: 100,
            },
            {
            title: 'Market Price',
            dataIndex: 'market price',
            width: 100,
            },
            {
            title: 'Cost Price',
            dataIndex: 'cost price',
            width: 100,
            },
            {
                title: 'Extra Info',
                dataIndex: 'extra info',
                width: 300,
            },
            {
            title: 'Date',
            dataIndex: 'date',
            width: 100,
            },
            {
            title: 'Action',
            dataIndex: 'opera',
            width: 80,
            render: (text, record) =>(
                <space size={"middle"}>
                    <a><Popconfirm
                        title="Notice:The car will be delete from stock"
                        okText="Yes" cancelText="No"
                        onConfirm={() => onDelete(record.key)}>Delete</Popconfirm></a>
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
