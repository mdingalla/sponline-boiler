require("./polyfill");
import * as React from "react";
import * as ReactDOM from "react-dom";

// import { SPFetchClient } from "@pnp/nodejs";

import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { configureStore } from "./store";
import Layout from "./containers/Layout";
import AppRoutes from "./routes";
// import {ConnectedRouter } from 'react-router-redux';
import { ConnectedRouter } from "connected-react-router";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

import "!style-loader!css-loader!./index.css";
import "!style-loader!css-loader!./sb-admin.css";
import "!style-loader!css-loader!./fabric.scss";


const history = createBrowserHistory();
const store = configureStore();

initializeIcons();




setTimeout(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Layout history={history} {...this.props}>
        <ConnectedRouter history={history}>
          <AppRoutes />
        </ConnectedRouter>
      </Layout>
    </Provider>,
    document.getElementById("root")
  );
}, 500);
