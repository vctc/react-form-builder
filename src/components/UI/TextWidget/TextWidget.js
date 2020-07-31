import React, { useState } from "react";
import {
  Input,
  Form,
  Tooltip,
  Button,
  Drawer,
  Checkbox,
  Badge,
  Table,
} from "antd";
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
  // autofocus,
  disabled,
  id,
  label,
  onBlur,
  onChange,
  options,
  type,
  placeholder,
  name,
  required,
  element,
  value,
}) => {
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch();
  const handleTextChange = ({ target }) =>
    onChange(value === "" ? options.emptyValue : target.value);

  const handleBlur = ({ target }) => onBlur(id, target.value);
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
    console.log("form data", values);
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
        <div>
          <Tooltip title="edit">
            <Button
              onClick={handleEdit}
              type="primary"
              success
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
      </div>
    );
  };

  return (
    <>
      <Form.Item className="widget_form_item" label={renderControls()}>
        <Input
          id={id}
          name={name}
          onBlur={handleBlur}
          onChange={handleTextChange}
          placeholder={placeholder}
          style={INPUT_STYLE}
          type={type}
          value={value}
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
