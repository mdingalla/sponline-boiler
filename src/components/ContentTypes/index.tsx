import * as React from 'react';
import Swal from 'sweetalert2'
import * as Modal from "react-bootstrap/lib/Modal";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import { BootstrapTableOptions, pagePath, editPagePath } from '../../constants/config';
import * as ContractActions from '../../actions/contract';

import LegalWebApi from '../../api/LegalWebApi';

const MySwal = Swal


export namespace ContentTypesPage {
    export interface Props {
        contractactions: typeof ContractActions;
    }

    export interface State {
        data:any[];
        showModal?:boolean;
        contenttype:string;
        issaving:boolean;
    }
}



const columns = (props:ContentTypesPage.Props,state:ContentTypesPage.State,app:ContentTypesPage) => [
    // {
    //     dataField:'StringId',
    //     text:'Id'
    // },
    {
        dataField:'Name',
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
                    LegalWebApi.DeleteContractType(row.StringId)
                        .then((success)=>{
                            // console.log(success);
                            app.refresh();
                        }).catch((fail)=>{
                            // console.log(fail)
                            MySwal.fire('warning','Cannot delete the selected Content Type','warning')
                        })
                }}
                className="btn btn-danger">Delete</button>
            </div>)
        }
    },
]

class ContentTypesPage extends React.Component<ContentTypesPage.Props,ContentTypesPage.State>{
    isCancelled: boolean;
    constructor(props){
        super(props);

        this.refresh = this.refresh.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleAddModal = this.handleAddModal.bind(this);
        this.handleModalSave = this.handleModalSave.bind(this);

        this.state ={
            data:[],
            contenttype:'',
            showModal:false,
            issaving:false
        }
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    componentDidMount(){
        this.refresh()
    }

    async refresh(){
        const ct = await LegalWebApi.GetContractContentTypes()
        !this.isCancelled && this.setState({
            data:ct.filter(x=>x.Name != 'Document' && x.Name != 'Folder' && x.Name != 'Document Set')
        })
    }

    handleModalClose(){
        this.setState({
            showModal:false
        })
    }

    handleAddModal(){
        this.setState({
            showModal:true
        })
    }

    handleModalSave(){
        
        if(!this.state.contenttype) return;

        this.setState({
            issaving:true
        },()=>{
            LegalWebApi.AddContractContentType(this.state.contenttype)
            .done((x)=>{
                if(x){
                    LegalWebApi.AddContentTypeToContract(this.state.contenttype)
                    .then((x)=>{
                        
                        this.setState({
                            showModal:false,
                            issaving:false
                        },()=>{
                            this.refresh()
                        })
                    })   
                }
            })
        })
        
      
    }

    render(){

        const MyModal = <Modal
                bsSize="large"
                aria-labelledby="contained-modal-title-lg"
                show={this.state.showModal}
                onHide={this.handleModalClose}>
                <Modal.Header closeButton>
                <Modal.Title>{this.state.issaving ? "Saving...." : "Counter Party"}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="form form-horizontal">
                        <div className="form-group">
                            <label className="col-md-4 control-label">
                                Content Type
                            </label>
                            <div className='col-md-8'>
                                <input type="text" className="form-control" 
                                onChange={(e)=>{this.setState({
                                    contenttype:e.currentTarget.value
                                })}}
                                value={this.state.contenttype} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                
                <Modal.Footer>
                    <button type="button" 
                    disabled={this.state.issaving}
                    onClick={this.handleModalSave}
                    className="btn btn-success">Save</button>
                    <button type="button" 
                    disabled={this.state.issaving}
                    onClick={this.handleModalClose}
                    className="btn btn-danger">Cancel</button>
                </Modal.Footer>
            </Modal>

        return <div className="col-md-12">
                {MyModal}
        <BootstrapTable 
            keyField='StringId' data={this.state.data} columns={columns(this.props,this.state,this)} 
            // expandRow={expandRow}
            // rowEvents={ this.rowEvents }
            // selectRow={selectRow}
            pagination={ paginationFactory(BootstrapTableOptions) } />

            <div>
                <button type="button" 
                onClick={this.handleAddModal}
                className="btn btn-primary">Add New Content Type</button>
            </div>

            <div className="row pull-right">
            <button type="button"
                            onClick={this.props.contractactions.NavigateHome}
                             className="btn btn-danger">Close</button>
            </div>
        </div>
    }
}

export default ContentTypesPage