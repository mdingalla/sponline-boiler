import { handleActions } from "redux-actions";
import * as Actions from "../constants/actions";
import { AppConfig } from "../../types/models";

const initialState: AppConfig = {
  IsProduction: true,
  RequireBank: false,
  AllowProjectCharge: false
};

export default handleActions<AppConfig, any>(
  {
    [Actions.DASHBOARD_READY]: (state, action) => {
      return {
        ...state,
        ...action.payload
      };
    },
    [Actions.SWITCH_DEV_MODE]: (state, action) => {
      let payload = action.payload as AppConfig;
      return {
        ...state,
        ...payload
      };
    }
  },
  initialState
);
