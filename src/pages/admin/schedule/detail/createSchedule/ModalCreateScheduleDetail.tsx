import { Modal } from "antd";
import type { MouseEventHandler, ReactElement, ReactNode } from "react";
import React, { useState } from "react";
import type { ICar } from "../../../../../common/types/Car";
import type { IRoute } from "../../../../../common/types/Route";
import CreateOneSchedule from "./components/CreateOneSchedule";
import CreateManySchedule from "./components/CreateManySchedule";

const ModalCreateScheduleDetail = ({
  children,
  car,
  route,
}: {
  children: ReactNode;
  car: ICar;
  route: IRoute;
}) => {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTab] = useState(0);
  return (
    <>
      {children &&
        React.cloneElement(
          children as ReactElement<{ onClick?: MouseEventHandler }>,
          {
            onClick: () => setOpen(true),
          },
        )}
      <Modal
        width={900}
        open={open}
        title={`Tạo lịch chạy cho xe ${car?.licensePlate}, tuyến đường ${route?.pickupPoint?.label} - ${route?.dropPoint?.label}`}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <div className="mt-6">
          <div className="flex items-center">
            <button
              className={`w-1/2 py-2 text-sm cursor-pointer font-bold ${
                tabIndex === 0
                  ? "bg-[#0C7D41]/90 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setTab(0)}
            >
              Tạo một lịch chạy
            </button>
            <button
              className={`w-1/2 py-2 text-sm cursor-pointer font-bold ${
                tabIndex === 1
                  ? "bg-[#0C7D41]/90 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setTab(1)}
            >
              Tạo nhiều lịch chạy
            </button>
          </div>
          <div>
            {tabIndex === 0 && (
              <CreateOneSchedule
                initialValues={{
                  carId: car?._id as string,
                  routeId: route?._id as string,
                }}
                setOpen={setOpen}
              />
            )}
            {tabIndex === 1 && (
              <CreateManySchedule
                initialValues={{
                  carId: car?._id as string,
                  routeId: route?._id as string,
                }}
                setOpen={setOpen}
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreateScheduleDetail;
