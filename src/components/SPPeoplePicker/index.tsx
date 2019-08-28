
import * as React from 'react';
import classnames from 'classnames';
import * as ReactDOM from 'react-dom';
import {BaseComponent,
  NormalPeoplePicker,
  IBasePickerProps,
  ListPeoplePicker,
  CompactPeoplePicker,
  IPersonaProps,
    IBasePicker, 
    IBaseProps} from 'office-ui-fabric-react';

import { SPHttpClient } from '@pnp/sp';
// import { IBaseProps } from '@uifabric/utilities/BaseComponent';
import { sp,Web } from "@pnp/sp";
import { SPOnPremise } from '../../constants/config';

sp.setup({
  sp: {
    headers: {
      Accept: "application/json;odata=verbose",
    },

  },
});

let siteColWeb = new Web(_spPageContextInfo.siteAbsoluteUrl);



const suggestionProps = {
  suggestionsHeaderText: 'Suggested People',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading'
};

interface SPCLientPeoplepickerState {
  items?:IPersonaProps[];
  value?:any;
  isProfile?:boolean;
  
}

interface SPClientPeoplePickerProps extends IBaseProps {
  value:IPersonaProps[];
  isprofile:boolean;
  onChange:(value: any)=> void;
  isMulti?:boolean;
  className?:string;
}

interface SPClientPeoplePickerElement extends Element {
  state:any;
}

