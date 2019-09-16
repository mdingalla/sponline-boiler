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
        file:any;
    }
}

export class ContractRelatedItem extends React.Component<ContractRelatedItem.Props,ContractRelatedItem.State> {
    isCancelled: any;
    constructor(props){
        super(props);

        this.refresh = this.refresh.bind(this);

        this.state = {
            file:{
                Name:''
            },
            contract:{
                ContentType:{
                    Name:''
                }
            }
        }
    }

    refresh(){

        const myrequest = this.props.isBind ? LegalWebApi.GetContractRelatedChildFile(this.props.id) :
            LegalWebApi.GetContractDataFile(this.props.id);
       
        myrequest.then((contract)=>{
            const mylist = LegalWebApi.GetContractData(contract.ChildDocumentId);
            mylist.then((list)=>{
                !this.isCancelled && this.setState({
                    file:contract,
                    contract:list
                })
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
        <h5>
        <label className="label label-default">{this.state.file.Name}
         {/* {this.props.id} */}
        </label>

        <label className="label label-info">{this.state.contract.ContentType.Name}</label>
        </h5>


    </div>
    }

}


