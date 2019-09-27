import {sp, RenderListDataOptions, RenderListDataParameters, ContentType} from '@pnp/sp'
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
const COUNTERPARTYMASTER = "CounterPartyMaster";
const CONTRACTRELATEDDOCUMENTS = "ContractRelatedDocuments";
const PARENTCOUNTERPARTYMASTER = "ParentCounterPartyMaster";

const myWeb = sp.web;




class LegalWebApi {

  static  AddContractContentType(name){
    var deferred = $.Deferred();

    var oSiteContentTypes:SP.ContentTypeCollection, clientContext:SP.ClientContext;
    
    clientContext = new SP.ClientContext();
    var web = clientContext.get_web();

    oSiteContentTypes = web.get_contentTypes();

    clientContext.load(oSiteContentTypes)

    clientContext.executeQueryAsync(
      ()=>{
            var oEnumerator = oSiteContentTypes.getEnumerator();
    
            var oContentType;

            // Counter variable to be used to break below loop
            var counter = 0;
        
            while (oEnumerator.moveNext()) {
                // This line of codde is written to break the loop
                if (counter == 1) {
                    break;
                }
        
                oContentType = oEnumerator.get_current();
        
                // Specify the Parent Content Type Name here
                if (oContentType.get_name() == "LegalContract") {
                    counter += 1;
        
                    var NewContentType = new SP.ContentTypeCreationInformation();
        
                    // New Content Type Name
                    NewContentType.set_name(name);
        
                    NewContentType.set_parentContentType(oContentType);
        
                    // Group nme for the new Content Type
                    NewContentType.set_group("Contract Content Types");
        
                    // Description of the content type
                    NewContentType.set_description('A Legal Contract Type');
        
                    oSiteContentTypes.add(NewContentType);
        
                    //Load Client Context and Execute the batch
                    clientContext.load(oSiteContentTypes);
        
                    return  clientContext.executeQueryAsync(FinalQuerySuccess,FinalQueryFailure);
                  }
            }
          },
          ()=>{
            deferred.reject()
          }
    )

    return deferred.promise();

      function FinalQuerySuccess(sender, args) {
        // console.log('success')
        deferred.resolve(true)
      }

      function FinalQueryFailure(sender, args) {
        // console.log('fail')
        deferred.reject()
        // console.log('Failed' + args.get_message() + '\n' + args.get_stackTrace());
      }
   
  }

  static async AddContentTypeToContract(name){
    
    const contentType = await myWeb.contentTypes.filter(`Name eq '${name}'`).get<ContentType[]>();

    if(contentType && contentType.length > 0)
    {
      const ct = contentType[0];
      
      if(ct){
        return myWeb.lists.getByTitle(CONTRACTS)
          .contentTypes.addAvailableContentType(ct['StringId'])
          
      }
    }

    return Promise.reject();
  }

  static AddSiteContentType(name){

    const payload =  {
      '__metadata': {'type': 'SP.ContentType'},
     'Name': `${name}`,
     'Group': 'Custom Content Types',        
      'Parent':{
          '__metadata':{
              'type':'SP.ContentTypeId'
          },
          'StringValue':'0x010100D7A632D0DAFA054A839055694AE108240B'
      }
    }
    return fetch(`${_spPageContextInfo.webAbsoluteUrl}/_api/web/contenttypes`,{
      method: 'POST',
      credentials:'same-origin',
      headers: {
          Accept: 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose', // will fail if provided
          "X-RequestDigest": document.getElementById('__REQUESTDIGEST').attributes['value'].value
          // 'X-ClientService-ClientTag': 'PnPCoreJS', // will fail if provided
      },
      body:JSON.stringify(payload)
    })
  }



  static AddContractRelatedDocuments(parentid,id){
    return myWeb.lists.getByTitle(CONTRACTRELATEDDOCUMENTS)
      .items.add({
         ParentId:parentid,
         ChildDocumentId:id
      })
  }

  static AddCounterPartyParent(payload){
    return myWeb.lists.getByTitle(PARENTCOUNTERPARTYMASTER)
      .items.add(payload)
  }

  static AddCounterParty(payload){
    return myWeb.lists.getByTitle(COUNTERPARTYMASTER)
      .items.add(payload)
  }

  static async ContractCheckInOut(id,outcome:boolean){
    //true = checkin
    let myfile = myWeb.lists.getByTitle(CONTRACTS)
      .items.getById(id).file;

    const spFile = await myfile.get();
    const checkOutType = spFile.CheckOutType;

    if(outcome){
      if(checkOutType == 0){
        return myWeb.lists.getByTitle(CONTRACTS).items.getById(id).file.checkin()
      }
    }
    else
    {
      if(checkOutType == 2){
        return myWeb.lists.getByTitle(CONTRACTS).items.getById(id).file.checkout()
      }
    }
  }


  static async DeleteContractType(id){

    const contractType = await myWeb.lists.getByTitle(CONTRACTS).contentTypes.getById(id).get<ContentType>();

    
    
    const ListContentDelete =  myWeb.lists.getByTitle(CONTRACTS).contentTypes.getById(id).delete();

    return ListContentDelete.then(async ()=>{

      const siteContent = await myWeb.contentTypes.filter(`Name eq '${contractType["Name"]}'`).get();
      
      if(siteContent && siteContent.length > 0){

        const siteCT = siteContent[0];

        if(siteCT)
        {
          const WebContentDelete = myWeb.contentTypes.getById(siteCT.StringId)
          .delete();
  
          return WebContentDelete;
        }

      }

    }).catch(()=>{
      return Promise.reject();
    })
  }

