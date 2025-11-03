import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select, Tooltip, type FormInstance } from "antd";
import { useEffect } from "react";
import { getAllProvince } from "../../../../../common/services/route.service";
import { formRules } from "../../../../../common/utils/formRules";

interface FormsViaCitiesProps {
  name?: string;
  pickupPoint?: { label: string; _id: string };
  dropPoint?: { label: string; _id: string };
  form: FormInstance;
}

export const FormsViaCities = ({
  name = "viaCities",
  pickupPoint,
  dropPoint,
  form,
}: FormsViaCitiesProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["PROVINCE"],
    queryFn: () => getAllProvince(),
  });

  useEffect(() => {
    if (pickupPoint?.label && dropPoint?.label) {
      form.setFieldsValue({
        viaCities: [
          {
            _id: pickupPoint._id,
            label: pickupPoint.label,
            fixed: true,
            isStartPoint: true,
          },
          { _id: dropPoint._id, label: dropPoint.label, fixed: true },
        ],
      });
    }
  }, [pickupPoint, dropPoint, form]);

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <div className="flex flex-col gap-4 mt-3">
          {fields.map(({ key, name }, index) => {
            const fieldValue = form.getFieldValue(["viaCities", name]);
            const isFixed = fieldValue?.fixed;

            return (
              <>
                <div
                  key={key}
                  className={`border border-gray-200 relative rounded-md p-4 shadow-sm ${
                    isFixed ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Form.Item
                      className="flex-1"
                      label={
                        isFixed
                          ? index === 0
                            ? "Điểm xuất phát"
                            : "Điểm kết thúc"
                          : "Tỉnh/Thành đi qua"
                      }
                      name={[name, "label"]}
                      rules={[formRules.required("Tỉnh/Thành đi qua")]}
                    >
                      <Select
                        showSearch
                        disabled={isFixed}
                        placeholder="Chọn tỉnh/thành đi qua"
                        loading={isLoading}
                        options={data?.data.map((item) => ({
                          value: item.label,
                          label: item.label,
                        }))}
                        style={{ height: 40, borderRadius: 5 }}
                      />
                    </Form.Item>

                    <Form.Item
                      className="flex-1"
                      name={[name, "description"]}
                      label="Ghi chú (nếu có)"
                    >
                      <Input
                        style={{ height: 40, borderRadius: 5 }}
                        placeholder="Ví dụ: QL1A, Đường tỉnh 70, Cao tốc Bắc Giang – Lạng Sơn"
                      />
                    </Form.Item>

                    {!isFixed && (
                      <Tooltip title="Xoá điểm đi qua">
                        <Button
                          className="absolute right-2 top-1"
                          danger
                          type="text"
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>

                {index === fields.length - 2 && fields.length < 16 && (
                  <Button
                    type="dashed"
                    onClick={() =>
                      add({ label: null, fixed: false }, fields.length - 1)
                    }
                    icon={<PlusOutlined />}
                    className="w-full my-3 h-10"
                  >
                    Thêm
                  </Button>
                )}
              </>
            );
          })}

          {(!pickupPoint || !dropPoint) && (
            <Button
              disabled={!pickupPoint || !dropPoint}
              type="dashed"
              icon={<PlusOutlined />}
              className="w-full mt-3"
            >
              Thêm điểm trung gian
            </Button>
          )}
        </div>
      )}
    </Form.List>
  );
};
