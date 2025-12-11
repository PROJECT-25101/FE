import { GiftFilled } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, Radio } from "antd";
import { useNavigate } from "react-router";
import { QUERY_KEY } from "../../common/constants/queryKey";
import { useUnHoldOnBack } from "../../common/hooks/useUnHoldOnBack";
import { unHoldSeat } from "../../common/services/seat.schedule.service";
import CountTime from "./components/CountTime";
import { useCheckoutSelector } from "../../common/store/useCheckoutStore";
import dayjs from "dayjs";
import { formatCurrency } from "../../common/utils";
import { createOrderPayos } from "../../common/services/order.service";
import { useAuthSelector } from "../../common/store";
import { useToast } from "../../common/hooks/useToast";

const CheckoutPage = () => {
  useUnHoldOnBack(true, false);
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const { handleAxiosError } = useToast();
  const { mutate } = useMutation({
    mutationFn: unHoldSeat,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERY_KEY.SEAT.ROOT),
      });
    },
  });
  const payosMutation = useMutation({
    mutationFn: (payload: any) => createOrderPayos(payload),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERY_KEY.ORDER.ROOT),
      });
      window.location.href = data.checkoutUrl as string;
      console.log(data);
    },
    onError: (err) => handleAxiosError(err),
  });
  const checkoutInfo = useCheckoutSelector((state) => state);
  const userId = useAuthSelector((state) => state.user?._id);
  const handleCheckout = () => {
    const payload = {
      userId,
      routeId: checkoutInfo.route?._id,
      carId: checkoutInfo.car?._id,
      scheduleId: checkoutInfo.schedule?._id,
      seats: checkoutInfo.seat.map((item) => ({
        seatId: item._id,
        seatLabel: item.seatLabel,
        seatOrder: item.seatOrder,
      })),
      customerInfo: {
        email: checkoutInfo.user?.email,
        userName: checkoutInfo.user?.userName,
        phone: checkoutInfo.user?.phone,
      },
      carInfo: {
        licensePlate: checkoutInfo.car?.licensePlate,
        type: checkoutInfo.car?.type,
        brand: checkoutInfo.car?.model.brand,
        model: checkoutInfo.car?.model.model,
      },
      pickupPoint: checkoutInfo.pickupPoint,
      startTime: checkoutInfo.schedule?.startTime,
      dropPoint: checkoutInfo.dropPoint,
      arrivalTime: checkoutInfo.schedule?.arrivalTime,
      totalPrice: checkoutInfo.totalPrice,
      note: "",
    };
    payosMutation.mutate(payload);
  };
  return (
    <section className="bg-[#f0f2f5] min-h-screen">
      <div className="max-w-7xl xl:mx-auto mx-6 pt-8">
        {/* HEADING */}
        <div className="flex items-end justify-between">
          <h3 className="text-xl text-gray-800 font-semibold">
            Xác nhận mua vé
          </h3>
          <div className="flex items-end">
            <p className="text-gray-800/50">Thời gian giao dịch còn lại</p>
            <CountTime />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <div className="bg-white rounded-lg px-4 py-6">
              <p className="text-base font-medium">Thông tin khách hàng</p>
              <div className="mt-6 flex flex-col gap-5 text-gray-800/60">
                <div className="flex items-center">
                  <p className="w-42">Số điện thoại</p>
                  <p>{checkoutInfo.user?.phone}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-42">Họ tên</p>
                  <p>{checkoutInfo.user?.userName}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-42">Email</p>
                  <p>{checkoutInfo.user?.email}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-base mt-6 font-medium">
                Phương thức thanh toán
              </p>
              <div className="relative cursor-pointer max-w-[325px] flex items-center gap-4  bg-white rounded-lg border mt-6 border-red-500 py-6 px-4">
                <Radio checked />
                <div className="flex flex-col gap-2">
                  <p className=" font-medium">Thanh toán online</p>
                  <p className="text-gray-700/60 text-xs">
                    <GiftFilled className="text-yellow-500! mr-2" />
                    Trả online nhiều ưu đãi
                  </p>
                </div>
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-md">
                  ✓
                </div>
              </div>
              <div className="mt-6">
                <p className="">- Xin cảm ơn!</p>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg px-4 py-6">
              <p className="text-base font-medium">Thông tin vé</p>
              <div className="mt-6 flex flex-col gap-5 text-gray-800/60">
                <div className="flex items-center">
                  <p className="w-42">Tuyến</p>
                  <p className="text-gray-800">
                    {checkoutInfo.schedule?.routeId.pickupPoint.label} -{" "}
                    {checkoutInfo.schedule?.routeId.dropPoint.label}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="w-42">Giờ xuất bến</p>
                  <p className="text-gray-800">
                    {dayjs(checkoutInfo.schedule?.startTime).format(
                      "HH:mm [Ngày] DD [Tháng] MM [Năm] YYYY",
                    )}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="w-42">Điểm đón</p>
                  <p className="text-gray-800">{checkoutInfo.pickupPoint}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-42">Điểm đến</p>
                  <p className="text-gray-800">{checkoutInfo.dropPoint}</p>
                </div>
                <div className="flex items-center">
                  <p className="w-42">Ghế</p>
                  <p className="text-gray-800">
                    {checkoutInfo.seat.map((item) => item.seatLabel).join(", ")}
                  </p>
                </div>
                <div className="my-8 border border-dashed border-gray-300/50"></div>
                <div className="flex items-center justify-between">
                  <p>Tổng tiền vé</p>
                  <p className="text-gray-800">
                    {formatCurrency(checkoutInfo.totalPrice)}
                  </p>
                </div>
                <div className="flex p-4 bg-red-200/30 items-center justify-between">
                  <p>Tổng tiền thanh toán</p>
                  <p className="text-red-500 font-semibold text-base">
                    {formatCurrency(checkoutInfo.totalPrice)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Checkbox>Tôi đồng ý với quy định của Go Ticket</Checkbox>
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => {
                    mutate();
                    nav(-1);
                  }}
                >
                  Huỷ
                </Button>
                <Button
                  loading={payosMutation.isPending}
                  onClick={handleCheckout}
                  type="primary"
                  style={{ background: `#0C7D41` }}
                >
                  Thanh toán
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
