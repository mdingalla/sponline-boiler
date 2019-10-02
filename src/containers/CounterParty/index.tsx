import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { RootState } from "../../reducers";

import * as ContractActions from "../../actions/contract";
import ContractForm from "../../components/ContractForm";
import { AppConfig, ContractFormView, AppProfile } from "../../../types/models";
import CounterpartyPage from "../../components/CounterParty";

export namespace CounterPartyContainer {
  export interface Props extends RouteComponentProps<void> {
    appconfig: AppConfig;
    contract: ContractFormView;
    // dashboardactions: typeof DashboardActions;
    contractactions: typeof ContractActions;
    // dashboard: DashboardModel;
    profile: AppProfile;
    // locale: LocalizedData;
  }

  export interface State {
    
  }
}

// @connect(mapStateToProps, mapDispatchToProps)
class CounterPartyContainer extends React.Component<CounterPartyContainer.Props, CounterPartyContainer.State> {
  componentDidMount() {
    let titlerow = document.getElementById("titlerow");
    if (titlerow) titlerow.style.display = "none";

    let sideNavBox = document.getElementById("sideNavBox");
    if (sideNavBox) sideNavBox.style.display = "block";

    
  }

  componentWillUnmount() {
    let titlerow = document.getElementById("titlerow");
    if (titlerow) titlerow.style.display = "block";
    // let sideNavBox = document.getElementById('sideNavBox');
    // if(sideNavBox) sideNavBox.style.display = "block";
  }

  componentWillReceiveProps(nextProps: CounterPartyContainer.Props) {
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
       
        <CounterpartyPage {...this.props}/>
        {children}
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    // dashboard: state.dashboard,
    profile: state.profile,
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
)(CounterPartyContainer);
