import React, { Component } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Button, Input } from 'antd';
import moment from 'moment';

export default class FormTable extends Component{
    state = {
        searchText: '',
        searchedColumn: '',
        filteredInfo: null,
        sortedInfo: null,
    };
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <div>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </div>
            </div>
        ),
        filterIcon: filtered =><SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                text
            ) : (
                text
            ),
    });
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };

    setAgeSort = () => {
        this.setState({
            sortedInfo: {
                order: 'descend',
                columnKey: 'age',
            },
        });
    };
    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
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
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [
            {
            title: 'ID',
            width: 150,
            dataIndex: 'id',
            sorter: (a, b) => a.id.localeCompare(b.id),
            ...this.getColumnSearchProps('id'),
            multiple: 1,
            fixed:'left',
            },
            {
            title: 'Make',
            width: 150,
            dataIndex: 'make',
                sorter: (a, b) => a.make.localeCompare(b.make),
                ...this.getColumnSearchProps('make'),
            multiple: 2,
            fixed:'left',
            },
            {
            title: 'Model',
            width: 150,
            dataIndex: 'model',
                sorter: (a, b) => a.model.localeCompare(b.model),
                ...this.getColumnSearchProps('model'),
            fixed:'left',
            },
            {
            title: 'Extra Info',
            dataIndex: 'extra_info',
            width: 200,
                ...this.getColumnSearchProps('extra_info'),
            },
            {
            title: 'Location',
            dataIndex: 'location',
            width: 150,
                sorter: (a, b) => a.location.localeCompare(b.location),
                ...this.getColumnSearchProps('location'),
            },
            {
            title: 'Year',
            dataIndex: 'year',
            width: 150,
                sorter: (a, b) => a.year.localeCompare(b.year),
                ...this.getColumnSearchProps('year'),
            },
            {
            title: 'Kilometers',
            dataIndex: 'kilometers',
            width: 150,
                sorter: (a, b) => a.kilometers.localeCompare(b.kilometers),
                ...this.getColumnSearchProps('kilometers'),
            },
            {
            title: 'Fuel Type',
            dataIndex: 'fuel_type',
            width: 150,
                filters: [
                    {
                        text: 'CNG',
                        value: 'CNG',
                    },
                    {
                        text: 'Diesel',
                        value: 'Diesel',
                    },
                    {
                        text: 'Petrol',
                        value: 'Petrol',
                    },
                    {
                        text: 'LPG',
                        value: 'LPG',
                    },
                    {
                        text: 'Electric',
                        value: 'Electric',
                    },
                ],
                onFilter: (value, record) => record.fuel_type.indexOf(value) === 0,
            },
            {
            title: 'Transmission',
            dataIndex: 'transmission',
            width: 150,
                filters: [
                    {
                        text: 'Automatic',
                        value: 'Automatic',
                    },
                    {
                        text: 'Manual',
                        value: 'Manual',
                    },
                ],
                onFilter: (value, record) => record.transmission.indexOf(value) === 0,
            },
            {
            title: 'Owner Type',
            dataIndex: 'owner_type',
            width: 150,
                filters: [
                    {
                        text: 'First',
                        value: 'First',
                    },
                    {
                        text: 'Second',
                        value: 'Second',
                    },
                    {
                        text: 'Third',
                        value: 'Third',
                    },
                    {
                        text: 'Fourth & Above',
                        value: 'Fourth & Above',
                    },

                ],
                onFilter: (value, record) => record.owner_type.indexOf(value) === 0,
            },
            {
            title: 'Fuel Efficiency',
            dataIndex: 'fuel_efficiency',
            width: 150,
                sorter: (a, b) => a.fuel_efficiency.localeCompare(b.fuel_efficiency),
                ...this.getColumnSearchProps('fuel_efficiency'),

            },
            {
            title: 'Engine',
            dataIndex: 'engine',
            width: 150,
                sorter: (a, b) => a.engine.localeCompare(b.engine),
                ...this.getColumnSearchProps('engine'),
            },
            {
            title: 'Power',
            dataIndex: 'power',
            width: 150,
                sorter: (a, b) => a.power.localeCompare(b.power),
                ...this.getColumnSearchProps('power'),
            },
            {
            title: 'Seats',
            dataIndex: 'seats',
            width: 150,
                sorter: (a, b) => a.seats.localeCompare(b.seats),
                ...this.getColumnSearchProps('seats'),
            },
            {
            title: 'Buying Price',
            dataIndex: 'buying_price',
            width: 150,
                sorter: (a, b) => a.buying_price.localeCompare(b.buying_price),
                ...this.getColumnSearchProps('buying_price'),
            },
            {
            title: 'Market Price',
            dataIndex: 'market_price',
            width: 150,
                sorter: (a, b) => a.market_price.localeCompare(b.market_price),
                ...this.getColumnSearchProps('market_price'),
            },
            {
            title: 'Purchaser',
            dataIndex: 'purchaser',
            width: 150,
                ...this.getColumnSearchProps('purchaser'),
            },
            {
            title: 'Car-In Date',
            dataIndex: 'car_in_date',
            width: 150,
                defaultSortOrder: 'descend',
                sorter: (a, b) => moment(a.car_in_date) - moment(b.car_in_date),
            },
            {
            title: 'Action',
            dataIndex: 'opera',
            fixed:'right',
            width: 150,
            render: (text, record) =>(
                <div size={"middle"}>
                    <a onClick={() => editClick(record.key)}>Edit</a>
                    <a style={{marginLeft:30}} onClick={() => onDelete(record.key)}>Out</a>
                </div>)
        }];

        return(
            <Table
                columns={columns}
                dataSource={dataSource}
                bordered={true}
                scroll={{x:'123%'}}
                className='formTable'
                loading={loading}
            />
        )

    }
}
