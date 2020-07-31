import React from "react";
import { Row, Col, Divider, List, Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import Toolbar from "../../components/Toolbar/Toolbar";
import Preview from "../../components/Preview/Preview";
const Home = ({ createForm }) => {
  return (
    <div className="home">
      <Row gutter={16}>
        <Col className="gutter-row home-col" span={6}>
          <Divider
            orientation="center"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Forms
          </Divider>
          <Button type="dashed" className="home__new-button" block>
            <PlusOutlined className="home__plus-icon" /> Create Form
          </Button>
          <List>
            <List.Item>
              <Card size="default">Card content</Card>
            </List.Item>
            <List.Item>
              <Card>Card content</Card>
            </List.Item>
            <List.Item>
              <Card>Card content</Card>
            </List.Item>
            <List.Item>
              <Card>Card content</Card>
            </List.Item>
            <List.Item>
              <Card size="default">Card content</Card>
            </List.Item>
            <List.Item>
              <Card>Card content</Card>
            </List.Item>
            <List.Item>
              <Card>Card content</Card>
            </List.Item>
            <List.Item>
              <Card>Card content</Card>
            </List.Item>
            <List.Item>
              <Card size="default">Card content</Card>
            </List.Item>
            <List.Item>
              <Card>Card content</Card>
            </List.Item>
            <List.Item>
              <Card>Card content</Card>
            </List.Item>
            <List.Item>
              <Card>Card content</Card>
            </List.Item>
          </List>
        </Col>
        <Col className="gutter-row home-col" span={12}>
          <Divider
            orientation="center"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Playground
          </Divider>
          <Preview data={createForm || []} />
        </Col>
        <Col className="gutter-row home-col" span={6}>
          <Divider
            orientation="center"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Toolbar
          </Divider>
          <Toolbar />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
