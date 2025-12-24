import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import dayjs from "dayjs";
import { QRCode } from "antd";
import { QUERY_KEY } from "../../../../common/constants/queryKey";
import { getDetailOrder } from "../../../../common/services/order.service";
import { formatCurrency } from "../../../../common/utils";

const DetailAdminTicket = () => {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: [QUERY_KEY.ORDER.ROOT, id],
    queryFn: () => getDetailOrder(id as string),
  });
  return (
    <div className="bg-white w-full min-h-[70dvh] rounded-md shadow-sm px-6 py-4">
      {data ? (
        <div className=" rounded-2xl ">
          <div className="flex items-center justify-between gap-3  px-5 py-6">
            <h1 className="text-xl font-semibold text-slate-700">
              Chi tiết vé
            </h1>
            <Link to={"/admin/ticket"} className="px-8">
              Quay trở về
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <div className="rounded-xl  p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-slate-500">Mã vé</p>
                    <p className="text-lg font-semibold text-slate-800 uppercase">
                      {id}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Ngày đặt vé:{" "}
                      {dayjs(data?.data.createdAt).format("DD/MM/YYYY HH:mm")}
                    </p>
                  </div>

                  {data?.data.isPaid ? (
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <span>Đã thanh toán</span>
                      <span>✔</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600 font-semibold">
                      <span>Chưa thanh toán</span>
                      <span>X</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-xl  p-5">
                <h2 className="mb-4 text-lg font-semibold text-slate-700">
                  Thông Tin Chuyến Đi
                </h2>

                <div className="space-y-3 text-slate-600">
                  <p>
                    <span className="font-medium">Điểm xuất phát:</span>{" "}
                    {data?.data.pickupPoint}
                  </p>
                  <p>
                    <span className="font-medium">Điểm trả:</span>{" "}
                    {data?.data.dropPoint}
                  </p>
                  <p>
                    <span className="font-medium">Điểm trả:</span>{" "}
                    {data?.data.seats.map((item) => item.seatLabel).join(", ")}
                  </p>
                  <p>
                    <span className="font-medium">Khởi hành:</span>{" "}
                    {dayjs(data?.data.startTime).format("DD/MM/YYYY HH:mm")}
                  </p>
                  <p>
                    <span className="font-medium">Loại xe:</span>{" "}
                    {data?.data.carInfo.type}
                  </p>
                  <p>
                    <span className="font-medium">Biển số xe:</span>{" "}
                    {data?.data.carInfo.licensePlate}
                  </p>
                </div>
              </div>
              <div className="rounded-xl  p-5">
                <h2 className="mb-4 text-lg font-semibold text-slate-700">
                  Hành Khách
                </h2>

                <div className="space-y-3 text-slate-600">
                  <p>
                    <span className="font-medium">Họ tên:</span>{" "}
                    {data?.data.customerInfo.userName}
                  </p>
                  <p>
                    <span className="font-medium">Điện thoại:</span>{" "}
                    {data?.data.customerInfo.phone}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {data?.data.customerInfo.phone}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-xl  p-5 text-center">
                <div className="mx-auto mb-3 h-48 w-48 bg-slate-200 flex items-center justify-center">
                  <QRCode value={id as string} />
                </div>
                <p className="text-sm text-slate-500">
                  Mã vé: <span className="font-medium">{id}</span>
                </p>
              </div>
              <div className="rounded-xl  p-5">
                <h2 className="mb-4 text-lg font-semibold text-slate-700">
                  Thông Tin Thanh Toán
                </h2>

                <div className="space-y-3 text-slate-600">
                  <p>
                    <span className="font-medium">Tổng tiền:</span>{" "}
                    {formatCurrency(data?.data.totalPrice as number)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="rounded-lg mt-4 bg-green-700 px-6 py-2 font-medium text-white hover:bg-blue-700 cursor-pointer">
                    Xác nhận vé đã sử dụng
                  </button>
                  <button className="rounded-lg mt-4 bg-green-700 px-6 py-2 font-medium text-white hover:bg-blue-700 cursor-pointer">
                    In vé
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl rounded-2xl bg-white flex items-center justify-center shadow-lg min-h-[90vh]">
          <div className="flex flex-col justify-center gap-4 items-center">
            <p className="text-red-500 font-semibold text-xl">
              Vé này không tồn tại
            </p>
            <Link to={"/profile/my-ticket"} className="px-8">
              Quay trở về
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailAdminTicket;
