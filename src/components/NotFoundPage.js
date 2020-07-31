import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Result
      style={{ height: "calc(100vh - 134px)" }}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
}

export default NotFoundPage;
