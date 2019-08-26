import { handleActions } from "redux-actions";
import * as Actions from "../constants/actions";
import { ContractFormView } from "../../types/models";
import { EmptyReactSelectValue } from "../constants/config";

const initialState: ContractFormView = {
    category:EmptyReactSelectValue,
    contractTypes:EmptyReactSelectValue,
    contractingEntity:EmptyReactSelectValue,
    counterparties:[{}],
    durationMonths:0,
    durationYears:0,
    effectiveDate:null,
    expiryDate:null,
    function:EmptyReactSelectValue,
    owner:[],
    relationship:EmptyReactSelectValue
}

export default handleActions<ContractFormView, any>(
    {
      [Actions.CONTRACT_CHANGED]: (state, action) => {
        
        return {
          ...state,
        };
      }
    },
    initialState
  );