// export default class SPClientPeoplePicker extends React.Component<SPClientPeoplePickerProps,SPCLientPeoplepickerState> {
  export default class SPClientPeoplePicker extends BaseComponent<SPClientPeoplePickerProps,SPCLientPeoplepickerState> {
  refs: {
    [key: string]: (Element);
    pplPicker:(SPClientPeoplePickerElement);
  }

  private _picker: IBasePicker<IPersonaProps>;


  constructor(props)
  {
    super(props)

    this.onChange = this.onChange.bind(this);
    this.state = {
      items:props.value,
      value:props.value,
      isProfile:this.props.isprofile || true,
    };
  }

  



  
  private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) {
    if (filterText) {
      // var userSearchSuggestionEndpoint = location.protocol + '//' + location.host  + "/_api/Web/SiteUserInfoList/items?" +
      var userSearchSuggestionEndpoint =  _spPageContextInfo.siteAbsoluteUrl  + "/_api/Web/SiteUserInfoList/items?" +
      "$filter=(substringof('" + filterText + "',FirstName) or substringof('" + filterText + "',LastName) or substringof('" + filterText + "',Title) or substringof('" + filterText + "',EMail)) and ContentType eq 'Person'";

        var option = {
          headers: {
            'Content-Type': 'application/json;odata=verbose',
            'Accept': 'application/json;odata=verbose'
          }
        };

        let myheaders = new Headers();
        myheaders.append('Content-Type','application/json;odata=verbose');
        myheaders.append('Accept','application/json;odata=verbose');

        let fetchCall  = fetch(userSearchSuggestionEndpoint,{credentials: 'same-origin',headers:myheaders});
        return fetchCall.then((data)=> {
            // return axios.get(userSearchSuggestionEndpoint,option).then((response)=>{
            // console.log(response);
          return data.json().then((result) =>{
            let results =  result.d.results.map((item)=>{
                return {
                  key: item.Id,
                  imageUrl: item.Picture,
                  imageInitials: item.Office,
                  text: item.Title,
                  primaryText: item.Title,
                  secondaryText: item.JobTitle,
                  tertiaryText: item.Department,
                  optionalText: item.Office
                }
              });
             return this._convertResultsToPromise(results);
            //   return new Promise((resolve, reject) => setTimeout(() => resolve(results), 2000));
          });
          
        });

    } else {
    //   return [];
    return this._convertResultsToPromise([]);
    }
  }


  
  private _StaffMasterOnFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) {
    if (filterText) {
      // var userSearchSuggestionEndpoint = location.protocol + '//' + location.host  + "/_vti_bin/ListData.svc/UserInformationList?" +
      var userSearchSuggestionEndpoint = location.protocol + '//' + location.host  + "/_api/web/lists/GetByTitle('Staff Master')/items?" +
    	    "$filter=(substringof('" + filterText + "',Title) or substringof('" + filterText + "',WorkEmail) or substringof('" + filterText + "',EmpNo))";

        var option = {
          headers: {
            'Content-Type': 'application/json;odata=verbose',
            'Accept': 'application/json;odata=verbose'
          }
        };

        let myheaders = new Headers();
        myheaders.append('Content-Type','application/json;odata=verbose');
        myheaders.append('Accept','application/json;odata=verbose');

        let fetchCall  = fetch(userSearchSuggestionEndpoint,{credentials: 'same-origin',headers:myheaders});
        return fetchCall.then((data)=> {
          return data.json().then((result) =>{
            let results =  result.d.results.map((item)=>{
                return {
                  key: item.Id,
                  id:item.WindowsIDId,
                  // imageUrl: item.Picture,
                  imageInitials:item.EmpNo,
                  // imageInitials: item.Plant,
                  text: item.Title,
                  primaryText: item.Title,
                  secondaryText: item.Position,
                  tertiaryText: item.Plant,
                  optionalText: item.Cost_x0020_Centre
                  // optionalText:user.Title,
                }
              });
             return this._convertResultsToPromise(results);
          });
          
        });

    } else {
    //   return [];
    return this._convertResultsToPromise([]);
    }
  }

  private getInitial(name: string){
    let initials = name.replace(/[^a-zA-Z- ]/g, "").match(/\b\w/g);
    return  initials.join().replace(/,/g,'');
  }


  

  
  private _ClientPeoplePickerSearchUser = (filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) => {
    // let searchString = 'andrew';
    let endpointUrl = `${_spPageContextInfo.siteServerRelativeUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser`.replace(/\/\//g, '/');
    if (filterText) {
      let myheaders = new Headers();
        // myheaders.append('Content-Type','application/json;odata=verbose');
        myheaders.append('Accept','application/json;odata=verbose');
      return new SPHttpClient()
      .post(endpointUrl,{
        headers: {
          // Accept: `application/json; odata=verbose`
        },
        body: JSON.stringify({
          queryParams: {
            __metadata: {
              type: 'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters'
            },
            AllowEmailAddresses: true,
            AllowMultipleEntities: true,
            AllUrlZones: false,
            MaximumEntitySuggestions: 50,
            PrincipalSource: 15,
            PrincipalType: 15,
            QueryString: filterText
          }
        })
      })
      .then(response => response.json())
      .then(data => {
        let results = JSON.parse(data.d.ClientPeoplePickerSearchUser).filter((p)=> {return p.EntityType == 'User'}).map((item,idx)=>{
          return {
            key: item.Key,
            // id: item.
            //  key: idx,
            // imageUrl: item.Picture,
            imageInitials: this.getInitial(item.DisplayText),
            text: item.DisplayText,
            primaryText: item.DisplayText,
            secondaryText: item.EntityData.Title,
            tertiaryText: item.EntityData.Department || item.DisplayText,
            optionalText: item.EntityData.Department || item.DisplayText
          }
        });

        // console.log(results);
        return this._convertResultsToPromise(results);
      });
      
    }
    else {
      return this._convertResultsToPromise([]);
    }
    
  }


  
  private ClientPeoplePickerSearchUser(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number){
    // let searchString = 'andrew';


    let endpointUrl = `${_spPageContextInfo.siteServerRelativeUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser`.replace(/\/\//g, '/');
    if (filterText) {
      let myheaders = new Headers();
        // myheaders.append('Content-Type','application/json;odata=verbose');
        myheaders.append('Accept','application/json;odata=verbose');
      return new SPHttpClient()
      .post(endpointUrl,{
        headers: {
          // Accept: `application/json; odata=verbose`
        },
        body: JSON.stringify({
          queryParams: {
            __metadata: {
              type: 'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters'
            },
            AllowEmailAddresses: true,
            AllowMultipleEntities: true,
            AllUrlZones: false,
            MaximumEntitySuggestions: 50,
            PrincipalSource: 15,
            PrincipalType: 15,
            QueryString: filterText
          }
        })
      })
      .then(response => response.json())
      .then(data => {
        let results = JSON.parse(data.d.ClientPeoplePickerSearchUser).filter((p)=> {return p.EntityType == 'User'}).map((item,idx)=>{
          return {
            key: item.Key,
            // id: item.
            //  key: idx,
            // imageUrl: item.Picture,
            imageInitials: this.getInitial(item.DisplayText),
            text: item.DisplayText,
            primaryText: item.DisplayText,
            secondaryText: item.EntityData.Title,
            tertiaryText: item.EntityData.Department || item.DisplayText,
            optionalText: item.EntityData.Department || item.DisplayText
          }
        });

        // console.log(results);
        return this._convertResultsToPromise(results);
      });
      
    }
    else {
      return this._convertResultsToPromise([]);
    }
    
  }



  private _convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
    return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
  }

  onChange(items){
   
    this.props.onChange(items);
  }

  componentWillReceiveProps(nextProps: SPClientPeoplePickerProps)
  {
      if(nextProps !== this.props)
      {
        this.setState({
          items:nextProps.value,
          value:nextProps.value
        },()=>{
          // this.refs.pplPicker.state.items = nextProps.value
          // this._picker.items = nextProps.value
        })
      } 
  }

  render(){
    return  <CompactPeoplePicker 
      // ref="pplPicker"
      componentRef={this._resolveRef('_picker')}
        // onResolveSuggestions={this.props.isprofile ? this._ClientPeoplePickerSearchUser : this._StaffMasterOnFilterChanged }
        onResolveSuggestions={this._ClientPeoplePickerSearchUser}
        onChange={this.onChange}
        // selectedItems={this.state.items}
        getTextFromItem={ (persona) => persona.primaryText }
        className={classnames('ms-PeoplePicker', this.props.className)}
        pickerSuggestionsProps={ suggestionProps }
        key={ 'normal' }
        itemLimit={this.props.isMulti ? 20 : 1}
        defaultSelectedItems={this.state.items}
        resolveDelay={300}
        selectedItems={this.state.items}
      />
  }


}


