import { createAction } from "redux-actions";
import * as moment from 'moment';
// import {History} from '../../node_modules/@types/history'
import * as H from "history";
import * as revalidator from "revalidator";

import * as Actions from "../constants/actions";
import { ContractFormView, ContractFormState, CounterParty, ReactSelectValue } from "../../types/models";
import { func } from "prop-types";
import { RootState } from "../reducers";
import LegalWebApi from "../api/LegalWebApi";
import { PlantMaster } from "../api/iconnectApi";
import { pagePath, Vendor, Others, Entity } from "../constants/config";

export const ContractFormChanges = createAction<Partial<ContractFormView>>(
    Actions.CONTRACT_CHANGED
);

export function CreateOrUpdateContract(payload:ContractFormState,history:H.History){
    return function(dispatch,getState:()=>RootState){

        const {contract} = getState();

        

        const CounterParties = payload.counterparties.map((x,idx)=>{
            return {
                Classification:idx==0 ? payload.classification : x.Classification,
                ...x
            } as CounterParty
        })

        console.log(payload)
        console.log(CounterParties);

        const isValid: { valid: boolean; errors: any[] }  = revalidator.validate(payload,{
            properties:{
                entity:{
                    properties:{
                        label:{
                            description:'Entity',
                            type:'string',
                            allowEmpty:false
                        }
                    }
                },
                contentTypes:{
                    properties:{
                        label:{
                            description:'Contract Types',
                            type:'string',
                            allowEmpty:false
                        }
                    }
                },
                classification:{
                    properties:{
                        label:{
                            description:'Relationship',
                            type:'string',
                            allowEmpty:false
                        }
                    }
                },
                category:{
                    properties:{
                        label:{
                            description:'Category',
                            type:'string',
                            allowEmpty:false
                        }
                    }
                },
                department:{
                    properties:{
                        label:{
                            description:'Function',
                            type:'string',
                            allowEmpty:false
                        }
                    }
                },
                upFiles:{
                    description:'items',
                    type:'array',
                    minItems:1
                }
            }
        })

        if(!isValid.valid) return;

        Promise.all([
            PlantMaster.GetPlantByCompanyCode(payload.entity.value),
            LegalWebApi.GetClassificationByKeyValue(payload.classification.value)
        ]).then((results)=>{
            const plantMasterResults = results[0].d.results;
            const plantMaster = plantMasterResults && plantMasterResults.length > 0 ? plantMasterResults[0] : null;

            const classificationResults = results[1];
            const spClassification = classificationResults && classificationResults.length > 0 ? classificationResults[0] : null;

           payload.upFiles.map((file)=>{
            LegalWebApi.UploadDocument(file,file.name)
            .then((fileResult)=>{
                console.log(fileResult)
                    fileResult.file.getItem("Id")
                    .then(async (spFile)=>{
                        const ParentId = spFile["ID"];

                        await spFile.update({
                            ContentTypeId:payload.contentTypes.value,
                            EntityId:payload.entity.value,
                            EntityCode:plantMaster  ? plantMaster.Title : '',
                            EntityName:plantMaster  ? plantMaster.EntityName : payload.entity.label,
                            Region:plantMaster  ? plantMaster.Region : null,
                            ContractCategoryId: payload.category.value,
                            ContractOwnerId:payload.owner[0].key,
                            FunctionDept:payload.department.value || null,
                            ContractClassificationId:spClassification.Id,
                            EffectiveDate:payload.effectiveDate ? moment(payload.effectiveDate).toISOString() : null,
                            ExpiryDate:payload.expiryDate ? moment(payload.expiryDate).toISOString() : null,
                        })


                       Promise.all(
                           [AddOrUpdateCounterParties(ParentId,CounterParties)]
                       ).then(()=>{
                        console.log("Done");
                        history.push(`${pagePath}`)
                       })
                        
                        
                        
                        
                    })
            })
           })

            dispatch(ContractFormChanges({
                ...contract,
            }))
        })




        
    }

}



function AddOrUpdateCounterParties(parentid,cps:CounterParty[]){
    return Promise.all(
        cps.map(cp=>{
            LegalWebApi.AddOrUpdateCounterParty(parentid,cp)
        })
    );
}


export function GetContract(id){
    return function(dispatch,getState:()=>RootState){
        LegalWebApi.GetContractData(id)
            .then((spContract)=>{
                console.log(spContract)

                Promise.all([
                   spContract.ContractCategoryId ? LegalWebApi.GetCategoryById(spContract.ContractClassificationId) : Promise.resolve(null),
                   spContract.ContractClassificationId ? LegalWebApi.GetClassificationById(spContract.ContractClassificationId) : Promise.resolve(null),
                   spContract.ContentTypeId ? LegalWebApi.GetContentType(spContract.ContentTypeId) : Promise.resolve(null),
                   LegalWebApi.GetCounterPartiesByParentId(id),
                   spContract.ContractOwnerId ? LegalWebApi.ConvertToPersona(spContract.ContractOwnerId) : Promise.resolve(null)
                ]).then((results)=>{

                    const category = results[0];
                    const classification = results[1];
                    const contentTypes = results[2];
                    const counterparties = results[3];
                    const owner = [results[4]];

                    console.log(owner)

                    dispatch(ContractFormChanges({
                        id:spContract.Id,
                        owner:owner,
                        contractingEntity:{
                            value:spContract.EntityId.toString(),
                            label:`${spContract.EntityId} - ${spContract.EntityName}`
                        },
                        contractTypes:{
                            value:spContract.ContentTypeId,
                            label:contentTypes.Name
                        },
                        category:{
                            value:spContract.ContractCategoryId.toString(),
                            label:category.Title
                        },
                        relationship:{
                            value:classification.KeyValue,
                            label:classification.Title
                        },
                        function:{
                            value:spContract.FunctionDept,
                            label:spContract.FunctionDept
                        },
                        effectiveDate:new Date(spContract.EffectiveDate),
                        expiryDate:new Date(spContract.ExpiryDate),
                        counterparties:counterparties.map((cp,idx)=>{

                            let cpEntity ={
                                label:cp.Title,
                                value:cp.Title
                            } as ReactSelectValue
                            if(cp.ClassificationKV == Entity)
                            {
                                 cpEntity =  {
                                    label:cp.Title,
                                    value:cp.Title.substring(0,4)
                                 } as ReactSelectValue
                            }

                            return {
                                Id:cp.Id,
                                Classification:cp.ClassificationKV,
                                PartyName:cp.ClassificationKV != Others ? cpEntity : cp.Title, 
                                Nature:cp.ClassificationKV == Vendor ? {
                                    value:cp.BusinessType,
                                    label:cp.BusinessType
                                } as ReactSelectValue : cp.BusinessType
                            } as CounterParty
                        })

                    }))
                })

                
            })
    }
}

export function NewContract(){
    return function(dispatch){
        dispatch(ContractFormChanges({
            counterparties:[{}],
            
        }))
    }
}
