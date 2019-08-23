import * as React from "react";

// import * as DashboardActions from "../../actions/dashboard";
import { RouteComponentProps } from "../../../node_modules/@types/react-router";
import ContractContentTypesDropdown from "../ContractContentTypeDropdown";
import { EmptyReactSelectValue, DayPickerStrings } from "../../constants/config";
import { ReactSelectValue, CounterParty } from "../../../types/models";
import { IPersonaProps } from "office-ui-fabric-react/lib-es2015/Persona";
import EntityDropdown from "../EntityDropdown";
import { DatePicker } from "office-ui-fabric-react/lib-es2015/DatePicker";
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

export namespace SearchPage {
  export interface Props extends RouteComponentProps<void> {
    // appconfig: AppConfig;
    // dashboardactions: typeof DashboardActions;
    // dashboard: DashboardModel;
    // profile: AppProfile;
    // locale: LocalizedData;
  }
  export interface State {
    classification?:ReactSelectValue;
    category?:ReactSelectValue;
    contentTypes?:ReactSelectValue;
    department?:any;
    entity?:ReactSelectValue;
    effectiveDate?:any;
    expiryDate?:any;
    monthDuration?:number;
    yearDuration?:number;
    owner?: IPersonaProps[];
    counterparties?:CounterParty[];
    showModal:boolean;
    selectedCounterPartyId?:number
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
            <div className="col-md-12 well">
                <div className="form-group">
                        <label className="col-md-2 control-label">Contract Types</label>
                        <div className="col-md-4">
                            <ContractContentTypesDropdown 
                            onChange={(e)=>{
                                this.setState({
                                    contentTypes:e || EmptyReactSelectValue
                                })
                            }} 
                            value={this.state.contentTypes}/>
                        </div>

                        <label className="col-md-2 control-label">Contracting Entity</label>
                        <div className="col-md-4">
                         <EntityDropdown onChange={(e)=>{
                             this.setState({
                                 entity:e || EmptyReactSelectValue
                             })
                         }} value={this.state.entity}  />
                        </div>
                </div>

                <div className="form-group">
                        <label className="col-md-2 control-label">Effective Date</label>
                        <div className="col-md-4">
                           <div className="row">
                               <div className='col-md-6'>
                                <DatePicker strings={DayPickerStrings} ref="effectiveDate"
                                    allowTextInput={ true }
                                    onSelectDate={ date => {
                                        this.setState({
                                            effectiveDate:date
                                        })
                                    } }
                                    value={this.state.effectiveDate} placeholder='Select a date...' />
                                
                               </div>
                               <div className="col-md-6">
                               <DatePicker strings={DayPickerStrings} ref="effectiveDate"
                                    allowTextInput={ true }
                                    onSelectDate={ date => {
                                        this.setState({
                                            effectiveDate:date
                                        })
                                    } }
                                    value={this.state.effectiveDate} placeholder='Select a date...' />
                               </div>
                           </div>
                                
                        </div>

                        <label className="col-md-2 control-label">Expiry Date</label>
                        <div className="col-md-4">

                            <div className="row">
                                <div className="col-md-6">
                                    <DatePicker strings={DayPickerStrings} ref="expiryDate"
                                    allowTextInput={ true }
                                    onSelectDate={ date => {
                                        this.setState({
                                            expiryDate:date
                                        })
                                    } }
                                    value={this.state.expiryDate} placeholder='Select a date...' />
                                </div>
                                <div className="col-md-6">
                                    <DatePicker strings={DayPickerStrings} ref="expiryDate"
                                    allowTextInput={ true }
                                    onSelectDate={ date => {
                                        this.setState({
                                            expiryDate:date
                                        })
                                    } }
                                    value={this.state.expiryDate} placeholder='Select a date...' />
                                </div>
                            </div>
                        </div>

                    </div>

                <div className="form-group">
                    <label className="col-md-2 control-label">Category</label>
                    <div className="col-md-4">
                    <ContractCategoryDropdown 
                        onChange={(e)=>{
                            this.setState({
                                category:e || EmptyReactSelectValue
                            })
                        }} value={this.state.category}  />
                    </div>

                    <label className="col-md-2 control-label">Function</label>
                    <div className="col-md-4">
                        <DepartmentTermStoreDropdown    value={this.state.department}
                        onChange={(e)=>{
                            this.setState({
                                department:e || EmptyReactSelectValue
                            })
                        }} />
                        </div>
                </div>
            
                <div className="form-group">
                        <label className="col-md-2 control-label">Owner</label>
                        <div className="col-md-4">
                        <SPClientPeoplePicker
                                value={this.state.owner}
                                isprofile={true}
                                onChange={e => {
                                    this.setState({
                                        owner:e || []
                                    })
                                }}
                            />
                        </div>
                    </div>       
                                
                <div className="pull-right">
                    <button type="button" className="btn btn-primary">Search</button>
                </div>
            </div>
        </div>
    );
  }
}

export default SearchPage;
