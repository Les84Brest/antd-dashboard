import React, {FC, useEffect, useState} from 'react';
// import AppRouter from "./components/AppRouter";
// import Navbar from "./components/Navbar";
import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import DashboardContent from "./components/DashboardContent/DashboardContent";
import {Layout} from "antd";
import './App.css';
import SidebarMenu from "./components/SidebarMenu/SidebarMenu";
import DashboardSidebar from "./components/DashboardSidebar/DashboardSidebar";
import DashboardNavbar from "./components/DashboardNavbar/DashboardNavbar";
import {CalendarOutlined, FundViewOutlined} from "@ant-design/icons";
import DataService from "./api/DataService";
import AppRouter from "./components/AppRouter/AppRouter";

const {Content} = Layout;

//Available menu items in sidebar
const menuItems = [
    {
        label: "Orders",
        icon: <CalendarOutlined />,
        key: "/",
    },
    {
        label: "Sales",
        icon: <FundViewOutlined/>,
        key: "/sales",
    },
]

const App: FC = () => {

    const testCat = DataService.getCategories();

    const Menu = (
        <SidebarMenu menuItems={menuItems}/>
    );

    return (
        <div className="App">
            {/*<DashboardNavbar menu={Menu}/>*/}
            <Layout>
                {/*<DashboardSidebar menu={Menu}/>*/}
                <DashboardHeader/>
                <Content className="content">
                    <AppRouter/>
                </Content>
            </Layout>
        </div>
    );
};

export default App;
