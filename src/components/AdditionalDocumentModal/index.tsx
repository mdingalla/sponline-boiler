import * as React from "react";
import * as Modal from "react-bootstrap/lib/Modal";
import { ContractClassification, ReactSelectValue } from "../../../types/models";
import { ContractClassTypes, EmptyReactSelectValue, Others } from "../../constants/config";
import SupplierDropdown from "../SupplierDropdown";
import EntityDropdown from "../EntityDropdown";
import CustomerDropdown from "../CustomerDropdown";
import ContractForm from "../ContractForm";
import { Tabs, Tab } from "react-bootstrap";
import SearchForm from "../SearchForm";

export namespace AdditionalDocumentDialog {
    export interface Props {
        id?:number;
        OnSelect:(e)=>void;
        OnClose:()=>void;

    }

    export interface State {
        
        value:any;
    }
}


export default class AdditionalDocumentDialog extends React.Component<AdditionalDocumentDialog.Props,AdditionalDocumentDialog.State>{
    constructor(props){
        super(props);

        this.state = {
            value:null
        }

        this.handleOK = this.handleOK.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }

    handleOK(){
        
            this.props.OnSelect(this.state)
        
        
    }

    handleCancel(){
        this.props.OnClose();
    }


    render(){

        return <React.Fragment>
            <Modal.Body>
            <SearchForm/>
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

