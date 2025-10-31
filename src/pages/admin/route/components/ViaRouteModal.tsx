import { GatewayOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Modal, Spin } from "antd";
import React, {
  useState,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import { QUERY_KEY } from "../../../../common/constants/queryKey";
import { getDetailRoute } from "../../../../common/services/route.service";

const ViaRouteModal = ({
  children,
  id,
}: {
  children: ReactElement;
  id: string;
}) => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ROUTE.ROOT, id],
    queryFn: () => getDetailRoute(id),
    enabled: open,
  });
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
            <GatewayOutlined />
            Các thành phố đi qua của tuyến {data?.data.name}
          </p>
        }
        closable={{ "aria-label": "Custom Close Button" }}
        open={open}
        destroyOnHidden
        width={900}
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
        {isLoading && (
          <div className="min-h-[80vh] flex justify-center items-center">
            <Spin />
          </div>
        )}
        {!isLoading && (
          <div className="flex flex-col gap-2 min-h-[80vh]">
            {data?.data.viaCities.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md px-4 py-3 border-gray-300/50 rounded-md border"
              >
                <p className="text-sm">
                  Thành phố: <span className="font-semibold">{item.label}</span>
                </p>
                <p className="text-sm">
                  Mô tả: {item.description || "Chưa cập nhật"}
                </p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ViaRouteModal;
