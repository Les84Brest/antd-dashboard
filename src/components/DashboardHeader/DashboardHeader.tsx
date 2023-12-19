import {FC} from 'react'
import {Layout, Typography} from "antd";

const { Header} = Layout;
const {Title} = Typography;

export const DashboardHeader: FC = () => {
    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>

            <Title level={1} style={{ color: 'white', alignItems: 'center' }}>
                Sales dashboard
            </Title>

        </Header>
    )
}

export default DashboardHeader