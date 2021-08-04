import React, { Component } from 'react';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import {
    Modal,
    Upload,
    message,
    Input,
    Radio,
    InputNumber,
    Button,
    Cascader,
    Select,
    AutoComplete,
} from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
    state = {
        loading: false,
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <UploadOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
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
                    <FormItem label="Profile" {...FormItemLayout} >
                        <Avatar />
                    </FormItem>
                    <FormItem label="Name" {...FormItemLayout} >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Enter the name' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Position" {...FormItemLayout} >
                        {getFieldDecorator('position', {
                            rules: [{ required: true, message: 'Enter the position' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Phone" {...FormItemLayout} >
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Enter the phone' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Email" {...FormItemLayout} >
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Enter the email' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const CollectionCreateForm = Form.create()(CustomizedForm);
export default CollectionCreateForm;