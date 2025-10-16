import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

const MainLayout = () => {
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
