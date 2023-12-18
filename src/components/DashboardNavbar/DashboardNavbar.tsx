import React, {FC, ReactNode, useState} from 'react'
import {Button, Drawer} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import './Navbar.css';

type DashboardNavbarProps = {
    menu: ReactNode
}
export const DashboardNavbar: FC<DashboardNavbarProps> = ({menu}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleMenuClick = () => {
        setIsVisible(true);
    }

    const handleDrawerClick = () => {
        setIsVisible(false);
    }

    const handleCloseClick = () => {
        setIsVisible(false);
    }

    return (
        <nav>
            <Button
                className="menu"
                type="primary"
                icon={<MenuOutlined/>}
                onClick={handleMenuClick}
            />
            <Drawer
                title="Menu"
                placement="left"
                onClick={handleDrawerClick}
                onClose={handleCloseClick}
                open={isVisible}
            >
                {menu}
            </Drawer>
        </nav>
    )
}

export default DashboardNavbar