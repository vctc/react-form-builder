import React from "react";
import { List, Typography } from "antd";

function ToolbarItem({ data, handleOnClick }) {
  return (
    <List.Item
      onClick={() => {
        handleOnClick(data);
      }}
      className="toolbar__list"
    >
      <Typography.Text strong>{data.label}</Typography.Text>
    </List.Item>
  );
}

export default ToolbarItem;
