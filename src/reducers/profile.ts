import { handleActions } from 'redux-actions';
import * as Actions from '../constants/actions';
import { StaffMaster, AppProfile } from '../../types/models';

const initialState: AppProfile = {
    Staff:{
        Id:0
    },
    User:{
        Title:_spPageContextInfo.userDisplayName,
        Email:_spPageContextInfo.userEmail,
        Id:_spPageContextInfo.userId,
        LoginName:_spPageContextInfo.userLoginName,
        Groups:{
            results:[]
        }
    },
    Plant:null
};

export default handleActions<AppProfile,Partial<AppProfile>>({
    [Actions.GET_PROFILE]: (state, action) => {
        return state;
    },
    [Actions.PROFILE_RECEIVED]: (state, action) => {
        return {
            ...state,
            ...action.payload
        }
    }
},initialState);