import { ReloadOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select, Tag } from "antd";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { CAR_BRANDS } from "../../../../common/constants/brands";
import { QUERY_KEY } from "../../../../common/constants/queryKey";
import { useToast } from "../../../../common/hooks/useToast";
import {
  getDetailCar,
  updateCar,
} from "../../../../common/services/car.service";
import type { ICarPayload } from "../../../../common/types/Car";
import { formRules } from "../../../../common/utils/formRules";

const UpdateCar = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const carResponse = useQuery({
    queryKey: [QUERY_KEY.CAR.ROOT, id],
    queryFn: () => getDetailCar(id as string),
  });
  const [form] = Form.useForm();
  const { message: antdMessage, handleAxiosError } = useToast();
  const nav = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: Omit<ICarPayload, "floors">) =>
      updateCar(id as string, payload),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes(QUERY_KEY.CAR.ROOT),
      });
      nav("/admin/car");
    },
    onError: (err) => {
      handleAxiosError(err);
    },
  });
  const handleSubmit = (values: Omit<ICarPayload, "floors">) => {
    mutate(values);
  };
  useEffect(() => {
    if (carResponse.data) {
      form.setFieldsValue(carResponse.data.data);
    }
  }, [carResponse, form]);
  return (
    <div className="bg-white w-full min-h-[50dvh] rounded-md shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          Cập nhật xe <Tag>#{id}</Tag>
        </h3>
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
              name={"name"}
              style={{ width: "100%" }}
              label="Tên xe"
              required
              rules={formRules.textRange("Tên xe", 6, 50)}
            >
              <Input
                placeholder="Nhập tên xe (Ví dụ: Mercedes Limousine)"
                style={{ height: 40, borderRadius: 5 }}
              />
            </Form.Item>
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
          <Tag color="green" className="text-sm! font-medium">
            Thông tin loại xe
          </Tag>
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
            <Form.Item
              style={{ width: "100%" }}
              name={["model", "engine"]}
              label="Dung tích động cơ"
              required
              rules={[formRules.required("Dung tích động cơ")]}
            >
              <Input
                placeholder="Nhập tên dung tích động cơ (Ví dụ: 2.2L)"
                style={{ height: 40, borderRadius: 5 }}
              />
            </Form.Item>
          </div>
          <div className="flex items-center gap-2 justify-end mt-6">
            <Button
              className="hover:border-red-500! hover:text-red-500!"
              htmlType="button"
              onClick={() => form.setFieldsValue(carResponse.data?.data)}
              icon={<ReloadOutlined />}
            >
              Đặt lại
            </Button>
            <Link to={`/admin/car/update/seat/${id}`}>
              <Button className="border-[#0C7D41]! text-green-700!">
                Chỉnh sửa ghế ngồi
              </Button>
            </Link>
            <Button
              loading={isPending}
              style={{ background: "#0C7D41" }}
              type="primary"
              htmlType="submit"
              className="hover:opacity-80!"
            >
              Cập nhật
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateCar;
