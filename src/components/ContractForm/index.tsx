import * as React from "react";
import { RouteComponentProps } from "react-router";
import { DatePicker, IPersonaProps } from "../../../node_modules/office-ui-fabric-react";

import EntityDropdown from "../EntityDropdown";
import ContractClassificationDropdown from "../Classification";
import SupplierDropdown from "../SupplierDropdown";
import { EmptyReactSelectValue, DayPickerStrings } from "../../constants/config";
import { ReactSelectValue, CounterParty } from "../../../types/models";
import CustomerDropdown from "../CustomerDropdown";
import ContractCategoryDropdown from "../ContractCategory";
import DepartmentTermStoreDropdown from "../DepartmentTermStoreDropdown";
import ContractContentTypesDropdown from "../ContractContentTypeDropdown";
import SPClientPeoplePicker from "../SPPeoplePicker/";

import "!style-loader!css-loader!./index.css";
import CounterPartyControl from "../CounterPartyControl";
import * as Modal from "react-bootstrap/lib/Modal";
import CounterPartyDialog from "../CounterPartyDialog";

interface ModalReloadProps {
    showmodal: boolean;
    OnClose: () => void;
    OnSave: (e) => void;
    Id?: number;
  }



const ContractingPartiesModal = (props: ModalReloadProps) => (
    <Modal
      bsSize="large"
      aria-labelledby="contained-modal-title-lg"
      show={props.showmodal}
      onHide={props.OnClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Counter Party</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CounterPartyDialog />
      </Modal.Body>
      <Modal.Footer>
        <div />
      </Modal.Footer>
    </Modal>
  );


export namespace ContractForm {
    export interface Props extends RouteComponentProps<void> {

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

export default class ContractForm extends React.Component<ContractForm.Props,ContractForm.State> {
    isCancelled: any;
    constructor(props){
        super(props);

        this.handleModalOk = this.handleModalOk.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);

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


    handleModalOk(e) {
        !this.isCancelled &&
          this.setState(
            {
              
            },
            () => {
                !this.isCancelled &&
                  this.setState({
                    showModal: false
                  });
            }
          );
      }
    
      handleModalClose() {
        this.setState({
          showModal: false,
        //   id: null
        });
      }

    render(){
        
        const primaryCounterParty =  <div className="form-group">
            <CounterPartyControl classification={this.state.classification.value} />
        </div>

        const durationPanel = !this.state.expiryDate ? <React.Fragment>
                        <label className="col-md-2 control-label">Set Duration if Expiry Date is blank</label>
                        <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <label className="control-label col-md-5">Years</label>
                                    <div className="col-md-7">
                                        <input type="number" className="form-control"/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="row">
                                    <label className="control-label col-md-5">Months</label>
                                    <div className="col-md-7">
                                        <input type="number" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                        </div>
                        </React.Fragment> : null;


        const modalDialog =  <ContractingPartiesModal
        showmodal={this.state.showModal}
        OnClose={this.handleModalClose}
        OnSave={this.handleModalOk}
        Id={this.state.selectedCounterPartyId}
      />

        return <div className="row">
            <h4 className="pageTitle">Contract Meta Data</h4>
            <div className="col-md-12">
                <div className="form form-horizontal">

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
                        <label className="col-md-2 control-label">Relationship</label>
                        <div className="col-md-4">
                        <ContractClassificationDropdown 
                        onChange={(e)=>{
                            this.setState({
                                classification:e || EmptyReactSelectValue
                            })
                        }} value={this.state.classification}  />
                        </div>

                        <label className="col-md-2 control-label">Effective Date</label>
                        <div className="col-md-4">
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

                    
                    <fieldset>
                        <legend><h5 className="page-title">Counter Parties</h5></legend>
                        {primaryCounterParty}
                    {
                        this.state.counterparties.slice(1).map((cp,idx)=>{
                            return <div className="form-group" key={idx}>
                            <CounterPartyControl key={`ccp${idx}`} 
                            classification={cp.Classification} />
                        </div>
                        })
                    }
                        <button type="button" className="btn btn-primary"
                        onClick={()=>{
                            this.setState({
                              showModal:true,
                              selectedCounterPartyId:null
                            })
                        }}>Add</button>
                    </fieldset>

                    <div className="form-group">
                        <label className="col-md-2 control-label">Expiry Date</label>
                        <div className="col-md-4">
                            <DatePicker strings={DayPickerStrings} ref="expiryDate"
                                allowTextInput={ true }
                                onSelectDate={ date => {
                                    this.setState({
                                        expiryDate:date
                                    })
                                } }
                                value={this.state.expiryDate} placeholder='Select a date...' />
                        </div>
                        {durationPanel}
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

                    {/* 
                    <div className="form-group">
                        <label className="col-md-2 control-label">Expiry Date</label>
                        <div className="col-md-4">
                         
                            
                        </div>
                    </div>
                     */}
                    
                </div>
            </div>
            
            {modalDialog}
        </div>
    }
}

