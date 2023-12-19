import React, { FC} from 'react';
import {Column} from '@ant-design/plots';
import {forEach, groupBy} from 'lodash-es';
import {Space, Typography} from "antd";
import {CategoryChartDataItem} from "../../../store/types";
import {ComponentWrap} from "../../ui/ComponentWrap";

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

/**
 * @description Renders Chart showing sales by categories
 * @param dataSource
 * @constructor
 */
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
        <ComponentWrap>
            <Space>
                <Typography.Title level={3}>
                    Sales by categories
                </Typography.Title>
            </Space>
            <Column {...config} />
        </ComponentWrap>
    );
};
export default CategoriesChart
