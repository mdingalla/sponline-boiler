import { SPOnPremise } from "../constants/config";


export default class IConnectSupplierApi {
    static GetSuppliers(filter){
        return fetch(`${SPOnPremise}/supplierapp/_api/web/lists/getbytitle('SupplierMaster')/items?$filter=${filter}`,{
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

    static GetSupplierClassification(filter){
        return fetch(`${SPOnPremise}/supplierapp/_api/web/lists/getbytitle('Classifications')/items?$filter=${filter}`,{
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