import React from "react";
import "./App.scss";
import { Layout } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Forms from "./pages/Forms/Forms";
import Records from "./pages/Records/Records";
import Navbar from "./components/Navbar/Navbar";
import { Provider } from "react-redux";
import configureStore from "./store";
import firebase, { FirebaseContext } from "./Firebase";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  const { Content, Footer } = Layout;
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <Provider store={configureStore()}>
        <div className="app">
          <Router>
            <Layout>
              <Navbar />
              <Content className="app__content">
                <Switch>
                  <Route path="/" exact component={Home}></Route>
                  <Route path="/forms" exact component={Forms}></Route>
                  <Route path="/records" exact component={Records}></Route>
                  <Route component={NotFoundPage} />
                </Switch>
              </Content>
              <Footer className="app__footer">
                Made with{" "}
                <span role="img" aria-label="heart">
                  ❤️
                </span>{" "}
                by Victor
              </Footer>
            </Layout>
          </Router>
        </div>
      </Provider>
    </FirebaseContext.Provider>
  );
}

export default App;
