import { useEffect, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router";
import { Button } from "antd";

const VerifyUser = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#062b1b] via-[#083922] to-[#0C7D41] text-white px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/pattern-bus.svg')] opacity-[0.03] bg-repeat"></div>
      {loading ? (
        <div className="flex flex-col items-center gap-4 animate-fadeIn">
          <div className="w-20 h-20 border-[6px] border-[#14532d] border-t-[#0C7D41] rounded-full animate-spin"></div>
          <p className="text-white text-sm tracking-wide">
            Đang xác thực tài khoản...
          </p>
        </div>
      ) : status === "success" ? (
        <div className="flex flex-col items-center gap-5 animate-fadeIn relative z-10">
          <CheckCircleOutlined className="text-[#0C7D41]! text-7xl drop-shadow-lg" />
          <h2 className="text-2xl font-semibold text-white">
            Xác thực thành công!
          </h2>
          <p className="text-gray-300 max-w-sm">
            Tài khoản của bạn đã được kích hoạt. Hãy đăng nhập để đặt vé và theo
            dõi chuyến đi của bạn.
          </p>

          <Link to="/auth/login" className="w-full max-w-xs">
            <Button
              style={{
                background: "#0C7D41",
                height: 50,
                borderRadius: "9999px",
                width: "100%",
                border: "none",
                fontWeight: 500,
              }}
              className="hover:brightness-110 transition-all text-white!"
            >
              Đăng nhập ngay
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 animate-fadeIn relative z-10">
          <CloseCircleOutlined className="text-[#ef4444]! text-7xl drop-shadow-md" />
          <h2 className="text-2xl font-semibold text-white">
            Xác thực thất bại
          </h2>
          <p className="text-gray-300 max-w-sm">
            Liên kết xác thực đã hết hạn hoặc không hợp lệ. Vui lòng kiểm tra
            lại email hoặc yêu cầu gửi lại.
          </p>
          <Link to="/" className="w-full max-w-xs">
            <Button
              style={{
                background: "linear-gradient(90deg,#0C7D41,#16a34a)",
                height: 50,
                borderRadius: "9999px",
                width: "100%",
                border: "none",
                fontWeight: 500,
              }}
              className="hover:brightness-110 transition-all text-white!"
            >
              Quay lại trang chủ
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default VerifyUser;
