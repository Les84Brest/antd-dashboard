import {FC, useEffect} from 'react'
import orderStore from "../../store/OrderStore";
import {observer} from "mobx-react-lite";
import {Row, Col} from 'antd'
import OrdersDataTable from "../OrdersDataTable/OrdersDataTable";
import SalesChart from "../Charts/SalesChart/SalesChart";
import ManagersChart from "../Charts/ManagersChart/ManagersChart";
import CategoriesChart from "../Charts/CategoriesChart/CategoriesChart";
import ManagerCard from "../ManagerCard/ManagerCard";

export const DashboardContent: FC = observer(() => {
    const {
        initOrdersData,
        ordersRawData,
        managers,
        categories,
        salesChartData,
        managersChartData,
        categoriesChartData,
        managersGeneralData
    } = orderStore;

    console.log(managersGeneralData)
    useEffect(() => {
        initOrdersData();
    }, [])


    const renderManagerData = () => {
        if(!managersGeneralData || !managersChartData.length){
            return;
        }

        return managersGeneralData.map(manager => (<Col xl={8} lg={12} md={24} xs={24} ><ManagerCard manager={manager}/></Col>))
    }

    return (
        <>
            {/*Managers general data*/}
            <Row gutter={{xs: 8, sm: 16, md: 20}}>
                {renderManagerData()}
            </Row>

            <Row>
                <Col lg={8} md={24} xs={24}><SalesChart dataSource={salesChartData}/></Col>
                <Col lg={8} md={24} xs={24}><ManagersChart dataSource={managersChartData}/></Col>
                <Col lg={8} md={24} xs={24}><CategoriesChart dataSource={categoriesChartData}/></Col>
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