import {FC, useState} from 'react'
import {Layout, Typography, Button, Avatar, Modal, Form, Input} from "antd";
import styled from "styled-components";
import {UserOutlined} from "@ant-design/icons";

const { Header} = Layout;
const {Title} = Typography;
type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};


const StyledHeader = styled(Header)`
    display: flex; 
    justify-content: space-between;
    align-items: center;     
`;
const GrayAvatar = styled(Avatar)`
    background: #686f72;
`;

const WhiteButton = styled(Button)`
    color: white;    
    &:hover {
        color: #777;
    }
`;
/**
 * @description Dashboard header with login functionality
 * @constructor
 */
export const DashboardHeader: FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModal = () => {
        setIsVisible(true);
    };
    const hideModal = () => {
        setIsVisible(false);
    };

    const handleOk = () => {
        console.log('ok');

    }
    const onFinish = (values: any) => {
        console.log('Success:', values);
        hideModal();
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
        <StyledHeader >
            <Title level={3} style={{color: 'white'}} >
                Sales dashboard
            </Title>
            <div className="header-actions">
                <GrayAvatar icon={<UserOutlined />} />
                <WhiteButton type="text" onClick={showModal}>Sign in</WhiteButton>
            </div>

        </StyledHeader>
            <Modal
                title="Sign In"
                open={isVisible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={hideModal}
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default DashboardHeader