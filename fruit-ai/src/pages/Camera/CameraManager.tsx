import Title from "antd/es/typography/Title"
import React, { useEffect, useState } from "react"
import "./cameraManager.css"
import { Card, Image, List } from "antd";
import Meta from "antd/es/card/Meta";
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

const data = [
    {
        title: "Camera 1",
        img: `${CameraImg1}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 2",
        img: `${CameraImg2}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 3",
        img: `${CameraImg3}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 4",
        img: `${CameraImg4}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 5",
        img: `${CameraImg5}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 6",
        img: `${CameraImg6}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 7",
        img: `${CameraImg7}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 8",
        img: `${CameraImg8}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 9",
        img: `${CameraImg9}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 10",
        img: `${CameraImg10}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 11",
        img: `${CameraImg11}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 12",
        img: `${CameraImg12}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 13",
        img: `${CameraImg13}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 14",
        img: `${CameraImg14}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 15",
        img: `${CameraImg15}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
    {
        title: "Camera 16",
        img: `${CameraImg16}`,
        context: 'Lorem ipsum dolor sit amet consectetur. Nisl feugiat eget pellentesque mi eget aenean cursus aliquet et. Nunc a cursus velit magna montes fermentum id. '
    },
];
const CameraManager = () => {
    const [isOpenCameraDetail, setIsOpenCameraDetail] = useState<boolean>(false) // Biến kiểm tra đang mở notification hay không

    // // Hàm chuyển đổi trạng thái đóng mở modal add camera
    // const toggleAddCameraModal = () => {
    //     setIsOpenAddCameraModal(false);
    // };
    useEffect(() => {
        console.log(data);

    })

    return (
        <div className="camera-manager-main">
            <Title className="camera-manager-title" level={3}>Danh sách camera</Title>
            <List
                className="camera-manager-list"
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <Card
                            className="camera-manager-card"
                            style={{ width: 300 }}
                            hoverable
                            cover={
                                <Image width={300} preview={false} alt="example" src={item.img} />
                            }
                            // onClick={ }
                        >
                            <Meta title={item.title} description={item.context} />
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default CameraManager