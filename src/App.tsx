import './App.css';
import { Button, DatePicker, Space } from 'antd';
// import { RootStoreContext } from './store/root-store-context';
// import RootStore from './store/root-store';

function App() {
  return (
    //<RootStoreContext.Provider value={new RootStore()}>
    <Space>
      <DatePicker />
      <Button type="primary">Primary Button</Button>
    </Space>
    //</RootStoreContext.Provider>
  );
}

export default App;
