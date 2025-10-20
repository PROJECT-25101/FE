import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Navigate, useNavigate, useParams } from "react-router";
import { useAuthStore } from "../../../common/store";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../common/constants/queryKey";
import { getProfile } from "../../../common/services/user.service";

const LoginGooglePage = () => {
  const { tk } = useParams();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const _id = params.get("_id");
  login(tk as string, null);
  const { data } = useQuery({
    queryKey: [QUERY_KEY.USER.ROOT, _id],
    queryFn: async () => {
      try {
        const { data } = await getProfile();
        if (data) {
          login(tk as string, data);
          navigate("/", { replace: true });
        }
        return data;
      } catch (error) {
        void error;
        navigate("/auth/login?error='Có lỗi xảy ra'", { replace: true });
      }
    },
    enabled: Boolean(tk),
    retry: 0,
  });
  void data;
  if (tk && tk?.length < 5) return <Navigate to="/" />;
  return (
    <div className="min-h-[100dvh] min-w-[100dvw] flex items-center justify-center">
      <Spin
        indicator={
          <LoadingOutlined style={{ color: "#15803D", fontSize: 62 }} spin />
        }
      />
    </div>
  );
};

export default LoginGooglePage;
