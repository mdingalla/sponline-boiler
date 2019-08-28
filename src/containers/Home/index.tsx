import * as React from "react";
import { bindActionCreators, Store } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { RootState } from "../../reducers";



import DashboardPage from "../../components/Dashboard";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import ContractForm from "../../components/ContractForm";
import { AppConfig, ContractFormView } from "../../../types/models";
import HomePage from "../../components/Home";

export namespace HomeContainer {
  export interface Props extends RouteComponentProps<void> {
    appconfig: AppConfig;
    // dashboardactions: typeof DashboardActions;
    // ptcactions: typeof PTCActions;
    // dashboard: DashboardModel;
    // profile: AppProfile;
    // locale: LocalizedData;
  }

  export interface State {
    /* empty */
  }
}

// @connect(mapStateToProps, mapDispatchToProps)
class HomeContainer extends React.Component<HomeContainer.Props, HomeContainer.State> {
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

  componentWillReceiveProps(nextProps: HomeContainer.Props) {
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
        <HomePage {...this.props}/>
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
    // dashboardactions: bindActionCreators(DashboardActions as any, dispatch),
    // ptcactions: bindActionCreators(PTCActions as any, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
