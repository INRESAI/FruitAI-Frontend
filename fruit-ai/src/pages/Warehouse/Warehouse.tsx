import { Button } from "antd"
import Title from "antd/es/typography/Title"

const Warehouse = () => {
    return (
        <div className="warehouse-main">
            <div className="warehouse-title">
                <Title className="title-text" level={3}>Danh sách camera</Title>
                <Button className="title-button">Tạo kho mới</Button>
            </div>
        </div>
    )
}

export default Warehouse