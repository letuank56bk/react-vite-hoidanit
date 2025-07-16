import { Table } from 'antd';
import { fetchAllUsersAPI } from '../../services/api.service';
import { useState, useEffect } from 'react';

const UserTable = () => {
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        console.log('run Effect 111');
        loadUser();
    }, []);

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
    ];

    const loadUser = async () => {
        const res = await fetchAllUsersAPI();
        setDataUser(res.data);
    }
    console.log('run render: 0000');

    return (
        <Table
            columns={columns}
            dataSource={dataUser}
            rowKey="_id"
        />
    )
}

export default UserTable;