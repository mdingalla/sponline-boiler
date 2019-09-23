import * as React from 'react';
import * as ReactDOM from 'react-dom';
import  {Select,Async,Creatable,AsyncCreatable}  from 'react-select/lib';
import 'react-select/dist/react-select.css';
import { sp,Web } from "@pnp/sp";
import { SPOnPremise } from '../../constants/config';
import * as _ from 'lodash';
import LegalWebApi from '../../api/LegalWebApi';


export namespace ParentCounterPartyDropdown {
    export interface Props {
        value:any;
        onChange:(e)=>void;
    }

    export interface State {
        value:any;
    }
}

class ParentCounterPartyDropdown extends React.Component<ParentCounterPartyDropdown.Props,ParentCounterPartyDropdown.State> {
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
          let filter = input && input.length > 0 ? `Title eq '${input}' or substringof('${input}',Title)` : "";
            

            LegalWebApi.GetParentConterParty(filter)
            .then((data)=>{

                let entities:any[] = data.map((i)=>{
                    return {
                        // CompanyCode:i.CompanyCode,
                        value:i.Id,
                        label:i.Title
                    }
                })
                // let x = _.uniqBy<any>(entities.filter(x=>x.EntityName),"CompanyCode");
                
                // let results = _.sortBy(x,'CompanyCode').map((item)=>{
                //     return { value: item.CompanyCode, label:`${item.CompanyCode} - ${item.EntityName}`}
                //   });
                  callback(null, {
                      options: entities,
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

    componentWillReceiveProps(nextProps:ParentCounterPartyDropdown.Props){
        if(nextProps != this.props)
        {
            this.setState({
                value:nextProps.value
            });
        }
    }

    render(){
        return (
            <AsyncCreatable name="form-field-name"
        value={this.state.value}
        onChange={e => this.selectChange(e)}
        autoload={true}
        loadOptions={this.getOptions}
        ignoreCase={true}
        ref="selParentCP" />
        )
    }
}

export default ParentCounterPartyDropdown;