import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UsergroupAddOutlined, BookOutlined } from '@ant-design/icons';

const Header = () => {
    const [current, setCurrent] = useState('');

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