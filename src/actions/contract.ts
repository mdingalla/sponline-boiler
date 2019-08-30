import { createAction } from "redux-actions";
import * as moment from 'moment';
// import {History} from '../../node_modules/@types/history'
import * as H from "history";
import * as revalidator from "revalidator";

import * as Actions from "../constants/actions";
import { ContractFormView, ContractFormState } from "../../types/models";
import { func } from "prop-types";
import { RootState } from "../reducers";
import LegalWebApi from "../api/LegalWebApi";
import { PlantMaster } from "../api/iconnectApi";

export const ContractFormChanges = createAction<ContractFormView>(
    Actions.CONTRACT_CHANGED
);

export function CreateOrUpdateContract(payload:ContractFormState){
    return function(dispatch,getState:()=>RootState){

        const {contract} = getState();

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

        const fileforUpload:File = payload.upFiles[0];

        Promise.all([
            PlantMaster.GetPlantByCompanyCode(payload.entity.value),
            LegalWebApi.GetClassificationByKeyValue(payload.classification.value)
        ]).then((results)=>{
            const plantMasterResults = results[0].d.results;
            const plantMaster = plantMasterResults && plantMasterResults.length > 0 ? plantMasterResults[0] : null;

            const classificationResults = results[1];
            const spClassification = classificationResults && classificationResults.length > 0 ? classificationResults[0] : null;

            LegalWebApi.UploadDocument(payload.upFiles[0],fileforUpload.name)
                .then((fileResult)=>{
                    console.log(fileResult)
                        fileResult.file.getItem("Id")
                        .then((spFile)=>{
                            spFile.update({
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
                        })
                })

            dispatch(ContractFormChanges({
                ...contract,
            }))
        })




        
    }

}


