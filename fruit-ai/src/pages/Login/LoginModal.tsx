import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import './login.css';
interface MyProps {
    isOpenModal: boolean;
    toggleLoginModal: () => void;
    toggleRegisterModal: () => void;
    toggleIsLogin: () => void;
}
const LoginModal = (props: MyProps) => {
    return (
        <Modal title="Đăng nhập"
            open={props.isOpenModal}
            onOk={props.toggleLoginModal}
            onCancel={props.toggleLoginModal}
            footer={false}
        >
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
            >
                <div>
                    <span className='form-span-text'>Email/sdt <strong style={{ color: 'red' }}>(*)</strong></span>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email/sdt' }]}
                    >
                        <Input className='form-input' placeholder="Nhập email/sđt" />
                    </Form.Item>
                </div>
                <div>
                    <span className='form-span-text'>Mật khẩu <strong style={{ color: 'red' }}>(*)</strong></span>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
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
                        <Checkbox className='form-span-text'>Ghi nhớ mật khẩu</Checkbox>
                    </Form.Item>
                    <div className="form-span-text" style={{ color: '#1dce00', fontWeight: 700, cursor: 'pointer' }}>
                        Quên mật khẩu
                    </div>
                </Form.Item>

                <Form.Item className='form-submit'>
                    <Button onClick={props.toggleIsLogin} type="primary" htmlType="submit" className="login-form-button">
                        Đăng nhập
                    </Button>
                    <div>Bạn chưa có tài khoản?
                        <Button onClick={props.toggleRegisterModal} type="link" className='form-span-text' style={{ color: '#1dce00', marginLeft: '-10px' }}>Đăng ký</Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LoginModal;