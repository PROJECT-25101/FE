import { EditOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge, Button, Tag } from "antd";
import { Link } from "react-router";
import { QUERY_KEY } from "../../../../common/constants/queryKey";
import { useToast } from "../../../../common/hooks/useToast";
import { updateStatusRoute } from "../../../../common/services/route.service";
import type { IRoute } from "../../../../common/types/Route";
import { formatCurrency } from "../../../../common/utils";

const RouteCard = ({ item }: { item: IRoute }) => {
  const queryClient = useQueryClient();
  const { message: antdMessage, handleAxiosError } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => updateStatusRoute(id),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(QUERY_KEY.ROUTE.ROOT),
      });
    },
    onError: (err) => {
      handleAxiosError(err);
    },
  });

  return (
    <Badge.Ribbon
      color="yellow"
      text={
        <p className="text-xs text-black">{formatCurrency(item.routePrice)}</p>
      }
    >
      <div
        key={item._id}
        className="bg-white border border-l-4 cursor-pointer hover:shadow-xl  duration-300 border-l-[#0C7D41] border-b border-t border-r border-gray-300/30 shadow-md px-6 py-4 rounded-lg"
      >
        <p className="text-xs text-gray-600/50">
          Mã tuyến đường: {item._id.slice(-8)}
        </p>
        <Tag color={item.status ? "green" : "red"}>
          {item.status ? "Đang hoạt động" : "Ngừng hoạt động"}
        </Tag>
        <p className="text-base font-semibold line-clamp-1">
          {item.pickupPoint.label} - {item.dropPoint.label}{" "}
          {item.description && (
            <span className="text-gray-600/50 text-sm">
              ({item.description})
            </span>
          )}
        </p>
        <p className="text-gray-600/80 text-xs">Khoảng cách: {item.distance}</p>
        <p className="text-gray-600/80 text-xs">
          Thời gian chạy dự kiến: {item.duration} Tiếng
        </p>
        <div className="flex items-end justify-between">
          <p className="text-gray-600/80 text-xs">
            Ngày tạo: {new Date(item.createdAt).toLocaleDateString("vi-VN")}
          </p>
          <div className="flex gap-2 mt-3 justify-end items-center">
            <Link to={"/route/update/:id"}>
              <Button size="middle" icon={<EditOutlined />}></Button>
            </Link>
            <Button
              danger={item.status}
              onClick={() => mutate(item._id)}
              loading={isPending}
              icon={item.status ? <LockOutlined /> : <UnlockOutlined />}
              size="middle"
            />
          </div>
        </div>
      </div>
    </Badge.Ribbon>
  );
};

export default RouteCard;
