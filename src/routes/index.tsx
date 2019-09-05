
import * as React from 'react';
import { Route, Switch } from 'react-router';
import Dashboard from '../containers/Dashboard';
import SearchContainer from '../containers/Search';
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
                        <Route exact path={pagePath} component={withRouter(travelWrapper(Dashboard))} />
                        <Route exact path={`${pagePath}/search`} component={withRouter(travelWrapper(SearchContainer))} />
                        <Route exact path={`${pagePath}/edit/:id`} component={withRouter(travelWrapper(Dashboard))} />
                        
                     
                    </Switch>)

export default AppRoutes;