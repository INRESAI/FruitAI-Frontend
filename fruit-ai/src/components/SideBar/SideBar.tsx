import { Drawer, Layout, Menu, MenuProps, notification } from 'antd';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AssistActiveIcon from '../../images/assist_active_icon.png';
import AssistIcon from '../../images/assist_icon.png';
import OverViewActionIcon from '../../images/overview_active_icon.png';
import OverViewIcon from '../../images/overview_icon.png';
import PackActiveIcon from '../../images/pack_active_icon.png';
import PackIcon from '../../images/pack_icon.png';
import CameraActiveIcon from '../../images/video_active_icon.png';
import CameraIcon from '../../images/video_icon.png';
import './sideBar.scss';
const { Sider } = Layout;
const show = {
    x: 0,
    opacity: 1,
    display: "block"
};

const hide = {
    x: "-100%",
    opacity: 0,
    transitionEnd: {
        display: "none"
    }
};
interface MyProps {
    onClose: () => void;
    open: boolean;
}

const SideBar = (props: MyProps) => {
    const [itemOnClick, setItemOnClick] = useState<string>('1');
    const [isVisible, setIsVisible] = useState(true);
    const [canCloseSideBar, setCanCloseSideBar] = useState(false);
    const items: MenuProps['items'] = [
        {
            label: (
                <Link to='/' onClick={(event) => onClickLink(event)}>
                    <img src={itemOnClick !== '1' ? OverViewIcon : OverViewActionIcon} alt='' />
                    <span className='sidebar-span'>Tổng quan</span>
                </Link>
            ),
            key: 1,
        },
        {
            label: (
                <Link to='/pack_manager' onClick={(event) => onClickLink(event)}>
                    <img src={itemOnClick !== '2' ? PackIcon : PackActiveIcon} alt='' />
                    <span className='sidebar-span'>Lô</span>
                </Link>
            ),
            key: 2,
        },
        {
            label: (
                <Link to='/camera_manager' onClick={(event) => onClickLink(event)}>
                    <img src={itemOnClick !== '3' ? CameraIcon : CameraActiveIcon} alt='' />
                    <span className='sidebar-span'>Camera</span>
                </Link>
            ),
            key: 3,
        },
        {
            label: (
                <Link to='/assist' onClick={(event) => onClickLink(event)}>
                    <img src={itemOnClick !== '4' ? AssistIcon : AssistActiveIcon} alt='' />
                    <span className='sidebar-span'>Hỗ trợ</span>
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
        if (window.location.pathname === '/camera_manager' || window.location.pathname === '/camera_detail')
            setItemOnClick('3')
        if (window.location.pathname === '/assist')
            setItemOnClick('4')
        if (window.location.pathname === '/')
            setItemOnClick('1')
    }, [window.location.pathname])

    useEffect(() => {
        const handleWindowResize = () => {
            window.innerWidth <= 900 ? setCanCloseSideBar(true) : setCanCloseSideBar(false);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });
    const onClickLink = (event: any) => {
        const warehouseId = localStorage.getItem('warehouseId') ? localStorage.getItem('warehouseId') : '';
        !warehouseId && event.preventDefault();
    }

    const handleOnClick = (key: string) => {
        setItemOnClick(key)
        props.onClose();
        const warehouseId = localStorage.getItem('warehouseId') ? localStorage.getItem('warehouseId') : '';
        const checkLogin = localStorage.getItem('token') ? localStorage.getItem('token') : ''
        if (!checkLogin) {
            notification['warning']({
                message: 'Vui lòng đăng nhập tài khoản trước',
                style: {
                    width: '100%'
                }
            });
        }
        else if (!warehouseId) {
            notification['warning']({
                message: 'Vui lòng chọn nhà kho trước',
                style: {
                    width: '100%'
                }
            });
        }
    }

    const onCloseDrawer = () => {
    }
    return (
        <Drawer
            title="LOGO"
            placement={'left'}
            closable={false}
            onClose={canCloseSideBar ? props.onClose : onCloseDrawer}
            open={canCloseSideBar ? props.open : true}
        >
            <Menu
                defaultSelectedKeys={[itemOnClick]}
                selectedKeys={[itemOnClick]}
                mode="inline"
                items={items}
                onClick={({ key }) => handleOnClick(key)}
            />
        </Drawer>

    );
};

export default SideBar;