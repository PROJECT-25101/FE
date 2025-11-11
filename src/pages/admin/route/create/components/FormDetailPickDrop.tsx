import { DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select, type FormInstance } from "antd";
import React, { useCallback, useMemo } from "react";
import { getWards } from "../../../../../common/services/route.service";
import type { IPoint } from "../../../../../common/types/Route";

export const FormDetailPickDrop = ({
  point,
  nameForm,
  key = "WARDS_PICKUP",
  form,
  textButton,
}: {
  point: IPoint;
  nameForm: string | string[];
  key: string;
  form: FormInstance;
  textButton: string;
}) => {
  const { data } = useQuery({
    queryKey: [key, point?._id],
    queryFn: async () => {
      const { data } = await getWards(point?._id);
      return data;
    },
    enabled: !!point?._id,
  });

  const selectedIds = useMemo(() => {
    const list = form.getFieldValue(nameForm) || [];
    return list.map((i: IPoint) => i?._id).filter(Boolean);
  }, [form, nameForm]);

  const handleNormalize = useCallback(
    (value: Partial<IPoint & { value: string }>, name: number) => {
      if (value) {
        const basePath = Array.isArray(nameForm) ? [...nameForm] : [nameForm];
        form.setFieldValue([...basePath, name, "_id"], value.value);
        return value.label;
      }
      return "";
    },
    [form, nameForm],
  );

  return (
    <Form.List
      name={nameForm}
      initialValue={[{ label: null, description: [""] }]}
      rules={[
        {
          validator: async (_, desc) => {
            if (!desc || desc.length < 1) {
              return Promise.reject(new Error("Cần ít nhất 1 điểm đón"));
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <div>
          {fields.map(({ key, name, ...restField }) => (
            <div key={key} className="flex flex-col gap-2 mb-2">
              <div className="flex gap-2 items-start">
                {/* Select Quận / Huyện */}
                <Form.Item
                  {...restField}
                  name={[name, "label"]}
                  style={{ width: "40%" }}
                  rules={[{ required: true, message: "Chọn quận/huyện" }]}
                  normalize={(value) => handleNormalize(value, name)}
                >
                  <Select
                    style={{ height: 35 }}
                    placeholder="Chọn quận/huyện"
                    showSearch
                    labelInValue
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={data?.map((item) => ({
                      value: item._id,
                      label: item.label,
                      disabled: selectedIds.includes(item._id),
                    }))}
                  />
                </Form.Item>

                {/* Danh sách địa chỉ chi tiết */}
                <div className="flex-1">
                  <DescriptionList name={name} />
                </div>

                {/* Nút xóa điểm đón */}
                <Form.Item>
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                </Form.Item>
              </div>
            </div>
          ))}

          <Button
            type="dashed"
            onClick={() => add({ label: null, description: [""] })}
            block
          >
            {textButton}
          </Button>

          <Form.ErrorList errors={errors} className="text-red-500!" />
        </div>
      )}
    </Form.List>
  );
};

const DescriptionList = React.memo(({ name }: { name: number }) => {
  return (
    <Form.List
      name={[name, "description"]}
      rules={[
        {
          validator: async (_, desc) => {
            if (!desc || desc.length < 1) {
              return Promise.reject(
                new Error("Cần ít nhất 1 địa chỉ chi tiết!"),
              );
            }
          },
        },
      ]}
    >
      {(descFields, { add, remove }, { errors }) => (
        <>
          <div className="flex flex-col gap-2">
            {descFields.map(({ key: dKey, name: dName, ...restDesc }) => (
              <div key={dKey} className="flex gap-2 items-center">
                <Form.Item
                  {...restDesc}
                  name={dName}
                  style={{ flex: 1 }}
                  rules={[{ required: true, message: "Nhập chi tiết địa chỉ" }]}
                >
                  <Input
                    style={{ height: 35 }}
                    allowClear
                    autoComplete="off"
                    placeholder={"Nhập địa chỉ chi tiết"}
                  />
                </Form.Item>

                <Form.Item>
                  <Button danger onClick={() => remove(dName)}>
                    Xóa
                  </Button>
                </Form.Item>
              </div>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              Thêm địa chỉ
            </Button>
          </div>

          <Form.ErrorList errors={errors} className="text-red-500!" />
        </>
      )}
    </Form.List>
  );
});
