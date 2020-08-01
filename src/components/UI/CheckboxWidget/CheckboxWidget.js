import React, { useState, useEffect } from "react";

import {
  Checkbox,
  Form,
  Tooltip,
  Button,
  Drawer,
  Input,
  Divider,
  Space,
  Badge,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  DeleteElement,
  UpdateElement,
} from "../../../actions/createFormAction";

const SELECT_STYLE = {
  width: "100%",
};

const CheckboxWidget = ({
  id,
  label,
  onChange,
  required,
  value,
  name,
  element,
  options,
  editMode,
}) => {
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch();

  const [localOptions, setLocalOptions] = useState([]);

  useEffect(() => {
    setLocalOptions(options);
  }, [options]);

  const handleDelete = () => {
    dispatch(DeleteElement({ id }));
  };
  const handleEdit = () => {
    setDrawer(true);
  };
  const handleClose = () => {
    setDrawer(false);
  };

  const onFinish = (values) => {
    const options = [];
    for (let i = 0; i < 50; i++) {
      if (values.hasOwnProperty(`options-${i}`)) {
        options.push(values[`options-${i}`]);
      } else {
        break;
      }
    }
    values["id"] = id;
    values["options"] = options;
    dispatch(UpdateElement(values));
    setDrawer(false);
  };

  const onFinishFailed = (error) => {
    console.log("form error", error);
  };

  const renderDrawerContent = () => {
    if (element === "Checkboxes") {
      return (
        <Form
          name="selectForm"
          initialValues={{
            label: label,
            required: false,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Field Name" name="label">
            <Input style={SELECT_STYLE} />
          </Form.Item>

          <Divider
            orientation="left"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Option Fields
          </Divider>

          {localOptions.map((field, index) => (
            <Space
              key={field.key}
              style={{ display: "flex", marginBottom: 8 }}
              align="start"
            >
              <Form.Item
                name={[`options-${index}`, "key"]}
                initialValue={field.key}
              ></Form.Item>
              <Form.Item
                {...field}
                label="option"
                name={[`options-${index}`, "label"]}
                fieldKey={[field.fieldKey, "label"]}
                rules={[{ required: true, message: "Missing option label" }]}
                initialValue={field.label}
              >
                <Input placeholder="Option label" />
              </Form.Item>
              <Form.Item
                {...field}
                label="value"
                name={[`options-${index}`, "value"]}
                fieldKey={[field.fieldKey, "value"]}
                rules={[{ required: true, message: "Missing option value" }]}
                initialValue={field.value}
              >
                <Input placeholder="Option value" />
              </Form.Item>
            </Space>
          ))}

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
          {label}&nbsp; &nbsp;&nbsp;{required && <Badge count={"required"} />}
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
        <Checkbox.Group
          disabled={editMode}
          options={options}
          onChange={onChange}
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

export default CheckboxWidget;
