import { Button, Tag } from "antd";
import dayjs from "dayjs";
import type { IOrder, OrderStatus } from "../../../common/types/Order";
import { TextCell } from "../../../components/common/TextCell";
import { Link } from "react-router";
import { EyeOutlined } from "@ant-design/icons";

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

export const columnUserTicket = (
  getSorterProps: (field: keyof IOrder) => object,
) => {
  return [
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Mã vé</p>,
      dataIndex: "_id",
      key: "_id",
      width: 80,
      ...getSorterProps("_id"),
      render: (id: string) => (
        <div>
          <Tag className="uppercase">{id.slice(-8)}</Tag>
        </div>
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
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Ngày mua</p>,
      dataIndex: "createdAt",
      key: "createdAt",
      width: 100,
      ...getSorterProps("createdAt"),
      render: (createdAt: string) => (
        <div>
          <p>{dayjs(createdAt).format("DD/MM/YYYY")}</p>
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
      dataIndex: "_id",
      key: "action",
      width: 80,
      render: (id: string) => (
        <div>
          <Link to={`/profile/my-ticket/${id}`}>
            <Button icon={<EyeOutlined />} type="text"></Button>
          </Link>
        </div>
      ),
    },
  ];
};
