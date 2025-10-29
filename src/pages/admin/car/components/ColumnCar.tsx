/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AppstoreOutlined,
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Space, Tag, Tooltip } from "antd";
import { Link } from "react-router";
import { QUERY_KEY } from "../../../../common/constants/queryKey";
import { useToast } from "../../../../common/hooks/useToast";
import { updateStatusCar } from "../../../../common/services/car.service";
import type { ICar, ICarModel } from "../../../../common/types/Car";
import { TextCell } from "../../../../components/common/TextCell";

export const columnCar = (getSorterProps: (field: keyof ICar) => object) => {
  const queryClient = useQueryClient();
  const { message, handleAxiosError } = useToast();

  const { mutate } = useMutation({
    mutationFn: updateStatusCar,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(QUERY_KEY.CAR.ROOT),
      });
      message.success(data.message);
    },
    onError: (error) => {
      handleAxiosError(error);
    },
  });

  return [
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Mã xe</p>,
      dataIndex: "_id",
      key: "_id",
      width: 50,
      ...getSorterProps("_id"),
      render: (id: string) => <Tag className="uppercase">{id.slice(-8)}</Tag>,
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Tên xe</p>,
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (name: string) => <TextCell text={name} />,
      ...getSorterProps("name"),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Biển số xe</p>,
      dataIndex: "licensePlate",
      key: "lisencePlate",
      width: 150,
      render: (lisencePlate: string) => (
        <p className="inline-block bg-white border border-black rounded px-2 py-[2px] text-xs font-bold tracking-wider shadow-[inset_0_0_3px_rgba(0,0,0,0.25)] uppercase font-mono">
          {lisencePlate || "Chưa cập nhật"}
        </p>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Hãng xe</p>,
      dataIndex: "model",
      key: "model",
      width: 150,
      render: (model: ICarModel) => (
        <TextCell text={model.brand || "Chưa cập nhật"} />
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Chỗ ngồi</p>,
      dataIndex: "maxSeatCapacity",
      key: "maxSeatCapacity",
      width: 150,
      render: (maxSeatCapacity: number, record: ICar) => {
        const seatShow = maxSeatCapacity
          ? `${maxSeatCapacity} Chỗ (${record.totalFloor} Tầng)`
          : "Chưa cập nhật";
        return <TextCell text={seatShow} style={{ fontSize: 12 }} />;
      },
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Trạng thái</p>,
      dataIndex: "status",
      key: "status",
      width: 190,
      render: (status: boolean) => (
        <Tag color={status ? "green" : "red"}>
          {status ? "Hoạt động" : "Ngưng hoạt động"}
        </Tag>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap" }}>Thao tác</p>,
      key: "action",
      width: 150,
      render: (_: any, record: ICar) => (
        <Space style={{ display: "flex", gap: 12 }}>
          <Tooltip title="Xem chi tiết">
            <Link to={`/admin/car/${record._id}`}>
              <EyeOutlined style={{ cursor: "pointer", fontSize: 18 }} />
            </Link>
          </Tooltip>
          <Tooltip title="Chỉnh sửa ghế ngồi">
            <Link to={`/admin/car/update/seat/${record._id}`}>
              <AppstoreOutlined style={{ cursor: "pointer", fontSize: 18 }} />
            </Link>
          </Tooltip>
          <Space>
            <Tooltip title="Cập nhật">
              <Link className="mx-1" to={`/admin/car/update/${record._id}`}>
                <EditOutlined style={{ color: "blue" }} />
              </Link>
            </Tooltip>

            {record.status ? (
              <Popconfirm
                placement="bottomLeft"
                title="Bạn chắc chắn muốn khóa?"
                onConfirm={() => mutate(record._id)}
              >
                <Button
                  type="text"
                  danger
                  icon={<LockOutlined />}
                  size="small"
                />
              </Popconfirm>
            ) : (
              <Button
                type="text"
                icon={<UnlockOutlined />}
                size="small"
                onClick={() => mutate(record._id)}
              />
            )}
          </Space>
        </Space>
      ),
    },
  ];
};
