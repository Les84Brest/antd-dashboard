import React, {FC} from 'react'
import {Pie} from '@ant-design/plots';
import {ManagersChartDataItem, SalesChartDataItem} from "../../../store/types";
import {Space, Typography} from "antd";
import {ComponentWrap} from "../../ui/ComponentWrap";

interface ManagersChartProps {
    dataSource: ManagersChartDataItem[]
}

/**
 * @description Chart that shows sales data presented by manager
 * @param dataSource
 * @constructor
 */
export const ManagersChart: FC<ManagersChartProps> = ({dataSource}) => {
    const config = {
        data: dataSource,
        angleField: 'value',
        colorField: 'type',

        innerRadius: 0.6,
        label: {
            text: 'value',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            marginLeft: 90,
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,

            },
        },
    };
    return (
        <ComponentWrap>
            <Space>
                <Typography.Title level={3}>
                    Sales by managers
                </Typography.Title>
            </Space>
            <Pie {...config} />
        </ComponentWrap>
    );
}

export default ManagersChart