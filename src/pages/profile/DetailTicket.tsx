import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { QUERY_KEY } from "../../common/constants/queryKey";
import { getDetailOrder } from "../../common/services/order.service";
import dayjs from "dayjs";
import { Button, QRCode } from "antd";
import { formatCurrency } from "../../common/utils";
import { SaveOutlined } from "@ant-design/icons";
import { toPng } from "html-to-image";
import { useRef } from "react";

const DetailTicket = () => {
  const { id } = useParams();
  const ticketRef = useRef<HTMLDivElement>(null);
  const { data } = useQuery({
    queryKey: [QUERY_KEY.ORDER.ROOT, id],
    queryFn: () => getDetailOrder(id as string),
  });
  const handleSaveTicket = async () => {
    if (!ticketRef.current) return;

    try {
      const dataUrl = await toPng(ticketRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `ve-xe-${id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Lỗi lưu vé:", err);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 py-10 ">
      {data ? (
        <>
          <div className="mx-4 xl:mx-auto max-w-7xl rounded-2xl bg-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3  px-8 py-6">
                <h1 className="text-xl font-semibold text-slate-700">
                  Chi tiết vé
                </h1>
              </div>
              <Link to={"/profile/my-ticket"} className="px-8">
                Quay trở về
              </Link>
            </div>
            {data.data.isPaid && (
              <div className="px-8 pt-6">
                <div className="flex items-center gap-3 rounded-lg bg-green-50 px-5 py-4 text-green-700">
                  <span className="text-xl">✅</span>
                  <span className="font-medium">
                    Đặt vé thành công! Chúc quý khách chuyến đi vui vẻ!
                  </span>
                </div>
              </div>
            )}
            <div
              ref={ticketRef}
              className="grid grid-cols-1 gap-6 px-8 py-8 md:grid-cols-3 bg-white rounded-xl"
            >
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
                      {data?.data.seats
                        .map((item) => item.seatLabel)
                        .join(", ")}
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
                  <h2 className="mb-4 text-lg font-semibold text-slate-700">
                    Mã QR Check-in
                  </h2>

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
                  {data.data.isPaid && (
                    <div className="mt-4">
                      <Button
                        onClick={handleSaveTicket}
                        style={{
                          background: "#0c7d41",
                          color: "white",
                        }}
                        icon={<SaveOutlined />}
                      >
                        Lưu vé
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
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

export default DetailTicket;
