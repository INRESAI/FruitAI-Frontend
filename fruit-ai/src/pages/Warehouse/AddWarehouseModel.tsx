import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { AddWarehouseRequest } from '../../common/define-warehouse';
import { addWarehouseByUserIdRequest } from '../../redux/controller';
import { useDispatchRoot } from '../../redux/store';
import './addWarehouseModal.css';
interface MyProps {
    isOpenModal: boolean;
    toggleAddWarehouseModal: () => void;
}
const AddWarehouseModel = (props: MyProps) => {

    const dispatch = useDispatchRoot()

    const [warehouseName,setWarehouseName] = useState('')
    const [warehouseAddress,setWarehouseAddress] = useState('')

    const addWarehouse = (data: any) => {
        let userId = localStorage.getItem('userId')?.toString()
        if(userId){
            userId = userId.slice(1);
            userId = userId.slice(0, userId.length - 1);
            const param : AddWarehouseRequest = {
                name: warehouseName,
                address: warehouseAddress,
                userId: userId ? userId : '',
            }

            console.log(param);
            dispatch(addWarehouseByUserIdRequest(param))
        }
    }   


    return (
        <Modal
            className='add-camera-modal'
            title="Tạo kho mới"
            open={props.isOpenModal}
            onOk={props.toggleAddWarehouseModal}
            onCancel={props.toggleAddWarehouseModal}
            footer={[
                <Button  className='btn-cancel' key="back" onClick={props.toggleAddWarehouseModal}>
                    Hủy bỏ
                </Button>,
                <Button className='btn-submit' key="submit" type="primary" onClick={addWarehouse}>
                    Tạo mới
                </Button>,
            ]}
        >
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={addWarehouse}

            >
                <div>
                    <span className='form-span-text'>Tên kho<strong style={{ color: 'red' }}>(*)</strong></span>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tên kho' }]}
                    >
                        <Input
                            onChange={(e)=>{setWarehouseName(e.target.value)}}
                            className='form-input' placeholder="Nhập tên kho" 
                        />
                    </Form.Item>
                </div>
                <div>
                    <span className='form-span-text'>Địa chỉ<strong style={{ color: 'red' }}>(*)</strong></span>
                    <Form.Item
                        name="address"
                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                    >
                        <Input 
                            onChange={(e)=>{setWarehouseAddress(e.target.value)}}
                            className='form-input' placeholder="Nhập địa chỉ" 
                        />
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

export default AddWarehouseModel