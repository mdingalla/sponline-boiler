import {sp, RenderListDataOptions, RenderListDataParameters} from '@pnp/sp'
import { SPContractData, CounterParty, ReactSelectValue } from '../../types/models';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import UserApi from './userApi';

sp.setup({
    sp: {
        headers: {
          Accept: "application/json;odata=verbose",
        },
        baseUrl:"https://interplexgroup.sharepoint.com/sites/Region/Corp/legal"
      }
})

const myWeb = sp.web;

export default class ProfileWebApi {
    static GetUserProfileGroups(id){
        return myWeb.siteUsers.getById(id)
            .groups.get()
    }
}