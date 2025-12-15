import { EyeOutlined } from "@ant-design/icons";
import { Space, Tag, Tooltip } from "antd";
import { Link } from "react-router";
import dayjs from "dayjs";
import { TextCell } from "../../../../components/common/TextCell";
import type { IOrder, OrderStatus } from "../../../../common/types/Order";

const renderStatus = (status: OrderStatus) => {
  switch (status) {
    case "BUYED":
      return <Tag color="blue">Đã mua</Tag>;
    case "USED":
      return <Tag color="green">Đã sử dụng</Tag>;
    case "CANCELLED":
      return <Tag color="red">Đã huỷ</Tag>;
    default:
      return <Tag>Không xác định</Tag>;
  }
};

export const columnTicket = (
  getSorterProps: (field: keyof IOrder) => object,
) => {
  return [
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Mã vé</p>,
      dataIndex: "_id",
      key: "_id",
      width: 80,
      ...getSorterProps("_id"),
      render: (id: string) => <Tag className="uppercase">{id.slice(-8)}</Tag>,
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Khách hàng</p>,
      dataIndex: "customerInfo",
      key: "customerInfo",
      width: 180,
      render: (customerInfo: IOrder["customerInfo"]) => (
        <>
          <TextCell text={customerInfo?.userName || "Chưa cập nhật"} />
          <TextCell text={customerInfo?.phone} />
        </>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Tuyến đường</p>,
      dataIndex: "pickupPoint",
      key: "pickupPoint",
      width: 180,
      render: (pickupPoint: string, record: IOrder) => (
        <>
          <TextCell text={`${pickupPoint}`} />
          <TextCell text={`${record.dropPoint}`} />
        </>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Xe, ghế</p>,
      dataIndex: "seats",
      key: "seats",
      width: 160,
      render: (seats: IOrder["seats"], record: IOrder) => {
        const seatText =
          seats?.length > 0
            ? seats.map((s) => s.seatLabel).join(", ")
            : "Chưa chọn";
        return (
          <div>
            <TextCell text={record.carInfo.licensePlate} />
            <TextCell text={seatText} />
          </div>
        );
      },
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Tổng tiền</p>,
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 140,
      render: (price: number) => (
        <TextCell text={price ? price.toLocaleString("vi-VN") + " ₫" : "—"} />
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Giờ khởi hành</p>,
      dataIndex: "startTime",
      key: "startTime",
      width: 170,
      ...getSorterProps("startTime"),
      render: (time: string) => (
        <div>
          <p>{dayjs(time).format("HH:mm")}</p>
          <p>{dayjs(time).format("DD/MM/YYYY")}</p>
        </div>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Trạng thái</p>,
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status: OrderStatus) => renderStatus(status),
    },
    {
      title: <p style={{ whiteSpace: "nowrap" }}>Thao tác</p>,
      key: "action",
      width: 100,
      render: (_: any, record: IOrder) => (
        <Space style={{ display: "flex", gap: 12 }}>
          <Tooltip title="Xem chi tiết vé">
            <Link to={`/admin/ticket/${record._id}`}>
              <EyeOutlined style={{ cursor: "pointer", fontSize: 18 }} />
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];
};
