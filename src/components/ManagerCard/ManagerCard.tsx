import React, {FC} from 'react'
import {Typography, Card, Image} from "antd";
import {CarryOutOutlined, PoundCircleOutlined} from '@ant-design/icons';
import '../../types/image.d.ts';
import avatar1 from '../../assets/users/avatar1.jpg';
import avatar2 from '../../assets/users/avatar2.jpg';
import avatar3 from '../../assets/users/avatar3.jpg';
import avatar4 from '../../assets/users/avatar4.jpg';
import avatar5 from '../../assets/users/avatar5.jpg';
import avatar6 from '../../assets/users/avatar6.jpg';
import avatar7 from '../../assets/users/avatar7.jpg';
import {
    ManagerCardWrap,
    ManagerText,
    ManagerAvatar,
    ManagerTextRow,
    ManagerIconWrap,
    ManagerContactsLabel,
    Role,
    ManagerContacts, ContactName, ContactData
} from "./styled";
import styled from "styled-components";
import {IManagerGeneralData} from "../../store/types";
import {Descriptions} from 'antd';
import type {DescriptionsProps} from 'antd';

const {Title} = Typography;

const ManagerTitle = styled(Title)`
    margin-top: 5px;

    @media screen and (max-width: 768px) {
        font-size: 17px;
        width: 180px;
    }
`

interface ManagerCardProps {
    manager: IManagerGeneralData
}

export const ManagerCard: FC<ManagerCardProps> = ({manager}) => {

    // const avatarRenderMap: { avatar6: string; avatar5: object; avatar7: object; avatar2: object; avatar1: object; avatar4: object; avatar3: object } = {
    //     avatar1: avatar1,
    //     avatar2: avatar2,
    //     avatar3: avatar3,
    //     avatar4: avatar4,
    //     avatar5: avatar5,
    //     avatar6: avatar6,
    //     avatar7: avatar7,
    // }

    const renderMap: { [key: string]: () => string } = {
        avatar1: () => avatar1,
        avatar2: () => avatar2,
        avatar3: () => avatar3,
        avatar4: () => avatar4,
        avatar5: () => avatar5,
        avatar6: () => avatar6,
        avatar7: () => avatar7,
    }

    const managerAvatar: () => string  = renderMap[manager.avatar];


    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Telephone',
            children: manager.phone,
        },
        {
            key: '2',
            label: 'Email',
            children: manager.email,
        },


    ];
    return (
        <ManagerCardWrap>
            <ManagerAvatar src={managerAvatar()}/>
            <ManagerText>
                <Role>Manager:</Role>
                <ManagerTitle level={2}>
                    {manager.manager_name}
                </ManagerTitle>
                <ManagerTextRow>
                    <ManagerIconWrap><PoundCircleOutlined style={{fontSize: '20px'}}/></ManagerIconWrap>Revenue
                    - {manager.sales}
                </ManagerTextRow>
                <ManagerTextRow>
                    <ManagerIconWrap><CarryOutOutlined style={{fontSize: '20px'}}/></ManagerIconWrap> Orders
                    - {manager.orders_count}
                </ManagerTextRow>
                <ManagerContacts>
                    <ManagerContactsLabel>Manager contacts</ManagerContactsLabel>
                    <div>
                        <ContactName>Email:</ContactName>
                        <ContactData>{manager.email}</ContactData>
                    </div>
                    <div>
                        <ContactName>Phone:</ContactName>
                        <ContactData> +{manager.phone} </ContactData>
                    </div>
                </ManagerContacts>
            </ManagerText>
        </ManagerCardWrap>
    )
}

export default ManagerCard