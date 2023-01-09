/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import Icon from '@ant-design/icons'
import { Avatar, Badge, Button, Dropdown, Input, MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import NotificationIcon from '../../images/Notification_icon.png'
import AddCamera from '../../images/add_video.png'
import IconSearch from '../../images/icon_search.png'
import UserIcon from '../../images/user_icon.png'
import AddCameraActive from '../../images/video_active_icon.png'
import AddCameraModel from '../../pages/Camera/AddCameraModel'
import LoginModal from '../../pages/Login/LoginModal'
import Notification from '../../pages/Notification/Notification'
import RegisterModal from '../../pages/Registration/RegisterModal'
import './header.css'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import Utils from '../../common/utils'
import { WarehouseRequest } from '../../common/define-fruit'
import { getAllWarehouseByUserIdRequest } from '../../redux/controller/fruit.slice'
// import CRegisterModal from './CRegisterModal';

interface MyProps {
    // setIsLogout: React.Dispatch<React.SetStateAction<boolean>>
}


export const Header = (props: MyProps) => {

    const [isLogin, setIsLogin] = useState<string>('')
    const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false) // Biến kiểm tra đang mở modal login hay chưa
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState<boolean>(false) // Biến kiểm tra đang mở modal registration hay chưa
    const [isOpenAddCameraModal, setIsOpenAddCameraModal] = useState<boolean>(false) // Biến kiểm tra đang mở modal add camera hay chưa
    const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false) // Biến kiểm tra đang mở notification hay không
    const [cameraIcon, setCameraIcon] = useState<string>(AddCamera) // Camera icon
    const [userName, setUserName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const dispatch = useDispatchRoot();

    useEffect(() => {
        const checkLogin = localStorage.getItem('token') ? localStorage.getItem('token') : ''
        if (checkLogin) {
            setIsLogin(checkLogin);
            const usermail = localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : '';
            const username = localStorage.getItem('userName') ? localStorage.getItem('userName') : '';
            const userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : '';
            setUserEmail(usermail ? usermail : '');
            setUserName(username ? username : '');
        }
    });

    useEffect(() => {
        if (isLogin) {
            let userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : "";
            console.log(userId ? userId : '');
            if (userId) {
                userId = userId.slice(1);
                userId = userId.slice(0, userId.length - 1);
                const req: WarehouseRequest = {
                    "userId": userId,
                    "additionalProp1": {},
                };
                dispatch(getAllWarehouseByUserIdRequest(req))
            }
        }
    }, [isLogin])
    const onClickChooseWareHouse = () => {
        Utils.removeItemLocalStorage('warehouseId');
        window.location.reload();
    }
    const onClickLogout = () => {
        Utils.removeItemLocalStorage('token');
        Utils.removeItemLocalStorage('userEmail');
        Utils.removeItemLocalStorage('userName');
        Utils.removeItemLocalStorage('userId');
        Utils.removeItemLocalStorage('warehouseId');
        setIsLogin('')
        window.location.reload();
    }
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div >
                    Tên: {userName}
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div >
                    Email: {userEmail}
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div onClick={onClickChooseWareHouse}>
                    Chọn kho
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div onClick={onClickLogout}>
                    Đăng xuất
                </div>
            ),
        },
    ];

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

    // Hàm chuyển đổi trạng thái đóng mở modal add camera
    const toggleAddCameraModal = () => {
        setIsOpenAddCameraModal(false);
    };

    // Hàm chuyển đổi trạng thái đóng mở notification
    const toggleNotification = () => {
        setIsOpenNotification(false);
    };

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
                            <Button className='header-button'
                                onMouseEnter={() => setCameraIcon(AddCameraActive)}
                                onMouseLeave={() => setCameraIcon(AddCamera)}
                                onClick={() => setIsOpenAddCameraModal(true)}
                            >
                                <Icon className='header-button-icon' component={() => (<img className='icon-add-camera' src={cameraIcon} />)} />
                                <span className='header-button-text'>Thêm camera</span>
                            </Button>
                            <AddCameraModel
                                isOpenModal={isOpenAddCameraModal}
                                toggleAddCameraModal={toggleAddCameraModal}
                            />
                            <div className='header-notification' onClick={() => setIsOpenNotification(!isOpenNotification)}>
                                {/* <div className='header-number-notification'> */}
                                {/* <span className='number-noti'>4</span> */}
                                {/* </div> */}
                                <Badge count={4}>
                                    <img src={NotificationIcon} />
                                </Badge>
                            </div>
                            <Notification
                                isOpenModal={isOpenNotification}
                                toggleNotification={toggleNotification}
                            />
                            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                                <Avatar className='header-avatar' src={UserIcon} />
                            </Dropdown>

                        </>
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