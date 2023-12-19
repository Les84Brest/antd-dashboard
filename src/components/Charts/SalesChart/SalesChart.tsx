import React, {useState, useEffect, FC} from 'react';
import {Line} from '@ant-design/plots';
import {SalesChartDataItem} from "../../../store/types";
import {Space, Typography} from "antd";
import {ComponentWrap} from "../../ui/ComponentWrap";


interface SalesChartProps {
    dataSource: SalesChartDataItem[]
}

/**
 * @description A graph that shows how sales have changed by month
 * @param dataSource
 * @constructor
 */
export const SalesChart: FC<SalesChartProps> = ({dataSource}) => {

    const config = {
        data: dataSource,
        xField: 'month',
        yField: 'sum',
        point: {
            shapeField: 'square',
            sizeField: 4,
        },
        interaction: {
            tooltip: {
                marker: false,
            },
        },
        style: {
            lineWidth: 2,
        },

    };

    return (
        <ComponentWrap>
            <Space>
                <Typography.Title level={3}>
                    Sales by month
                </Typography.Title>
            </Space>
            <Line {...config} />
        </ComponentWrap>
    );
};

export default SalesChart


