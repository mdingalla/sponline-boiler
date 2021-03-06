import * as React from "react";
import { RouteComponentProps } from "react-router";
import { IPersonaProps } from "../../../node_modules/office-ui-fabric-react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import * as Modal from "react-bootstrap/lib/Modal";
import DatePicker from 'react-datepicker';

import * as ContractActions from "../../actions/contract";
import EntityDropdown from "../EntityDropdown";
import ContractClassificationDropdown from "../Classification";
import SupplierDropdown from "../SupplierDropdown";
import { EmptyReactSelectValue, DayPickerStrings, pagePath, OwnerGroup, Others, Vendor, Customer } from "../../constants/config";
import { ReactSelectValue, CounterParty, AppConfig, ContractFormView, ContractFormState, CounterPartyControlState, AppProfile } from "../../../types/models";
import CustomerDropdown from "../CustomerDropdown";
import ContractCategoryDropdown from "../ContractCategory";
import DepartmentTermStoreDropdown from "../DepartmentTermStoreDropdown";
import ContractContentTypesDropdown from "../ContractContentTypeDropdown";
import SPClientPeoplePicker from "../SPPeoplePicker/";
import CounterPartyControl from "../CounterPartyControl";
import CounterPartyDialog from "../CounterPartyDialog";
import FileUploads from "../FileUploads";
import AdditionalDocumentDialog from "../AdditionalDocumentModal";

import "!style-loader!css-loader!./index.css";
import "!style-loader!css-loader!sweetalert2/dist/sweetalert2.css"
import "!style-loader!css-loader!react-datepicker/dist/react-datepicker.min.css";
import SharePointModalDialog from "../SharePointModalDialog";
import { isDate } from "moment";
import moment = require("moment");
import { CustomDatePicker } from "../CustomDatePicker";
import ContractItem from "../ContractItem";
import * as _ from "lodash";
import { ContractRelatedList } from "../ContractItem/list";
import contract from "../../reducers/contract";
import LegalWebApi from "../../api/LegalWebApi";
import ErrorPanel from "../ErrorPanel";

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

const MySwal = Swal


export namespace ContractForm {
    export interface Props extends RouteComponentProps<void> {
        appconfig: AppConfig;
        contract: ContractFormView;
        contractactions: typeof ContractActions;
        profile:AppProfile;
    }

    export interface State extends ContractFormState {
        errors?:any[]
    }

    
}

