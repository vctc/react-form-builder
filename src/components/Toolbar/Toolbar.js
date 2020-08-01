import React from "react";
import { List } from "antd";
import uuid from "react-uuid";
import ToolbarItem from "./ToolbarItem";
import { AddElement } from "../../actions/createFormAction";
import { useDispatch } from "react-redux";

const defaultItemOptions = (element) => {
  switch (element) {
    case "Dropdown":
      return [
        {
          value: "Value 1",
          label: "Option 1",
          key: `dropdown_option_${uuid()}`,
        },
        {
          value: "Value 2",
          label: "Option 2",
          key: `dropdown_option_${uuid()}`,
        },
        {
          value: "Value 3",
          label: "Option 3",
          key: `dropdown_option_${uuid()}`,
        },
      ];
    case "Checkboxes":
      return [
        {
          value: "value 1",
          label: "label 1",
          key: `checkboxes_option_${uuid()}`,
        },
        {
          value: "Value 2",
          label: "Label 2",
          key: `checkboxes_option_${uuid()}`,
        },
        {
          value: "Value 3",
          label: "Label 3",
          key: `checkboxes_option_${uuid()}`,
        },
      ];

    default:
      return [];
  }
};
const Toolbar = () => {
  const dispatch = useDispatch();
  const defaultItems = [
    {
      key: "Dropdown",
      canHaveAnswer: true,
      icon: "fa fa-caret-square-o-down",
      field_name: "dropdown_",
      label: "Dropdown",
      options: [],
      placeholder: "select options",
    },

    {
      key: "Checkboxes",
      canHaveAnswer: true,
      icon: "fa fa-check-square-o",
      label: "Checkbox",
      field_name: "checkboxes_",
      options: [],
    },
    {
      key: "TextInput",
      required: false,
      label: "Text Input",
      type: "text",
      placeholder: "text",
      icon: "fa fa-font",
      field_name: "text_input_",
    },
    {
      key: "EmailInput",
      required: false,
      type: "email",
      label: "Email Input",
      placeholder: " email",
      icon: "fa fa-plus",
      field_name: "email_input_",
    },
  ];

  const handleOnClick = (item) => {
    var elementOptions = {
      id: uuid(),
      element: item.key,
      required: false,
    };

    if (item.field_name)
      elementOptions["field_name"] = item.field_name + uuid();

    if (item.label) elementOptions["label"] = item.label;
    if (item.type) elementOptions["type"] = item.type;
    if (item.placeholder) elementOptions["placeholder"] = item.placeholder;

    if (item.options) {
      elementOptions["options"] = defaultItemOptions(elementOptions["element"]);
    }
    dispatch(AddElement(elementOptions));
  };
  return (
    <div className="toolbar">
      <List>
        {defaultItems &&
          defaultItems.map((item) => (
            <ToolbarItem
              key={uuid()}
              data={item}
              handleOnClick={handleOnClick}
            />
          ))}
      </List>
    </div>
  );
};

export default Toolbar;
