import React from "react";
import { useSelector } from "react-redux";
import { PageHeader, Divider, Card, Tag, Typography } from "antd";
import uuid from "react-uuid";

const DataPreview = () => {
  const data = useSelector((state) => state.entries);

  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const renderObject = (data) => {
    if (data === "") return "-";
    if (typeof data === "object") {
      return data.join(" , ");
    } else return data;
  };

  const renderData = (data, key) => {
    return (
      <div className="result">
        <Typography.Title level={4}>{key}</Typography.Title>
        <Tag color="blue">{renderObject(data[key])}</Tag>
      </div>
    );
  };

  return (
    <div>
      {!isEmptyObject(data) && (
        <>
          {" "}
          <PageHeader
            style={{ padding: "0" }}
            className="form-page-header"
            title="Form name"
            subTitle={data.name}
          />
          <PageHeader
            style={{ padding: "0" }}
            className="form-page-header"
            title="Unique Id"
            subTitle={data.id}
          />
          <Divider />
          {Object.keys(data.data).map((keyName, i) => (
            <Card key={uuid()} bordered={true} style={{ width: "100%" }}>
              {renderData(data.data, keyName)}
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default DataPreview;
