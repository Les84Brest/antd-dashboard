import React, {FC} from 'react'
import {Pie} from '@ant-design/plots';
import {ManagersChartDataItem, SalesChartDataItem} from "../../../store/types";
import {Space, Typography} from "antd";

interface ManagersChartProps {
    dataSource: ManagersChartDataItem[]
}

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
        <div className="char-wrap">
            <Space>
                <Typography.Title level={3}>
                    Sales by managers
                </Typography.Title>
            </Space>
            <Pie {...config} />
        </div>
    );
}

export default ManagersChart