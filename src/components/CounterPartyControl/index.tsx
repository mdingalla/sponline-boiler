import * as React from 'react';
import SupplierDropdown from '../SupplierDropdown';
import EntityDropdown from '../EntityDropdown';
import CustomerDropdown from '../CustomerDropdown';
import { ReactSelectValue, CounterParty, ContractClassification, CounterPartyControlState } from '../../../types/models';
import { EmptyReactSelectValue, Vendor, Others, Entity } from '../../constants/config';
import SupplierClassificationDropdown from '../SupplierDropdown/classification';
import { CounterPartyAddDialog } from './adddialog';
import LegalWebApi from '../../api/LegalWebApi';

export namespace CounterPartyControl {
    export interface Props {
        showDelete?:boolean;
        classification:string;
        selectedValue:any;
        selectedBusinessType:any;
        onChange:(e:CounterPartyControlState)=>void;
        id:number;
        spId?:number;
        onDelete:(e:CounterPartyControlState)=>void;
        isAdmin?:boolean;
    }

    export interface State extends CounterPartyControlState {
        showAdd:boolean;
    }

    
}

export default class CounterPartyControl extends React.Component<CounterPartyControl.Props,CounterPartyControl.State>{
    constructor(props){
        super(props);

        this.state = {
            selectedBusinessType:this.props.selectedBusinessType,
            selectedValue:this.props.selectedValue,
            id:this.props.id,
            spId:this.props.spId,
            showAdd:false
            // selectedValue: !this.props.classification || this.props.classification == Others ?  "" : EmptyReactSelectValue
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handlebusinessType = this.handlebusinessType.bind(this);
        this.handleOnAdd = this.handleOnAdd.bind(this);
    }

    // static getDerivedStateFromProps(props:CounterPartyControl.Props,state:CounterPartyControlState){
    //     if(props.id != state.id){

    //     }
    // }

    componentWillReceiveProps(nextProps:CounterPartyControl.Props){
        if(nextProps.classification != this.props.classification){
            this.setState({
                selectedValue:nextProps.classification == Others ? "" : EmptyReactSelectValue,
                selectedBusinessType:nextProps.classification != Vendor ? "" : EmptyReactSelectValue
            })
        }
        if(nextProps.selectedValue != this.props.selectedValue ||
            nextProps.selectedBusinessType != this.props.selectedBusinessType){
            this.setState({
                selectedValue:nextProps.selectedValue,
                selectedBusinessType:nextProps.selectedBusinessType
            })
        }
    }

    handleOnChange(value){
        this.setState({
            ...this.state,
            selectedValue:value
        },()=>{
            this.props.onChange(this.state)
        })
    }

    handlebusinessType(e){
        this.setState({
            ...this.state,
            selectedBusinessType:e
        },()=>{
            // const busType = e as ReactSelectValue;
            // if(busType){
                this.props.onChange(this.state)
            // }
        })

       
    }

    handleOnAdd(e){
        if(e)
        {
            // console.log(e);
            LegalWebApi.GetCounterPartyMaster(e)
                .then((cpm)=>{
                    this.setState({
                        selectedBusinessType:this.props.classification == Vendor ? {
                            value:cpm.BusinessType,
                            label:cpm.BusinessType
                        } : cpm.BusinessType,
                        selectedValue:{
                            value:cpm.Id,
                            label:cpm.Title
                        },
                        showAdd:false
                    },()=>{
                        this.props.onChange(this.state)
                    })
                })
           
        }
        else
        {
            this.setState({
                showAdd:false
            })
        }
        
    }


    render(){

        const addBtn = this.props.isAdmin &&
      this.props.classification &&  this.props.classification != Others && this.props.classification != Entity ? <a onClick={()=>this.setState({
            showAdd:true
        })}><span className="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span></a> : null;

        let counterParty = <React.Fragment>
        <label className="col-md-2 control-label">Others {addBtn}</label>
        <div className="col-md-4">
            <input className="form-control"
                onChange={(e)=>{this.handleOnChange(e.currentTarget.value)}}
             type="text" value={this.state.selectedValue} />
        </div>
        </React.Fragment>

        let counterPartyClassification = <input type="text" 
        onChange={(e)=>{this.handlebusinessType(e.currentTarget.value)}}
        value={this.state.selectedBusinessType}
        className="form-control"/>;

        


        switch (this.props.classification) {
            case "Customer":
                counterParty =  <React.Fragment>
                    <label className="col-md-2 control-label">Customers {addBtn}</label>
                    <div className="col-md-4">
                    <CustomerDropdown onChange={this.handleOnChange}
                    value={this.state.selectedValue}  />
                    </div>
                    </React.Fragment>
                break;
            
            case "Entity":
                counterParty =  <React.Fragment>
                    <label className="col-md-2 control-label">Interplex {addBtn}</label>
                    <div className="col-md-4">
                    <EntityDropdown onChange={this.handleOnChange}
                    value={this.state.selectedValue} />
                    </div>
                    </React.Fragment>
                break;
            case "Vendor":
                 counterParty = <React.Fragment>
                        <label className="col-md-2 control-label">Supplier {addBtn}</label>
                        <div className="col-md-4">
                        <SupplierDropdown onChange={this.handleOnChange}
                        value={this.state.selectedValue}  />
                        </div>
                    </React.Fragment>

                counterPartyClassification = <SupplierClassificationDropdown 
                value={this.state.selectedBusinessType} onChange={this.handlebusinessType} />
                    break;
            default:
                break;
        }

        const deleteBtn = this.props.showDelete ? <span className="input-group-btn">
            <button type="button" 
            onClick={()=>{this.props.onDelete(this.state)}}
            className="btn btn-danger">
            <span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button> 
        </span> : null;

        const businessType =  this.props.showDelete ? <React.Fragment>
            <label className="col-md-2 control-label">Business Type</label>
            <div className="col-md-4">
            <div className="input-group">
            {counterPartyClassification}{deleteBtn}
            </div>
            </div>
            </React.Fragment> : <React.Fragment>
                <label className="col-md-2 control-label">Business Type</label>
            <div className="col-md-4">
                {counterPartyClassification}
                </div>
            </React.Fragment>

        
        return <React.Fragment>
            <CounterPartyAddDialog showModal={this.state.showAdd} 
            classification={this.props.classification}
            OnSelect={this.handleOnAdd}
             OnClose={()=>{this.setState({
                 showAdd:false
             })}} />
            {counterParty}
            {businessType}
        </React.Fragment>

    }
}