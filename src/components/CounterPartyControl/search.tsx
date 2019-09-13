import * as React from "react";
import * as Modal from "react-bootstrap/lib/Modal";
import { ContractClassification, ReactSelectValue } from "../../../types/models";
import { ContractClassTypes, EmptyReactSelectValue, Others } from "../../constants/config";
import SupplierDropdown from "../SupplierDropdown";
import EntityDropdown from "../EntityDropdown";
import CustomerDropdown from "../CustomerDropdown";

export namespace CounterPartySearch {
    export interface Props {
        OnChange:(e)=>void;

    }

    export interface State {
        classification:string;
        value:any;
    }
}


export default class CounterPartySearch extends React.Component<CounterPartySearch.Props,CounterPartySearch.State>{
    constructor(props){
        super(props);

        this.handleOther = this.handleOther.bind(this);

        this.state = {
            classification:"Vendor",
            value:EmptyReactSelectValue
        }

    }


    handleOther(e){
        this.setState({
            value:e
        },()=>this.props.OnChange(e))
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

        let counterParty = <div className="row">
            <label className="col-md-4 control-label"></label>
            <div className="col-md-8">
                <input className="form-control" type="text"
                onChange={(e)=>{this.handleOther(e.currentTarget.value)}}
                 value={this.state.value}/>
            </div>
        </div>
        switch (this.state.classification) {
            case "Customer":
                counterParty =  <div className="row">
                    <label className="col-md-4 control-label"></label>
                    <div className="col-md-8">
                    <CustomerDropdown onChange={(e)=>{this.setState({value:e},()=>{
                            this.props.OnChange(e)
                        })}} 
                    value={this.state.value}  />
                    </div>
                   </div>
                break;
            
            case "Entity":
                counterParty =  <div className="row">
                    <label className="col-md-4 control-label"></label>
                    <div className="col-md-8">
                    <EntityDropdown onChange={(e)=>{this.setState({value:e},()=>{
                            this.props.OnChange(e)
                        })}} 
                    value={this.state.value}  />
                    </div>
                   </div>
                break;
            case "Vendor":
                 counterParty = <div className="row">
                        <label className="col-md-4 control-label"></label>
                        <div className="col-md-8">
                        <SupplierDropdown onChange={(e)=>{this.setState({value:e},()=>{
                            this.props.OnChange(e)
                        })}} 
                        value={this.state.value}  />
                        </div>
                    </div>
                    break;
            default:
                break;
        }

        return <React.Fragment>
            <div className="row">
                <label className="col-md-4 control-label">Counter Party</label>

                <div className="col-md-8">
                {ccTypes}
                </div>
            </div>
                {counterParty}
        </React.Fragment>
    }
}

