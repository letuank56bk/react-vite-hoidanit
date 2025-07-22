import { Input, notification } from 'antd';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { updateUserAPI } from '../../services/api.service';

const UpdateModalUser = (props) => {
    const { loadUser, isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate } = props;

    const [fullName, setFullName] = useState('');
    const [id, setId] = useState('');
    const [phone, setPhone] = useState('');

    // This effect runs when the modal opens or when dataUpdate changes
    useEffect(() => {
        if (dataUpdate) {
            setId(dataUpdate._id);
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone);
        if (res.data) {
            notification.success({
                message: "Update user",
                description: "Cập nhật thành công",
            })
            resetAndCloseModal(); // Reset form fields and close modal
            await loadUser(); // Reload user data
        } else {
            notification.error({
                message: "Error update user",
                description: JSON.stringify(res.message),
            });
        }
    }

    const resetAndCloseModal = () => {
        setFullName('');
        setPhone('');
        setId('');
        setIsModalUpdateOpen(false);
        // Cần reset biến setDataUpdate để tránh lỗi khi mở modal lần sau (dataUpdate vẫn giữ giá trị cũ)
        setDataUpdate(null);
    }

    return (
        <Modal
            title="Update User"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false} // Prevent closing by clicking outside the modal
            okText="Create"
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <span>Id</span>
                    <Input value={id} disabled />
                </div>
                <div>
                    <span>Full name</span>
                    <Input
                        value={fullName}
                        onChange={(e) => { setFullName(e.target.value) }} />
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