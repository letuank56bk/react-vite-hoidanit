import { Input, notification } from 'antd';
import { Modal } from 'antd';
import { useState } from 'react';
import { createUserAPI } from '../../services/api.service';


const UpdateModalUser = (props) => {
    const { loadUser } = props;

    const [isModalOpen, setIsModalOpen] = useState(true);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmitBtn = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if (res.data) {
            notification.success({
                message: "Create user",
                description: "Tạo user thành công",
            })
            resetAndCloseModal(); // Reset form fields and close modal
            // await loadUser(); // Reload user data
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
        <Modal
            title="Update User"
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
    )
}

export default UpdateModalUser;