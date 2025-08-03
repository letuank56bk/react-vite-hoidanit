import { Input, Button, Form, notification, Row, Col, Divider, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/api.service';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useState, useContext } from 'react';
import { AuthContext } from '../components/context/auth.context';

const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Access the user and setUser from AuthContext (Global State)
    const { user, setUser } = useContext(AuthContext);

    const onFinish = async (values) => {
        setLoading(true);
        const res = await loginAPI(values.email, values.password);
        if (res.data) {
            message.success('Đăng nhập thành công!');
            localStorage.setItem('access_token', res.data.access_token); // Store access token in local storage
            setUser(res.data.user); // Update user context with the logged-in user data
            navigate('/'); // Redirect to home page after successful login
        } else {
            notification.error({
                message: 'Đăng nhập thất bại',
                description: JSON.stringify(res.message),
            });
        }
        setLoading(false);
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
                            <Input.Password onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    form.submit();
                                }
                            }} />
                        </Form.Item>
                        <Form.Item>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Button loading={loading} type="primary" onClick={() => { form.submit() }}>Login</Button>
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