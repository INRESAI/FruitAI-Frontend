import { Modal } from 'antd'
import React, { useState } from 'react'
import { ToggleButton } from 'react-bootstrap';
import { deleteCameraRequest } from '../../redux/controller';
import { useDispatchRoot } from '../../redux/store';
import { useNavigate } from "react-router-dom";



interface MyProps{
    cameraId: string,
    isOpenModelDelete: boolean,
    toggle: () => void
}

const DeleteCamera = (props: MyProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatchRoot();
    const navigate = useNavigate();



    const handleOk = () => {
        dispatch(deleteCameraRequest(props.cameraId))
        navigate("/camera_manager")
        props.toggle()

    };

    const handleCancel = () => {
        props.toggle()
    };
    return (
        <div>
            <Modal title="Xóa camera" open={props.isOpenModelDelete} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có muốn xóa Camera này không?</p>
            </Modal>
        </div>
  )
}

export default DeleteCamera