import {Routes, Route} from "react-router-dom";
import {FC} from "react";
import Dashboard from "../../pages/Dashboard";
import ManagerDetails from "../../pages/ManagerDetails";

export const AppRouter: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path="/manager/:id" element={<ManagerDetails/>}></Route>
        </Routes>
    )
}

export default AppRouter