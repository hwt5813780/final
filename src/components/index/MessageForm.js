import React, { Component } from 'react';
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


class MessageForm extends Component{
    state = {
        autoCompleteResult: [],
    };
    constructor(props){
        super(props);
    }
    render(){
        const { visible, onCancel, onCreate, form, okText, title } = this.props;
        const { getFieldDecorator } = form;
        const { autoCompleteResult } = this.state;
        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 28 },
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
                    <FormItem  {...FormItemLayout} >
                        {getFieldDecorator('message', {
                            rules: [{ required: true, message: 'Can not be empty message' }],
                        })(
                            <Input.TextArea style={{height:100}} maxLength={300}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const CreateMessageForm = Form.create()(MessageForm);
export default CreateMessageForm;