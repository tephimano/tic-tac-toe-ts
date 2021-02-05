import React from "react";
import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Header, Content } = Layout;
const GamePage = () => {
  const history = useHistory();
  return (
    <div style={{ color: "#008080" }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <div style={{ float: "right" }}>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={() => {
                sessionStorage.removeItem("token");
                history.push("/");
              }}
            />
          </div>
        </Header>
        <Content>
          <div className="center-content">Game is displayed here</div>
        </Content>
      </Layout>
    </div>
  );
};

export default GamePage;
