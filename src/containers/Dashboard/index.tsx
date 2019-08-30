import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { RootState } from "../../reducers";

import "!style-loader!css-loader!./override.css";
// import {
//   DashboardModel,
//   AppProfile,
//   LocalizedData,
//   AppConfig
// } from "../../../types/models";
// import * as DashboardActions from "../../actions/dashboard";
import * as ContractActions from "../../actions/contract";
import DashboardPage from "../../components/Dashboard";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import ContractForm from "../../components/ContractForm";
import { AppConfig, ContractFormView } from "../../../types/models";

export namespace Dashboard {
  export interface Props extends RouteComponentProps<void> {
    appconfig: AppConfig;
    contract: ContractFormView;
    // dashboardactions: typeof DashboardActions;
    contractactions: typeof ContractActions;
    // dashboard: DashboardModel;
    // profile: AppProfile;
    // locale: LocalizedData;
  }

  export interface State {
    /* empty */
  }
}

// @connect(mapStateToProps, mapDispatchToProps)
class Dashboard extends React.Component<Dashboard.Props, Dashboard.State> {
  componentDidMount() {
    let titlerow = document.getElementById("titlerow");
    if (titlerow) titlerow.style.display = "none";

    let sideNavBox = document.getElementById("sideNavBox");
    if (sideNavBox) sideNavBox.style.display = "block";

    // if (this.props.profile.User && this.props.profile.User.Title) {
    //   //this.props.dashboardactions.GetDashboard();
    // }
  }

  componentWillUnmount() {
    let titlerow = document.getElementById("titlerow");
    if (titlerow) titlerow.style.display = "block";
    // let sideNavBox = document.getElementById('sideNavBox');
    // if(sideNavBox) sideNavBox.style.display = "block";
  }

  componentWillReceiveProps(nextProps: Dashboard.Props) {
    // if (
    //   nextProps.profile.User &&
    //   nextProps.profile.User.Title &&
    //   nextProps.profile.User != this.props.profile.User
    // ) {
    //   // this.props.dashboardactions.GetDashboard();
    // }
  }

  render() {
    const { children } = this.props;
    return (
      <div className="row-fluid">
       
        {/* <DashboardPage {...this.props} /> */}
        <ContractForm {...this.props} />
        {children}
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    // dashboard: state.dashboard,
    // profile: state.profile,
    // locale: state.locale,
    appconfig: state.appconfig,
    contract:state.contract
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contractactions: bindActionCreators(ContractActions as any, dispatch),
    // ptcactions: bindActionCreators(PTCActions as any, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
