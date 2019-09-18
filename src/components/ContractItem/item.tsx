import * as React from 'react';
import LegalWebApi from '../../api/LegalWebApi';
import contract from '../../reducers/contract';

export namespace ContractRelatedItem {
    export interface Props {
        id:number;
        isBind:boolean;
        isParent:boolean;
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
                },
                EffectiveDate:'',
                ExpiryDate:''
            }
        }
    }

    async refresh(){


        let DocId = this.props.id;

        if(!DocId) return;

        if(this.props.isBind)
        {
            const childfile = await LegalWebApi.GetContractRelatedChild(this.props.id);
            DocId = this.props.isParent ? childfile.ChildDocumentId : childfile.ParentId;
        }
        
        const myrequest = LegalWebApi.GetContractDataFile(DocId);
       
        myrequest.then((contract)=>{
            const mylist = LegalWebApi.GetContractData(DocId);
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

    static getDerivedStateFromProps(props:ContractRelatedItem.Props,state:ContractRelatedItem.State){
        
        return null;
    }

    render(){
        return <div>
        <h4>
            <label className="label label-primary">{this.state.contract.ContentType.Name}</label>
            <label className="label label-info">{this.state.file.Name}</label>
        </h4>
        <h5>
        <label className="label label-default">Effective Date:</label><label className="label label-success">{new Date(this.state.contract.EffectiveDate).format("dd/MM/yyyy")}</label>
         
        <label className="label label-default">Expiry Date:</label><label className="label label-danger">{new Date(this.state.contract.ExpiryDate).format("dd/MM/yyyy")}</label>
        </h5>


    </div>
    }

}


