import * as React from 'react';
import * as ReactDOM from 'react-dom';
import  {Select,Async,Creatable,AsyncCreatable}  from 'react-select/lib';
import 'react-select/dist/react-select.css';
import { sp,Web } from "@pnp/sp";
import { SPOnPremise } from '../../constants/config';
import IConnectSupplierApi from '../../api/iconnectSupplierApi';




export namespace SupplierClassificationDropdown {
    export interface Props {
        value:any;
        onChange:(e)=>void;
    }

    export interface State {
        value:any;
    }
}

class SupplierClassificationDropdown extends React.Component<SupplierClassificationDropdown.Props,SupplierClassificationDropdown.State> {
    constructor(props){
        super(props);

        this.selectChange = this.selectChange.bind(this);
        this.getOptions = this.getOptions.bind(this);

        this.state = {
            value:this.props.value
        }

    }

    // getOptions(input, callback) {
    //     let pvalue = this.props.value;
    //     setTimeout(function() {
    //       let filter = input && input.length > 0 ? " Title eq '" + input + "' or substringof('" + input + "',Description)" : "";
        
    //       let plants = sitecolweb.lists.getByTitle('PlantMaster')
    //       .items.filter(filter)
    //       .orderBy('Title')
    //       .get();
    //       plants.then((data)=>{
    //           let results = data.map((item)=>{
    //             return { value: item.Id, label:`${item.Title} - ${item.Description}`}
    //           });
    //           callback(null, {
    //               options: results,
    //               complete: true,
    //           });
    //       })

    //     }, 500);
    // };

    getOptions(input, callback) {
        let pvalue = this.props.value;
        setTimeout(function() {
        
          const filter = input && input.length > 0 ? `Title eq '${input}' or substringof('${input}',Title)` : "";
            

          IConnectSupplierApi.GetSupplierClassification(filter)
            .then((data)=>{
                let results = data.d.results.map((item)=>{
                    return { value: item.Title, label:`${item.Title}`}
                  });
                  callback(null, {
                      options: results,
                      complete: true,
                  });
            })


        }, 500);
    };

    selectChange(e){
        // console.log('Customer Select selectChange' + JSON.stringify(e))
        //
        this.setState({
            value:e
        },()=>{  this.props.onChange(e); })
    }

    // componentWillReceiveProps(nextProps:SupplierClassificationDropdown.Props){
    //     if(nextProps != this.props)
    //     {
    //         this.setState({
    //             value:nextProps.value
    //         });
    //     }
    // }


    static getDerivedStateFromProps(props:SupplierClassificationDropdown.Props,state:SupplierClassificationDropdown.State){
        if(props.value != state.value)
        {
            return {
                value:props.value
            } as SupplierClassificationDropdown.State
        }
        return null;
    }

    render(){
        return (
            <Async name="form-field-name"
        value={this.state.value}
        onChange={e => this.selectChange(e)}
        autoload={true}
        loadOptions={this.getOptions}
        // allowCreate={true}
        ignoreCase={true}
        ref="selSupplierClassifiationDropdown" />
        )
    }
}

export default SupplierClassificationDropdown;