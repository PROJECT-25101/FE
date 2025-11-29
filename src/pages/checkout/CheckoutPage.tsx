import { GiftFilled } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Checkbox, Radio } from "antd";
import { useNavigate } from "react-router";
import { QUERY_KEY } from "../../common/constants/queryKey";
import { useUnHoldOnBack } from "../../common/hooks/useUnHoldOnBack";
import { unHoldSeat } from "../../common/services/seat.schedule.service";
import CountTime from "./components/CountTime";

const CheckoutPage = () => {
  useUnHoldOnBack();
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const { mutate } = useMutation({
    mutationFn: unHoldSeat,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERY_KEY.SEAT),
      });
    },
  });

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
                  <p>0383144530</p>
                </div>
                <div className="flex items-center">
                  <p className="w-42">Họ tên</p>
                  <p>Lương Chính Quốc</p>
                </div>
                <div className="flex items-center">
                  <p className="w-42">Email</p>
                  <p>quoclcph18659@gmail.com</p>
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
                    BX Nước Ngầm - TX Cửa Lò (Cao tốc Hà Nội - Nghệ An)
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="w-42">Giờ xuất bến</p>
                  <p className="text-gray-800">08:00 ngày 29/11/2025</p>
                </div>
                <div className="flex items-center">
                  <p className="w-42">Điểm đón</p>
                  <p className="text-gray-800">172 Trần Bình</p>
                </div>
                <div className="flex items-center">
                  <p className="w-42">Điểm đến</p>
                  <p className="text-gray-800">
                    ĐL NGHI SƠN (NH TƯỜNG VY) - TH
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="w-42">Ghế</p>
                  <p className="text-gray-800">V6</p>
                </div>
                <div className="my-8 border border-dashed border-gray-300/50"></div>
                <div className="flex items-center justify-between">
                  <p>Tổng tiền vé</p>
                  <p className="text-gray-800">300,000 đ</p>
                </div>
                <div className="flex p-4 bg-red-200/30 items-center justify-between">
                  <p>Tổng tiền thanh toán</p>
                  <p className="text-red-500 font-semibold text-base">
                    300,000 đ
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
                <Button type="primary" style={{ background: `#0C7D41` }}>
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