export default class ContractForm extends React.Component<ContractForm.Props,ContractForm.State> {
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
        this.handleCounterPartyDelete = this.handleCounterPartyDelete.bind(this);
        this.handleDuration = this.handleDuration.bind(this);
        this.handleDeleteRelatedDocs = this.handleDeleteRelatedDocs.bind(this);

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
            upFiles:[],
            upDocs:[],
            relatedDocs:contract.relateddocs,
            issaving:contract.issaving,
            status:contract.status,
            errors:contract.validationResult.errors
        }
    }

    handleCounterPartyDelete(e:CounterPartyControlState){
        if(e.spId)
        {
            const selected = e.selectedValue as ReactSelectValue;

            MySwal.fire({
                title:'Confirm Delete',
                titleText:`${selected && selected.label ? selected.label : e.selectedValue} will be deleted.`,
                type:'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result)=>{
                if(result.value){
                    this.props.contractactions.DeleteContractParty(e.spId)
                    this.setState({
                        counterparties:this.state.counterparties.filter(x=>x.Id != e.spId)
                    },()=>{
                        MySwal.fire('Deleted','Counter Party Deleted','success')
                    })
                }
            })

            
        }
        else
        {
            const cp = this.state.counterparties[e.id];   
            this.setState({
                counterparties:this.state.counterparties.filter(x=>x != cp)
            })
        }
    }


    async handleModalOk(e) {

        let nature = '';
        let busType ={
            BusinessType:''
        };

        if(e && e.value && !isNaN(e.value))
        {
             busType = await LegalWebApi.GetCounterPartyMaster(e.value)
            nature = busType.BusinessType;
        }
    
        !this.isCancelled &&
            this.setState(
            {
                counterparties:this.state.counterparties.concat([
                    {
                        Classification:e.classification,
                        Nature:e.classification != Vendor  ? nature : {
                            label:nature,
                            value:nature
                        },
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
        // console.log(e)
        !this.isCancelled && 
        this.setState({
            upDocs:_.uniq(this.state.upDocs.concat(e.selected)),
            showAdditonalDocumentModal:false
        })
        // !this.isCancelled &&
        //     this.setState({
        //         // upDocs:this.state.upDocs.concat(e)
        //     },()=>{
              
        //     })
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
        },()=>{
            this.props.contractactions.ValidateContractState(this.state)
        })
    }

    handleSave(){
        this.props.contractactions.CreateOrUpdateContract(this.state,this.props.history)
    }


    handleDuration(isYear:boolean,value){
        if(!isNaN(value) && isDate(this.state.effectiveDate))
        {
            if(isYear)
            {
                this.setState({
                    expiryDate:moment(this.state.effectiveDate).add(value,'year').toDate()
                })
            }
            else
            {
                this.setState({
                    expiryDate:moment(this.state.effectiveDate).add(value,'month').toDate()
                })
            }
        }
    }

    handleDeleteUploadedRelatedDocs(id){
        const doc = this.state.upDocs[id];
        this.setState({
            upDocs:this.state.upDocs.filter(x=>x != doc)
        })
    }

    handleDeleteRelatedDocs(id){
        this.props.contractactions.DeleteRelatedDocs(id)
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


    static getDerivedStateFromProps(props:ContractForm.Props,state:ContractForm.State){
        const {contract} = props;
        if(props.contract.status == "SAVED" && state.status != props.contract.status)
        {
            MySwal.fire('Contract Saved','Saved','success')
                .then((x)=>{
                    props.contractactions.ContractFormChanges({
                        status:state.status
                    })

                    if(state.status == "NEW" || state.status == "EDIT")
                    {
                        props.contractactions.NavigateContract(props.history,props.contract.id)
                    }
                    
                })
        }

        if(props.contract.issaving != state.issaving){
            return {
                issaving:props.contract.issaving
            } as ContractForm.State
        }
        if(props.contract.relateddocs.length != state.relatedDocs.length){
            return {
                 relatedDocs:contract.relateddocs
            } as ContractForm.State
        }

        if(props.contract.validationResult.errors != state.errors)
        {
            return {
                errors:props.contract.validationResult.errors
            } as ContractForm.State
        }

        if(props.contract.id && props.contract.id != state.id){
           
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
                issaving:contract.issaving,
                status:contract.status,
                relatedDocs:contract.relateddocs,
                errors:contract.validationResult.errors,
                comments:contract.comments
            } as ContractForm.State
        }

        

        return null;
    }

    render(){

        const {contract,profile} = this.props;

        const isAdmin = profile.User.Groups.results.filter(x=>x.Title == OwnerGroup).length > 0;

        const spModalDialog = this.state.issaving ? <SharePointModalDialog message={"Saving..."} /> : null;

        const primaryParty = this.state.counterparties && this.state.counterparties.length > 0 ? this.state.counterparties[0] : null;

        const primaryCounterParty = primaryParty ? <div className="form-group">
            <CounterPartyControl 
            onDelete={()=>{}}
            isAdmin={isAdmin}
            id={0}
            showDelete={false}
            spId={primaryParty.Id}
            selectedValue={primaryParty.PartyName}
            selectedBusinessType={primaryParty.Nature}
            onChange={this.handleCounterPartyChanges}
            classification={this.state.classification.value} />
        </div> : null

        const durationPanel =  <React.Fragment>
                        <label className="col-md-2 control-label">Set Duration if Expiry Date is blank</label>
                        <div className="col-md-4">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <label className="control-label col-md-5">Years</label>
                                    <div className="col-md-7">
                                        <input type="number" 
                                        onChange={(e)=>{
                                            this.handleDuration(true,e.currentTarget.value)
                                        }}
                                        value={this.state.yearDuration} className="form-control"/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="row">
                                    <label className="control-label col-md-5">Months</label>
                                    <div className="col-md-7">
                                        <input type="number"
                                         onChange={(e)=>{
                                            this.handleDuration(false,e.currentTarget.value)
                                        }}
                                       value={this.state.monthDuration}   className="form-control"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                        </div>
                        </React.Fragment>;


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
        
        const viewBtn = contract.contractfile &&  contract.contractfile.LinkingUri ? <a  className="btn btn-default"  target="_blank"
        href={`${contract.contractfile.LinkingUri }`}>View</a>    : null

        const contractfile = this.props.contract.contractfile ? <React.Fragment>
            <h5>{contract.contractfile.Name}<span className="label label-default"></span></h5>
               {viewBtn}
            <a  className="btn btn-default"  target="_blank"
            href={`${_spPageContextInfo.webAbsoluteUrl}/_layouts/download.aspx?SourceUrl=${contract.contractfile.ServerRelativeUrl}`}>
                Download </a>   
               
        </React.Fragment> : null;

        return <div className="row">
            <ErrorPanel errors={this.state.errors} />

            <h4 className="pageTitle">Contract Meta Data</h4>
            <div className="col-md-12">
                <div className="form form-horizontal">
                        {spModalDialog}
                    <div className="form-group">
                        <label className="col-md-2 control-label">Contract Types</label>
                        <div className="col-md-4">
                            <ContractContentTypesDropdown 
                            onChange={(e)=>{
                                this.setState({
                                    contentTypes:e || EmptyReactSelectValue,
                                },()=>{
                                    this.props.contractactions.ValidateContractState(this.state)
                                })
                            }} 
                            value={this.state.contentTypes}/>
                        </div>

                        <label className="col-md-2 control-label">Contracting Entity</label>
                        <div className="col-md-4">
                         <EntityDropdown onChange={(e)=>{
                             this.setState({
                                 entity:e || EmptyReactSelectValue
                                },()=>{
                                    this.props.contractactions.ValidateContractState(this.state)
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
                                
                            },()=>{
                                this.props.contractactions.ValidateContractState(this.state)
                            })
                        }} value={this.state.classification}  />
                        </div>

                        <label className="col-md-2 control-label">Effective Date</label>
                        <div className="col-md-4">
                        <CustomDatePicker
                            selected={this.state.effectiveDate}
                            onChange={ date => {
                                this.setState({
                                    effectiveDate:date
                                })
                            } }
                            />
                        </div>

                       
                    </div>

                    
                    <fieldset className="form-group">
                        <legend><h5 className="page-title">Counter Parties</h5></legend>
                        {primaryCounterParty}
                    {
                        this.state.counterparties.slice(1).map((cp,idx)=>{
                            return <div className="form-group" key={idx}>
                            <CounterPartyControl key={`ccp${idx}`}
                            isAdmin={isAdmin}
                             onDelete={this.handleCounterPartyDelete}
                             id={this.state.counterparties.indexOf(cp)}
                             spId={cp.Id}
                            selectedValue={cp.PartyName}
                            selectedBusinessType={cp.Nature}
                            onChange={this.handleCounterPartyChanges}
                            showDelete={true}
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
                        <CustomDatePicker
                            selected={this.state.expiryDate}
                            onChange={ date => {
                                this.setState({
                                    expiryDate:date
                                })
                            } }
                            />
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
                                },()=>{
                                    this.props.contractactions.ValidateContractState(this.state)
                                })
                            }} value={this.state.category}  />
                        </div>

                        <label className="col-md-2 control-label">Function</label>
                        <div className="col-md-4">
                         <DepartmentTermStoreDropdown    value={this.state.department}
                            onChange={(e)=>{
                                this.setState({
                                    department:e || EmptyReactSelectValue
                                },()=>{
                                    this.props.contractactions.ValidateContractState(this.state)
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
                                    },()=>{
                                        this.props.contractactions.ValidateContractState(this.state)
                                    })
                                }}
                            />
                        </div>
                        <label className="col-md-2 control-label">File</label>
                        <div className="col-md-4">
                            {contractfile}
                            <div className="row">
                             <FileUploads 
                              multi={allowMulti}
                              files={this.state.upFiles}
                             textmessage={allowMulti ? "Upload Files Here" : "Replace Uploaded File Here"}
                            onChange={this.handleUPFiles}/></div> 
                        </div>
                    </div>

                    <div className="form-group">
                    <label className="col-md-2 control-label">Comments</label>
                        <div className="col-md-4">
                            <textarea 
                            value={this.state.comments}
                            onChange={(e)=>{this.setState({
                                comments:e.currentTarget.value
                            })}}
                            className="form-control" ></textarea>
                        </div>
                    </div>
                    

                    <fieldset className="form-group">
                    <legend><h5 className="page-title">Related Documents</h5></legend>
                    
                    <div>
                        <ContractRelatedList isBind={true} parentId={this.props.contract.id}
                        OnDelete={(e)=>{this.handleDeleteRelatedDocs(e)}}
                        docs={this.state.relatedDocs.map((x)=>{
                            return x
                        })} />
                    </div>

                    <div>
                        <ContractRelatedList isBind={false}
                        OnDelete={(e)=>{this.handleDeleteUploadedRelatedDocs(e)}}
                        docs={this.state.upDocs.map((x)=>{
                            return {
                                Id:x,
                                isParent:false
                            } as RelatedDocs
                        })} />
                    </div>
                    
                    
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
                            <button type="button"
                            onClick={this.props.contractactions.NavigateHome}
                             className="btn btn-danger">Close</button>
                     </div>
                    
                </div>
            </div>
            
            {RelationshipmodalDialog}
            {AdditionalModalDialog}


        </div>
    }
}

