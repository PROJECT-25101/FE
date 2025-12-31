import { Link } from "react-router";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRef, useState } from "react";
import {
  confirmOrder,
  verifyOrder,
} from "../../../../common/services/order.service";
import type { IOrder } from "../../../../common/types/Order";
import { Button, Popconfirm, QRCode, Watermark } from "antd";
import { useToast } from "../../../../common/hooks/useToast";
import dayjs from "dayjs";
import { PrinterOutlined } from "@ant-design/icons";
import { forwardRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../../common/constants/queryKey";

const TicketPrint = forwardRef<HTMLDivElement, { order: IOrder }>(
  ({ order }, ref) => {
    return (
      <div ref={ref} className="print-wrapper">
        <Watermark
          content={"GOTICKET"}
          font={{
            color: `rgba(12, 125, 65, 0.15)`,
          }}
        >
          {order.seats.map((seat: any, index: number) => (
            <div className="ticket" key={index}>
              <div className="ticket-header flex flex-col items-center">
                <p className="subtitle font-semibold">VÉ LÊN XE</p>
              </div>
              <p className="">
                <span>Ghế: </span>
                <strong>{seat.seatLabel}</strong>
              </p>
              <p className="">
                <span>Ngày: </span>
                <strong>{dayjs(order.startTime).format("DD/MM/YYYY")}</strong>
              </p>
              <p>
                <span>Giờ: </span>
                <strong>{dayjs(order.startTime).format("HH:mm")}</strong>
              </p>
              <p>
                <span>Xe: </span>
                <strong>{order.carInfo.licensePlate}</strong>
              </p>
              =========================
              <div className="route">
                <p className="flex flex-col text-sx">
                  <span>Điểm đi:</span> <strong>{order.pickupPoint}</strong>
                </p>
                <p className="flex flex-col">
                  <span>Điểm đến:</span> <strong>{order.dropPoint}</strong>
                </p>
              </div>
              <QRCode value={order._id} size={100} />
              <div className="footer">
                <p>Vui lòng lên xe trước 15 phút chạy</p>
              </div>
            </div>
          ))}
        </Watermark>
      </div>
    );
  },
);

const ScanTicket = () => {
  const { message, handleAxiosError } = useToast();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<
    "idle" | "scanning" | "success" | "error"
  >("idle");
  const [data, setData] = useState<IOrder | null>(null);
  const [messageServer, setMessageServer] = useState<string | null>(null);
  const lastResultRef = useRef<string | null>(null);
  const scanningRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const highlightCodeOnCanvas = (detectedCodes: any, ctx: any) => {
    detectedCodes.forEach((detectedCode: any) => {
      const { boundingBox } = detectedCode;
      ctx.strokeStyle = "#0C7D41";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        boundingBox.x,
        boundingBox.y,
        boundingBox.width,
        boundingBox.height,
      );
    });
  };
  const fetchOrder = async (id: string, slient = false) => {
    try {
      const { data, message: messageServer } = await verifyOrder(id);
      console.log(data);
      setData(data);
      stopCamera();
      setStatus("success");
      setMessageServer(messageServer);
    } catch (err: any) {
      const response = err.response.data;
      if (!slient) {
        message.error(response.message);
      }
      setData(response.data);
      setMessageServer(response.message);
      setStatus("error");
      stopCamera();
    }
  };
  const stopCamera = () => {
    const video = document.querySelector("video");
    if (!video?.srcObject) return;
    const stream = video.srcObject as MediaStream;
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
  };
  const handleScan = async (result: any) => {
    const text = Array.isArray(result) ? result?.[0]?.rawValue : result;
    if (!text) return;

    if (scanningRef.current) return;
    if (lastResultRef.current === text) return;
    await fetchOrder(text);
    scanningRef.current = true;
    lastResultRef.current = text;
    setStatus("scanning");

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(() => {
      scanningRef.current = false;
      lastResultRef.current = null;
    }, 1000);
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const { mutate } = useMutation({
    mutationFn: (orderId: string) => confirmOrder(orderId),
    onSuccess: ({ data, message: serverMsg }) => {
      message.success(serverMsg);
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERY_KEY.ORDER.ROOT),
      });
      fetchOrder(data._id, true);
    },
    onError: (err) => handleAxiosError(err),
  });

  return (
    <div className="bg-white w-full min-h-[70dvh] rounded-md shadow-sm px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold mb-4">Quản lý vé đã đặt</h3>
        <Link className="text-[#0C7D41]! hover:underline!" to={"/admin/ticket"}>
          Quay trở về
        </Link>
      </div>

      <div className="grid gap-8" style={{ gridTemplateColumns: `1fr 2.5fr` }}>
        <div className="relative h-74 w-full border-2 border-[#0C7D41] rounded-lg overflow-hidden">
          {!data && (
            <Scanner
              onScan={handleScan}
              onError={() => {}}
              components={{
                tracker: highlightCodeOnCanvas,
              }}
              constraints={{ facingMode: "environment", aspectRatio: 1 }}
              classNames={{
                video: "object-cover",
              }}
            />
          )}
          {data && (
            <div className="flex flex-col items-center h-full justify-center">
              <QRCode value={data._id} />
              <p className="text-gray-500">{data._id}</p>
              <Button
                onClick={() => {
                  setData(null);
                  setStatus("idle");
                }}
                style={{ background: "#0C7D41", color: "white", marginTop: 14 }}
              >
                Quét lại
              </Button>
            </div>
          )}
          {status !== "idle" && !data && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-lg">
              {status === "scanning" && (
                <span className="text-[#0C7D41] text-lg font-medium">
                  Đang kiểm tra...
                </span>
              )}
            </div>
          )}
        </div>

        {!data && (
          <div className="bg-gray-200/50 p-6 rounded-lg">
            <p className="font-medium text-base">Hướng dẫn quét vé</p>
            <div className="mt-4 flex flex-col gap-4">
              <p className="flex items-center gap-2 text-slate-700">
                <span className="bg-green-500/50 text-green-700 font-semibold h-8 w-8 flex rounded-full items-center justify-center">
                  1
                </span>
                Đưa mã QR của vé vào chính giữa khung hình camera
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <span className="bg-green-500/50 text-green-700 font-semibold h-8 w-8 flex rounded-full items-center justify-center">
                  2
                </span>
                Giữ camera ổn định tránh rung tay
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <span className="bg-green-500/50 text-green-700 font-semibold h-8 w-8 flex rounded-full items-center justify-center">
                  3
                </span>
                Đợi hệ thống nhận diện và hiển thị ra thông tin vé
              </p>
            </div>
            <p className="bg-yellow-100/30 border-yellow-200 text-yellow-700 border rounded-xl p-4 mt-6">
              <span className="font-bold">Lưu ý: </span>
              Tránh ánh sáng mạnh chiếu trực tiếp vào mã QR hoặc bị mờ
            </p>
          </div>
        )}
        {data && (
          <div className="bg-gray-200/50 p-6 rounded-lg">
            <div className="flex items-center gap-4">
              <p className="font-medium text-base">Thông tin vé</p>
              <p
                className={`font-medium text-base ${status === "error" ? "text-red-500" : "text-[#0C7D41]"}`}
              >
                {messageServer}
              </p>
            </div>
            <div className=" rounded-2xl ">
              <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-2">
                  <div className="rounded-xl  p-5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-slate-500">Mã vé</p>
                        <p className="text-lg font-semibold text-slate-800 uppercase">
                          {data._id}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Ngày đặt vé:{" "}
                          {dayjs(data?.createdAt).format("DD/MM/YYYY HH:mm")}
                        </p>
                      </div>

                      {data?.isPaid ? (
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
                        {data?.pickupPoint}
                      </p>
                      <p>
                        <span className="font-medium">Điểm trả:</span>{" "}
                        {data?.dropPoint}
                      </p>
                      <p>
                        <span className="font-medium">Ghế ngồi:</span>{" "}
                        {data?.seats.map((item) => item.seatLabel).join(", ")}
                      </p>
                      <p>
                        <span className="font-medium">Khởi hành:</span>{" "}
                        {dayjs(data?.startTime).format("DD/MM/YYYY HH:mm")}
                      </p>
                      <p>
                        <span className="font-medium">Loại xe:</span>{" "}
                        {data?.carInfo.type}
                      </p>
                      <p>
                        <span className="font-medium">Biển số xe:</span>{" "}
                        {data?.carInfo.licensePlate}
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
                        {data?.customerInfo.userName}
                      </p>
                      <p>
                        <span className="font-medium">Điện thoại:</span>{" "}
                        {data?.customerInfo.phone}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {data?.customerInfo.phone}
                      </p>
                    </div>
                  </div>
                  {data.status === "BUYED" && (
                    <div className="flex items-center gap-4">
                      <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                        In vé
                      </Button>
                      <Popconfirm
                        title="Hãy chắc chắn rằng bạn đã in vé lên xe cho khách hàng"
                        okText="Chắc chắn"
                        cancelText="Huỷ bỏ"
                        onConfirm={() => mutate(data._id)}
                      >
                        <Button
                          type="primary"
                          style={{ background: `#0C7D41` }}
                        >
                          Xác nhận sử dụng vé
                        </Button>
                      </Popconfirm>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {data && (
        <div style={{ display: "none" }}>
          <TicketPrint ref={printRef} order={data} />
        </div>
      )}
    </div>
  );
};

export default ScanTicket;
