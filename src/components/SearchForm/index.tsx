import * as React from "react";
import DatePicker from 'react-datepicker';
import * as CamlBuilder from 'camljs';

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
import { IPersonaProps } from "office-ui-fabric-react";
import { CustomDatePicker } from "../CustomDatePicker";
import LegalWebApi from "../../api/LegalWebApi";
import { RenderListDataOptions } from "@pnp/sp";
import CounterPartySearch from "../CounterPartyControl/search";

export namespace SearchForm {
  export interface Props {
    OnDataLoad:(e:ListDataAsStreamResult)=>void;
    
  }
  export interface State {
    classification?:ReactSelectValue;
    category?:ReactSelectValue;
    contentTypes?:ReactSelectValue;
    department?:ReactSelectValue;
    entity?:ReactSelectValue;
    effectiveDateFrom?:any;
    effectiveDateTo?:any
    expiryDateFrom?:any;
    expiryDateTo?:any;
    monthDuration?:number;
    yearDuration?:number;
    owner?: IPersonaProps[];
    counterparty?:any;
    showModal:boolean;
    selectedCounterPartyId?:number;
    result:any[];
  }
}

class SearchForm extends React.Component<
SearchForm.Props,
SearchForm.State
> {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
        classification:EmptyReactSelectValue,
        category:EmptyReactSelectValue,
        contentTypes:EmptyReactSelectValue,
        department:EmptyReactSelectValue,
        owner:[],
        counterparty:null,
        entity:EmptyReactSelectValue,
        showModal:false,
        selectedCounterPartyId:null,
        result:[]
    }
  }

  async handleSearch(){
    let camlquery = new CamlBuilder();

    const contentType = this.state.contentTypes && this.state.contentTypes.value ?
      CamlBuilder.Expression().ContentTypeIdField("ContentTypeId").EqualTo(this.state.contentTypes.value) : 
      CamlBuilder.Expression().ContentTypeIdField("ContentTypeId").IsNotNull();
    
    const entity = this.state.entity && this.state.entity.value ? 
      CamlBuilder.Expression().LookupField("IPXEntity").Id().EqualTo(parseInt(this.state.entity.value)) :
      CamlBuilder.Expression().LookupField("IPXEntity").Id().IsNotNull();
    
    const category = this.state.category && this.state.category.value ? 
      CamlBuilder.Expression().LookupField("ContractCategory").Id().EqualTo(parseInt(this.state.category.value)) : 
      CamlBuilder.Expression().LookupField("ContractCategory").Id().IsNotNull();

    const mfunction = this.state.department && this.state.department.value ?
        CamlBuilder.Expression().TextField("FunctionDept").EqualTo(this.state.department.value) : 
        CamlBuilder.Expression().TextField("FunctionDept").IsNotNull();

    const owner = this.state.owner && this.state.owner.length > 0 ? 
        CamlBuilder.Expression().UserField("ContractOwner").Id().EqualTo(parseInt(this.state.owner[0]["key"])) : 
        CamlBuilder.Expression().UserField("ContractOwner").Id().IsNotNull();

    
    let filter = [];

    if(this.state.effectiveDateFrom) filter.push(CamlBuilder.Expression().DateField("EffectiveDate").GreaterThanOrEqualTo(this.state.effectiveDateFrom));
    if(this.state.effectiveDateTo)filter.push(CamlBuilder.Expression().DateField("EffectiveDate").LessThanOrEqualTo(this.state.effectiveDateTo));
    if(this.state.expiryDateFrom) filter.push(CamlBuilder.Expression().DateField("ExpiryDate").GreaterThanOrEqualTo(this.state.expiryDateFrom));
    if(this.state.expiryDateTo)filter.push(CamlBuilder.Expression().DateField("ExpiryDate").LessThanOrEqualTo(this.state.expiryDateTo));

    

    let counterparties = [];
    if(this.state.counterparty){
        let subquery = "";
        const rsCounterParty = this.state.counterparty as ReactSelectValue;
        if(rsCounterParty && rsCounterParty.value)
        {
            subquery = `CounterPartyRefId eq ${rsCounterParty.value}`
        }
        else
        {
            subquery = `Title eq '${this.state.counterparty}' or substringof('${this.state.counterparty}',Title)`
        }

        const cp = await LegalWebApi.QueryContractCounterParty(subquery);


        counterparties = cp.map((counterparty)=>{
            // return CamlBuilder.Expression().CounterField("ID").In(counterparty.ContractRefId)
            return counterparty.ContractRefId
        })

        if(counterparties.length > 0)
        {
            filter.push(CamlBuilder.Expression().CounterField("ID").In(counterparties))
        }
    }

    // console.log(counterparties)

    const query = camlquery.Where().All([contentType,entity,category,mfunction,owner].concat(filter)).ToString();

    LegalWebApi.QueryContract(
        {
            ViewXml:`<View>
                <Query>
                    ${query}
                </Query>
            </View>`
        }
    ).then((data)=>{
        // console.log(data)
        this.props.OnDataLoad(data)
    })
  }

  
  render() {

    return (
        <div className="form form-horizontal">
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
                               <CustomDatePicker
                                    selected={this.state.effectiveDateFrom}
                                    onChange={ date => {
                                        this.setState({
                                            effectiveDateFrom:date
                                        })
                                    } }/>
                                
                               </div>
                               <div className="col-md-6">
                               <CustomDatePicker
                                    selected={this.state.effectiveDateTo}
                                    onChange={ date => {
                                        this.setState({
                                            effectiveDateTo:date
                                        })
                                    } }/>
                               </div>
                           </div>
                                
                        </div>

                        <label className="col-md-2 control-label">Expiry Date</label>
                        <div className="col-md-4">

                            <div className="row">
                                <div className="col-md-6">
                                <CustomDatePicker
                                    selected={this.state.expiryDateFrom}
                                    onChange={ date => {
                                        this.setState({
                                            expiryDateFrom:date
                                        })
                                    } }/>
                                </div>
                                <div className="col-md-6">
                                <CustomDatePicker
                                    selected={this.state.expiryDateTo}
                                    onChange={ date => {
                                        this.setState({
                                            expiryDateTo:date
                                        })
                                    } }/>
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
                        <div className="col-md-6">
                            <CounterPartySearch OnChange={(e)=>{this.setState({
                                counterparty:e
                            })}}  />
                        </div>
                </div>       
                                
                <div className="pull-right">
                    <button type="button" 
                    onClick={this.handleSearch}
                    className="btn btn-primary">Search</button>
                </div>
            </div>
        </div>
    );
  }
}

export default SearchForm;
