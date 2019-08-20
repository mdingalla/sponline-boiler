
import * as React from 'react';
import { Route, Switch } from 'react-router';
// import Dashboard from '../containers/Dashboard';
import {pagePath} from '../constants/config';
import { withRouter } from 'react-router';
import travelWrapper from '../components/TravelHOC';
// import PettyCashContainer from '../containers/PettyCash/';
// import PettyCashApprovalContainer from '../containers/PTCApproval/';
// import NoAccessContainer from '../containers/NoAccess';
// import PrintPreview from '../containers/PrintPreview';
// import App from '../containers/App';

{/* <div className="container-fluid"> */}
const AppRoutes = ()=>  (
                    <Switch>
                        {/* <Route exact path={pagePath} component={withRouter(travelWrapper(Dashboard))} /> */}
                        {/* <Route  path={`${pagePath}/new`} component={withRouter(travelWrapper(PettyCashContainer))} />
                        <Route  path={`${pagePath}/unauthorized`} component={withRouter(travelWrapper(NoAccessContainer))} />
                        <Route  path={`${pagePath}/edit/:id`} component={withRouter(travelWrapper(PettyCashContainer))} />
                        <Route  path={`${pagePath}/approval/:id`} component={withRouter(travelWrapper(PettyCashApprovalContainer))} />
                        <Route  path={`${pagePath}/print/:id`} component={withRouter(travelWrapper(PrintPreview))} />
                       <Route  path={`${pagePath}/test`} component={withRouter(travelWrapper(App))} /> */}
                    </Switch>)

export default AppRoutes;