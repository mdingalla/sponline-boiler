import * as React from "react";
import * as Modal from "react-bootstrap/lib/Modal";

import { RouteComponentProps } from "../../../node_modules/@types/react-router";
import { AppConfig, ContractFormView, AppProfile } from "../../../types/models";
import * as ContractActions from '../../actions/contract';
import { CounterPartyList } from "./list";
import { _vendors, _customers, Vendor, Customer, Entity } from "../../constants/config";
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
      formdata:CounterPartyModalForm.State
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

    this.state= {
        showModal:false,
        isEdit:false,
        formdata:{
            id:null,
            businessType:'',
            code:'',
            counterparty:'',
            parent:''
        }
    }
  }

  handleNewCounterParty(){
    this.setState({
        showModal:true
    })
  }

  handleModalClose(){
      this.setState({
          showModal:false
      })
  }

  handleSave(e:CounterPartyModalForm.State){
    
  }

  handleEditCounterParty(id){
    LegalWebApi.GetCounterPartyMaster(id)
        .then((cp)=>{
            this.setState({
                isEdit:true,
                formdata:{
                    businessType:cp.BusinessType,
                    code:cp.Code,
                    counterparty:cp.Title,
                    id:id,
                    parent:''
                },
                showModal:true
            })
        })
  }

 

  render() {

    
    let classification = null;
    let header = null;
    switch (this.props.location.hash) {
        case `#${_vendors}`:
           
            classification=Vendor
            header = <h4>Suppliers</h4>
            break;

        case `#${_customers}`:
                classification=Customer
                header = <h4>Customers</h4>
                break;
    
        default:
              classification=Entity
                header = <h4>Interplex Entities</h4>
            break;
    }

    const  list = <CounterPartyList 
    OnToggleEdit={this.handleEditCounterParty}
    classification={classification} />
    const CounterModal = <Modal
                            bsSize="large"
                            aria-labelledby="contained-modal-title-lg"
                            show={this.state.showModal}
                            onHide={this.handleModalClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Counter Party</Modal.Title>
                            </Modal.Header>
                            <CounterPartyModalForm 
                                isEdit={this.state.isEdit}
                                formdata={this.state.formdata}
                                OnCancel={this.handleModalClose}
                                OnSave={this.handleSave}
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
      </div>
    );
  }
}

export default CounterpartyPage;
