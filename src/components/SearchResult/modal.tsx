import * as React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { BootstrapTableOptions } from '../../constants/config';
import { ListDataAsStreamResult } from '../../../types/models';
import CounterPartyLabel from '../CounterPartyControl/label';


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
    }
    // {
    //     dataField:'EffectiveDate',
    //     text:'EffectiveDate'
    // },
    // {
    //     dataField:'ExpiryDate',
    //     text:'ExpiryDate'
    // },
    // {
    //     dataField:'Function',
    //     text:'Function'
    // }
]

// const SearchModalResultPanel = (props)=>{
//     const selectRow = {
//         mode: 'checkbox',
//       clickToSelect: true,
//       selected: this.state.selected,
//     //   onSelect: this.handleOnSelect,
//     //   onSelectAll: this.handleOnSelectAll
//       };

//     return <div className="row-fluid">
//         <BootstrapTable 
//             keyField='Id' data={props.data} columns={columns} 
//             // expandRow={expandRow}
//             // rowEvents={ this.rowEvents }
//             selectRow={selectRow}
//             pagination={ paginationFactory({
//                 ...BootstrapTableOptions,
//                 sizePerPageList: [{
//                     text: '5', value: 5
//                   }, {
//                     text: '10', value: 10
//                   }]
//             }) } />
//     </div>
// }


// export default SearchModalResultPanel;


export namespace SearchModalResultPanel{
    export interface Props {
        data:any[];
        OnSelect:(e:any[])=>void;
    }

    export interface State {
        selected:any[]
        data:any[]
    }
}


export default class SearchModalResultPanel extends React.Component<SearchModalResultPanel.Props,SearchModalResultPanel.State>{
    constructor(props){
        super(props);

        this.state = {
            data:this.props.data,
            selected:[]
        }
    }

    static getDerivedStateFromProps(props:SearchModalResultPanel.Props,state:SearchModalResultPanel.State){
        if(props.data != state.data){
            return {
                data:props.data
            } as SearchModalResultPanel.State
        }
        return null
    }

    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
          this.setState(() => ({
            selected: [...this.state.selected, row.Id],
        }),()=> this.props.OnSelect(this.state.selected));
        } else {
          this.setState(() => ({
            selected: this.state.selected.filter(x => x !== row.Id),
          }),()=> this.props.OnSelect(this.state.selected));
        }
       
      }
    
      handleOnSelectAll = (isSelect, rows) => {
        const ids = rows.map(r => r.Id);
        if (isSelect) {
          this.setState(() => ({
            selected: ids
          ,}),()=> this.props.OnSelect(this.state.selected));
        } else {
          this.setState(() => ({
            selected: []
          ,}),()=> this.props.OnSelect(this.state.selected));
        }
      }


    render(){
        const selectRow = {
                    mode: 'checkbox',
                  clickToSelect: true,
                  selected: this.state.selected,
                  onSelect: this.handleOnSelect,
                  onSelectAll: this.handleOnSelectAll
                  };
            
                return <div className="row-fluid">
                    <BootstrapTable 
                        keyField='Id' data={this.state.data} columns={columns} 
                        // expandRow={expandRow}
                        // rowEvents={ this.rowEvents }
                        selectRow={selectRow}
                        pagination={ paginationFactory({
                            ...BootstrapTableOptions,
                            sizePerPageList: [{
                                text: '5', value: 5
                              }, {
                                text: '10', value: 10
                              }]
                        }) } />
                </div>
    }
}

