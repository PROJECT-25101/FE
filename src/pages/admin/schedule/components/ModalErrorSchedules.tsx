/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge, Button, Popconfirm, Tabs } from "antd";
import dayjs from "dayjs";
import { DAYOFWEEK_LABEL } from "../../../../common/constants/dayOfWeek";
import { QUERY_KEY } from "../../../../common/constants/queryKey";
import { useToast } from "../../../../common/hooks/useToast";
import { insertManyContinue } from "../../../../common/services/schedule.service";
import type { ISchedule } from "../../../../common/types/Schedule";
import type { IUser } from "../../../../common/types/User";
import { formatCurrency } from "../../../../common/utils";
import { useEffect } from "react";

const ModalErrorSchedules = ({
  instance,
  failedSchedules,
  closeModal,
  createdSchedules,
  setOpenMainModal,
}: {
  instance: any;
  failedSchedules: (ISchedule & { message: string })[];
  createdSchedules: ISchedule[];
  closeModal: () => void;
  setOpenMainModal: (e: boolean) => void;
}) => {
  const items: any[] = [];
  const { message: antdMessage, handleAxiosError } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ISchedule[]) => insertManyContinue(payload),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERY_KEY.SCHEDULE.ROOT),
      });
      setOpenMainModal(false);
      closeModal();
    },
    onError: (err) => handleAxiosError(err),
  });
  useEffect(() => {
    instance.update({
      footer: (
        <div className="flex justify-end gap-2 mt-4">
          <Button
            disabled={isPending}
            danger
            loading={isPending}
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => {
              closeModal();
            }}
          >
            Đóng
          </Button>
          {createdSchedules.length > 0 && (
            <Popconfirm
              title="Bạn có chắc chắn không?"
              onConfirm={() => mutate(createdSchedules)}
            >
              <Button
                disabled={isPending}
                loading={isPending}
                type="primary"
                style={{ background: `#0C7D41`, color: "white" }}
              >
                Tạo những lịch khả dụng
              </Button>
            </Popconfirm>
          )}
        </div>
      ),
    });
  }, []);

  if (failedSchedules?.length > 0) {
    items.push({
      key: "failed",
      label: (
        <div className="flex items-center gap-2">
          <span>Lịch tạo thất bại</span>
          <Badge
            count={failedSchedules.length}
            style={{ backgroundColor: "#ff4d4f" }}
          />
        </div>
      ),
      children: (
        <div
          className="grid gap-4 max-h-[75vh] overflow-scroll"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {failedSchedules.map((item) => (
            <div
              key={item._id}
              className="flex flex-col bg-white p-4 shadow-lg rounded-xl border border-gray-200"
            >
              {/* Heading */}
              <h3 className="text-lg font-semibold text-red-600 mb-2">
                Lịch chạy bị trùng
              </h3>

              {/* Car */}
              <div className="text-sm text-gray-800 mb-1">
                <span className="font-semibold">Xe:</span>{" "}
                {item.carId.licensePlate} – {item.carId.model.brand}{" "}
                {item.carId.model.model}
              </div>

              {/* Route */}
              <div className="text-sm text-gray-800 mb-2">
                <span className="font-semibold">Tuyến:</span>{" "}
                {item.routeId.pickupPoint.label} →{" "}
                {item.routeId.dropPoint.label}
              </div>

              {/* Time */}
              <div className="text-sm text-gray-800 mb-2">
                <span className="font-semibold">Giờ xuất bến:</span>{" "}
                {dayjs(item.startTime).format(
                  "HH:mm [Ngày] DD [Tháng] MM [Năm] 2025",
                )}
                <br />
                <span className="font-semibold">Giờ đến dự kiến:</span>{" "}
                {dayjs(item.arrivalTime).format(
                  "HH:mm [Ngày] DD [Tháng] MM [Năm] 2025",
                )}
              </div>

              {/* Crew */}
              <div className="text-sm text-gray-800 mb-2">
                <span className="font-semibold">Tổ lái:</span>
                <ul className="ml-4 list-disc">
                  {item.crew.map((c, index) => (
                    <li key={index}>
                      {(c.userId as IUser).userName} –{" "}
                      <span className="capitalize">{c.role}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-sm text-gray-800 mb-2">
                <span className="font-semibold">Giá vé:</span>{" "}
                {formatCurrency(item.price as number)} đ
              </div>

              <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 mt-auto">
                {item.message}
              </div>
            </div>
          ))}
        </div>
      ),
    });
  }
  if (createdSchedules?.length > 0) {
    items.push({
      key: "created",
      label: (
        <div className="flex items-center gap-2">
          <span>Lịch có thể tạo</span>
          <Badge
            count={createdSchedules.length}
            style={{ backgroundColor: "#52c41a" }}
          />
        </div>
      ),
      children: (
        <div
          className="grid gap-4 max-h-[75vh] overflow-y-auto"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          {createdSchedules.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow rounded-xl border border-gray-200"
            >
              <h3 className="text-base font-semibold text-green-600 mb-3">
                Lịch được tạo
              </h3>
              <div className="text-sm text-gray-800 mb-2">
                <span className="font-semibold">Ngày:</span>{" "}
                {dayjs(item.startTime).format("DD/MM/YYYY")}
              </div>
              <div className="text-sm text-gray-800 mb-1">
                <span className="font-semibold">Giờ chạy:</span>{" "}
                {dayjs(item.startTime).format("HH:mm")}
              </div>
              <div className="text-sm text-gray-800 mb-1">
                <span className="font-semibold">Đến dự kiến:</span>{" "}
                {dayjs(item.arrivalTime).format("HH:mm")}
              </div>
              <div className="text-sm text-gray-800">
                <span className="font-semibold">Thứ:</span>{" "}
                {DAYOFWEEK_LABEL[item.dayOfWeek]}
              </div>
            </div>
          ))}
        </div>
      ),
    });
  }

  return <Tabs type="card" items={items} />;
};

export default ModalErrorSchedules;
