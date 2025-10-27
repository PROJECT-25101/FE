import { Button, Layout, Tag } from "antd";
import { Link, useNavigate } from "react-router";
import { menuGroups } from "./_option";
import SideBarItems from "./SideBarItems";
import { useAuthSelector } from "../../../../common/store";
const { Sider } = Layout;

const SideBar = () => {
  const { logout } = useAuthSelector((state) => ({
    logout: state.logout,
  }));
  const nav = useNavigate();
  return (
    <Sider
      width={280}
      style={{
        background: "white",
        position: "fixed",
        height: "100dvh",
        overflowY: "auto",
      }}
      className="shadow-md"
    >
      <div>
        <div className="px-6 pt-4 pb-4 border-b border-gray-200">
          <div className="text-lg font-medium flex items-center gap-3">
            <Link
              to={"/"}
              className="text-[#0c7d41]! hover:opacity-80 font-bold"
            >
              GO TICKET
            </Link>
            <Tag>Quản lý</Tag>
          </div>
        </div>
        <div className="mt-8 px-3">
          <ul className="flex flex-col gap-4 font-normal text-base">
            {menuGroups.map((menuItem, index) => (
              <SideBarItems key={index} item={menuItem} />
            ))}
          </ul>
        </div>
      </div>
      <div className="px-6 absolute bottom-8 w-full">
        <Button
          onClick={() => {
            nav("/");
            logout();
          }}
          className="w-full! "
        >
          Đăng xuất
        </Button>
      </div>
    </Sider>
  );
};

export default SideBar;
