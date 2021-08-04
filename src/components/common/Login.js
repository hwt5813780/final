import React, { Component } from 'react';
import '../../style/login.less';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Checkbox, message, Spin } from 'antd';
const FormItem = Form.Item;

const login = [{
    username:'admin',
    password:'admin'
},{
    username:'zysoft',
    password:'zysoft'
}];

function PatchUser(values) {  //匹配用户
    const results = login.map(function(item){
        if(values.username === item.username && values.password === item.password){
            return 1;
        }else{
            return 0;
        }
    });
    return results.includes(1);
}

class NormalLoginForm extends Component {
    state = {
        isLoding:false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if(PatchUser(values)){
                    this.setState({
                        isLoding: true,
                    });

                    localStorage.setItem('mspa_user',JSON.stringify(values));
                    message.success('login successfully!'); //成功信息
                    let that = this;
                    setTimeout(function() { //延迟进入
                        that.props.history.push({pathname:'/app',state:values});
                    }, 2000);

                }else{
                    message.error('login failed!'); //失败信息
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.state.isLoding?<Spin size="large" className="loading" />:
            <div className="login">
                <div className="logo-name">
                    <img style={{width:'250px',marginBottom:'50px'}} className="logo" src={require('../../style/img/logo2.png')}></img>
                </div>
                <div className="login-form">
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '368px'}}>
                        <FormItem className="username">
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input size="large"  placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem className="password">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input size="large"  type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem style={{marginBottom:'0'}}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float:'right'}}>Forgot password</a>
                            <Button size="large" type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                Sign in
                            </Button>
                            Or <a href="">Register</a>
                        </FormItem>
                    </Form>
                    <a className="githubUrl" href=""></a>
                </div>
            </div>
        );
    }
}

const Login = Form.create()(NormalLoginForm);
export default Login;