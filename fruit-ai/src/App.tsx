import { Layout } from 'antd'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import SideBar from './components/SideBar/SideBar'
import Assist from './pages/Assist'
import CameraManager from './pages/Camera/CameraManager'
import OverView from './pages/OverView'
import PackManager from './pages/PackManager'

import 'antd/dist/reset.css'
import CameraDetail from './pages/Camera/CameraDetail'
const { Content } = Layout;
const App = () => (
    <Layout style={{ minHeight: '100vh' }}>
        <SideBar />

        <Layout className="site-layout">
            <Header />
            <Content style={{ margin: '0 16px' }}>
                <Routes>
                    <Route path='/' element={<OverView />} />
                    <Route path='/pack_manager' element={<PackManager />} />
                    <Route path='/camera_manager' element={<CameraManager />} />
                    <Route path='/assist' element={<Assist />} />
                    <Route path='/camera_detail' element={<CameraDetail />} />
                </Routes>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
    </Layout>
)

export default App
