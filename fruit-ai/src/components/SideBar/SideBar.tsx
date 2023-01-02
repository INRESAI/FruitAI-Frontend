import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OverViewIcon from '../../images/overview_icon.png'
import OverViewActionIcon from '../../images/overview_active_icon.png'
import PackIcon from '../../images/pack_icon.png'
import PackActiveIcon from '../../images/pack_active_icon.png'
import CameraIcon from '../../images/video_icon.png'
import CameraActiveIcon from '../../images/video_active_icon.png'
import AssistIcon from '../../images/assist_icon.png'
import AssistActiveIcon from '../../images/assist_active_icon.png'

import './sideBar.css';
const { Sider } = Layout;
const SideBar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [itemOnClick, setItemOnClick] = useState<string>('1');

    const items: MenuProps['items'] = [
        {
            label: (
                <Link to='/'>
                    <img src={itemOnClick !== '1' ? OverViewIcon : OverViewActionIcon} alt='' />
                    <span>Tổng quan</span>
                </Link>
            ),
            key: 1,
        },
        {
            label: (
                <Link to='/pack_manager'>
                    <img src={itemOnClick !== '2' ? PackIcon : PackActiveIcon} alt='' />
                    <span>Lô</span>
                </Link>
            ),
            key: 2,
        },
        {
            label: (
                <Link to='/camera_manager'>
                    <img src={itemOnClick !== '3' ? CameraIcon : CameraActiveIcon} alt='' />
                    <span>Camera</span>
                </Link>
            ),
            key: 3,
        },
        {
            label: (
                <Link to='/assist'>
                    <img src={itemOnClick !== '4' ? AssistIcon : AssistActiveIcon} alt='' />
                    <span>Hỗ trợ</span>
                </Link>
            ),
            key: 4,
        },
    ];
    useEffect(() => {
        console.log(window.location.pathname);
        // console.log(window.location.href);
        if (window.location.pathname === '/pack_manager')
            setItemOnClick('2')
        if (window.location.pathname === '/camera_manager')
            setItemOnClick('3')
        if (window.location.pathname === '/assist')
            setItemOnClick('4')
        if(window.location.pathname === '/') 
            setItemOnClick('1')
    }, [window.location.pathname])
    
    // useEffect(() => {
    //     const item = 
    // })

    return (
        <Sider className='main-sidebar'>
            <Link to='/' className='sidebar-logo' >
                LOGO
            </Link>
            <Menu
                defaultSelectedKeys={[itemOnClick]}
                selectedKeys={[itemOnClick]}
                mode="inline"
                items={items}
                onClick={({ key }) => { setItemOnClick(key) }}
            />
        </Sider>

    );
};

export default SideBar;