import { ReloadOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select, Tag } from "antd";
import { useWatch } from "antd/es/form/Form";
import { Link, useNavigate } from "react-router";
import { CAR_BRANDS } from "../../../../common/constants/brands";
import { useToast } from "../../../../common/hooks/useToast";
import { createCar } from "../../../../common/services/car.service";
import type { ICarPayload } from "../../../../common/types/Car";
import { formRules } from "../../../../common/utils/formRules";
import { FloorsFormList } from "../components/FloorFormList";
import ModalPreviewSeat from "./ModalPreviewSeat";
import { QUERY_KEY } from "../../../../common/constants/queryKey";

const CreateCar = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const floors = useWatch("floors", form);
  const { message, handleAxiosError } = useToast();
  const nav = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ICarPayload) => createCar(payload),
    onSuccess: ({ message: resMess }) => {
      message.success(resMess);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(QUERY_KEY.CAR.ROOT),
      });
      nav("/admin/car");
    },
    onError: (error) => {
      handleAxiosError(error);
    },
  });
  const handleSubmit = (values: ICarPayload) => {
    if (values.floors.length === 0) {
      message.error("Phải thêm ít nhất 1 tầng cho 1 xe!");
      return;
    }
    mutate(values);
  };
  return (
    <div className="bg-white w-full min-h-[70dvh] rounded-md shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold ">Thêm mới xe</h3>
        <Link
          to={"/admin/car"}
          className="text-[#0C7D41]! opacity-80 hover:underline!"
        >
          Quay về danh sách
        </Link>
      </div>
      <div className="h-[1px] bg-gray-300 w-full my-4"></div>
      <div>
        <Form
          onFinish={handleSubmit}
          form={form}
          initialValues={{
            maxSeatCapacity: 16,
            column: 3,
            type: "NORMAL",
          }}
          layout="vertical"
        >
          <Tag color="green" className="text-sm! font-medium">
            Thông tin chung
          </Tag>
          <div className="flex items-center gap-2 mt-2">
            <Form.Item
              style={{ width: "100%" }}
              name={"licensePlate"}
              label="Biển số xe"
              rules={formRules.licensePlate("Biển số xe")}
              required
            >
              <Input
                placeholder="Nhập biển số xe (Ví dụ: 29B-12345)"
                style={{ height: 40, borderRadius: 5 }}
              />
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
              name={"type"}
              label="Loại xe"
              required
              rules={[formRules.required("Loại xe")]}
            >
              <Select
                style={{
                  height: 40,
                }}
                options={[
                  {
                    label: "Xe Vip",
                    value: "VIP",
                  },
                  {
                    label: "Xe thường",
                    value: "NORMAL",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Form.Item
              name={["model", "brand"]}
              label="Nhãn hiệu xe"
              required
              style={{ width: "100%" }}
              rules={[formRules.required("Nhãn hiệu xe", true)]}
            >
              <Select
                placeholder="Chọn nhãn hiệu xe"
                style={{ height: 40 }}
                options={CAR_BRANDS}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
              name={["model", "model"]}
              label="Tên kiểu xe"
              required
              rules={[formRules.required("Tên kiểu xe")]}
            >
              <Input
                placeholder="Nhập tên kiểu xe (Ví dụ: Transit)"
                style={{ height: 40, borderRadius: 5 }}
              />
            </Form.Item>
          </div>
          <Tag color="green" className="text-sm! font-medium">
            Cấu hình chỗ ngồi
          </Tag>
          <FloorsFormList />
          <div className="flex items-center gap-2 justify-end mt-6">
            <Button
              onClick={() => {
                form.resetFields();
              }}
              className="hover:border-red-500! hover:text-red-500!"
              htmlType="reset"
              icon={<ReloadOutlined />}
            >
              Đặt lại
            </Button>
            <ModalPreviewSeat floors={floors}>
              <Button className="border-[#0C7D41]! text-green-700!">
                Xem sơ đồ ghế
              </Button>
            </ModalPreviewSeat>
            <Button
              loading={isPending}
              disabled={isPending}
              style={{ background: "#0C7D41" }}
              type="primary"
              htmlType="submit"
              className="hover:opacity-80!"
            >
              Thêm mới
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateCar;
