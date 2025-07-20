import { Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import UserUpdateModal from './update.user.modal';
import { useState } from 'react';

const UserTable = (props) => {
    const { dataUser } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState();

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return <a>{record._id}</a>;
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
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
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
            />
        </>

    )
}

export default UserTable;