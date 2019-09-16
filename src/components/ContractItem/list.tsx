import * as React from 'react';

import ContractItem from '.';
import { ContractRelatedItem } from './item';
import MyUtility from '../../utility';
import { homePagePath, pagePath } from '../../constants/config';
import LegalWebApi from '../../api/LegalWebApi';


export namespace ContractRelatedList {
    export interface Props {
        isBind:boolean;
        docs:number[];
        OnDelete:(e)=>void;
    }

    export interface State {
        docs:number[];
    }
}


export class ContractRelatedList extends React.Component<ContractRelatedList.Props,ContractRelatedList.State>{
    constructor(props){
        super(props);

        this.handleDelete = this.handleDelete.bind(this)
        this.handleView = this.handleView.bind(this);

        this.state = {
            docs:this.props.docs
        }
    }


    static getDerivedStateFromProps(props:ContractRelatedList.Props,state:ContractRelatedList.State){
        if(props.docs != state.docs){
            return {
                docs:props.docs
            }
        }

        return null;
    }

    handleDelete(e){
        if(this.props.isBind){
           MyUtility.MyConfirmationAlert()
            .then((result)=>{
                if(result.value){
                  this.props.OnDelete(e)
                }
            })
        }
        else 
        {
            this.props.OnDelete(e)
        }
    }

    handleView(e){
        if(this.props.isBind)
        {
            LegalWebApi.GetContractRelated(e)
                .then((childfile)=>{
                    window.open(`${pagePath}/edit/${childfile.ChildDocumentId}`,"_blank")
                })
        }
        else
        {
            window.open(`${pagePath}/edit/${e}`,"_blank")
        }
    }


    

    render(){
        return  <ul className="list-group">
                        {this.state.docs.map((file,idx)=>{
                            return <li className="list-group-item" key={idx}>
                                <ContractRelatedItem key={idx} id={file} isBind={this.props.isBind}  />
                                <div className="row">
                                    <div className="pull-right">
                                            <button type="button"  
                                            onClick={(e)=>{this.handleView(file)}}
                                            className="btn btn-default">
                                                View
                                            </button>

                                            <button type="button"  
                                            onClick={(e)=>{this.handleDelete(this.props.isBind ? file : idx)}}
                                            className="btn btn-danger">
                                                Delete
                                            </button>
                                    </div> 
                                </div>
                            </li>
                        })}
                    </ul>
    }
}