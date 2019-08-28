
import * as React from 'react';
import { Route, Switch } from 'react-router';
import HomeContainer from '../containers/Home';
import SearchContainer from '../containers/Search';
import {pagePath, homePagePath} from '../constants/config';
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
                        <Route exact path={homePagePath} component={withRouter(travelWrapper(HomeContainer))} />
                    </Switch>)

export default AppRoutes;