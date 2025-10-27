import { Link, useNavigate } from "react-router";
import { useAuthSelector } from "../../../common/store";
import { scrollToSection } from "../../../common/utils";
import { Avatar, Dropdown, type MenuProps } from "antd";
import {
  DashboardOutlined,
  FileSearchOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../common/constants/queryKey";
import { getProfile } from "../../../common/services/user.service";

const AuthHeader = () => {
  const { isLogged, user, logout, login, token } = useAuthSelector((state) => ({
    user: state.user,
    token: state.token,
    isLogged: state.isLogged,
    logout: state.logout,
    login: state.login,
  }));
  const handleBooking = () => scrollToSection("booking");
  const nav = useNavigate();
  const handleLogin = () => {
    nav("/auth/login");
  };
  const { data } = useQuery({
    queryKey: [QUERY_KEY.USER.ROOT, user?._id],
    queryFn: async () => {
      const { data } = await getProfile();
      if (data) {
        login(token as string, data);
      }
      return data;
    },
    enabled: isLogged,
    retry: 0,
  });
  void data;
  const items: MenuProps["items"] = [
    ...(user?.role === "admin"
      ? [
          {
            label: <Link to={"/admin"}>Quản trị hệ thống</Link>,
            icon: <DashboardOutlined />,
            key: "0",
          },
        ]
      : []),
    {
      label: <Link to={"/profile"}>Thông tin cá nhân</Link>,
      icon: <UserOutlined />,
      key: "1",
    },
    {
      label: <Link to={"/profile/orders"}>Lịch sử đặt vé</Link>,
      icon: <FileSearchOutlined />,
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: "Đăng xuất",
      key: "3",
      icon: <LogoutOutlined className="rotate-180" />,
      onClick: () => {
        logout();
        nav("/");
      },
    },
  ];
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleBooking}
        className="bg-[#0c7d41] font-medium hover:opacity-85 duration-300 cursor-pointer py-3 px-6 uppercase rounded-full text-white"
      >
        Đặt vé ngay
      </button>
      {isLogged ? (
        <Dropdown menu={{ items }}>
          <Link
            to={"/profile"}
            className=" flex items-center gap-3 font-medium cursor-pointer hover:opacity-85 duration-300 py-3 px-6  rounded-full text-black!"
          >
            <Avatar src={user?.avatar} size="default" />
            <div className="flex flex-col">
              <p>Xin chào</p>
              <p className="whitespace-nowrap text-ellipsis max-w-[100px] overflow-hidden">
                {" "}
                {user?.userName}
              </p>
            </div>
          </Link>
        </Dropdown>
      ) : (
        <button
          onClick={() => handleLogin()}
          className="bg-[#0c7d41] font-medium cursor-pointer hover:opacity-85 duration-300 py-3 px-6 uppercase rounded-full text-white"
        >
          Đăng nhập
        </button>
      )}
    </div>
  );
};

export default AuthHeader;
