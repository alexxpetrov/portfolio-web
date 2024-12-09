"use client";
import { SafetyCertificateOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Typography,
} from "antd";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import { LoginDtoType, RegisterDtoType, User } from "../../../types/User";

type FieldType = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  notification.error({
    message: errorInfo.toString(),
    description: "Error",
    icon: "cross",
  });
};

const Login = () => {
  const { login, register, user, logout, handleWebAuthRegister } =
    useContext(UserContext);
  const [formState, setFormState] = useState<"login" | "register">("login");
  const [opened, setOpened] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    let response: User | null = null;
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

    setOpened(false);
  };

  const handleBiometricAuth = async () => {
    const response = await handleWebAuthRegister();

    notification.success({
      description: "Success",
      message:
        !response?.firstName && !response?.lastName
          ? "Welcome! Please fill in your profile details"
          : `Welcome ${response?.firstName ?? ""} ${response?.lastName ?? ""}`,
      icon: "check",
    });

    setOpened(false);
  };

  return (
    <>
      {user ? (
        <div className="flex w-full justify-end items-center gap-4">
          <Flex align="center">
            <Typography style={{ color: "white" }}>{`Hi ${
              user.firstName || "User"
            } ${user.lastName || "Usssser"}!`}</Typography>
          </Flex>
          <Button onClick={logout}>Log out</Button>
        </div>
      ) : (
        <Button onClick={() => setOpened(true)}>Log in</Button>
      )}

      <Modal
        open={opened}
        onCancel={() => setOpened(false)}
        footer={null}
        styles={{ body: { marginTop: "32px" } }}
      >
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
          {formState === "register" && (
            <>
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
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              onClick={() =>
                setFormState(formState === "login" ? "register" : "login")
              }
            >
              {formState === "login" ? "Sign up" : "Log in"}
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              onClick={handleBiometricAuth}
              icon={<SafetyCertificateOutlined />}
            >
              Sign in with Fingerprint
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Login;
