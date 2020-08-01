// eslint-disable-next-line max-classes-per-file
import React from "react";
import TextWidget from "./TextWidget/TextWidget";
import CheckboxWidget from "./CheckboxWidget/CheckboxWidget";
import SelectWidget from "./SelectWidget/SelectWidget";

const UIWidgets = {};

class TextInput extends React.Component {
  render() {
    const props = {};
    props.type = this.props.data.type;
    props.className = "form-control";
    props.id = this.props.data.id;
    props.name = this.props.data.field_name;
    props.onChange = this.props.onChange;
    props.label = this.props.data.label;
    props.onBlur = this.props.onBlur;
    props.placeholder = this.props.data.placeholder;
    props.element = this.props.data.element;
    props.required = this.props.data.required;
    props.editMode = this.props.editMode;

    return <TextWidget {...props} />;
  }
}

class Dropdown extends React.Component {
  render() {
    console.log("this.props", this.props.data);
    const props = {};
    props.id = this.props.data.id;
    props.name = this.props.data.field_name;
    props.onChange = this.handleChange;
    props.options = this.props.data.options;
    props.element = this.props.data.element;
    props.label = this.props.data.label;
    props.placeholder = this.props.data.placeholder;
    props.required = this.props.data.required;
    props.editMode = this.props.editMode;
    return <SelectWidget {...props} />;
  }
}

class Checkboxes extends React.Component {
  render() {
    const props = {};

    props.className = "form-control";
    props.id = this.props.data.id;
    props.name = this.props.data.field_name;
    props.onChange = this.props.onChange;
    props.label = this.props.data.label;
    props.onBlur = this.props.onBlur;
    props.element = this.props.data.element;
    props.required = this.props.data.required;
    props.options = this.props.data.options;
    props.editMode = this.props.editMode;

    return <CheckboxWidget {...props} />;
  }
}

UIWidgets.TextInput = TextInput;
UIWidgets.EmailInput = TextInput;
UIWidgets.Checkboxes = Checkboxes;
UIWidgets.Dropdown = Dropdown;
export default UIWidgets;
