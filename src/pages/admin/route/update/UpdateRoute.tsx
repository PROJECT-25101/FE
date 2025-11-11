import { ReloadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, InputNumber, Select, Tag } from "antd";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { QUERY_KEY } from "../../../../common/constants/queryKey";
import { useToast } from "../../../../common/hooks/useToast";
import {
  getAllProvince,
  getDetailRoute,
  updateRoute,
} from "../../../../common/services/route.service";
import type { IRoute } from "../../../../common/types/Route";
import { deepCleanup } from "../../../../common/utils";
import { formRules } from "../../../../common/utils/formRules";
import { FormDetailPickDrop } from "../create/components/FormDetailPickDrop";

const UpdateRoute = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const nav = useNavigate();
  const { message: antdMessage, handleAxiosError } = useToast();
  const { data: detailRoute } = useQuery({
    queryKey: [QUERY_KEY.ROUTE.ROOT, id],
    queryFn: async () => {
      const response = await getDetailRoute(id as string);
      if (response.data) {
        form.setFieldsValue(response.data);
      }
      return response;
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["PROVINCE"],
    queryFn: () => getAllProvince(),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: Partial<IRoute>) =>
      updateRoute(id as string, payload),
    onSuccess: ({ message }) => {
      nav("/admin/route");
      antdMessage.success(message);
    },
    onError: (err) => handleAxiosError(err),
  });
  const handleSubmit = (values: Partial<IRoute>) => {
    const cleanupPayload = deepCleanup(values);
    mutate(cleanupPayload as IRoute);
  };
  const pickupPoint = Form.useWatch("pickupPoint", form);
  const dropPoint = Form.useWatch("dropPoint", form);
  useEffect(() => {
    if (pickupPoint && dropPoint && pickupPoint.label === dropPoint.label) {
      form.setFieldValue("dropPoint", undefined);
    }
  }, [pickupPoint, dropPoint, form]);
  return (
    <div className="bg-white w-full min-h-[70dvh] rounded-md shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold mb-4">Cập nhật tuyến đường</h3>
        <Link className="text-[#0C7D41]! hover:underline!" to={"/admin/route"}>
          Quay trở về
        </Link>
      </div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Tag color="green" className="text-sm! font-medium">
          Thông tin chung
        </Tag>
        <div className="flex items-start gap-2 mt-2 mb-4">
          <div className="w-full">
            <Form.Item
              style={{ width: "100%" }}
              name="pickupPoint"
              label="Điểm xuất phát"
              required
              rules={[
                { required: true, message: "Vui lòng chọn điểm xuất phát!" },
              ]}
              normalize={(value) =>
                value && { _id: value.value, label: value.label }
              }
            >
              <Select
                style={{ borderRadius: 5, height: 40, width: "100%" }}
                showSearch
                loading={isLoading}
                placeholder="Chọn điểm xuất phát"
                labelInValue
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={data?.data.map((item) => ({
                  value: item._id,
                  label: item.label,
                }))}
              />
            </Form.Item>
            {pickupPoint?._id && (
              <FormDetailPickDrop
                textButton="Thêm chi tiết điểm đón"
                form={form}
                key="WARDS_PICKUP"
                nameForm={["pickupPoint", "district"]}
                point={pickupPoint}
              />
            )}
          </div>
          <div className="w-full">
            <Form.Item
              name="dropPoint"
              label="Điểm kết thúc"
              style={{ width: "100%" }}
              required
              rules={[
                { required: true, message: "Vui lòng chọn điểm kết thúc!" },
              ]}
              normalize={(value) =>
                value && { _id: value.value, label: value.label }
              }
            >
              <Select
                showSearch
                loading={isLoading}
                placeholder="Chọn điểm kết thúc"
                labelInValue
                style={{ borderRadius: 5, height: 40, width: "100%" }}
                options={data?.data
                  ?.filter((item) => item.label !== pickupPoint?.label)
                  .map((item) => ({
                    value: item._id,
                    label: item.label,
                  }))}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
            {dropPoint?._id && (
              <FormDetailPickDrop
                form={form}
                key="WARDS_DROP"
                textButton="Thêm chi tiết điểm trả"
                nameForm={["dropPoint", "district"]}
                point={dropPoint}
              />
            )}
          </div>
        </div>
        <Form.Item
          style={{ width: "100%" }}
          name={"description"}
          label="Loại tuyến đường"
          required
          rules={[formRules.required("Loại tuyến đường", true)]}
        >
          <Select
            options={[
              {
                label: "Cao tốc",
                value: "Cao tốc",
              },
              {
                label: "Quốc lộ",
                value: "Quốc lộ",
              },
            ]}
            placeholder="Chọn loại tuyến đường"
            style={{
              height: 45,
            }}
          />
        </Form.Item>
        <div className="flex items-center gap-2">
          <Form.Item
            style={{ flex: 1 }}
            name="distance"
            label="Khoảng cách dự kiến"
            required
            rules={[
              {
                validator: (_, value) => {
                  if (!value)
                    return Promise.reject("Vui lòng nhập khoảng cách!");
                  const num = parseFloat(value);
                  if (isNaN(num))
                    return Promise.reject("Khoảng cách phải là số hợp lệ!");
                  if (num > 3000)
                    return Promise.reject("Khoảng cách phải dưới 3000Km");
                  return Promise.resolve();
                },
              },
            ]}
            getValueFromEvent={(e) => {
              const val = e?.target?.value?.trim();
              return val ? `${val}Km` : "";
            }}
            getValueProps={(v) => ({
              value: typeof v === "string" ? v.replace(/\s?km$/i, "") : v || "",
            })}
          >
            <Input
              style={{ width: "100%", height: 40, borderRadius: 5 }}
              placeholder="Nhập khoảng cách dự kiến"
              suffix="km"
            />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Thời gian chạy dự kiến"
            required
            rules={[formRules.required("Thời gian chạy dự kiến")]}
            style={{ flex: 1 }}
          >
            <InputNumber
              min={1}
              max={100}
              className="w-full custom-input-number"
              placeholder="Nhập thời gian chạy dự kiến"
              addonAfter="Giờ"
            />
          </Form.Item>
        </div>
        <div className="flex items-center gap-2 justify-end mt-6">
          <Button
            onClick={() => {
              form.setFieldsValue(detailRoute?.data);
            }}
            className="hover:border-red-500! hover:text-red-500!"
            htmlType="button"
            icon={<ReloadOutlined />}
          >
            Đặt lại
          </Button>
          <Button
            disabled={isPending}
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
  );
};

export default UpdateRoute;
