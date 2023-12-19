import React, {useState, useEffect, FC} from 'react';
import {Line} from '@ant-design/plots';
import {SalesChartDataItem} from "../../../store/types";
import {Space, Typography} from "antd";

interface SalesChartProps {
    dataSource: SalesChartDataItem[]
}

export const SalesChart: FC<SalesChartProps> = ({dataSource}) => {

    // const config = {
    //     data: dataSource,
    //     xField: 'month',
    //     yField: 'sum',
    //     label: {},
    //     point: {
    //         size: 5,
    //         shape: 'square',
    //         style: {
    //             fill: 'white',
    //             stroke: '#5B8FF9',
    //             lineWidth: 2,
    //         },
    //     },
    //     tooltip: {
    //         fields: ['sum'],
    //         showMarkers: false,
    //         position: 'top'
    //     },
    //     state: {
    //         active: {
    //             style: {
    //                 shadowBlur: 9,
    //                 stroke: '#000',
    //                 fill: 'red',
    //             },
    //         },
    //     },
    //     interactions: [
    //         {
    //             type: 'marker-active',
    //         },
    //     ],
    // };

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
        <div className="char-wrap">
            <Space>
                <Typography.Title level={3}>
                    Sales by month
                </Typography.Title>
            </Space>
        <Line {...config} />
        </div>
    );
};

export default SalesChart


