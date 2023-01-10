import { MoreOutlined, WarningFilled, WarningOutlined } from '@ant-design/icons';
import { Avatar, Badge, Form, List, Menu, MenuProps, Modal } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useEffect, useState } from 'react';
// import 'react-pro-sidebar/dist/css/styles.css';
import Sider from 'antd/es/layout/Sider';
import ExportIcon from '../../images/icon_export.png';
import UnreadIcon from '../../images/icon_unread.png';
import './notification.css';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { Link } from 'react-router-dom';
import { setStatusOfNotificationRequest } from '../../redux/controller/notification.slice';

interface MyProps {
    isOpenModal: boolean;
    toggleNotification: () => void;
}
const items: MenuProps['items'] = [
    {
        label: (
            <div className='notification-button' >Tất cả</div>
        ),
        key: 1,
    }
    , {
        label: (
            <div className='notification-button' >Đã xem</div>
        ),
        key: 2,
    },
    {
        label: (
            <div className='notification-button' >Chưa xem</div>
        ),
        key: 3,
    },

];

const ContainerHeight = 400;
const Notification = (props: MyProps) => {

    const { lstNotification, lstSeenNotification, lstUnSeenNotification } = useSelectorRoot((state) => state.notification);
    const dispatch = useDispatchRoot()
    const [statusNotification, setStatusNotification] = useState<string>('1');
    const [itemOnClick, setItemOnClick] = useState<number>(1);
    const [data, setData] = useState<any[]>();


    // const appendData = () => {
    //     fetch(fakeDataUrl)
    //         .then((res) => res.json())
    //         .then((body) => {
    //             setData(data.concat(body.results));
    //         });
    // };

    useEffect(() => {
        if (statusNotification === "2") {
            setData(lstSeenNotification)
        } else if (statusNotification === "3") {
            setData(lstUnSeenNotification)
        } else {
            setData(lstNotification)
        }
    }, [lstSeenNotification])

    // useEffect(() => {
    //     appendData();
    // }, [lstNotification,]);

    const changeNotificationStatus = (key: string) => {
        setStatusNotification(key);
        if (key === "2") {
            setData(lstSeenNotification)
        } else if (key === "3") {
            setData(lstUnSeenNotification)
        } else {
            setData(lstNotification)
        }
    }
    const handleOnClickNotification = (id: string) => {
        dispatch(setStatusOfNotificationRequest(id));
        props.toggleNotification();
    }
    // const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    //     if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
    //         appendData();
    //     }
    // };

    return (
        <Modal
            className='notification-modal'
            title=""
            open={props.isOpenModal}
            onOk={props.toggleNotification}
            onCancel={props.toggleNotification}
            footer={false}
        >
            <Form
                name="normal_login"
                className="notification-form"
                initialValues={{ remember: true }}
            >
                <div className='notification-title'>
                    <div className='notification-title-text'>Thông báo</div>
                    <MoreOutlined style={{ cursor: 'pointer' }} />
                </div>
                <Sider className='notification-slider'>
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        items={items}
                        onClick={({ key }) => { changeNotificationStatus(key) }}
                    />
                </Sider>
                <div className='notification-list notification-new'>
                    {/* <div className='notification-list-title'>Mới nhất</div> */}
                    <div className='notification-list-item'>
                        <List>
                            <VirtualList
                                data={data ? data : lstNotification} // Lan dau vao se set luon cho la bang lst tong hop thong bao. Cac lan sau se co ham set lai 
                                height={ContainerHeight}
                                itemHeight={47}
                                itemKey="email"
                            >
                                {(item: any) => (
                                    <Link to={{ pathname: `/camera_detail/${item.camera.id}` }} >
                                        <List.Item key={item.email} onClick={() => handleOnClickNotification(item.id)}>
                                            <List.Item.Meta
                                                avatar={
                                                    <Badge>
                                                        <WarningFilled style={{ color: '#0083FC' }} />
                                                    </Badge>}
                                                title={<div>{item.title}</div>}
                                                description={<div>
                                                    <div className='notification-des'>{item.content}</div>
                                                    <div className='notification-time'>{new Date(item.time).toLocaleDateString()}</div>
                                                </div>}
                                            />
                                            <img src={UnreadIcon} />
                                        </List.Item>
                                    </Link>

                                )}
                            </VirtualList>
                        </List>
                    </div>
                </div>
                {/* <div className='notification-list notification-before'>
                    <div className='notification-list-title'>Trước đây</div>
                    <div className='notification-list-item'>
                        <List>
                            <VirtualList
                                data={data}
                                height={ContainerHeight}
                                itemHeight={47}
                                itemKey="email"
                                onScroll={onScroll}
                            >
                                {(item: UserItem) => (
                                    <List.Item
                                        key={item.email}
                                        onClick={() => console.log('baka')}>
                                        <List.Item.Meta
                                            avatar={
                                                <Badge count={<img src={ExportIcon} style={{ height: 20, width: 20 }} />} offset={[-10, 50]}>
                                                    <Avatar src={item.picture.large} />
                                                </Badge>
                                            }
                                            title={<a href="https://ant.design">{item.name.last}</a>}
                                            description={<div>
                                                <div className='notification-des'>{item.email}</div>
                                                <div className='notification-time'>1 phút trước</div>
                                            </div>}

                                        />
                                        <img src={UnreadIcon} />
                                    </List.Item>
                                )}
                            </VirtualList>
                        </List>
                    </div>
                </div> */}
            </Form>
        </Modal>
    )
}

export default Notification