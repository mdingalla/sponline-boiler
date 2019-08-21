import * as React from 'react';
import * as ReactDOM from 'react-dom';
import  {Select,Async,Creatable,AsyncCreatable}  from 'react-select/lib';
import 'react-select/dist/react-select.css';
import { sp,Web } from "@pnp/sp";
import { SPOnPremise } from '../../constants/config';

sp.setup({
  sp: {
    headers: {
      Accept: "application/json;odata=verbose",
    },

  },
});

let myWeb = new Web(_spPageContextInfo.webAbsoluteUrl);




export namespace ContractCategoryDropdown {
    export interface Props {
        value:any;
        onChange:(e)=>void;
    }

    export interface State {
        value:any;
    }
}

class ContractCategoryDropdown extends React.Component<ContractCategoryDropdown.Props,ContractCategoryDropdown.State> {
    constructor(props){
        super(props);

        this.selectChange = this.selectChange.bind(this);
        this.getOptions = this.getOptions.bind(this);

        this.state = {
            value:this.props.value
        }

    }

    getOptions(input, callback) {
        let pvalue = this.props.value;
        setTimeout(function() {
         
        
          let plants = myWeb.lists.getByTitle('Categories')
          .items
          .orderBy('Title')
          .get();
          plants.then((data)=>{
              let results = data.map((item)=>{
                return { value: item.KeyValue, label:`${item.Title}`}
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

    componentWillReceiveProps(nextProps:ContractCategoryDropdown.Props){
        if(nextProps != this.props)
        {
            this.setState({
                value:nextProps.value
            });
        }
    }

    render(){
        return (
            <Async name="form-field-name"
        value={this.state.value}
        onChange={e => this.selectChange(e)}
        autoload={true}
        loadOptions={this.getOptions}
        ignoreCase={true}
        ref="selContractCategory" />
        )
    }
}

export default ContractCategoryDropdown;