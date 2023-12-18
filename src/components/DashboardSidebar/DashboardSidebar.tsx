import React, {FC, ReactNode} from 'react';
import {Layout} from "antd";
import './Sidebar.css'


const {Sider} = Layout;
type DashboardSidebarProps = {
    menu: ReactNode
}


export const DashboardSidebar: FC<DashboardSidebarProps> = ({menu}) => {
    return (
        <Sider
            className="sidebar"
            breakpoint={"lg"}
            theme="light"
            collapsedWidth={0}
            trigger={null}
        >
            {menu}
        </Sider>
    )
}

export default DashboardSidebar