import { Layout } from "antd";
import { Outlet } from "react-router";
import SideBar from "./components/sidebar/SideBar";
import { useAuthSelector } from "../../common/store";
import { useEffect } from "react";
import { initSocket } from "../../socket/socket-client";

const { Content } = Layout;

const AdminLayout = () => {
  const token = useAuthSelector((state) => state.token);

  useEffect(() => {
    if (token) initSocket(token as string);
  }, [token]);
  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <SideBar />
      <Layout style={{ marginLeft: 280 }}>
        <Content
          style={{
            padding: 24,
            background: "#f9f9f9",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
