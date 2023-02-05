import Icon, { DeleteOutlined, EditOutlined, LoginOutlined } from '@ant-design/icons';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { IWareHouse } from '../../common/define-fruit';
import DetailsIcon from '../../images/default_icon.png';
import { setWareHouse } from '../../redux/controller';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import AddWarehouseModel from './AddWarehouseModel';
import './warehouse.scss';
// interface MyProps{
//     lstWarehouse: IWareHouse[]
// }
interface DataType {
    id: string;
    key: React.Key;
    orderByNumber: number;
    name: string;
    address: string;
}

const Warehouse = () => {
    const [lstWareHouse, setLstWareHouse] = useState<DataType[]>([])
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const { sliceLstWarehouses } = useSelectorRoot(item => item.fruit);
    const dispatch = useDispatchRoot();

    useEffect(() => {
        const warehouses = []
        for (let i = 0; i < sliceLstWarehouses.length; i++) {
            warehouses.push({
                id: sliceLstWarehouses[i].id,
                key: i,
                orderByNumber: i + 1,
                name: sliceLstWarehouses[i].name,
                address: sliceLstWarehouses[i].address,
            });
        }
        setLstWareHouse(warehouses);
    }, [sliceLstWarehouses])

    const rowSelection = (selectedRows: any) => {
        const warehouseSelect: IWareHouse = {
            id: selectedRows.id,
            name: selectedRows.name,
            address: selectedRows.address,
        }
        dispatch(setWareHouse(warehouseSelect))
        console.log('selectedRows: ', warehouseSelect);
        window.location.reload();
    }

    const toggleAddWarehouseModal = () => {
        setIsOpenModal(!isOpenModal);
    }

    return (
        <div className="warehouse-main">
            <AddWarehouseModel
                isOpenModal={isOpenModal}
                toggleAddWarehouseModal={toggleAddWarehouseModal}
            />
            <div className="warehouse-title">
                <Title className="title-text" level={3}>Vui lòng chọn kho đặt làm mặc định!</Title>
                <Button
                    className="title-button"
                    onClick={() => setIsOpenModal(true)}>
                    Tạo kho mới
                </Button>
            </div>
            <div className="warehouse-table">
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Tên kho</TableCell>
                                <TableCell align="center">Địa chỉ</TableCell>
                                <TableCell align="center">Mặc định</TableCell>
                                <TableCell align="center" style={{width: 150}}>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lstWareHouse.map((warehouse) => (
                                <TableRow
                                    onClick={() => rowSelection(warehouse)}
                                    key={warehouse.name}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell align="center" component="th" scope="row">
                                        {warehouse.orderByNumber}
                                    </TableCell>
                                    <TableCell align="center">{warehouse.name}</TableCell>
                                    <TableCell align="center">{warehouse.address}</TableCell>
                                    <TableCell align="center">
                                        <Button className='default-button'>
                                            <Icon className='default-button-icon' component={() => (<img className='icon-default' src={DetailsIcon} />)} />
                                            <span className='default-button-text'>Đặt làm mặt định</span>
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <div>
                                            <EditOutlined className='action' />
                                            <LoginOutlined className='action' />
                                            <DeleteOutlined className='action' />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default Warehouse