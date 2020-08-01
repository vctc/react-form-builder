import React, { useContext, useState } from "react";
import { Row, Col, Divider, Button, Form, Input, Modal } from "antd";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { connect, useDispatch } from "react-redux";
import Toolbar from "../../components/Toolbar/Toolbar";
import Preview from "../../components/Preview/Preview";
import { FirebaseContext } from "../../Firebase";
import uuid from "react-uuid";

import { BulkDelete, BulkAdd } from "../../actions/createFormAction";
import FormsList from "../../components/FormsList/FormsList";
import { openNotification } from "../../Helpers";

const Home = ({ createForm }) => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const [create_form] = Form.useForm();
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdte] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const { firebase } = useContext(FirebaseContext);
  const [buttonLoading, setButtonLoading] = useState(false);

  function showConfirm(data, status) {
    confirm({
      title: "Changes not saved. Do you want to continue?",
      icon: <ExclamationCircleOutlined />,
      content: "",
      onOk() {
        setShowCreate(false);
        setShowUpdte(status);
        create_form.setFieldsValue({
          name: data.name,
        });
        setUpdateId(data.id);
        dispatch(BulkAdd(data.data));
      },
      onCancel() {
        return;
      },
    });
  }

  const handleUpdate = (data, boolean) => {
    if (showCreate) {
      showConfirm(data, boolean);
    } else {
      setShowUpdte(true);
      setShowCreate(false);
      setUpdateId(data.id);
      create_form.setFieldsValue({
        name: data.name,
      });
      dispatch(BulkAdd(data.data));
    }
  };
  const onFinish = async (values) => {
    if (createForm.length === 0) {
      openNotification(
        "Select One Input Field",
        "Form will not generate with empty fields. Please select any one field"
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
      setButtonLoading(true);
      let docId = null;
      if (showUpdate) {
        await firebase.db
          .collection("/forms")
          .where("id", "==", updateId)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              docId = doc.id;
            });
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
          });

        await firebase.db.collection("/forms").doc(docId).update({
          data: createForm,
        });

        openNotification("Form updated successfully", "");
        dispatch(BulkDelete());
        setShowCreate(false);
        setShowUpdte(false);
        setButtonLoading(false);
        return;
      }

      await firebase.db.collection("/forms").add(form);
      dispatch(BulkDelete());
      openNotification("Form generated successfully", "");
      setShowCreate(false);
      setButtonLoading(false);
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

          <FormsList handleUpdate={handleUpdate} />
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
                setShowUpdte(false);
                create_form.setFieldsValue({
                  name: "",
                });
                dispatch(BulkDelete());
              }}
              type="dashed"
              className="home__new-button"
              block
            >
              <PlusOutlined className="home__plus-icon" /> Create New Form
            </Button>
          )}
          {(showCreate || showUpdate) && (
            <>
              <Form
                name="create_form"
                className="create-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
                size="large"
                form={create_form}
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input the form name!",
                    },
                  ]}
                  label="Form Name"
                >
                  <Input placeholder="form name" disabled={showUpdate} />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    block
                    loading={buttonLoading}
                  >
                    {showUpdate ? " Update Form" : " Create Form"}
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={() => {
                      dispatch(BulkDelete());
                      setShowUpdte(false);
                      setShowCreate(false);
                    }}
                    block
                    className="login-form-button"
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
              {!showUpdate && <Toolbar />}
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
