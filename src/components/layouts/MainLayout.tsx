import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuthSelector } from "../../common/store";
import { initSocket } from "../../socket/socket-client";
import { useEffect } from "react";

const MainLayout = () => {
  const token = useAuthSelector((state) => state.token);

  useEffect(() => {
    if (token) initSocket(token as string);
  }, [token]);
  return (
    <>
      <Header />
      <main className="min-h-[100vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
