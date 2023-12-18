import React, {FC, useState} from 'react'
import {Menu} from 'antd';
import {Link} from "react-router-dom";
import type {MenuProps} from 'antd';
import {ContainerOutlined, AppstoreOutlined} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

type SidebarMenuProps = {
    menuItems: Array<MenuItem>
}

export const SidebarMenu: FC<SidebarMenuProps> = ({menuItems}) => {
    const {Item} = Menu;

    const [selectedKey, setSelectedKey] = useState<string>('/orders');


    return (
        <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
        />

    )
}

export default SidebarMenu