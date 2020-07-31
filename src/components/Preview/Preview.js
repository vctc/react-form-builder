import React from "react";
import UIWidgets from "../UI";
import { Form } from "antd";

class Preview extends React.Component {
  constructor(props) {
    super(props);

    this.editForm = React.createRef();
    this.state = {
      data: [],
      answer_data: {},
    };
  }

  componentDidMount() {
    const { data, url, saveUrl } = this.props;
    // store.dispatch("load", { loadUrl: url, saveUrl, data: data || [] });
    document.addEventListener("mousedown", this.editModeOff);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.editModeOff);
  }

  getElement(item, index) {
    const SortableFormElement = UIWidgets[item.element];
    return <SortableFormElement id={item.id} key={item.id} data={item} />;
  }

  render() {
    let classes = this.props.className;
    if (this.props.editMode) {
      classes += " is-editing";
    }

    const items = this.props.data.map((item, index) =>
      this.getElement(item, index)
    );
    console.log("items", items);
    return (
      <div className={classes}>
        <Form layout={"vertical"}>{items}</Form>
      </div>
    );
  }
}

export default Preview;
