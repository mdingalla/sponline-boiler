import * as React from 'react';
import SupplierDropdown from '../SupplierDropdown';
import EntityDropdown from '../EntityDropdown';
import CustomerDropdown from '../CustomerDropdown';

export namespace CounterPartyControl {
    export interface Props {
        classification:string;
    }

    export interface State {

    }
}

export default class CounterPartyControl extends React.Component<CounterPartyControl.Props,CounterPartyControl.State>{
    constructor(props){
        super(props)
    }


    render(){

        let counterParty = <React.Fragment>
        <label className="col-md-2 control-label">Others</label>
        <div className="col-md-4">
            <input className="form-control" type="text"/>
        </div>
        </React.Fragment>
        switch (this.props.classification) {
            case "Customer":
                counterParty =  <React.Fragment>
                    <label className="col-md-2 control-label">Customers</label>
                    <div className="col-md-4">
                    <CustomerDropdown onChange={()=>{}} value=""  />
                    </div>
                    </React.Fragment>
                break;
            
            case "Entity":
                counterParty =  <React.Fragment>
                    <label className="col-md-2 control-label">Interplex</label>
                    <div className="col-md-4">
                    <EntityDropdown onChange={()=>{}} value=""  />
                    </div>
                    </React.Fragment>
                break;
            case "Vendor":
                 counterParty = <React.Fragment>
                        <label className="col-md-2 control-label">Supplier</label>
                        <div className="col-md-4">
                        <SupplierDropdown onChange={()=>{}} value=""  />
                        </div>
                    </React.Fragment>
                    break;
            default:
                break;
        }
        
        return <React.Fragment>
            {counterParty}
            <label className="col-md-2 control-label">Business Type</label>
                        <div className="col-md-4">
                        <input type="text" className="form-control"/>
                        </div>

        </React.Fragment>

    }
}