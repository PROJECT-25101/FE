import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, InputNumber, Modal, Select } from "antd";
import type { MouseEventHandler, ReactElement, ReactNode } from "react";
import React, { useEffect, useState } from "react";
import { QUERY_KEY } from "../../../../../common/constants/queryKey";
import { getAllUser } from "../../../../../common/services/user.service";
import { filterOption } from "../../../../../common/utils";
import { formRules } from "../../../../../common/utils/formRules";
import type { ISchedule } from "../../../../../common/types/Schedule";
import { STATUS_SCHEDULE } from "../../../../../common/constants/status";
import { updateSchedule } from "../../../../../common/services/schedule.service";
import { useToast } from "../../../../../common/hooks/useToast";
import type { IUser } from "../../../../../common/types/User";
import TextArea from "antd/es/input/TextArea";

const ModalUpdateSchedule = ({
  children,
  schedule,
}: {
  children: ReactNode;
  schedule: ISchedule;
}) => {
  const [form] = Form.useForm();
  const status = Form.useWatch("status", form);
  const { _id, ...schedulePayload } = schedule;
  const { message: antdMessage, handleAxiosError } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const driver = Form.useWatch(["crew", 0, "userId"], form);
  const assistant = Form.useWatch(["crew", 1, "userId"], form);
  const { data: userData } = useQuery({
    queryKey: [QUERY_KEY.USER.ROOT],
    queryFn: () => getAllUser({ role: "staff" }),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ISchedule) =>
      updateSchedule(_id, { ...schedulePayload, ...payload }),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERY_KEY.SCHEDULE.ROOT),
      });
      setOpen(false);
    },
    onError: (err) => handleAxiosError(err),
  });
  const handleSubmit = () => {
    form.validateFields().then((data) => {
      const crew = data.crew.map((item: { userId: string }, index: number) => ({
        ...item,
        role: index === 0 ? "driver" : "assistant",
      }));
      mutate({ ...data, crew });
    });
  };
  useEffect(() => {
    if (schedule) {
      form.setFieldsValue({
        ...schedule,
        crew: schedule.crew.map((item) => ({
          userId: (item.userId as IUser)._id,
        })),
      });
    }
  }, [form, schedule]);
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
        title="Cập nhật lịch chạy"
        open={open}
        width={700}
        onCancel={() => setOpen(false)}
        footer={
          <div className="flex items-center gap-3 justify-end">
            <Button
              onClick={() => setOpen(false)}
              danger
              loading={isPending}
              disabled={isPending}
            >
              Huỷ
            </Button>
            <Button
              onClick={() =>
                form.setFieldsValue({
                  ...schedule,
                  crew: schedule.crew.map((item) => ({
                    userId: (item.userId as IUser)._id,
                  })),
                })
              }
              loading={isPending}
              disabled={isPending}
            >
              Đặt lại
            </Button>
            <Button
              loading={isPending}
              disabled={isPending}
              type="primary"
              style={{
                background: `#0C7D41`,
              }}
              onClick={handleSubmit}
            >
              Cập nhật
            </Button>
          </div>
        }
      >
        <Form initialValues={schedule} layout="vertical" form={form}>
          <div className="flex items-center gap-6">
            <Form.Item
              className="flex-1"
              label="Tài xế"
              name={["crew", 0, "userId"]}
              rules={[formRules.required("Tài xế", true)]}
            >
              <Select
                showSearch
                allowClear
                style={{ height: 40 }}
                placeholder="Chọn tài xế"
                filterOption={filterOption}
                options={userData?.data.map((item) => ({
                  value: item._id,
                  label: item.userName,
                  disabled: assistant === item._id,
                }))}
              />
            </Form.Item>

            <Form.Item
              className="flex-1"
              label="Phụ xe"
              name={["crew", 1, "userId"]}
            >
              <Select
                showSearch
                allowClear
                style={{ height: 40 }}
                placeholder="Chọn phụ xe"
                filterOption={filterOption}
                options={userData?.data.map((item) => ({
                  value: item._id,
                  label: item.userName,
                  disabled: driver === item._id,
                }))}
              />
            </Form.Item>
          </div>

          <Form.Item
            required
            label="Giá tiền"
            className="flex-1"
            name="price"
            rules={[formRules.required("Giá tiền")]}
          >
            <InputNumber
              className="custom-input-number"
              style={{ width: "100%" }}
              placeholder="Nhập giá tiền"
              addonAfter="VND"
              min={10000}
              max={10000000}
              formatter={(value: number | string | undefined) =>
                value
                  ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  : ""
              }
              parser={(value: string | undefined) =>
                Number(value?.replace(/\./g, "") || 0)
              }
            />
          </Form.Item>
          <Form.Item
            label="Trạng thái"
            required
            rules={[formRules.required("Trạng thái", true)]}
            name={"status"}
          >
            <Select
              className="custom-input-number"
              placeholder="Chọn trạng thái lịch chạy"
              options={Object.entries(STATUS_SCHEDULE).map(([key, label]) => ({
                value: key,
                label,
              }))}
              disabled={schedule.status === "cancelled"}
            />
          </Form.Item>
          {status === "cancelled" && (
            <Form.Item
              label="lý do huỷ lịch"
              rules={[formRules.required("Lý do huỷ lịch")]}
              name={"cancelDescription"}
            >
              <TextArea
                disabled={schedule.status === "cancelled"}
                placeholder="Nhập lý do huỷ lịch chạy"
                rows={5}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateSchedule;
