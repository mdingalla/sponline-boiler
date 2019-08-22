import * as React from 'react';
// import { taxonomy, ITermStore, ITermGroup, ITermSet, ITermSetData, ITermGroupData, ILabelMatchInfo } from "@pnp/sp-taxonomy";
import * as ReactDOM from 'react-dom';
import  {Select,Async,Creatable,AsyncCreatable}  from 'react-select/lib';
import 'react-select/dist/react-select.css';
import { sp,Web, SortDirection } from "@pnp/sp";
import { SPOnPremise } from '../../constants/config';
import SPOnlineTermStore from '../../api/SPOnlineTermStore';

// sp.setup({
//   sp: {
//     headers: {
//       Accept: "application/json;odata=verbose",
//     },

//   },
// });


// taxonomy.setup({
//     sp: {
//         headers: {
//           Accept: "application/json;odata=verbose",
//         },
//         baseUrl:"https://interplexgroup.sharepoint.com/sites/Region/Corp/legal"
//       }
// })


export namespace DepartmentTermStoreDropdown {
    export interface Props {
        value:any;
        onChange:(e)=>void;
    }

    export interface State {
        value:any;
    }
}

class DepartmentTermStoreDropdown extends React.Component<DepartmentTermStoreDropdown.Props,DepartmentTermStoreDropdown.State> {
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

            // const labelMatchInfo: ILabelMatchInfo = {
            //     TermLabel: input,
            //     TrimUnavailable: true,
            // };
          
        //     const store: ITermStore = taxonomy.termStores.getByName("Taxonomy_+fbatXz7iODpxN/jrdHNtA==");
        //    const group =  store.getTermGroupById("30de891f-4b97-45ef-b143-95a6e3a75c0e");
        //    group.termSets.getById("8ed8c9ea-7052-4c1d-a4d7-b9c10bffea6f").terms.get()
        SPOnlineTermStore.GetDepartment()
            // store.getTerms(labelMatchInfo).get()
            .then((data)=>{
                // console.log(x)
                let results = data.map((item)=>{
                    return { value: item.Name, label:`${item.Name}`}
                  });
                  callback(null, {
                      options: results,
                      complete: true,
                  });
            })
        // const group: ITermGroup & ITermGroupData = await store.getTermGroupById("30de891f-4b97-45ef-b143-95a6e3a75c0e").get();
        // const set: ITermSet & ITermSetData = await group.termSets.getByName("Department").get();
        // const set: ITermSet & ITermSetData = await store.getTermSetsByName("Department",1031).getByName("Department").get();



        }, 500);
    };

   

    selectChange(e){
        // console.log('Customer Select selectChange' + JSON.stringify(e))
        //
        this.setState({
            value:e
        },()=>{  this.props.onChange(e); })
    }

    componentWillReceiveProps(nextProps:DepartmentTermStoreDropdown.Props){
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
        ref="selFunction" />
        )
    }
}

export default DepartmentTermStoreDropdown;