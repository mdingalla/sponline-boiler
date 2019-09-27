import * as React from "react";

// import * as DashboardActions from "../../actions/dashboard";
import { RouteComponentProps } from "../../../node_modules/@types/react-router";
import ContractContentTypesDropdown from "../ContractContentTypeDropdown";
import { EmptyReactSelectValue, DayPickerStrings } from "../../constants/config";
import { ReactSelectValue, CounterParty, ListDataAsStreamResult } from "../../../types/models";
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
import SearchResultPanel from "../SearchResult";
import * as ContractActions from "../../actions/contract";


export namespace SearchPage {
  export interface Props extends RouteComponentProps<void> {
    contractactions: typeof ContractActions;
    // appconfig: AppConfig;
    // dashboardactions: typeof DashboardActions;
    // dashboard: DashboardModel;
    // profile: AppProfile;
    // locale: LocalizedData;
  }
  export interface State {
    result:ListDataAsStreamResult;
    data:any[]
  }
}

class SearchPage extends React.Component<
SearchPage.Props,
SearchPage.State
> {
  constructor(props) {
    super(props);

    this.handleDataLoaded = this.handleDataLoaded.bind(this);
    
    this.state = {
        // classification:EmptyReactSelectValue,
        // category:EmptyReactSelectValue,
        // contentTypes:EmptyReactSelectValue,
        // department:"",
        // owner:[],
        // counterparties:[{}],
        // entity:EmptyReactSelectValue,
        // showModal:false,
        // selectedCounterPartyId:null
        data:[],
        result:null
    }
  }

  handleDataLoaded(e:ListDataAsStreamResult){
    this.setState({
      result:e,
      data:e.Row.map((x)=>{
        return {  
          Id:parseInt(x.ID),
          Classification:x.ContractClassification[0].lookupValue,
          ContractCategoryName:x.ContractCategory[0].lookupValue,
          ContractType:x.ContentType,
          EffectiveDate:x.EffectiveDate,
          ExpiryDate:x.ExpiryDate,
          Function:x.FunctionDept,
          IPXEntityName:x.IPXEntity[0].lookupValue
        } as ContractSummaryData
      })
    })
  }

  
  render() {

    const zeroResult = this.state.result ? <div className="col-md-12">
    <div className="alert alert-danger" role="alert"> 
  <strong>0 search results</strong> Change a few things up and try searching again. </div>
  </div> : null;


    const mytable = this.state.data.length > 0 ? <SearchResultPanel data={this.state.data} {...this.props} /> : zeroResult;

    return (
        <div className="form form-horizontal">
            <h4 className="pageTitle">Advance Search</h4>
           <SearchForm OnDataLoad={this.handleDataLoaded} 
           OnDataReset={()=>{
             this.setState({
               data:[],
               result:null
             })
           }} />

           <div className="row">
              {mytable}
           </div>


           <div className="row">
            <div className="pull-right">
            <button type="button"
                            onClick={this.props.contractactions.NavigateHome}
                             className="btn btn-danger">Close</button>
            </div>
           </div>
        </div>
    );
  }
}

export default SearchPage;
