/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Space, Tag, Tooltip } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { QUERY_KEY } from "../../../../../common/constants/queryKey";
import { ROLE_LABEL } from "../../../../../common/constants/role";
import {
  STATUS_SCHEDULE,
  STATUS_SCHEDULE_COLOR,
} from "../../../../../common/constants/status";
import { useToast } from "../../../../../common/hooks/useToast";
import { updateDisableSchedule } from "../../../../../common/services/schedule.service";
import type { ICrew, ISchedule } from "../../../../../common/types/Schedule";
import type { IUser } from "../../../../../common/types/User";
import { formatCurrency } from "../../../../../common/utils";
import { TextCell } from "../../../../../components/common/TextCell";
import ModalUpdateSchedule from "./ModalUpdateSchedule";
dayjs.locale("vi");
dayjs.extend(localizedFormat);

export const columnSchedule = () => {
  const { message: antdMessage, handleAxiosError } = useToast();
  const queryClient = useQueryClient();
  const formatDay = (date: string) => {
    const hours = dayjs(date).format("HH:mm");
    const dayOfWeek = dayjs(date).format("dddd");
    const day = dayjs(date).format("[Ngày] DD, [tháng] MM, [Năm] YYYY");
    return {
      hours,
      dayOfWeek: dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1),
      day,
    };
  };
  const { mutate } = useMutation({
    mutationFn: (id: string) => updateDisableSchedule(id),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(QUERY_KEY.SCHEDULE.ROOT),
      });
    },
    onError: (err) => handleAxiosError(err),
  });
  return [
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Xuất bến</p>,
      dataIndex: "startTime",
      key: "startTime",
      width: 170,
      render: (startTime: string) => {
        const { dayOfWeek, hours, day } = formatDay(startTime);
        return (
          <div>
            <p>
              {hours}, {dayOfWeek}
            </p>
            <p>{day}</p>
          </div>
        );
      },
    },
    {
      title: (
        <p style={{ whiteSpace: "nowrap", margin: 0 }}>Đến nơi (Dự kiến)</p>
      ),
      dataIndex: "arrivalTime",
      key: "arrivalTime",
      width: 170,
      render: (arrivalTime: string) => {
        const { dayOfWeek, hours, day } = formatDay(arrivalTime);
        return (
          <div>
            <p>
              {hours}, {dayOfWeek}
            </p>
            <p>{day}</p>
          </div>
        );
      },
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Giá tiền</p>,
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (price: number) => <p>{formatCurrency(price)}</p>,
    },
    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Nhân viên</p>,
      dataIndex: "crew",
      key: "crew",
      width: 150,
      render: (crew: ICrew[]) => {
        console.log(ROLE_LABEL[crew[0].role]);
        return (
          <div>
            <TextCell
              text={`${ROLE_LABEL[crew[0].role]}: ${(crew[0].userId as IUser).userName}`}
            />
            <TextCell
              text={`${ROLE_LABEL[crew[1].role]}: ${(crew[1].userId as IUser).userName}`}
            />
          </div>
        );
      },
    },

    {
      title: <p style={{ whiteSpace: "nowrap", margin: 0 }}>Hoạt động</p>,
      dataIndex: "isDisable",
      key: "isDisable",
      width: 150,
      render: (disable: boolean, record: ISchedule) => (
        <div className="flex flex-col gap-1">
          <Tag color={disable ? "red" : "green"}>
            {disable ? "Ngưng hoạt động" : "Đang hoạt động"}
          </Tag>
          <Tag color={STATUS_SCHEDULE_COLOR[record.status]}>
            {STATUS_SCHEDULE[record.status]}
          </Tag>
        </div>
      ),
    },
    {
      title: <p style={{ whiteSpace: "nowrap" }}>Thao tác</p>,
      key: "action",
      width: 50,
      render: (_: any, record: ISchedule) => (
        <Space style={{ display: "flex", gap: 12 }}>
          <Space>
            <ModalUpdateSchedule schedule={record}>
              <Tooltip title="Cập nhật">
                <EditOutlined style={{ color: "blue" }} />
              </Tooltip>
            </ModalUpdateSchedule>

            {!record.isDisable ? (
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
                onClick={() => mutate(record._id)}
                icon={<UnlockOutlined />}
                size="small"
              />
            )}
          </Space>
        </Space>
      ),
    },
  ];
};
