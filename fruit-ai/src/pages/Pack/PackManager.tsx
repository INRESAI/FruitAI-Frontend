import { Button, Table } from 'antd'
import React, { useState } from 'react'
import type { ColumnsType } from 'antd/es/table';
import {
  EditOutlined,
  LoginOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import './PackStyle.scss';
import { Link } from 'react-router-dom';



interface DataType {
    key: React.Key;
    orderByNumber: number;
    type: string;
    importedTime: Date;
    estimatedExportTime: Date;
    totalPack: number;
    exportedQuantity: number;
    remain: number;
  }
  
  const columns: ColumnsType<DataType> = [
    {
        title: 'STT',
        dataIndex: 'orderByNumber',
    },
    {
        title: 'Phân loại',
        dataIndex: 'type',
        render: (text: string) => (
            <Link to='/statistic'>
                <a className='type'>{text}</a>
            </Link>
        ),
    },
    {
        title: 'Ngày nhập',
        dataIndex: 'importedTime',
    },
    {
        title: 'Ngày xuất dự kiến',
        dataIndex: 'estimatedExportedTime',
    },
    {
      title: 'Tổng số sọt',
      dataIndex: 'totalPack',
    },
    {
      title: 'Đã xuất',
      dataIndex: 'exportedQuantity',
    },
    {
      title: 'Còn lại',
      dataIndex: 'remain',
    },
    {
        title: "Thao tác",
        key: "action",
        render: ()=>(
            <div>
                <EditOutlined className='action'/>
                <LoginOutlined className='action'/>
                <DeleteOutlined className='action'/>
            </div>
        )
    }
  ];
  
  const data: DataType[] = [];
  for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        // name: `Edward King ${i}`,
        // age: 32,
        // address: `London, Park Lane no. ${i}`,

        orderByNumber: i,
        type: `Edward King ${i}`,
        importedTime: new Date(),
        estimatedExportTime: new Date() ,
        totalPack: 88,
        exportedQuantity: 88,
        remain: 0,
    });
  }

const CPackManager = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
  
    const start = () => {
      setLoading(true);
      // ajax request after empty completing
      setTimeout(() => {
        setSelectedRowKeys([]);
        setLoading(false);
      }, 1000);
    };
  
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };
  
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <div className='main-title'>Danh sách lô ()</div>
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                        Xóa nhiều
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
        </div>
    )
}

export default CPackManager