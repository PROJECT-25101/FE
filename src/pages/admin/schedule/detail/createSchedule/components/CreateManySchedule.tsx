import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Select,
  TimePicker,
} from "antd";
import { useToast } from "../../../../../../common/hooks/useToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../../../../common/constants/queryKey";
import { getAllCar } from "../../../../../../common/services/car.service";
import { getAllRoute } from "../../../../../../common/services/route.service";
import { getAllUser } from "../../../../../../common/services/user.service";
import type { ICreateManySchedulePayload } from "../../../../../../common/types/Schedule";
import { createManySchedule } from "../../../../../../common/services/schedule.service";
import { formRules } from "../../../../../../common/utils/formRules";
import { filterOption } from "../../../../../../common/utils";
import dayjs from "dayjs";
import { DAYOFWEEK_OPTIONS } from "../../../../../../common/constants/dayOfWeek";
import ModalErrorSchedules from "../../../components/ModalErrorSchedules";
type TinitialValues = {
  carId: string;
  routeId: string;
};
const CreateManySchedule = ({
  setOpen,
  initialValues,
}: {
  setOpen: (e: boolean) => void;
  initialValues: TinitialValues;
}) => {
  const [form] = Form.useForm();
  const {
    message: antdMessage,
    handleAxiosError,
    handleOpenModalError,
  } = useToast();
  const queryClient = useQueryClient();
  const { data: carData } = useQuery({
    queryKey: [QUERY_KEY.CAR.ROOT],
    queryFn: () => getAllCar({ status: true, disablePagination: true }),
  });
  const { data: routeData } = useQuery({
    queryKey: [QUERY_KEY.ROUTE.ROOT],
    queryFn: () => getAllRoute({ status: true, disablePagination: true }),
  });
  const { data: userData } = useQuery({
    queryKey: [QUERY_KEY.USER.ROOT],
    queryFn: () => getAllUser({ role: "staff" }),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ICreateManySchedulePayload) =>
      createManySchedule(payload),
    onSuccess: ({ message }) => {
      antdMessage.success(message);
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERY_KEY.SCHEDULE.ROOT),
      });
      setOpen(false);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      if (err.response.data.data.failedSchedules.length > 0) {
        const { instance, closeModal } = handleOpenModalError(err, null, {
          width: 1200,
          style: { top: 15 },
          footer: null,
        });
        instance.update({
          content: (
            <ModalErrorSchedules
              instance={instance}
              closeModal={closeModal}
              setOpenMainModal={setOpen}
              createdSchedules={err.response.data.data.createdSchedules || []}
              failedSchedules={err.response.data.data.failedSchedules || []}
            />
          ),
        });
      } else {
        handleAxiosError(err);
      }
    },
  });
  const cars = carData?.data || [];
  const routes = routeData?.data || [];
  const startDate = Form.useWatch("startTime", form);
  const driver = Form.useWatch(["crew", 0, "userId"], form);
  const assistant = Form.useWatch(["crew", 1, "userId"], form);
  const handleSubmit = async () => {
    form.validateFields().then((res) => {
      const startTime = res.startTime.format("YYYY-MM-DD");
      const untilTime = res.untilTime.format("YYYY-MM-DD");
      const time = res.fixedTime;
      const fixedHour = {
        hour: time.hour(),
        minute: time.minute(),
        second: 0,
      };
      const crew = res.crew.map((item: { userId: string }, index: number) => ({
        ...item,
        role: index === 0 ? "driver" : "assistant",
      }));
      console.log({ ...res, crew, startTime, untilTime, fixedHour });
      mutate({ ...res, crew, startTime, untilTime, fixedHour });
    });
  };
  return (
    <Form
      initialValues={initialValues}
      form={form}
      layout="vertical"
      className="mt-4!"
    >
      <div className="flex items-center gap-6">
        <Form.Item
          required
          label="Chọn xe"
          className="flex-1"
          name={"carId"}
          rules={[formRules.required("Xe", true)]}
        >
          <Select
            disabled
            style={{ height: 40 }}
            placeholder="Chọn xe"
            showSearch
            filterOption={filterOption}
            options={cars.map((item) => ({
              value: item._id,
              label: item.licensePlate,
            }))}
          />
        </Form.Item>
        <Form.Item
          required
          label="Chọn tuyến đường"
          className="flex-1"
          name={"routeId"}
          rules={[formRules.required("Tuyến đường", true)]}
        >
          <Select
            disabled
            style={{ height: 40 }}
            placeholder="Chọn tuyến đường"
            showSearch
            filterOption={filterOption}
            options={routes.map((item) => ({
              value: item._id,
              label: `${item.pickupPoint.label} - ${item.dropPoint.label}`,
            }))}
          />
        </Form.Item>
      </div>
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
          // rules={[formRules.required("Phụ xe", true)]}
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
            value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""
          }
          parser={(value: string | undefined) =>
            Number(value?.replace(/\./g, "") || 0)
          }
        />
      </Form.Item>

      <Form.Item
        required
        label="Chọn giờ chạy"
        className="flex-1"
        name={"fixedTime"}
        rules={[formRules.required("Giờ chạy", true)]}
      >
        <TimePicker
          style={{ width: "100%", height: 40 }}
          placeholder="Chọn giờ chạy"
          format="HH:mm"
          popupClassName="custom-timepicker-popup"
        />
      </Form.Item>

      <div className="flex items-center gap-6">
        <Form.Item
          name="startTime"
          required
          label="Chọn ngày bắt đầu"
          className="flex-1"
          rules={[formRules.required("Ngày bắt đầu", true)]}
        >
          <DatePicker
            style={{ width: "100%", height: 40 }}
            placeholder="Chọn ngày bắt đầu"
            onChange={() => form.setFieldValue("untilTime", null)}
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        </Form.Item>
        <Form.Item
          name="untilTime"
          required
          label="Chọn ngày kết thúc"
          className="flex-1"
          rules={[formRules.required("Ngày kết thúc", true)]}
        >
          <DatePicker
            style={{ width: "100%", height: 40 }}
            placeholder="Chọn ngày kết thúc"
            disabled={!startDate}
            disabledDate={(current) =>
              !current ||
              (startDate && current < startDate.startOf("day")) ||
              current.isSame(dayjs(), "day")
            }
          />
        </Form.Item>
        <Form.Item
          required
          label="Chọn ngày trong tuần"
          name={"dayOfWeek"}
          className="flex-1"
          rules={[formRules.required("Ngày trong tuần", true)]}
        >
          <Select
            mode="multiple"
            style={{ width: "100%", height: 40 }}
            placeholder="Chọn ngày chạy trong tuần"
            options={DAYOFWEEK_OPTIONS}
            maxTagCount="responsive"
            allowClear
            maxTagPlaceholder={(omittedValues) =>
              `+${omittedValues.length} ...`
            }
          />
        </Form.Item>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button
          style={{ height: 40 }}
          onClick={() => setOpen(false)}
          disabled={isPending}
        >
          Huỷ bỏ
        </Button>
        <Button
          onClick={handleSubmit}
          loading={isPending}
          disabled={isPending}
          style={{
            background: `#0C7D41`,
            color: "white",
            height: 40,
          }}
        >
          Xác nhận
        </Button>
      </div>
    </Form>
  );
};

export default CreateManySchedule;
