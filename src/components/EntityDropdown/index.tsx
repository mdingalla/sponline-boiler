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
    baseUrl: SPOnPremise,

  },
});

let sitecolweb = new Web(SPOnPremise).configure({
    credentials: 'include',
                cache: 'no-cache',
                mode: 'cors',
                headers: {
                    Accept: 'application/json;odata=verbose',
                    // 'Content-Type': 'application/json', // will fail if provided
                    // 'X-ClientService-ClientTag': 'PnPCoreJS', // will fail if provided
                }
})




export namespace EntityDropdown {
    export interface Props {
        value:any;
        onChange:(e)=>void;
    }

    export interface State {
        value:any;
    }
}

class EntityDropdown extends React.Component<EntityDropdown.Props,EntityDropdown.State> {
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
          let filter = input && input.length > 0 ? " Title eq '" + input + "' or substringof('" + input + "',Description)" : "";
            

            fetch(`${SPOnPremise}/_api/web/lists/getbytitle('PlantMaster')/items?$filter=${filter}`,{
                credentials: 'include',
                method: 'GET',
                cache: 'no-cache',
                mode: 'cors',
                headers: {
                    Accept: 'application/json;odata=verbose',
                    // 'Content-Type': 'application/json', // will fail if provided
                    // 'X-ClientService-ClientTag': 'PnPCoreJS', // will fail if provided
                }
            })
            .then(r => r.json())
            .then((data)=>{
                let results = data.d.results.map((item)=>{
                    return { value: item.Id, label:`${item.Title} - ${item.Description}`}
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

    componentWillReceiveProps(nextProps:EntityDropdown.Props){
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
        ref="selPlantMaster" />
        )
    }
}

export default EntityDropdown;