import * as React from 'react';
import SupplierDropdown from '../SupplierDropdown';
import EntityDropdown from '../EntityDropdown';
import CustomerDropdown from '../CustomerDropdown';
import { ReactSelectValue } from '../../../types/models';
import { EmptyReactSelectValue, Vendor, Others } from '../../constants/config';

export namespace CounterPartyControl {
    export interface Props {
        classification:string;
        value:any;
        onChange:(e)=>void;
    }

    export interface State {
        selectedValue?:any;
        selectedBusinessType?:string;

    }
}

export default class CounterPartyControl extends React.Component<CounterPartyControl.Props,CounterPartyControl.State>{
    constructor(props){
        super(props);

        this.state = {
            selectedBusinessType:'',
            selectedValue:this.props.value
            // selectedValue: !this.props.classification || this.props.classification == Others ?  "" : EmptyReactSelectValue
        }

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentWillReceiveProps(nextProps:CounterPartyControl.Props){
        if(nextProps.classification != this.props.classification){
            this.setState({
                selectedValue:EmptyReactSelectValue
            })
        }
        if(nextProps.value != this.props.value){
            this.setState({
                selectedValue:nextProps.value
            })
        }
    }

    handleOnChange(fld,value){
        this.setState({
            [fld]:value
        },()=>{
            this.props.onChange(this.state)
        })
    }


    render(){

        let counterParty = <React.Fragment>
        <label className="col-md-2 control-label">Others</label>
        <div className="col-md-4">
            <input className="form-control"
                onChange={(e)=>{this.handleOnChange('selectedValue',e)}}
             type="text" value={this.state.selectedValue} />
        </div>
        </React.Fragment>
        switch (this.props.classification) {
            case "Customer":
                counterParty =  <React.Fragment>
                    <label className="col-md-2 control-label">Customers</label>
                    <div className="col-md-4">
                    <CustomerDropdown onChange={(e)=>{this.handleOnChange('selectedValue',e)}}
                    value={this.state.selectedValue}  />
                    </div>
                    </React.Fragment>
                break;
            
            case "Entity":
                counterParty =  <React.Fragment>
                    <label className="col-md-2 control-label">Interplex</label>
                    <div className="col-md-4">
                    <EntityDropdown onChange={(e)=>{this.handleOnChange('selectedValue',e)}}
                    value={this.state.selectedValue} />
                    </div>
                    </React.Fragment>
                break;
            case "Vendor":
                 counterParty = <React.Fragment>
                        <label className="col-md-2 control-label">Supplier</label>
                        <div className="col-md-4">
                        <SupplierDropdown onChange={(e)=>{this.handleOnChange('selectedValue',e)}}
                        value={this.state.selectedValue}  />
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
                        <input type="text" 
                        onChange={(e)=>{this.handleOnChange('selectedBusinessType',e.currentTarget.value)}}
                        value={this.state.selectedBusinessType}
                        className="form-control"/>
                        </div>

        </React.Fragment>

    }
}