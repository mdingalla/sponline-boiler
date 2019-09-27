
import * as React from 'react';
import { Route, Switch } from 'react-router';
import Dashboard from '../containers/Dashboard';
import Contract from '../containers/Contract';
import SearchContainer from '../containers/Search';
import PlaygroundContainer from '../containers/Playground';
import ContentTypesContainer from '../containers/ContentTypes';
import {pagePath, uploadPagePath,searchPagePath} from '../constants/config';
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
                        <Route exact path={`${uploadPagePath}`} component={withRouter(travelWrapper(Contract))} />
                        <Route exact path={`${pagePath}/contenttypes`} component={withRouter(travelWrapper(ContentTypesContainer))} />
                        <Route exact path={`${searchPagePath}`} component={withRouter(travelWrapper(SearchContainer))} />
                        <Route exact path={`${pagePath}/edit/:id`} component={withRouter(travelWrapper(Contract))} />
                        <Route exact path={`${pagePath}/test`} component={withRouter(travelWrapper(PlaygroundContainer))} />
                        
                     
                    </Switch>)

export default AppRoutes;