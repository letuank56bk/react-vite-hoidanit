import { Space, Table, Tag } from 'antd';
import { fetchAllUsersAPI } from '../../services/api.service';
import { useState } from 'react';

const UserTable = () => {
    const [dataUser, setDataUser] = useState([]);

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
        console.log('Loading users...');
        const res = await fetchAllUsersAPI();
        console.log('Users loaded successfully', res.data);
    }
    loadUser();

    return (<Table columns={columns} dataSource={dataUser} />)
}

export default UserTable;