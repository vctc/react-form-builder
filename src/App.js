import React from "react";
import "./App.scss";
import { Layout, Menu, Row, Col, Divider } from "antd";
import "antd/dist/antd.css";
import Logo from "./images/logo.webp";

function App() {
  const { Header, Content, Footer } = Layout;
  return (
    <div className="app">
      <Layout>
        <Header className="app__header">
          <>
            <div className="app__header-logo">
              <img src={Logo} />
            </div>
            <Menu className="app__header__menu" theme="dark" mode="horizontal">
              <Menu.Item>Home</Menu.Item>
              <Menu.Item>About</Menu.Item>
              <Menu.Item>Contact</Menu.Item>
            </Menu>
          </>
        </Header>
        <Content className="app__content">
          <Row gutter={16}>
            <Col span={6}>
              <Divider
                orientation="center"
                style={{ color: "#333", fontWeight: "normal" }}
              >
                Forms
              </Divider>
            </Col>
            <Col span={12}>
              <Divider
                orientation="center"
                style={{ color: "#333", fontWeight: "normal" }}
              >
                Playground
              </Divider>
            </Col>
            <Col span={6}>
              <Divider
                orientation="center"
                style={{ color: "#333", fontWeight: "normal" }}
              >
                Form Inputs
              </Divider>
            </Col>
          </Row>
        </Content>
        <Footer className="app__footer">Made with ❤️ by TuringTest</Footer>
      </Layout>
    </div>
  );
}

export default App;
