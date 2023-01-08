import {useState} from 'react'
import { Button, Form, Input, Modal } from 'antd';
import '../Camera/style/addcameramodal.css';
import { useDispatchRoot } from '../../redux/store';
import { addCameraRequest } from '../../redux/controller';
import { AddNewCameraRequest } from '../../common/models/camera-model';
interface MyProps {
    isOpenModal: boolean;
    toggleAddCameraModal: () => void;
}
const AddCameraModel = (props: MyProps) => {

    const [cameraName,setCameraName] = useState('');
    const [cameraLink, setCameraLink] = useState('');
    const [cameraNote,setCameraNote] = useState('');

    const dispatch = useDispatchRoot()

    const CreateNewCamera = () => {
        let warehouseId = localStorage.getItem('warehouseId')?.toString()
        if(warehouseId){
            warehouseId = warehouseId.slice(1);
            warehouseId = warehouseId.slice(0, warehouseId.length - 1);
            const param : AddNewCameraRequest = {
                name: cameraName,
                link: cameraLink,
                note: cameraNote,
                warehouseId: warehouseId ? warehouseId : '',
            }

            console.log(param);
            dispatch(addCameraRequest(param))
            props.toggleAddCameraModal()
        }
    }

    return (
        <Modal
            className='add-camera-modal'
            title="Tạo camera mới"
            open={props.isOpenModal}
            onOk={props.toggleAddCameraModal}
            onCancel={props.toggleAddCameraModal}
            footer={[
                <Button className='btn-cancel' key="back" onClick={props.toggleAddCameraModal}>
                    Hủy bỏ
                </Button>,
                <Button className='btn-submit' key="submit" type="primary" onClick={()=>CreateNewCamera()}>
                    Tạo mới
                </Button>,
            ]}
        >
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
            >
                <div>
                    <span className='form-span-text'>Tên camera <strong style={{ color: 'red' }}>(*)</strong></span>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên camera' }]}
                    >
                        <Input onChange={(e)=>{setCameraName(e.target.value)}} className='form-input' placeholder="Nhập tên camera" />
                    </Form.Item>
                </div>
                <div>
                    <span className='form-span-text'>Link camera<strong style={{ color: 'red' }}>(*)</strong></span>
                    <Form.Item
                        name="link"
                        rules={[{ required: true, message: 'Vui lòng nhập link camera' }]}
                    >
                        <Input onChange={(e)=>{setCameraLink(e.target.value)}} className='form-input' placeholder="Nhập link camera" />
                    </Form.Item>
                </div>
                <div>
                    <span className='form-span-text'>Ghi chú</span>
                    <Form.Item
                        name="note"
                    >
                        <Input onChange={(e)=>{setCameraNote(e.target.value)}} className='form-input' placeholder="Nhập ghi chú" />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}

export default AddCameraModel