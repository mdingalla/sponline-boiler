import * as React from "react";
import * as Modal from "react-bootstrap/lib/Modal";
import { ContractClassification, ReactSelectValue } from "../../../types/models";
import { ContractClassTypes, EmptyReactSelectValue, Others } from "../../constants/config";
import SupplierDropdown from "../SupplierDropdown";
import EntityDropdown from "../EntityDropdown";
import CustomerDropdown from "../CustomerDropdown";

export namespace CounterPartyDialog {
    export interface Props {
        id?:number;
        OnSelect:(e)=>void;
        OnClose:()=>void;

    }

    export interface State {
        classification:string;
        value:any;
    }
}


export default class CounterPartyDialog extends React.Component<CounterPartyDialog.Props,CounterPartyDialog.State>{
    constructor(props){
        super(props);

        this.state = {
            classification:"Vendor",
            value:EmptyReactSelectValue
        }

        this.handleOK = this.handleOK.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }

    handleOK(){
        if(this.state.classification == Others && this.state.value){
            this.props.OnSelect(this.state)
        }
        else
        {
            const reactSelectValue = this.state.value as ReactSelectValue;
            if(reactSelectValue && reactSelectValue.value)
            {
                this.props.OnSelect(this.state);
            }
        }

        
    }

    handleCancel(){
        this.props.OnClose();
    }


    render(){

        const ccTypes = ContractClassTypes.map((cc,idx)=>{
            return <label className="radio-inline" key={`lbl${idx}`}>
            <input type="radio" name="inlineRadioOptions" 
                checked={cc==this.state.classification}
                onChange={(e)=>{
                    this.setState({
                        classification:e.currentTarget.value,
                        value:e.currentTarget.value == Others ? '' : EmptyReactSelectValue
                    })
                }}
                value={cc} key={idx} />{cc}
          </label>
        })

        let counterParty = <div className="form-group">
            <label className="col-md-4 control-label">Others</label>
            <div className="col-md-8">
                <input className="form-control" type="text"
                onChange={(e)=>{this.setState({
                    value:e.currentTarget.value
                })}}
                 value={this.state.value}/>
            </div>
        </div>
        switch (this.state.classification) {
            case "Customer":
                counterParty =  <div className="form-group">
                    <label className="col-md-4 control-label">Customers</label>
                    <div className="col-md-8">
                    <CustomerDropdown onChange={(e)=>{this.setState({value:e})}} value={this.state.value}  />
                    </div>
                   </div>
                break;
            
            case "Entity":
                counterParty =  <div className="form-group">
                    <label className="col-md-4 control-label">Interplex</label>
                    <div className="col-md-8">
                    <EntityDropdown onChange={(e)=>{this.setState({value:e})}} value={this.state.value}  />
                    </div>
                   </div>
                break;
            case "Vendor":
                 counterParty = <div className="form-group">
                        <label className="col-md-4 control-label">Supplier</label>
                        <div className="col-md-8">
                        <SupplierDropdown onChange={(e)=>{this.setState({value:e})}} value={this.state.value}  />
                        </div>
                    </div>
                    break;
            default:
                break;
        }

        return <React.Fragment>
            <Modal.Body>
            <div className="form form-horizontal">
            <div className="form-group">
                <label className="col-md-4 control-label">Relationship</label>

                <div className="col-md-8">
                {ccTypes}
                </div>
            </div>
                {counterParty}
        </div>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <button type="button" onClick={this.handleOK}
                     className="btn btn-success">Ok</button>
                    <button type="button" onClick={this.handleCancel}
                     className="btn btn-danger">Cancel</button>
                </div>
            </Modal.Footer>
        </React.Fragment>
    }
}

