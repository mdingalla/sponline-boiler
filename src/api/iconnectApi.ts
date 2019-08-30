

import * as _ from "lodash";
import { SPOnPremise } from "../constants/config";

// import CerAPI from "./cerApi";
// import ManpowerApi from "./manpowerApi";
// import PettyCashApi from "./pettyCashApi";
// import SupplierApi from "./supplierApi";
// import TravelApi from "./travelApi";
// import UserAccessApi from "./userAcessApi";

const PLANTMASTER = "PlantMaster";
const DEPTCOSTCENTER = "DeptCostCentre";
const COSTCENTREOWNER = "CostCentreOwners";
const IPTPROJECT = "IPTProjects"



class PlantMaster {
  

  static GetPlantByCompanyCode(code): PromiseLike<any> {
    const filter = `CompanyCode eq '${code}'`
    return fetch(`${SPOnPremise}/_api/web/lists/getbytitle('${PLANTMASTER}')/items?$filter=${filter}`,{
      credentials: 'include',
      method: 'GET',
      cache: 'no-cache',
      mode: 'cors',
      headers: {
          Accept: 'application/json;odata=verbose',
          // 'Content-Type': 'application/json', // will fail if provided
          // 'X-ClientService-ClientTag': 'PnPCoreJS', // will fail if provided
      }
  })
  .then(r => r.json())
  }
  

  
}


export {
  PlantMaster,
 
};
