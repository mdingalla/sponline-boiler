import * as React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import { BootstrapTableOptions, pagePath, editPagePath } from '../../constants/config';
import { ContractClassification } from '../../../types/models';
import LegalWebApi from '../../api/LegalWebApi';


const columns = (props:CounterPartyList.Props)=> [
    {
        dataField:'Title',
        text:'Title'
    },
    {
        dataField:'ccp',
        text:'Action',
        isDummyField: true,
        formatter:(cellContent,row) => {
            return (<div>

                <button type="button" 
                onClick={()=>{
                    props.OnToggleEdit(row.Id)
                }}
                className="btn btn-primary">
                    Edit
                </button>

                {/* <button type="button" 
                onClick={()=>{
                    LegalWebApi.DeleteContractType(row.StringId)
                        .then((success)=>{
                            // console.log(success);
                            app.refresh();
                        }).catch((fail)=>{
                            // console.log(fail)
                            MySwal.fire('warning','Cannot delete the selected Content Type','warning')
                        })
                }}
                className="btn btn-danger">Delete</button> */}

               
            </div>)
        }
    },
]

export namespace CounterPartyList {
    export interface Props {
        classification:ContractClassification;
        OnToggleEdit:(id:number)=>void;
    }

    export interface State {
        data:any[]
    }
}


export  class CounterPartyList extends React.Component<CounterPartyList.Props,CounterPartyList.State>{
    isCancelled: any;
    constructor(props){
        super(props);

        this.state = {
            data:[]
        }

        this.refresh = this.refresh.bind(this)
    }

    refresh(){
        let query:Promise<any[]> = null;
        switch (this.props.classification) {
            case "Customer":
                query = LegalWebApi.GetCustomers();
                break;

            case 'Vendor':
                    query = LegalWebApi.GetVendors();
                    break;
        
            default:
                query = LegalWebApi.GetIPXEntities();
                break;
        }

        query.then((x)=>{
           !this.isCancelled && this.setState({
                data:x
            })
        })

        
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    componentDidMount(){
        this.refresh();
    }

    render(){
        return <div>


            <BootstrapTable 
            keyField='Id' data={this.state.data} columns={columns(this.props)} 
            // expandRow={expandRow}
            // rowEvents={ this.rowEvents }
            // selectRow={selectRow}
            pagination={ paginationFactory({
                BootstrapTableOptions,
                sizePerPageList: [{
                    text: '10', value: 10
                  }, {
                    text: '50', value: 50
                  }]
            }) } />

            <div>

            </div>
        </div>
    }
}