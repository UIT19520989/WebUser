import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Button, Row, Col, Typography, Form, Input, Switch } from 'antd';
import signinbg from '../../assets/imgs/img-signin.png';
import HeaderCo from '~/components/HeaderCo';
import FooterCo from '~/components/FooterCo';
import './SignIn.css';
import { loginUser } from '~/redux/apiRequest';
import { useDispatch } from 'react-redux';
function onChange(checked) {
    console.log(`switch to ${checked}`);
}

const { Title } = Typography;
const { Content } = Layout;

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = (values) => {
        const { username, password } = values;
        const user = {
            username,
            password,
        };

        loginUser(user, dispatch, navigate);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout className="layout-default layout-signin">
            <HeaderCo />
            <Content className="signin">
                <Row gutter={[24, 0]} justify="space-around">
                    <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
                        <Title className="mb-15">Sign In</Title>
                        <Title className="font-regular text-muted" level={5}>
                            Enter your username and password to sign in
                        </Title>
                        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" className="row-col">
                            <Form.Item
                                className="username"
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input placeholder="Username" />
                            </Form.Item>

                            <Form.Item
                                className="username"
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>

                            <Form.Item name="remember" className="aligin-center" valuePropName="checked">
                                <>
                                    <Switch defaultChecked onChange={onChange} />
                                    Remember me
                                </>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    SIGN IN
                                </Button>
                            </Form.Item>
                            <p className="font-semibold text-muted">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-dark font-bold">
                                    Sign Up
                                </Link>
                            </p>
                        </Form>
                    </Col>
                    <Col
                        className="sign-img"
                        style={{ padding: 12 }}
                        xs={{ span: 24 }}
                        lg={{ span: 12 }}
                        md={{ span: 12 }}
                    >
                        <img src={signinbg} alt="" />
                    </Col>
                </Row>
            </Content>
            <FooterCo />
        </Layout>
    );
}

export default SignIn;
