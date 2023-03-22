import React from 'react';
import { Layout, Button, Typography, Card, Form, Input, Checkbox } from 'antd';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import HeaderCo from '~/components/HeaderCo';
import FooterCo from '~/components/FooterCo';
import { useDispatch } from 'react-redux';
import { registerUser } from '~/redux/apiRequest';
// import '~/assets/styles/responsive.css';

const { Title } = Typography;
const { Content } = Layout;

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
        const { username, email, password } = values;
        const newUser = {
            username,
            email,
            password,
        };
        registerUser(newUser, dispatch, navigate);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="layout-default ant-layout layout-sign-up">
            <HeaderCo />
            <Content className="p-0">
                <div className="sign-up-header">
                    <div className="content">
                        <Title>Sign Up</Title>
                    </div>
                </div>

                <Card
                    className="card-signup header-solid h-full ant-card pt-0"
                    title={<h5>Register with</h5>}
                    bordered="false"
                >
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        className="row-col"
                    >
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                        </Form.Item>
                        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value
                                            ? Promise.resolve()
                                            : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}
                        >
                            <Checkbox>
                                I agree the{' '}
                                <a href="#pablo" className="font-bold text-dark">
                                    Terms and Conditions
                                </a>{' '}
                            </Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button style={{ width: '100%', marginTop: '10px' }} type="primary" htmlType="submit">
                                SIGN UP
                            </Button>
                        </Form.Item>
                    </Form>
                    <p className="font-semibold text-muted text-center">
                        Already have an account?{' '}
                        <Link to="/signin" className="font-bold text-dark">
                            Sign In
                        </Link>
                    </p>
                </Card>
            </Content>
            <FooterCo />
        </div>
    );
};

export default SignUp;
