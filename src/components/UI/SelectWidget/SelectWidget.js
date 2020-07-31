/* eslint-disable no-else-return */
import React, { useState, useEffect } from "react";

import {
  Select,
  Form,
  Tooltip,
  Button,
  Drawer,
  Input,
  Checkbox,
  Space,
  Divider,
  Badge,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  UpdateElement,
  DeleteElement,
} from "../../../actions/createFormAction";
import uuid from "react-uuid";

const SELECT_STYLE = {
  width: "100%",
};

const SelectWidget = ({
  autofocus,
  disabled,
  formContext,
  id,
  // label,
  multiple,
  onBlur,
  onChange,
  onFocus,
  options,
  placeholder,
  required,
  readonly,
  name,
  // required,
  schema,
  value,
  label,
  element,
}) => {
  const [drawer, setDrawer] = useState(false);
  const [selectForm] = Form.useForm();
  console.log("selectform useform value", selectForm);
  const dispatch = useDispatch();
  const [localOptions, setLocalOptions] = useState([]);

  useEffect(() => {
    setLocalOptions(options);
  }, [options]);

  const getPopupContainer = (node) => node.parentNode;

  console.log(placeholder);

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

  const addLocalOption = () => {
    setLocalOptions([
      ...localOptions,
      { option: "", value: "", key: `dropdown_option_${uuid()}` },
    ]);
  };

  const removeLocalOption = (key) => {
    console.log("to remove key", key);
    console.log("local", localOptions);
    const removed = localOptions.filter((option) => option.key !== key);
    console.log("removed", removed);
    setLocalOptions(removed);
  };

  const onFinishFailed = (error) => {
    console.log("form error", error);
  };

  const onValuesChange = (changedValues, allValues) => {
    console.log("detect change", changedValues, allValues);
  };

  const renderDrawerContent = () => {
    if (element === "Dropdown") {
      return (
        <Form
          name="selectForm"
          initialValues={{
            label: label,
            placeholder: placeholder,
            required: false,
          }}
          onValuesChange={onValuesChange}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Field Name" name="label">
            <Input style={SELECT_STYLE} />
          </Form.Item>
          <Form.Item label="Placeholder" name="placeholder">
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
              {console.log("field", field)}
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
          {label} {required && <Badge count={"required"} />}
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
        <Select
          autoFocus={autofocus}
          disabled={disabled}
          getPopupContainer={getPopupContainer}
          id={id}
          name={name}
          placeholder={placeholder}
          style={SELECT_STYLE}
        >
          {options.map(({ value: optionValue, label: optionLabel }) => (
            <Select.Option
              key={String(optionValue)}
              value={String(optionValue)}
            >
              {optionLabel}
            </Select.Option>
          ))}
        </Select>
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

SelectWidget.defaultProps = {
  formContext: {},
};

export default SelectWidget;
