import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUsersAPI } from '../services/api.service';
import { useState, useEffect } from 'react';

const UserPage = () => {
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const res = await fetchAllUsersAPI();
        setDataUser(res.data);
    }

    return (
        // <div>User page</div>
        <div style={{ padding: '20px' }}>
            <UserForm loadUser={loadUser} />
            <UserTable dataUser={dataUser} />
        </div>
    )
}

export default UserPage;