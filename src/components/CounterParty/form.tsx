import * as React from 'react';
import * as Modal from "react-bootstrap/lib/Modal";
import { ContractClassification } from '../../../types/models';
import { Vendor, Customer, Entity } from '../../constants/config';


export namespace CounterPartyModalForm {
    export interface Props {
        classification:ContractClassification;
        OnSave:(e:CounterPartyModalForm.State)=>void;
        OnCancel:()=>void;
        formdata:CounterPartyModalForm.State;
        isEdit:boolean;
    }
    export interface State {
        id?:number;
        parent?:string;
        businessType?:string;
        counterparty:string;
        code?:string;
    }
}


export class CounterPartyModalForm extends React.Component<CounterPartyModalForm.Props,
    CounterPartyModalForm.State>{
        constructor(props){
            super(props);

            this.handleSave = this.handleSave.bind(this);

            this.state = {
                id:this.props.formdata.id,
                businessType:this.props.formdata.businessType || '',
                code:this.props.formdata.code || '',
                counterparty:this.props.formdata.counterparty || '',
                parent:this.props.formdata.parent || ''
            }
        }

        handleSave(){
            this.props.OnSave(this.state)
        }

        static getDerivedStateFromProps(props:CounterPartyModalForm.Props,state:CounterPartyModalForm.State){
            if(props.formdata != state && props.isEdit){
                return {
                    ...props.formdata
                } as CounterPartyModalForm.State
            }
            return null;
        }

        render(){

            const businessType = this.props.classification==Vendor || this.props.classification == Customer ? <div className="form-group">
                <label className="control-label col-md-4">
                    Business Type/Segment:
                </label>
                <div className="col-md-8">
                    <input type="text" className="form-control"
                    value={this.state.businessType} onChange={(e)=>this.setState({
                        businessType:e.currentTarget.value
                    })} />
                </div>
            </div> : null;


            const Parent = this.props.classification==Entity || this.props.classification == Customer ? <div className="form-group">
                <label className="control-label col-md-4">
                    Parent
                </label>
                <div className="col-md-8">
                   
                </div>
            </div> : null;


            return <React.Fragment>
                <Modal.Body>
                        <div className="form form-horizontal">
                            {Parent}

                            <div className="form-group">
                                <label className="control-label col-md-4">
                                    Name:
                                </label>
                                <div className="col-md-8">
                                    <input type="text" className="form-control"
                                    value={this.state.counterparty} onChange={(e)=>this.setState({
                                        counterparty:e.currentTarget.value
                                    })} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label col-md-4">
                                    Code:
                                </label>
                                <div className="col-md-8">
                                    <input type="text" className="form-control"
                                    value={this.state.code} onChange={(e)=>this.setState({
                                        code:e.currentTarget.value
                                    })} />
                                </div>
                            </div>

                            {businessType}


                    </div>
            </Modal.Body>
            <Modal.Footer>
            <div>
                    <button type="button" onClick={this.handleSave}
                     className="btn btn-success">Ok</button>
                    <button type="button" onClick={this.props.OnCancel}
                     className="btn btn-danger">Cancel</button>
                </div>
            </Modal.Footer>
            </React.Fragment>
            
           
        }
    }