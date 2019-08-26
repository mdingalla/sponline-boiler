import { combineReducers, Reducer } from 'redux';
// import todos from './todos';
// import profile from './profile';

// import dashboard from  './dashboard';
// import locale from './locale';
import contract from './contract';

import {routerReducer, RouterState} from 'react-router-redux';
// import { CERRecord, TodoStoreState, AppProfile, DashboardModel, PettyCashView, LocalizedData, AppConfig } from '../../types/models';
import appconfig from './appconfig';
import { AppConfig, ContractFormView } from '../../types/models';



export {RootState,RouterState}

interface RootState {
//   profile:AppProfile;
//   dashboard:DashboardModel;
//   ptc:PettyCashView;
//   locale:LocalizedData;
  appconfig:AppConfig;
  contract:ContractFormView;
}


export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
//   profile:profile,
//   dashboard:dashboard,
//   ptc:ptc,
//   locale:locale,
contract:contract,
  appconfig:appconfig
});
