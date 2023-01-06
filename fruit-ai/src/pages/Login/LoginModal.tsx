import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import { LoginRequest } from '../../common/define-identity';
import { loginRequest } from '../../redux/controller/login.slice';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import './login.css';
interface MyProps {
    isOpenModal: boolean;
    toggleLoginModal: () => void;
    toggleRegisterModal: () => void;
}
const LoginModal = (props: MyProps) => {

    // const dispatch = useDispatchRoot();
    const dispatch = useDispatchRoot();
    const isSuccess = useSelectorRoot(state => (state.login.statusCode));

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        console.log(isSuccess)
        if (isSuccess === "OK" && userToken !== null && userToken !== undefined) {
            props.toggleLoginModal();
        }
    }, [isSuccess])
    const onFinish = async (account: LoginRequest): Promise<any> => {
        dispatch(loginRequest(account));
    }

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
                onFinish={(item) => onFinish(item)}

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
                    <Button type="primary" htmlType="submit" className="login-form-button">
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