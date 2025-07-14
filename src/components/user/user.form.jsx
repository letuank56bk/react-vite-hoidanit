import { Input, notification } from 'antd';
import { Button } from 'antd';
import { useState } from 'react';
import { createUserAPI } from '../../services/api.service';


const UserForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleClickBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        // Data đã được xử lý thông qua interceptor
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Tạo user thành công",
            })
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message),
            });
        }
    }

    return (
        <div className="user-form" style={{ margin: '20px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <span>Full name</span>
                    <Input
                        value={fullName}
                        onChange={(e) => { setFullName(e.target.value) }} />
                </div>
                <div>
                    <span>Email</span>
                    <Input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value) }}
                    />
                </div>
                <div>
                    <Button
                        type="primary"
                        onClick={() => handleClickBtn()}
                    >Create User</Button>
                </div>
            </div>
        </div>
    );
}

export default UserForm;