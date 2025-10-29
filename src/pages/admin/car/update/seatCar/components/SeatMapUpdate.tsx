import {
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  PlusOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Popconfirm, Popover } from "antd";
import { QUERY_KEY } from "../../../../../../common/constants/queryKey";
import { useToast } from "../../../../../../common/hooks/useToast";
import {
  createSeat,
  deleteFloor,
  deleteSeat,
  updateStatusFloor,
  updateStatusSeat,
} from "../../../../../../common/services/seat.service";
import type {
  IPayloadSeat,
  ISeatWithFloor,
} from "../../../../../../common/types/Seat";

type IProps = {
  floorIndex: number;
  items: ISeatWithFloor;
  carId: string;
};
const SeatMapUpdate = ({ floorIndex, items, carId }: IProps) => {
  const { message: antdMessage, handleAxiosError } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => updateStatusSeat(id),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(QUERY_KEY.SEAT.ROOT),
      });
    },
    onError: (err) => {
      handleAxiosError(err);
    },
  });
  const mutateCreateSeat = useMutation({
    mutationFn: (payload: IPayloadSeat) => createSeat(payload),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes(QUERY_KEY.SEAT.ROOT) ||
          query.queryKey.includes(QUERY_KEY.CAR.ROOT),
      });
    },
    onError: (err) => {
      handleAxiosError(err);
    },
  });
  const mutateDeleteSeat = useMutation({
    mutationFn: (id: string) => deleteSeat(id),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes(QUERY_KEY.SEAT.ROOT) ||
          query.queryKey.includes(QUERY_KEY.CAR.ROOT),
      });
    },
    onError: (err) => {
      handleAxiosError(err);
    },
  });
  const mutateDeleteFloor = useMutation({
    mutationFn: ({ seatIds, carId }: { seatIds: string[]; carId: string }) =>
      deleteFloor(seatIds, carId),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes(QUERY_KEY.SEAT.ROOT) ||
          query.queryKey.includes(QUERY_KEY.CAR.ROOT),
      });
    },
    onError: (err) => {
      handleAxiosError(err);
    },
  });
  const mutateUpdateFloor = useMutation({
    mutationFn: ({
      seatIds,
      carId,
      status,
    }: {
      seatIds: string[];
      carId: string;
      status: boolean;
    }) => updateStatusFloor(seatIds, carId, status),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes(QUERY_KEY.SEAT.ROOT) ||
          query.queryKey.includes(QUERY_KEY.CAR.ROOT),
      });
    },
    onError: (err) => {
      handleAxiosError(err);
    },
  });
  const handleAddSeat = (col: number, row: number, floor: number) => {
    const maxOrder =
      items?.seats.reduce((max, s) => Math.max(max, s.seatOrder || 0), 0) || 0;
    const seatOrder = maxOrder + 1;
    const seatLabel = `${String.fromCharCode(64 + row)}${seatOrder}`;
    mutateCreateSeat.mutate({
      floor,
      row,
      col,
      seatOrder,
      seatLabel,
      carId: carId as string,
    });
  };
  const isFull = items.seats.length >= 30;

  return (
    <div key={floorIndex}>
      <div className="flex items-center justify-between mb-4">
        <p className="flex-1">
          <span
            className={`${items.seats.length === 30 ? "text-red-500" : "text-[#0C7D41]"}`}
          >
            {items.seats.length}/30
          </span>{" "}
          Ghế
        </p>
        <p className="text-center flex-1 font-semibold">
          Tầng {floorIndex + 1}
        </p>
        <div className="flex-1 flex justify-end">
          {floorIndex + 1 < 2 ? (
            items.seats.every((item) => item.status === true) ? (
              <Popconfirm
                placement="bottom"
                title="Bạn có chắc chắn vô hiệu cả tầng?"
                disabled={mutateUpdateFloor.isPending}
                onConfirm={() =>
                  mutateUpdateFloor.mutate({
                    seatIds: items.seats.map((item) => item._id),
                    carId: carId,
                    status: false,
                  })
                }
              >
                <Button type="text" danger icon={<LockOutlined />} />
              </Popconfirm>
            ) : (
              <Popconfirm
                placement="bottom"
                title="Bạn có chắc chắn mở khoá cả tầng?"
                disabled={mutateUpdateFloor.isPending}
                onConfirm={() =>
                  mutateUpdateFloor.mutate({
                    seatIds: items.seats.map((item) => item._id),
                    carId: carId,
                    status: true,
                  })
                }
              >
                <Button type="text" icon={<UnlockOutlined />} />
              </Popconfirm>
            )
          ) : (
            <>
              {items.seats.every((item) => item.status === true) ? (
                <Popconfirm
                  placement="bottom"
                  title="Bạn có chắc chắn vô hiệu cả tầng?"
                  disabled={mutateUpdateFloor.isPending}
                  onConfirm={() =>
                    mutateUpdateFloor.mutate({
                      seatIds: items.seats.map((item) => item._id),
                      carId: carId,
                      status: false,
                    })
                  }
                >
                  <Button type="text" danger icon={<LockOutlined />} />
                </Popconfirm>
              ) : (
                <Popconfirm
                  placement="bottom"
                  title="Bạn có chắc chắn mở khoá cả tầng?"
                  disabled={mutateUpdateFloor.isPending}
                  onConfirm={() =>
                    mutateUpdateFloor.mutate({
                      seatIds: items.seats.map((item) => item._id),
                      carId: carId,
                      status: true,
                    })
                  }
                >
                  <Button type="text" icon={<UnlockOutlined />} />
                </Popconfirm>
              )}
              <Popconfirm
                placement="bottom"
                title="Bạn có chắc chắn xoá cả tầng?"
                disabled={mutateDeleteFloor.isPending}
                onConfirm={() =>
                  mutateDeleteFloor.mutate({
                    seatIds: items.seats.map((item) => item._id),
                    carId: carId,
                  })
                }
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </>
          )}
        </div>
      </div>

      <div
        className="grid gap-x-4 gap-y-4"
        style={{
          gridTemplateColumns: `repeat(${items.cols + 1 > 4 ? items.cols : items.cols + 1}, 1fr)`,
          gridTemplateRows: `repeat(${items?.rows + 1}, 1fr)`,
        }}
      >
        {items.seats.map((seat, seatIndex) => (
          <div
            key={seatIndex}
            style={{
              gridColumnStart: seat.col,
              gridRowStart: seat.row,
            }}
          >
            <Popover
              placement="bottom"
              title="Thao tác ghế"
              content={
                <div className="flex flex-col gap-2">
                  <Button icon={<EditOutlined />}>Cập nhật</Button>
                  <Button
                    disabled={isPending}
                    loading={isPending}
                    danger={seat.status}
                    icon={seat.status ? <LockOutlined /> : <UnlockOutlined />}
                    onClick={() => mutate(seat._id)}
                  >
                    {seat.status ? "Khoá" : "Mở khoá"}
                  </Button>
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    disabled={mutateDeleteSeat.isPending}
                    loading={mutateDeleteSeat.isPending}
                    onClick={() => mutateDeleteSeat.mutate(seat._id)}
                  >
                    Xoá ghế
                  </Button>
                </div>
              }
              trigger="click"
              className={`w-14 h-8 font-semibold text-xs rounded-full flex duration-300 ${
                seat.status ? "bg-blue-400" : "bg-red-300"
              } hover:opacity-85 cursor-pointer items-center justify-center`}
            >
              {seat.seatLabel}
            </Popover>
          </div>
        ))}
        {Array.from({ length: items.rows }, (_, r) =>
          Array.from({ length: items.cols }, (_, c) => {
            const row = r + 1;
            const col = c + 1;
            const occupied = items.seats.some(
              (s) => s.row === row && s.col === col,
            );

            if (occupied) return null;

            return (
              <Button
                key={`add-${row}-${col}`}
                type="dashed"
                icon={<PlusOutlined />}
                size="small"
                className="rounded-full w-full! h-full! flex items-center justify-center text-xs"
                style={{
                  gridColumnStart: col,
                  gridRowStart: row,
                }}
                disabled={mutateCreateSeat.isPending}
                onClick={() => handleAddSeat(col, row, items.floor)}
              />
            );
          }),
        )}
        {!isFull && (
          <>
            {items.cols < 4 && (
              <>
                {Array.from({ length: items.rows }, (_, r) => {
                  const row = r + 1;
                  return (
                    <Button
                      key={`add-col-${row}`}
                      type="dashed"
                      icon={<PlusOutlined />}
                      size="small"
                      className="rounded-full w-full! h-full! flex items-center justify-center text-xs bg-gray-50 hover:bg-gray-100"
                      style={{
                        gridColumnStart: items.cols + 1,
                        gridRowStart: row,
                      }}
                      disabled={mutateCreateSeat.isPending}
                      onClick={() =>
                        handleAddSeat(items.cols + 1, row, items.floor)
                      }
                    />
                  );
                })}
              </>
            )}
            {Array.from(
              { length: items.cols + 1 > 4 ? items.cols : items.cols + 1 },
              (_, c) => {
                const col = c + 1;
                return (
                  <Button
                    key={`add-row-${col}`}
                    type="dashed"
                    icon={<PlusOutlined />}
                    size="small"
                    className="rounded-full w-full! h-full! flex items-center justify-center text-xs bg-gray-50 hover:bg-gray-100"
                    style={{
                      gridColumnStart: col,
                      gridRowStart: items.rows + 1,
                    }}
                    disabled={mutateCreateSeat.isPending}
                    onClick={() =>
                      handleAddSeat(col, items.rows + 1, items.floor)
                    }
                  />
                );
              },
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SeatMapUpdate;
