import * as React from "react";
import { ContractClassification } from "../../../types/models";
import { ContractClassTypes } from "../../constants/config";
import SupplierDropdown from "../SupplierDropdown";
import EntityDropdown from "../EntityDropdown";
import CustomerDropdown from "../CustomerDropdown";

export namespace CounterPartyDialog {
    export interface Props {
        id?:number;
    }

    export interface State {
        classification:string;
    }
}


export default class CounterPartyDialog extends React.Component<CounterPartyDialog.Props,CounterPartyDialog.State>{
    constructor(props){
        super(props);

        this.state = {
            classification:"Vendor"
        }
    }


    render(){

        const ccTypes = ContractClassTypes.map((cc,idx)=>{
            return <label className="radio-inline">
            <input type="radio" name="inlineRadioOptions" 
                checked={cc==this.state.classification}
                onChange={(e)=>{
                    this.setState({
                        classification:e.currentTarget.value
                    })
                }}
                value={cc} key={idx} />{cc}
          </label>
        })

        let counterParty = <div className="form-group">
            <label className="col-md-2 control-label">Others</label>
            <div className="col-md-4">
                <input className="form-control" type="text"/>
            </div>
        </div>
        switch (this.state.classification) {
            case "Customer":
                counterParty =  <div className="form-group">
                    <label className="col-md-4 control-label">Customers</label>
                    <div className="col-md-8">
                    <CustomerDropdown onChange={()=>{}} value=""  />
                    </div>
                   </div>
                break;
            
            case "Entity":
                counterParty =  <div className="form-group">
                    <label className="col-md-4 control-label">Interplex</label>
                    <div className="col-md-8">
                    <EntityDropdown onChange={()=>{}} value=""  />
                    </div>
                   </div>
                break;
            case "Vendor":
                 counterParty = <div className="form-group">
                        <label className="col-md-4 control-label">Supplier</label>
                        <div className="col-md-8">
                        <SupplierDropdown onChange={()=>{}} value=""  />
                        </div>
                    </div>
                    break;
            default:
                break;
        }

        return <div className="form form-horizontal">
            <div className="form-group">
                {ccTypes}
            </div>
                {counterParty}
        </div>
    }
}

