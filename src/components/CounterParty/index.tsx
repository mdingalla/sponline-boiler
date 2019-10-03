import * as React from "react";
import * as Modal from "react-bootstrap/lib/Modal";
import Swal, { SweetAlertOptions } from 'sweetalert2'
import { RouteComponentProps } from "../../../node_modules/@types/react-router";
import { AppConfig, ContractFormView, AppProfile, ContractClassification } from "../../../types/models";
import * as ContractActions from '../../actions/contract';
import { CounterPartyList } from "./list";
import { _vendors, _customers, Vendor, Customer, Entity, _parent, Parent, EmptyReactSelectValue, Others, SwalDeleteOptions } from "../../constants/config";
import { CounterPartyModalForm } from "./form";
import LegalWebApi from "../../api/LegalWebApi";


export namespace CounterpartyPage {
  export interface Props extends RouteComponentProps<void> {
    appconfig: AppConfig;
    contract: ContractFormView;
    contractactions: typeof ContractActions;
    profile: AppProfile;
   
  }
  export interface State {
      showModal:boolean;
      isEdit:boolean;
      formdata:CounterPartyModalForm.State,
      classification:ContractClassification
  }
}

class CounterpartyPage extends React.Component<
CounterpartyPage.Props,
CounterpartyPage.State
> {
  constructor(props) {
    super(props);

    this.handleNewCounterParty = this.handleNewCounterParty.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEditCounterParty = this.handleEditCounterParty.bind(this);
    this.handleDeleteCounterParty = this.handleDeleteCounterParty.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);

    let classification = null;
    switch (this.props.location.search) {
      case `?${_vendors}`:
         
          classification=Vendor
          break;

      case `?${_customers}`:
              classification=Customer
              break;

      case `?${_parent}`:
        classification=Parent
        break;       
  
      default:
            classification=Entity
          break;
  }

    this.state= {
        showModal:false,
        isEdit:false,
        formdata:{
            id:null,
            businessType:'',
            code:'',
            counterparty:'',
            parent:EmptyReactSelectValue,
            region:null,
        },
        classification:classification
    }
  }

  handleNewCounterParty(){
    this.setState({
        showModal:true,
        formdata:{
          businessType:'',
          code:'',
          counterparty:'',
          id:null,
          parent:null
        }
    })
  }

  handleModalClose(){
      this.setState({
          showModal:false
      })
  }

  async handleSave(e:CounterPartyModalForm.State){
    if(!e.counterparty)
    {
      return;
    }
    if(this.state.classification == Parent){
      let parentPayload = {
        Title:e.counterparty,
        SAP:e.code
      }

      LegalWebApi.AddUpdateParentCounterParty(parentPayload,e.id)
      .then((x)=>{
        this.setState({
          showModal:false,

        })
      })
    }
    if(this.state.classification != Parent && this.state.classification != Others)
    {
      const qClassification = await LegalWebApi.GetClassificationByKeyValue(this.state.classification);

      const classification = qClassification && qClassification.length > 0 ? qClassification[0].Id : null;

      let payload = {
        Title:e.counterparty,
        ParentCounterPartyId:e.parent && e.parent.value ? e.parent.value : null,
        Code:e.code,
        BusinessType:e.businessType,
        Region:e.region && e.region.value ? e.region.value : null,
        ClassificationId:classification
      }

    
      LegalWebApi.AddUpdateCounterParty(payload,e.id)
        .then((x)=>{
          this.setState({
            showModal:false,

          })
        })
    }

    
  }

  handleFormChange(e:CounterPartyModalForm.State){
    this.setState({
      formdata:e
    })
  }



  handleEditCounterParty(id){
    if(this.state.classification == Parent)
    {
      LegalWebApi.GetParentCounterPartyMaster(id)
        .then((parent)=>{
          this.setState({
            formdata:{
              businessType:'',
              code:parent.SAP,
              counterparty:parent.Title,
              id:id,
              parent:null, 
            },
            isEdit:true,
            showModal:true
          })
        })
    }
    else
    {
      LegalWebApi.GetCounterPartyMaster(id)
        .then(async (cp)=>{
           
            let parent = null;
            if(cp.ParentCounterPartyId){
              const _parent = await LegalWebApi.GetParentConterPartyId(cp.ParentCounterPartyId);
              if(_parent){
                parent = {
                  value:_parent.Id,
                  label:_parent.Title,
                }
              }
            }

            this.setState({
                isEdit:true,
                formdata:{
                    businessType:cp.BusinessType,
                    code:cp.Code,
                    counterparty:cp.Title,
                    id:id,
                    region:{
                      value:cp.Region,
                      label:cp.Region
                    },
                    parent:parent,

                },
                showModal:true
            })
        })
    }
  }

  handleDeleteCounterParty(id){
    if(this.state.classification == Parent){
      Swal.fire(SwalDeleteOptions as SweetAlertOptions)
      .then((result)=>{
        if(result.value){
          LegalWebApi.DeleteParentCounterPartyMaster(id)
          .then(()=>{
            Swal.fire('Deleted','Selected Record Deleted.',"info")
              .then(()=>{
                
              })
          })
        }
      })
    }
    else
    {

      Swal.fire(SwalDeleteOptions as SweetAlertOptions)
        .then((result)=>{
          if(result.value){
            LegalWebApi.DeleteCounterPartyMaster(id)
            .then(()=>{
              Swal.fire('Deleted','Selected Record Deleted.',"info")
                .then(()=>{
                  
                })
            })
          }
        })

     
    }
  }

  render() {

    
    let classification = null;
    let header = null;
    switch (this.props.location.search) {
        case `?${_vendors}`:
           
            classification=Vendor
            header = <h4>Vendors</h4>
            break;

        case `?${_customers}`:
                classification=Customer
                header = <h4>Customers</h4>
                break;

        case `?${_parent}`:
          classification=Parent
          header = <h4>Parent</h4>
          break;       
    
        default:
              classification=Entity
                header = <h4>Interplex Entities</h4>
            break;
    }

    const  list = <CounterPartyList modal={this.state.showModal}
    OnToggleEdit={this.handleEditCounterParty}
    OnDelete={this.handleDeleteCounterParty}
    classification={classification} />

    const headerTitle = `${this.state.isEdit ? 'Edit':'Add'} ${classification}`
    const CounterModal = <Modal
                            bsSize="large"
                            aria-labelledby="contained-modal-title-lg"
                            show={this.state.showModal}
                            onHide={this.handleModalClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>{headerTitle}</Modal.Title>
                            </Modal.Header>
                            <CounterPartyModalForm 
                                isEdit={this.state.isEdit}
                                formdata={this.state.formdata}
                                OnCancel={this.handleModalClose}
                                OnSave={this.handleSave}
                                OnChange={this.handleFormChange}
                            classification={classification} />
                         </Modal>


    return (
      <div className="col-xs-8 col-md-10">
          {CounterModal}
            {header}
            {list}
            <div>
                <button className="btn btn-primary"
                onClick={this.handleNewCounterParty}
                type="button">Add</button>
            </div>
            <div className="row pull-right">
            <button type="button"
                            onClick={this.props.contractactions.NavigateHome}
                             className="btn btn-danger">Close</button>
            </div>
      </div>
    );
  }
}

export default CounterpartyPage;
