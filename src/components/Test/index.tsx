import * as React from "react";
import IConnectSupplierApi from "../../api/iconnectSupplierApi";
import LegalWebApi from "../../api/LegalWebApi";



export namespace UploadSupplierOnline {
    export interface Props {

    }

    export interface State {
        userid:number;
        source:any[];
    }
}

class UploadSupplierOnline extends React.Component<UploadSupplierOnline.Props,UploadSupplierOnline.State>{
    constructor(props){
        super(props);

        this.state = {
            userid:_spPageContextInfo.userId,
            source:[]
        }

        this.refresh = this.refresh.bind(this);
        this.handleProcess = this.handleProcess.bind(this);
        this.executeImport = this.executeImport.bind(this);

    }

    async refresh(){
        const param = `?$filter=startswith(Title,'A')&$top=1&&$orderBy=Title`
        IConnectSupplierApi.GetSuppliersParam(param)
        .then((data)=>{
            this.setState({
                source:data.d.results
            })
        })
    }

    handleProcess(){
        const myPromises = this.state.source.map((supplier,idx)=>{
            return LegalWebApi.AddSupplierCounterPartyMaster({
                Title:supplier.Title,
                Code:supplier.VendorCode,
                ClassificationId:2
            })
        })
        
        Promise.all(myPromises)
            .then(()=>{
                alert('done')
            })
        
    }

    executeImport(){
        // const chars = "0123456789abcdefghiklmnopqrstuvwxyz";
        const chars = "0123456789abc";
        
        chars.split('').map((mchar)=>{
            let param = `?$filter=startswith(Title,'${mchar.toUpperCase()}')&$top=100&&$orderBy=Title`
            IConnectSupplierApi.GetSuppliersParam(param)
            .then((data)=>{
                // console.log(data.d.results.length)
                const myPromises = data.d.results.map((supplier,idx)=>{
                    return LegalWebApi.AddSupplierCounterPartyMaster({
                        Title:supplier.Title,
                        Code:supplier.VendorCode,
                        ClassificationId:2
                    })
                })

                Promise.all(myPromises)
                    .then(()=>{
                        console.log(`Done ${mchar}`)
                    })

            })
        })
    }

    render(){

        const updateBtn = this.state.source.length > 0 ? <button
        className="btn btn-success" type="button" onClick={this.handleProcess}>Update</button> : null;
        return <div>
            <h4>SP Online Supplier Master</h4>
            
            <button type="button" className="btn btn-primary" onClick={this.refresh}>Get</button>
            {updateBtn}
        </div>
    }
}

export default UploadSupplierOnline;