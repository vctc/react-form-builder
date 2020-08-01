import React, { useState } from "react";
import { Input, Form, Tooltip, Button, Drawer, Checkbox, Badge } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  DeleteElement,
  UpdateElement,
} from "../../../actions/createFormAction";

const INPUT_STYLE = {
  width: "100%",
};

const TextWidget = ({
  id,
  label,
  type,
  placeholder,
  name,
  required,
  element,
  editMode,
}) => {
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setDrawer(true);
  };

  const handleDelete = () => {
    dispatch(DeleteElement({ id }));
  };
  const handleClose = () => {
    setDrawer(false);
  };
  const onFinish = (values) => {
    values["id"] = id;
    dispatch(UpdateElement(values));
    setDrawer(false);
  };

  const onFinishFailed = (error) => {
    console.log("form error", error);
  };

  const renderDrawerContent = () => {
    if (element === "TextInput" || element === "EmailInput") {
      return (
        <Form
          name="basic"
          initialValues={{
            label: label,
            placeholder: placeholder,
            required: false,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Field Name" name="label">
            <Input style={INPUT_STYLE} />
          </Form.Item>
          <Form.Item label="Placeholder" name="placeholder">
            <Input style={INPUT_STYLE} />
          </Form.Item>
          <Form.Item name="required" valuePropName="checked">
            <Checkbox>Required </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      );
    }
  };

  const renderControls = () => {
    return (
      <div className="widget_form_controls">
        <span>
          {label} &nbsp; &nbsp;&nbsp;
          {required && <Badge count={"required"} />}
        </span>
        {editMode && (
          <div>
            <Tooltip title="edit">
              <Button
                onClick={handleEdit}
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
              />
            </Tooltip>
            <Tooltip title="delete">
              <Button
                onClick={handleDelete}
                shape="circle"
                style={{ margin: "0px 10px" }}
                icon={<DeleteOutlined />}
                type="primary"
                danger
              />
            </Tooltip>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Form.Item
        className="widget_form_item"
        label={renderControls()}
        name={label}
        initialValue=""
        rules={[{ required, message: `Missing ${label}` }]}
      >
        <Input
          id={id}
          placeholder={placeholder}
          style={INPUT_STYLE}
          type={type}
          disabled={editMode}
        />
      </Form.Item>
      <Drawer
        title="Update values"
        width={720}
        onClose={handleClose}
        visible={drawer}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {renderDrawerContent()}
      </Drawer>
    </>
  );
};

export default TextWidget;
