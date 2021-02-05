import React from "react";
import { Form, Input, Button } from "antd";
import "../styles/LoginPage.css";

/** Displays the login screen of the app */
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className="center-content">
      <h2> Please Enter your email to Login! </h2>
      <Form {...layout} name="login" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
