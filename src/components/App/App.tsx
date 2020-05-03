import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { HashRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";

import { Layout } from "./Layout";
import { config } from "../../configs";
import "./App.tsx.scss";

const client = new ApolloClient({
  uri: config.serviceUrl,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Layout />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
