import { AppstoreOutlined } from "@ant-design/icons";
import { Button, Modal, Tag } from "antd";
import type { MouseEventHandler, ReactElement } from "react";
import React, { useState } from "react";

type IFloors = {
  seatCount: number;
  cols: number;
};
const ModalPreviewSeat = ({
  children,
  floors,
}: {
  children: ReactElement;
  floors: IFloors[];
}) => {
  const [open, setOpen] = useState(false);
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
            <AppstoreOutlined className="text-[#0c7d41]!" />
            Sơ đồ ghế dựa theo cấu hình của bạn
          </p>
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={open}
        width={"80vw"}
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
        <div className="flex flex-wrap items-center justify-center gap-12 w-full">
          {floors?.map((items, floorIndex) => {
            return (
              <div key={floorIndex}>
                <p className="text-center font-semibold mb-4">
                  Tầng {floorIndex + 1}
                </p>
                <div
                  className="grid gap-x-12 gap-y-4"
                  style={{ gridTemplateColumns: `repeat(${items?.cols}, 1fr)` }}
                >
                  {Array.from({ length: items?.seatCount }).map(
                    (_, seatIndex) => (
                      <div
                        key={seatIndex}
                        className="w-14 h-8 font-semibold text-xs rounded-full flex duration-300 bg-blue-400 items-center justify-center"
                      >
                        {seatIndex}
                      </div>
                    ),
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <Tag color="red" style={{ padding: 14 }} className="mt-8!">
          Đây chỉ là sơ đồ được tạo ra khi nhập số ghế và cột ghế. Nếu muốn
          chỉnh sửa tên ghế sau khi tạo xong sẽ chỉnh sơ đồ ghế
        </Tag>
      </Modal>
    </>
  );
};

export default ModalPreviewSeat;
