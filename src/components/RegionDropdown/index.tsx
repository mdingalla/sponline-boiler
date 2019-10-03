import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { sp,Web } from "@pnp/sp";
import { SPOnPremise, Regions } from '../../constants/config';
import { ReactSelectValue } from '../../../types/models';



const options = Regions.map((x)=>{
    return {
        label:x,
        value:x
    } as ReactSelectValue
})

export namespace RegionDropdown {
    export interface Props {
        value:any;
        onChange:(e)=>void;
    }

    export interface State {
        value:any;
    }
}

class RegionDropdown extends React.Component<RegionDropdown.Props,RegionDropdown.State> {
    constructor(props){
        super(props);

        this.selectChange = this.selectChange.bind(this);
  

        this.state = {
            value:this.props.value
        }

    }

   

   

    selectChange(e){
        // console.log('Customer Select selectChange' + JSON.stringify(e))
        //
        this.setState({
            value:e
        },()=>{  this.props.onChange(e); })
    }

    

    render(){
        return (
            <Select name="form-field-name"
        value={this.state.value}
        onChange={e => this.selectChange(e)}
        options={options}
        ref="selRegionDropdown" />
        )
    }
}

export default RegionDropdown;