import React from "react";
import "./App.scss";
import { Layout, Menu, Row, Col, Divider } from "antd";
import "antd/dist/antd.css";
import Logo from "./images/logo.webp";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Forms from "./pages/Forms/Forms";
import Records from "./pages/Records/Records";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const { Content, Footer } = Layout;
  return (
    <div className="app">
      <Router>
        <Layout>
          <Navbar />
          <Content className="app__content">
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/forms" exact component={Forms}></Route>
              <Route path="/records" exact component={Records}></Route>
            </Switch>
          </Content>
          <Footer className="app__footer">
            Made with{" "}
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            by TuringTest
          </Footer>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
