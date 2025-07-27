import { Input, Button, Form, notification } from 'antd';
import { registerUserAPI } from '../services/api.service';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const res = await registerUserAPI(values.fullName, values.email, values.password, values.phone);
        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Đăng ký user thành công",
            });
            form.resetFields(); // Reset form fields after successful registration
            navigate('/login'); // Redirect to login page after registration
        } else {
            notification.error({
                message: "Error register user",
                description: JSON.stringify(res.message),
            });
        }

    }
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >
            <div style={{
                margin: '50px',
            }}>
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                        { required: true, message: 'Please input your username!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/\d+/g),
                            message: "Wrong format!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <div>
                    <Button onClick={() => { form.submit() }} type="primary">Register</Button>
                </div>
            </div>
        </Form>
    )
}

export default RegisterPage;