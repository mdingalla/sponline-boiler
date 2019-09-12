import * as React from "react"
import { RouteComponentProps } from "react-router"
import { AppConfig, ContractFormView } from "../../../types/models"

import * as ContractActions from "../../actions/contract";

export namespace HomePage {
    export interface Props extends RouteComponentProps<void> {
      appconfig: AppConfig;
      contract: ContractFormView;
      // dashboardactions: typeof DashboardActions;
      contractactions: typeof ContractActions;
      // dashboard: DashboardModel;
      // profile: AppProfile;
      // locale: LocalizedData;
    }
  
    export interface State {
      /* empty */
    }
  }


export const HomePage = (props:HomePage.Props)=> {
    return <div className="jumbotron">
        <p>Welcome to Legal Repository</p>
        <p><button type="button"
        onClick={props.contractactions.NavigateNewContract}
         className="btn btn-primary">Upload Contract</button></p>
    </div>
}