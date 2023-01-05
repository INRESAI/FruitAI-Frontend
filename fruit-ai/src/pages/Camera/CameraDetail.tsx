/* eslint-disable react-hooks/exhaustive-deps */
import { CopyOutlined, DownOutlined } from '@ant-design/icons'
import { Button, Card, Image, List } from 'antd'
import Title from 'antd/es/typography/Title'
import { useEffect, useState } from 'react'
import CameraDetailImage from '../../images/camera_detail_img.png'
import DeleteIcon from '../../images/delete_icon.png'
import EditIcon from '../../images/edit_icon.png'
import CameraImg1 from '../../images/camera_img_1.png'
import CameraImg2 from '../../images/camera_img_2.png'
import CameraImg3 from '../../images/camera_img_3.png'
import CameraImg4 from '../../images/camera_img_4.png'
import CameraImg5 from '../../images/camera_img_5.png'
import CameraImg6 from '../../images/camera_img_6.png'
import CameraImg7 from '../../images/camera_img_7.png'
import CameraImg8 from '../../images/camera_img_8.png'
import CameraImg9 from '../../images/camera_img_9.png'
import CameraImg10 from '../../images/camera_img_10.png'
import CameraImg11 from '../../images/camera_img_11.png'
import CameraImg12 from '../../images/camera_img_12.png'
import CameraImg13 from '../../images/camera_img_13.png'
import CameraImg14 from '../../images/camera_img_14.png'
import CameraImg15 from '../../images/camera_img_15.png'
import CameraImg16 from '../../images/camera_img_16.png'
import './style/cameraDetail.css'
import Meta from 'antd/es/card/Meta'
interface DataType {
    title?: string;
    img?: string;
    context?: string;
    loading: boolean;
}

const DataCameraList = [
    {
        title: "Camera 1",
        img: `${CameraImg1}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 2",
        img: `${CameraImg2}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 3",
        img: `${CameraImg3}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 4",
        img: `${CameraImg4}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 5",
        img: `${CameraImg5}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 6",
        img: `${CameraImg6}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 7",
        img: `${CameraImg7}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 8",
        img: `${CameraImg8}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 9",
        img: `${CameraImg9}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 10",
        img: `${CameraImg10}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 11",
        img: `${CameraImg11}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 12",
        img: `${CameraImg12}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 13",
        img: `${CameraImg13}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 14",
        img: `${CameraImg14}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 15",
        img: `${CameraImg15}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
    {
        title: "Camera 16",
        img: `${CameraImg16}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. ',
        loading: false
    },
];
const CameraDetail = () => {
    const [cameraDetailImage, setCameraDetailImage] = useState<string>(CameraDetailImage)
    const [cameraDetailName, setCameraDetailName] = useState<string>('Camera 1')
    const [cameraDetailCreateDate, setCameraDetailCreateDate] = useState<Date>(new Date())
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    const [count, setCount] = useState<number>(5)
    const [step, setStep] = useState<number>(5)

    useEffect(() => {
        if (count <= DataCameraList.length) {
            const datas = []
            for (let index = 0; index < count; index++) {
                const element = DataCameraList[index];
                datas.push(element);
            }
            setData(datas);
            setInitLoading(false);
            setCount(count + step)
            console.log(count);
        }
    }, [step])

    const onLoadMore = () => {
        if (count <= DataCameraList.length) {
            setInitLoading(true)
            const datas = []
            for (let index = 0; index < count; index++) {
                const element = DataCameraList[index];
                datas.push(element);
            }
            console.log(count);
            setData(datas);
            setInitLoading(false);
            window.dispatchEvent(new Event('resize'));
            console.log('baka');
            setCount(count + step)
        }
    };
    const loadMore = !initLoading && !loading && count <= DataCameraList.length ? (
        <div
            style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
            }}
        >
            <Button className='camera-detail-button' onClick={onLoadMore}>
                <DownOutlined />
                <span className='button-text'>Xem thêm</span>
            </Button>
        </div>
    ) : null;
    return (
        <div className='camera-detail-main'>
            <div className='camera-detail-left'>
                <Image className='camera-detail-image' preview={false} alt="example" src={cameraDetailImage} />
                <Title className="camera-detail-title" level={3}>
                    <div className='title-name'>{cameraDetailName}</div>
                    <div className='title-icon'>
                        <img alt='' src={EditIcon} />
                        <img alt='' src={DeleteIcon} />
                    </div>
                </Title>
                <div className='camera-detail-date'>
                    <label>Ngày nhập:</label>
                    <div style={{ marginLeft: 5 }}>{cameraDetailCreateDate.toLocaleDateString()}</div>
                </div>
                <div className='camera-detail-note'>
                    Ghi chú: Lorem ipsum dolor sit amet consectetur. Id quis fermentum quis nulla semper sit fusce tempor. Tempus ultricies justo mauris turpis feugiat dignissim feugiat sit. Ultricies montes auctor at risus. Amet dictum diam nullam praesent viverra elementum. In ut sit tortor sed mi amet viverra nibh eros. Fringilla mollis blandit blandit erat molestie ut natoque eu vel.
                </div>
                <div className='camera-detail-link'>
                    <div className='link-url'>Link: https://www.fruitmanagement.vn/watch?v=cH4E_t3m3xM&list=RDcH4E_t3m3xM&start_radio=1</div>
                    <Button className='camera-detail-button'>
                        <CopyOutlined />
                        <span className='button-text'>Sao chép link</span>
                    </Button>
                </div>
            </div>
            <div className='camera-detail-right'>
                <List
                    className="camera-detail-list"
                    dataSource={data}
                    loading={initLoading}
                    loadMore={loadMore}
                    renderItem={(item) => (
                        <List.Item>
                            <Card
                                className="camera-detail-card"
                                cover={
                                    <Image preview={false} alt="example" src={item.img} />
                                }
                            >
                                <Meta title={item.title} description={item.context} />
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}

export default CameraDetail