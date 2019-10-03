import * as React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;
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

                <button type="button" 
                onClick={()=>{
                   props.OnDelete(row.Id)
                }}
                className="btn btn-danger">Delete</button>

               
            </div>)
        }
    },
]

export namespace CounterPartyList {
    export interface Props {
        classification:ContractClassification;
        OnToggleEdit:(id:number)=>void;
        OnDelete:(id:number)=>void;
        modal:boolean;
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
            case "Parent":
                    query = LegalWebApi.GetParentConterParty();
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

    componentDidUpdate(){
        this.refresh();
    }

    componentDidMount(){
        this.refresh();
    }

    render(){
        return <div>
              <ToolkitProvider
                 keyField='Id' data={this.state.data} columns={columns(this.props)} 
                striped hover condensed
                >
                    {
                        props => (
                            <div>
                                <BootstrapTable 
                                 pagination={ paginationFactory({
                                    BootstrapTableOptions,
                                    sizePerPageList: [{
                                        text: '10', value: 10
                                      }, {
                                        text: '50', value: 50
                                      }]
                                }) }
                                { ...props.baseProps }
                                
                                />
                                <ExportCSVButton { ...props.csvProps }>CSV Export</ExportCSVButton>
                            </div>
                        )
                    }
                </ToolkitProvider>

            {/* <BootstrapTable 
            keyField='Id' data={this.state.data} columns={columns(this.props)} 
            striped hover condensed
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
            }) } /> */}

            <div>

            </div>
        </div>
    }
}