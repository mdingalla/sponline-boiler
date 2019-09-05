import * as React from "react";

// import * as DashboardActions from "../../actions/dashboard";
import { RouteComponentProps } from "../../../node_modules/@types/react-router";
import ContractContentTypesDropdown from "../ContractContentTypeDropdown";
import { EmptyReactSelectValue, DayPickerStrings } from "../../constants/config";
import { ReactSelectValue, CounterParty } from "../../../types/models";
// import { IPersonaProps } from "office-ui-fabric-react/lib-es2015/Persona";
import EntityDropdown from "../EntityDropdown";
// import { DatePicker } from "office-ui-fabric-react/lib-es2015/DatePicker";
import ContractCategoryDropdown from "../ContractCategory";
import DepartmentTermStoreDropdown from "../DepartmentTermStoreDropdown";
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
import SPClientPeoplePicker from "../SPPeoplePicker/";
import { IPersonaProps, DatePicker } from "office-ui-fabric-react";
import SearchForm from "../SearchForm";

export namespace SearchPage {
  export interface Props extends RouteComponentProps<void> {
    // appconfig: AppConfig;
    // dashboardactions: typeof DashboardActions;
    // dashboard: DashboardModel;
    // profile: AppProfile;
    // locale: LocalizedData;
  }
  export interface State {
    
  }
}

class SearchPage extends React.Component<
SearchPage.Props,
SearchPage.State
> {
  constructor(props) {
    super(props);

    this.state = {
        classification:EmptyReactSelectValue,
        category:EmptyReactSelectValue,
        contentTypes:EmptyReactSelectValue,
        department:"",
        owner:[],
        counterparties:[{}],
        entity:EmptyReactSelectValue,
        showModal:false,
        selectedCounterPartyId:null
    }
  }

  
  render() {

    return (
        <div className="form form-horizontal">
            <h4 className="pageTitle">Advance Search</h4>
           <SearchForm />
        </div>
    );
  }
}

export default SearchPage;
