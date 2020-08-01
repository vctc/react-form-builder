import React, { useContext, useState, useEffect } from "react";
import { List, Card, Divider } from "antd";
import { FirebaseContext } from "../../Firebase";
import { useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

import { AddEntries } from "../../actions/entriesAction";
import { formatDistanceToNow } from "date-fns";
import uuid from "react-uuid";

function EntriesList({ location }) {
  const { firebase } = useContext(FirebaseContext);
  const [entries, setEntries] = useState([]);
  const [selected, setSelected] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    getForms();
  }, []);

  const getForms = async () => {
    firebase.db
      .collection("entries")
      .orderBy("createdAt", "desc")
      .onSnapshot(handleSnapshot);
  };

  const handleFormClick = (data) => {
    setSelected(data.id);
    dispatch(AddEntries(data));
  };

  const handleSnapshot = (snapshot) => {
    const entriesFb = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setEntries(entriesFb);
  };
  return (
    <List>
      {entries.map((form) => (
        <List.Item
          key={uuid()}
          onClick={() => handleFormClick(form)}
          className={`home__forms-list ${
            form.id === selected ? "selected" : ""
          }`}
        >
          <Card size="default">
            <span> {form.name}</span> <Divider />
            <span className="dateFromNow">
              {formatDistanceToNow(new Date(form.createdAt))} ago
            </span>
          </Card>
        </List.Item>
      ))}
    </List>
  );
}

export default withRouter(EntriesList);
