import { Layout } from "antd";
import { Outlet } from "react-router";
import SideBar from "./components/sidebar/SideBar";

const { Content } = Layout;

const AdminLayout = () => {
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
