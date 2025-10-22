import {
  CalendarOutlined,
  CarOutlined,
  ClusterOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import type { JSX } from "react";

export type IChildrenItem = {
  label: string;
  route: string;
};

export type IMenuItem = {
  icon: JSX.Element;
  label: string;
  route?: string;
  children?: IChildrenItem[];
};

export const menuGroups: IMenuItem[] = [
  {
    icon: <LineChartOutlined />,
    label: "Thống kê",
    route: "/admin",
  },
  {
    icon: <CarOutlined />,
    label: "Quản lý xe",
    children: [
      { label: "Tạo mới xe", route: "/admin/car/create" },
      { label: "Tất cả xe", route: "/admin/car" },
    ],
  },
  {
    icon: <ClusterOutlined />,
    label: "Quản lý tuyến đường",
    children: [
      { label: "Tạo mới tuyến đường", route: "/admin/route/create" },
      { label: "Tất cả tuyến đường", route: "/admin/route" },
    ],
  },
  {
    icon: <CalendarOutlined />,
    label: "Quản lý lịch chạy",
    children: [
      { label: "Tạo lịch chạy", route: "/admin/schedule/create" },
      { label: "Tất cả lịch chạy", route: "/admin/schedule" },
    ],
  },
];
