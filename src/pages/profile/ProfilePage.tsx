import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../common/constants/queryKey";
import { getProfile } from "../../common/services/user.service";
import { Outlet } from "react-router";
import { Image } from "antd";

const ProfilePage = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.USER.ROOT],
    queryFn: () => getProfile(),
  });
  return (
    <div
      className="max-w-7xl xl:mx-auto mx-6 grid mt-12 gap-8"
      style={{ gridTemplateColumns: "400px 1fr" }}
    >
      <div className="shadow-lg rounded-md flex h-[300px] flex-col justify-center p-6 items-center">
        <Image
          src={data?.data.avatar}
          className="rounded-full w-32! h-32! object-cover"
          alt=""
        />
        <p className="mt-4 text-gray-500 text-base font-medium">
          {data?.data.userName}
        </p>
        <p className="mt-2 text-base font-medium">{data?.data.email}</p>
      </div>
      <Outlet />
    </div>
  );
};

export default ProfilePage;
