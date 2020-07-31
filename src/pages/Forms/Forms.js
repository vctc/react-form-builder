import React from "react";
import { Row, Col, Divider } from "antd";
import Preview from "../../components/Preview/Preview";
import FormsList from "../../components/FormsList/FormsList";
import { useSelector } from "react-redux";
const Forms = () => {
  const formData = useSelector((state) => state.formData);
  return (
    <div className="home">
      <Row gutter={16}>
        <Col className="gutter-row home-col" span={6}>
          <Divider
            orientation="center"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Forms
          </Divider>

          <FormsList />
        </Col>
        <Col className="gutter-row home-col" span={18}>
          <Divider
            orientation="center"
            style={{ color: "#333", fontWeight: "normal" }}
          >
            Data Entry
          </Divider>
          {formData?.data?.length > 0 && (
            <Preview
              data={formData.data || []}
              editMode={false}
              name={formData.name}
              id={formData.id}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Forms;
