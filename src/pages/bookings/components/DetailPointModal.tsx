import { Button, Modal } from "antd";
import React, {
  useState,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import type { IPointWithDistrict } from "../../../common/types/Route";
type TProps = {
  children: ReactElement;
  pickupPoint: IPointWithDistrict;
  dropPoint: IPointWithDistrict;
  name: string;
};

const DetailPointModal = ({
  children,
  pickupPoint,
  dropPoint,
  name,
}: TProps) => {
  const [open, setOpen] = useState(false);
  console.log(pickupPoint);
  console.log(dropPoint);
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
        style={{
          top: 30,
        }}
        title={
          <p className="flex items-center gap-2">
            <img src="./station.png" alt="" />
            Các thành phố đi qua của tuyến {name}
          </p>
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={open}
        width={"70vw"}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={
          <Button
            style={{
              background: "#0c7d41",
              height: 35,
              color: "white",
              border: "none",
            }}
            onClick={() => setOpen(false)}
            className="hover:opacity-85"
          >
            Đóng
          </Button>
        }
      >
        <div
          className="grid mt-8 min-h-[75vh] gap-8"
          style={{ gridTemplateColumns: `repeat(2, 1fr)` }}
        >
          <div className="flex flex-col gap-2">
            <p className="text-red-700 uppercase font-medium">Điểm trả</p>
            {pickupPoint.district.map((item) => (
              <div key={item._id} className="px-6 py-4 rounded-lg bg-gray-100">
                <h3 className="font-semibold">KV {item.label}</h3>
                <div className=" flex flex-col gap-2 mt-2">
                  {item.description.map((item) => (
                    <p className="border-b-2 border-white pb-2">{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-red-700 uppercase font-medium">Điểm đón</p>
            {dropPoint.district.map((item) => (
              <div key={item._id} className="px-6 py-4 rounded-lg bg-gray-100">
                <h3 className="font-semibold">KV {item.label}</h3>
                <div className=" flex flex-col gap-2 mt-2">
                  {item.description.map((item) => (
                    <p className="border-b-2 border-white pb-2">{item}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailPointModal;
