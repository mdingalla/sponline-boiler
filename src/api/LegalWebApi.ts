import {sp} from '@pnp/sp'
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

const CONTRACTS = "Contracts";
const CLASSIFICATION = "Classification";
const CATEGORY = "Categories";
const CONTRACTDOCUMENT = "Documents"
const CONTRACTCOUNTERPARTIES = "ContractCounterParties";

const myWeb = sp.web;

class LegalWebApi {

  static GetContractData(id){
    return myWeb.lists.getByTitle(CONTRACTS)
      .items.getById(id).get<SPContractData>();
  }

  static GetCategoryById(id){
    return myWeb.lists.getByTitle(CATEGORY)
      .items.getById(id).get();
  }

  static GetClassificationById(id){
    return myWeb.lists.getByTitle(CLASSIFICATION)
      .items.getById(id).get();
  }

  static GetContentType(id){
    return myWeb.lists.getByTitle(CONTRACTS).contentTypes
    .getById(id).get();
  }

  static GetCounterPartiesByParentId(id){
    return myWeb.lists.getByTitle(CONTRACTCOUNTERPARTIES)
      .items.filter(`ContractRefId eq ${id}`)
      .get();
  }



  static GetClassificationByKeyValue(keyvalue){
    return myWeb.lists.getByTitle(CLASSIFICATION)
      .items.filter(`KeyValue eq '${keyvalue}'`)
      .get();
  }


  static UploadDocument(file: File, mfilename){
      if (file.size <= 10485760) {
          return myWeb
            .getFolderByServerRelativeUrl(CONTRACTDOCUMENT)
            .files.add(mfilename, file, true);
        } else {
          return myWeb
            .getFolderByServerRelativeUrl(CONTRACTDOCUMENT)
            .files.addChunked(mfilename, file);
        }
  }

  static AddOrUpdateCounterParty(parentid,cp:CounterParty){
    let title = cp.PartyName as ReactSelectValue;
    let classification = cp.Classification as ReactSelectValue;
    let nature = cp.Nature as ReactSelectValue;
    let payload = {
      Title:title.label ? title.label : cp.PartyName,
      BusinessType:nature.label ? nature.label : cp.Nature,
      ClassificationKV:classification.value ? classification.value : cp.Classification,
      ContractRefId:parentid
    }

    if(cp.Id){
      return myWeb.lists.getByTitle(CONTRACTCOUNTERPARTIES)
        .items.getById(cp.Id).update(payload)
    }
    else {
      return myWeb.lists.getByTitle(CONTRACTCOUNTERPARTIES)
        .items.add(payload)
    }
      
  }


  static ConvertToPersona(userid: any) {
  
    
    return UserApi.GetUserById(userid).then(result => {
      let item = result;
  
      if (item) {
        return Promise.resolve({
          key: item.Id,
            imageUrl: item.Picture,
            imageInitials: item.Office,
            text: item.Title,
            // primaryText: item.Title,
            secondaryText: item.JobTitle,
            tertiaryText: item.Department,
            optionalText: item.Office
        } as IPersonaProps);
      }
    });
  }
}

export default LegalWebApi;