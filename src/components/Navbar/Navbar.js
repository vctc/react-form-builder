import React from "react";
import { Menu, Layout } from "antd";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../images/logo.webp";

const Navbar = ({ location }) => {
  const { Header } = Layout;
  const getActiveKeys = () => {
    switch (location.pathname) {
      case "/":
        return ["home"];

      case "/forms":
        return ["forms"];

      case "/records":
        return ["records"];

      default:
        return [""];
    }
  };
  return (
    <Header className="app__header">
      <>
        <div className="app__header-logo">
          <img src={Logo} alt="logo" />
        </div>
        <Menu
          className="app__header__menu"
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={getActiveKeys()}
        >
          <Menu.Item key="home">
            <Link to="/"> Home</Link>
          </Menu.Item>
          <Menu.Item key="forms">
            <Link to="/forms"> Forms</Link>
          </Menu.Item>
          <Menu.Item key="records">
            <Link to="/records"> Records</Link>
          </Menu.Item>
        </Menu>
      </>
    </Header>
  );
};
export default withRouter(Navbar);
