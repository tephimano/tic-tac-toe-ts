import React from "react";
import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import SquaresBoard from "./GameComponents/SquaresBoard";
import { constructSquare } from "./GameComponents/GameUtils/UtilFunctions";

const { Header, Content } = Layout;
const GamePage = () => {
  const history = useHistory();
  constructSquare(3);
  return (
    <div style={{ color: "#008080" }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header>
          <div style={{ float: "right" }}>
            <Button
              type="primary"
              icon={<LogoutOutlined />}
              onClick={() => {
                console.log("Logout Button Pushed");
                history.push("/logout");
              }}
            />
          </div>
        </Header>
        <Content>
          <SquaresBoard />
        </Content>
      </Layout>
    </div>
  );
};

export default GamePage;
