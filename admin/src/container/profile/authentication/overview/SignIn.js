import React from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import Heading from '../../../../components/heading/heading';
import {Main} from "../../../styled"

const SignIn = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.utilities.loading);
    const [form] = Form.useForm();

    const handleSubmit = (data) => {
        dispatch(login(data));
    };

    return (
        <Main style={{height: '100vh'}}>
            <AuthWrapper>
                <div className="auth-contents">
                    <Form name="login" className="login-form" form={form} onFinish={handleSubmit} layout="vertical">
                        <Heading as="h3">
                            <img style={{ width: '150px' }} src={require('../../../../static/img/unishopr-logo.png')} alt="" />
                        </Heading>
                        <Form.Item
                            name="email"
                            rules={[{ message: 'Please input your Email!', required: true }]}
                            label="Email or Username"
                        >
                            <Input placeholder={'Email or Username'}/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ message: 'Please input your Password!', required: true }]}
                            label="Password">
                            <Input placeholder="Password" type={'password'}/>
                        </Form.Item>
                        <Form.Item>
                            <Button className="btn-signin mt-10" htmlType="submit" type="primary" size="large">
                                {isLoading ? 'Loading...' : 'Sign In'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </AuthWrapper>
        </Main>
    );
};

export default SignIn;
