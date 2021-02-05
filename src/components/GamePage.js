import React from "react";
import Layout, { Content, Header, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const GamePage = () => {
  return (
    <div style={{ color: "#008080" }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <Button type="primary" icon={<LogoutOutlined />} />
        </Header>
        <Content>
          <div>Game is displayed here</div>
        </Content>
      </Layout>
    </div>
  );
};

export default GamePage;
