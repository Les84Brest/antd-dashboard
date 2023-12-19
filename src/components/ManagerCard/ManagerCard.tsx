import React, {FC} from 'react'
import {Typography, Card, Image} from "antd";
import { CarryOutOutlined, PoundCircleOutlined} from '@ant-design/icons';
import '../../types/image.d.ts';
import avatar4 from '../../assets/users/avatar4.jpg';
import {ManagerCardWrap, ManagerText, ManagerAvatar, ManagerTextRow, ManagerIconWrap, Role} from "./styled";
import styled from "styled-components";

const {Title} = Typography;

const ManagerTitle = styled(Title)`
    margin-top: 5px;
`
export const ManagerCard: FC = () => {
    return (
        <ManagerCardWrap>
            <ManagerAvatar src={avatar4}/>
            <ManagerText>
                <Role>Manager:</Role>
                <ManagerTitle level={2}>
                    Brian Jones
                </ManagerTitle>
                <ManagerTextRow>
                    <ManagerIconWrap><PoundCircleOutlined style={{ fontSize: '25px' }}/></ManagerIconWrap>Revenue - 123 321
                </ManagerTextRow>
                <ManagerTextRow>
                    <ManagerIconWrap><CarryOutOutlined style={{ fontSize: '25px' }}/></ManagerIconWrap> Orders - 164
                </ManagerTextRow>
            </ManagerText>
        </ManagerCardWrap>
    )
}

export default ManagerCard