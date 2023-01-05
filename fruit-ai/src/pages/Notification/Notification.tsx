import { MoreOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Avatar, Badge, Button, Checkbox, Form, Input, List, Menu, MenuProps, Modal, message } from 'antd';
import VirtualList from 'rc-virtual-list';
// import 'react-pro-sidebar/dist/css/styles.css';
import './notification.css';
import Sider from 'antd/es/layout/Sider';
import MenuItem from 'antd/es/menu/MenuItem';
import UnreadIcon from '../../images/icon_unread.png'
import ExportIcon from '../../images/icon_export.png'
interface MyProps {
    isOpenModal: boolean;
    toggleNotification: () => void;
}
interface UserItem {
    email: string;
    gender: string;
    name: {
        first: string;
        last: string;
        title: string;
    };
    nat: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
}

const items: MenuProps['items'] = [
    {
        label: (
            <div className='notification-button' >Tất cả 09</div>
        ),
        key: 1,
    },
    {
        label: (
            <div className='notification-button' >Cảnh cáo 04</div>
        ),
        key: 2,
    },
    {
        label: (
            <div className='notification-button' >Xuất 05</div>
        ),
        key: 3,
    },
    {
        label: (
            <div className='notification-button' >Nhập 03</div>
        ),
        key: 4,
    },
];
const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;
const Notification = (props: MyProps) => {


    const [itemOnClick, setItemOnClick] = useState<number>(1);
    const [data, setData] = useState<UserItem[]>([]);


    const appendData = () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((body) => {
                setData(data.concat(body.results));
            });
    };
    useEffect(() => {
        console.log(itemOnClick);
    })
    useEffect(() => {
        appendData();
    }, []);
    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
            appendData();
        }
    };

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
                    <MoreOutlined style={{cursor: 'pointer'}}/>
                </div>
                <Sider className='notification-slider'>
                    <Menu
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        items={items}
                        onClick={({ key }) => { setItemOnClick(parseInt(key)) }}
                    />
                </Sider>
                <div className='notification-list notification-new'>
                    <div className='notification-list-title'>Mới nhất</div>
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
                                    <List.Item key={item.email}>
                                        <List.Item.Meta
                                            avatar={
                                                <Badge count={<img src={ExportIcon} style={{ height: 20, width: 20 }} />} offset={[-10, 50]}>
                                                    <Avatar src={item.picture.large} />
                                                </Badge>}
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
                </div>
                <div className='notification-list notification-before'>
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
                </div>
            </Form>
        </Modal>
    )
}

export default Notification