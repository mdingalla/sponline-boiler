import * as React from "react";
import { RouteComponentProps } from "../../../node_modules/@types/react-router";
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
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
  ITextStyles,
  DatePicker
} from 'office-ui-fabric-react';

import { AppConfig } from "../../../types/models";
import { DayPickerStrings } from "../../constants/config";


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
    const sectionStackTokens: IStackTokens = { childrenGap: 30,padding:12 };
    const cardTokens: ICardTokens = { childrenMargin: 12 };
    const footerCardSectionTokens: ICardSectionTokens = { padding: '12px 0px 0px' };
    const backgroundImageCardSectionTokens: ICardSectionTokens = { padding: 12 };

    return (
      <div className="">
          <Stack horizontal horizontalAlign="space-evenly" tokens={sectionStackTokens} >
            <Card>
              <Card.Item>
              <DatePicker strings={DayPickerStrings} 
                        // ref="effectiveDate"
                            allowTextInput={ true }
                             placeholder='Select a date...' />
              </Card.Item>
            </Card>

            <Card tokens={cardTokens}>
              <Card.Section>
                <Text>Basic vertical card</Text>
              </Card.Section>
            </Card>

            <Card>
              <Card.Item>
                <Text>Basic vertical card</Text>
              </Card.Item>
            </Card>


          </Stack>
      
      </div>
    );
  }
}

export default HomePage;
