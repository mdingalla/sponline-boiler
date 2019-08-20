import * as React from "react";

// import * as DashboardActions from "../../actions/dashboard";
import { RouteComponentProps } from "../../../node_modules/@types/react-router";
// import {
//   DashboardModel,
//   AppProfile,
//   LocalizedData,
//   AppConfig
// } from "../../../types/models";
// import { CERADMIN } from "../../constants/filters";
// import PendingPTC from "./pendingptc";
// import RequestedPTC from "./requestedptc";
// import LocalizatonApi from "../../sharepointapi/localizationApi";
// import PTCApprovalHistoryDashboardTable from "./ptcapprovalhistory";

export namespace DashboardPage {
  export interface Props extends RouteComponentProps<void> {
    // appconfig: AppConfig;
    // dashboardactions: typeof DashboardActions;
    // dashboard: DashboardModel;
    // profile: AppProfile;
    // locale: LocalizedData;
  }
  export interface State {}
}

class DashboardPage extends React.Component<
  DashboardPage.Props,
  DashboardPage.State
> {
  constructor(props) {
    super(props);

    this.handleCreatePTC = this.handleCreatePTC.bind(this);
  }

  handleCreatePTC() {
    // this.props.history.push(`${pagePath}/new`)
    // this.props.dashboardactions.createPTC(this.props.history);
  }

  render() {

    return (
      <div className="col-xs-8 col-md-10">
        

        <div className="row-fluid">
          <div className="col-xs-12 col-md-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">
                Pending
                </h3>
              </div>
              <div className="panel-body">
                
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-md-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">
                 My Request
                </h3>
              </div>
              <div className="panel-body">

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default DashboardPage;
