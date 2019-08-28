import * as React from "react";
import { RouteComponentProps } from "../../../node_modules/@types/react-router";
// import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import { FontWeights } from '@uifabric/styling';
import {
  ActionButton,
  IButtonStyles,
  Icon,
  IIconStyles,
  Image,
  Persona,
  Stack,
  IStackTokens,
  Text,
  ITextStyles
} from 'office-ui-fabric-react';

import { AppConfig } from "../../../types/models";


export namespace HomePage {
  export interface Props extends RouteComponentProps<void> {
    appconfig: AppConfig;
    // dashboardactions: typeof DashboardActions;
    // dashboard: DashboardModel;
    // profile: AppProfile;
    // locale: LocalizedData;
  }
  export interface State {}
}

class HomePage extends React.Component<
HomePage.Props,
HomePage.State
> {
  constructor(props) {
    super(props);

  
  }


  render() {

    return (
      <div className="">
        

      
      </div>
    );
  }
}

export default HomePage;
