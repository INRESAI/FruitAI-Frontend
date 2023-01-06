import { DeleteOutlined, EditOutlined, LoginOutlined } from '@ant-design/icons';
import { Button, Table } from "antd";
import type { ColumnsType } from 'antd/es/table';
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import './warehouse.scss';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import { getAllWarehouseByUserIdRequest } from '../../redux/controller';
import { WarehouseRequest } from '../../common/define-fruit';
import Column from 'antd/es/table/Column';

const columns = [
    {
        title: 'Tên kho',
        dataIndex: 'name',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
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
    const dispatch = useDispatchRoot();

    const { sliceLstWarehouses } = useSelectorRoot(item => item.fruit);


    useEffect(() => {
        let userId = localStorage.getItem('userId') ? localStorage.getItem('userId') : "";
        console.log(userId ? userId : '');
        if (userId) {
            userId = userId.slice(1);
            userId = userId.slice(0, userId.length - 1);
            const req: WarehouseRequest = {
                "userId": userId,
                "additionalProp1": {},
            };
            dispatch(getAllWarehouseByUserIdRequest(req))
        }
    }, [])

    useEffect(() => {
        console.log(sliceLstWarehouses);
    }, [sliceLstWarehouses])

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
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
                    dataSource={sliceLstWarehouses} >

                </Table>
            </div>
        </div>
    )
}

export default Warehouse