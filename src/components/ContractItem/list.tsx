import * as React from 'react';

import ContractItem from '.';
import { ContractRelatedItem } from './item';
import MyUtility from '../../utility';


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


    

    render(){
        return  <ul className="list-group">
                        {this.state.docs.map((file,idx)=>{
                            return <li className="list-group-item" key={idx}>
                                <ContractRelatedItem key={idx} id={file} isBind={this.props.isBind}  />
                                <button type="button"  
                                    onClick={(e)=>{this.handleDelete(this.props.isBind ? file : idx)}}
                                    className="btn btn-danger">
                                    <span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button> 
                            </li>
                        })}
                    </ul>
    }
}