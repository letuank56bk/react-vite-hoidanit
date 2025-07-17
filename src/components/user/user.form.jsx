import { Input, notification } from 'antd';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { createUserAPI } from '../../services/api.service';


const UserForm = (props) => {
    const { loadUser } = props;

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Tạo user thành công",
            })
            resetAndCloseModal(); // Reset form fields and close modal
            await loadUser(); // Reload user data
        } else {
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message),
            });
        }
    }

    const resetAndCloseModal = () => {
        setFullName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setIsModalOpen(false);
    }

    return (
        <div className="user-form" style={{ margin: '20px 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>Table Users</h3>
                    <Button
                        type="primary"
                        onClick={() => setIsModalOpen(true)}
                    >Create User</Button>
                </div>
            </div>

            <Modal
                title="Create User"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false} // Prevent closing by clicking outside the modal
                okText="Create"
            >
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
                </div>
            </Modal>
        </div>
    );
}

export default UserForm;