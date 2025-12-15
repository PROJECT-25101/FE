import {
  ClockCircleOutlined,
  LockOutlined,
  LogoutOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { useAuthSelector } from "../../../common/store";

const ActionBox = () => {
  const logout = useAuthSelector((state) => state.logout);
  const nav = useNavigate();
  const handleLogout = () => {
    nav("/");
    logout();
  };
  return (
    <div className="shadow-lg rounded-md p-6">
      <p className="mt-2 text-lg font-semibold mb-4">Tài khoản</p>
      <div className="relative flex items-start gap-4 overflow-hidden rounded-md group cursor-pointer">
        <div className="absolute inset-0 bg-[#b6dbfc] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
        <div className="relative z-10 bg-[#b6dbfc] text-[#30a0ff] group-hover:bg-transparent rounded-sm py-2.5 px-4 text-2xl transition-colors duration-300">
          <LockOutlined />
        </div>
        <div className="relative z-10">
          <p className="text-lg font-semibold">Đổi mật khẩu</p>
          <p className="text-sm text-gray-500/80">Cập nhật mật khẩu bảo mật</p>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-500/80">
          <RightOutlined />
        </div>
      </div>
      <Link
        to={"/profile/my-ticket"}
        className="relative flex items-start gap-4 overflow-hidden rounded-md group cursor-pointer mt-8"
      >
        <div className="absolute inset-0 bg-[#b9facb] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
        <div className="relative z-10 bg-[#b9facb] text-green-600 group-hover:bg-transparent rounded-sm py-2.5 px-4 text-2xl transition-colors duration-300">
          <ClockCircleOutlined />
        </div>
        <div className="relative z-10">
          <p className="text-lg font-semibold text-black">Lịch sử đặt vé</p>
          <p className="text-sm text-gray-500/80">Xem các chuyến đi đã đặt</p>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-500/80">
          <RightOutlined />
        </div>
      </Link>
      <div
        onClick={handleLogout}
        className="relative flex items-start gap-4 overflow-hidden rounded-md group cursor-pointer mt-8"
      >
        <div className="absolute inset-0 bg-[#ffbaba] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
        <div className="relative z-10 bg-[#ffbaba] text-red-700 group-hover:bg-transparent rounded-sm py-2.5 px-4 text-2xl transition-colors duration-300">
          <LogoutOutlined />
        </div>
        <div className="relative z-10">
          <p className="text-lg font-semibold text-red-500">Đăng xuất</p>
          <p className="text-sm text-red-500/80">Thoát khỏi tài khoản</p>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-500/80">
          <RightOutlined />
        </div>
      </div>
    </div>
  );
};

export default ActionBox;
