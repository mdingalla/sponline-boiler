import * as React from 'react';
import LegalWebApi from '../../api/LegalWebApi';


export namespace CounterPartyLabel {
    export interface Props {
        contractId:number
    }
    export interface State {
        label:string;
    }
}

export default class CounterPartyLabel extends React.Component<CounterPartyLabel.Props,CounterPartyLabel.State> {
    isCancelled: any;
    constructor(props){
        super(props);

        this.state = {
            label:''
        }
    }
    
    componentDidMount(){
        LegalWebApi.GetCounterPartiesByParentId(this.props.contractId)
            .then((ccp)=>{
                !this.isCancelled &&  this.setState({
                    label:ccp.reduce((prev,curr,idx)=>{
                        return idx == 0 ? curr.Title : `${prev}, ${curr.Title}`
                    },'')
                })
            })
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    render(){
        return <div>
            {this.state.label}
        </div>
    }
}