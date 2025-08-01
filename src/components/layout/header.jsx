import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UsergroupAddOutlined, BookOutlined, SettingOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/auth.context';

const Header = () => {
    const [current, setCurrent] = useState('');
    const { user } = useContext(AuthContext);

    console.log("User data in Header:", user);

    const items = [
        {
            label: <Link to="/">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to={"/users"}>User</Link>,
            key: 'users',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: <Link to={"/books"}>Books</Link>,
            key: 'books',
            icon: <BookOutlined />,
        },
        {
            label: 'Cài đặt',
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to={"/login"}>Đăng nhập</Link>,
                    key: 'login',
                },
                {
                    label: 'Đăng xuất',
                    key: 'logout',
                },
            ],
        },
    ];

    const onClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items} />
    )
}

export default Header;