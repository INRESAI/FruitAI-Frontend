import Icon, { DeleteOutlined, EditOutlined, LoginOutlined } from '@ant-design/icons';
import { Button, Table } from "antd";
import type { ColumnsType } from 'antd/es/table';
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import './warehouse.scss';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { getAllWarehouseByUserIdRequest, setWareHouse } from '../../redux/controller';
import { IWareHouse, WarehouseRequest } from '../../common/define-fruit';
import Column from 'antd/es/table/Column';
import DetailsIcon from '../../images/default_icon.png'

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
const columns = [
    {
        title: 'STT',
        dataIndex: 'orderByNumber',
    },
    {
        title: 'Tên kho',
        dataIndex: 'name',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
    {
        title: "Mặc định",
        key: "default",
        render: () => (
            <div>
                <Button className='default-button'>
                    <Icon className='default-button-icon' component={() => (<img className='icon-default' src={DetailsIcon} />)} />
                    <span className='default-button-text'>Đặt làm mặt định</span>
                </Button>
            </div>
        )
    },
    {
        title: "Thao tác",
        key: "action",
        render: () => (
            <div>
                <EditOutlined className='action' />
                <LoginOutlined className='action' />
                <DeleteOutlined className='action' />
            </div>
        )
    }
];

const Warehouse = () => {
    const [lstWareHouse, setLstWareHouse] = useState<DataType[]>([])
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

    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            const warehouseSelect: IWareHouse = {
                id: selectedRows[0].id,
                name: selectedRows[0].name,
                address: selectedRows[0].address,
            }
            dispatch(setWareHouse(warehouseSelect))
            console.log('selectedRows: ', warehouseSelect);
            window.location.reload();
        },
    };
    return (
        
        <div className="warehouse-main">
            <div className="warehouse-title">
                <Title className="title-text" level={3}>Vui lòng chọn kho đặt làm mặc định!</Title>
                <Button className="title-button">Tạo kho mới</Button>
            </div>
            <div className="warehouse-table">
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={lstWareHouse} >
                </Table>
            </div>
        </div>
    )
}

export default Warehouse