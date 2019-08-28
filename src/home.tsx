require("./polyfill");
import * as React from "react";
import * as ReactDOM from "react-dom";

// import { SPFetchClient } from "@pnp/nodejs";

import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { configureStore } from "./store";
import HomeContainer from "./containers/Layout";
import AppRoutes from "./routes/home";
// import {ConnectedRouter } from 'react-router-redux';
import { ConnectedRouter } from "connected-react-router";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import HomeLayout from "./containers/Layout/home";




const history = createBrowserHistory();
const store = configureStore();

initializeIcons();




setTimeout(() => {
  ReactDOM.render(
    <Provider store={store}>
      <HomeLayout history={history} {...this.props}>
        <ConnectedRouter history={history}>
          <AppRoutes />
        </ConnectedRouter>
      </HomeLayout>
    </Provider>,
    document.getElementById("homeroot")
  );


  ReactDOM.render(
    <div>
      <h4 className="page-header">Legal Repository</h4>
    </div>
  ,document.getElementById('pageTitle'))
}, 500);
