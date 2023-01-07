import { Layout } from 'antd'
import 'antd/dist/reset.css'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import SideBar from './components/SideBar/SideBar'
import Assist from './pages/Assist'
import CameraDetail from './pages/Camera/CameraDetail'
import CameraManager from './pages/Camera/CameraManager'
import OverView from './pages/OverView'
import PackManager from './pages/Pack/PackManager'
import StatisticTypeOfFruitByDate from './pages/StatisticTypeOfFruitByDate/StatisticTypeOfFruitByDate'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor, useSelectorRoot } from './redux/store'
import Warehouse from './pages/Warehouse/Warehouse'
import { useEffect, useState } from 'react'
const { Content } = Layout;
const App = () => {
    const [isLogin, setIsLogin] = useState<string>('')

    useEffect(() => {
        const checkLogin = localStorage.getItem('token') ? localStorage.getItem('token') : ''
        if (checkLogin) {
            setIsLogin(checkLogin);
        }
    }, []);
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* {sliceIsLogin ? <SideBar /> : <></>} */}
            <SideBar />
            <Layout className="site-layout">
                <Header />
                <Content style={{ margin: '0 16px' }}>
                    {/* {isLogin ?  <Warehouse/> : <></>} */}
                    <Routes>
                        <Route path='/' element={<OverView />} />
                        <Route path='/pack_manager' element={<PackManager />} />
                        <Route path='/camera_manager' element={<CameraManager />} />
                        <Route path='/assist' element={<Assist />} />
                        <Route path='/camera_detail/:cameraId' element={<CameraDetail />} />
                        <Route path='/statistic' element={<StatisticTypeOfFruitByDate />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    )
}

export default App
