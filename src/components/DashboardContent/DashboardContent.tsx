import {FC, useEffect} from 'react'
import {observe} from "mobx";
import orderStore from "../../store/OrderStore";
import {observer} from "mobx-react-lite";
import {Row, Col} from 'antd'
import OrdersDataTable from "../OrdersDataTable/OrdersDataTable";
import SalesChart from "../Charts/SalesChart/SalesChart";
import ManagersChart from "../Charts/ManagersChart/ManagersChart";
import CategoriesChart from "../Charts/CategoriesChart/CategoriesChart";

export const DashboardContent: FC = observer(() => {
    const {
        initOrdersData,
        ordersRawData,
        managers,
        categories,
        salesChartData,
        managersChartData,
        categoriesChartData
    } = orderStore;



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
                <Col span={8}><SalesChart dataSource={salesChartData}/></Col>
                <Col span={8}><ManagersChart dataSource={managersChartData}/></Col>
                <Col span={8}><CategoriesChart dataSource={categoriesChartData}/></Col>
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