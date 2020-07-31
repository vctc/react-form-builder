import React, { useContext, useState, useEffect } from "react";
import { List, Card } from "antd";
import { FirebaseContext } from "../../Firebase";
import { useDispatch } from "react-redux";
import { BulkAdd } from "../../actions/createFormAction";
import { withRouter } from "react-router-dom";
import { BulkAddEntry } from "../../actions/formDataAction";
import uuid from "react-uuid";

function FormsList({ location }) {
  const { firebase } = useContext(FirebaseContext);
  const [forms, setForms] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    getForms();
  }, []);

  const getForms = async () => {
    firebase.db
      .collection("forms")
      .orderBy("createdAt", "desc")
      .onSnapshot(handleSnapshot);
  };

  const handleFormClick = (data) => {
    if (location.pathname === "/forms") {
      dispatch(BulkAddEntry(data));
    } else {
      dispatch(BulkAdd(data.data));
    }
  };

  const handleSnapshot = (snapshot) => {
    const formsFb = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setForms(formsFb);
  };
  return (
    <List>
      {forms.map((form) => (
        <List.Item
          key={uuid()}
          onClick={() => handleFormClick(form)}
          className="home__forms-list"
        >
          <Card size="default">{form.name}</Card>
        </List.Item>
      ))}
    </List>
  );
}

export default withRouter(FormsList);
