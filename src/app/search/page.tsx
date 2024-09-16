"use client";

import React, { useEffect } from "react";
import {
  Form,
  InputNumber,
  Switch,
  Button,
  FormProps,
  notification,
} from "antd";
import { ENDPOINT, useFetchData } from "../dashboard/utils/fetcher";
import { useUserContext } from "../dashboard/hooks/useUserContext";
import useSWR from "swr";

type FieldType = {
  urlsPerHour: number;
  searchOn: boolean;
  addNewUrls: boolean;
};

const AppForm = () => {
  const [form] = Form.useForm();

  const { user } = useUserContext();
  const { protectedFetcher } = useFetchData();

  const { data, error, isLoading } = useSWR(
    [user],
    protectedFetcher({ url: "searchSettings", token: user?.accessToken }),
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data && !error && !isLoading) {
      form.setFieldsValue({
        urlsPerHour: data.amount,
        searchOn: data.searchOn,
        addNewUrls: data.addNew,
      });
    }
  }, [data, error, isLoading]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    await fetch(`${ENDPOINT}/api/searchSettings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addNew: values.addNewUrls,
        searchOn: values.searchOn,
        amount: values.urlsPerHour,
      }),
    }).then((r) => {
      notification.success({
        description: "Success",
        message: `Settings updated`,
        icon: "check",
      });
      return r.json();
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mt-8">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}
        >
          {/* Input: URLs per Hour */}
          <Form.Item
            label="URLs per Hour"
            name="urlsPerHour"
            rules={[
              {
                required: true,
                message: "Please input the number of URLs per hour!",
              },
            ]}
            layout="horizontal"
          >
            <InputNumber
              min={1}
              max={1000}
              placeholder="Enter number"
              style={{ width: "100%" }}
            />
          </Form.Item>

          {/* Toggle: Search On */}
          <Form.Item
            label="Search On"
            name="searchOn"
            valuePropName="checked" // To bind the checked state to form
            wrapperCol={{ offset: 8, span: 16 }}
            layout="horizontal"
          >
            <Switch />
          </Form.Item>

          {/* Toggle: Add New URLs */}
          <Form.Item
            label="Add New URLs"
            name="addNewUrls"
            valuePropName="checked" // To bind the checked state to form
            layout="horizontal"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Switch />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AppForm;
