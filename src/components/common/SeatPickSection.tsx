import { Button, Form, Input, Select, Tooltip } from "antd";
import SeatMap from "./SeatMap";
import {
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useBookingSelector } from "../../common/store/useBookingStore";

const seatStatuses = [
  { label: "Trống", color: "bg-blue-300", desc: "Ghế trống, có thể chọn" },
  { label: "Đã đặt", color: "bg-pink-100", desc: "Ghế đã được đặt" },
  { label: "Của bạn", color: "bg-[#FFFCD1]", desc: "Ghế bạn đã chọn" },
  { label: "Giữ", color: "bg-gray-300", desc: "Ghế đang giữ" },
  { label: "Không khả dụng", color: "bg-red-300", desc: "Ghế không thể chọn" },
];

const SeatPickSection = () => {
  const seats = useBookingSelector((state) => state.seats);
  const onSubmit = (values: unknown) => {
    console.log(values);
  };
  return (
    <div className="mt-2 bg-white w-full p-4 rounded-lg shadow-md flex gap-6">
      <div className="w-[70%] bg-gray-100 py-6 rounded-lg px-6">
        <div className=" flex flex-col gap-4 items-center">
          <p className="text-center font-semibold">Tầng 1</p>
          <SeatMap totalSeats={16} cols={3} />
        </div>
        <div className="flex items-center justify-end text-xs mt-8 gap-6">
          {seatStatuses.map((status) => (
            <div className="flex items-center gap-2 cursor-pointer">
              <Tooltip key={status.label} title={status.desc} placement="top">
                <div className="bg-white p-0.5 rounded-sm">
                  <div className={`w-6 h-4 rounded-sm ${status.color}`} />
                </div>
              </Tooltip>
              <span>{status.label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center mt-6 gap-8 justify-end">
          <p className="flex items-center gap-4">
            Tổng số ghế đã chọn: <span className="text-lg font-medium">0</span>
          </p>
          <p className="flex items-center gap-4">
            Giá tiền: <span className="text-lg font-medium">0đ</span>
          </p>
        </div>
        <div className="mt-6">
          <p className="italic font-thin">
            Để được giải đáp thắc mắc về dịch vụ của công ty Văn Minh, quý khách
            vui lòng liên hệ{" "}
            <span className="text-red-500 font-medium">1900 6467</span>
          </p>
          <p className="mt-2 italic font-thin">
            <span className="font-medium text-red-500 italic">Lưu ý:</span> Mỗi
            lần đặt vé trực tuyến, quý khách được đặt tối đa 4 vé. Mong quý
            khách thông cảm!
          </p>
        </div>
      </div>
      <div className="w-[30%]">
        <h3 className="text-base font-semibold mb-4">Thông tin khách hàng</h3>
        <Form onFinish={onSubmit}>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input
              style={{
                height: 45,
                borderRadius: 5,
                border: "1px solid #E5E7EB",
                background: "#F3F4F6",
              }}
              className="border-gray-300 shadow-none!"
              placeholder="Số điện thoại"
              prefix={<PhoneOutlined className="mr-2" />}
            />
          </Form.Item>
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input
              style={{
                height: 45,
                borderRadius: 5,
                border: "1px solid #E5E7EB",
                background: "#F3F4F6",
              }}
              className="border-gray-300 shadow-none!"
              placeholder="Họ và tên"
              prefix={<UserOutlined className="mr-2" />}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              {
                type: "email",
                message: "Vui lòng nhập dúng định dạng email!",
              },
            ]}
          >
            <Input
              style={{
                height: 45,
                borderRadius: 5,
                border: "1px solid #E5E7EB",
                background: "#F3F4F6",
              }}
              className="border-gray-300 shadow-none!"
              placeholder="Email"
              prefix={<MailOutlined className="mr-2" />}
            />
          </Form.Item>
          <h3 className="text-base font-semibold mb-4">Địa điểm</h3>
          <Form.Item
            name={"pickUpPoint"}
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Select
              showSearch
              style={{
                height: 45,
              }}
              prefix={<SendOutlined className="mr-2 -rotate-45" />}
              className="custom-select w-full"
              placeholder="Điểm xuất phát"
              optionFilterProp="label"
              options={[
                { value: "Hà Nội", label: "Hà Nội" },
                { value: "Hà Tĩnh", label: "Hà Tĩnh" },
                { value: "Nghệ An", label: "Nghệ An" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name={"dropPoint"}
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Select
              showSearch
              style={{
                height: 45,
              }}
              prefix={<SendOutlined className="mr-2 -rotate-45" />}
              className="custom-select w-full"
              placeholder="Điểm đến"
              optionFilterProp="label"
              options={[
                { value: "Hà Nội", label: "Hà Nội" },
                { value: "Hà Tĩnh", label: "Hà Tĩnh" },
                { value: "Nghệ An", label: "Nghệ An" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              disabled={!seats.length}
              type="primary"
              style={{
                background: "#0c7d41",
                width: "100%",
                height: 40,
                borderRadius: 25,
                marginTop: 6,
              }}
              className="disabled:bg-gray-300!"
            >
              Thanh toán
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SeatPickSection;
