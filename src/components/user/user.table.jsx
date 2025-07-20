import { Table, Popconfirm, notification } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UserUpdateModal from './update.user.modal';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../services/api.service';

const UserTable = (props) => {
    const { dataUser, loadUser } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState();

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState();

    const handleDeleteUser = async (_id) => {
        const res = await deleteUserAPI(_id);
        if (res.data) {
            notification.success({
                message: "Delete user",
                description: "Xóa user thành công",
            });
            await loadUser(); // Reload user data
        } else {
            notification.error({
                message: "Error delete user",
                description: JSON.stringify(res.message),
            });
        }
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return <a
                    onClick={() => {
                        setDataDetail(record);
                        setIsDetailOpen(true);
                    }}
                >{record._id}</a>;
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <EditOutlined
                            style={{ cursor: "pointer", color: "orange" }}
                            onClick={() => {
                                setDataUpdate(record);
                                setIsModalUpdateOpen(true);
                            }} />
                        <Popconfirm
                            placement="left"
                            title="Xóa người dùng"
                            description="Bạn có chắc chắn muốn xóa người dùng này không?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleDeleteUser(record._id)}
                        >
                            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                        </Popconfirm>
                    </div>
                )
            },
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataUser}
                rowKey="_id"
            />
            <UserUpdateModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
        </>

    )
}

export default UserTable;