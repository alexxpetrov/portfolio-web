import { Button, Modal, Input, Form, FormProps, notification } from "antd";
import { KeyedMutator } from "swr";
import { Todo } from "./types";
import { useState } from "react";
import { useFetchData } from "../../utils/fetcher";

type FieldType = {
  body: string;
  title: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  notification.error({
    message: errorInfo.toString(),
    description: "Error",
    icon: "cross",
  });
};

export const AddTodo = ({ mutate }: { mutate: KeyedMutator<Todo[]> }) => {
  const [opened, setOpen] = useState(false);
  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const { protectedFetcher } = useFetchData();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { data } = await protectedFetcher("todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: values,
    })();

    await mutate(data);

    notification.success({
      description: "Success",
      message: `Welcome `,
      icon: "check",
    });
    close();
  };

  return (
    <>
      <Modal
        open={opened}
        onCancel={close}
        title="Create Todo"
        centered
        footer={null}
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
            label="Title"
            name="title"
            labelAlign="left"
            rules={[{ required: true, message: "Please input your title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Body"
            name="body"
            labelAlign="left"
            rules={[{ required: true, message: "Please input your body!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={open}>Open</Button>
    </>
  );
};
