import * as React from 'react';
import {asyncReactor} from 'async-reactor';

import LegalWebApi from '../../api/LegalWebApi';

function PanelContainer(){
    return (
        <b>Loading ...</b>
      );
}

async function ContractItem(props){
    const contract = await LegalWebApi.GetContractDataFile(props.id)

    return <div>
        <label>{contract.Name} {props.id}</label>
    </div>
}

export default asyncReactor(ContractItem, PanelContainer);