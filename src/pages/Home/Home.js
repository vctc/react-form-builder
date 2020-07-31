import React, { useContext, useState } from "react";
import { Row, Col, Divider, Button, Form, Input, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect, useDispatch } from "react-redux";
import Toolbar from "../../components/Toolbar/Toolbar";
import Preview from "../../components/Preview/Preview";
import { FirebaseContext } from "../../Firebase";
import uuid from "react-uuid";

import { BulkDelete } from "../../actions/createFormAction";
import FormsList from "../../components/FormsList/FormsList";

const Home = ({ createForm }) => {
  const dispatch = useDispatch();
  const [showCreate, setShowCreate] = useState(false);
  const { firebase } = useContext(FirebaseContext);

  const openNotification = (message, description, color) => {
    const args = {
      message,
      description,
      duration: 3,
      style: {
        border: `3px solid ${color}`,
      },
    };
    notification.open(args);
  };
  const onFinish = async (values) => {
    if (createForm.length === 0) {
      openNotification(
        "Select One Input Field",
        "Form will not generate with empty fields. Please select any one field",
        "red"
      );
      return;
    }
    const form = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      name: values.name,
      data: createForm,
    };
    try {
      await firebase.db.collection("/forms").add(form);
      dispatch(BulkDelete());
      openNotification("Form generated successfully", "", "green");
    } catch (err) {
      console.log("error", err);
    }
  };

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

          <FormsList />
        </Col>
        <Col className="gutter-row home-col" span={12}>
          <Divider
            orientation="center"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Playground
          </Divider>
          <Preview data={createForm || []} editMode />
        </Col>
        <Col className="gutter-row home-col" span={6}>
          <Divider
            orientation="center"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Toolbar
          </Divider>
          {!showCreate && (
            <Button
              onClick={() => {
                setShowCreate(true);
                dispatch(BulkDelete());
              }}
              type="dashed"
              className="home__new-button"
              block
            >
              <PlusOutlined className="home__plus-icon" /> Create Form
            </Button>
          )}
          {showCreate && (
            <>
              <Form
                name="create_form"
                className="create-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                size="large"
              >
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input the form name!" },
                  ]}
                  label="Form Name"
                >
                  <Input placeholder="form name" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    block
                  >
                    Create Form
                  </Button>
                </Form.Item>
              </Form>
              <Toolbar />
            </>
          )}
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

export default connect(mapStateToProps, null)(Home);
