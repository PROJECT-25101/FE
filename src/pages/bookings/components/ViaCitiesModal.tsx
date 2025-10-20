import { Button, Modal } from "antd";
import React, {
  useState,
  type MouseEventHandler,
  type ReactElement,
} from "react";

const ViaCitiesModal = ({ children }: { children: ReactElement }) => {
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
            <img src="./station.png" alt="" />
            Các thành phố đi qua của tuyến Hà Nội - Nghệ An
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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ViaCitiesModal;
