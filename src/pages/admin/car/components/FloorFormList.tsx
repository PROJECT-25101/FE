import { Button, Form, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { formRules } from "../../../../common/utils/formRules";

interface FloorsFormListProps {
  name?: string;
  initialValue?: { seatCount: number; cols: number }[];
}

export const FloorsFormList = ({
  name = "floors",
  initialValue = [{ seatCount: 16, cols: 3 }],
}: FloorsFormListProps) => {
  return (
    <Form.List name={name} initialValue={initialValue}>
      {(floors, { add, remove }) => (
        <div className="flex flex-col gap-4 mt-3">
          {floors.map((floor) => (
            <div
              key={floor.key}
              className="border border-gray-200 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex justify-between w-full">
                <h3 className="font-semibold text-gray-700">
                  Tầng {floor.name + 1}
                </h3>
                <Button
                  type="text"
                  danger
                  icon={<MinusCircleOutlined />}
                  onClick={() => remove(floor.name)}
                >
                  Xóa tầng
                </Button>
              </div>

              <div className="flex items-center gap-4 mt-2">
                <Form.Item
                  label="Số ghế"
                  className="w-full!"
                  name={[floor.name, "seatCount"]}
                  rules={formRules.numberRange("Số ghế", 6, 30)}
                >
                  <InputNumber min={1} className="w-full!" />
                </Form.Item>

                <Form.Item
                  label="Số cột"
                  className="w-full!"
                  name={[floor.name, "cols"]}
                  rules={formRules.numberRange("Số cột", 1, 5)}
                >
                  <InputNumber min={1} className="w-full!" />
                </Form.Item>
              </div>
            </div>
          ))}

          {floors.length < 3 && (
            <Button
              type="dashed"
              onClick={() => add({ seatCount: 16, cols: 3 })}
              icon={<PlusOutlined />}
              className="w-full"
            >
              Thêm tầng
            </Button>
          )}
        </div>
      )}
    </Form.List>
  );
};
