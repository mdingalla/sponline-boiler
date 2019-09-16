import * as React from 'react';
import LegalWebApi from '../../api/LegalWebApi';
import contract from '../../reducers/contract';

export namespace ContractRelatedItem {
    export interface Props {
        id:number;
        isBind:boolean;
    }

    export interface State {
        contract:any;
    }
}

export class ContractRelatedItem extends React.Component<ContractRelatedItem.Props,ContractRelatedItem.State> {
    isCancelled: any;
    constructor(props){
        super(props);

        this.refresh = this.refresh.bind(this);

        this.state = {
            contract:{
                Name:''
            }
        }
    }

    refresh(){

        const myrequest = this.props.isBind ? LegalWebApi.GetContractRelatedChildFile(this.props.id) :
            LegalWebApi.GetContractDataFile(this.props.id);

        myrequest.then((contract)=>{
            !this.isCancelled && this.setState({
                contract:contract
            })
        })
    }

    componentDidMount(){
       this.refresh()
    }
    
    componentDidUpdate(prevProps:ContractRelatedItem.Props,prevState:ContractRelatedItem.State){
        if(prevProps.id != this.props.id){
           this.refresh()
        }
    }

    render(){
        return <div>
        <label>{this.state.contract.Name} {this.props.id}</label>
    </div>
    }

}


