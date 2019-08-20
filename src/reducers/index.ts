import { combineReducers, Reducer } from 'redux';
// import todos from './todos';
// import profile from './profile';
// import ptc from './ptc';
// import dashboard from  './dashboard';
// import locale from './locale';


import {routerReducer, RouterState} from 'react-router-redux';
// import { CERRecord, TodoStoreState, AppProfile, DashboardModel, PettyCashView, LocalizedData, AppConfig } from '../../types/models';
// import appconfig from './appconfig';



export {RootState,RouterState}

interface RootState {
//   profile:AppProfile;
//   dashboard:DashboardModel;
//   ptc:PettyCashView;
//   locale:LocalizedData;
//   appconfig:AppConfig;
}


export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
//   profile:profile,
//   dashboard:dashboard,
//   ptc:ptc,
//   locale:locale,
//   appconfig:appconfig
});
