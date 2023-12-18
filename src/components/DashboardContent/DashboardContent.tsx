import {FC, useEffect} from 'react'
import {observe} from "mobx";
import orderStore from "../../store/OrderStore";
import {observer} from "mobx-react-lite";
import {Row, Col} from 'antd'
import OrdersDataTable from "../OrdersDataTable/OrdersDataTable";

export const DashboardContent: FC = observer(() => {
    const {initOrdersData, ordersRawData, managers, categories} = orderStore;

    useEffect(() => {
        initOrdersData();
    }, [])

    return (
        <>
            {/*Managers general data*/}
            <Row>
                <Col span={8}>Manager general data</Col>
                <Col span={8}>Manager general data</Col>
                <Col span={8}>Manager general data</Col>
                <Col span={8}>Manager general data</Col>
                <Col span={8}>Manager general data</Col>
                <Col span={8}>Manager general data</Col>

            </Row>

            <Row>
                <Col span={8}>Chart</Col>
                <Col span={8}>Chart</Col>
                <Col span={8}>Chart</Col>
            </Row>
            {/*Orders raw info    */}
            <Row>
                <Col span={24}>
                    <OrdersDataTable
                        ordersData={ordersRawData}
                        managers={managers}
                        categories={categories}
                    />
                </Col>
            </Row>
        </>
    );
})

export default DashboardContent