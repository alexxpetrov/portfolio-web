import React, { useContext, useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useRouter } from "next/navigation";
import { UserContext } from "../../contexts/UserContext";
import { LoginDtoType, RegisterDtoType, User } from "../../types/User";

type FieldType = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
  notification.error({
    message: errorInfo.toString(),
    description: "Error",
    icon: "cross",
  });
};

const Login = () => {
  const { replace } = useRouter();
  const { login, register } = useContext(UserContext);
  const [formState, setFormState] = useState<"login" | "register">("login");
  const [data, setData] = useState<FieldType>({});

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    let response: User | null = null;
    try {
      let authDto;

      switch (formState) {
        case "login":
          authDto = {
            email: values.email,
            password: values.password,
          };
          response = await login(authDto as LoginDtoType);

          break;
        case "register":
          authDto = {
            email: values.email,
            password: values.password,
            firstName: values.firstName ?? "",
            lastName: values.lastName ?? "",
          };
          response = await register(authDto as RegisterDtoType);
          break;
        default:
          break;
      }
      notification.success({
        description: "Success",
        message: `Welcome ${response?.firstName} ${response?.lastName}`,
        icon: "check",
      });
      replace("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {}
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        labelAlign="left"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        labelAlign="left"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<FieldType>
        label="Firstname"
        name="firstName"
        labelAlign="left"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Lastname"
        name="lastName"
        labelAlign="left"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
