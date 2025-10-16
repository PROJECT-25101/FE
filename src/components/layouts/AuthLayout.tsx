import { Navigate, Outlet } from "react-router";
import { useAuthSelector } from "../../common/store";
import Header from "./components/Header";

const AuthLayout = () => {
  const { isLogged } = useAuthSelector((state) => ({
    isLogged: state.isLogged,
  }));
  if (isLogged) return <Navigate to="/" />;
  return (
    <>
      <Header isAuthPage={true} />
      <main
        style={{
          backgroundImage: `url(https://vanminh76.vn/wp-content/uploads/2024/03/bg-number.png)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className=" grid grid-cols-2 max-w-7xl xl:mx-auto mx-6 items-center min-h-[90vh] py-8">
          <div className="flex flex-col items-center gap-8">
            <img
              src="https://www.freeiconspng.com/uploads/bus-png-1.png"
              alt=""
              className="w-xl"
            />
            <div className="text-center flex flex-col gap-2">
              <h2 className="font-bold text-4xl text-[#0C7D41]">
                <span>GO</span> TICKET
              </h2>
              <p className="text-2xl text-gray-500 px-4 font-medium rounded-md">
                Mở chiếc vé nhỏ, khởi đầu hành trình niềm vui lớn
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
