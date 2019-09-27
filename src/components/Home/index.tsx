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

import { AppConfig, ContractFormView } from "../../../types/models";
import { DayPickerStrings } from "../../constants/config";
import { HomePage } from "../HomePage";
import * as ContractActions from "../../actions/contract";


export namespace Home {
  export interface Props extends RouteComponentProps<void> {
    appconfig: AppConfig;
    contractactions: typeof ContractActions;
    contract: ContractFormView;
    // dashboardactions: typeof DashboardActions;
    // dashboard: DashboardModel;
    // profile: AppProfile;
    // locale: LocalizedData;
  }
  export interface State {}
}

class Home extends React.Component<
Home.Props,
Home.State
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
        <HomePage {...this.props} />
          {/* <Stack horizontal horizontalAlign="space-evenly" tokens={sectionStackTokens} >
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


          </Stack> */}
      
      </div>
    );
  }
}

export default Home;
