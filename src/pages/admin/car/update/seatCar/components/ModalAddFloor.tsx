import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, InputNumber, Modal } from "antd";
import React, {
  useState,
  type MouseEventHandler,
  type ReactElement,
} from "react";
import { useParams } from "react-router";
import { useToast } from "../../../../../../common/hooks/useToast";
import { createFloor } from "../../../../../../common/services/seat.service";
import type { IPayloadFloor } from "../../../../../../common/types/Seat";
import { formRules } from "../../../../../../common/utils/formRules";
import { QUERY_KEY } from "../../../../../../common/constants/queryKey";

const ModalAddFloor = ({
  children,
  nextFloorNumber,
}: {
  children: ReactElement;
  nextFloorNumber: number;
}) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { message, handleAxiosError } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      carId,
      payload,
    }: {
      carId: string;
      payload: IPayloadFloor;
    }) => createFloor(carId, payload),
    onSuccess: () => {
      message.success("Thêm tầng mới thành công");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(QUERY_KEY.SEAT.ROOT),
      });
      setOpen(false);
    },
    onError: (err) => {
      handleAxiosError(err);
    },
  });
  const handleSubmit = async () => {
    await form.validateFields().then((data) =>
      mutate({
        carId: id as string,
        payload: { floorNumber: nextFloorNumber, floors: [{ ...data }] },
      }),
    );
  };
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
        title={<p className="flex items-center gap-2">Tạo tầng ghế mới</p>}
        closable={{ "aria-label": "Custom Close Button" }}
        open={open}
        width={600}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={
          <div className="flex items-center gap-2 justify-end">
            <Button
              danger
              onClick={() => setOpen(false)}
              className="hover:opacity-85"
            >
              Đóng
            </Button>
            <Button
              loading={isPending}
              disabled={isPending}
              onClick={handleSubmit}
              className="hover:opacity-85"
            >
              Tạo mới
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ seatCount: 18, cols: 3 }}
        >
          <div className="flex items-center gap-4 mt-8">
            <Form.Item
              label="Số ghế"
              className="w-full!"
              name={"seatCount"}
              rules={formRules.numberRange("Số ghế", 6, 30)}
            >
              <InputNumber min={1} className="w-full!" />
            </Form.Item>

            <Form.Item
              label="Số cột"
              className="w-full!"
              name={"cols"}
              rules={formRules.numberRange("Số cột", 1, 5)}
            >
              <InputNumber min={1} className="w-full!" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalAddFloor;
