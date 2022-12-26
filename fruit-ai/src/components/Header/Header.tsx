/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import Icon from '@ant-design/icons'
import { Avatar, Button, Input, Image } from 'antd'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import Notification from '../../images/Notification_icon.png'
import AddCamera from '../../images/add_video.png'
import IconSearch from '../../images/icon_search.png'
import UserIcon from '../../images/user_icon.png'
import './header.css'
// import CRegisterModal from './CRegisterModal';

interface MyProps {
    // setIsLogout: React.Dispatch<React.SetStateAction<boolean>>
}


export const Header = (props: MyProps) => {
    const userEmail = localStorage.getItem('userEmail');
    const [visible, setVisible] = useState(false);
    const [isOnModal, setIsOnModal] = useState<boolean>(false);
    const history = useNavigate();

    const handleMenuClick = (e: any) => {
        if (e.key === '1' || e.key === '2') {
            setVisible(false);
        }
    };

    const toggle = () => {
        setIsOnModal(!isOnModal);
    };

    const handleVisibleChange = (flag: boolean) => {
        setVisible(flag);
    };

    return (
        <div className='k-main-header'>
            {/* <div className='k-header-logo'>
                <span className='k-logo'>
                    LOGO
                </span>
            </div> */}
            <div className='k-header-content'>
                <div className='header-content-input'>
                    <Input
                        className='search-input'
                        placeholder='Tìm kiếm'
                    />
                    <img className='icon-search' src={IconSearch}></img>
                </div>
                <div className='header-content-info'>
                    <Button className='header-button-addcamera'>
                        <Icon className='header-icon-addcamera' component={() => (<img src={AddCamera} />)} />
                        <span className='header-text-addcamera'>Thêm camera</span>
                    </Button>
                    <div className='header-notification'>
                        <img className='header-icon-notification' src={Notification} />
                        <div className='header-number-notification'>
                            <span className='number-noti'>4</span>
                        </div>
                    </div>
                    <Avatar className='header-avatar' src={UserIcon} />
                </div>
            </div>
        </div>

    )
}