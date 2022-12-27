/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import Icon from '@ant-design/icons'
import { Avatar, Button, Input } from 'antd'
import { useState } from 'react'
import Notification from '../../images/Notification_icon.png'
import AddCamera from '../../images/add_video.png'
import IconSearch from '../../images/icon_search.png'
import UserIcon from '../../images/user_icon.png'
import LoginModal from '../../pages/Login/LoginModal'
import RegisterModal from '../../pages/Registration/RegisterModal'
import './header.css'
// import CRegisterModal from './CRegisterModal';

interface MyProps {
    // setIsLogout: React.Dispatch<React.SetStateAction<boolean>>
}


export const Header = (props: MyProps) => {

    const [isLogin, setIsLogin] = useState<Boolean>(false) // Biến kiểm tra đã login hay chưa
    const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false) // Biến kiểm tra đang mở modal login hay chưa
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState<boolean>(false) // Biến kiểm tra đang mở modal registration hay chưa

    // Hàm chuyển đổi trạng thái đóng mở modal login
    const toggleLoginModal = () => {
        setIsOpenLoginModal(!isOpenLoginModal);
        setIsOpenRegisterModal(false);

    };
    // Hàm chuyển đổi trạng thái đóng mở modal registration
    const toggleRegisterModal = () => {
        setIsOpenLoginModal(false);
        setIsOpenRegisterModal(!isOpenRegisterModal);
    };

    // Hàm đổi trạng thái đã login
    const toggleIsLogin = () => {
        setIsLogin(true)
    }
    return (
        <div className='k-main-header'>
            <div className='k-header-content'>
                <div className='header-content-input'>
                    <Input
                        className='search-input'
                        placeholder='Tìm kiếm'
                    />
                    <img className='icon-search' src={IconSearch}></img>
                </div>
                <div className='header-content-info'>
                    {/* Kiểm tra nếu đã login chưa */}
                    {isLogin ?
                        // Nếu login rồi thì hiển thị giao diện đã login và ngược lại
                        <>
                            <Button className='header-button'>
                                <Icon className='header-button-icon' component={() => (<img src={AddCamera} />)} />
                                <span className='header-button-text'>Thêm camera</span>
                            </Button>
                            <div className='header-notification'>
                                <img className='header-icon-notification' src={Notification} />
                                <div className='header-number-notification'>
                                    <span className='number-noti'>4</span>
                                </div>
                            </div>
                            <Avatar className='header-avatar' src={UserIcon} /></>
                        :
                        <>
                            <Button className='header-button' style={{ marginRight: 15 }} onClick={() => setIsOpenLoginModal(true)}>
                                <span className='header-button-text'>Đăng nhập</span>
                            </Button>
                            <Button className='header-button' onClick={() => setIsOpenRegisterModal(true)}>
                                <span className='header-button-text'>Đăng ký</span>
                            </Button>
                            <LoginModal
                                isOpenModal={isOpenLoginModal}
                                toggleLoginModal={toggleLoginModal}
                                toggleRegisterModal={toggleRegisterModal}
                                toggleIsLogin={toggleIsLogin}
                            />
                            <RegisterModal
                                isOpenModal={isOpenRegisterModal}
                                toggleLoginModal={toggleLoginModal}
                                toggleRegisterModal={toggleRegisterModal}
                            />
                        </>

                    }
                </div>
            </div>
        </div>

    )
}