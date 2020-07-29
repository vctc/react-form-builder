import React from "react";
import { Row, Col, Divider } from "antd";

const Home = () => {
  return (
    <div className="home">
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <Divider
            orientation="center"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Forms
          </Divider>
        </Col>
        <Col className="gutter-row" span={12}>
          <Divider
            orientation="center"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Playground
          </Divider>
        </Col>
        <Col className="gutter-row" span={6}>
          <Divider
            orientation="center"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Controls
          </Divider>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
