import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { QUERY_KEY } from "../../common/constants/queryKey";
import { useToast } from "../../common/hooks/useToast";
import { getProfile, updateUser } from "../../common/services/user.service";
import type { IUser } from "../../common/types/User";
import { formRules } from "../../common/utils/formRules";
import { uploadImage } from "../../common/utils/upload";
import UploadImage from "../../components/common/UploadImage";
import ActionBox from "./components/ActionBox";

const ProfileIndex = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data } = useQuery({
    queryKey: [QUERY_KEY.USER.ROOT],
    queryFn: () => getProfile(),
  });
  const user = data?.data;
  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);
  const { message, handleAxiosError } = useToast();
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: (payload: Partial<IUser>) =>
      updateUser(user?._id as string, payload),
    onSuccess: (response) => {
      message.success(response.message);
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes(QUERY_KEY.USER.ROOT),
      });
      setLoading(false);
    },
    onError: (err) => {
      handleAxiosError(err);
      setLoading(false);
    },
  });
  const onSubmit = async (values: any) => {
    setLoading(true);
    if (Array.isArray(values.avatar)) {
      const fileObj = values.avatar[0]?.originFileObj as File;
      if (fileObj) {
        values.avatar = await uploadImage(fileObj);
        if (!values.avatar) {
          message.error("Upload ảnh thất bại");
          setLoading(false);
          return;
        }
      }
    }
    await updateMutation.mutateAsync(values);
  };
  return (
    <div>
      <div className="shadow-lg mb-4 rounded-md p-6">
        <p className="mt-2 text-lg font-semibold mb-4">Hồ sơ cá nhân</p>
        <Form onFinish={onSubmit} layout="vertical" form={form}>
          <Form.Item
            label="Ảnh đại diện"
            name={"avatar"}
            required
            valuePropName="value"
            getValueFromEvent={(e) => e}
            rules={[{ required: true, message: "Vui lòng tải ảnh lên!" }]}
          >
            <UploadImage width={100} height={100} />
          </Form.Item>
          <Form.Item label="Email" required name={"email"}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name={"userName"}
            rules={[...formRules.textRange("Họ và tên", 2, 50)]}
          >
            <Input placeholder="Nhập họ và tên của bạn" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name={"phone"}
            rules={[...formRules.textRange("Số điện thoại", 7, 16)]}
          >
            <Input placeholder="Nhập số điện thoại của bạn" />
          </Form.Item>
          <Form.Item>
            <div className="flex items-center gap-4 justify-end">
              <Button
                onClick={() => form.setFieldsValue(user)}
                disabled={loading}
              >
                Đặt lại
              </Button>
              <Button
                loading={loading}
                htmlType="submit"
                type="primary"
                style={{
                  background: `#0C7D41`,
                }}
              >
                Cập nhật
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <ActionBox />
    </div>
  );
};

export default ProfileIndex;
