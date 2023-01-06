import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import './register.css';
interface MyProps {
    isOpenModal: boolean;
    toggleRegisterModal: () => void;
    toggleLoginModal: () => void;

}
const RegisterModal = (props: MyProps) => {
    return (
        <>
            <Modal title="Đăng ký"
                open={props.isOpenModal}
                onOk={props.toggleRegisterModal}
                onCancel={props.toggleRegisterModal}
                footer={false}
                style={{ top: 20 }}

            >
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                >
                    <div>
                        <span className='form-span-text'>Họ và tên <strong style={{ color: 'red' }}>(*)</strong></span>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                        >
                            <Input className='form-input' placeholder="Nhập họ tên" />
                        </Form.Item>
                    </div><div>
                        <span className='form-span-text'>Email <strong style={{ color: 'red' }}>(*)</strong></span>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                        >
                            <Input className='form-input' placeholder="Nhập email" />
                        </Form.Item>
                    </div><div>
                        <span className='form-span-text'>Số điện thoại <strong style={{ color: 'red' }}>(*)</strong></span>
                        <Form.Item
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                        >
                            <Input className='form-input' placeholder="Nhập số điện thoại" />
                        </Form.Item>
                    </div>
                    <div>
                        <span className='form-span-text'>Địa chỉ <strong style={{ color: 'red' }}>(*)</strong></span>
                        <Form.Item
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                        >
                            <Input className='form-input' placeholder="Nhập đỉa chỉ" />
                        </Form.Item>
                    </div>
                    <div>
                        <span className='form-span-text'>Mật khẩu <strong style={{ color: 'red' }}>(*)</strong></span>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                        >
                            <Input.Password
                                className='form-input'
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                type="password"
                                placeholder="Nhập mật khẩu"
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <span className='form-span-text'>Xác nhận mật khẩu <strong style={{ color: 'red' }}>(*)</strong></span>
                        <Form.Item
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu' }]}
                        >
                            <Input.Password
                                className='form-input'
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                type="password"
                                placeholder="Nhập mật khẩu"
                            />
                        </Form.Item>
                    </div>
                    <Form.Item className='form-remeber'>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox className='form-span-text'>Tôi đồng ý với<strong> Điều khoản </strong>và <strong>Chính sách bảo mật</strong>.</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item className='form-submit'>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Đăng ký
                        </Button>
                        <div>Bạn đã có tài khoản?
                            <Button onClick={props.toggleLoginModal} type="link" className='form-span-text' style={{ color: '#1dce00', marginLeft: '-10px' }}>Đăng nhập</Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default RegisterModal;