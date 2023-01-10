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
import store, { persistor, useDispatchRoot, useSelectorRoot } from './redux/store'
import Warehouse from './pages/Warehouse/Warehouse'
import { useEffect, useState } from 'react'
import { getAllNotificationByIdUserRequest } from './redux/controller'
const { Content } = Layout;
const App = () => {
    const [isLogin, setIsLogin] = useState<string>('')
    const [clickedWareHouseId, setClickedWareHouseId] = useState<string>('')

    const dispatch = useDispatchRoot()

    useEffect(() => {
        const checkLogin = localStorage.getItem('token') ? localStorage.getItem('token') : ''
        if (checkLogin) {
            setIsLogin(checkLogin);
        }
        let userId = localStorage.getItem('userId') !== null ? localStorage.getItem('userId') : 'abc'
        if(userId){
            userId = userId.slice(1);
            userId = userId.slice(0, userId.length - 1);
        }
        dispatch(getAllNotificationByIdUserRequest({

            userId: userId,
            additionalProp1: {}
        }))
    }, []);

    useEffect(() => {

        getAllNotification();
        
        const warehouseId = localStorage.getItem('warehouseId') ? localStorage.getItem('warehouseId') : '';
        if (warehouseId) {
            setClickedWareHouseId(warehouseId);
        }
    })

    const getAllNotification = () => {
        setInterval(()=>{
            console.log('hehehehe')
            let userId = localStorage.getItem('userId') !== null ? localStorage.getItem('userId') : 'abc'
            if(userId){
                userId = userId.slice(1);
                userId = userId.slice(0, userId.length - 1);
    
    
            }
            dispatch(getAllNotificationByIdUserRequest({
    
                userId: userId,
                additionalProp1: {}
            }))
        },3000)
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {clickedWareHouseId ? <SideBar /> : <></>}
            {/* <SideBar /> */}
            <Layout className="site-layout">
                <Header />
                {isLogin && !clickedWareHouseId ? <Warehouse /> : <></>}
                {clickedWareHouseId ?
                    <Content style={{ margin: '0 16px' }}>
                        <Routes>
                            <Route path='/' element={<OverView />} />
                            <Route path='/pack_manager' element={<PackManager />} />
                            <Route path='/camera_manager' element={<CameraManager />} />
                            <Route path='/assist' element={<Assist />} />
                            <Route path='/camera_detail/:cameraId' element={<CameraDetail />} />
                            <Route path='/statistic' element={<StatisticTypeOfFruitByDate />} />
                            <Route path='/warehouse' element={<Warehouse />} />
                        </Routes>
                    </Content> : <></>
                }

            </Layout>
        </Layout>
    )
}

export default App
