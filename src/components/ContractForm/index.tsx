import * as React from "react";
import { RouteComponentProps } from "react-router";
import { DatePicker, IPersonaProps } from "../../../node_modules/office-ui-fabric-react";

import * as ContractActions from "../../actions/contract";
import EntityDropdown from "../EntityDropdown";
import ContractClassificationDropdown from "../Classification";
import SupplierDropdown from "../SupplierDropdown";
import { EmptyReactSelectValue, DayPickerStrings } from "../../constants/config";
import { ReactSelectValue, CounterParty, AppConfig, ContractFormView, ContractFormState, CounterPartyControlState } from "../../../types/models";
import CustomerDropdown from "../CustomerDropdown";
import ContractCategoryDropdown from "../ContractCategory";
import DepartmentTermStoreDropdown from "../DepartmentTermStoreDropdown";
import ContractContentTypesDropdown from "../ContractContentTypeDropdown";
import SPClientPeoplePicker from "../SPPeoplePicker/";

import "!style-loader!css-loader!./index.css";
import CounterPartyControl from "../CounterPartyControl";
import * as Modal from "react-bootstrap/lib/Modal";
import CounterPartyDialog from "../CounterPartyDialog";
import FileUploads from "../FileUploads";
import AdditionalDocumentDialog from "../AdditionalDocumentModal";

interface ModalReloadProps {
    showModal: boolean;
    OnClose: () => void;
    OnSave: (e) => void;
    Id?: number;
}


interface AdditionalModalProps extends ContractForm.Props {
    showModal: boolean;
    OnClose: () => void;
    OnSave: (e) => void;
    Id?: number;
}



