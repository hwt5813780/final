import React, { Component } from 'react';
import { Modal, Upload, message, Form, Input, Radio, InputNumber, Button, Cascader, Select, AutoComplete } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
        ],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({ fileList }) => this.setState({ fileList });

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <div style={{ marginTop: 3 }}>Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

class CustomizedForm extends Component{
    state = {
        autoCompleteResult: [],
    };
    constructor(props){
        super(props);
    }
    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.cn', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };
    render(){
        const { visible, onCancel, onCreate, form, okText, title } = this.props;
        const { getFieldDecorator } = form;
        const { autoCompleteResult } = this.state;
        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 },
        };
        const FormItemLayout2 = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="horizontal" >
                    <FormItem label="ID" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('id', {
                            rules: [{ required: true, message: 'Enter the id' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Photo" {...FormItemLayout} >
                        <PicturesWall />
                    </FormItem>
                    <FormItem label="Make" {...FormItemLayout} >
                        {getFieldDecorator('make', {
                            rules: [{ required: true, message: 'Enter the make' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Model" {...FormItemLayout} >
                        {getFieldDecorator('model', {
                            rules: [{ required: true, message: 'Enter the model' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Extra Info" {...FormItemLayout} >
                        {getFieldDecorator('extra info', {
                            rules: [{ }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Location" {...FormItemLayout} >
                        {getFieldDecorator('location', {
                            rules: [{ required: true, message: 'Enter the location' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Year" {...FormItemLayout} >
                        {getFieldDecorator('year', {
                            rules: [{ required: true, message: 'Enter the year' }],
                        })(
                            <InputNumber min={1900} max={2099} step={1} />
                        )}
                    </FormItem>
                    <FormItem label="Kilometers" {...FormItemLayout} style={{height:39 }}>
                        <FormItem style={{ display: 'inline-flex'}} >
                        {getFieldDecorator('kilometers', {
                            rules: [{ required: false}],
                        })(
                            <InputNumber  style={{ width: 200 }} step={1}/>
                        )}
                        </FormItem>
                        <text style={{ display: 'inline-flex'}}>&ensp;km</text>
                    </FormItem>
                    <FormItem label="Fuel Type" {...FormItemLayout2} >
                        {getFieldDecorator('fuel type', {
                            rules: [{ }],
                        })(
                            <Radio.Group>
                                <Radio value="a">Petrol</Radio>
                                <Radio value="b">Diesel</Radio>
                                <Radio value="c">LPG</Radio>
                                <Radio value="d">CNG</Radio>
                                <Radio value="e">Electric</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>

                    <FormItem label="Transmission" {...FormItemLayout} >
                        {getFieldDecorator('transmission', {
                            rules: [{ }],
                        })(
                            <Radio.Group>
                                <Radio value="a">Automatic</Radio>
                                <Radio value="b">Manual</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem label="Owner Type" {...FormItemLayout} >
                        {getFieldDecorator('owner type', {
                            rules: [{ }],
                        })(
                            <Radio.Group>
                                <Radio value="a">First</Radio>
                                <Radio value="b">Second</Radio>
                                <Radio value="c">Third</Radio>
                                <Radio value="d">Forth & above</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem label="Mileage" {...FormItemLayout} style={{height:39 }}>
                        <FormItem style={{ display: 'inline-flex'}} >
                            {getFieldDecorator('mileage', {
                                rules: [{ required: false}],
                            })(
                                <InputNumber  style={{ width: 200 }} />
                            )}
                        </FormItem>
                        <text style={{ display: 'inline-flex'}}>&ensp;km/l</text>
                    </FormItem>
                    <FormItem label="Engine" {...FormItemLayout} style={{height:39 }}>
                        <FormItem style={{ display: 'inline-flex'}} >
                            {getFieldDecorator('engine', {
                                rules: [{ required: false}],
                            })(
                                <InputNumber  style={{ width: 200 }} />
                            )}
                        </FormItem>
                        <text style={{ display: 'inline-flex'}}>&ensp;CC</text>
                    </FormItem>
                    <FormItem label="Power" {...FormItemLayout} style={{height:39 }}>
                        <FormItem style={{ display: 'inline-flex'}} >
                            {getFieldDecorator('power', {
                                rules: [{ required: false}],
                            })(
                                <InputNumber  style={{ width: 200 }} />
                            )}
                        </FormItem>
                        <text style={{ display: 'inline-flex'}}>&ensp;bhp</text>
                    </FormItem>
                    <FormItem label="Seats" {...FormItemLayout} >
                        {getFieldDecorator('seats', {
                            rules: [{ required: false}],
                        })(
                            <InputNumber style={{ width: 50 }} min={1} max={99} step={1} />
                        )}
                    </FormItem>
                    <FormItem label="Price" {...FormItemLayout} >
                        {getFieldDecorator('price', {
                            rules: [{ required: false}],
                        })(
                            <InputNumber  style={{ width: 200 }} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const CollectionCreateForm = Form.create()(CustomizedForm);
export default CollectionCreateForm;