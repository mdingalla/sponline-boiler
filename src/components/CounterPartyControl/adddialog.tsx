import * as React from "react";
import  * as Modal  from "react-bootstrap/lib/Modal";
import { ContractClassTypes, Others, EmptyReactSelectValue, Entity, Vendor, Customer } from "../../constants/config";
import ParentCounterPartyDropdown from "../ParentCounterPartyDropdown";
import { ReactSelectValue } from "../../../types/models";
import LegalWebApi from "../../api/LegalWebApi";
import SupplierClassificationDropdown from "../SupplierDropdown/classification";


export namespace CounterPartyAddDialog {
    export interface Props {
        showModal:boolean;
        OnClose:()=>void;
        classification:string;
        OnSelect:(e)=>void;
    }

    export interface State {
        classification:string;
        value:string;
        businessType:string;
        parent:ReactSelectValue;
    }
}


export class CounterPartyAddDialog extends React.Component<CounterPartyAddDialog.Props,CounterPartyAddDialog.State> {
    constructor(props:CounterPartyAddDialog.Props){
        super(props);

        this.state = {
            classification:props.classification || Vendor,
            value:"",
            parent:EmptyReactSelectValue,
            businessType:""
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.handleOK = this.handleOK.bind(this)
    }

    static getDerivedStateFromProps(props:CounterPartyAddDialog.Props,state:CounterPartyAddDialog.State){
        if(props.classification != state.classification){
            return {
                classification:props.classification
            } as CounterPartyAddDialog.State
        }
        return null;
    }

    async handleOK(){
        let parent = null;
        let isNewParent = false;

        if(this.state.parent.label)
        {
             isNewParent = isNaN(parseInt(this.state.parent.value));
            if(isNewParent){
                const dataparent = await LegalWebApi.AddCounterPartyParent({
                    Title:this.state.parent.label
                })

                parent  = dataparent.data.Id;
            }
            else 
            {
                parent = this.state.parent.value
            }
        }

        if(!this.state.value) return;

        const cp = await LegalWebApi.AddCounterParty({
            Title:this.state.value,
            BusinessType:this.state.businessType,
            ParentCounterPartyId:parent,
            ClassificationId:this.state.classification == Customer ? 1 : 2
        })

        this.props.OnSelect(cp.data.Id)


        
    }

    handleCancel(){
        this.props.OnClose()
    }

    render(){
        const ccTypes = ContractClassTypes.filter(x=>x!= Others && x!= Entity).map((cc,idx)=>{
            return <label className="radio-inline" key={`lbl${idx}`}>
            <input type="radio" name="inlineRadioOptions" 
                checked={cc==this.state.classification}
                onChange={(e)=>{
                    this.setState({
                        classification:e.currentTarget.value,
                        value:""
                    })
                }}
                value={cc} key={idx} />{cc}
          </label>
        })

        const busType = this.props.classification != Vendor ? <input className="form-control" type="text" value={this.state.businessType} onChange={(e)=>this.setState({
            businessType:e.currentTarget.value
        })} /> : <SupplierClassificationDropdown 
        value={this.state.businessType} onChange={(e:ReactSelectValue)=>{
            this.setState({
                businessType:e.value
            })
        }} />
        
        
        return <Modal  bsSize="large"
        aria-labelledby="contained-modal-title-lg"
        show={this.props.showModal}
        onHide={this.props.OnClose} >
            <Modal.Header>
                <h4>Add Counter Party Master</h4>
            </Modal.Header>
            <Modal.Body className="form form-horizontal" >
            <div className="form-group">
                   <label className="control-label col-md-4">Classification</label>
                   <div className="col-md-8">
                   {ccTypes}
                   </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-md-4">
                        Parent
                    </label>
                    <div className="col-md-8">
                        <ParentCounterPartyDropdown value={this.state.parent} onChange={(e)=>this.setState({
                            parent:e
                        })
                        } />
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-md-4">
                        Counter Party
                    </label>
                    <div className="col-md-8">
                    <input className="form-control" type="text" value={this.state.value} onChange={(e)=>this.setState({
                        value:e.currentTarget.value
                    })} />
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-md-4">
                        Business Type
                    </label>
                    <div className="col-md-8">
                    {busType}
                    </div>
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
        </Modal>
    }
}