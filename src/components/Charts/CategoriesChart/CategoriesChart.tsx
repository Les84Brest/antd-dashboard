import React, {useState, useEffect, FC} from 'react';
import {Column} from '@ant-design/plots';
import {forEach, groupBy} from 'lodash-es';
import {Space, Typography} from "antd";
import {CategoryChartDataItem} from "../../../store/types";

type AnnotationType = {
    type: string,
    data: Record<any, any>,
    xField: string,
    yField: string,
    style: { [key: string]: any },
    tooltip: boolean,
}

interface CategoriesChartProps {
    dataSource: CategoryChartDataItem[]
}

const data = [
    {
        "year": "1991",
        "value": 3,
        "type": "Lon"
    },
    {
        "year": "1992",
        "value": 4,
        "type": "Lon"
    },
    {
        "year": "1993",
        "value": 3.5,
        "type": "Lon"
    },
    {
        "year": "1994",
        "value": 5,
        "type": "Lon"
    },
    {
        "year": "1995",
        "value": 4.9,
        "type": "Lon"
    },
    {
        "year": "1996",
        "value": 6,
        "type": "Lon"
    },
    {
        "year": "1997",
        "value": 7,
        "type": "Lon"
    },
    {
        "year": "1998",
        "value": 9,
        "type": "Lon"
    },
    {
        "year": "1999",
        "value": 13,
        "type": "Lon"
    },
    {
        "year": "1991",
        "value": 3,
        "type": "Bor"
    },
    {
        "year": "1992",
        "value": 4,
        "type": "Bor"
    },
    {
        "year": "1993",
        "value": 3.5,
        "type": "Bor"
    },
    {
        "year": "1994",
        "value": 5,
        "type": "Bor"
    },
    {
        "year": "1995",
        "value": 4.9,
        "type": "Bor"
    },
    {
        "year": "1996",
        "value": 6,
        "type": "Bor"
    },
    {
        "year": "1997",
        "value": 7,
        "type": "Bor"
    },
    {
        "year": "1998",
        "value": 9,
        "type": "Bor"
    },
    {
        "year": "1999", // month
        "value": 13, // sum
        "type": "Bor" // category
    }
]

export const CategoriesChart: FC<CategoriesChartProps> = ({dataSource}) => {

    const annotations: AnnotationType[] = [];
    forEach(groupBy(dataSource, 'month'), (values, k) => {
        const value = values.reduce((a, b) => a + b.sum, 0);
        annotations.push({
            type: 'text',
            data: [k, value],
            style: {
                textAlign: 'center',
                fontSize: 14,
                fill: 'rgba(0,0,0,0.85)',
                text: `${value}`,
                textBaseline: 'bottom',
                position: 'top',
            },
            xField: 'month',
            yField: 'sum',
            tooltip: false,
        });
    });
    console.log(annotations);
    const config = {
        data: dataSource,
        xField: 'month',
        yField: 'sum',
        stack: true,
        colorField: 'category',
        label: {
            text: 'sum',
            textBaseline: 'bottom',
            position: 'inside',
        },
        annotations,
    };
    return (
        <div className="char-wrap">
            <Space>
                <Typography.Title level={3}>
                    Sales by categories
                </Typography.Title>
            </Space>
            <Column {...config} />
        </div>
    );
};
export default CategoriesChart


// const annotations: AnnotationType[] = [];
// forEach(groupBy(data, 'year'), (values, k) => {
//     const value = values.reduce((a, b) => a + b.value, 0);
//     annotations.push({
//         type: 'text',
//         data: [k, value],
//         style: {
//             textAlign: 'center',
//             fontSize: 14,
//             fill: 'rgba(0,0,0,0.85)',
//             text: `${value}`,
//             textBaseline: 'bottom',
//             position: 'top',
//         },
//         xField: 'year',
//         yField: 'value',
//         tooltip: false,
//     });
// });
//
// const config = {
//     data,
//     xField: 'year',
//     yField: 'value',
//     stack: true,
//     colorField: 'type',
//     label: {
//         text: 'value',
//         textBaseline: 'bottom',
//         position: 'inside',
//     },
//     annotations,
// };