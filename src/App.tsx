import React, {FC} from 'react';
import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import DashboardContent from "./components/DashboardContent/DashboardContent";
import {Layout} from "antd";
import './App.css';
import styled from "styled-components";

const {Content} = Layout;

const StyledContent = styled(Content)`
    padding: 1rem;
`;

const App: FC = () => {
    return (
        <div className="App">
            <Layout>
                <DashboardHeader/>
                <StyledContent>
                    <DashboardContent />
                </StyledContent>
            </Layout>
        </div>
    );
};

export default App;
