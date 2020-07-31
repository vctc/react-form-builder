// eslint-disable-next-line max-classes-per-file
import React from "react";
import TextWidget from "./TextWidget/TextWidget";
import CheckboxWidget from "./CheckboxWidget/CheckboxWidget";
import SelectWidget from "./SelectWidget/SelectWidget";

const UIWidgets = {};

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
  }

  render() {
    console.log("props", this.props);
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

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    if (this.props.read_only) {
      props.disabled = "disabled";
    }

    return <TextWidget {...props} />;
  }
}

class Dropdown extends React.Component {
  getDefaultValue(value, dataOptions) {
    let defaultValue = super.getDefaultValue(value, dataOptions);
    return defaultValue.length > 0 ? defaultValue[0] : null;
  }

  render() {
    const props = {};
    props.id = this.props.data.id;
    props.name = this.props.data.field_name;
    props.onChange = this.handleChange;
    props.options = this.props.data.options;
    props.element = this.props.data.element;
    props.label = this.props.data.label;
    props.placeholder = this.props.data.placeholder;
    props.required = this.props.data.required;
    return <SelectWidget {...props} />;
  }
}

class Checkboxes extends React.Component {
  handleChange = (e) => {
    const option = this.props.data.options.find(
      (option) => option.value === e.target.value
    );

    if (option) {
      this.setState(
        {
          [option.key]: e.target.checked,
        },
        () => {
          this.props.onChange(e);
        }
      );
    }
  };

  stateObject = () => {
    const state = {};

    this.props.data.options.forEach((option) => {
      const defaultChecked =
        this.props.defaultValue !== undefined &&
        this.props.defaultValue.indexOf(option.key) > -1;
      const checked = this.props.defaultValue
        ? this.props.defaultValue.some(
            (defaultOption) => defaultOption.value === option.value
          )
        : false;

      state[`${option.key}`] = defaultChecked || checked;
    });

    return state;
  };

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

    return <CheckboxWidget {...props} />;
  }
}

UIWidgets.TextInput = TextInput;
UIWidgets.EmailInput = TextInput;
UIWidgets.Checkboxes = Checkboxes;
UIWidgets.Dropdown = Dropdown;
export default UIWidgets;
