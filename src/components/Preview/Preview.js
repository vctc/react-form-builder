import React from "react";
import UIWidgets from "../UI";
import { Form, Button, PageHeader, Divider } from "antd";
import uuid from "react-uuid";
import { FirebaseContext } from "../../Firebase";
import { connect } from "react-redux";
import { BulkDeleteEntry } from "../../actions/formDataAction";
import { openNotification } from "../../Helpers";

class Preview extends React.Component {
  constructor(props) {
    super(props);

    this.editForm = React.createRef();
    this.state = {
      data: [],
      answer_data: {},
    };
  }

  static contextType = FirebaseContext;

  getElement(item, editMode) {
    const SortableFormElement = UIWidgets[item.element];
    return (
      <SortableFormElement
        id={item.id}
        key={item.id}
        data={item}
        editMode={editMode}
      />
    );
  }

  handleFinish = async (values) => {
    const entry = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      name: this.props.name,
      data: values,
    };
    try {
      await this.context.firebase.db.collection("/entries").add(entry);
      this.props.bulkDeleteForm();
      openNotification("Form data submitted successfully", "");
    } catch (err) {
      console.log("error", err);
    }
  };

  render() {
    let classes;
    if (this.props.editMode) {
      classes = "is-editing";
    } else {
      classes = "is-entry";
    }

    const items = this.props.data.map((item, index) =>
      this.getElement(item, this.props.editMode)
    );
    return (
      <div className={classes}>
        <Form layout="vertical" size="large" onFinish={this.handleFinish}>
          {!this.props.editMode && (
            <>
              {" "}
              <PageHeader
                style={{ padding: "0" }}
                className="form-page-header"
                title="Form name"
                subTitle={this.props.name}
              />
              <PageHeader
                style={{ padding: "0" }}
                className="form-page-header"
                title="Unique Id"
                subTitle={this.props.id}
              />
              <Divider />
            </>
          )}
          {items}
          {!this.props.editMode && (
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                Submit
              </Button>
            </Form.Item>
          )}
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    bulkDeleteForm: () => {
      return dispatch(BulkDeleteEntry());
    },
  };
};

export default connect(null, mapDispatchToProps)(Preview);