  static GetContractData(id){
    return myWeb.lists.getByTitle(CONTRACTS)
      .items
      .getById(id)
      .select("*,ContentType/Name")
      .expand("ContentType")
      .get<SPContractData>();
  }

  static GetContractDataFile(id){
    return myWeb.lists.getByTitle(CONTRACTS)
      .items.getById(id).file.get()
  }


  static GetContractRelatedChild(id){
    return myWeb.lists.getByTitle(CONTRACTRELATEDDOCUMENTS)
      .items.getById(id)
      .get()
  }

  static GetContractRelatedChildFile(id){
    return myWeb.lists.getByTitle(CONTRACTRELATEDDOCUMENTS)
      .items.getById(id)
      .get().then((childfile)=>{
         return this.GetContractDataFile(childfile.ChildDocumentId)
      })
  }

  static GetContractRelated(id){
    return myWeb.lists.getByTitle(CONTRACTRELATEDDOCUMENTS)
      .items.getById(id)
      .get()
  }


  static GetContractRelatedByParent(parentid){
    return myWeb.lists.getByTitle(CONTRACTRELATEDDOCUMENTS)
      .items.filter(`ParentId eq ${parentid}`).get()
  }

  static GetContractRelatedByChild(parentid){
    return myWeb.lists.getByTitle(CONTRACTRELATEDDOCUMENTS)
      .items.filter(`ChildDocumentId eq ${parentid}`).get()
  }


  static async GetContractRelatedDocs(parentid){
    const parent = await this.GetContractRelatedByParent(parentid);

    const child  = await this.GetContractRelatedByChild(parentid);

    const parentdata = parent.map((x)=>{
       return {
         ...x,
         isParent:true
       }
    })

    const childdata = child.map((x)=>{
      return {
        ...x,
        isParent:false
      }
    })

    return parentdata.concat(childdata);

  }

  static UpdateContractData(payload,id:number){
      return myWeb.lists.getByTitle(CONTRACTS)
        .items.getById(id).update(payload);
  }

 

  static GetParentConterParty(filter){
    return myWeb.lists.getByTitle(PARENTCOUNTERPARTYMASTER)
      .items.filter(filter).get()
  }

  static GetIPXEntities(filter){
    return myWeb.lists.getByTitle(COUNTERPARTYMASTER)
      .items.filter(`ClassificationId eq 3 ${filter ? ` and (${filter})`:""}` ).get()
  }

  static GetCustomers(filter){
    return myWeb.lists.getByTitle(COUNTERPARTYMASTER)
      .items.filter(`ClassificationId eq 1 ${filter ? ` and (${filter})`:""}` ).get()
  }

  static GetVendors(filter){
    return myWeb.lists.getByTitle(COUNTERPARTYMASTER)
      .items.filter(`ClassificationId eq 2 ${filter ? ` and (${filter})`:""}` ).get()
  }


  static async AddSupplierCounterPartyMaster(payload){
   const request = await myWeb.lists.getByTitle(COUNTERPARTYMASTER).items
      .filter(`Code eq '${payload.Code}' and ClassificationId eq 2`)
      .get()

    if(request.length <= 0)
    {
        return myWeb.lists.getByTitle(COUNTERPARTYMASTER)
        .items.add(payload)
    }
    
    return Promise.resolve();
   
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

  static GetContractContentTypes(){
    return myWeb.lists.getByTitle(CONTRACTS).contentTypes
      .get()
  }

  static GetCounterPartyMaster(id){
    return myWeb.lists.getByTitle(COUNTERPARTYMASTER)
      .items.getById(id).get();
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


  static GetContractPermission(){
    return myWeb.lists.getByTitle(CONTRACTS).getCurrentUserEffectivePermissions()
  }

  static ReplaceDoc(file:File,filePath:string){
    const newblob = new Blob([file]);
    return myWeb.getFileByServerRelativePath(filePath).setContent(newblob)
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
      Title:title && title.label ? title.label : cp.PartyName,
     
      BusinessType:nature && nature.label ? nature.label : cp.Nature,
      ClassificationKV:classification && classification.value ? classification.value : cp.Classification,
      ContractRefId:parentid
    }

    if(title && !isNaN(parseInt(title.value)))
    {
      payload["CounterPartyRefId"] = title.value
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


  static DeleteCounterParty(spId){
  
      return myWeb.lists.getByTitle(CONTRACTCOUNTERPARTIES)
        .items.getById(spId).delete()
  }


  static DeleteRelatedDocs(id){
    return myWeb.lists.getByTitle(CONTRACTRELATEDDOCUMENTS)
      .items.getById(id).delete()
  }

  static QueryContract(params:RenderListDataParameters){
    return myWeb.lists.getByTitle(CONTRACTS)
      .renderListDataAsStream(params)
  }

  static QueryContractCounterParty(filter){
    return myWeb.lists.getByTitle(CONTRACTCOUNTERPARTIES)
      .items.filter(filter).getAll()
  }


}

export default LegalWebApi;