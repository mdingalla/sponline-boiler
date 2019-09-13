import * as React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { BootstrapTableOptions } from '../../constants/config';
import { ListDataAsStreamResult } from '../../../types/models';


const columns = [
    {
        dataField:'Id',
        text:'Id'
    },
    {
        dataField:'IPXEntityName',
        text:'Entity'
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
    }
]

const SearchResultPanel = (props)=>{
    return <div className="row">
<BootstrapTable 
            keyField='Id' data={props.data} columns={columns} 
            // expandRow={expandRow}
            // rowEvents={ this.rowEvents }
            // selectRow={selectRow}
            pagination={ paginationFactory(BootstrapTableOptions) } />
    </div>
}


export default SearchResultPanel;