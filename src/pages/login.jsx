import { Input, Button, Form, notification, Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { registerUserAPI } from '../services/api.service';
import { ArrowRightOutlined } from '@ant-design/icons';

const LoginPage = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log('Login values:', values);
    }


    return (
        <Row justify={"center"}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: '15px',
                    margin: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',

                }}>
                    <legend>Đăng Nhập</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'The input is not valid E-mail!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Button type="primary" onClick={() => { form.submit() }}>Login</Button>
                                <Link to={'/'}>Go to home page <ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>

                        <Divider />
                        <div style={{ textAlign: 'center' }}>Chưa có tài khoản? <Link to={'/register'}>Đăng ký tại đây</Link></div>
                    </Form>
                </fieldset>
            </Col>
        </Row>
    )
}

export default LoginPage;