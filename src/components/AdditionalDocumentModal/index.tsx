import * as React from "react";
import * as Modal from "react-bootstrap/lib/Modal";
import { ContractClassification, ReactSelectValue, ListDataAsStreamResult } from "../../../types/models";
import { ContractClassTypes, EmptyReactSelectValue, Others } from "../../constants/config";
import SupplierDropdown from "../SupplierDropdown";
import EntityDropdown from "../EntityDropdown";
import CustomerDropdown from "../CustomerDropdown";
import ContractForm from "../ContractForm";
import { Tabs, Tab } from "react-bootstrap";
import SearchForm from "../SearchForm";
import SearchModalResultPanel from "../SearchResult/modal";

export namespace AdditionalDocumentDialog {
    export interface Props {
        id?:number;
        OnSelect:(e)=>void;
        OnClose:()=>void;

    }

    export interface State {
        selected:any[];
        // value:any;
        data:any[];
    }
}


export default class AdditionalDocumentDialog extends React.Component<AdditionalDocumentDialog.Props,AdditionalDocumentDialog.State>{
    constructor(props){
        super(props);

        this.state = {
            // value:null,
            selected:[],
            data:[]
        }

        this.handleOK = this.handleOK.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSearchResult = this.handleSearchResult.bind(this);

    }

    handleOK(){
        
            this.props.OnSelect(this.state)
        
        
    }

    handleCancel(){
        this.props.OnClose();
    }

    handleSearchResult(e:ListDataAsStreamResult){
        this.setState({
            data:e.Row.map((x)=>{
              return {  
                Id:parseInt(x.ID),
                Classification:x.ContractClassification[0].lookupValue,
                ContractCategoryName:x.ContractCategory[0].lookupValue,
                ContractType:x.ContentType,
                EffectiveDate:x.EffectiveDate,
                ExpiryDate:x.ExpiryDate,
                Function:x.FunctionDept,
                IPXEntityName:x.IPXEntity[0].lookupValue
              } as ContractSummaryData
            })
          })
    }


    render(){
        const btnOK = this.state.selected.length > 0 ? <button type="button" onClick={this.handleOK}
        className="btn btn-success">Ok</button> : null;
        return <React.Fragment>
            <Modal.Body>
                <SearchForm OnDataLoad={this.handleSearchResult}/>
                <SearchModalResultPanel data={this.state.data} 
                OnSelect={(e)=>{this.setState({
                    selected:e
                })}}  />
            </Modal.Body>
            <Modal.Footer>
                <div>
                    {btnOK}
                    <button type="button" onClick={this.handleCancel}
                     className="btn btn-danger">Cancel</button>
                </div>
            </Modal.Footer>
        </React.Fragment>
    }
}

