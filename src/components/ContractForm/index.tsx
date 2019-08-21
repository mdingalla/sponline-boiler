import * as React from "react";
import { RouteComponentProps } from "react-router";
import { DatePicker, IPersonaProps } from "../../../node_modules/office-ui-fabric-react";

import EntityDropdown from "../EntityDropdown";
import ContractClassificationDropdown from "../Classification";
import SupplierDropdown from "../SupplierDropdown";
import { EmptyReactSelectValue, DayPickerStrings } from "../../constants/config";
import { ReactSelectValue } from "../../../types/models";
import CustomerDropdown from "../CustomerDropdown";
import ContractCategoryDropdown from "../ContractCategory";
import DepartmentTermStoreDropdown from "../DepartmentTermStoreDropdown";
import ContractContentTypesDropdown from "../ContractContentTypeDropdown";
import SPClientPeoplePicker from "../SPPeoplePicker/";


export namespace ContractForm {
    export interface Props extends RouteComponentProps<void> {

    }

    export interface State {
        classification?:ReactSelectValue;
        category?:ReactSelectValue;
        contentTypes?:ReactSelectValue;
        department?:any;
        effectiveDate?:any;
        expiryDate?:any;
        monthDuration?:number;
        yearDuration?:number;
        owner?: IPersonaProps[];
    }
}

export default class ContractForm extends React.Component<ContractForm.Props,ContractForm.State> {
    constructor(props){
        super(props);

        this.state = {
            classification:EmptyReactSelectValue,
            category:EmptyReactSelectValue,
            contentTypes:EmptyReactSelectValue,
            department:"",
            owner:[]
        }
    }

    render(){
        
        let counterParty = <div className="form-group">
        <label className="col-md-3 control-label">Others</label>
        <div className="col-md-6">
            <input className="form-control" type="text"/>
        </div>
    </div>
        switch (this.state.classification.value) {
            case "Customer":
                counterParty = <div className="form-group">
                    <label className="col-md-3 control-label">Customers</label>
                    <div className="col-md-6">
                    <CustomerDropdown onChange={()=>{}} value=""  />
                    </div>
                </div>
                break;
            
            case "Entity":
                counterParty = <div className="form-group">
                    <label className="col-md-3 control-label">Interplex</label>
                    <div className="col-md-6">
                    <EntityDropdown onChange={()=>{}} value=""  />
                    </div>
                </div>
                break;
            case "Vendor":
                 counterParty = <div className="form-group">
                    <label className="col-md-3 control-label">Supplier</label>
                    <div className="col-md-6">
                    <SupplierDropdown onChange={()=>{}} value=""  />
                    </div>
                </div>
                    break;
            default:
                break;
        }

        return <div className="row">
            <div className="col-md-10">
                <div className="form form-horizontal">

                <div className="form-group">
                        <label className="col-md-3 control-label">Contract Types</label>
                        <div className="col-md-6">
                            <ContractContentTypesDropdown 
                            onChange={(e)=>{
                                this.setState({
                                    contentTypes:e || EmptyReactSelectValue
                                })
                            }} 
                            value={this.state.contentTypes}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-3 control-label">Contracting Entity</label>
                        <div className="col-md-6">
                        <EntityDropdown onChange={()=>{}} value=""  />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-3 control-label">Relationship</label>
                        <div className="col-md-6">
                        <ContractClassificationDropdown 
                        onChange={(e)=>{
                            this.setState({
                                classification:e || EmptyReactSelectValue
                            })
                        }} value={this.state.classification}  />
                        </div>
                    </div>
                    
                    {counterParty}

                    <div className="form-group">
                        <label className="col-md-3 control-label">Business Type:</label>
                        <div className="col-md-6">
                        <   input className="form-control" type="text"/>
                        </div>
                    </div>


                    <div className="form-group">
                        <label className="col-md-3 control-label">Effective Date</label>
                        <div className="col-md-6">
                        <DatePicker strings={DayPickerStrings} ref="dateFrom"
                            allowTextInput={ true }
                            onSelectDate={ date => {} }
                            value={this.state.effectiveDate} placeholder='Select a date...' />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-3 control-label">Expiry Date</label>
                        <div className="col-md-6">
                            <DatePicker strings={DayPickerStrings} ref="dateFrom"
                                allowTextInput={ true }
                                onSelectDate={ date => {} }
                                value={this.state.expiryDate} placeholder='Select a date...' />
                            
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-3 control-label">Category</label>
                        <div className="col-md-6">
                        <ContractCategoryDropdown 
                            onChange={(e)=>{
                                this.setState({
                                    category:e || EmptyReactSelectValue
                                })
                            }} value={this.state.category}  />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-3 control-label">Function</label>
                        <div className="col-md-6">
                       <DepartmentTermStoreDropdown  
                       value={this.state.department}
                        onChange={(e)=>{
                            this.setState({
                                department:e || EmptyReactSelectValue
                            })
                        }} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-3 control-label">Owner</label>
                        <div className="col-md-6">
                        {/* <SPClientPeoplePicker
                                value={this.state.owner}
                                isprofile={true}
                                onChange={e => {
                                    this.setState({
                                        owner:e || []
                                    })
                                }}
                            /> */}
                        </div>
                    </div>

                    

                    {/* 
                    <div className="form-group">
                        <label className="col-md-3 control-label">Expiry Date</label>
                        <div className="col-md-6">
                         
                            
                        </div>
                    </div>
                     */}


                    
                </div>
            </div>
            
        </div>
    }
}

