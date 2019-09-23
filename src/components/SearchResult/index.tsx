import * as React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { BootstrapTableOptions, pagePath, editPagePath } from '../../constants/config';
import { ListDataAsStreamResult } from '../../../types/models';
import * as ContractActions from "../../actions/contract";
import CounterPartyLabel from '../CounterPartyControl/label';

export namespace SearchResultPanel {
    export interface Props {
        data:any[];
        contractactions: typeof ContractActions;
    }

    
}

const columns = (props:SearchResultPanel.Props)=>  [
    {
        dataField:'Id',
        text:'Id'
    },
    {
        dataField:'IPXEntityName',
        text:'Entity'
    },
    {
        dataField:'ccp',
        text:'CounterParty',
        isDummyField: true,
        formatter:(cellContent,row) => {
            return (<div>
                <CounterPartyLabel contractId={row.Id} />
            </div>)
        }
    },
    {
        dataField:'Classification',
        text:'Classification'
    },
    {
        dataField:'ContractType',
        text:'ContractType'
    },
    {
        dataField:'ContractCategoryName',
        text:'Category'
    },
    {
        dataField:'EffectiveDate',
        text:'EffectiveDate'
    },
    {
        dataField:'ExpiryDate',
        text:'ExpiryDate'
    },
    {
        dataField:'Function',
        text:'Function'
    },
    {
        dataField: 'df1',
        isDummyField: true,
        text: 'Action',
        formatter: (cellContent, row) => {
            if (row.Id) {
              return (
                <div>
                    {/* <button type="button" 
                    onClick={()=>{props.contractactions.NavigateContractPage(row.Id)}}
                    className="btn btn-default" aria-label="Left Align">
                        <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                        </button> */}

                    <a className="btn btn-default" aria-label="Left Align" 
                        target="_blank"
                    href={`${editPagePath}${row.Id}`}>
                    <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                    </a>
                </div>
              );
            }
          }
    }
]




const SearchResultPanel = (props:SearchResultPanel.Props)=>{
    return <div className="row">
<BootstrapTable 
            keyField='Id' data={props.data} columns={columns(props)} 
            // expandRow={expandRow}
            // rowEvents={ this.rowEvents }
            // selectRow={selectRow}
            pagination={ paginationFactory(BootstrapTableOptions) } />
    </div>
}


export default SearchResultPanel;