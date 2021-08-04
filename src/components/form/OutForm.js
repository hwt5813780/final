import React, { Component } from 'react';
import { Modal, Upload, message, Form, Input, Radio, InputNumber, Button, Cascader, Select, AutoComplete } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];


class OutForm extends Component{
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
                    <FormItem label="ID" {...FormItemLayout} disabled>
                        {getFieldDecorator('id', {
                            rules: [{ required:false }],
                        })(
                            <Input style={{ width: 200 }}/>
                        )}
                    </FormItem>
                    <FormItem label="Make" {...FormItemLayout} disabled>
                        {getFieldDecorator('make', {
                            rules: [{ required:false }],
                        })(
                            <Input style={{ width: 200 }}/>
                        )}
                    </FormItem>
                    <FormItem label="Model" {...FormItemLayout} disabled >
                        {getFieldDecorator('model', {
                            rules: [{ required:false }],
                        })(
                            <Input style={{ width: 200 }}/>
                        )}
                    </FormItem>
                    <FormItem label="Selling Price" {...FormItemLayout} >
                        {getFieldDecorator('selling price', {
                            rules: [{ required: true, message: 'Enter the selling price' }],
                        })(
                            <InputNumber  style={{ width: 200 }} />
                        )}
                    </FormItem>
                    <FormItem  label="Extra Info" {...FormItemLayout} >
                        {getFieldDecorator('extra info', {
                            rules: [{ required: false }],
                        })(
                            <Input.TextArea style={{height:100}} maxLength={300}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const CreateOutForm = OutForm;
export default CreateOutForm;