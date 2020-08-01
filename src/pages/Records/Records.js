import React from "react";
import { Row, Col, Divider } from "antd";
import EntriesList from "../../components/EntriesList/EntriesList";
import DataPreview from "../../components/DataPreview/DataPreview";

const Records = () => {
  return (
    <div className="records">
      <div className="home">
        <Row gutter={16}>
          <Col className="gutter-row home-col" span={6}>
            <Divider
              orientation="center"
              style={{ color: "#333", fontWeight: "normal" }}
            >
              Entries
            </Divider>
            <EntriesList />
          </Col>
          <Col className="gutter-row home-col" span={18}>
            <Divider
              orientation="center"
              style={{ color: "#333", fontWeight: "normal" }}
            >
              Values
            </Divider>

            <DataPreview />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Records;
