import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UsergroupAddOutlined, BookOutlined, SettingOutlined, LoginOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { AuthContext } from '../context/auth.context';

const Header = () => {
    const [current, setCurrent] = useState('');
    const { user } = useContext(AuthContext);

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
        // Conditional rendering based on user authentication
        // if user.id is not set, show login link
        ...(!user.id ? [{
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: 'login',
            icon: <LoginOutlined />,
        }] : []),

        ...(user.id ? [{
            label: `Welcome ${user.fullName}`,
            key: 'setting',
            icon: <AliwangwangOutlined />,
            children: [
                {
                    label: 'Đăng xuất',
                    key: 'logout',
                },
            ],
        },] : []),

    ];

    const onClick = e => {
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