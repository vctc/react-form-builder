import React, { useContext, useState, useEffect } from "react";
import { List, Card } from "antd";
import { FirebaseContext } from "../../Firebase";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { BulkAddEntry } from "../../actions/formDataAction";
import uuid from "react-uuid";

function FormsList({ location, handleUpdate }) {
  const { firebase } = useContext(FirebaseContext);
  const [forms, setForms] = useState([]);
  const [selected, setSelected] = useState(null);

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
    setSelected(data.id);
    if (location.pathname === "/forms") {
      dispatch(BulkAddEntry(data));
    } else {
      handleUpdate(data, true);
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
          className={`home__forms-list ${
            form.id === selected ? "selected" : ""
          }`}
        >
          <Card size="default">{form.name}</Card>
        </List.Item>
      ))}
    </List>
  );
}

export default withRouter(FormsList);