const ContractingPartiesModal = (props: ModalReloadProps) => (
    <Modal
      bsSize="large"
      aria-labelledby="contained-modal-title-lg"
      show={props.showModal}
      onHide={props.OnClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Counter Party</Modal.Title>
      </Modal.Header>
      <CounterPartyDialog OnClose={props.OnClose}
       OnSelect={props.OnSave} />
      {/* <Modal.Body>
       
      </Modal.Body>
      <Modal.Footer>
        <div />
      </Modal.Footer> */}
    </Modal>
  );


  const AdditionalDocumentModal = (props: AdditionalModalProps) => (
    <Modal
      bsSize="large"
      aria-labelledby="contained-modal-title-lg"
      show={props.showModal}
      onHide={props.OnClose}>
          <Modal.Header closeButton>
        <Modal.Title>Related Documents</Modal.Title>
      </Modal.Header>
           <AdditionalDocumentDialog OnClose={props.OnClose}
           OnSelect={props.OnSave} />
          
      {/* <Modal.Body>
       
      </Modal.Body>
      <Modal.Footer>
        <div />
      </Modal.Footer> */}
    </Modal>
  );


export namespace ContractForm {
    export interface Props extends RouteComponentProps<void> {
        appconfig: AppConfig;
        contract: ContractFormView;
        contractactions: typeof ContractActions;
    }

    
}

export default class ContractForm extends React.Component<ContractForm.Props,ContractFormState> {
    isCancelled: any;
    constructor(props){
        super(props);

        this.handleModalOk = this.handleModalOk.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleUPFiles = this.handleUPFiles.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleAdditonalDocModalClose = this.handleAdditonalDocModalClose.bind(this);
        this.handleAdditonalModalOk = this.handleAdditonalModalOk.bind(this);
        this.handleCounterPartyChanges = this.handleCounterPartyChanges.bind(this);
        

        const {contract} = this.props;

        this.state = {
            classification:contract.relationship,
            category:contract.category,
            contentTypes:contract.contractTypes,
            department:contract.function,
            owner:contract.owner,
            counterparties:contract.counterparties,
            entity:contract.contractingEntity,
            showRelationShipModal:false,
            showAdditonalDocumentModal:false,
            selectedCounterPartyId:null,
            upFiles:[]
        }
    }


    handleModalOk(e) {
    
        !this.isCancelled &&
            this.setState(
            {
                counterparties:this.state.counterparties.concat([
                    {
                        Classification:e.classification,
                        Nature:'',
                        PartyName:e.value,

                    }
                ])
            },
            () => {
                !this.isCancelled &&
                    this.setState({
                    showRelationShipModal: false
                    });
            }
            );
    }

    handleAdditonalModalOk(e){
        !this.isCancelled &&
            this.setState({

            },()=>{
                !this.isCancelled && 
                this.setState({
                    showAdditonalDocumentModal:false
                })
            })
    }
    
    handleModalClose() {
        this.setState({
            showRelationShipModal: false,
        //   id: null
        });
    }

    handleAdditonalDocModalClose() {
        this.setState({
            showAdditonalDocumentModal: false,
        //   id: null
        });
    }

    handleCounterPartyChanges(e:CounterPartyControlState){
        // console.log(e)
        let counterparty = this.state.counterparties[e.id];
        counterparty.Nature = e.selectedBusinessType;
        counterparty.PartyName = e.selectedValue;


    }

    handleUPFiles(files) {
        this.setState({
            upFiles:files
        })
    }

    handleSave(){
        this.props.contractactions.CreateOrUpdateContract(this.state,this.props.history)
    }

    componentDidMount(){
        const Id = this.props.match.params["id"];
        if(Id){
            this.props.contractactions.GetContract(Id)
        }
        else
        {
            this.props.contractactions.NewContract();
        }
    }


    static getDerivedStateFromProps(props:ContractForm.Props,state:ContractFormState){
        if(props.contract.id && props.contract.id != state.id){
            const {contract} = props;
            return {
                category:contract.category,
                classification:contract.relationship,
                contentTypes:contract.contractTypes,
                department:contract.function,
                effectiveDate:contract.effectiveDate,
                expiryDate:contract.expiryDate,
                id:contract.id,
                entity:contract.contractingEntity,
                owner:contract.owner,
                counterparties:contract.counterparties,
            } as ContractFormState
        }

        return null;
    }

    render(){
        const primaryParty = this.state.counterparties && this.state.counterparties.length > 0 ? this.state.counterparties[0] : null;

        const primaryCounterParty =  <div className="form-group">
            <CounterPartyControl 
            id={0}
            selectedValue={primaryParty.PartyName}
            selectedBusinessType={primaryParty.Nature}
            onChange={this.handleCounterPartyChanges}
            classification={this.state.classification.value} />
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


        const RelationshipmodalDialog =  <ContractingPartiesModal
        showModal={this.state.showRelationShipModal}
        OnClose={this.handleModalClose}
        OnSave={this.handleModalOk}
        Id={this.state.selectedCounterPartyId}/>

        const AdditionalModalDialog = <AdditionalDocumentModal 
            showModal={this.state.showAdditonalDocumentModal}
            OnClose={this.handleAdditonalDocModalClose}
            OnSave={this.handleAdditonalModalOk}
            {...this.props}/>

        const allowMulti = !this.props.contract.id;

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
                                classification:e || EmptyReactSelectValue,
                                
                            })
                        }} value={this.state.classification}  />
                        </div>

                        <label className="col-md-2 control-label">Effective Date</label>
                        <div className="col-md-4">
                        <DatePicker strings={DayPickerStrings} 
                        // ref="effectiveDate"
                            allowTextInput={ true }
                            onSelectDate={ date => {
                                this.setState({
                                    effectiveDate:date
                                })
                            } }
                            value={this.state.effectiveDate} placeholder='Select a date...' />
                        </div>

                       
                    </div>

                    
                    <fieldset className="form-group">
                        <legend><h5 className="page-title">Counter Parties</h5></legend>
                        {primaryCounterParty}
                    {
                        this.state.counterparties.slice(1).map((cp,idx)=>{
                            return <div className="form-group" key={idx}>
                            <CounterPartyControl key={`ccp${idx}`} id={this.state.counterparties.indexOf(cp)}
                            selectedValue={cp.PartyName}
                            selectedBusinessType={cp.Nature}
                            onChange={this.handleCounterPartyChanges}

                            classification={cp.Classification} />
                        </div>
                        })
                    }
                        <div className="pull-right">
                        <button type="button" className="btn btn-primary"
                        onClick={()=>{
                            this.setState({
                              showRelationShipModal:true,
                              selectedCounterPartyId:null
                            })
                        }}>Add Counter Party</button>
                        </div>
                    </fieldset>

                    <div className="form-group">
                        <label className="col-md-2 control-label">Expiry Date</label>
                        <div className="col-md-4">
                            <DatePicker strings={DayPickerStrings} 
                            // ref="expiryDate"
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
                        <label className="col-md-2 control-label">File</label>
                        <div className="col-md-4">
                        <FileUploads
                            textmessage={allowMulti ? "Upload Files Here" : "Replace Uploaded File"}
                            multi={allowMulti}
                            files={this.state.upFiles}
                            onChange={this.handleUPFiles}
                        />
                        </div>
                    </div>
                    

                    <fieldset className="form-group">
                    <legend><h5 className="page-title">Related Documents</h5></legend>
                    
                    <div className="pull-right">
                        <button type="button" className="btn btn-primary"
                        onClick={()=>{
                            this.setState({
                                showAdditonalDocumentModal:true,
                                selectedCounterPartyId:null
                            })
                        }}>Add Documents</button>
                        </div>

                    </fieldset>
                    {/* 
                    <div className="form-group">
                        <label className="col-md-2 control-label">Expiry Date</label>
                        <div className="col-md-4">
                         
                            
                        </div>
                    </div>
                     */}

                     <div className="pull-right">
                            <button type="button" 
                            onClick={this.handleSave}
                            className="btn btn-success">Upload and Save</button>
                            <button type="button" className="btn btn-danger">Close</button>
                     </div>
                    
                </div>
            </div>
            
            {RelationshipmodalDialog}
            {AdditionalModalDialog}


        </div>
    }
}

