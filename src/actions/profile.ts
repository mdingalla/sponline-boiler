import { createAction } from "redux-actions";
import * as Actions from "../constants/actions";
// import { UserProfile } from "sp-pnp-js/lib/pnp";
// import StaffMasterApi from "../sharepointapi/staffMasterApi";
import { AppProfile, LocalizedData, AppConfig } from "../../types/models";
// import { PlantMaster, PettyCashApi } from "../sharepointapi/iconnectApi";
// import LocalizatonApi from "../sharepointapi/localizationApi";
import { RootState } from "../reducers";
import LegalWebApi from "../api/LegalWebApi";
import ProfileWebApi from "../api/ProfileWebApi";
// import { SPADMIN } from "../constants/filters";


const SPADMIN = "Legal Repository Owners";

function staffMasterSuccess(payload: Partial<AppProfile>) {
  return {
    type: Actions.PROFILE_RECEIVED,
    payload: payload
  };
}

export function changeAppConfig(payload: AppConfig) {
  return {
    type: Actions.SWITCH_DEV_MODE,
    payload: payload
  };
}

export function localizeSuccess(payload: LocalizedData) {
  return {
    type: Actions.LOCALE_RECEIVED,
    payload: payload
  };
}

export function GetUser(id){
  return function(dispatch,getState:()=>RootState) {
      const {profile} = getState();
      ProfileWebApi.GetUserProfileGroups(id)
        .then((groups)=>{
          dispatch(staffMasterSuccess({
            User:{
              ...profile.User,
              Groups:{
                results:groups
              }
            }
          }))
        })
  }
}



export function getAppConfig(id) {
  return function(dispatch,getState:()=>RootState) {
    const {profile} = getState();
    const isAdmin = profile.User.Groups.results.filter(x=>x.Title == SPADMIN).length > 0;
    if (isAdmin) {
      dispatch(
        changeAppConfig({
          IsProduction: false
        })
      );
    }
  };
}
