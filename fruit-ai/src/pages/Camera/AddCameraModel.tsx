import { Button, Form, Input, Modal } from 'antd';
import '../Camera/style/addcameramodal.css';
interface MyProps {
    isOpenModal: boolean;
    toggleAddCameraModal: () => void;
}
const AddCameraModel = (props: MyProps) => {
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
                <Button className='btn-submit' key="submit" type="primary" onClick={props.toggleAddCameraModal}>
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
                        <Input className='form-input' placeholder="Nhập tên camera" />
                    </Form.Item>
                </div>
                <div>
                    <span className='form-span-text'>Link camera<strong style={{ color: 'red' }}>(*)</strong></span>
                    <Form.Item
                        name="link"
                        rules={[{ required: true, message: 'Vui lòng nhập link camera' }]}
                    >
                        <Input className='form-input' placeholder="Nhập link camera" />
                    </Form.Item>
                </div>
                <div>
                    <span className='form-span-text'>Ghi chú</span>
                    <Form.Item
                        name="note"
                    >
                        <Input className='form-input' placeholder="Nhập ghi chú" />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    )
}

export default AddCameraModel